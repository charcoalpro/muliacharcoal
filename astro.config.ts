import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { company } from './src/config/company';
import { companyTokens, fill } from './src/lib/interpolate';

/**
 * remark-company-tokens
 *
 * Replaces `{{tokenName}}` occurrences in Markdown text nodes with the
 * corresponding company fact at build time. Lets legal / article prose
 * stay in `.md` files while keeping every factual value bound to
 * `/src/config/company.ts` (see CLAUDE.md § "Things to Never Do").
 *
 * Unknown tokens pass through unchanged so typos are visible during QA.
 */
function remarkCompanyTokens() {
  const tokens = companyTokens(company);
  const visit = (node: any): void => {
    if (node && node.type === 'text' && typeof node.value === 'string' && node.value.includes('{{')) {
      node.value = fill(node.value, tokens);
    }
    if (node && Array.isArray(node.children)) {
      node.children.forEach(visit);
    }
  };
  return (tree: any) => visit(tree);
}

export default defineConfig({
  site: company.siteUrl,
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/dev/'),
      // Image-sitemap extension: attaches the brand og default to
      // every URL so Google Images can discover at least one image
      // per page from day one. When a page ships a real hero, swap
      // the default for the page's hero URL here.
      serialize(item) {
        const base = company.siteUrl.replace(/\/$/, '');
        return {
          ...item,
          img: [
            {
              url: `${base}${company.brandAssets.images.ogDefault}`,
              title: company.brand,
            },
          ],
        };
      },
    }),
    tailwind({ applyBaseStyles: true }),
  ],
  markdown: {
    remarkPlugins: [remarkCompanyTokens],
  },
  // Image pipeline. Sharp (already a dependency) emits AVIF + WebP + JPG
  // derivatives at the widths components request. Source files live under
  // `src/assets/images/...`; outputs land in `dist/_astro/` with content-
  // hashed filenames so they can ride the immutable 1-year cache rule
  // declared in `public/_headers`.
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
