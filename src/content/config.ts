import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections — one per pillar/cluster in CLAUDE.md § "Site
 * Architecture (Pillar and Cluster Model)".
 *
 * Collections are loaded from `src/content/<name>/` via Astro's `glob`
 * loader. Empty collections (no .md/.mdx files yet) emit a single
 * "No files found matching …" warning per build until the first
 * entry lands — that is expected scaffolding noise, not a bug.
 *
 * Schema rules:
 *   - `title` and `description` are required on every entry; the
 *     description cap (155 chars) keeps SERP snippets from truncating.
 *   - Any company fact (legal name, MOQ, port, address, NIB, NPWP,
 *     phone, etc.) must be referenced via `{{tokens}}` in the Markdown
 *     body — never typed into frontmatter — per CLAUDE.md § "Things to
 *     Never Do". The `remarkCompanyTokens` plugin in `astro.config.ts`
 *     substitutes them at build time.
 */

// Shared frontmatter fields. Every collection extends this.
const baseSchema = {
  title: z.string().min(1),
  // Meta-description cap: keeps SERP snippets from being truncated and
  // forces authors to write a tight summary rather than a paragraph.
  description: z.string().min(1).max(155),
  // GEO: dateModified is what generative engines use to assess currency.
  datePublished: z.coerce.date().optional(),
  dateModified: z.coerce.date().optional(),
};

/**
 * Legal — privacy policy, terms, cookies policy.
 *
 * Each entry renders via `src/pages/<slug>.astro` using BaseLayout +
 * Breadcrumbs + Prose. `lastUpdated` is required because the WebPage
 * schema on each page uses it as `dateModified`.
 */
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    ...baseSchema,
    lastUpdated: z.coerce.date(),
  }),
});

/**
 * Products — individual SKU detail pages at `/products/{shape}-{size}`.
 *
 * Shape category pages (`/products/cubes`, `/products/hexagonals`, …)
 * and market-cut pages (`/products/shisha-cafee`) are .astro files,
 * not collection entries.
 */
const products = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
  schema: z.object({
    ...baseSchema,
    sku: z.string().min(1),
    shape: z.enum(['cube', 'hexagonal', 'finger', 'dome', 'flat']),
    // Size in millimetres: cubes are "25", hexagonals are "22x50".
    sizeMm: z.string().min(1),
    heroImageAlt: z.string().min(1).optional(),
  }),
});

/**
 * Articles — blog posts at `/blog/{slug}`.
 *
 * GEO: requires `datePublished`, `dateModified`, and the
 * Author / Reviewed-by / Fact-checked-by / Last-updated / Read-time
 * table at the top of every article (CLAUDE.md § GEO Requirements).
 */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    ...baseSchema,
    // Articles overrides: dates are required (not optional).
    datePublished: z.coerce.date(),
    dateModified: z.coerce.date(),
    author: z.string().min(1),
    reviewedBy: z.string().optional(),
    factCheckedBy: z.string().optional(),
    readTimeMinutes: z.number().int().positive(),
    heroImageAlt: z.string().min(1).optional(),
  }),
});

/**
 * Markets — country-specific landing pages at `/markets/{country}`.
 *
 * `countryCode` is ISO 3166-1 alpha-2; `currency` is ISO 4217.
 * Used for hreflang variants and country-specific Schema.org markup.
 */
const markets = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/markets' }),
  schema: z.object({
    ...baseSchema,
    countryName: z.string().min(1),
    countryCode: z.string().length(2),
    currency: z.string().length(3).optional(),
  }),
});

/**
 * Pillar/cluster prose collections.
 *
 * Each is a long-form Markdown body whose pillar landing page is an
 * .astro file under `src/pages/{pillar}/`. `pillarOrder` is an
 * optional integer used to order cluster pages in the pillar's "table
 * of contents" section; absent values sort to the end.
 */
const pillarSchema = z.object({
  ...baseSchema,
  pillarOrder: z.number().int().nonnegative().optional(),
});

const factory = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/factory' }),
  schema: pillarSchema,
});

const logistics = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/logistics' }),
  schema: pillarSchema,
});

const quality = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/quality' }),
  schema: pillarSchema,
});

const packaging = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/packaging' }),
  schema: pillarSchema,
});

const guide = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guide' }),
  schema: pillarSchema,
});

export const collections = {
  legal,
  products,
  articles,
  markets,
  factory,
  logistics,
  quality,
  packaging,
  guide,
};
