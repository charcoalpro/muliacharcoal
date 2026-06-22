/**
 * /guide hub `@graph` builder (Buyer's-Guide pillar).
 *
 *   - CollectionPage primary — `hasPart` → the LIVE cluster WebPage refs
 *     (their `@id`s match the `#webpage` nodes each child page emits),
 *     `mainEntity` → the hub-canonical FAQPage, `about` → the Organization.
 *     Dates from `company.guide.editorial.hub`. Children not yet in
 *     LIVE_ROUTES are omitted from `hasPart` (the page passes only live
 *     children) so the graph never declares a part that 404s — it self-heals
 *     as each child route ships.
 *   - FAQPage — hub-canonical Q/As only (one Q/A = one FAQPage home).
 *
 * Deliberately NOT emitted (mirrors the quality / logistics hubs):
 *   - No BreadcrumbList — the visual <Breadcrumbs> emits its own.
 *   - No DefinedTerm/DefinedTermSet (canonical on the child articles →
 *     /glossary). No Product/Offer/Service.
 */

import { company } from '~/config/company';
import { siteOrigin, ORG_ID } from '~/lib/schema/ids';
import { faqPageSchema, type QAPair } from '~/lib/schema/faqPage';
import { webPageNode, childWebPageRef } from '~/lib/schema/webPage';

export interface ChildPageRef {
  /** Root-relative cluster path, e.g. `/guide/how-to-order-shisha-charcoal`. */
  href: string;
  name: string;
}

interface BuildArgs {
  pageTitle: string;
  pageDescription: string;
  /** Root-relative hub path (`/guide`). */
  path: string;
  /** LIVE children only — pass `[]` until the first child ships. */
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
    hasPart: children.length
      ? children.map((child) => childWebPageRef(child.href, child.name))
      : undefined,
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
