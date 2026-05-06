/**
 * Language registry — single source of truth for which locales the site
 * supports. Hreflang tags, the language switcher, and locale-aware path
 * helpers all read from `languages` below.
 *
 * Only English is active at launch (per CLAUDE.md). To add a locale:
 *   1. Drop in `src/i18n/<code>.json` (mirror the shape of `en.json`).
 *   2. Add an `import` and a `dictionaries[code]` entry in `src/i18n/index.ts`.
 *   3. Uncomment the matching line below.
 *
 * Future locales are listed in priority-market order (USA, UK, Saudi, DE,
 * Russia/CIS) per `company.priorityMarkets`. Arabic and Hebrew are RTL.
 */

export const languages = [
  {
    code: 'en',
    label: 'English',
    endonym: 'English',
    dir: 'ltr',
    ogLocale: 'en_US',
    isDefault: true,
  },
  // { code: 'ar', label: 'Arabic',     endonym: 'العربية',  dir: 'rtl', ogLocale: 'ar_SA' },
  // { code: 'he', label: 'Hebrew',     endonym: 'עברית',     dir: 'rtl', ogLocale: 'he_IL' },
  // { code: 'de', label: 'German',     endonym: 'Deutsch',   dir: 'ltr', ogLocale: 'de_DE' },
  // { code: 'tr', label: 'Turkish',    endonym: 'Türkçe',    dir: 'ltr', ogLocale: 'tr_TR' },
  // { code: 'es', label: 'Spanish',    endonym: 'Español',   dir: 'ltr', ogLocale: 'es_ES' },
  // { code: 'pt', label: 'Portuguese', endonym: 'Português', dir: 'ltr', ogLocale: 'pt_BR' },
  // { code: 'zh', label: 'Chinese',    endonym: '中文',       dir: 'ltr', ogLocale: 'zh_CN' },
  // { code: 'ja', label: 'Japanese',   endonym: '日本語',      dir: 'ltr', ogLocale: 'ja_JP' },
  // { code: 'ru', label: 'Russian',    endonym: 'Русский',   dir: 'ltr', ogLocale: 'ru_RU' },
] as const;

export type Language = (typeof languages)[number];
export type LangCode = Language['code'];
export type Direction = Language['dir'];

const defaultEntry = languages.find((l) => l.isDefault) ?? languages[0];
export const defaultLang: LangCode = defaultEntry.code;

const byCode = new Map<string, Language>(languages.map((l) => [l.code, l]));

export function getLanguage(code: LangCode | string): Language {
  return byCode.get(code) ?? defaultEntry;
}

export function isRtl(code: LangCode | string): boolean {
  return getLanguage(code).dir === 'rtl';
}

export function isKnownLang(code: string): code is LangCode {
  return byCode.has(code);
}

/**
 * Strip a leading "/{lang}" prefix from a path so locale-aware comparisons
 * work uniformly. `/` stays `/`. `/en` is treated like `/` since English
 * is unprefixed.
 *
 * @example
 *   pathWithoutLang('/ar/about') // '/about'
 *   pathWithoutLang('/about')    // '/about'
 *   pathWithoutLang('/')         // '/'
 */
export function pathWithoutLang(path: string): string {
  const match = path.match(/^\/([a-z]{2})(\/.*)?$/);
  if (!match) return path || '/';
  const code = match[1];
  if (!isKnownLang(code) || code === defaultLang) return path || '/';
  return match[2] || '/';
}

/**
 * Prepend a non-default lang prefix to a path. The default language is
 * served unprefixed (per CLAUDE.md routing convention), so this returns
 * the path unchanged for `defaultLang`.
 *
 * @example
 *   pathWithLang('/about', 'ar') // '/ar/about'
 *   pathWithLang('/about', 'en') // '/about'
 *   pathWithLang('/',      'ar') // '/ar'
 */
export function pathWithLang(path: string, lang: LangCode): string {
  const stripped = pathWithoutLang(path);
  if (lang === defaultLang) return stripped;
  if (stripped === '/') return `/${lang}`;
  return `/${lang}${stripped}`;
}
