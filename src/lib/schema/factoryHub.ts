/**
 * /factory hub `@graph` builder.
 *
 *   - CollectionPage primary — `hasPart` → the four cluster WebPage refs
 *     (their `@id`s match the `#webpage` nodes each child page emits).
 *     `dateModified` bumps with `factory.editorial.dateModified` (the
 *     pillar's freshness signal).
 *   - Optional `Person` nodes for the named, production-framed team subset
 *     (`worksFor` → ORG_ID). The page sets `includeOrgSchema` so the
 *     Organization node is present on-page for those refs to resolve.
 *
 * Deliberately NOT emitted:
 *   - No FAQPage. The factory pages render a VISIBLE FAQ for GEO value but
 *     emit no FAQPage JSON-LD — /faq is the sole FAQPage home.
 *   - No BreadcrumbList — the visual <Breadcrumbs> emits its own.
 *   - No Product/Offer/Service, no VideoObject (the hub embeds no video;
 *     /factory/virtual-tour carries the gated VideoObject).
 */

import { company } from '~/config/company';
import { siteOrigin } from '~/lib/schema/ids';
import { webPageNode, childWebPageRef } from '~/lib/schema/webPage';
import { personSchema, type PersonInput } from '~/lib/schema/person';

export interface ChildPageRef {
  /** Root-relative cluster path, e.g. `/factory/production-process`. */
  href: string;
  name: string;
}

interface BuildArgs {
  pageTitle: string;
  pageDescription: string;
  /** Root-relative hub path (`/factory`). */
  path: string;
  children: ChildPageRef[];
  /** Named, real staff → Person nodes (worksFor ORG_ID). Omit/empty → none. */
  team?: PersonInput[];
}

export function factoryHubSchema({ pageTitle, pageDescription, path, children, team = [] }: BuildArgs) {
  const pageUrl = `${siteOrigin}${path}`;
  const { editorial } = company.factory;

  const collectionPage = webPageNode({
    type: 'CollectionPage',
    pageUrl,
    name: pageTitle,
    description: pageDescription,
    datePublished: editorial.datePublished,
    dateModified: editorial.dateModified,
    hasPart: children.map((child) => childWebPageRef(child.href, child.name)),
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [collectionPage, ...team.map((member) => personSchema(member))],
  };
}
