"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Sparkles,
  Flame,
  Video,
  Database,
  Cloud,
  Code2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  devpostUrl?: string;
  tags?: string[];
}

/* Map tech tag names to icon (SVG path from /icons or Lucide icon) */
const TAG_ICONS: Record<
  string,
  { type: "img"; src: string } | { type: "icon"; Icon: LucideIcon }
> = {
  "React.js": { type: "img", src: "/icons/icons8-react-js.svg" },
  Flask: { type: "img", src: "/icons/flask.svg" },
  Flutter: { type: "img", src: "/icons/flutter.svg" },
  "Plaid API": { type: "icon", Icon: CreditCard },
  "OpenAI API": { type: "icon", Icon: Sparkles },
  Firebase: { type: "icon", Icon: Flame },
  "FFmpeg API": { type: "icon", Icon: Video },
  MongoDB: { type: "icon", Icon: Database },
  "Vertex AI": { type: "icon", Icon: Cloud },
};

function getTagIcon(tag: string) {
  return TAG_ICONS[tag] ?? { type: "icon" as const, Icon: Code2 };
}

function TagChip({ tag }: { tag: string }) {
  const iconDef = getTagIcon(tag);
  const IconComponent = iconDef.type === "icon" ? iconDef.Icon : null;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded-md bg-accent/[0.08] text-accent transition-colors duration-200 hover:bg-accent/[0.15]"
      title={tag}
    >
      {iconDef.type === "img" ? (
        <Image
          src={iconDef.src}
          alt=""
          width={14}
          height={14}
          className="shrink-0"
        />
      ) : IconComponent ? (
        <IconComponent className="w-3.5 h-3.5 shrink-0" />
      ) : null}
      {tag}
    </span>
  );
}

const defaultProjects: Project[] = [
  {
    title: "FinTeach",
    subtitle: "HackUNT Winner",
    description:
      "An AI-powered budgeting app built using the Plaid API and a supervised learning model to provide Texas teachers with personalized financial insights. Built an AI chatbot with OpenAI API to offer tailored budgeting and investment advice with a React.js and Flask interface.",
    imageUrl: "/images/finteach.png",
    tags: ["React.js", "Flask", "Plaid API", "OpenAI API"],
    githubUrl: "https://github.com/RidwanAmin21",
    devpostUrl: "https://devpost.com",
  },
  {
    title: "CatchUp",
    subtitle: "ACM Projects Winner",
    description:
      "A mobile social media app that facilitates unique daily video montages for enhanced user interaction. Used Flutter to build an interactive and user-friendly UI and Firebase to develop a relational database.",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80",
    tags: ["Flutter", "Firebase", "FFmpeg API"],
    githubUrl: "https://github.com/RidwanAmin21",
    devpostUrl: "https://devpost.com",
  },
  {
    title: "Pilot",
    subtitle: "Insurance recommendations platform",
    description:
      "Gathers small business information, analyzes the answers to develop a risk score, and provides personalized insurance recommendations. Leverages Vertex AI on Google Cloud and machine learning to analyze answers and provide user recommendations.",
    imageUrl: "/images/pilot.png",
    tags: ["React.js", "MongoDB", "Vertex AI"],
    githubUrl: "https://github.com/RidwanAmin21",
    devpostUrl: "https://devpost.com",
  },
];

export interface ProjectCardCarouselProps {
  className?: string;
  projects?: Project[];
}

export function ProjectCardCarousel({
  className,
  projects = defaultProjects,
}: ProjectCardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((index) => (index + 1) % projects.length);
  const handlePrevious = () =>
    setCurrentIndex((index) => (index - 1 + projects.length) % projects.length);

  const current = projects[currentIndex];

  const linkItems = [
    { icon: Github, url: current.githubUrl, label: "View on GitHub" },
    { icon: ExternalLink, url: current.devpostUrl, label: "View on Devpost" },
    { icon: ExternalLink, url: current.liveUrl, label: "Live demo" },
  ].filter((item) => item.url);

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
      {/* Desktop layout — 16:10 aspect for landscape project images */}
      <div className="hidden md:flex relative items-center">
        {/* Image card */}
        <motion.div
          whileHover={{ scale: 1.03, y: -6, zIndex: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-[470px] aspect-[16/10] rounded-3xl overflow-hidden bg-zinc-100 flex-shrink-0 border border-accent/[0.08] relative z-0 cursor-pointer shadow-lg hover:shadow-accent/20"
          style={{ willChange: "transform" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={current.imageUrl}
                alt={current.title}
                fill
                sizes="470px"
                quality={90}
                className="object-contain"
                draggable={false}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Text card */}
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="rounded-3xl border border-accent/[0.08] bg-white/80 backdrop-blur-sm shadow-xl p-8 ml-[-80px] z-10 max-w-xl flex-1 hover:shadow-2xl hover:border-accent/20"
          style={{ willChange: "transform" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-zinc-900 mb-2">
                  {current.title}
                </h2>
                <p className="text-sm font-medium text-zinc-500">
                  {current.subtitle}
                </p>
              </div>

              <p className="text-zinc-600 text-base leading-relaxed mb-6">
                {current.description}
              </p>

              {current.tags && current.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {current.tags.map((tag) => (
                    <TagChip key={tag} tag={tag} />
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {linkItems.map(({ icon: IconComponent, url, label }) => (
                  <Link
                    key={label}
                    href={url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-hover transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 hover:scale-105"
                    aria-label={label}
                  >
                    <IconComponent className="w-4 h-4" />
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mobile layout — same 16:10 aspect, sharp rendering */}
      <div className="md:hidden max-w-sm mx-auto text-center">
        <div className="w-full aspect-[16/10] rounded-3xl overflow-hidden mb-6 border border-accent/[0.08] bg-zinc-100 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={current.imageUrl}
                alt={current.title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                quality={90}
                className="object-contain"
                draggable={false}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <h2 className="text-xl font-bold text-zinc-900 mb-2">
                {current.title}
              </h2>
              <p className="text-sm font-medium text-zinc-500 mb-4">
                {current.subtitle}
              </p>
              <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                {current.description}
              </p>
              {current.tags && current.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {current.tags.map((tag) => (
                    <TagChip key={tag} tag={tag} />
                  ))}
                </div>
              )}
              <div className="flex justify-center gap-3 flex-wrap">
                {linkItems.map(({ icon: IconComponent, url, label }) => (
                  <Link
                    key={label}
                    href={url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
                    aria-label={label}
                  >
                    <IconComponent className="w-4 h-4" />
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <motion.button
          onClick={handlePrevious}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          aria-label="Previous project"
          className="w-12 h-12 rounded-full border border-zinc-200 bg-white/80 shadow-sm flex items-center justify-center hover:bg-accent/[0.06] hover:border-accent/30 hover:shadow-md transition-colors cursor-pointer text-zinc-600 hover:text-accent"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <div className="flex gap-2">
          {projects.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentIndex(i)}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.85 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={cn(
                "w-3 h-3 rounded-full transition-colors cursor-pointer",
                i === currentIndex
                  ? "bg-accent shadow-sm shadow-accent/30"
                  : "bg-zinc-300 hover:bg-accent/40"
              )}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          aria-label="Next project"
          className="w-12 h-12 rounded-full border border-zinc-200 bg-white/80 shadow-sm flex items-center justify-center hover:bg-accent/[0.06] hover:border-accent/30 hover:shadow-md transition-colors cursor-pointer text-zinc-600 hover:text-accent"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}
