/**
 * BreadcrumbList schema builder.
 *
 * The visual `<Breadcrumbs>` component already emits its own JSON-LD on
 * deeper pages. The homepage uses this builder explicitly so the single
 * homepage `@graph` includes a one-item breadcrumb (Home → /), which
 * search engines treat as the canonical entry point.
 */

import { siteOrigin } from '~/lib/schema/organization';

export interface BreadcrumbItem {
  name: string;
  /** Root-relative path (e.g. '/', '/products'). */
  path: string;
}

export function breadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item:
        item.path === '/'
          ? siteOrigin
          : `${siteOrigin}${item.path.startsWith('/') ? item.path : `/${item.path}`}`,
    })),
  };
}
