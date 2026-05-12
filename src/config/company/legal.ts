/**
 * Indonesian business registration + governing-law / arbitration facts.
 *
 * Drives Organization JSON-LD identifiers (NIB, NPWP) and the Terms &
 * Conditions § Governing Law & Disputes section.
 */
export const registration = {
  /** Nomor Induk Berusaha — Indonesian unified business registration number. */
  nib: '0220001680488',
  /** NPWP — Indonesian corporate tax identification number. */
  taxId: '94.608.951.3-524.000',
} as const;

export const legal = {
  /** Controlling law for all buyer/seller agreements. */
  governingLaw: 'Republic of Indonesia',
  /** Arbitration forum used when good-faith negotiation fails. */
  arbitration: {
    institution: 'Indonesian National Board of Arbitration',
    /** Short Indonesian acronym, commonly used in legal text. */
    institutionShort: 'BANI',
    seat: 'Jakarta, Indonesia',
  },
} as const;
