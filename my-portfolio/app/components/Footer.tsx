"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";
import type { IconType } from "react-icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks: Array<{ name: string; icon: IconType; url: string }> = [
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/john-gabriel-corgado-112417230/",
    },
    {
      name: "Gmail",
      icon: FaEnvelope,
      url: "mailto:gabrielcorgado@gmail.com",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative bg-zinc-950 border-t border-zinc-800/30 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(139,92,246,0.06),transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Main footer content */}
        <div className="py-14 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="font-display text-2xl font-bold text-zinc-100 tracking-tight">
              Gabriel Corgado
            </span>
            <p className="text-zinc-500 leading-relaxed text-sm">
              Crafting beautiful, functional web experiences with modern technologies and creative solutions.
            </p>
            <div className="flex items-center gap-2 text-zinc-500">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs">Available for freelance work</span>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="font-display text-sm font-bold text-zinc-300 uppercase tracking-widest mb-6">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ x: 4, color: "#c4b5fd" }}
                  className="block text-zinc-500 hover:text-purple-300 transition-colors text-sm"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Connect section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="font-display text-sm font-bold text-zinc-300 uppercase tracking-widest mb-6">Let&apos;s Connect</h3>
            <p className="text-zinc-500 mb-4 text-sm">
              Follow me on social media or reach out directly
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  whileHover={{
                    scale: 1.06,
                    y: -3,
                    transition: { duration: 0.12, ease: "easeOut" },
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative"
                >
                  <div className="relative flex items-center gap-2 px-4 py-2.5 bg-zinc-900/50 border border-zinc-800/40 rounded-lg hover:border-purple-500/20 transition-all">
                    <social.icon className="text-lg text-zinc-500 group-hover:text-purple-300 transition-colors" aria-hidden />
                    <span className="text-zinc-400 text-sm font-medium group-hover:text-zinc-200 transition-colors">
                      {social.name}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-zinc-800/50 to-transparent"
        />

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="py-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-zinc-600 text-xs">
            &copy; {currentYear} John Gabriel Corgado. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs">
            <motion.a
              href="/privacy"
              whileHover={{
                y: -2,
                color: "#c4b5fd",
                transition: { duration: 0.12, ease: "easeOut" },
              }}
              className="text-zinc-600 hover:text-purple-300 transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="/terms"
              whileHover={{
                y: -2,
                color: "#c4b5fd",
                transition: { duration: 0.12, ease: "easeOut" },
              }}
              className="text-zinc-600 hover:text-purple-300 transition-colors"
            >
              Terms of Service
            </motion.a>
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{
              scale: 1.04,
              y: -3,
              transition: { duration: 0.12, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center gap-2 px-3 py-2 bg-zinc-900/50 border border-zinc-800/40 rounded-lg text-zinc-500 hover:text-zinc-300 hover:border-purple-500/20 transition-all group"
          >
            <span className="text-xs font-medium">Top</span>
            <FiArrowUp className="text-sm" aria-hidden />
          </motion.button>
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="pb-8 text-center"
        >
          <p className="text-zinc-700 text-[10px] uppercase tracking-widest">
            Gabriel Corgado &middot; Proudly Made in MNL
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
