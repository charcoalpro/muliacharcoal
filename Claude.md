```
# Shisha Charcoal Factory Website

## Project Overview

Static B2B website for PT Coco Reina Global Charcoal Indonesia, a coconut shell charcoal briquettes factory (shisha charcoal / hookah coals) based in Semarang, Central Java. Target audience: international wholesale buyers importing by the 20ft container (minimum order 18 tons). Primary conversion is a WhatsApp click-to-chat button; secondary conversion is a structured B2B inquiry form submitted via Web3Forms.

Priority buyer markets (in order): USA, UK, Saudi Arabia, Germany, Russia and CIS.

## Tech Stack

- Framework: Astro (static output, no SSR, no database, no server)
- Styling: Tailwind CSS (utility-first, no custom CSS files unless unavoidable)
- Hosting: Cloudflare Pages, deployed from GitHub on push to main
- CMS: Sveltia CMS for content editing (commits to Git via GitHub API)
- Forms: Web3Forms (POST to their endpoint, no backend needed)
- Analytics: Google Analytics 4 and Meta Pixel
- Image processing: Astro's built-in <Image /> with Sharp

## Site Architecture (Pillar and Cluster Model)

The site follows a pillar-and-cluster structure. Every new piece of content must fit into this structure and link appropriately to its pillar.

### Pillar pages and their clusters

1. **Products pillar** (`/products`)
    
    - Cluster: individual SKU pages at 
      `/products/{shape}-{size}` e.g. 
      `/products/cube-25mm`, `/products/hexagonal-22x50`
      
    - Also: shape category pages at 
      `/products/cubes`, 
      `/products/hexagonals`, 
      `/products/fingers`, 
      `/products/domes`, 
      `/products/flats`
`- Also: market category: 
`/products/shisha-cafee/`, 
`/products/shisha-shop/`

1. **Factory pillar** (`/factory`)
    - Cluster: 
      `/factory/production-process`, 
      `/factory/capacity`, 
      `/factory/virtual-tour`, 
      `/factory/raw-materials`, 
      
      
2. **Logistics pillar** (`/logistics`)
    - Cluster:  
      `/logistics/rules`, 
      `/logistics/documents`, 
      `/logistics/import-to-{country}` 
      `/logistics/UN-1361`

3. **Quality pillar** (`/quality`) 
    - Cluster: 
      `/quality/certifications`, 
      `/quality/testing-methods`, 
      `/quality/specifications-explained`
      
      
4. **Buyer's Guide pillar** (`/guide`) — cornerstone SEO content
    - Cluster: 
      `/guide/how-to-choose-shisha-charcoal-factory`, 
      `/guide/coconut-vs-bamboo-vs-wood-charcoal`,
       `/guide/how-to-start-your-own-brand`,
     

 `/guide/private-label-options`
5. **Markets pillar** (`/markets`) — country-specific landing pages
    - Cluster: 
      `/markets/usa`, 
      `/markets/uk`, 
      `/markets/saudi-arabia`, 
      `/markets/germany`, 
      `/markets/russia` (and later others)
      
6. **Packaging pillar** (`/packaging`) - all about packaging options and oem
       - Cluster: 
          `/mpackaging/master-box`,
          `/mpackaging/inner-box`,
          `/mpackaging/plastic`,
          `/mpackaging/additioal packaging`,
          `/mpackaging/white-lable`,

### Supporting pages (not part of a cluster)
- Home: `/`
- Blog hub: `/blog` with articles at `/blog/{slug}`
- FAQ: `/faq` (with FAQPage schema)
- Samples: `/samples`
- Contact  `/contact`
- About: `/about`
- Legal: `/privacy`, `/terms`
- Author: about author
  `/glossary`
  - llm.txt
  - human.txt
  - design.md

### Internal linking rules

- Every product detail page links up to the Products pillar and to its shape category
- Every cluster page links up to its pillar in the first paragraph and in a "Related topics" section at the end
- Every pillar links down to all of its cluster pages
- Every blog article links to at least 2 pillar pages and 1-2 other articles
- Market pages link to Products, Logistics, and Quality pillars
- No orphan pages: every page must have at least one incoming internal link from a permanent part of the site (not only from the blog feed)

## Languages and Routing

- Default language is English at the root (`/about`, `/products/cube-25mm`)
- Other languages are URL-prefixed: `/ar`, `/he`, `/de`, `/tr`, `/es`, `/pt`, `/zh`, `/ja`, `/ru`
- Arabic (`ar`) and Hebrew (`he`) require RTL layout: add `dir="rtl"` to `<html>` and use logical Tailwind classes (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`) instead of directional ones
- All translations are manual, stored as separate content files per language
- Every page must have hreflang tags for all available language versions, including `x-default` pointing to the English version
- Only English is active at launch; other languages are added incrementally
- Each language rollout order follows the priority markets list above

## Performance Budgets (Non-Negotiable)

Claude Code must refuse to introduce changes that would exceed these budgets.

### Core Web Vitals targets

- Largest Contentful Paint (LCP): < 2.0 seconds on simulated 4G
- Interaction to Next Paint (INP): < 200 milliseconds
- Cumulative Layout Shift (CLS): < 0.1
- First Contentful Paint (FCP): < 1.5 seconds
- Time to First Byte (TTFB): < 500 milliseconds (Cloudflare edge handles this)

### Asset-size budgets (per page)

- HTML document: < 50 KB gzipped
- Total CSS shipped: < 30 KB gzipped
- Total JavaScript shipped: < 20 KB gzipped (ideally 0 on content pages)
- Each image file: < 200 KB (AVIF preferred, WebP fallback, never raw PNG/JPG above 200 KB)
- Total page weight (HTML + CSS + JS + critical images): < 500 KB
- Web fonts: system font stack only; no external font downloads

### Lighthouse scores (all must pass)

- Performance: >= 95 (mobile)
- Accessibility: >= 95
- Best Practices: >= 95
- SEO: 100

## Performance Techniques (Always Apply)

- Zero client-side JavaScript by default on content pages; add JS only when a specific interaction genuinely requires it (language switcher, form validation)
- All images use Astro's `<Image />` component with explicit `width`, `height`, and `loading="lazy"` except the hero image (which uses `loading="eager"` and `fetchpriority="high"`)
- Critical CSS is inlined by Astro's build; no render-blocking stylesheets
- Preconnect hints for Web3Forms endpoint and analytics domains
- Preload the hero image and the logo on the homepage
- Use `<link rel="prefetch">` for the primary next-page navigation targets on each page (on product pages, prefetch the inquiry form; on the homepage, prefetch the Products pillar)
- No iframes except where absolutely necessary; no embed widgets
- No CSS-in-JS, no runtime-generated styles
- Compression: Cloudflare Pages serves Brotli automatically; do not override
- Cache: static assets get immutable 1-year cache headers via `_headers` file; HTML gets short cache with stale-while-revalidate
- View Transitions API is acceptable for page transitions since it degrades gracefully to no animation

## SEO Requirements (Every Page)

- Unique `<title>` under 60 characters, keyword-front-loaded
- Unique `<meta name="description">` under 160 characters, written to earn the click (includes MOQ and country-relevant framing where appropriate)
- Canonical URL tag (absolute, with https and no trailing slash except root)
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale`, `og:site_name`)
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- Hreflang tags for all language versions of the page, plus `x-default`
- Schema.org JSON-LD structured data appropriate to the page type:
    - Organization + WebSite on the homepage (with `sameAs` for social profiles)
    - Product on product detail pages (with offers, aggregateRating if real reviews exist, and manufacturer)
    - Article on blog posts (with author, datePublished, dateModified, image)
    - BreadcrumbList on any page deeper than one level
    - FAQPage on any page with an FAQ section (including the dedicated FAQ page)
    - LocalBusiness schema on the Contact page with factory address and geo
- H1 exactly once per page, matching the primary keyword intent
- H2 and H3 form a logical outline; heading levels never skip
- Image `alt` text is descriptive and includes relevant context (never stuffed)
- URL slugs are kebab-case, keyword-rich, and under 60 characters
- robots.txt allows everything except `/admin/` (Sveltia CMS) and `/api/`
- sitemap.xml auto-generated by `@astrojs/sitemap`, submitted to Google Search Console and Bing Webmaster Tools
- No duplicate content: each language version is canonical to itself; near-duplicate product descriptions across SKUs must vary meaningfully

## GEO Requirements (Generative Engine Optimization)

Generative engines (ChatGPT, Perplexity, Gemini, Claude) cite content that is factual, structured, and extractable. Apply these rules to all content.


- Cornerstone pages (pillars and guides) include a Q&A / FAQ section with FAQPage schema — this is the single highest-ROI format for AI citation
- Use definition-style sentences for key terms: "Coconut shell charcoal is..." — AI engines prefer to cite dictionary-form definitions
- Include numeric data wherever possible: percentages, durations, temperatures, dimensions, weights. Numbers are what get extracted into AI answers.
- Date-stamp every article with `datePublished` and `dateModified`; refresh annually with a new `dateModified` to signal currency
- Author, Reviewd by, Facted checked by, lust updated, time to read table at the very begining of each article. 
- Do not hide information behind tabs, accordions, or modals that require JS to reveal — AI crawlers do not expand these

## User Experience Rules

- Mobile-first design; all layouts must work at 360px viewport width
- Touch targets minimum 44x44 pixels (iOS/Android accessibility guidelines)
- WhatsApp click-to-chat button is a sticky floating action button on mobile (bottom-right, visible on every page including article pages)
- Primary CTA on every page uses the same component and styling sitewide so buyers develop pattern recognition
- Trust signals visible above the fold on Home and all product pages: MOQ specification, factory location, port of loading, certifications logos
- Inquiry form uses inline validation on blur; shows success state in-place (does not redirect to a thank-you page, which breaks analytics and slows down buyers who want to inquire about multiple products)
- Navigation includes breadcrumbs on every page deeper than one level
- Current page is visually indicated in the main nav
- Forms autofocus the first empty field on load
- All interactive elements have visible focus states for keyboard navigation
- Reading experience: line-height at least 1.6, max line length 65-75ch on body copy, minimum font-size 16px

## Accessibility (WCAG 2.2 Level AA)

- All images have meaningful `alt` text; decorative images use `alt=""`
- Color contrast ratio at least 4.5:1 for body text, 3:1 for large text
- Never use color alone to convey information (e.g. error states also use an icon and text label)
- All form inputs have associated `<label>` elements
- Semantic HTML first: `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>` — ARIA only when semantic HTML cannot express the intent
- Skip-to-content link at the top of every page for keyboard users
- Language attribute on `<html>` matches the current page language
- Focus indicators are never removed via CSS (no `outline: none` without a replacement)

## Content Voice and Conventions

- Voice: confident, factual, specification-heavy, professional peer-to-peer
- Address the buyer as a professional: "your customs broker will require..." not "you might need..."
- Numbers and concrete specifications over adjectives: "18 tons per 20ft container" not "bulk quantities available"
- British or American spelling: use American English (buyers in the US and Middle East are the highest-value markets and default to American)
- Currency: prices quoted in USD by default (FOB Semarang); optionally show EUR on German market page
- Units: metric primary (kg, mm, tons = metric tons / tonnes), imperial in parentheses for US market page only

## Conversion Tracking (Analytics Events)

Every event below must fire on both Google Analytics 4 and Meta Pixel.

- `whatsapp_click` — fired on any WhatsApp button click; parameters: `source_page` (URL path), `source_component` (header / floating / product / footer)
- `inquiry_submit` — fired on successful inquiry form submission; parameters: `product_category`, `estimated_quantity_tons`, `destination_country`
- `sample_request` — fired on sample form submission; parameters: `product_sku`, `destination_country`
- `scroll_75` — fired once per page when user scrolls past 75% (engagement signal)
- `engaged_time` — fired once per page after 60 seconds of active time
- `language_switch` — fired when user changes language; parameters: `from_language`, `to_language`
- `outbound_click` — fired on any outbound link click (for documentation and certification PDF clicks)

## Folder Structure


/src
  /components       Reusable Astro components
    /seo            SEO, OpenGraph, JSONLD, Hreflang components
    /layout         Header, Footer, Nav, Breadcrumbs, LanguageSwitcher
    /product        ProductCard, SpecsTable, ProductGallery
    /cta            WhatsAppButton, InquiryButton, StickyWhatsApp
    /content        Prose, FAQ, CalloutBox
  /layouts          BaseLayout, ProductLayout, ArticleLayout, MarketLayout
  /pages            URL-mapped pages; subfolders per language (ar/, he/, de/...)
  /content          Astro content collections
    /products       Product SKU data (frontmatter + MDX body)
      /en
      /ar ...
    /articles       Blog articles
      /en
      /ar ...
    /pages          Long-form page bodies (pillar content) when easier than .astro
  /i18n             UI string translations (en.json, ar.json, de.json, ...)
  /styles           Global styles (minimal; Tailwind handles most)
  /assets           Images, logos, certificates (processed by Astro at build)
  /lib              Pure utility functions (slug helpers, schema builders, etc.)
/public             Static files served as-is
  /admin            Sveltia CMS admin page
  favicon.ico
  robots.txt
  _headers          Cloudflare Pages custom headers
  _redirects        Cloudflare Pages redirect rules


## Design Tokens (Placeholder — Replace With Real Brand Values Later)

- Primary brand color: `#0f3d2e` (deep green, placeholder)
- Secondary accent: `#c9a24b` (muted gold, placeholder)
- Neutral scale: Tailwind `slate` family
- Success / Error / Warning: Tailwind defaults
- Font family: system font stack, no web fonts `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Type scale: Tailwind default (text-sm through text-5xl)
- Spacing rhythm: Tailwind 4px base (space-1 = 4px, space-4 = 16px, etc.)
- Border radius: `rounded-md` default, `rounded-2xl` for cards
- Shadow: minimal; prefer borders over shadows for visual separation

## URL and Slug Conventions

- kebab-case everywhere (never snake_case, never camelCase in URLs)
- Under 60 characters including the domain
- Include primary keyword, exclude stop words where possible
- No trailing slashes except the root (`/`)
- Product slugs: `{shape}-{size}` → `cube-25mm`, `hexagonal-22x50`
- Article slugs: keyword-rich, not clickbait
- No dates in blog URLs (content stays evergreen; dates live in frontmatter)

## Image and Media Conventions

- Source images stored in `/src/assets/` (processed at build)
- Never reference images from `/public/` in component `<Image />` tags
- File names are descriptive: `cube-25mm-briquette-top-view.jpg` not `img_001.jpg`
- Alt text is always meaningful; for product images, include the SKU name and a brief description of what the image shows
- Preferred delivery format: AVIF with WebP fallback, generated by Astro
- Hero images: maximum 1920px wide source; Astro generates responsive sizes
- Thumbnails and card images: maximum 800px wide source
- Certificates and PDFs: stored in `/public/documents/` and linked directly

## Security Headers (via `/public/_headers`)

Apply sitewide:

- `Content-Security-Policy`: restrictive; allow self, Web3Forms, GA4, Meta Pixel
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`: deny geolocation, microphone, camera, payment (none are used)
- `Strict-Transport-Security`: `max-age=31536000; includeSubDomains; preload`

## Error and Edge Pages

- `/404` — custom 404 page with search, popular products, and inquiry CTA
- Form error states inline (never redirect to an error page)
- Empty search results show suggested alternatives, not a dead end

## Deployment and Workflow

- Main branch is production, auto-deploys to Cloudflare Pages
- Feature work happens on branches; each push creates a Cloudflare preview deployment at a unique URL for QA before merge
- Commit messages follow Conventional Commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `chore:`, `seo:`
- Pull requests describe: what changed, which pages are affected, what was tested, any Lighthouse score deltas

## Working Style (Claude Code Behavior)

- Always propose a plan before writing code for any change larger than a single file. Wait for approval before executing.
- When editing shared components (Header, Footer, BaseLayout) or anything that affects every page, show a diff summary before applying.
- Prefer creating new small components over growing existing ones.
- When adding a new page, verify: (1) it links up to its pillar, (2) the pillar links down to it, (3) it has full SEO head tags, (3) it has appropriate schema.org markup, (4) the sitemap config includes it, (5) the hreflang tags are correct, (6) it appears in the main nav or footer if appropriate.
- When adding new UI strings, add them to the i18n translation file for every active language; use the English string as placeholder for untranslated ones and add a `TODO: translate to {lang}` comment alongside.
- When adding third-party scripts (analytics, pixels), load them with `afterInteractive` timing and measure the impact on LCP before committing.
- Before marking a task complete, run `npm run build` locally and confirm there are no warnings or errors in the build output.

## Things to Never Do

- Do not add a backend, database, server, or API routes. This site is 100% static.
- Do not install heavy JavaScript libraries (no React, no Vue, no jQuery, no Alpine unless explicitly justified for a single component). Astro components plus vanilla JS only when strictly needed.
- Do not exceed any asset-size budget without explicit approval.
- Do not use `!important` in CSS.
- Do not hardcode text strings in components; all user-visible text must go through the i18n layer.
- Do not use inline styles; use Tailwind utilities.
- Do not create left/right directional CSS that breaks RTL; always use logical properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`).
- Do not load fonts from Google Fonts or any external font provider.
- Do not use icon fonts (Font Awesome, etc.); use inline SVG icons only.
- Do not hide primary content behind tabs, accordions, or modals that require JS to reveal (hurts GEO and accessibility).
- Do not create orphan pages (pages with no incoming internal links from the permanent site structure).
- Do not use `any` generic image/video placeholders from external CDNs that could be taken down; use local placeholders in `/src/assets/placeholders/`.
- Do not hardcode any company fact anywhere in the codebase. Every piece of factual data about the company — legal name, brand, founding year, address, phone, WhatsApp number, email, domain, NIB, Tax ID (NPWP), Google Maps link, owner/director/staff names, production capacity, production lines, oven count and capacity, MOQ, port of loading, social media URLs, bank account details, certifications — lives in `/src/config/company.ts` and only there. Components, pages, layouts, JSON-LD emitters, i18n JSON files, MDX bodies, tests, and scripts must import from that module. The i18n files may contain labels and prose around these facts, but never the fact values themselves. If a new company fact is needed, add it to `/src/config/company.ts` first, then consume it from there. Any PR that introduces a hardcoded company fact elsewhere must be rejected.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First
**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes
**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution
**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.
```