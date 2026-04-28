/**
 * Inquiry-form static data — the country list and product checkbox set.
 *
 * Kept out of `company.ts` because they are form-presentation data, not
 * company facts. Add a new buyer market to `inquiryCountries` to expose it
 * in the country dropdown; add a new product family to `inquiryProducts`
 * when a SKU shape launches publicly.
 */

/**
 * Compact, B2B-relevant subset of countries — wholesale charcoal buyers
 * rarely sit outside this list. "Other" lets long-tail markets self-identify.
 */
export const inquiryCountries: readonly string[] = [
  'United States', 'United Kingdom', 'Saudi Arabia', 'United Arab Emirates',
  'Germany', 'Russia', 'Kazakhstan', 'Turkey', 'France', 'Spain',
  'Italy', 'Netherlands', 'Belgium', 'Poland', 'Czech Republic',
  'Greece', 'Portugal', 'Sweden', 'Denmark', 'Norway',
  'Switzerland', 'Austria', 'Ireland', 'Romania', 'Hungary',
  'Egypt', 'Jordan', 'Lebanon', 'Kuwait', 'Qatar',
  'Bahrain', 'Oman', 'Iraq', 'Israel', 'Morocco',
  'Tunisia', 'Algeria', 'South Africa', 'Nigeria', 'Kenya',
  'Australia', 'New Zealand', 'Canada', 'Mexico', 'Brazil',
  'Argentina', 'Chile', 'India', 'Pakistan', 'Bangladesh',
  'China', 'Hong Kong', 'Taiwan', 'Japan', 'South Korea',
  'Singapore', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines',
  'Other',
] as const;

export interface InquiryProductOption {
  id: string;
  label: string;
}

export const inquiryProducts: readonly InquiryProductOption[] = [
  { id: 'cube', label: 'Cube' },
  { id: 'hexagonal', label: 'Hexagonal' },
  { id: 'finger', label: 'Finger' },
  { id: 'dome', label: 'Dome' },
  { id: 'flat', label: 'Flat' },
  { id: 'custom', label: 'Custom shape / private label' },
] as const;

/** Bait field name used by the honeypot. Generic enough that bots will fill it. */
export const inquiryHoneypotName = 'website_url';

/** File-attachment limits enforced by the inline validator. */
export const inquiryAttachment = {
  maxBytes: 5 * 1024 * 1024,
  acceptedTypes: ['application/pdf', 'image/jpeg', 'image/png'] as const,
};
