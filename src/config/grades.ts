/**
 * Quality grades — three-tier specification ladder we publish to buyers.
 *
 * Each property is a `SpecValue`: a `display` string is what buyers see
 * in the table; `min`, `max` and `unit` are the structured numbers the
 * grade Product schema feeds into `additionalProperty`.
 *
 * Update a value here only when QC re-runs the certification batch and
 * the operations director signs off; the SpecsTable on the homepage and
 * `/quality/specifications-explained` both read from this file.
 */

export interface SpecValue {
  /** Display text shown in the table / card (e.g. "2.5-2.8%", "≥ 75%"). */
  display: string;
  /** Numeric lower bound when applicable. */
  min?: number;
  /** Numeric upper bound when applicable. */
  max?: number;
  /** Unit symbol or word (e.g. "%", "°C", "hours", "kcal/kg", "drops"). */
  unit?: string;
}

export interface Grade {
  /** Key for i18n lookup, JSON-LD `@id`, and stable URL anchors. */
  key: 'premium' | 'super-premium' | 'platinum';
  /** Display name (English). */
  name: string;
  /** Short paragraph used by JSON-LD `description`. */
  description: string;
  ash: SpecValue;
  /**
   * Raw-material source / selection that distinguishes this grade — the
   * second defining differentiator alongside `ash` (the `/products` hub
   * leads the grade comparison with these two). Optional and unset today:
   * the per-grade sourcing copy is pending QC sign-off, so consumers gate
   * on `hasFact(grade.rawMaterialSource?.display)` and render a placeholder
   * until it lands. Populate `display` here when confirmed.
   */
  rawMaterialSource?: SpecValue;
  moisture: SpecValue;
  fixedCarbon: SpecValue;
  burnTime: SpecValue;
  burnTemp: SpecValue;
  calorieValue: SpecValue;
  dropTest: SpecValue;
}

/**
 * The seven properties listed for every grade, in published order.
 * Keep this list in sync with the table column logic in
 * `~/components/content/SpecsTable.astro` and the FAQ glossary in
 * `~/i18n/en/home.json` (specs.glossary).
 */
export const gradePropertyKeys = [
  'ash',
  'moisture',
  'fixedCarbon',
  'burnTime',
  'burnTemp',
  'calorieValue',
  'dropTest',
] as const;

export type GradePropertyKey = (typeof gradePropertyKeys)[number];

export const grades: Grade[] = [
  {
    key: 'premium',
    name: 'Premium',
    description:
      'Entry-level wholesale grade for value SKUs and large-volume retail. ≥ 75% fixed carbon, 2.5-2.8% ash.',
    ash: { display: '2.5-2.8%', min: 2.5, max: 2.8, unit: '%' },
    moisture: { display: '≤ 6%', max: 6, unit: '%' },
    fixedCarbon: { display: '≥ 75%', min: 75, unit: '%' },
    burnTime: { display: '2+ hours', min: 2, unit: 'hours' },
    burnTemp: { display: '600 °C', min: 600, max: 600, unit: '°C' },
    calorieValue: { display: '≥ 7000 kcal/kg', min: 7000, unit: 'kcal/kg' },
    dropTest: { display: '3+', min: 3, unit: 'drops' },
  },
  {
    key: 'super-premium',
    name: 'Super Premium',
    description:
      'Mid-tier specification for established shisha brands and lounge supply. ≥ 80% fixed carbon, 2.0-2.5% ash.',
    ash: { display: '2.0-2.5%', min: 2.0, max: 2.5, unit: '%' },
    moisture: { display: '≤ 6%', max: 6, unit: '%' },
    fixedCarbon: { display: '≥ 80%', min: 80, unit: '%' },
    burnTime: { display: '2+ hours', min: 2, unit: 'hours' },
    burnTemp: { display: '650 °C', min: 650, max: 650, unit: '°C' },
    calorieValue: { display: '≥ 7300 kcal/kg', min: 7300, unit: 'kcal/kg' },
    dropTest: { display: '3+', min: 3, unit: 'drops' },
  },
  {
    key: 'platinum',
    name: 'Platinum',
    description:
      'Top-tier specification for premium private-label and hotel/lounge accounts. ≥ 82% fixed carbon, 1.6-2.0% ash.',
    ash: { display: '1.6-2.0%', min: 1.6, max: 2.0, unit: '%' },
    moisture: { display: '≤ 6%', max: 6, unit: '%' },
    fixedCarbon: { display: '≥ 82%', min: 82, unit: '%' },
    burnTime: { display: '2.5+ hours', min: 2.5, unit: 'hours' },
    burnTemp: { display: '680 °C', min: 680, max: 680, unit: '°C' },
    calorieValue: { display: '≥ 7500 kcal/kg', min: 7500, unit: 'kcal/kg' },
    dropTest: { display: '3+', min: 3, unit: 'drops' },
  },
];
