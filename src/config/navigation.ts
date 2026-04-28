/**
 * Navigation — single source of truth for header + footer link sets.
 *
 * Today only a handful of routes have shipped. Linking to a not-yet-built
 * page from the global chrome would 404 the user; instead, every nav array
 * passes through `pickLive()` which drops entries whose `href` isn't in
 * `liveRoutes`.
 *
 * To expose a new page in the nav, ship the page first, then append its
 * path here:
 *
 *   1. Add the route to `liveRoutes`. The nav picks it up automatically.
 *   2. (Optional) Move the entry within `headerLinks` / `footerCompanyLinks`
 *      / `footerOperationsLinks` if a different visible order is wanted.
 *
 * Labels live in `src/i18n/<locale>.json` (`en.nav.*`, `en.footer.links.*`),
 * so translations don't have to rebuild this file.
 */

import en from '~/i18n/en.json';

export interface NavLink {
  href: string;
  label: string;
}

/**
 * Routes that have a real, buildable page today. Keep this list in sync with
 * `src/pages/**`. Dynamic routes (e.g. future `/products/[slug]`) belong
 * here too — list the parent path, not the per-slug ones.
 *
 * `/dev/components` and the legal-trio routes are intentionally omitted —
 * legal lives in the footer's dedicated legal block, not the nav arrays.
 */
export const liveRoutes: ReadonlySet<string> = new Set([
  '/',
  '/contact',
]);

/** Header (top nav). Order = visible order. */
export const headerLinks: readonly NavLink[] = [
  { href: '/about', label: en.nav.about },
  { href: '/contact', label: en.nav.contact },
  // "Price" routes to /products until a dedicated /pricing page exists.
  { href: '/products', label: en.nav.price },
];

/** Footer — Company column. */
export const footerCompanyLinks: readonly NavLink[] = [
  { href: '/about', label: en.footer.links.about },
  { href: '/contact', label: en.footer.links.contact },
  { href: '/glossary', label: en.footer.links.glossary },
  { href: '/jobs', label: en.footer.links.jobs },
];

/** Footer — Products & operations column. */
export const footerOperationsLinks: readonly NavLink[] = [
  { href: '/products', label: en.footer.links.products },
  { href: '/logistics', label: en.footer.links.logistics },
  { href: '/samples', label: en.footer.links.samples },
  { href: '/quality', label: en.footer.links.quality },
  { href: '/quality/certifications', label: en.footer.links.certificates },
];

/**
 * Filter a link array down to the entries whose `href` is in `liveRoutes`.
 * Returns a regular `NavLink[]` (callers `.map()` over the result).
 */
export function pickLive(links: readonly NavLink[]): NavLink[] {
  return links.filter((l) => liveRoutes.has(l.href));
}
