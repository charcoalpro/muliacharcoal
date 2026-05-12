/**
 * Site-meta facets — priority markets and analytics IDs.
 */

/**
 * Priority target markets (in order of commercial importance).
 * Drives rollout order for /markets/{country} pages and translated language versions.
 */
export const priorityMarkets = [
  'USA',
  'UK',
  'Saudi Arabia',
  'Germany',
  'Russia / CIS',
] as const;

/**
 * Web analytics. Both values are public — they appear verbatim in the
 * rendered HTML — so they live in source rather than env vars.
 */
export const analytics = {
  gaId: 'G-CLNNLB616W',
  gscVerification: 'fKfTQ-h0XVRjQNoEERZWqchNnUs_6H48amhkgsDPGBA',
} as const;
