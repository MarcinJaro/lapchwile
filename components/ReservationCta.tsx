import Link from "next/link";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/content/site-config";

export function ReservationCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-4 pt-8 sm:px-6">
      <div className="relative overflow-hidden rounded-card bg-action px-6 py-14 text-center text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-balloon-yellow/25 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-balloon-red/30 blur-2xl"
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
            className="rounded-full bg-white px-7 py-3.5 font-bold text-action transition-colors hover:bg-balloon-yellow hover:text-ink"
          >
            Zarezerwuj termin
          </Link>
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-7 py-3 font-bold text-white transition-colors hover:bg-white/10"
          >
            <Phone size={20} weight="bold" aria-hidden />
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
