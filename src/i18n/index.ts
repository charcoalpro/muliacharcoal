/**
 * Typed i18n loader.
 *
 * `t(key, lang?)` resolves a dot-path against the strings table for the
 * given language and returns the literal string. `key` is constrained to
 * the actual dot-paths in `en.json`, so typos surface at build time.
 *
 * Right now only English is active; when a second language ships, add it
 * to the TABLES map below and to src/config/i18n.ts.
 */

import en from './en.json';
import { DEFAULT_LANGUAGE } from '~/config/i18n';

export type Strings = typeof en;

/**
 * Recursively enumerate all dot-paths to string leaves in T.
 *
 * Given `{ a: { b: 'x', c: { d: 'y' } } }`, produces `'a.b' | 'a.c.d'`.
 * Used to type-check labelKey arguments against the actual JSON shape.
 */
type Paths<T> = T extends string
  ? never
  : {
      [K in keyof T & string]: T[K] extends string
        ? K
        : T[K] extends object
          ? `${K}.${Paths<T[K]>}`
          : never;
    }[keyof T & string];

export type StringKey = Paths<Strings>;

const TABLES: Record<string, Strings> = {
  en,
};

export function getStrings(lang: string = DEFAULT_LANGUAGE): Strings {
  return TABLES[lang] ?? TABLES[DEFAULT_LANGUAGE];
}

/**
 * Resolve a dot-path against the strings table.
 *
 * Returns the literal string at the path, or the key itself if the path
 * doesn't resolve. Returning the key makes missing strings visible during
 * QA instead of silently rendering as empty.
 */
export function t(key: StringKey, lang: string = DEFAULT_LANGUAGE): string {
  const strings = getStrings(lang);
  const parts = key.split('.');
  let cursor: unknown = strings;
  for (const p of parts) {
    if (cursor == null || typeof cursor !== 'object') return key;
    cursor = (cursor as Record<string, unknown>)[p];
  }
  return typeof cursor === 'string' ? cursor : key;
}
