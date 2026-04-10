"use client";

import { motion, AnimatePresence, useAnimation } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useMemo, useState, useCallback } from "react";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const SPARKLE_COUNT = 18;

const links = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ridwan-amin-345621248/",
    icon: Linkedin,
    shadow: "shadow-blue-500/25",
  },
  {
    name: "GitHub",
    href: "https://github.com/RidwanAmin21",
    icon: Github,
    shadow: "shadow-zinc-500/20",
  },
  {
    name: "Email",
    href: "mailto:ridwan.amin41@gmail.com",
    icon: Mail,
    shadow: "shadow-accent/30",
  },
];

const floatVariants = (i: number) => ({
  initial: { opacity: 0, y: 12, scale: 0.9 },
  whileInView: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: 0.05 * i,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
  viewport: { once: true, margin: "-20px" },
});

const BURST_COUNT = 14;
const BURST_COLORS = ["#6366f1", "#a5b4fc", "#c4b5fd", "#818cf8", "#4f46e5"];

export default function Footer() {
  const nameControls = useAnimation();
  const [bursts, setBursts] = useState<{ id: number; particles: { angle: number; dist: number; color: string; size: number }[] }[]>([]);

  const handleNameClick = useCallback(() => {
    nameControls.start({
      scale: [1, 1.15, 0.95, 1.05, 1],
      rotate: [0, -3, 3, -1, 0],
      transition: { duration: 0.6, ease: "easeInOut" },
    });

    const id = Date.now();
    const particles = Array.from({ length: BURST_COUNT }, (_, i) => ({
      angle: (360 / BURST_COUNT) * i + (Math.random() * 20 - 10),
      dist: 40 + Math.random() * 60,
      color: BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)],
      size: 3 + Math.random() * 5,
    }));
    setBursts((prev) => [...prev, { id, particles }]);
    setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== id)), 900);
  }, [nameControls]);

  return (
    <footer
      className="relative overflow-hidden pt-14 pb-24 md:pt-16 md:pb-28"
      aria-label="Site footer"
    >
      {/* ── Background effects ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Moving gradient wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(99,102,241,0.06) 0%, rgba(165,180,252,0.12) 25%, rgba(99,102,241,0.04) 50%, rgba(196,181,253,0.12) 75%, rgba(99,102,241,0.06) 100%)",
            backgroundSize: "300% 300%",
            animation: "footer-gradient 10s ease infinite",
          }}
        />

        {/* Animated floating orbs */}
        <motion.div
          className="absolute h-44 w-44 rounded-full blur-[60px]"
          style={{ background: "rgba(99, 102, 241, 0.18)", left: "15%", top: "20%" }}
          animate={{ x: [0, 30, -10, 0], y: [0, -20, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute h-36 w-36 rounded-full blur-[50px]"
          style={{ background: "rgba(165, 180, 252, 0.2)", right: "15%", bottom: "10%" }}
          animate={{ x: [0, -25, 15, 0], y: [0, 15, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute h-24 w-24 rounded-full blur-[40px]"
          style={{ background: "rgba(196, 181, 253, 0.15)", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 0.5px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Sparkles */}
        <Sparkles />

        {/* Top separator line */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        {/* Name as main focus — click for burst */}
        <div className="relative inline-block">
          <motion.button
            type="button"
            className="font-cursive text-2xl font-medium tracking-tight text-foreground/80 cursor-pointer select-none sm:text-3xl bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 rounded-md"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            animate={nameControls}
            onClick={handleNameClick}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleNameClick(); } }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
            aria-label="Ridwan Amin — click for a surprise"
          >
            {"Ridwan Amin"}
          </motion.button>

          {/* Particle burst */}
          <AnimatePresence>
            {bursts.map((burst) => (
              <div key={burst.id} className="pointer-events-none absolute inset-0 flex items-center justify-center">
                {burst.particles.map((p, i) => {
                  const rad = (p.angle * Math.PI) / 180;
                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{ width: p.size, height: p.size, background: p.color }}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{
                        x: Math.cos(rad) * p.dist,
                        y: Math.sin(rad) * p.dist,
                        opacity: 0,
                        scale: 0.2,
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  );
                })}
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* Floating link icons */}
        <motion.div
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-20px" }}
          variants={{
            whileInView: {
              transition: { staggerChildren: 0.06, delayChildren: 0.1 },
            },
          }}
        >
          {links.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              variants={floatVariants(i)}
              animate={{ y: [0, -4, 0] }}
              transition={{
                y: { duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" },
              }}
              className={`group flex h-11 w-11 items-center justify-center rounded-lg bg-card/90 shadow-md ${link.shadow} ring-1 ring-border/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg hover:ring-accent/30`}
              aria-label={link.name}
            >
              <link.icon className="h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-accent" />
              <span className="sr-only">{link.name}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mx-auto mt-8 flex items-center gap-3"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/20" />
          <motion.div
            className="h-1 w-1 rounded-full bg-accent/40"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent/20" />
        </motion.div>

        {/* Sign-off */}
        <motion.div
          className="mt-6 space-y-2"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <p className="text-sm text-muted-foreground/50">
            Designed &amp; crafted by hand
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/30">
            &copy; {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

function Sparkles() {
  const sparkles = useMemo(() => {
    return Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
      id: i,
      left: `${Math.round(seededRandom(i * 3 + 1) * 10000) / 100}%`,
      top: `${Math.round(seededRandom(i * 3 + 2) * 10000) / 100}%`,
      size: Math.round((2 + seededRandom(i * 3 + 3) * 3) * 100) / 100,
      delay: Math.round(seededRandom(i * 7) * 400) / 100,
      duration: Math.round((1.8 + seededRandom(i * 5) * 2.5) * 100) / 100,
    }));
  }, []);

  return (
    <>
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-accent"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
          }}
          animate={{
            opacity: [0, 0.9, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
