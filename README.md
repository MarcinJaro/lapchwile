# Łap Chwile — lapchwile.com

Produkcyjna strona rodzinnej strefy zabaw i urodzin przy Porcie Pilawa w
Nieporęcie nad Zalewem Zegrzyńskim. Next.js App Router, TypeScript, Tailwind,
Motion, prawdziwe zdjęcia z realizacji oraz jeden filmowy motyw przewodni:
kobaltowy balon z czerwoną wstążką, który podczas przewijania "łapie"
prawdziwe wspomnienia.

## Uruchomienie

```bash
npm install
npm run dev        # http://localhost:3000
```

Kontrole jakości:

```bash
npm run typecheck
npm run lint
npm run build
```

## Struktura

- `app/` — wszystkie trasy (App Router), sitemap, robots, ikony
- `components/` — komponenty wielokrotnego użytku; `BalloonStory.tsx` to
  scrollytelling z sekwencją klatek na canvasie
- `content/` — JEDYNE źródło treści biznesowych: `site-config.ts` (dane firmy,
  pola TODO), `zones.ts`, `faq.ts`, `events.ts`, `pricing.ts`, `blog.ts`,
  `themes.ts`, `gallery.ts`, `media.ts` (rejestr zdjęć z altami)
- `lib/` — SEO, schema.org, adapter rezerwacji (`reservation-adapter.ts`)
- `scripts/` — pipeline mediów i eksport klatek balonu
- `public/media/` — zoptymalizowane realne zdjęcia i filmy (WebP/H.264)
- `public/frames/balloon/` — 120 klatek WebP sekwencji balonu (ignorowane
  w git; odtwarzalne przez `npm run frames`)
- `_archive/prototype-2026-07/` — odrzucony stary prototyp (poza repo)

## Pipeline mediów

Źródłowe zdjęcia i filmy leżą w `Urodziny_realizacja/` (nie trafiają do git
ani do publicznych URL-i). Selekcja i optymalizacja:

```bash
npm run media
```

Skrypt kopiuje wybrane pliki pod opisowymi polskimi nazwami do
`public/media/`, stosuje rotację EXIF, generuje WebP (max 2000 px), przekodowuje
filmy (H.264, 720p, bez dźwięku) i wyciąga kadry stref (Tor Ninja i ogród
sensoryczny nie mają zdjęć, więc kafle pochodzą z prawdziwych filmów).
Responsywne rozmiary obrazów generuje w locie `next/image`.

## Sekwencja balonu (BalloonStory)

Klatki wygenerowane wg promptów z brief-u (start frame + end frame:
nano banana pro 16:9 2K; ruch: Seedance 2.0, 8 s, 1080p, start+end frame).
Wideo źródłowe: `public/media/video/balloon-story.mp4`. Eksport klatek:

```bash
npm run frames
```

Tworzy `public/frames/balloon/frame_0001..0120.webp` (1920x1080, tło
#F7FBFF) oraz `poster-start.webp` i `poster-end.webp`. Komponent
`BalloonStory`:

- sekcja `min-h-[400dvh]`, sticky canvas `100dvh`
- scroll → klatka przez `useScroll`/`useTransform`, rysowanie w rAF bez
  stanu Reacta, DPR ograniczone do 2, ResizeObserver
- preload: pierwsza klatka od razu, reszta paczkami po 15; przy szybkim
  scrollu rysowana jest najbliższa załadowana klatka (nigdy pusty kadr)
- trzy przystanki balonu odsłaniają prawdziwe zdjęcia (ruch, pomysł,
  wspomnienie), finał: `Złapmy Wasz termin.` z CTA na tle wstążki
- `prefers-reduced-motion` → statyczny kadr końcowy bez scrubbingu
- brak klatek → statyczny poster (fallback)

## Rezerwacja

Formularz bez płatności online: walidacja inline (server action), stany
ładowania, błędów i sukcesu. Backend NIE jest skonfigurowany — adapter
`lib/reservation-adapter.ts` to jedyne miejsce do podpięcia maila/CRM.
Do tego czasu ekran sukcesu uczciwie informuje, że nic nie wysłało się
automatycznie, i podaje gotowy mailto oraz telefon.

## Konto rodzica (faza 2 — nie zaimplementowane)

`/konto` celowo nie istnieje. Planowany model danych:
rezerwacje (historia, statusy), płatności/faktury, zaproszenia do pobrania,
lista gości, wybór motywu i dodatków. Wymaga decyzji o backendzie
(auth + baza), wtedy adapter rezerwacji zostaje rozszerzony o zapis.

## Dane, których strona świadomie NIE zmyśla (do uzupełnienia)

Wszystkie poniższe pola mają jawne TODO w `content/site-config.ts`,
`content/faq.ts`, `content/pricing.ts`, `content/events.ts`:

- [ ] dokładny adres strefy i pinezka mapy (współrzędne)
- [ ] godziny otwarcia
- [ ] Messenger i WhatsApp
- [ ] linki do profili Facebook / Instagram
- [ ] pakiety urodzinowe i ceny (+ ewentualny PDF cennika)
- [ ] treści odpowiedzi FAQ (6 pytań czeka)
- [ ] realne wydarzenia i terminy
- [ ] place id / link wizytówki Google do opinii
- [ ] regulamin i treść zgód formularza (obecna zgoda jest minimalna)
- [ ] PDF oferty dla szkół
- [ ] informacja o parkingu

Dane zweryfikowane (źródła: lapchwile.com, nieporet.pl, 2026-08-05):
ŁAP CHWILE Anna Godlewska, ul. Polnych Kwiatów 11, 05-126 Nieporęt,
NIP 1251338814, tel. +48 790 790 137, kontakt@lapchwile.com; strefa działa
przy Porcie Pilawa (Kompleks Nieporęt-Pilawa, obok skateparku), otwarta
31.05.2026: Tor Ninja, ogród sensoryczny, warsztaty.
