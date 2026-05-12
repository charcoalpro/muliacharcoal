/**
 * i18n loader — returns the right translation JSON for a given locale.
 *
 * Components and pages should import `getLocale()` and read the translation
 * tree, never `import en from '~/i18n/en.json'` directly. That way adding
 * a second locale is one config change (drop `de.json`, flip `active: true`
 * in `locales.ts`), not a refactor of every consumer.
 *
 * The English JSON is treated as the canonical schema. Every other locale
 * is typed as `Locale` (the shape of `en.json`) — TypeScript will flag any
 * structural drift between language files.
 */

import en from './en.json';
import { DEFAULT_LOCALE, type LocaleCode } from './locales';

export type Locale = typeof en;

/**
 * Add new locales here as their JSON files land. Until then, `getLocale`
 * falls back to the English copy so partial translations don't 500 the
 * build.
 */
const TRANSLATIONS: Partial<Record<LocaleCode, Locale>> = {
  en,
};

/**
 * Return the translation tree for `code`. Falls back to English when a
 * translation file has not been added yet — the call site never has to
 * branch on missing translations.
 */
export function getLocale(code: LocaleCode = DEFAULT_LOCALE): Locale {
  return TRANSLATIONS[code] ?? en;
}

export { DEFAULT_LOCALE } from './locales';
export type { LocaleCode } from './locales';
