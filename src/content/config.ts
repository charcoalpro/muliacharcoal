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

export const collections = { legal };
