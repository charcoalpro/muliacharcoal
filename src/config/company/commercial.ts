/**
 * Commercial terms for buyers — MOQ, port of loading, lead time, payment.
 *
 * Fields are the structured source; human-readable strings derive from them
 * via the helpers in `helpers.ts`. Never add a pre-baked label field here —
 * the derived form cannot drift from the numbers only when there is no
 * denormalised copy to forget to update.
 */
export const commercial = {
  /** Minimum Order Quantity. */
  moq: {
    tons: 18,
    containers: 1,
    containerType: '20ft',
  },
  /** Port of loading for all FOB shipments. */
  portOfLoading: {
    name: 'Semarang',
    country: 'Indonesia',
    unLocode: 'IDSRG',
    incoterm: 'FOB',
  },
  /** Production lead time from deposit to ready-to-ship. */
  leadTime: {
    minDays: 14,
    maxDays: 21,
  },
  /** Default quote currency (USD). */
  currency: 'USD',
  paymentTerms: '30% T/T deposit, 70% against B/L copy',
  oemAvailable: true,
  /** Approved direct-booking shipping lines from Port of Semarang. Empty until confirmed. */
  shippingLines: [] as string[],
  /** Countries we have shipped to. Drives /about tag cloud and /markets index. */
  exportMarkets: [] as string[],
} as const;

/**
 * Inquiry form (Web3Forms) configuration.
 *
 * The access key is public per Web3Forms documentation but must be
 * set before the form will accept submissions in production.
 */
export const form = {
  web3formsEndpoint: 'https://api.web3forms.com/submit',
  web3formsKey: 'TODO_PLACEHOLDER_WEB3FORMS_ACCESS_KEY',
  captcha: {
    /** 'web3forms-builtin' = honeypot + light spam filter; 'hcaptcha' adds a widget; 'none' = honeypot only. */
    provider: 'web3forms-builtin' as 'web3forms-builtin' | 'hcaptcha' | 'none',
    hcaptchaSiteKey: 'TODO_PLACEHOLDER_HCAPTCHA_SITE_KEY',
  },
  subject: 'New wholesale inquiry — muliacharcoal.com',
  volumeOptions: [
    '1 × 20ft container (approx. 18 tons)',
    '2 × 20ft containers (approx. 36 tons)',
    '1 × 40ft container (approx. 26 tons)',
    'Monthly contract (recurring)',
    'Trial / sample only',
  ],
} as const;

/**
 * Payment mode — Contact page Block 11.
 *
 * 'public' renders the bank table with a fraud-warning callout.
 * 'gated' hides bank details and shows a "Request Proforma Invoice" CTA.
 */
export const payment = {
  mode: 'public' as 'public' | 'gated',
  terms: ['T/T 30/70 (30% deposit, 70% against B/L copy)', 'L/C at sight'],
  currencies: ['USD'],
  bankCountry: 'Indonesia',
  acceptsCrypto: false,
} as const;

/**
 * Banking — public on /contact when payment.mode === 'public'. Always
 * excluded from JSON-LD and meta tags. Treat every value below as part of
 * the pre-launch verification checklist — wiring instructions sent with a
 * fake bank are a fraud vector.
 */
export const bank = {
  accountName: 'PT Coco Reina Global Charcoal Indonesia',
  bankName: 'TODO_PLACEHOLDER_BANK_NAME',
  branch: 'TODO_PLACEHOLDER_BRANCH',
  bankAddress: 'TODO_PLACEHOLDER_BANK_ADDRESS',
  accountNumber: 'TODO_PLACEHOLDER_ACCOUNT_NUMBER',
  swiftCode: 'TODO_PLACEHOLDER_SWIFT',
  iban: null as string | null,
  currency: 'USD',
  /** ISO date — refresh when the director re-confirms the details by phone/video call. */
  lastVerified: '2026-04-25',
} as const;
