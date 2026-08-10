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
   * (źródła: nieporet.pl, cr.nieporet.pl; otwarcie 31.05.2026).
   * Pinezka i współrzędne z linku przekazanego przez właściciela strony.
   */
  venue: {
    name: "Strefa Łap Chwile, Port Pilawa",
    description:
      "Kompleks Rekreacyjno-Wypoczynkowy Nieporęt-Pilawa, obok skateparku",
    street: "ul. Wojska Polskiego 3",
    postalCode: "05-126",
    city: "Nieporęt",
    mapPin: "https://maps.app.goo.gl/sXt7j1gYy9uC5Wh26" as string | null,
    coordinates: { lat: 52.4350702, lng: 21.0365012 } as {
      lat: number;
      lng: number;
    } | null,
  },

  contact: {
    email: "kontakt@lapchwile.com",
    phone: "+48 790 790 137",
    phoneDisplay: "790 790 137",
    messenger: "https://m.me/lapchwilenieporet" as string | null,
    whatsapp: "https://wa.me/48790790137" as string | null,
  },

  social: {
    facebook: "https://www.facebook.com/lapchwilenieporet" as string | null,
    instagram: "https://www.instagram.com/lapchwilenieporet" as string | null,
  },

  /** Godziny przekazane przez właściciela strony (04.08.2026). */
  openingHours: [
    { label: "poniedziałek", hours: "zamknięte" },
    { label: "wtorek", hours: "14:00-19:00" },
    { label: "środa", hours: "14:00-19:00" },
    { label: "czwartek", hours: "14:00-19:00" },
    { label: "piątek", hours: "12:00-20:00" },
    { label: "sobota", hours: "12:00-20:00" },
    { label: "niedziela", hours: "12:00-20:00" },
  ] as { label: string; hours: string }[] | null,

  /** Machine-readable wersja godzin dla schema.org. */
  openingHoursSpec: [
    { days: ["Tuesday", "Wednesday", "Thursday"], opens: "14:00", closes: "19:00" },
    { days: ["Friday", "Saturday", "Sunday"], opens: "12:00", closes: "20:00" },
  ],

  /**
   * Wizytówka Google z opiniami. placeId znalezione przez Places API
   * (searchText) po podpięciu klucza, 2026-08-10; CID z linku przekazanego
   * przez właściciela strony.
   */
  googleReviews: {
    placeId: "ChIJiWzWF3vHHkcRiWXlltEtHcg" as string | null,
    profileUrl:
      "https://maps.google.com/?cid=14419731960113227145" as string | null,
  },

  /** Pliki do pobrania; komponenty pokazują się dopiero, gdy plik istnieje. */
  downloads: {
    ofertaSzkolyPdf: null as string | null, // TODO: np. /media/pdf/oferta-szkoly.pdf
    cennikPdf: "/media/pdf/lap-chwile-urodziny.pdf" as string | null,
  },

  parking: {
    /**
     * Źródła: cr.nieporet.pl (duży parking przy kompleksie, adres) oraz
     * gazetapowiatowa.pl (parking płatny wg cennika gminnego, bezpłatnie
     * dla posiadaczy Karty Mieszkańca Gminy Nieporęt). Stawki ustala
     * uchwała rady gminy i zmieniają się co sezon, dlatego nie podajemy ich
     * na sztywno.
     */
    info: "Przy kompleksie Nieporęt-Pilawa jest duży parking, wjazd od ul. Wojska Polskiego 3. Parking jest płatny zgodnie z cennikiem gminnym, a posiadacze Karty Mieszkańca Gminy Nieporęt parkują bezpłatnie." as
      | string
      | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;
