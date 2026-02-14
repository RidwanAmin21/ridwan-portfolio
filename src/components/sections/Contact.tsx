"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import {
  ProfessionalConnect,
  type ContactItem,
} from "@/components/ui/get-in-touch";

/* ── scroll-triggered fade-up helper ──────────────────────── */
const fadeInUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] as const },
});

/* ── contact links ────────────────────────────────────────── */
const contactItems: ContactItem[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ridwan-amin-345621248/",
    description: "Professional Network",
    gradient: "from-blue-600 to-blue-400",
    shadowColor: "rgba(59, 130, 246, 0.5)",
    icon: <Linkedin className="h-7 w-7" />,
  },
  {
    name: "GitHub",
    href: "https://github.com/RidwanAmin21",
    description: "Code & Projects",
    gradient: "from-zinc-700 to-zinc-500",
    shadowColor: "rgba(75, 85, 99, 0.5)",
    icon: <Github className="h-7 w-7" />,
  },
  {
    name: "Email",
    href: "mailto:ridwan.amin41@gmail.com",
    description: "ridwan.amin41@gmail.com",
    gradient: "from-accent to-accent-hover",
    shadowColor: "rgba(99, 102, 241, 0.5)",
    icon: <Mail className="h-7 w-7" />,
  },
];

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 md:py-28"
      aria-label="Contact"
    >
      {/* Section accent wash — top tint continues from Tech Stack */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.025] via-accent/[0.03] to-transparent" />
        <div className="absolute bottom-[10%] left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent-glow/[0.06] blur-[150px]" />
      </div>

      {/* Divider line */}
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-5xl w-full px-6">
        {/* Section header */}
        <div className="mb-10 md:mb-14">
          <motion.div
            {...fadeInUp(0)}
            className="mb-4 flex items-center gap-3"
          >
            <div className="h-px w-8 bg-accent/40" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              Contact
            </span>
          </motion.div>

          <motion.h2
            {...fadeInUp(0.1)}
            className="text-3xl font-semibold leading-tight text-zinc-900 sm:text-4xl lg:text-5xl"
          >
            Get in
            <span className="text-accent"> touch</span>
          </motion.h2>

          <motion.p
            {...fadeInUp(0.15)}
            className="mt-4 max-w-xl text-lg text-zinc-600"
          >
            Open to collaborations and new opportunities. Reach out via any
            channel below!
          </motion.p>
        </div>

        <motion.div {...fadeInUp(0.2)}>
          <ProfessionalConnect
            contacts={contactItems}
            cardStyle="square"
            fullHeight={false}
            showBottomCTA={false}
            showHeader={false}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
