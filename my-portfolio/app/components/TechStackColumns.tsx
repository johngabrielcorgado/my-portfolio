"use client";

import React, { useRef, useCallback, useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import {
  SiNextdotjs,
  SiNuxtdotjs,
  SiNestjs,
  SiTailwindcss,
  SiFramer,
  SiGreensock,
  SiFirebase,
  SiSupabase,
  SiExpress,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiOpenai,
  SiAnthropic,
  SiGooglegemini,
} from "react-icons/si";
import useIsMobile from "../hooks/use-is-mobile";

const techStack = [
  { name: "MongoDB", category: "Database" },
  { name: "SQL", category: "Database" },
  { name: "Firebase", category: "Backend" },
  { name: "Supabase", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "Nest.js", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Nuxt.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Libraries" },
  { name: "Framer Motion", category: "Libraries" },
  { name: "GSAP", category: "Libraries" },
  { name: "Claude Code", category: "AI" },
  { name: "Codex", category: "AI" },
  { name: "Gemini Pro", category: "AI" },
];

type IconComponent = React.ComponentType<{ className?: string }>;

const TECH_INFO: Record<string, { icon: IconComponent; color: string }> = {
  "Next.js":     { icon: SiNextdotjs,    color: "#ffffff" },
  "Nuxt.js":     { icon: SiNuxtdotjs,    color: "#00DC82" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Framer Motion": { icon: SiFramer,    color: "#0055FF" },
  "GSAP":         { icon: SiGreensock,  color: "#88CE02" },
  "Firebase":    { icon: SiFirebase,     color: "#FFCA28" },
  "Supabase":    { icon: SiSupabase,     color: "#3FCF8E" },
  "Express.js":  { icon: SiExpress,      color: "#ffffff" },
  "Nest.js":     { icon: SiNestjs,       color: "#E0234E" },
  "Node.js":     { icon: SiNodedotjs,    color: "#5FA04E" },
  "MongoDB":     { icon: SiMongodb,      color: "#47A248" },
  "SQL":         { icon: SiPostgresql,   color: "#4169E1" },
  "Claude Code": { icon: SiAnthropic,    color: "#D97757" },
  "Codex":       { icon: SiOpenai,       color: "#ffffff" },
  "Gemini Pro":  { icon: SiGooglegemini, color: "#8E75B2" },
};

export default function TechStackColumns() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const collapsedRefs = useRef<(HTMLDivElement | null)[]>([]);
  const expandedRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeTl = useRef<gsap.core.Timeline | null>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobilePanelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileCollapsedRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileExpandedRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileActiveTl = useRef<gsap.core.Timeline | null>(null);
  const mobileActiveIndex = useRef<number | null>(null);

  // Cached DOM queries — populated once in useGSAP, reused in handlers
  const expandedItemsCache = useRef<Element[][]>([]);
  const mobileExpandedItemsCache = useRef<Element[][]>([]);

  const techCategories = useMemo(() => {
    const grouped: Record<string, string[]> = {};
    for (const t of techStack) {
      (grouped[t.category] ??= []).push(t.name);
    }
    return Object.entries(grouped);
  }, []);

  useGSAP(
    () => {
      // Heading scroll animation
      if (headingRef.current && descRef.current) {
        if (prefersReducedMotion) {
          gsap.set([headingRef.current, descRef.current], { opacity: 1, y: 0 });
        } else {
          const headingTl = gsap.timeline({
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 90%",
              end: "top 40%",
              scrub: 0.8,
            },
          });
          headingTl
            .fromTo(headingRef.current, { x: -200, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1, ease: "none" })
            .fromTo(descRef.current, { x: -100, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.8, ease: "none" }, 0.3);
        }
      }

      if (isMobile) {
        // Mobile: cache items and set initial state
        mobileExpandedItemsCache.current = [];
        mobileExpandedRefs.current.forEach((el, i) => {
          if (el) {
            gsap.set(el, { height: 0, autoAlpha: 0 });
            const items = Array.from(el.querySelectorAll("[data-tech-item]"));
            mobileExpandedItemsCache.current[i] = items;
            gsap.set(items, { x: -20, autoAlpha: 0 });
          }
        });
        return;
      }

      if (!containerRef.current) return;

      // Desktop: cache items and set initial state
      expandedItemsCache.current = [];
      expandedRefs.current.forEach((el, i) => {
        if (el) {
          gsap.set(el, { autoAlpha: 0 });
          const items = Array.from(el.querySelectorAll("[data-tech-item]"));
          expandedItemsCache.current[i] = items;
          gsap.set(items, { y: 20, autoAlpha: 0 });
        }
      });
    },
    { dependencies: [isMobile] }
  );

  // Build grid-template-columns string: one fr value per panel
  const buildGridCols = useCallback(
    (activeIndex: number | null) => {
      const count = techCategories.length;
      if (activeIndex === null) return Array(count).fill("1fr").join(" ");
      return Array.from({ length: count }, (_, i) => (i === activeIndex ? "3.5fr" : "0.4fr")).join(" ");
    },
    [techCategories.length]
  );

  const handleMouseEnter = useCallback(
    (index: number) => {
      if (isMobile || !containerRef.current) return;

      if (activeTl.current) {
        activeTl.current.kill();
      }

      const duration = prefersReducedMotion ? 0.01 : 0.45;
      const ease = prefersReducedMotion ? "none" : "power3.out";

      const tl = gsap.timeline();

      // Single container tween for layout (1 layout trigger per frame instead of 5)
      tl.to(containerRef.current, {
        gridTemplateColumns: buildGridCols(index),
        duration,
        ease,
      }, 0);

      // Fade out collapsed content of hovered panel, fade in for others
      collapsedRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.to(el, { autoAlpha: i === index ? 0 : 1, duration: duration * 0.4, force3D: true }, 0);
      });

      // Fade in expanded content of hovered, hide others
      expandedRefs.current.forEach((el, i) => {
        if (!el) return;
        const items = expandedItemsCache.current[i] ?? [];
        if (i === index) {
          tl.to(el, { autoAlpha: 1, duration: duration * 0.5, force3D: true }, duration * 0.25);
          if (!prefersReducedMotion) {
            tl.to(items, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.25, ease: "power2.out", force3D: true }, duration * 0.3);
          } else {
            tl.set(items, { y: 0, autoAlpha: 1 }, 0);
          }
        } else {
          tl.to(el, { autoAlpha: 0, duration: duration * 0.25, force3D: true }, 0);
          tl.set(items, { y: 20, autoAlpha: 0 }, duration * 0.25);
        }
      });

      activeTl.current = tl;
    },
    [isMobile, prefersReducedMotion, buildGridCols]
  );

  const handleMouseLeave = useCallback(() => {
    if (isMobile || !containerRef.current) return;

    if (activeTl.current) {
      activeTl.current.kill();
    }

    const duration = prefersReducedMotion ? 0.01 : 0.35;
    const ease = prefersReducedMotion ? "none" : "power3.out";

    const tl = gsap.timeline();

    // Single container tween to reset grid
    tl.to(containerRef.current, {
      gridTemplateColumns: buildGridCols(null),
      duration,
      ease,
    }, 0);

    // Reset all collapsed to visible, all expanded to hidden
    collapsedRefs.current.forEach((el) => {
      if (el) tl.to(el, { autoAlpha: 1, duration: duration * 0.5, force3D: true }, 0);
    });

    expandedRefs.current.forEach((el, i) => {
      if (el) {
        const items = expandedItemsCache.current[i] ?? [];
        tl.to(el, { autoAlpha: 0, duration: duration * 0.25, force3D: true }, 0);
        tl.set(items, { y: 20, autoAlpha: 0 }, duration * 0.25);
      }
    });

    activeTl.current = tl;
  }, [isMobile, prefersReducedMotion, buildGridCols]);

  const handleMobileTap = useCallback(
    (index: number) => {
      if (!isMobile) return;

      if (mobileActiveTl.current) {
        mobileActiveTl.current.kill();
      }

      const duration = prefersReducedMotion ? 0.01 : 0.4;
      const ease = prefersReducedMotion ? "none" : "power3.out";
      const tl = gsap.timeline();
      const isClosing = mobileActiveIndex.current === index;

      // Animate all panels flex
      mobilePanelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        const targetFlex = isClosing ? 1 : i === index ? 4 : 0.6;
        tl.to(panel, { flex: targetFlex, duration, ease }, 0);
      });

      // Close all expanded
      mobileExpandedRefs.current.forEach((el, i) => {
        if (!el) return;
        if (isClosing || i !== index) {
          const items = mobileExpandedItemsCache.current[i] ?? [];
          tl.to(el, { height: 0, autoAlpha: 0, duration: duration * 0.3 }, 0);
          tl.set(items, { x: -20, autoAlpha: 0 }, duration * 0.3);
        }
      });

      // Show all collapsed
      mobileCollapsedRefs.current.forEach((el, i) => {
        if (!el) return;
        if (isClosing || i !== index) {
          tl.to(el, { autoAlpha: 1, duration: duration * 0.4 }, duration * 0.1);
        }
      });

      if (!isClosing) {
        // Hide tapped collapsed
        const collapsed = mobileCollapsedRefs.current[index];
        if (collapsed) {
          tl.to(collapsed, { autoAlpha: 0, duration: duration * 0.3 }, 0);
        }

        // Expand tapped row
        const expanded = mobileExpandedRefs.current[index];
        if (expanded) {
          const items = mobileExpandedItemsCache.current[index] ?? [];
          tl.to(expanded, { height: "auto", autoAlpha: 1, duration: duration * 0.5 }, duration * 0.2);
          if (!prefersReducedMotion) {
            tl.to(items, { x: 0, autoAlpha: 1, stagger: 0.05, duration: 0.25, ease: "power2.out" }, duration * 0.3);
          } else {
            tl.set(items, { x: 0, autoAlpha: 1 }, 0);
          }
        }
      }

      mobileActiveIndex.current = isClosing ? null : index;
      mobileActiveTl.current = tl;
    },
    [isMobile, prefersReducedMotion]
  );

  // ── Mobile layout (horizontal rows, tap to expand) ──
  if (isMobile) {
    return (
      <section className="relative overflow-hidden">
        {/* Section heading */}
        <div className="relative z-10 pt-16 pb-10 px-4 text-center">
          <h2
            ref={headingRef}
            className="font-display text-5xl font-bold tracking-tighter text-white"
          >
            Tech Stack
          </h2>
          <p
            ref={descRef}
            className="mt-4 text-zinc-500 text-sm tracking-wide max-w-xs mx-auto"
          >
            The tools I use to build fast, scalable, and intelligent systems.
          </p>
        </div>

        <div ref={mobileContainerRef} className="relative z-10 flex flex-col min-h-[70vh]">
          {techCategories.map(([category, techs], index) => (
            <div
              key={category}
              ref={(el) => { mobilePanelRefs.current[index] = el; }}
              onClick={() => handleMobileTap(index)}
              className="relative border-b border-zinc-800/30 last:border-b-0 overflow-hidden cursor-pointer"
              style={{ flex: 1 }}
            >
              {/* Collapsed content: horizontal label + icons row */}
              <div
                ref={(el) => { mobileCollapsedRefs.current[index] = el; }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4"
              >
                <span className="font-display text-2xl uppercase tracking-[0.15em] text-zinc-500/70 font-bold whitespace-nowrap">
                  {category}
                </span>
                <div className="flex items-center gap-4 flex-wrap justify-center">
                  {techs.map((name) => {
                    const { icon: Icon, color } = TECH_INFO[name];
                    return (
                      <div
                        key={name}
                        className="w-9 h-9 flex items-center justify-center"
                        style={{ color }}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Expanded content */}
              <div
                ref={(el) => { mobileExpandedRefs.current[index] = el; }}
                className="overflow-hidden"
                style={{ height: 0, visibility: "hidden" }}
              >
                <div className="px-5 py-6">
                  <h3 className="font-display text-2xl font-bold text-zinc-100 mb-2 tracking-tight">
                    {category}
                  </h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mb-5" />
                  <div className="flex flex-col gap-4">
                    {techs.map((name) => {
                      const { icon: Icon, color } = TECH_INFO[name];
                      return (
                        <div
                          key={name}
                          data-tech-item
                          className="flex items-center gap-4"
                        >
                          <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-800/50 border border-zinc-700/30 shrink-0" style={{ color }}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-zinc-200 text-base font-medium">
                            {name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ── Desktop layout ──
  return (
    <section className="relative overflow-hidden">
      {/* Section heading */}
      <div className="relative z-10 pt-24 pb-16 px-8 text-center">
        <h2
          ref={headingRef}
          className="font-display text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tighter text-white"
        >
          Tech Stack
        </h2>
        <p
          ref={descRef}
          className="mt-5 text-zinc-500 text-base sm:text-lg tracking-wide max-w-md mx-auto"
        >
          The tools I use to build fast, scalable, and intelligent systems.
        </p>
      </div>

      <div
        ref={containerRef}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 grid min-h-[80vh]"
        style={{ gridTemplateColumns: `repeat(${techCategories.length}, 1fr)` }}
      >
        {techCategories.map(([category, techs], index) => (
          <div
            key={category}
            ref={(el) => { panelRefs.current[index] = el; }}
            onMouseEnter={() => handleMouseEnter(index)}
            className="relative h-auto min-h-[80vh] border-r border-zinc-800/30 last:border-r-0 overflow-hidden cursor-default"
          >
            {/* ── Collapsed content: vertical label + small icons ── */}
            <div
              ref={(el) => { collapsedRefs.current[index] = el; }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-2 will-change-[opacity,visibility]"
            >
              {/* Vertical category label */}
              <span
                className="font-display text-3xl lg:text-4xl uppercase tracking-[0.15em] text-zinc-500/70 font-bold whitespace-nowrap"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {category}
              </span>

              {/* Big icons */}
              <div className="flex flex-col items-center gap-5">
                {techs.map((name) => {
                  const { icon: Icon, color } = TECH_INFO[name];
                  return (
                    <div
                      key={name}
                      className="w-12 h-12 flex items-center justify-center"
                      style={{ color }}
                    >
                      <Icon className="w-10 h-10" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Expanded content: full details ── */}
            <div
              ref={(el) => { expandedRefs.current[index] = el; }}
              className="absolute inset-0 flex flex-col justify-center px-8 py-10 will-change-[opacity,visibility]"
              style={{ visibility: "hidden" }}
            >
              <h3 className="font-display text-4xl lg:text-5xl font-bold text-zinc-100 mb-3 tracking-tight">
                {category}
              </h3>
              <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mb-8" />

              <div className="flex flex-col gap-6">
                {techs.map((name) => {
                  const { icon: Icon, color } = TECH_INFO[name];
                  return (
                    <div
                      key={name}
                      data-tech-item
                      className="flex items-center gap-5"
                    >
                      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-zinc-800/50 border border-zinc-700/30 shrink-0" style={{ color }}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <span className="text-zinc-200 text-lg font-medium">
                        {name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
