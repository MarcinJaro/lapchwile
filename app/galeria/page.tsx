import { PageHeader } from "@/components/PageHeader";
import { GalleryExplorer } from "@/components/GalleryExplorer";
import { ReservationCta } from "@/components/ReservationCta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Galeria zdjęć",
  description:
    "Prawdziwe zdjęcia z Łap Chwile: urodziny, warsztaty, rodzinne weekendy i eventy przy Porcie Pilawa w Nieporęcie.",
  path: "/galeria",
});

export default function GaleriaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Galeria"
        title="Złapane chwile"
        lead="Wszystkie zdjęcia pochodzą z prawdziwych przyjęć i wydarzeń w naszej strefie."
      />
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <GalleryExplorer />
      </section>
      <ReservationCta />
    </>
  );
}
