import Link from "next/link";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { events, eventCategories } from "@/content/events";
import { balloonDecor } from "@/content/dekoracje";
import { FloatingBalloon } from "./FloatingBalloon";
import { Reveal } from "./Reveal";

const dayNumber = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pl-PL", { day: "numeric" });

const monthShort = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pl-PL", { month: "short" });

const weekday = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pl-PL", { weekday: "long" });

export function EventsPreview() {
  const upcoming = [...events]
    .filter((e) => e.date >= new Date().toISOString().slice(0, 10))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  return (
    <section className="relative isolate mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="wydarzenia-naglowek">
      <FloatingBalloon
        {...balloonDecor.zolty}
        className="-right-10 -top-4 w-24 opacity-85 sm:w-28"
        speed={-0.07}
        rotate={4}
      />
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="wydarzenia-naglowek" className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Najbliższe <span className="marker bg-pastel-blue">wydarzenia</span>
            </h2>
          </div>
          <Link href="/wydarzenia" className="group inline-flex items-center gap-1.5 font-bold text-action">
            <span className="underline-offset-4 group-hover:underline">Cały kalendarz</span>
            <ArrowRight size={18} weight="bold" aria-hidden className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>

      {upcoming.length === 0 ? (
        <Reveal className="mt-8">
          <div className="rounded-card border border-dashed border-ink/15 bg-white p-10 text-center">
            <CalendarBlank size={40} weight="duotone" className="mx-auto text-action" aria-hidden />
            <p className="mt-4 font-display text-xl font-bold text-ink">
              Kalendarz na kolejne tygodnie jest w przygotowaniu
            </p>
            <p className="mx-auto mt-2 max-w-md text-muted">
              Weekendowe animacje i warsztaty ogłaszamy na bieżąco. Zajrzyj wkrótce
              albo zapytaj nas o najbliższe terminy.
            </p>
            <Link href="/kontakt" className="mt-6 inline-block rounded-full border-2 border-action px-6 py-2.5 font-bold text-action transition-all hover:-translate-y-0.5 hover:bg-action/8">
              Zapytaj o terminy
            </Link>
          </div>
        </Reveal>
      ) : (
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {upcoming.map((event, i) => (
            <Reveal key={event.slug} delay={i * 0.08}>
              <li
                className={`group flex h-full gap-5 rounded-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10 ${
                  ["bg-pastel-blue", "bg-pastel-green", "bg-pastel-yellow"][i % 3]
                }`}
              >
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-white text-ink shadow-sm">
                  <span className="font-display text-2xl font-bold leading-none">
                    {dayNumber(event.date)}
                  </span>
                  <span className="text-xs font-semibold uppercase">{monthShort(event.date)}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold capitalize text-muted">
                    {weekday(event.date)}
                    {event.time ? `, ${event.time}` : ""}
                  </p>
                  <h3 className="mt-0.5 font-display text-xl font-bold text-ink">{event.title}</h3>
                  <p className="mt-1.5 text-sm font-bold uppercase tracking-wide text-ink/55">
                    {eventCategories.find((c) => c.id === event.category)?.label}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      )}
    </section>
  );
}
