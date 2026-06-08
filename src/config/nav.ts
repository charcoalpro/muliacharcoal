/**
 * Navigation structure — single source of truth for what appears in the
 * Header, Footer, and (eventually) the sitemap UI.
 *
 * Before this module existed, Header.astro and Footer.astro each held
 * their own hardcoded nav arrays. Adding a new pillar page meant editing
 * two components in lockstep and remembering which links pointed at
 * pages that didn't exist yet. Centralizing here means a new page lands
 * in one place, and the `live` flag tells callers whether to render a
 * link to a destination that exists today.
 *
 * Edit `LIVE_ROUTES` below as new pages ship. Footer renders only `live`
 * links; Header does the same so the primary nav never points at 404s.
 * Restoring an IA-telegraph behavior (showing not-yet-built links so
 * users see the planned structure) is a one-line change at the call site.
 */

import en from '~/i18n/en';
import { publishedProductRoutes } from '~/config/productRoutes';

export interface NavItem {
  href: string;
  label: string;
  /** True if the destination page exists today. False = renders a 404. */
  live: boolean;
}

/**
 * Routes that currently resolve to a real page on the production build.
 * Update this set when a new page ships; nav arrays below derive their
 * `live` flag from it, so updating one line silently lights up the link
 * everywhere it appears.
 *
 * The legal slugs (`/legal/privacy-policy`, …) reflect that those pages
 * are served by `src/pages/legal/[slug].astro` from the `legal` content
 * collection.
 *
 * `/llm.txt` is a static file in /public/ — it counts as live.
 */
export const LIVE_ROUTES: ReadonlySet<string> = new Set([
  '/',
  '/about',
  '/careers',
  '/contact',
  '/faq',
  '/glossary',
  '/products',
  '/legal/privacy-policy',
  '/legal/terms',
  '/legal/cookies',
  '/llm.txt',
  // Product child routes (grade SKU + shape-category + market pages) for the
  // currently published set. Computed so a phase rollout in
  // ~/config/productRoutes.ts lights up every link in one edit.
  ...publishedProductRoutes(),
]);

/**
 * Does `href` resolve to a real page today? Strips any `#hash`/`?query` and a
 * trailing slash before testing against `LIVE_ROUTES`. Used by `<MaybeLink>`
 * to render a real link only for live destinations and degrade not-yet-built
 * targets to plain text — so cross/down links on pillar pages never 404 and
 * self-light as each route is added to `LIVE_ROUTES` above.
 */
export function isLive(href: string): boolean {
  const path = href.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  return LIVE_ROUTES.has(path);
}

const make = (href: string, label: string): NavItem => ({
  href,
  label,
  live: LIVE_ROUTES.has(href),
});

/** Primary navigation in the Header. */
export const headerNav: readonly NavItem[] = [
  make('/about', en.nav.about),
  make('/contact', en.nav.contact),
  make('/products', en.nav.products),
];

/** Footer "Company" column. */
export const footerCompanyNav: readonly NavItem[] = [
  make('/about', en.footer.links.about),
  make('/contact', en.footer.links.contact),
  make('/faq', en.footer.links.faq),
  make('/glossary', en.footer.links.glossary),
  make('/careers', en.footer.links.careers),
];

/** Footer "Products & operations" column. */
export const footerOperationsNav: readonly NavItem[] = [
  make('/products', en.footer.links.products),
  make('/logistics', en.footer.links.logistics),
  make('/samples', en.footer.links.samples),
  make('/quality', en.footer.links.quality),
  make('/quality/certifications', en.footer.links.certificates),
];

/** Footer legal row. */
export const footerLegalNav: readonly NavItem[] = [
  make('/legal/privacy-policy', en.footer.legal.privacy),
  make('/legal/terms', en.footer.legal.terms),
  make('/legal/cookies', en.footer.legal.cookies),
];
