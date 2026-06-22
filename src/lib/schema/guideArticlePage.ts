/**
 * /guide lead-article `@graph` builder (coconut-vs-bamboo-vs-wood,
 * how-to-choose-shisha-charcoal-factory).
 *
 *   - Primary node is `['WebPage','Article']` (@id `#webpage`, so the hub's
 *     `hasPart` ref resolves) carrying author + reviewer Person refs
 *     (E-E-A-T), `mainEntity` → the page FAQPage, `about` the primary entity
 *     (Thing + sameAs), optional `mentions`, optional `image` → a gated
 *     ImageObject, `isPartOf` the WebSite, dates from `company.guide.editorial`.
 *   - Person × 2 — author + reviewer (from `governance`), referenced above.
 *   - FAQPage — page-canonical Q/As only.
 *   - DefinedTerm × n — references to canonical glossary anchors (+ sameAs).
 *   - ItemList — the comparison rows / criteria checklist (valid-or-omit).
 *   - ImageObject — the featured asset, valid-or-omit (gated on a real file).
 *
 * Deliberately NOT emitted: BreadcrumbList (<Breadcrumbs> emits its own),
 * Product/Offer/Service/PriceSpecification.
 */

import { company } from '~/config/company';
import { siteOrigin, WEBSITE_ID } from '~/lib/schema/ids';
import { faqPageSchema, type QAPair } from '~/lib/schema/faqPage';
import { personSchema, personRef } from '~/lib/schema/person';
import { definedTermNode, type TermRef } from '~/lib/schema/definedTerm';
import { imageObjectSchema, type ImageObjectInput } from '~/lib/schema/imageObject';

type EditorialKey = 'coconutVsBambooVsWood' | 'howToChooseFactory';

interface EntityRef {
  name: string;
  sameAs?: string;
}

interface ItemListInput {
  /** `@id` suffix, e.g. 'comparison' → `${pageUrl}#comparison`. */
  id: string;
  name: string;
  items: string[];
}

interface BuildArgs {
  pageTitle: string;
  pageDescription: string;
  /** Root-relative article path. */
  path: string;
  /** Which `company.guide.editorial.*` block supplies the dates. */
  editorialKey: EditorialKey;
  headline: string;
  faq: QAPair[];
  /** Primary entity the article is `about` (e.g. coconut shell charcoal). */
  about?: EntityRef;
  /** Secondary entities `mentions` (e.g. bamboo / hardwood lump charcoal). */
  mentions?: EntityRef[];
  /** Glossary-anchored DefinedTerm references (+ optional sameAs). */
  definedTerms?: TermRef[];
  /** ItemList (comparison rows / criteria checklist). */
  itemList?: ItemListInput;
  /** Featured ImageObject — pass only when a real asset exists (valid-or-omit). */
  image?: ImageObjectInput;
}

const thing = (e: EntityRef) => ({
  '@type': 'Thing' as const,
  name: e.name,
  ...(e.sameAs ? { sameAs: e.sameAs } : {}),
});

export function guideArticlePageSchema({
  pageTitle,
  pageDescription,
  path,
  editorialKey,
  headline,
  faq,
  about,
  mentions,
  definedTerms,
  itemList,
  image,
}: BuildArgs) {
  const pageUrl = `${siteOrigin}${path}`;
  const faqId = `${pageUrl}#faq`;
  const gov = company.governance;
  const dates = company.guide.editorial[editorialKey];

  const imageNode = image ? imageObjectSchema(image) : null;

  const article = {
    '@type': ['WebPage', 'Article'],
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageTitle,
    headline,
    description: pageDescription,
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: { '@id': faqId },
    author: personRef('author'),
    reviewedBy: personRef('reviewer'),
    datePublished: dates.datePublished,
    dateModified: dates.dateModified,
    ...(about ? { about: thing(about) } : {}),
    ...(mentions?.length ? { mentions: mentions.map(thing) } : {}),
    ...(imageNode ? { image: { '@id': imageNode['@id'] } } : {}),
  };

  const author = personSchema({ name: gov.author.name, role: gov.author.role, idSlug: 'author' });
  const reviewer = personSchema({ name: gov.reviewer.name, role: gov.reviewer.role, idSlug: 'reviewer' });

  const faqPage = { ...faqPageSchema(faq), '@id': faqId };

  const graph: Array<Record<string, unknown>> = [article, author, reviewer, faqPage];

  if (definedTerms?.length) {
    for (const term of definedTerms) graph.push(definedTermNode(term));
  }

  if (itemList && itemList.items.length) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${pageUrl}#${itemList.id}`,
      name: itemList.name,
      numberOfItems: itemList.items.length,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: itemList.items.map((name, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name,
      })),
    });
  }

  if (imageNode) graph.push(imageNode);

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
