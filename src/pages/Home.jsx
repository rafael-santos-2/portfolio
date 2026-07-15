import SystemBar from "@/components/portfolio/SystemBar";
import Hero from "@/components/portfolio/Hero";
import ProjectGrid from "@/components/portfolio/ProjectGrid";
import TechStack from "@/components/portfolio/TechStack";
import About from "@/components/portfolio/About";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

export default function Home() {
  return (
    <>
      <SystemBar />
      <main>
        <Hero />
        <ProjectGrid />
        <TechStack />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
