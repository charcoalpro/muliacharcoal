/**
 * LocalBusiness JSON-LD builder for the Contact page.
 *
 * Produces a single `LocalBusiness` graph with PostalAddress, GeoCoordinates,
 * `openingHoursSpecification`, and `contactPoint[]` for sales + director.
 *
 * Bank details are NEVER included here, even when the public-banking option
 * is enabled — surfacing payment data in structured metadata is a fraud
 * vector and offers no SEO value.
 */

import { company, e164Plus } from '~/config/company';

const siteOrigin = (company.siteUrl ?? '').replace(/\/$/, '');

interface OpeningHoursSpec {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek: readonly string[];
  opens: string;
  closes: string;
}

// Derived from `company.hours` so changing the working week or shift
// times flows through automatically. If hours diverge per day in the
// future, expand `company.hours` to a per-day map and emit one spec
// per group here.
const openingHoursSpecification: OpeningHoursSpec[] = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: company.hours.daysOpen,
    opens: company.hours.open,
    closes: company.hours.close,
  },
];

const contactPoints = [
  {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: company.phone.e164,
    email: company.email,
    availableLanguage: company.languages.spoken,
    areaServed: 'Worldwide',
  },
  {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    telephone: e164Plus(company.whatsapp.director.e164Digits),
    email: company.email,
    availableLanguage: ['en', 'id'],
    areaServed: 'Worldwide',
  },
];

const sameAs = Object.values(company.social).filter(
  (url): url is string => typeof url === 'string' && url.length > 0,
);

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteOrigin}/contact#localbusiness`,
  name: company.brand,
  legalName: company.legalName,
  url: `${siteOrigin}/contact`,
  logo: `${siteOrigin}/logo.png`,
  image: `${siteOrigin}/logo.png`,
  telephone: company.phone.e164,
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressRegion: company.address.region,
    postalCode: company.address.postalCode,
    addressCountry: company.address.countryCode,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: company.address.latitude,
    longitude: company.address.longitude,
  },
  openingHoursSpecification,
  contactPoint: contactPoints,
  vatID: company.registration.taxId,
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
  ...(sameAs.length ? { sameAs } : {}),
} as const;
