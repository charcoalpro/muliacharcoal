/**
 * Organization JSON-LD builder.
 *
 * Single source of truth for the Organization graph node. Every consumer
 * — homepage Organization+WebSite emitter, About page schema, LocalBusiness
 * `sameAs` filter — pulls from this module so the graph never drifts.
 *
 * Two render modes:
 *   - 'slim' (default): name, legalName, url, foundingDate, logo, address,
 *     email, telephone, sameAs. Used by the sitewide OrganizationSchema
 *     component.
 *   - 'rich': adds founder (Person), identifier[] (NIB, NPWP), and taxID.
 *     Used by the About page where the extra detail belongs.
 *
 * Address fields that are still TODO_PLACEHOLDER are omitted so structured
 * data never advertises a placeholder address to search engines.
 */

import { company, getOwner, hasFact } from '~/config/company';

/**
 * Canonical site origin (no trailing slash). Single source of truth —
 * import this from any module that needs to build absolute URLs (schema
 * builders, breadcrumbs, JSON-LD `@id`s). The previous duplication of
 * the `(company.siteUrl ?? '').replace(/\/$/, '')` derivation across
 * five files is now eliminated.
 *
 * `SEO.astro` keeps its own derivation because it can fall back to
 * `Astro.site` when the user runs the dev server with a different host.
 */
export const siteOrigin = (company.siteUrl ?? '').replace(/\/$/, '');

export const ORG_ID = `${siteOrigin}/#organization`;
export const WEBSITE_ID = `${siteOrigin}/#website`;

/** Live (non-null) social profile URLs, suitable for `sameAs`. */
export function getSameAs(): string[] {
  return Object.values(company.social).filter(
    (url): url is string => typeof url === 'string' && url.length > 0,
  );
}

/** PostalAddress with placeholder fields stripped out. */
export function buildPostalAddress() {
  const a = company.address;
  return {
    '@type': 'PostalAddress',
    ...(hasFact(a.street) ? { streetAddress: a.street } : {}),
    addressLocality: a.city,
    addressRegion: a.region,
    ...(hasFact(a.postalCode) ? { postalCode: a.postalCode } : {}),
    addressCountry: a.countryCode,
  };
}

interface BuildOptions {
  /** 'slim' = homepage shape, 'rich' = About-page shape. Default 'slim'. */
  mode?: 'slim' | 'rich';
}

/** Build the Organization graph node. Pure; no I/O. */
export function buildOrganization({ mode = 'slim' }: BuildOptions = {}) {
  const sameAs = getSameAs();

  const base = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: company.brand,
    legalName: company.legalName,
    url: siteOrigin,
    foundingDate: String(company.foundingYear),
    logo: {
      '@type': 'ImageObject',
      url: `${siteOrigin}/logo.png`,
    },
    address: buildPostalAddress(),
    email: company.email,
    telephone: company.phone.display,
    ...(sameAs.length ? { sameAs } : {}),
  };

  if (mode === 'slim') return base;

  const owner = getOwner();
  return {
    ...base,
    ...(owner
      ? {
          founder: {
            '@type': 'Person',
            name: owner.name,
          },
        }
      : {}),
    taxID: company.registration.taxId,
    identifier: [
      {
        '@type': 'PropertyValue',
        propertyID: 'NIB',
        value: company.registration.nib,
      },
      {
        '@type': 'PropertyValue',
        propertyID: 'NPWP',
        value: company.registration.taxId,
      },
    ],
  };
}

/** Build the WebSite graph node, paired with Organization on the homepage. */
export function buildWebSite() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteOrigin,
    name: company.brand,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  };
}
