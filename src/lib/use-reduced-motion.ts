"use client";

import { useReducedMotion } from "motion/react";

/**
 * Returns framer-motion-compatible animation props that respect
 * the user's prefers-reduced-motion OS setting.
 *
 * When reduced motion is preferred, animations resolve instantly
 * (opacity fades are preserved but movement/scale are removed).
 */
export const useMotionSafe = () => {
  const prefersReducedMotion = useReducedMotion();

  /** Wrap a fade-up animation config — strips movement when reduced motion is on */
  const fadeInUp = (delay: number = 0) =>
    prefersReducedMotion
      ? {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { duration: 0.01 },
        }
      : {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: {
            duration: 0.6,
            delay,
            ease: [0.25, 0.4, 0.25, 1] as const,
          },
        };

  return { prefersReducedMotion, fadeInUp };
};
