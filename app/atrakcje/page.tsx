import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ReservationCta } from "@/components/ReservationCta";
import { media, type MediaImage } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Atrakcje dla dzieci: warsztaty, animacje, gry terenowe",
  description:
    "Atrakcje w Łap Chwile: warsztaty kreatywne, malowanie twarzy, tatuaże zmywalne, animatorzy, gry terenowe i atrakcje sezonowe nad Zalewem Zegrzyńskim.",
  path: "/atrakcje",
});

const attractions: { title: string; text: string; image: MediaImage }[] = [
  {
    title: "Warsztaty kreatywne",
    text: "Malowanie, kolorowanie i prace plastyczne prowadzone przez animatorów. Dzieci zabierają swoje dzieła do domu.",
    image: media.stolikKolorowanki,
  },
  {
    title: "Malowanie twarzy",
    text: "Motyle, superbohaterowie i rekiny. Profesjonalne farby, które łatwo zmyć wieczorem.",
    image: media.malowanieTwarzy,
  },
  {
    title: "Tatuaże zmywalne",
    text: "Szybka ozdoba na przyjęcie albo piknik. Wzory dopasowane do wieku i odwagi.",
    image: media.paletaFarb,
  },
  {
    title: "Animatorzy",
    text: "Prowadzą zabawy grupowe, pilnują tempa przyjęcia i dbają, żeby nikt nie stał z boku.",
    image: media.animacjeWParku,
  },
  {
    title: "Gry terenowe",
    text: "Wyścigi, tory przeszkód i zabawy zespołowe na trawie między drzewami.",
    image: media.gryTerenowe,
  },
  {
    title: "Atrakcje sezonowe",
    text: "Latem kule wodne, dmuchańce, bańki XXL i wata cukrowa. Program zmienia się z sezonem.",
    image: media.kuleWodne,
  },
];

export default function AtrakcjePage() {
  return (
    <>
      <PageHeader
        eyebrow="Na miejscu"
        title="Atrakcje"
        lead="Wszystko odbywa się na świeżym powietrzu, w otoczeniu drzew przy Porcie Pilawa. Poniżej stałe atrakcje, a w strefach znajdziesz jeszcze więcej."
      />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {attractions.map((a) => (
            <article key={a.title} className="overflow-hidden rounded-card bg-white">
              <div className="relative aspect-[4/3]">
                <Image
                  src={a.image.src}
                  alt={a.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="font-display text-xl font-bold text-ink">{a.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{a.text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-muted">
          Szukasz konkretnej strefy? Zobacz{" "}
          <Link href="/strefy/tor-ninja" className="font-semibold text-action hover:underline">
            Tor Ninja
          </Link>
          ,{" "}
          <Link href="/strefy/ogrod-sensoryczny" className="font-semibold text-action hover:underline">
            ogród sensoryczny
          </Link>{" "}
          i{" "}
          <Link href="/strefy/strefa-urodzin" className="font-semibold text-action hover:underline">
            strefę urodzin
          </Link>
          .
        </p>
      </section>
      <ReservationCta />
    </>
  );
}
