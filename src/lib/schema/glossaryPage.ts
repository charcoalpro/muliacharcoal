/**
 * Glossary @graph builder.
 *
 * Emits two nodes:
 *   1. DefinedTermSet — names the glossary as a single, citable set; each
 *      DefinedTerm inside it carries its own URL anchor so AI engines can
 *      cite individual definitions by hash.
 *   2. FAQPage — the comparison-style Q&As at the foot of the page; the
 *      single highest-ROI GEO format per CLAUDE.md.
 *
 * BreadcrumbList is intentionally NOT emitted here — the visual
 * `<Breadcrumbs>` component already emits its own BreadcrumbList JSON-LD
 * on every deeper page, and duplicating the graph node here would
 * compete with itself in Search Console.
 *
 * Definitions arrive already token-resolved (the page calls fill() before
 * passing them in), so this module is pure formatting.
 */

import { siteOrigin, WEBSITE_ID } from '~/lib/schema/organization';
import { faqPageSchema, type QAPair } from '~/lib/schema/faqPage';

export interface ResolvedTerm {
  slug: string;
  term: string;
  termCode?: string;
  definition: string;
}

const GLOSSARY_URL = `${siteOrigin}/glossary`;
const SET_ID = `${GLOSSARY_URL}#defined-term-set`;

const SUMMARY_MAX = 300;

/** Trim a definition to ~300 chars at a sentence boundary for the schema
 * `description` field. The visible page renders the full definition. */
function summarize(text: string): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= SUMMARY_MAX) return clean;
  const slice = clean.slice(0, SUMMARY_MAX);
  const lastStop = Math.max(
    slice.lastIndexOf('. '),
    slice.lastIndexOf('? '),
    slice.lastIndexOf('! '),
  );
  if (lastStop > 120) return slice.slice(0, lastStop + 1);
  const lastSpace = slice.lastIndexOf(' ');
  return `${slice.slice(0, lastSpace > 0 ? lastSpace : SUMMARY_MAX).trim()}…`;
}

function termNode(t: ResolvedTerm) {
  const id = `${GLOSSARY_URL}#${t.slug}`;
  return {
    '@type': 'DefinedTerm' as const,
    '@id': id,
    name: t.term,
    description: summarize(t.definition),
    url: id,
    inDefinedTermSet: { '@id': SET_ID },
    ...(t.termCode ? { termCode: t.termCode } : {}),
  };
}

interface BuildArgs {
  pageTitle: string;
  pageDescription: string;
  terms: ResolvedTerm[];
  faq: QAPair[];
}

export function glossaryPageSchema({
  pageTitle,
  pageDescription,
  terms,
  faq,
}: BuildArgs) {
  const definedTermSet = {
    '@type': 'DefinedTermSet',
    '@id': SET_ID,
    name: pageTitle,
    description: pageDescription,
    url: GLOSSARY_URL,
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
    hasDefinedTerm: terms.map(termNode),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [definedTermSet, faqPageSchema(faq)],
  };
}
