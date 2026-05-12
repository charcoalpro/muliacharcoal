import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content collections — the pillar/cluster site model.
 *
 * Per CLAUDE.md, the site is structured around seven SEO pillars:
 * products, factory, logistics, quality, guide, markets, packaging.
 * Each pillar owns a folder under `src/content/<pillar>/<lang>/` and
 * a zod schema below that enforces the front-matter every cluster
 * page must supply.
 *
 * Routes that render a collection live under `src/pages/<pillar>/`.
 * The `legal` collection (privacy / terms / cookies) is structural,
 * not a pillar.
 *
 * Adding a translation = drop `xx.md` files alongside the English
 * source. The glob loader picks them up automatically.
 */

// =======================================================================
// Shared schema helpers
// =======================================================================

/**
 * Fields every pillar entry needs for SEO + GEO + AI citation.
 *
 * `datePublished` / `dateModified` drive `dateModified` in Article/Product
 * JSON-LD (CLAUDE.md GEO requirement). `keywords` is comma-separated,
 * `description` is meta-description capped to 155 chars so SERP snippets
 * don't truncate.
 */
const baseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).max(155),
  keywords: z.array(z.string()).optional(),
  datePublished: z.coerce.date(),
  dateModified: z.coerce.date().optional(),
  author: z.string().optional(),
  /** Hide a draft from `getStaticPaths` without deleting the file. */
  draft: z.boolean().optional().default(false),
});

// =======================================================================
// Pillar collections
// =======================================================================

/**
 * Products — individual SKU pages and shape/market category pages.
 *
 * Slug convention: `{shape}-{size}` (cube-25mm, hexagonal-22x50, ...).
 * Dimensions/weight/packaging carry the structured data that feeds
 * Product JSON-LD and the comparison tables on shape category pages.
 */
const products = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
  schema: baseSchema.extend({
    shape: z.enum(['cube', 'hexagonal', 'finger', 'dome', 'flat']),
    /** Human-readable size label, e.g. "25mm", "22x50mm". */
    size: z.string().min(1),
    dimensionsMm: z.object({
      length: z.number().positive().optional(),
      width: z.number().positive().optional(),
      height: z.number().positive().optional(),
      diameter: z.number().positive().optional(),
    }).optional(),
    /** Single briquette mass in grams. */
    massGramsPerPiece: z.number().positive().optional(),
    /** Burn time in minutes at typical hookah temperature. */
    burnTimeMinutes: z.number().positive().optional(),
    ashContentPercent: z.number().min(0).max(100).optional(),
    moistureContentPercent: z.number().min(0).max(100).optional(),
    calorificValueKcalKg: z.number().positive().optional(),
    packaging: z.object({
      piecesPerInnerBox: z.number().positive().optional(),
      innerBoxesPerMasterBox: z.number().positive().optional(),
      masterBoxesPer20ftContainer: z.number().positive().optional(),
    }).optional(),
    heroImage: z.string().optional(),
  }),
});

/**
 * Factory cluster — production-process, capacity, virtual-tour, raw-materials.
 */
const factory = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/factory' }),
  schema: baseSchema,
});

/**
 * Logistics cluster — rules, documents, import-to-{country}, UN-1361.
 */
const logistics = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/logistics' }),
  schema: baseSchema.extend({
    /** ISO 3166-1 alpha-2 country code for import-to-{country} pages. */
    destinationCountry: z.string().length(2).optional(),
  }),
});

/**
 * Quality cluster — certifications, testing-methods, specifications-explained.
 */
const quality = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/quality' }),
  schema: baseSchema,
});

/**
 * Buyer's Guide pillar — cornerstone SEO content. Articles require an
 * author byline + reviewer + factCheckedBy + readTime per CLAUDE.md GEO rules.
 */
const guide = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guide' }),
  schema: baseSchema.extend({
    reviewedBy: z.string().optional(),
    factCheckedBy: z.string().optional(),
    /** Estimated reading time in minutes (shown in the article header table). */
    readTimeMinutes: z.number().positive().optional(),
  }),
});

/**
 * Markets cluster — country-specific landing pages.
 */
const markets = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/markets' }),
  schema: baseSchema.extend({
    /** ISO 3166-1 alpha-2 country code (US, GB, SA, DE, RU, ...). */
    countryCode: z.string().length(2),
    /** Display name shown in the H1 + breadcrumbs. */
    countryName: z.string().min(1),
  }),
});

/**
 * Packaging cluster — master-box, inner-box, plastic, white-label, etc.
 */
const packaging = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/packaging' }),
  schema: baseSchema,
});

// =======================================================================
// Structural collections
// =======================================================================

/**
 * Legal — privacy-policy, terms, cookies. Not part of the pillar model.
 */
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).max(155),
    lastUpdated: z.coerce.date(),
    datePublished: z.coerce.date().optional(),
  }),
});

export const collections = {
  products,
  factory,
  logistics,
  quality,
  guide,
  markets,
  packaging,
  legal,
};
