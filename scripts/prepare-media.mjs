/**
 * Copies the curated selection of real photos and videos from
 * Urodziny_realizacja into public/media with descriptive Polish names.
 * - photos: EXIF-rotated, optimized WebP masters (max 2000 px long edge);
 *   responsive sizes are produced at runtime by next/image
 * - videos: H.264 re-encodes (muted, faststart) + WebP posters
 * - zone tiles for Tor Ninja / ogród sensoryczny: stills extracted from
 *   real videos, because the photo set contains no coverage of those zones
 * Originals are never modified. Run: npm run media
 */
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import path from "node:path";

const SRC = path.resolve("Urodziny_realizacja");
const OUT = path.resolve("public/media");

/** photo selection: source file -> destination slug (no extension) */
const PHOTOS = {
  "IMG_20260711_134638747_HDR.jpg": "urodziny/tort-przy-sciance",
  "IMG_20260711_134643494_HDR.jpg": "urodziny/tort-przy-sciance-2",
  "IMG_20260711_134620598.jpg": "urodziny/dzieci-przy-sciance",
  "IMG_20260711_134622218.jpg": "urodziny/dzieci-przy-sciance-2",
  "IMG_20260704_110445890_HDR.jpg": "urodziny/namiot-strefa-urodzin",
  "IMG_20260704_110449189_HDR.jpg": "urodziny/stol-urodzinowy-wyscigi",
  "IMG_20260621_153120062_HDR.jpg": "urodziny/stol-pokemon",
  "IMG_20260621_153122976_HDR.jpg": "urodziny/stol-pokemon-2",
  "IMG_20260704_110600760_HDR.jpg": "urodziny/poczestunek",
  "IMG_20260621_153136188_HDR.jpg": "urodziny/poczestunek-arbuz",
  "IMG_20260621_153157019_HDR.jpg": "urodziny/girlanda-balonowa",
  "IMG_20260709_170758496_HDR(1).jpg": "urodziny/animator-z-dziecmi",
  "IMG_20260711_115905377_HDR.jpg": "urodziny/przyjecie-w-namiocie",
  "IMG_20260711_134300571_HDR.jpg": "urodziny/scianka-lap-chwile",
  "IMG_20260717_190943604_HDR.jpg": "warsztaty/stolik-kolorowanki",
  "IMG_20260717_190945056_HDR.jpg": "warsztaty/stolik-kolorowanki-2",
  "IMG_20260709_172452194_HDR(1).jpg": "warsztaty/malowanie-twarzy",
  "IMG_20260709_172457871_HDR(1).jpg": "warsztaty/malowanie-twarzy-2",
  "IMG_20260709_173419767_HDR(1).jpg": "warsztaty/paleta-farb",
  "IMG_20260709_173402121_HDR(1).jpg": "warsztaty/stol-warsztatowy",
  "IMG_20260714_142607449_HDR.jpg": "warsztaty/dinozaur-portret",
  "IMG_20260718_190105159_HDR.jpg": "zabawa/kula-xxl",
  "IMG_20260718_190106699_HDR.jpg": "zabawa/kula-xxl-2",
  "IMG_20260714_131857057_HDR.jpg": "zabawa/kula-na-trawie",
  "IMG_20260717_194459846_HDR.jpg": "zabawa/banki-mydlane",
  "IMG_20260717_194501357_HDR.jpg": "zabawa/banki-mydlane-2",
  "IMG_20260621_120001707_HDR.jpg": "zabawa/klocki-xxl",
  "IMG_20260621_124345965_HDR.jpg": "zabawa/wata-cukrowa",
  "IMG_20260709_171400650_HDR(1).jpg": "zabawa/bieg-po-trawie",
  "IMG_20260711_125123443_HDR.jpg": "zabawa/gry-terenowe",
  "IMG_20260709_171333069_HDR.jpg": "zabawa/animacje-w-parku",
  "IMG_20260709_171310233_HDR(1).jpg": "zabawa/szachy-ogrodowe",
  "IMG_20260709_165042522_HDR(1).jpg": "zabawa/kula-dzieci",
};

/** videos: source -> { slug, posterAt (s) } */
const VIDEOS = {
  "VID_20260718_190050304.mp4": { slug: "video/hero-kula", posterAt: 1.0 },
  "copy_02271F17-C90A-4062-A3F1-361C5207AA0E.mov": {
    slug: "video/urodziny-reel",
    posterAt: 0.5,
  },
  "copy_278629C6-1982-4A1C-AE1F-F45416E40CE7.mov": {
    slug: "video/otwarcie-reel",
    posterAt: 4.0,
  },
};

/** zone tiles taken as stills from real videos: source -> { slug, at (s) } */
const STILLS = {
  "VID_20260717_183142340.mp4": { slug: "strefy/tor-ninja", at: 4.5 },
  "VID_20260718_183840496.mp4": { slug: "strefy/ogrod-sensoryczny", at: 4.0 },
  "VID_20260717_190959697.mp4": { slug: "strefy/tablica-muzyczna", at: 3.0 },
  "VID_20260718_184956970.mp4": { slug: "strefy/piaskownica", at: 3.0 },
  "VID_20260717_183240539.mp4": { slug: "strefy/kule-wodne", at: 3.5 },
};

const manifest = {};

async function photo(srcName, slug) {
  const dest = path.join(OUT, `${slug}.webp`);
  mkdirSync(path.dirname(dest), { recursive: true });
  const img = sharp(path.join(SRC, srcName)).rotate();
  const meta = await img.metadata();
  // metadata() reports pre-rotation size; swap for 90/270 EXIF orientations
  const swapped = meta.orientation >= 5;
  const w = swapped ? meta.height : meta.width;
  const h = swapped ? meta.width : meta.height;
  const resized = Math.max(w, h) > 2000 ? img.resize(w > h ? { width: 2000 } : { height: 2000 }) : img;
  const info = await resized.webp({ quality: 82 }).toFile(dest);
  manifest[slug] = { src: `/media/${slug}.webp`, width: info.width, height: info.height };
  console.log(`photo ${slug} ${info.width}x${info.height}`);
}

function ff(args) {
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });
}

async function video(srcName, { slug, posterAt }) {
  const dest = path.join(OUT, `${slug}.mp4`);
  const poster = path.join(OUT, `${slug}-poster.webp`);
  mkdirSync(path.dirname(dest), { recursive: true });
  ff([
    "-i", path.join(SRC, srcName),
    "-an",
    "-c:v", "libx264", "-crf", "23", "-preset", "slow",
    "-vf", "scale='min(1080,iw)':-2",
    "-movflags", "+faststart",
    dest,
  ]);
  const tmp = path.join(OUT, `${slug}-poster-tmp.png`);
  ff(["-ss", String(posterAt), "-i", dest, "-frames:v", "1", tmp]);
  const info = await sharp(tmp).webp({ quality: 80 }).toFile(poster);
  execFileSync("rm", [tmp]);
  manifest[slug] = {
    src: `/media/${slug}.mp4`,
    poster: `/media/${slug}-poster.webp`,
    width: info.width,
    height: info.height,
  };
  console.log(`video ${slug} ${info.width}x${info.height}`);
}

async function still(srcName, { slug, at }) {
  const dest = path.join(OUT, `${slug}.webp`);
  mkdirSync(path.dirname(dest), { recursive: true });
  const tmp = path.join(OUT, `${slug}-tmp.png`);
  ff(["-ss", String(at), "-i", path.join(SRC, srcName), "-frames:v", "1", tmp]);
  const info = await sharp(tmp).webp({ quality: 82 }).toFile(dest);
  execFileSync("rm", [tmp]);
  manifest[slug] = { src: `/media/${slug}.webp`, width: info.width, height: info.height };
  console.log(`still ${slug} ${info.width}x${info.height}`);
}

async function logo() {
  const dest = path.join(OUT, "logo/logotyp-lap-chwile.png");
  mkdirSync(path.dirname(dest), { recursive: true });
  // the source logo has a white background: key it to alpha (exact shapes,
  // no AI), un-blend edge pixels, then a gentle 2x lanczos upscale
  const { data, info: rawInfo } = await sharp(path.resolve("LOGOTYP_LCh.png"))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < rawInfo.width * rawInfo.height; i++) {
    const o = i * 4;
    const r = data[o], g = data[o + 1], b = data[o + 2];
    const d = Math.sqrt(((255 - r) ** 2 + (255 - g) ** 2 + (255 - b) ** 2) / 3);
    const a = Math.max(0, Math.min(255, Math.round(d * 3)));
    data[o + 3] = a;
    if (a > 0 && a < 255) {
      const af = a / 255;
      data[o] = Math.max(0, Math.min(255, Math.round((r - 255 * (1 - af)) / af)));
      data[o + 1] = Math.max(0, Math.min(255, Math.round((g - 255 * (1 - af)) / af)));
      data[o + 2] = Math.max(0, Math.min(255, Math.round((b - 255 * (1 - af)) / af)));
    }
  }
  const keyed = await sharp(data, {
    raw: { width: rawInfo.width, height: rawInfo.height, channels: 4 },
  })
    .png()
    .toBuffer();
  const info = await sharp(keyed)
    .trim()
    .resize({ width: 920, kernel: "lanczos3" })
    .png({ compressionLevel: 9 })
    .toFile(dest);
  manifest["logo/logotyp-lap-chwile"] = {
    src: "/media/logo/logotyp-lap-chwile.png",
    width: info.width,
    height: info.height,
  };
  console.log(`logo ${info.width}x${info.height} (transparent)`);
}

for (const [src, slug] of Object.entries(PHOTOS)) {
  if (!existsSync(path.join(SRC, src))) {
    console.warn(`MISSING ${src}`);
    continue;
  }
  await photo(src, slug);
}
for (const [src, cfg] of Object.entries(VIDEOS)) await video(src, cfg);
for (const [src, cfg] of Object.entries(STILLS)) await still(src, cfg);
await logo();

writeFileSync(
  path.resolve("scripts/media-manifest.json"),
  JSON.stringify(manifest, null, 2)
);
console.log(`\nmanifest: ${Object.keys(manifest).length} entries`);
