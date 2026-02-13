"use client";

import { useEffect, useRef } from "react";

/*
 * Gradient orbs that drift across the viewport as the user scrolls.
 * Uses direct DOM manipulation (no React state) for 60 fps performance.
 *
 * Each orb defines a start → end position (viewport %), size, blur,
 * colour, and opacity range. They're interpolated linearly with scroll.
 */

interface Orb {
  /** CSS colour — can use var() tokens */
  color: string;
  /** Viewport-% positions at scroll = 0 */
  startX: number;
  startY: number;
  /** Viewport-% positions at scroll = 1 */
  endX: number;
  endY: number;
  /** px diameter */
  size: number;
  /** px blur radius */
  blur: number;
  /** [opacityAtTop, opacityAtBottom] */
  opacity: [number, number];
}

const ORBS: Orb[] = [
  // Large indigo — drifts from top-left to center-left
  {
    color: "var(--color-accent)",
    startX: 10,
    startY: -10,
    endX: 5,
    endY: 70,
    size: 600,
    blur: 140,
    opacity: [0.13, 0.07],
  },
  // Warm purple — drifts from bottom-right to top-right
  {
    color: "var(--color-accent-warm)",
    startX: 75,
    startY: 60,
    endX: 80,
    endY: 20,
    size: 500,
    blur: 140,
    opacity: [0.1, 0.12],
  },
  // Glow blue — drifts from right edge down
  {
    color: "var(--color-accent-glow)",
    startX: 85,
    startY: 20,
    endX: 60,
    endY: 85,
    size: 450,
    blur: 130,
    opacity: [0.12, 0.09],
  },
  // Subtle accent fill — slow centre drift
  {
    color: "var(--color-accent)",
    startX: 40,
    startY: 80,
    endX: 30,
    endY: 30,
    size: 400,
    blur: 150,
    opacity: [0.04, 0.1],
  },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function ScrollGradient() {
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      ORBS.forEach((orb, i) => {
        const el = orbRefs.current[i];
        if (!el) return;

        const x = lerp(orb.startX, orb.endX, progress);
        const y = lerp(orb.startY, orb.endY, progress);
        const opacity = lerp(orb.opacity[0], orb.opacity[1], progress);

        el.style.transform = `translate(${x}vw, ${y}vh)`;
        el.style.opacity = String(opacity);
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    // Initial paint
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {ORBS.map((orb, i) => (
        <div
          key={i}
          ref={(el) => {
            orbRefs.current[i] = el;
          }}
          className="absolute rounded-full will-change-transform transition-opacity duration-700 ease-out"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            /* centre the orb on its translate point */
            marginLeft: -orb.size / 2,
            marginTop: -orb.size / 2,
          }}
        />
      ))}

      {/* Subtle noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
