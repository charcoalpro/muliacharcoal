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
    title: z.string(),
    description: z.string(),
    lastUpdated: z.coerce.date(),
    datePublished: z.coerce.date().optional(),
  }),
});

/**
 * Products collection — one entry per SKU.
 *
 * URL: /products/{shape}-{size} (per CLAUDE.md). The slug is the file name;
 * `shape` and `size` are repeated in front-matter so they're queryable
 * without parsing the slug.
 *
 * Per-language entries live under `<base>/{lang}/<slug>.md`, e.g.
 * `src/content/products/en/cube-25mm.md`. Future languages add sibling
 * folders. The page template selects the entry by language + slug.
 *
 * Numeric specs default to optional so a product can be listed before
 * lab data is finalized.
 */
const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    shape: z.enum(['cube', 'hexagonal', 'finger', 'dome', 'flat']),
    /** Size token used in the slug, e.g. "25mm" or "22x50". */
    size: z.string(),
    /** Stock-keeping unit identifier, distinct from the slug. */
    sku: z.string(),
    /** Per-piece weight in grams. */
    weightGrams: z.number().optional(),
    /** Burn time in minutes (avg of lab tests). */
    burnTimeMinutes: z.number().optional(),
    /** Ash content as percent of dry weight. */
    ashContentPercent: z.number().optional(),
    /** Pieces per kilogram (derived but useful as cached value). */
    piecesPerKg: z.number().optional(),
    /** Featured image — path under /src/assets/. */
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
 * URL: /blog/{slug}. Each entry must declare datePublished and dateModified
 * for Article schema and GEO date-stamping.
 */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    /** Optional credentials shown next to the byline (e.g. "Quality Lead"). */
    authorRole: z.string().optional(),
    datePublished: z.coerce.date(),
    dateModified: z.coerce.date(),
    /** Featured image path under /src/assets/. */
    image: z.string().optional(),
    /** Free-form tags for related-article surfaces. */
    tags: z.array(z.string()).default([]),
    /** Pillars this article links up to — e.g. ['products','logistics']. */
    pillars: z.array(z.string()).default([]),
    /** Reading time in minutes (set by build script or authored). */
    readingTimeMinutes: z.number().optional(),
  }),
});

export const collections = { legal, products, articles };
