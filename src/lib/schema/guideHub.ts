/**
 * /guide hub `@graph` builder.
 *
 *   - CollectionPage primary — `hasPart` → the LIVE lead-article WebPage refs
 *     (their `@id`s match the `#webpage` nodes each article emits),
 *     `mainEntity` → the hub-canonical FAQPage. Dates from
 *     `company.guide.editorial.hub`.
 *   - FAQPage — hub-canonical Q/As only (one Q/A = one FAQPage home).
 *
 * Deliberately NOT emitted (mirrors the quality / logistics hubs):
 *   - No BreadcrumbList — the visual <Breadcrumbs> emits its own.
 *   - No Product/Offer/Service. The two unbuilt children are absent from
 *     `hasPart` until they ship.
 */

import { company } from '~/config/company';
import { siteOrigin, ORG_ID } from '~/lib/schema/ids';
import { faqPageSchema, type QAPair } from '~/lib/schema/faqPage';
import { webPageNode, childWebPageRef } from '~/lib/schema/webPage';

export interface ChildPageRef {
  /** Root-relative lead-article path, e.g. `/guide/coconut-vs-bamboo-vs-wood-charcoal`. */
  href: string;
  name: string;
}

interface BuildArgs {
  pageTitle: string;
  pageDescription: string;
  /** Root-relative hub path (`/guide`). */
  path: string;
  children: ChildPageRef[];
  faq: QAPair[];
}

export function guideHubSchema({ pageTitle, pageDescription, path, children, faq }: BuildArgs) {
  const pageUrl = `${siteOrigin}${path}`;
  const faqId = `${pageUrl}#faq`;
  const { editorial } = company.guide;

  const collectionPage = webPageNode({
    type: 'CollectionPage',
    pageUrl,
    name: pageTitle,
    description: pageDescription,
    aboutRef: { '@id': ORG_ID },
    mainEntityId: faqId,
    datePublished: editorial.hub.datePublished,
    dateModified: editorial.hub.dateModified,
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
