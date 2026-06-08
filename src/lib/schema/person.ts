/**
 * Person JSON-LD builder.
 *
 * The grade SKU pages name a real author, reviewer, and burn-test
 * supervisor (the `governance` block in `company.json`). Emitting each as
 * a `Person` node — referenced from the page's `author` / `reviewedBy` —
 * is a deliberate E-E-A-T edge: the competitor names a charcoal expert in
 * prose but ships no `Person` markup, so search and AI engines cannot
 * attribute the expertise. We make it machine-readable.
 *
 * `worksFor` joins each Person to the Organization `@id` so the graph
 * reads as "staff of the manufacturer", not an unaffiliated reviewer.
 */

import { ORG_ID, siteOrigin } from '~/lib/schema/organization';

export interface PersonInput {
  /** Display name (e.g. "Ahmet Bassam"). */
  name: string;
  /** Role → `jobTitle` (e.g. "Charcoal Expert / Consultant"). */
  role: string;
  /** Stable kebab id; the node's `@id` is `${siteOrigin}/#person-${idSlug}`. */
  idSlug: string;
}

/** Canonical `@id` for a Person, so refs and the node agree. */
export function personId(idSlug: string): string {
  return `${siteOrigin}/#person-${idSlug}`;
}

/** A `{ '@id' }` reference to a Person node declared elsewhere in the graph. */
export function personRef(idSlug: string) {
  return { '@id': personId(idSlug) };
}

/** Build a full Person node for inclusion in an `@graph`. */
export function personSchema({ name, role, idSlug }: PersonInput) {
  return {
    '@type': 'Person' as const,
    '@id': personId(idSlug),
    name,
    jobTitle: role,
    worksFor: { '@id': ORG_ID },
  };
}
