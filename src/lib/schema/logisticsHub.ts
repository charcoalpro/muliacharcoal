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
import { siteOrigin } from '~/lib/schema/ids';
import { faqPageSchema, type QAPair } from '~/lib/schema/faqPage';
import { webPageNode, childWebPageRef } from '~/lib/schema/webPage';

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

  const collectionPage = webPageNode({
    type: 'CollectionPage',
    pageUrl,
    name: pageTitle,
    description: pageDescription,
    mainEntityId: faqId,
    datePublished: editorial.datePublished,
    dateModified: transitTimesLastUpdated || editorial.dateModified,
    hasPart: children.map((child) => childWebPageRef(child.href, child.name)),
  });

  const faqPage = {
    ...faqPageSchema(faq),
    '@id': faqId,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [collectionPage, faqPage],
  };
}
