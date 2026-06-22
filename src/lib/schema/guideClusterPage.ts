/**
 * /guide cluster-page `@graph` builder (process / how-to children).
 *
 * Mirrors logisticsClusterPage but reads `company.guide.editorial[pageKey]`
 * for dates and supports a HowTo node (the ordering process):
 *   - WebPage primary — `author` (Person) + dates from guide.editorial[pageKey],
 *     optional `about` → a /glossary anchor, `mainEntity` → the page FAQPage
 *     (only when an FAQ is passed).
 *   - TechArticle — OPTIONAL depth signal (carries author + dates,
 *     mainEntityOfPage → the WebPage).
 *   - HowTo — OPTIONAL ordered steps (GEO/AI-extraction only; the visible
 *     <ol> is the real signal). Emitted via howToNode (valid-or-omit).
 *   - FAQPage — OPTIONAL, page-specific Q/As only (one Q/A = one home).
 *     The how-to-order page passes NO faq (its questions live on /faq).
 *
 * Deliberately NOT emitted: BreadcrumbList (<Breadcrumbs> emits its own),
 * Product/Offer/Service, DefinedTerm/DefinedTermSet, VideoObject.
 */

import { company } from '~/config/company';
import { siteOrigin } from '~/lib/schema/ids';
import { faqPageSchema, type QAPair } from '~/lib/schema/faqPage';
import { webPageNode, techArticleNode } from '~/lib/schema/webPage';
import { howToNode, type HowToStepInput } from '~/lib/schema/howTo';

type GuideEditorialKey = keyof typeof company.guide.editorial;

interface TechArticleInput {
  headline?: string;
  description?: string;
}

interface HowToInput {
  name: string;
  description?: string;
  steps: HowToStepInput[];
  totalTime?: string;
}

interface BuildArgs {
  pageTitle: string;
  pageDescription: string;
  /** Root-relative child path, e.g. `/guide/how-to-order-shisha-charcoal`. */
  path: string;
  /** Which `company.guide.editorial.*` block supplies the dates. */
  pageKey: GuideEditorialKey;
  /** Glossary anchor slug for `about` (e.g. 'fob'); omit to skip. */
  aboutAnchor?: string;
  /** Pass to add a TechArticle depth node. */
  techArticle?: TechArticleInput;
  /** Pass to add a HowTo node (genuine ordered process). */
  howTo?: HowToInput;
  /** Page-specific FAQ — omit (or empty) to emit NO FAQPage. */
  faq?: QAPair[];
}

export function guideClusterPageSchema({
  pageTitle,
  pageDescription,
  path,
  pageKey,
  aboutAnchor,
  techArticle,
  howTo,
  faq,
}: BuildArgs) {
  const pageUrl = `${siteOrigin}${path}`;
  const faqId = `${pageUrl}#faq`;
  const dates = company.guide.editorial[pageKey];
  const aboutRef = aboutAnchor ? { '@id': `${siteOrigin}/glossary#${aboutAnchor}` } : undefined;
  const hasFaq = Boolean(faq && faq.length);

  const webPage = webPageNode({
    pageUrl,
    name: pageTitle,
    description: pageDescription,
    aboutRef,
    mainEntityId: hasFaq ? faqId : undefined,
    authorName: company.governance.author.name,
    datePublished: dates.datePublished,
    dateModified: dates.dateModified,
  });

  const graph: Array<Record<string, unknown>> = [webPage];

  if (techArticle) {
    graph.push(
      techArticleNode({
        pageUrl,
        headline: techArticle.headline ?? pageTitle,
        description: techArticle.description ?? pageDescription,
        authorName: company.governance.author.name,
        datePublished: dates.datePublished,
        dateModified: dates.dateModified,
        aboutRef,
      }),
    );
  }

  if (howTo) {
    const node = howToNode({
      path,
      name: howTo.name,
      description: howTo.description,
      steps: howTo.steps,
      totalTime: howTo.totalTime,
    });
    if (node) graph.push(node);
  }

  if (hasFaq) {
    graph.push({ ...faqPageSchema(faq as QAPair[]), '@id': faqId });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
