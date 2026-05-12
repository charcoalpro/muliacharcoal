import { describe, it, expect } from 'vitest';
import { legalPageSchema } from './legalPage';
import { ORG_ID, WEBSITE_ID, siteOrigin } from './organization';

describe('legalPageSchema', () => {
  const schema = legalPageSchema({
    path: '/legal/privacy-policy',
    title: 'Privacy Policy',
    description: 'How we handle data.',
    dateModified: '2026-05-01',
  });

  it('emits WebPage with absolute @id and url', () => {
    expect(schema['@type']).toBe('WebPage');
    expect(schema['@id']).toBe(`${siteOrigin}/legal/privacy-policy#webpage`);
    expect(schema.url).toBe(`${siteOrigin}/legal/privacy-policy`);
  });

  it('defaults datePublished to dateModified when omitted', () => {
    expect(schema.datePublished).toBe('2026-05-01');
  });

  it('preserves an explicit datePublished when given', () => {
    const s = legalPageSchema({
      path: '/legal/terms',
      title: 'Terms',
      description: '...',
      dateModified: '2026-05-12',
      datePublished: '2026-01-01',
    });
    expect(s.datePublished).toBe('2026-01-01');
  });

  it('publisher and about reference the Organization @id (no duplication)', () => {
    expect((schema.about as { '@id': string })['@id']).toBe(ORG_ID);
    expect((schema.publisher as { '@id': string })['@id']).toBe(ORG_ID);
    expect((schema.isPartOf as { '@id': string })['@id']).toBe(WEBSITE_ID);
  });
});
