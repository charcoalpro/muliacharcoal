/**
 * Import-guide link helper — single source for the `/logistics/import-to-{slug}`
 * URLs and the country display names, derived from `company.logistics.imports`.
 *
 * Centralizes what `import-to-[country].astro` declared inline (the config-key →
 * slug map) so the homepage "Markets we serve" block, the `/logistics/import-guides`
 * hub, the per-country sibling block, and the logistics cluster pages all build the
 * same list without re-implementing the slug mapping. Country names are facts read
 * from `company.logistics.imports[*].country`; only the surrounding labels live in
 * i18n (CLAUDE.md § company facts).
 */
import { company, type ImportCountry, type ImportCountryKey } from '~/config/company';

/** Config key → URL slug (kebab). Mirrors the SLUGS map in `import-to-[country].astro`. */
export const IMPORT_SLUGS: Record<ImportCountryKey, string> = {
  usa: 'usa',
  uk: 'uk',
  germany: 'germany',
  saudiArabia: 'saudi-arabia',
  russia: 'russia',
};

export interface ImportCountryLink {
  key: ImportCountryKey;
  /** URL slug, e.g. `saudi-arabia`. */
  slug: string;
  /** Root-relative guide URL, e.g. `/logistics/import-to-saudi-arabia`. */
  href: string;
  /** Display name (company fact), e.g. "Saudi Arabia". */
  country: string;
  /** ISO date the country's regulatory data was last verified (company fact). */
  lastVerified: string;
}

/**
 * Published import-guide links from `company.logistics.imports`, in config order.
 * Pass `exclude` to drop the current country (used for the sibling "other guides"
 * block on each country page). Only countries actually present in `imports` are
 * returned, so the list self-extends when a country is added to the config.
 */
export function importCountryLinks(exclude?: ImportCountryKey): ImportCountryLink[] {
  return (Object.entries(company.logistics.imports) as [ImportCountryKey, ImportCountry | undefined][])
    .filter((entry): entry is [ImportCountryKey, ImportCountry] => Boolean(entry[1]) && entry[0] !== exclude)
    .map(([key, data]) => ({
      key,
      slug: IMPORT_SLUGS[key],
      href: `/logistics/import-to-${IMPORT_SLUGS[key]}`,
      country: data.country,
      lastVerified: data.lastVerified,
    }));
}
