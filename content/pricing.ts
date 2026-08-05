/**
 * Pricing data. Prices are NOT invented: as long as `packages` is empty the
 * pricing page shows "Cennik przygotowujemy indywidualnie" with a contact CTA.
 * Fill packages here when the owner confirms them.
 */

export type PricingPackage = {
  name: string;
  price: string;
  duration?: string;
  includes: string[];
  highlighted?: boolean;
};

/** TODO: uzupełnić pakiety i ceny po decyzji właścicielki. */
export const packages: PricingPackage[] = [];

/** TODO: dodatki płatne (np. wata cukrowa, malowanie twarzy) z cenami. */
export const extras: { name: string; price: string }[] = [];
