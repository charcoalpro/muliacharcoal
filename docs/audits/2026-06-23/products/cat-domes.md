# Content Audit — /products/domes

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report, no fixes)
**Cornerstone:** No (minor shape-category page — meta-table / Devil's-Advocate absence is Hardening, not Defect)
**Passes run:** 0, 1, 2, 3, 5 (Pass 6 OFF)

---

## 1. Manifest

| Field | Value |
|---|---|
| Target route | `/products/domes` |
| Pillar | Products |
| Page kind | Shape-category page (`kind: 'category'`, shape `dome`) |
| Route dispatcher | `src/pages/products/[slug].astro` (delegates by discriminated `kind`) |
| Template component | `src/components/product/ShapeCategoryPage.astro` |
| Layout | `BaseLayout.astro` |
| Components rendered | `Breadcrumbs`, `HeroSection`, `MaybeLink`, `CTABanner` |
| Data sources | `src/config/products.ts` (`productShapes` → `dome`), `src/config/grades.ts` (3 grades), `src/config/productRoutes.ts` (`gradeHref`, `gradesForSize`, published-set), `src/config/nav.ts` (`LIVE_ROUTES`/`isLive`) |
| Copy source (i18n) | `src/i18n/en/productCategory.json` → `shape.dome.*` + shared templates; plus `en.products.choose.market.items` for the destination-market row |
| `company.ts` fields consumed (via `companyTokens`) | `brand`, `address.city`, `address.country`, `commercial.moq.tons` (`moqTons`), `moqLabel()`, `commercial.moq.containerType`, `commercial.portOfLoading.name` (`port`), `packaging.innerBox.weightOptionsKg` (`innerBoxSizes`) |
| Schema types emitted | `CollectionPage` + `ItemList` (6 items = 2 sizes × 3 grades) in one `@graph`; `BreadcrumbList` (separate, from `Breadcrumbs`) |
| Built HTML inspected | `dist/products/domes/index.html` — renders fully server-side; no JS-gated primary content |

**Pillar-cluster placement:** Cluster page under the Products pillar. Siblings: `/products/cubes`, `/products/fingers`, `/products/hexagonals`, `/products/flats`, `/products/cloud`. Children (down-links): the 6 grade SKU pages (`dome-25mm-{premium,super-premium,platinum}`, `dome-30mm-{…}`), all live (Phase B). No Q&A block → no FAQPage owed here (correct).

**Build note:** Build was already done; `dist/products/domes/index.html` is present and complete. No build run performed (per run constraints).

---

## 2. Severity-tiered TODO list

### Blockers
*(honesty-gating violation, hardcoded company fact, fabricated/uncited claim, real orphan/broken pillar link, misplaced FAQPage, regulatory claim now factually wrong)*

**None.**

Verification notes (why each Blocker class is clear):
- **Hardcoded facts:** every company fact in the rendered HTML (brand "Mulia Charcoal", city "Semarang", country "Indonesia", "MOQ 18 tons", "18 tons (one 20ft container)", inner-box sizes "250 g / 500 g / 1 kg / 2 kg / 3 kg / 5 kg") resolves through `companyTokens()` in `src/lib/interpolate.ts` from `company.ts`. No literal fact appears in `ShapeCategoryPage.astro` or `productCategory.json`.
- **Honesty-gating:** this page renders no certification / SP-978 / capacity / per-order-report trust block, so there is nothing to gate. Their absence is correct (honesty-gated omission), not a finding.
- **Orphan / pillar down-link:** `/products` (`src/pages/products.astro`) links down to `/products/domes` via `shape.href` (line 336) and `${shape.href}#sizes-available` (line 321); `/products/domes` is in `LIVE_ROUTES` (via `publishedProductRoutes()`), so both render as real links. Not an orphan.
- **FAQPage:** none emitted (correct — canonical FAQ home is `/faq`).
- **Muted destination-market links:** the "By destination market" row renders the five `/markets/{country}` targets as muted `data-coming-soon` text because `/markets/usa` … `/markets/russia` are not in `LIVE_ROUTES` (only `/logistics/import-to-*` is). This is a deliberate `MaybeLink` mute, NOT a broken link and NOT an orphan cause — not reported.

### Defects
*(factual Error from Pass 3, missing required schema type, snippet/heading/structure failures, missing Devil's Advocate / GEO meta table on a **cornerstone**)*

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 — pillar up-link in first paragraph (CLAUDE.md §Internal linking: "Every cluster page links up to its pillar in the first paragraph") | Hero `subtitle` (renders the dome `definition`) + first body paragraph `#about-the-format` | The page's first paragraph (hero definition) and the opening About paragraph contain **no inline link up to the `/products` pillar**. The only up-links to `/products` are the breadcrumb (`Products`) and the "Grades explained" section's "Compare all grades on the products hub". The rule asks for the pillar link in the first paragraph specifically. | Add an inline `/products` (pillar) link inside the first prose paragraph — e.g. in the `#about-the-format` opening sentence, link the phrase that names the product family to the Products hub. Implement as a template/i18n change in `productCategory.json` `shape.dome.aboutBody` (or a shared lead line), routed through `MaybeLink`. Breadcrumb does not satisfy "first paragraph". |
| D2 | Defect | Pass 2 — featured-snippet lead / headings-as-questions | H2 "Sizes available" (`#sizes-available`) and H2 "Packaging & logistics" (`#packaging-logistics`) | Two H2s are bare labels, not buyer questions, AND their first sentence is a process instruction rather than a self-contained answer a snippet can lift. "Sizes available" → no direct "what sizes does the dome come in" answer sentence (the two sizes 25 mm / 30 mm are only in the cards). "Packaging & logistics" opens mid-explanation. | Reframe both H2s as the buyer's question ("What dome sizes are available?", "How does dome charcoal ship?") and add a one-sentence direct answer immediately under each ("The dome comes in two sizes — 25 mm and 30 mm — each in three grades."). Template/i18n edit in `productCategory.json` `sections.*` + a new lead sentence; no new facts. |

### Hardening
*(anti-bloat, missing mini-cases, freshness cadence, connectivity gaps, minor-page omissions — meta table / Devil's Advocate are Hardening here because this is a minor page)*

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 1/2 — GEO meta table (minor-page omission) | Top of page (below H1) | No Author / Reviewed-by / Fact-checked / Last-updated / Read-time meta table. Acceptable on a minor page (per run scope), but its absence weakens freshness/authorship signals for AI extraction. | Optional: add a compact "Last updated" + reviewer line if/when this page is promoted. Not required for a minor category page. |
| H2 | Hardening | Pass 2 — Devil's Advocate (minor-page) | After the "About the Dome format" thesis section | No steelman/counter-argument section (e.g. "when a cube or flat beats a dome"). Expected only on cornerstone/guide pages; minor here. | Optional: one short "When not to choose a dome" line pointing to `/products/flats` or `/products/cubes` would add buyer trust and an internal link. |
| H3 | Hardening | Pass 2 — headings-as-questions (consistency) | H2 "About the Dome format", "Grades explained", "Best markets & use cases for Dome" | Remaining H2s are statements, not questions. Lower snippet eligibility. Same root issue as D2 but lower-impact sections. | Reframe to question form ("What is a dome charcoal briquette?", "What do Premium / Super Premium / Platinum mean?", "Which markets use dome charcoal?") via `sections.*` i18n. Keyword intent unchanged. |
| H4 | Hardening | Pass 2 — quantified evidence | `#best-markets` body ("the larger dome holds heat longer for extended sessions"; `marketsBody` "Middle East and South Asia") | Benefit/market claims are qualitative with no number (no burn-time delta between 25 mm and 30 mm; no volume share for the named regions). Grade pages carry burn-time numbers; this hub does not surface even a directional figure. | Add a directional number where defensible (e.g. reference the per-grade burn-time band already in `grades.ts`, "2+ to 2.5+ hours depending on grade"), or link the size claim to the grade spec sheet. Do NOT invent a 25-vs-30 mm burn-time figure — if a real delta is wanted, route to ops (see Requires-deep-research). |
| H5 | Hardening | Pass 2 — anti-bloat / intent | `#best-markets` second paragraph (destination-market row) | The five destination-market entries all render as muted grey text (`/markets/*` not live), so the row currently serves no navigational intent for the reader and reads as five dead labels. Content-correct (intended mute) but low reader value until `/markets/*` ships. | No change required (intended degradation). When `/markets/*` goes live the row self-lights. Optionally, until then, point these at the live `/logistics/import-to-{country}` pages so the row carries real links now. |

---

## 3. Claims register

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "A dome — or D-shape — briquette is a hemisphere of coconut charcoal with a flat base, shaped to sit flush against ceramic and silicone shisha bowls." | Correct | Low | Definition-form; consistent with `products.ts` dome `description`. Good GEO extractable. | model / products.ts |
| "MOQ 18 tons" / "18 tons (one 20ft container)" | Correct | Low | Matches `company.commercial.moq.tons` + `moqLabel()`/`containerType` via tokens. | company.ts |
| "Mulia Charcoal, Semarang" (meta description) | Correct | Low | `brand` + `address.city` tokens. | company.ts |
| "≈ 80 Pieces / kg" (25 mm) and "≈ 65 Pieces / kg" (30 mm) | Unverified | Low | From `products.ts` `dome` sizes (`pcsPerKg: 80 / 65`). File comment flags these as "factory approximations… confirm with the operations director before publishing." Page renders the "≈" hedge, so framing is honest. | products.ts (self-flagged approximate) |
| "Premium (2.5-2.8% ash) … Platinum (1.6-2.0% ash)" | Correct | Low | Matches `grades.ts` `premium.ash` / `platinum.ash`. | grades.ts |
| "every size … available in all 3 grades" / "100% coconut shell formulation" | Correct | Low | Consistent with `grades.length === 3` and `SHARED_MATERIAL = 'Coconut shell'`. | grades.ts / products.ts |
| "the larger dome holds heat longer for extended sessions" | Unverified | Low | Plausible (more mass) but no measured 25-vs-30 mm burn-time delta exists in config. Marketing-grade claim; not contradicted by any source. | model (no config backing) |
| "Domes suit traditional foil-bowl markets across the Middle East and South Asia." | Unverified | Low–Medium | Geographic demand claim; not in `company.ts` or verified-facts. Reasonable industry generalization but not sourced. | model |
| "inner boxes (250 g / 500 g / 1 kg / 2 kg / 3 kg / 5 kg)" | Correct | Low | Derived from `company.packaging.innerBox.weightOptionsKg` via `innerBoxSizes` token. | company.ts |
| "We load full 20ft containers; you can mix sizes and grades inside one." | Unverified | Low | Operational claim (mixed-SKU container loading). Consistent with MOQ framing; confirm it is a standing offer. | model / ops |

No claim contradicts a source → **zero factual Errors** (no Pass-3 Defect).

---

## 4. Requires deep research

These are low-severity and optional — none blocks publication. Route to a human/ops, not auto-fixed:

| Claim | Why | Markets affected |
|---|---|---|
| "the larger (30 mm) dome holds heat longer for extended sessions" | No measured burn-time delta between dome 25 mm and 30 mm exists in `grades.ts`/`products.ts`; the claim is directional only. If a number is wanted, ops/QC must supply a verified figure (do not fabricate). | All (esp. Middle East / South Asia foil-bowl) |
| "Domes suit traditional foil-bowl markets across the Middle East and South Asia" | Geographic demand assertion not backed by `company.ts` or `verified-facts` (`docs/build-prompts/logistics/logistics-import-research-findings.md`, `docs/build-prompts/guide/guide-research-findings.md`). Confirm before treating as authoritative regional positioning. | Saudi Arabia & GCC; South Asia (non-priority) |
| dome `pcsPerKg` (80 / 65) | `products.ts` header comment explicitly says confirm with the operations director before publishing on the price list. Page hedges with "≈", so this is a publish-time verification, not a content error. | All |

---

## 5. E-E-A-T / HCU assessment

Scored 1–10. This is a mid-funnel **shape-category hub** (navigational/commercial intent), not a cornerstone guide — scored against that intent, not against a long-form article.

| Criterion | Score | One-line justification |
|---|---|---|
| Authorship & expertise | 6 | Specification-literate, peer-to-peer voice; no named author/reviewer (acceptable for a category hub, but no E-E-A-T signal). |
| Topical authority | 7 | Sits in a complete pillar-cluster; links to specs, certifications, raw materials, packaging, logistics, café/shop. |
| Technical health & freshness | 7 | Clean SSR HTML, valid head tags, schema present (mechanics out of scope per DrMax boundary). No visible "last updated". |
| Effort / depth | 6 | Solid per-format prose (definition + about + sizes + grades + markets + packaging) but thin on numbers beyond ash %; no mini-case. |
| Originality | 7 | Per-shape copy is genuinely dome-specific (flat base, foil seating, rocking), not boilerplate cloned across shapes. |
| Citation quality | 5 | Facts are config-backed but no on-page sourcing/links for the market and heat claims (H4). |
| Freshness / timeliness | 6 | No date stamp; content is evergreen but no currency signal. |
| Page intent match | 8 | Clearly serves "dome shisha charcoal sizes/grades wholesale" intent; CTAs + size→grade routing are on-target. |
| Structure & readability | 8 | Logical heading order, no level skips, `max-w-prose`, scannable size cards; H2s are labels not questions (D2/H3). |
| Mobile | 8 | Responsive grid, 44px+ touch targets, sticky WhatsApp FAB; meets CLAUDE.md mobile rules (CWV numbers out of scope). |
| Format-standard adherence | 7 | Correct schema type/placement (CollectionPage+ItemList+Breadcrumb), no misplaced FAQPage; missing question-form headings/snippet leads. |
| Trust & spam signals | 8 | Honest hedging ("≈", "subject to confirmation" pattern), no keyword stuffing, honesty-gated omissions intact. |

**PQ (arithmetic mean):** (6+7+7+6+7+5+6+8+8+8+7+8) / 12 = 83 / 12 = **6.9 / 10**

**Verdict:** **Helpful-first.** The page answers a real buyer's "which dome size/grade, and how does it ship" question and routes cleanly to the SKU pages and supporting pillars; it is not a search-first doorway. Good-clicks prognosis is positive (clear next steps to grade pages + WhatsApp quote); bad-clicks risk is low. Main drag on quality is snippet-readiness (statement headings, buried direct answers) and unsourced qualitative claims rather than any integrity problem.

**Lowest-3 action steps:**
1. **Citation quality (5):** Back the heat/market claims with a number or a link — surface the grade burn-time band on the size claim (H4) and either source or soften the "Middle East / South Asia" regional claim.
2. **Effort/depth + Freshness (6):** Add a directional burn/heat figure (from `grades.ts`, no new fact) and a "Last updated" line so the hub carries a currency + quantification signal.
3. **Format-standard / snippet (D2, H3):** Convert the label H2s ("Sizes available", "Packaging & logistics", "Grades explained", "Best markets…") to buyer-question form with a one-sentence direct answer immediately under each, to win featured-snippet and AI-extraction eligibility.
