/**
 * Product catalogue — single source of truth for the six shape families
 * we offer. Drives the homepage Products section, the future
 * `/products` pillar, and the JSON-LD `ItemList` graph node.
 *
 * `image` is the root-relative path under `/public/` or the slot key for
 * `ImagePlaceholder` until real photos land. Sizes are the SKU
 * dimensions per shape; the `/products/{shape}-{size}` SKU page will
 * read them later.
 *
 * Description copy lives here (not in i18n) only when the structured
 * data needs the same string the page renders — for visible product
 * names + supporting copy on the homepage we still pull from
 * `en.home.products.items.<key>` so the i18n layer remains canonical
 * for everything user-visible.
 */

export interface ProductShape {
  /** Slug used in URLs and i18n keys. */
  slug: string;
  /** Stable key for i18n lookup — `en.home.products.items[key]`. */
  key:
    | 'cube'
    | 'stix'
    | 'hexagonal'
    | 'dome'
    | 'flat'
    | 'lotus';
  /** Display name (English). */
  name: string;
  /** Short paragraph used by JSON-LD and the card subtitle fallback. */
  description: string;
  /** Available sizes for this shape, in canonical "{w}x{h}x{l}mm" or "{n}mm" form. */
  sizes: string[];
  /** Public image path (or placeholder slot key). */
  image: string;
  /** Forward-pointing path to the future shape category page. */
  href: string;
}

export const productShapes: ProductShape[] = [
  {
    slug: 'cube',
    key: 'cube',
    name: 'Cube',
    description:
      'Compressed coconut shell charcoal cubes — the most common shisha format worldwide. Edges are uniformly cut, no cracks at first ignition.',
    sizes: ['22mm', '25mm', '26mm'],
    image: '/products/cube.svg',
    href: '/products/cubes',
  },
  {
    slug: 'stix',
    key: 'stix',
    name: 'Stix / Finger',
    description:
      'Slim finger briquettes for kaloud and HMD-style heat management devices. Long burn at low surface temperature.',
    sizes: ['10×10×100mm'],
    image: '/products/stix.svg',
    href: '/products/fingers',
  },
  {
    slug: 'hexagonal',
    key: 'hexagonal',
    name: 'Hexagonal',
    description:
      'Six-sided briquettes with a centre hole — preferred by retail tobacco brands for shelf appeal and even ignition.',
    sizes: ['22×50mm'],
    image: '/products/hexagonal.svg',
    href: '/products/hexagonals',
  },
  {
    slug: 'dome',
    key: 'dome',
    name: 'D-Shape / Dome',
    description:
      'Hemisphere briquettes shaped to seat flush against ceramic and silicone shisha bowls. Stable burn surface.',
    sizes: ['25mm'],
    image: '/products/dome.svg',
    href: '/products/domes',
  },
  {
    slug: 'flat',
    key: 'flat',
    name: 'Flat / Slab',
    description:
      'Flat slab cut for kaloud, foil, and large-bowl applications. Maximum heat-management surface area.',
    sizes: ['25×25×17mm'],
    image: '/products/flat.svg',
    href: '/products/flats',
  },
  {
    slug: 'lotus',
    key: 'lotus',
    name: 'Lotus / Cloud',
    description:
      'Decorative profile briquettes for premium shisha lounges. Same coconut shell formulation, distinctive shape.',
    sizes: ['Custom'],
    image: '/products/lotus.svg',
    href: '/products/cloud',
  },
];
