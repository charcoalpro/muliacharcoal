/**
 * WebPage JSON-LD builder for static pages whose primary content is rendered
 * Markdown (legal pages today; about/article pages in the future).
 *
 * Returns a single `WebPage` graph linked to the site-wide Organization +
 * WebSite graphs by `@id`. Dates are emitted as ISO yyyy-mm-dd.
 */

import { siteOrigin, absoluteUrl } from '~/lib/url';

export interface WebPageSchemaInput {
  /** Site-relative path, e.g. `/privacy-policy`. */
  path: string;
  name: string;
  description: string;
  /** Last modified date — required. */
  lastUpdated: Date;
  /** First published date — falls back to `lastUpdated` when missing. */
  datePublished?: Date;
  inLanguage?: string;
}

export function webPageSchema({
  path,
  name,
  description,
  lastUpdated,
  datePublished,
  inLanguage = 'en',
}: WebPageSchemaInput) {
  const origin = siteOrigin();
  const absolute = absoluteUrl(path);
  const isoModified = lastUpdated.toISOString().split('T')[0];
  const isoPublished = (datePublished ?? lastUpdated).toISOString().split('T')[0];

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absolute}#webpage`,
    url: absolute,
    name,
    description,
    inLanguage,
    dateModified: isoModified,
    datePublished: isoPublished,
    isPartOf: { '@id': `${origin}/#website` },
    about: { '@id': `${origin}/#organization` },
    publisher: { '@id': `${origin}/#organization` },
  } as const;
}
