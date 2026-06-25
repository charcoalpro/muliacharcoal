# Content Audit — /products/hexagonals

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report; no edits). Passes 0,1,2,3,5. Pass 6 OFF.
**Cornerstone:** No (minor shape-category hub). Meta-table / Devil's-Advocate absence = Hardening, not Defect.

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| Target route | `/products/hexagonals` |
| Pillar | Products |
| Page kind | Shape-category page (`kind: 'category'`) |
| Dispatcher | `src/pages/products/[slug].astro` → delegates by `props.kind` |
| Template component | `src/components/product/ShapeCategoryPage.astro` |
| Layout | `src/layouts/BaseLayout.astro` |
| Sub-components | `Breadcrumbs`, `HeroSection`, `MaybeLink`, `CTABanner`, `Fragment` |
| Built HTML | `dist/products/hexagonals/index.html` (226 lines) |
| Prose source | `src/i18n/en/productCategory.json` → `shape.hexagonal` (definition, aboutBody, burn, users, marketsBody) + shared templates |
| Product data | `src/config/products.ts` (shape `hexagonal`: 4 sizes, pcsPerKg 80/60/65/50, `description`, `href`) |
| Grade data | `src/config/grades.ts` (premium ash 2.5-2.8%, platinum ash 1.6-2.0%) |
| Route/publish switch | `src/config/productRoutes.ts` (Phase B — hexagonal shape + all 12 grade pages live) |
| Live-route gate | `src/config/nav.ts` `LIVE_ROUTES` / `isLive()` |
| `company.ts` fields used (via `companyTokens`) | `brand`, `address.city`, `address.country`, `commercial.portOfLoading.name`, `commercial.moq.tons`, `commercial.moq.containerType`, `moqLabel()`, `packaging.innerBox.weightOptionsKg` (innerBoxSizes), `commercial.moq.containerType` (containerType) |
| Schema types emitted | `CollectionPage` + `ItemList` (12 SKUs) in one `@graph`; `BreadcrumbList` (separate, from Breadcrumbs) |
| Schema correctness (type & placement) | CollectionPage + ItemList is the correct type for a shape-category hub; BreadcrumbList correct (depth > 1); **no FAQPage emitted — correct** (this page has no Q&A section and FAQPage is allowed only at `/faq`). |

**Pillar-cluster placement:** Cluster of the Products pillar. Siblings: `/products/cubes`, `/products/fingers`, `/products/domes`, `/products/flats`, `/products/cloud`, plus market hubs `/products/shisha-cafee`, `/products/shisha-shop`. Children: 12 grade SKU pages (`hexagonal-{18x35|18x50|20x35|20x50}-{premium|super-premium|platinum}`), all live (Phase B). Incoming links confirmed from `/`, `/products`, `/samples`, and every sibling product page (20+ files in `dist`). **Not an orphan.**

**Honesty-gating note:** This template renders no trust/cert/capacity block (no certifications, SP 978, per-order COA, or capacity figures appear). That is correct for a shape-category hub — nothing to gate, nothing wrongly omitted.

---

## 2. Severity-tiered TODO list

### Blockers
*None.* No hardcoded company facts (brand, port, MOQ, city, country, inner-box sizes, container type all flow from `company.ts` via `companyTokens`/`moqLabel()`); no ungated trust claim; no real orphan; no broken pillar link; no misplaced FAQPage; build artifact present.

### Defects

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 — Pillar linking (CLAUDE.md "links up to its pillar in the first paragraph") | Hero subtitle (`st.definition`) and first body `<p>` in `#about-the-format` ("The hexagon is a retail-driven shape…") | The first prose paragraph contains **no** in-content link up to the `/products` pillar. The only up-links are the breadcrumb (`/products`) and the "Compare all grades on the products hub" link two sections down in `#grades-explained`. The rule wants an up-link in the first paragraph. | Add an inline `<MaybeLink href="/products">` in the `about-the-format` body (e.g. anchor the phrase "coconut shisha charcoal range") so the pillar up-link sits in the first paragraph, not only in the breadcrumb and a later section. Source via the i18n `aboutBody` string with an embedded link, matching the pattern used in `#grades-explained`. |
| D2 | Defect | Pass 2 — Headings as questions / featured-snippet lead | H2 `#sizes-heading` "Sizes available"; H2 `#packaging-heading` "Packaging & logistics"; H2 `#grades-heading` "Grades explained" | Headings are label-form, not buyer-question form, weakening snippet/AI-answer capture. The shape route is otherwise GEO-clean (definition-form lead present), so this is the main structural gap. | Reframe as questions and keep the existing first sentence as the direct answer: "What hexagonal sizes are available?", "How is hexagonal charcoal packed and shipped?", "What do the grades change?". No prose rewrite needed beyond the heading; the body already answers directly. |

### Hardening

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 1 — GEO meta table (minor page) | Top of page (below H1) | No Author / Reviewed-by / Fact-checked / Last-updated / Read-time meta table. Acceptable on a minor category hub (Hardening, not Defect), but a single "Last updated" stamp would aid AI freshness signals. | Optionally add a lightweight "Last updated {date}" line under the hero. Do not add the full cornerstone meta table — disproportionate for a category hub. |
| H2 | Hardening | Pass 2 — Devil's Advocate (minor page) | After `#about-the-format` | No steelman of the counter-case (e.g. "cubes are more universal than hexagonals; why pick a hexagonal?"). Optional on a minor page. | Optionally add 1–2 sentences in `aboutBody` acknowledging the cube as the default and stating when a hexagonal wins (retail shelf / printed-box programs). |
| H3 | Hardening | Pass 2 — Quantified evidence | `#about-the-format` body: "it lights faster and more evenly along its length" | Advantage claim ("lights faster") carries no number — no ignition time, no surface-area delta vs. a round/cube stick. | Where a defensible figure exists, add it (e.g. approximate light-up time, or "~X% more exposed face than a solid stick"). If no measured figure exists, leave as qualitative — do **not** fabricate a number. Route to the same evidence source the grade burn-test data uses. |
| H4 | Hardening | Pass 2 — Anti-bloat / coherence | `#best-markets` body "Hexagonals are a retail-shelf format favored across the GCC and Eastern Europe…" | Thin section: one regional sentence, then links. The "By destination market" row directly under it is entirely muted (`data-coming-soon`) because it points to `/markets/*` (not live). To a buyer the cluster reads as a dead list. | Content-level: this is correct muting behavior (see note below), not a bug. Optionally point that row at the live `/logistics/import-to-{country}` pages instead of the not-yet-built `/markets/{country}` pages so the row renders as real links. This is an i18n-data decision (`products.json` `choose.market.items[].href`), flagged for a human — do not change here. |
| H5 | Hardening | Pass 3 — Unverified market-geography claim | `#best-markets`: "favored across the GCC and Eastern Europe for branded boxes" | Regional-preference assertion with no source; low stakes but unverifiable from `company.ts`/research files. | Either soften to first-person sales observation ("buyers we serve in the GCC and Eastern Europe favor…") or leave as-is; low priority. |

**Do-not-false-flag confirmations (verified, NOT reported as findings):**
- The "By destination market" row (`United States · United Kingdom · Saudi Arabia & GCC · Germany & EU · Russia & CIS`) renders as muted `data-coming-soon` text because the targets are `/markets/usa` … `/markets/russia`, which are **not** in `LIVE_ROUTES`. These are deliberate muted `MaybeLink`s — **not** broken links, **not** orphans. Correct behavior.
- No certifications / SP 978 / capacity / per-order COA block renders. There is nothing to gate on this template; honesty-gated omission is correct.
- All 12 grade down-links and the spec/products/packaging/logistics cross-links render as **live** anchors (Phase B), consistent with `LIVE_ROUTES`.

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| MOQ "18 tons (one 20ft container)" | Correct | — | Matches `company.commercial.moq.tons` / `containerType`; rendered via token, not hardcoded. | company.ts |
| Brand "Mulia Charcoal", port "Semarang" (meta/desc/eyebrow) | Correct | — | From `company.brand`, `address.city`. Token-driven. | company.ts |
| Premium ash "2.5-2.8%", Platinum ash "1.6-2.0%" (Grades explained) | Correct | — | Matches `grades.ts` premium/platinum `ash.display`. | grades.ts (company.ts-class data) |
| 4 hexagonal sizes: 18×35, 18×50, 20×35, 20×50 mm | Correct | — | Matches `products.ts` `hexagonal.sizes`. | products.ts |
| pcs/kg ≈ 80 / 60 / 65 / 50 (per size) | Unverified | Low | Internally sourced from `products.ts` `pcsPerKg`; plausible for these dimensions but not externally corroborated. Treat as factory-published figures. | products.ts (model cannot independently verify) |
| Inner-box sizes "250 g / 500 g / 1 kg / 2 kg / 3 kg / 5 kg" | Correct | — | From `company.packaging.innerBox.weightOptionsKg` via `innerBoxSizes` token. | company.ts |
| "six-sided coconut charcoal stick with a centre hole" (definition + aboutBody) | Unverified | Low | Consistent with `products.ts` description ("Six-sided briquettes with a centre hole"). Product-design claim; verify the shipped hexagonal SKU actually has a centre hole before scaling marketing on it. | products.ts (no external/photo evidence in repo) |
| "lights faster and more evenly along its length" vs. a round stick | Unverified | Low | Plausible (more exposed surface area), but no measurement. See H3. | model / unverified |
| "favored across the GCC and Eastern Europe for branded boxes" | Unverified | Low | Market-geography assertion, no source. See H5. | model / unverified |
| "100% coconut shell formulation" (Sizes available) | Correct | — | Consistent sitewide material claim (`SHARED_MATERIAL`); matches company positioning. | products.ts / company.ts |
| "We load full 20ft containers; you can mix sizes and grades inside one" | Correct | — | Consistent with MOQ container model and sitewide ordering copy. | company.ts |

No claim contradicts a source → **no Pass-3 Error-tier Defect.**

---

## 4. Requires deep research

Low-stakes; none blocking. Route to the deep-research companion only if marketing wants to harden the page:

| Claim | Why | Markets affected |
|---|---|---|
| Hexagonal "lights faster / more evenly" than a round or solid stick | Quantified-evidence gap (H3); would let the page carry a real ignition-time or surface-area number for AI extraction. | All |
| pcs/kg figures (80/60/65/50) for hexagonal sizes | Currently single-sourced from `products.ts`; confirm against an actual weigh-count before any buyer-facing guarantee. | All |
| "favored across the GCC and Eastern Europe" hexagonal-retail preference | Unsourced regional claim (H5); verify or reframe as first-party observation. | Saudi Arabia & GCC, Russia & CIS |
| Centre-hole geometry of the shipped hexagonal SKU | Product-design fact repeated in definition + aboutBody + products.ts; confirm physical product matches before leaning on it. | All |

*(All are TODOs for a human — do not write any verified value into the repo from this audit.)*

---

## 5. E-E-A-T / HCU assessment (Pass 5)

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 6 | Specification-dense, manufacturer-voice; but no author/reviewer attribution on the page (acceptable for a minor hub). |
| Topical authority | 8 | Sits in a complete shape×size×grade matrix with live children and dense sibling links; clearly part of an authoritative product graph. |
| Technical health & freshness | 7 | Clean head tags, canonical, valid CollectionPage+ItemList+BreadcrumbList. No on-page freshness stamp (H1). (CWV/Lighthouse out of scope — DrMax owns.) |
| Effort | 7 | Bespoke per-shape definition/aboutBody/burn/users/marketsBody; not boilerplate. Markets section is thin (H4). |
| Originality | 7 | Hexagonal-specific framing (retail shelf, printed boxes, centre hole) is differentiated from sibling shapes; not duplicated copy. |
| Citation quality | 5 | No outbound authority citations; specs/figures unsourced on-page (expected for a hub, but lowers extractability). |
| Freshness / timeliness | 6 | No visible last-updated signal (H1); content is evergreen but undated. |
| Page intent | 9 | Strong commercial-investigation match: enumerate hexagonal sizes → route to grade SKUs → quote/sample CTA. Clear, single intent. |
| Structure & readability | 8 | Logical H1→H2 outline, definition-form lead sentences, scannable size cards, ≤75ch prose. Headings are label-form not question-form (D2). |
| Mobile | 9 | Responsive grids (`grid-cols-1 sm:grid-cols-2`), 44px+ touch targets, sticky WhatsApp FAB. (Budgets per CLAUDE.md; not re-measured.) |
| Format-standard adherence | 8 | Matches the category-hub template pattern (hero + at-a-glance dl + 5 sections + related). FAQPage correctly absent. |
| Trust & spam signals | 8 | No ungated claims, no keyword stuffing, MOQ/port/location surfaced honestly; muted not-yet-live links degrade gracefully. |

**PQ (mean of 12) = 88 / 120 = 7.33 / 10.**

**Verdict: Helpful-first.** The page exists to help a wholesale buyer pick a hexagonal size and grade and act, not to harvest search clicks. Good-clicks prognosis: a buyer lands, sees the format definition, the 4 sizes with pcs/kg, the grade ash spread, and one-tap WhatsApp/sample CTAs — task completes on-page. Bad-clicks risk is low; the only friction is the muted destination-market row (H4) reading as a dead list.

**Lowest-3 action steps:**
1. **Citation quality (5):** add the one defensible quantified figure the page lacks (ignition/surface-area for H3) and/or link the pcs/kg + ash figures to `/quality/specifications-explained` so claims are traceable on-page.
2. **Freshness/timeliness (6) → also covers Authorship (6):** add a single "Last updated {date}" line under the hero (H1); cheap freshness signal without the full cornerstone meta table.
3. **Effort / thin Markets section (7) → H4:** repoint the muted `/markets/*` destination row to the live `/logistics/import-to-{country}` pages (an i18n-data change for a human) so `#best-markets` resolves to real links and stops reading as a dead end.

---

*End of report. No site files were modified. All recommended fixes are described, not executed.*
