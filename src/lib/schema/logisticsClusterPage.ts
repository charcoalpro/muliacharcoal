/**
 * /logistics child-page `@graph` builder — shared by all seven cocoon
 * children (cocoon v3.3 §3.3).
 *
 *   - `WebPage` primary (locked type across the cluster) — `mainEntity`
 *     → the page-specific FAQPage, `author` (Person) + dates from
 *     `logistics.editorial` / `governance`. Optional `about` → a
 *     /glossary anchor `@id` (reference only; no DefinedTerm emitted here).
 *   - `FAQPage` — page-specific Q/As ONLY (one Q/A = one FAQPage home).
 *   - `TechArticle` — OPTIONAL node (un-1361, charcoal-dg-regulation,
 *     cargo-protection-and-insurance, import-to-usa) signalling depth for
 *     AI extraction; carries the editorial author + dates and
 *     `mainEntityOfPage` → the WebPage.
 *   - `HowTo` — OPTIONAL supplementary node (rules payment process,
 *     import-to-usa entry process). ⚠️ Google deprecated HowTo rich
 *     results (Aug 2023): no rich result, GEO/parsing value only. The
 *     HTML ordered list on the page is the real signal — this adds no JS.
 *
 * Deliberately NOT emitted: BreadcrumbList (<Breadcrumbs> emits its own),
 * Product/Offer/Service, VideoObject, DefinedTerm/DefinedTermSet.
 */

import { company } from '~/config/company';
import { siteOrigin } from '~/lib/schema/ids';
import { faqPageSchema, type QAPair } from '~/lib/schema/faqPage';
import { webPageNode, techArticleNode } from '~/lib/schema/webPage';

interface TechArticleInput {
  headline?: string;
  description?: string;
}

interface HowToStep {
  name: string;
  text: string;
}

interface HowToInput {
  name: string;
  steps: HowToStep[];
}

interface BuildArgs {
  pageTitle: string;
  pageDescription: string;
  /** Root-relative child path, e.g. `/logistics/un-1361`. */
  path: string;
  faq: QAPair[];
  /** Glossary anchor slug for `about` (e.g. 'un-1361'); omit to skip. */
  aboutAnchor?: string;
  /** Pass to add a TechArticle node (the four technical explainers). */
  techArticle?: TechArticleInput;
  /** Pass to add a supplementary HowTo node (genuine step processes). */
  howTo?: HowToInput;
  /** Override dateModified (e.g. a per-country `lastVerified`); defaults to
   *  `logistics.editorial.dateModified` when omitted. */
  dateModified?: string;
}

export function logisticsClusterPageSchema({
  pageTitle,
  pageDescription,
  path,
  faq,
  aboutAnchor,
  techArticle,
  howTo,
  dateModified,
}: BuildArgs) {
  const pageUrl = `${siteOrigin}${path}`;
  const faqId = `${pageUrl}#faq`;
  const { editorial } = company.logistics;
  const modified = dateModified ?? editorial.dateModified;
  const aboutRef = aboutAnchor ? { '@id': `${siteOrigin}/glossary#${aboutAnchor}` } : undefined;

  const webPage = webPageNode({
    pageUrl,
    name: pageTitle,
    description: pageDescription,
    mainEntityId: faqId,
    aboutRef,
    authorName: company.governance.author.name,
    datePublished: editorial.datePublished,
    dateModified: modified,
  });

  const faqPage = {
    ...faqPageSchema(faq),
    '@id': faqId,
  };

  const graph: Array<Record<string, unknown>> = [webPage, faqPage];

  if (techArticle) {
    graph.push(techArticleNode({
      pageUrl,
      headline: techArticle.headline ?? pageTitle,
      description: techArticle.description ?? pageDescription,
      authorName: company.governance.author.name,
      datePublished: editorial.datePublished,
      dateModified: modified,
      aboutRef,
    }));
  }

  if (howTo) {
    graph.push({
      '@type': 'HowTo',
      '@id': `${pageUrl}#howto`,
      name: howTo.name,
      step: howTo.steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
