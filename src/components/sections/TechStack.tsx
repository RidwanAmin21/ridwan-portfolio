"use client";

import { InfiniteScrollCarousel } from "@/components/ui/logo-carousel";
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
  { src: "/icons/flask.svg", label: "Flask" },
  { src: "/icons/flutter.svg", label: "Flutter" },
  { src: "/icons/ruby.svg", label: "Ruby" },
  { src: "/icons/spring.svg", label: "Spring Boot"},
];

/* ── tech stack section ───────────────────────────────────── */
const TechStack = () => {
  return (
    <section id="tech-stack" aria-label="Tech Stack" className="relative overflow-hidden">
      {/* Subtle local gradient wash */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-accent-glow/[0.06] blur-[160px]" />
      </div>

      {/* Divider line */}
      <div className="mx-auto max-w-5xl px-6 relative">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      <InfiniteScrollCarousel
        title="My tech stack"
        logos={techLogos}
        logoContainerWidth="w-40"
        logoContainerHeight="h-24"
        logoImageWidth="w-auto"
        logoImageHeight="h-12"
        padding="pt-20 pb-14 lg:pt-28 lg:pb-20"
        spacing="gap-6"
        containerClassName="!bg-transparent"
        titleClassName="!text-zinc-900 !font-semibold !tracking-tight"
        logoClassName="hover:!bg-accent/[0.08]"
        speed={36}
      />
    </section>
  );
};

export default TechStack;
