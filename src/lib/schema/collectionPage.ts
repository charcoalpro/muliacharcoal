/**
 * Products-hub `@graph` builder.
 *
 * Emits two nodes for the `/products` pillar page:
 *   1. CollectionPage — declares the page's hub/index intent and is the
 *      `mainEntity` owner of the SKU list below.
 *   2. ItemList — enumerates every SKU (one `ListItem` per shape × size) with
 *      `position`, `url`, and `name`. This is the structured proof of the
 *      hub → variant hierarchy that search and AI engines read.
 *
 * Deliberately omitted (see build prompt §9):
 *   - No priced `Product` / `ProductGroup`. Full `Product` schema (offers,
 *     manufacturer, grade variants) lives on each SKU page; emitting it here
 *     would dilute the SKU canonical signal and risk rich-result errors.
 *   - No `FAQPage`. The canonical FAQ home is `/faq`; any Q&A on this page is
 *     plain semantic markup only.
 *   - No `BreadcrumbList`. The visual `<Breadcrumbs>` component emits its own.
 *
 * The SKU `url`s reference the planned `/products/{slug}` detail pages, which
 * are a downstream build — the ItemList is the one place we telegraph the full
 * taxonomy to crawlers ahead of those pages shipping.
 */

import { siteOrigin, WEBSITE_ID, ORG_ID } from '~/lib/schema/ids';

export interface SkuListEntry {
  /** Detail-page path (root-relative, e.g. `/products/cube-25mm`). */
  href: string;
  /** Display name, e.g. "Cube 25×25 mm". */
  name: string;
}

interface BuildArgs {
  pageTitle: string;
  pageDescription: string;
  /** Root-relative path of the hub itself (e.g. `/products`). */
  path: string;
  /** Every SKU, in document order. */
  skus: SkuListEntry[];
}

export function collectionPageSchema({ pageTitle, pageDescription, path, skus }: BuildArgs) {
  const pageUrl = `${siteOrigin}${path}`;
  const listId = `${pageUrl}#sku-list`;

  const itemList = {
    '@type': 'ItemList' as const,
    '@id': listId,
    name: pageTitle,
    numberOfItems: skus.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: skus.map((sku, i) => ({
      '@type': 'ListItem' as const,
      position: i + 1,
      url: `${siteOrigin}${sku.href}`,
      name: sku.name,
    })),
  };

  const collectionPage = {
    '@type': 'CollectionPage' as const,
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    mainEntity: { '@id': listId },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [collectionPage, itemList],
  };
}
