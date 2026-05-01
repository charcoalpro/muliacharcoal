/**
 * Site navigation — single source of truth for the link sets rendered
 * by the Header and Footer.
 *
 * Each entry maps an internal path to an i18n key under
 * `en.nav.*` / `en.footer.links.*`. Layout components resolve the
 * label at render time so updating site nav is a one-file change and
 * translations slot in by adding the key to the relevant locale JSON.
 *
 * Note on policy: this is *site structure*, not company facts (which
 * live in `~/config/company`). The split keeps `company.ts` focused on
 * commercial / legal data and lets nav grow independently of it.
 */

import en from '~/i18n/en.json';

export interface NavItem {
  href: string;
  label: string;
}

/**
 * Primary header navigation. "Price" routes to `/products` per the
 * product-pricing decision (a dedicated `/pricing` page may land
 * later — see TODO in `Header.astro`).
 */
export const headerLinks: NavItem[] = [
  { href: '/about',    label: en.nav.about },
  { href: '/contact',  label: en.nav.contact },
  { href: '/products', label: en.nav.price },
];

/**
 * Footer "Company" column.
 *
 * `/jobs` and `/glossary` do not yet exist — they are intentional
 * placeholders to be created before launch (see TODO in `Footer.astro`).
 */
export const footerCompanyLinks: NavItem[] = [
  { href: '/about',    label: en.footer.links.about },
  { href: '/contact',  label: en.footer.links.contact },
  { href: '/glossary', label: en.footer.links.glossary },
  { href: '/jobs',     label: en.footer.links.jobs },
];

/**
 * Footer "Products & operations" column.
 */
export const footerOperationsLinks: NavItem[] = [
  { href: '/products',                label: en.footer.links.products },
  { href: '/logistics',               label: en.footer.links.logistics },
  { href: '/samples',                 label: en.footer.links.samples },
  { href: '/quality',                 label: en.footer.links.quality },
  { href: '/quality/certifications',  label: en.footer.links.certificates },
];
