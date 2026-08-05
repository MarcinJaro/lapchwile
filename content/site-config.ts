/**
 * Central, editable business data for the whole site.
 * Only verified facts are filled in. Every TODO below is a real business
 * decision or a fact that must be confirmed by the owner before publishing.
 * Nothing on the website invents data missing here.
 */

export const siteConfig = {
  name: "Łap Chwile",
  domain: "https://lapchwile.com",
  tagline: "Urodziny i zabawa nad Zalewem Zegrzyńskim",

  /** Verified: registry data published on lapchwile.com (2026-08-05). */
  legal: {
    owner: "ŁAP CHWILE Anna Godlewska",
    street: "ul. Polnych Kwiatów 11",
    postalCode: "05-126",
    city: "Nieporęt",
    nip: "1251338814",
  },

  /**
   * Verified: strefa Łap Chwile działa przy Porcie Pilawa, w Kompleksie
   * Rekreacyjno-Wypoczynkowym Nieporęt-Pilawa, obok skateparku
   * (źródło: nieporet.pl, otwarcie 31.05.2026).
   * TODO: potwierdzić dokładny adres pinezki i współrzędne mapy.
   */
  venue: {
    name: "Strefa Łap Chwile, Port Pilawa",
    description:
      "Kompleks Rekreacyjno-Wypoczynkowy Nieporęt-Pilawa, obok skateparku",
    city: "Nieporęt",
    mapPin: null as string | null, // TODO: link do pinezki Google Maps
    coordinates: null as { lat: number; lng: number } | null, // TODO
  },

  contact: {
    email: "kontakt@lapchwile.com",
    phone: "+48 790 790 137",
    phoneDisplay: "790 790 137",
    messenger: null as string | null, // TODO: link do Messengera
    whatsapp: null as string | null, // TODO: numer/link WhatsApp
  },

  social: {
    facebook: null as string | null, // TODO: adres profilu Facebook
    instagram: null as string | null, // TODO: adres profilu Instagram
  },

  /** TODO: uzupełnić realne godziny otwarcia strefy. */
  openingHours: null as { label: string; hours: string }[] | null,

  /** TODO: dane do integracji opinii Google (place id lub link). */
  googleReviews: {
    placeId: null as string | null,
    profileUrl: null as string | null,
  },

  /** TODO: pliki do pobrania; komponenty pokażą się dopiero, gdy plik istnieje. */
  downloads: {
    ofertaSzkolyPdf: null as string | null, // np. /media/pdf/oferta-szkoly.pdf
    cennikPdf: null as string | null,
  },

  parking: {
    /** TODO: potwierdzić zasady parkowania przy Porcie Pilawa. */
    info: null as string | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;
