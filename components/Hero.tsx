import Link from "next/link";
import { HeroVideo } from "./HeroVideo";
import { Sparkle } from "./Sparkle";
import { media } from "@/content/media";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-balloon-yellow/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-action/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[38%] top-16 h-40 w-40 rounded-full bg-balloon-green/10 blur-2xl"
      />

      <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:py-6">
        <div className="relative max-w-xl motion-safe:animate-fade-up">
          <Sparkle
            size={22}
            className="absolute -left-8 -top-6 hidden text-balloon-yellow motion-safe:animate-float lg:block"
          />
          <Sparkle
            size={13}
            className="absolute -left-3 top-24 hidden text-balloon-red motion-safe:animate-float-slow lg:block"
          />
          <Sparkle
            size={15}
            className="absolute right-2 top-0 text-balloon-green motion-safe:animate-float"
          />

          <p className="inline-flex items-center gap-2 rounded-full bg-balloon-green/12 px-4 py-1.5 text-sm font-bold text-balloon-green">
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-balloon-green opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-balloon-green" />
            </span>
            Nieporęt, Zalew Zegrzyński
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.2rem)] font-bold leading-[1.04] tracking-tight text-ink">
            Łap Chwile. Urodziny, które zostają na{" "}
            <span className="relative inline-block text-action">
              długo.
              <svg
                aria-hidden
                viewBox="0 0 120 12"
                className="absolute -bottom-1 left-0 w-full text-balloon-yellow"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9 Q 60 1 118 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Tor Ninja, twórcze warsztaty i animacje w jednym miejscu nad Zalewem
            Zegrzyńskim.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/rezerwacja"
              className="rounded-full bg-action px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-action/20 transition-all hover:-translate-y-0.5 hover:bg-action-dark hover:shadow-xl hover:shadow-action/30 active:translate-y-0"
            >
              Zarezerwuj urodziny
            </Link>
            <Link
              href="/atrakcje"
              className="rounded-full border-2 border-action px-7 py-3 text-base font-bold text-action transition-all hover:-translate-y-0.5 hover:bg-action/8 active:translate-y-0"
            >
              Zobacz atrakcje
            </Link>
          </div>
          <p className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="h-2 w-2 rounded-full bg-balloon-red" />
              Pakiety od 799 zł
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="h-2 w-2 rounded-full bg-balloon-yellow" />
              15 motywów tematycznych
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="h-2 w-2 rounded-full bg-balloon-green" />
              Cała strefa na wyłączność
            </span>
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[340px] motion-safe:animate-fade-up motion-safe:[animation-delay:0.15s] md:mx-0 md:ml-auto md:max-w-[380px]">
          <div
            aria-hidden
            className="absolute -left-4 -top-4 h-full w-full -rotate-2 rounded-card bg-balloon-red/15"
          />
          <div
            aria-hidden
            className="absolute -bottom-4 -right-4 h-full w-full rotate-2 rounded-card bg-balloon-yellow/20"
          />
          <div className="relative aspect-[9/14] md:aspect-[9/15]">
            <HeroVideo video={media.heroVideo} />
          </div>
          <p className="absolute -bottom-3 left-4 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-ink shadow-lg">
            Prawdziwe chwile z naszej strefy
          </p>
          <Sparkle
            size={18}
            className="absolute -right-6 -top-5 text-action motion-safe:animate-float-slow"
          />
        </div>
      </div>
    </section>
  );
}
