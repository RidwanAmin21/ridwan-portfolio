"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { fadeInUp } from "@/lib/animations";

type Skill = {
  name: string;
  logo: string;
};

type Category = {
  label: string;
  skills: Skill[];
};

const categories: Category[] = [
  {
    label: "Languages",
    skills: [
      { name: "Java", logo: "/icons/icons8-java.svg" },
      { name: "Python", logo: "/icons/icons8-python.svg" },
      { name: "JavaScript", logo: "/icons/javascript-logo-svgrepo-com.svg" },
      { name: "C++", logo: "/icons/icons8-c++.svg" },
      { name: "Dart", logo: "/icons/icons8-dart.svg" },
      { name: "Ruby", logo: "/icons/ruby.svg" },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "React.js", logo: "/icons/icons8-react-js.svg" },
      { name: "Flutter", logo: "/icons/flutter.svg" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", logo: "/icons/icons8-nodejs.svg" },
      { name: "Flask", logo: "/icons/flask.svg" },
      { name: "Spring Boot", logo: "/icons/spring.svg" },
    ],
  },
  {
    label: "Data & Cloud",
    skills: [
      { name: "Pandas", logo: "/icons/icons8-pandas.svg" },
      { name: "AWS", logo: "/icons/aws-svgrepo-com.svg" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Postman", logo: "/icons/postman-icon.svg" },
    ],
  },
];

const TechStack = () => {
  return (
    <section id="tech-stack" aria-label="Tech Stack" className="relative overflow-hidden py-20 md:py-28">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, transparent 8%, rgba(99, 102, 241, 0.02) 25%, rgba(99, 102, 241, 0.04) 50%, rgba(99, 102, 241, 0.02) 75%, transparent 92%, transparent 100%)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[800px] rounded-full bg-accent-glow/[0.05] blur-[160px]" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Divider line */}
      <div className="mx-auto max-w-5xl px-6 relative">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Section header */}
      <div className="relative pt-16 pb-10 md:pt-20 md:pb-14">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.div {...fadeInUp(0)} className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent/40" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">Tech Stack</span>
            <div className="h-px w-8 bg-accent/40" />
          </motion.div>
          <motion.h2
            {...fadeInUp(0.1)}
            className="text-foreground font-semibold tracking-tight text-2xl md:text-3xl"
          >
            Tools I work{" "}
            <span className="text-accent">with</span>
          </motion.h2>
          <motion.p
            {...fadeInUp(0.15)}
            className="mt-3 text-muted-foreground text-sm md:text-base max-w-lg mx-auto"
          >
            Languages, frameworks, and tools I use to build things.
          </motion.p>
        </div>
      </div>

      {/* Skills grid by category */}
      <div className="relative mx-auto max-w-4xl px-6 space-y-10">
        {categories.map((category, catIdx) => (
          <motion.div
            key={category.label}
            {...fadeInUp(0.1 + catIdx * 0.08)}
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground/70 mb-4">
              {category.label}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, skillIdx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + catIdx * 0.06 + skillIdx * 0.04,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  whileHover={{
                    y: -3,
                    transition: { duration: 0.2 },
                  }}
                  className="group flex items-center gap-2.5 rounded-xl bg-card/70 backdrop-blur-sm px-4 py-2.5 border border-border/80 shadow-sm transition-shadow duration-300 hover:shadow-md hover:border-accent/20 cursor-default"
                  role="listitem"
                  aria-label={skill.name}
                >
                  <Image
                    src={skill.logo}
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain shrink-0 transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="text-sm font-medium text-foreground/80 transition-colors duration-300 group-hover:text-foreground">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
