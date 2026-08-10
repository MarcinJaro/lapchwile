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

## Opinie Google (Places API)

Sekcja opinii pobiera dane server-side z Google Places API (New) i odświeża
je raz na dobę. Bez klucza pokazuje stan "integration-ready"; z kluczem
wyświetla prawdziwą średnią i liczbę WSZYSTKICH opinii z wizytówki oraz
wybrane cytaty 4-5 gwiazdek (podpisane jako wybór, z linkiem do pełnego
profilu). To celowy, zgodny z dyrektywą Omnibus kompromis: eksponujemy
najlepsze, nie ukrywając całości.

Konfiguracja (NIE wymaga dostępu administratora wizytówki):

1. [console.cloud.google.com](https://console.cloud.google.com) → nowy
   projekt → "Places API (New)" → włącz. Wymaga podpiętego billingu;
   nasze ~30-60 zapytań/mies. mieści się w darmowym limicie.
2. Utwórz klucz API i ogranicz go do "Places API (New)" (klucz jest używany
   tylko server-side, nie wycieka do przeglądarki).
3. Dopisz do `.env.local` w katalogu projektu (i do zmiennych środowiskowych
   na hostingu):

   ```
   GOOGLE_PLACES_API_KEY=twoj_klucz
   ```

4. Po pierwszym uruchomieniu log serwera wypisze znalezione `placeId`;
   wpisz je do `content/site-config.ts` (`googleReviews.placeId`), aby
   pominąć wyszukiwanie miejsca przy kolejnych odświeżeniach.

## Rezerwacja

Formularz bez płatności online: walidacja inline (server action), stany
ładowania, błędów i sukcesu. Adapter `lib/reservation-adapter.ts` to
jedyne miejsce integracji backendu.

## Maile z formularzy

Zgłoszenia z formularzy rezerwacji i kontaktu są wysyłane mailem
(brandowany szablon HTML, Reply-To ustawione na adres zgłaszającego) na
skrzynkę z `content/site-config.ts` → `notifications.to`
(obecnie aine.gd@gmail.com). Do wyboru dwa transporty (wystarczy jeden;
zmienne w `.env.local` i na hostingu):

**Wariant A — SMTP istniejącej skrzynki (zalecany, bez nowych kont):**

- skrzynka na hostingu lapchwile.com: dane SMTP z panelu hostingu
  (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER=kontakt@lapchwile.com`, `SMTP_PASS`),
- albo Gmail: włącz weryfikację dwuetapową, wygeneruj
  [hasło do aplikacji](https://myaccount.google.com/apppasswords) i użyj
  `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER`, `SMTP_PASS`
  (limit ok. 500 maili dziennie).

**Wariant B — Resend (resend.com, 3000 maili/mies. gratis):**
`RESEND_API_KEY` z panelu API Keys; docelowo zweryfikuj domenę
lapchwile.com i ustaw `RESEND_FROM`. Bez weryfikacji nadawca
`onboarding@resend.dev` dostarcza tylko na adres właściciela konta.

Gdy skonfigurowane są oba, pierwszeństwo ma SMTP. Bez żadnego formularz
jest nadal uczciwy: ekran sukcesu informuje, że nic nie wysłało się
automatycznie, i podaje gotowy mailto oraz telefon.

## Konto rodzica (faza 2 — nie zaimplementowane)

`/konto` celowo nie istnieje. Planowany model danych:
rezerwacje (historia, statusy), płatności/faktury, zaproszenia do pobrania,
lista gości, wybór motywu i dodatków. Wymaga decyzji o backendzie
(auth + baza), wtedy adapter rezerwacji zostaje rozszerzony o zapis.

## Dane, których strona świadomie NIE zmyśla (do uzupełnienia)

Pozostałe jawne TODO:

- [ ] odpowiedź FAQ: czy urodziny odbywają się zimą (regulamin mówi o
      "sezonie letnim", ale potrzebne jest jednoznaczne potwierdzenie)
- [ ] ceny biletów wstępu poza pakietami (regulamin: ogłaszane przy wejściu
      i na profilach; strona pokazuje uczciwą notkę)
- [ ] place id w formacie ChIJ (do przyszłej integracji API opinii; link do
      wizytówki już działa)
- [ ] PDF oferty dla szkół
- [ ] backend formularza rezerwacji (`lib/reservation-adapter.ts`)
- [ ] kalendarz wydarzeń na kolejne miesiące (sierpień 2026 jest wpisany
      z oficjalnej grafiki; `content/events.ts`)

Uzupełnione 2026-08-05 od właściciela strony: godziny otwarcia (pon
zamknięte, wt-czw 14-19, pt-nd 12-20), pinezka mapy
(maps.app.goo.gl/sXt7j1gYy9uC5Wh26, 52.4350702/21.0365012), WhatsApp
(wa.me/48790790137), Messenger (m.me/lapchwilenieporet), Facebook i
Instagram (@lapchwilenieporet), link do opinii Google (CID
14419731960113227145), odpowiedzi FAQ 1-5 (tort własny: tak; catering:
boxy #CHILL; deszcz: namiot; minimum gości: brak; rodzice: strefa relaksu),
pakiety urodzinowe z oficjalnego PDF (Mini 799/899 zł, Standard 1099/1299 zł,
Premium 1699/1899 zł + dodatki, zniżki i zasady rezerwacji;
`content/pricing.ts`, plik: /media/pdf/lap-chwile-urodziny.pdf), 15 motywów
tematycznych (`content/themes.ts`), regulamin strefy (`content/regulamin.ts`,
strona /regulamin, obowiązuje od 31.05.2026) oraz kalendarz dni tematycznych
na sierpień 2026 (`content/events.ts`).

Dane zweryfikowane w źródłach (lapchwile.com, nieporet.pl, cr.nieporet.pl):
ŁAP CHWILE Anna Godlewska, ul. Polnych Kwiatów 11, 05-126 Nieporęt,
NIP 1251338814, tel. +48 790 790 137, kontakt@lapchwile.com; strefa działa
przy Porcie Pilawa, ul. Wojska Polskiego 3 (Kompleks Nieporęt-Pilawa, obok
skateparku), otwarta 31.05.2026; parking przy kompleksie płatny wg cennika
gminnego, bezpłatny z Kartą Mieszkańca Gminy Nieporęt.
