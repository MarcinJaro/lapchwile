import { media, type MediaImage } from "./media";

export type Zone = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string[];
  image: MediaImage;
  gallery: MediaImage[];
  accent: "red" | "yellow" | "green" | "blue";
};

export const zones: Zone[] = [
  {
    slug: "tor-ninja",
    name: "Tor Ninja",
    shortName: "Tor Ninja",
    tagline: "Wspinaczka, równowaga i zwinność",
    description: [
      "Tor Ninja to przeszkody, liny i kopuła do wspinaczki rozstawione między drzewami. Dzieci ćwiczą równowagę, siłę i odwagę we własnym tempie.",
      "Trasa działa dla różnych grup wiekowych: młodsze dzieci wybierają niższe przeszkody, starsze ścigają się na czas.",
    ],
    image: media.torNinja,
    gallery: [media.torNinja, media.biegPoTrawie, media.gryTerenowe],
    accent: "green",
  },
  {
    slug: "ogrod-sensoryczny",
    name: "Ogród sensoryczny",
    shortName: "Ogród sensoryczny",
    tagline: "Woda, piasek i dźwięki natury",
    description: [
      "Błotna kuchnia, stacje wodne, piasek i ogrodowe instrumenty. Ogród sensoryczny zaprasza do eksperymentowania i poznawania świata wszystkimi zmysłami.",
      "To ulubione miejsce najmłodszych gości: tu wolno się pobrudzić, przelewać, przesypywać i grać na cymbałkach tak głośno, jak trawa pozwala.",
    ],
    image: media.ogrodSensoryczny,
    gallery: [media.ogrodSensoryczny, media.piaskownica, media.tablicaMuzyczna],
    accent: "yellow",
  },
  {
    slug: "warsztaty-kreatywne",
    name: "Warsztaty kreatywne",
    shortName: "Warsztaty",
    tagline: "Farby, kredki i własne dzieła",
    description: [
      "Na warsztatach kreatywnych dzieci malują, kolorują i tworzą prace, które zabierają do domu. Zajęcia prowadzą animatorzy Łap Chwile.",
      "W programie pojawiają się też malowanie twarzy i tatuaże zmywalne: klasyki, które działają na każdych urodzinach.",
    ],
    image: media.stolikKolorowanki,
    gallery: [
      media.stolikKolorowanki,
      media.malowanieTwarzy,
      media.paletaFarb,
      media.stolWarsztatowy,
    ],
    accent: "red",
  },
  {
    slug: "strefa-urodzin",
    name: "Strefa urodzin",
    shortName: "Strefa urodzin",
    tagline: "Namiot, dekoracje i Wasz motyw przewodni",
    description: [
      "Przestronny namiot urodzinowy dekorujemy pod wybrany motyw: od girlandy balonowej po nakryty stół i planszę z imieniem solenizanta.",
      "Rodzice mają swoje miejsce obok, a animatorzy prowadzą program tak, żeby nikt nie patrzył na zegarek.",
    ],
    image: media.namiotStrefaUrodzin,
    gallery: [
      media.namiotStrefaUrodzin,
      media.stolPokemon,
      media.stolUrodzinowyWyscigi,
      media.sciankaLapChwile,
    ],
    accent: "blue",
  },
  {
    slug: "atrakcje-sezonowe",
    name: "Atrakcje sezonowe",
    shortName: "Sezonowe",
    tagline: "Kule wodne, dmuchańce i wata cukrowa",
    description: [
      "Latem na polanie pojawiają się kule wodne, dmuchańce, bańki XXL i wata cukrowa. Program sezonowy zmienia się razem z pogodą i kalendarzem.",
      "Aktualne atrakcje sezonowe ogłaszamy w wydarzeniach i na profilach społecznościowych.",
    ],
    image: media.kuleWodne,
    gallery: [media.kuleWodne, media.kulaXxl, media.wataCukrowa, media.szachyOgrodowe],
    accent: "blue",
  },
];

export const getZone = (slug: string) => zones.find((z) => z.slug === slug);
