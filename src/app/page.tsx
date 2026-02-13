import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import ScrollGradient from "@/components/ScrollGradient";

const Home = () => {
  return (
    <main>
      <ScrollGradient />
      <Hero />
      <About />
      <Experience />
      <TechStack />
    </main>
  );
};

export default Home;
