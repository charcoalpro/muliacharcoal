/**
 * URL helpers used by SEO, schema builders, and breadcrumbs.
 *
 * Both helpers prefer `Astro.site` (set in `astro.config.ts`) and fall back to
 * `company.siteUrl` so pure TypeScript modules that don't see `Astro.site`
 * still produce correct absolute URLs at build time.
 *
 * Centralized here because before this module the same trailing-slash strip
 * was re-implemented in seven places with subtly different fallbacks.
 */

import { company } from '~/config/company';

/**
 * Origin (scheme + host, no trailing slash) of the live site.
 *
 * @param astroSite Pass `Astro.site` from `.astro` files. Optional in plain
 *                  TS modules; the fallback is `company.siteUrl`.
 */
export function siteOrigin(astroSite?: URL | string): string {
  const raw = astroSite?.toString() ?? company.siteUrl;
  return raw.replace(/\/+$/, '');
}

/**
 * Absolute URL for a site path. Pass-through for `http(s)://` URLs.
 *
 * @example
 *   absoluteUrl('/contact')                  // → '<siteUrl>/contact'
 *   absoluteUrl('/contact', Astro.site)      // → same, using build-time origin
 *   absoluteUrl('https://example.com/x')     // → 'https://example.com/x' (unchanged)
 */
export function absoluteUrl(path: string, astroSite?: URL | string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const origin = siteOrigin(astroSite);
  if (path === '' || path === '/') return origin;
  const normalized = '/' + path.replace(/^\/+/, '').replace(/\/+$/, '');
  return `${origin}${normalized}`;
}
