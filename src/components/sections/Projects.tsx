"use client";

import { motion } from "framer-motion";
import { ProjectCardCarousel } from "@/components/ui/project-card-carousel";

const fadeInUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] as const },
});

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="Projects"
    >
      {/* Section accent wash */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.025] to-transparent" />
        <div className="absolute top-[20%] left-[15%] h-[400px] w-[600px] rounded-full bg-accent-glow/[0.05] blur-[150px]" />
      </div>

      {/* Divider line */}
      <div className="mx-auto max-w-5xl px-6 relative">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl w-full px-6">
        <div className="mb-10 md:mb-14">
          <motion.div {...fadeInUp(0)} className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent/40" />
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              Projects
            </span>
          </motion.div>

          <motion.h2
            {...fadeInUp(0.1)}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-900 leading-tight"
          >
            Personal
            <span className="text-accent"> projects</span>
          </motion.h2>

          <motion.p
            {...fadeInUp(0.18)}
            className="mt-4 max-w-lg text-base text-zinc-500 leading-relaxed"
          >
            Hackathon winning projects and personal side projects.
          </motion.p>
        </div>

        <motion.div {...fadeInUp(0.25)}>
          <ProjectCardCarousel />
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
