"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import type { MediaVideo } from "@/content/media";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  type NetworkInformation = { saveData?: boolean };
  const connection = (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
  return !window.matchMedia(REDUCED_MOTION_QUERY).matches && !connection?.saveData;
}

/**
 * Portrait documentary video panel for the hero. The source archive contains
 * no landscape footage, so the hero uses the phone-format clip honestly,
 * as a vertical panel in the split layout.
 * Shows the poster only on reduced motion, save-data or when autoplay fails.
 */
export function HeroVideo({ video }: { video: MediaVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canAutoplay = useSyncExternalStore(subscribe, getSnapshot, () => false);

  useEffect(() => {
    if (!canAutoplay) return;
    videoRef.current?.play().catch(() => {
      // autoplay refused: the poster underneath stays visible
    });
  }, [canAutoplay]);

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-card bg-ink/5"
      role="img"
      aria-label={video.alt}
    >
      <Image
        src={video.poster}
        alt=""
        fill
        priority
        sizes="(min-width: 768px) 40vw, 100vw"
        className="object-cover"
      />
      {canAutoplay && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={video.poster}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={video.src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
