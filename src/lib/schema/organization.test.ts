import { describe, it, expect } from 'vitest';
import {
  ORG_ID,
  WEBSITE_ID,
  siteOrigin,
  buildOrganization,
  buildPostalAddress,
  buildWebSite,
  getSameAs,
} from './organization';
import { company } from '~/config/company';

describe('siteOrigin & ids', () => {
  it('strips any trailing slash from company.siteUrl', () => {
    expect(siteOrigin.endsWith('/')).toBe(false);
  });

  it('@ids are stable absolute URLs', () => {
    expect(ORG_ID).toBe(`${siteOrigin}/#organization`);
    expect(WEBSITE_ID).toBe(`${siteOrigin}/#website`);
  });
});

describe('buildPostalAddress', () => {
  const addr = buildPostalAddress();

  it('always carries city, region, and ISO country code', () => {
    expect(addr.addressLocality).toBe(company.address.city);
    expect(addr.addressRegion).toBe(company.address.region);
    expect(addr.addressCountry).toBe(company.address.countryCode);
  });

  it('omits TODO_PLACEHOLDER street/postalCode rather than advertising them', () => {
    if (company.address.street.startsWith('TODO_PLACEHOLDER')) {
      expect('streetAddress' in addr).toBe(false);
    }
    if (company.address.postalCode.startsWith('TODO_PLACEHOLDER')) {
      expect('postalCode' in addr).toBe(false);
    }
  });
});

describe('getSameAs', () => {
  it('returns only non-null social URLs (no empty strings, no nulls)', () => {
    const list = getSameAs();
    for (const url of list) {
      expect(typeof url).toBe('string');
      expect(url.length).toBeGreaterThan(0);
    }
  });
});

describe('buildOrganization', () => {
  it('slim mode emits the homepage shape (no founder, no taxID)', () => {
    const org = buildOrganization({ mode: 'slim' });
    expect(org['@type']).toBe('Organization');
    expect(org['@id']).toBe(ORG_ID);
    expect(org.legalName).toBe(company.legalName);
    expect('founder' in org).toBe(false);
    expect('taxID' in org).toBe(false);
  });

  it('rich mode adds founder + taxID + identifier[]', () => {
    const org = buildOrganization({ mode: 'rich' }) as Record<string, unknown>;
    expect(org.taxID).toBe(company.registration.taxId);
    expect(Array.isArray(org.identifier)).toBe(true);
    const ids = org.identifier as Array<{ propertyID: string; value: string }>;
    expect(ids.map((i) => i.propertyID).sort()).toEqual(['NIB', 'NPWP']);
  });

  it('telephone uses canonical E.164 (`+`-prefixed)', () => {
    const org = buildOrganization() as { telephone: string };
    expect(org.telephone.startsWith('+')).toBe(true);
  });
});

describe('buildWebSite', () => {
  it('publisher references the Organization @id, not a duplicate copy', () => {
    const ws = buildWebSite() as { publisher: { '@id': string } };
    expect(ws.publisher['@id']).toBe(ORG_ID);
  });
});
