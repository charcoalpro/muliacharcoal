/**
 * /quality child-page `@graph` builder — shared by the three cocoon
 * children (cocoon v4.2 §3.3).
 *
 *   - `WebPage` primary (locked type across the cluster) — `mainEntity`
 *     → the page-specific FAQPage, `author` (Person) + dates from
 *     `quality.editorial` / `governance`. Optional `dateModified` override
 *     lets specifications-explained bump with `quality.specsLastUpdated`
 *     (it renders the same spec values — v4.2 §3.3).
 *   - `FAQPage` — page-specific Q/As ONLY (one Q/A = one FAQPage home).
 *   - `TechArticle` — OPTIONAL node (testing-methods, the technical
 *     explainer) signalling depth for AI extraction.
 *   - `VideoObject` — OPTIONAL, canonical on testing-methods only. Built
 *     via videoObjectSchema (valid-or-omit: a missing youtubeId / date /
 *     duration suppresses the node). embeds elsewhere are embed-only.
 *
 * Deliberately NOT emitted (v4.2 §3.3): BreadcrumbList (<Breadcrumbs>
 * emits its own), Product/Offer/Service, credential markup
 * (hasCredential / EducationalOccupationalCredential),
 * DefinedTerm/DefinedTermSet.
 */

import { company } from '~/config/company';
import { siteOrigin } from '~/lib/schema/ids';
import { faqPageSchema, type QAPair } from '~/lib/schema/faqPage';
import { videoObjectSchema, type VideoObjectInput } from '~/lib/schema/videoObject';
import { webPageNode, techArticleNode } from '~/lib/schema/webPage';

interface TechArticleInput {
  headline?: string;
  description?: string;
}

interface BuildArgs {
  pageTitle: string;
  pageDescription: string;
  /** Root-relative child path, e.g. `/quality/testing-methods`. */
  path: string;
  faq: QAPair[];
  /** Glossary anchor slug for `about` (e.g. 'ash-content'); omit to skip. */
  aboutAnchor?: string;
  /** Pass to add a TechArticle node (the technical explainer pages). */
  techArticle?: TechArticleInput;
  /** Pass to add the canonical VideoObject (testing-methods only). */
  video?: VideoObjectInput;
  /** Override the WebPage dateModified (specs-explained → specsLastUpdated). */
  dateModified?: string;
}

export function qualityClusterPageSchema({
  pageTitle,
  pageDescription,
  path,
  faq,
  aboutAnchor,
  techArticle,
  video,
  dateModified,
}: BuildArgs) {
  const pageUrl = `${siteOrigin}${path}`;
  const faqId = `${pageUrl}#faq`;
  const { editorial } = company.quality;
  const modified = dateModified || editorial.dateModified;
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

  if (video) {
    const videoNode = videoObjectSchema(video);
    if (videoNode) graph.push(videoNode);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
