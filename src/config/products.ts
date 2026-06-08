/**
 * Product catalogue — single source of truth for the six shape families
 * we offer, their published sizes, and approximate pieces-per-kg.
 *
 * Drives the homepage Products section, the homepage Product `ItemList`
 * JSON-LD (with `hasMeasurement` per dimension), and the future
 * `/products/{slug}` SKU pages.
 *
 * Numeric `pcsPerKg` values are factory approximations for buyer
 * planning; treat them as ranges around the listed value. Confirm
 * with the operations director before publishing on the price list.
 */

export interface ProductSize {
  /**
   * SKU slug — the `{shape}-{size}` URL segment for this size's detail page
   * (`/products/{slug}`). Single source of truth for the SKU URL, read by the
   * `/products` hub `ItemList` JSON-LD and the future `/products/[sku].astro`
   * route. Kebab-case, keyword-rich, < 60 chars (CLAUDE.md § URL conventions).
   */
  slug: string;
  /** Display label as shown in the size `<dl>` (e.g. "22×22 mm", "3-piece set"). */
  label: string;
  /** Approximate pieces per kg — drives the second column in the size table. */
  pcsPerKg?: number;
  /** Width in millimetres — feeds JSON-LD `hasMeasurement`. */
  width?: number;
  /** Height in millimetres — feeds JSON-LD `hasMeasurement`. */
  height?: number;
  /** Length in millimetres — only for stix/finger and hexagonal. */
  length?: number;
  /** Lotus / Cloud configurations (e.g. "3-piece set"). */
  configuration?: string;
}

export interface ProductShape {
  /** URL slug for the shape category page (`/products/{slug}`). */
  slug: string;
  /** Stable key for i18n lookup — `en.home.products.items[key]`. */
  key: 'cube' | 'stix' | 'hexagonal' | 'dome' | 'flat' | 'lotus';
  /** Display name (English), incl. alias where one exists (e.g. "Stix / Finger"). */
  name: string;
  /**
   * Short, keyword-clean single word for page titles, H1s, and body prose
   * (e.g. "Finger" for "Stix / Finger"). Keeps grade-page titles under the
   * 60-char SEO budget; the full `name` alias is surfaced once per page
   * (the at-a-glance "Shape" row and the category definition prose).
   */
  shortName: string;
  /** Short paragraph used by JSON-LD and the card subtitle fallback. */
  description: string;
  /** Available sizes for this shape, in spec order. */
  sizes: ProductSize[];
  /** Public image path under `/public/`. */
  image: string;
  /** Forward-pointing path to the future shape category page. */
  href: string;
  /** Schema.org category. */
  category: string;
  /** Schema.org material. */
  material: string;
}

const SHARED_CATEGORY = 'Shisha charcoal briquette';
const SHARED_MATERIAL = 'Coconut shell';

export const productShapes: ProductShape[] = [
  {
    slug: 'cube',
    key: 'cube',
    name: 'Cube',
    shortName: 'Cube',
    description:
      'Compressed coconut shell charcoal cubes — the most common shisha format worldwide. Edges are uniformly cut, no first-light cracking.',
    sizes: [
      { slug: 'cube-22mm', label: '22×22 mm', width: 22, height: 22, length: 22, pcsPerKg: 120 },
      { slug: 'cube-25mm', label: '25×25 mm', width: 25, height: 25, length: 25, pcsPerKg: 96 },
      { slug: 'cube-26mm', label: '26×26 mm', width: 26, height: 26, length: 26, pcsPerKg: 85 },
      { slug: 'cube-27mm', label: '27×27 mm', width: 27, height: 27, length: 27, pcsPerKg: 78 },
      { slug: 'cube-28mm', label: '28×28 mm', width: 28, height: 28, length: 28, pcsPerKg: 70 },
    ],
    image: '/products/cube.svg',
    href: '/products/cubes',
    category: SHARED_CATEGORY,
    material: SHARED_MATERIAL,
  },
  {
    slug: 'stix',
    key: 'stix',
    name: 'Stix / Finger',
    shortName: 'Finger',
    description:
      'Slim finger briquettes for kaloud and HMD-style heat-management devices. Long burn at low surface temperature.',
    sizes: [
      { slug: 'finger-18x35', label: '18×35 mm', width: 18, height: 18, length: 35, pcsPerKg: 80 },
      { slug: 'finger-18x50', label: '18×50 mm', width: 18, height: 18, length: 50, pcsPerKg: 60 },
      { slug: 'finger-20x35', label: '20×35 mm', width: 20, height: 20, length: 35, pcsPerKg: 65 },
      { slug: 'finger-20x50', label: '20×50 mm', width: 20, height: 20, length: 50, pcsPerKg: 50 },
    ],
    image: '/products/stix.svg',
    href: '/products/fingers',
    category: SHARED_CATEGORY,
    material: SHARED_MATERIAL,
  },
  {
    slug: 'hexagonal',
    key: 'hexagonal',
    name: 'Hexagonal',
    shortName: 'Hexagonal',
    description:
      'Six-sided briquettes with a centre hole — preferred by retail tobacco brands for shelf appeal and even ignition.',
    sizes: [
      { slug: 'hexagonal-18x35', label: '18×35 mm', width: 18, height: 18, length: 35, pcsPerKg: 80 },
      { slug: 'hexagonal-18x50', label: '18×50 mm', width: 18, height: 18, length: 50, pcsPerKg: 60 },
      { slug: 'hexagonal-20x35', label: '20×35 mm', width: 20, height: 20, length: 35, pcsPerKg: 65 },
      { slug: 'hexagonal-20x50', label: '20×50 mm', width: 20, height: 20, length: 50, pcsPerKg: 50 },
    ],
    image: '/products/hexagonal.svg',
    href: '/products/hexagonals',
    category: SHARED_CATEGORY,
    material: SHARED_MATERIAL,
  },
  {
    slug: 'dome',
    key: 'dome',
    name: 'D-shape / Dome',
    shortName: 'Dome',
    description:
      'Hemisphere briquettes shaped to seat flush against ceramic and silicone shisha bowls. Stable burn surface.',
    sizes: [
      { slug: 'dome-25mm', label: '25 mm', width: 25, height: 12, pcsPerKg: 80 },
      { slug: 'dome-30mm', label: '30 mm', width: 30, height: 15, pcsPerKg: 65 },
    ],
    image: '/products/dome.svg',
    href: '/products/domes',
    category: SHARED_CATEGORY,
    material: SHARED_MATERIAL,
  },
  {
    slug: 'flat',
    key: 'flat',
    name: 'Flat / Slab',
    shortName: 'Flat',
    description:
      'Flat slab cut for kaloud, foil and large-bowl applications. Maximum heat-management surface area.',
    sizes: [
      { slug: 'flat-25x25x17', label: '25×25×17 mm', width: 25, height: 17, length: 25, pcsPerKg: 75 },
      { slug: 'flat-30x30x17', label: '30×30×17 mm', width: 30, height: 17, length: 30, pcsPerKg: 55 },
    ],
    image: '/products/flat.svg',
    href: '/products/flats',
    category: SHARED_CATEGORY,
    material: SHARED_MATERIAL,
  },
  {
    slug: 'lotus',
    key: 'lotus',
    name: 'Lotus / Cloud',
    shortName: 'Lotus',
    description:
      'Decorative profile briquettes for premium shisha lounges. Same coconut shell formulation, distinctive shape.',
    sizes: [
      { slug: 'lotus-3pc', label: '3-piece set', configuration: '3-piece set', pcsPerKg: 30 },
      { slug: 'lotus-4pc', label: '4-piece set', configuration: '4-piece set', pcsPerKg: 25 },
    ],
    image: '/products/lotus.svg',
    href: '/products/cloud',
    category: SHARED_CATEGORY,
    material: SHARED_MATERIAL,
  },
];

/**
 * Use-case ("market") category pages under the Products pillar — the
 * café/lounge (bulk) vs. smoke-shop/retail (private label) landers. Slugs
 * match the site-architecture spelling exactly (`shisha-cafee`, double-e).
 */
export interface ProductMarket {
  /** URL slug under `/products/`. */
  slug: 'shisha-cafee' | 'shisha-shop';
  /** Stable key for i18n lookup (`productMarket.market[key]`). */
  key: 'cafe' | 'shop';
  /** Root-relative page URL. */
  href: string;
}

export const productMarkets: ProductMarket[] = [
  { slug: 'shisha-cafee', key: 'cafe', href: '/products/shisha-cafee' },
  { slug: 'shisha-shop', key: 'shop', href: '/products/shisha-shop' },
];

/** A single SKU = one size of one shape. Flattened view for the hub. */
export interface ProductSku {
  /** SKU slug (`{shape}-{size}`), e.g. `cube-25mm`. */
  slug: string;
  /** Detail-page URL (`/products/{slug}`). */
  href: string;
  /** Full display name, e.g. "Cube 25×25 mm". */
  name: string;
  /** The size record this SKU is built from. */
  size: ProductSize;
  /** The shape this SKU belongs to. */
  shape: ProductShape;
}

/** Root-relative detail-page URL for a SKU slug (`/products/{slug}`). */
export function skuHref(slug: string): string {
  return `/products/${slug}`;
}

/**
 * Flatten every shape × size into one SKU list (19 entries today), in
 * shape-then-size order. Powers the `/products` hub `ItemList` JSON-LD and
 * the per-shape size lists. The future `/products/[sku].astro` route can
 * `getStaticPaths()` over the same list.
 */
export function allSkus(): ProductSku[] {
  return productShapes.flatMap((shape) =>
    shape.sizes.map((size) => ({
      slug: size.slug,
      href: skuHref(size.slug),
      name: `${shape.name} ${size.label}`,
      size,
      shape,
    })),
  );
}
