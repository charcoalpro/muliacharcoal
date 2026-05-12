import { describe, it, expect } from 'vitest';
import {
  hasFact,
  moqLabel,
  portOfLoadingLabel,
  leadTimeLabel,
  imdgLabel,
  yearsInBusiness,
  waLink,
  mailto,
  waLinkFor,
  getOwner,
  getDirector,
  getSales,
  getExecutives,
  getOperations,
  getContactTeam,
} from './helpers';
import { company } from './index';

describe('hasFact', () => {
  it('returns false for nullish / empty', () => {
    expect(hasFact(null)).toBe(false);
    expect(hasFact(undefined)).toBe(false);
    expect(hasFact('')).toBe(false);
    expect(hasFact([])).toBe(false);
    expect(hasFact({})).toBe(false);
  });

  it('returns false for TODO_PLACEHOLDER strings', () => {
    expect(hasFact('TODO_PLACEHOLDER_X')).toBe(false);
  });

  it('returns false for the numeric sentinel `0`', () => {
    expect(hasFact(0)).toBe(false);
  });

  it('returns true for confirmed values', () => {
    expect(hasFact('Wilson')).toBe(true);
    expect(hasFact(18)).toBe(true);
    expect(hasFact(['a'])).toBe(true);
    expect(hasFact({ k: 1 })).toBe(true);
  });
});

describe('label builders', () => {
  it('moqLabel reads MOQ from commercial config', () => {
    const out = moqLabel();
    expect(out).toContain(String(company.commercial.moq.tons));
    expect(out).toContain(company.commercial.moq.containerType);
  });

  it('portOfLoadingLabel is `INCOTERM City, Country`', () => {
    expect(portOfLoadingLabel()).toBe('FOB Semarang, Indonesia');
  });

  it('leadTimeLabel uses an en-dash between min and max days', () => {
    expect(leadTimeLabel()).toMatch(/^\d+–\d+ days$/);
  });

  it('imdgLabel cites UN number, class, and description', () => {
    const out = imdgLabel();
    expect(out).toContain('UN 1361');
    expect(out).toContain('Class 4.2');
    expect(out).toContain('spontaneous combustion');
  });
});

describe('yearsInBusiness', () => {
  it('subtracts founding year from the supplied date', () => {
    expect(yearsInBusiness(new Date('2030-01-01T00:00:00Z'))).toBe(
      2030 - company.foundingYear,
    );
  });
});

describe('URL builders', () => {
  it('waLink uses the bare-digit WhatsApp number', () => {
    expect(waLink('hello')).toBe(
      `https://wa.me/${company.whatsapp.e164Digits}?text=hello`,
    );
  });

  it('waLink URI-encodes the message body', () => {
    expect(waLink('hi & bye?')).toContain('hi%20%26%20bye%3F');
  });

  it('mailto includes a subject when given', () => {
    expect(mailto('Quote request')).toBe(
      `mailto:${company.email}?subject=Quote%20request`,
    );
  });

  it('mailto omits the query string when no subject is given', () => {
    expect(mailto()).toBe(`mailto:${company.email}`);
  });

  it('waLinkFor picks the preset message and the supplied digits', () => {
    const out = waLinkFor('heroCta');
    expect(out.startsWith(`https://wa.me/${company.whatsapp.e164Digits}?text=`)).toBe(true);
  });
});

describe('people accessors', () => {
  it('getOwner returns exactly one person tagged owner', () => {
    const owner = getOwner();
    expect(owner).toBeDefined();
    expect(owner!.displayIn).toContain('owner');
  });

  it('getDirector matches the whatsapp-director tag', () => {
    const d = getDirector();
    expect(d).toBeDefined();
    expect(d!.displayIn).toContain('whatsapp-director');
  });

  it('getSales matches the whatsapp-sales tag', () => {
    const s = getSales();
    expect(s).toBeDefined();
    expect(s!.displayIn).toContain('whatsapp-sales');
  });

  it('executives, operations, contact-team are non-empty arrays', () => {
    expect(getExecutives().length).toBeGreaterThan(0);
    expect(getOperations().length).toBeGreaterThan(0);
    expect(getContactTeam().length).toBeGreaterThan(0);
  });
});
