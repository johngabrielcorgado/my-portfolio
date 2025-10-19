import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactPayload = {
  first?: string;
  last?: string;
  email?: string;
  message?: string;
};

const defaultRecipient = "corgadogabriel@gmail.com";

function validatePayload(payload: ContactPayload) {
  const errors: string[] = [];

  if (!payload.first?.trim()) errors.push("First name is required.");
  if (!payload.last?.trim()) errors.push("Last name is required.");
  if (!payload.email?.trim()) errors.push("Email is required.");
  if (!payload.message?.trim()) errors.push("Message is required.");

  if (payload.message && payload.message.length > 500) {
    errors.push("Message must be 500 characters or fewer.");
  }

  return errors;
}

export async function POST(request: Request) {
  try {
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
