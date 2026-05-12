/**
 * Production capacity, sourcing, and certifications.
 */
export const production = {
  /** Daily throughput at full utilization. */
  capacityTonsPerDay: 12,
  /** ~25 working days × 12 t/day. */
  capacityTonsPerMonth: 300,
  /** Number of briquetting / extrusion lines installed. */
  lines: 4,
  /** Oven / kiln details for carbonization + drying. */
  ovens: {
    count: 8,
    capacityTonsPerBatch: 1.5,
    cycleHours: 24,
  },
  rawMaterial: 'Coconut shell charcoal (sourced from Java and Sumatra)',
  /** Floor area of the main briquetting facility, in m². 0 hides the claim. */
  factoryAreaSqm: 0,
  palmTreesCount: 0,
  sourcingVillages: 0,
  sourcingRegion: 'TODO_PLACEHOLDER_SOURCING_REGION',
  /** Optional carbonization plant operated upstream. Set to null if none. */
  carbonizationPlant: null as { city: string; region: string } | null,
} as const;

/**
 * Certifications and compliance — ISO, IMDG, halal, patents.
 */
export const certifications = {
  iso9001: {
    standard: 'ISO 9001:2015',
    shortName: 'ISO 9001',
    auditors: ['Carsurin', 'Backjorindo'],
  },
  /** IMDG Code classification for coconut charcoal at sea. Label via `imdgLabel()`. */
  imdg: {
    unNumber: 'UN 1361',
    class: '4.2',
    classDescription: 'spontaneous combustion',
  },
  /** Additional compliance evidence we issue with every shipment. */
  other: ['Self-Heating Test (SHT)', 'Preferential Certificate of Origin'],
  patents: [] as Array<{ id: string; title: string }>,
  halal: null as { certified: boolean; body?: string } | null,
} as const;
