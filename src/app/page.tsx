"use client";

import { useState, useEffect } from "react";
import { CaseStudyDrawer } from "@/components/case-study-drawer";
import { DevTerminal } from "@/components/dev-terminal";
import { Header } from "@/components/home/header";
import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { TechStack } from "@/components/home/tech-stack";
import { ContactSection } from "@/components/home/contact-section";
import type { Project } from "@/lib/portfolio-data";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Tech Stack", href: "#techstack" },
  { label: "Featured Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-dvh bg-background text-foreground transition-colors duration-300 relative">
      <div className="portfolio-grid fixed inset-0 -z-10 opacity-70 dark:opacity-40" />

      <Header
        navItems={navItems}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      <Hero />
      <TechStack />
      <FeaturedProjects onSelectProject={setSelectedProject} />
      <ContactSection />

      <CaseStudyDrawer
        key={selectedProject?.name ?? "closed"}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <DevTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 flex size-12 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
          showScrollTop
            ? "translate-y-0 opacity-100"
            : "translate-y-16 opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z"
          />
        </svg>
      </button>
    </main>
  );
}
