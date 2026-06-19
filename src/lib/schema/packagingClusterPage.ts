/**
 * Packaging cluster-page `@graph` builder — the locked template shared
 * by all five cluster pages (master-box v2 §4 [C1]).
 *
 *   - `WebPage` primary (locked type across the cluster) — `about` → the
 *     page's DefinedTerm (`@id` = glossary anchor), `mainEntity` → the
 *     page-specific FAQPage, `author` (Person) + dates from
 *     `packaging.editorial` / `governance`.
 *   - `FAQPage` — page-specific Q/As ONLY. The container-count and
 *     general-cost questions are hub-canonical and must not be schema'd
 *     here (one Q/A = one FAQPage home).
 *   - `DefinedTerm` — the page's term, `@id` → /glossary anchor.
 *   - `VideoObject` — pass pre-built nodes from `videoObjectSchema()`
 *     (valid-or-omit; null entries are dropped). The cluster page is
 *     each video's canonical home; the hub embeds without schema.
 *   - `extraNodes` — the white-label page passes its canonical `Service`
 *     (and optional HowTo) here. No Product/Offer anywhere.
 *
 * BreadcrumbList is NOT emitted here — <Breadcrumbs> emits its own.
 */

import { company } from '~/config/company';
import { siteOrigin, WEBSITE_ID } from '~/lib/schema/ids';
import { faqPageSchema, type QAPair } from '~/lib/schema/faqPage';
import { definedTermNode, type TermRef } from '~/lib/schema/definedTerm';

interface BuildArgs {
  pageTitle: string;
  pageDescription: string;
  /** Root-relative cluster path, e.g. `/packaging/master-box`. */
  path: string;
  /** The page's primary term — `about` target and DefinedTerm node. */
  term: TermRef;
  faq: QAPair[];
  /** Pre-built VideoObject nodes (nulls dropped). */
  videos?: Array<Record<string, unknown> | null>;
  /** Additional page-specific nodes (e.g. the white-label Service). */
  extraNodes?: Array<Record<string, unknown>>;
}

export function packagingClusterPageSchema({
  pageTitle,
  pageDescription,
  path,
  term,
  faq,
  videos = [],
  extraNodes = [],
}: BuildArgs) {
  const pageUrl = `${siteOrigin}${path}`;
  const faqId = `${pageUrl}#faq`;

  const webPage = {
    '@type': 'WebPage' as const,
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': `${siteOrigin}/glossary#${term.anchor}` },
    mainEntity: { '@id': faqId },
    author: {
      '@type': 'Person' as const,
      name: company.governance.author.name,
    },
    datePublished: company.packaging.editorial.datePublished,
    dateModified: company.packaging.editorial.dateModified,
  };

  const faqPage = {
    ...faqPageSchema(faq),
    '@id': faqId,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPage,
      faqPage,
      definedTermNode(term),
      ...videos.filter((v): v is Record<string, unknown> => v !== null),
      ...extraNodes,
    ],
  };
}
