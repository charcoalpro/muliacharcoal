/**
 * /logistics hub `@graph` builder (cocoon v3.3 §3.3).
 *
 *   - CollectionPage primary — `hasPart` → the seven cluster WebPage refs
 *     (their `@id`s match the `#webpage` nodes each child page emits),
 *     `mainEntity` → the hub-canonical FAQPage. `dateModified` bumps with
 *     `logistics.transitTimesLastUpdated` (the hub's freshness signal).
 *   - FAQPage — hub-canonical Q/As only (one Q/A = one FAQPage home).
 *
 * Deliberately NOT emitted:
 *   - No DefinedTerm/DefinedTermSet anywhere outside /glossary (stricter
 *     than the packaging hub). Children may reference a glossary `@id`
 *     via `about` instead.
 *   - No BreadcrumbList — the visual <Breadcrumbs> emits its own.
 *   - No Product/Offer/Service, no VideoObject (the hub embeds video via
 *     <VideoFacade> without schema).
 */

import { company } from '~/config/company';
import { siteOrigin, WEBSITE_ID } from '~/lib/schema/ids';
import { faqPageSchema, type QAPair } from '~/lib/schema/faqPage';

export interface ChildPageRef {
  /** Root-relative cluster path, e.g. `/logistics/rules`. */
  href: string;
  name: string;
}

interface BuildArgs {
  pageTitle: string;
  pageDescription: string;
  /** Root-relative hub path (`/logistics`). */
  path: string;
  children: ChildPageRef[];
  faq: QAPair[];
}

export function logisticsHubSchema({ pageTitle, pageDescription, path, children, faq }: BuildArgs) {
  const pageUrl = `${siteOrigin}${path}`;
  const faqId = `${pageUrl}#faq`;
  const { editorial, transitTimesLastUpdated } = company.logistics;

  const collectionPage = {
    '@type': 'CollectionPage' as const,
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: { '@id': faqId },
    datePublished: editorial.datePublished,
    dateModified: transitTimesLastUpdated || editorial.dateModified,
    hasPart: children.map((child) => ({
      '@type': 'WebPage' as const,
      '@id': `${siteOrigin}${child.href}#webpage`,
      url: `${siteOrigin}${child.href}`,
      name: child.name,
    })),
  };

  const faqPage = {
    ...faqPageSchema(faq),
    '@id': faqId,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [collectionPage, faqPage],
  };
}
