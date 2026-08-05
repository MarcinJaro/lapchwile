import Link from "next/link";
import Image from "next/image";
import { media } from "@/content/media";

export function UrodzinyTeaser() {
  return (
    <section className="bg-cream py-20" aria-labelledby="urodziny-teaser">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          <Image
            src={media.sciankaLapChwile.src}
            alt={media.sciankaLapChwile.alt}
            width={media.sciankaLapChwile.width}
            height={media.sciankaLapChwile.height}
            sizes="(min-width: 768px) 25vw, 50vw"
            className="rounded-card object-cover"
          />
          <Image
            src={media.stolPokemon.src}
            alt={media.stolPokemon.alt}
            width={media.stolPokemon.width}
            height={media.stolPokemon.height}
            sizes="(min-width: 768px) 25vw, 50vw"
            className="mt-8 rounded-card object-cover"
          />
        </div>
        <div>
          <h2 id="urodziny-teaser" className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Urodziny po Waszemu
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Wybieracie motyw, my dekorujemy namiot, prowadzimy animacje i pilnujemy
            planu. Solenizant zbiera odciski dłoni gości na pamiątkowej ściance, a
            rodzice mają czas na kawę.
          </p>
          <ul className="mt-6 space-y-2.5 text-[15px] font-semibold text-ink">
            <li>10 motywów tematycznych do wyboru</li>
            <li>Animatorzy przez całe przyjęcie</li>
            <li>Namiot urodzinowy i strefy zabawy w cenie</li>
          </ul>
          <Link
            href="/urodziny"
            className="mt-8 inline-block rounded-full bg-action px-7 py-3.5 font-bold text-white transition-colors hover:bg-action-dark"
          >
            Zobacz, jak wyglądają urodziny
          </Link>
        </div>
      </div>
    </section>
  );
}
