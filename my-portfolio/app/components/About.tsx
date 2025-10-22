"use client";
import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FiPenTool, FiServer, FiSmartphone, FiZap } from "react-icons/fi";
import useIsMobile from "../hooks/use-is-mobile";

const techStack = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend"},
  { name: "Vue.js", category: "Frontend" },
  { name: "Vite.js", category: "Build Tool"},
  { name: "Express.js", category: "Backend"},
  { name: "Node.js", category: "Backend" },
  { name: "MongoDB", category: "Database"},
  { name: "SQL", category: "Database"},
  { name: "Firebase", category: "Backend"},
  { name: "Supabase", category: "Backend"},
];

const skills = [
  { title: "Full-Stack Development", percentage: 100, color: "from-purple-600 to-violet-600" },
  { title: "UI/UX Design", percentage: 90, color: "from-violet-600 to-purple-600" },
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
  return (
    <section id="about" className="relative py-24 md:py-32 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"
        />
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
            className="inline-block px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-4"
          >
            Get to know me
          </motion.span>
          
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            About Me
          </h2>
          
          <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
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
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-3xl text-purple-400" aria-hidden>
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
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300 font-medium">{skill.title}</span>
                      <span className="text-purple-400 font-semibold">{skill.percentage}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
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
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
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
                    y: prefersReducedMotion ? -2 : isMobile ? -3 : -6,
                    scale: prefersReducedMotion ? 1.01 : isMobile ? 1.01 : 1.02,
                    transition: hoverTransition,
                  }}
                  className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center"
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
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
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-white mb-4">My Journey</h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    y: prefersReducedMotion ? -3 : isMobile ? -4 : -6,
                    scale: prefersReducedMotion ? 1.01 : isMobile ? 1.02 : 1.03,
                    transition: hoverTransition,
                  }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 sm:p-5 text-center"
                >
                  <div className="text-3xl text-purple-300 mb-2" aria-hidden>
                    {item.icon}
                  </div>
                  <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                  <div className="text-slate-400 text-xs">{item.desc}</div>
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
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Technologies I Work With
          </h3>
          <p className="text-slate-400 mb-10">
            Constantly learning and adapting to the latest industry standards
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85, y: 18 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : index * 0.04,
                  duration: prefersReducedMotion ? 0.18 : isMobile ? 0.26 : 0.32,
                  ease: prefersReducedMotion ? "linear" : [0.4, 0, 0.2, 1],
                }}
                whileHover={{
                  y: prefersReducedMotion ? -4 : isMobile ? -5 : -8,
                  scale: prefersReducedMotion ? 1.02 : isMobile ? 1.05 : 1.08,
                  transition: hoverTransition,
                }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                <div className="relative px-6 py-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <div className="text-left">
                      <div className="text-white font-semibold">{tech.name}</div>
                      <div className="text-slate-500 text-xs">{tech.category}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
