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
  /** Display name (English). */
  name: string;
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
    description:
      'Compressed coconut shell charcoal cubes — the most common shisha format worldwide. Edges are uniformly cut, no first-light cracking.',
    sizes: [
      { label: '22×22 mm', width: 22, height: 22, length: 22, pcsPerKg: 120 },
      { label: '25×25 mm', width: 25, height: 25, length: 25, pcsPerKg: 96 },
      { label: '26×26 mm', width: 26, height: 26, length: 26, pcsPerKg: 85 },
      { label: '27×27 mm', width: 27, height: 27, length: 27, pcsPerKg: 78 },
      { label: '28×28 mm', width: 28, height: 28, length: 28, pcsPerKg: 70 },
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
    description:
      'Slim finger briquettes for kaloud and HMD-style heat-management devices. Long burn at low surface temperature.',
    sizes: [
      { label: '18×35 mm', width: 18, height: 18, length: 35, pcsPerKg: 80 },
      { label: '18×50 mm', width: 18, height: 18, length: 50, pcsPerKg: 60 },
      { label: '20×35 mm', width: 20, height: 20, length: 35, pcsPerKg: 65 },
      { label: '20×50 mm', width: 20, height: 20, length: 50, pcsPerKg: 50 },
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
    description:
      'Six-sided briquettes with a centre hole — preferred by retail tobacco brands for shelf appeal and even ignition.',
    sizes: [
      { label: '18×35 mm', width: 18, height: 18, length: 35, pcsPerKg: 80 },
      { label: '18×50 mm', width: 18, height: 18, length: 50, pcsPerKg: 60 },
      { label: '20×35 mm', width: 20, height: 20, length: 35, pcsPerKg: 65 },
      { label: '20×50 mm', width: 20, height: 20, length: 50, pcsPerKg: 50 },
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
    description:
      'Hemisphere briquettes shaped to seat flush against ceramic and silicone shisha bowls. Stable burn surface.',
    sizes: [
      { label: '25 mm', width: 25, height: 12, pcsPerKg: 80 },
      { label: '30 mm', width: 30, height: 15, pcsPerKg: 65 },
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
    description:
      'Flat slab cut for kaloud, foil and large-bowl applications. Maximum heat-management surface area.',
    sizes: [
      { label: '25×25×17 mm', width: 25, height: 17, length: 25, pcsPerKg: 75 },
      { label: '30×30×17 mm', width: 30, height: 17, length: 30, pcsPerKg: 55 },
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
    description:
      'Decorative profile briquettes for premium shisha lounges. Same coconut shell formulation, distinctive shape.',
    sizes: [
      { label: '3-piece set', configuration: '3-piece set', pcsPerKg: 30 },
      { label: '4-piece set', configuration: '4-piece set', pcsPerKg: 25 },
    ],
    image: '/products/lotus.svg',
    href: '/products/cloud',
    category: SHARED_CATEGORY,
    material: SHARED_MATERIAL,
  },
];
