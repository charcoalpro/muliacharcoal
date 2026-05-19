/**
 * i18n locale config — single source of truth for which languages
 * the site emits hreflang tags for and how each locale maps to OG.
 *
 * `LOCALES` lists every locale we plan to support. `ACTIVE_LOCALES`
 * lists the ones that have actual translated routes today; only those
 * are emitted as `<link rel="alternate">` to avoid pointing search
 * engines at 404s. To bring a new locale online: add a translated
 * `src/i18n/<code>.json`, ship the routes under `/<code>/...`, and
 * append the code to `ACTIVE_LOCALES`.
 */

export const LOCALES = [
  'en',
  'ar',
  'he',
  'de',
  'tr',
  'es',
  'pt',
  'zh-Hans',
  'ja',
  'ru',
] as const;

export type Locale = (typeof LOCALES)[number];

/** Locales with shipped translated routes. Hreflang only emits these. */
export const ACTIVE_LOCALES: ReadonlyArray<Locale> = ['en'];

export const DEFAULT_LOCALE: Locale = 'en';

/** OG `og:locale` value per locale, in the BCP-style POSIX form Facebook expects. */
export const localeOgMap: Record<Locale, string> = {
  en: 'en_US',
  // Saudi Arabia is the priority Arabic-speaking buyer market (see CLAUDE.md).
  // Facebook does not accept `ar_AR`; pick the regional variant.
  ar: 'ar_SA',
  he: 'he_IL',
  de: 'de_DE',
  tr: 'tr_TR',
  es: 'es_ES',
  pt: 'pt_PT',
  'zh-Hans': 'zh_CN',
  ja: 'ja_JP',
  ru: 'ru_RU',
};

/** RTL locales. */
const RTL_LOCALES: ReadonlySet<Locale> = new Set<Locale>(['ar', 'he']);

/** Reading direction for a locale. */
export function localeDir(locale: Locale): 'ltr' | 'rtl' {
  return RTL_LOCALES.has(locale) ? 'rtl' : 'ltr';
}

/**
 * Build the URL path for a given locale. English lives at the root
 * (`/about`); other locales are URL-prefixed (`/de/about`).
 */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  if (clean === '/') return `/${locale}`;
  return `/${locale}${clean}`;
}
