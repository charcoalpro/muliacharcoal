import { describe, it, expect } from 'vitest';
import { fill, companyTokens } from './interpolate';
import { company } from '~/config/company';

describe('fill', () => {
  it('substitutes a single token', () => {
    expect(fill('Hello {{name}}', { name: 'World' })).toBe('Hello World');
  });

  it('substitutes multiple tokens', () => {
    expect(
      fill('{{a}} and {{b}}', { a: 'one', b: 'two' }),
    ).toBe('one and two');
  });

  it('leaves unknown tokens untouched so QA can see misses', () => {
    expect(fill('Hello {{name}}', {})).toBe('Hello {{name}}');
  });

  it('coerces numeric token values to strings', () => {
    expect(fill('{{count}} items', { count: 18 })).toBe('18 items');
  });

  it('returns templates without tokens unchanged', () => {
    expect(fill('plain text', { unused: 'x' })).toBe('plain text');
  });
});

describe('companyTokens', () => {
  it('includes the core company facts', () => {
    const t = companyTokens(company);
    expect(t.legalName).toBe(company.legalName);
    expect(t.brand).toBe(company.brand);
    expect(t.email).toBe(company.email);
    expect(t.moqTons).toBe(company.commercial.moq.tons);
  });

  it('derives addressFull from address parts (skipping placeholders only if falsy)', () => {
    const t = companyTokens(company);
    expect(typeof t.addressFull).toBe('string');
    expect((t.addressFull as string).length).toBeGreaterThan(0);
  });

  it('derives the executives string from people tagged executive', () => {
    const t = companyTokens(company);
    expect(typeof t.executives).toBe('string');
    expect((t.executives as string).length).toBeGreaterThan(0);
  });
});
