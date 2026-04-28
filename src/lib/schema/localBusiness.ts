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

import { company } from '~/config/company';
import { siteOrigin as resolveSiteOrigin } from '~/lib/url';
import { socialSameAs } from '~/lib/schema/sameAs';

const siteOrigin = resolveSiteOrigin();

interface OpeningHoursSpec {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

const openingHoursSpecification: OpeningHoursSpec[] = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    opens: '08:00',
    closes: '16:00',
  },
];

const availableLanguages = ['en', 'id', 'zh', 'ar'];

const contactPoints = [
  {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: company.phone.e164,
    email: company.email,
    availableLanguage: availableLanguages,
    areaServed: 'Worldwide',
  },
  {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    telephone: company.whatsapp.director.e164Digits.startsWith('+')
      ? company.whatsapp.director.e164Digits
      : `+${company.whatsapp.director.e164Digits}`,
    email: company.email,
    availableLanguage: ['en', 'id'],
    areaServed: 'Worldwide',
  },
];

const sameAs = socialSameAs();

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
