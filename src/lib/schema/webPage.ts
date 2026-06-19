/**
 * Shared WebPage / CollectionPage / AboutPage node builder.
 *
 * Nine schema builders hand-assembled a near-identical primary page node
 * (`WebPage`, `CollectionPage`, or `AboutPage`) with the same `@id` =
 * `${pageUrl}#${fragment}` convention, the same `isPartOf` → WEBSITE_ID
 * default, `inLanguage: 'en'`, and the same conditional-spread pattern for
 * the optional `about` / `mainEntity` / `author` / date fields.
 *
 * `webPageNode(opts)` centralises that node. It emits a key ONLY when the
 * corresponding opt is provided, mirroring the original per-builder
 * conditional spreads exactly (so the JSON-LD output is byte-for-key
 * identical). `childWebPageRef(href, name)` builds the hub `hasPart` child
 * ref shared by the three *Hub builders.
 */

import { siteOrigin, WEBSITE_ID } from '~/lib/schema/ids';

/** A bare `{ '@id': ... }` reference object. */
type Ref = { '@id': string };

interface WebPageNodeOpts {
  /** Node `@type` — defaults to `'WebPage'`. */
  type?: 'WebPage' | 'CollectionPage' | 'AboutPage';
  /** Absolute page URL (scheme+host+path). Used for `url` and the `@id`. */
  pageUrl: string;
  /** `@id` fragment after the `#` — defaults to `'webpage'`. */
  idFragment?: string;
  name: string;
  description: string;
  /** Defaults to `'en'`. */
  inLanguage?: string;
  /** `isPartOf` target `@id` — defaults to WEBSITE_ID. */
  isPartOfId?: string;
  /** `mainEntity` reference `@id` (emitted only when provided). */
  mainEntityId?: string;
  /** `about` reference object (emitted only when provided). */
  aboutRef?: Ref;
  /** Person author name (emits an `author` Person node only when provided). */
  authorName?: string;
  /** Emitted only when provided. */
  datePublished?: string;
  /** Emitted only when provided. */
  dateModified?: string;
  /** Hub child refs (emits `hasPart` only when provided). */
  hasPart?: ReturnType<typeof childWebPageRef>[];
}

export function webPageNode(opts: WebPageNodeOpts): Record<string, unknown> {
  const {
    type = 'WebPage',
    pageUrl,
    idFragment = 'webpage',
    name,
    description,
    inLanguage = 'en',
    isPartOfId = WEBSITE_ID,
    mainEntityId,
    aboutRef,
    authorName,
    datePublished,
    dateModified,
    hasPart,
  } = opts;

  return {
    '@type': type,
    '@id': `${pageUrl}#${idFragment}`,
    url: pageUrl,
    name,
    description,
    inLanguage,
    isPartOf: { '@id': isPartOfId },
    ...(mainEntityId ? { mainEntity: { '@id': mainEntityId } } : {}),
    ...(aboutRef ? { about: aboutRef } : {}),
    ...(authorName ? { author: { '@type': 'Person' as const, name: authorName } } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(hasPart ? { hasPart } : {}),
  };
}

/** Hub `hasPart` child reference — `{ '@type':'WebPage', '@id', url, name }`. */
export function childWebPageRef(href: string, name: string) {
  return {
    '@type': 'WebPage' as const,
    '@id': `${siteOrigin}${href}#webpage`,
    url: `${siteOrigin}${href}`,
    name,
  };
}
