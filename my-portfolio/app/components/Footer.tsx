"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";
import type { IconType } from "react-icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks: Array<{ name: string; icon: IconType; url: string; color: string }> = [
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/john-gabriel-corgado-112417230/",
      color: "from-blue-600 to-blue-400",
    },

    {
      name: "Gmail",
      icon: FaEnvelope,
      url: "mailto:gabrielcorgado@gmail.com",
      color: "from-purple-600 to-violet-600",
    },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/50 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"
        />
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
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Gabriel Corgado
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Crafting beautiful, functional web experiences with modern technologies and creative solutions.
            </p>
            <div className="flex items-center gap-2 text-slate-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm">Available for freelance work</span>
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
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ x: 5, color: '#a78bfa' }}
                  className="block text-slate-400 hover:text-purple-400 transition-colors"
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
            <h3 className="text-white font-bold text-lg mb-6">Let&apos;s Connect</h3>
            <p className="text-slate-400 mb-4">
              Follow me on social media or reach out directly
            </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                  scale: 1.04,
                  y: -4,
                  transition: { duration: 0.12, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.97 }}
                className="group relative"
              >
                  <div className={`absolute inset-0 bg-gradient-to-r ${social.color} rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
                  <div className="relative flex items-center gap-2 px-4 py-3 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl hover:border-purple-500/50 transition-all">
                    <social.icon className="text-xl text-purple-300" aria-hidden />
                    <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
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
          className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
        />

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="py-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-slate-500 text-sm">
            © {currentYear} John Gabriel Corgado. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-sm">
            <motion.a
              href="/privacy"
              whileHover={{
                y: -3,
                color: '#a78bfa',
                transition: { duration: 0.12, ease: "easeOut" },
              }}
              className="text-slate-500 hover:text-purple-400 transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="/terms"
              whileHover={{
                y: -3,
                color: '#a78bfa',
                transition: { duration: 0.12, ease: "easeOut" },
              }}
              className="text-slate-500 hover:text-purple-400 transition-colors"
            >
              Terms of Service
            </motion.a>
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{
              scale: 1.06,
              y: -4,
              transition: { duration: 0.12, ease: "easeOut" },
            }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl text-slate-300 hover:text-white hover:border-purple-500/50 transition-all group"
          >
            <span className="text-sm font-medium">Back to Top</span>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-lg"
              aria-hidden
            >
              <FiArrowUp />
            </motion.span>
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
          <p className="text-slate-600 text-xs">
            Gabriel Corgado | Proudly Made in MNL
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
