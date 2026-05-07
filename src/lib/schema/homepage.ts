/**
 * Homepage JSON-LD `@graph` builder.
 *
 * Returns one `@graph` document containing every schema node the
 * homepage needs: Organization, WebSite, LocalBusiness, ItemList of
 * the six product shapes, three Grade Product variants, FAQPage with
 * the buyer FAQ + the specs glossary entries, and a one-item
 * BreadcrumbList. Pass the result to `BaseLayout`'s `schema` prop —
 * it serialises the whole graph as a single
 * `<script type="application/ld+json">`.
 *
 * FAQ copy lives in `en.home.faq.items` (general buyer FAQ) and
 * `en.home.specs.glossary.items` (specs glossary). Tokens
 * (e.g. `{{moqLabel}}`, `{{port}}`) are interpolated against the
 * company config before the graph is emitted, so the schema text is
 * the same string a buyer reads on the page.
 */

import en from '~/i18n/en.json';
import { company } from '~/config/company';
import { fill, companyTokens } from '~/lib/interpolate';
import { buildOrganization, buildWebSite } from '~/lib/schema/organization';
import { localBusinessSchema } from '~/lib/schema/localBusiness';
import { productItemListSchema } from '~/lib/schema/itemList';
import { gradeProductsSchema } from '~/lib/schema/grades';
import { faqPageSchema } from '~/lib/schema/faqPage';
import { breadcrumbListSchema } from '~/lib/schema/breadcrumbList';
import { videoObjectSchema } from '~/lib/schema/videoObject';
import { imageGallerySchema, imageObjectSchema } from '~/lib/schema/imageObject';
import { productShapes } from '~/config/products';
import {
  galleryPhotos,
  galleryVideos,
  galleryLastUpdated,
  hasAssets as hasGalleryAssets,
} from '~/config/gallery';
import { siteOrigin } from '~/lib/schema/organization';

export function buildHomepageGraph() {
  const tokens = companyTokens(company);

  const baseFaq = en.home.faq.items.map((item) => ({
    q: fill(item.q, tokens),
    a: fill(item.a, tokens),
  }));

  const glossaryFaq = (en.home.specs.glossary?.items ?? []).map((item) => ({
    q: fill(item.q, tokens),
    a: fill(item.a, tokens),
  }));

  const oemFaq = (en.home.oem.faq?.items ?? []).map((item) => ({
    q: fill(item.q, tokens),
    a: fill(item.a, tokens),
  }));

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
          category: p.category,
          material: p.material,
          sizes: p.sizes,
        })),
      ),
      ...gradeProductsSchema(),
      faqPageSchema([...baseFaq, ...glossaryFaq, ...oemFaq]),
      breadcrumbListSchema([{ name: 'Home', path: '/' }]),
      // Append the factory-tour VideoObject only when the YouTube ID
      // and upload date are real — `videoObjectSchema` returns null
      // otherwise. The .filter(Boolean) below drops the null.
      videoObjectSchema({ ...company.factoryTourVideo, id: 'factory-tour' }),
      // Gallery schema — only emit ImageObject + ImageGallery when
      // `hasGalleryAssets` is flipped true (i.e. real photos have
      // landed at /public/gallery/). Until then, we never advertise
      // broken contentUrls to search engines.
      ...(hasGalleryAssets
        ? [
            ...galleryPhotos.map((p) =>
              imageObjectSchema({
                id: p.id,
                name: p.caption,
                description: p.alt,
                contentUrl: p.contentPath,
                thumbnailUrl: p.thumbnailPath,
                datePublished: p.datePublished,
              }),
            ),
            ...galleryVideos
              .map((v) =>
                videoObjectSchema({
                  id: v.id,
                  youtubeId: v.youtubeId,
                  name: v.title,
                  description: v.description,
                  durationISO: v.durationISO,
                  uploadDate: v.uploadDate,
                  thumbnailUrl: v.posterPath,
                }),
              )
              .filter(Boolean),
            imageGallerySchema({
              id: 'home-gallery',
              name: 'Mulia Charcoal factory and container-loading gallery',
              description: `Photographs and short vertical videos taken on the production floor and loading bay of the Mulia Charcoal coconut shell briquetting factory in Semarang, Central Java — refreshed ${galleryLastUpdated}.`,
              url: `${siteOrigin}/#home-gallery-section`,
              images: galleryPhotos.map((p) => ({
                id: p.id,
                name: p.caption,
                description: p.alt,
                contentUrl: p.contentPath,
                thumbnailUrl: p.thumbnailPath,
                datePublished: p.datePublished,
              })),
              videoRefs: galleryVideos
                .filter((v) => v.youtubeId.indexOf('TODO_PLACEHOLDER') === -1)
                .map((v) => `${siteOrigin}/#video-${v.id}`),
            }),
          ]
        : []),
    ].filter(Boolean) as Array<Record<string, unknown>>,
  };
}
