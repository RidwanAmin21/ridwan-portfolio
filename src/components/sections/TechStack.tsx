"use client";

import { AnimatedCarousel } from "@/components/ui/logo-carousel";
import type { LogoItem } from "@/components/ui/logo-carousel";

/* ── tech logos (local SVGs from /public/icons) ───────────── */
const techLogos: LogoItem[] = [
  { src: "/icons/icons8-java.svg", label: "Java" },
  { src: "/icons/icons8-python.svg", label: "Python" },
  { src: "/icons/javascript-logo-svgrepo-com.svg", label: "JavaScript" },
  { src: "/icons/icons8-react-js.svg", label: "React.js" },
  { src: "/icons/icons8-nodejs.svg", label: "Node.js" },
  { src: "/icons/icons8-c++.svg", label: "C++" },
  { src: "/icons/icons8-dart.svg", label: "Dart" },
  { src: "/icons/icons8-pandas.svg", label: "Pandas" },
  { src: "/icons/aws-svgrepo-com.svg", label: "AWS" },
  { src: "/icons/postman-icon.svg", label: "Postman" },
];

/* ── tech stack section ───────────────────────────────────── */
const TechStack = () => {
  return (
    <section id="tech-stack" aria-label="Tech Stack" className="relative">
      {/* Divider line */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      <AnimatedCarousel
        title="My tech stack"
        logos={techLogos}
        autoPlay={true}
        autoPlayInterval={2000}
        itemsPerViewMobile={3}
        itemsPerViewDesktop={5}
        logoContainerWidth="w-40"
        logoContainerHeight="h-24"
        logoImageWidth="w-auto"
        logoImageHeight="h-12"
        padding="py-14 lg:py-20"
        spacing="gap-6"
        containerClassName="!bg-[#fafafa]"
        titleClassName="!text-zinc-900 !font-semibold !tracking-tight"
        logoClassName="hover:!bg-accent/[0.08] rounded-xl"
      />
    </section>
  );
};

export default TechStack;
