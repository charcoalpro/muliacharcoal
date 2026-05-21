import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Legal collection — privacy policy, terms, cookies policy.
 *
 * Each entry renders via `src/pages/<slug>.astro` using BaseLayout +
 * Breadcrumbs + Prose. Schema enforces the front-matter fields the
 * page template reads, so a missing `lastUpdated` fails the build
 * rather than rendering an empty date.
 */
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string().min(1),
    // Meta-description cap: keeps SERP snippets from being truncated and
    // forces authors to write a tight summary rather than a paragraph.
    description: z.string().min(1).max(155),
    lastUpdated: z.coerce.date(),
    datePublished: z.coerce.date().optional(),
  }),
});

/**
 * Products collection — one entry per SKU.
 *
 * URL: /products/{shape}-{size} (per CLAUDE.md). The slug is the file
 * name; `shape` and `size` are repeated in front-matter so they're
 * queryable without parsing the slug.
 *
 * Per-locale entries live under `<base>/{locale}/<slug>.md`, e.g.
 * `src/content/products/en/cube-25mm.md`. Future locales add sibling
 * folders.
 *
 * Numeric specs default to optional so a product can be listed before
 * lab data is finalized.
 */
const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).max(155),
    shape: z.enum(['cube', 'hexagonal', 'finger', 'dome', 'flat']),
    /** Size token used in the slug, e.g. "25mm" or "22x50". */
    size: z.string().min(1),
    /** Stock-keeping unit identifier, distinct from the slug. */
    sku: z.string().min(1),
    /** Per-piece weight in grams. */
    weightGrams: z.number().positive().optional(),
    /** Burn time in minutes (average of lab tests). */
    burnTimeMinutes: z.number().positive().optional(),
    /** Ash content as percent of dry weight. */
    ashContentPercent: z.number().min(0).max(100).optional(),
    /** Pieces per kilogram (cached derived value). */
    piecesPerKg: z.number().positive().optional(),
    /** Featured image path — resolved by Astro's <Image /> at build. */
    featuredImage: z.string().optional(),
    /** Additional images for the gallery. */
    gallery: z.array(z.string()).default([]),
    /** Linked certifications (slugs into /quality/certifications). */
    certifications: z.array(z.string()).default([]),
    datePublished: z.coerce.date(),
    dateModified: z.coerce.date(),
  }),
});

/**
 * Articles collection — blog posts.
 *
 * URL: /blog/{slug}. Each entry must declare datePublished and
 * dateModified for Article schema and GEO date-stamping.
 */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).max(155),
    author: z.string().min(1),
    /** Optional credentials shown next to the byline (e.g. "Quality Lead"). */
    authorRole: z.string().optional(),
    datePublished: z.coerce.date(),
    dateModified: z.coerce.date(),
    /** Featured image path — resolved by Astro's <Image /> at build. */
    image: z.string().optional(),
    /** Free-form tags for related-article surfaces. */
    tags: z.array(z.string()).default([]),
    /** Pillars this article links up to — e.g. ['products','logistics']. */
    pillars: z.array(z.string()).default([]),
    /** Reading time in minutes (set by build script or authored). */
    readingTimeMinutes: z.number().positive().optional(),
  }),
});

export const collections = { legal, products, articles };
