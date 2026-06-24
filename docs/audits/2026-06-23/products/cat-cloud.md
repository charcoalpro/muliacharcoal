# Content Audit — /products/cloud (Lotus shape-category page)

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report, no edits). Passes 0,1,2,3,5. Pass 6 OFF.
**Cornerstone:** No (minor mid-tier hub page).

---

## 1. Manifest (Pass 0)

| Item | Value |
|---|---|
| Target route | `/products/cloud` |
| Page type | Shape-category page for shape `lotus` (architecture remap `lotus` → `/products/cloud`, per CLAUDE.md) |
| Pillar | Products |
| Source dispatcher | `src/pages/products/[slug].astro` (delegates on `kind === 'category'`) |
| Template component | `src/components/product/ShapeCategoryPage.astro` |
| Layout | `src/layouts/BaseLayout.astro` |
| Child components | `Breadcrumbs`, `HeroSection`, `MaybeLink`, `CTABanner` |
| Data sources | `src/config/products.ts` (`productShapes` → `lotus`, sizes `lotus-3pc`/`lotus-4pc`, `pcsPerKg` 30/25; `productMarkets`), `src/config/grades.ts` (3 grades, ash displays), `src/config/productRoutes.ts` (`gradeHref`, `gradesForSize`, published-set), `src/config/nav.ts` (`isLive` / `LIVE_ROUTES`) |
| i18n source | `src/i18n/en/productCategory.json` (`shape.lotus.*` + shared templates); `en.products.choose.market.items` (by-destination row) |
| `company.ts` fields consumed (via `companyTokens()`) | `brand`, `address.city`, `address.country`, `commercial.moq.tons` / `moqLabel()`, `commercial.moq.containerType`, `commercial.portOfLoading.name` (port), `packaging.innerBox.weightOptionsKg` (`innerBoxSizes`) |
| Schema types emitted | `CollectionPage`, `ItemList` (6 grade SKUs of the 2 sizes), `BreadcrumbList`. No FAQPage (correct). |
| Build status | `dist/products/cloud/index.html` present, well-formed, no error markers. (Read-only inspection; build not re-run.) |

**Honesty-gating note:** This page renders no certifications / SP-978 / capacity / per-order-report trust blocks — correct: it is a catalogue hub, not a trust page, and no such block is gated here. Nothing absent that a present fact should drive.

---

## 2. Severity-tiered TODO list

### Blockers
*(honesty-gating violation, hardcoded company fact, fabricated/uncited claim, real orphan/broken pillar link, misplaced FAQPage, build failure, regulatory claim now factually wrong)*

**None.** No hardcoded company facts (all of brand/city/country/MOQ/port/inner-box sizes flow through `companyTokens()` tokens). No fabricated trust claim. Schema types correct; no FAQPage. Pillar links down to this page (verified). No real orphan.

### Defects
*(factual Error from Pass 3, missing required schema type, snippet/heading/structure failures, missing Devil's Advocate on cornerstone, missing GEO meta table on cornerstone)*

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 — pillar up-link "in the first paragraph" (CLAUDE.md internal-linking rules) | Hero subtitle (`HeroSection subtitle={st?.definition}`) + first body para `#about-the-format` ("About the Lotus format") | The first *paragraph* of body copy contains no in-prose link up to the `/products` pillar. The only up-links are the breadcrumb and the "Compare all grades on the products hub" link two sections lower in `#grades-explained`. The rule wants the pillar up-link in the opening paragraph. | Add an inline `/products` (or "coconut shisha charcoal range") link inside the `shape.lotus.aboutBody` opening sentence or the hero definition, so the up-link sits in the first paragraph as the other cluster pages do. Note this is a shared template (`ShapeCategoryPage.astro`) — the fix would apply to all six shape pages, so treat as template-level. |
| D2 | Defect | Pass 2 — featured-snippet lead / headings as questions | `#sizes-heading` "Sizes available", `#grades-heading` "Grades explained", `#packaging-heading` "Packaging & logistics" | Section headings are noun labels, not the buyer questions ("What sizes does Lotus charcoal come in?", "What do the grades change?", "How is Lotus packed and shipped?"). Several first sentences answer well, but the heading form forfeits question-match snippet eligibility. | Reframe the three H2 labels in `productCategory.json sections.*` to question form (template-level, affects all shapes). The `#about-the-format` and `#best-markets` leads already open with a direct answer; keep those. |

### Hardening
*(anti-bloat, missing mini-cases, freshness cadence, connectivity gaps, minor-page omissions)*

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — Devil's Advocate (minor page) | Whole page | No steelman / counter-argument section (e.g. "Lotus costs more per kg and burns fewer grams of charcoal per set — is it worth it?"). Optional on a minor catalogue page. | Optional: add one short "When Lotus is *not* the right pick" paragraph after `#about-the-format` contrasting it with cubes on cost-per-session. Low priority. |
| H2 | Hardening | Pass 1/2 — GEO meta table (minor page) | Top of page | No Author / Reviewed-by / Fact-checked / Last-updated / Read-time meta table. Expected only on cornerstone/article pages; absence on a catalogue hub is acceptable. | No action required for a minor page; listed for completeness. |
| H3 | Hardening | Pass 2 — quantified evidence | `#best-markets` para (`shape.lotus.marketsBody`) | "suit premium lounges and hotels in the GCC and high-end Western venues" and "pair naturally with Platinum grade" are positioning assertions with no number. The rest of the page is numeric; this paragraph is the soft spot. | Optional: anchor with a concrete figure (e.g. typical set size, Platinum ash 1.6–2.0% already on page) or reframe as a recommendation rather than a market-fact claim. |
| H4 | Hardening | Pass 2 — anti-bloat | `#about-the-format` para (`shape.lotus.aboutBody`) | The clause "so a premium lounge can present the coal, not just burn it … the coal brought to the table for a signature service" restates the presentation thesis twice within ~3 sentences. Compressible ~20% without fact loss. | Optional: merge the two "presentation" sentences. The definition sentence (good GEO) should stay intact. |
| H5 | Hardening | Pass 2 — connectivity (by-destination row) | `#best-markets` "By destination market" row | The five country links (`/markets/usa` … `/markets/russia`) render muted (`data-coming-soon`) because they are not in `LIVE_ROUTES`. **Deliberate, not a defect** — logged only so a future `LIVE_ROUTES` rollout re-checks this row lights up. No action now. |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "A lotus — or cloud — briquette is a decorative profile coconut charcoal piece, sold in multi-piece sets…" (definition) | Correct | Low | Consistent with `products.ts` shape description ("Decorative profile briquettes for premium shisha lounges. Same coconut shell formulation, distinctive shape."). | company/products.ts |
| "same 100% coconut shell formulation as every other shape" | Correct | Low | Matches sitewide material claim (`SHARED_MATERIAL = 'Coconut shell'`); reinforced in `sizes.intro`. | products.ts |
| "available in all 3 grades" / "Premium, Super Premium, Platinum" | Correct | Low | `grades.ts` defines exactly three grades; ItemList emits 2 sizes × 3 grades = 6. | grades.ts |
| "Premium (2.5-2.8% ash) … Platinum (1.6-2.0% ash)" | Correct | Low | Exact match to `grades.ts` `premium.ash.display` / `platinum.ash.display`. | grades.ts |
| "≈ 30 Pieces / kg" (3-piece) / "≈ 25 Pieces / kg" (4-piece) | Correct | Low | Match `lotus-3pc` pcsPerKg 30 / `lotus-4pc` pcsPerKg 25. Note products.ts header comment flags pcsPerKg as factory approximations — the "≈" prefix correctly signals this. | products.ts |
| "MOQ 18 tons (one 20ft container)" / "We load full 20ft containers" | Correct | Low | Rendered via `moqLabel()` / `containerType` tokens from `company.ts`; not a literal. | company.ts |
| "printed inner boxes (250 g / 500 g / 1 kg / 2 kg / 3 kg / 5 kg)" | Correct | Low | Rendered via `innerBoxSizes` token from `company.packaging.innerBox.weightOptionsKg`; not a literal. | company.ts |
| "Lotus/cloud sets suit premium lounges and hotels in the GCC and high-end Western venues" | Unverified | Low | Market-positioning assertion, no source. Plausible, low reputational risk; not a regulatory/spec claim. See H3. | model |
| "They pair naturally with Platinum grade and private label" | Unverified | Low | Recommendation framed as fact; soft. Low risk. | model |

No factual **Error** found. No regulatory claim on this page (no UN 1361 / SP 978 / VAT / duty content) — regulatory-currency rule not triggered.

---

## 4. Requires deep research

**None blocking.** The only Unverified items (H3 / the two market-positioning claims) are low-severity marketing positioning, not external regulatory or numeric facts. They do not warrant the deep-research companion prompt; resolve editorially or soften the framing.

---

## 5. E-E-A-T / HCU assessment (Pass 5)

Per-criterion, 1–10:

| Criterion | Score | One-line justification |
|---|---|---|
| Authorship & expertise | 7 | Specification-dense, manufacturer-voice; no byline/reviewer (acceptable for a catalogue hub, not an article). |
| Topical authority | 8 | Sits cleanly in the Products cocoon; links to specs, certifications, raw materials, packaging, logistics, both market landers. |
| Technical health & freshness | 8 | Clean static HTML, correct schema graph, no JS-gated content. (CWV/Lighthouse not re-measured — owned by DrMax technical series.) |
| Effort | 7 | Real per-shape copy (definition, about, burn, users, markets), not boilerplate; two soft paragraphs (H3/H4). |
| Originality | 7 | Lotus-specific positioning distinct from other shape pages; market paragraph is generic. |
| Citation quality | 6 | All hard specs trace to config SSoT; the two market claims are uncited (low stakes). |
| Freshness / timeliness | 7 | Evergreen catalogue content; no visible date (fine for a hub, not an article). |
| Page intent | 9 | Clear navigational/commercial intent: introduce the shape, route to sizes→grades and to quote/sample CTAs. Well served. |
| Structure & readability | 8 | Logical H1→H2 outline, at-a-glance `<dl>`, scannable size cards. Headings are labels not questions (D2). |
| Mobile | 8 | Responsive grids, 44px+ touch targets, sticky WhatsApp FAB; per BaseLayout budgets. |
| Format-standard adherence | 8 | Definition-form lead sentence, numeric data, breadcrumb + CollectionPage/ItemList — matches GEO format norms; no meta table (minor-page-acceptable). |
| Trust & spam signals | 8 | Honest gating, no fabricated certs, real footer entity block; no spam patterns. |

**PQ (arithmetic mean of 12) = 90 / 12 = 7.58 → 7.6 / 10.**

**Verdict:** Helpful-first. The page answers a real buyer intent (what is the Lotus format, what sizes/grades, how do I order/sample) with extractable specs and clean routing; goodClicks prognosis. The two structural items (no first-paragraph pillar up-link, label-form headings) are the only things nudging it toward search-first packaging.

**Lowest-3 action steps:**
1. **Citation quality (6):** Soften or quantify the two market-positioning claims in `shape.lotus.marketsBody` (H3) so every assertion on the page is either config-backed or framed as a recommendation, not a fact.
2. **Originality (7) / Effort (7):** Trim the duplicated "presentation" thesis in `aboutBody` (H4) and replace the freed space with one differentiating, numeric detail (e.g. why a coordinated set burns more evenly than loose cubes).
3. **Structure (8, but the fixable lever):** Convert the three label-form H2s to buyer-question form (D2) and add the first-paragraph `/products` up-link (D1) — both template-level edits in `ShapeCategoryPage.astro` / `productCategory.json` that lift all six shape pages at once.

---

*End of report. No site files modified.*
