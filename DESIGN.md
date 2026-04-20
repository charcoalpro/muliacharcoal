```
# Design System — Shisha Charcoal Factory Website

This document is the single source of truth for all visual design decisions on this website. Every component and page must conform to the values and rules defined here. When a design question arises that this document does not answer, the answer should be added here first, then implemented.

Read this file in conjunction with CLAUDE.md. CLAUDE.md defines what the project is and how it behaves; DESIGN.md defines how it looks.

---

## Design Principles

1. **Clarity over cleverness.** B2B buyers are scanning for facts, not admiring the design. Every design choice must make information easier to find and read.
2. **Trust through professionalism.** Conservative, clean, and organized beats trendy and experimental. This is a factory selling 18-ton containers, not a consumer lifestyle brand.
3. **Density with breathing room.** B2B buyers want information density, but never to the point of visual overwhelm. Use generous whitespace between sections, but allow content blocks to be information-rich.
4. **Mobile is primary.** Most buyers first visit on mobile. Every design decision must work at 360px viewport width before being considered done.
5. **Speed is a feature.** No design choice is worth breaching the performance budgets in CLAUDE.md.

---

## Color Palette

All color values are placeholders until real brand colors are finalized. When finalizing, update values here first, then all components automatically inherit the new values (because they reference these tokens, not hardcoded hex values in individual components).

### Brand Colors

|Token|Value|Usage|
|---|---|---|
|`brand-primary`|`#0f3d2e`|Main CTAs, primary links, brand accents|
|`brand-primary-hover`|`#0a2a1f`|Hover state for primary CTAs|
|`brand-accent`|`#c9a24b`|Secondary accents, highlights, premium signals|
|`brand-dark`|`#0a1f17`|Dark backgrounds, footer|

### Neutral Scale (Tailwind slate family)

|Token|Value|Usage|
|---|---|---|
|`neutral-50`|`#f8fafc`|Page background (light mode)|
|`neutral-100`|`#f1f5f9`|Subtle section backgrounds|
|`neutral-200`|`#e2e8f0`|Borders, dividers|
|`neutral-400`|`#94a3b8`|Muted text, placeholder text|
|`neutral-600`|`#475569`|Secondary text, captions|
|`neutral-800`|`#1e293b`|Primary body text|
|`neutral-900`|`#0f172a`|Headings|

### Semantic Colors

|Token|Value|Usage|
|---|---|---|
|`success`|`#16a34a`|Form success states, confirmation|
|`error`|`#dc2626`|Form errors, critical warnings|
|`warning`|`#ea580c`|Non-critical warnings, advisories|
|`info`|`#2563eb`|Informational notices|

### Usage Rules

- `brand-primary` is reserved for the PRIMARY call-to-action on any page (typically "Request a Quote" or "Contact Us"). Do not use it for body links, heading underlines, or section backgrounds.
- `brand-accent` (gold) is used sparingly — trust badges, certification highlights, premium tier indicators. Never more than two instances on a single page.
- Body text uses `neutral-800` on `neutral-50` backgrounds, giving a contrast ratio of 16:1 (well above the 4.5:1 WCAG AA requirement).
- Headings use `neutral-900` for maximum contrast.
- Never use color alone to convey information (accessibility rule from CLAUDE.md). Always pair color with an icon or text label.

---

## Typography

### Font Family

Use the system font stack — no external font loading, no Google Fonts. This keeps the site fast and avoids layout shift from font loading.

```
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, sans-serif;
```

Rationale: system fonts render instantly with zero network requests, they are optimized for each operating system, and for B2B content the visual "personality" of a custom font adds no value. The performance win is substantial and permanent.

### Type Scale

Using Tailwind's default scale. Reference these class names only — never use arbitrary pixel sizes.

|Role|Tailwind class|Size (desktop)|Weight|
|---|---|---|---|
|Display / Hero H1|`text-5xl`|48px|`font-bold`|
|Page H1|`text-4xl`|36px|`font-bold`|
|Section H2|`text-3xl`|30px|`font-bold`|
|Subsection H3|`text-2xl`|24px|`font-semibold`|
|Minor heading H4|`text-xl`|20px|`font-semibold`|
|Lead paragraph|`text-lg`|18px|`font-normal`|
|Body|`text-base`|16px|`font-normal`|
|Caption / small|`text-sm`|14px|`font-normal`|
|Fine print|`text-xs`|12px|`font-normal`|

### Responsive Scaling

Headings scale down on mobile for readability. Use this responsive pattern for all headings:

- Hero H1: `text-3xl md:text-4xl lg:text-5xl`
- Page H1: `text-2xl md:text-3xl lg:text-4xl`
- Section H2: `text-xl md:text-2xl lg:text-3xl`
- H3, H4: keep consistent across breakpoints

### Line Heights

- Headings: `leading-tight` (1.25)
- Body text: `leading-relaxed` (1.625)
- Dense tables and specs: `leading-normal` (1.5)

### Reading Width

Body copy is constrained to `max-w-prose` (approximately 65ch) for readability. Wider full-width text (spec tables, card grids) can use the container maximum.

---

## Spacing System

Use Tailwind's default 4px-based spacing scale. Never use arbitrary pixel values for padding or margin.

### Common Spacings

|Role|Tailwind class|Pixels|
|---|---|---|
|Inline icon gap|`gap-2`|8px|
|Form field internal padding|`p-3`|12px|
|Button internal padding (y)|`py-3`|12px|
|Button internal padding (x)|`px-6`|24px|
|Card internal padding|`p-6`|24px|
|Gap between stacked elements|`space-y-4`|16px|
|Gap between paragraphs|`space-y-6`|24px|
|Gap between section elements|`space-y-8`|32px|
|Gap between sections|`space-y-16`|64px|
|Section vertical padding|`py-16 md:py-24`|64-96px|
|Container horizontal padding|`px-4 md:px-8`|16-32px|

### Layout Container

Standard content container is `max-w-7xl` (1280px) centered:

```
<div class="max-w-7xl mx-auto px-4 md:px-8">...</div>
```

Narrower content (articles, text-heavy pages) uses `max-w-4xl`. Very narrow (forms, focused CTAs) uses `max-w-2xl`.

---

## Borders and Radii

|Token|Value|Usage|
|---|---|---|
|`rounded-md`|6px|Buttons, form inputs, small badges|
|`rounded-lg`|8px|Secondary buttons, tags|
|`rounded-xl`|12px|Cards, spec tables|
|`rounded-2xl`|16px|Hero containers, feature blocks|
|`rounded-full`|50%|Avatars, circular icons, pills|

Border widths: use `border` (1px) as default. Never use 2px or 3px borders for layout; reserve thicker borders for focus states only.

---

## Shadows

Use shadows sparingly. Prefer borders for visual separation. Shadows are appropriate only for:

- Elements meant to feel "lifted" off the page (modals, dropdowns, the sticky WhatsApp button).
- Cards on a gradient or colored background where borders would be invisible.

|Token|Tailwind class|Usage|
|---|---|---|
|subtle|`shadow-sm`|Slight elevation on hover|
|card|`shadow-md`|Card lift on hover|
|floating|`shadow-lg`|Sticky buttons, dropdowns|
|modal|`shadow-xl`|Modals, prominent callouts|

Never use `shadow-2xl` except for full-screen overlays.

---

## Buttons

Buttons are the most-reused interactive element on the site. All buttons must use the `<Button>` component — no ad-hoc button styling anywhere.

### Variants

**Primary** — for the main call-to-action on any page

- Background: `brand-primary`
- Text: white
- Hover: `brand-primary-hover`
- Rounded: `rounded-md`
- Padding: `px-6 py-3`
- Font: `font-semibold text-base`

**Secondary** — for supporting actions (e.g. "View Specs")

- Background: white
- Border: `border border-neutral-300`
- Text: `neutral-800`
- Hover: background `neutral-100`

**Ghost** — for tertiary actions, usually in toolbars or alongside primaries

- Background: transparent
- Text: `brand-primary`
- Hover: background `neutral-100`

**Danger** — reserved for destructive confirmations (rare on this site)

- Background: `error`
- Text: white

### Sizes

|Size|Padding|Text size|Use case|
|---|---|---|---|
|`sm`|`px-4 py-2`|`text-sm`|Inline actions, card footers|
|`md` (default)|`px-6 py-3`|`text-base`|Most buttons|
|`lg`|`px-8 py-4`|`text-lg`|Hero CTAs, landing page primaries|

### States

- Default: as defined above
- Hover: slight darkening (see variant)
- Focus: visible focus ring `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary`
- Active: slightly pressed via `active:scale-[0.98]`
- Disabled: `opacity-50 cursor-not-allowed`

### Icon Buttons

Buttons with an icon use `gap-2` between icon and label. Icon-only buttons must have an `aria-label` for accessibility.

---

## Form Elements

### Text Inputs

- Height: `py-3 px-4`
- Border: `border border-neutral-300`
- Rounded: `rounded-md`
- Focus: border color becomes `brand-primary`, add subtle ring
- Error: border color becomes `error`, add error message below
- Disabled: `bg-neutral-100 cursor-not-allowed`

### Labels

- Always visible above the input (not placeholder-only)
- Text: `text-sm font-medium text-neutral-800`
- Required fields marked with a red asterisk followed by a space

### Error Messages

- Text: `text-sm text-error`
- Appears directly below the input
- Accompanied by an error icon (not color alone)

### Selects and Dropdowns

Same visual style as text inputs. Use native `<select>` when possible; avoid JavaScript-based custom dropdowns for accessibility and performance.

### Textareas

Same style as text inputs, minimum height `min-h-[120px]`.

---

## Cards

Cards are rectangular containers for self-contained units of content (product previews, article previews, feature highlights, stats).

### Default Card

- Background: white
- Border: `border border-neutral-200`
- Rounded: `rounded-xl`
- Padding: `p-6`
- Optional hover: `hover:shadow-md transition-shadow`

### Product Card (specific variant)

- Image at top (aspect ratio 4:3, full width of card)
- Title below image (`text-lg font-semibold`)
- Short description (`text-sm text-neutral-600`, 2 lines max with ellipsis)
- Key specs (3-4 items in a small list)
- CTA button at bottom (secondary variant, "View Details")

### Article Card

- Featured image at top
- Publish date (`text-xs text-neutral-600`)
- Title (`text-xl font-semibold`)
- Excerpt (`text-sm`, 2 lines)
- Read time indicator

---

## Specifications Table

Used on every product page. This is the most information-dense component on the site and must be readable and scannable.

- Full width of the product detail column
- `<table>` element with `<thead>` and `<tbody>`
- Zebra striping: alternate rows use `bg-neutral-50`
- Border: `border border-neutral-200 rounded-xl overflow-hidden`
- Cell padding: `py-3 px-4`
- Label column: `font-medium text-neutral-800`, width 40%
- Value column: `text-neutral-800`, width 60%
- Values with units include the unit in the same cell (e.g. "65 minutes")
- Numeric values right-aligned; text values left-aligned

---

## Icons

- Inline SVG only; no icon fonts, no external CDN
- Default size: 20px (1.25rem, Tailwind `w-5 h-5`)
- Decorative icons in text: 16px (`w-4 h-4`)
- Section headline icons: 24px (`w-6 h-6`)
- Hero / feature icons: 32-48px (`w-8 h-8` to `w-12 h-12`)
- Stroke width: 1.5px (matches Lucide / Heroicons style)
- Color: inherit from text by default (`currentColor`)

Icon set: use Heroicons (https://heroicons.com) as the default library, pasted as inline SVG into components. Do not install an icon package — copy individual icons as needed.

---

## Layout Patterns

### Page Structure

Every page follows this structure from top to bottom:

1. `<Header>` — sticky at top on scroll (subtle shadow on scroll)
2. `<Breadcrumbs>` — on every page deeper than one level
3. Main content (varies by page type)
4. `<CTABanner>` — inquiry prompt before footer (on all non-contact pages)
5. `<Footer>`
6. `<StickyWhatsApp>` — floating mobile button, hidden on desktop

### Hero Sections

- Full-width background (can be image, gradient, or solid color)
- Content constrained to `max-w-7xl mx-auto`
- Vertical padding: `py-24 md:py-32`
- H1 heading, subheading, primary CTA, and (optional) secondary CTA
- On mobile, stack vertically; on desktop, can be two-column with image

### Section Rhythm

Between major sections: `py-16 md:py-24` vertical padding Between subsections within a section: `mt-12` Between paragraphs: `space-y-4`

### Grids

Product grids: 1 column mobile, 2 columns tablet, 3 columns desktop `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` Feature grids: 1 / 2 / 4 pattern for small features, 1 / 2 / 3 for larger Article grids: 1 / 2 / 3 pattern

---

## Images

- Always use Astro's `<Image />` component, never raw `<img>`
- Always specify `width`, `height`, and meaningful `alt` text
- Default format: AVIF with WebP fallback, handled by Astro
- Hero images use `loading="eager"` and `fetchpriority="high"`
- All other images use `loading="lazy"`
- Aspect ratios:
    - Product images: 4:3
    - Article featured images: 16:9
    - Hero images: 16:9 desktop, 4:3 mobile
    - Team/factory portraits: 1:1
- Placeholder images (until real photography arrives): solid color blocks from `/src/assets/placeholders/` with the correct aspect ratio

---

## RTL (Right-to-Left) Support

Arabic (`ar`) and Hebrew (`he`) require full RTL layout. This must be considered from the start, not retrofitted.

### Rules

- The `<html>` tag receives `dir="rtl"` when the current language is RTL
- Never use directional Tailwind classes (`ml-*`, `mr-*`, `pl-*`, `pr-*`, `text-left`, `text-right`, `left-*`, `right-*`)
- Always use logical equivalents: `ms-*` (margin-start), `me-*` (margin-end), `ps-*`, `pe-*`, `text-start`, `text-end`, `start-*`, `end-*`
- Icons that have directional meaning (arrows, chevrons) should be mirrored in RTL mode. Apply `rtl:scale-x-[-1]` to flip them.
- Numbers and Latin text within RTL content stay left-to-right (handled automatically by the browser)

---

## Motion and Animation

- Transitions: use sparingly, only for hover states and expand/collapse
- Default transition: `transition-colors duration-200` or `transition-shadow duration-200`
- Never animate layout properties (width, height, margin) for performance
- Respect `prefers-reduced-motion`: wrap non-essential animations in the motion-safe variant (`motion-safe:transition-*`)
- No parallax scrolling (hurts performance and accessibility)
- No autoplay video on the homepage
- Page transitions: optionally use Astro's View Transitions API, which degrades gracefully

---

## Accessibility Design Requirements

(These echo the CLAUDE.md accessibility rules; listed here for visual context.)

- Color contrast minimum 4.5:1 for body text, 3:1 for large text
- Focus indicators visible on every interactive element
- Minimum touch target 44x44px on mobile
- Form labels always associated with inputs
- Skip-to-content link at the top of every page
- Semantic HTML first; ARIA only when needed

---

## Component Build Order (Recommendation)

Build in this order, and create a visual test page for each as you go (at `/dev/components` — a page that shows every variant of every component, for design QA):

1. BaseLayout (shell, SEO head, body wrapper)
2. Header (with language switcher placeholder)
3. Footer
4. Button (all variants, all sizes, all states)
5. Icon wrapper (for consistent sizing)
6. Link (styled anchor)
7. Card (default + product variant)
8. FormField (label + input + error)
9. SpecsTable
10. Breadcrumbs
11. HeroSection
12. CTABanner
13. StickyWhatsApp
14. FAQSection (with schema)
15. FeatureGrid
16. ProductGallery

After these 16 components exist and are verified on the test page, you can assemble any page on the site with minimal new component work.

---

## Process Rules

1. When a design decision is made, record it here FIRST, then implement.
2. When Claude Code produces output that violates this document, do not accept it silently — flag the violation, point to the specific rule.
3. When this document is ambiguous or missing a rule, resolve the ambiguity HERE first, then implement.
4. Do not create one-off styles for a single page. If a page needs a new visual pattern, either use an existing component or create a new reusable component, and document it here.
5. Periodically review the rendered site against this document. Drift accumulates silently.
```