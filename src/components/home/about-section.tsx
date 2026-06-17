"use client";

import Image from "next/image";
import { PortfolioIcon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { profile } from "@/lib/portfolio-data";

export function AboutSection() {
  const hobbies = ["Travel", "Music", "Gym", "Photography", "Systems Design"];

  return (
    <section id="about" className="border-b border-line bg-surface-soft/35 py-24 transition-colors duration-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Reveal>
          <div className="sticky top-24 space-y-6 lg:pr-8">
            <p className="mono-label text-xs font-bold uppercase tracking-wider text-accent">about me</p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Building products, but also a life around curiosity.
            </h2>

            <div className="overflow-hidden rounded-4xl border border-line bg-surface p-4 shadow-[0_16px_40px_-30px_rgba(0,0,0,0.22)]">
              <Image
                src="https://github.com/phamthanhtrivn.png"
                alt="Portrait of Pham Thanh Tri"
                width={720}
                height={720}
                className="aspect-square w-full rounded-3xl border border-line object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {hobbies.map((item) => (
                <span key={item} className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-muted">
                  {item}
                </span>
              ))}
            </div>

            <a
              href="/PhamThanhTri_CV.pdf"
              download
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:opacity-90 active:translate-y-px"
            >
              <PortfolioIcon name="resume" size={18} weight="bold" />
              Download CV
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid gap-6 rounded-4xl border border-line bg-surface p-6 shadow-[0_20px_50px_-34px_rgba(0,0,0,0.18)] sm:p-8">
            <p className="text-base leading-8 text-muted sm:text-lg">{profile.intro}</p>
            <p className="text-base leading-8 text-muted sm:text-lg">
              I like software that feels calm under pressure: clear state boundaries, reliable deployment paths, and interfaces that help people move without friction.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-line bg-surface-soft/60 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">Focus</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Backend reliability, frontend polish, and product flows that scale across desktop and mobile.
                </p>
              </div>
              <div className="rounded-3xl border border-line bg-surface-soft/60 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">What I value</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Clean architecture, practical performance, and design details that make a portfolio feel human.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
