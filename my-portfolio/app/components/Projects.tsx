"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  status?: string;
};

const MOBILE_QUERY = "(max-width: 768px)";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia(MOBILE_QUERY);
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

  return isMobile;
}

const clientProjects: Project[] = [
  {
    id: 2,
    title: "Hills & Forest Information Technology Corporation",
    description:
      "A modern venture capital firm website built using Next.js for the frontend, powered by Firebase for database management and authentication. Styled with Tailwind CSS and enhanced by Framer Motion, it delivers a sleek, responsive design with fluid animations. The site includes a custom CMS dashboard for the admin and a blog system optimized for SEO.",
    tags: ["Next.js", "Firebase", "Tailwind", "Framer Motion"],
    link: "https://hillsandforestcorp.com",
    status: "Currently maintaining",
  },
  {
    id: 1,
    title: "KMJ Consultancy Inc.",
    description:
      "A modern consultancy firm website built using Next.js for the frontend, powered by Firebase for database management and authentication. Styled with Tailwind CSS and enhanced by Framer Motion, it delivers a sleek, responsive design with fluid animations. The site includes a custom CMS dashboard for the admin and a blog system optimized for SEO.",
    tags: ["Next.js", "Firebase", "Tailwind CSS", "Framer Motion"],
    link: "https://kmjconsultancyinc.com",
    status: "Currently maintaining",
  },
];

const personalProjects: Project[] = [
  {
    id: 3,
    title: "Vaultxd",
    description:
      "This is a personal project I’ve been developing for months — a music review platform inspired by Letterboxd, built with Next.js, Firebase, and Tailwind CSS. Designed to push my skills further and combine my passion for music and web development, the platform is set to launch in early 2026.",
    tags: ["Next.js", "Firebase", "API Integration", "Tailwind CSS", "Framer Motion"],
    link: "https://vaultxd.com",
    status: "In progress",
  },
];

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const cardTransition = useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0.18, ease: "linear" as const }
        : {
            duration: isMobile ? 0.28 : 0.35,
            ease: [0.4, 0, 0.2, 1] as const,
          },
    [prefersReducedMotion, isMobile]
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
    <section id="projects" className="relative py-24 md:py-32 bg-slate-950 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [180, 0, 180],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full text-purple-300 text-sm font-medium mb-4"
          >
            My Work
          </motion.span>
          
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Projects
          </h2>
          
          <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
            A collection of projects showcasing my expertise in full-stack development,
            design, and problem-solving
          </p>
        </motion.div>

        {/* Projects by category */}
        <div className="space-y-12 sm:space-y-16">
          {[{ title: "Client Work", items: clientProjects }, { title: "Personal Projects", items: personalProjects }].map(
            (section) => (
              <div key={section.title} className="space-y-8">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-left text-2xl font-semibold text-white"
                >
                  {section.title}
                </motion.h3>

                <div className="space-y-6">
                  {section.items.map((project, index) => (
                    <motion.a
                      key={project.id}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : isMobile ? 0 : index * 0.06,
                        ...(prefersReducedMotion
                          ? { duration: 0.2, ease: "linear" as const }
                          : isMobile
                          ? { duration: 0.2, ease: "easeOut" as const }
                          : cardTransition),
                      }}
                      whileHover={{
                        y: prefersReducedMotion ? -2 : isMobile ? 0 : -6,
                        scale: prefersReducedMotion ? 1 : isMobile ? 1 : 1.01,
                        transition: hoverTransition,
                      }}
                      className="group relative block bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-600/10 to-violet-600/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      <div className="relative p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6 mb-4">
                          <h4 className="text-xl sm:text-2xl font-bold text-white">{project.title}</h4>
                          <div className="inline-flex items-center gap-2 text-purple-400 font-medium">
                            Visit Site
                            <FiArrowUpRight className="text-lg" aria-hidden />
                          </div>
                        </div>

                        <p className="text-slate-400 text-sm sm:text-base mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 items-center">
                          {project.status && (
                            <motion.span
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: prefersReducedMotion ? 0.18 : isMobile ? 0.24 : 0.3,
                                ease: prefersReducedMotion ? "linear" : [0.4, 0, 0.2, 1],
                              }}
                              className="px-3 py-1 bg-purple-600/20 border border-purple-500/40 text-purple-300 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wide"
                            >
                              {project.status}
                            </motion.span>
                          )}
                          {project.tags.map((tag, i) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{
                                delay: prefersReducedMotion ? 0 : i * 0.03,
                                duration: prefersReducedMotion ? 0.18 : 0.22,
                                ease: prefersReducedMotion ? "linear" : [0.4, 0, 0.2, 1],
                              }}
                              className="px-3 py-1 bg-slate-800/80 border border-slate-700/50 rounded-lg text-xs sm:text-sm text-slate-300"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl blur-2xl"
            />
            <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Have a project in mind?
              </h3>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                Let&apos;s collaborate! Consult for a draft delivered within 1-2 days.
              </p>
              <motion.a
                href="/contact"
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  transition: { duration: 0.12, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all"
              >
                Contact Me
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
