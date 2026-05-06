/**
 * Site — single source of truth for site-level i18n configuration.
 *
 * Owns the list of language versions the site is published in, in the
 * order specified by CLAUDE.md (English first, then the priority-buyer
 * markets). `isActive: true` means a translated build of the language
 * exists and pages should be linked / hreflang-advertised; `false` means
 * the language is reserved but not yet rolled out.
 *
 * Drives:
 *   - hreflang emission in `~/components/seo/SEO.astro`
 *   - `og:locale` selection
 *   - schema.org `inLanguage` on Organization / Article / WebSite
 *   - the future language switcher in `~/components/layout/Header.astro`
 *
 * NOT a company fact — `~/config/company.ts` continues to own facts
 * about the company itself. Languages the sales team speaks live on
 * `company.spokenLanguages` (ISO 639-1 codes) and feed
 * LocalBusiness.availableLanguages on `/contact`.
 */

export interface SiteLanguage {
  /** ISO 639-1 code used in URL prefixes, hreflang, and HTML lang. */
  code: string;
  /** BCP 47 locale used in og:locale and schema.org `inLanguage`. */
  locale: string;
  /** Writing direction. Arabic and Hebrew use rtl. */
  dir: 'ltr' | 'rtl';
  /** URL prefix for the language version. Empty string for the default. */
  pathPrefix: string;
  /** True once a translated build of the site is live. Drives hreflang. */
  isActive: boolean;
}

export const siteLanguages: SiteLanguage[] = [
  { code: 'en', locale: 'en_US', dir: 'ltr', pathPrefix: '',    isActive: true  },
  { code: 'ar', locale: 'ar_SA', dir: 'rtl', pathPrefix: '/ar', isActive: false },
  { code: 'he', locale: 'he_IL', dir: 'rtl', pathPrefix: '/he', isActive: false },
  { code: 'de', locale: 'de_DE', dir: 'ltr', pathPrefix: '/de', isActive: false },
  { code: 'tr', locale: 'tr_TR', dir: 'ltr', pathPrefix: '/tr', isActive: false },
  { code: 'es', locale: 'es_ES', dir: 'ltr', pathPrefix: '/es', isActive: false },
  { code: 'pt', locale: 'pt_BR', dir: 'ltr', pathPrefix: '/pt', isActive: false },
  { code: 'zh', locale: 'zh_CN', dir: 'ltr', pathPrefix: '/zh', isActive: false },
  { code: 'ja', locale: 'ja_JP', dir: 'ltr', pathPrefix: '/ja', isActive: false },
  { code: 'ru', locale: 'ru_RU', dir: 'ltr', pathPrefix: '/ru', isActive: false },
];

/** The default (root-served) language. */
export const defaultLanguage: SiteLanguage = siteLanguages[0];

/** Currently published languages — every entry gets a hreflang tag. */
export const activeLanguages: SiteLanguage[] = siteLanguages.filter((l) => l.isActive);
