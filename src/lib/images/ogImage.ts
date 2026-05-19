/**
 * og:image resolver.
 *
 * Returns the absolute URL the SEO component should emit for both
 * `og:image` and `twitter:image`. Accepts either an Astro processed-
 * asset object (`ImageMetadata` from `astro:assets`, which carries a
 * hashed `src` like `/_astro/cube-25mm.aB1c.jpg`) or a string path
 * (relative or absolute). Falls back to the site-wide brand default
 * declared in `company.brandAssets.images.ogDefault` so every page
 * ships a non-empty social card without per-page bookkeeping.
 *
 * Why a single helper:
 *   - Locks one URL-construction algorithm (origin + path) against
 *     drift between SEO.astro, JSON-LD emitters, and the sitemap
 *     image extension.
 *   - Keeps the `image` prop on layouts permissive — a page can pass
 *     an Astro import for processed images, OR a public-folder
 *     string for stable schema/social URLs, OR nothing at all.
 *
 * Origin resolution is delegated to `~/lib/url::siteOrigin` so this
 * helper shares the same `Astro.site` → `company.siteUrl` fallback
 * chain as `absoluteUrl()` and every JSON-LD builder.
 */

import type { ImageMetadata } from 'astro';
import { company } from '~/config/company';
import { siteOrigin } from '~/lib/url';

export type OgImageInput = ImageMetadata | string | null | undefined;

/**
 * Resolve an og:image URL.
 *
 * @param input     Page-supplied image. Pass an `import heroImg from
 *                  '~/assets/images/...'` for processed assets, or a
 *                  `/og/...jpg` string for stable public-folder URLs.
 *                  `null`/`undefined`/empty triggers the brand default.
 * @param astroSite Pass `Astro.site` from `.astro` files. Optional in
 *                  pure-TS callers; falls back to `company.siteUrl`.
 * @returns         Absolute URL suitable for og:image / twitter:image.
 *                  Always non-null — when no input is given, returns
 *                  the brand `ogDefault` URL so crawlers can index
 *                  the moment that file lands in `/public/`.
 */
export function resolveOgImage(input: OgImageInput, astroSite?: URL | string): string {
  const base = siteOrigin(astroSite);
  const fallbackPath = company.brandAssets.images.ogDefault;

  if (!input) {
    return `${base}${fallbackPath}`;
  }

  if (typeof input === 'string') {
    if (input.startsWith('http://') || input.startsWith('https://')) return input;
    const path = input.startsWith('/') ? input : `/${input}`;
    return `${base}${path}`;
  }

  // ImageMetadata.src is the public URL Astro emits after Sharp
  // processing — already starts with `/_astro/...`.
  return `${base}${input.src}`;
}
