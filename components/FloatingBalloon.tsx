"use client";

import { useRef } from "react";
import Image from "next/image";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

/**
 * Decorative parallax balloon floating behind section content.
 * Place inside a section with `relative isolate`; the balloon renders at
 * -z-10 (above the page background, below the section's content).
 * Parallax writes the transform directly on scroll (same pattern as the
 * BalloonStory canvas). Purely decorative: aria-hidden, pointer-events-none,
 * static when the visitor prefers reduced motion.
 */
export function FloatingBalloon({
  src,
  width,
  height,
  className = "",
  speed = -0.12,
  rotate = 0,
}: {
  src: string;
  width: number;
  height: number;
  /** positioning + width classes, e.g. "-right-8 top-10 w-36 opacity-80" */
  className?: string;
  /** parallax factor vs page scroll; negative drifts upward */
  speed?: number;
  rotate?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    if (prefersReducedMotion || !ref.current) return;
    ref.current.style.transform = `translateY(${Math.round(value * speed)}px) rotate(${rotate}deg)`;
  });

  return (
    <div
      ref={ref}
      aria-hidden
      style={{ transform: `rotate(${rotate}deg)` }}
      className={`pointer-events-none absolute -z-10 will-change-transform ${className}`}
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className="h-auto w-full drop-shadow-lg motion-safe:animate-float-slow"
      />
    </div>
  );
}
