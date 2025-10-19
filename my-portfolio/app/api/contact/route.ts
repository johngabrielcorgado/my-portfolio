import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactPayload = {
  first?: string;
  last?: string;
  email?: string;
  message?: string;
  honeypot?: string;
};

const defaultRecipient = "corgadogabriel@gmail.com";
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 5;

type RateEntry = {
  timestamps: number[];
};

const rateLimitStore = new Map<string, RateEntry>();

function getClientIdentifier(request: Request) {
  const headers = request.headers;
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const [first] = forwardedFor.split(",");
    if (first?.trim()) return first.trim();
  }

  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp;

  const cloudflareIp = headers.get("cf-connecting-ip");
  if (cloudflareIp) return cloudflareIp;

  return "unknown";
}

function checkRateLimit(identifier: string) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const entry = rateLimitStore.get(identifier) ?? { timestamps: [] };

  entry.timestamps = entry.timestamps.filter((timestamp) => timestamp > windowStart);

  if (entry.timestamps.length >= RATE_LIMIT_MAX_ATTEMPTS) {
    const retryAfter = Math.ceil(
      (entry.timestamps[0] + RATE_LIMIT_WINDOW_MS - now) / 1000
    );
    return { limited: true, retryAfter };
  }

  entry.timestamps.push(now);
  rateLimitStore.set(identifier, entry);
  return { limited: false, retryAfter: 0 };
}

function containsTooManyLinks(message: string) {
  const matches = message.match(/https?:\/\/|www\./gi);
  return (matches?.length ?? 0) > 2;
}

function looksSuspicious(text: string) {
  const lowered = text.toLowerCase();
  if (lowered.includes("viagra") || lowered.includes("loan approval")) return true;
  if (/[$€¥£]{2,}/.test(text)) return true;
  return false;
}

function validatePayload(payload: ContactPayload) {
  const errors: string[] = [];

  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    errors.push("Submission rejected.");
  }

  if (!payload.first?.trim()) errors.push("First name is required.");
  if (!payload.last?.trim()) errors.push("Last name is required.");
  if (!payload.email?.trim()) errors.push("Email is required.");
  if (!payload.message?.trim()) errors.push("Message is required.");

  if (payload.message) {
    if (payload.message.length > 500) {
      errors.push("Message must be 500 characters or fewer.");
    }
    if (payload.message.trim().length < 10) {
      errors.push("Message must be at least 10 characters long.");
    }
    if (containsTooManyLinks(payload.message)) {
      errors.push("Please provide fewer links in your message.");
    }
    if (looksSuspicious(payload.message)) {
      errors.push("Message flagged as potential spam.");
    }
  }

  return errors;
}

export async function POST(request: Request) {
  try {
    const identifier = getClientIdentifier(request);
    const rateCheck = checkRateLimit(identifier);

    if (rateCheck.limited) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.max(rateCheck.retryAfter, 1)),
          },
        }
      );
    }

    const payload = (await request.json()) as ContactPayload;
    const errors = validatePayload(payload);

    if (errors.length) {
      return NextResponse.json(
        { error: errors.join(" ") },
        { status: 400 }
      );
    }

    const { first, last, email, message } = payload;

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_SECURE,
      MAIL_FROM,
      CONTACT_RECIPIENT,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS environment variables.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure:
        typeof SMTP_SECURE === "string"
          ? SMTP_SECURE.toLowerCase() === "true"
          : Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from:
        MAIL_FROM ||
        `"${first} ${last}" <${SMTP_USER}>`,
      to: CONTACT_RECIPIENT || defaultRecipient,
      replyTo: email,
      subject: `New portfolio inquiry from ${first} ${last}`,
      text: [
        `Name: ${first} ${last}`,
        `Email: ${email}`,
        "",
        message?.trim(),
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New portfolio inquiry</h2>
          <p><strong>Name:</strong> ${first} ${last}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p>${(message || "")
            .trim()
            .replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] Failed to send message", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
