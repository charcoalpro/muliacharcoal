/**
 * /quality hub `@graph` builder (cocoon v4.2 §3.3).
 *
 *   - CollectionPage primary — `hasPart` → the three cluster WebPage refs
 *     (their `@id`s match the `#webpage` nodes each child page emits),
 *     `mainEntity` → the hub-canonical FAQPage. `dateModified` bumps with
 *     `quality.specsLastUpdated` (the hub renders the spec values, so the
 *     spec date is its freshness signal — v4.2 §3.3).
 *   - FAQPage — hub-canonical Q/As only (one Q/A = one FAQPage home).
 *
 * Deliberately NOT emitted (v4.2 §3.3):
 *   - No DefinedTerm/DefinedTermSet anywhere outside /glossary.
 *   - No BreadcrumbList — the visual <Breadcrumbs> emits its own.
 *   - No Product/Offer/Service, no credential markup (hasCredential /
 *     EducationalOccupationalCredential) for held or unheld certifications.
 *   - No VideoObject on the hub — the burn/ash-test VideoObject is
 *     canonical on /quality/testing-methods.
 */

import { company } from '~/config/company';
import { siteOrigin, WEBSITE_ID } from '~/lib/schema/organization';
import { faqPageSchema, type QAPair } from '~/lib/schema/faqPage';

export interface ChildPageRef {
  /** Root-relative cluster path, e.g. `/quality/testing-methods`. */
  href: string;
  name: string;
}

interface BuildArgs {
  pageTitle: string;
  pageDescription: string;
  /** Root-relative hub path (`/quality`). */
  path: string;
  children: ChildPageRef[];
  faq: QAPair[];
}

export function qualityHubSchema({ pageTitle, pageDescription, path, children, faq }: BuildArgs) {
  const pageUrl = `${siteOrigin}${path}`;
  const faqId = `${pageUrl}#faq`;
  const { editorial, specsLastUpdated } = company.quality;

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
    dateModified: specsLastUpdated || editorial.dateModified,
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
