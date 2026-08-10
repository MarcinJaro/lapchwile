import Link from "next/link";
import Image from "next/image";
import { media } from "@/content/media";
import { Reveal } from "./Reveal";
import { Sparkle } from "./Sparkle";

export function UrodzinyTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6" aria-labelledby="urodziny-teaser">
      <div className="grid items-center gap-12 rounded-[32px] bg-pastel-yellow px-6 py-14 sm:px-10 md:grid-cols-2 lg:px-14">
        <Reveal>
          <div className="relative grid grid-cols-2 gap-5 px-2">
            <Sparkle
              size={22}
              className="absolute -top-6 right-8 z-10 text-balloon-red motion-safe:animate-float"
            />
            <Sparkle
              size={14}
              className="absolute -bottom-4 left-6 z-10 text-white motion-safe:animate-float-slow"
            />
            <div className="-rotate-2 rounded-card border-8 border-white bg-white shadow-xl shadow-ink/10 transition-transform duration-300 hover:rotate-0">
              <Image
                src={media.sciankaLapChwile.src}
                alt={media.sciankaLapChwile.alt}
                width={media.sciankaLapChwile.width}
                height={media.sciankaLapChwile.height}
                sizes="(min-width: 768px) 25vw, 50vw"
                className="rounded-[12px] object-cover"
              />
            </div>
            <div className="mt-10 rotate-2 rounded-card border-8 border-white bg-white shadow-xl shadow-ink/10 transition-transform duration-300 hover:rotate-0">
              <Image
                src={media.stolPokemon.src}
                alt={media.stolPokemon.alt}
                width={media.stolPokemon.width}
                height={media.stolPokemon.height}
                sizes="(min-width: 768px) 25vw, 50vw"
                className="rounded-[12px] object-cover"
              />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-sm font-bold uppercase tracking-widest text-ink/60">
            Najważniejszy dzień w roku
          </p>
          <h2 id="urodziny-teaser" className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
            Urodziny <span className="marker bg-white/80">po Waszemu</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Wybieracie motyw, my dekorujemy namiot, prowadzimy animacje i pilnujemy
            planu. Solenizant zbiera odciski dłoni gości na pamiątkowej ściance, a
            rodzice mają czas na kawę.
          </p>
          <ul className="mt-6 space-y-2.5 text-[15px] font-semibold text-ink">
            <li className="flex items-center gap-2.5">
              <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-balloon-red" />
              Pakiety od 799 zł, do 20 dzieci
            </li>
            <li className="flex items-center gap-2.5">
              <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-balloon-yellow" />
              15 motywów tematycznych do wyboru
            </li>
            <li className="flex items-center gap-2.5">
              <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-balloon-green" />
              Animatorzy i strefy zabawy w cenie
            </li>
          </ul>
          <Link
            href="/urodziny"
            className="mt-8 inline-block rounded-full bg-action px-7 py-3.5 font-bold text-white shadow-lg shadow-action/20 transition-all hover:-translate-y-0.5 hover:bg-action-dark hover:shadow-xl hover:shadow-action/30 active:translate-y-0"
          >
            Zobacz, jak wyglądają urodziny
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
