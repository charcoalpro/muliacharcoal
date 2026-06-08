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

/**
 * Indicative FOB price band for a grade, in USD per the quoted unit
 * (typically per kg or per ton — confirmed at quote time). Feeds the
 * `AggregateOffer` `lowPrice` / `highPrice` on the grade SKU page and the
 * visible "indicative, FOB Semarang, subject to confirmation" range.
 *
 * Unset today: pricing is quoted per enquiry, so the SKU page renders a
 * muted "pricing on request" placeholder and the `AggregateOffer` node is
 * omitted (gated on `hasFact(grade.fobRange)`) until the owner publishes a
 * band. Populate `low` / `high` here when confirmed.
 */
export interface FobRange {
  /** Floor ("from") price. */
  low: number;
  /** Optional ceiling. When set the page shows a low–high band; when omitted it shows "from {low}". */
  high?: number;
  currency: 'USD';
  /** Pricing unit the floor is quoted in (drives "from USD x / ton" vs "/ kg"). */
  unit: 'kg' | 'ton';
}

/**
 * Per-grade product video (B2B framing: ignition, burn consistency, low
 * smoke, minimal ash). Each grade carries its own video, so each grade
 * page emits its own `VideoObject`. Unset today → the SKU page renders a
 * poster-only placeholder facade and `videoObjectSchema()` returns null.
 */
export interface GradeVideo {
  /** YouTube ID; feeds the YouTubeLite facade + VideoObject contentUrl. */
  youtubeId: string;
  /** ISO-8601 duration (e.g. "PT2M30S"). */
  durationISO: string;
  /** ISO-8601 upload date ("YYYY-MM-DD"). */
  uploadDate: string;
  /** Optional poster path; falls back to the YouTube auto-thumbnail. */
  poster?: string;
}

/** One row of the burn-test "performance over time" staged table. */
export interface BurnTestStage {
  /** Stable kebab id + i18n key, e.g. "ready-10". */
  key: string;
  /** Surface temperature at this stage, °C. */
  tempC?: number;
  /** Remaining briquette weight at this stage, grams. */
  weightG?: number;
  /** Remaining briquette dimension at this stage, mm (shrinkage over time). */
  sizeMm?: number;
  /** Free-form appearance note (e.g. "edges greyed, core red"). */
  sizeNote?: string;
}

/**
 * Burn-test evidence for a grade: the six measured stages plus the three
 * required curves (temperature, weight, and size over 0–90 min). Unset today
 * → the SKU page renders the stage labels (prose, from i18n) with muted
 * metric cells and placeholder graphics until QC supplies the series.
 */
export interface BurnTest {
  stages: BurnTestStage[];
  /** Temperature curve samples, 0–90 min. */
  tempSeries: number[];
  /** Weight curve samples, 0–90 min. */
  weightSeries: number[];
  /** Size (dimension) curve samples, 0–90 min. */
  sizeSeries: number[];
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
  /**
   * Indicative FOB price band (USD). Unset today — the SKU page shows a
   * "pricing on request" placeholder and omits the `AggregateOffer` until
   * the owner publishes a band. See {@link FobRange}.
   */
  fobRange?: FobRange;
  /** Per-grade product video. Unset → poster placeholder. See {@link GradeVideo}. */
  video?: GradeVideo;
  /** Burn-test series + stage metrics. Unset → placeholder cells. See {@link BurnTest}. */
  burnTest?: BurnTest;
  /**
   * Drop-test videos proving transit durability (up to 2 — e.g. two drop
   * heights or angles). Unset → poster placeholders. See {@link GradeVideo}.
   */
  dropTestVideos?: GradeVideo[];
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
    fobRange: { low: 1450, currency: 'USD', unit: 'ton' },
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
    fobRange: { low: 1550, currency: 'USD', unit: 'ton' },
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
    fobRange: { low: 1650, currency: 'USD', unit: 'ton' },
  },
];
