/**
 * Grade SKU page `@graph` builder.
 *
 * Assembles the full structured-data graph for one grade leaf page
 * (`/products/{shape}-{size}-{grade}`):
 *
 *   - WebPage / ItemPage — carries `author` + `reviewedBy` Person refs
 *     (E-E-A-T), `about` the canonical Product.
 *   - Product (this grade) — self-canonical, full `additionalProperty`
 *     spec set (the 7 measured grade properties + physical dimensions),
 *     `material`, `brand`/`manufacturer` → Organization, `image`,
 *     `isVariantOf` → the size's ProductGroup, and `offers` =
 *     `AggregateOffer` (only when a real FOB band exists).
 *   - ProductGroup (the shape × size) — `hasVariant` all three grades.
 *   - Two sibling-grade Product nodes — lighter, so the ProductGroup's
 *     variants all resolve in-graph.
 *   - VideoObject — when the grade has a real video (else omitted).
 *   - Person × 2 — the author and the reviewer / burn-test supervisor.
 *
 * `BreadcrumbList` is intentionally NOT emitted here — the visible
 * `<Breadcrumbs>` component emits its own, and duplicating it risks a
 * conflicting node. `aggregateRating` is omitted (no real reviews yet).
 *
 * Every priced/measured value comes from `~/config/{company,grades,products}`;
 * placeholders (FOB band, video) are gated on `hasFact()` so the graph
 * never advertises a value the business has not confirmed.
 */

import { company, hasFact } from '~/config/company';
import { grades, gradePropertyKeys, type Grade, type SpecValue } from '~/config/grades';
import type { ProductShape, ProductSize } from '~/config/products';
import { ORG_ID, WEBSITE_ID, siteOrigin } from '~/lib/schema/ids';
import { PROPERTY_LABELS, specProperty } from '~/lib/schema/grades';
import { productGroupSchema, productGroupId } from '~/lib/schema/productGroup';
import { videoObjectSchema } from '~/lib/schema/videoObject';
import { personSchema, personRef } from '~/lib/schema/person';

interface PropertyValueNode {
  '@type': 'PropertyValue';
  name: string;
  value: string | number;
  minValue?: number;
  maxValue?: number;
  unitText?: string;
}

function dimensionProperties(size: ProductSize): PropertyValueNode[] {
  const out: PropertyValueNode[] = [];
  if (typeof size.width === 'number')
    out.push({ '@type': 'PropertyValue', name: 'Width', value: size.width, unitText: 'mm' });
  if (typeof size.height === 'number')
    out.push({ '@type': 'PropertyValue', name: 'Height', value: size.height, unitText: 'mm' });
  if (typeof size.length === 'number')
    out.push({ '@type': 'PropertyValue', name: 'Length', value: size.length, unitText: 'mm' });
  if (typeof size.pcsPerKg === 'number')
    out.push({ '@type': 'PropertyValue', name: 'Pieces per kg', value: size.pcsPerKg, unitText: 'pcs/kg' });
  return out;
}

const gradeSkuFor = (size: ProductSize, g: Grade) => `${size.slug}-${g.key}`;
const productIdFor = (size: ProductSize, g: Grade) =>
  `${siteOrigin}/products/${gradeSkuFor(size, g)}#product`;
const productUrlFor = (size: ProductSize, g: Grade) =>
  `${siteOrigin}/products/${gradeSkuFor(size, g)}`;

function offersFor(g: Grade) {
  if (!hasFact(g.fobRange)) return undefined;
  const { low, high, currency, unit } = g.fobRange!;
  const unitText = unit === 'ton' ? 'metric ton' : 'kilogram';
  return {
    '@type': 'AggregateOffer' as const,
    priceCurrency: currency,
    // Floor ("from") price; `highPrice` only when a ceiling is published.
    lowPrice: low,
    ...(typeof high === 'number' ? { highPrice: high } : {}),
    availability: 'https://schema.org/InStock',
    businessFunction: 'http://purl.org/goodrelations/v1#Sell',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      priceCurrency: currency,
      // Price is per one pricing unit (metric ton); MOQ gates eligibility.
      referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitText },
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        minValue: company.commercial.moq.tons,
        unitText: 'metric ton',
      },
    },
  };
}

// Product photography is a pending data gap — galleries render `ImagePlaceholder`
// and the `/products/*.svg` paths in `shape.image` are not real assets yet, so
// pointing schema `image` at them would 404. Use the brand logo (a real,
// resolvable asset) as the fallback, matching `~/lib/schema/itemList.ts`. Swap
// to the real product photo here when it lands.
const PRODUCT_IMAGE = `${siteOrigin}${company.brandAssets.images.logo}`;

interface GradeProductOptions {
  /** Override the auto-generated name (used for the canonical page Product). */
  name?: string;
  /** Override the description (the page meta description for the main Product). */
  description?: string;
  /** Full spec set (canonical Product) vs. ash-only (sibling variants). */
  full: boolean;
}

function gradeProduct(shape: ProductShape, size: ProductSize, g: Grade, opts: GradeProductOptions) {
  const offers = offersFor(g);
  const additionalProperty = opts.full
    ? [...gradePropertyKeys.map((k) => specProperty(PROPERTY_LABELS[k], g[k])), ...dimensionProperties(size)]
    : [specProperty(PROPERTY_LABELS.ash, g.ash)];

  return {
    '@type': 'Product' as const,
    '@id': productIdFor(size, g),
    name: opts.name ?? `${g.name} ${size.label} ${shape.name} Coconut Shisha Charcoal`,
    description: opts.description ?? g.description,
    url: productUrlFor(size, g),
    sku: gradeSkuFor(size, g),
    category: shape.category,
    material: shape.material,
    brand: { '@id': ORG_ID },
    manufacturer: { '@id': ORG_ID },
    image: PRODUCT_IMAGE,
    additionalProperty,
    isVariantOf: { '@id': productGroupId(size.slug) },
    ...(offers ? { offers } : {}),
  };
}

export interface GradePageSchemaArgs {
  shape: ProductShape;
  size: ProductSize;
  grade: Grade;
  /** Product display name (H1-aligned). */
  name: string;
  /** Page meta description. */
  description: string;
  /** Root-relative page path (`/products/{shape}-{size}-{grade}`). */
  path: string;
}

export function gradePageSchema({ shape, size, grade, name, description, path }: GradePageSchemaArgs) {
  const pageUrl = `${siteOrigin}${path}`;
  const siblings = grades.filter((g) => g.key !== grade.key);

  const mainProduct = gradeProduct(shape, size, grade, { name, description, full: true });
  const siblingProducts = siblings.map((g) => gradeProduct(shape, size, g, { full: false }));

  const gradeNames = grades.map((g) => g.name).join(', ');
  const group = productGroupSchema({
    sizeSlug: size.slug,
    name: `${size.label} ${shape.name} Coconut Shisha Charcoal`,
    description: `${size.label} ${shape.name} coconut shell shisha charcoal — one briquette family in ${grades.length} quality grades (${gradeNames}).`,
    image: PRODUCT_IMAGE,
    category: shape.category,
    material: shape.material,
    variantIds: grades.map((g) => productIdFor(size, g)),
  });

  // Per-grade video — unique node per page; null until a real ID lands.
  const video = hasFact(grade.video)
    ? videoObjectSchema({
        id: gradeSkuFor(size, grade),
        youtubeId: grade.video!.youtubeId,
        name: `${name} — burn demonstration`,
        description: `Ignition, burn consistency, low smoke and minimal ash of ${name}.`,
        durationISO: grade.video!.durationISO,
        uploadDate: grade.video!.uploadDate,
        thumbnailUrl: grade.video!.poster,
      })
    : null;

  // Drop-test videos — a VideoObject per real clip (durability E-E-A-T).
  const dropVideos = (grade.dropTestVideos ?? [])
    .map((v, i) =>
      hasFact(v)
        ? videoObjectSchema({
            id: `${gradeSkuFor(size, grade)}-droptest-${i + 1}`,
            youtubeId: v.youtubeId,
            name: `${name} — drop test ${i + 1}`,
            description: `Drop-test durability demonstration for ${name}.`,
            durationISO: v.durationISO,
            uploadDate: v.uploadDate,
            thumbnailUrl: v.poster,
          })
        : null,
    )
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const gov = company.governance;
  const author = personSchema({ name: gov.author.name, role: gov.author.role, idSlug: 'author' });
  const reviewer = personSchema({ name: gov.reviewer.name, role: gov.reviewer.role, idSlug: 'reviewer' });

  const webPage = {
    '@type': ['WebPage', 'ItemPage'],
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    description,
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': mainProduct['@id'] },
    primaryImageOfPage: PRODUCT_IMAGE,
    author: personRef('author'),
    reviewedBy: personRef('reviewer'),
    datePublished: gov.author.lastReviewed,
    dateModified: gov.author.lastReviewed,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPage,
      group,
      mainProduct,
      ...siblingProducts,
      ...(video ? [video] : []),
      ...dropVideos,
      author,
      reviewer,
    ],
  };
}
