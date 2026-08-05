import { siteConfig } from "@/content/site-config";
import { answeredFaqItems } from "@/content/faq";
import { events } from "@/content/events";

/**
 * Schema.org JSON-LD built ONLY from verified data in content files.
 * Opening hours, geo and social profiles are added automatically once
 * they are filled in site-config.ts.
 */
export function localBusinessSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.domain,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    image: `${siteConfig.domain}/media/urodziny/animator-z-dziecmi.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.legal.street,
      postalCode: siteConfig.legal.postalCode,
      addressLocality: siteConfig.legal.city,
      addressCountry: "PL",
    },
    description:
      "Strefa zabaw i urodzin dla dzieci przy Porcie Pilawa nad Zalewem Zegrzyńskim: Tor Ninja, ogród sensoryczny, warsztaty kreatywne i animacje.",
  };
  if (siteConfig.venue.coordinates) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: siteConfig.venue.coordinates.lat,
      longitude: siteConfig.venue.coordinates.lng,
    };
  }
  const sameAs = [siteConfig.social.facebook, siteConfig.social.instagram].filter(
    Boolean
  );
  if (sameAs.length) schema.sameAs = sameAs;
  return schema;
}

/** FAQPage schema only for questions with visible, verified answers. */
export function faqSchema() {
  if (answeredFaqItems.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answeredFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Event schema only for real configured events. */
export function eventsSchema() {
  if (events.length === 0) return null;
  return events.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    startDate: e.date,
    description: e.description,
    location: {
      "@type": "Place",
      name: siteConfig.venue.name,
      address: { "@type": "PostalAddress", addressLocality: siteConfig.legal.city },
    },
  }));
}
