/**
 * Product child-route generation + the published-set switch.
 *
 * Three page templates live under `/products/` and are all generated from
 * config (no per-page files): grade SKU pages (`{shape}-{size}-{grade}`),
 * shape-category pages (`{shape-plural}`), and market-category pages
 * (`shisha-cafee` / `shisha-shop`).
 *
 * `PUBLISHED_*` is the single phase switch. It controls BOTH what
 * `getStaticPaths()` builds in `src/pages/products/[slug].astro` AND which
 * routes `~/config/nav.ts` treats as live (so `<MaybeLink>` lights up
 * exactly the built routes and never points at a 404). Bringing more
 * shapes/markets online is a one-line edit here.
 *
 * Kept separate from `products.ts` / `grades.ts` (pure data) so those stay
 * import-cycle-free; this module is the only place that joins them.
 */

import {
  productShapes,
  productMarkets,
  type ProductShape,
  type ProductSize,
  type ProductMarket,
} from '~/config/products';
import { grades, type Grade } from '~/config/grades';

// --- Phase switch -------------------------------------------------------
// Phase B: the full matrix is live — every shape's grade pages + category
// page, and both market landers (57 grade + 6 category + 2 market). To roll
// back to a subset, list only the keys to publish here; everything else
// degrades to muted `<MaybeLink>` text automatically.
export const PUBLISHED_SHAPE_KEYS: ReadonlyArray<ProductShape['key']> = [
  'cube', 'stix', 'hexagonal', 'dome', 'flat', 'lotus',
];
export const PUBLISHED_MARKET_KEYS: ReadonlyArray<ProductMarket['key']> = ['cafe', 'shop'];

// --- Grade slug helpers (single source for `{shape}-{size}-{grade}`) ----
/** `cube-25mm` + `platinum` → `cube-25mm-platinum`. */
export const gradeSlug = (size: ProductSize, grade: Grade): string =>
  `${size.slug}-${grade.key}`;
/** Root-relative grade-page URL. */
export const gradeHref = (size: ProductSize, grade: Grade): string =>
  `/products/${gradeSlug(size, grade)}`;

// --- Published-set selectors -------------------------------------------
export function publishedShapes(): ProductShape[] {
  return productShapes.filter((s) => PUBLISHED_SHAPE_KEYS.includes(s.key));
}
export function publishedMarkets(): ProductMarket[] {
  return productMarkets.filter((m) => PUBLISHED_MARKET_KEYS.includes(m.key));
}

/** One resolved grade page: the params + all the data its template needs. */
export interface GradePageEntry {
  slug: string;
  href: string;
  shape: ProductShape;
  size: ProductSize;
  grade: Grade;
}

/** Every grade page for the currently published shapes (Phase A: Cube ×3). */
export function publishedGradePages(): GradePageEntry[] {
  return publishedShapes().flatMap((shape) =>
    shape.sizes.flatMap((size) =>
      grades.map((grade) => ({
        slug: gradeSlug(size, grade),
        href: gradeHref(size, grade),
        shape,
        size,
        grade,
      })),
    ),
  );
}

/**
 * The three grade pages of one size, in grade order — used by the grade
 * page's "Available Grades for This Size" block and the category page's
 * per-size grade links. Always returns all three (the variant family is
 * complete regardless of the published-shape filter).
 */
export function gradesForSize(size: ProductSize): GradePageEntry[] {
  const shape = productShapes.find((s) => s.sizes.some((z) => z.slug === size.slug))!;
  return grades.map((grade) => ({
    slug: gradeSlug(size, grade),
    href: gradeHref(size, grade),
    shape,
    size,
    grade,
  }));
}

/**
 * Every live `/products/*` child path for the published set: shape-category
 * pages, market pages, and grade pages. Unioned into `LIVE_ROUTES` so
 * `isLive()` / `<MaybeLink>` resolve real links only for built routes.
 */
export function publishedProductRoutes(): string[] {
  return [
    ...publishedShapes().map((s) => s.href),
    ...publishedMarkets().map((m) => m.href),
    ...publishedGradePages().map((g) => g.href),
  ];
}
