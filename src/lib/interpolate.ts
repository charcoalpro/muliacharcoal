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

// Relative path, not the `~/` alias: `astro.config.ts` loads this module
// to register the remark plugin, and Vite's SSR loader does not resolve
// tsconfig path aliases when evaluating the config file itself.
import {
  imdgLabel,
  leadTimeLabel,
  moqLabel,
  portOfLoadingLabel,
  type Company,
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
 */
export function companyTokens(company: Company): Tokens {
  const directors = company.people.executives.filter((e) =>
    e.role.toLowerCase().includes('director'),
  );
  const experts = company.people.executives.filter(
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
    // Production
    capacity: company.production.capacityTonsPerDay,
    // Certifications
    iso9001Short: company.certifications.iso9001.shortName,
    isoStandard: company.certifications.iso9001.standard,
    auditors: company.certifications.iso9001.auditors.join(' & '),
    unNumber: company.certifications.imdg.unNumber,
    unClass: company.certifications.imdg.class,
    imdgClassDescription: company.certifications.imdg.classDescription,
    imdgLabel: imdgLabel(),
    // Legal / contract terms
    governingLaw: company.legal.governingLaw,
    arbitrationInstitution: company.legal.arbitration.institution,
    arbitrationInstitutionShort: company.legal.arbitration.institutionShort,
    arbitrationSeat: company.legal.arbitration.seat,
    // Returns and quality claims — drives /returns-policy prose. Every
    // window, sampling rate, lab accreditation, and tolerance reference
    // in the policy body resolves through one of these tokens.
    damageBusinessDays: company.claims.damageBusinessDays,
    qualityDays: company.claims.qualityDays,
    samplingPercent: company.claims.sampling.minimumPercentByWeight,
    moistureStandard: company.claims.sampling.moistureStandardReference,
    moistureMaxPercent: company.claims.moisture.maxPercent,
    naturalVariationPercent: company.claims.naturalVariationPercent,
    labAccreditor: company.claims.lab.accreditor,
    labAccreditorFull: company.claims.lab.accreditorFull,
    labStandard: company.claims.lab.standard,
    labCountry: company.claims.lab.country,
    // Ash-content tiers — positional tokens so the /returns-policy
    // Markdown table can render every cell from config without
    // hardcoding a single percentage. Order tracks
    // `company.claims.ashTiers[0..2]`. If that array is reordered,
    // these bindings move with it.
    ashTier1Name: company.claims.ashTiers[0].name,
    ashTier1Range: `${company.claims.ashTiers[0].minPercent} – ${company.claims.ashTiers[0].maxPercent}`,
    ashTier2Name: company.claims.ashTiers[1].name,
    ashTier2Range: `${company.claims.ashTiers[1].minPercent} – ${company.claims.ashTiers[1].maxPercent}`,
    ashTier3Name: company.claims.ashTiers[2].name,
    ashTier3Range: `${company.claims.ashTiers[2].minPercent} – ${company.claims.ashTiers[2].maxPercent}`,
    // People
    executives: executivesList,
  };
}
