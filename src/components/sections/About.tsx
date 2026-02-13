"use client";

import { motion } from "framer-motion";
import { Code2, GraduationCap, Lightbulb, Sparkles } from "lucide-react";

/* ── scroll-triggered fade-up helper ──────────────────────── */
const fadeInUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] as const },
});

const highlights = [
  {
    icon: GraduationCap,
    label: "CS Graduate",
    description: "Class of 2026 with a focus on full-stack development",
  },
  {
    icon: Code2,
    label: "Clean Code",
    description: "Writing maintainable, well-tested, and documented software",
  },
  {
    icon: Lightbulb,
    label: "Problem Solver",
    description: "Turning complex challenges into elegant, simple solutions",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="About me"
    >
      {/* Section accent wash */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-warm/[0.03] to-transparent" />
        <div className="absolute top-[20%] right-[10%] h-[400px] w-[600px] rounded-full bg-accent-warm/[0.05] blur-[150px]" />
      </div>

      {/* Divider line */}
      <div className="mx-auto max-w-5xl px-6 relative">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-5xl w-full px-6">
        {/* Section header */}
        <div className="mb-10 md:mb-14">
          <motion.div {...fadeInUp(0)} className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent/40" />
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              About
            </span>
          </motion.div>

          <motion.h2
            {...fadeInUp(0.1)}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-900 leading-tight"
          >
            A little bit
            <span className="text-accent"> about me</span>
          </motion.h2>
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-5 gap-10 md:gap-12 items-start">
          {/* Left column — narrative text */}
          <div className="md:col-span-3 space-y-6">
            <motion.p
              {...fadeInUp(0.15)}
              className="text-lg text-zinc-600 leading-relaxed"
            >
              I&apos;m a new-grad software engineer who fell in love with
              building for the web. There&apos;s something incredibly rewarding
              about taking an idea, shaping it with code, and watching it come
              alive in the browser.
            </motion.p>

            <motion.p
              {...fadeInUp(0.25)}
              className="text-lg text-zinc-600 leading-relaxed"
            >
              My focus is on{" "}
              <span className="text-zinc-800 font-medium">
                crafting polished user experiences
              </span>{" "}
              backed by solid engineering. I care deeply about the details — from
              fluid animations and accessible interfaces to clean architecture
              and performant code.
            </motion.p>

            <motion.p
              {...fadeInUp(0.35)}
              className="text-lg text-zinc-600 leading-relaxed"
            >
              When I&apos;m not coding, you&apos;ll find me exploring new
              technologies, contributing to open-source projects, or sketching
              out ideas for my next build.
            </motion.p>

          </div>

          {/* Right column — highlight cards */}
          <div className="md:col-span-2 space-y-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                {...fadeInUp(0.2 + i * 0.12)}
                className="group relative rounded-2xl border border-accent/[0.08] bg-white/70 backdrop-blur-sm p-5 shadow-sm hover:shadow-md hover:border-accent/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-accent/[0.08] text-accent group-hover:bg-accent/[0.12] transition-colors duration-300">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-800 mb-1">
                      {item.label}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Fun accent card */} {/*
            <motion.div
              {...fadeInUp(0.5)}
              className="rounded-2xl bg-gradient-to-br from-accent/[0.06] to-accent-warm/[0.06] border border-accent/[0.08] p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-accent" />
                <span className="text-xs font-mono text-accent tracking-wide">
                  Fun fact
                </span>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed">
                I&apos;m a firm believer that great software is built at the
                intersection of design empathy and engineering rigor.
              </p>
            </motion.div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
