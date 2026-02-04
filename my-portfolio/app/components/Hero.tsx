"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import useIsMobile from "../hooks/use-is-mobile";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const shouldAnimate = !prefersReducedMotion && !isMobile;

  useEffect(() => {
    if (!shouldAnimate) return;

    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 14,
        y: (e.clientY / window.innerHeight - 0.5) * 14,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldAnimate]);

  const fadeUp = useCallback(
    (delay = 0, distance = 20) =>
      shouldAnimate
        ? {
            initial: { opacity: 0, y: distance },
            animate: { opacity: 1, y: 0 },
            transition: { delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
          }
        : {
            initial: false,
            animate: { opacity: 1, y: 0 },
          },
    [shouldAnimate]
  );

  const hoverMotion = useCallback(
    (lift = 3) =>
      shouldAnimate
        ? {
            whileHover: {
              scale: isMobile ? 1.03 : 1.04,
              y: -lift,
              transition: { duration: 0.15, ease: "easeOut" as const },
            },
            whileTap: { scale: isMobile ? 0.985 : 0.97 },
          }
        : {},
    [isMobile, shouldAnimate]
  );

  return (
    <section className="grain relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Background — single radial gradient instead of floating orbs */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(139,92,246,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_80%_80%,rgba(168,85,247,0.08),transparent_60%)]" />
      </div>

      {/* Subtle grid pattern */}
      {shouldAnimate && (
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      )}

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 sm:px-8 py-16 sm:py-20 max-w-7xl mx-auto gap-12 lg:gap-16 w-full">
        <motion.div {...fadeUp(0.1, 30)} className="flex-1 max-w-2xl w-full text-center md:text-left">
          <motion.div
            {...fadeUp(0.2, 20)}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-500/6 border border-purple-500/12 rounded-full"
          >
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-300/80 text-xs font-medium uppercase tracking-widest">Portfolio</span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.3, 20)}
            className="text-5xl sm:text-6xl md:text-8xl font-bold leading-[0.95] mb-8 text-center md:text-left font-display tracking-tight"
          >
            <span className="bg-gradient-to-r from-purple-300 via-violet-200 to-fuchsia-300 bg-clip-text text-transparent animate-gradient-shift">
              Gabriel
            </span>
            <br />
            <span className="text-zinc-100">
              Corgado
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.4, 20)}
            className="text-base sm:text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed text-center md:text-left max-w-lg"
          >
            Full-Stack Engineer crafting clean, dynamic, and
            scalable web experiences that bring ideas to life.
          </motion.p>

          <motion.div
            {...fadeUp(0.5, 20)}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-stretch sm:items-center md:justify-start"
          >
            <motion.a
              href="/contact"
              {...hoverMotion(3)}
              className="group relative w-full sm:w-auto px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold overflow-hidden shadow-lg shadow-purple-600/20 transition-all text-center"
            >
              <span className="relative z-10">Let&apos;s Work Together</span>
              {shouldAnimate && (
                <motion.div
                  className="absolute inset-0 bg-purple-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.a>

            <motion.a
              href="#projects"
              {...hoverMotion(3)}
              className="w-full sm:w-auto px-8 py-4 bg-zinc-900/60 text-zinc-300 border border-zinc-800/60 rounded-xl font-semibold hover:bg-zinc-900/80 hover:border-zinc-700/60 transition-all text-center"
            >
              View My Work
            </motion.a>
          </motion.div>

          <motion.div
            {...fadeUp(0.6, 10)}
            className="flex flex-wrap justify-center md:justify-start gap-2 mt-12"
          >
            {["Next.js", "TypeScript", "Firebase", "Tailwind", "Node.js"].map((tech, i) => (
              <motion.span
                key={tech}
                {...(shouldAnimate
                  ? {
                      initial: { opacity: 0, scale: 0.8 },
                      animate: { opacity: 1, scale: 1 },
                      transition: { delay: 0.8 + i * 0.08 },
                    }
                  : {})}
                className="px-3 py-1.5 bg-zinc-900/50 border border-zinc-800/40 rounded-lg text-xs text-zinc-500 font-medium tracking-wide"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          {...fadeUp(0.4, 30)}
          className="relative flex-shrink-0 w-full md:w-auto flex justify-center"
        >
          <motion.div
            animate={
              shouldAnimate
                ? { x: mousePosition.x, y: mousePosition.y }
                : { x: 0, y: 0 }
            }
            transition={shouldAnimate ? { type: "spring", stiffness: 50, damping: 20 } : undefined}
            className="relative"
          >
            {/* Ambient glow behind image */}
            <div className="absolute -inset-8 bg-purple-600/15 rounded-full blur-3xl animate-glow-pulse" />

            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <div className="absolute -inset-px bg-gradient-to-br from-purple-500/30 via-transparent to-violet-500/30 rounded-3xl" />
              <div className="absolute inset-0 bg-zinc-950 rounded-3xl" />
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

            <motion.div
              {...(shouldAnimate
                ? {
                    initial: { opacity: 0, scale: 0 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { delay: 1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
                  }
                : {})}
              className="absolute -bottom-4 -right-4 bg-zinc-900 border border-zinc-800/60 rounded-xl px-5 py-2.5 shadow-xl shadow-zinc-950/50"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-zinc-300 text-sm font-medium">Available for work</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        {...fadeUp(1, 10)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={shouldAnimate ? { y: [0, 8, 0] } : { y: 0 }}
          transition={shouldAnimate ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : undefined}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-zinc-600 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 border border-zinc-700/50 rounded-full flex justify-center pt-1.5">
            <motion.div
              animate={shouldAnimate ? { y: [0, 10, 0] } : { y: 0 }}
              transition={shouldAnimate ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : undefined}
              className="w-1 h-2 bg-zinc-600 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
