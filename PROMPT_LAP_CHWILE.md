# Łap Chwile - prompt produkcyjny

Poniższy zestaw składa się z trzech promptów do Higgsfield oraz kompletnego promptu do AI Code Editora. Prompty wideo są po angielsku, ponieważ modele generatywne zwykle lepiej trzymają w ten sposób opis kamery, światła i ciągłość obiektów.

## Założenie kreatywne: „Balon łapie chwile”

Obecny prototyp nie jest punktem odniesienia. Należy go usunąć i zaprojektować stronę od czystej kartki.

Prawdziwe zdjęcia i filmy pokazują dzieci, animatorów oraz lokalizację. AI generuje wyłącznie jednego, realistycznego balona poruszającego się na jednolitym jasnym tle. Balon niczego nie udaje, nie rozpada się na części i nie zamienia się w atrakcje.

Podczas przewijania długa wstążka balona „łapie” kolejne prawdziwe fotografie i delikatnie wciąga je do kadru. Każde zdjęcie jest osobnym wspomnieniem: ruch, kreatywność, urodziny i wspólny czas. Na końcu balon odlatuje ponad kadr, a jego wstążka zostaje na moment pod wezwaniem do rezerwacji.

Nie generuj ani nie modyfikuj twarzy dzieci. Nie używaj ciemnej, luksusowo-produktowej estetyki. Całość ma być słoneczna, lekka, naturalna i radosna, ale nie infantylna.

### Paleta

- tło główne: `#F7FBFF`
- tło ciepłe: `#FFFDF7`
- niebieski CTA: `#1754A8`
- czerwony detal: `#F04438`
- żółty detal: `#FFD34D`
- zielony detal: `#14A66A`
- tekst: `#17223B`

Niebieski jest jedynym kolorem podstawowych przycisków i linków akcji. Czerwony, żółty i zielony pojawiają się w balonach, detalach ilustracyjnych i małych akcentach nawiązujących do logo.

---

## Higgsfield - Start Frame Prompt

```text
Premium cinematic lifestyle key visual for a Polish family activity venue called "Lap Chwile", located by Lake Zegrzynski near Warsaw.

A single glossy cobalt-blue helium balloon enters from the lower-right edge of the frame, attached to one very long, delicate red ribbon. The balloon is the only object in the scene. Its material feels tactile and real, with soft daylight reflections and one subtle warm highlight inspired by the brand identity.

Bright, airy atmosphere. Pale blue-white background matching exactly #F7FBFF with a very subtle daylight gradient. No location, people or scenery in the generated layer. The balloon sequence will later be composited with real photography on the website.

Leave generous clean negative space on the left side for a website headline and two call-to-action buttons. Natural late-morning light, soft rim light tracing the balloon, controlled reflections on latex, gentle depth of field, polished editorial family-brand photography, joyful and modern, never childish or cartoonish.

Camera: full-frame cinema camera, 50 mm lens, f/2.8, eye-level composition, 16:9 landscape, ultra-high resolution, photorealistic.

No text, no letters, no logo, no watermark, no confetti, no additional balloons, no objects, no scenery, no dark background, no neon glow, no people, no busy composition.
```

### Ustawienia

- format: 16:9
- rekomendowana rozdzielczość: 1920 x 1080 lub wyższa
- kompozycja: balloon on right, copy-safe area on left
- background lock: `#F7FBFF`

---

## Higgsfield - End Frame Prompt

```text
Cinematic wide composition with the exact same cobalt-blue helium balloon now drifting partly beyond the upper-left edge of the frame, as if it is gently leaving the scene.

The balloon remains identical in shape, scale, material and color. Its single long red ribbon trails behind and crosses the lower-center part of the frame in one elegant, loose curve. The curve should feel natural and physical, not like typography, an icon or a logo. Leave a calm open area in the center for a website call to action.

Exact same #F7FBFF background, camera position, lens, light direction and exposure as the start frame. Bright natural daylight, soft rim light, controlled reflections on the latex surface, believable ribbon physics, gentle shadow, crisp balloon with a subtle depth falloff.

Premium editorial family-brand campaign, playful, optimistic and modern. 16:9 landscape, full-frame cinema camera, 50 mm lens, f/2.8, ultra-high resolution, photorealistic.

No additional balloons, no play objects, no cake, no brush, no leaves, no photographs generated inside the frame, no labels, no text, no logo, no watermark, no people, no faces, no dark background, no transformation, no visual clutter.
```

---

## Higgsfield - Motion Prompt

```text
Create one continuous, seamless slow-motion flight from the start frame to the end frame.

The cobalt-blue balloon rises gently from the lower-right edge, crosses the central area in a wide, slow S-curve and drifts toward the upper-left edge. It should move with believable helium buoyancy and a very subtle side-to-side sway. The camera remains almost completely locked, with only a barely perceptible forward push.

The single long red ribbon follows with soft physical delay. It briefly sweeps across the lower third of the composition, creating a natural visual path where the website will later place real photographs. The ribbon never becomes an icon, object, word or logo. Nothing emerges from the balloon and the balloon never changes form.

At three points in the flight, let the balloon slow down for a short visual hold. These holds will be used to reveal real photographs and scroll-synced text in the website layer. Keep large calm negative-space areas and the exact background color #F7FBFF throughout.

Motion should feel joyful, light and premium: gentle balloon sway, soft ribbon follow-through, no fast camera moves, no shaking, no abrupt zooms, no character animation, no generated faces, no text, no object transformations.

Duration: 8-10 seconds. 24 fps. 16:9. Smooth start and end with at least 12 visually stable frames at both ends. Optimize for extraction into a 120-frame WebP sequence controlled by website scroll.
```

### Negative prompt

```text
dark studio, black background, luxury watch commercial, technical exploded diagram, metallic machinery, cyberpunk, neon glow, heavy contrast, oversaturated colors, cartoon rendering, plastic toy look, deformed balloon, duplicate balloons, extra objects, cake, paint brush, leaves, floating text, logo, watermark, camera shake, fast dolly, hard cuts, flicker, changing background color, changing lighting direction, changing lens, morphing objects, people, children, visible faces
```

---

## AI Code Editor Prompt

```text
ACT AS:
A senior Creative Developer and Product Designer specializing in Next.js, Motion, accessible conversion-focused websites and high-performance scrollytelling.

PROJECT:
Build a production-ready Polish website for "Łap Chwile", a family play and birthday venue in Nieporęt by Lake Zegrzyński.

This is a real local family business. The design must feel energetic, welcoming and trustworthy for parents, schools and kindergartens. It may be visually bold, but it must never look like a dark luxury product launch, a generic children’s template or an amusement-park cartoon.

DESIGN READ:
Bright editorial family brand with real documentary photography, expressive but controlled typography and one cinematic balloon motif moving through the page.

DESIGN SETTINGS:
- DESIGN_VARIANCE: 8/10
- MOTION_INTENSITY: 8/10
- VISUAL_DENSITY: 4/10
- Theme: light across the whole website
- Card radius: 20px
- Buttons: pill-shaped
- Inputs: 12px radius

TECH STACK:
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- Motion from `motion/react`
- HTML5 Canvas for the scroll-linked image sequence
- `next/image` and `next/font`
- Use only one animation system inside the balloon sequence component
- Use Phosphor Icons for interface icons; do not hand-draw SVG icons

PROJECT RESET:
The current static prototype in `folder bez nazwy` is rejected and must not influence the new design, layout, copy, motion or code structure. Remove it before building. Do not preserve its dark visual direction, generated product-style frame sequences, type choices or section layouts. Start from a clean Next.js App Router project using only the verified brand logo and real media from the workspace.

DEPENDENCY RULE:
Inspect `package.json` before importing any package. Create the smallest clean Next.js App Router setup needed and install only the dependencies actually used.

BRAND ASSETS AND REAL MEDIA:
- Main logo source: `/Users/marcin/Documents/WEBDEV/LAP CHWILE/LOGOTYP_LCh.png`
- Real birthday photos and videos: `/Users/marcin/Documents/WEBDEV/LAP CHWILE/Urodziny_realizacja/`

Audit the real photo and video folder before choosing media. Prefer authentic moments with children playing, an animator leading activities, creative workshop details and the outdoor lakeside environment. Do not use AI-generated children. Do not expose the source folder structure in public URLs. Copy only selected optimized assets into descriptive folders under `public/media/`.

Create responsive WebP or AVIF variants for photographs. Preserve originals. Use meaningful Polish alt text. If a child can be identified, assume the business has permission to use the supplied photo, but do not invent names or personal details.

COLOR SYSTEM:
- Primary background: #F7FBFF
- Warm surface: #FFFDF7
- Primary CTA and links: #1754A8
- Primary text: #17223B
- Muted text: #5B667A
- Brand supporting accents: #F04438, #FFD34D, #14A66A

Use blue consistently for interactive actions. Reserve red, yellow and green for the balloon animation, illustrations, small section accents and selected visual details. Avoid rainbow UI controls.

TYPOGRAPHY:
- Display: Bricolage Grotesque through `next/font`
- Body: Manrope through `next/font`
- Headings should feel friendly and editorial, not infantile
- Never load Google Fonts through a `<link>` tag

GLOBAL VISUAL MOTIF:
Use the concept `Balon łapie chwile`. A single balloon and its ribbon guide the user through one cinematic chapter of the home page. The ribbon gently pulls real photographs into the frame like memories being caught before they fly away. The balloon never transforms into attractions, icons, products or a logo. Do not scatter random floating balloons across every viewport and do not repeat the effect on every subpage.

HERO:
Build an asymmetric split hero that fits inside the first `100dvh` viewport.

Use the strongest real landscape video from `Urodziny_realizacja` as a muted, autoplaying, looped hero media panel with a poster image and `playsInline`. The video must not block the headline’s readability. On low-power devices, reduced-motion mode or connection-saving mode, show the poster image instead.

Copy:
Eyebrow: `Nieporęt, Zalew Zegrzyński`
Headline: `Łap Chwile. Urodziny, które zostają na długo.`
Body: `Tor Ninja, twórcze warsztaty i animacje w jednym miejscu nad Zalewem Zegrzyńskim.`
Primary CTA: `Zarezerwuj urodziny`
Secondary CTA: `Zobacz atrakcje`

Use the supplied logo in the navigation. Do not recreate the wordmark with plain text.

MAIN SCROLLYTELLING SECTION:
Create `components/BalloonStory.tsx` as an isolated Client Component.

Inputs:
- 120 WebP frames generated from Higgsfield, showing only the balloon and ribbon on #F7FBFF
- naming: `/frames/balloon/frame_0001.webp` through `/frames/balloon/frame_0120.webp`
- all frames: 16:9, identical background #F7FBFF

Layout:
- outer section: `min-h-[400dvh]`
- inner canvas wrapper: sticky, top 0, min-height 100dvh, full width
- canvas centered with contain-fit on mobile and cover-fit only when safe on wide desktop
- background color must match the frames exactly so their edges disappear

Behavior:
- use `useScroll`, `useTransform` and `useMotionValueEvent`
- map progress 0 to 1 into frames 0 to 119
- preload the first frame immediately, then the rest in chunks
- draw through `requestAnimationFrame` without React state updates on every frame
- cap the device pixel ratio at 2
- redraw on ResizeObserver updates
- avoid flashing blank frames when the user scrolls faster than preloading
- show a skeleton-like poster state, not a generic circular spinner
- provide a static poster fallback if frames are absent
- respect `prefers-reduced-motion` by displaying the key end frame without scroll scrubbing
- layer selected real photographs above the generated sequence as separate semantic image elements
- never bake or AI-generate children into the Higgsfield frames
- synchronize the real photographs to the three visual holds in the balloon motion
- each photograph enters with a restrained masked reveal and slight translation, as if gently pulled by the passing ribbon
- do not render literal knots connecting the ribbon to the photos unless the frame alignment is exact

Scroll-synced copy:
- 0-18%: `Chwile mają to do siebie, że szybko uciekają.` with only the balloon visible
- 22-42%: `Najpierw jest ruch.` with a real action photograph entering from the opposite side
- 46-66%: `Potem pomysł.` with a real workshop close-up replacing the first image
- 70-88%: `A później zostaje wspomnienie.` with a real birthday or animator photograph filling more of the frame
- 92-100%: `Złapmy Wasz termin.` centered with CTA as the balloon leaves and the ribbon rests beneath the message

Text transitions must use opacity and transform only. Keep them subtle and readable. Do not show more than one message at a time on mobile.

HOME PAGE CONTENT:

1. Hero
2. Trust strip under the hero with five concise benefits and Phosphor icons:
   - Urodziny od 3 do 100 lat
   - Animacje prowadzone przez animatorów
   - Kilka stref zabawy
   - Lokalizacja nad Zalewem Zegrzyńskim
   - Rodzice mogą odpocząć
3. BalloonStory scroll sequence
4. `Nasze strefy` as an asymmetric five-tile editorial grid with real imagery:
   - Tor Ninja
   - Ogród sensoryczny
   - Warsztaty kreatywne
   - Strefa urodzin
   - Sezonowe atrakcje
   Every tile links to its own route under `/strefy/[slug]`.
5. `Urodziny po Waszemu` as a large photo-led section linking to `/urodziny`
6. Upcoming events preview with a maximum of three real/configured events and link to `/wydarzenia`
7. Real photo gallery strip with mixed aspect ratios, not equal generic cards
8. Google reviews section prepared for live data. If credentials or review data are not provided, do not invent reviews, ratings or reviewer names. Render a clear integration-ready empty state.
9. FAQ accordion using the supplied questions
10. Reservation CTA and contact footer

ROUTES:
- `/` home
- `/urodziny` full conversion landing page
- `/atrakcje`
- `/strefy/tor-ninja`
- `/strefy/ogrod-sensoryczny`
- `/strefy/warsztaty-kreatywne`
- `/strefy/strefa-urodzin`
- `/strefy/atrakcje-sezonowe`
- `/wydarzenia`
- `/dla-szkol-i-przedszkoli`
- `/cennik`
- `/galeria`
- `/blog`
- `/blog/[slug]`
- `/opinie`
- `/faq`
- `/kontakt`
- `/rezerwacja`

Navigation must stay on one line on desktop and collapse into an accessible mobile menu. Primary desktop items: `Urodziny`, `Atrakcje`, `Wydarzenia`, `Dla grup`, `Galeria`, `Kontakt`. Keep `Zarezerwuj` as the primary nav CTA.

THE `/URODZINY` LANDING PAGE:
- Large real photography
- What the package includes
- How the party proceeds, described by meaningful stages rather than generic numbered cards
- Themes: Stitch, Minecraft, Barbie, Pokemon, Hot Wheels, Psi Patrol, Frozen, Ninjago, Wednesday, Bluey
- Treat theme names as user-selectable text, not as copyrighted character art unless supplied licensed media is available
- Gallery
- Real reviews or integration-ready state
- Sticky mobile CTA: `Zarezerwuj termin`

ATTRACTIONS PAGE:
Cover workshops, face painting, temporary tattoos, animators, field games and seasonal workshops. Use real photographs where available.

EVENT CALENDAR:
Support month filters and cards for July, August, weekend animations, workshops and theme days. Keep event content in a typed data file or CMS-ready adapter. Do not invent dates. Provide an honest empty state when no events are configured.

SCHOOLS AND KINDERGARTENS:
Cover trips, picnics, workshops and integration events. Add a PDF download component that only enables when the configured PDF exists.

PRICING:
Create an easy-to-scan pricing layout driven by typed data. Do not invent prices. If pricing data is missing, show `Cennik przygotowujemy indywidualnie` with a contact CTA. Add PDF download support only when a file exists.

GALLERY:
Filters: `Urodziny`, `Warsztaty`, `Rodzinne weekendy`, `Eventy`. Use an accessible lightbox. Lazy-load below-the-fold images.

BLOG:
Create CMS-ready article data and listing layouts. Prepare these titles without writing misleading filler articles:
- Najlepsze miejsce na urodziny dziecka pod Warszawą
- Co robić z dzieckiem w weekend nad Zalewem Zegrzyńskim
- 20 pomysłów na urodziny 6-latka
- Jak przygotować idealne przyjęcie urodzinowe
- Wakacje z dzieckiem w Nieporęcie
- Atrakcje dla dzieci pod Warszawą
- Najciekawsze zabawy dla 5-latków
- Jak wybrać animatora na urodziny

FAQ QUESTIONS:
- Czy można przynieść własny tort?
- Czy można zamówić catering?
- Czy imprezy odbywają się podczas deszczu?
- Od ilu dzieci organizowane są urodziny?
- Czy rodzice zostają?
- Czy można zorganizować urodziny zimą?

Do not invent the answers when business rules are unknown. Store answers in a single editable data file and clearly mark missing business decisions there.

CONTACT:
Include map, parking information, phone, Messenger, WhatsApp, form and opening hours. Put all factual business data in `content/site-config.ts`. Do not invent an address, telephone number, opening hours or social links. If missing, render only verified fields and leave explicit TODO comments in the config.

ONLINE RESERVATION:
No online payment. Build an accessible form with:
- preferred date
- number of children
- child age or age range
- birthday theme
- package
- optional attractions
- parent or guardian name
- telephone
- email
- message
- privacy consent

Labels must stay above inputs. Implement loading, inline validation, error and success states. If no backend is configured, use a clearly isolated server action adapter and do not pretend submissions are stored.

PARENT ACCOUNT:
Treat `/konto` as phase two. Do not implement fake authentication or fake data. Document a future model for reservation history, payments, downloadable invitations, guest list, theme selection and add-ons.

SEO AND LOCAL DISCOVERY:
- Polish metadata for every route
- canonical URLs under `https://lapchwile.com`
- Open Graph image using real venue photography
- semantic headings
- `LocalBusiness` or the most accurate Schema.org subtype with only verified data
- `Event` schema only for real configured events
- `FAQPage` schema only for visible verified FAQ content
- sitemap and robots
- preserve Polish diacritics

ACCESSIBILITY AND PERFORMANCE:
- WCAG AA contrast
- visible keyboard focus
- accessible menu, accordion, lightbox and forms
- no autoplay audio
- respect reduced motion everywhere
- do not use `h-screen`; use `min-h-[100dvh]`
- no raw `window.addEventListener('scroll')`
- LCP target below 2.5 seconds
- CLS below 0.1
- prioritize only the hero poster, not an entire gallery
- lazy-load non-critical media

CONTENT RULES:
- Polish copy must sound natural, warm and concrete
- Do not use fake statistics, fake prices, fake reviews or fake availability
- Do not use em dashes
- Avoid generic marketing phrases such as `niezapomniane doświadczenia` when a concrete statement is possible
- No clutter, no random floating badges, no decorative section numbering
- Keep every CTA short and on one line

DELIVERABLES:
1. Complete Next.js project structure and all route files
2. Reusable components
3. `components/BalloonStory.tsx`
4. Central typed content files
5. Optimized selected media in `public/media/`
6. Reservation form states and backend adapter boundary
7. README with setup, frame export instructions and a list of missing business data
8. `content/site-config.ts` with explicit TODO fields for unverified contact details
9. Automated checks for TypeScript, lint and production build

Before finishing:
- run the app
- inspect desktop and mobile layouts
- test keyboard navigation
- test reduced motion
- verify every internal route
- run typecheck, lint and production build
- report any missing factual content instead of filling it with invented data
```

## Eksport sekwencji z Higgsfield

Po wygenerowaniu klipu wyeksportuj 120 klatek do WebP w stałym rozmiarze 1920 x 1080 i nazwij je:

```text
frame_0001.webp
frame_0002.webp
...
frame_0120.webp
```

Docelowy katalog aplikacji:

```text
public/frames/balloon/
```

Zachowaj też:

- `poster-start.webp` jako szybki placeholder i fallback
- `poster-end.webp` dla `prefers-reduced-motion`
- `balloon-story.mp4` jako opcjonalny fallback dla starszych urządzeń

## Dane, których nie wolno zgadywać

Przed publikacją trzeba uzupełnić:

- dokładny adres i pinezkę mapy
- telefon
- Messenger i WhatsApp
- godziny otwarcia
- pakiety i ceny
- treść odpowiedzi FAQ
- realne wydarzenia i terminy
- link lub dane do opinii Google
- regulamin i treść zgód formularza
- pliki PDF dla szkół i cennika
