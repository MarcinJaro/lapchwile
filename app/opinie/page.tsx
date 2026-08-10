import { PageHeader } from "@/components/PageHeader";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ReservationCta } from "@/components/ReservationCta";
import { pageMetadata } from "@/lib/seo";

/** Daily refresh so the Google reviews section stays current. */
export const revalidate = 86400;

export const metadata = pageMetadata({
  title: "Opinie rodziców",
  description:
    "Opinie o Łap Chwile. Sekcja jest przygotowana na prawdziwe opinie z Google, nie publikujemy wymyślonych recenzji.",
  path: "/opinie",
});

export default function OpiniePage() {
  return (
    <>
      <PageHeader
        eyebrow="Opinie"
        title="Co mówią rodzice"
        lead="Pokazujemy wyłącznie prawdziwe opinie z naszej wizytówki Google, odświeżane raz dziennie."
      />
      <ReviewsSection />
      <ReservationCta />
    </>
  );
}
