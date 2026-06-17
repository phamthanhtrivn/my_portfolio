"use client";

import { useState } from "react";
import { PortfolioIcon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { profile } from "@/lib/portfolio-data";
import type { FormEvent } from "react";

export function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = `Portfolio inquiry from ${formState.name || "a visitor"}`;
    const body = `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`;

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="border-t border-line bg-surface-soft/35 py-24 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="rounded-4xl border border-line bg-surface p-6 shadow-[0_18px_50px_-34px_rgba(0,0,0,0.2)] sm:p-8">
              <p className="mono-label text-xs font-bold uppercase tracking-wider text-accent">contact</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Let&apos;s build something that feels sharp and useful.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                If you have a product, role, or collaboration in mind, send a note. I usually reply fastest by email, but LinkedIn and GitHub are open too.
              </p>

              <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-foreground" htmlFor="name">Name</label>
                  <input
                    id="name"
                    value={formState.name}
                    onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
                    className="h-12 rounded-2xl border border-line bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-accent"
                    placeholder="Your name"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-foreground" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
                    className="h-12 rounded-2xl border border-line bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-accent"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-foreground" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formState.message}
                    onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))}
                    className="resize-none rounded-2xl border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-accent"
                    placeholder="Tell me about your project, timeline, or the role you have in mind."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-bold text-white transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:shadow-lg hover:shadow-accent/20 active:translate-y-px"
                >
                  Send Message
                  <PortfolioIcon name="arrow" size={16} weight="bold" />
                </button>
              </form>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-6">
              <div className="rounded-4xl border border-line bg-foreground p-6 text-background shadow-[0_18px_50px_-34px_rgba(0,0,0,0.45)] dark:bg-surface dark:text-foreground">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">direct email</p>
                <a href={`mailto:${profile.email}`} className="mt-3 block text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {profile.email}
                </a>
                <p className="mt-4 text-sm leading-6 text-background/75 dark:text-muted">
                  Fastest way to reach me for hiring, project work, or a short technical conversation.
                </p>
              </div>

              <div className="rounded-4xl border border-line bg-surface p-6 shadow-[0_18px_50px_-34px_rgba(0,0,0,0.18)]">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">social links</p>
                <div className="mt-4 grid gap-3">
                  {profile.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("#") ? undefined : "_blank"}
                      rel={link.href.startsWith("#") ? undefined : "noreferrer"}
                      className="flex items-center justify-between rounded-2xl border border-line bg-background px-4 py-3 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:text-accent"
                    >
                      <span>{link.label}</span>
                      <PortfolioIcon name="arrow" size={16} weight="bold" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
