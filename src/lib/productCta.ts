/**
 * Grade-page WhatsApp CTA links.
 *
 * Centralizes the product-specific click-to-chat hrefs so the grade page
 * and its extracted sub-blocks (GradeHero, etc.) build them identically.
 * Message bodies are the canonical presets in `company.whatsapp.presetMessages`
 * (config, per CLAUDE.md); the product name fills the `{{product}}` slot.
 */

import { company, waLink, waLinkFor } from '~/config/company';
import { fill } from '~/lib/interpolate';
import { gradeSlug } from '~/config/productRoutes';
import type { ProductShape, ProductSize } from '~/config/products';
import type { Grade } from '~/config/grades';

export interface GradeCtas {
  /** "Platinum 25×25 mm Cube" — display name used in prefill + message. */
  productName: string;
  /** `{shape}-{size}-{grade}` slug. */
  slug: string;
  /** Product-specific "free sample" chat (fires sample_request). */
  sampleHref: string;
  /** General quote / price-list chat. */
  quoteHref: string;
  /** "Chat with our expert" general sales chat. */
  chatHref: string;
  /** "Book a WhatsApp video call / virtual factory tour" chat. */
  tourHref: string;
}

export function gradeCtas(shape: ProductShape, size: ProductSize, grade: Grade): GradeCtas {
  const productName = `${grade.name} ${size.label} ${shape.name}`;
  return {
    productName,
    slug: gradeSlug(size, grade),
    sampleHref: waLink(fill(company.whatsapp.presetMessages.samplesProducts, { product: productName })),
    quoteHref: waLinkFor('quoteSpecs'),
    chatHref: waLinkFor('salesGeneral'),
    tourHref: waLinkFor('videoCallRequest'),
  };
}
