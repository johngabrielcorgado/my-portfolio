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
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
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
            transition: { delay, duration: 0.6, ease: "easeOut" as const },
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
              scale: isMobile ? 1.03 : 1.05,
              y: -lift,
              transition: { duration: 0.12, ease: "easeOut" as const },
            },
            whileTap: { scale: isMobile ? 0.985 : 0.97 },
          }
        : {},
    [isMobile, shouldAnimate]
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {shouldAnimate && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 sm:px-8 py-16 sm:py-20 max-w-7xl mx-auto gap-10 lg:gap-12 w-full">
        <motion.div {...fadeUp(0.1, 30)} className="flex-1 max-w-2xl w-full text-center md:text-left">
          <motion.div
            {...fadeUp(0.2, 20)}
            className="inline-block mb-4 px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full"
          >
            <span className="text-purple-300 text-sm font-medium">My Portfolio</span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.3, 20)}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 text-center md:text-left"
          >
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Gabriel Corgado
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.4, 20)}
            className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 leading-relaxed text-center md:text-left"
          >
            Hi! I&apos;m Gabriel, a Full-Stack Engineer passionate about crafting clean, dynamic, and
            scalable web experiences that bring ideas to life.
          </motion.p>

          <motion.div
            {...fadeUp(0.5, 20)}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-stretch sm:items-center md:justify-start"
          >
            <motion.a
              href="/contact"
              {...hoverMotion(3)}
              className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-semibold overflow-hidden shadow-lg shadow-purple-500/50 transition-all text-center"
            >
              <span className="relative z-10">Let&apos;s Work Together</span>
              {shouldAnimate && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.a>

            <motion.a
              href="#projects"
              {...hoverMotion(3)}
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-slate-200 border border-slate-700 rounded-xl font-semibold hover:bg-slate-800/80 transition-all text-center"
            >
              View My Work
            </motion.a>
          </motion.div>

          <motion.div
            {...fadeUp(0.6, 10)}
            className="flex flex-wrap justify-center md:justify-start gap-3 mt-10"
          >
            {["Next.js", "TypeScript", "Firebase", "Tailwind", "Node.js"].map((tech, i) => (
              <motion.span
                key={tech}
                {...(shouldAnimate
                  ? {
                      initial: { opacity: 0, scale: 0.8 },
                      animate: { opacity: 1, scale: 1 },
                      transition: { delay: 0.8 + i * 0.1 },
                    }
                  : {})}
                className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg text-sm text-slate-300"
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
            <motion.div
              animate={shouldAnimate ? { rotate: 360 } : { rotate: 0 }}
              transition={shouldAnimate ? { duration: 20, repeat: Infinity, ease: "linear" } : undefined}
              className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 rounded-full opacity-75 blur-2xl"
            />

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

            <motion.div
              {...(shouldAnimate
                ? {
                    initial: { opacity: 0, scale: 0 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { delay: 1, duration: 0.5 },
                  }
                : {})}
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

      <motion.div
        {...fadeUp(1, 10)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={shouldAnimate ? { y: [0, 10, 0] } : { y: 0 }}
          transition={shouldAnimate ? { duration: 2, repeat: Infinity } : undefined}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-slate-400 text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
            <motion.div
              animate={shouldAnimate ? { y: [0, 12, 0] } : { y: 0 }}
              transition={shouldAnimate ? { duration: 2, repeat: Infinity } : undefined}
              className="w-1 h-3 bg-slate-400 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
