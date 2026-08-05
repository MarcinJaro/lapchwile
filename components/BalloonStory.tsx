"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { media, type MediaImage } from "@/content/media";

const FRAME_COUNT = 120;
const BACKGROUND = "#f7fbff";
const frameSrc = (i: number) =>
  `/frames/balloon/frame_${String(i + 1).padStart(4, "0")}.webp`;

type Stage = {
  /** [fadeInStart, fullFrom, fullTo, fadeOutEnd] as scroll progress */
  range: [number, number, number, number];
  text: string;
  photo?: MediaImage;
  /** which side the photo enters from */
  side?: "left" | "right";
};

const stages: Stage[] = [
  { range: [0, 0.01, 0.14, 0.18], text: "Chwile mają to do siebie, że szybko uciekają." },
  {
    range: [0.22, 0.27, 0.38, 0.42],
    text: "Najpierw jest ruch.",
    photo: media.biegPoTrawie,
    side: "left",
  },
  {
    range: [0.46, 0.51, 0.62, 0.66],
    text: "Potem pomysł.",
    photo: media.stolikKolorowanki,
    side: "right",
  },
  {
    range: [0.7, 0.75, 0.84, 0.88],
    text: "A później zostaje wspomnienie.",
    photo: media.dzieciPrzySciance,
    side: "left",
  },
];

export function BalloonStory() {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return <StaticStory poster="/frames/balloon/poster-end.webp" />;
  return <ScrubStory />;
}

/** Reduced-motion and missing-frames fallback: key end frame, no scrubbing. */
function StaticStory({ poster }: { poster: string }) {
  return (
    <section
      aria-label="Balon Łap Chwile z czerwoną wstążką"
      className="relative overflow-hidden bg-cloud"
    >
      <div className="relative mx-auto flex min-h-[80dvh] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <Image
          src={poster}
          alt=""
          fill
          sizes="100vw"
          className="object-contain object-center opacity-90"
        />
        <div className="relative">
          <h2 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-bold text-ink">
            Złapmy Wasz termin.
          </h2>
          <Link
            href="/rezerwacja"
            className="mt-8 inline-block rounded-full bg-action px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-action-dark"
          >
            Zarezerwuj urodziny
          </Link>
        </div>
      </div>
    </section>
  );
}

function ScrubStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [framesMissing, setFramesMissing] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const frame = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const draw = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // never flash blank: fall back to the nearest loaded frame
    let i = Math.round(index);
    if (!loadedRef.current[i]) {
      let best = -1;
      for (let d = 0; d < FRAME_COUNT; d++) {
        if (loadedRef.current[i - d]) {
          best = i - d;
          break;
        }
        if (loadedRef.current[i + d]) {
          best = i + d;
          break;
        }
      }
      if (best < 0) return;
      i = best;
    }
    const img = imagesRef.current[i];
    if (!img) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, cssW, cssH);

    // cover only on wide viewports where cropping the 16:9 frame is safe;
    // contain (letterboxed into the identical background) everywhere else
    const useCover = cssW / cssH >= 1.2;
    const scale = useCover
      ? Math.max(cssW / img.width, cssH / img.height)
      : Math.min(cssW / img.width, cssH / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    const x = (cssW - w) / 2;
    const y = (cssH - h) / 2;
    ctx.drawImage(img, x, y, w, h);

    // the generated frames carry a subtle daylight gradient, so in contain
    // mode feather the frame edges into the page background to hide seams
    if (!useCover) {
      const transparent = "rgba(247,251,255,0)";
      if (h < cssH - 1) {
        const f = Math.min(64, h * 0.1);
        let g = ctx.createLinearGradient(0, y, 0, y + f);
        g.addColorStop(0, BACKGROUND);
        g.addColorStop(1, transparent);
        ctx.fillStyle = g;
        ctx.fillRect(0, y, cssW, f);
        g = ctx.createLinearGradient(0, y + h, 0, y + h - f);
        g.addColorStop(0, BACKGROUND);
        g.addColorStop(1, transparent);
        ctx.fillStyle = g;
        ctx.fillRect(0, y + h - f, cssW, f);
      }
      if (w < cssW - 1) {
        const f = Math.min(64, w * 0.1);
        let g = ctx.createLinearGradient(x, 0, x + f, 0);
        g.addColorStop(0, BACKGROUND);
        g.addColorStop(1, transparent);
        ctx.fillStyle = g;
        ctx.fillRect(x, 0, f, cssH);
        g = ctx.createLinearGradient(x + w, 0, x + w - f, 0);
        g.addColorStop(0, BACKGROUND);
        g.addColorStop(1, transparent);
        ctx.fillStyle = g;
        ctx.fillRect(x + w - f, 0, f, cssH);
      }
    }
  }, []);

  const scheduleDraw = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      draw(currentFrameRef.current);
    });
  }, [draw]);

  useMotionValueEvent(frame, "change", (v) => {
    currentFrameRef.current = v;
    scheduleDraw();
  });

  // chunked preloading: first frame immediately, the rest in groups of 15
  useEffect(() => {
    let cancelled = false;
    loadedRef.current = new Array(FRAME_COUNT).fill(false);
    imagesRef.current = new Array(FRAME_COUNT).fill(null);

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new window.Image();
        img.onload = () => {
          if (cancelled) return resolve();
          imagesRef.current[i] = img;
          loadedRef.current[i] = true;
          if (i === 0) setFirstFrameReady(true);
          resolve();
        };
        img.onerror = () => {
          if (i === 0 && !cancelled) setFramesMissing(true);
          resolve();
        };
        img.src = frameSrc(i);
      });

    (async () => {
      await load(0);
      scheduleDraw();
      for (let start = 1; start < FRAME_COUNT && !cancelled; start += 15) {
        const chunk = [];
        for (let i = start; i < Math.min(start + 15, FRAME_COUNT); i++) chunk.push(load(i));
        await Promise.all(chunk);
        scheduleDraw();
      }
    })();

    return () => {
      cancelled = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [scheduleDraw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => scheduleDraw());
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [scheduleDraw]);

  const ctaOpacity = useTransform(scrollYProgress, [0.92, 0.97], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.92, 0.97], [24, 0]);
  const ctaPointer = useTransform(scrollYProgress, (v) =>
    v > 0.92 ? ("auto" as const) : ("none" as const)
  );

  if (framesMissing) return <StaticStory poster="/frames/balloon/poster-start.webp" />;

  return (
    <section
      ref={sectionRef}
      aria-label="Opowieść o balonie, który łapie chwile"
      className="relative min-h-[400dvh] bg-cloud"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {!firstFrameReady && (
          <div aria-hidden className="absolute inset-0 animate-pulse bg-cloud">
            {/* skeleton-like poster, no spinner */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/frames/balloon/poster-start.webp"
              alt=""
              className="h-full w-full object-contain opacity-60"
            />
          </div>
        )}
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Kobaltowy balon z czerwoną wstążką unosi się nad jasnym tłem"
          className="absolute inset-0 h-full w-full"
        />

        {stages.map((stage) => (
          <StoryStage key={stage.text} stage={stage} progress={scrollYProgress} />
        ))}

        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaPointer }}
          className="absolute inset-x-4 top-1/2 -translate-y-1/2 text-center"
        >
          <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-bold text-ink">
            Złapmy Wasz termin.
          </h2>
          <Link
            href="/rezerwacja"
            className="mt-7 inline-block rounded-full bg-action px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-action-dark"
          >
            Zarezerwuj urodziny
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function StoryStage({
  stage,
  progress,
}: {
  stage: Stage;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [a, b, c, d] = stage.range;
  const opacity = useTransform(progress, [a, b, c, d], [0, 1, 1, 0]);
  const y = useTransform(progress, [a, b, c, d], [28, 0, 0, -20]);

  const fromLeft = stage.side !== "right";
  const photoX = useTransform(
    progress,
    [a, b, c, d],
    fromLeft ? [-64, 0, 0, -24] : [64, 0, 0, 24]
  );
  const photoClip = useTransform(
    progress,
    [a, b],
    fromLeft
      ? ["inset(0% 100% 0% 0% round 20px)", "inset(0% 0% 0% 0% round 20px)"]
      : ["inset(0% 0% 0% 100% round 20px)", "inset(0% 0% 0% 0% round 20px)"]
  );

  return (
    <>
      <motion.p
        style={{ opacity, y }}
        className={`pointer-events-none absolute inset-x-4 top-[14dvh] mx-auto max-w-xl text-center font-display text-[clamp(1.6rem,4vw,2.8rem)] font-bold leading-tight text-ink md:top-[18dvh] ${
          stage.photo ? (fromLeft ? "md:right-[8%] md:left-auto md:text-right" : "md:left-[8%] md:right-auto md:text-left") : ""
        }`}
      >
        {stage.text}
      </motion.p>

      {stage.photo && (
        <motion.div
          style={{ opacity, x: photoX, clipPath: photoClip }}
          className={`pointer-events-none absolute bottom-[10dvh] w-[46vw] max-w-[220px] md:bottom-auto md:top-1/2 md:w-[24vw] md:max-w-[330px] md:-translate-y-1/2 ${
            fromLeft ? "left-4 md:left-[7%] -rotate-2" : "right-4 md:right-[7%] rotate-2"
          }`}
        >
          <Image
            src={stage.photo.src}
            alt={stage.photo.alt}
            width={stage.photo.width}
            height={stage.photo.height}
            sizes="(min-width: 768px) 24vw, 46vw"
            className="rounded-card shadow-xl shadow-ink/15"
          />
        </motion.div>
      )}
    </>
  );
}
