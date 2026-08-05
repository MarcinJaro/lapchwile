/**
 * Birthday theme names. Source: official offer PDF (2026-08-05).
 * Themed decorations apply to the Standard and Premium packages.
 * Treated as user-selectable text options only; no copyrighted character
 * art is used unless licensed media is supplied.
 */

export const birthdayThemes = [
  "Ninjago",
  "Minecraft",
  "Stitch",
  "Pokemon",
  "Psi Patrol",
  "Bluey",
  "Super Mario Bros",
  "Spider Man",
  "Auta",
  "Frozen",
  "Barbie",
  "Księżniczki",
  "Hello Kitty",
  "Vaiana",
  "Harry Potter",
] as const;

export type BirthdayTheme = (typeof birthdayThemes)[number];
