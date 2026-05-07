/**
 * ItemList of Product nodes — used on the homepage Products section so
 * search engines understand the six product shapes as a navigable list.
 *
 * Each Product references the Organization `@id` from `organization.ts`
 * as both `brand` and `manufacturer`, so the graph stays fully connected
 * when emitted as a single `@graph` document.
 */

import { ORG_ID, siteOrigin } from '~/lib/schema/organization';

export interface ProductInput {
  /** URL slug of the product (e.g. 'cube-25mm'). */
  slug: string;
  /** Display name (e.g. 'Cube 25mm'). */
  name: string;
  /** Short paragraph for search engines. */
  description: string;
  /** Absolute or root-relative image URL; falls back to logo when omitted. */
  image?: string;
  /** Parent shape category slug (e.g. 'cubes'). */
  category?: string;
}

export function productItemListSchema(products: ProductInput[]) {
  return {
    '@type': 'ItemList',
    '@id': `${siteOrigin}/#products`,
    name: 'Coconut shell shisha charcoal briquettes',
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        '@id': `${siteOrigin}/products/${p.slug}#product`,
        name: p.name,
        description: p.description,
        url: `${siteOrigin}/products/${p.slug}`,
        image: p.image
          ? p.image.startsWith('http')
            ? p.image
            : `${siteOrigin}${p.image}`
          : `${siteOrigin}/logo.png`,
        brand: { '@id': ORG_ID },
        manufacturer: { '@id': ORG_ID },
        ...(p.category ? { category: p.category } : {}),
      },
    })),
  };
}
