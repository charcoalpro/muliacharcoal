# Content Audit — /products/flats

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report; no fixes applied)
**Cornerstone:** No (minor shape-category hub page)
**Passes run:** 0, 1, 2, 3, 5 (Pass 6 OFF)

---

## 1. Manifest

| Field | Value |
|---|---|
| Target route | `/products/flats` |
| Pillar | Products |
| Page kind | `category` (shape-category hub) |
| Source dispatcher | `src/pages/products/[slug].astro` (delegates by `kind`) |
| Template component | `src/components/product/ShapeCategoryPage.astro` |
| Data object feeding this route | `src/config/products.ts` → `productShapes[key='flat']` (slug `flat`, href `/products/flats`, 2 sizes); `src/config/grades.ts` (3 grades + ash displays); `src/config/productRoutes.ts` (publish switch, `gradeHref`, `gradesForSize`) |
| i18n copy | `src/i18n/en/productCategory.json` (`shape.flat.*` + shared templates); `src/i18n/en/products.json` (`choose.market.*` reused for the destination-market row) |
| Layout | `BaseLayout.astro` |
| Components rendered | `Breadcrumbs`, `HeroSection`, `MaybeLink`, `CTABanner` |
| `company.ts` facts consumed | `commercial.moq` (via `moqLabel()` → "18 tons (one 20ft container)"); `portOfLoading`/`city`/`country` + `brand` (via `companyTokens`); packaging inner-box sizes + container type (via tokens in `packaging.body`). All through tokens — no literals in the page. |
| Schema types emitted | `CollectionPage`, `ItemList` (6 grade SKUs), `BreadcrumbList` |
| Phase state | Phase B — `flat` is in `PUBLISHED_SHAPE_KEYS`; route is live; all 6 grade down-links resolve to real pages |

**Pass 0 stop conditions:** none triggered. Route resolves to exactly one page; built HTML present at `dist/products/flats/index.html`. (Build not run — read-only, per run constraints.)

---

## 2. Severity-tiered TODO list

### Blockers
*None.*

- Hardcoded-company-fact scan: clean. Every fact value (MOQ, port, brand, inner-box sizes, container type) is interpolated from `company.ts`/`grades.ts` via `tokens`/`companyTokens`; no literal company fact appears in `ShapeCategoryPage.astro` or in `productCategory.json` `shape.flat.*`. The footer facts (NIB, NPWP, capacity, executive names) render from `Footer.astro` bound to `company.ts` (verified `company.legalName`, `company.address.*`, `company.domain`), not from page content.
- Honesty-gating: no trust block (certifications, SP 978, capacity, per-order reports) is rendered on this page, so there is nothing to gate. No claim is rendered without a backing fact.
- No misplaced FAQPage (page emits none — correct; FAQPage only at `/faq`).
- Orphan check: NOT an orphan — the Products pillar links down to `/products/flats` (`dist/products/index.html` line 336, `href={shape.href}`). Incoming link from permanent structure confirmed.

### Defects

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 — Pillar linking (CLAUDE.md "Every cluster page links up to its pillar **in the first paragraph**") | Hero subtitle + first body section `#about-the-format` ("The flat trades height for surface…") in `ShapeCategoryPage.astro` lines 88, 122; `productCategory.json` `shape.flat.definition` / `shape.flat.aboutBody` | The first paragraph carries no inline anchor up to the `/products` pillar. The up-link only appears later: breadcrumb (structural, not prose), the "Grades explained" section ("Compare all grades on the products hub", line 170), and "Related topics" → "All coconut shisha charcoal" (line 174 of `productCategory.json`). The rule requires the up-link in the first paragraph AND a Related section; only the Related leg is satisfied. | Add one inline pillar link to the opening prose — either in `shape.flat.aboutBody` (e.g. link the phrase "coconut charcoal" / "this format" to `/products`) or add a one-line lead under the H1 that links the shape back to the Products hub. Apply via i18n + an inline `MaybeLink` so it stays a real link only while `/products` is live (it is). This is template-wide (affects all six shape pages), so fix at the template/i18n layer, not per-shape. |

### Hardening

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — Headings as questions | All H2s: `#about-heading` "About the Flat format", `#sizes-heading` "Sizes available", `#grades-heading` "Grades explained", `#markets-heading` "Best markets & use cases for Flat", `#packaging-heading` "Packaging & logistics" (`productCategory.json` `sections.*`) | Every H2 is a statement label, not a buyer question. On a minor hub this is Hardening (not a Defect), but question-form headings lift featured-snippet and AI-citation odds. | Optionally recast section headings to question form for the shape, e.g. "What is a flat (slab) shisha coal best for?", "What sizes do flat coals come in?", "What do the grades change?", "Which markets use flat coals?", "How are flat coals packed and shipped?". Template-wide; do via i18n templates so the shape token fills in. |
| H2 | Hardening | Pass 2 — Featured-snippet lead / Devil's Advocate; Pass 1 GEO meta table (minor-page omission) | Whole page | No top-of-page E-E-A-T meta table (Author / Reviewed by / Fact-checked / Last updated / Read time) and no Devil's-Advocate steelman. Per the methodology these are **Hardening** on a minor page (the run brief confirms meta-table / Devil's-Advocate absence here is Hardening, not Defect). | Leave as-is for a minor hub, OR if this page is later promoted toward cornerstone weight, add the meta table and a short "When a cube beats a flat" counter-section. No action required now. |
| H3 | Hardening | Pass 2 — Quantified evidence | `#about-the-format` body ("transferring heat more gradually", "broad even heat beats a hot point source"); `#best-markets` body ("strongest in the US and Europe") | Two qualitative advantage claims carry no number. The page already cites the 17 mm profile, 25/30 mm footprints, and pcs/kg (75 / 55), so it is mostly quantified; these two lines are the soft spots. | Where defensible, attach a figure (e.g. surface-area or footprint comparison vs a 25 mm cube). Do NOT invent a burn-temperature or duration delta for flats — none exists in `grades.ts` (grade specs are shape-independent), so any such number would be fabrication. Keep qualitative if no real figure exists. |
| H4 | Hardening | Pass 2 — Anti-bloat / duplication | `#about-the-format` body vs hero subtitle | The hero subtitle definition ("A flat — or slab — briquette is a low, wide block… to maximize heated surface area…") and the at-a-glance "Burn behavior" row ("Maximum heated surface area, broad even heat…") and the about-body opening restate the same surface-area thesis three times within the first screen. | Trim one restatement — e.g. let the about-body open on a new angle (device fit / footprint choice) rather than re-stating "trades height for surface", since the hero already defines it. Minor. |

---

## 3. Claims register

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "A flat — or slab — briquette is a low, wide block of coconut charcoal cut to maximize heated surface area for kaloud, foil, and large-bowl applications." | Correct | Low | Definition-form; matches `products.ts` `flat.description` ("Flat slab cut for kaloud, foil and large-bowl applications. Maximum heat-management surface area."). GEO-good. | company-adjacent data: `src/config/products.ts` |
| "low 17 mm profile that defines the format" / "low 17 mm profile" | Correct | Low | Both flat sizes have `height: 17` in `products.ts` (`flat-25x25x17`, `flat-30x30x17`). | `src/config/products.ts` |
| "The 25 mm and 30 mm footprints" / "2 sizes" | Correct | Low | Two sizes: 25×25×17 and 30×30×17; at-a-glance "2 sizes" from `sizeCount`. | `src/config/products.ts` |
| "≈ 75 Pieces / kg" (25 mm) and "≈ 55 Pieces / kg" (30 mm) | Unverified | Low | Matches `products.ts` `pcsPerKg` 75 / 55, but that file's own header flags these as "factory approximations… confirm with the operations director before publishing." Rendered with "≈", so the hedge is honest. Not a content error; flag only because the source data is self-described as provisional. | `src/config/products.ts` (provisional) |
| "Premium (2.5-2.8% ash) … Platinum (1.6-2.0% ash)" | Correct | Low | Token-filled from `grades.ts` (`premium.ash.display` = 2.5-2.8%, `platinum.ash.display` = 1.6-2.0%). | `src/config/grades.ts` |
| "available in all 3 grades" / "Premium, Super Premium, Platinum" | Correct | Low | `grades.ts` defines exactly three. | `src/config/grades.ts` |
| "MOQ 18 tons" / "18 tons (one 20ft container)" | Correct | Low | From `moqLabel()` → `company.commercial.moq` (`{tons, containers, containerType}`); not hardcoded. | `src/config/company.ts` |
| "Flats follow the kaloud and large-bowl segments, strongest in the US and Europe." | Unverified | Low | Plausible market-geography assertion; no internal source backs the regional split, and it is soft framing rather than a hard spec. Low reputational risk. | model knowledge (soft claim) |
| "ships in bulk master-box packing … or printed inner boxes (250 g / 500 g / 1 kg / 2 kg / 3 kg / 5 kg)" | Correct | Low | Inner-box sizes token-filled from `company.ts` packaging config; container type from `company.ts`. | `src/config/company.ts` |
| Destination-market list (United States, United Kingdom, Saudi Arabia & GCC, Germany & EU, Russia & CIS) | Correct (rendered muted) | Low | Targets `/markets/{country}` are NOT in `LIVE_ROUTES`, so `MaybeLink` degrades them to `data-coming-soon` text. Deliberate muting, not broken links / not orphans — per Do-Not-False-Flag. | `src/config/nav.ts` `LIVE_ROUTES` |

No claim contradicts a source. No Error-status claims; nothing rises to Defect/Blocker on factual grounds.

---

## 4. Requires deep research

Nothing on this page requires external regulatory or market verification. Two soft items could be substantiated internally rather than by web research:

| Claim | Why | Markets |
|---|---|---|
| "strongest in the US and Europe" (flats/kaloud regional skew) | Soft geography assertion with no internal source; not load-bearing, but if you want it citable it should trace to a sales-data note or be softened. | USA, Germany/EU, UK |
| `pcsPerKg` 75 / 55 for flat sizes | `products.ts` self-flags these as provisional ("confirm with the operations director"). Confirm the two flat values before they harden into a published spec elsewhere. | all |

These are confirmations against internal/operations data, not the deep-research companion prompt (no UN 1361 / SP 978 / VAT / HS-duty / EUDR claim appears on this page).

---

## 5. E-E-A-T / HCU assessment

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 6 | Specification-literate, peer-to-peer voice; but no author/reviewer attribution (acceptable on a minor hub). |
| Topical authority | 8 | Owns the "flat / slab coconut shisha coal" head term with format-specific reasoning (surface area vs cube, 17 mm profile, kaloud fit). |
| Technical health & freshness | 8 | Clean static HTML, correct schema types; freshness not a factor for an evergreen format page (DrMax owns CWV/Lighthouse — not re-measured). |
| Effort | 7 | Unique per-shape definition, about-body, burn/users/markets prose — not a templated stub; sizes and grades enumerated with real numbers. |
| Originality | 7 | Format-specific angle (heat-management surface area) is genuinely differentiated from the cube/finger pages. |
| Citation quality | 6 | Numbers are present but mostly self-sourced (factory data); no external authority cited, which is fine for a product hub. |
| Freshness / timeliness | 7 | Evergreen content; no stale-dated claim. |
| Page intent | 9 | Clear transactional/navigational hub: define the shape, route to the 6 grade SKUs, push WhatsApp quote/sample. Matches buyer intent. |
| Structure & readability | 8 | Logical H1→H2 outline, no skipped levels, `max-w-prose` body, scannable size cards. Headings are statements not questions (H1 above). |
| Mobile | 9 | Responsive grids, 44px touch targets, sticky WhatsApp FAB; meets CLAUDE.md UX rules. |
| Format-standard adherence | 8 | CollectionPage + ItemList + BreadcrumbList is the right schema set; honest "≈" on provisional pcs/kg. |
| Trust & spam signals | 8 | No fabricated specs, honest muting of unbuilt market links, no keyword stuffing; MOQ/origin surfaced above the fold. |

**PQ (mean of 12):** 7.4 / 10

**Verdict:** Helpful-first. The page is built to answer a real buyer question ("is a flat/slab coal right for my kaloud / big-bowl venue, and what sizes/grades exist?") and routes cleanly to the SKU and quote paths. goodClicks prognosis: positive — the searcher gets the format definition, the size/grade matrix, and a same-day quote CTA without dead ends. Not search-first / not thin.

**Lowest-3 action steps:**
1. **Authorship & expertise / Citation quality (6):** add a light trust signal — e.g. a one-line "specs confirmed by our QC team" note or link the at-a-glance specs to `/quality/specifications-explained` from within the hero (already linked later, not in the lead). No author table needed on a minor hub.
2. **Citation quality (6):** where a comparative advantage is asserted ("transfers heat more gradually", "broad even heat"), tie it to the concrete 17 mm-profile / footprint numbers the page already owns, instead of leaving it qualitative (see H3). Do not fabricate burn deltas — grade specs are shape-independent.
3. **Structure & readability (8) + D1:** add the in-first-paragraph pillar up-link (D1) and optionally convert H2s to question form (H1) to lift snippet eligibility; both are template-wide edits across the six shape pages.
