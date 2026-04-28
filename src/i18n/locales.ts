/**
 * Active site locales — single source of truth for which languages have
 * shipped translations and what their URL prefixes are.
 *
 * `<SEO>` reads this list to emit one `<link rel="alternate" hreflang="…">`
 * tag per locale plus the `x-default` pointer.
 *
 * To launch a new language (per the priority-markets list in CLAUDE.md):
 *   1. Add a `src/i18n/<code>.json` mirror of `en.json`.
 *   2. Append a `Locale` entry below.
 *   3. Set `dir: 'rtl'` for Arabic / Hebrew / Persian / Urdu.
 *   4. Build per-language pages under `src/pages/<code>/…`.
 *
 * Removing a locale removes its hreflang tag automatically.
 */

export interface Locale {
  /** BCP 47 code emitted in `hreflang` and `<html lang>`. */
  code: string;
  /** URL prefix; the default locale uses `''` so paths stay at the root. */
  prefix: string;
  /** Open Graph / OG locale, used by `<meta property="og:locale">`. */
  ogLocale: string;
  /** Document direction for RTL scripts. */
  dir?: 'ltr' | 'rtl';
}

/**
 * Locales with shipped translations. English is the default. Add languages
 * here as their `src/i18n/<code>.json` files land.
 */
export const locales: readonly Locale[] = [
  { code: 'en', prefix: '', ogLocale: 'en_US', dir: 'ltr' },
] as const;

/** First entry is the canonical default — used for `x-default`. */
export const defaultLocale: Locale = locales[0];

/**
 * Strip the active-locale prefix from a path so the remaining path can be
 * recombined with each locale's prefix to produce alternate URLs.
 */
export function stripLocalePrefix(path: string): string {
  for (const l of locales) {
    if (!l.prefix) continue;
    const p = `/${l.prefix.replace(/^\/+|\/+$/g, '')}`;
    if (path === p) return '/';
    if (path.startsWith(`${p}/`)) return path.slice(p.length);
  }
  return path;
}

/** Build a locale-prefixed path. `prefix === ''` (default) returns the input. */
export function withLocalePrefix(path: string, locale: Locale): string {
  if (!locale.prefix) return path;
  const p = `/${locale.prefix.replace(/^\/+|\/+$/g, '')}`;
  if (path === '/') return p;
  return `${p}${path.startsWith('/') ? '' : '/'}${path}`;
}
