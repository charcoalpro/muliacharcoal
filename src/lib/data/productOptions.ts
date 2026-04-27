/**
 * Product-shape options for the inquiry-form checkbox group.
 * `id` is the value submitted to Web3Forms; `label` is the visible text.
 */
export interface ProductOption {
  id: string;
  label: string;
}

export const inquiryProductOptions: readonly ProductOption[] = [
  { id: 'cube', label: 'Cube' },
  { id: 'hexagonal', label: 'Hexagonal' },
  { id: 'finger', label: 'Finger' },
  { id: 'dome', label: 'Dome' },
  { id: 'flat', label: 'Flat' },
  { id: 'custom', label: 'Custom shape / private label' },
] as const;
