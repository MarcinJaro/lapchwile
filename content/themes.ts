/**
 * Birthday theme names. Treated as user-selectable text options only;
 * no copyrighted character art is used unless licensed media is supplied.
 */

export const birthdayThemes = [
  "Stitch",
  "Minecraft",
  "Barbie",
  "Pokemon",
  "Hot Wheels",
  "Psi Patrol",
  "Frozen",
  "Ninjago",
  "Wednesday",
  "Bluey",
] as const;

export type BirthdayTheme = (typeof birthdayThemes)[number];
