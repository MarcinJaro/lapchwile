import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { media } from "@/content/media";

/** Mixed-aspect editorial strip of real photos, not equal cards. */
const strip = [
  { image: media.kulaXxl, className: "row-span-2 aspect-[3/4]" },
  { image: media.animatorZDziecmi, className: "aspect-[4/3]" },
  { image: media.paletaFarb, className: "aspect-square" },
  { image: media.bankiMydlane, className: "row-span-2 aspect-[3/4]" },
  { image: media.girlandaBalonowa, className: "aspect-square" },
  { image: media.klockiXxl, className: "aspect-[4/3]" },
];

export function GalleryStrip() {
  return (
    <section className="bg-cream py-20" aria-labelledby="galeria-naglowek">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="galeria-naglowek" className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Chwile, które już złapaliśmy
          </h2>
          <Link href="/galeria" className="inline-flex items-center gap-1.5 font-bold text-action hover:underline">
            Cała galeria <ArrowRight size={18} weight="bold" aria-hidden />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {strip.map(({ image, className }) => (
            <div key={image.src} className={`relative overflow-hidden rounded-card ${className}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
