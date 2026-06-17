/**
 * Token bag for the grade (SKU) leaf page and its `grade/*` sub-blocks.
 *
 * Extends `companyTokens()` with the per-grade / per-size facts the grade
 * page interpolates into copy. Exported as a typed helper so `GradePage`
 * (the producer) and every grade sub-block (the consumers) share one shape:
 * a renamed or removed token key now fails type-check instead of silently
 * rendering `{{token}}` — which the loosely-typed `Record<string, …>` prop
 * the sub-blocks used previously could not catch.
 *
 * `productName` is passed in (the page already derives it via `gradeCtas`)
 * rather than recomputed here.
 */
import { company, yearsInBusiness } from '~/config/company';
import { companyTokens } from '~/lib/interpolate';
import { grades, type Grade } from '~/config/grades';
import type { ProductShape, ProductSize } from '~/config/products';

export function gradeTokens(
  shape: ProductShape,
  size: ProductSize,
  grade: Grade,
  productName: string,
) {
  const weightG = size.pcsPerKg ? Math.round(1000 / size.pcsPerKg) : undefined;
  return {
    ...companyTokens(company),
    grade: grade.name,
    gradeLower: grade.name.toLowerCase(),
    size: size.label,
    shape: shape.shortName,
    shapeLower: shape.shortName.toLowerCase(),
    product: productName,
    ash: grade.ash.display,
    burnTime: grade.burnTime.display,
    burnTemp: grade.burnTemp.display,
    fixedCarbon: grade.fixedCarbon.display,
    calorieValue: grade.calorieValue.display,
    moisture: grade.moisture.display,
    dropTest: grade.dropTest.display,
    pcsPerKg: size.pcsPerKg ?? '—',
    pcsPerBox: size.pcsPerKg ? size.pcsPerKg * 20 : '—',
    weightG: weightG ?? '—',
    reviewer: company.governance.reviewer.name,
    reviewerRole: company.governance.reviewer.role,
    years: yearsInBusiness(),
    gradeCount: grades.length,
    currency: company.commercial.currency,
    fobLow: grade.fobRange?.low ?? '',
    fobHigh: grade.fobRange?.high ?? '',
    fobUnit: grade.fobRange?.unit ?? '',
    innerPlasticMicron: company.packaging.primaryPlastic.thicknessMicrons ?? '',
  };
}

/** The exact token shape produced by {@link gradeTokens}. */
export type GradeTokens = ReturnType<typeof gradeTokens>;
