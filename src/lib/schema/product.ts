/**
 * Product JSON-LD builder for SKU pages under /products/{slug}.
 *
 * Emits a `Product` graph node with offers (FOB price terms, MOQ, currency),
 * manufacturer (Organization @id reference, not a full copy), and the
 * `additionalProperty` triples that capture the physical specs (burn time,
 * ash content, moisture, calorific value) that buyers care about.
 *
 * Pure function; no I/O.
 */

import { company } from '~/config/company';
import { ORG_ID, siteOrigin } from './organization';

export interface ProductSchemaInput {
  slug: string;
  title: string;
  description: string;
  shape: string;
  size: string;
  datePublished: string;
  dateModified: string;
  massGramsPerPiece?: number;
  burnTimeMinutes?: number;
  ashContentPercent?: number;
  moistureContentPercent?: number;
  calorificValueKcalKg?: number;
  heroImage?: string;
}

interface AdditionalProperty {
  '@type': 'PropertyValue';
  name: string;
  value: string | number;
  unitText?: string;
}

export function buildProductSchema(input: ProductSchemaInput) {
  const url = `${siteOrigin}/products/${input.slug}`;
  const additionalProperty: AdditionalProperty[] = [
    { '@type': 'PropertyValue', name: 'Shape', value: input.shape },
    { '@type': 'PropertyValue', name: 'Size', value: input.size },
  ];

  if (input.massGramsPerPiece) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Mass per piece',
      value: input.massGramsPerPiece,
      unitText: 'g',
    });
  }
  if (input.burnTimeMinutes) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Burn time',
      value: input.burnTimeMinutes,
      unitText: 'min',
    });
  }
  if (typeof input.ashContentPercent === 'number') {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Ash content',
      value: input.ashContentPercent,
      unitText: '%',
    });
  }
  if (typeof input.moistureContentPercent === 'number') {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Moisture content',
      value: input.moistureContentPercent,
      unitText: '%',
    });
  }
  if (input.calorificValueKcalKg) {
    additionalProperty.push({
      '@type': 'PropertyValue',
      name: 'Calorific value',
      value: input.calorificValueKcalKg,
      unitText: 'kcal/kg',
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: input.title,
    description: input.description,
    url,
    sku: input.slug,
    category: 'Coconut shell charcoal briquettes',
    brand: { '@type': 'Brand', name: company.brand },
    manufacturer: { '@id': ORG_ID },
    ...(input.heroImage ? { image: `${siteOrigin}${input.heroImage}` } : {}),
    additionalProperty,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: company.commercial.currency,
      seller: { '@id': ORG_ID },
      areaServed: 'Worldwide',
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        minValue: company.commercial.moq.tons,
        unitText: 'metric ton',
      },
    },
    releaseDate: input.datePublished,
    dateModified: input.dateModified,
  } as const;
}
