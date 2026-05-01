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
  //
  // City + region confirmed (Semarang, Central Java). Street, district,
  // postal code, and exact lat/lng pending confirmation — see the
  // pre-launch checklist at the bottom of this file. Lat/lng currently
  // resolve to central Semarang so the Contact-page map renders.
  // -----------------------------------------------------------------
  address: {
    street: 'TODO_PLACEHOLDER_FACTORY_STREET',
    district: 'TODO_PLACEHOLDER_DISTRICT',
    city: 'Semarang',
    region: 'Central Java',
    postalCode: 'TODO_PLACEHOLDER_POSTAL_CODE',
    country: 'Indonesia',
    countryCode: 'ID',
    short: 'Semarang, Central Java, Indonesia',
    // Central Semarang fallback so the embedded map renders — replace
    // with exact factory GPS before launch.
    latitude: -6.9667,
    longitude: 110.4167,
  },

  // Google Maps share link used on the Contact page and in the footer.
  googleMapsUrl: 'https://maps.app.goo.gl/SAcfhq4ypCud6HqQA',

  // -----------------------------------------------------------------
  // Contact channels
  // -----------------------------------------------------------------
  email: 'export@muliacharcoal.com',

  // Careers / hiring inbox. All applications go here; never used as a
  // generic support address. Surfaced on /careers and in JobPosting
  // JSON-LD. Keep separate from `email` so HR routing stays independent
  // of the wholesale-sales inbox.
  careersEmail: 'career@muliacharcoal.com',

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
  // separators — this is what wa.me URLs require. The top-level number is
  // the primary one used by the floating site-wide WhatsApp button. The
  // `sales` and `director` sub-objects are used by the Contact page for
  // separate outreach paths.
  whatsapp: {
    e164Digits: '6282128768545', // TODO: confirm the production number before launch
    defaultMessage:
      'Hello, I am interested in your coconut charcoal briquettes.',

    // Director — Wilson Gosalim (owner + director). The site's primary
    // line currently rings the director; if a dedicated sales line is
    // commissioned, replace `sales.e164Digits` and `sales.display` and
    // optionally split the director onto a new number.
    director: {
      name: 'Wilson Gosalim',
      role: 'Director',
      e164Digits: '6282128768545',
      display: '+62 821 287 68 545',
    },

    // Sales — TODO_PLACEHOLDER until a dedicated sales rep is confirmed.
    sales: {
      name: 'TODO_PLACEHOLDER_SALES_REP',
      role: 'Sales Manager',
      e164Digits: '6280000000001',
      display: '+62 800 0000 0001',
    },

    // Pre-filled message bodies keyed by CTA context. Use waLinkFor()
    // to build URLs from these — never duplicate the strings inline.
    presetMessages: {
      heroCta:
        'Hello PT Coco Reina — I would like to request a wholesale quote for coconut shisha charcoal briquettes. Could you share your price list and MOQ details?',
      salesGeneral:
        'Hello, I am a wholesale buyer interested in your coconut shisha charcoal briquettes. Please share specifications, pricing, and lead time.',
      directorIntro:
        'Hello Mr. Gosalim — I would like to discuss a wholesale order of coconut shisha charcoal directly with you.',
      videoCallRequest:
        'Hello, I would like to schedule a WhatsApp video call to see your factory and discuss a wholesale order. What times work for you in GMT+7?',
      piRequest:
        'Hello, I would like to request a Proforma Invoice for coconut shisha charcoal briquettes. Please share your bank details and payment terms after KYC.',
      sampleRequest:
        'Hello, I would like to request a paid sample of your coconut shisha charcoal briquettes shipped to my address. Please confirm sample fee and shipping cost.',
    },
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
  // Sales team — Contact page Block 4.
  //
  // Each entry renders as a TeamCard with WhatsApp / phone / email
  // buttons. Photos are rendered as <ImagePlaceholder> for v1 — no
  // real photos required. Replace TODO_PLACEHOLDER entries with real
  // staff before launch (or trim the array to live members only).
  // -----------------------------------------------------------------
  team: [
    {
      name: 'Wilson Gosalim',
      role: 'Director',
      languages: ['English', 'Bahasa Indonesia'],
      photo: '/team/wilson-gosalim.jpg', // TODO: real photo asset
      email: 'wilson@muliacharcoal.com', // TODO: confirm direct email
      phoneE164: '+6282128768545',
      phoneDisplay: '+62 821 287 68 545',
      whatsappE164Digits: '6282128768545',
      whatsappPreset:
        'Hello Mr. Gosalim — I am a wholesale buyer interested in your coconut shisha charcoal. Could we discuss specifications and pricing?',
    },
    {
      name: 'TODO_PLACEHOLDER_SALES_MANAGER',
      role: 'Sales Manager',
      languages: ['English', 'Mandarin', 'Bahasa Indonesia'],
      photo: '/team/sales-manager.jpg', // TODO: real photo asset
      email: 'sales@muliacharcoal.com', // TODO: confirm
      phoneE164: '+6280000000002',
      phoneDisplay: '+62 800 0000 0002',
      whatsappE164Digits: '6280000000002',
      whatsappPreset:
        'Hello, I am interested in placing a wholesale order for coconut shisha charcoal. Please share your latest price list and MOQ.',
    },
    {
      name: 'TODO_PLACEHOLDER_EXPORT_COORDINATOR',
      role: 'Export Coordinator',
      languages: ['English', 'Bahasa Indonesia', 'Arabic'],
      photo: '/team/export-coordinator.jpg', // TODO: real photo asset
      email: 'export.ops@muliacharcoal.com', // TODO: confirm
      phoneE164: '+6280000000003',
      phoneDisplay: '+62 800 0000 0003',
      whatsappE164Digits: '6280000000003',
      whatsappPreset:
        'Hello, I have a question about export documentation and shipping for your coconut shisha charcoal. Could you assist?',
    },
  ],

  // -----------------------------------------------------------------
  // Alternate contact channels — Contact page Block 5.
  //
  // Each card renders only when its handle is set. v1 seeds every
  // channel with TODO_PLACEHOLDER values per the agreed rollout
  // strategy; channels with no real handle should be set to `null`
  // before launch so their cards are hidden.
  // -----------------------------------------------------------------
  channels: {
    wechat: {
      id: 'TODO_PLACEHOLDER_WECHAT_ID',
      qrImage: null, // path under /public when a QR PNG is added
    },
    telegram: {
      handle: '@TODO_PLACEHOLDER_TG',
      url: 'https://t.me/TODO_PLACEHOLDER_TG',
    },
    messenger: {
      handle: 'TODO_PLACEHOLDER_FB',
      url: 'https://m.me/TODO_PLACEHOLDER_FB',
    },
    botim: '+6280000000010', // TODO: confirm Botim number (E.164)
    max: 'TODO_PLACEHOLDER_MAX_HANDLE',
    line: 'TODO_PLACEHOLDER_LINE_ID',
    viber: '+6280000000011', // TODO: confirm Viber number (E.164)
    zoom: {
      schedulingUrl: 'TODO_PLACEHOLDER_ZOOM_SCHEDULING_URL',
    },
    // Subject line for the "Schedule a video meeting" mailto fallback.
    videoCallEmailSubject: 'Schedule a video meeting',
  },

  // -----------------------------------------------------------------
  // Indonesian 2026 public holidays — Contact page Block 8.
  //
  // Source: anticipated SKB 3 Menteri 2026. Flagged as TODO until the
  // official decree is published and confirmed.
  // -----------------------------------------------------------------
  holidays2026: [
    { date: '2026-01-01', day: 'Thursday',  name: "New Year's Day" },
    { date: '2026-01-29', day: 'Thursday',  name: 'Isra Mi’raj' },
    { date: '2026-02-17', day: 'Tuesday',   name: 'Chinese New Year (Imlek)' },
    { date: '2026-03-19', day: 'Thursday',  name: 'Hindu Day of Silence (Nyepi)' },
    { date: '2026-03-21', day: 'Saturday',  name: 'Idul Fitri (day 1)' },
    { date: '2026-03-22', day: 'Sunday',    name: 'Idul Fitri (day 2)' },
    { date: '2026-04-03', day: 'Friday',    name: 'Good Friday' },
    { date: '2026-05-01', day: 'Friday',    name: 'Labour Day' },
    { date: '2026-05-14', day: 'Thursday',  name: 'Ascension Day' },
    { date: '2026-05-27', day: 'Wednesday', name: 'Idul Adha' },
    { date: '2026-05-31', day: 'Sunday',    name: 'Vesak Day (Waisak)' },
    { date: '2026-06-01', day: 'Monday',    name: 'Pancasila Day' },
    { date: '2026-06-17', day: 'Wednesday', name: 'Islamic New Year' },
    { date: '2026-08-17', day: 'Monday',    name: 'Independence Day' },
    { date: '2026-08-26', day: 'Wednesday', name: "Prophet's Birthday" },
    { date: '2026-12-25', day: 'Friday',    name: 'Christmas Day' },
  ],

  // -----------------------------------------------------------------
  // Lebaran (Idul Fitri) factory shutdown — Contact page Block 8.
  // Dates approximate until confirmed by management.
  // -----------------------------------------------------------------
  lebaranShutdown: {
    from: '2026-03-21', // TODO: confirm exact 2026 Lebaran start
    to: '2026-03-27', // TODO: confirm exact 2026 Lebaran end
    orderCutoff: '2026-03-15', // TODO: confirm order cutoff for pre-Lebaran shipping
  },

  // -----------------------------------------------------------------
  // Recommended hotels for buyer visits — Contact page Block 10.
  //
  // Tiered by star rating. Block 10 hides any tier with zero entries.
  // All entries are TODO_PLACEHOLDER for v1 — replace with real
  // recommendations before launch.
  // -----------------------------------------------------------------
  hotels: [
    {
      name: 'TODO_PLACEHOLDER_GRAND_HOTEL_SEMARANG',
      stars: 5,
      distanceKm: 8,
      driveTimeMinutes: 20,
      description:
        'Premium five-star hotel near downtown Semarang with executive lounge and airport shuttle.',
      website: 'https://example.com/grand-hotel-semarang', // TODO
      mapsUrl: 'https://maps.google.com/?q=TODO_PLACEHOLDER_HOTEL_5_STAR_A', // TODO
    },
    {
      name: 'TODO_PLACEHOLDER_LUXE_TOWER_SEMARANG',
      stars: 5,
      distanceKm: 10,
      driveTimeMinutes: 25,
      description:
        'Five-star city tower with rooftop dining and conference facilities suitable for buyer meetings.',
      website: 'https://example.com/luxe-tower-semarang', // TODO
      mapsUrl: 'https://maps.google.com/?q=TODO_PLACEHOLDER_HOTEL_5_STAR_B', // TODO
    },
    {
      name: 'TODO_PLACEHOLDER_BUSINESS_HOTEL_SEMARANG',
      stars: 4,
      distanceKm: 6,
      driveTimeMinutes: 15,
      description:
        'Four-star business hotel with reliable Wi-Fi, English-speaking staff, and walkable cafés.',
      website: 'https://example.com/business-hotel-semarang', // TODO
      mapsUrl: 'https://maps.google.com/?q=TODO_PLACEHOLDER_HOTEL_4_STAR_A', // TODO
    },
    {
      name: 'TODO_PLACEHOLDER_CITY_INN_SEMARANG',
      stars: 4,
      distanceKm: 9,
      driveTimeMinutes: 22,
      description:
        'Four-star inn with on-site restaurant and complimentary breakfast — popular with returning buyers.',
      website: 'https://example.com/city-inn-semarang', // TODO
      mapsUrl: 'https://maps.google.com/?q=TODO_PLACEHOLDER_HOTEL_4_STAR_B', // TODO
    },
    {
      name: 'TODO_PLACEHOLDER_BUDGET_LODGE_SEMARANG',
      stars: 3,
      distanceKm: 5,
      driveTimeMinutes: 12,
      description:
        'Three-star lodge close to the factory — clean rooms, basic amenities, friendly staff.',
      website: 'https://example.com/budget-lodge-semarang', // TODO
      mapsUrl: 'https://maps.google.com/?q=TODO_PLACEHOLDER_HOTEL_3_STAR_A', // TODO
    },
    {
      name: 'TODO_PLACEHOLDER_VALUE_INN_SEMARANG',
      stars: 3,
      distanceKm: 7,
      driveTimeMinutes: 18,
      description:
        'Three-star value inn with secure parking, suitable for short pre-shipment inspection trips.',
      website: 'https://example.com/value-inn-semarang', // TODO
      mapsUrl: 'https://maps.google.com/?q=TODO_PLACEHOLDER_HOTEL_3_STAR_B', // TODO
    },
  ],

  // -----------------------------------------------------------------
  // Travel hubs — Contact page Block 7.2.
  //
  // Distances and drive times are approximate; confirm with logistics
  // before launch.
  // -----------------------------------------------------------------
  travelHubs: [
    {
      from: 'Jakarta',
      distanceKm: 450,
      byCar: 'approx. 7 hours',
      byTrainCar: 'approx. 5h train + 30min car',
      notes: 'Argo Bromo Anggrek and Argo Sindoro express trains daily.',
    },
    {
      from: 'Yogyakarta',
      distanceKm: 130,
      byCar: 'approx. 3 hours',
      byTrainCar: 'approx. 2h train + 30min car',
      notes: 'Frequent Joglosemarkerto train service.',
    },
    {
      from: 'Surabaya',
      distanceKm: 350,
      byCar: 'approx. 6 hours',
      byTrainCar: 'approx. 4h train + 30min car',
      notes: 'Argo Bromo Anggrek westbound.',
    },
    {
      from: 'Semarang city centre',
      distanceKm: 8,
      byCar: 'approx. 20 minutes',
      notes: 'Standard taxi or ride-hail.',
    },
    {
      from: 'Semarang Ahmad Yani Airport (SRG)',
      distanceKm: 12,
      byCar: 'approx. 30 minutes',
      notes:
        'Free buyer pickup available — request in advance via WhatsApp.',
    },
    {
      from: 'Yogyakarta Adisutjipto Airport (YIA)',
      distanceKm: 140,
      byCar: 'approx. 3 hours',
      byTrainCar: 'approx. 2h train + 30min car',
      notes:
        'Free buyer pickup available — request in advance via WhatsApp.',
    },
  ],

  // -----------------------------------------------------------------
  // Inquiry form — Contact page Block 6.
  //
  // The form posts to Web3Forms (https://api.web3forms.com/submit).
  // The access key is public per Web3Forms documentation but must be
  // set before the form will accept submissions in production.
  // -----------------------------------------------------------------
  form: {
    web3formsEndpoint: 'https://api.web3forms.com/submit',
    web3formsKey: 'TODO_PLACEHOLDER_WEB3FORMS_ACCESS_KEY',
    captcha: {
      // 'web3forms-builtin' uses Web3Forms' own honeypot + light spam
      // filtering (default and lowest-friction). 'hcaptcha' adds an
      // hCaptcha widget. 'none' disables captcha (honeypot only).
      provider: 'web3forms-builtin' as 'web3forms-builtin' | 'hcaptcha' | 'none',
      hcaptchaSiteKey: 'TODO_PLACEHOLDER_HCAPTCHA_SITE_KEY',
    },
    // Subject line included in the email Web3Forms sends to the
    // notification address.
    subject: 'New wholesale inquiry — muliacharcoal.com',
    // Volume options shown in the "Expected purchasing volume" select.
    volumeOptions: [
      '1 × 20ft container (approx. 18 tons)',
      '2 × 20ft containers (approx. 36 tons)',
      '1 × 40ft container (approx. 26 tons)',
      'Monthly contract (recurring)',
      'Trial / sample only',
    ],
  },

  // -----------------------------------------------------------------
  // Payment — Contact page Block 11.
  //
  // mode: 'public' renders the bank table with a fraud-warning callout.
  // mode: 'gated' hides bank details and shows a "Request Proforma
  // Invoice" CTA instead. Per current decision, mode is 'public'.
  // -----------------------------------------------------------------
  payment: {
    mode: 'public' as 'public' | 'gated',
    terms: ['T/T 30/70 (30% deposit, 70% against B/L copy)', 'L/C at sight'],
    currencies: ['USD'],
    bankCountry: 'Indonesia',
  },

  // -----------------------------------------------------------------
  // Banking
  //
  // Public on /contact when payment.mode === 'public'. Always excluded
  // from JSON-LD and meta tags. Treat every value below as part of the
  // pre-launch verification checklist — wiring instructions sent with
  // a fake bank are a fraud vector.
  // -----------------------------------------------------------------
  bank: {
    accountName: 'PT Coco Reina Global Charcoal Indonesia',
    bankName: 'TODO_PLACEHOLDER_BANK_NAME', // e.g. Bank Mandiri (Persero) Tbk
    branch: 'TODO_PLACEHOLDER_BRANCH',
    bankAddress: 'TODO_PLACEHOLDER_BANK_ADDRESS',
    accountNumber: 'TODO_PLACEHOLDER_ACCOUNT_NUMBER',
    swiftCode: 'TODO_PLACEHOLDER_SWIFT',
    iban: null as string | null,
    currency: 'USD',
    // ISO date — refresh whenever the director re-confirms the details
    // by phone/video call.
    lastVerified: '2026-04-25',
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
 * Build a `mailto:` URL for the careers / hiring inbox. Mirrors `mailto()`
 * but targets `company.careersEmail`. Used by /careers role-application
 * CTAs so the email-encoding rule lives in one place.
 *
 * @example
 *   <a href={careersMailto()}>Apply by email</a>
 *   <a href={careersMailto('Application: Head of Production')}>…</a>
 */
export function careersMailto(subject?: string): string {
  if (!subject) return `mailto:${company.careersEmail}`;
  return `mailto:${company.careersEmail}?subject=${encodeURIComponent(subject)}`;
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

/**
 * Build a WhatsApp click-to-chat URL using a preset message keyed by
 * context. Pass an explicit `e164Digits` to target a specific staff
 * member's number; otherwise the primary site number is used.
 *
 * @example
 *   <a href={waLinkFor('heroCta')}>WhatsApp us</a>
 *   <a href={waLinkFor('directorIntro', company.whatsapp.director.e164Digits)}>…</a>
 */
export function waLinkFor(
  presetKey: keyof typeof company.whatsapp.presetMessages,
  e164Digits: string = company.whatsapp.e164Digits,
): string {
  const text = company.whatsapp.presetMessages[presetKey];
  return `https://wa.me/${e164Digits}?text=${encodeURIComponent(text)}`;
}

/**
 * "08:00–16:00 (GMT+7)" — derived business-hours range used by Block 8
 * weekly-hours table. Returns the same time string for every working
 * day; days with `closed: true` should render "Closed" instead.
 */
export function businessHoursRange(): string {
  // Derived from the human-readable summary string in `company.hours.weekdays`.
  // Kept simple here because hours are uniform across working days; if hours
  // diverge per day in the future, replace with a structured per-day map.
  return '08:00–16:00 (GMT+7)';
}

// =======================================================================
// Types
// =======================================================================

export type Company = typeof company;
export type Executive = (typeof company.people.executives)[number];
export type SocialPlatform = keyof typeof company.social;
export type PriorityMarket = (typeof company.priorityMarkets)[number];
export type TeamMember = (typeof company.team)[number];
export type Hotel = (typeof company.hotels)[number];
export type TravelHub = (typeof company.travelHubs)[number];
export type Holiday = (typeof company.holidays2026)[number];
export type WhatsappPresetKey = keyof typeof company.whatsapp.presetMessages;

// =======================================================================
// Pre-launch replacement checklist
// =======================================================================
//
// Every TODO_PLACEHOLDER value below MUST be replaced before this site is
// deployed to production. Search the file for "TODO_PLACEHOLDER" to locate
// each one. The Contact page renders all of these publicly; shipping with
// placeholders is a trust- and fraud-risk.
//
//  [ ] address.street, address.district, address.postalCode
//  [ ] address.latitude / address.longitude (replace Semarang central
//      fallback with exact factory GPS)
//  [ ] whatsapp.sales.* (or remove the sales sub-object if Wilson handles
//      all WhatsApp inquiries)
//  [ ] team[1] (Sales Manager) and team[2] (Export Coordinator) — fill in
//      real names, roles, languages, photos, contact details, OR remove
//      the entries until real staff are confirmed
//  [ ] channels.wechat.id, channels.telegram, channels.messenger,
//      channels.botim, channels.max, channels.line, channels.viber,
//      channels.zoom.schedulingUrl — set to null/undefined any channel
//      that is not used so its card does not render
//  [ ] holidays2026 — re-verify against the official 2026 SKB 3 Menteri
//      decree once published
//  [ ] lebaranShutdown.from / .to / .orderCutoff — confirm with management
//  [ ] hotels — replace all TODO_PLACEHOLDER entries with real local
//      recommendations OR set hotels: [] to hide Block 10
//  [ ] travelHubs distance / drive-time figures — confirm with logistics
//  [ ] form.web3formsKey — paste the public Web3Forms access key
//  [ ] form.captcha.hcaptchaSiteKey — only required if provider switched
//      to 'hcaptcha'
//  [ ] bank.bankName / branch / bankAddress / accountNumber / swiftCode —
//      verify by phone/video call with the director, then update
//      bank.lastVerified to today's ISO date
//
// =======================================================================
