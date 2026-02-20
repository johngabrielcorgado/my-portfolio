"use client";

import React, { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsMobile from "../hooks/use-is-mobile";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { title: "Full-Stack Development", percentage: 100 },
  { title: "UI/UX Design", percentage: 90 },
];

const stats = [
  { number: 6, suffix: "+", label: "Projects" },
  { number: 3, suffix: "+", label: "Years Experience" },
];

const capabilities = [
  "UI/UX Design",
  "Backend Dev",
  "Responsive",
  "Performance",
];

export default function About() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isMobile = useIsMobile();

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const aboutWordRef = useRef<HTMLSpanElement>(null);
  const meWordRef = useRef<HTMLSpanElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const statsStripRef = useRef<HTMLDivElement>(null);
  const statNumberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pullQuoteRef = useRef<HTMLParagraphElement>(null);
  const journeyParaRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const skillLineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const skillLabelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const skillCounterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tickerInnerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set([aboutWordRef.current, meWordRef.current], { yPercent: 0, opacity: 1 });
        gsap.set(ruleRef.current, { scaleX: 1, opacity: 1 });
        gsap.set(pullQuoteRef.current, { clipPath: "inset(0 0 0% 0)" });
        gsap.set([...journeyParaRefs.current.filter(Boolean)], { opacity: 1, y: 0 });
        gsap.set([...skillLabelRefs.current.filter(Boolean)], { opacity: 1, y: 0 });
        skillLineRefs.current.forEach((line, i) => {
          if (line) gsap.set(line, { width: `${skills[i].percentage}%` });
        });
        skillCounterRefs.current.forEach((el, i) => {
          if (el) el.textContent = `${skills[i].percentage}%`;
        });
        statNumberRefs.current.forEach((el, i) => {
          if (el) el.textContent = String(stats[i].number);
        });
        return;
      }

      // --- Headline: scroll-scrubbed slide from left ---
      const headlineTl = gsap.timeline({
        scrollTrigger: {
          trigger: headlineRef.current,
          start: isMobile ? "top 100%" : "top 90%",
          end: isMobile ? "top 50%" : "top 30%",
          scrub: 0.8,
        },
      });
      headlineTl
        .fromTo(aboutWordRef.current, { x: -200, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1, ease: "none" })
        .fromTo(meWordRef.current, { x: -200, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1, ease: "none" }, 0.3)
        .fromTo(ruleRef.current, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 0.6, ease: "none" }, 0.6);

      // --- Desktop: scrub-based parallax drift on "ME" ---
      if (!isMobile) {
        gsap.to(meWordRef.current, {
          x: 60,
          ease: "none",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 60%",
            end: "bottom 20%",
            scrub: 1,
          },
        });
      }

      // --- Stats counter animation ---
      statNumberRefs.current.forEach((el, i) => {
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stats[i].number,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: { trigger: statsStripRef.current, start: "top 80%", once: true },
          onUpdate: () => {
            if (el) el.textContent = String(Math.round(obj.val));
          },
        });
      });

      // --- Pull quote clip-path reveal ---
      gsap.to(pullQuoteRef.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: pullQuoteRef.current, start: isMobile ? "top 100%" : "top 75%", once: true },
      });

      // --- Journey paragraphs fade up ---
      const validParas = journeyParaRefs.current.filter(Boolean);
      if (validParas.length) {
        gsap.from(validParas, {
          autoAlpha: 0,
          y: 30,
          stagger: 0.25,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: validParas[0], start: isMobile ? "top 100%" : "top 80%", once: true },
        });
      }

      // --- Skill labels fade in ---
      const validLabels = skillLabelRefs.current.filter(Boolean);
      if (validLabels.length) {
        gsap.from(validLabels, {
          autoAlpha: 0,
          y: 20,
          stagger: 0.15,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: validLabels[0], start: isMobile ? "top 100%" : "top 85%", once: true },
        });
      }

      // --- Skill lines width tween + counter ---
      skillLineRefs.current.forEach((line, i) => {
        if (!line) return;
        const counter = skillCounterRefs.current[i];
        const obj = { val: 0 };

        gsap.to(line, {
          width: `${skills[i].percentage}%`,
          duration: 1.4,
          delay: i * 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: line, start: "top 85%", once: true },
        });

        gsap.to(obj, {
          val: skills[i].percentage,
          duration: 1.4,
          delay: i * 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: line, start: "top 85%", once: true },
          onUpdate: () => {
            if (counter) counter.textContent = `${Math.round(obj.val)}%`;
          },
        });
      });

      // --- Capability ticker: infinite horizontal scroll ---
      if (tickerInnerRef.current) {
        const totalWidth = tickerInnerRef.current.scrollWidth;
        const singleSetWidth = totalWidth / 3;

        gsap.to(tickerInnerRef.current, {
          x: -singleSetWidth,
          duration: isMobile ? 15 : 25,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(String(x)) % singleSetWidth),
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [isMobile, prefersReducedMotion] }
  );

  return (
    <section ref={sectionRef} id="about" className="relative py-32 md:py-48 overflow-hidden">
      {/* Subtle background radials */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_50%,rgba(139,92,246,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_80%,rgba(168,85,247,0.06),transparent_60%)]" />
      </div>

      <div className="relative z-10">

        {/* ── BLOCK 1: Oversized Split Headline ── */}
        <div ref={headlineRef} className="max-w-7xl mx-auto px-4 sm:px-8 mb-24 md:mb-32">
          <div className="overflow-hidden">
            <span
              ref={aboutWordRef}
              className="block font-display text-[clamp(4rem,15vw,12rem)] font-bold leading-[0.85] tracking-tighter text-zinc-100"
            >
              ABOUT
            </span>
          </div>
          <div className="overflow-hidden">
            <span
              ref={meWordRef}
              className="block font-display text-[clamp(4rem,15vw,12rem)] font-bold leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500 md:ml-[30%]"
            >
              ME
            </span>
          </div>
          <div ref={ruleRef} className="mt-8 h-px w-24 bg-gradient-to-r from-purple-500 to-transparent" />
        </div>

        {/* ── BLOCK 2: Stats Strip ── */}
        <div ref={statsStripRef} className="border-y border-zinc-800/50 py-10 md:py-14 mb-24 md:mb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-0">
            {stats.map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && (
                  <div className="hidden sm:block w-px h-16 bg-zinc-700/50 mx-12 md:mx-20" />
                )}
                <div className="text-center sm:text-left">
                  <div className="flex items-baseline justify-center sm:justify-start">
                    <span
                      ref={(el) => { statNumberRefs.current[i] = el; }}
                      className="font-display text-5xl md:text-7xl font-bold text-zinc-100"
                    >
                      0
                    </span>
                    <span className="font-display text-5xl md:text-7xl font-bold text-purple-400">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-sm md:text-base uppercase tracking-widest mt-2">
                    {stat.label}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── BLOCK 3: Asymmetric Journey Text ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-24 md:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            {/* Pull quote — left */}
            <div className="md:col-span-5">
              <p
                ref={pullQuoteRef}
                className="font-display text-2xl md:text-4xl font-semibold text-zinc-200 leading-snug"
                style={{ clipPath: "inset(0 0 100% 0)" }}
              >
                &ldquo;Every project is an opportunity to learn, innovate, and push the boundaries of what&rsquo;s possible.&rdquo;
              </p>
              <div className="mt-6 h-px w-16 bg-purple-500/50" />
            </div>

            {/* Body text — right */}
            <div className="md:col-span-6 md:col-start-7 space-y-6">
              <p
                ref={(el) => { journeyParaRefs.current[0] = el; }}
                className="text-zinc-300 text-base md:text-lg leading-relaxed"
              >
                With a passion for technology and problem-solving, I&apos;ve dedicated myself to mastering
                the art of full-stack development. Every project is an opportunity to learn, innovate,
                and push the boundaries of what&apos;s possible on the web.
              </p>
              <p
                ref={(el) => { journeyParaRefs.current[1] = el; }}
                className="text-zinc-300 text-base md:text-lg leading-relaxed"
              >
                I believe in writing clean, maintainable code and creating intuitive user experiences
                that make a difference. Whether it&apos;s a complex web application or a sleek landing page,
                I approach each challenge with enthusiasm and attention to detail.
              </p>
            </div>
          </div>
        </div>

        {/* ── BLOCK 4: Full-Width Skill Lines ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-24 md:mb-32 space-y-12">
          {skills.map((skill, i) => (
            <div key={skill.title} ref={(el) => { skillLabelRefs.current[i] = el; }}>
              <div className="flex justify-between items-baseline mb-4">
                <span className="font-display text-lg md:text-xl font-semibold text-zinc-200">
                  {skill.title}
                </span>
                <span
                  ref={(el) => { skillCounterRefs.current[i] = el; }}
                  className="font-display text-2xl md:text-4xl font-bold text-purple-400 shrink-0"
                >
                  0%
                </span>
              </div>
              {/* Full-width line track */}
              <div className="h-px bg-zinc-800 relative">
                <div
                  ref={(el) => { skillLineRefs.current[i] = el; }}
                  className="absolute top-0 left-0 h-px bg-gradient-to-r from-purple-500 to-violet-500"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── BLOCK 5: Capability Ticker / Marquee ── */}
        <div className="overflow-hidden border-t border-zinc-800/50 pt-10 md:pt-14">
          <div ref={tickerInnerRef} className="flex whitespace-nowrap">
            {[0, 1, 2].map((repeat) => (
              <div key={repeat} className="flex shrink-0 items-center">
                {capabilities.map((cap) => (
                  <React.Fragment key={`${repeat}-${cap}`}>
                    <span className="font-display text-3xl md:text-5xl font-bold text-zinc-200/10 uppercase tracking-wide px-6 md:px-10">
                      {cap}
                    </span>
                    <span className="text-purple-500/40 text-2xl" aria-hidden="true">
                      &#x2022;
                    </span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
