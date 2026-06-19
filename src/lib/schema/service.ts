/**
 * Service node builder — white-label / custom-print capability ONLY.
 *
 * One `Service` exists sitewide and its canonical home is
 * /packaging/white-label (consolidated revisions §1 — the hub does NOT
 * emit it). Neutral packaging is content + DefinedTerm, never a
 * Service. No Product/Offer anywhere in the packaging cluster.
 */

import { company } from '~/config/company';
import { siteOrigin, ORG_ID } from '~/lib/schema/ids';

interface ServiceArgs {
  /** Canonical page path, e.g. /packaging/white-label. */
  path: string;
  name: string;
  description: string;
}

export function whiteLabelServiceNode({ path, name, description }: ServiceArgs) {
  return {
    '@type': 'Service',
    '@id': `${siteOrigin}${path}#service`,
    serviceType: 'White-label (private label / OEM) coconut shisha charcoal manufacturing',
    name,
    description,
    provider: { '@id': ORG_ID },
    areaServed: company.priorityMarkets.map((market) => ({
      '@type': 'Place',
      name: market,
    })),
    url: `${siteOrigin}${path}`,
  };
}
