"use client";

import React, { useEffect, useState } from "react";
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