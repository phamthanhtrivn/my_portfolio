"use client";

import { PortfolioIcon, getTechIconName } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/portfolio-data";
import type { Project } from "@/lib/portfolio-data";

type FeaturedProjectsProps = {
  onSelectProject: (project: Project) => void;
};

export function FeaturedProjects({ onSelectProject }: FeaturedProjectsProps) {
  const featuredProjects = projects.filter((project) => project.spotlight).slice(0, 4);

  return (
    <section id="projects" className="border-y border-line py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="mono-label text-xs font-bold uppercase tracking-wider text-accent">featured projects</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Case Studies Built for Real Delivery
          </h2>
          <p className="mt-3 text-muted">
            Selected work that shows architecture, product thinking, and the visual detail I bring to shipped systems.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.08}>
              <ProjectShowcaseCard
                project={project}
                onSelect={() => onSelectProject(project)}
                reversed={index % 2 === 1}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectShowcaseCard({
  project,
  onSelect,
  reversed = false,
}: {
  project: Project;
  onSelect: () => void;
  reversed?: boolean;
}) {
  return (
    <article
      onClick={onSelect}
      className={`group overflow-hidden rounded-4xl border border-line bg-surface shadow-[0_20px_60px_-35px_rgba(0,0,0,0.22)] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_28px_70px_-38px_rgba(0,0,0,0.28)] ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      } lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch`}
    >
      <div className="p-6 sm:p-7 lg:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">{project.status}</span>
          <span className="rounded-full border border-line bg-surface-soft px-3 py-1 text-xs font-semibold text-muted">
            {project.role}
          </span>
        </div>

        <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{project.name}</h3>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">{project.summary}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {project.features.slice(0, 2).map((feature) => (
            <div key={feature} className="rounded-2xl border border-line bg-surface-soft/60 p-4">
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
              <PortfolioIcon name={getTechIconName(item)} size={11} className="text-accent" />
              {item}
            </span>
          ))}
        </div>

        <button className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent transition group-hover:translate-x-0.5">
          Open case study
          <PortfolioIcon name="arrow" size={14} weight="bold" />
        </button>
      </div>

      <ProjectMockup project={project} reversed={reversed} />
    </article>
  );
}

function ProjectMockup({ project, reversed }: { project: Project; reversed: boolean }) {
  return (
    <div className="relative min-h-88 border-t border-line bg-[linear-gradient(180deg,rgba(37,99,235,0.05),transparent_30%),radial-gradient(circle_at_top_right,rgba(37,99,235,0.14),transparent_38%)] p-5 sm:min-h-96 lg:border-t-0 lg:border-l">
      <div className={`absolute inset-5 rounded-[1.75rem] border border-line bg-background/70 p-4 shadow-inner transition duration-300 group-hover:-translate-y-0.5 ${reversed ? "lg:-rotate-1" : "lg:rotate-1"}`}>
        <div className="flex items-center gap-2 border-b border-line pb-3">
          <span className="size-3 rounded-full bg-[#ef4444]/80" />
          <span className="size-3 rounded-full bg-[#f59e0b]/80" />
          <span className="size-3 rounded-full bg-[#22c55e]/80" />
          <span className="ml-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
            Desktop Preview
          </span>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3 rounded-3xl border border-line bg-surface p-4">
            <div className="h-3 w-24 rounded-full bg-accent/20" />
            <div className="h-5 w-4/5 rounded-full bg-foreground/10" />
            <div className="h-5 w-3/5 rounded-full bg-foreground/10" />
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="h-20 rounded-2xl bg-accent/10" />
              <div className="h-20 rounded-2xl bg-surface-soft" />
              <div className="h-20 rounded-2xl bg-surface-soft" />
              <div className="h-20 rounded-2xl bg-accent/5" />
            </div>
          </div>

          <div className="relative flex items-end justify-center rounded-3xl border border-line bg-surface-soft/60 p-4">
            <div className="relative h-68 w-[8.3rem] overflow-hidden rounded-4xl border border-line bg-background p-2 shadow-[0_16px_40px_-28px_rgba(0,0,0,0.4)]">
              <div className="mx-auto mb-2 h-1.5 w-14 rounded-full bg-line" />
              <div className="h-full rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(37,99,235,0.16),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.12),transparent_42%),var(--surface)] p-3">
                <div className="h-14 rounded-2xl bg-foreground/10" />
                <div className="mt-3 space-y-2">
                  <div className="h-2.5 w-full rounded-full bg-foreground/10" />
                  <div className="h-2.5 w-4/5 rounded-full bg-foreground/10" />
                  <div className="h-2.5 w-2/3 rounded-full bg-foreground/10" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="h-12 rounded-2xl bg-accent/10" />
                  <div className="h-12 rounded-2xl bg-surface-soft" />
                </div>
              </div>
            </div>

            <div className="absolute right-4 top-4 rounded-full border border-line bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted shadow-sm">
              Mobile Preview
            </div>
          </div>
        </div>

        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-muted">
          {project.stack.slice(0, 3).join(" / ")}
        </p>
      </div>
    </div>
  );
}
