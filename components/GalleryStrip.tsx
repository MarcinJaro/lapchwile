import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { media } from "@/content/media";
import { balloonDecor } from "@/content/dekoracje";
import { FloatingBalloon } from "./FloatingBalloon";
import { Reveal } from "./Reveal";

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
    <section className="relative isolate py-20" aria-labelledby="galeria-naglowek">
      <FloatingBalloon
        {...balloonDecor.czerwony}
        className="-left-12 top-1/4 hidden w-32 opacity-75 sm:block"
        speed={-0.13}
        rotate={-5}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="galeria-naglowek" className="font-display text-3xl font-bold text-ink sm:text-4xl">
                Chwile, które już{" "}
                <span className="marker bg-pastel-pink">złapaliśmy</span>
              </h2>
            </div>
            <Link href="/galeria" className="group inline-flex items-center gap-1.5 font-bold text-action">
              <span className="underline-offset-4 group-hover:underline">Cała galeria</span>
              <ArrowRight size={18} weight="bold" aria-hidden className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {strip.map(({ image, className }, i) => (
            <Reveal key={image.src} delay={i * 0.05} className={className}>
              <div className="group relative h-full w-full overflow-hidden rounded-card">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
