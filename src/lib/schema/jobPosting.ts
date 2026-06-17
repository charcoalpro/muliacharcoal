/**
 * JobPosting JSON-LD builder for the /careers page.
 *
 * Emits one JobPosting graph per open role. Two roles ship with v1 of
 * the page (Head of Production, Sales Manager) and the array is
 * consumed by /src/pages/careers.astro through BaseLayout's `schema`
 * prop, which forwards arrays to <JsonLd> as a single ld+json block.
 *
 * Per the careers brief: description / responsibilities / qualifications
 * / baseSalary are deliberately omitted at v1 — the owner has not signed
 * off on copy or compensation bands. The TODO comments below mark the
 * exact fields to fill once that copy lands. Shipping the schema with
 * fabricated values would be worse than shipping it with fewer fields,
 * which is allowed by the JobPosting spec.
 *
 * `applicantLocationRequirements` and `directApply` are intentionally
 * omitted (per brief). Hiring is on-site in Semarang and applications
 * route through email rather than an in-page form.
 */

import { company } from '~/config/company';
import { siteOrigin } from '~/lib/schema/ids';

// Build-time clock. Astro is fully static, so these dates freeze on
// every deploy and refresh on the next one — exactly what JobPosting
// `datePosted` expects.
const today = new Date();
const validThroughDate = new Date(today);
validThroughDate.setUTCDate(today.getUTCDate() + 90);
const datePosted = today.toISOString().slice(0, 10);
const validThroughISO = validThroughDate.toISOString().slice(0, 10);

const hiringOrganization = {
  '@type': 'Organization',
  name: company.brand,
  legalName: company.legalName,
  url: company.siteUrl,
  sameAs: company.siteUrl,
} as const;

const jobLocation = {
  '@type': 'Place',
  address: {
    '@type': 'PostalAddress',
    addressLocality: company.address.city,
    addressRegion: company.address.region,
    addressCountry: company.address.countryCode,
  },
} as const;

interface RoleSeed {
  slug: string;
  title: string;
}

function buildPosting(role: RoleSeed): Record<string, unknown> {
  return {
    '@type': 'JobPosting',
    '@id': `${siteOrigin}/careers#${role.slug}`,
    title: role.title,
    employmentType: 'FULL_TIME',
    datePosted,
    validThrough: validThroughISO,
    hiringOrganization,
    jobLocation,
    // TODO: description — fill once owner provides job-description copy.
    // TODO: responsibilities — fill once owner approves bullet list.
    // TODO: qualifications — fill once owner approves bullet list.
    // TODO: baseSalary — fill once compensation band is set.
    // applicantLocationRequirements / directApply intentionally omitted.
  };
}

// Role titles are kept as English literals here even though the same
// strings live in /src/i18n/en.json. JSON-LD is i18n-blind — the spec
// expects one canonical title per JobPosting graph — so duplicating
// the literal avoids an unnecessary i18n coupling for structured data.
// Single @graph envelope (consistent with every other multi-node page on
// the site) rather than a bare array with @context repeated per element.
export const jobPostingGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    buildPosting({
      slug: 'head-of-production',
      title: 'Head of Production — Shisha Charcoal',
    }),
    buildPosting({
      slug: 'sales-manager',
      title: 'Sales Manager (Arabic-speaking)',
    }),
  ],
};
