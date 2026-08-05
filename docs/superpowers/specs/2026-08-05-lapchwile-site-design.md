# Łap Chwile — production website design spec

Date: 2026-08-05. Source: user production prompt (PROMPT_LAP_CHWILE.md) + workspace audit + brand research. This spec records decisions made where the prompt left gaps; the prompt itself is the authoritative brief.

## What is being built

Production Polish website for Łap Chwile, a family play and birthday venue in Nieporęt by Lake Zegrzyński. Next.js App Router + TypeScript + Tailwind + Motion. Light, sunny, editorial family brand. One cinematic motif: a cobalt balloon with a red ribbon that "catches" real photographs while scrolling (BalloonStory).

## Verified business data (from research, 2026-08-05)

- Registered entity: ŁAP CHWILE Anna Godlewska, ul. Polnych Kwiatów 11, 05-126 Nieporęt, NIP 1251338814 (source: current lapchwile.com placeholder site).
- Contact: kontakt@lapchwile.com, +48 790 790 137 (same source).
- Venue: outdoor play zone at Port Pilawa, Kompleks Rekreacyjno-Wypoczynkowy Nieporęt-Pilawa, next to the skatepark; opened 2026-05-31; zones: Tor Ninja, ogród sensoryczny, warsztaty (source: nieporet.pl news article).
- NOT verified (stay as TODO in site-config): opening hours, Messenger/WhatsApp, social profiles, packages/prices, FAQ answers, events, Google reviews source, map pin coordinates, PDF files.

## Media audit conclusions

- 180 photos + 57 videos in Urodziny_realizacja. All photos EXIF-rotated; many portrait.
- ALL videos are portrait (rotation=-90 metadata; the two .mov files are 1080×1920 edited promo reels: Barbie birthday + grand opening).
- Deviation from brief: the brief asked for "the strongest real landscape video" in the hero — none exists. Decision: asymmetric split hero with a portrait video panel (phone-documentary format) on the right, headline left. Hero video: VID_20260718_190050304.mp4 (golden-hour bubble dome with brand-color balloons, 8.8s, calm single scene).
- Tor Ninja and ogród sensoryczny have no photos; zone tiles for those use stills extracted from real videos (climber: VID_20260717_183142340, music wall: VID_20260717_190959697, mud kitchen: VID_20260718_183840496, sandbox: VID_20260718_184956970).
- Selected photos (index → file) recorded in scratchpad audit; copied under public/media with descriptive Polish slugs. Identifiable children appear only in photos supplied by the business (permission assumed per brief, no names invented). Preference given to backs-of-heads shots where equivalent.

## Balloon sequence pipeline

- Start/end frames: nano_banana_pro 16:9 2k with the user's Higgsfield prompts.
- Motion: seedance_2_0, start_image + end_image, user's motion prompt, 8 s, 1080p std, silent.
- Export: ffmpeg → 120 × WebP 1920×1080 → public/frames/balloon/frame_0001..0120.webp + poster-start.webp + poster-end.webp + balloon-story.mp4.
- BalloonStory component per brief: 400dvh outer, sticky canvas, useScroll → frame index, rAF drawing, DPR cap 2, chunked preload, three photo holds at ~30%, ~55%, ~80% progress mapped to the motion's slow-down holds, reduced-motion → poster-end static.

## Architecture

- App Router, all routes from the brief. Server Components by default; Client Components only: BalloonStory, nav (mobile menu), FAQ accordion, gallery lightbox + filters, reservation form, sticky mobile CTA.
- Content layer: `content/site-config.ts` (verified data + explicit TODOs), `content/zones.ts`, `content/events.ts` (empty, honest empty state), `content/pricing.ts` (empty → "Cennik przygotowujemy indywidualnie"), `content/faq.ts` (questions, answers null → "odpowiedź wkrótce" state, marked missing), `content/blog.ts` (titles as drafts, no fake articles), `content/gallery.ts`, `content/themes.ts` (text-only theme names).
- Reservation: server action adapter `lib/reservation-adapter.ts` — validates, logs, returns success without pretending storage; boundary documented for future backend.
- `/konto`: not implemented; future model documented in README.
- SEO: per-route metadata, canonical lapchwile.com, LocalBusiness (verified fields only), FAQPage only if visible verified answers exist (initially omitted), sitemap.ts, robots.ts, OG from real photo.

## Old prototype

`folder bez nazwy` moved to `_archive/prototype-2026-07` (not deleted). Nothing reused except LOGOTYP_LCh.png from workspace root.

## Design language

- Palette per brief (#F7FBFF bg, #FFFDF7 warm, #1754A8 CTA, #17223B text, #5B667A muted; #F04438/#FFD34D/#14A66A accents only).
- Type: Bricolage Grotesque display + Manrope body via next/font (Google fonts pipeline, no <link>).
- 20px card radius, pill buttons, 12px inputs, WCAG AA, min-h-[100dvh], no em dashes in copy, no fake data anywhere.
