import { describe, it, expect } from 'vitest';
import { buildProductSchema } from './product';
import { ORG_ID, siteOrigin } from './organization';

const minimal = {
  slug: 'cube-25mm',
  title: '25mm Cube',
  description: 'Coconut shisha charcoal.',
  shape: 'cube',
  size: '25mm',
  datePublished: '2026-05-01',
  dateModified: '2026-05-12',
};

describe('buildProductSchema', () => {
  it('emits Product with absolute url + stable @id', () => {
    const s = buildProductSchema(minimal);
    expect(s['@type']).toBe('Product');
    expect(s.url).toBe(`${siteOrigin}/products/cube-25mm`);
    expect(s['@id']).toBe(`${siteOrigin}/products/cube-25mm#product`);
    expect(s.sku).toBe('cube-25mm');
  });

  it('manufacturer + offer.seller reference the Organization @id', () => {
    const s = buildProductSchema(minimal);
    expect((s.manufacturer as { '@id': string })['@id']).toBe(ORG_ID);
    expect((s.offers.seller as { '@id': string })['@id']).toBe(ORG_ID);
  });

  it('only includes additionalProperty entries for specs that are provided', () => {
    const s = buildProductSchema(minimal);
    const names = s.additionalProperty.map((p) => p.name);
    expect(names).toEqual(['Shape', 'Size']);
  });

  it('includes burn time, ash, moisture, and calorific value when supplied', () => {
    const s = buildProductSchema({
      ...minimal,
      massGramsPerPiece: 12,
      burnTimeMinutes: 75,
      ashContentPercent: 2.5,
      moistureContentPercent: 6,
      calorificValueKcalKg: 7500,
    });
    const names = s.additionalProperty.map((p) => p.name);
    expect(names).toContain('Burn time');
    expect(names).toContain('Ash content');
    expect(names).toContain('Moisture content');
    expect(names).toContain('Calorific value');
    expect(names).toContain('Mass per piece');
  });

  it('keeps zero-value ash/moisture (they are valid facts, not placeholders)', () => {
    const s = buildProductSchema({ ...minimal, ashContentPercent: 0 });
    const ash = s.additionalProperty.find((p) => p.name === 'Ash content');
    expect(ash?.value).toBe(0);
  });

  it('eligibleQuantity reflects the configured MOQ', () => {
    const s = buildProductSchema(minimal);
    const eq = s.offers.eligibleQuantity as { minValue: number; unitText: string };
    expect(typeof eq.minValue).toBe('number');
    expect(eq.minValue).toBeGreaterThan(0);
    expect(eq.unitText).toBe('metric ton');
  });
});
