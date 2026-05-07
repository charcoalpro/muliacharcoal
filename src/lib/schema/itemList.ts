/**
 * ItemList of Product nodes — used on the homepage Products section so
 * search engines understand the six product shapes as a navigable list.
 *
 * Each Product references the Organization `@id` from `organization.ts`
 * as both `brand` and `manufacturer`, carries a `category` and
 * `material`, and emits a `hasMeasurement` array — one
 * `QuantitativeValue` per dimension (`width`, `height`, `length`) of
 * each size variant. The `unitCode` is `MMT` (UN/CEFACT for millimetre).
 *
 * `additionalProperty` carries the `pcsPerKg` figure per size variant
 * since `hasMeasurement` is reserved for physical dimensions.
 */

import { ORG_ID, siteOrigin } from '~/lib/schema/organization';
import type { ProductSize } from '~/config/products';

export interface ProductInput {
  /** URL slug of the product (e.g. 'cube'). */
  slug: string;
  /** Display name (e.g. 'Cube'). */
  name: string;
  /** Short paragraph for search engines. */
  description: string;
  /** Absolute or root-relative image URL; falls back to logo when omitted. */
  image?: string;
  /** Schema.org `category` (e.g. 'Shisha charcoal briquette'). */
  category?: string;
  /** Schema.org `material` (e.g. 'Coconut shell'). */
  material?: string;
  /** Variants — each contributes hasMeasurement and additionalProperty entries. */
  sizes?: ProductSize[];
}

interface QuantitativeValue {
  '@type': 'QuantitativeValue';
  name: string;
  value: number;
  unitCode: 'MMT';
}

interface PropertyValue {
  '@type': 'PropertyValue';
  name: string;
  value: string | number;
  unitText?: string;
}

function measurementsFor(sizes: ProductSize[] | undefined): QuantitativeValue[] {
  if (!sizes?.length) return [];
  const out: QuantitativeValue[] = [];
  for (const s of sizes) {
    if (typeof s.width === 'number') {
      out.push({ '@type': 'QuantitativeValue', name: `${s.label} — width`, value: s.width, unitCode: 'MMT' });
    }
    if (typeof s.height === 'number') {
      out.push({ '@type': 'QuantitativeValue', name: `${s.label} — height`, value: s.height, unitCode: 'MMT' });
    }
    if (typeof s.length === 'number') {
      out.push({ '@type': 'QuantitativeValue', name: `${s.label} — length`, value: s.length, unitCode: 'MMT' });
    }
  }
  return out;
}

function additionalPropertiesFor(sizes: ProductSize[] | undefined): PropertyValue[] {
  if (!sizes?.length) return [];
  const out: PropertyValue[] = [];
  for (const s of sizes) {
    if (typeof s.pcsPerKg === 'number') {
      out.push({
        '@type': 'PropertyValue',
        name: `${s.label} — pieces per kg`,
        value: s.pcsPerKg,
        unitText: 'pcs/kg',
      });
    }
  }
  return out;
}

export function productItemListSchema(products: ProductInput[]) {
  return {
    '@type': 'ItemList',
    '@id': `${siteOrigin}/#products`,
    name: 'Coconut shell shisha charcoal briquettes',
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => {
      const measurements = measurementsFor(p.sizes);
      const properties = additionalPropertiesFor(p.sizes);
      return {
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
          ...(p.material ? { material: p.material } : {}),
          ...(measurements.length ? { hasMeasurement: measurements } : {}),
          ...(properties.length ? { additionalProperty: properties } : {}),
        },
      };
    }),
  };
}
