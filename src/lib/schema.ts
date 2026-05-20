/**
 * JSON-LD schema builders.
 *
 * Per CLAUDE.md every page family needs structured data. Building it inline
 * in components leads to drift (audit finding #3). Pages and components call
 * into this module; the builders own the shape and the `@id` scheme so the
 * graph references resolve consistently sitewide.
 *
 * Each builder returns a plain object. Wrap with <JsonLd data={...}/> at the
 * call site. Builders that return graph nodes (Organization, WebSite) omit
 * the top-level `@context` so they can be composed inside a `@graph`.
 */

import { company } from '~/config/company';
import { absoluteUrl } from '~/lib/url';

const SCHEMA_CONTEXT = 'https://schema.org';

export type BreadcrumbItem = { label: string; href?: string };

export function orgId(siteOrigin: string): string {
  return `${siteOrigin}/#organization`;
}

export function websiteId(siteOrigin: string): string {
  return `${siteOrigin}/#website`;
}

export function buildOrganization(siteOrigin: string) {
  // TODO: restore the `logo` ImageObject when /public/logo.png exists
  // (PNG/JPG, recommended 600x600+, transparent or solid background).
  // schema.org requires it to be a real image reachable from the site root.
  return {
    '@type': 'Organization',
    '@id': orgId(siteOrigin),
    name: company.name,
    legalName: company.legalName,
    url: siteOrigin,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${company.address.street}, ${company.address.locality}`,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.countryCode,
    },
    email: company.email,
    telephone: company.phoneE164,
    foundingDate: String(company.foundedYear),
    sameAs: company.socials,
  };
}

export function buildWebsite(siteOrigin: string, lang: string) {
  return {
    '@type': 'WebSite',
    '@id': websiteId(siteOrigin),
    url: siteOrigin,
    name: company.name,
    publisher: { '@id': orgId(siteOrigin) },
    inLanguage: lang,
  };
}

/**
 * Combined Organization + WebSite graph. Used in the document <head> on
 * every page via OrganizationSchema.astro.
 */
export function buildOrgGraph(siteOrigin: string, lang: string) {
  return {
    '@context': SCHEMA_CONTEXT,
    '@graph': [buildOrganization(siteOrigin), buildWebsite(siteOrigin, lang)],
  };
}

export function buildBreadcrumbList(items: BreadcrumbItem[], siteOrigin: string) {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const node: Record<string, unknown> = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
      };
      const resolved = absoluteUrl(siteOrigin, item.href);
      if (resolved) node.item = resolved;
      return node;
    }),
  };
}

export interface WebPageInput {
  siteOrigin: string;
  path: string;
  title: string;
  description: string;
  lang: string;
  dateModified: string;
  datePublished?: string;
}

export function buildWebPage(input: WebPageInput) {
  const { siteOrigin, path, title, description, lang, dateModified, datePublished } = input;
  const url = `${siteOrigin}${path}`;
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: lang,
    dateModified,
    datePublished: datePublished ?? dateModified,
    isPartOf: { '@id': websiteId(siteOrigin) },
    about: { '@id': orgId(siteOrigin) },
    publisher: { '@id': orgId(siteOrigin) },
  };
}
