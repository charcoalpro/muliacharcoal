# Content Audit — `/products/shisha-shop`

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report, no fixes). Passes 0,1,2,3,5. Pass 6 OFF.
**Cornerstone:** No (minor market-lander; meta-table / Devil's-Advocate absence is Hardening, not Defect).

---

## 1. Manifest

| Field | Value |
|---|---|
| Target route | `/products/shisha-shop` |
| Pillar | Products |
| Page kind | `market` (discriminated `kind` dispatched by `src/pages/products/[slug].astro`) |
| Source dispatcher | `src/pages/products/[slug].astro` (lines 40-52 select `market` → `MarketCategoryPage`) |
| Template component | `src/components/product/MarketCategoryPage.astro` |
| Layout | `src/layouts/BaseLayout.astro` (via template) |
| Child components | `Breadcrumbs`, `HeroSection`, `MaybeLink`, `CTABanner` |
| Route data | `src/config/products.ts` (`productMarkets` → `{ slug:'shisha-shop', key:'shop', href:'/products/shisha-shop' }`); `src/config/productRoutes.ts` (`PUBLISHED_MARKET_KEYS` includes `'shop'`); reco refs hardcoded in template (`recoRefs.shop`) point at `cube-25mm` premium / super-premium + `hexagonal-20x50` super-premium |
| Copy source | `src/i18n/en/productMarket.json` → `market.shop.*` + shared `productMarket.*` keys |
| `company.ts` fields consumed (via `companyTokens`) | `commercial.portOfLoading.name` (`port`), `commercial.moq` (`moqLabel`, `moqTons`, `containerType`), `packaging.innerBox.weightOptionsKg` (`innerBoxSizes`), `packaging.innerBox.paperGsm` (`innerBoxGsm`); WhatsApp deep links via `waLinkFor('quoteSpecs'|'samplesHero')` |
| Schema types emitted | `CollectionPage` + `ItemList` (3 items) via `collectionPageSchema`; `BreadcrumbList` via `Breadcrumbs`. No FAQPage (correct). |
| Built HTML | `dist/products/shisha-shop/index.html` (present; build already done) |

**Pillar-cluster placement:** Products pillar, market-category cluster (sibling: `/products/shisha-cafee`). No FAQ content on the page, so no canonical-FAQ-home concern. Pillar links DOWN to it: `src/pages/products.astro` line 530 renders a live `MaybeLink href="/products/shisha-shop"` (route is in `publishedProductRoutes()` → `LIVE_ROUTES`), confirmed in `dist/products/index.html`. **Not an orphan.**

---

## 2. Severity-tiered TODO list

### Blockers
*(honesty-gating violation, hardcoded company fact, fabricated/uncited claim, real orphan / broken pillar link, misplaced FAQPage, build failure, regulatory claim now factually wrong)*

**None.**

- Hardcoded-fact gate: PASS. Every fact (port, MOQ 18 tons, 20ft container, inner-box sizes 250 g–5 kg, 230 gsm board, SKU names/URLs) flows through `companyTokens()` / config refs; no literal company fact appears in the template or `productMarket.json`. WhatsApp links use `waLinkFor()`, not a hardcoded number.
- Honesty-gating gate: PASS. This lander renders no certification / SP-978 / capacity / per-order-report trust block, so there is no claim that could be ungated. Nothing is asserted without a backing fact.
- Orphan / pillar-down gate: PASS (live incoming link from `/products`).
- Schema placement gate: PASS. `CollectionPage`+`ItemList`+`BreadcrumbList` are the correct types; no FAQPage emitted (FAQPage is `/faq`-only globally).

### Defects
*(factual Error from Pass 3, missing required schema type, snippet/heading/structure failures, missing Devil's Advocate on cornerstone, missing GEO meta table on cornerstone)*

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 — Pillar linking (CLAUDE.md: "Every cluster page links up to its pillar in the **first paragraph** and in a Related section") | Hero subtitle + first section `#what-they-need` (`MarketCategoryPage.astro` L107-145; `productMarket.json` `market.shop.atAGlanceDefinition` and `needBody`) | The page's first in-body prose paragraph (the hero `atAGlanceDefinition` and the "What smoke shops & retailers need" body) contains **no up-link to the `/products` pillar**. The first in-body link to `/products` appears only in the "Related topics" grid at the very bottom ("All coconut shisha charcoal"). The breadcrumb links to `/products` but the rule requires a first-paragraph contextual link. Sibling `/products/shisha-cafee` shares this template gap. | Add a contextual `MaybeLink href="/products"` inside the first prose paragraph (e.g. in `needBody` or `atAGlanceDefinition`) — e.g. anchor "coconut shisha charcoal" or "our full range" to `/products`. Because copy is in `productMarket.json`, the link must be woven into the i18n string or the first section restructured to carry it; do NOT hardcode in the component. |
| D2 | Defect | Pass 2 — Headings as questions / featured-snippet targeting | Section H2s: `#recommended` ("Recommended shapes, sizes & grades"), `#packaging` ("Packaging for this channel"), `#moq-economics` ("MOQ & economics"), `#getting-started` ("Getting started") — `productMarket.json` `sections.*` | 4 of 5 H2s are statement-form, not the question a buyer asks, so they do not target featured-snippet / "People also ask" surfaces. Only `sections.need` ("What {{audience}} need") is question-adjacent. | Reframe section headings to buyer questions, keeping the 1-2 sentence answer already present directly beneath each (which is good). Suggested forms: "Which shapes, sizes and grades should a smoke shop stock?"; "How should retail packaging be configured?"; "What is the minimum order for retail?"; "How do I launch a private-label charcoal line?". Edit `productMarket.json` `sections.*` only. |

### Hardening
*(anti-bloat, missing mini-cases, freshness cadence, connectivity gaps, minor-page omissions)*

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — Devil's Advocate (minor page → Hardening) | Whole page (after `#recommended`) | No steelman of the strongest counterargument (e.g. "isn't a generic OEM coal cheaper than a branded private-label program?" / "why not buy domestically?"). Acceptable on a minor lander, but a short data-grounded rebuttal would lift citation value. | Optionally add one short "Why not just buy unbranded / domestic?" paragraph with the MOQ + private-label margin rationale. Low priority. |
| H2 | Hardening | Pass 2 — Mini-cases / GEO meta table (minor page → Hardening) | Whole page | No Problem→Action→Result mini-case and no top-of-page Author/Reviewed/Last-updated meta table. Both are cornerstone requirements; this is a minor lander, so absence is acceptable. | Leave as-is unless the page is later promoted to cornerstone. No action required now. |
| H3 | Hardening | Pass 2 — Anti-bloat / duplication | `#what-they-need` body vs `#recommended` reco "why" prose (`productMarket.json` `market.shop.needBody` vs `recos[2].why`) | "Hexagonals add shelf distinction and even ignition" appears in both `needBody` and reco card 3; "printed 1 kg inner box is the standard retail unit" appears in `needBody`, `packagingBody`, and the hero definition (3×). Mild thesis restatement. | Trim the duplicate "standard retail unit" sentence to one canonical location (keep in `#packaging`, drop from `needBody`); let the reco card carry the hexagonal "even ignition" line once. |
| H4 | Hardening | Pass 2 — Quantified evidence | `#what-they-need` / reco card 3 ("hexagonals add even ignition"); `needBody` ("Premium and Super Premium grades hit the price point a shelf needs") | Two benefit claims are qualitative with no number. "Even ignition" and "hit the price point" assert advantage without a measurable figure. | Where a number exists in config (burn time, ash %), reference it; otherwise soften to avoid an unquantified superiority claim. Low stakes — these are positioning, not spec, claims. |
| H5 | Hardening | Pass 2 — Section coherence / link surfacing | `#getting-started` (`MarketCategoryPage.astro` L213-235) | The two "getting started" guide links (`/guide/how-to-start-your-own-brand`, `/guide/private-label-options`) render as muted `data-coming-soon` spans because those routes are NOT in `LIVE_ROUTES` (only `coconut-vs-bamboo-vs-wood-charcoal` and `how-to-choose-shisha-charcoal-factory` are live). This is **correct, deliberate `MaybeLink` muting — NOT a broken link and NOT a finding to fix now.** Noted only so a future reviewer does not re-flag it. When those guide pages ship and enter `LIVE_ROUTES`, the links self-light; no template change needed. | No action. Informational only. |

---

## 3. Claims register

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "MOQ 18 tons (one 20ft container)" / "We load full 20ft containers — 18 tons" | Correct | — | Rendered from `commercial.moq` via `moqLabel`/`moqTons`/`containerType`; matches site-wide MOQ. | company.ts (`commercial.moq`) |
| "FOB Semarang" (meta description) | Correct | — | `port` = `commercial.portOfLoading.name`; Incoterm default = `portOfLoading.incoterm`. | company.ts (`commercial.portOfLoading`) |
| "printed inner boxes (250 g / 500 g / 1 kg / 2 kg / 3 kg / 5 kg) on 230 gsm board" | Correct | — | Both `innerBoxSizes` and `innerBoxGsm` interpolated from `packaging.innerBox` (`weightOptionsKg`, `paperGsm`). | company.ts → data/company.json (`packaging.innerBox`) |
| "There is no sub-container retail option; first-time buyers start with a free sample." | Correct | Low | Consistent with `commercial.moq` (full-container only) and the samples model; `trialMinimum` null = no LCL. | company.ts (`commercial.moq`, `samples`) |
| "A printed 1 kg box is the standard retail unit." | Unverified | Low | Internal positioning assertion, not a spec; reasonable industry norm but no cited source. Restated 3× (see H3). No external check warranted. | model / internal |
| "hexagonals add shelf distinction and even ignition" | Unverified | Low | "Even ignition" is a mild physical-performance claim with no quantified backing on the page. Low stakes; not a regulatory or safety claim. | model / internal |
| "Premium and Super Premium grades hit the price point a shelf needs" | Unverified | Low | Pricing/positioning generalization, no number. Acceptable as marketing framing. | model / internal |
| ItemList SKU names: "Premium Cube 25×25 mm", "Super Premium Cube 25×25 mm", "Super Premium Hexagonal 20×50 mm" + URLs `/products/cube-25mm-{premium,super-premium}`, `/products/hexagonal-20x50-super-premium` | Correct | — | Built from `allSkus()` + `grades` + `gradeHref()`; all three target live grade pages (Phase B published set). | products.ts / grades.ts / productRoutes.ts |

No claim contradicts a source (no **Error** rows). No regulatory claims appear on this lander.

---

## 4. Requires deep research

**None.** No external/regulatory claim on this page requires the deep-research companion prompt. The three "Unverified" rows above (standard-retail-unit, hexagonal even-ignition, grade price-point) are low-severity internal positioning statements; they warrant a copy-side softening (H4) rather than external fact verification, and would not change a buyer-facing regulatory or safety outcome in any target market.

---

## 5. E-E-A-T / HCU assessment

| Criterion | Score (1-10) | Justification |
|---|---|---|
| Authorship & expertise | 6 | No on-page author/reviewer block (minor lander; acceptable), but the org footer (PT Coco Reina, ISO 9001, NIB/NPWP) and specification-led copy signal a real manufacturer. |
| Topical authority | 8 | Sits in a dense Products cluster; recos link to live grade pages; clear use-case ownership (retail/private-label) distinct from the café sibling. |
| Technical health & freshness | 7 | Clean static HTML, correct schema types, no JS-hidden content. (CWV/Lighthouse mechanics out of scope — defer to DrMax / CLAUDE.md budgets.) No on-page date, but a market lander rarely needs one. |
| Effort | 7 | Tailored channel logic, 3 reasoned reco cards, packaging + economics + getting-started sections. Some restatement (H3) caps it. |
| Originality | 7 | Genuinely differentiated from the café lander (shelf-appeal vs cost-per-session framing); not boilerplate. |
| Citation quality | 5 | Few extractable hard numbers beyond MOQ/box sizes/gsm; positioning claims (even ignition, price point) are unquantified (H4). |
| Freshness / timeliness | 6 | Evergreen content, no stale facts; no visible review cadence, but none required for a lander. |
| Page intent | 9 | Intent (route a retail/private-label buyer to the right SKU + packaging + next step) is crisp and well served; strong CTA + sample path. |
| Structure & readability | 7 | Logical section flow, answer-first leads, semantic landmarks, good contrast. Pulled down by statement-form headings (D2) and the missing first-paragraph pillar link (D1). |
| Mobile | 8 | Responsive grids (2/3/5-col at-a-glance, 1/3-col recos), 44px+ targets, sticky WhatsApp FAB. (No re-measurement; per CLAUDE.md budgets.) |
| Format-standard adherence | 7 | Breadcrumb + CollectionPage/ItemList correct; no meta table / Devil's Advocate, but those are cornerstone-only (this is minor). |
| Trust & spam signals | 8 | Honest gating (no fabricated certs/reviews), no keyword stuffing, real org identity, no manipulative patterns. |

**PQ (arithmetic mean of 12):** (6+8+7+7+7+5+6+9+7+8+7+8) / 12 = **85 / 120 = 7.08 → 7.1 / 10**

**Verdict:** **Helpful-first.** The page answers a real buyer's question (which retail SKU + packaging + first step) directly, with honest gating and no fabricated trust signals. goodClicks-leaning: a smoke-shop buyer lands, gets routed to a concrete SKU and the private-label path, and converts to WhatsApp. badClicks risk is low; the only friction is that the up-link to the pillar and the question-framed headings are missing, which slightly weakens snippet capture and in-page wayfinding.

**Lowest-3 action steps:**
1. **Citation quality (5):** Quantify the two soft benefit claims (H4) — pull a burn-time or ash figure from config where one exists, and drop unquantified superiority phrasing ("hit the price point").
2. **Authorship & expertise (6) / Freshness (6):** Optional, low priority for a minor lander — if promoted toward cornerstone, add a lightweight reviewer/last-updated line; otherwise leave.
3. **Structure & readability (7) — highest-ROI quick wins:** Fix D1 (weave a `/products` pillar link into the first paragraph via `productMarket.json`) and D2 (convert the four statement H2s to buyer-question form), keeping the existing answer-first leads. Both are i18n-only edits, no template change.
