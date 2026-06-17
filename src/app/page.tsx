"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { PortfolioIcon, getTechIconName } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { GlowingTracker } from "@/components/glowing-tracker";
import { CaseStudyDrawer } from "@/components/case-study-drawer";
import { DevTerminal } from "@/components/dev-terminal";
import { useTheme } from "@/components/theme-provider";
import {
  architectureHighlights,
  profile,
  projects,
  skillGroups,
  experience,
  education,
} from "@/lib/portfolio-data";
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
  const [activeTab, setActiveTab] = useState<"all" | "backend" | "fullstack" | "mobile">("all");

  // Filter projects based on tabs
  const filteredProjects = projects.filter((project) => {
    if (activeTab === "all") return true;
    const lowerRole = project.role.toLowerCase();
    const lowerStack = project.stack.map(s => s.toLowerCase());

    if (activeTab === "backend") {
      return (
        lowerRole.includes("backend") ||
        lowerStack.includes("java") ||
        lowerStack.includes("nestjs") ||
        lowerStack.includes("spring boot")
      );
    }
    if (activeTab === "fullstack") {
      return lowerRole.includes("full-stack") || lowerRole.includes("full stack");
    }
    if (activeTab === "mobile") {
      return lowerRole.includes("mobile") || lowerStack.includes("react native") || lowerStack.includes("expo");
    }
    return true;
  });

  const featuredProjects = filteredProjects.filter((project) => project.spotlight);
  const secondaryProjects = filteredProjects.filter((project) => !project.spotlight);

  return (
    <main className="min-h-dvh bg-background text-foreground transition-colors duration-300 relative">
      {/* Background patterns */}
      <div className="portfolio-grid fixed inset-0 -z-10 opacity-70 dark:opacity-40" />
      <GlowingTracker />
      <FloatingThemeToggle />
      <CustomCursor />

      <Header onOpenTerminal={() => setIsTerminalOpen(true)} />
      
      <Hero />
      <About />
      
      {/* Projects section */}
      <section id="projects" className="py-24 border-y border-line transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="mono-label text-xs font-bold text-accent uppercase tracking-wider">featured projects</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Production-Grade Systems & Case Studies
            </h2>
            <p className="mt-3 text-muted">
              Click on any project to explore detailed system architecture diagrams, problem definitions, and solutions.
            </p>
          </Reveal>

          {/* Categories Tab Selector */}
          <div className="mt-8 flex flex-wrap gap-2 border-b border-line pb-4">
            <FilterTab active={activeTab === "all"} onClick={() => setActiveTab("all")} label="All Projects" />
            <FilterTab active={activeTab === "backend"} onClick={() => setActiveTab("backend")} label="Backend / Microservices" />
            <FilterTab active={activeTab === "fullstack"} onClick={() => setActiveTab("fullstack")} label="Full-stack Products" />
            <FilterTab active={activeTab === "mobile"} onClick={() => setActiveTab("mobile")} label="Mobile Apps" />
          </div>

          {/* Featured grid */}
          <div className="mt-10 grid gap-6">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project, index) => (
                <Reveal key={project.name} delay={index * 0.05}>
                  <ProjectCard project={project} featured onSelect={() => setSelectedProject(project)} />
                </Reveal>
              ))
            ) : (
              <p className="text-muted text-sm italic py-4">No projects match this category filter.</p>
            )}
          </div>

          {/* Secondary projects grid */}
          {secondaryProjects.length > 0 && (
            <div className="mt-16">
              <h3 className="mono-label text-xs font-semibold text-muted uppercase tracking-wider mb-6">Additional Projects</h3>
              <Reveal>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {secondaryProjects.map((project) => (
                    <ProjectCard key={project.name} project={project} onSelect={() => setSelectedProject(project)} />
                  ))}
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {/* Tech Stack section */}
      <Skills />

      {/* Resume Section */}
      <Resume />

      <Systems />
      <Contact />

      {/* Case Study Detailed Drawer */}
      <CaseStudyDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Developer Terminal Overlay */}
      <DevTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
    </main>
  );
}

// Subcomponents
function Header({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  return (
    <header className="sticky top-0 z-40 glass-header">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3 font-bold text-foreground">
          <span className="grid size-9 place-items-center rounded-lg border border-line bg-surface text-sm font-semibold shadow-sm text-accent">
            PT
          </span>
          <span className="hidden sm:inline tracking-tight font-extrabold">{profile.name}</span>
        </a>
        
        {/* Navigation list */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-muted transition hover:bg-surface-soft hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* CLI Terminal Button */}
          <button
            onClick={onOpenTerminal}
            className="flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-muted hover:bg-surface-soft hover:text-accent transition-all active:translate-y-px cursor-pointer"
            title="Open Interactive CLI Terminal"
            aria-label="Open CLI Terminal"
          >
            <PortfolioIcon name="backend" size={18} weight="bold" />
          </button>

          {/* Connect actions */}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-foreground px-4 text-sm font-semibold text-background transition hover:opacity-90 active:translate-y-px dark:bg-foreground dark:text-background"
          >
            <PortfolioIcon name="github" size={18} weight="fill" />
            <span className="hidden xs:inline ml-2">GitHub</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-7xl items-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <HeroAtmosphere />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <Reveal className="flex w-full flex-col items-center">
          <AvatarOrb prefersReducedMotion={prefersReducedMotion} />

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.28em] text-muted">
            {profile.displayName} | {profile.role}
          </p>

          <TypingHeadline prefersReducedMotion={prefersReducedMotion} />

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            {profile.headline}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-bold text-white transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:shadow-lg hover:shadow-accent/20 active:translate-y-px cursor-pointer"
            >
              Explore My Work
              <PortfolioIcon name="arrow" size={16} weight="bold" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-surface px-6 text-sm font-semibold text-foreground transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:border-accent hover:text-accent active:translate-y-px cursor-pointer"
            >
              Get in Touch
              <PortfolioIcon name="email" size={18} weight="bold" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TypingHeadline({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  const headline = "Crafting Scalable and User-Centric Web Solutions";
  const [typedHeadline, setTypedHeadline] = useState(() => (prefersReducedMotion ? headline : ""));

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let index = 0;

    const intervalId = window.setInterval(() => {
      index += 1;
      setTypedHeadline(headline.slice(0, index));

      if (index >= headline.length) {
        window.clearInterval(intervalId);
      }
    }, 36);

    return () => window.clearInterval(intervalId);
  }, [headline, prefersReducedMotion]);

  return (
    <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.03] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
      <span>{typedHeadline}</span>
      <span
        aria-hidden="true"
        className={`ml-1 inline-block h-[1.05em] w-0.5 translate-y-1 bg-accent align-middle ${
          prefersReducedMotion || typedHeadline.length === headline.length ? "opacity-0" : "hero-caret"
        }`}
      />
    </h1>
  );
}

function AvatarOrb({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  return (
    <motion.div
      className="group relative mx-auto w-fit"
      whileHover={prefersReducedMotion ? undefined : { y: -6, rotate: 1.2, scale: 1.02 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <div className="absolute -inset-5.5 rounded-4xl bg-accent/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative rounded-4xl border border-line bg-surface/85 p-3 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)] backdrop-blur-sm dark:shadow-[0_35px_90px_-50px_rgba(0,0,0,0.75)]">
        <div className="absolute inset-2.5 rounded-[1.55rem] bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.2),transparent_40%),linear-gradient(180deg,rgba(37,99,235,0.12),transparent_60%)] opacity-70" />
        <Image
          src="https://github.com/phamthanhtrivn.png"
          alt="Pham Thanh Tri portrait avatar"
          width={220}
          height={220}
          priority
          className="relative size-44 rounded-[1.45rem] border border-line object-cover shadow-sm sm:size-52"
        />
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-line bg-background/90 px-3 py-1 text-[11px] font-semibold text-muted shadow-sm backdrop-blur-md">
          Motion-ready profile
        </div>
      </div>
    </motion.div>
  );
}

function HeroAtmosphere() {
  const nodeTransition = {
    duration: 5.8,
    repeat: Number.POSITIVE_INFINITY,
    repeatType: "mirror" as const,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="hero-atmosphere absolute inset-0 opacity-80 dark:opacity-100" />

      <svg className="absolute inset-0 h-full w-full opacity-60 dark:opacity-70" viewBox="0 0 1200 720" preserveAspectRatio="none">
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <motion.path
            d="M260 200 C380 110, 520 120, 620 220 S830 360, 940 250"
            className="text-accent/35"
            strokeWidth="1.2"
            strokeDasharray="6 10"
            animate={{ pathLength: [0.7, 1], opacity: [0.35, 0.7, 0.35] }}
            transition={nodeTransition}
          />
          <motion.path
            d="M280 470 C420 400, 540 390, 700 460 S890 560, 1040 430"
            className="text-accent/20"
            strokeWidth="1"
            strokeDasharray="3 12"
            animate={{ pathLength: [0.65, 1], opacity: [0.18, 0.45, 0.18] }}
            transition={{ ...nodeTransition, duration: 7.5 }}
          />
        </g>
      </svg>

      <motion.span
        className="absolute left-[18%] top-[23%] size-3 rounded-full bg-accent shadow-[0_0_22px_rgba(37,99,235,0.55)]"
        animate={{ y: [0, 12, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute left-[73%] top-[28%] size-2.5 rounded-full bg-accent/80 shadow-[0_0_18px_rgba(37,99,235,0.4)]"
        animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
        transition={{ duration: 6.8, repeat: Number.POSITIVE_INFINITY, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute left-[26%] top-[66%] size-2 rounded-full bg-accent/60 shadow-[0_0_14px_rgba(37,99,235,0.35)]"
        animate={{ y: [0, -8, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 7.2, repeat: Number.POSITIVE_INFINITY, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute left-[21%] top-[24.5%] h-px w-[22%] rotate-18 bg-linear-to-r from-transparent via-accent/35 to-transparent" />
      <div className="absolute left-[59%] top-[31%] h-px w-[18%] rotate-[-22deg] bg-linear-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute left-[29%] top-[63%] h-px w-[29%] rotate-9 bg-linear-to-r from-transparent via-accent/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-7 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="hero-code-marquee flex w-max items-center gap-12 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.34em] text-muted/60">
          <span>react / next.js / spring boot / websocket / ci-cd / deployment</span>
          <span>scalable systems / user-centric flows / realtime operations / api design</span>
          <span>react / next.js / spring boot / websocket / ci-cd / deployment</span>
          <span>scalable systems / user-centric flows / realtime operations / api design</span>
        </div>
      </div>
    </div>
  );
}

function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed right-4 top-4 z-40 inline-flex items-center gap-2 rounded-full border border-line bg-surface/90 px-4 py-2 text-xs font-semibold text-foreground shadow-lg shadow-black/5 backdrop-blur-md transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:border-accent/60 hover:text-accent active:translate-y-px"
      title="Toggle light and dark mode"
      aria-label="Toggle light and dark mode"
    >
      <span className="grid size-6 place-items-center rounded-full bg-accent/10 text-accent">
        <PortfolioIcon name={theme === "light" ? "moon" : "sun"} size={13} weight="bold" />
      </span>
      <span className="hidden sm:inline">{theme === "light" ? "Dark mode" : "Light mode"}</span>
    </button>
  );
}

function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 420, damping: 34, mass: 0.22 });
  const smoothY = useSpring(cursorY, { stiffness: 420, damping: 34, mass: 0.22 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const setInitialPosition = () => {
      cursorX.set(window.innerWidth / 2);
      cursorY.set(window.innerHeight / 2);
      setIsVisible(true);
    };

    const handleMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    setInitialPosition();
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mouseenter", handleEnter);
    };
  }, [cursorX, cursorY, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
      style={{ x: smoothX, y: smoothY, opacity: isVisible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.22 }}
    >
      <div className="rounded-full border border-accent/35 bg-accent/10 p-4 shadow-[0_0_40px_rgba(37,99,235,0.16)] backdrop-blur-sm">
        <div className="size-2 rounded-full bg-accent" />
      </div>
    </motion.div>
  );
}

function About() {
  return (
    <Reveal
      as="section"
      id="about"
      className="border-y border-line bg-surface-soft/40 px-4 py-20 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="mono-label text-xs font-bold text-accent uppercase tracking-wider">about me</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Clean Engineering Across The Entire Stack.
          </h2>
        </div>
        <div className="grid gap-6 text-base leading-8 text-muted md:grid-cols-2">
          <p>{profile.intro}</p>
          <p>
            I focus on backend robustness first: establishing REST and WebSocket APIs, securing sessions with JWT policies, optimizing database transactions, and managing message streams via Kafka. I support the user experience by building fast frontends and native mobile clients.
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function Skills() {
  return (
    <section id="techstack" className="py-24 border-b border-line transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="mono-label text-xs font-bold text-accent uppercase tracking-wider">technology matrix</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            My Tooling & Framework Ecosystem
          </h2>
          <p className="mt-3 text-muted">
            Technologies I use to design, develop, deploy, and scale robust web products.
          </p>
        </Reveal>
        
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => (
            <div key={group.title} className="technical-card rounded-2xl p-5 hover:border-accent/50">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent">
                  <PortfolioIcon
                    name={index === 0 ? "backend" : index === 1 ? "database" : index === 2 ? "code" : "rocket"}
                    size={20}
                    weight="bold"
                  />
                </span>
                <h3 className="font-bold text-foreground text-base tracking-tight">{group.title}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface/80 px-2.5 py-1.5 text-xs text-muted shadow-sm hover:border-accent/20 hover:text-foreground transition-colors font-medium"
                  >
                    <PortfolioIcon name={getTechIconName(item)} size={11} className="text-accent" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section id="resume" className="py-24 border-b border-line bg-surface-soft/20 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="mono-label text-xs font-bold text-accent uppercase tracking-wider">career history</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Education & Professional Experience
          </h2>
          <p className="mt-3 text-muted">
            A chronological timeline of my training and engineering journey.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Experience Timeline */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-accent/10 text-accent">
                <PortfolioIcon name="resume" size={18} weight="bold" />
              </span>
              Work Experience
            </h3>
            <div className="relative border-l border-line pl-6 space-y-12">
              {experience.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline point */}
                  <span className="absolute -left-7.75 top-1.5 grid size-4 place-items-center rounded-full bg-background border-2 border-accent" />
                  
                  <span className="mono-label text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-md">
                    {item.period}
                  </span>
                  <h4 className="mt-3 text-lg font-bold tracking-tight text-foreground">{item.role}</h4>
                  <p className="text-sm font-semibold text-muted mt-1">{item.company}</p>
                  <p className="mt-3 text-sm leading-6 text-muted font-medium">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-accent/10 text-accent">
                <PortfolioIcon name="rocket" size={18} weight="bold" />
              </span>
              Education & Certifications
            </h3>
            <div className="relative border-l border-line pl-6 space-y-12">
              {education.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline point */}
                  <span className="absolute -left-7.75 top-1.5 grid size-4 place-items-center rounded-full bg-background border-2 border-accent" />
                  
                  <span className="mono-label text-xs font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-md">
                    {item.period}
                  </span>
                  <h4 className="mt-3 text-lg font-bold tracking-tight text-foreground">{item.role}</h4>
                  <p className="text-sm font-semibold text-muted mt-1">{item.company}</p>
                  <p className="mt-3 text-sm leading-6 text-muted font-medium">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterTab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-bold transition-all duration-200 cursor-pointer ${
        active
          ? "bg-accent text-white shadow-md shadow-accent/10"
          : "border border-line bg-surface text-muted hover:border-accent/40 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function ProjectCard({
  project,
  featured = false,
  onSelect,
}: {
  project: Project;
  featured?: boolean;
  onSelect: () => void;
}) {
  return (
    <article
      onClick={onSelect}
      className={`group cursor-pointer rounded-2xl border border-line bg-surface p-5 shadow-sm transition-all duration-300 hover:border-accent hover:shadow-md ${
        featured ? "lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-8 lg:p-7" : ""
      }`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent">
              {project.status}
            </span>
            <span className="rounded-lg border border-line bg-surface-soft px-2.5 py-1 text-xs font-semibold text-muted">
              {project.role}
            </span>
          </div>
          <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
            {project.name}
          </h3>
          <p className="mt-4 text-sm leading-6 text-muted line-clamp-3 font-medium">{project.summary}</p>
        </div>
        
        {/* View case study trigger */}
        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-accent">
          <span>Read Case Study</span>
          <PortfolioIcon name="arrow" size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </div>

      <div className={featured ? "mt-8 lg:mt-0" : "mt-6"}>
        <div className="rounded-xl border border-line bg-surface-soft/60 p-4">
          <p className="mono-label text-[10px] text-muted uppercase tracking-wider font-bold">Challenge</p>
          <p className="mt-2 text-xs leading-5 text-muted line-clamp-2 font-medium">{project.problem}</p>
        </div>
        
        {/* Display tech stack badges with icons */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 7).map((item) => (
            <span key={item} className="inline-flex items-center gap-1 rounded-lg bg-surface-soft border border-line/40 px-2 py-1 text-[11px] font-semibold text-muted">
              <PortfolioIcon name={getTechIconName(item)} size={10} className="text-accent" />
              {item}
            </span>
          ))}
          {project.stack.length > 7 && (
            <span className="rounded-lg bg-surface-soft px-2 py-1 text-[11px] text-muted font-mono font-bold">
              +{project.stack.length - 7}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function Systems() {
  return (
    <Reveal
      as="section"
      id="systems"
      className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"
    >
      <div>
        <p className="mono-label text-xs font-bold text-accent uppercase tracking-wider">systems architecture</p>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Verified Systems Thinking
        </h2>
        <p className="mt-4 text-base leading-7 text-muted">
          My designs separate service boundaries, prioritize load safety, prevent double locks, and integrate logging so components remain stable under real use.
        </p>
      </div>
      <div className="grid gap-4">
        {architectureHighlights.map((item, index) => (
          <div key={item.title} className="technical-card rounded-2xl p-5 hover:border-accent/40">
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <PortfolioIcon
                  name={index === 0 ? "lightning" : index === 1 ? "shield" : "stack"}
                  size={20}
                  weight="bold"
                />
              </span>
              <div>
                <h3 className="font-bold text-foreground text-base tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted font-medium">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function Contact() {
  return (
    <Reveal
      as="section"
      id="contact"
      className="border-t border-line bg-surface-soft/40 px-4 py-20 sm:px-6 lg:px-8 transition-colors duration-300"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <p className="mono-label text-xs font-bold text-accent uppercase tracking-wider">get in touch</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Want to collaborate or inspect my work?
          </h2>
          <p className="mt-4 text-base leading-7 text-muted font-medium">
            {profile.contactNote}
          </p>
        </div>
        
        {/* Contact links and buttons */}
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-bold text-white transition hover:opacity-90 active:translate-y-px shadow-lg shadow-accent/20 cursor-pointer"
          >
            <PortfolioIcon name="email" size={18} weight="bold" />
            Email Me
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-6 text-sm font-bold text-foreground transition hover:border-accent hover:text-accent active:translate-y-px cursor-pointer"
          >
            <PortfolioIcon name="linkedin" size={18} weight="bold" />
            LinkedIn Profile
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 border border-line bg-surface px-6 text-sm font-bold text-foreground transition hover:border-accent hover:text-accent active:translate-y-px cursor-pointer"
          >
            <PortfolioIcon name="github" size={18} weight="fill" />
            GitHub Profile
          </a>
        </div>
      </div>
      <footer className="mx-auto mt-16 flex max-w-7xl flex-col gap-3 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-bold">{profile.displayName} / Backend and Full-Stack Developer</p>
        <p className="mono-label text-xs font-medium">github.com/phamthanhtrivn</p>
      </footer>
    </Reveal>
  );
}
