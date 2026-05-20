/**
 * URL helpers — shared across SEO, schema builders, and pages.
 *
 * Every function here is pure. `siteOrigin()` reads from Astro.site (set in
 * astro.config.mjs); pass the URL in rather than reading it globally so this
 * stays unit-testable.
 */

const FALLBACK_ORIGIN = 'https://muliacharcoal.com';

export function siteOrigin(astroSite?: URL | string | null): string {
  const raw = typeof astroSite === 'string' ? astroSite : astroSite?.toString();
  return (raw ?? FALLBACK_ORIGIN).replace(/\/$/, '');
}

export function normalizePath(path: string): string {
  if (path === '/' || path === '') return '';
  return '/' + path.replace(/^\/+/, '').replace(/\/+$/, '');
}

export function canonicalUrl(origin: string, path: string): string {
  return `${origin}${normalizePath(path)}` || origin;
}

export function absoluteUrl(origin: string, href: string | undefined): string | undefined {
  if (!href) return undefined;
  if (href.startsWith('http')) return href;
  return `${origin}${href}`;
}

export function whatsappHref(phoneE164: string, message: string): string {
  const digits = phoneE164.replace(/[^\d]/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function telHref(phoneDisplay: string): string {
  return 'tel:' + phoneDisplay.replace(/[^\d+]/g, '');
}

export function mailtoHref(email: string): string {
  return 'mailto:' + email;
}
