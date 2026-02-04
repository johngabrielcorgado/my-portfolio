"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import useIsMobile from "../hooks/use-is-mobile";

type ContactField = "first" | "last" | "email" | "message";

type ContactFormData = {
  first: string;
  last: string;
  email: string;
  message: string;
  honeypot: string;
};

type ContactMethod = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
};


export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    first: "",
    last: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [focusedField, setFocusedField] = useState<ContactField | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const shouldAnimate = !prefersReducedMotion && !isMobile;

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const contactMethods: ContactMethod[] = [
    {
      icon: <FiMail />,
      label: "Email",
      value: "corgadogabriel@gmail.com",
      href: "mailto:corgadogabriel@gmail.com",
    },
    {
      icon: <FiPhone />,
      label: "Phone",
      value: "+63 962 179 1718",
      href: "tel:+639621791718",
    },
    {
      icon: <FiMapPin />,
      label: "Location",
      value: "Metro Manila, PH",
      href: "#",
    },
  ];


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as keyof ContactFormData]: value }));
  };

  const nameFields: Array<Extract<ContactField, "first" | "last">> = [
    "first",
    "last",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = (await response
        .json()
        .catch(() => null)) as { success?: boolean; error?: string } | null;

      if (!response.ok) {
        throw new Error(
          data?.error ??
            "Unable to send your message right now. Please try again later."
        );
      }

      setIsSuccess(true);
      setFormData({ first: "", last: "", email: "", message: "", honeypot: "" });

      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    } catch (err) {
      console.error("Failed to send contact form:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 bg-zinc-900/50 border border-zinc-800/40 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all";

  return (
    <section className="grain relative min-h-screen py-24 md:py-32 bg-zinc-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_20%,rgba(139,92,246,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_80%,rgba(168,85,247,0.06),transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left column - Info */}
          <motion.div
            initial={shouldAnimate ? { opacity: 0, x: -40 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={shouldAnimate ? { duration: 0.6 } : undefined}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <motion.span
                initial={shouldAnimate ? { opacity: 0, scale: 0.9 } : false}
                animate={{ opacity: 1, scale: 1 }}
                transition={shouldAnimate ? { duration: 0.5 } : undefined}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/6 border border-purple-500/12 rounded-full text-xs font-medium uppercase tracking-widest text-purple-300/80 mb-4"
              >
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                Get in Touch
              </motion.span>

              <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-6 tracking-tight text-zinc-100">
                Let&apos;s Connect
              </h1>

              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-8">
                Have a project in mind or just want to chat about web development?
                I&apos;d love to hear from you. Fill out the form and I&apos;ll get back to you
                as soon as possible.
              </p>
            </div>

            {/* Contact methods */}
            <div className="space-y-3">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  initial={shouldAnimate ? { opacity: 0, x: -18 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={
                    shouldAnimate
                      ? {
                          delay: index * 0.06,
                          duration: isMobile ? 0.24 : 0.32,
                          ease: [0.4, 0, 0.2, 1] as const,
                        }
                      : undefined
                  }
                  whileHover={
                    shouldAnimate
                      ? {
                          x: isMobile ? 3 : 6,
                          transition: { duration: 0.12, ease: "easeOut" },
                        }
                      : undefined
                  }
                  className="flex items-center gap-4 p-4 bg-zinc-900/40 border border-zinc-800/40 rounded-xl hover:border-purple-500/20 transition-all group"
                >
                  <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/15 rounded-lg flex items-center justify-center text-purple-400 group-hover:text-purple-300 transition-colors">
                    <span className="text-lg" aria-hidden>
                      {method.icon}
                    </span>
                  </div>
                  <div>
                    <div className="text-zinc-600 text-xs uppercase tracking-wider">{method.label}</div>
                    <div className="text-zinc-200 font-medium text-sm">{method.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability indicator */}
            <motion.div
              initial={shouldAnimate ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={shouldAnimate ? { delay: 0.5 } : undefined}
              className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl"
            >
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400/80 text-sm font-medium">
                Currently available for new projects
              </span>
            </motion.div>
          </motion.div>

          {/* Right column - Form */}
          <motion.div
            initial={shouldAnimate ? { opacity: 0, x: 40 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={shouldAnimate ? { duration: 0.6 } : undefined}
            className="relative"
          >
            <div className="absolute -inset-4 bg-purple-600/5 rounded-3xl blur-2xl" />

            <div className="relative bg-zinc-900/40 border border-zinc-800/40 rounded-2xl p-6 sm:p-8 md:p-10">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={shouldAnimate ? { opacity: 0, scale: 0.8 } : false}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={shouldAnimate ? { opacity: 0, scale: 0.8 } : undefined}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={shouldAnimate ? { scale: 0 } : false}
                      animate={{ scale: 1 }}
                      transition={
                        shouldAnimate
                          ? { type: "spring", stiffness: 200, damping: 10 }
                          : undefined
                      }
                      className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-emerald-400"
                    >
                      <FaCheckCircle />
                    </motion.div>
                    <h3 className="font-display text-2xl font-bold text-zinc-100 mb-3">Message Sent!</h3>
                    <p className="text-zinc-400 text-sm">
                      Thanks for reaching out. I&apos;ll get back to you soon!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={shouldAnimate ? { opacity: 0 } : false}
                    animate={{ opacity: 1 }}
                    exit={shouldAnimate ? { opacity: 0 } : undefined}
                    className="space-y-5"
                    autoComplete="off"
                  >
                    <h2 className="font-display text-xl font-bold text-zinc-100 mb-6">Send a Message</h2>

                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="portfolio-company" className="hidden">
                        Company
                      </label>
                      <input
                        id="portfolio-company"
                        type="text"
                        name="honeypot"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.honeypot}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Name fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {nameFields.map((field) => (
                        <div key={field} className="relative">
                          <input
                            type="text"
                            name={field}
                            placeholder={field === "first" ? "First Name" : "Last Name"}
                            value={formData[field]}
                            onChange={handleChange}
                            onFocus={() => setFocusedField(field)}
                            onBlur={() => setFocusedField(null)}
                            className={inputClasses}
                            required
                          />
                          {focusedField === field && (
                            <motion.div
                              layoutId={shouldAnimate ? "inputFocus" : undefined}
                              className="absolute inset-0 border border-purple-500/30 rounded-xl pointer-events-none"
                              transition={
                                shouldAnimate
                                  ? { type: "spring", stiffness: 300, damping: 30 }
                                  : undefined
                              }
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Email field */}
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses}
                        required
                      />
                      {focusedField === "email" && (
                        <motion.div
                          layoutId={shouldAnimate ? "inputFocus" : undefined}
                          className="absolute inset-0 border border-purple-500/30 rounded-xl pointer-events-none"
                          transition={
                            shouldAnimate
                              ? { type: "spring", stiffness: 300, damping: 30 }
                              : undefined
                          }
                        />
                      )}
                    </div>

                    {/* Message field */}
                    <div className="relative">
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputClasses} resize-none`}
                        required
                        maxLength={500}
                      />
                      {focusedField === "message" && (
                        <motion.div
                          layoutId={shouldAnimate ? "inputFocus" : undefined}
                          className="absolute inset-0 border border-purple-500/30 rounded-xl pointer-events-none"
                          transition={
                            shouldAnimate
                              ? { type: "spring", stiffness: 300, damping: 30 }
                              : undefined
                          }
                        />
                      )}
                      <div className="absolute bottom-3 right-3 text-zinc-600 text-xs">
                        {formData.message.length} / 500
                      </div>
                    </div>

                    {error && (
                      <p className="text-sm text-red-400/80 text-center">
                        {error}
                      </p>
                    )}

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={
                        shouldAnimate
                          ? {
                              scale: 1.02,
                              y: -2,
                              transition: { duration: 0.12, ease: "easeOut" },
                            }
                          : undefined
                      }
                      whileTap={shouldAnimate ? { scale: 0.98 } : undefined}
                      className="w-full relative px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold overflow-hidden shadow-lg shadow-purple-600/15 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={shouldAnimate ? { rotate: 360 } : { rotate: 0 }}
                              transition={
                                shouldAnimate
                                  ? { duration: 1, repeat: Infinity, ease: "linear" }
                                  : undefined
                              }
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <span className="text-lg" aria-hidden>
                              <FiSend />
                            </span>
                          </>
                        )}
                      </span>
                      {shouldAnimate && (
                        <motion.div
                          className="absolute inset-0 bg-purple-500"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>

                    {/* Privacy note */}
                    <p className="text-zinc-600 text-xs text-center">
                      Your information is safe and will never be shared with third parties.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
