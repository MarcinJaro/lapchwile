import Link from "next/link";
import { CalendarCheck, Percent, Ticket } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/PageHeader";
import { PdfDownload } from "@/components/PdfDownload";
import { ReservationCta } from "@/components/ReservationCta";
import {
  bookingRules,
  discounts,
  entryTicketsNote,
  extras,
  packages,
  pricingNotes,
} from "@/content/pricing";
import { siteConfig } from "@/content/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cennik urodzin: pakiety od 799 zł",
  description:
    "Pakiety urodzinowe Łap Chwile: Mała Przygoda od 799 zł, Złapana Chwila od 1099 zł, Wielka Impreza od 1699 zł. Dodatki, zniżki i zasady rezerwacji.",
  path: "/cennik",
});

export default function CennikPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cennik"
        title="Trzy opcje świętowania"
        lead="Wybierz pakiet dopasowany do liczby gości i planu na przyjęcie. Pierwsza cena obowiązuje od poniedziałku do czwartku, druga w weekendy (piątek-niedziela)."
      />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className={`relative flex flex-col rounded-card p-7 ${
                pkg.highlighted
                  ? "bg-action text-white shadow-xl shadow-action/25"
                  : "bg-cream text-ink"
              }`}
            >
              {pkg.highlighted && (
                <p className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-balloon-yellow px-4 py-1 text-sm font-bold text-ink">
                  Najczęściej wybierany
                </p>
              )}
              <p
                className={`text-sm font-bold uppercase tracking-wide ${
                  pkg.highlighted ? "text-balloon-yellow" : "text-action"
                }`}
              >
                {pkg.tier}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold">{pkg.name}</h2>
              <p className="mt-3 font-display text-3xl font-bold">
                {pkg.priceWeekday}
              </p>
              <p className={`text-sm font-semibold ${pkg.highlighted ? "text-white/80" : "text-muted"}`}>
                weekendy: {pkg.priceWeekend}
              </p>
              <p className={`mt-2 text-sm font-bold ${pkg.highlighted ? "text-white/90" : "text-ink/80"}`}>
                {pkg.maxChildren} · {pkg.duration}
              </p>
              <p className={`mt-4 text-[15px] leading-relaxed ${pkg.highlighted ? "text-white/90" : "text-muted"}`}>
                {pkg.description}
              </p>
              <ul
                className={`mt-5 space-y-2 border-t pt-5 text-[15px] ${
                  pkg.highlighted
                    ? "border-white/20 text-white/90"
                    : "border-ink/10 text-muted"
                }`}
              >
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className={pkg.highlighted ? "text-balloon-yellow" : "text-balloon-green"}>
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className={`mt-5 text-sm italic ${pkg.highlighted ? "text-white/75" : "text-muted"}`}>
                {pkg.audience}
              </p>
              <Link
                href="/rezerwacja"
                className={`mt-6 rounded-full px-6 py-3 text-center font-bold transition-colors ${
                  pkg.highlighted
                    ? "bg-white text-action hover:bg-balloon-yellow hover:text-ink"
                    : "bg-action text-white hover:bg-action-dark"
                }`}
              >
                Zarezerwuj {pkg.tier}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-6 space-y-1.5 text-center text-sm text-muted">
          {pricingNotes.map((note) => (
            <p key={note.slice(0, 30)}>{note}</p>
          ))}
        </div>

        <section
          aria-labelledby="poczestunek-naglowek"
          className="mt-14"
        >
          <h2 id="poczestunek-naglowek" className="font-display text-2xl font-bold text-ink">
            Poczęstunek: co dokładnie podajemy?
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {packages.map((pkg) => (
              <div key={pkg.id} className="rounded-card border border-ink/8 bg-cloud p-6">
                <h3 className="font-display text-lg font-bold text-ink">{pkg.tier}</h3>
                <ul className="mt-3 space-y-1.5 text-[15px] text-muted">
                  {pkg.food.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <section aria-labelledby="dodatki-naglowek" className="rounded-card bg-cream p-7">
            <h2 id="dodatki-naglowek" className="font-display text-2xl font-bold text-ink">
              Dodatki płatne
            </h2>
            <ul className="mt-4 divide-y divide-ink/8">
              {extras.map((extra) => (
                <li key={extra.name} className="flex items-center justify-between gap-4 py-3">
                  <span className="font-semibold text-ink">{extra.name}</span>
                  <span className="whitespace-nowrap font-bold text-action">{extra.price}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-col gap-4">
            <section aria-labelledby="rezerwacja-naglowek" className="rounded-card bg-cream p-7">
              <h2 id="rezerwacja-naglowek" className="flex items-center gap-2.5 font-display text-2xl font-bold text-ink">
                <CalendarCheck size={26} weight="duotone" className="text-action" aria-hidden />
                Zasady rezerwacji
              </h2>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {bookingRules.map((rule) => (
                  <li key={rule.label} className="flex items-baseline justify-between gap-4">
                    <span className="font-semibold text-ink">{rule.label}</span>
                    <span className="text-right text-muted">{rule.value}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="znizki-naglowek" className="rounded-card bg-cream p-7">
              <h2 id="znizki-naglowek" className="flex items-center gap-2.5 font-display text-2xl font-bold text-ink">
                <Percent size={26} weight="duotone" className="text-action" aria-hidden />
                Zniżki
              </h2>
              <ul className="mt-4 space-y-2 text-[15px] text-muted">
                {discounts.map((discount) => (
                  <li key={discount}>{discount}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <section aria-label="Bilety wstępu" className="mt-10 rounded-card border border-dashed border-ink/15 p-7">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-bold text-ink">
            <Ticket size={24} weight="duotone" className="text-action" aria-hidden />
            Wstęp poza urodzinami
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            {entryTicketsNote}
          </p>
        </section>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <PdfDownload href={siteConfig.downloads.cennikPdf} label="Oferta urodzinowa" />
          <Link
            href="/kontakt"
            className="rounded-full border-2 border-action px-6 py-2.5 font-bold text-action hover:bg-action/8"
          >
            Masz pytania? Napisz do nas
          </Link>
        </div>
      </section>
      <ReservationCta />
    </>
  );
}
