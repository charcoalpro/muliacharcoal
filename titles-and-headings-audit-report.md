# Titles & Headings Audit — muliacharcoal.com

**Scope:** `<title>` tags and the `<h1>`–`<h6>` heading structure, per locale, across the codebase **and** live production. 100% coverage, no sampling. Read-only — no code was edited.

**Method:** Fresh production build (`npm run build`, exit 0, 110 Astro pages) → every `dist/**/*.html` parsed with **parse5** into a structured per-page model (title, full heading tree with landmark ancestry, IDs, hidden/pseudo headings, main-content word-runs, Tailwind font-size classes). Live parity confirmed by fetching raw HTML for 8 representative URLs (all HTTP 200, titles+h1 byte-identical to `dist`). Findings were then **adversarially verified** by 5 independent agents against the raw extracted data.

**Date:** 2026-06-25

---

## Remediation applied (2026-06-25)

The findings below were the audit snapshot. The following fixes have since been **applied and verified against a fresh build** (`npm run build`, exit 0, 110 pages; live parity is automatic since production deploys from this source). The detailed findings are retained as rationale.

**P1 — done**
- **`/about` + `/contact` titles** de-double-branded → `{{brand}}` token instead of the full legal name. `/contact` **922px → 529px**, `/about` **887px → 556px** (both now clear ~600px). Files: `src/i18n/en/about.json`, `src/i18n/en/contact.json`, `src/pages/about.astro` (added `brand` token).
- **Weak h1s** → `/about` h1 now "About Mulia Charcoal — our coconut shisha charcoal factory" (brand wired through `fill()` in `AboutHero.astro`); `/faq` h1 "Buyer FAQ" → "Shisha Charcoal Buyer FAQ".
- **`/about` h1→h3 skip** → added a `Company overview` `<h2>` in `CompanyOverview.astro`; heading sequence now `[1,2,3,…]`, **no skip**.
- **Footer outline pollution** → 5 chrome `<h2>` demoted to `<p>` / section `aria-label` in `Footer.astro`. Out-of-main headings sitewide: **5 → 0**.
- **Prose mobile inversion** → `Prose.astro` now `h2 ≥ h3 ≥ h4` at every breakpoint (24/20/18px base).
- **`rehype-slug`** added to `astro.config.ts` → Markdown/MDX headings now auto-ID'd (e.g. `/legal/privacy-policy` **0 → 23/23** main headings with stable IDs). Note: `.astro`-template headings still need explicit IDs (out of rehype's scope).

**P2 — done**
- **`/glossary`** 6 `<h3><a>` cards → `<p>` (removed from content outline).
- **"Charcoal Shipping Rules" cannibalization** → `/logistics/charcoal-dg-regulation` re-angled to "Charcoal Dangerous Goods {year}: IMDG 42-24 & SP 978" (title + h1), distinct from `/logistics/rules`.
- **Missing limiting heading** → added a `Storage & shelf life` `<h2>` section to the SKU template (`GradePage.astro` + `productGrade.json`), using the existing `shelfLifeMonths` (24) fact.

**Intentionally NOT changed**
- **SKU titles** — per owner decision, left as-is (they already front-load grade/size/shape; truncation clips only the brand suffix).
- **Wall-of-text** — investigated and **deferred as a metric artifact**: the flagged "699-word run" on `/packaging` is the audit metric summing many small paragraphs + card/table/stat text between two headings; the largest *single* paragraph is **68 words**. There is no literal prose wall, so forcing subheadings would be artificial.

---

## 0. Critical scope correction — the site is English-only in production

The audit brief assumes a live multilingual site (ar/he/de/tr/es…). **It is not one yet.** Discovered from the site itself:

- `astro.config.ts` has **no `i18n` block**. `src/config/i18n.ts` declares `LOCALES` = 10 planned codes (`en, ar, he, de, tr, es, pt, zh-Hans, ja, ru`) but **`ACTIVE_LOCALES = ['en']`**.
- There are **no locale-prefixed routes** (`/de`, `/ar`, …) in `src/pages/` or `dist/`. Only `src/i18n/en/` and content collections `articles/en` + `products/en` exist.
- Every one of the 111 built HTML files renders `<html lang="en" dir="ltr">`.

**Consequence:** all *per-locale* checks in the brief — German truncation, RTL `dir`/`lang` for ar/he, translation-completeness of titles/headings, per-locale boilerplate, Turkish locale-aware case-folding — are **Not Applicable / not-yet-shipped**, not "pass". They are covered in §7 with the readiness gaps that will bite when locales ship. Everything else is audited in full for the `en` locale.

---

## 1. Summary verdict

| Rule group | Verdict | One-line |
|---|---|---|
| **A. Title length / truncation** | ⚠️ **WARN** | 80 / 108 indexable titles exceed ~600px desktop width; truncation mostly eats the redundant ` \| Mulia Charcoal` suffix, but `/about` (887px) & `/contact` (922px) lose real words to a doubled brand/legal-name prefix. |
| **B. Title competition (dup / cannibal / boilerplate)** | ✅ **PASS** (1 minor) | Zero duplicate titles. Boilerplate n-grams are the legitimate core keyword. One genuine cannibalization pair: *Charcoal Shipping Rules* (`/logistics/rules` vs `/logistics/charcoal-dg-regulation`). |
| **C. Title integrity (encoding / spam)** | ✅ **PASS** | No mojibake, no double-encoding, no raw HTML (auto-escaped via `{fullTitle}`), no ALL-CAPS / clickbait / keyword-listing. |
| **D. Heading structure (h1 count / placement / hierarchy)** | ⚠️ **WARN** | All 108 indexable pages have **exactly one h1, all inside `<main>`**. Defects: 1 skipped level (`/about` h1→h3); 5 footer/nav `<h2>` outside `<main>` on every page. |
| **E. Heading integrity (hidden / pseudo / links / IDs)** | ⚠️ **WARN** | No `display:none` headings; `sr-only` use is legitimate. Real gap: no `rehype-slug` → 107 pages have un-IDed main `h2–h4`. Minor: 6 `<h3><a>` cards on `/glossary`. |
| **F. Coherence (title↔h1 / slug / intro)** | ⚠️ **WARN** | Intros echo titles everywhere; slugs are intentionally short. Real: weak/generic h1s on `/faq` ("Buyer FAQ") and `/about` ("About our charcoal factory"). |
| **G. Visual hierarchy + Charcoal/B2B** | ⚠️ **WARN** | `.prose-mulia` heading scale is **inverted on mobile** (h3 24px > h2 20px). Product pages carry strong fact-headings but no storage/limiting heading; SKU titles differ only by grade within a size-trio. |

**Per-locale matrix** (only `en` is live):

| Locale | Status | Pages | Titles audited | Headings audited | Translation-complete | RTL correct | UTF-8 |
|---|---|---|---|---|---|---|---|
| `en` (default, `/`) | **LIVE** | 108 indexable | ✅ 108/108 | ✅ 108/108 | n/a (source language) | n/a (LTR) | ✅ 111/111 |
| `ar, he` (RTL) | not shipped | 0 | — | — | — | — pending — | — |
| `de, tr, es, pt, zh-Hans, ja, ru` | not shipped | 0 | — | — | — | n/a | — |

**No P0 production issues.** The only pages deviating from "exactly one h1" are the two `noindex` utility pages (`/admin`, `/dev/components`); no indexable page is missing a title or h1, and no raw HTML breaks any title/heading.

**Coverage:** 111 `dist` HTML files = 110 Astro-built pages + 1 `/admin` static passthrough. Indexable: **108**. Noindex (correctly excluded from sitemap): `/404`, `/admin`, `/dev/components`.

---

## 2. Title penalties & competition (Phase 2)

### 2.1 Truncation / pixel width (A) — ⚠️ 80 / 108 over ~600px

Width measured with an Arial-at-20px advance-width model (valid for this Latin-only locale); >600px ≈ desktop SERP truncation. `over600px = 80`, `over550px = 92`, **max = 922px**. Exact SERP cut and mobile remain MANUAL (see §8).

**The two real offenders** — these lose *content*, not just the brand suffix:

| URL | px | Title | Problem |
|---|---|---|---|
| [/contact](src/pages/contact.astro) | **922** | `Contact PT Coco Reina Global Charcoal Indonesia — Coconut Shisha Charcoal Factory \| Mulia Charcoal` | Full **legal name** *and* the `\| Mulia Charcoal` brand suffix → double-branding; "Factory" + brand are cut. |
| [/about](src/pages/about.astro) | **887** | `About PT Coco Reina Global Charcoal Indonesia — coconut shisha charcoal factory \| Mulia Charcoal` | Same double-branding; the descriptive tail "coconut shisha charcoal factory" is truncated. |

**The systemic case — product SKUs (65 pages, 585–722px).** Title template [`src/i18n/en/productGrade.json:5`](src/i18n/en/productGrade.json): `"{{grade}} {{size}} {{shape}} Coconut Shisha Charcoal"`, then SEO.astro appends ` | Mulia Charcoal`. Worst are the **"Super Premium" hexagonals at 722px** (e.g. `Super Premium 20×50 mm Hexagonal Coconut Shisha Charcoal | Mulia Charcoal`). Here the **front-loaded differentiator (grade + size + shape) survives**; truncation removes the redundant brand suffix — *acceptable but not ideal*. Width per shape×grade (incl. suffix):

| Shape | Premium | Super Premium | Platinum |
|---|---|---|---|
| Cube `nn×nn mm` | 615 | **674** | 613 |
| Finger `nn×nn mm` | 624 | **683** | 622 |
| Hexagonal `nn×nn mm` | 663 | **722** | 661 |
| Flat `nn×nn×17 mm` | 634 | **693** | 632 |
| Dome `nn mm` | 588 | 647 | 585 |
| Lotus `n-piece set` | 620 | **679** | 618 |

> **Stale-tactic note:** the "≤ 55–60 characters" rule is an outdated proxy — pixel width is the real limit and varies by script. Char counts here (62–98) are a rough hint only; widths above are authoritative for Latin.

**Front-loading:** ✅ good site-wide. Every money page leads with its head keyword (product → grade+size+shape; logistics → "Import Coconut Charcoal to {country}"; guides → the question). The two exceptions are `/about` and `/contact`, which lead with the **legal entity name** instead of the keyword.

### 2.2 Duplicates, dup-tokens, boilerplate (B/C)

- **Duplicate titles: NONE.** No two indexable pages share an identical `<title>` (verified by `sort | uniq -d` over all `dist` titles). ✅
- **dupTokens — tokenizer artifacts, discount.** Flags like `22×2`, `25×2`, `box×2`, `label×2` are **not** keyword stuffing: `22×2` is the dimension `22×22 mm`; `Inner Box (Retail Box)` legitimately repeats "box"; `White-Label & Private-Label` legitimately repeats "label". No real stuffing on any page. ✅
- **Boilerplate n-grams — legitimate keyword, not spam.** `"shisha charcoal"` appears in 76 titles, `"coconut shisha charcoal"` in 68 — this is the **core product category** (the "iPhone" of this catalog), not abusive boilerplate. The ` | Mulia Charcoal` suffix is standard SEO practice, auto-appended at [`src/components/seo/SEO.astro:63`](src/components/seo/SEO.astro) only when the title doesn't already contain the brand. ✅ *However*, see §6: the SKU titles are heavily **templated** and differentiate only on grade/size/shape.

### 2.3 Cannibalization (B5) — one genuine pair

Clustering titles by head term surfaces many large clusters (`super premium`×19, `platinum 18`×4, …) — these are **artifacts of leading with the grade word**, not cannibalization: each page is a distinct shape×size×grade SKU with its own canonical (`isVariantOf` a `ProductGroup`). Likewise `import coconut`×5 are five distinct country guides. **Discount these.**

The **one genuine title-cannibalization pair** within `en`:

| Cluster | Pages | Note |
|---|---|---|
| **"Charcoal Shipping Rules"** | [`/logistics/rules`](src/pages/logistics/rules.astro) — *"Charcoal Shipping Rules & Incoterms \| Semarang"* · [`/logistics/charcoal-dg-regulation`](src/pages/logistics/charcoal-dg-regulation.astro) — *"Charcoal Shipping Rules 2026: IMDG 42-24 & SP 978"* | Both lead with the same head phrase. Separable by secondary intent (Incoterms vs IMDG/DG), but they compete. |

Soft/monitor-only (different intent, not acting now): `/` vs `/products` (both "coconut shisha", but brand/factory vs catalog intent); `/packaging/inner-box` vs `/packaging/plastic` (both "Coconut Charcoal Inner…", but distinct products).

> **Remedy is out of scope here** — title cannibalization is fixed by **semantic canonicalisation (book §5.1.3)**, tracked in the canonicalization audit, not by editing titles in this pass.

### 2.4 Spam / escaping / encoding (C) — ✅ clean

No ALL-CAPS-dominant titles, no `!`-spam, no clickbait or pure keyword-listing. No `set:html` on titles — rendered via `{fullTitle}` so HTML is auto-escaped. Live raw HTML shows correct **single**-encoding (`Rules &amp; Incoterms` for `&`), **no** double-encoding (`&amp;amp;`), no `U+FFFD`. `charsetBad`, `nonLatinTitle`, `mojibakePages` all empty.

### Phase 2 table (representative; full data in `dist`)

| locale | URL | title | px / trunc | front-loaded | dupTokens | boilerplate | cannibal | spam | title-lang | encoding | dup-with |
|---|---|---|---|---|---|---|---|---|---|---|---|
| en | `/` | Mulia Charcoal — Coconut Shisha Charcoal Factory in Semarang, Indonesia | 671 / ⚠️ | ✅ (brand) | — | core kw | soft `/products` | — | en | ok | — |
| en | `/contact` | Contact PT Coco Reina… — Coconut Shisha Charcoal Factory \| Mulia Charcoal | **922 / ⚠️** | ✖ legal-name | — | — | — | — | en | ok | — |
| en | `/about` | About PT Coco Reina… — coconut shisha charcoal factory \| Mulia Charcoal | **887 / ⚠️** | ✖ legal-name | — | — | — | — | en | ok | — |
| en | `/logistics/rules` | Charcoal Shipping Rules & Incoterms \| Semarang \| Mulia Charcoal | 591 / ok | ✅ | — | — | **⚠️ "shipping rules"** | — | en | ok | — |
| en | `/logistics/charcoal-dg-regulation` | Charcoal Shipping Rules 2026: IMDG 42-24 & SP 978 \| Mulia Charcoal | 630 / ⚠️ | ✅ | — | — | **⚠️ "shipping rules"** | — | en | ok | — |
| en | `/products/hexagonal-20x50-super-premium` | Super Premium 20×50 mm Hexagonal Coconut Shisha Charcoal \| Mulia Charcoal | **722 / ⚠️** | ✅ | (22×22 artifact) | template | grade-cluster (n/a) | — | en | ok | — |
| en | `/faq` | Shisha Charcoal FAQ: MOQ, Shipping, Payment, Specs — Mulia Charcoal | 654 / ⚠️ | ✅ | — | core kw | — | — | en | ok | — |

*(All 80 over-width pages are enumerated in the build; the table above shows the categories. No row has a true duplicate, spam, or encoding flag.)*

---

## 3. Heading structure & integrity (Phase 3)

### 3.1 `<h1>` count & placement (D) — ✅ strong

- **Exactly one `<h1>` on 108 / 108 indexable pages.** ✅
- **Every `<h1>` is inside `<main>`** (`h1NotInMain` is empty). ✅ The `<header>` emits **no** headings.
- Deviations are both **noindex** utility pages (acceptable, not in sitemap):
  - [`/admin`](public/admin/index.html) — 0 h1 (Sveltia CMS SPA shell).
  - [`/dev/components`](src/pages/dev/components.astro) — 3 h1 (component gallery showcase).

> **Stale-tactic note:** "use as many `<h1>` as you want / HTML5 outline" is never implemented by browsers or AT. Current rule = exactly one `<h1>`; the site already complies on all indexable pages.

### 3.2 Skipped heading levels (D) — 1 page

| URL | Sequence (main) | Skip | File |
|---|---|---|---|
| [/about](src/pages/about.astro) | `h1 → h3 → h3 … → h2 …` | **h1→h3** (no h2 before the first h3) | `/about` opens with `ColorBlock`/timeline `h3`s before any `h2`. |

All other 107 pages have clean, non-skipping hierarchies (verified from rendered `dist`, catching any MDX `##`/`###` jumps).

### 3.3 Out-of-Main-Content headings (D9) — ⚠️ sitewide, 5 per page

The **Footer** ([`src/components/layout/Footer.astro`](src/components/layout/Footer.astro)) emits **5 `<h2>` on every one of the 110 pages**, all outside `<main>`:

| Heading | Element / landmark | Line |
|---|---|---|
| `Factory address` | `<h2>` in `<footer>` | 55 |
| `Working hours` | `<h2>` in `<footer>` | 92 |
| `Company` | `<h2>` in `<footer><nav>` | 101 |
| `Products & operations` | `<h2>` in `<footer><nav>` | 110 |
| `About PT Coco Reina…` | `<h2 class="sr-only">` in `<footer><section>` | 138 |

This pollutes the document outline on every page with 5 chrome-level `<h2>`s that compete with each page's real `<h2>`s. The two `<nav>` headings are redundant (the `<nav>`s already carry `aria-label`). **Recommend** demoting the visible four to non-heading elements (e.g. `<p class="font-semibold">`) and either keeping the `sr-only` one or replacing it with an `aria-labelledby`-free `aria-label` on the `<section>`.

### 3.4 Hidden, pseudo, hydration-only, link headings (D5/E)

- **Hidden headings:** **No** `display:none` / `visibility:hidden` headings. The `sr-only` footer `h2` (and a `sr-only` "Why buyers trust this factory" inside `/contact`'s `<main>`) use the **clip** technique → present in the accessibility tree → **legitimate**, not a hidden-heading failure. ✅
- **Hydration-only headings (D5):** **None possible.** SSG, zero client JS on content pages → the headings in static `dist` HTML *are* the rendered headings (no `client:*` islands, tabs, or accordions reveal headings). ✅
- **Pseudo-headings:** discounted as artifacts — `/about` `span.text-2xl "G"` (avatar initial) and `span.text-3xl "★"` (rating star) are decorative inline `<span>`s; the product `p.text-2xl "from 1650 USD/ton"` is a **price callout** (`<p>`, not a section label). One nuance: that price `<p>` is 24px = same size as the product `sectionH2` — visually as prominent as a section heading, but semantically correct. Low concern.
- **Links wrapping headings (E):** [`/glossary`](src/pages/glossary.astro) has **6 `<h3><a>…→</a></h3>`** "Related topics" cards (Products →, Factory →, Logistics →, Quality →, Packaging →, Buyer's Guide →). This is the **listing/card-pattern exception**, so allowed — but it injects 6 navigation entries into the glossary's content outline. Low priority; consider styled `<a>` + large text instead of `<h3>`.

### 3.5 Heading IDs (F7) — ⚠️ no `rehype-slug`

`astro.config.ts` configures `markdown.remarkPlugins = [remarkCompanyTokens]` and **no `rehypePlugins` / no `rehype-slug`**. Result: heading IDs are added **manually** where present, so coverage is inconsistent:

- **Good:** product detail pages ID their key sections (`#specs-heading`, `#burn-heading`, `#drop-test-heading`, `#pricing-heading`, …) via `GradePage.astro`; `/glossary` IDs ~102/112 terms; the homepage IDs most section `h2`s.
- **Gap:** **107 pages** have at least one main `h2–h4` without an `id` (e.g. `/about` 33/33 missing, `/faq` 23/33, `/contact` 29/39). Un-IDed headings can't be deep-linked or cited as anchors by AI engines (GEO cost) and aren't deterministically slugged across builds.

**Recommend** adding `rehype-slug` to `astro.config.ts` for stable, automatic IDs on all rendered headings.

### 3.6 Subheading density / wall-of-text (D8) — ⚠️

Pages with a single run of **>300 words and no `h2/h3/h4`** (worst first):

| URL | Longest run (words) | Main words | h2/h3 |
|---|---|---|---|
| [/packaging](src/pages/packaging/index.astro) | **699** | 2,533 | 23 |
| [/packaging/white-label](src/pages/packaging/white-label.astro) | 537 | 1,862 | 20 |
| [/packaging/master-box](src/pages/packaging/master-box.astro) | 482 | 1,500 | 12 |
| [/legal/privacy-policy](src/content/legal/privacy-policy.md) | 458 | 2,461 | 17 |
| [/packaging/inner-box](src/pages/packaging/inner-box.astro) | 457 | 1,470 | 11 |
| [/glossary](src/pages/glossary.astro) | 420 | 6,753 | 112 |
| [/packaging/additional-packaging](src/pages/packaging/additional-packaging.astro) | 412 | 1,362 | 22 |
| import-to-{germany, uk, usa, russia} | 311–325 | 1.9–2.6k | 19–22 |
| 19 × `*-super-premium` SKU pages | 307 | ~3,187 | 35 |

The **packaging pillar** is the priority — `/packaging` has a 699-word unbroken block. The 307-word run that repeats across all 19 super-premium SKU pages is a single templated block in `GradePage.astro` that could take a `h3` mid-section. (Word-per-heading median is a healthy 91; outliers `/legal/privacy-policy` 145 and `/quality` 140 are expected for legal/overview pages.)

---

## 4. Coherence (Phase 4)

### 4.1 title ↔ h1 — weak/generic h1s on two money pages

All pairs are same-language (English) — **no mixed-language mismatch possible**. Genuinely weak h1s:

| URL | Title (core) | H1 | Issue | Severity |
|---|---|---|---|---|
| [/faq](src/pages/faq.astro) | Shisha Charcoal FAQ: MOQ, Shipping, Payment, Specs | **"Buyer FAQ"** | h1 is generic; drops the page's keywords. → e.g. *"Shisha Charcoal Buyer FAQ"*. | P1 |
| [/about](src/pages/about.astro) | About PT Coco Reina Global Charcoal Indonesia — … factory | **"About our charcoal factory"** | h1 omits the company identity that the title leads with. → e.g. *"About PT Coco Reina — Coconut Charcoal Factory in Semarang"*. | P1 |
| [/contact](src/pages/contact.astro) | Contact PT Coco Reina… — Coconut Shisha Charcoal Factory | "Contact our coconut charcoal factory" | Borderline (0.33); could add location/company. | P2 |
| import-to-{uk, germany, usa, russia} | Import Coconut Charcoal to the {UK…}: Duty, VAT, … | "Importing coconut charcoal to the {United Kingdom…}" | Mostly a token artifact (UK↔United Kingdom); h1 could carry one differentiator (Duty/VAT). | P2 |

**Discount (artifacts):** `exactTitleEqualsH1` flags (~16) are **acceptable** — they're category/pillar pages (`/products/cubes`, `/quality`, `/guide`, …) where title==h1 is fine, plus case-only diffs (`/logistics/import-guides`, `/un-1361` have sentence-case h1 vs title-case title). **No SKU detail page has title==h1** — they correctly differ (h1 adds "Shell"; title carries the brand suffix). One small framing diff worth a glance: [`/products/shisha-shop`](src/pages/products/[slug].astro) title says *"Private-Label…for Retail"* while h1 says *"Wholesale…for Smoke Shops & Retail"* — both coherent, slightly different angle.

### 4.2 Slug keyword presence — intentional short slugs (CONTEXT-OK)

~26 pages flag low slug↔title overlap, but these are **intentional short pillar/category slugs** (`/products`, `/guide`, `/faq`, `/about`) — per the project's URL conventions, pillar slugs are short and memorable. Not a defect.

### 4.3 Intro echo — ✅ clean

**Zero** intro-echo gaps: every page's first ~100 words echo the title's core phrase. (Caveat: intro text was checked from rendered main content, not a dedicated frontmatter field.)

---

## 5. Visual hierarchy (Phase 5) + RTL

No Playwright available, so **computed font-size and "h1 visually dominant across breakpoints" are MANUAL** (§8). Static evidence from Tailwind classes + the Prose CSS:

### 5.1 ⚠️ `.prose-mulia` heading scale is INVERTED on mobile

[`src/components/content/Prose.astro:35–45`](src/components/content/Prose.astro):

| Tag | Base | `md:` | `lg:` |
|---|---|---|---|
| `h2` | `text-xl` = **20px** | 24px | 30px |
| `h3` | `text-2xl` = **24px** | 24px | 24px |
| `h4` | `text-xl` = **20px** | 20px | 20px |

At the **base (mobile) breakpoint, h3 (24px) is larger than h2 (20px)**, and h4 (20px) ties h2; at `md:` h2==h3 (24px tie). Only at `lg:` does it descend correctly. On a **mobile-first** site (360px target) this is a real inversion. **Current exposure:** the 3 Prose pages — [`/legal/privacy-policy`](src/content/legal/privacy-policy.md), [`/legal/terms`](src/content/legal/terms.md), [`/legal/cookies`](src/content/legal/cookies.md) — wherever an `h3` follows an `h2`. **Latent exposure:** every future `/blog` article uses Prose. Fix: make `h2 ≥ h3 ≥ h4` at all breakpoints (e.g. h2 `text-2xl md:text-3xl`, h3 `text-xl md:text-2xl`, h4 `text-lg md:text-xl`).

### 5.2 Inline-styled `.astro` headings — minor ties only

`<h1>` is consistently dominant: **36px** base on home (`text-[2.25rem]`→48px lg), **30px** (`text-3xl`) on 106 pages, 24px on the 3 legal pages (still ≥ their h2s). Product `sectionH2` = `text-2xl md:text-3xl` (24px base) sits correctly below the 30px h1. The only flags are **equal-size ties** (not strict inversions): `/careers` (h2=h3=20px), `/quality/specifications-explained` & `/quality/testing-methods` (h2=h3=24px), home (h3=h4=18px). Acceptable but could add one step of contrast.

### 5.3 RTL — N/A

`localeDir()` correctly maps `{ar, he}` → `rtl`, but **no RTL pages ship**, so `dir`/`lang` correctness for RTL is untestable today. All live pages are `lang="en" dir="ltr"`. ✅ for what exists.

---

## 6. Charcoal / B2B (Phase 6)

### 6.1 Spec tokens in title/h1 — intentionally absent (OK)

All 65 product/category titles+h1 contain **no** spec token (ash, calorific, moisture, MOQ) — **correct**: you front-load buyer-intent descriptors (grade/size/shape), not lab values, in a title.

### 6.2 Fact-headings present; limiting heading missing (P2)

Product **detail** pages (57) **do** carry declarative fact-headings in `<main>` — verified `Specifications`, `Burn test — performance over time`, `Drop test — transit durability` (with IDs) on every SKU page via `GradePage.astro`. ✅ The gap: **no limiting/caveat heading** (Storage, Shelf-life, Suitability, moisture handling) on the transactional product pages — shelf-life lives only on `/faq`. Adding a "Storage & shelf life" or "Best suited for" `h2` would improve GEO extractability and completeness.

### 6.3 SKU title differentiation — grade-only within a size trio (P1)

Within each shape×size, the three grade pages differ **only by the leading grade word**:

```
Premium 25×25 mm Cube Coconut Shisha Charcoal
Super Premium 25×25 mm Cube Coconut Shisha Charcoal
Platinum 25×25 mm Cube Coconut Shisha Charcoal
```

The h1 adds "Shell" (`…Coconut Shell Shisha Charcoal`) — an intentional template choice ([`productGrade.json:7`](src/i18n/en/productGrade.json)), but the **SERP title** carries no secondary signal (burn time, ash %, price tier) to separate the trio. This is the title-level twin of the **near-duplicate SKU body** finding already tracked in the **canonicalization audit (P1-1: 513 SKU pairs ≥0.80 similarity, fix in `src/components/product/GradePage.astro`)** — *cross-referenced, not re-audited here*. Category pages (`/products/cubes` …) use a clean uniform template; market pages (`/products/shisha-cafee` vs `/products/shisha-shop`) are well differentiated (Bulk/Café vs Private-Label/Retail).

---

## 7. Multilingual section

**Production is English-only** (see §0). Therefore:

| Brief check | Status | Note |
|---|---|---|
| Per-locale translation completeness (title) | **N/A** | No non-`en` routes exist; nothing to be untranslated. |
| Per-locale translation completeness (headings) | **N/A** | Same. |
| German title truncation | **N/A (will bite later)** | German is verbose; with the SKU template already at 722px in English, German SKU titles will overflow hard. Plan a shorter localized template. |
| RTL `dir`/`lang` (ar/he) | **N/A** | `localeDir()` is correct in config; no RTL pages render yet. |
| Per-locale boilerplate / case-folding (tr) | **N/A** | No locale corpus to compare within. |
| **UTF-8 integrity** | ✅ **PASS** | `charset=utf-8` on **111/111** pages; `<html lang="en">` on all; no non-Latin/mojibake/double-encoded titles. |
| hreflang / x-default | **OUT OF SCOPE** | Noted only; SEO.astro emits `hreflang=en` + `x-default` for indexable pages. |

**Readiness gaps to fix before the first locale ships:**
1. **Title template length** — the English SKU template already truncates; localized templates (esp. `de`) need a shorter form or the brand suffix dropped on product pages.
2. **Prose heading inversion (§5.1)** will ship to every translated article too — fix the component before scaling content.
3. **RTL heading direction** — once `ar/he` render, re-verify heading text direction and that `<h1>` stays visually dominant in RTL (a Phase 5 manual item).

---

## 8. Manual-only checklist (NOT auto-verified)

- ☐ **Goldmine/displayed title** — what Google actually renders vs the `<title>` (GSC URL Inspection / live SERP). Especially the 80 over-width titles and the doubled-brand `/about` `/contact`.
- ☐ **Title CTR** as a NavBoost proxy (GSC Performance).
- ☐ **goodClicks / badClicks / lastLongestClicks** (dwell, pogo-sticking) — analytics inference only.
- ☐ **Computed font-size** per `h1–h6` and **h1 visual dominance across breakpoints** (no Playwright in this environment) — confirm the §5.1 Prose inversion on a real 360px viewport and the §5.2 ties.
- ☐ **h1 dominance in RTL** — once ar/he ship.
- ☐ **Editorial/semantic quality** — fact-vs-promise headings, sub-intent splits, the cannibalization-remedy decision for *Charcoal Shipping Rules* (§2.3), and the SKU title-differentiation strategy (§6.3). Human/LLM judgment.

---

## 9. Prioritized fixes

### P0 — active risk
**None.** No indexable page has 0 or >1 `<h1>`, no missing `<title>`, no raw HTML in any title/heading, no hydration-only headings (SSG), no keyword-stuffed money-page titles.

### P1 — should fix
1. **Title truncation on `/about` & `/contact`** — drop the doubled branding. Lead with the keyword, not the legal entity. e.g. `About Mulia Charcoal — Coconut Shisha Charcoal Factory, Semarang` (the legal name belongs in `LocalBusiness`/`Organization` JSON-LD, not the `<title>`). Files: [`src/pages/about.astro`](src/pages/about.astro), [`src/pages/contact.astro`](src/pages/contact.astro).
2. **Weak h1s** on [`/faq`](src/pages/faq.astro) ("Buyer FAQ") and [`/about`](src/pages/about.astro) ("About our charcoal factory") — make the h1 carry the page's keyword/identity (§4.1).
3. **`/about` heading skip (h1→h3)** — insert a top-level `<h2>` before the first timeline `h3`, or promote those `h3`s to `h2`. File: [`src/pages/about.astro`](src/pages/about.astro).
4. **Footer outline pollution** — demote the 5 chrome `<h2>` to non-heading elements (§3.3). File: [`src/components/layout/Footer.astro`](src/components/layout/Footer.astro) (lines 55, 92, 101, 110, 138). Affects all 110 pages.
5. **Prose heading-size inversion on mobile** — fix `h2 ≥ h3 ≥ h4` at every breakpoint. File: [`src/components/content/Prose.astro`](src/components/content/Prose.astro) (lines 35–45). Hits legal pages now, all articles later.
6. **SKU title differentiation** — add a secondary signal to the product title template (or accept and rely on semantic canonicalisation per §6.3 / canonicalization audit P1-1). File: [`src/i18n/en/productGrade.json`](src/i18n/en/productGrade.json) `meta.titleTemplate`.

### P2 — polish
7. **Add `rehype-slug`** for deterministic heading IDs on all 107 under-IDed pages. File: [`astro.config.ts`](astro.config.ts) `markdown.rehypePlugins`.
8. **Wall-of-text** — break the 699-word block on [`/packaging`](src/pages/packaging/index.astro) and the repeated 307-word SKU block ([`GradePage.astro`](src/components/product/GradePage.astro)) with an extra `h3` (§3.6).
9. **"Charcoal Shipping Rules" cannibalization** — re-angle one of [`/logistics/rules`](src/pages/logistics/rules.astro) / [`/logistics/charcoal-dg-regulation`](src/pages/logistics/charcoal-dg-regulation.astro) titles, or apply semantic canonicalisation (§2.3).
10. **`/glossary` `<h3><a>` cards** — consider styled `<a>` instead of `<h3>` to keep them out of the content outline (§3.4). File: [`src/pages/glossary.astro`](src/pages/glossary.astro).
11. **Missing limiting heading** on product pages — add a "Storage & shelf life" / "Best suited for" `h2` to `GradePage.astro` (§6.2).
12. **Import-guide h1s** — optionally add one differentiator (Duty/VAT) so h1 mirrors the title (§4.1).

---

### Console summary

```
TITLES & HEADINGS AUDIT — muliacharcoal.com (EN-only; 111 dist HTML, 108 indexable)
P0: none. No indexable page has 0/>1 h1, missing title, raw-HTML, or hydration-only headings.
WORST ISSUES:
1. 80/108 titles >600px. /contact 922px & /about 887px double-brand (legal name + " | Mulia Charcoal") and lose words.
2. Footer emits 5 <h2> OUTSIDE <main> on every one of 110 pages — sitewide outline pollution (Footer.astro).
3. Prose heading scale INVERTED on mobile: h3 24px > h2 20px (Prose.astro) — legal pages now, all blog articles later.
4. /about skips h1->h3; /faq h1 "Buyer FAQ" & /about h1 "About our charcoal factory" are weak vs their titles.
5. No rehype-slug -> 107 pages have un-IDed main h2-h4 (breaks anchor/GEO deep-links).
6. 65 SKU titles differ only by grade within a size-trio (cross-ref canonicalization P1-1, 513 near-dup pairs).
CLEAN: 0 duplicate titles, 0 mojibake/double-encoding, UTF-8 everywhere, exactly-one-h1 on all indexable pages.
MULTILINGUAL: ar/he/de/tr/es… NOT shipped — all per-locale/RTL/translation checks are N/A, not pass.
```
