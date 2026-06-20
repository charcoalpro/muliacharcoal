/**
 * /factory child-page `@graph` builder — shared by the four cocoon
 * children (production-process, capacity, raw-materials, virtual-tour).
 *
 *   - `WebPage` primary (locked type across the cluster). `isPartOf` →
 *     the hub `CollectionPage` `@id` (bidirectional with the hub's
 *     `hasPart`), `author` (Person) + dates from `factory.editorial` /
 *     `governance`, optional `about` → a /glossary anchor `@id`.
 *   - `HowTo` — OPTIONAL (production-process). Rich shape (supply/tool/
 *     totalTime) via howToNode. ⚠️ No rich result since 2023 — GEO /
 *     AI-extraction value only; the visible ordered steps are the real
 *     signal.
 *   - `VideoObject` — OPTIONAL (virtual-tour), gated on a real
 *     factoryTourVideo (valid-or-omit). KEEPS the rich-result target.
 *
 * Deliberately NOT emitted:
 *   - No FAQPage. The factory pages render a VISIBLE FAQ only — /faq is the
 *     sole FAQPage home.
 *   - No BreadcrumbList — the visual <Breadcrumbs> emits its own.
 *   - No Product/Offer/Service, no TechArticle, no DefinedTerm.
 */

import { company } from '~/config/company';
import { siteOrigin } from '~/lib/schema/ids';
import { webPageNode } from '~/lib/schema/webPage';
import { howToNode, type HowToStepInput } from '~/lib/schema/howTo';
import { videoObjectSchema, type VideoObjectInput } from '~/lib/schema/videoObject';

/** `@id` of the hub CollectionPage (matches factoryHub.ts). */
const HUB_ID = `${siteOrigin}/factory#webpage`;

interface HowToInput {
  name: string;
  description?: string;
  steps: HowToStepInput[];
  supply?: string[];
  tool?: string[];
  totalTime?: string;
}

interface BuildArgs {
  pageTitle: string;
  pageDescription: string;
  /** Root-relative child path, e.g. `/factory/production-process`. */
  path: string;
  /** Glossary anchor slug for `about` (e.g. 'weathering'); omit to skip. */
  aboutAnchor?: string;
  /** Pass to add a HowTo node (production-process). */
  howTo?: HowToInput;
  /** Pass to add a gated VideoObject node (virtual-tour). */
  video?: VideoObjectInput;
}

export function factoryClusterPageSchema({
  pageTitle,
  pageDescription,
  path,
  aboutAnchor,
  howTo,
  video,
}: BuildArgs) {
  const pageUrl = `${siteOrigin}${path}`;
  const { editorial } = company.factory;
  const aboutRef = aboutAnchor ? { '@id': `${siteOrigin}/glossary#${aboutAnchor}` } : undefined;

  const webPage = webPageNode({
    pageUrl,
    name: pageTitle,
    description: pageDescription,
    isPartOfId: HUB_ID,
    aboutRef,
    authorName: company.governance.author.name,
    datePublished: editorial.datePublished,
    dateModified: editorial.dateModified,
  });

  const graph: Array<Record<string, unknown>> = [webPage];

  if (howTo) {
    const node = howToNode({ path, ...howTo });
    if (node) graph.push(node);
  }
  if (video) {
    const node = videoObjectSchema(video);
    if (node) graph.push(node);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
