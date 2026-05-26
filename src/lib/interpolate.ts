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
    leadTimeLabel: leadTimeLabel(),
    shippingLines: company.commercial.shippingLines.join(' · '),
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
    // Packaging — formatted size lists for use in i18n templates.
    innerPlasticSizes: company.packaging.innerPlastic.sizesGrams
      .map((g) => (g >= 1000 ? `${g / 1000} kg` : `${g} g`))
      .join(' / '),
    innerBoxSizes: company.packaging.innerBox.sizesGrams
      .map((g) => (g >= 1000 ? `${g / 1000} kg` : `${g} g`))
      .join(' / '),
    innerBoxGsm: company.packaging.innerBox.gsm,
    masterBoxSizes: company.packaging.masterBox.sizesKg
      .map((kg) => `${kg} kg`)
      .join(' or '),
    masterBoxWallOptions: company.packaging.masterBox.wallOptions.join('- or '),
    acceptedArtworkFormats: company.packaging.acceptedArtworkFormats.join(' / '),
    proofTimeDays: company.packaging.proofTimeDays,
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
