/**
 * Company — single source of truth for every company fact on this site.
 *
 * PT Coco Reina Global Charcoal Indonesia (brand: Mulia Charcoal).
 *
 * Every piece of factual data about the company (legal name, registration
 * numbers, address, contact details, production specs, certifications,
 * personnel, banking) lives here. No other file in this repository may
 * hardcode any of these values — components, pages, JSON-LD schema
 * emitters, i18n files, MDX bodies, and tests must import from this
 * module.
 *
 * Update a value here and every consumer automatically inherits the new
 * value on the next build. See CLAUDE.md § "Things to Never Do" for the
 * enforcing rule.
 *
 * Values marked `TODO` are placeholders pending confirmation from the
 * business owner. Do NOT ship the site to production with a TODO still
 * in place for a publicly rendered field.
 */

export const company = {
  // -----------------------------------------------------------------
  // Identity
  // -----------------------------------------------------------------
  legalName: 'PT Coco Reina Global Charcoal Indonesia',
  brand: 'Mulia Charcoal',
  tagline: 'Coconut shell charcoal briquettes, factory-direct from Semarang',
  foundingYear: 2018,

  // -----------------------------------------------------------------
  // Brand design tokens
  //
  // Visual identity values. Tailwind utility colors (brand-primary,
  // brand-primary-hover, brand-accent, brand-dark) derive from these
  // via tailwind.config.ts. The same values feed inline SVG fills
  // (Logo, favicon), the <meta name="theme-color"> hint, and the dev
  // swatch page. Change a value here and every surface updates on
  // the next build.
  // -----------------------------------------------------------------
  brandAssets: {
    colors: {
      // Deep forest green — primary CTAs, links, logo mark background.
      primary: '#0f3d2e',
      // Pressed / hover state for `primary`.
      primaryHover: '#0a2a1f',
      // Muted gold — accent text, premium signals, logo letterform.
      accent: '#c9a24b',
      // Near-black green — hero backgrounds, footer.
      dark: '#0a1f17',
    },
  },

  // -----------------------------------------------------------------
  // Web presence
  // -----------------------------------------------------------------
  domain: 'muliacharcoal.com',
  siteUrl: 'https://muliacharcoal.com',

  // -----------------------------------------------------------------
  // Indonesian business registration
  // -----------------------------------------------------------------
  registration: {
    // Nomor Induk Berusaha — Indonesian unified business registration number.
    nib: '0220001680488',
    // NPWP — Indonesian corporate tax identification number.
    taxId: '94.608.951.3-524.000',
  },

  // -----------------------------------------------------------------
  // Factory / mailing address
  // -----------------------------------------------------------------
  address: {
    street: 'Jl. Mayor Unus KM 1.5',
    district: 'Mertoyudan',
    city: 'Magelang',
    region: 'Central Java',
    postalCode: '56172',
    country: 'Indonesia',
    countryCode: 'ID',
    // Short one-liner for breadcrumbs, meta descriptions, etc.
    short: 'Magelang, Central Java, Indonesia',
    // Geographic coordinates for LocalBusiness schema.
    // TODO: confirm exact lat/lng from the factory GPS.
    latitude: -7.5389,
    longitude: 110.2192,
  },

  // Google Maps share link used on the Contact page and in the footer.
  googleMapsUrl: 'https://maps.app.goo.gl/SAcfhq4ypCud6HqQA',

  // -----------------------------------------------------------------
  // Contact channels
  // -----------------------------------------------------------------
  email: 'export@muliacharcoal.com',

  // Primary phone. `display` is the pretty form for humans;
  // `e164` is what the `tel:` scheme expects.
  phone: {
    display: '+62 821 287 68 545',
    e164: '+6282128768545',
  },

  // Additional phone numbers (sales lines, logistics desk).
  // Add entries as { label, display, e164 }. Kept empty until confirmed.
  phones: [
    // { label: 'Sales (EN)', display: '+62 ...', e164: '+62...' },
    // { label: 'Logistics',  display: '+62 ...', e164: '+62...' },
  ],

  // WhatsApp click-to-chat. `e164Digits` is the number with no "+" and no
  // separators — this is what wa.me URLs require.
  whatsapp: {
    e164Digits: '6282128768545', // TODO: confirm the production number before launch
    defaultMessage:
      'Hello, I am interested in your coconut charcoal briquettes.',
  },

  // -----------------------------------------------------------------
  // Working hours
  // -----------------------------------------------------------------
  hours: {
    timezone: 'Asia/Jakarta', // GMT+7, no DST
    weekdays: 'Monday – Saturday 08:00 – 16:00 (GMT+7)',
    sunday: 'Closed',
  },

  // -----------------------------------------------------------------
  // Social profiles
  //
  // Every slot is either a full `https://...` URL or `null` if the
  // profile does not yet exist. Keep keys even when null so consumers
  // can enumerate the list without worrying about missing keys.
  // -----------------------------------------------------------------
  social: {
    facebook: null, // TODO: add Facebook page URL
    instagram: null, // TODO: add Instagram profile URL
    linkedin: null, // TODO: add LinkedIn company page URL
  },

  // -----------------------------------------------------------------
  // Commercial terms (for buyers)
  //
  // Fields are the structured source; human-readable strings derive
  // from them via the helpers at the bottom of this file
  // (`moqLabel()`, `portOfLoadingLabel()`, `leadTimeLabel()`). Never
  // add a pre-baked label field here — the derived form cannot drift
  // from the numbers only when there is no denormalised copy to
  // forget to update.
  // -----------------------------------------------------------------
  commercial: {
    // Minimum Order Quantity.
    moq: {
      tons: 18,
      containers: 1,
      containerType: '20ft',
    },
    // Port of loading for all FOB shipments.
    portOfLoading: {
      name: 'Semarang',
      country: 'Indonesia',
      unLocode: 'IDSRG',
      incoterm: 'FOB',
    },
    // Production lead time from deposit to ready-to-ship.
    leadTime: {
      minDays: 14,
      maxDays: 21,
    },
    // Default quote currency (USD). German market page may show EUR.
    currency: 'USD',
    // Acceptable payment terms — TODO: confirm with finance.
    paymentTerms: '30% T/T deposit, 70% against B/L copy',
  },

  // -----------------------------------------------------------------
  // Production facts
  // -----------------------------------------------------------------
  production: {
    // Daily throughput at full utilization.
    capacityTonsPerDay: 12,
    // ~25 working days × 12 t/day.
    capacityTonsPerMonth: 300,
    // Number of briquetting / extrusion lines installed.
    lines: 4, // TODO: confirm active line count
    // Oven / kiln details for carbonization + drying.
    ovens: {
      count: 8, // TODO: confirm installed oven count
      capacityTonsPerBatch: 1.5, // TODO: confirm per-oven batch capacity in tons
      cycleHours: 24, // TODO: confirm full cycle time per oven
    },
    // Primary raw material.
    rawMaterial: 'Coconut shell charcoal (sourced from Java and Sumatra)',
  },

  // -----------------------------------------------------------------
  // People
  // -----------------------------------------------------------------
  people: {
    // Registered owner of the company.
    owner: {
      name: 'Wilson Gosalim',
      role: 'Owner',
    },
    // Executive / director team shown on /about and in About schema.
    executives: [
      { name: 'Wilson Gosalim', role: 'Director' },
      { name: 'Henry Gosalim', role: 'Director' },
      { name: 'Gatot Wibowo', role: 'Director' },
      {
        name: 'Greg Ryabtsev',
        role: 'Charcoal Expert / Consultant',
      },
    ],
  },

  // -----------------------------------------------------------------
  // Certifications and compliance
  // -----------------------------------------------------------------
  certifications: {
    iso9001: {
      standard: 'ISO 9001:2015',
      // Short form used for badges / taglines ("ISO 9001 Certified…").
      shortName: 'ISO 9001',
      auditors: ['Carsurin', 'Backjorindo'],
    },
    // IMDG Code classification for coconut charcoal at sea. Human-
    // readable label derived via `imdgLabel()` helper below.
    imdg: {
      unNumber: 'UN 1361',
      class: '4.2',
      // Description of what IMDG Class 4.2 means; part of the
      // structured data, not a cached sentence.
      classDescription: 'spontaneous combustion',
    },
    // Additional compliance evidence we issue with every shipment.
    other: [
      'Self-Heating Test (SHT)',
      'Preferential Certificate of Origin',
    ],
  },

  // -----------------------------------------------------------------
  // Legal / contract terms
  //
  // Drives the Terms & Conditions page (§ Governing Law & Disputes)
  // and any future contract template. Keeps jurisdiction and
  // arbitration facts in one place so a single change propagates
  // everywhere they are cited.
  // -----------------------------------------------------------------
  legal: {
    // Controlling law for all buyer/seller agreements.
    governingLaw: 'Republic of Indonesia',
    // Arbitration forum used when good-faith negotiation fails.
    arbitration: {
      institution: 'Indonesian National Board of Arbitration',
      // Short Indonesian acronym, commonly used in legal text.
      institutionShort: 'BANI',
      seat: 'Jakarta, Indonesia',
    },
  },

  // -----------------------------------------------------------------
  // Banking
  //
  // Not surfaced publicly. Used on proforma invoices generated off-site
  // and in the private /admin CMS views. Kept here so only one file
  // needs to change when banking details are updated.
  // -----------------------------------------------------------------
  bank: {
    accountName: 'PT Coco Reina Global Charcoal Indonesia',
    bankName: '', // TODO: confirm bank name (e.g. Bank Mandiri, BCA)
    branch: '', // TODO: confirm branch
    accountNumber: '', // TODO: confirm USD account number
    swiftCode: '', // TODO: confirm SWIFT / BIC
    currency: 'USD',
  },

  // -----------------------------------------------------------------
  // Priority target markets (in order of commercial importance).
  // Drives the rollout order for /markets/{country} pages and
  // translated language versions.
  // -----------------------------------------------------------------
  priorityMarkets: [
    'USA',
    'UK',
    'Saudi Arabia',
    'Germany',
    'Russia / CIS',
  ],

  // -----------------------------------------------------------------
  // Web analytics. Both values are public — they appear verbatim in
  // the rendered HTML — so they live in source rather than env vars.
  // -----------------------------------------------------------------
  analytics: {
    gaId: 'G-CLNNLB616W',
    gscVerification: 'fKfTQ-h0XVRjQNoEERZWqchNnUs_6H48amhkgsDPGBA',
  },
} as const;

// =======================================================================
// Helpers
// =======================================================================

/**
 * Build a WhatsApp click-to-chat URL (wa.me).
 *
 * @param text Optional message body to pre-fill in the chat. Defaults to
 *             `company.whatsapp.defaultMessage`. The value is URI-encoded
 *             into the `text` query parameter.
 * @returns    An `https://wa.me/<digits>?text=...` URL safe for `href`.
 *
 * @example
 *   <a href={waLink()}>Chat on WhatsApp</a>
 *   <a href={waLink('Quote request for 22x50mm hexagonal cubes')}>…</a>
 */
export function waLink(text: string = company.whatsapp.defaultMessage): string {
  return `https://wa.me/${company.whatsapp.e164Digits}?text=${encodeURIComponent(text)}`;
}

/**
 * Build a `mailto:` URL for the primary company email.
 *
 * @param subject Optional subject line. URL-encoded into the query string.
 *                When omitted the bare `mailto:` form is returned so the
 *                user's mail client does not prefill an empty subject.
 * @returns       `mailto:export@charcoal.pro` or
 *                `mailto:export@charcoal.pro?subject=…`.
 *
 * @example
 *   <a href={mailto()}>Email us</a>
 *   <a href={mailto('Quote: 20ft container to Jeddah')}>Request a quote</a>
 */
export function mailto(subject?: string): string {
  if (!subject) return `mailto:${company.email}`;
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}`;
}

/**
 * Integer years the company has been in business.
 *
 * Called at build time (the site is statically rendered by Astro), so the
 * value is frozen into the HTML on each deploy and refreshes automatically
 * on the next build.
 *
 * @param now Override the "current" date for deterministic tests.
 * @returns   Whole-number years since `company.foundingYear`.
 *
 * @example
 *   `${yearsInBusiness()} years exporting coconut charcoal`
 */
export function yearsInBusiness(now: Date = new Date()): number {
  return now.getFullYear() - company.foundingYear;
}

// -----------------------------------------------------------------------
// Label derivations
//
// Human-readable strings computed from structured fields above. Never
// cache these back into the config object — the whole point is that
// changing a number (e.g. `moq.tons`) automatically reflows every
// rendered label.
// -----------------------------------------------------------------------

/**
 * "18 tons (one 20ft container)" — MOQ as a single phrase.
 *
 * Singular containers read as "one" per export-trade convention;
 * plural containers read as a numeral.
 */
export function moqLabel(): string {
  const { tons, containers, containerType } = company.commercial.moq;
  const count = containers === 1 ? 'one' : String(containers);
  const plural = containers === 1 ? '' : 's';
  return `${tons} tons (${count} ${containerType} container${plural})`;
}

/**
 * "FOB Semarang, Indonesia" — port of loading with Incoterm prefix.
 */
export function portOfLoadingLabel(): string {
  const { incoterm, name, country } = company.commercial.portOfLoading;
  return `${incoterm} ${name}, ${country}`;
}

/**
 * "14–21 days" — lead-time range using an en-dash (U+2013), matching
 * Indonesian export-trade convention.
 */
export function leadTimeLabel(): string {
  const { minDays, maxDays } = company.commercial.leadTime;
  return `${minDays}\u2013${maxDays} days`;
}

/**
 * "IMDG Code UN 1361 Class 4.2 (spontaneous combustion)" — maritime
 * dangerous-goods classification phrased for buyers.
 */
export function imdgLabel(): string {
  const { unNumber, class: unClass, classDescription } = company.certifications.imdg;
  return `IMDG Code ${unNumber} Class ${unClass} (${classDescription})`;
}

// =======================================================================
// Types
// =======================================================================

export type Company = typeof company;
export type Executive = (typeof company.people.executives)[number];
export type SocialPlatform = keyof typeof company.social;
export type PriorityMarket = (typeof company.priorityMarkets)[number];
