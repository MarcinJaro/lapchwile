import { CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ReservationCta } from "@/components/ReservationCta";
import { events, eventCategories } from "@/content/events";
import { eventsSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Wydarzenia i animacje weekendowe",
  description:
    "Kalendarz wydarzeń Łap Chwile: weekendowe animacje, warsztaty i dni tematyczne przy Porcie Pilawa w Nieporęcie.",
  path: "/wydarzenia",
});

const monthName = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pl-PL", {
    month: "long",
    year: "numeric",
  });

export default function WydarzeniaPage() {
  const schema = eventsSchema();
  const byMonth = new Map<string, typeof events>();
  for (const event of [...events].sort((a, b) => a.date.localeCompare(b.date))) {
    const key = monthName(event.date);
    byMonth.set(key, [...(byMonth.get(key) ?? []), event]);
  }

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <PageHeader
        eyebrow="Kalendarz"
        title="Wydarzenia"
        lead="Weekendowe animacje, warsztaty i dni tematyczne. Kalendarz aktualizujemy na bieżąco i nie publikujemy terminów, które nie są potwierdzone."
      />

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {byMonth.size === 0 ? (
          <div className="rounded-card border border-dashed border-ink/15 bg-white p-12 text-center">
            <CalendarBlank size={44} weight="duotone" className="mx-auto text-action" aria-hidden />
            <h2 className="mt-4 font-display text-2xl font-bold text-ink">
              Nowe terminy w przygotowaniu
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Właśnie układamy kalendarz na kolejne tygodnie: weekendowe animacje,
              warsztaty i dni tematyczne. Chcesz wiedzieć pierwszy? Napisz do nas.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/kontakt"
                className="rounded-full bg-action px-6 py-3 font-bold text-white hover:bg-action-dark"
              >
                Zapytaj o terminy
              </Link>
              <Link
                href="/urodziny"
                className="rounded-full border-2 border-action px-6 py-2.5 font-bold text-action hover:bg-action/8"
              >
                Zobacz urodziny
              </Link>
            </div>
          </div>
        ) : (
          [...byMonth.entries()].map(([month, monthEvents]) => (
            <section key={month} className="mb-12" aria-label={month}>
              <h2 className="font-display text-2xl font-bold capitalize text-ink">{month}</h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {monthEvents.map((event) => (
                  <li key={event.slug} className="rounded-card bg-white p-6">
                    <p className="text-sm font-bold uppercase tracking-wide text-action">
                      {new Date(`${event.date}T12:00:00`).toLocaleDateString("pl-PL", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                      {event.time ? `, ${event.time}` : ""}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-ink">{event.title}</h3>
                    <p className="mt-2 text-[15px] text-muted">{event.description}</p>
                    <p className="mt-3 text-sm font-semibold text-muted">
                      {eventCategories.find((c) => c.id === event.category)?.label}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </section>
      <ReservationCta />
    </>
  );
}
