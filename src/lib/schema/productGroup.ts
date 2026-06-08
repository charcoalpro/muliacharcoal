/**
 * ProductGroup JSON-LD builder — the variant-family anti-duplication node.
 *
 * Each shape × size (e.g. "25×25 mm Cube") is a `ProductGroup`; its three
 * quality grades (Premium / Super-Premium / Platinum) are the variants.
 * Every grade SKU page is self-canonical AND declares `isVariantOf` this
 * group, and the group `hasVariant` all three grade Products. That pair of
 * back-references is what legitimizes three URLs per size to search and AI
 * engines — without it, the three grade pages read as near-duplicates.
 *
 * `variesBy` is a `DefinedTerm` ("Grade") because grade is not a schema.org
 * enumerated property; this is the extensible form Google accepts.
 *
 * There is no `/products/{shape}-{size}` page — the group is an identity
 * node only, so it carries no `url` (its variants carry the canonical URLs).
 */

import { ORG_ID, siteOrigin } from '~/lib/schema/organization';

/** Canonical `@id` for a size's ProductGroup, so refs and the node agree. */
export function productGroupId(sizeSlug: string): string {
  return `${siteOrigin}/products/${sizeSlug}#productgroup`;
}

export interface ProductGroupInput {
  /** Size slug (`{shape}-{size}`, e.g. `cube-25mm`) — the family key. */
  sizeSlug: string;
  name: string;
  description: string;
  /** Absolute or root-relative image URL. */
  image: string;
  category: string;
  material: string;
  /** `@id`s of the three grade Product nodes that vary this group. */
  variantIds: string[];
}

export function productGroupSchema(input: ProductGroupInput) {
  return {
    '@type': 'ProductGroup' as const,
    '@id': productGroupId(input.sizeSlug),
    name: input.name,
    description: input.description,
    brand: { '@id': ORG_ID },
    manufacturer: { '@id': ORG_ID },
    category: input.category,
    material: input.material,
    image: input.image.startsWith('http') ? input.image : `${siteOrigin}${input.image}`,
    productGroupID: input.sizeSlug,
    variesBy: [{ '@type': 'DefinedTerm', name: 'Grade' }],
    hasVariant: input.variantIds.map((id) => ({ '@id': id })),
  };
}
