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
    }),
    tailwind({ applyBaseStyles: true }),
  ],
  markdown: {
    remarkPlugins: [remarkCompanyTokens],
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
