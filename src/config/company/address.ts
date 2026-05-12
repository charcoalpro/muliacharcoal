/**
 * Factory / mailing address.
 *
 * Lat/lng currently resolves to central Semarang as a fallback so the
 * Contact-page map renders. Replace with exact factory GPS before launch.
 */
export const address = {
  street: 'TODO_PLACEHOLDER_FACTORY_STREET',
  district: 'TODO_PLACEHOLDER_DISTRICT',
  city: 'Semarang',
  region: 'Central Java',
  postalCode: 'TODO_PLACEHOLDER_POSTAL_CODE',
  country: 'Indonesia',
  countryCode: 'ID',
  short: 'Semarang, Central Java, Indonesia',
  latitude: -6.9667,
  longitude: 110.4167,
} as const;

/** Google Maps share link used on the Contact page and in the footer. */
export const googleMapsUrl = 'https://maps.app.goo.gl/SAcfhq4ypCud6HqQA';
