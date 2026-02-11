"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Mail } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useEffect, useRef, useState } from "react";

/* ── animation timings (seconds) ───────────────────────────── */
const STROKE_DELAY = 0.4;
const STROKE_DURATION = 2.0;
const FILL_DELAY = STROKE_DELAY + STROKE_DURATION - 0.4;
const CONTENT_START = STROKE_DELAY + STROKE_DURATION + 0.15;

/* ── reusable fade-up helper ───────────────────────────────── */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] as const },
  },
});

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.4, 0.25, 1] as const,
      delay: 0.4,
    },
  },
};

/* ── handwritten name SVG component ────────────────────────── */
const HandwrittenName = () => {
  const textRef = useRef<SVGTextElement>(null);
  const [phase, setPhase] = useState<"measuring" | "ready" | "animating">(
    "measuring",
  );
  const [svgData, setSvgData] = useState({
    length: 0,
    viewBox: "0 0 520 100",
  });

  useEffect(() => {
    const init = async () => {
      await document.fonts.ready;
      if (!textRef.current) return;

      const length = textRef.current.getComputedTextLength();
      const bbox = textRef.current.getBBox();
      const pad = 6;

      setSvgData({
        length,
        viewBox: `${bbox.x - pad} ${bbox.y - pad} ${bbox.width + pad * 2} ${bbox.height + pad * 2}`,
      });
      setPhase("ready");

      // double rAF ensures browser has painted "ready" state before transitioning
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setPhase("animating")),
      );
    };
    init();
  }, []);

  return (
    <div className="my-3 md:my-4">
      <svg
        viewBox={phase !== "measuring" ? svgData.viewBox : "0 0 520 100"}
        className="h-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
        preserveAspectRatio="xMinYMid meet"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="nameGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8c4a0" />
            <stop offset="50%" stopColor="#d4a574" />
            <stop offset="100%" stopColor="#c2907a" />
          </linearGradient>
        </defs>

        <text
          ref={textRef}
          x="0"
          y="75"
          fill="url(#nameGrad)"
          stroke="url(#nameGrad)"
          strokeWidth={1.5}
          style={{
            fontFamily: "var(--font-cursive)",
            fontSize: 72,
            fontWeight: 700,
            visibility: phase === "measuring" ? "hidden" : "visible",
            strokeDasharray:
              phase !== "measuring" ? svgData.length : undefined,
            strokeDashoffset: phase === "animating" ? 0 : svgData.length,
            fillOpacity: phase === "animating" ? 1 : 0,
            transition:
              phase === "animating"
                ? `stroke-dashoffset ${STROKE_DURATION}s cubic-bezier(0.65, 0, 0.35, 1) ${STROKE_DELAY}s, fill-opacity 0.8s ease-out ${FILL_DELAY}s`
                : "none",
          }}
        >
          Ridwan Amin
        </text>
      </svg>
    </div>
  );
};

/* ── hero section ──────────────────────────────────────────── */
const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Warm gradient mesh background */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-[-20%] left-[15%] h-[600px] w-[600px] rounded-full bg-accent/[0.14] blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[10%] h-[500px] w-[500px] rounded-full bg-accent-warm/[0.12] blur-[140px]" />
        <div className="absolute top-[30%] right-[-5%] h-[400px] w-[400px] rounded-full bg-accent-glow/[0.08] blur-[120px]" />
      </div>

      {/* Subtle noise/grain overlay for texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-6xl w-full px-6 pt-28 pb-20 md:py-0">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            {/* Availability Badge */}
            <motion.div
              {...fadeUp(0.1)}
              className="inline-flex items-center gap-2.5 mb-8 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-mono text-stone-400 tracking-wide">
                Open to opportunities
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              {...fadeUp(0.25)}
              className="font-mono text-sm text-accent tracking-wider mb-2"
            >
              Hi, I&apos;m
            </motion.p>

            {/* Handwritten Name — SVG stroke animation */}
            <HandwrittenName />

            {/* Tagline */}
            <motion.p
              {...fadeUp(CONTENT_START)}
              className="mt-2 text-lg sm:text-xl lg:text-2xl font-medium text-stone-300 leading-snug"
            >
              I build digital experiences
              <br className="hidden sm:block" />
              <span className="text-stone-500"> people remember.</span>
            </motion.p>

            {/* Description */}
            <motion.p
              {...fadeUp(CONTENT_START + 0.15)}
              className="mt-6 max-w-md text-base text-stone-500 leading-relaxed mx-auto md:mx-0"
            >
              New grad software engineer passionate about crafting polished,
              user-centered web applications. Bringing fresh perspective and
              clean code to every project.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUp(CONTENT_START + 0.3)}
              className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-stone-950 hover:bg-accent-hover transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                tabIndex={0}
                aria-label="Explore my work"
              >
                Explore My Work
                <ArrowDown
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-7 py-3 text-sm font-medium text-stone-300 hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-300 backdrop-blur-sm"
                tabIndex={0}
                aria-label="Get in touch"
              >
                <Mail size={16} />
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* 3D Profile Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="order-1 md:order-2 flex-shrink-0"
          >
            <CardContainer containerClassName="py-0">
              <CardBody className="w-64 sm:w-72 lg:w-80 h-auto relative">
                {/* Glow behind card */}
                <div
                  className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-accent/20 via-accent-warm/15 to-accent-glow/20 blur-2xl"
                  aria-hidden="true"
                />

                {/* Card with gradient border */}
                <CardItem translateZ="40" className="w-full relative">
                  <div className="rounded-3xl bg-gradient-to-br from-accent-glow via-accent to-accent-warm p-[2px]">
                    <div className="rounded-3xl bg-stone-950 overflow-hidden">
                      <div className="relative aspect-[3/4]">
                        <Image
                          src="/images/headshot.jpg"
                          alt="Ridwan Amin — New Grad Software Engineer"
                          fill
                          className="object-cover"
                          priority
                          sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                        />

                        {/* Bottom gradient overlay with info */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent px-5 pb-5 pt-20">
                          <p className="text-base font-semibold text-white">
                            Ridwan Amin
                          </p>
                          <p className="text-sm font-mono text-stone-400 mt-0.5">
                            Software Engineer &middot; Class of 2026
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: CONTENT_START + 0.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[11px] font-mono text-stone-600 tracking-widest uppercase">
            scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-stone-600 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
