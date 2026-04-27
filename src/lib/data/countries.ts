/**
 * Country list shown in the inquiry-form country select.
 *
 * Compact, B2B-relevant set — wholesale charcoal buyers rarely sit
 * outside this list. "Other" lets long-tail markets self-identify.
 *
 * This is form-input data, not a company fact. It does not belong in
 * `company.ts`. Add or reorder entries here.
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
