"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PortfolioIcon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { profile } from "@/lib/portfolio-data";

export function Hero() {
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
            {profile.role}
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
          src="https://res.cloudinary.com/dcwauocnz/image/upload/v1781706758/avatar_sgqnrx.jpg"
          alt="Pham Thanh Tri portrait avatar"
          width={220}
          height={220}
          priority
          className="relative size-44 rounded-[1.45rem] border border-line object-cover shadow-sm sm:size-52"
        />
        <div className="absolute -bottom-3 left-1/2 w-3/4 -translate-x-1/2 rounded-full border border-line bg-background/90 px-3 py-1 text-[18px] font-semibold text-muted shadow-sm backdrop-blur-md">
          Pham Thanh Tri
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
