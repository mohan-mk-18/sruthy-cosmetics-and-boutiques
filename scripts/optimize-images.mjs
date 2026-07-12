#!/usr/bin/env node
/**
 * Fully automated image optimization pipeline for Sruthy Cosmetics And Boutiques.
 *
 * Usage:
 *   1. npm install       (sharp is already listed in devDependencies)
 *   2. Drop the client's original photos into /raw-photos — any subfolder
 *      structure, any of jpg/jpeg/png/webp/tiff/bmp. No renaming, no manual
 *      editing needed.
 *   3. npm run optimize-images
 *
 * For every photo found, this script:
 *   - Auto-orients using the file's EXIF orientation tag, then bakes that
 *     rotation into the actual pixels (more reliable across browsers than
 *     leaving the EXIF tag for the renderer to interpret).
 *   - Resizes to a max width of 1600px, preserving aspect ratio, and never
 *     upscales a smaller source image.
 *   - Compresses and exports three formats: .jpg (broad fallback), .webp,
 *     and .avif (smallest, modern browsers) — Next.js's <Image> component
 *     and image-optimization pipeline will automatically serve whichever
 *     format + size a given browser/viewport needs.
 *   - Converts the original filename into an SEO-friendly, URL-safe slug
 *     (lowercase, hyphenated, no special characters).
 *   - Writes everything into /public/images, ready to reference from
 *     data/products.json, data/categories.ts, data/gallery.ts, or
 *     lib/config.ts.
 *
 * A manifest (raw-photos/optimize-manifest.json) records the mapping from
 * each original filename to its new slug + dimensions, so you know exactly
 * what to paste into the site's data files.
 */
import sharp from "sharp";
import { readdirSync, statSync, mkdirSync, writeFileSync, existsSync } from "fs";
import path from "path";

const RAW_DIR = path.resolve("raw-photos");
const OUT_DIR = path.resolve("public/images");
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 82;
const WEBP_QUALITY = 82;
const AVIF_QUALITY = 55;

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".tiff", ".bmp"]);
const HEIC_EXTENSIONS = new Set([".heic", ".heif"]);

/** Lowercase, hyphenated, URL-safe slug — e.g. "Bridal Set (Final) 2.JPG" -> "bridal-set-final-2". */
function slugify(name) {
  const slug = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accent marks
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return slug || "image";
}

function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (entry.startsWith(".")) continue; // skip .DS_Store etc.
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...walk(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

async function run() {
  if (!existsSync(RAW_DIR)) {
    console.error(`No raw-photos/ folder found at ${RAW_DIR}`);
    console.error(`Create it in the project root and drop the client's original photos inside, then re-run.`);
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  const allFiles = walk(RAW_DIR).filter((f) => path.basename(f) !== "optimize-manifest.json");
  const imageFiles = allFiles.filter((f) => SUPPORTED_EXTENSIONS.has(path.extname(f).toLowerCase()));
  const heicFiles = allFiles.filter((f) => HEIC_EXTENSIONS.has(path.extname(f).toLowerCase()));

  if (imageFiles.length === 0) {
    console.log("No supported images found in raw-photos/. Supported: jpg, jpeg, png, webp, tiff, bmp.");
    if (heicFiles.length > 0) {
      console.log(
        `Found ${heicFiles.length} HEIC/HEIF file(s) (common from iPhones) — export these as JPG first ` +
          `(Photos app: File > Export > Export Photos > JPEG), then re-run.`
      );
    }
    return;
  }

  const usedSlugs = new Map(); // slug -> count seen this run, so two files don't clobber each other
  const manifest = [];

  for (const file of imageFiles) {
    const original = path.parse(file).name;
    let slug = slugify(original);

    const seen = usedSlugs.get(slug) ?? 0;
    usedSlugs.set(slug, seen + 1);
    if (seen > 0) slug = `${slug}-${seen + 1}`;

    try {
      const pipeline = sharp(file)
        .rotate() // auto-orient from EXIF, bake into pixels
        .resize({ width: MAX_WIDTH, withoutEnlargement: true });

      const jpgPath = path.join(OUT_DIR, `${slug}.jpg`);
      const webpPath = path.join(OUT_DIR, `${slug}.webp`);
      const avifPath = path.join(OUT_DIR, `${slug}.avif`);

      await pipeline.clone().jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(jpgPath);
      await pipeline.clone().webp({ quality: WEBP_QUALITY }).toFile(webpPath);
      await pipeline.clone().avif({ quality: AVIF_QUALITY, effort: 4 }).toFile(avifPath);

      const { width, height } = await sharp(jpgPath).metadata();

      manifest.push({
        original: path.relative(RAW_DIR, file),
        slug,
        width,
        height,
        files: [`/images/${slug}.jpg`, `/images/${slug}.webp`, `/images/${slug}.avif`],
      });

      console.log(`✓ ${path.relative(RAW_DIR, file)} → ${slug} (${width}×${height}, .jpg/.webp/.avif)`);
    } catch (err) {
      console.error(`✗ Failed to process ${path.relative(RAW_DIR, file)}:`, err.message);
    }
  }

  const manifestPath = path.join(RAW_DIR, "optimize-manifest.json");
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`\nDone — ${manifest.length}/${imageFiles.length} photo(s) optimized into public/images/`);
  console.log(`Manifest: ${path.relative(process.cwd(), manifestPath)}`);
  console.log(`Use each entry's "slug" to update data/products.json, data/categories.ts, data/gallery.ts, or lib/config.ts.`);

  if (heicFiles.length > 0) {
    console.log(`\nSkipped ${heicFiles.length} HEIC/HEIF file(s) — export as JPG first, then re-run.`);
  }
}

run().catch((err) => {
  console.error("Image optimization failed:", err);
  process.exit(1);
});
