import { describe, it, expect } from 'vitest';
import { localBusinessSchema } from './localBusiness';

describe('localBusinessSchema', () => {
  it('declares LocalBusiness with a stable @id', () => {
    expect(localBusinessSchema['@type']).toBe('LocalBusiness');
    expect(localBusinessSchema['@id'].endsWith('/contact#localbusiness')).toBe(true);
  });

  it('every telephone field is `+`-prefixed E.164 (no bare digits)', () => {
    expect(localBusinessSchema.telephone.startsWith('+')).toBe(true);
    for (const cp of localBusinessSchema.contactPoint) {
      expect(cp.telephone.startsWith('+')).toBe(true);
    }
  });

  it('declares opening hours and at least one contact point', () => {
    expect(localBusinessSchema.openingHoursSpecification.length).toBeGreaterThan(0);
    expect(localBusinessSchema.contactPoint.length).toBeGreaterThan(0);
  });

  it('omits banking details entirely (fraud-vector check)', () => {
    const serialized = JSON.stringify(localBusinessSchema);
    expect(serialized.toLowerCase()).not.toContain('iban');
    expect(serialized.toLowerCase()).not.toContain('swift');
    expect(serialized.toLowerCase()).not.toContain('accountnumber');
  });
});
