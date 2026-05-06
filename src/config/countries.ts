/**
 * Countries — wholesale-buyer country list shown in the inquiry-form
 * country dropdown (`~/components/contact/InquiryForm.astro`).
 *
 * Authored order, not alphabetical: priority buyer markets per CLAUDE.md
 * (USA, UK, KSA, Germany, Russia, CIS) are first; remaining entries
 * follow regional clusters (EU, MENA, Africa, Americas, APAC).
 *
 * `code` is ISO 3166-1 alpha-2 — the stable form-value when this list
 * is later translated into other site languages. `label` is the English
 * display text used today (and used as the form value to keep the
 * inquiry email readable for the sales team).
 *
 * `OTHER` is the long-tail catch-all. Buyers select it then describe
 * their country in the additional-info textarea.
 */

export interface Country {
  /** ISO 3166-1 alpha-2 code (e.g. "US", "DE") or "OTHER". */
  code: string;
  /** Display label for the dropdown option. */
  label: string;
}

export const inquiryFormCountries: Country[] = [
  // Priority markets (CLAUDE.md ordering)
  { code: 'US', label: 'United States' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'SA', label: 'Saudi Arabia' },
  { code: 'AE', label: 'United Arab Emirates' },
  { code: 'DE', label: 'Germany' },
  { code: 'RU', label: 'Russia' },
  { code: 'KZ', label: 'Kazakhstan' },
  // Europe
  { code: 'TR', label: 'Turkey' },
  { code: 'FR', label: 'France' },
  { code: 'ES', label: 'Spain' },
  { code: 'IT', label: 'Italy' },
  { code: 'NL', label: 'Netherlands' },
  { code: 'BE', label: 'Belgium' },
  { code: 'PL', label: 'Poland' },
  { code: 'CZ', label: 'Czech Republic' },
  { code: 'GR', label: 'Greece' },
  { code: 'PT', label: 'Portugal' },
  { code: 'SE', label: 'Sweden' },
  { code: 'DK', label: 'Denmark' },
  { code: 'NO', label: 'Norway' },
  { code: 'CH', label: 'Switzerland' },
  { code: 'AT', label: 'Austria' },
  { code: 'IE', label: 'Ireland' },
  { code: 'RO', label: 'Romania' },
  { code: 'HU', label: 'Hungary' },
  // MENA
  { code: 'EG', label: 'Egypt' },
  { code: 'JO', label: 'Jordan' },
  { code: 'LB', label: 'Lebanon' },
  { code: 'KW', label: 'Kuwait' },
  { code: 'QA', label: 'Qatar' },
  { code: 'BH', label: 'Bahrain' },
  { code: 'OM', label: 'Oman' },
  { code: 'IQ', label: 'Iraq' },
  { code: 'IL', label: 'Israel' },
  { code: 'MA', label: 'Morocco' },
  { code: 'TN', label: 'Tunisia' },
  { code: 'DZ', label: 'Algeria' },
  // Africa
  { code: 'ZA', label: 'South Africa' },
  { code: 'NG', label: 'Nigeria' },
  { code: 'KE', label: 'Kenya' },
  // Oceania & Americas
  { code: 'AU', label: 'Australia' },
  { code: 'NZ', label: 'New Zealand' },
  { code: 'CA', label: 'Canada' },
  { code: 'MX', label: 'Mexico' },
  { code: 'BR', label: 'Brazil' },
  { code: 'AR', label: 'Argentina' },
  { code: 'CL', label: 'Chile' },
  // South & East Asia
  { code: 'IN', label: 'India' },
  { code: 'PK', label: 'Pakistan' },
  { code: 'BD', label: 'Bangladesh' },
  { code: 'CN', label: 'China' },
  { code: 'HK', label: 'Hong Kong' },
  { code: 'TW', label: 'Taiwan' },
  { code: 'JP', label: 'Japan' },
  { code: 'KR', label: 'South Korea' },
  { code: 'SG', label: 'Singapore' },
  { code: 'MY', label: 'Malaysia' },
  { code: 'TH', label: 'Thailand' },
  { code: 'VN', label: 'Vietnam' },
  { code: 'PH', label: 'Philippines' },
  // Catch-all
  { code: 'OTHER', label: 'Other' },
];
