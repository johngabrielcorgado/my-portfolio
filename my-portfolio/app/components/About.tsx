"use client";
import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FiPenTool, FiServer, FiSmartphone, FiZap } from "react-icons/fi";
import useIsMobile from "../hooks/use-is-mobile";

const techStack = [
  { name: "Next.js", category: "Frontend" },
  { name: "Vue.js", category: "Frontend" },
  { name: "Vite.js", category: "Build Tool" },
  { name: "Firebase", category: "Backend" },
  { name: "Supabase", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "MongoDB", category: "Database" },
  { name: "SQL", category: "Database" },
  { name: "Claude Code", category: "Artificial Intelligence" },
  { name: "Codex", category: "Artificial Intelligence" },
  { name: "Gemini Pro", category: "Artificial Intelligence" },
];

const skills = [
  { title: "Full-Stack Development", percentage: 100, color: "from-purple-500 to-violet-500" },
  { title: "UI/UX Design", percentage: 90, color: "from-violet-500 to-fuchsia-500" },
];

const capabilities = [
  { icon: <FiPenTool />, title: "UI/UX Design", desc: "Beautiful interfaces" },
  { icon: <FiServer />, title: "Backend Dev", desc: "Robust systems" },
  { icon: <FiSmartphone />, title: "Responsive", desc: "Mobile-first" },
  { icon: <FiZap />, title: "Performance", desc: "Optimized speed" },
];

export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const revealTransition = useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0.18, ease: "linear" as const }
        : { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
    [prefersReducedMotion]
  );
  const hoverTransition = useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0.1, ease: "linear" as const }
        : {
            duration: isMobile ? 0.1 : 0.12,
            ease: "easeOut" as const,
          },
    [prefersReducedMotion, isMobile]
  );

  const techCategories = useMemo(() => {
    const grouped: Record<string, string[]> = {};
    for (const t of techStack) {
      (grouped[t.category] ??= []).push(t.name);
    }
    return Object.entries(grouped);
  }, []);

  return (
    <section id="about" className="relative py-24 md:py-32 bg-zinc-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_50%,rgba(139,92,246,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_80%,rgba(168,85,247,0.06),transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0.2 } : { duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/6 border border-purple-500/12 rounded-full text-xs font-medium uppercase tracking-widest text-purple-300/80 mb-4"
          >
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
            Get to know me
          </motion.span>

          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-6 tracking-tight text-zinc-100">
            About Me
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            I specialize in building modern, high-performance web applications
            using the latest technologies across the full stack. Passionate about creating
            seamless user experiences and scalable solutions.
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 mb-16 md:mb-20">
          {/* Left column - Skills */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0.2 } : { duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-2xl p-6 sm:p-8">
              <h3 className="font-display text-2xl font-bold text-zinc-100 mb-6 flex items-center gap-3">
                <span className="text-2xl text-purple-400" aria-hidden>
                  <HiOutlineLightBulb />
                </span>
                Expertise
              </h3>

              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.title}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : index * 0.08,
                      ...(prefersReducedMotion
                        ? revealTransition
                        : {
                            duration: isMobile ? 0.4 : revealTransition.duration,
                            ease: revealTransition.ease,
                          }),
                    }}
                  >
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="text-zinc-300 font-medium text-sm">{skill.title}</span>
                      <span className="text-purple-400 font-semibold text-sm">{skill.percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800/60 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{
                          delay: prefersReducedMotion ? 0 : index * 0.08 + 0.2,
                          duration: prefersReducedMotion
                            ? 0.45
                            : isMobile
                            ? 0.7
                            : 1,
                          ease: "easeOut",
                        }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { number: "2+", label: "Projects Completed" },
                { number: "3+", label: "Years Experience" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : index * 0.08 + 0.2,
                    duration: prefersReducedMotion ? 0.2 : isMobile ? 0.3 : 0.4,
                    ease: prefersReducedMotion ? "linear" : [0.4, 0, 0.2, 1],
                  }}
                  whileHover={{
                    y: prefersReducedMotion ? -2 : isMobile ? -3 : -5,
                    scale: prefersReducedMotion ? 1.01 : isMobile ? 1.01 : 1.02,
                    transition: hoverTransition,
                  }}
                  className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-6 text-center"
                >
                  <div className="font-display text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-zinc-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column - About text and features */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0.2 } : { duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-2xl p-6 sm:p-8">
              <h3 className="font-display text-2xl font-bold text-zinc-100 mb-4">My Journey</h3>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  With a passion for technology and problem-solving, I&apos;ve dedicated myself to mastering
                  the art of full-stack development. Every project is an opportunity to learn, innovate,
                  and push the boundaries of what&apos;s possible on the web.
                </p>
                <p>
                  I believe in writing clean, maintainable code and creating intuitive user experiences
                  that make a difference. Whether it&apos;s a complex web application or a sleek landing page,
                  I approach each challenge with enthusiasm and attention to detail.
                </p>
              </div>
            </div>

            {/* What I do cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {capabilities.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : index * 0.06,
                    duration: prefersReducedMotion ? 0.2 : isMobile ? 0.24 : 0.3,
                    ease: prefersReducedMotion ? "linear" : [0.4, 0, 0.2, 1],
                  }}
                  whileHover={{
                    y: prefersReducedMotion ? -3 : isMobile ? -4 : -5,
                    scale: prefersReducedMotion ? 1.01 : isMobile ? 1.02 : 1.03,
                    transition: hoverTransition,
                  }}
                  className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-4 sm:p-5 text-center group"
                >
                  <div className="text-2xl text-purple-400/70 mb-2 group-hover:text-purple-300 transition-colors" aria-hidden>
                    {item.icon}
                  </div>
                  <div className="text-zinc-200 font-semibold text-sm mb-1">{item.title}</div>
                  <div className="text-zinc-500 text-xs">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tech stack section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-zinc-100 mb-4 tracking-tight">
            Technologies I Work With
          </h3>
          <p className="text-zinc-500 mb-10 text-sm">
            Constantly learning and adapting to the latest industry standards
          </p>

          <div className="space-y-8">
            {techCategories.map(([category, techs]) => (
              <div key={category}>
                <p className="text-xs uppercase tracking-widest text-zinc-600 mb-3">{category}</p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                  {techs.map((name, index) => (
                    <motion.div
                      key={name}
                      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85, y: 12 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : index * 0.04,
                        duration: prefersReducedMotion ? 0.18 : isMobile ? 0.26 : 0.32,
                        ease: prefersReducedMotion ? "linear" : [0.4, 0, 0.2, 1],
                      }}
                      whileHover={{
                        y: prefersReducedMotion ? -3 : isMobile ? -4 : -6,
                        scale: prefersReducedMotion ? 1.02 : isMobile ? 1.04 : 1.06,
                        transition: hoverTransition,
                      }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-purple-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative px-5 py-2.5 bg-zinc-900/50 border border-zinc-800/40 rounded-lg hover:border-purple-500/30 transition-all duration-300">
                        <span className="text-zinc-300 font-medium text-sm">{name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
