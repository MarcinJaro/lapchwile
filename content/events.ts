/**
 * Event calendar data. NO events are invented: the array starts empty and the
 * site renders an honest empty state until real dates are configured here
 * (or this module is replaced by a CMS adapter with the same shape).
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

/** TODO: uzupełnić realne wydarzenia i terminy. */
export const events: VenueEvent[] = [];

export const eventCategories: { id: VenueEvent["category"]; label: string }[] = [
  { id: "animacje", label: "Animacje" },
  { id: "warsztaty", label: "Warsztaty" },
  { id: "dzien-tematyczny", label: "Dni tematyczne" },
  { id: "inne", label: "Inne" },
];
