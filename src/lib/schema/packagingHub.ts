/**
 * /packaging hub `@graph` builder.
 *
 * Per packaging hub build prompt v6 §6 with the consolidated-revisions
 * overlay applied:
 *   - CollectionPage primary — `hasPart` → the five cluster WebPage refs
 *     (their `@id`s match the `#webpage` nodes each cluster page emits),
 *     `mainEntity` → the hub-canonical FAQPage.
 *   - FAQPage — hub-canonical Q/As only (container-count + general-cost
 *     questions live HERE and nowhere else).
 *   - DefinedTerm set — `@id`s point at the /glossary anchors so every
 *     packaging term resolves to one canonical definition.
 *
 * Deliberately NOT emitted (overlay §1):
 *   - No `Service` — canonical on /packaging/white-label only.
 *   - No `VideoObject` — each video's schema lives on its cluster page;
 *     the hub embeds via <VideoFacade> without schema.
 *   - No Product/Offer anywhere in the packaging cluster.
 *   - No BreadcrumbList — the visual <Breadcrumbs> emits its own.
 */

import { company } from '~/config/company';
import { siteOrigin, WEBSITE_ID } from '~/lib/schema/ids';
import { faqPageSchema, type QAPair } from '~/lib/schema/faqPage';
import { definedTermNode, type TermRef } from '~/lib/schema/definedTerm';

export interface ChildPageRef {
  /** Root-relative cluster path, e.g. `/packaging/master-box`. */
  href: string;
  name: string;
}

interface BuildArgs {
  pageTitle: string;
  pageDescription: string;
  /** Root-relative hub path (`/packaging`). */
  path: string;
  children: ChildPageRef[];
  faq: QAPair[];
  terms: TermRef[];
}

export function packagingHubSchema({ pageTitle, pageDescription, path, children, faq, terms }: BuildArgs) {
  const pageUrl = `${siteOrigin}${path}`;
  const faqId = `${pageUrl}#faq`;

  const collectionPage = {
    '@type': 'CollectionPage' as const,
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: { '@id': faqId },
    datePublished: company.packaging.editorial.datePublished,
    dateModified: company.packaging.editorial.dateModified,
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
    '@graph': [collectionPage, faqPage, ...terms.map(definedTermNode)],
  };
}
