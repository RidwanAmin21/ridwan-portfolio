"use client";

import { motion } from "motion/react";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

const contactMethods = [
  {
    name: "LinkedIn",
    detail: "ridwan-amin",
    href: "https://www.linkedin.com/in/ridwan-amin-345621248/",
    icon: Linkedin,
    external: true,
  },
  {
    name: "GitHub",
    detail: "RidwanAmin21",
    href: "https://github.com/RidwanAmin21",
    icon: Github,
    external: true,
  },
  {
    name: "Email",
    detail: "ridwan.amin41@gmail.com",
    href: "mailto:ridwan.amin41@gmail.com",
    icon: Mail,
    external: false,
  },
] as const;

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 md:py-28"
      aria-label="Contact"
    >
      {/* Background wash */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.025] via-accent/[0.03] to-transparent" />
        <div className="absolute bottom-[10%] left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent-glow/[0.06] blur-[150px]" />
      </div>

      {/* Top divider */}
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative mx-auto max-w-5xl w-full px-6">
        {/* Header */}
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
            className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Get in
            <span className="text-accent"> touch</span>
          </motion.h2>

          <motion.p
            {...fadeInUp(0.15)}
            className="mt-4 max-w-xl text-lg text-muted-foreground"
          >
            Open to collaborations and new opportunities. Reach out via any
            channel below.
          </motion.p>
        </div>

        {/* Contact rows */}
        <motion.div
          {...fadeInUp(0.2)}
          className="space-y-0"
        >
          {contactMethods.map((method, i) => (
            <motion.a
              key={method.name}
              href={method.href}
              target={method.external ? "_blank" : undefined}
              rel={method.external ? "noopener noreferrer" : undefined}
              className="group relative flex items-center gap-4 border-t border-border/60 py-5 transition-colors duration-300 hover:border-accent/30 sm:gap-6 sm:py-6"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: 0.25 + i * 0.08,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              aria-label={`${method.name} — ${method.detail}`}
              tabIndex={0}
            >
              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted/60 transition-colors duration-300 group-hover:bg-accent/10">
                <method.icon className="h-4.5 w-4.5 text-muted-foreground transition-colors duration-300 group-hover:text-accent" />
              </div>

              {/* Text */}
              <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
                <span className="text-sm font-medium text-foreground sm:text-base">
                  {method.name}
                </span>
                <span className="hidden h-px w-4 bg-border/60 transition-colors duration-300 group-hover:bg-accent/30 sm:block" />
                <span className="truncate text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/70">
                  {method.detail}
                </span>
              </div>

              {/* Arrow */}
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
            </motion.a>
          ))}

          {/* Bottom border to close the list */}
          <div className="border-t border-border/60" />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
