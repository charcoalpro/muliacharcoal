# Content Audit — /products/cubes

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report, no fixes). Passes 0,1,2,3,5. Pass 6 OFF.
**Cornerstone:** No (minor shape-category hub — meta-table / Devil's-Advocate absence is Hardening, not Defect).

---

## 1. Manifest

| Field | Value |
|---|---|
| Target route | `/products/cubes` |
| Pillar | Products |
| Page source (router) | `src/pages/products/[slug].astro` (delegates by `kind`) |
| Template component | `src/components/product/ShapeCategoryPage.astro` (kind = `category`) |
| Layout | `src/layouts/BaseLayout.astro` |
| Child components | `Breadcrumbs`, `HeroSection`, `MaybeLink`, `CTABanner`, `TextLink` (via MaybeLink) |
| Data sources | `src/config/products.ts` (`productShapes` → cube shape, 5 sizes, pcsPerKg), `src/config/grades.ts` (3 grades, ash ranges), `src/config/productRoutes.ts` (`gradeHref`, `gradesForSize`, published set = Phase B all-live) |
| i18n copy | `src/i18n/en/productCategory.json` (`shape.cube.*`, templates), `src/i18n/en/products.json` (`choose.market.items` for the destination-market row) |
| `company.ts` fields consumed (all via `companyTokens()` / helpers) | `commercial.moq` (→ moqLabel "18 tons (one 20ft container)"), `commercial.portOfLoading.name` ("Semarang"), `address.city`/`address.country` (eyebrow), `brand` ("Mulia Charcoal"), `production.shelfLifeMonths` (indirect), `packaging.innerBox.weightOptionsKg` (→ innerBoxSizes), `commercial.moq.containerType` (→ containerType "20ft") |
| Schema types emitted | `CollectionPage` + `ItemList` (15 cube grade SKUs) in one `@graph`; `BreadcrumbList` (separate JSON-LD block). **No FAQPage** (correct — FAQPage emits only at `/faq`). |
| Pillar up-link | First paragraph: NO direct anchor (see D1). Related section: YES (`/products` "All coconut shisha charcoal"). Breadcrumb: YES (`Products`). |
| Pillar down-link to this page | YES — `src/pages/products.astro` (lines 302–338) maps every `shape.href`, including `/products/cubes`. No orphan. |
| Honesty-gating | No trust/cert/capacity/per-order-report blocks on this page; nothing to gate. The destination-market row degrades to muted `data-coming-soon` spans because `/markets/*` is not in `LIVE_ROUTES` — correct deliberate behavior. |

Build was already produced; `dist/products/cubes/index.html` present and read. No build run performed.

---

## 2. Severity-tiered TODO list

### Blockers
**None.** No hardcoded company fact (every fact flows through `companyTokens()` / `moqLabel()` / `portOfLoadingLabel()` from `company.ts`). No claim rendered without a backing fact. No real orphan. No broken pillar link. No misplaced FAQPage. Schema type correct for a category hub.

### Defects

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 — Pillar linking (up-link in first paragraph) | `ShapeCategoryPage.astro` HeroSection `subtitle` = `st.definition` (rendered `<p>` under H1, "A coconut charcoal cube is a six-faced briquette…") and `#about-the-format` first `<p>` | CLAUDE.md requires every cluster page to link **up to its pillar in the first paragraph**. Neither the hero subtitle nor the first About paragraph contains an inline link to `/products`. The only Products-pillar anchors are the breadcrumb, the Grades-section "Compare all grades on the products hub", and the Related card — none in the opening prose. | In `productCategory.json` `shape.cube.definition` or `aboutBody`, add one inline anchor to the Products pillar (`/products`, e.g. "…the most widely used **coconut shisha charcoal** format worldwide" linking the head term to the hub), routed through `MaybeLink`/`TextLink`. Applies to all six shapes (template-level), so fix the template copy pattern once. |
| D2 | Defect | Pass 2 — Headings as questions + featured-snippet lead | All H2s: "About the Cube format", "Sizes available", "Grades explained", "Best markets & use cases for Cube", "Packaging & logistics" | None of the five H2s is phrased as a buyer question, so the page forfeits question-keyed featured-snippet and AI-extraction surfaces (the highest-ROI GEO format for a hub). The body answers exist but no heading captures the query ("What size cube should I order?", "What are the grades?"). | Reframe H2s to question form in `productCategory.json` `sections.*` (e.g. "What is the cube format?", "Which cube size should I order?", "What do Premium, Super Premium and Platinum mean?", "Which markets buy which cube size?", "How is cube charcoal packed and shipped?"). Keep the existing 1–2 sentence direct answer immediately under each (already present, e.g. the cube definition and the grade ash sentence) so the snippet lead is intact. |

### Hardening

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 1 — GEO meta table (minor page) | Top of page (after H1) | No Author / Reviewed-by / Fact-checked / Last-updated / Read-time table. On a minor category hub this is Hardening, not Defect, but a "Last updated" stamp would aid freshness signals for the size/grade data. | Optional: add a lightweight "Last updated" line sourced from a config date (e.g. `grades.ts` review date or `certifications.specsLastVerified`) rather than the full article meta table. Do not invent author/reviewer facts. |
| H2 | Hardening | Pass 2 — Devil's Advocate (minor page) | After `#about-the-format` (the thesis "the cube is the default") | No steelman of the strongest counterargument (e.g. "when is a cube the wrong choice — HMD/kaloud users should pick fingers/flats"). On a minor page this is Hardening. The `marketsBody` partially covers format fit but never states "don't buy cubes if…". | Optional: add a one-paragraph "When a cube is not the right choice" note pointing HMD/kaloud buyers to `/products/fingers` and `/products/flats` (both live). Improves topical completeness and internal linking. |
| H3 | Hardening | Pass 2 — Quantified evidence | `#about-the-format` "lowers freight cost per kilogram"; hero at-a-glance "Burn behavior" = "2+ hour burn; larger cubes run longer and hotter" | Two benefit claims are directional, not quantified. "Lowers freight cost per kilogram" has no figure (packing density / kg per container). "Larger cubes run longer and hotter" gives no per-size burn-minute or temperature delta, although `grades.ts` holds burn-time/temp numbers per grade. | Optional: attach a number where a config fact already exists — e.g. cite the 20ft net payload (`containerFloorTons`, already a token) for the freight point, or reference the grade burn-time/temp ladder (Premium 600 °C / Platinum 680 °C; 2+ → 2.5+ h) for the size/heat point. Do not fabricate per-size figures not in config. |
| H4 | Hardening | Pass 2 — Section coherence / duplication | `#grades-explained` body vs `grades.ts` descriptions and `/products` hub grade comparison | The grade prose ("Premium for value retail … Platinum for premium private label") restates the hub's grade comparison and the `grades.ts` descriptions nearly verbatim. Acceptable on a hub but borderline near-duplicate across SKU/category pages (CLAUDE.md: near-duplicate descriptions must vary meaningfully). | Optional: differentiate by leaning the category-page grade paragraph toward *cube-specific* grade selection (which grade suits which cube size/channel) rather than re-describing the generic ladder, which the hub already owns. |
| H5 | Hardening | Pass 2 — Mini-case (minor page) | Whole page | No Problem → Action → Result mini-case. Not required on a minor hub, but a single concrete buyer scenario ("US lounge ordering 25 mm Platinum, one container, X kg") would lift extractability. | Optional only; skip if it would invent quantities not in config. |

---

## 3. Claims register

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "MOQ 18 tons" / "18 tons (one 20ft container)" (meta, hero at-a-glance) | Correct | — | Matches `commercial.moq` via `moqLabel()`. | company.ts |
| "available in all 3 grades" / "Premium, Super Premium, Platinum" | Correct | — | Matches `grades.ts` (3 grades). | grades.ts |
| Cube sizes 22/25/26/27/28 mm and pcs/kg ≈120/96/85/78/70 | Correct (factory approximations) | Low | Values match `products.ts` cube sizes. `products.ts` flags pcsPerKg as approximations — page already prefixes "≈". | products.ts |
| "Premium (2.5-2.8% ash) … Platinum (1.6-2.0% ash)" | Correct | — | Matches `grades.ts` ash ranges (premium 2.5-2.8%, platinum 1.6-2.0%). | grades.ts |
| Hero/at-a-glance "2+ hour burn" | Correct | — | Matches `grades.ts` Premium `burnTime` "2+ hours" (floor across grades). | grades.ts |
| "100% coconut shell formulation" | Correct | Low | Matches `products.ts` material "Coconut shell" and sitewide raw-material fact. | products.ts / company.ts |
| "the most widely used / most common shisha format worldwide" (definition + aboutBody) | Unverified | Medium | Superlative market-share claim. Not backed by company.ts or either research-findings file. Plausible industry consensus but uncited. | model only → deep research |
| "25–26 mm dominates US and UK retail and lounges, 26–28 mm suits long GCC and EU lounge sessions, and 22–25 mm is common across Russia and CIS" (marketsBody) | Unverified | Medium | Region-by-region cube-size preference assertions. `logistics-import-research-findings.md` covers HS codes/duties/DG only — NOT size preferences. No backing in company.ts or guide-research-findings. | model only → deep research |
| "a cube stacks tightly in the box, which lowers freight cost per kilogram" | Unverified | Low | Directional, physically reasonable, no quantified backing. See H3. | model only |
| "inner boxes (250 g / 500 g / 1 kg / 2 kg / 3 kg / 5 kg)" | Correct | — | Rendered from `packaging.innerBox.weightOptionsKg` via `innerBoxSizes` token. | company.ts |
| "We load full 20ft containers; you can mix sizes and grades inside one" | Unverified | Low | Mixed-load policy. `containerType` (20ft) is config-backed; the "mix sizes and grades in one container" operational policy is not a config fact. | model only |
| Destination-market row (United States / United Kingdom / Saudi Arabia & GCC / Germany & EU / Russia & CIS) rendered as muted text | Correct (deliberate) | — | `/markets/*` not in `LIVE_ROUTES`; `MaybeLink` degrades to `data-coming-soon` spans. Not an orphan, not a broken link. | nav.ts / products.json |

---

## 4. Requires deep research

Route these Unverified claims to the deep-research companion prompt (none is currently *known wrong*, so none is a Blocker/Defect — but each is an uncited assertion that should be substantiated or softened):

1. **"Most widely used / most common shisha format worldwide" (cube).** Why: superlative market-share claim with no source; appears in the H1-adjacent definition and About body, so it carries SEO/citation weight. Markets: all (USA, UK, Saudi Arabia, Germany, Russia/CIS).
2. **Regional cube-size preferences:** 25–26 mm US/UK retail+lounge; 26–28 mm GCC/EU lounge; 22–25 mm Russia/CIS. Why: specific per-region size claims drive buyer guidance and the (future) market pages; unverified and not in any research file. Markets: USA, UK, Saudi Arabia & GCC, Germany & EU, Russia & CIS.
3. **"Stacks tightly → lowers freight cost per kilogram" (cube vs other shapes).** Why: comparative logistics-economics claim; quantify with packing density / net kg per 20ft if substantiable. Markets: all.

---

## 5. E-E-A-T / HCU assessment

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 6 | Org-level expertise evident (specs, grades, format mechanics) but no named author/reviewer on this hub (acceptable for a minor page). |
| Topical authority | 8 | Strong cube coverage: format, sizes, grades, markets, packaging, with correct down-links to 15 grade SKUs and across to quality/packaging/logistics. |
| Technical health & freshness | 7 | Clean static HTML, valid schema types (CollectionPage+ItemList+Breadcrumb), within budgets per CLAUDE.md; no visible freshness/last-updated stamp (H1). CWV/Lighthouse out of scope (DrMax). |
| Effort | 7 | Genuinely useful, non-templated cube prose; per-shape copy is distinct. Some grade copy duplicates the hub (H4). |
| Originality | 6 | Format mechanics and packing rationale are original; the "most common worldwide" and regional-size lines read as received wisdom (unverified). |
| Citation quality | 5 | Config-backed facts (MOQ, sizes, ash, packaging) are solid; the market-preference and superlative claims carry no citation. |
| Freshness / timeliness | 6 | Data is current vs config, but nothing signals recency to a crawler (no date). |
| Page intent | 8 | Clear commercial-investigation hub: pick a size → pick a grade → quote/sample. CTAs and at-a-glance serve the intent well. |
| Structure & readability | 8 | Logical H1→H2 outline, no level skips, prose under 75ch, definition-form lead sentence present. H2s not in question form (D2). |
| Mobile | 9 | 44px+ touch targets, sticky WhatsApp FAB, responsive grids, logical-property spacing — matches CLAUDE.md UX rules. |
| Format-standard adherence | 7 | Category-hub conventions met (sizes table, grade links, related). Missing question-headings and (optional) meta table cost a point. |
| Trust & spam signals | 8 | No spam patterns; honest muted links for unbuilt markets; facts centralized; footer trust block present. |

**PQ (mean of 12):** (6+8+7+7+6+5+6+8+8+9+7+8)/12 = **6.92 / 10**

**Verdict:** **Helpful-first.** The page is built to help a wholesale buyer choose a cube size and grade and act (quote/sample), not to capture search traffic with thin content. Good-clicks prognosis is positive (clear next step, real down-links). The main drags are uncited market claims and missing question-keyed headings, which cap AI-citation upside rather than indicating a search-first page.

**Lowest-3 action steps:**
1. **Citation quality (5):** Substantiate or soften the three Unverified claims (most-common-format, regional sizes, freight-per-kg) — route to deep research, then cite a source or reframe as "in our experience" / config-derived numbers. (Pass 3 / §4.)
2. **Authorship & expertise (6) / Originality (6):** Add a lightweight "Last updated" stamp (H1) and lean the grade paragraph toward cube-specific selection (H4) so it stops echoing the hub. Avoid inventing author facts.
3. **Headings as questions (drives Citation + Format + Page-intent):** Reframe the five H2s into buyer-question form with the existing direct-answer lead preserved (D2) to unlock featured-snippet / AI-answer surfaces.
