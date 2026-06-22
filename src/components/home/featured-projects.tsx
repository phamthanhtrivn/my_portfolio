"use client";

import { useState } from "react";
import {
  PortfolioIcon,
  getTechIconName,
  getTheSvgUrl,
} from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/portfolio-data";
import type { Project } from "@/lib/portfolio-data";

type FeaturedProjectsProps = {
  onSelectProject: (project: Project) => void;
};

export function FeaturedProjects({ onSelectProject }: FeaturedProjectsProps) {
  const featuredProjects = projects
    .filter((project) => project.spotlight)
    .slice(0, 4);

  return (
    <section
      id="projects"
      className="border-y border-line py-24 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="mono-label text-xs font-bold uppercase tracking-wider text-accent">
            featured projects
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Case Studies Built for Real Delivery
          </h2>
          <p className="mt-3 text-muted">
            Selected work that shows architecture, product thinking, and the
            visual detail I bring to shipped systems.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.08}>
              <ProjectShowcaseCard
                project={project}
                onSelect={() => onSelectProject(project)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectTechLogo({ item }: { item: string }) {
  const [error, setError] = useState(false);
  const svgUrl = getTheSvgUrl(item);

  if (svgUrl && !error) {
    return (
      <img
        src={svgUrl}
        alt={item}
        width={12}
        height={12}
        onError={() => setError(true)}
      />
    );
  }
  return (
    <PortfolioIcon
      name={getTechIconName(item)}
      size={12}
      className="text-accent"
    />
  );
}

function ProjectShowcaseCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: () => void;
}) {
  return (
    <article
      onClick={onSelect}
      className="relative group cursor-pointer overflow-hidden rounded-4xl border border-line bg-surface shadow-[0_20px_60px_-35px_rgba(0,0,0,0.22)] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_28px_70px_-38px_rgba(0,0,0,0.28)]"
    >
      {/* Subtle Background Hover Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.05),transparent_50%)] pointer-events-none" />

      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-6 sm:p-7 lg:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
            {project.status}
          </span>
          <span className="rounded-full border border-line bg-surface-soft px-3 py-1 text-xs font-semibold text-muted">
            {project.role}
          </span>
        </div>

        <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          {project.name}
        </h3>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
          {project.summary}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {project.features.slice(0, 2).map((feature) => (
            <div
              key={feature}
              className="rounded-2xl border border-line bg-surface-soft/60 p-4"
            >
              <p className="text-sm leading-6 text-muted">{feature}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.slice(0, 6).map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-background/60 px-3 py-1.5 text-xs font-medium text-muted transition group-hover:border-accent/30 group-hover:text-foreground"
            >
              <ProjectTechLogo item={item} />
              {item}
            </span>
          ))}
        </div>

        <button className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent transition group-hover:translate-x-0.5">
          Open case study
          <PortfolioIcon name="arrow" size={14} weight="bold" />
        </button>
      </div>
    </article>
  );
}
