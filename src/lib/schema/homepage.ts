/**
 * Homepage JSON-LD `@graph` builder.
 *
 * Returns one `@graph` document containing every schema node the
 * homepage needs: Organization, WebSite, LocalBusiness, ItemList of
 * the six product shapes, FAQPage with 6–8 buyer-facing Q&A pairs,
 * and a one-item BreadcrumbList. Pass the result to `BaseLayout`'s
 * `schema` prop — it serialises the whole graph as a single
 * `<script type="application/ld+json">`.
 *
 * FAQ copy lives in `en.home.faq.items` so it can be translated.
 */

import en from '~/i18n/en.json';
import { buildOrganization, buildWebSite } from '~/lib/schema/organization';
import { localBusinessSchema } from '~/lib/schema/localBusiness';
import { productItemListSchema } from '~/lib/schema/itemList';
import { faqPageSchema } from '~/lib/schema/faqPage';
import { breadcrumbListSchema } from '~/lib/schema/breadcrumbList';
import { productShapes } from '~/config/products';

export function buildHomepageGraph() {
  const homeFaqItems = (en as { home?: { faq?: { items?: { q: string; a: string }[] } } })
    ?.home?.faq?.items ?? [];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganization({ mode: 'slim' }),
      buildWebSite(),
      // Strip the outer @context off LocalBusiness — it's already on @graph.
      (() => {
        const { '@context': _ctx, ...rest } = localBusinessSchema as { '@context': string } & Record<
          string,
          unknown
        >;
        return rest;
      })(),
      productItemListSchema(
        productShapes.map((p) => ({
          slug: p.slug,
          name: p.name,
          description: p.description,
          image: p.image,
        })),
      ),
      faqPageSchema(homeFaqItems),
      breadcrumbListSchema([{ name: 'Home', path: '/' }]),
    ],
  };
}
