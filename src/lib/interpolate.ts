/**
 * Token interpolation utilities for binding `/src/config/company.ts` facts to
 * copy that lives in i18n JSON, content frontmatter, or Markdown prose.
 *
 * The convention: copy strings use `{{tokenName}}` placeholders (never the
 * literal fact value). At build time, `fill()` substitutes each placeholder
 * with the live value from the config. `companyTokens()` returns the
 * canonical dictionary used for every substitution site in the repo so the
 * token vocabulary stays consistent.
 *
 * See CLAUDE.md § "Things to Never Do" — every company fact must live in
 * `/src/config/company.ts` and only there. i18n / Markdown may carry labels
 * and prose but never the fact values themselves.
 */

// IMPORTANT: this import path MUST stay relative (`../config/company`),
// not the `~/config/company` alias used everywhere else in the codebase.
//
// Reason: `astro.config.ts` imports this module to register the remark
// plugin (`remarkCompanyTokens`). Vite's SSR loader evaluates `astro.config.ts`
// BEFORE the tsconfig path-alias resolver is wired up, so any `~/...`
// import here would crash the build with `Failed to resolve import "~/..."`.
//
// Do NOT "fix" this to match the rest of the codebase — `astro build`
// will fail on the first attempt. If a future Astro / Vite version
// resolves aliases for the config-file load path, this comment can go
// and the import can switch to `~/`. Until then, keep it relative.
import {
  imdgLabel,
  leadTimeLabel,
  moqLabel,
  portOfLoadingLabel,
  type Company,
  type Person,
} from '../config/company';

export type TokenValue = string | number;
export type Tokens = Record<string, TokenValue>;

/**
 * Replace every `{{name}}` occurrence in `template` with `tokens[name]`.
 * Unknown tokens are left in place (they render as `{{name}}` in the output)
 * so missing bindings are easy to spot during QA.
 */
export function fill(template: string, tokens: Tokens): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    tokens[key] !== undefined ? String(tokens[key]) : `{{${key}}}`,
  );
}

/**
 * Canonical token dictionary derived from the company config. Every template
 * in the codebase that needs a company fact must pull its values from here
 * (or extend this function) rather than reaching into `company.*` directly,
 * so the token vocabulary stays stable across files.
 *
 * The return type is intentionally inferred (no `: Tokens` annotation) so
 * TypeScript captures the literal key set. Export `CompanyTokens` (below)
 * to reference the canonical key vocabulary at a call site; referencing
 * an unknown key on the returned object then fails at type-check rather
 * than silently rendering `{{unknownKey}}` at runtime.
 */
export function companyTokens(company: Company) {
  const executives: Person[] = company.people.filter((p) =>
    p.displayIn.includes('executive'),
  );
  const directors = executives.filter((e) =>
    e.role.toLowerCase().includes('director'),
  );
  const experts = executives.filter(
    (e) => !e.role.toLowerCase().includes('director'),
  );
  const directorNames = directors.map((d) => d.name).join(', ');
  const expertPhrases = experts
    .map((e) => `${e.role.toLowerCase().split('/')[0].trim()} ${e.name}`)
    .join(', ');
  const executivesList = [directorNames, expertPhrases]
    .filter(Boolean)
    .join(', and ');

  const owner = company.people.find((p) => p.displayIn.includes('owner'));
  const shipping = company.commercial.shippingLines;
  const shippingLinesProse =
    shipping.length <= 1
      ? shipping.join('')
      : `${shipping.slice(0, -1).join(', ')} and ${shipping[shipping.length - 1]}`;

  const addressFull = [
    company.address.street,
    company.address.district,
    company.address.city,
    company.address.region,
    company.address.country,
  ]
    .filter(Boolean)
    .join(', ');

  return {
    // Identity
    legalName: company.legalName,
    brand: company.brand,
    domain: company.domain,
    siteUrl: company.siteUrl,
    year: company.foundingYear,
    // Registration
    nib: company.registration.nib,
    taxId: company.registration.taxId,
    // Address
    street: company.address.street,
    district: company.address.district,
    city: company.address.city,
    region: company.address.region,
    country: company.address.country,
    postalCode: company.address.postalCode,
    addressFull,
    // Contact
    email: company.email,
    phoneDisplay: company.phone.display,
    phoneE164: company.phone.e164,
    // WhatsApp `e164Digits` — the raw number (no "+", no separators)
    // required by `wa.me/<digits>` URLs. Use this when the link should
    // open a plain chat with no prefilled marketing text (e.g. legal
    // pages); use `waLink()` from `~/config/company` when a prefilled
    // subject is appropriate.
    whatsappDigits: company.whatsapp.e164Digits,
    // Commercial — label tokens derive from structured fields via the
    // helpers exported by `~/config/company`. Never cache a label back
    // into the config; drift-proofing is the whole point.
    moqTons: company.commercial.moq.tons,
    moqLabel: moqLabel(),
    containerType: company.commercial.moq.containerType,
    port: company.commercial.portOfLoading.name,
    portLabel: portOfLoadingLabel(),
    // Port full name / UN-LOCODE — promoted here from logisticsTokens() so
    // cross-cocoon pages (/faq, /, /glossary) can reference the official
    // port facts instead of hardcoding "Tanjung Emas"/"IDSRG" literals.
    portFullName: company.commercial.portOfLoading.fullName,
    portUnlocode: company.commercial.portOfLoading.unLocode,
    portWithCode: `${company.commercial.portOfLoading.name} (${company.commercial.portOfLoading.unLocode})`,
    // 20ft net payload, floor-loaded vs palletized (ISPM-15 pallets cut
    // capacity). Both derive from commercial.containerCapacity (SSoT).
    containerFloorTons: Math.round(company.commercial.containerCapacity.ft20.fullKg / 1000),
    containerPalletizedTons: company.commercial.containerCapacity.ft20.palletizedKg
      ? Math.round(company.commercial.containerCapacity.ft20.palletizedKg / 1000)
      : '',
    leadTimeLabel: leadTimeLabel(),
    shippingLines: company.commercial.shippingLines.join(' · '),
    // Prose-friendly form ("Maersk, MSC and CMA CGM") for running text; the
    // `·`-joined `shippingLines` above stays for labels/lists.
    shippingLinesProse,
    salesLanguages: company.commercial.salesLanguages.join(' · '),
    countriesExportedCount: company.commercial.countriesExportedCount,
    // Production
    capacity: company.production.capacityTonsPerDay,
    capacityMonth: company.production.capacityTonsPerMonth,
    productionLines: company.production.lines,
    ovenCount: company.production.ovens.count,
    ovenBatchTons: company.production.ovens.capacityTonsPerBatch,
    ovenCycleHours: company.production.ovens.cycleHours,
    shelfLifeMonths: company.production.shelfLifeMonths,
    facilityArea: company.production.factoryAreaSqm,
    headcount: company.production.headcount,
    timezone: company.hours.timezone.replace('Asia/Jakarta', 'GMT+7'),
    officeHours: company.hours.short,
    responseHours: company.hours.responseHours,
    // Lead time variants
    newBrandLeadTime: company.commercial.leadTime.newBrandDays,
    repeatBrandLeadTime: company.commercial.leadTime.repeatBrandDays,
    // Payment process text, used by the /faq Payment Terms answer.
    paymentTerms: company.commercial.paymentTerms,
    lcMinContainers: company.commercial.lcMinContainers,
    // Samples — used by /faq Samples answer.
    sampleWeightG: company.samples.freeWeightGrams,
    sampleTransitChannel: company.samples.transitChannel,
    sampleCarrier: company.samples.carrier,
    sampleTransitDays: company.samples.transitDays,
    // Lower-bound lead time used by the homepage CTA banner sub-headline
    // ("Production from {{leadTimeDays}} days").
    leadTimeDays: company.commercial.leadTime.repeatBrandDays,
    // Packaging — formatted size lists for use in i18n templates. Net
    // weights per layer come from the packaging contract (weightOptions*);
    // token names predate the contract migration and stay stable so no
    // i18n template changes.
    innerPlasticSizes: company.packaging.primaryPlastic.weightOptionsG
      .map((g) => (g >= 1000 ? `${g / 1000} kg` : `${g} g`))
      .join(' / '),
    innerBoxSizes: company.packaging.innerBox.weightOptionsKg
      .map((kg) => (kg >= 1 ? `${kg} kg` : `${kg * 1000} g`))
      .join(' / '),
    innerBoxGsm: company.packaging.innerBox.paperGsm,
    masterBoxSizes: company.packaging.masterBox.weightOptionsKg
      .map((kg) => `${kg} kg`)
      .join(' or '),
    masterBoxWallOptions: company.packaging.masterBox.wallTypes.join('- or '),
    acceptedArtworkFormats: company.packaging.branding.artworkFormats.join(' / '),
    proofTimeDays: company.packaging.proofing.proofLeadTimeDays,
    // Certifications
    iso9001Short: company.certifications.iso9001.shortName,
    isoStandard: company.certifications.iso9001.standard,
    auditors: company.certifications.iso9001.auditors.join(' & '),
    unNumber: company.certifications.imdg.unNumber,
    unClass: company.certifications.imdg.class,
    imdgClassDescription: company.certifications.imdg.classDescription,
    imdgLabel: imdgLabel(),
    specsLastVerified: company.certifications.specsLastVerified,
    // Legal / contract terms
    governingLaw: company.legal.governingLaw,
    arbitrationInstitution: company.legal.arbitration.institution,
    arbitrationInstitutionShort: company.legal.arbitration.institutionShort,
    arbitrationSeat: company.legal.arbitration.seat,
    // People
    executives: executivesList,
    // Owner/director name — single source is people.json (displayIn "owner").
    // Use this token in prose; never hardcode the name in i18n.
    owner: owner?.name ?? company.legalName,
  };
}

/**
 * Logistics-cocoon token dictionary. Adds the shipping/DG/customs scalars
 * the eight `/logistics` pages share, on top of `companyTokens()`. Reads
 * the canonical homes (commercial.* for port/transit/containers/hsCode,
 * certifications.imdg via companyTokens, logistics.* for the SP-978
 * reframe and document counts) so no fact is duplicated. Page-specific
 * computations (transit table, combined order→port total, duty stack)
 * stay inline on each page.
 */
export function logisticsTokens(company: Company) {
  const L = company.logistics;
  const pol = company.commercial.portOfLoading;
  const cc = company.commercial.containerCapacity;
  const toTons = (kg: number | null) => (kg ? `${Math.round(kg / 1000)} tons` : '');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const fmtDate = (iso: string) => {
    const [y, mo, d] = String(iso).split('-').map(Number);
    return y && mo && d ? `${d} ${months[mo - 1]} ${y}` : String(iso);
  };
  return {
    // portUnlocode / portFullName / portWithCode now live in companyTokens()
    // (every logistics page already spreads companyTokens, so they remain
    // available here without duplicating the derivation).
    incotermsList: L.incoterms.join(' / '),
    incotermDefault: pol.incoterm,
    net20ftTons: toTons(cc.ft20.fullKg),
    net40ftTons: toTons(cc.ft40.fullKg),
    packingGroup: L.dg.packingGroup,
    properShippingName: L.dg.properShippingName,
    dgAmendment: L.dg.amendment,
    dgMandatoryFrom: L.dg.mandatoryFrom,
    dgMandatoryYear: String(L.dg.mandatoryFrom).slice(0, 4),
    dgMandatoryDate: fmtDate(L.dg.mandatoryFrom),
    dgVoluntaryDate: fmtDate(L.dg.voluntaryFrom),
    dgLabellingGraceDate: fmtDate(L.dg.labellingGrace),
    sp978Headspace: L.dg.sp978.headspaceCm,
    sp978PackTemp: L.dg.sp978.packingTempMaxC,
    sp978Weathering: company.production.weatheringDays,
    carriersAudited: L.dg.carriersAudited.join(', '),
    carriersNotAccepting: L.dg.carriersNotAccepting.join(', '),
    documentsStandardCount: L.documentsStandard.length,
    documentsAdditionalCount: L.documentsAdditional.length,
    transitLastUpdated: L.transitTimesLastUpdated,
    hsCode6: company.commercial.hsCode ?? '',
  };
}

/**
 * Quality-cocoon token dictionary. Adds the spec scalars, ash-framework
 * placement, and testing/lab strings the four `/quality` pages share, on
 * top of `companyTokens()`. Reads `company.quality.*` (the canonical home
 * for spec ranges + the rubric + the testing protocol) and the existing
 * `certifications.*` for held-cert facts, so no value is duplicated.
 * Spec table rows are built inline on the hub (like the logistics transit
 * table); these tokens are for inline PROSE interpolation only.
 *
 * `factoryBandRange` resolves the band's % range from the rubric so the
 * placement sentence never restates a number the config doesn't hold.
 * `thirdPartyLabsList` is plain "a, b, c"; `thirdPartyLabsOr` is the
 * Oxford "a, b, or c" form for "tested by one of …".
 */
export function qualityTokens(company: Company) {
  const q = company.quality;
  const s = q.specs;
  const labs = q.testing.thirdPartyLabs;
  const band = q.ashGradingFramework.factoryBand;
  const bandTier = q.ashGradingFramework.tiers.find((t) => t.grade === band);
  const tierRange = (grade: string) =>
    q.ashGradingFramework.tiers.find((t) => t.grade === grade)?.rangePct ?? '';
  const oxfordOr = (xs: string[]) =>
    xs.length <= 1
      ? xs.join('')
      : xs.length === 2
        ? `${xs[0]} or ${xs[1]}`
        : `${xs.slice(0, -1).join(', ')}, or ${xs[xs.length - 1]}`;
  // Deterministic thousands separator (avoids locale-dependent toLocaleString
  // at build time). Pure-integer strings only; ranges/blank pass through.
  const grouped = (v: string) =>
    /^\d+$/.test(v) ? v.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : v;

  return {
    // Spec scalars (render as typical/target; never "guaranteed").
    ashTypical: s.ashContentPct.typical,
    ashTarget: s.ashContentPct.max,
    fixedCarbonTypical: s.fixedCarbonPct.typical,
    fixedCarbonTarget: s.fixedCarbonPct.min,
    moistureTypical: s.moistureContentPct.typical,
    moistureTarget: s.moistureContentPct.max,
    volatileTypical: s.volatileMatterPct.typical,
    volatileTarget: s.volatileMatterPct.max,
    calorificTypical: grouped(s.calorificValueKcalKg.typical),
    calorificTarget: grouped(s.calorificValueKcalKg.min),
    burnTimeTypical: s.burnTimeMinutes.typical,
    burnTimeTarget: s.burnTimeMinutes.min,
    ashColor: s.ashColor,
    binder: s.binder,
    // Ash framework placement (self-attributed rubric).
    factoryBand: band,
    factoryBandRange: bandTier ? bandTier.rangePct : '',
    // Per-tier ash ranges from the rubric, for prose that lists all three
    // tiers (so the values are never hardcoded in i18n).
    platinumBandRange: tierRange('Platinum'),
    superPremiumBandRange: tierRange('Super Premium'),
    premiumBandRange: tierRange('Premium'),
    // Testing / lab attribution.
    ashMethod: q.testing.ashMethod,
    calorificMethod: q.testing.calorificMethod,
    proximateMethod: q.testing.proximateMethod,
    thirdPartyLabsList: labs.join(', '),
    thirdPartyLabsOr: oxfordOr(labs),
    thirdPartyLabCount: labs.length,
    thirdPartyScope: q.testing.thirdPartyScope.join(', '),
    thirdPartyFrequency: q.testing.thirdPartyFrequency,
    specsLastUpdated: q.specsLastUpdated,
    // Held-cert facts (reused from certifications.*; not duplicated).
    halalBody: company.certifications.halal ? (company.certifications.halal.body ?? '') : '',
  };
}

/**
 * Samples-page token dictionary. Adds only the sample-specific scalars the
 * `/samples` page needs, on top of `companyTokens()` (which already exposes
 * `sampleWeightG`, `sampleCarrier`, `sampleTransitChannel`,
 * `sampleTransitDays`, `countriesExportedCount`, `responseHours`,
 * `officeHours`, `moqLabel`, `portLabel`, `unNumber`, `imdgLabel`, …). Reads
 * `company.samples.*` (the canonical home extended for the /samples build)
 * so no fact is duplicated. Per-destination courier costs and the gallery
 * are rendered inline on the page, not via tokens.
 */
export function samplesTokens(company: Company) {
  const s = company.samples;
  return {
    sampleTypicalKg: s.typicalSizeKg,
    sampleMaxKg: s.maxSizeKg,
    sampleComparisonMax: s.maxComparisonItems,
    /** Free weight expressed in kg ("1 kg") for prose; companyTokens keeps the grams form. */
    sampleTypicalKgLabel: `${s.typicalSizeKg} kg`,
    /** "COA, SHT and MSDS" — Oxford-joined document list. */
    sampleDocsList:
      s.documentsWithSample.length <= 1
        ? s.documentsWithSample.join('')
        : `${s.documentsWithSample.slice(0, -1).join(', ')} and ${s.documentsWithSample[s.documentsWithSample.length - 1]}`,
    sampleDocsCount: s.documentsWithSample.length,
  };
}

/**
 * Factory-cocoon token dictionary. Adds the manufacturing scalars the five
 * `/factory` pages share, on top of `companyTokens()` (which already exposes
 * capacity, ovens, lines, facility area, headcount, founding year, raw
 * material, MOQ/port). Reads the canonical homes — `production.*` for
 * sourcing / weathering / carbonization, `factory.*` for oven type, and
 * `commercial.exportMarkets` for the served-countries count — so no fact is
 * duplicated. The capacity-headroom figures are DERIVED from
 * `production.capacityTonsPerMonth` and the MOQ container, not a new fact.
 */
export function factoryTokens(company: Company) {
  const p = company.production;
  const f = company.factory;
  const moqTons = company.commercial.moq.tons;
  const monthly = p.capacityTonsPerMonth;
  // Deterministic thousands separator (no locale dependence at build time).
  const grouped = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return {
    // Sourcing / raw material — origin is single-sourced (production.*).
    rawMaterial: p.rawMaterial,
    sourcingRegion: p.sourcingRegion,
    sourcingVillages: p.sourcingVillages,
    palmTrees: p.palmTreesCount,
    palmTreesGrouped: grouped(p.palmTreesCount),
    carbonizationCity: p.carbonizationPlant?.city ?? '',
    carbonizationRegion: p.carbonizationPlant?.region ?? '',
    // Process.
    weatheringDays: p.weatheringDays,
    ovenType: f.ovenType,
    // Facility (grouped for the at-a-glance box).
    facilityAreaGrouped: grouped(p.factoryAreaSqm),
    // Capacity-headroom framing (derived — typical, not a guarantee).
    annualTons: monthly * 12,
    annualTonsGrouped: grouped(monthly * 12),
    containersPerMonth: Math.round(monthly / moqTons),
    oneContainerPctOfMonthly: Math.round((moqTons / monthly) * 100),
    // Served-countries count — derived from the canonical export-markets list.
    countriesServedCount: company.commercial.exportMarkets.length,
    // Framework / list sizes.
    qcStepCount: f.qcSteps.length,
    processStepCount: f.processSteps.length,
    equipmentCount: f.equipment.length,
    // Binder / additives / ash colour — canonical home is quality.specs;
    // exposed here for the production-process binder-disclosure section and
    // the raw-materials sourcing narrative (no value duplicated).
    binder: company.quality.specs.binder,
    additives: company.quality.specs.additives,
    ashColor: company.quality.specs.ashColor,
  };
}

/**
 * The canonical token vocabulary returned by `companyTokens()`. Inferred from
 * the function's return literal so adding or renaming a token in one place
 * automatically updates the type — call sites referencing a removed token
 * get a compile error instead of a silent `{{tokenName}}` in the rendered
 * page.
 */
export type CompanyTokens = ReturnType<typeof companyTokens>;
