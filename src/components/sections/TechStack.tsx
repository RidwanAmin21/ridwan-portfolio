"use client";

import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import type { TimelineItem } from "@/components/ui/radial-orbital-timeline";

/* Tech stack as orbital timeline items – same logos and labels as before */
const techTimelineData: TimelineItem[] = [
  { id: 1, title: "Java", date: "Tech", content: "Object-oriented language for backend and Android.", category: "Language", logo: "/icons/icons8-java.svg", relatedIds: [14], status: "completed", energy: 85 },
  { id: 2, title: "Python", date: "Tech", content: "Scripting, data science, and automation.", category: "Language", logo: "/icons/icons8-python.svg", relatedIds: [8, 11], status: "completed", energy: 90 },
  { id: 3, title: "JavaScript", date: "Tech", content: "Frontend and Node.js runtime.", category: "Language", logo: "/icons/javascript-logo-svgrepo-com.svg", relatedIds: [4, 5], status: "completed", energy: 88 },
  { id: 4, title: "React.js", date: "Tech", content: "UI library for single-page applications.", category: "Frontend", logo: "/icons/icons8-react-js.svg", relatedIds: [3, 5], status: "completed", energy: 85 },
  { id: 5, title: "Node.js", date: "Tech", content: "JavaScript runtime for server-side apps.", category: "Backend", logo: "/icons/icons8-nodejs.svg", relatedIds: [3, 4], status: "completed", energy: 80 },
  { id: 6, title: "C++", date: "Tech", content: "Systems and performance-critical code.", category: "Language", logo: "/icons/icons8-c++.svg", relatedIds: [7], status: "completed", energy: 70 },
  { id: 7, title: "Dart", date: "Tech", content: "Language powering Flutter apps.", category: "Language", logo: "/icons/icons8-dart.svg", relatedIds: [6, 12], status: "completed", energy: 75 },
  { id: 8, title: "Pandas", date: "Tech", content: "Data analysis and manipulation in Python.", category: "Data", logo: "/icons/icons8-pandas.svg", relatedIds: [2, 11], status: "completed", energy: 82 },
  { id: 9, title: "AWS", date: "Tech", content: "Cloud infrastructure and services.", category: "Cloud", logo: "/icons/aws-svgrepo-com.svg", relatedIds: [5], status: "completed", energy: 72 },
  { id: 10, title: "Postman", date: "Tech", content: "API development and testing.", category: "Tools", logo: "/icons/postman-icon.svg", relatedIds: [5, 11], status: "completed", energy: 88 },
  { id: 11, title: "Flask", date: "Tech", content: "Lightweight Python web framework.", category: "Backend", logo: "/icons/flask.svg", relatedIds: [2, 8], status: "completed", energy: 85 },
  { id: 12, title: "Flutter", date: "Tech", content: "Cross-platform mobile and desktop UI.", category: "Frontend", logo: "/icons/flutter.svg", relatedIds: [7], status: "completed", energy: 78 },
  { id: 13, title: "Ruby", date: "Tech", content: "Dynamic language and Rails ecosystem.", category: "Language", logo: "/icons/ruby.svg", relatedIds: [11], status: "completed", energy: 65 },
  { id: 14, title: "Spring Boot", date: "Tech", content: "Java application framework for production apps.", category: "Backend", logo: "/icons/spring.svg", relatedIds: [1], status: "completed", energy: 75 },
];

const TechStack = () => {
  return (
    <section id="tech-stack" aria-label="Tech Stack" className="relative overflow-hidden">
      {/* Smoother gradient wash – blends into previous and next sections */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-100"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, transparent 8%, rgba(99, 102, 241, 0.02) 25%, rgba(99, 102, 241, 0.04) 50%, rgba(99, 102, 241, 0.02) 75%, transparent 92%, transparent 100%)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[1000px] rounded-full bg-accent-glow/[0.06] blur-[180px]" />
        {/* Soft fades into previous and next sections */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Divider line */}
      <div className="mx-auto max-w-5xl px-6 relative">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      {/* Section header */}
      <div className="relative pt-20 pb-6 lg:pt-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-zinc-900 font-semibold tracking-tight text-2xl md:text-3xl">
            My tech stack
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            Languages, frameworks, and tools I use. Click a node to see details and related tech.
          </p>
        </div>
      </div>

      {/* Orbital timeline – themed to match site */}
      <RadialOrbitalTimeline
        timelineData={techTimelineData}
        variant="light"
        className="min-h-[70vh] pb-14 lg:pb-20"
      />
    </section>
  );
};

export default TechStack;
