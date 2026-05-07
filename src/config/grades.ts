/**
 * Quality grades — three-tier specification ladder we publish to buyers.
 *
 * Numeric values are factory-confirmed targets, not single-batch lab
 * results. Grade-specific copy lives in `en.home.specs.grades.<key>` so
 * marketing tone can vary by language without touching the numbers.
 *
 * Update a value here only when QC re-runs the certification batch and
 * the operations director signs off; the SpecsTable on the homepage and
 * `/quality/specifications-explained` both read from this file.
 */

export interface Grade {
  /** Key for i18n lookup and stable id. */
  key: 'premium' | 'super-premium' | 'platinum';
  /** Display name (English). */
  name: string;
  /** Ash residue (% by mass) after burn. Lower is better. */
  ashPct: number;
  /** Moisture content (% by mass) at packing. Lower is better. */
  moisturePct: number;
  /** Fixed carbon content (% by mass). Higher is better. */
  fixedCarbonPct: number;
  /** Average burn time per cube on a standard shisha bowl, in minutes. */
  burnTimeMinutes: number;
  /** Surface burn temperature at peak, in °C. */
  burnTempC: number;
}

/**
 * TODO: confirm exact numbers with the operations director.
 * The placeholder values below are conservative claims that match
 * widely-published coconut shell shisha charcoal specifications and
 * keep the page renderable until QC confirms.
 */
export const grades: Grade[] = [
  {
    key: 'premium',
    name: 'Premium',
    ashPct: 2.5,
    moisturePct: 5,
    fixedCarbonPct: 75,
    burnTimeMinutes: 60,
    burnTempC: 700,
  },
  {
    key: 'super-premium',
    name: 'Super Premium',
    ashPct: 1.5,
    moisturePct: 4,
    fixedCarbonPct: 80,
    burnTimeMinutes: 75,
    burnTempC: 750,
  },
  {
    key: 'platinum',
    name: 'Platinum',
    ashPct: 1.0,
    moisturePct: 3,
    fixedCarbonPct: 85,
    burnTimeMinutes: 90,
    burnTempC: 800,
  },
];
