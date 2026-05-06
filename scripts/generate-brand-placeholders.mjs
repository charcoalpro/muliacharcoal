/**
 * Brand-placeholder generator.
 *
 * Renders the two binary brand assets that JSON-LD emitters and the
 * og:image fallback reference:
 *   - public/logo.png        512x512 transparent PNG (Organization /
 *                            LocalBusiness schema logo)
 *   - public/og-default.jpg  1200x630 JPG (default social card)
 *
 * Both are flat brand-color compositions intended as placeholders
 * until real brand assets are produced. They are deterministic
 * functions of the values in `src/config/company.ts`, so re-running
 * this script after a brand-color change keeps the binaries in sync.
 *
 * Run:  node scripts/generate-brand-placeholders.mjs
 *
 * Design intent:
 *   logo.png       — Mirrors the inline SVG mark used by
 *                    src/components/layout/Logo.astro: green rounded
 *                    square + gold "M" letterform. Transparent
 *                    background so it overlays cleanly on dark and
 *                    light surfaces in third-party SERP cards.
 *   og-default.jpg — Dark-green canvas, centered mark, brand name,
 *                    tagline. Sized to the exact 1200x630 (1.91:1)
 *                    Facebook / X / LinkedIn social-card spec.
 *
 * Why kept as a script (not deleted after one run):
 *   - Brand colors live in company.ts. If they change, regenerate.
 *   - Placeholders may be re-used in CI to detect drift.
 *   - The script is tiny and self-contained — `sharp` is already a
 *     project dependency for Astro's image pipeline.
 *
 * NOTE: Values below are duplicated from src/config/company.ts
 * because that file is TypeScript and this script runs as plain mjs.
 * Update both places together if brand colors or strings change.
 */

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const publicDir = resolve(projectRoot, 'public');

// ---- Brand tokens (mirror of src/config/company.ts) -------------------
const brand = {
  name: 'Mulia Charcoal',
  tagline: 'Coconut shell charcoal briquettes, factory-direct from Semarang',
  colors: {
    primary: '#0f3d2e',
    accent: '#c9a24b',
    dark: '#0a1f17',
  },
};

// Generic font stack matching the site (CLAUDE.md forbids web fonts).
const fontFamily = `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;

// ---- SVG sources ------------------------------------------------------

/** 512x512 logo: rounded green square with gold M. Transparent BG. */
function logoSvg() {
  const size = 512;
  const radius = 96;
  // Letter M: centered, bold, gold. Sized so the glyph reads at favicon
  // sizes (16-32px) and at 512px.
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="${brand.colors.primary}"/>
  <text
    x="50%" y="50%"
    text-anchor="middle"
    dominant-baseline="central"
    font-family='${fontFamily}'
    font-size="320"
    font-weight="700"
    fill="${brand.colors.accent}"
  >M</text>
</svg>`;
}

/** 1200x630 social card: dark-green canvas, mark, brand name, tagline. */
function ogSvg() {
  const w = 1200;
  const h = 630;
  // Mark sits left-of-center, text block aligned to its right.
  const markSize = 160;
  const markX = 120;
  const markY = (h - markSize) / 2;
  const textX = markX + markSize + 48;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="${brand.colors.dark}"/>
  <!-- accent corner ribbon -->
  <rect x="0" y="${h - 8}" width="${w}" height="8" fill="${brand.colors.accent}"/>
  <!-- mark -->
  <rect x="${markX}" y="${markY}" width="${markSize}" height="${markSize}" rx="32" ry="32" fill="${brand.colors.primary}"/>
  <text
    x="${markX + markSize / 2}" y="${markY + markSize / 2}"
    text-anchor="middle"
    dominant-baseline="central"
    font-family='${fontFamily}'
    font-size="100"
    font-weight="700"
    fill="${brand.colors.accent}"
  >M</text>
  <!-- brand name -->
  <text
    x="${textX}" y="${h / 2 - 24}"
    text-anchor="start"
    dominant-baseline="alphabetic"
    font-family='${fontFamily}'
    font-size="72"
    font-weight="700"
    fill="#ffffff"
  >${brand.name}</text>
  <!-- tagline -->
  <text
    x="${textX}" y="${h / 2 + 36}"
    text-anchor="start"
    dominant-baseline="hanging"
    font-family='${fontFamily}'
    font-size="28"
    font-weight="400"
    fill="${brand.colors.accent}"
  >${brand.tagline}</text>
</svg>`;
}

// ---- Render -----------------------------------------------------------

async function renderPng(svg, outPath) {
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9, palette: false })
    .toFile(outPath);
}

async function renderJpg(svg, outPath) {
  // q=85 matches the per-asset budget in the photo-upload plan.
  // Background is set explicitly because JPG has no alpha channel.
  await sharp(Buffer.from(svg))
    .flatten({ background: brand.colors.dark })
    .jpeg({ quality: 85, progressive: true, mozjpeg: true })
    .toFile(outPath);
}

await mkdir(publicDir, { recursive: true });

const logoPath = resolve(publicDir, 'logo.png');
const ogPath = resolve(publicDir, 'og-default.jpg');

await renderPng(logoSvg(), logoPath);
await renderJpg(ogSvg(), ogPath);

console.log(`✓ Wrote ${logoPath}`);
console.log(`✓ Wrote ${ogPath}`);
