# Content Audit — `/products/shisha-cafee` (Café & Lounge market lander)

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report, no edits). Passes 0,1,2,3,5. Pass 6 OFF.
**Cornerstone:** No — minor page. Meta-table / Devil's-Advocate / mini-case absence is **Hardening**, not Defect.

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| Target route | `/products/shisha-cafee` |
| Pillar | Products |
| Page kind | `market` (use-case lander) — one of three templates dispatched by the dynamic route |
| Source dispatcher | `src/pages/products/[slug].astro` (delegates by `kind`) |
| Template component | `src/components/product/MarketCategoryPage.astro` |
| Layout | `src/layouts/BaseLayout.astro` |
| Sub-components | `Breadcrumbs`, `HeroSection`, `MaybeLink`, `CTABanner`, `collectionPageSchema` |
| Content source (i18n) | `src/i18n/en/productMarket.json` → `market.cafe.*` + shared `productMarket.*` |
| Data config feeding route | `src/config/products.ts` (`productMarkets`, `allSkus`, shapes/sizes), `src/config/grades.ts` (grade names), `src/config/productRoutes.ts` (`gradeHref`, published-set / LIVE_ROUTES union) |
| `company.ts` facts consumed (via `companyTokens` / helpers) | `commercial.moq.tons` (18), `commercial.moq.containers` (1), `commercial.moq.containerType` ("20ft"), `moqLabel()` ("18 tons (one 20ft container)"), `commercial.portOfLoading.name` ("Semarang"), `packaging.masterBox.weightOptionsKg` ([10,20] → "10 kg or 20 kg"), `brand` ("Mulia Charcoal") |
| Built HTML audited | `dist/products/shisha-cafee/index.html` |
| Schema types emitted | `CollectionPage`, `ItemList` (3 items), `BreadcrumbList` (from `Breadcrumbs`). **No FAQPage** (correct). |
| Reco targets (all live `<a>`, not muted) | `/products/cube-26mm-super-premium`, `/products/cube-28mm-platinum`, `/products/flat-25x25x17-super-premium` |

**Build:** Not run (per run constraints; build already produced `dist/`). HTML present and well-formed. No stop condition triggered — route resolves to exactly one page.

---

## 2. Severity-tiered TODO list

### Blockers
**None.**

Verification notes (why each Blocker class is clear):
- **Hardcoded company facts — none.** Every fact value on the page is interpolated: MOQ via `fill(t.atAGlance.moqValueTemplate)` + `moqLabel()`, port via `{{port}}` token, master-box sizes via `{{masterBoxSizes}}`, brand via `{{brand}}` in the meta description. No literal "18 tons", "Semarang", "10 kg", "Mulia Charcoal", phone, address, etc. appears in `MarketCategoryPage.astro` or `productMarket.json`. (The literal facts visible in the built HTML originate from `company.ts` / `company.json` through tokens — correct.)
- **Honesty-gating — no violation.** This is a recommendation/positioning lander; it renders no certification, SP-978, capacity, or per-order-report trust block, so there is no gated claim to back. The "free sample / first-time buyers start with a free sample" line is product-policy prose, not a fact-gated trust claim. Held-cert vs per-order-report distinction is not invoked here, so nothing to smear.
- **No orphan / broken pillar link.** The Products pillar links DOWN to this page: `src/pages/products.astro:514` renders `<MaybeLink href="/products/shisha-cafee">` (live, since `/products/shisha-cafee` is in the published-market set unioned into `LIVE_ROUTES`). Incoming permanent link confirmed.
- **Schema placement correct.** `CollectionPage` + `ItemList` is the right type for a use-case collection lander; `BreadcrumbList` is correct for a depth-2 page. No FAQPage emitted (the page has no Q&A block), consistent with "FAQPage only at /faq."
- **No regulatory claim** appears on this page, so no "regulatory claim now factually wrong" Blocker is possible here.

### Defects
**None.**

Rationale: the only items that would be Defects on a cornerstone — missing GEO meta table, missing Devil's-Advocate, missing mini-case — are explicitly downgraded to **Hardening** on this minor page per the run brief. No Pass-3 factual Error was found (see Claims register). All required schema types are present.

### Hardening

| ID | tier | pass+rule | exact location | what's wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 1 — pillar up-link "in the first paragraph" | Hero subtitle (`mt.atAGlanceDefinition`) and first body paragraph `#what-they-need` (`mt.needBody`), `MarketCategoryPage.astro:107-144` | The breadcrumb and the Related block both link up to `/products`, but the **first paragraph** of body copy contains no inline link to the Products pillar. The CLAUDE.md cluster convention asks for an up-link in the opening paragraph, not only in chrome. | In `needBody` (or the hero subtitle), add one inline link to `/products` ("…across our coconut shisha charcoal range") via `MaybeLink`. Keep it a single contextual link; do not duplicate the Related entry. |
| H2 | Hardening | Pass 2 — anti-bloat / redundancy | `#moq-economics` paragraph, built text "We load full **20ft** containers — **18 tons (one 20ft container)** —" (`economics.moqLine` template, `productMarket.json:39`) | "20ft" is stated twice in one sentence because the template concatenates `{{containerType}}` ("20ft") with `{{moqLabel}}` (which already expands to "…one 20ft container"). Reads as a stutter. | Reword `economics.moqLine` so the container type appears once: e.g. lead with `{{moqLabel}}` alone ("We load full containers — {{moqLabel}} — and you can mix…"), dropping the standalone `{{containerType}} containers` clause. i18n-only change; no fact touched. |
| H3 | Hardening | Pass 2 — headings as questions | All five H2s: "What cafés & lounges need", "Recommended shapes, sizes & grades", "Packaging for this channel", "MOQ & economics", "Getting started" (`sections.*`, `productMarket.json:23-29`) | Headings are statement/noun-phrase form, not the buyer's question form that maximizes featured-snippet and AI-answer capture. | Offer question variants in the i18n `sections` block, e.g. "What do cafés and lounges need from shisha charcoal?", "Which shapes, sizes and grades suit a café?", "How is café charcoal packed?", "What's the MOQ and the container economics?", "How do I get started?". Keep the featured-snippet lead sentence directly under each. |
| H4 | Hardening | Pass 2 — Devil's Advocate (minor-page → Hardening) | Whole page (after the reco/economics thesis) | No steelman section addressing the strongest café counter-argument (e.g. "larger 28 mm cubes waste heat / cost more per kg than 25 mm" or "natural lump is cheaper per session") with a data-grounded rebuttal. | Optional on a minor lander: add a 2–3 sentence "Is a larger cube actually cheaper per session?" rebuttal tying burn-length to coal-changes-per-session. Source any numeric claim from `quality.specs.burnTimeMinutes` rather than asserting it fresh. |
| H5 | Hardening | Pass 2 — mini-case / quantified evidence | `#what-they-need` and reco cards (`needBody`, `recos[].why`) | Benefit claims ("hold heat longer", "lowest cost per kilogram", "least often") are directional, not quantified — no burn-minutes, no pcs/kg, no cost delta. No Problem→Action→Result mini-case. | Where a backing number exists in config, cite it: `products.ts` carries `pcsPerKg` (cube-26mm 85, cube-28mm 70, flat-25x25x17 75) and `quality.specs.burnTimeMinutes` carries burn time. Convert one "holds heat longer" into "≈X fewer pieces per kg, ≈Y-minute burn → fewer coal changes per service." Do not invent figures. |
| H6 | Hardening | Pass 1 — GEO meta table (minor-page → Hardening) | Top of page (none present) | No Author / Reviewed-by / Fact-checked / Last-updated / Read-time meta table. Acceptable on a minor commercial lander, but its absence means the page carries no freshness or authorship signal for GEO. | Optional: if café-economics figures are later added, attach a "Last updated" stamp tied to `commercial.moq`/packaging review. Not required for a pure positioning lander. |
| H7 | Hardening | Pass 2 — micro-typography (extractability polish) | Reco card links, built HTML e.g. `…>Super Premium<span aria-hidden="true">→</span>` (`MarketCategoryPage.astro:165-166`) | The trailing arrow renders glued to the grade name ("Super Premium→") because there is no space between the `{r.gradeName}` text node and the `<span>→</span>`. Cosmetic; affects copy-paste/AI-extracted link text. | Add a hair space or `&nbsp;`/whitespace between grade name and the arrow span (mirror however the Related items render their arrow, which read cleanly). Cosmetic only. |

---

## 3. Claims register (Pass 3)

All claims are factory product-positioning statements. None contradict `company.ts`; the structural facts (sizes, grades, MOQ, port, packaging) verify against config. The "physics" benefit claims are internally consistent and low-stakes but uncited.

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "MOQ 18 tons" / "18 tons (one 20ft container)" (meta desc, at-a-glance, economics) | Correct | — | Matches `commercial.moq.tons=18`, `containers=1`, `containerType="20ft"`; rendered via `moqLabel()`. | company.ts / company.json:94-96 |
| "from Mulia Charcoal, Semarang" (meta desc, eyebrow) | Correct | — | `brand="Mulia Charcoal"`, `portOfLoading.name="Semarang"`. | company.ts / company.json:3,99 |
| "sealed inner plastic inside a corrugated master box (10 kg or 20 kg)" | Correct | — | `packaging.masterBox.weightOptionsKg=[10,20]` → token "10 kg or 20 kg". | company.ts / company.json:399 |
| Reco set = Cube 26 mm (Super Premium), Cube 28 mm (Platinum), Flat 25×25×17 mm (Super Premium) | Correct | — | All three SKUs + grades exist in `products.ts` (cube-26mm, cube-28mm, flat-25x25x17) and `grades.ts`; reco hrefs resolve to live grade pages. | company.ts (products.ts:78,80,147) |
| "The largest cube holds heat the longest, so staff change coals least often" | Unverified | Low | Plausible (larger mass = longer burn) but no burn-time figure cited; `quality.specs.burnTimeMinutes` could ground it. Internal marketing-physics claim; not contradicted. | model / quality.specs (not cited on page) |
| "Larger cubes hold heat longer per piece" / "fewer changes per session" (`needBody`) | Unverified | Low | Same as above; directional, no number. | model |
| "[Bulk packing] is the lowest cost per kilogram" | Unverified | Low | True relative to printed retail boxes (no print cost), but stated as absolute; reasonable and low-risk. | model |
| "Flats give maximum surface area for kaloud and large-bowl setups" | Unverified | Low | Consistent with flat geometry (high surface-to-mass); no measured figure. Internal positioning. | model / products.ts flat description |
| "first-time buyers start with a free sample" / "order a free sample" | Correct | — | Consistent with sample policy (`samples.*` exists in config; free sample is the documented entry point). Not a fabricated guarantee. | company.ts samples block |
| "Platinum is the upgrade that lets a flagship venue charge for the session" | Unverified | Low | Pure positioning/value claim, not a measurable assertion. No correction needed. | model |

No claim is an **Error** (contradicts a source). No claim is **High** severity.

---

## 4. Requires deep research

No external/regulatory claim on this page requires the deep-research companion. The only `Unverified` items are internal product-physics positioning statements (burn-length, cost-per-kg, surface area) that are best substantiated from the site's own `quality.specs` / `products.ts` numbers rather than third-party research — they are flagged as Hardening (H5), not routed externally.

- **Optional internal substantiation (not external research):** quantify "holds heat longest" / "least often" using `quality.specs.burnTimeMinutes` and `products.ts` `pcsPerKg` so the reco claims carry a number. This is a content edit, not a research task.

---

## 5. E-E-A-T / HCU summary (Pass 5)

Per-criterion score (1–10) with one-line justification. UX/technical-health criteria reference CLAUDE.md CWV budgets and the DrMax technical series — not re-measured here.

| Criterion | Score | Justification |
|---|---|---|
| Authorship & expertise | 6 | Voice is expert and channel-specific (café operations economics), but no author/reviewer attribution (minor page; acceptable). |
| Topical authority | 8 | Tightly scoped to the café/lounge buying decision; maps need → shape → size → grade → packaging coherently. |
| Technical health & freshness | 7 | Clean static HTML, correct schema types, zero page JS beyond shared analytics; no freshness stamp (acceptable for a lander). CWV/Lighthouse per DrMax. |
| Effort | 7 | Distinct prose per reco, real recommendations, not boilerplate; but benefit claims stop short of quantification. |
| Originality | 7 | Channel-specific framing (cost-per-session, coals-changed-per-service) is genuinely useful, not generic catalog copy. |
| Citation quality | 5 | Facts are config-backed but the page surfaces no inline evidence/links to specs; physics claims uncited. |
| Freshness / timeliness | 6 | Evergreen content; no dated signal. Fine for the page type, but no currency cue. |
| Page intent | 9 | Intent is unambiguous and well-served: a café buyer leaves knowing exactly which 3 SKUs to request and why. |
| Structure & readability | 8 | Logical H2 outline, scannable at-a-glance `<dl>`, reco cards, max-prose width; headings are statements not questions (H3). |
| Mobile | 8 | Mobile-first grid (`grid-cols-2 … lg:grid-cols-5`), 44px+ CTAs, sticky WhatsApp FAB; meets CLAUDE.md mobile rules. |
| Format-standard adherence | 7 | Breadcrumb + Related + single H1 + CollectionPage/ItemList all present; missing first-paragraph up-link (H1) and question-form headings. |
| Trust & spam signals | 8 | No hardcoded facts, no fabricated trust block, honest "free sample" framing, no keyword stuffing. Strong. |

**PQ (mean of 12):** (6+8+7+7+7+5+6+9+8+8+7+8) / 12 = **86/12 ≈ 7.2 / 10**.

**Verdict:** **Helpful-first.** The page exists to answer a real buyer's question ("what should a café order?") and resolves it decisively with concrete SKUs and a clear MOQ/economics path. goodClicks prognosis: positive — the next action (request a quote/sample for a named SKU) is obvious. No search-first / doorway characteristics: it is not thin, not fact-stuffed for ranking, and not duplicative of the retail lander (café vs shop framing meaningfully differs).

**Lowest-3 action steps:**
1. **Citation quality (5):** quantify the reco/`needBody` benefit claims with on-site numbers (`quality.specs.burnTimeMinutes`, `products.ts` `pcsPerKg`) and link one reco to its grade-page spec band, so claims carry evidence (addresses H5).
2. **Freshness/timeliness (6) & Authorship (6):** optionally add a lightweight "Last updated" cue tied to the MOQ/packaging review, giving the page a currency and trust signal without turning it into a cornerstone (addresses H6).
3. **Format adherence (7):** add the inline first-paragraph up-link to `/products` (H1) and convert the five H2s to question form (H3) to lift snippet/AI-answer capture.

---

*End of report. Diagnose-only — no site files modified. Awaiting human action on the TODO list above.*
