import Link from "next/link";
import { HeroVideo } from "./HeroVideo";
import { media } from "@/content/media";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-balloon-yellow/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-action/10 blur-3xl"
      />
      <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:py-6">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-balloon-green/12 px-4 py-1.5 text-sm font-bold text-balloon-green">
            Nieporęt, Zalew Zegrzyński
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.2rem)] font-bold leading-[1.05] tracking-tight text-ink">
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
              className="rounded-full bg-action px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-action-dark"
            >
              Zarezerwuj urodziny
            </Link>
            <Link
              href="/atrakcje"
              className="rounded-full border-2 border-action px-7 py-3 text-base font-bold text-action transition-colors hover:bg-action/8"
            >
              Zobacz atrakcje
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-[9/14] w-full max-w-[340px] md:mx-0 md:ml-auto md:aspect-[9/15] md:max-w-[380px]">
          <div
            aria-hidden
            className="absolute -left-4 -top-4 h-full w-full rounded-card bg-balloon-red/15"
          />
          <HeroVideo video={media.heroVideo} />
        </div>
      </div>
    </section>
  );
}
