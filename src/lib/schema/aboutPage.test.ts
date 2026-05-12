import { describe, it, expect } from 'vitest';
import { aboutPageSchema } from './aboutPage';
import { ORG_ID, WEBSITE_ID } from './organization';

describe('aboutPageSchema', () => {
  const schema = aboutPageSchema({
    pageTitle: 'About Us',
    pageDescription: 'Mulia Charcoal — factory in Semarang.',
  });

  it('returns a two-node @graph: AboutPage + Organization (rich)', () => {
    expect(Array.isArray(schema['@graph'])).toBe(true);
    expect(schema['@graph']).toHaveLength(2);
    const types = schema['@graph'].map((n: { '@type': string }) => n['@type']);
    expect(types).toEqual(['AboutPage', 'Organization']);
  });

  it('AboutPage mainEntity references the Organization @id', () => {
    const aboutNode = schema['@graph'][0] as Record<string, unknown>;
    expect((aboutNode.mainEntity as { '@id': string })['@id']).toBe(ORG_ID);
    expect((aboutNode.isPartOf as { '@id': string })['@id']).toBe(WEBSITE_ID);
  });
});
