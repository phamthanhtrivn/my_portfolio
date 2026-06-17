"use client";

import { PortfolioIcon, getTechIconName } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { skillGroups } from "@/lib/portfolio-data";

export function TechStack() {
  return (
    <section id="techstack" className="border-b border-line py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="mono-label text-xs font-bold uppercase tracking-wider text-accent">tech stack</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Organized by how I build products
          </h2>
          <p className="mt-3 text-muted">
            The stack is grouped by role so the system reads like a working production toolchain, not a keyword dump.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.06}>
              <div className="group h-full rounded-4xl border border-line bg-surface p-5 shadow-[0_16px_40px_-30px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-accent/30">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-accent/10 text-accent transition group-hover:scale-105">
                    <PortfolioIcon
                      name={index === 0 ? "backend" : index === 1 ? "database" : index === 2 ? "code" : "rocket"}
                      size={20}
                      weight="bold"
                    />
                  </span>
                  <div>
                    <h3 className="text-base font-bold tracking-tight text-foreground">{group.title}</h3>
                    <p className="text-xs uppercase tracking-[0.22em] text-muted">{group.items.length} tools</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-soft/80 px-3 py-1.5 text-xs font-medium text-muted transition group-hover:border-accent/20 group-hover:text-foreground"
                    >
                      <PortfolioIcon name={getTechIconName(item)} size={11} className="text-accent" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
