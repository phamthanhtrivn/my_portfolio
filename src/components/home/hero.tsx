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
      id="home"
      className="relative isolate mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-7xl items-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <HeroAtmosphere />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Column: Objective and Achievements */}
        <Reveal className="flex w-full flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <h1 className="text-4xl font-extrabold leading-[1.03] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Ready to <span className="text-accent">Innovate</span>
          </h1>

          <div className="mt-6 w-full">
            <h3 className="flex items-center justify-center lg:justify-start gap-2 text-xl font-bold text-foreground">
              <PortfolioIcon
                name="resume"
                size={24}
                className="text-accent"
                weight="fill"
              />
              Overview
            </h3>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Backend & Full-Stack Developer passionate about building scalable
              systems, real-time applications, and AI-powered solutions.
              Experienced with Spring Boot, React, Microservices, Kafka, Redis,
              Docker, and AWS, with a strong focus on clean architecture,
              performance optimization, and cloud-native development.
            </p>
          </div>

          <div className="mt-8 w-full">
            <h3 className="flex items-center justify-center lg:justify-start gap-2 text-xl font-bold text-foreground">
              <PortfolioIcon
                name="lightning"
                size={24}
                className="text-accent"
                weight="fill"
              />
              Achievements & Background
            </h3>
            <ul className="mt-4 space-y-3 text-muted text-left inline-block w-fit lg:w-full">
              <li className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span>
                  <strong className="text-foreground">
                    TOEIC Certification:
                  </strong>{" "}
                  915 (Reading and Listening - Aug 2025)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span>
                  <strong className="text-foreground">Major:</strong> Software
                  Engineering - Industrial University of Ho Chi Minh City
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span>
                  <strong className="text-foreground">GPA:</strong> 3.46 / 4.0
                  (Received 4 academic scholarships)
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-3">
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
            <a
              href="/PhamThanhTri_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-surface-soft px-6 text-sm font-semibold text-foreground transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:bg-surface-hover hover:text-accent active:translate-y-px cursor-pointer border border-line"
            >
              <PortfolioIcon name="resume" size={18} />
              View Resume
            </a>
          </div>
        </Reveal>

        {/* Right Column: Avatar and Role */}
        <Reveal className="flex w-full flex-col items-center justify-center order-1 lg:order-2 gap-8">
          <div className="justify-center">
            <AvatarOrb prefersReducedMotion={prefersReducedMotion} />
          </div>

          <div className="text-center w-full max-w-md flex flex-col items-center justify-center">
            <h2 className="text-3xl font-extrabold text-foreground">
              {profile.name}
            </h2>
            <p className="mt-2 text-lg font-semibold text-accent uppercase tracking-widest">
              {profile.role}
            </p>
            <div className="mt-4 h-px w-16 bg-accent/30 mx-auto" />
            <p className="mt-4 text-muted leading-relaxed text-sm sm:text-base">
              {profile.intro}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AvatarOrb({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean | null;
}) {
  return (
    <motion.div
      className="group relative mx-auto lg:mx-0 w-fit justify-center items-center"
      whileHover={
        prefersReducedMotion ? undefined : { y: -6, rotate: 1.2, scale: 1.02 }
      }
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <div className="absolute -inset-4 rounded-3xl bg-accent/10 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative rounded-[1.75rem] border border-line bg-surface/60 p-2 shadow-xl backdrop-blur-sm">
        <Image
          src="https://res.cloudinary.com/dcwauocnz/image/upload/v1781706758/avatar_sgqnrx.jpg"
          alt="Pham Thanh Tri portrait avatar"
          width={270}
          height={270}
          priority
          className="relative size-60 sm:size-72 lg:size-[270px] rounded-2xl border border-line object-cover shadow-sm"
        />
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
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="hero-atmosphere absolute inset-0 opacity-80 dark:opacity-100" />

      <svg
        className="absolute inset-0 h-full w-full opacity-60 dark:opacity-70"
        viewBox="0 0 1200 720"
        preserveAspectRatio="none"
      >
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
        transition={{
          duration: 5.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      <motion.span
        className="absolute left-[73%] top-[28%] size-2.5 rounded-full bg-accent/80 shadow-[0_0_18px_rgba(37,99,235,0.4)]"
        animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
        transition={{
          duration: 6.8,
          repeat: Number.POSITIVE_INFINITY,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      <motion.span
        className="absolute left-[26%] top-[66%] size-2 rounded-full bg-accent/60 shadow-[0_0_14px_rgba(37,99,235,0.35)]"
        animate={{ y: [0, -8, 0], scale: [1, 0.9, 1] }}
        transition={{
          duration: 7.2,
          repeat: Number.POSITIVE_INFINITY,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      <div className="absolute left-[21%] top-[24.5%] h-px w-[22%] rotate-18 bg-linear-to-r from-transparent via-accent/35 to-transparent" />
      <div className="absolute left-[59%] top-[31%] h-px w-[18%] rotate-[-22deg] bg-linear-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute left-[29%] top-[63%] h-px w-[29%] rotate-9 bg-linear-to-r from-transparent via-accent/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-6 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="hero-code-marquee flex w-max items-center gap-12 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.34em] text-muted/60">
          <span>
            spring boot / microservices / kafka / redis / websocket / docker
          </span>

          <span>
            distributed systems / cloud deployment / ci-cd / aws / api gateway
          </span>

          <span>spring ai / rag / postgresql / event-driven architecture</span>

          <span>
            secure apis / oauth2 / jwt / scalable applications / real-time
            systems
          </span>
        </div>
      </div>
    </div>
  );
}
