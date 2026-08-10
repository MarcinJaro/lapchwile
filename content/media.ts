/**
 * Typed registry of the optimized real media in public/media.
 * Regenerate files with `npm run media`; keep alt texts here, in Polish,
 * describing what really is in the picture.
 */

export type MediaImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type MediaVideo = {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Polish description used for aria-label of the video panel. */
  alt: string;
};

const img = (
  src: string,
  width: number,
  height: number,
  alt: string
): MediaImage => ({ src, width, height, alt });

export const media = {
  logo: img(
    "/media/logo/logotyp-lap-chwile.png",
    920,
    722,
    "Logo Łap Chwile: trzy kolorowe baloniki nad napisem łap chwile"
  ),

  heroVideo: {
    src: "/media/video/hero-kula.mp4",
    poster: "/media/video/hero-kula-poster.webp",
    width: 1080,
    height: 1920,
    alt: "Animatorka i dziecko bawią się kolorowymi balonami w przezroczystej kuli na trawie o zachodzie słońca",
  } satisfies MediaVideo,

  urodzinyReel: {
    src: "/media/video/urodziny-reel.mp4",
    poster: "/media/video/urodziny-reel-poster.webp",
    width: 1080,
    height: 1920,
    alt: "Skrót filmowy z urodzin w stylu Barbie: dekoracje, poczęstunek i zabawy na trawie",
  } satisfies MediaVideo,

  otwarcieReel: {
    src: "/media/video/otwarcie-reel.mp4",
    poster: "/media/video/otwarcie-reel-poster.webp",
    width: 1080,
    height: 1920,
    alt: "Skrót filmowy z otwarcia strefy Łap Chwile: goście, animacje i zabawy w parku",
  } satisfies MediaVideo,

  // Urodziny
  tortPrzySciance: img(
    "/media/urodziny/tort-przy-sciance.webp",
    1500,
    2000,
    "Tort urodzinowy na stoliku przy ściance Łap Chwile z kolorowymi odciskami dłoni"
  ),
  tortPrzySciance2: img(
    "/media/urodziny/tort-przy-sciance-2.webp",
    1500,
    2000,
    "Dziewczynka podchodzi do tortu urodzinowego przy ściance Łap Chwile"
  ),
  dzieciPrzySciance: img(
    "/media/urodziny/dzieci-przy-sciance.webp",
    1125,
    2000,
    "Dzieci zebrane przy urodzinowym torcie przed ścianką Łap Chwile"
  ),
  dzieciPrzySciance2: img(
    "/media/urodziny/dzieci-przy-sciance-2.webp",
    1125,
    2000,
    "Grupa dzieci ogląda tort ze świeczką przy ściance z odciskami dłoni"
  ),
  namiotStrefaUrodzin: img(
    "/media/urodziny/namiot-strefa-urodzin.webp",
    2000,
    1500,
    "Wnętrze namiotu urodzinowego z girlandami, balonami i nakrytym stołem"
  ),
  stolUrodzinowyWyscigi: img(
    "/media/urodziny/stol-urodzinowy-wyscigi.webp",
    2000,
    1500,
    "Stół urodzinowy w motywie wyścigowym z biało-czarną szachownicą"
  ),
  stolPokemon: img(
    "/media/urodziny/stol-pokemon.webp",
    1500,
    2000,
    "Stół urodzinowy z dekoracjami w motywie Pokemon"
  ),
  stolPokemon2: img(
    "/media/urodziny/stol-pokemon-2.webp",
    1500,
    2000,
    "Nakryty stół urodzinowy z żółtymi talerzykami i dekoracjami Pokemon"
  ),
  poczestunek: img(
    "/media/urodziny/poczestunek.webp",
    1500,
    2000,
    "Stół z poczęstunkiem: przekąski, owoce i napoje dla gości urodzinowych"
  ),
  poczestunekArbuz: img(
    "/media/urodziny/poczestunek-arbuz.webp",
    1500,
    2000,
    "Talerz z pokrojonym arbuzem i butelki wody na stole urodzinowym"
  ),
  girlandaBalonowa: img(
    "/media/urodziny/girlanda-balonowa.webp",
    1500,
    2000,
    "Kolorowa girlanda balonowa przy ściance z motywem listków"
  ),
  animatorZDziecmi: img(
    "/media/urodziny/animator-z-dziecmi.webp",
    2000,
    1500,
    "Animatorka prowadzi zabawę z dziećmi przy stole urodzinowym w namiocie"
  ),
  przyjecieWNamiocie: img(
    "/media/urodziny/przyjecie-w-namiocie.webp",
    1500,
    2000,
    "Przyjęcie urodzinowe w namiocie z proporczykami i dekoracjami"
  ),
  sciankaLapChwile: img(
    "/media/urodziny/scianka-lap-chwile.webp",
    1500,
    2000,
    "Ścianka Łap Chwile z kolorowymi odciskami dłoni dzieci i tortem"
  ),

  // Warsztaty
  stolikKolorowanki: img(
    "/media/warsztaty/stolik-kolorowanki.webp",
    1500,
    2000,
    "Stolik z kolorowankami i kredkami podczas warsztatów plastycznych"
  ),
  stolikKolorowanki2: img(
    "/media/warsztaty/stolik-kolorowanki-2.webp",
    1500,
    2000,
    "Dziecko koloruje obrazek przy niebieskim stoliku warsztatowym"
  ),
  malowanieTwarzy: img(
    "/media/warsztaty/malowanie-twarzy.webp",
    1500,
    2000,
    "Animatorka maluje twarz chłopca podczas urodzin"
  ),
  malowanieTwarzy2: img(
    "/media/warsztaty/malowanie-twarzy-2.webp",
    1500,
    2000,
    "Malowanie twarzy: pędzelek i paleta kolorowych farb przy dziecku"
  ),
  paletaFarb: img(
    "/media/warsztaty/paleta-farb.webp",
    1500,
    2000,
    "Paleta farb do malowania twarzy na stoliku warsztatowym"
  ),
  stolWarsztatowy: img(
    "/media/warsztaty/stol-warsztatowy.webp",
    1500,
    2000,
    "Dzieci przy stole podczas zajęć kreatywnych w strefie warsztatów"
  ),
  dinozaurPortret: img(
    "/media/warsztaty/dinozaur-portret.webp",
    1500,
    2000,
    "Chłopiec z twarzą pomalowaną w motyw niebieskiego rekina"
  ),

  // Zabawa
  kulaXxl: img(
    "/media/zabawa/kula-xxl.webp",
    1500,
    2000,
    "Przezroczysta kula XXL z kolorowymi balonami w środku o złotej godzinie"
  ),
  kulaXxl2: img(
    "/media/zabawa/kula-xxl-2.webp",
    1500,
    2000,
    "Animatorka i dziecko w przezroczystej kuli pełnej balonów"
  ),
  kulaNaTrawie: img(
    "/media/zabawa/kula-na-trawie.webp",
    1500,
    2000,
    "Przezroczysta kula do zabawy ustawiona na trawie w parku"
  ),
  bankiMydlane: img(
    "/media/zabawa/banki-mydlane.webp",
    1500,
    2000,
    "Maluch łapie bańki mydlane na trawie przy flagach Łap Chwile"
  ),
  bankiMydlane2: img(
    "/media/zabawa/banki-mydlane-2.webp",
    1500,
    2000,
    "Dziecko podskakuje do bańki mydlanej podczas zabawy w ogrodzie"
  ),
  klockiXxl: img(
    "/media/zabawa/klocki-xxl.webp",
    1500,
    2000,
    "Dzieci budują z wielkich kolorowych klocków na trawie"
  ),
  wataCukrowa: img(
    "/media/zabawa/wata-cukrowa.webp",
    1500,
    2000,
    "Dziewczynka w kapeluszu niesie dużą watę cukrową przez trawnik"
  ),
  biegPoTrawie: img(
    "/media/zabawa/bieg-po-trawie.webp",
    1500,
    2000,
    "Dzieci biegną po trawie podczas zabawy ruchowej w parku"
  ),
  gryTerenowe: img(
    "/media/zabawa/gry-terenowe.webp",
    1500,
    2000,
    "Zabawy ruchowe na świeżym powietrzu prowadzone przez animatorkę"
  ),
  animacjeWParku: img(
    "/media/zabawa/animacje-w-parku.webp",
    1500,
    2000,
    "Animatorka prowadzi grupową zabawę z dziećmi między drzewami"
  ),
  szachyOgrodowe: img(
    "/media/zabawa/szachy-ogrodowe.webp",
    1500,
    2000,
    "Ogrodowe szachy XXL i dmuchaniec na polanie w tle"
  ),
  kulaDzieci: img(
    "/media/zabawa/kula-dzieci.webp",
    1500,
    2000,
    "Dzieci bawią się w przezroczystej kuli w parku"
  ),

  // Strefy (kadry z prawdziwych filmów)
  torNinja: img(
    "/media/strefy/tor-ninja.webp",
    1080,
    1920,
    "Dziecko wspina się po zielonej kopule linowej w strefie Tor Ninja"
  ),
  ogrodSensoryczny: img(
    "/media/strefy/ogrod-sensoryczny.webp",
    1080,
    1920,
    "Dzieci bawią się w błotnej kuchni w ogrodzie sensorycznym"
  ),
  tablicaMuzyczna: img(
    "/media/strefy/tablica-muzyczna.webp",
    1080,
    1920,
    "Chłopiec gra na kolorowych cymbałkach ogrodowych"
  ),
  piaskownica: img(
    "/media/strefy/piaskownica.webp",
    1080,
    1920,
    "Maluch bawi się przy stacji wodnej w ogrodzie sensorycznym"
  ),
  kuleWodne: img(
    "/media/strefy/kule-wodne.webp",
    1080,
    1920,
    "Dziecko w kuli wodnej na niebieskim basenie w słoneczny dzień"
  ),
} as const;
