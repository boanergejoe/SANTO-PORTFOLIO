import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import { BottomDock } from "./components/BottomDock";
import { CustomCursor } from "./components/CustomCursor";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { AboutSection } from "./sections/AboutSection";
import { CareerSection } from "./sections/CareerSection";
import { ContactSection } from "./sections/ContactSection";
import { EducationSection } from "./sections/EducationSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ServicesSection } from "./sections/ServicesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";

export default function App() {
  const [dockVisible, setDockVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setDockVisible(window.scrollY > window.innerHeight * 0.5);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent selection:bg-primary/30 selection:text-primary-foreground">
      <CustomCursor />

      <ReactLenis root options={{ smoothWheel: true, duration: 1.2 }}>
        <SiteHeader />

        <main className="flex w-full flex-col border-none pt-10">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <CareerSection />
          <EducationSection />
          <TestimonialsSection />
          <ContactSection />
        </main>

        <SiteFooter />
        <BottomDock visible={dockVisible} />
      </ReactLenis>
    </div>
  );
}
