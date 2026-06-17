"use client";

import { useState } from "react";
import { CaseStudyDrawer } from "@/components/case-study-drawer";
import { DevTerminal } from "@/components/dev-terminal";
import { Header } from "@/components/home/header";
import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { TechStack } from "@/components/home/tech-stack";
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import type { Project } from "@/lib/portfolio-data";

const navItems = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Tech Stack", href: "#techstack" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <main className="min-h-dvh bg-background text-foreground transition-colors duration-300 relative">
      <div className="portfolio-grid fixed inset-0 -z-10 opacity-70 dark:opacity-40" />

      <Header navItems={navItems} onOpenTerminal={() => setIsTerminalOpen(true)} />

      <Hero />
      <FeaturedProjects onSelectProject={setSelectedProject} />
      <TechStack />
      <AboutSection />
      <ContactSection />

      <CaseStudyDrawer
        key={selectedProject?.name ?? "closed"}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <DevTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </main>
  );
}
