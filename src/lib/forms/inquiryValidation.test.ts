import { describe, it, expect } from 'vitest';
import {
  ATTACHMENT_MAX_BYTES,
  ATTACHMENT_MIME_TYPES,
  EMAIL_REGEX,
  WHATSAPP_E164_REGEX,
} from './inquiryValidation';

describe('EMAIL_REGEX', () => {
  it.each([
    'buyer@example.com',
    'b.uyer+tag@sub.example.co.uk',
    'export@muliacharcoal.com',
  ])('accepts %s', (input) => {
    expect(EMAIL_REGEX.test(input)).toBe(true);
  });

  it.each([
    '',
    'no-at-sign',
    'two@@signs.com',
    'spaces in@email.com',
    'no-dot@nope',
  ])('rejects %s', (input) => {
    expect(EMAIL_REGEX.test(input)).toBe(false);
  });
});

describe('WHATSAPP_E164_REGEX', () => {
  it.each(['+6282128768545', '+12025550123', '+123456'])(
    'accepts %s',
    (input) => {
      expect(WHATSAPP_E164_REGEX.test(input)).toBe(true);
    },
  );

  it.each([
    '6282128768545', // missing leading +
    '+62 821 287 68 545', // spaces
    '+62-821-287-685', // hyphens
    '+12345', // too short
    '',
  ])('rejects %s', (input) => {
    expect(WHATSAPP_E164_REGEX.test(input)).toBe(false);
  });
});

describe('attachment limits', () => {
  it('caps attachments at 5 MiB', () => {
    expect(ATTACHMENT_MAX_BYTES).toBe(5 * 1024 * 1024);
  });

  it('whitelists pdf, jpeg, and png only', () => {
    expect(ATTACHMENT_MIME_TYPES).toEqual([
      'application/pdf',
      'image/jpeg',
      'image/png',
    ]);
  });
});
