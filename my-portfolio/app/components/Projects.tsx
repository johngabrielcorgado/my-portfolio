"use client";

import { useCallback, useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
  type TargetAndTransition,
  type VariantLabels,
} from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import useIsMobile from "../hooks/use-is-mobile";

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  status?: string;
};

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
    tags: ["Vue.js", "Supabase", "Tailwind CSS", "Framer Motion", "ShadCN UI", "API Integration"],
    link: "https://vaultxd.com",
    status: "In progress",
  },
];

export default function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const isAnimatedDesktop = !prefersReducedMotion && !isMobile;
  const revealSpring = useMemo(
    () => ({
      type: "spring" as const,
      stiffness: 280,
      damping: 26,
      mass: 0.8,
    }),
    []
  );
  const getCardTransition = useCallback(
    (index: number): Transition =>
      isAnimatedDesktop
        ? {
            ...revealSpring,
            delay: index * 0.06,
          }
        : { duration: 0.28, ease: "easeOut" as const },
    [isAnimatedDesktop, revealSpring]
  );
  const hoverMotion = useMemo(() => {
    if (!isAnimatedDesktop) return undefined;
    return {
      y: -6,
      scale: 1.02,
      transition: { duration: 0.12, ease: "easeOut" as const },
    };
  }, [isAnimatedDesktop]);
  const projectInitial = useMemo(() => {
    if (!isAnimatedDesktop) return false;
    return { opacity: 0, y: 16 };
  }, [isAnimatedDesktop]);
  const projectReveal = useMemo(
    () => (isAnimatedDesktop ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }),
    [isAnimatedDesktop]
  );
  const shouldAnimateBackground = isAnimatedDesktop;

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-slate-950 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {shouldAnimateBackground ? (
          <>
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1.3, 1, 1.3], rotate: [180, 0, 180] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"
            />
          </>
        ) : (
          <>
            <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl" />
          </>
        )}
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
        <div className="space-y-10 sm:space-y-16">
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

                <div className="space-y-6 sm:space-y-8">
                  {section.items.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      isAnimatedDesktop={isAnimatedDesktop}
                      prefersReducedMotion={Boolean(prefersReducedMotion)}
                      projectInitial={projectInitial}
                      projectReveal={projectReveal}
                      getCardTransition={getCardTransition}
                      hoverMotion={hoverMotion}
                      revealSpring={revealSpring}
                    />
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

type ProjectCardProps = {
  project: Project;
  index: number;
  isAnimatedDesktop: boolean;
  prefersReducedMotion: boolean;
  projectInitial: false | TargetAndTransition;
  projectReveal: TargetAndTransition;
  getCardTransition: (index: number) => Transition;
  hoverMotion: TargetAndTransition | VariantLabels | undefined;
  revealSpring: Transition;
};

function ProjectCard({
  project,
  index,
  isAnimatedDesktop,
  prefersReducedMotion,
  projectInitial,
  projectReveal,
  getCardTransition,
  hoverMotion,
  revealSpring,
}: ProjectCardProps) {
  if (isAnimatedDesktop) {
    return (
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        initial={projectInitial}
        whileInView={projectReveal}
        viewport={{ once: true, amount: 0.25, margin: "-10% 0px -10% 0px" }}
        transition={getCardTransition(index)}
        whileHover={hoverMotion}
        className="group relative block bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-600/10 to-violet-600/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <DesktopCardContent project={project} revealSpring={revealSpring} />
      </motion.a>
    );
  }

  return (
    <MobileProjectCard
      project={project}
      index={index}
      prefersReducedMotion={prefersReducedMotion}
    />
  );
}

function DesktopCardContent({
  project,
  revealSpring,
}: {
  project: Project;
  revealSpring: Transition;
}) {
  return (
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
            transition={{ ...revealSpring, delay: 0.08 }}
            className="px-3 py-1 bg-purple-600/20 border border-purple-500/40 text-purple-300 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wide"
          >
            {project.status}
          </motion.span>
        )}
        {project.tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...revealSpring, delay: 0.12 + i * 0.04 }}
            className="px-3 py-1 bg-slate-800/80 border border-slate-700/50 rounded-lg text-xs sm:text-sm text-slate-300"
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function MobileProjectCard({
  project,
  index,
  prefersReducedMotion,
}: {
  project: Project;
  index: number;
  prefersReducedMotion: boolean;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const animate = !prefersReducedMotion;
  const visibilityClass = animate
    ? isInView
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-4"
    : "";
  const cardDelay = animate ? { transitionDelay: `${index * 60}ms` } : undefined;

  return (
    <a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500/50 transform-gpu transition-all duration-300 ease-out ${visibilityClass}`}
      style={cardDelay}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-600/10 to-violet-600/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <div className="relative p-5 sm:p-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-lg font-semibold text-white">{project.title}</h4>
            <div className="inline-flex items-center gap-2 text-purple-300 text-sm font-medium">
              Visit
              <FiArrowUpRight className="text-base" aria-hidden />
            </div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.status && (
            <span
              className={`px-2.5 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-[11px] uppercase tracking-wide text-purple-300/90 transition-all duration-300 ease-out ${animate ? (isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2") : ""}`}
              style={animate ? { transitionDelay: `${80 + index * 40}ms` } : undefined}
            >
              {project.status}
            </span>
          )}
          {project.tags.map((tag, i) => (
            <span
              key={tag}
              className={`px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700/50 text-[11px] text-slate-300 transition-all duration-300 ease-out ${animate ? (isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2") : ""}`}
              style={animate ? { transitionDelay: `${120 + index * 40 + i * 30}ms` } : undefined}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
