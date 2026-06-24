# Content Audit — /products/fingers (Finger shape-category page)

**Run date:** 2026-06-23
**Mode:** Diagnose-only. No fixes applied.
**Cornerstone:** No (minor hub page). Meta-table / Devil's-Advocate absence scored as Hardening, not Defect.
**Passes run:** 0, 1, 2, 3, 5 (Pass 6 OFF).

---

## 1. Manifest

| Field | Value |
|---|---|
| Target route | `/products/fingers` |
| Pillar | Products |
| Page kind | `category` (shape-category page; shape `stix` → href `/products/fingers`) |
| Route source | `src/pages/products/[slug].astro` (dispatcher) → delegates to template |
| Template | `src/components/product/ShapeCategoryPage.astro` |
| Layout | `src/layouts/BaseLayout.astro` |
| Components | `Breadcrumbs`, `HeroSection`, `MaybeLink`, `CTABanner`, `Fragment` |
| Data sources | `src/config/products.ts` (shape `stix`, 4 sizes), `src/config/grades.ts` (3 grades), `src/config/productRoutes.ts` (publish switch, `gradeHref`, `gradesForSize`), `src/config/company.ts` (via `companyTokens`) |
| Prose source | `src/i18n/en/productCategory.json` → `shape.stix.*` + shared section templates |
| company.ts fields consumed (via tokens) | `brand`, `city`, `country`, `commercial.portOfLoading.name` (`port`), `commercial.moq` (`moqLabel` = "18 tons (one 20ft container)"), `commercial.moq.containerType`, `packaging.innerBox.weightOptionsKg` (`innerBoxSizes`) |
| Publish state | Phase B — `stix` is in `PUBLISHED_SHAPE_KEYS`; all 12 finger grade pages + this category page build live |
| Schema types emitted | `CollectionPage` (#webpage), `ItemList` (#sku-list, 12 grade pages), `BreadcrumbList` (3 levels). No FAQPage (correct — canonical home is `/faq`). |
| Schema verdict | Correct type & placement for a shape-category hub. No misplaced FAQPage. (JSON-LD *validity* is out of scope per run config.) |

**Pillar-cluster placement:** Cluster page under the Products pillar. Pillar `/products` links DOWN to this page via `productShapes.map((s) => s.href)` in `src/pages/products.astro` (lines 302–341, both the per-size card list and the "View all Finger sizes & specs" link). Incoming permanent link confirmed → **not an orphan.**

**Build note:** Build was not run (run config: build already done, do NOT run npm/build). Audit reads `dist/products/fingers/index.html` (present) plus source.

---

## 2. Severity-tiered TODO list

### Blockers
*None.* No hardcoded company facts (every fact flows through `companyTokens()` / `moqLabel()` tokens). No claim rendered without a backing fact. No real broken pillar link or orphan. No misplaced FAQPage. No regulatory claim (page carries none).

### Defects

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 — Pillar linking (CLAUDE.md "links up to its pillar in the first paragraph") | Hero subtitle (`st.definition`, HTML `<p class="mt-5 …">` under H1) + first body para of `#about-the-format` ("Fingers solve a specific problem…") | Neither the first paragraph (hero definition) nor the opening "About the Finger format" paragraph links up to the `/products` pillar. The first up-link to `/products` ("Compare all grades on the products hub") does not appear until the 3rd section (`#grades-explained`). Rule requires the pillar up-link in the first paragraph. | Add an inline `/products` link in the hero subtitle or the first sentence of `#about-the-format` (e.g. anchor "coconut shisha charcoal" → `/products`). This is template-wide (`ShapeCategoryPage.astro`), so the fix applies to all 6 shape-category pages — flag at template level, not per-page. |
| D2 | Defect | Pass 2 — Featured-snippet lead / section coherence | `#best-markets` H2 "Best markets & use cases for Finger" → first para (`st.marketsBody`) | The H2 promises "use cases" but the body covers only geography ("strongest in the US and Western Europe") and a one-line packaging pointer. There is no direct, self-contained answer to "what is a finger best used for" under the heading — the use-case substance lives up in `#about-the-format` instead, leaving this section thin and partially redundant with the markets line in the at-a-glance. | Either narrow the H2 to "Best markets for Finger" (match the geographic body), or add a 1–2 sentence use-case lead under the heading (HMD/kaloud heat-management, premium home shisha) so the heading's promise is answered in place. |

### Hardening

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 1 — GEO meta table (minor page) | Top of page (no `ArticleMeta` block) | No Author / Reviewed-by / Fact-checked / Last-updated / Read-time table. Acceptable on a minor hub (the sibling `/products` pillar carries one; shape-category pages do not). Pure GEO-freshness upside, not required. | Optional: add an `ArticleMeta` byline with a `dateModified`-style "Last updated" to signal freshness for AI extraction. Template-wide change. |
| H2 | Hardening | Pass 2 — Devil's Advocate (minor page) | Whole page | No steelman/counterargument section (e.g. "when a cube beats a finger", or the shorter-burn trade-off framed as a counter). The shorter-burn trade-off *is* acknowledged inside `#about-the-format`, which partly covers this. Not required on a non-cornerstone page. | Optional: none required; the in-line trade-off acknowledgment is sufficient for a minor page. |
| H3 | Hardening | Pass 2 — Headings as questions | All five H2s ("About the Finger format", "Sizes available", "Grades explained", "Best markets & use cases for Finger", "Packaging & logistics") | None are phrased as buyer questions, which weakens featured-snippet/PAA capture. | Optional: offer question variants (e.g. "What is a finger coconut charcoal briquette?", "What sizes do fingers come in?", "Which grade should I order?"). Template-wide (driven by `t.sections.*`). |
| H4 | Hardening | Pass 2 — naming consistency / snippet quality | `#sizes-available` size-card `<h3>` headings (×4): "Stix / Finger 18×35 mm", "…18×50 mm", "…20×35 mm", "…20×50 mm" — and the 12 `ItemList` schema `name`s ("Premium 18×35 mm Stix / Finger" …) | Headings/schema use the full alias `shape.name` = "Stix / Finger", while the H1, breadcrumb, meta description, and all prose use `shape.shortName` = "Finger". `products.ts` intends the full alias to surface *once* per page (definition prose); here it surfaces 4× in H3s and 12× in schema, creating a clunky "Stix / Finger 18×35 mm" string and a brand-name split. | Use `shape.shortName` ("Finger") for the size-card H3s and the ItemList `skus` name builder (`ShapeCategoryPage.astro` line 65 `${size.label} ${shape.name}` and line 135 `{shape.name} {size.label}`). Keep the full alias only in the definition prose. Template-wide. |
| H5 | Hardening | Pass 2 — quantified evidence | `#about-the-format` ("burns at a lower, more even surface temperature"); `#best-markets` ("strongest in the US and Western Europe") | Comparative claims are qualitative. The grade data (`grades.ts` burnTemp 600–680 °C; pcs/kg per size already on page) could anchor "lower temperature" or burn-duration framing with a number; the geographic claim has no figure. | Optional: where a number exists in `grades.ts`/`products.ts`, cite it (e.g. tie "shorter per-piece burn" to the pcs/kg already shown, or reference the burn-temp band). Do not fabricate a market-share statistic for the geography claim. |

---

## 3. Claims register

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "MOQ 18 tons" / "18 tons (one 20ft container)" (meta desc + at-a-glance "Minimum order") | Correct | — | Matches `company.commercial.moq` via `moqLabel()`. Token-driven, not hardcoded. | company.ts |
| "every size in 3 grades" / "Premium, Super Premium, Platinum" (at-a-glance, sizes intro, grades section) | Correct | — | Matches `grades.ts` (3 grades) and `gradesForSize()` (always returns all 3). | grades.ts |
| "4 sizes" (at-a-glance "Sizes available") | Correct | — | `stix.sizes` has 4 entries (18×35, 18×50, 20×35, 20×50). | products.ts |
| pcs/kg per size: "≈ 80 / 60 / 65 / 50 Pieces / kg" | Unverified | Low | Matches `products.ts` `pcsPerKg` values; products.ts flags these as factory approximations ("confirm with the operations director before publishing"). Source-internal-consistent; not an external claim. | products.ts (self-declared approximations) |
| "Premium (2.5-2.8% ash) … Platinum (1.6-2.0% ash)" (grades-explained) | Correct | — | Matches `grades.ts` ash displays (premium 2.5-2.8%, platinum 1.6-2.0%). Token-driven. | grades.ts |
| "100% coconut shell formulation" (sizes intro, about) | Correct | — | Consistent with `SHARED_MATERIAL = 'Coconut shell'` and sitewide product framing. | products.ts / company.ts |
| "A slim 18–20 mm finger drops in cleanly…" (about) | Correct | — | 18/20 mm widths match the four sizes' `width` (18, 18, 20, 20). | products.ts |
| "lengths from 35 mm to 50 mm" (about) | Correct | — | Matches size `length` values (35, 50). | products.ts |
| "burns at a lower, more even surface temperature — exactly what a heat-managed setup wants" (about) | Unverified | Low | Industry-standard description of HMD/finger format behavior; plausible and uncontroversial, but it is a comparative performance assertion with no on-page number. Low reputational risk. | model knowledge |
| "the format of choice for the HMD segment that has grown with premium home shisha" (about) | Unverified | Low | Reasonable industry framing; no source cited, soft ("format of choice"). Low risk. | model knowledge |
| "Fingers track the spread of heat-management devices — strongest in the US and Western Europe, where kaloud-style setups are common" (best-markets) | Unverified | Low–Med | Geographic market claim with no data. Internally consistent with `products.json` market notes (USA: "flats and fingers for HMD/kaloud"; Russia: "finger and hexagonal formats"). Soft phrasing limits risk, but it is the page's one factual-sounding market assertion. Route to deep research if a citable regional-demand source is wanted. | model knowledge |
| "printed inner boxes (250 g / 500 g / 1 kg / 2 kg / 3 kg / 5 kg)" (packaging) | Correct | — | Token `innerBoxSizes` derived from `company.packaging.innerBox.weightOptionsKg`. Not hardcoded. | company.ts |
| "We load full 20ft containers; you can mix sizes and grades inside one." (packaging) | Correct | — | `containerType` token = `company.commercial.moq.containerType`. | company.ts |

No claim contradicts any source. No Error-status claims found.

---

## 4. Requires deep research

| Claim | Why | Markets |
|---|---|---|
| "Fingers … strongest in the US and Western Europe, where kaloud-style setups are common in both retail and enthusiast channels" (`#best-markets`, from `stix.marketsBody`) | Only factual-sounding market assertion on the page; currently uncited model knowledge. A citable source on HMD/kaloud adoption by region would let this stand as evidence rather than assertion, or correct it if the geographic skew is wrong. | USA, Germany/EU (Western Europe) |
| "format of choice for the HMD segment" / "burns at a lower, more even surface temperature" (`#about-the-format`) | Comparative HMD-vs-foil/finger-vs-cube performance framing is reasonable but uncited. A heat-management device reference or burn-temperature comparison would substantiate it (and feed H5 quantified-evidence). | USA, Germany/EU |

Both are Low-to-Medium severity (soft phrasing, no hard numbers). Neither blocks publication.

---

## 5. E-E-A-T / HCU assessment

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 6 | Specification-dense, manufacturer-voiced, correct HMD/kaloud domain language. No byline/meta table on this page (the `/products` pillar carries one). |
| Topical authority | 8 | Sits in a dense, correctly cross-linked products cocoon (quality, factory, packaging, logistics, market pages); enumerates all 4 sizes × 3 grades with links. |
| Technical health & freshness | 7 | Clean semantic HTML, valid heading order, correct schema types. No visible freshness signal (no last-updated). CWV/Lighthouse out of scope per run config. |
| Effort | 7 | Bespoke per-shape prose (`stix.aboutBody`/`marketsBody` are genuinely finger-specific, not boilerplate). Thin `#best-markets` section (D2) pulls this down. |
| Originality | 7 | Finger-specific "solves a narrow-coal-chamber problem" framing is original and useful, not template filler. |
| Citation quality | 5 | Specs trace to config (good), but the two market/performance claims are uncited model knowledge (see §4). |
| Freshness / timeliness | 5 | No `dateModified`/last-updated surfaced on the page. Evergreen topic, so low risk, but no currency signal for AI. |
| Page intent | 8 | Clear transactional/commercial hub intent: introduce the format → route to sizes/grades → convert (WhatsApp + CTA). Matches a "finger coconut charcoal wholesale" query well. |
| Structure & readability | 8 | Logical H2 flow, definition-form lead sentence under H1, at-a-glance `<dl>`, scannable size cards. Nothing hidden behind JS (GEO-clean). |
| Mobile | 8 | 44px+ touch targets, responsive grids, sticky WhatsApp FAB; built HTML shows mobile nav + logical (ms/me/ps/pe) spacing. |
| Format-standard adherence | 7 | Follows the shape-category template contract; one naming inconsistency (H4: "Stix / Finger" in H3s/schema vs "Finger" everywhere else). |
| Trust & spam signals | 8 | Honest gating intact, no fabricated facts, full company identity/cert disclosure in footer, no keyword stuffing. |

**PQ = mean = 7.0 / 10.**

**Verdict:** **Helpful-first.** The page serves a real buyer intent (which finger size/grade to order, who buys fingers, how they ship) with genuine, format-specific substance and converts cleanly. Good-clicks prognosis: a buyer researching finger/stix coconut charcoal lands, learns the HMD use-case, and reaches a grade page or WhatsApp. Not search-first/thin.

**Lowest-3 action steps:**
1. **Citation quality (5) & Freshness (5):** Substantiate the two market/performance claims in §4 with a citable HMD/regional-demand source (or soften to clearly subjective framing), and add a "Last updated" signal (template-level `ArticleMeta`, H1) so AI engines see currency.
2. **Citation/Freshness (cont.):** Add a `dateModified`-style stamp at the shape-category template level so all 6 shape pages gain a freshness signal at once.
3. **Effort (7) via D2:** Thicken or re-scope `#best-markets` — give the "use cases" half of the heading a real 1–2 sentence answer (HMD/kaloud, premium home shisha) instead of leaning entirely on geography, removing the partial redundancy with `#about-the-format`.

---

*End of report. No files other than this report were created or modified. Awaiting approval before any change is made elsewhere.*
