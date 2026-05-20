/**
 * Navigation structure — single source of truth for what appears in the
 * Header, Footer, and (eventually) sitemap UI.
 *
 * Per audit finding #4: nav links were hardcoded in Header.astro and
 * Footer.astro. Centralizing here means a new pillar page lands in one
 * place, not two.
 *
 * Each item carries `labelKey` (a typed dot-path into src/i18n/<lang>.json)
 * and `live` (whether the destination page exists yet). Consumers can
 * filter by `live` to suppress 404s; currently we keep IA-anchor links
 * visible even if non-live so the navigation telegraphs the planned
 * structure, and only suppress footer-secondary links to avoid known-dead
 * clicks.
 */

import { t, type StringKey } from '~/i18n';

export interface NavItem {
  href: string;
  labelKey: StringKey;
  /** True if the destination page exists. Used by callers to filter. */
  live: boolean;
}

/**
 * Pages that currently exist on the site. Edit this set when a new page
 * is shipped; the nav arrays below derive their `live` flag from it.
 */
export const LIVE_ROUTES: ReadonlySet<string> = new Set([
  '/',
  '/privacy-policy',
]);

const make = (href: string, labelKey: StringKey): NavItem => ({
  href,
  labelKey,
  live: LIVE_ROUTES.has(href),
});

/** Primary navigation in the header. Always rendered (IA telegraph). */
export const headerNav: readonly NavItem[] = [
  make('/about', 'nav.about'),
  make('/contact', 'nav.contact'),
  make('/products', 'nav.price'),
];

/** Footer "Company" column. */
export const footerCompanyNav: readonly NavItem[] = [
  make('/about', 'footer.links.about'),
  make('/contact', 'footer.links.contact'),
  make('/glossary', 'footer.links.glossary'),
  make('/jobs', 'footer.links.jobs'),
];

/** Footer "Products & operations" column. */
export const footerOperationsNav: readonly NavItem[] = [
  make('/products', 'footer.links.products'),
  make('/logistics', 'footer.links.logistics'),
  make('/samples', 'footer.links.samples'),
  make('/quality', 'footer.links.quality'),
  make('/quality/certifications', 'footer.links.certificates'),
];

/** Footer legal row. Non-live entries are hidden to avoid 404 clicks. */
export const footerLegalNav: readonly NavItem[] = [
  make('/privacy-policy', 'footer.legal.privacy'),
  make('/terms', 'footer.legal.terms'),
  make('/cookies', 'footer.legal.cookies'),
];

/** Resolve a nav item label for the given language. */
export function resolveLabel(labelKey: StringKey, lang?: string): string {
  return t(labelKey, lang);
}
