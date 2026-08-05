/**
 * Pricing data. Source: official offer PDF "Łap Chwile na urodziny!"
 * supplied by the owner on 2026-08-05 (copy: /media/pdf/lap-chwile-urodziny.pdf).
 * Update prices here and nowhere else.
 */

export type PricingPackage = {
  id: string;
  tier: string;
  name: string;
  priceWeekday: string;
  priceWeekend: string;
  maxChildren: string;
  duration: string;
  description: string;
  audience: string;
  includes: string[];
  food: string[];
  highlighted?: boolean;
};

export const packages: PricingPackage[] = [
  {
    id: "mini",
    tier: "Mini",
    name: "Mała Przygoda",
    priceWeekday: "od 799 zł",
    priceWeekend: "od 899 zł",
    maxChildren: "do 10 dzieci",
    duration: "2 godz.",
    description:
      "Kameralne święto w gronie najbliższych przyjaciół. Na 2 godziny przejmujecie całą strefę zabaw: Tor Ninja, ogród sensoryczny i warsztat artystyczny czekają tylko na Was, a dwie dmuchane atrakcje dodają emocji.",
    audience: "Dla grup do 10 dzieci, które chcą się pobawić bez pośpiechu, z bliska i na luzie.",
    includes: [
      "Cała strefa + dmuchańce",
      "Stolik z dekoracją",
      "Poczęstunek (woda, soki, przekąski słone)",
      "Zastawa jednorazowa",
      "Balon cyferka",
      "Tort i Sto lat :)",
    ],
    food: [
      "Woda i soki owocowe",
      "Słone przekąski i chrupki",
      "Kolorowa zastawa jednorazowa",
    ],
  },
  {
    id: "standard",
    tier: "Standard",
    name: "Złapana Chwila",
    priceWeekday: "od 1099 zł",
    priceWeekend: "od 1299 zł",
    maxChildren: "do 15 dzieci",
    duration: "2,5 godz.",
    description:
      "Nasz najpopularniejszy pakiet. Przez 2,5 godziny animator od pierwszej minuty wciąga dzieci w zabawy plenerowe, gry zespołowe i konkursy dopasowane do wieku. Strefa jest udekorowana w wybranym motywie, a jubilat dostaje voucher upominkowy.",
    audience: "Dla grup 11-15 dzieci, które potrzebują prowadzącego z energią i pomysłem.",
    includes: [
      "Wszystko z pakietu Mini",
      "Animator przez całą imprezę",
      "Gry i zabawy plenerowe",
      "Tematyczna dekoracja (wybór motywu)",
      "Rozszerzony poczęstunek",
      "Voucher dla jubilata",
    ],
    food: [
      "Wszystko z Mini",
      "Świeże owoce sezonowe",
      "Ciastka i wafelki",
      "Wata cukrowa z naszej maszynki",
    ],
    highlighted: true,
  },
  {
    id: "premium",
    tier: "Premium",
    name: "Wielka Impreza",
    priceWeekday: "od 1699 zł",
    priceWeekend: "od 1899 zł",
    maxChildren: "do 20 dzieci",
    duration: "3 godz.",
    description:
      "Cała strefa należy tylko do Was: przez 3 godziny jest zamknięta dla innych gości. Impreza z pełnym programem: animator, warsztaty kreatywne do wyboru, malowanie twarzy lub tatuaże brokatowe dla każdego dziecka i ścianka do zdjęć z tematycznymi rekwizytami.",
    audience: "Dla grup do 20 dzieci, które zasługują na imprezę totalną, z zaplanowanym każdym szczegółem.",
    includes: [
      "Wszystko ze Standard",
      "Warsztaty kreatywne",
      "Malowanie twarzy lub tatuaże brokatowe",
      "Ścianka do zdjęć",
      "Gadżet dla każdego gościa",
      "Catering na życzenie",
    ],
    food: [
      "Wszystko ze Standard",
      "Popcorn z naszej maszyny",
      "Catering na życzenie (ciepłe danie lub przekąski, zakres do uzgodnienia)",
    ],
  },
];

export const extras: { name: string; price: string }[] = [
  { name: "Dodatkowe dziecko", price: "50 zł" },
  { name: "Dodatkowa godzina", price: "250 zł" },
  { name: "Dodatkowy animator", price: "200 zł" },
  { name: "Dekoracja balonowa", price: "150-300 zł" },
  { name: "Ścianka do zdjęć", price: "400 zł" },
  { name: "Piniata z niespodziankami", price: "120 zł" },
  { name: "Balony z helem (10 szt.)", price: "80 zł" },
];

export const discounts: string[] = [
  "Z Kartą Mieszkańca Gminy Nieporęt: -10%",
  "Z Kartą Dużej Rodziny: -5%",
];

export const bookingRules: { label: string; value: string }[] = [
  { label: "Rezerwacja", value: "min. 7 dni wcześniej" },
  { label: "Zadatek", value: "30% wartości" },
  { label: "Odwołanie do 72 h", value: "zadatek zwrotny" },
  { label: "Opiekunowie dzieci", value: "bezpłatnie" },
  { label: "Własny tort", value: "oczywiście" },
];

export const pricingNotes: string[] = [
  "Ceny „od poniedziałku do czwartku” dotyczą pierwszej kwoty, wyższa kwota obowiązuje od piątku do niedzieli.",
  "W razie deszczu impreza odbywa się pod namiotem. Dmuchańce są dostępne tylko przy dobrej pogodzie.",
];

/**
 * Wstęp do strefy poza urodzinami jest biletowany (źródło: regulamin).
 * Ceny biletów są ogłaszane przy wejściu i na profilach społecznościowych,
 * dlatego nie podajemy ich tutaj na sztywno.
 */
export const entryTicketsNote =
  "Wstęp do strefy poza pakietami urodzinowymi jest biletowany. Aktualne ceny biletów znajdziesz przy wejściu i na naszych profilach społecznościowych. Dzieci do 3 lat wchodzą bezpłatnie, pod opieką dorosłego.";
