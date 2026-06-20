/**
 * Breadcrumb helpers.
 *
 * The pillar crumb ({ label, href }) was restated inline on every cluster
 * child page (e.g. `{ label: en.logistics.breadcrumb, href: '/logistics' }`).
 * `pillarCrumb()` single-sources it so the pillar label + slug live in one
 * place; renaming a pillar or its breadcrumb label no longer means editing
 * every descendant. Returns exactly the { label, href } the pages used inline,
 * so the visible trail and the BreadcrumbList JSON-LD are unchanged.
 */
import en from '~/i18n/en';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

type Pillar = 'logistics' | 'packaging' | 'quality' | 'factory';

export function pillarCrumb(pillar: Pillar): BreadcrumbItem {
  switch (pillar) {
    case 'logistics':
      return { label: en.logistics.breadcrumb, href: '/logistics' };
    case 'packaging':
      return { label: en.packaging.breadcrumb, href: '/packaging' };
    case 'quality':
      return { label: en.quality.breadcrumb, href: '/quality' };
    case 'factory':
      return { label: en.factory.breadcrumb, href: '/factory' };
  }
}
