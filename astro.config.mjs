import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://muliacharcoal.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/dev/'),
    }),
    tailwind({ applyBaseStyles: true }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
