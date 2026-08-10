import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { BalloonStory } from "@/components/BalloonStory";
import { ZonesGrid } from "@/components/ZonesGrid";
import { UrodzinyTeaser } from "@/components/UrodzinyTeaser";
import { EventsPreview } from "@/components/EventsPreview";
import { GalleryStrip } from "@/components/GalleryStrip";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ReservationCta } from "@/components/ReservationCta";
import { WaveDivider } from "@/components/WaveDivider";
import { FloatingBalloon } from "@/components/FloatingBalloon";
import { balloonDecor } from "@/content/dekoracje";
import { pageMetadata } from "@/lib/seo";

/** Daily refresh so the Google reviews section stays current. */
export const revalidate = 86400;

export const metadata = pageMetadata({
  title: "Łap Chwile. Urodziny i zabawa nad Zalewem Zegrzyńskim",
  description:
    "Strefa zabaw przy Porcie Pilawa w Nieporęcie: Tor Ninja, ogród sensoryczny, warsztaty kreatywne, animacje i urodziny dla dzieci.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WaveDivider className="text-cloud" />
      <BalloonStory />
      <WaveDivider flip className="text-cloud" />
      <ZonesGrid />
      <UrodzinyTeaser />
      <EventsPreview />
      <GalleryStrip />
      <ReviewsSection />
      <section className="relative isolate mx-auto max-w-3xl px-4 py-20 sm:px-6" aria-labelledby="faq-naglowek">
        <FloatingBalloon
          {...balloonDecor.zielony}
          className="-right-24 top-2 hidden w-24 opacity-80 lg:block"
          speed={-0.11}
          rotate={6}
        />
        <FloatingBalloon
          {...balloonDecor.niebieski}
          className="-left-28 bottom-10 hidden w-20 opacity-70 lg:block"
          speed={-0.18}
          rotate={-7}
        />
        <h2 id="faq-naglowek" className="text-center font-display text-3xl font-bold text-ink sm:text-4xl">
          Częste <span className="marker bg-pastel-yellow">pytania</span>
        </h2>
        <div className="mt-8">
          <FaqAccordion />
        </div>
        <p className="mt-6 text-center text-muted">
          Więcej odpowiedzi znajdziesz na stronie{" "}
          <Link href="/faq" className="font-semibold text-action hover:underline">
            częstych pytań
          </Link>
          .
        </p>
      </section>
      <ReservationCta />
    </>
  );
}
