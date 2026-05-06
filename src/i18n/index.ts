/**
 * Translation loader. Returns the dictionary for the requested language,
 * falling back to English when the requested code has no JSON yet.
 *
 * Usage in an Astro frontmatter or component:
 *   import { useT } from '~/i18n';
 *   const t = useT(lang);
 *   // t.nav.about, t.footer.copyright, ...
 *
 * To add a new locale: import its JSON below and register it in
 * `dictionaries`. No call sites change.
 */

import en from './en.json';
import { defaultLang, type LangCode } from './languages';

export type Dict = typeof en;

const dictionaries = {
  en,
  // ar: (await import('./ar.json')).default,
  // ...future locales
} as Record<string, Dict>;

export function useT(lang: LangCode | string = defaultLang): Dict {
  return dictionaries[lang] ?? dictionaries[defaultLang];
}

export { defaultLang } from './languages';
export type { LangCode } from './languages';
