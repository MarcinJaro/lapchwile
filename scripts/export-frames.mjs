/**
 * Exports the scroll-scrub frame sequence for components/BalloonStory.tsx
 * from the generated balloon flight video.
 *
 * Input:  public/media/video/balloon-story.mp4 (Seedance render, 1920x1080)
 * Output: public/frames/balloon/frame_0001.webp ... frame_0120.webp
 *         public/frames/balloon/poster-start.webp, poster-end.webp
 *
 * Run: npm run frames
 */
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync, existsSync } from "node:fs";
import path from "node:path";

const VIDEO = path.resolve("public/media/video/balloon-story.mp4");
const OUT = path.resolve("public/frames/balloon");
const TMP = path.resolve(".frames-tmp");
const FRAMES = 120;

if (!existsSync(VIDEO)) {
  console.error(`Missing ${VIDEO}. Place the generated balloon video there first.`);
  process.exit(1);
}

rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });
mkdirSync(OUT, { recursive: true });

const dur = parseFloat(
  execFileSync("ffprobe", [
    "-v", "quiet",
    "-show_entries", "format=duration",
    "-of", "csv=p=0",
    VIDEO,
  ]).toString()
);

// Evenly sample exactly FRAMES frames across the whole clip.
execFileSync("ffmpeg", [
  "-y", "-loglevel", "error",
  "-i", VIDEO,
  "-vf", `fps=${FRAMES}/${dur}:round=near,scale=1920:1080`,
  "-frames:v", String(FRAMES),
  path.join(TMP, "f_%04d.png"),
]);

const pngs = readdirSync(TMP).filter((f) => f.endsWith(".png")).sort();
if (pngs.length < FRAMES) {
  console.error(`Only ${pngs.length} frames extracted, expected ${FRAMES}.`);
  process.exit(1);
}

for (let i = 0; i < FRAMES; i++) {
  const out = path.join(OUT, `frame_${String(i + 1).padStart(4, "0")}.webp`);
  await sharp(path.join(TMP, pngs[i])).webp({ quality: 72 }).toFile(out);
}

await sharp(path.join(TMP, pngs[0]))
  .webp({ quality: 80 })
  .toFile(path.join(OUT, "poster-start.webp"));
await sharp(path.join(TMP, pngs[FRAMES - 1]))
  .webp({ quality: 80 })
  .toFile(path.join(OUT, "poster-end.webp"));

rmSync(TMP, { recursive: true, force: true });

const files = readdirSync(OUT);
console.log(`exported ${files.filter((f) => f.startsWith("frame_")).length} frames + posters`);
