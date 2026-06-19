"use client";

import { useState, useEffect } from "react";
import { PortfolioIcon } from "@/components/icon";
import { profile } from "@/lib/portfolio-data";

type HeaderProps = {
  navItems: Array<{ label: string; href: string }>;
  onOpenTerminal: () => void;
};

export function Header({ navItems, onOpenTerminal }: HeaderProps) {
  const [activeSection, setActiveSection] = useState<string>("#home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" },
    );

    navItems.forEach((item) => {
      const id = item.href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [navItems]);

  return (
    <header className="sticky top-0 z-40 glass-header">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="flex items-center gap-3 font-bold text-foreground"
        >
          <span className="grid size-9 place-items-center rounded-lg border border-line bg-surface text-sm font-semibold shadow-sm text-accent">
            PT
          </span>
          <span className="hidden sm:inline tracking-tight font-extrabold">
            {profile.name}
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-surface-soft text-accent"
                    : "text-muted hover:bg-surface-soft hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTerminal}
            className="flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-muted hover:bg-surface-soft hover:text-accent transition-all active:translate-y-px cursor-pointer"
            title="Open Interactive CLI Terminal"
            aria-label="Open CLI Terminal"
          >
            <PortfolioIcon name="backend" size={18} weight="bold" />
          </button>

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
