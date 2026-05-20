/**
 * Single source of truth for all company facts.
 *
 * Per CLAUDE.md: "Do not hardcode company facts (name, address, contact,
 * MOQ, port, founding year) in any component, page, or content file. All
 * such values must be imported from /src/config/company.ts."
 *
 * Anything that is a *fact about the company* belongs here. Anything that
 * is a *translatable UI string* belongs in src/i18n/<lang>.json.
 *
 * Marketing prose that embeds facts (e.g. the long-form company description)
 * lives in i18n as a template with {token} placeholders that are substituted
 * from this object at render time — that keeps the prose translatable while
 * keeping the facts here.
 */

export const company = {
  /** Trading / brand name used in titles and headings. */
  name: 'Mulia Charcoal',

  /** Registered legal name. Used in legal documents and schema.org `legalName`. */
  legalName: 'PT Coco Reina Global Charcoal Indonesia',

  /** Short tagline; appears in the footer logo block and meta titles. */
  tagline: 'Coconut shell charcoal briquettes, factory-direct from Semarang',

  /**
   * Postal address. Maps directly onto schema.org PostalAddress.
   *
   * `streetAddress` is `street + locality` per the existing Org schema convention.
   */
  address: {
    street: 'Jl. Mayor Unus KM 1.5',
    locality: 'Mertoyudan',
    city: 'Magelang',
    region: 'Central Java',
    postalCode: '56172',
    country: 'Indonesia',
    /** ISO 3166-1 alpha-2. */
    countryCode: 'ID',
  },

  /** Inbound sales / exports email. */
  email: 'export@charcoal.pro',

  /** Display number with spacing as the user should read it. */
  phoneDisplay: '+62 821 287 68 545',

  /** E.164 with leading + for tel: links and schema.telephone. */
  phoneE164: '+6282128768545',

  /**
   * wa.me only accepts digits, no plus. Kept separate from phoneE164 so the
   * two never silently drift again (see audit finding #1).
   */
  whatsappE164: '6282128768545',

  whatsappDefaultMessage: 'Hello, I am interested in your coconut charcoal briquettes.',

  googleMapsUrl: 'https://maps.app.goo.gl/SAcfhq4ypCud6HqQA',

  /** Factory operating hours as a single rendered string. */
  hoursWeekdays: 'Monday – Saturday 08:00 – 16:00 (GMT+7)',
  hoursSunday: 'Sunday closed',
  timezone: 'GMT+7',

  /** Minimum order quantity in metric tons. */
  moqTons: 18,
  /** Container size that the MOQ fills. */
  moqContainer: '20ft container',

  /** FOB port of loading, formatted for the trust bar and product pages. */
  port: 'FOB Semarang, Indonesia',

  /** Production lead time. */
  leadTimeDays: { min: 14, max: 21 },

  /** Year the company was officially established. */
  foundedYear: 2018,

  /** Indonesian Company Registration (Nomor Induk Berusaha). */
  nib: '0220001680488',

  /** Indonesian National Tax ID (NPWP). */
  taxId: '94.608.951.3-524.000',

  /** Production capacity, metric tons per day. */
  capacityTonsPerDay: 12,

  /**
   * Executive team mentioned in the long-form company description.
   * Names + short qualifier; consumer formats the comma-separated list.
   */
  executives: [
    { name: 'Wilson Gosalim' },
    { name: 'Henry Gosalim' },
    { name: 'Gatot Wibowo' },
    { name: 'Greg Ryabtsev', qualifier: 'charcoal expert' },
  ],

  /** Certifications and accreditations. */
  certifications: [
    { name: 'ISO 9001:2015', auditedBy: ['Carsurin', 'Backjorindo laboratoires'] },
  ],

  /** schema.org sameAs URLs — social and external profiles. */
  socials: [] as string[],
} as const;

export type Company = typeof company;

/**
 * Convenience: derived strings that consumers were copy-pasting. Keep
 * derivations here so the substitution rule is in one place.
 */
export const companyDerived = {
  moqDisplay: `${company.moqTons} tons (one ${company.moqContainer})`,
  leadTimeDisplay: `${company.leadTimeDays.min}–${company.leadTimeDays.max} days`,
  fullAddress: `${company.address.street}, ${company.address.city}, ${company.address.region}, ${company.address.country}`,
  cityLine: `${company.address.locality}, ${company.address.city} ${company.address.postalCode}`,
  regionLine: `${company.address.region}, ${company.address.country}`,
  certificationsDisplay: company.certifications.map((c) => c.name).join(', '),
  certificationAudits: company.certifications
    .flatMap((c) => c.auditedBy ?? [])
    .join(' & '),
  executivesDisplay: company.executives
    .map((e, i, arr) => {
      const prefix = e.qualifier ? `${e.qualifier} ` : '';
      const isLast = i === arr.length - 1;
      const isSecondLast = i === arr.length - 2;
      const sep = isLast ? '' : isSecondLast ? ', and ' : ', ';
      return `${prefix}${e.name}${sep}`;
    })
    .join(''),
} as const;
