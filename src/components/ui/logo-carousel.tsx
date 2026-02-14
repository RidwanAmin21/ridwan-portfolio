"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TextRoll } from "./text-roll";

export type LogoItem = string | { src: string; label: string };

export interface AnimatedCarouselProps {
  title?: string;
  logoCount?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  logos?: LogoItem[] | null;
  containerClassName?: string;
  titleClassName?: string;
  carouselClassName?: string;
  logoClassName?: string;
  itemsPerViewMobile?: number;
  itemsPerViewDesktop?: number;
  spacing?: string;
  padding?: string;
  logoContainerWidth?: string;
  logoContainerHeight?: string;
  logoImageWidth?: string;
  logoImageHeight?: string;
  logoMaxWidth?: string;
  logoMaxHeight?: string;
}

export const AnimatedCarousel = ({
  title = "Trusted by thousands of businesses worldwide",
  logoCount = 15,
  autoPlay = true,
  autoPlayInterval = 1000,
  logos = null,
  containerClassName = "",
  titleClassName = "",
  carouselClassName = "",
  logoClassName = "",
  itemsPerViewMobile = 4,
  itemsPerViewDesktop = 6,
  spacing = "gap-10",
  padding = "py-20 lg:py-40",
  logoContainerWidth = "w-48",
  logoContainerHeight = "h-24",
  logoImageWidth = "w-full",
  logoImageHeight = "h-full",
  logoMaxWidth = "",
  logoMaxHeight = "",
}: AnimatedCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api || !autoPlay) {
      return;
    }

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, autoPlayInterval);

    return () => clearTimeout(timer);
  }, [api, current, autoPlay, autoPlayInterval]);

  const logoItems: LogoItem[] = logos || Array.from({ length: logoCount }, (_, i) => `https://placehold.co/100x100?text=Logo+${i + 1}`);

  // Combine logo image size classes
  const logoImageSizeClasses = `${logoImageWidth} ${logoImageHeight} ${logoMaxWidth} ${logoMaxHeight}`.trim();

  return (
    <div className={`w-full ${padding} bg-background ${containerClassName}`}>
      <div className="container mx-auto">
        <div className={`flex flex-col ${spacing}`}>
          <h2 className={`text-xl md:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left ml-2 text-foreground ${titleClassName}`}>
            <TextRoll>{title}</TextRoll>
          </h2>
          
          <div>
            <Carousel setApi={setApi} className={`w-full ${carouselClassName}`}>
              <CarouselContent>
                {logoItems.map((logo, index) => {
                  const src = typeof logo === "string" ? logo : logo.src;
                  const label = typeof logo === "string" ? undefined : logo.label;

                  return (
                    <CarouselItem className={`basis-1/${itemsPerViewMobile} lg:basis-1/${itemsPerViewDesktop}`} key={index}>
                      <div className={`flex flex-col rounded-md ${logoContainerWidth} ${logoContainerHeight} items-center justify-center p-4 hover:bg-accent transition-colors ${logoClassName}`}>
                        <img 
                          src={src}
                          alt={label || `Logo ${index + 1}`}
                          className={`${logoImageSizeClasses} object-contain`}
                        />
                        {label && (
                          <span className="mt-2 text-[11px] font-medium text-zinc-400 tracking-wide">
                            {label}
                          </span>
                        )}
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Case1 = (props: React.ComponentProps<typeof AnimatedCarousel>) => {
  return <AnimatedCarousel {...props} />;
};

/* ── continuous infinite scroll + drag ────────────────────── */
const DEFAULT_SPEED_PX_PER_S = 40;

export interface InfiniteScrollCarouselProps {
  title?: string;
  logos: LogoItem[];
  containerClassName?: string;
  titleClassName?: string;
  logoClassName?: string;
  padding?: string;
  spacing?: string;
  logoContainerWidth?: string;
  logoContainerHeight?: string;
  logoImageWidth?: string;
  logoImageHeight?: string;
  speed?: number;
}

export const InfiniteScrollCarousel = ({
  title = "Tech stack",
  logos,
  containerClassName = "",
  titleClassName = "",
  logoClassName = "",
  padding = "py-14 lg:py-20",
  spacing = "gap-6",
  logoContainerWidth = "w-40",
  logoContainerHeight = "h-24",
  logoImageWidth = "w-auto",
  logoImageHeight = "h-12",
  speed = DEFAULT_SPEED_PX_PER_S,
}: InfiniteScrollCarouselProps) => {
  const segmentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [segmentWidth, setSegmentWidth] = useState(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartTranslateRef = useRef(0);

  // Measure one segment width (one full copy of logos)
  useEffect(() => {
    if (!segmentRef.current) return;
    const el = segmentRef.current;
    const measure = () => setSegmentWidth(el.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [logos.length]);

  // Continuous scroll animation (pauses while user is dragging)
  useEffect(() => {
    if (segmentWidth <= 0) return;

    const tick = (time: number) => {
      if (isDraggingRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const delta = lastTimeRef.current ? (time - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = time;

      setTranslateX((prev) => {
        let next = prev - speed * delta;
        if (segmentWidth > 0 && next <= -segmentWidth) {
          next += segmentWidth;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [segmentWidth, speed]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartTranslateRef.current = translateX;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    setTranslateX((prev) => {
      let next = dragStartTranslateRef.current + delta;
      while (segmentWidth > 0 && next > 0) next -= segmentWidth;
      while (segmentWidth > 0 && next < -segmentWidth) next += segmentWidth;
      return next;
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    isDraggingRef.current = false;
    setIsDragging(false);
    lastTimeRef.current = performance.now();
  };

  const logoImageSizeClasses = `${logoImageWidth} ${logoImageHeight}`.trim();

  return (
    <div className={`w-full ${padding} bg-background ${containerClassName}`}>
      <div className="container mx-auto">
        <div className="flex flex-col gap-10 md:gap-12">
          <h2
            className={`ml-2 text-left text-xl font-regular tracking-tighter text-foreground md:text-3xl lg:max-w-xl md:text-5xl ${titleClassName}`}
          >
            <TextRoll>{title}</TextRoll>
          </h2>

          <div className="w-full overflow-hidden" aria-label="Draggable logo carousel">
            <div
              ref={trackRef}
              className={`flex ${spacing} w-max ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
              style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              role="list"
            >
              <div ref={segmentRef} className={`flex shrink-0 ${spacing}`} role="presentation">
                {logos.map((logo, index) => {
                  const src = typeof logo === "string" ? logo : logo.src;
                  const label = typeof logo === "string" ? undefined : logo.label;
                  return (
                    <div
                      key={`a-${index}`}
                      className={`flex flex-col items-center justify-center rounded-xl p-4 transition-colors hover:bg-accent ${logoContainerWidth} ${logoContainerHeight} ${logoClassName}`}
                      role="listitem"
                    >
                      <img
                        src={src}
                        alt={label || `Logo ${index + 1}`}
                        className={`${logoImageSizeClasses} object-contain select-none pointer-events-none`}
                        draggable={false}
                      />
                      {label && (
                        <span className="mt-2 text-[11px] font-medium tracking-wide text-zinc-400">
                          {label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className={`flex shrink-0 ${spacing}`} role="presentation">
                {logos.map((logo, index) => {
                  const src = typeof logo === "string" ? logo : logo.src;
                  const label = typeof logo === "string" ? undefined : logo.label;
                  return (
                    <div
                      key={`b-${index}`}
                      className={`flex flex-col items-center justify-center rounded-xl p-4 transition-colors hover:bg-accent ${logoContainerWidth} ${logoContainerHeight} ${logoClassName}`}
                      role="listitem"
                    >
                      <img
                        src={src}
                        alt={label || `Logo ${index + 1}`}
                        className={`${logoImageSizeClasses} object-contain select-none pointer-events-none`}
                        draggable={false}
                      />
                      {label && (
                        <span className="mt-2 text-[11px] font-medium tracking-wide text-zinc-400">
                          {label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};