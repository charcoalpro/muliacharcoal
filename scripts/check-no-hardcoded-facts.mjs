#!/usr/bin/env node
/**
 * check-no-hardcoded-facts — fail when a known company fact appears in any
 * source file other than `src/config/company.ts`.
 *
 * Per CLAUDE.md § "Things to Never Do": every piece of factual data about
 * the company lives in `/src/config/company.ts` and only there. Components,
 * pages, JSON-LD emitters, i18n JSON files, MDX bodies, tests, and scripts
 * must import from that module.
 *
 * Run via `npm run check:facts` (or `npm run check`).
 *
 * The script also reports any `TODO_PLACEHOLDER_*` markers found outside
 * `company.ts` — those mean a placeholder leaked into a publicly-rendered
 * surface, which is a launch blocker (see audit Finding 12).
 *
 * Plain ESM `.mjs` so it runs on stock Node ≥ 18 with no extra deps.
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const ALLOWED_FILE = join('src', 'config', 'company.ts');

// Directories ignored entirely.
const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  '.astro',
  'dist',
  '.claude',
  '.vscode',
  '.idea',
]);

// File extensions scanned for hardcoded facts.
const SCANNED_EXTS = ['.astro', '.ts', '.tsx', '.js', '.mjs', '.json', '.md', '.mdx'];

/**
 * Hand-curated list of high-signal company facts that must NOT appear
 * literally anywhere outside `company.ts`. Keep this list short and
 * unambiguous — generic words ("Indonesia", "WhatsApp") would generate
 * false positives. When a new identifying value lands in `company.ts`,
 * add it here.
 */
const FACTS = [
  // Identity
  'PT Coco Reina Global Charcoal Indonesia',
  'Mulia Charcoal',
  // Domain / web presence
  'muliacharcoal.com',
  'export@muliacharcoal.com',
  // Phone numbers (all forms)
  '+6282128768545',
  '6282128768545',
  '+62 821 287 68 545',
  // Registration
  '0220001680488',
  '94.608.951.3-524.000',
  // Address (city is high-signal in this project)
  'Semarang',
  // Owner / director
  'Wilson Gosalim',
  'Henry Gosalim',
  'Gatot Wibowo',
  'Greg Ryabtsev',
  // Analytics
  'G-CLNNLB616W',
  'fKfTQ-h0XVRjQNoEERZWqchNnUs_6H48amhkgsDPGBA',
  // Google Maps
  'maps.app.goo.gl/SAcfhq4ypCud6HqQA',
];

const TODO_RE = /TODO_PLACEHOLDER[_A-Z0-9]*/g;

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (IGNORED_DIRS.has(e.name)) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      yield* walk(full);
    } else if (e.isFile()) {
      yield full;
    }
  }
}

function lineOf(content, index) {
  // Convert byte index → 1-based line number.
  let line = 1;
  for (let i = 0; i < index; i++) {
    if (content.charCodeAt(i) === 10) line++;
  }
  return line;
}

async function main() {
  const factHits = [];
  const todoHits = [];

  for await (const file of walk(ROOT)) {
    const rel = relative(ROOT, file).split(sep).join('/');
    // Skip the script itself, the lockfile, and the canonical company file.
    if (rel === 'scripts/check-no-hardcoded-facts.mjs') continue;
    if (rel === 'package-lock.json') continue;
    if (rel === ALLOWED_FILE.split(sep).join('/')) continue;
    // Skip root-level project docs (CLAUDE.md, README.md, DESIGN.md, etc.) —
    // these describe the project and may legitimately reference company facts.
    if (!rel.includes('/') && rel.endsWith('.md')) continue;

    if (!SCANNED_EXTS.some((ext) => rel.endsWith(ext))) continue;

    let content;
    try {
      content = await readFile(file, 'utf8');
    } catch {
      continue;
    }

    for (const fact of FACTS) {
      let from = 0;
      while (true) {
        const idx = content.indexOf(fact, from);
        if (idx < 0) break;
        factHits.push({ file: rel, line: lineOf(content, idx), fact });
        from = idx + fact.length;
      }
    }

    for (const m of content.matchAll(TODO_RE)) {
      todoHits.push({ file: rel, line: lineOf(content, m.index ?? 0), marker: m[0] });
    }
  }

  let failed = false;

  if (factHits.length) {
    failed = true;
    console.error('\n✖ Hardcoded company facts found outside src/config/company.ts:\n');
    for (const h of factHits) {
      console.error(`  ${h.file}:${h.line}  →  ${JSON.stringify(h.fact)}`);
    }
    console.error(
      '\n  Per CLAUDE.md § "Things to Never Do", every company fact must live in',
    );
    console.error(
      '  src/config/company.ts. Replace literal values with imports or {{tokens}}.',
    );
  }

  if (todoHits.length) {
    failed = true;
    console.error('\n✖ TODO_PLACEHOLDER markers found outside src/config/company.ts:\n');
    for (const h of todoHits) {
      console.error(`  ${h.file}:${h.line}  →  ${h.marker}`);
    }
    console.error(
      '\n  Placeholders may only live in src/config/company.ts (the canonical',
    );
    console.error(
      '  source) until they are filled in. Replace these before shipping.',
    );
  }

  if (failed) {
    console.error(`\nFailed: ${factHits.length} fact leak(s), ${todoHits.length} placeholder leak(s).\n`);
    process.exit(1);
  }

  console.log('✓ No hardcoded company facts or stray TODO_PLACEHOLDER markers found.');
}

main().catch((err) => {
  console.error('check-no-hardcoded-facts crashed:', err);
  process.exit(2);
});
