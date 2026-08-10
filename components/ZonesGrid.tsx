import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { zones } from "@/content/zones";
import { Reveal } from "./Reveal";

const accentBar: Record<string, string> = {
  red: "bg-balloon-red",
  yellow: "bg-balloon-yellow",
  green: "bg-balloon-green",
  blue: "bg-action",
};

/** Asymmetric five-tile editorial grid: first tile spans two rows on desktop. */
export function ZonesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="strefy-naglowek">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-balloon-red">
              Strefy zabawy
            </p>
            <h2 id="strefy-naglowek" className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
              Nasze strefy
            </h2>
            <p className="mt-2 max-w-lg text-muted">
              Każda strefa to inny rodzaj zabawy. Wszystkie są na świeżym powietrzu,
              między drzewami przy Porcie Pilawa.
            </p>
          </div>
          <Link
            href="/atrakcje"
            className="group inline-flex items-center gap-1.5 font-bold text-action"
          >
            <span className="underline-offset-4 group-hover:underline">Wszystkie atrakcje</span>
            <ArrowRight size={18} weight="bold" aria-hidden className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        {zones.map((zone, i) => (
          <Reveal
            key={zone.slug}
            delay={i * 0.07}
            className={i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
          >
            <Link
              href={`/strefy/${zone.slug}`}
              className="group relative block h-full overflow-hidden rounded-card bg-ink/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-ink/20"
            >
              <div className={`relative w-full ${i === 0 ? "aspect-[3/4] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[520px]" : "aspect-[4/3]"}`}>
                <Image
                  src={zone.image.src}
                  alt={zone.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent transition-opacity duration-300 group-hover:from-ink/85"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span
                  aria-hidden
                  className={`block h-1.5 w-10 rounded-full transition-all duration-300 group-hover:w-16 ${accentBar[zone.accent]}`}
                />
                <h3 className="mt-2.5 font-display text-xl font-bold text-white sm:text-2xl">
                  {zone.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-white/85">{zone.tagline}</p>
                <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-white opacity-0 transition-all duration-300 group-hover:opacity-100 motion-safe:-translate-x-2 motion-safe:group-hover:translate-x-0">
                  Poznaj strefę <ArrowRight size={15} weight="bold" aria-hidden />
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
