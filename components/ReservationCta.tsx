import Link from "next/link";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/content/site-config";
import { Sparkle } from "./Sparkle";

export function ReservationCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-4 pt-8 sm:px-6">
      <div className="relative overflow-hidden rounded-card bg-action px-6 py-16 text-center text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-balloon-yellow/25 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-12 bottom-0 h-44 w-44 rounded-full bg-balloon-red/30 blur-2xl"
        />
        <svg
          aria-hidden
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-2 h-12 w-full text-balloon-red/50"
        >
          <path
            d="M-20 60 C 200 10 400 75 620 40 C 840 5 1040 65 1220 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        <Sparkle
          size={20}
          className="absolute left-[12%] top-10 text-balloon-yellow motion-safe:animate-float"
        />
        <Sparkle
          size={14}
          className="absolute right-[14%] top-16 text-white/70 motion-safe:animate-float-slow"
        />
        <Sparkle
          size={12}
          className="absolute bottom-12 left-[22%] text-balloon-green motion-safe:animate-float-slow"
        />
        <h2 className="relative font-display text-3xl font-bold sm:text-4xl">
          Zaplanujmy Wasze urodziny
        </h2>
        <p className="relative mx-auto mt-3 max-w-lg text-white/85">
          Wypełnij formularz rezerwacji albo po prostu zadzwoń. Odpowiadamy szybko
          i pomagamy dobrać termin oraz motyw.
        </p>
        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/rezerwacja"
            className="rounded-full bg-white px-7 py-3.5 font-bold text-action shadow-lg shadow-ink/10 transition-all hover:-translate-y-0.5 hover:bg-balloon-yellow hover:text-ink active:translate-y-0"
          >
            Zarezerwuj termin
          </Link>
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-7 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0"
          >
            <Phone size={20} weight="bold" aria-hidden />
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
