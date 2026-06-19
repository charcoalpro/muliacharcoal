/**
 * DefinedTerm node builder for pages OUTSIDE the glossary.
 *
 * The glossary page emits the canonical DefinedTermSet (see
 * glossaryPage.ts). Pillar/cluster pages reference the same terms by
 * `@id` — the glossary anchor — so search and AI engines resolve every
 * mention of "master box" / "white label" / "neutral packaging" to one
 * canonical definition. Keep descriptions short here; the glossary owns
 * the full definition text.
 */

import { siteOrigin } from '~/lib/schema/ids';

export interface TermRef {
  /** Glossary anchor slug, e.g. 'master-box' → /glossary#master-box. */
  anchor: string;
  name: string;
  alternateName?: string[];
  /** Optional one-sentence description (definition-form). */
  description?: string;
  /** Optional authoritative external reference (e.g. UNECE DG page). */
  sameAs?: string;
}

export function definedTermNode(term: TermRef) {
  const id = `${siteOrigin}/glossary#${term.anchor}`;
  return {
    '@type': 'DefinedTerm' as const,
    '@id': id,
    name: term.name,
    url: id,
    ...(term.alternateName?.length ? { alternateName: term.alternateName } : {}),
    ...(term.description ? { description: term.description } : {}),
    ...(term.sameAs ? { sameAs: term.sameAs } : {}),
  };
}
