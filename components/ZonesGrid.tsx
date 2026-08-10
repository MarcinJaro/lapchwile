import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { zones } from "@/content/zones";
import { Reveal } from "./Reveal";

const cardColor: Record<string, string> = {
  red: "bg-pastel-pink",
  yellow: "bg-pastel-yellow",
  green: "bg-pastel-green",
  blue: "bg-pastel-blue",
};

/** Asymmetric five-tile grid of pastel cards with framed real photos. */
export function ZonesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6" aria-labelledby="strefy-naglowek">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="strefy-naglowek" className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Nasze <span className="marker bg-pastel-green">strefy zabawy</span>
            </h2>
            <p className="mt-3 max-w-lg text-muted">
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

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
        {zones.map((zone, i) => (
          <Reveal
            key={zone.slug}
            delay={i * 0.07}
            className={i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
          >
            <Link
              href={`/strefy/${zone.slug}`}
              className={`group flex h-full flex-col rounded-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10 ${cardColor[zone.accent]}`}
            >
              <div
                className={`relative w-full overflow-hidden rounded-2xl ${
                  i === 0 ? "aspect-[4/3] lg:min-h-0 lg:flex-1" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={zone.image.src}
                  alt={zone.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex items-end justify-between gap-3 px-2 pb-2 pt-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                    {zone.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-ink/65">{zone.tagline}</p>
                </div>
                <span
                  aria-hidden
                  className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-all duration-300 group-hover:bg-action group-hover:text-white"
                >
                  <ArrowRight size={17} weight="bold" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
