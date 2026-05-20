/**
 * Language registry — single source of truth for what languages exist and
 * how they're rendered (locale, layout direction, display label).
 *
 * Per CLAUDE.md, the site ships with English at launch; Arabic, Hebrew,
 * German, Turkish, Spanish, Portuguese, Chinese, Japanese, Russian roll
 * out incrementally. `active: false` entries are listed here so the
 * roadmap is visible — flip `active` when the translations and routes
 * are ready.
 *
 * Consumers:
 *  - <SEO /> reads activeLanguages() to emit <link rel="alternate"> hreflang tags
 *  - <BaseLayout /> resolves dir + og:locale from getLanguage(lang)
 *  - the (future) language switcher iterates activeLanguages() for its menu
 */

export interface LanguageConfig {
  /** ISO 639-1 code. Used in URL prefix (`/ar/...`) and `<html lang>`. */
  code: string;
  /** BCP 47 / OG locale tag (e.g. `en_US`, `ar`, `zh_CN`). */
  locale: string;
  dir: 'ltr' | 'rtl';
  /** Display name in the language's own script. */
  label: string;
  /** True when the language has translations + routes ready. */
  active: boolean;
}

export const LANGUAGES: readonly LanguageConfig[] = [
  { code: 'en', locale: 'en_US', dir: 'ltr', label: 'English', active: true },
  { code: 'ar', locale: 'ar', dir: 'rtl', label: 'العربية', active: false },
  { code: 'he', locale: 'he', dir: 'rtl', label: 'עברית', active: false },
  { code: 'de', locale: 'de_DE', dir: 'ltr', label: 'Deutsch', active: false },
  { code: 'tr', locale: 'tr_TR', dir: 'ltr', label: 'Türkçe', active: false },
  { code: 'es', locale: 'es_ES', dir: 'ltr', label: 'Español', active: false },
  { code: 'pt', locale: 'pt_PT', dir: 'ltr', label: 'Português', active: false },
  { code: 'zh', locale: 'zh_CN', dir: 'ltr', label: '中文', active: false },
  { code: 'ja', locale: 'ja_JP', dir: 'ltr', label: '日本語', active: false },
  { code: 'ru', locale: 'ru_RU', dir: 'ltr', label: 'Русский', active: false },
] as const;

export const DEFAULT_LANGUAGE = 'en';

export function getLanguage(code: string): LanguageConfig | undefined {
  return LANGUAGES.find((l) => l.code === code);
}

export function activeLanguages(): readonly LanguageConfig[] {
  return LANGUAGES.filter((l) => l.active);
}

/**
 * Strip the leading `/xx` language prefix from a path, if any. Returns the
 * path that would be valid on the English root. Used when emitting hreflang
 * alternates: each language version needs the same `<path>` portion under
 * its own root.
 */
export function stripLanguagePrefix(path: string): string {
  const match = path.match(/^\/([a-z]{2})(\/|$)/);
  if (!match) return path;
  const code = match[1];
  if (getLanguage(code)) {
    return path.slice(3) || '/';
  }
  return path;
}

/**
 * Build the path for a given language. English (the default) has no prefix;
 * every other language gets `/{code}` prepended.
 */
export function pathForLanguage(code: string, basePath: string): string {
  const clean = stripLanguagePrefix(basePath);
  if (code === DEFAULT_LANGUAGE) return clean;
  if (clean === '/' || clean === '') return `/${code}`;
  return `/${code}${clean}`;
}
