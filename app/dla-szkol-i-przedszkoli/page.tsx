import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PdfDownload } from "@/components/PdfDownload";
import { ReservationCta } from "@/components/ReservationCta";
import { media } from "@/content/media";
import { siteConfig } from "@/content/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Wycieczki i pikniki dla szkół i przedszkoli",
  description:
    "Łap Chwile dla grup: wycieczki, pikniki, warsztaty i wydarzenia integracyjne dla szkół i przedszkoli nad Zalewem Zegrzyńskim.",
  path: "/dla-szkol-i-przedszkoli",
});

const offers = [
  {
    title: "Wycieczki",
    text: "Program na kilka godzin: strefy zabawy, animacje i przerwa na piknik. Grupa jest pod opieką animatorów od wejścia do pożegnania.",
    image: media.animacjeWParku,
  },
  {
    title: "Pikniki",
    text: "Rodzinne i klasowe pikniki na trawie między drzewami, z grami terenowymi i miejscem na wspólny poczęstunek.",
    image: media.biegPoTrawie,
  },
  {
    title: "Warsztaty",
    text: "Zajęcia kreatywne dopasowane do wieku grupy: malowanie, prace plastyczne i zabawy sensoryczne.",
    image: media.stolikKolorowanki,
  },
  {
    title: "Wydarzenia integracyjne",
    text: "Zakończenie roku, dzień dziecka albo spotkanie klas: układamy program pod Waszą okazję.",
    image: media.gryTerenowe,
  },
];

export default function DlaSzkolPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dla grup"
        title="Szkoły i przedszkola"
        lead="Zielona przestrzeń przy Porcie Pilawa, strefy zabawy i animatorzy w jednym miejscu. Idealne warunki na wycieczkę, piknik albo dzień integracyjny."
      />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {offers.map((offer) => (
            <article key={offer.title} className="overflow-hidden rounded-card bg-cream">
              <div className="relative aspect-[16/9]">
                <Image
                  src={offer.image.src}
                  alt={offer.image.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="font-display text-xl font-bold text-ink">{offer.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{offer.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-card bg-cream p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-ink">
            Oferta dla grup
          </h2>
          <p className="mx-auto mt-2 max-w-md text-muted">
            Program i wycenę przygotowujemy pod liczebność oraz wiek grupy.
            Napisz do nas albo zadzwoń: {siteConfig.contact.phoneDisplay}.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/kontakt"
              className="rounded-full bg-action px-6 py-3 font-bold text-white hover:bg-action-dark"
            >
              Zapytaj o ofertę
            </Link>
            <PdfDownload
              href={siteConfig.downloads.ofertaSzkolyPdf}
              label="Oferta dla szkół"
            />
          </div>
        </div>
      </section>
      <ReservationCta />
    </>
  );
}
