"use client";

import { useEffect, useRef } from "react";

export function GlowingTracker() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial position to center of viewport
    if (containerRef.current) {
      containerRef.current.style.setProperty("--mouse-x", `${window.innerWidth / 2}px`);
      containerRef.current.style.setProperty("--mouse-y", `${window.innerHeight / 2}px`);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      containerRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
      containerRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-20 hidden opacity-0 transition-opacity duration-1000 dark:block dark:opacity-100"
      style={{
        background: "radial-gradient(500px circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(20, 184, 166, 0.12), transparent 80%)",
      }}
    />
  );
}
