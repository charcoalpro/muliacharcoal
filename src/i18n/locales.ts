/**
 * Locale registry — single source of truth for every supported language.
 *
 * Drives the i18n loader (`getLocale()`), the hreflang emitter in SEO.astro,
 * the language switcher (when added), and the sitemap config. Adding a new
 * locale is a one-place change: drop a `xx.json` translation file alongside
 * `en.json`, register it here with `active: true`, and every consumer
 * automatically picks it up on the next build.
 *
 * URL convention:
 *   - English (default) lives at the root: `/about`, `/contact`.
 *   - Every other locale is URL-prefixed: `/de/about`, `/ar/contact`, etc.
 */

export type LocaleCode =
  | 'en'
  | 'ar'
  | 'he'
  | 'de'
  | 'tr'
  | 'es'
  | 'pt'
  | 'zh'
  | 'ja'
  | 'ru';

export interface LocaleMeta {
  code: LocaleCode;
  /** Native name shown in the language switcher. */
  name: string;
  /** BCP-47 tag used for `hreflang` and `<html lang>`. */
  bcp47: string;
  /** Open Graph locale tag, e.g. `en_US`. */
  ogLocale: string;
  dir: 'ltr' | 'rtl';
  /** URL prefix segment. `''` for default (English at root); `de` etc. otherwise. */
  urlPrefix: string;
  /** Whether this locale is shipped. Adding translations = flip to `true`. */
  active: boolean;
}

/**
 * Every locale the site is intended to support. Only `active: true` entries
 * generate routes, hreflang links, and sitemap entries.
 */
export const LOCALES: Record<LocaleCode, LocaleMeta> = {
  en: { code: 'en', name: 'English',    bcp47: 'en',    ogLocale: 'en_US', dir: 'ltr', urlPrefix: '',   active: true  },
  ar: { code: 'ar', name: 'العربية',    bcp47: 'ar',    ogLocale: 'ar_SA', dir: 'rtl', urlPrefix: 'ar', active: false },
  he: { code: 'he', name: 'עברית',      bcp47: 'he',    ogLocale: 'he_IL', dir: 'rtl', urlPrefix: 'he', active: false },
  de: { code: 'de', name: 'Deutsch',    bcp47: 'de',    ogLocale: 'de_DE', dir: 'ltr', urlPrefix: 'de', active: false },
  tr: { code: 'tr', name: 'Türkçe',     bcp47: 'tr',    ogLocale: 'tr_TR', dir: 'ltr', urlPrefix: 'tr', active: false },
  es: { code: 'es', name: 'Español',    bcp47: 'es',    ogLocale: 'es_ES', dir: 'ltr', urlPrefix: 'es', active: false },
  pt: { code: 'pt', name: 'Português',  bcp47: 'pt',    ogLocale: 'pt_BR', dir: 'ltr', urlPrefix: 'pt', active: false },
  zh: { code: 'zh', name: '中文',         bcp47: 'zh-CN', ogLocale: 'zh_CN', dir: 'ltr', urlPrefix: 'zh', active: false },
  ja: { code: 'ja', name: '日本語',       bcp47: 'ja',    ogLocale: 'ja_JP', dir: 'ltr', urlPrefix: 'ja', active: false },
  ru: { code: 'ru', name: 'Русский',    bcp47: 'ru',    ogLocale: 'ru_RU', dir: 'ltr', urlPrefix: 'ru', active: false },
};

export const DEFAULT_LOCALE: LocaleCode = 'en';

/** All locales currently shipped to production. */
export function getActiveLocales(): LocaleMeta[] {
  return Object.values(LOCALES).filter((l) => l.active);
}

/**
 * Build the canonical path for a given locale.
 * `/about` + `de` → `/de/about`. `/about` + `en` → `/about`.
 */
export function localizePath(path: string, code: LocaleCode): string {
  const meta = LOCALES[code];
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (!meta.urlPrefix) return clean;
  return `/${meta.urlPrefix}${clean}`;
}
