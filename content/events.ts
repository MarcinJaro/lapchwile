/**
 * Event calendar data. Source: official "Sierpień 2026" calendar graphic
 * supplied by the owner on 2026-08-05. Days follow the venue's themed-day
 * calendar; details are announced on the Facebook/Instagram profiles.
 * No events are invented: keep this file in sync with the owner's calendar.
 */

export type VenueEvent = {
  slug: string;
  title: string;
  /** ISO date, e.g. "2026-08-15" */
  date: string;
  /** e.g. "11:00-14:00" */
  time?: string;
  category: "animacje" | "warsztaty" | "dzien-tematyczny" | "inne";
  description: string;
};

const themedDay = (extra: string) =>
  `Dzień tematyczny w strefie: ${extra} Szczegóły ogłaszamy na naszych profilach społecznościowych.`;

export const events: VenueEvent[] = [
  {
    slug: "dzien-kolorowanek",
    title: "Dzień kolorowanek",
    date: "2026-08-02",
    category: "dzien-tematyczny",
    description: themedDay("kredki w dłoń, strefa artystyczna gra pierwsze skrzypce."),
  },
  {
    slug: "dzien-arbuza",
    title: "Dzień Arbuza",
    date: "2026-08-03",
    category: "dzien-tematyczny",
    description: themedDay("najbardziej soczyste święto lata."),
  },
  {
    slug: "dzien-swiezego-oddechu",
    title: "Dzień Świeżego Oddechu",
    date: "2026-08-06",
    category: "dzien-tematyczny",
    description: themedDay("głęboki wdech i zabawa na świeżym powietrzu."),
  },
  {
    slug: "dzien-kota",
    title: "Dzień kota",
    date: "2026-08-08",
    category: "dzien-tematyczny",
    description: themedDay("koci motyw przewodni zabaw."),
  },
  {
    slug: "dzien-milosnikow-ksiazek",
    title: "Dzień miłośników książek",
    date: "2026-08-09",
    category: "dzien-tematyczny",
    description: themedDay("święto małych moli książkowych."),
  },
  {
    slug: "swiatowy-dzien-lwa",
    title: "Światowy dzień lwa",
    date: "2026-08-10",
    category: "dzien-tematyczny",
    description: themedDay("dzień dla małych królów i królowych sawanny."),
  },
  {
    slug: "swiatowy-dzien-slonia",
    title: "Światowy dzień słonia",
    date: "2026-08-12",
    category: "dzien-tematyczny",
    description: themedDay("największe zwierzę lądowe świętuje z nami."),
  },
  {
    slug: "swiatowy-dzien-fotografii",
    title: "Światowy Dzień fotografii",
    date: "2026-08-19",
    category: "dzien-tematyczny",
    description: themedDay("idealny dzień na rodzinne kadry w strefie."),
  },
  {
    slug: "dzien-komara",
    title: "Dzień komara",
    date: "2026-08-20",
    category: "dzien-tematyczny",
    description: themedDay("bzzz, czyli najbardziej brzęczące święto sezonu."),
  },
  {
    slug: "swieto-brokatu",
    title: "Święto Brokatu",
    date: "2026-08-26",
    category: "dzien-tematyczny",
    description: themedDay("błyskotliwy dzień, w sam raz na tatuaże brokatowe."),
  },
];

export const eventCategories: { id: VenueEvent["category"]; label: string }[] = [
  { id: "animacje", label: "Animacje" },
  { id: "warsztaty", label: "Warsztaty" },
  { id: "dzien-tematyczny", label: "Dni tematyczne" },
  { id: "inne", label: "Inne" },
];
