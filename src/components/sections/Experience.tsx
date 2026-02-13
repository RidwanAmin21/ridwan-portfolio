"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";
import type { DisplayCardProps } from "@/components/ui/display-cards";

/* ── scroll-triggered fade-up helper ──────────────────────── */
const fadeInUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] as const },
});

/* ── experience data ──────────────────────────────────────── */
interface Experience {
  company: string;
  role: string;
  shortRole: string;
  team?: string;
  location: string;
  date: string;
  bullets: string[];
  tags: string[];
  logo: string;
  isFeatured: boolean;
}

const experiences: Experience[] = [
  {
    company: "UTD Networking Lab",
    role: "Undergraduate ML Researcher",
    shortRole: "ML Researcher",
    location: "Richardson, TX",
    date: "Aug 2024 – May 2025",
    bullets: [
      "Trained ML models to spot network intrusions in real time — think of it as teaching a system to recognize the difference between normal traffic and a DDOS attack before it hits",
      "Processed thousands of live network data points to fine-tune detection accuracy, cutting false positives and boosting threat detection efficiency by 30%",
    ],
    tags: ["Machine Learning", "Python", "Network Security"],
    logo: "/icons/UT_Dallas_2_Color_Emblem_-_SVG_Brand_Identity_File.svg.png",
    isFeatured: false,
  },
  {
    company: "Fannie Mae",
    role: "Software Engineering Intern",
    shortRole: "SWE Intern",
    team: "Underwriting Core & Collateral Data Technology",
    location: "Plano, TX",
    date: "Jun 2024 – Aug 2024",
    bullets: [
      "Built REST APIs that connected Fannie Mae's credit systems to AWS S3 and DynamoDB — shaved 10% off data retrieval times and made the whole pipeline more reliable",
      "Wrote end-to-end unit tests with JUnit and Mockito, pushing coverage past 90%",
      "Wrote Terraform and Jenkins scripts to keep infrastructure reproducible and deployments smooth across environments",
    ],
    tags: ["Spring Boot", "AWS S3", "DynamoDB", "Java", "Terraform"],
    logo: "/icons/FNMA.svg",
    isFeatured: false,
  },
  {
    company: "Amazon Web Services",
    role: "Software Development Engineering Intern",
    shortRole: "SDE Intern",
    team: "EC2 Elastic Load Balancing - API Orchestration",
    location: "Seattle, WA",
    date: "May 2025 – Aug 2025",
    bullets: [
      "Architected a pub-sub event system for Elastic Load Balancing that replaced heavy synchronous database calls with lightweight async workflows, cutting transactional DB load by 40%",
      "Built real-time event streaming so ELB provisioning data flows continuously to downstream services instead of being polled on demand",
      "Created shared libraries for DynamoDB caching and MySQL replicas that other ELB teams could plug into, making the async architecture easy to adopt across the org",
    ],
    tags: ["AWS", "DynamoDB", "MySQL", "Pub/Sub"],
    logo: "/icons/aws-svgrepo-com.svg",
    isFeatured: false,
  },
  {
    company: "Amazon Web Services",
    role: "Software Development Engineer",
    shortRole: "SDE — Full-Time",
    location: "Seattle, WA",
    date: "Starting August 2026",
    bullets: [],
    tags: ["AWS", "Full-Time", "New Grad"],
    logo: "/icons/aws-svgrepo-com.svg",
    isFeatured: true,
  },
];

/* ── stacking config ──────────────────────────────────────── */
const STACK_POSITIONS = [
  "translate-y-0",
  "translate-x-16 translate-y-10",
  "translate-x-32 translate-y-20",
  "translate-x-48 translate-y-30",
];

/* Hover positions: each card floats up by ~8px from its resting y */
const STACK_HOVER_POSITIONS = [
  "hover:-translate-y-2",
  "hover:translate-y-8",
  "hover:translate-y-[4.5rem]",
  "hover:translate-y-[6.5rem]",
];

const OVERLAY_BASE =
  "before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-border before:h-full before:content-[''] before:bg-blend-overlay before:bg-background/50 before:left-0 before:top-0 before:transition-opacity before:duration-700";

/* ── Experience section ───────────────────────────────────── */
const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(experiences.length - 1);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const selected = experiences[activeIndex];

  const maxIndex = experiences.length - 1;
  const goNext = () => setActiveIndex((p) => Math.min(p + 1, maxIndex));
  const goPrev = () => setActiveIndex((p) => Math.max(p - 1, 0));

  /* Map a clientX position to whichever dot is closest */
  const resolveIndex = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      const dots = sliderRef.current.children;
      let closest = 0;
      let closestDist = Infinity;
      for (let i = 0; i < dots.length; i++) {
        const rect = (dots[i] as HTMLElement).getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const dist = Math.abs(clientX - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      }
      setActiveIndex(closest);
    },
    [],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      setIsDragging(true);
      resolveIndex(e.clientX);
    },
    [resolveIndex],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      resolveIndex(e.clientX);
    },
    [isDragging, resolveIndex],
  );

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  /* Build card props for the stacked display */
  const cards: DisplayCardProps[] = experiences.map((exp, i) => {
    const isActive = i === activeIndex;

    return {
      icon: <Image src={exp.logo} alt={exp.company} width={20} height={20} className="size-5 object-contain" />,
      title: exp.company,
      description: exp.shortRole,
      date: exp.date,
      iconClassName: isActive ? "bg-accent" : "bg-accent/20",
      titleClassName: isActive ? "text-accent" : "text-zinc-500",
      onClick: () => setActiveIndex(i),
      className: cn(
        "[grid-area:stack]",
        STACK_POSITIONS[i],
        OVERLAY_BASE,
        STACK_HOVER_POSITIONS[i],
        isActive
          ? "before:opacity-0 grayscale-0 border-accent/30 shadow-lg shadow-accent/10"
          : "grayscale-[100%] hover:before:opacity-60 hover:grayscale-[50%] hover:shadow-md",
      ),
    };
  });

  return (
    <section
      id="experience"
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="Experience"
    >
      {/* Section accent wash */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.025] to-transparent" />
        <div className="absolute top-[30%] left-[5%] h-[450px] w-[650px] rounded-full bg-accent-glow/[0.04] blur-[150px]" />
      </div>

      {/* Divider line */}
      <div className="mx-auto max-w-5xl px-6 relative">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl w-full px-6">
        {/* Section header */}
        <div className="mb-10 md:mb-14">
          <motion.div {...fadeInUp(0)} className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent/40" />
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              Experience
            </span>
          </motion.div>

          <motion.h2
            {...fadeInUp(0.1)}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-900 leading-tight"
          >
            My
            <span className="text-accent"> Experiences</span>
          </motion.h2>

          <motion.p
            {...fadeInUp(0.18)}
            className="mt-4 max-w-lg text-base text-zinc-500 leading-relaxed"
          >
            Click a card to explore
            each chapter of my journey!
          </motion.p>
        </div>

        {/* Two-column layout: cards + detail */}
        <motion.div
          {...fadeInUp(0.25)}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 items-start"
        >
          {/* Left: stacked display cards */}
          <div className="flex flex-col items-center lg:items-start">
            {/* Scaled container for the card stack */}
            <div className="relative w-full">
              <div className="origin-top-left scale-[0.52] sm:scale-[0.65] md:scale-[0.78] lg:scale-[0.82] xl:scale-[0.92] min-h-[180px] sm:min-h-[220px] md:min-h-[260px] lg:min-h-[280px]">
                <DisplayCards cards={cards} />
              </div>
            </div>

            {/* Navigation: arrows + swipeable dots */}
            <div className="flex items-center gap-3 mt-2 sm:mt-4">
              {/* Prev arrow */}
              <button
                onClick={goPrev}
                disabled={activeIndex === 0}
                aria-label="Previous experience"
                className={cn(
                  "flex-shrink-0 grid place-items-center h-8 w-8 rounded-full border transition-all duration-300",
                  activeIndex === 0
                    ? "border-zinc-200 text-zinc-300 cursor-not-allowed"
                    : "border-zinc-300 text-zinc-500 hover:border-accent/30 hover:text-accent hover:bg-accent/[0.06]",
                )}
              >
                <ChevronLeft size={16} />
              </button>

              {/* Dot row — clickable & draggable */}
              <div
                ref={sliderRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                className="flex items-center gap-2 px-1 h-8 touch-none select-none cursor-pointer"
              >
                {experiences.map((exp, i) => (
                  <span
                    key={exp.company + exp.shortRole}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "block rounded-full transition-all duration-500",
                      i === activeIndex
                        ? "h-2.5 w-8 bg-accent"
                        : "h-2.5 w-2.5 bg-zinc-300 hover:bg-zinc-400",
                    )}
                    aria-label={`View ${exp.company} experience`}
                  />
                ))}
              </div>

              {/* Next arrow */}
              <button
                onClick={goNext}
                disabled={activeIndex === maxIndex}
                aria-label="Next experience"
                className={cn(
                  "flex-shrink-0 grid place-items-center h-8 w-8 rounded-full border transition-all duration-300",
                  activeIndex === maxIndex
                    ? "border-zinc-200 text-zinc-300 cursor-not-allowed"
                    : "border-zinc-300 text-zinc-500 hover:border-accent/30 hover:text-accent hover:bg-accent/[0.06]",
                )}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Right: detail panel */}
          <motion.div layout className="min-h-[320px] relative" transition={{ layout: { duration: 0.35, ease: [0.25, 0.4, 0.25, 1] } }}>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                {/* Card wrapper */}
                <div
                  className={cn(
                    "rounded-2xl border bg-white/70 backdrop-blur-sm p-6 sm:p-8 shadow-sm",
                    selected.isFeatured
                      ? "border-accent/20 bg-gradient-to-br from-white/80 to-accent/[0.03]"
                      : "border-accent/[0.08]",
                  )}
                >
                  {/* Featured badge */}
                  {selected.isFeatured && (
                    <div className="flex items-center gap-2 mb-4">
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          boxShadow: [
                            "0 0 0 0 rgba(99, 102, 241, 0.4)",
                            "0 0 0 8px rgba(99, 102, 241, 0)",
                            "0 0 0 0 rgba(99, 102, 241, 0)",
                          ],
                        }}
                        transition={{
                          scale: { duration: 0.4, ease: "easeOut" },
                          opacity: { duration: 0.3 },
                          boxShadow: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: 0.5,
                          },
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-accent/[0.1] border border-accent/20 px-3 py-1 text-[11px] font-semibold text-accent uppercase tracking-wider shadow-sm"
                      >
                        <motion.span
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut",
                          }}
                          className="inline-flex"
                        >
                          <Sparkles size={12} />
                        </motion.span>
                        Incoming
                      </motion.span>
                    </div>
                  )}

                  {/* Logo + role header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={cn(
                        "flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-300 overflow-hidden",
                        selected.isFeatured
                          ? "bg-gradient-to-br from-accent to-accent-hover p-2"
                          : "bg-accent/[0.08] p-2",
                      )}
                    >
                      <Image
                        src={selected.logo}
                        alt={selected.company}
                        width={32}
                        height={32}
                        className={cn(
                          "w-full h-full object-contain",
                          selected.isFeatured && "brightness-0 invert",
                        )}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 leading-tight">
                        {selected.role}
                      </h3>
                      <p className="text-base font-medium text-accent mt-1">
                        {selected.company}
                        {selected.team && (
                          <span className="text-zinc-400 font-normal">
                            {" "}
                            &middot; {selected.team}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-5">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} className="text-zinc-400" />
                      {selected.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} className="text-zinc-400" />
                      {selected.date}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-accent/10 via-accent/5 to-transparent mb-5" />

                  {/* Bullets or placeholder */}
                  {selected.bullets.length > 0 ? (
                    <ul className="space-y-3">
                      {selected.bullets.map((bullet, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 * i, duration: 0.3 }}
                          className="flex items-start gap-2.5 text-sm text-zinc-600 leading-relaxed"
                        >
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent/30 mt-[7px]" />
                          {bullet}
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center gap-3 py-4">
                      <div className="h-10 w-10 rounded-full bg-accent/[0.08] flex items-center justify-center">
                        <Sparkles size={18} className="text-accent" />
                      </div>
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        Excited to join the team full-time after graduation in
                        May 2026!
                      </p>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {selected.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                          selected.isFeatured
                            ? "bg-accent/[0.06] border border-accent/[0.1] text-accent"
                            : "bg-zinc-100 text-zinc-500",
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
