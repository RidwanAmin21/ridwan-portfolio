"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";

/* ── scroll-triggered fade-up helper ──────────────────────── */
const fadeInUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] as const },
});

const UTD_LOGO =
  "/icons/UT_Dallas_2_Color_Emblem_-_SVG_Brand_Identity_File.svg.png";
const ACM_LOGO = "/icons/acm logo.png";
const HACKUTD_LOGO = "/icons/hackutd-logo.png";

const highlights = [
  {
    image: UTD_LOGO,
    label: "University of Texas at Dallas",
    description: "Class of 2026",
  },
  {
    image: HACKUTD_LOGO,
    label: "HackUTD",
    description: "Corporate Relations Lead",
  },
  {
    image: ACM_LOGO,
    label: "ACM UTD",
    description: "Project Manager and Member",
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
              I&apos;m a Computer Science senior at the University of Texas at
              Dallas, graduating in May 2026, with a passion for building
              scalable and impactful software. I enjoy working on backend
              systems, full-stack applications, and distributed architectures
              that solve real-world problems.
            </motion.p>

            <motion.p
              {...fadeInUp(0.25)}
              className="text-lg text-zinc-600 leading-relaxed"
            >
              I served as Corporate Relations Lead for HackUTD, where I managed
              sponsor partnerships and helped support over 1,000 participants at
              one of the largest collegiate hackathons in North America. I was
              also a Project Manager and member of ACM at UTD, where I led
              technical projects and collaborated closely with development
              teams.
            </motion.p>

            <motion.p
              {...fadeInUp(0.35)}
              className="text-lg text-zinc-600 leading-relaxed"
            >
              I’m driven by curiosity, continuous learning, and the opportunity
              to build systems that make a meaningful impact.
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
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-accent/[0.08] text-accent group-hover:bg-accent/[0.12] transition-colors duration-300 overflow-hidden p-1">
                    <Image
                      src={item.image}
                      alt=""
                      width={32}
                      height={32}
                      className="object-contain w-full h-full min-w-[20px] min-h-[20px]"
                      unoptimized
                    />
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
            {/* Fun accent card */}{" "}
            {/*
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
