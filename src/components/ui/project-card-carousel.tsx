"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  tags?: string[];
}

const defaultProjects: Project[] = [
  {
    title: "FinTeach",
    subtitle: "HackUNT Winner",
    description:
      "An AI-powered budgeting app built using the Plaid API and a supervised learning model to provide Texas teachers with personalized financial insights. Built an AI chatbot with OpenAI API to offer tailored budgeting and investment advice with a React.js and Flask interface.",
    imageUrl: "/images/finteach.png",
    tags: ["React.js", "Flask", "Plaid API", "OpenAI API"],
  },
  {
    title: "CatchUp",
    subtitle: "ACM Projects Winner",
    description:
      "A mobile social media app that facilitates unique daily video montages for enhanced user interaction. Used Flutter to build an interactive and user-friendly UI and Firebase to develop a relational database.",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80",
    tags: ["Flutter", "Firebase", "FFmpeg API"],
  },
  {
    title: "Pilot",
    subtitle: "Insurance recommendations platform",
    description:
      "Gathers small business information, analyzes the answers to develop a risk score, and provides personalized insurance recommendations. Leverages Vertex AI on Google Cloud and machine learning to analyze answers and provide user recommendations.",
    imageUrl: "/images/pilot.png",
    tags: ["React.js", "MongoDB", "Vertex AI"],
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
    { icon: Github, url: current.githubUrl, label: "GitHub" },
    { icon: ExternalLink, url: current.liveUrl, label: "Live demo" },
  ].filter((item) => item.url);

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
      {/* Desktop layout */}
      <div className="hidden md:flex relative items-center">
        <div className="w-[470px] h-[470px] rounded-3xl overflow-hidden bg-zinc-200 flex-shrink-0 border border-accent/[0.08]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Image
                src={current.imageUrl}
                alt={current.title}
                width={470}
                height={470}
                className="w-full h-full object-cover"
                draggable={false}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="rounded-3xl border border-accent/[0.08] bg-white/80 backdrop-blur-sm shadow-xl p-8 ml-[-80px] z-10 max-w-xl flex-1">
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
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-accent/[0.08] text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                {linkItems.map(({ icon: IconComponent, url, label }) => (
                  <Link
                    key={label}
                    href={url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors hover:shadow-lg hover:shadow-accent/25"
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

      {/* Mobile layout */}
      <div className="md:hidden max-w-sm mx-auto text-center">
        <div className="w-full aspect-square bg-zinc-200 rounded-3xl overflow-hidden mb-6 border border-accent/[0.08]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <Image
                src={current.imageUrl}
                alt={current.title}
                width={400}
                height={400}
                className="w-full h-full object-cover"
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
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-accent/[0.08] text-accent"
                    >
                      {tag}
                    </span>
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
        <button
          onClick={handlePrevious}
          aria-label="Previous project"
          className="w-12 h-12 rounded-full border border-zinc-200 bg-white/80 shadow-sm flex items-center justify-center hover:bg-zinc-50 hover:border-accent/25 transition-colors cursor-pointer text-zinc-600 hover:text-accent"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "w-3 h-3 rounded-full transition-colors cursor-pointer",
                i === currentIndex
                  ? "bg-accent"
                  : "bg-zinc-300 hover:bg-zinc-400"
              )}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next project"
          className="w-12 h-12 rounded-full border border-zinc-200 bg-white/80 shadow-sm flex items-center justify-center hover:bg-zinc-50 hover:border-accent/25 transition-colors cursor-pointer text-zinc-600 hover:text-accent"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
