/**
 * Single source of truth for contact details.
 *
 * Replace WHATSAPP_PHONE with the real number before launch. Every
 * component that builds a wa.me link imports from here.
 */

export const WHATSAPP_PHONE = '6281234567890'; // TODO: replace with real number before launch
export const WHATSAPP_DEFAULT_MESSAGE =
  'Hello, I am interested in your coconut charcoal briquettes.';

export function whatsappHref(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
