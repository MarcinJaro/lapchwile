/**
 * Blog articles, CMS-ready. Planned titles are drafts without body content:
 * the listing shows them as "wkrótce" and no misleading filler articles are
 * generated. Fill `body` (markdown paragraphs) to publish an article.
 */

export type BlogPost = {
  slug: string;
  title: string;
  /** Short honest teaser shown on the listing; no fake claims. */
  teaser: string;
  /** ISO publish date, set when the article is actually written. */
  publishedAt: string | null;
  /** Markdown-ish paragraphs; null = draft, page renders "wkrótce". */
  body: string[] | null;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "najlepsze-miejsce-na-urodziny-dziecka-pod-warszawa",
    title: "Najlepsze miejsce na urodziny dziecka pod Warszawą",
    teaser:
      "Na co patrzeć przy wyborze miejsca na urodziny: przestrzeń, animacje, plan B na pogodę.",
    publishedAt: null,
    body: null,
  },
  {
    slug: "co-robic-z-dzieckiem-w-weekend-nad-zalewem-zegrzynskim",
    title: "Co robić z dzieckiem w weekend nad Zalewem Zegrzyńskim",
    teaser:
      "Pomysły na rodzinny weekend nad wodą: plaże, place zabaw i strefa Łap Chwile.",
    publishedAt: null,
    body: null,
  },
  {
    slug: "20-pomyslow-na-urodziny-6-latka",
    title: "20 pomysłów na urodziny 6-latka",
    teaser: "Zabawy, motywy i aktywności, które sprawdzają się u sześciolatków.",
    publishedAt: null,
    body: null,
  },
  {
    slug: "jak-przygotowac-idealne-przyjecie-urodzinowe",
    title: "Jak przygotować idealne przyjęcie urodzinowe",
    teaser: "Plan krok po kroku: goście, motyw, poczęstunek i program zabaw.",
    publishedAt: null,
    body: null,
  },
  {
    slug: "wakacje-z-dzieckiem-w-nieporecie",
    title: "Wakacje z dzieckiem w Nieporęcie",
    teaser: "Jak zaplanować letnie dni w Nieporęcie, żeby dzieci nie chciały wracać.",
    publishedAt: null,
    body: null,
  },
  {
    slug: "atrakcje-dla-dzieci-pod-warszawa",
    title: "Atrakcje dla dzieci pod Warszawą",
    teaser: "Przegląd miejsc przyjaznych rodzinom na północ od Warszawy.",
    publishedAt: null,
    body: null,
  },
  {
    slug: "najciekawsze-zabawy-dla-5-latkow",
    title: "Najciekawsze zabawy dla 5-latków",
    teaser: "Sprawdzone zabawy ruchowe i kreatywne dla pięciolatków.",
    publishedAt: null,
    body: null,
  },
  {
    slug: "jak-wybrac-animatora-na-urodziny",
    title: "Jak wybrać animatora na urodziny",
    teaser: "Po czym poznać dobrego animatora i o co zapytać przed rezerwacją.",
    publishedAt: null,
    body: null,
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
