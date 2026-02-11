"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Mail } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.4, 0.25, 1] as const,
      delay: 0.5,
    },
  },
};

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Subtle ambient background gradients */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/[0.07] blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-accent/[0.05] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-20 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 md:order-1 text-center md:text-left"
          >
            {/* Availability Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 tracking-wide">
                Open to opportunities
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              variants={itemVariants}
              className="font-mono text-sm text-accent tracking-wide mb-4"
            >
              Hi, my name is
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]"
            >
              Ridwan Amin<span className="text-accent">.</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="mt-4 text-xl sm:text-2xl lg:text-3xl font-semibold text-zinc-400 dark:text-zinc-500 leading-tight"
            >
              I build things for the web.
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-lg text-base leading-relaxed text-zinc-500 dark:text-zinc-400 mx-auto md:mx-0"
            >
              A software developer passionate about crafting elegant,
              user-centered digital experiences. Focused on building
              accessible, performant applications that make a difference.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-all duration-200 hover:shadow-lg"
                tabIndex={0}
                aria-label="View my work"
              >
                View My Work
                <ArrowDown
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-zinc-700 px-7 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-accent hover:text-accent transition-all duration-200"
                tabIndex={0}
                aria-label="Get in touch"
              >
                <Mail size={16} />
                Get in Touch
              </a>
            </motion.div>
          </motion.div>

          {/* Headshot Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Subtle glow behind headshot */}
              <div
                className="absolute inset-0 rounded-full bg-accent/10 blur-2xl scale-110"
                aria-hidden="true"
              />

              <div className="relative h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80 overflow-hidden rounded-full ring-2 ring-zinc-200/50 dark:ring-zinc-700/50">
                <Image
                  src="/images/headshot.jpg"
                  alt="Ridwan Amin — Software Developer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 320px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-600 tracking-widest uppercase">
            scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-zinc-400 to-transparent dark:from-zinc-600" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
