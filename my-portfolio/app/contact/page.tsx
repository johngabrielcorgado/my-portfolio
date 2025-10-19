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

  return (
    <section className="relative min-h-screen py-24 md:py-32 bg-slate-950 overflow-hidden">
      {/* Background effects */}
      {shouldAnimate && (
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left column - Info */}
          <motion.div
            initial={shouldAnimate ? { opacity: 0, x: -40 } : false}
            animate={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
            transition={shouldAnimate ? { duration: 0.6 } : undefined}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <motion.span
                initial={shouldAnimate ? { opacity: 0, scale: 0.9 } : false}
                animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
                transition={shouldAnimate ? { duration: 0.5 } : undefined}
                className="inline-block px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-4"
              >
                Get in Touch
              </motion.span>
              
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Let&apos;s Connect
              </h1>
              
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
                Have a project in mind or just want to chat about web development? 
                I&apos;d love to hear from you. Fill out the form and I&apos;ll get back to you 
                as soon as possible.
              </p>
            </div>

            {/* Contact methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  initial={shouldAnimate ? { opacity: 0, x: -18 } : false}
                  animate={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
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
                          x: isMobile ? 4 : 8,
                          scale: isMobile ? 1.01 : 1.02,
                          transition: { duration: 0.12, ease: "easeOut" },
                        }
                      : undefined
                  }
                  className="flex items-center gap-4 p-4 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl hover:border-purple-500/50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow">
                    <span className="text-xl" aria-hidden>
                      {method.icon}
                    </span>
                  </div>
                  <div>
                    <div className="text-slate-500 text-sm">{method.label}</div>
                    <div className="text-white font-medium">{method.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>


            {/* Availability indicator */}
            <motion.div
              initial={shouldAnimate ? { opacity: 0 } : false}
              animate={shouldAnimate ? { opacity: 1 } : undefined}
              transition={shouldAnimate ? { delay: 0.5 } : undefined}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/20 rounded-xl"
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm font-medium">
                Currently available for new projects
              </span>
            </motion.div>
          </motion.div>

          {/* Right column - Form */}
          <motion.div
            initial={shouldAnimate ? { opacity: 0, x: 40 } : false}
            animate={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
            transition={shouldAnimate ? { duration: 0.6 } : undefined}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-violet-600/20 rounded-3xl blur-2xl" />
            
            <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 sm:p-8 md:p-10">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={shouldAnimate ? { opacity: 0, scale: 0.8 } : false}
                    animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
                    exit={shouldAnimate ? { opacity: 0, scale: 0.8 } : undefined}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={shouldAnimate ? { scale: 0 } : false}
                      animate={shouldAnimate ? { scale: 1 } : undefined}
                      transition={
                        shouldAnimate
                          ? { type: "spring", stiffness: 200, damping: 10 }
                          : undefined
                      }
                      className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-white"
                    >
                      <FaCheckCircle />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                    <p className="text-slate-400">
                      Thanks for reaching out. I&apos;ll get back to you soon!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={shouldAnimate ? { opacity: 0 } : false}
                    animate={shouldAnimate ? { opacity: 1 } : undefined}
                    exit={shouldAnimate ? { opacity: 0 } : undefined}
                    className="space-y-6"
                    autoComplete="off"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>

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
                      <motion.input
                        type="text"
                        name={field}
                        placeholder={field === 'first' ? 'First Name' : 'Last Name'}
                        value={formData[field]}
                            onChange={handleChange}
                            onFocus={() => setFocusedField(field)}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
                            required
                            animate={
                              shouldAnimate
                                ? {
                                    scale: focusedField === field ? 1.02 : 1,
                                  }
                                : undefined
                            }
                          />
                          {focusedField === field && (
                            <motion.div
                              layoutId={shouldAnimate ? "inputFocus" : undefined}
                              className="absolute inset-0 border-2 border-purple-500 rounded-xl pointer-events-none"
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
                      <motion.input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
                        required
                        animate={
                          shouldAnimate
                            ? {
                                scale: focusedField === 'email' ? 1.02 : 1,
                              }
                            : undefined
                        }
                      />
                      {focusedField === 'email' && (
                        <motion.div
                          layoutId={shouldAnimate ? "inputFocus" : undefined}
                          className="absolute inset-0 border-2 border-purple-500 rounded-xl pointer-events-none"
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
                      <motion.textarea
                        name="message"
                        placeholder="Your Message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all resize-none"
                        required
                        maxLength={500}
                        animate={
                          shouldAnimate
                            ? {
                                scale: focusedField === 'message' ? 1.02 : 1,
                              }
                            : undefined
                        }
                      />
                      {focusedField === 'message' && (
                        <motion.div
                          layoutId={shouldAnimate ? "inputFocus" : undefined}
                          className="absolute inset-0 border-2 border-purple-500 rounded-xl pointer-events-none"
                          transition={
                            shouldAnimate
                              ? { type: "spring", stiffness: 300, damping: 30 }
                              : undefined
                          }
                        />
                      )}
                      <div className="absolute bottom-3 right-3 text-slate-500 text-xs">
                        {formData.message.length} / 500
                      </div>
                    </div>

                    {error && (
                      <p className="text-sm text-red-400 text-center">
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
                              scale: 1.03,
                              y: -3,
                              transition: { duration: 0.12, ease: "easeOut" },
                            }
                          : undefined
                      }
                      whileTap={shouldAnimate ? { scale: 0.97 } : undefined}
                      className="w-full relative px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-semibold overflow-hidden shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed group"
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
                          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>

                    {/* Privacy note */}
                    <p className="text-slate-500 text-xs text-center">
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
