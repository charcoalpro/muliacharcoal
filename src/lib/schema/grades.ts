/**
 * Grade Product schema builder.
 *
 * Each of the three quality grades (Premium / Super Premium / Platinum)
 * emits a `@type: 'Product'` node, joined to the homepage `@graph` via
 * `~/lib/schema/homepage.ts`. The grades are commercial variants of the
 * same coconut shell formulation, so they each reference the
 * Organization `@id` as `brand` and `manufacturer`, and carry the same
 * `category` / `material` strings used for the shape Products in
 * `~/lib/schema/itemList.ts`.
 *
 * The seven measured properties (ash, moisture, fixed carbon, burn time,
 * burn temp, calorie value, drop test) are emitted as
 * `additionalProperty` PropertyValue entries so the structured data
 * mirrors the visible specifications table cell-for-cell. Numeric
 * `minValue` / `maxValue` are included whenever the underlying
 * `SpecValue` has them; the visible `display` string is used for
 * `value` so the schema text matches what a reader sees.
 */

import { ORG_ID, siteOrigin } from '~/lib/schema/ids';
import { grades, gradePropertyKeys, type Grade, type SpecValue, type GradePropertyKey } from '~/config/grades';
import { company } from '~/config/company';

const SHARED_CATEGORY = 'Shisha charcoal briquette';
const SHARED_MATERIAL = 'Coconut shell';

/** Human-readable label for each measured grade property. Shared with
 * `~/lib/schema/productGradePage.ts`; the visible label lives in i18n. */
export const PROPERTY_LABELS: Record<GradePropertyKey, string> = {
  ash: 'Ash content',
  moisture: 'Moisture',
  fixedCarbon: 'Fixed carbon',
  burnTime: 'Burn time',
  burnTemp: 'Burn temperature',
  calorieValue: 'Calorific value',
  dropTest: 'Drop test',
};

interface PropertyValueNode {
  '@type': 'PropertyValue';
  name: string;
  value: string;
  minValue?: number;
  maxValue?: number;
  unitText?: string;
}

/** Project a SpecValue into a schema.org PropertyValue node. Shared with
 *  `~/lib/schema/productGradePage.ts` so the homepage grade Products and the
 *  grade-page Products advertise identical structured specs. */
export function specProperty(label: string, spec: SpecValue): PropertyValueNode {
  return {
    '@type': 'PropertyValue',
    name: label,
    value: spec.display,
    ...(typeof spec.min === 'number' ? { minValue: spec.min } : {}),
    ...(typeof spec.max === 'number' ? { maxValue: spec.max } : {}),
    ...(spec.unit ? { unitText: spec.unit } : {}),
  };
}

function propertyValueFor(key: GradePropertyKey, spec: SpecValue): PropertyValueNode {
  return specProperty(PROPERTY_LABELS[key], spec);
}

export function gradeProductsSchema(input: Grade[] = grades) {
  return input.map((g) => ({
    '@type': 'Product' as const,
    '@id': `${siteOrigin}/#grade-${g.key}`,
    name: `${company.brand} ${g.name}`,
    description: g.description,
    category: SHARED_CATEGORY,
    material: SHARED_MATERIAL,
    brand: { '@id': ORG_ID },
    manufacturer: { '@id': ORG_ID },
    additionalProperty: gradePropertyKeys.map((k) =>
      propertyValueFor(k, g[k]),
    ),
  }));
}
