import { describe, it, expect } from 'vitest';
import { toE164 } from './format';

describe('toE164', () => {
  it('prepends `+` to bare digits', () => {
    expect(toE164('6282128768545')).toBe('+6282128768545');
  });

  it('leaves a `+`-prefixed value untouched', () => {
    expect(toE164('+6282128768545')).toBe('+6282128768545');
  });

  it('strips spaces and hyphens from bare digits before prefixing', () => {
    expect(toE164('62 821-287-68545')).toBe('+6282128768545');
  });

  it('returns the input when empty (no spurious `+`)', () => {
    expect(toE164('')).toBe('');
  });
});
