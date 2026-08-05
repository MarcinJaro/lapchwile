import Link from "next/link";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { events, eventCategories } from "@/content/events";

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
  });

export function EventsPreview() {
  const upcoming = [...events]
    .filter((e) => e.date >= new Date().toISOString().slice(0, 10))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="wydarzenia-naglowek">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="wydarzenia-naglowek" className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Najbliższe wydarzenia
        </h2>
        <Link href="/wydarzenia" className="inline-flex items-center gap-1.5 font-bold text-action hover:underline">
          Cały kalendarz <ArrowRight size={18} weight="bold" aria-hidden />
        </Link>
      </div>

      {upcoming.length === 0 ? (
        <div className="mt-8 rounded-card border border-dashed border-ink/15 bg-cream p-10 text-center">
          <CalendarBlank size={40} weight="duotone" className="mx-auto text-action" aria-hidden />
          <p className="mt-4 font-display text-xl font-bold text-ink">
            Kalendarz na kolejne tygodnie jest w przygotowaniu
          </p>
          <p className="mx-auto mt-2 max-w-md text-muted">
            Weekendowe animacje i warsztaty ogłaszamy na bieżąco. Zajrzyj wkrótce
            albo zapytaj nas o najbliższe terminy.
          </p>
          <Link href="/kontakt" className="mt-6 inline-block rounded-full border-2 border-action px-6 py-2.5 font-bold text-action hover:bg-action/8">
            Zapytaj o terminy
          </Link>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {upcoming.map((event) => (
            <li key={event.slug} className="rounded-card bg-cream p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-action">
                {formatDate(event.date)}
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
      )}
    </section>
  );
}
