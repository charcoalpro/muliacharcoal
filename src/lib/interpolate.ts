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

import type { Company } from '~/config/company';

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
    addressFull,
    // Contact
    email: company.email,
    phoneDisplay: company.phone.display,
    phoneE164: company.phone.e164,
    // Commercial
    moqTons: company.commercial.moq.tons,
    moqLabel: company.commercial.moq.label,
    containerType: company.commercial.moq.containerType,
    port: company.commercial.portOfLoading.name,
    portLabel: company.commercial.portOfLoading.label,
    leadTimeLabel: company.commercial.leadTime.label,
    // Production
    capacity: company.production.capacityTonsPerDay,
    // Certifications
    iso9001Short: company.certifications.iso9001.shortName,
    isoStandard: company.certifications.iso9001.standard,
    auditors: company.certifications.iso9001.auditors.join(' & '),
    unNumber: company.certifications.imdg.unNumber,
    unClass: company.certifications.imdg.class,
    // People
    executives: executivesList,
  };
}
