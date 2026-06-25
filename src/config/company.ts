/**
 * Company — single source of truth for every company fact on this site.
 *
 * PT Coco Reina Global Charcoal Indonesia (brand: Mulia Charcoal).
 *
 * The factual values now live in JSON under `/src/data/` so they can be
 * edited from the Sveltia CMS at `/admin/`. This module imports those
 * JSON files, applies type-widening casts for values that may be
 * assigned non-default shapes in the future (`null` slots, empty
 * arrays, finite string unions), and re-exports the assembled
 * `company` object plus all helper functions.
 *
 * This is NOT a second copy of the data: the JSON files in `/src/data/` are
 * the single editable source, and this module only types and assembles them.
 * Treat the `.ts` + `.json` pair as one source of truth, not two.
 *
 * Editing options:
 *   • For editors: open `/admin/` in a browser, log in with GitHub,
 *     edit a field, click save. Sveltia commits the JSON change and
 *     CI rebuilds the site.
 *   • For developers: edit the JSON files directly in `/src/data/` and
 *     commit. The TypeScript types in this module enforce shape.
 *
 * No other file in this repository may hardcode any of these values —
 * components, pages, JSON-LD schema emitters, i18n files, MDX bodies,
 * and tests must import from this module.
 *
 * Values marked `TODO_PLACEHOLDER` are pending confirmation from the
 * business owner. Do NOT ship the site to production with a TODO still
 * in place for a publicly rendered field.
 */

import rawCompanyData from '../data/company.json';
import rawPeopleData from '../data/people.json';
import rawHolidaysData from '../data/holidays.json';
import rawHotelsData from '../data/hotels.json';
import rawTravelHubsData from '../data/travel-hubs.json';

// =======================================================================
// People — types
// =======================================================================

/**
 * Tags that drive where a `Person` row surfaces on the site. A single
 * person can carry multiple tags (e.g. owner + executive + contact-team).
 * Renderers filter `company.people` by tag using the helper getters
 * (`getOwner`, `getExecutives`, `getOperations`, `getContactTeam`,
 * `getDirector`, `getSales`).
 */
export type DisplayTag =
  | 'owner'
  | 'executive'
  | 'operations'
  | 'contact-team'
  | 'whatsapp-director'
  | 'whatsapp-sales';

/** Phone (landline / mobile) — NOT WhatsApp. Use `whatsapp` for that. */
export interface PhoneNumber {
  display: string;
  e164: string;
}

/**
 * WhatsApp routing for a Person. `e164Digits` is the bare digit form
 * required by `wa.me/<digits>` URLs (no `+`, no separators). `preset`
 * is the default click-to-chat message body for this person.
 */
export interface WhatsappContact {
  e164Digits: string;
  display: string;
  preset?: string;
}

/**
 * A named individual the site references — staff, owner, consultant.
 * Single source of truth for every team / executive / operations entry.
 */
export interface Person {
  name: string;
  role: string;
  bio?: string | null;
  email?: string | null;
  phone?: PhoneNumber | null;
  whatsapp?: WhatsappContact | null;
  linkedin?: string | null;
  photo?: string | null;
  languages?: string[];
  displayIn: DisplayTag[];
}

// =======================================================================
// Type-widening casts on the JSON imports.
//
// JSON imports come back with the narrowest possible TypeScript types
// (literal strings, `null` not `string | null`, `never[]` not `string[]`).
// Widen the slots that consumers expect to assume looser shapes — these
// are the fields most likely to receive real values in the future.
// =======================================================================

// =======================================================================
// Packaging contract — the full data shape behind the /packaging pillar
// (hub + five cluster pages). Defined explicitly (rather than inferred
// from JSON) so empty slots carry their future-fill types: pages render
// every field through graceful degradation (`hasFact()` gates), and the
// owner fills values in `/src/data/company.json` (or via Sveltia at
// /admin/) with zero page edits.
//
// Single-source notes (deviations from the build-prompt contract,
// deliberate — see docs/build-prompts/packaging/):
//   - editorial holds DATES only; author/reviewer names come from
//     `governance.*` (already the sitewide E-E-A-T source).
//   - containerLoad holds box COUNTS only; net kg per container reads
//     from `commercial.containerCapacity` (already defined there).
//   - pricing.priceBasis: '' falls back to `portOfLoadingLabel()` at
//     render so "FOB Semarang" is never duplicated.
// =======================================================================

export interface PackagingConfig {
  /** Standard component combinations; single source for the comparison
   *  table, KeyFactsBox, and the homepage OEM tier cards. Labels and
   *  "best for" prose live in i18n keyed by `id`. */
  configurations: Array<{
    id: string;
    components: string[];
    protectionLevel: 'high' | 'medium' | 'low' | string;
  }>;
  masterBox: {
    material: string;
    wallTypes: string[];
    outerDimsMm: string;
    /** NET charcoal per box, kg. */
    weightOptionsKg: number[];
    grossWeightKg: string | number;
    /** Representative example tied to the shared reference SKU. */
    holdsExample: string;
    printOptions: string[];
    printableFaces: string;
    whiteTopLinerAvailable: boolean | null;
    cartonStrength: { ect: string; burstKpa: string; fluteType: string; corrugateGsm: string | number };
    maxStackHeight: string;
    notes: string;
  };
  innerBox: {
    paperType: string;
    paperGsm: number;
    /** Base coating (matte/gloss aqueous) — distinct from lamination. */
    coating: string;
    boxStyles: string[];
    dimensionsMm: string;
    /** NET charcoal per inner box, kg. */
    weightOptionsKg: number[];
    grossWeightKg: string | number;
    holdsExample: string;
    /** Upgrades over the base coating: lamination / emboss / uv-spot / foil. */
    finishes: string[];
    notes: string;
  };
  primaryPlastic: {
    type: string;
    material: string;
    thicknessMicrons: number | null;
    sealType: string;
    printable: boolean;
    clearOrPrinted: string;
    /** NET charcoal per pack, grams. */
    weightOptionsG: number[];
    holdsExample: string;
    function: string;
    foilBarrier: boolean | null;
    notes: string;
  };
  /** Add-ons / branded consumables. `null` = unconfirmed → section omits. */
  ancillary: {
    stickers: boolean | null;
    stickers3d: boolean | null;
    qrStickers: boolean | null;
    hologramStickers: boolean | null;
    inserts: boolean | null;
    boxLabels: boolean | null;
    brandedTape: boolean | null;
    brandedSilicaGel: boolean | null;
    desiccantIncluded: boolean | null;
    containerDesiccant: boolean | null;
    strapping: boolean | null;
    edgeProtectors: boolean | null;
    pallets: boolean | null;
    palletType: string;
    ispm15: boolean | null;
    thermalBlanket: boolean | null;
    fscPaper: boolean | null;
  };
  customPrint: {
    moqUnits: string | number;
    /** Custom-print MOQ counts per printed design, not per container. */
    moqBasis: string;
    leadTimeAddDays: string | number;
    finishesAvailable: string[];
  };
  containerLoad: {
    masterBoxesPer20ft: string | number;
    masterBoxesPer20ftPalletized: string | number;
  };
  /** Markings printed on every export carton (neutral or branded). */
  compliance: {
    un1361Marking: boolean | null;
    dgLabels: boolean | null;
    countryOfOrigin: boolean | null;
    netWeightMark: boolean | null;
    batchLot: boolean | null;
  };
  retail: {
    available: boolean;
    /** Barcode/EAN is buyer-supplied, factory-printed — never issued here. */
    barcodeEanByBuyer: boolean;
    shelfReadyBox: boolean | null;
  };
  /** White-label / custom-print add-on prices ONLY. Never the charcoal
   *  per-ton price. Empty string → "Available on request" sitewide. */
  pricing: {
    currency: string;
    priceBasis: string;
    pricesLastUpdated: string;
    innerBoxPrintingPerKgUsd: string | number;
    laminationSurchargePerTonUsd: string | number;
    embossSurchargePerTonUsd: string | number;
    uvSpotSurchargePerTonUsd: string | number;
    foilSurchargePerTonUsd: string | number;
    strappingPerTonUsd: string | number;
    labelPrintingPerTonUsd: string | number;
    doubleWallMasterBoxSurchargePerTonUsd: string | number;
    plasticPrintingPerKgUsd: string | number;
  };
  /** Dates only — author/reviewer names come from `governance.*`. */
  editorial: { datePublished: string; dateModified: string };
  branding: {
    neutralAvailable: boolean;
    whiteLabelAvailable: boolean;
    neutralScope: string;
    artworkFormats: string[];
    colorMode: string;
    pantoneSpot: boolean | null;
    bleedSafeArea: string;
    prepressBy: string;
    customSizesAvailable: boolean | null;
    foodSafeInks: boolean | null;
    foodSafeInksCert: string;
    artworkOnFileForReorder: boolean | null;
  };
  proofing: {
    digitalProof: boolean;
    physicalSample: boolean;
    proofLeadTimeDays: number;
    sampleLeadTimeDays: number | null;
    sampleCost: string | number;
    sampleCreditedToOrder: boolean | null;
  };
  whiteLabel: {
    designByBuyer: boolean;
    dielineProvided: boolean;
    ndaAvailable: boolean;
    designExclusive: boolean;
    territoryExclusivityNegotiable: boolean;
    platesKeptForReorder: boolean | null;
    singleContainerOk: boolean;
    printMethod: string;
    printingEquipment: string;
    colorCapability: string;
    brandableSurfaces: string[];
    brandsProducedCount: string;
  };
  media: {
    /** One slot per packaging area. Empty `youtubeId` → slot omitted. */
    videos: Array<{
      id: string;
      youtubeId: string;
      posterAsset: string;
      uploadDate: string;
      durationISO: string;
    }>;
  };
}

// =======================================================================
// Logistics cocoon contract (v3.3)
//
// Single-source reuse (deliberate — facts that already live elsewhere are
// NOT restated here; pages read the canonical home):
//   - port of loading, UN/LOCODE, alternates ........ commercial.portOfLoading
//   - transit rows (destPort/unlocode/country/days) .. commercial.transitTimes
//   - 20ft/40ft net tonnage .......................... commercial.containerCapacity
//   - default Incoterm ............................... commercial.portOfLoading.incoterm
//   - production lead time ........................... commercial.leadTime
//   - international HS-6 heading ...................... commercial.hsCode
//   - UN number / IMDG class / class description ..... certifications.imdg
//   - author / reviewer / fact-checker (E-E-A-T) ..... governance.*
//   - thermal blanket / container desiccant .......... packaging.ancillary
// `logistics` therefore holds ONLY the facts that have no other home:
// the SP-978 dangerous-goods reframe, the export-document set, the US
// import/duty/FDA stack, the COO regime, insurance & cargo-protection
// posture, the freight surcharge stack, and the editorial dates.
// Every gated regulatory field carries provenance in `dg.sourceUrls` /
// `*.sourceUrl` + a `lastVerified` date. Empty string / null / [] →
// graceful degrade via hasFact() (row drops, "—", "on request").
// =======================================================================
/** Published import-to-{country} pages. Keys are the dynamic-route slugs in
 *  camelCase (slug `import-to-saudi-arabia` → `saudiArabia`). Adding a country
 *  later is data-only: one object in `logistics.imports` + one i18n namespace,
 *  no new page code (the route is `import-to-[country].astro`). */
export type ImportCountryKey = 'usa' | 'uk' | 'germany' | 'saudiArabia' | 'russia';

/** One country's import mechanics. Every regulatory cell carries a sourceUrl +
 *  asOf and degrades via hasFact(); `vat` / `preference` are null on pages that
 *  lack them (USA). The USA `fda` block generalises to `countryAgency` — item
 *  label+value are regulatory data (with provenance); the section heading,
 *  intro and disclaimer are prose in the per-country i18n namespace. */
export interface ImportCountry {
  /** Exact `commercial.transitTimes[].country` string — drives the Ports filter. */
  country: string;
  htsCandidates: Array<{ code: string; sourceUrl: string; note: string }>;
  htsNotes: string;
  dutyLayers: Array<{
    id: string;
    label: string;
    rate: string;
    basis: string;
    sourceUrl: string;
    asOf: string;
    legalStatus?: string;
  }>;
  /** Import VAT / equivalent — the dated layer the USA page lacks. null → omits. */
  vat: { name: string; ratePct: string; recoverableNote: string; asOf: string; sourceUrl: string } | null;
  /** Indonesia-origin preference note (DCTS / GSP / EAEU / GCC). null → omits. */
  preference: { note: string; originDoc: string; sourceUrl: string } | null;
  dutyHistory: string;
  adcvd: string;
  /** Entry/clearance steps keyed by the i18n `entry.steps[].field`. */
  entryNotes: Record<string, string>;
  entrySourceUrl: string;
  /** Generalised country-agency section (USA FDA → generic). */
  countryAgency: { items: Array<{ label: string; value: string; sourceUrl: string }> };
  lastVerified: string;
}

export interface LogisticsConfig {
  // — operational (port/transit/containers reuse commercial.*) —
  truckingFactoryToPortHours: string | number;
  vesselBookingLeadDays: string | number;
  departureDays: string[];
  transshipmentVia: string[];
  /** hq40Available + per-shape note; tonnage derives from commercial.containerCapacity. */
  containers: { hq40Available: boolean | null; perShapeYieldNote: string };
  lcl: { available: boolean | null; marketsServed: string[]; minTons: string | number };
  /** Incoterms offered; default reads commercial.portOfLoading.incoterm. No CIF (v3.3). */
  incoterms: string[];
  /** Reserved structured breakdown; pages render commercial.paymentTerms prose. */
  payment: { methods: string[]; currencies: string[]; downPaymentPct: string | number; balanceTrigger: string };

  // — DG (SP 978 reframe); UN number / class read from certifications.imdg —
  dg: {
    shippedAsUn1361: boolean;
    packingGroup: string; // VERIFIED — render it
    properShippingName: string;
    ems: string; // render only if verified
    shtProvided: boolean; // supporting evidence, NOT an exemption
    dgFreightNote: string;
    compliantSince: string; // "compliant before mandatory" renders only if < 2026-01-01
    carriersAudited: string[]; // drives shipping-lines; degrades if empty (no invented names)
    carriersNotAccepting: string[];
    amendment: string;
    voluntaryFrom: string;
    mandatoryFrom: string;
    labellingGrace: string;
    sp925Withdrawn: boolean | null;
    sp223Withdrawn: boolean | null;
    sp979scope: string;
    rationale: string;
    carrierEnforcementNote: string;
    sht: { onRequest: boolean | null; cost: string; processingTime: string; note: string };
    sp978: {
      weatheringMethod: string;
      packingTempMaxC: string | number;
      packingTempLogged: boolean | null;
      unPackagingMark: boolean | null;
      packingInstruction: string; // 'P002' — render only if verified
      headspaceCm: string | number;
      dgdFields: string[];
      n4Note: string;
      bulkProhibited: boolean | null;
      stowageNote: string;
    };
    sourceUrls: Record<string, string>;
    lastVerified: string;
  };

  transitTimesLastUpdated: string;
  customsClearanceByBuyer: boolean;
  brokerReferralAvailable: boolean | null;
  /** production20ft reads commercial.leadTime; production40ft is the only new value. */
  leadTimes: { production20ft: string | number; production40ft: string | number };
  samplesShipping: { couriers: string[]; paidBy: string };

  // — documents (build-blocking; empty list = STOP on /documents) —
  documentsStandard: Array<{ id: string; name: string; issuer: string; buyerUse: string; providedWhen: string }>;
  documentsAdditional: Array<{
    id: string;
    name: string;
    issuer: string;
    buyerUse: string;
    providedWhen: string;
    cost?: string;
    processingTime?: string;
  }>;
  docsDelivery: { originalsByCourier: boolean | null; scansFirst: boolean | null };

  // — rules —
  loading: { method: string; palletizedAvailable: boolean | null; mixedSizesPolicy: string };

  // — cargo protection & insurance (new node) —
  insurance: {
    arrangedBy: string; // 'buyer' — EXW/FOB/CFR include no seller cover; no CIF
    basis: string;
    coverage: string[]; // external perils ONLY
    exclusions: string[]; // includes self-heating / inherent vice — NEVER claim it is covered
    coverageNote: string;
    sumInsuredBasis: string;
    claimsNote: string;
  };
  cargoProtection: {
    desiccantsPerContainer: string | number;
    thermalLiner: boolean | null;
    boxesCleanedBeforeLoading: boolean | null;
    moistureNote: string;
    breakageNote: string;
  };

  // — COO / export side —
  coo: { issuer: string; regulation: string; types: string };
  export: { licensing: string };

  // — cost / freight layer stack —
  freight: {
    publishMode: 'inquiry' | 'indicative' | 'actual';
    illustrativeFobNote: string;
    surchargeStack: Array<{ id: string; label: string; range: string; asOf: string; note: string }>;
    lanes: Array<{
      originUnlocode: string;
      destPort: string;
      unlocode: string;
      country: string;
      oceanFreightRange: string;
      published: boolean;
      asOf: string;
    }>;
  };

  // — per-country import pages (every regulatory fact needs sourceUrl +
  //   lastVerified). USA migrated in from the former `usaImport`; UK / Germany
  //   / Saudi Arabia / Russia added by the import cocoon. Rendered by the
  //   dynamic route `src/pages/logistics/import-to-[country].astro`. —
  imports: Partial<Record<ImportCountryKey, ImportCountry>>;

  /** Dates only — author/reviewer names come from governance.*. */
  editorial: { datePublished: string; dateModified: string };
}

// =======================================================================
// Quality cocoon contract (v4.2) — hub + specifications-explained +
// testing-methods + certifications.
//
// Single-source reuse (deliberate — facts that already live elsewhere are
// NOT restated here; pages read the canonical home):
//   - held certifications (ISO 9001:2015 + auditors, Halal/MUI) .. certifications.*
//   - certification / COA document URLs ......................... legalDocuments[]
//   - UN number / IMDG class (SHT context) ...................... certifications.imdg
//   - author / reviewer / QC fact-checker (E-E-A-T) ............. governance.*
// `quality` therefore holds ONLY the facts with no other home: the factory
// spec RANGES, the three-tier ash grading rubric, the testing protocol
// (methods + lab attribution), the per-order reports list, and the
// testing-methods video. Empty string / null / [] → graceful degrade via
// hasFact() (row drops, "—"). Spec values render "typical"/"target" — the
// word "guaranteed" never appears (v4.2 §2). `density` empty → row omitted.
//
// `ashGradingFramework` is the factory's OWN self-attributed rubric (the
// three product grades by ash band) — NEVER framed as an external/ISO
// standard. `factoryBand` MUST agree with specs.ashContentPct.typical.
//
// Standards in `testing.*` are CHARCOAL-CORRECT and verified current against
// the issuing catalogs (iso.org / store.astm.org): ash + proximate analysis
// by ASTM D1762-84(2021) "Chemical Analysis of Wood Charcoal" (charcoal-
// specific — determines ash, volatile matter and moisture in one method, so
// `ashMethod` equals `proximateMethod` by design), calorific by ISO 18125:2017
// "Solid biofuels — Determination of calorific value" (bomb calorimeter). The
// former coal/coke values (ISO 1171 ash, ISO 1928 calorific) were the WRONG
// material class — solid mineral fuel, not biomass — do NOT reintroduce.
// `moistureMethod` is empty → renders generically (oven-dry method, no
// designation). thirdPartyLabs set → independent-testing framing is allowed;
// empty → in-house QC only.
// =======================================================================
export interface QualityConfig {
  /** Factory-wide spec RANGES — authoritative for the quality pillar.
   *  Per-SKU exact values are product data (Products cocoon, out of scope);
   *  SKU values must fall within these ranges. `max`/`min` are TARGET
   *  bounds (a stated aim), never a guarantee. */
  specs: {
    ashContentPct: { typical: string; max: string };
    fixedCarbonPct: { typical: string; min: string };
    moistureContentPct: { typical: string; max: string };
    volatileMatterPct: { typical: string; max: string };
    calorificValueKcalKg: { typical: string; min: string };
    burnTimeMinutes: { typical: string; min: string };
    /** Include unit in the value, or leave '' to omit the row. */
    density: string;
    ashColor: string;
    /** Composed with `binder` into ONE statement at render — never a row. */
    additives: string;
    binder: string;
  };
  specsLastUpdated: string;
  /** The factory's own evaluation rubric (self-attributed). Bands locked;
   *  labels + notes + factoryBand are owner-supplied. */
  ashGradingFramework: {
    tiers: Array<{ grade: string; rangePct: string; note: string }>;
    factoryBand: string;
  };
  testing: {
    /** Only a CONFIRMED + verified-current standard string; else '' → generic. */
    ashMethod: string;
    calorificMethod: string;
    moistureMethod: string;
    proximateMethod: string;
    inHouseLab: boolean | null;
    /** Third-party labs; empty → all independent/named-lab framing suppressed. */
    thirdPartyLabs: string[];
    thirdPartyScope: string[];
    thirdPartyFrequency: string;
  };
  /** Reports PROVIDED per order — DISTINCT from held certs; a third-party
   *  entry renders only if testing.thirdPartyLabs is set. `documentRef`
   *  keys into legalDocuments[] (single source for the file URL). */
  testReportsProvided: Array<{
    id: string;
    name: string;
    issuer: string;
    perOrder: boolean;
    documentRef?: string;
  }>;
  /** Burn/ash-test video → VideoObject canonical on testing-methods.
   *  Empty youtubeId → node + facade omit cleanly (valid-or-omit). */
  testingVideo: {
    youtubeId: string;
    name: string;
    description: string;
    durationISO: string;
    uploadDate: string;
  };
  /** CTA hook: request a sample to test the specs. */
  sampleToVerify: boolean;
  /** Dates only — author/reviewer names come from governance.*. */
  editorial: { datePublished: string; dateModified: string };
}

// =======================================================================
// Factory pillar contract (/factory hub + 4 children).
//
// DRAFT NOTICE: processSteps, qcSteps, equipment, ovenType, the boolean
// gates, and the narrative strings (sourcingAshNarrative, ownerNote,
// laborStatement, ramadanLeadNote) were DRAFTED on 2026-06-19 from typical
// coconut-shell briquette manufacturing and MUST be verified by the owner
// before production. Empty string / false / [] → the gated block omits.
//
// Single-source reuse (NOT restated here — pages read the canonical home):
//   - export destinations ........ commercial.exportMarkets
//   - weathering window .......... production.weatheringDays
//   - oven count / batch / cycle . production.ovens
//   - team / people .............. people.json (company.people)
//   - ISO 9001 / Halal / labs .... certifications.* / quality.testing
// =======================================================================
export interface FactoryConfig {
  /** Dates only — author/reviewer names come from governance.*. */
  editorial: { datePublished: string; dateModified: string };
  /** Stepped how-it's-made; drives the HowTo on /production-process.
   *  `durationOrTemp` may carry a `{{weatheringDays}}` token (single-sourced
   *  from production.weatheringDays); '' renders no duration cell. */
  processSteps: Array<{ key: string; title: string; durationOrTemp: string; note: string }>;
  /** Our OWN named in-process QC framework (real stages; not a copied "8-step"). */
  qcSteps: Array<{ step: number; title: string; checks: string }>;
  /** Machinery list corroborating capacity. Kilns live in production.ovens. */
  equipment: Array<{ name: string; qty: number | string; spec: string }>;
  /** e.g. 'gas and electric' — gates the oven-type / temp-stability narrative. '' → omit. */
  ovenType: string;
  /** Reference sample retained per batch? gates the retention-sample block. */
  batchRetention: boolean;
  /** Produce to a buyer performance spec (ash/density/burn)? gates develop-to-spec. */
  developToSpec: boolean;
  /** Sign an NDA on client designs? gates the OEM-confidentiality block. */
  ndaAvailable: boolean;
  /** Region→ash narrative (typical language); may carry `{{sourcingRegion}}`. '' → omit. */
  sourcingAshNarrative: string;
  /** First-person owner pull-quote (production-framed). '' → omit. Full note canonical to /about. */
  ownerNote: string;
  /** Honest one-paragraph labor / environmental statement. '' → omit. */
  laborStatement: string;
  /** Advance-order / seasonal-surge guidance. '' → omit. */
  ramadanLeadNote: string;
}

// =======================================================================
// Buyer's Guide pillar contract (/guide hub + lead articles).
//
// Editorial DATES only — author/reviewer names come from governance.*.
// Cross-material / regulatory facts are EXTERNAL (guide-research-findings.md,
// cite-or-omit); coconut spec figures come from grades.ts. No literal spec
// numbers live here.
// =======================================================================
export interface GuideConfig {
  editorial: {
    hub: { datePublished: string; dateModified: string };
    coconutVsBambooVsWood: { datePublished: string; dateModified: string };
    howToChooseFactory: { datePublished: string; dateModified: string };
    howToStartBrand: { datePublished: string; dateModified: string };
    privateLabelOptions: { datePublished: string; dateModified: string };
    howToOrder: { datePublished: string; dateModified: string };
  };
}

const companyData = rawCompanyData as Omit<typeof rawCompanyData, 'packaging' | 'logistics' | 'quality' | 'samples' | 'factory' | 'guide'> & {
  packaging: PackagingConfig;
  logistics: LogisticsConfig;
  quality: QualityConfig;
  factory: FactoryConfig;
  guide: GuideConfig;
  social: Record<keyof typeof rawCompanyData.social, string | null>;
  production: typeof rawCompanyData.production & {
    carbonizationPlant: { city: string; region: string } | null;
  };
  commercial: typeof rawCompanyData.commercial & {
    shippingLines: string[];
    exportMarkets: string[];
    // Container payload by box type. `bulkKg` (loose, no inner box) is
    // pending a weigh-in, so it widens to `number | null`.
    containerCapacity: {
      ft20: { fullKg: number; bulkKg: number | null; palletizedKg: number | null };
      ft40: { fullKg: number; bulkKg: number | null };
    };
    // Single source for the volume-discount tier table. `maxTons: null`
    // marks the open-ended top bracket; `discountPercent: null` marks a
    // bracket whose rate is pending owner confirmation (rendered muted).
    volumeDiscountTiers: Array<{
      minTons: number;
      maxTons: number | null;
      discountPercent: number | null;
    }>;
    // Sub-container / trial entry point below the full-container MOQ.
    // `null` = full container only; samples are the entry point.
    trialMinimum: { tons: number; note: string } | null;
    // Customs commodity (HS) code for coconut shell charcoal — pending
    // confirmation, so widens to `string | null` (rendered muted until set).
    hsCode: string | null;
  };
  certifications: typeof rawCompanyData.certifications & {
    patents: Array<{ id: string; title: string }>;
    halal: { certified: boolean; body?: string } | null;
  };
  payment: typeof rawCompanyData.payment & {
    mode: 'public' | 'gated';
  };
  form: typeof rawCompanyData.form & {
    captcha: typeof rawCompanyData.form.captcha & {
      provider: 'web3forms-builtin' | 'hcaptcha' | 'none';
    };
  };
  bank: typeof rawCompanyData.bank & {
    iban: string | null;
  };
  phones: Array<{ label: string; display: string; e164: string }>;
  // Indicative per-destination courier costs for free samples. Every
  // `priceUsd` starts `null` ("Available on request") and widens here so
  // the owner can fill numbers in `/src/data/company.json` with no type
  // error. UN number / IMDG class are NOT restated under `samples` — the
  // /samples page reads them from `certifications.imdg` (single source).
  samples: Omit<typeof rawCompanyData.samples, 'indicativeCourierCostUsd'> & {
    indicativeCourierCostUsd: Array<{
      country: string;
      label: string;
      forWeightKg: number;
      priceUsd: number | null;
    }>;
  };
};

// The four list-of-objects JSON files are object-wrapped (e.g.
// `{ "people": [...] }`) so Sveltia's file-collection mode can edit
// them. Dereference the wrapper key here to keep `company.people`
// etc. as plain arrays for consumers.
const people = rawPeopleData.people as Person[];
const holidays = rawHolidaysData.holidays as Array<{ date: string; day: string; name: string }>;
const hotels = rawHotelsData.hotels;
const travelHubs = rawTravelHubsData.travelHubs;

// =======================================================================
// Assembled company object
// =======================================================================

export const company = {
  ...companyData,
  people,
  hotels,
  travelHubs,
  holidays2026: holidays,
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
 * @param body    Optional message body, URL-encoded into the `body` param.
 *                Used by the /samples dual-channel CTA to prefill a
 *                fill-in-the-blanks template (company / destination /
 *                shape(s) / quantity) so the buyer's reply carries the
 *                fields the WhatsApp path can't capture.
 * @returns       `mailto:export@muliacharcoal.com`, optionally with
 *                `?subject=…` and/or `&body=…`.
 *
 * @example
 *   <a href={mailto()}>Email us</a>
 *   <a href={mailto('Quote: 20ft container to Jeddah')}>Request a quote</a>
 *   <a href={mailto('Free sample request', 'Company:\nDestination:')}>…</a>
 */
export function mailto(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  // URLSearchParams encodes spaces as "+"; mail clients want %20 in the
  // body/subject, so normalise.
  const normalised = query.replace(/\+/g, '%20');
  return normalised ? `mailto:${company.email}?${normalised}` : `mailto:${company.email}`;
}

/**
 * Build a `mailto:` URL for the careers inbox.
 *
 * Routes job applications to the careers-only address so HR routing
 * stays independent of the wholesale-sales inbox. Used by the /careers
 * Apply buttons.
 *
 * @param subject Optional subject line, URL-encoded. The /careers page
 *                passes `"Application: <role title>"`.
 *
 * @example
 *   <a href={careersMailto('Application: Head of Production')}>Apply</a>
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
  return `${minDays}–${maxDays} days`;
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
 *   <a href={waLinkFor('directorIntro', getDirector()?.whatsapp?.e164Digits)}>…</a>
 */
export function waLinkFor(
  presetKey: keyof typeof company.whatsapp.presetMessages,
  e164Digits: string | undefined = company.whatsapp.e164Digits,
): string {
  const text = company.whatsapp.presetMessages[presetKey];
  const digits = e164Digits ?? company.whatsapp.e164Digits;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

// =======================================================================
// People — helper accessors
//
// Renderers should read people via these helpers, not by filtering
// `company.people` inline. A single source of "what does each tag mean"
// keeps drift impossible.
// =======================================================================

/** Filter the people roster by `displayIn` tag. */
export function getByDisplayTag(tag: DisplayTag): Person[] {
  return company.people.filter((p) => p.displayIn.includes(tag));
}

/** First person tagged with `tag`, or `undefined` if none exists. */
export function getOneByDisplayTag(tag: DisplayTag): Person | undefined {
  return company.people.find((p) => p.displayIn.includes(tag));
}

/** Registered owner. Exactly one person should carry the `'owner'` tag. */
export function getOwner(): Person | undefined {
  return getOneByDisplayTag('owner');
}

/** Director / consultant entries shown in the Footer + About Organization graph. */
export function getExecutives(): Person[] {
  return getByDisplayTag('executive');
}

/** Operations heads-of-department shown in /about Block 5. */
export function getOperations(): Person[] {
  return getByDisplayTag('operations');
}

/** Sales / export-desk members shown in /contact Block 4. */
export function getContactTeam(): Person[] {
  return getByDisplayTag('contact-team');
}

/** Person reachable via the director-intro WhatsApp preset. */
export function getDirector(): Person | undefined {
  return getOneByDisplayTag('whatsapp-director');
}

/** Person reachable via the sales-general WhatsApp preset. */
export function getSales(): Person | undefined {
  return getOneByDisplayTag('whatsapp-sales');
}

/**
 * Predicate: is this value a confirmed company fact (vs a placeholder)?
 *
 * Pages should gate render of any badge, sentence, or table row whose
 * underlying field is still a TODO. Returns `false` for `null`, empty
 * strings, the numeric sentinel `0`, empty arrays, and any string that
 * starts with `TODO_PLACEHOLDER`. Returns `true` otherwise.
 *
 * @example
 *   {hasFact(company.production.palmTreesCount) && <Badge ... />}
 */
export function hasFact(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') {
    if (value.length === 0) return false;
    if (value.startsWith('TODO_PLACEHOLDER')) return false;
    return true;
  }
  if (typeof value === 'number') return value !== 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value as object).length > 0;
  return Boolean(value);
}

/**
 * "08:00–16:00 (GMT+7)" — derived business-hours range used by Block 8
 * weekly-hours table. Returns the same time string for every working
 * day; days with `closed: true` should render "Closed" instead.
 */
export function businessHoursRange(): string {
  return '08:00–16:00 (GMT+7)';
}

// =======================================================================
// Types
// =======================================================================

export type Company = typeof company;
export type SocialPlatform = keyof typeof company.social;
export type PriorityMarket = (typeof company.priorityMarkets)[number];
export type Hotel = (typeof company.hotels)[number];
export type TravelHub = (typeof company.travelHubs)[number];
export type Holiday = (typeof company.holidays2026)[number];
export type WhatsappPresetKey = keyof typeof company.whatsapp.presetMessages;
// Person, DisplayTag, PhoneNumber, WhatsappContact are declared above.
