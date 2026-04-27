/**
 * WebPage JSON-LD builder for legal pages (privacy, terms, cookies).
 *
 * Used by `src/pages/legal/[slug].astro`. Pure function: takes the
 * resolved title / description / dates and returns a graph node ready
 * to pass into `BaseLayout.schema`.
 */

import { ORG_ID, WEBSITE_ID, siteOrigin } from '~/lib/schema/organization';

interface BuildArgs {
  /** URL path of the page, e.g. `/legal/privacy-policy`. */
  path: string;
  title: string;
  description: string;
  /** ISO date string `YYYY-MM-DD`. */
  dateModified: string;
  /** ISO date string `YYYY-MM-DD`. Defaults to dateModified. */
  datePublished?: string;
}

export function legalPageSchema({
  path,
  title,
  description,
  dateModified,
  datePublished,
}: BuildArgs) {
  const absoluteUrl = `${siteOrigin}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl}#webpage`,
    url: absoluteUrl,
    name: title,
    description,
    inLanguage: 'en',
    dateModified,
    datePublished: datePublished ?? dateModified,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
}
