"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion, isMobile]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(max-width: 768px)");
    const handler = (event?: MediaQueryListEvent) =>
      setIsMobile(event ? event.matches : media.matches);

    handler();
    if (media.addEventListener) {
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
    media.addListener(handler);
    return () => media.removeListener(handler);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, prefersReducedMotion || isMobile ? 1 : 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: prefersReducedMotion || isMobile ? 24 : 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [prefersReducedMotion || isMobile ? 1 : 1.2, 1, prefersReducedMotion || isMobile ? 1 : 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: prefersReducedMotion || isMobile ? 28 : 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 sm:px-8 py-16 sm:py-20 max-w-7xl mx-auto gap-10 lg:gap-12 w-full">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 max-w-2xl w-full text-center md:text-left"
        >
          <motion.div
            initial={prefersReducedMotion || isMobile ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: prefersReducedMotion ? 0.3 : 0.6 }}
            className="inline-block mb-4 px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full"
          >
            <span className="text-purple-300 text-sm font-medium">My Portfolio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 text-center md:text-left"
          >
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Gabriel Corgado
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 leading-relaxed text-center md:text-left"
          >
            Hi! I&apos;m Gabriel, a Full-Stack Engineer passionate about crafting clean, dynamic, and
            scalable web experiences that bring ideas to life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: prefersReducedMotion ? 0.4 : isMobile ? 0.5 : 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-stretch sm:items-center md:justify-start"
          >
            <motion.a
              href="/contact"
              whileHover={{
                scale: prefersReducedMotion ? 1.01 : isMobile ? 1.03 : 1.05,
                y: prefersReducedMotion ? -2 : isMobile ? -2 : -3,
                transition: { duration: prefersReducedMotion ? 0.1 : 0.12, ease: "easeOut" },
              }}
              whileTap={{ scale: prefersReducedMotion ? 0.995 : isMobile ? 0.985 : 0.97 }}
              className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-semibold overflow-hidden shadow-lg shadow-purple-500/50 transition-all text-center"
            >
              <span className="relative z-10">Let&apos;s Work Together</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.a
              href="#projects"
              whileHover={{
                scale: prefersReducedMotion ? 1.01 : isMobile ? 1.03 : 1.05,
                y: prefersReducedMotion ? -2 : isMobile ? -2 : -3,
                transition: { duration: prefersReducedMotion ? 0.1 : 0.12, ease: "easeOut" },
              }}
              whileTap={{ scale: prefersReducedMotion ? 0.995 : isMobile ? 0.985 : 0.97 }}
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-slate-200 border border-slate-700 rounded-xl font-semibold hover:bg-slate-800/80 transition-all text-center"
            >
              View My Work
            </motion.a>
          </motion.div>

          {/* Tech stack indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap justify-center md:justify-start gap-3 mt-10"
          >
            {["Next.js", "TypeScript", "Firebase", "Tailwind", "Node.js"].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg text-sm text-slate-300"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Image with effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="relative flex-shrink-0 w-full md:w-auto flex justify-center"
        >
          <motion.div
            animate={{
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="relative"
          >
            {/* Glowing ring effect */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 rounded-full opacity-75 blur-2xl"
            />
            
            {/* Profile image */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-slate-900 rounded-3xl" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <Image
                  src="/profile.jpg"
                  alt="Gabriel Corgado"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-4 -right-4 bg-slate-900 border-4 border-slate-950 rounded-2xl px-6 py-3 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-slate-200 font-semibold">Available for work</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-slate-400 text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-3 bg-purple-500 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
