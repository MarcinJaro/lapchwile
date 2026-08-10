"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Decorative parallax balloon floating behind section content.
 * Place inside a section with `relative isolate`; the balloon renders at
 * -z-10 (above the page background, below the section's content).
 * Purely decorative: aria-hidden, pointer-events-none, static when the
 * visitor prefers reduced motion.
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
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (value) => value * speed);

  const img = (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      className="h-auto w-full drop-shadow-lg motion-safe:animate-float-slow"
    />
  );

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden
        style={{ rotate: `${rotate}deg` }}
        className={`pointer-events-none absolute -z-10 ${className}`}
      >
        {img}
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden
      style={{ y, rotate }}
      className={`pointer-events-none absolute -z-10 ${className}`}
    >
      {img}
    </motion.div>
  );
}
