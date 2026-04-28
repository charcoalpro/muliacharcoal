/**
 * Organization + WebSite JSON-LD graph for the homepage and any page that
 * passes `includeOrgSchema` to BaseLayout.
 *
 * Pure data — emit via `<JsonLd data={organizationSchema()} />`.
 */

import { company } from '~/config/company';
import { siteOrigin } from '~/lib/url';
import { socialSameAs } from '~/lib/schema/sameAs';

export function organizationSchema() {
  const origin = siteOrigin();
  const sameAs = socialSameAs();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: company.brand,
        legalName: company.legalName,
        url: origin,
        foundingDate: String(company.foundingYear),
        logo: {
          '@type': 'ImageObject',
          url: `${origin}/logo.png`,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${company.address.street}, ${company.address.district}`,
          addressLocality: company.address.city,
          addressRegion: company.address.region,
          postalCode: company.address.postalCode,
          addressCountry: company.address.countryCode,
        },
        email: company.email,
        telephone: company.phone.display,
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: origin,
        name: company.brand,
        publisher: { '@id': `${origin}/#organization` },
        inLanguage: 'en',
      },
    ],
  } as const;
}
