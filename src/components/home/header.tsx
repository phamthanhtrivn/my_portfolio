"use client";

import { useState, useEffect } from "react";
import { PortfolioIcon } from "@/components/icon";
import { profile } from "@/lib/portfolio-data";
import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "@/components/theme-provider";

type HeaderProps = {
  navItems: Array<{ label: string; href: string }>;
  onOpenTerminal: () => void;
};

export function Header({ navItems, onOpenTerminal }: HeaderProps) {
  const [activeSection, setActiveSection] = useState<string>("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isMobile: boolean,
  ) => {
    e.preventDefault();
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      setTimeout(
        () => {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", href);
        },
        isMobile ? 150 : 0,
      );
    }
  };

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      // If we've scrolled to the very bottom of the page, force the last nav item to be active
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        const lastItem = navItems[navItems.length - 1];
        if (lastItem) setActiveSection(lastItem.href);
      }
    };
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        // Only update from observer if we are not at the very bottom
        if (
          window.innerHeight + window.scrollY <
          document.body.offsetHeight - 50
        ) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${entry.target.id}`);
            }
          });
        }
      },
      // Adjusted rootMargin to make it easier for smaller sections to trigger
      { rootMargin: "-20% 0px -50% 0px" },
    );

    navItems.forEach((item) => {
      const id = item.href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
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
                onClick={(e) => handleNavClick(e, item.href, false)}
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
          {mounted && (
            <button
              onClick={toggleTheme}
              className="flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-muted hover:bg-surface-soft hover:text-accent transition-all active:translate-y-px cursor-pointer"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              <PortfolioIcon
                name={theme === "dark" ? "sun" : "moon"}
                size={18}
                weight="bold"
              />
            </button>
          )}

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

          {/* Mobile menu toggle */}
          <button
            className="flex md:hidden size-10 items-center justify-center rounded-lg border border-line bg-surface text-foreground hover:bg-surface-soft transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full border-t border-line bg-surface overflow-hidden shadow-xl rounded-b-2xl"
          >
            <div className="flex flex-col px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, true)}
                    className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
