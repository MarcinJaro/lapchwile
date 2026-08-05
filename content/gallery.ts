import { media, type MediaImage } from "./media";

export type GalleryCategory =
  | "urodziny"
  | "warsztaty"
  | "rodzinne-weekendy"
  | "eventy";

export type GalleryItem = {
  image: MediaImage;
  category: GalleryCategory;
};

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "urodziny", label: "Urodziny" },
  { id: "warsztaty", label: "Warsztaty" },
  { id: "rodzinne-weekendy", label: "Rodzinne weekendy" },
  { id: "eventy", label: "Eventy" },
];

export const galleryItems: GalleryItem[] = [
  { image: media.sciankaLapChwile, category: "urodziny" },
  { image: media.dzieciPrzySciance, category: "urodziny" },
  { image: media.tortPrzySciance, category: "urodziny" },
  { image: media.namiotStrefaUrodzin, category: "urodziny" },
  { image: media.stolPokemon, category: "urodziny" },
  { image: media.stolUrodzinowyWyscigi, category: "urodziny" },
  { image: media.girlandaBalonowa, category: "urodziny" },
  { image: media.animatorZDziecmi, category: "urodziny" },
  { image: media.poczestunekArbuz, category: "urodziny" },
  { image: media.przyjecieWNamiocie, category: "urodziny" },
  { image: media.stolikKolorowanki, category: "warsztaty" },
  { image: media.malowanieTwarzy, category: "warsztaty" },
  { image: media.paletaFarb, category: "warsztaty" },
  { image: media.stolWarsztatowy, category: "warsztaty" },
  { image: media.dinozaurPortret, category: "warsztaty" },
  { image: media.kulaXxl, category: "rodzinne-weekendy" },
  { image: media.bankiMydlane, category: "rodzinne-weekendy" },
  { image: media.klockiXxl, category: "rodzinne-weekendy" },
  { image: media.wataCukrowa, category: "rodzinne-weekendy" },
  { image: media.kulaNaTrawie, category: "rodzinne-weekendy" },
  { image: media.biegPoTrawie, category: "eventy" },
  { image: media.gryTerenowe, category: "eventy" },
  { image: media.animacjeWParku, category: "eventy" },
  { image: media.szachyOgrodowe, category: "eventy" },
  { image: media.kulaDzieci, category: "eventy" },
];
