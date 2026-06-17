"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PortfolioIcon, getTechIconName } from "./icon";
import type { Project } from "@/lib/portfolio-data";

type CaseStudyDrawerProps = {
  project: Project | null;
  onClose: () => void;
};

export function CaseStudyDrawer({ project, onClose }: CaseStudyDrawerProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "tech">("overview");

  // Prevent scroll on body when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Drawer panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 26, stiffness: 220 }}
          className="relative z-10 flex h-full w-full max-w-2xl flex-col bg-surface shadow-2xl border-l border-line"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent">
                  {project.status}
                </span>
                <span className="rounded-lg bg-surface-soft border border-line px-2.5 py-1 text-xs font-semibold text-muted">
                  {project.role}
                </span>
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">{project.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-muted hover:bg-surface-soft hover:text-foreground transition-colors cursor-pointer"
              aria-label="Close panel"
            >
              <PortfolioIcon name="arrow" size={20} className="rotate-45" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-line bg-surface-soft px-6">
            <TabButton
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
              label="Overview"
              icon="about"
            />
            <TabButton
              active={activeTab === "architecture"}
              onClick={() => setActiveTab("architecture")}
              label="Architecture"
              icon="stack"
            />
            <TabButton
              active={activeTab === "tech"}
              onClick={() => setActiveTab("tech")}
              label="Technology"
              icon="code"
            />
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {activeTab === "overview" && <OverviewTab project={project} />}
            {activeTab === "architecture" && <ArchitectureTab project={project} />}
            {activeTab === "tech" && <TechTab project={project} />}
          </div>

          {/* Footer links */}
          <div className="border-t border-line bg-surface-soft px-6 py-4 flex gap-3 justify-end">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-foreground dark:text-background"
              >
                {link.label === "Repository" ? (
                  <PortfolioIcon name="github" size={16} weight="fill" />
                ) : (
                  <PortfolioIcon name="globe" size={16} weight="bold" />
                )}
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Subcomponents
function TabButton({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: "about" | "stack" | "code";
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 border-b-2 py-4 px-4 text-sm font-semibold transition-colors cursor-pointer ${
        active ? "border-accent text-accent" : "border-transparent text-muted hover:text-foreground"
      }`}
    >
      <span className={active ? "text-accent" : "text-muted"}>
        <PortfolioIcon
          name={icon === "about" ? "location" : icon === "stack" ? "stack" : "code"}
          size={16}
          weight={active ? "bold" : "regular"}
        />
      </span>
      {label}
    </button>
  );
}

function OverviewTab({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-semibold text-accent uppercase tracking-wider mono-label">Solution Summary</h3>
        <p className="mt-2 text-base leading-7 text-muted">{project.summary}</p>
      </div>

      <div className="rounded-xl border border-line bg-surface-soft p-5">
        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mono-label flex items-center gap-2">
          <PortfolioIcon name="shield" size={14} className="text-accent" />
          The Challenge
        </h4>
        <p className="mt-2 text-sm leading-6 text-muted">{project.problem}</p>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-accent uppercase tracking-wider mono-label">Core Features</h3>
        <ul className="mt-3 space-y-3">
          {project.features.map((feat) => (
            <li key={feat} className="flex items-start gap-3 text-sm leading-6 text-muted">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ArchitectureTab({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-semibold text-accent uppercase tracking-wider mono-label">System Architecture Diagram</h3>
        <div className="mt-4 rounded-xl border border-line bg-surface-soft p-4 flex items-center justify-center overflow-x-auto">
          {renderArchitectureSVG(project.name)}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-accent uppercase tracking-wider mono-label">Architecture Highlights</h3>
        <ul className="mt-3 space-y-3">
          {project.architecture.map((arch) => (
            <li key={arch} className="flex items-start gap-3 text-sm leading-6 text-muted">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              <span>{arch}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TechTab({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-semibold text-accent uppercase tracking-wider mono-label">Technology Stack</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-muted shadow-sm"
            >
              <PortfolioIcon name={getTechIconName(item)} size={14} className="text-accent" />
              {item}
            </span>
          ))}
        </div>
      </div>
      
      <div className="rounded-xl border border-line p-5">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <PortfolioIcon name="lightning" size={16} className="text-accent" />
          Implementation Notes
        </h4>
        <p className="mt-2 text-sm leading-6 text-muted">
          The project was built adhering to clean software design patterns, isolating domain logic from configuration layers. Fully automated workflows ensure testing runs seamlessly prior to deployment on server environments.
        </p>
      </div>
    </div>
  );
}

function renderArchitectureSVG(projectName: string) {
  if (projectName === "Alpha Cinema") {
    return (
      <svg width="500" height="340" viewBox="0 0 500 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)" />
          </marker>
        </defs>

        {/* Clients */}
        <rect x="10" y="40" width="100" height="50" rx="8" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
        <text x="60" y="65" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontWeight="bold" fontFamily="monospace">Web Client</text>
        <text x="60" y="80" textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily="sans-serif">React 19 / TS</text>

        <rect x="10" y="120" width="100" height="50" rx="8" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
        <text x="60" y="145" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontWeight="bold" fontFamily="monospace">Mobile Client</text>
        <text x="60" y="160" textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily="sans-serif">React Native / Expo</text>

        {/* Gateway */}
        <rect x="160" y="70" width="90" height="70" rx="8" fill="var(--surface-soft)" stroke="var(--accent)" strokeWidth="2" />
        <text x="205" y="100" textAnchor="middle" fill="var(--accent)" fontSize="12" fontWeight="bold" fontFamily="monospace">API Gateway</text>
        <text x="205" y="115" textAnchor="middle" fill="var(--muted)" fontSize="10" fontFamily="sans-serif">Spring Cloud</text>

        {/* Connections Client -> Gateway */}
        <path d="M 110 65 L 135 65 L 135 90 L 152 90" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <path d="M 110 145 L 135 145 L 135 120 L 152 120" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />

        {/* Microservices Box */}
        <rect x="290" y="15" width="190" height="190" rx="12" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="4 4" />
        <text x="385" y="30" textAnchor="middle" fill="var(--muted)" fontSize="10" fontWeight="bold" fontFamily="monospace">SPRING MICROSERVICES</text>

        {/* Services */}
        <rect x="305" y="45" width="160" height="34" rx="6" fill="var(--surface-soft)" stroke="var(--line)" />
        <text x="385" y="66" textAnchor="middle" fill="var(--foreground)" fontSize="11" fontFamily="sans-serif">Cinema & Seat Lock Service</text>

        <rect x="305" y="94" width="160" height="34" rx="6" fill="var(--surface-soft)" stroke="var(--line)" />
        <text x="385" y="115" textAnchor="middle" fill="var(--foreground)" fontSize="11" fontFamily="sans-serif">Ticket & Order Service</text>

        <rect x="305" y="143" width="160" height="34" rx="6" fill="var(--surface-soft)" stroke="var(--line)" />
        <text x="385" y="164" textAnchor="middle" fill="var(--foreground)" fontSize="11" fontFamily="sans-serif">AI Assistant Service</text>

        {/* Connection Gateway -> Microservices */}
        <path d="M 250 105 L 290 105" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />

        {/* Kafka & Cache layers */}
        <rect x="180" y="240" width="100" height="40" rx="8" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="230" y="260" textAnchor="middle" fill="var(--accent)" fontSize="11" fontWeight="bold" fontFamily="monospace">Redis Cache</text>
        <text x="230" y="272" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">Seat State Locks</text>

        <rect x="300" y="240" width="100" height="40" rx="8" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
        <text x="350" y="260" textAnchor="middle" fill="var(--foreground)" fontSize="11" fontWeight="bold" fontFamily="monospace">Apache Kafka</text>
        <text x="350" y="272" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">Async Booking Evt</text>

        {/* Databases */}
        <rect x="420" y="240" width="70" height="40" rx="8" fill="var(--surface-soft)" stroke="var(--line)" />
        <text x="455" y="260" textAnchor="middle" fill="var(--foreground)" fontSize="10" fontWeight="bold" fontFamily="monospace">Databases</text>
        <text x="455" y="272" textAnchor="middle" fill="var(--muted)" fontSize="8" fontFamily="sans-serif">MySQL/PG/Mongo</text>

        {/* Internal pipes */}
        <path d="M 385 79 L 385 94" stroke="var(--line)" strokeWidth="1.5" />
        <path d="M 385 128 L 385 143" stroke="var(--line)" strokeWidth="1.5" />
        
        {/* Gateway to Redis */}
        <path d="M 205 140 L 205 240" stroke="var(--muted)" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#arrow)" />
        
        {/* Ticket service to Kafka */}
        <path d="M 350 128 L 350 240" stroke="var(--muted)" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#arrow)" />

        {/* Services to DB */}
        <path d="M 465 110 L 480 110 L 480 240" stroke="var(--muted)" strokeWidth="1.2" markerEnd="url(#arrow)" />
      </svg>
    );
  }

  if (projectName === "HotelLink") {
    return (
      <svg width="500" height="260" viewBox="0 0 500 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)" />
          </marker>
        </defs>

        {/* React Client */}
        <rect x="20" y="100" width="110" height="60" rx="8" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
        <text x="75" y="125" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontWeight="bold" fontFamily="monospace">React Web App</text>
        <text x="75" y="140" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">Redux / Tailwind</text>

        {/* REST API */}
        <rect x="190" y="100" width="130" height="60" rx="8" fill="var(--surface-soft)" stroke="var(--accent)" strokeWidth="2" />
        <text x="255" y="125" textAnchor="middle" fill="var(--accent)" fontSize="12" fontWeight="bold" fontFamily="monospace">Spring Boot REST API</text>
        <text x="255" y="140" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">Security / Invoice Flow</text>

        {/* MariaDB Database */}
        <rect x="380" y="100" width="100" height="60" rx="8" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
        <text x="430" y="125" textAnchor="middle" fill="var(--foreground)" fontSize="12" fontWeight="bold" fontFamily="monospace">MariaDB SQL</text>
        <text x="430" y="140" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">Transactional DB</text>

        {/* Client -> Server */}
        <path d="M 130 130 L 182 130" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="156" y="120" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="monospace">HTTP / REST</text>

        {/* Server -> Database */}
        <path d="M 320 130 L 372 130" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="346" y="120" textAnchor="middle" fill="var(--accent)" fontSize="9" fontFamily="monospace">JPA / JDBC</text>

        {/* Docker Boundary */}
        <rect x="10" y="40" width="480" height="180" rx="12" stroke="var(--muted)" strokeWidth="1" strokeDasharray="6 6" />
        <text x="25" y="55" fill="var(--muted)" fontSize="9" fontWeight="bold" fontFamily="monospace">DOCKER COMPOSE ORCHESTRATION</text>

        {/* DevOps Note */}
        <rect x="190" y="230" width="130" height="24" rx="4" fill="var(--surface)" stroke="var(--line)" />
        <text x="255" y="246" textAnchor="middle" fill="var(--foreground)" fontSize="9" fontFamily="monospace">Deployed on AWS EC2 via GHA</text>
      </svg>
    );
  }

  if (projectName === "Zalo Clone") {
    return (
      <svg width="500" height="300" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)" />
          </marker>
        </defs>

        {/* Clients */}
        <rect x="20" y="50" width="110" height="50" rx="8" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
        <text x="75" y="75" textAnchor="middle" fill="var(--foreground)" fontSize="11" fontWeight="bold" fontFamily="monospace">React Vite (Web)</text>
        
        <rect x="20" y="130" width="110" height="50" rx="8" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
        <text x="75" y="155" textAnchor="middle" fill="var(--foreground)" fontSize="11" fontWeight="bold" fontFamily="monospace">Expo (Mobile)</text>

        {/* NestJS Backend */}
        <rect x="200" y="70" width="120" height="90" rx="8" fill="var(--surface-soft)" stroke="var(--accent)" strokeWidth="2" />
        <text x="260" y="95" textAnchor="middle" fill="var(--accent)" fontSize="12" fontWeight="bold" fontFamily="monospace">NestJS App</text>
        <text x="260" y="115" textAnchor="middle" fill="var(--foreground)" fontSize="9" fontFamily="sans-serif">Socket.IO Server</text>
        <text x="260" y="130" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">JWT Auth / Upload</text>

        {/* Redis Adapter */}
        <rect x="200" y="210" width="120" height="40" rx="6" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
        <text x="260" y="230" textAnchor="middle" fill="var(--foreground)" fontSize="11" fontWeight="bold" fontFamily="monospace">Redis Adapter</text>
        <text x="260" y="242" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">PubSub Sync State</text>

        {/* MongoDB */}
        <rect x="380" y="50" width="100" height="50" rx="8" fill="var(--surface)" stroke="var(--line)" />
        <text x="430" y="75" textAnchor="middle" fill="var(--foreground)" fontSize="11" fontWeight="bold" fontFamily="monospace">MongoDB</text>
        <text x="430" y="88" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">Message History</text>

        {/* S3 Media */}
        <rect x="380" y="130" width="100" height="50" rx="8" fill="var(--surface)" stroke="var(--line)" />
        <text x="430" y="155" textAnchor="middle" fill="var(--foreground)" fontSize="11" fontWeight="bold" fontFamily="monospace">AWS S3 Storage</text>
        <text x="430" y="168" textAnchor="middle" fill="var(--muted)" fontSize="9" fontFamily="sans-serif">Media Uploads</text>

        {/* Connect Clients to NestJS via Socket */}
        <path d="M 130 75 L 180 75 L 180 100 L 192 100" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <path d="M 130 155 L 180 155 L 180 130 L 192 130" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x="155" y="105" fill="var(--accent)" fontSize="8" fontWeight="bold" fontFamily="monospace">WSS</text>

        {/* NestJS to Redis */}
        <path d="M 260 160 L 260 202" stroke="var(--muted)" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#arrow)" />

        {/* NestJS to DB/S3 */}
        <path d="M 320 100 L 372 85" stroke="var(--muted)" strokeWidth="1.2" markerEnd="url(#arrow)" />
        <path d="M 320 130 L 372 145" stroke="var(--muted)" strokeWidth="1.2" markerEnd="url(#arrow)" />
      </svg>
    );
  }

  // Fallback generic diagram
  return (
    <div className="flex flex-col items-center gap-2 py-8 text-muted">
      <PortfolioIcon name="stack" size={48} />
      <p className="text-sm font-medium">System Design Overview</p>
    </div>
  );
}
