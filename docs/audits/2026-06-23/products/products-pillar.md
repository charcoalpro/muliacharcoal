# Content Audit — `/products` (Products pillar hub)

**Run date:** 2026-06-23
**Mode:** Diagnose-only. Report-only. No fixes applied.
**Methodology:** `docs/build-prompts/content-audit-page.md` v1.0 — Passes 0,1,2,3,5 (Pass 6 OFF).
**Cornerstone:** YES (GEO meta table, Devil's-Advocate, mini-cases, FAQ form enforced).

---

## 1. Manifest (Pass 0)

| Item | Value |
|---|---|
| Target route | `/products` |
| Pillar | Products (this page **is** the pillar hub — no parent above it) |
| Source file | `src/pages/products.astro` |
| Layout | `src/layouts/BaseLayout.astro` |
| Built HTML | `dist/products/index.html` (resolved, read-only) |
| Components rendered | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `SpecsTable`, `MaybeLink`, `ImagePlaceholder`, `InquiryForm`, `CTABanner` |
| Data objects feeding route | `src/config/products.ts` (`productShapes`, `productMarkets`), `src/config/grades.ts` (`grades`), `src/config/productRoutes.ts` (`publishedProductRoutes`), `src/config/nav.ts` (`LIVE_ROUTES`/`isLive`), `src/i18n/en/products.json` (labels + prose only) |
| `company.ts` fields consumed (via tokens / helpers) | `governance.*` (author/reviewer/factChecker + lastReviewed → ArticleMeta), `commercial.moq` (`moqLabel`), `commercial.portOfLoading` (`portLabel`), `commercial.leadTime` (`leadTimeLabel`), `production.shelfLifeMonths`, `certifications.iso9001.{standard,shortName,auditors}`, `certifications.imdg.{unNumber,class}` (`imdgLabel`), `packaging.innerBox.weightOptionsKg` (`innerBoxSizes`), `legalDocuments[coa-sample, iso-9001]` |
| Schema types emitted (built HTML) | `CollectionPage` → `ItemList` (8 `ListItem`s: 6 shape-category + 2 market-category) ; `BreadcrumbList` (Breadcrumbs). **No `Product`** (correct — priced Product lives on SKU grade pages). **No `FAQPage`** (correct — canonical home `/faq`). |
| Build | Pre-built `dist/` read as-is per run constraints (no `npm run build` executed). |

**GEO meta table (cornerstone requirement):** PRESENT and fully rendered — Authored by *Mohamad Sinno, Owner & Director*; Reviewed by *Ahmet Bassam, Charcoal Expert / Consultant*; Fact-checked by *Teguh Pranomo, Quality Control Manager*; Last updated *2026-04-25*; Reading time *5 min*. All values sourced from `company.governance.*`.

---

## 2. Severity-tiered TODO list

Row format: `ID | tier | pass+rule | exact location | what's wrong | recommended fix (described, not executed)`

### Blockers

| ID | Tier | Pass+Rule | Exact location | What's wrong | Recommended fix |
|---|---|---|---|---|---|
| B1 | Blocker | Pass 1 — Honesty-gating (held-cert vs per-order-report distinction) | `products.json` → `grades.intro`: "a per-batch certificate of analysis (COA) issued by **{{auditors}}** ships with every order" (renders "Carsurin & Beckjorindo"); identical pattern in `meaning.business.body`: "every batch ships with a **{{auditors}}** COA". Rendered at `dist/products/index.html` §"Quality grades compared" and §"Impact on your business". | The `auditors` token resolves from `certifications.iso9001.auditors` — i.e. the **ISO 9001 certification body** field. The page reuses that held-cert fact to name the issuer of the **per-batch COA** (a per-order/per-shipment report). This collapses the held-cert ↔ per-order-report distinction the methodology requires be preserved, and asserts a specific named body issues a COA on *every* batch/order. The canonical per-shipment lab list is a different field: `quality.testing.thirdPartyLabs = ["Carsurin","Beckjorindo","SGS"]`. Attributing the recurring COA to the *ISO certifier* field (not the testing-lab field) is a claim rendered against the wrong backing fact. | Do not name a COA issuer from the ISO-auditor field. Either (a) attribute the per-shipment COA to `quality.testing.thirdPartyLabs` (the per-order-report fact), wording it as "issued by an independent lab (one of …)" rather than a fixed two-body guarantee; or (b) drop the named-body attribution and keep "an independent per-batch COA" un-named. Decision is the owner's — flag as TODO, do not write a value into the repo. |

### Defects

| ID | Tier | Pass+Rule | Exact location | What's wrong | Recommended fix |
|---|---|---|---|---|---|
| D1 | Defect | Pass 2 — Devil's Advocate (cornerstone) | Whole page; no steelman section after the thesis (§"What the specifications mean" / §"Impact on your business" prove the coconut-shell-superiority thesis, then the page moves straight to "Which charcoal to choose"). | Cornerstone page carries **no Devil's-Advocate / steelman section**. The strongest buyer counterargument (e.g. "coconut briquettes cost more per kg than wood/commodity charcoal; some buyers find quick-light coals or lump charcoal adequate for low-end retail") is never stated and answered with data. | Add a short H3 (question form, e.g. "When is coconut shell charcoal *not* the right choice?") after the business-impact section: state the strongest industry counter (price premium vs commodity wood/quick-light), the conditions under which it holds, and a data-grounded response (cost-per-session, ash %, no-accelerant taste). Describe only — content TODO. |
| D2 | Defect | Pass 2 — Mini-cases (cornerstone ≥1–2 Problem→Action→Result) | Whole page; §"Which charcoal to choose" gives buyer-type guidance but no measurable-result case. | Cornerstone page carries **no Problem→Action→Result mini-case** with a measurable result. The use-case section is prescriptive ("order larger cubes…") but never anchored to a concrete before/after with a number. | Add 1–2 compact PAR mini-cases (e.g. lounge switched from 25 mm to 28 mm Platinum → coal changes per session dropped from X to Y; retailer moved to printed 1 kg inner box → returns fell by Z%). Keep numeric and extractable. Describe only — content TODO. |
| D3 | Defect | Pass 2 — Featured-snippet lead / Headings-as-questions | H2/H3 headings throughout: "Shapes & sizes", "Quality grades compared", "What the specifications mean", "Which charcoal to choose", "Ordering, MOQ & shipping", "Ash content by grade", "Impact on your business", etc. | Section headings are **noun-phrase labels, not the questions a buyer asks**, weakening snippet/PAA capture. Several sections also bury the direct answer below context rather than leading with a 1–2 sentence self-contained answer (e.g. "Which charcoal to choose" opens with a generality before the per-buyer answer). Note §"Ash content by grade" and the At-a-glance definition *do* lead correctly — those are the model. | Convert headings to question form where the intent is a question ("Which coconut charcoal shape and grade should I order?", "What do the specifications actually change for my business?", "How do I order — MOQ, lead time, shipping?") and ensure each opens with a one-sentence direct answer. Describe only. |

### Hardening

| ID | Tier | Pass+Rule | Exact location | What's wrong | Recommended fix |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — Anti-bloat / thesis restatement | §"Impact on the smoking experience" and §"Impact on your business" (`meaning.experience.body`, `meaning.business.body`); also the At-a-glance definition vs `heroSubtitle` vs `shapes.intro` all restate "same 100% coconut shell formulation / no accelerant / adds no taste". | The "no accelerant → no taste" point is stated in the At-a-glance definition, again in experience-impact, and the "same formulation" point recurs across hero, shapes intro, and choose intro. Compressible ≥20% without fact loss. | Consolidate the no-accelerant/taste claim to one canonical statement (the definition box) and reference rather than repeat; trim "same formulation" to a single placement. Describe only. |
| H2 | Hardening | Pass 2 — Quantified evidence | At-a-glance definition: "It burns **hotter and longer** than wood charcoal, leaves **less ash**". | Comparative superiority claim vs wood charcoal is unquantified on this page (the supporting numbers — burn temp 600–680 °C, 2–2.5+ h burn, 1.6–2.8% ash — exist lower on the page but are not tied to the wood-charcoal comparison, and no wood-charcoal baseline number is given). | Attach the comparison to numbers or route the comparison to the buyer's-guide page that holds the wood/bamboo baseline (already linked as `/guide/coconut-vs-bamboo-vs-wood-charcoal`); avoid an un-baselined "hotter/longer" superlative. Describe only — wood-charcoal baseline is external (see Pass 3 / deep-research). |
| H3 | Hardening | Pass 1 — GEO freshness cadence (content level) | ArticleMeta "Last updated 2026-04-25" (`governance.author.lastReviewed`), vs regulatory content on page (UN 1361 / IMDG 4.2). | The single page-level "last updated" is a governance-review date, not tied to a regulatory event; the UN 1361 / IMDG 4.2 claims carry no visible per-claim review date on this hub (they are correctly routed to `/logistics/un-1361` for detail). Acceptable for a hub, but the freshness signal is event-less. | No fix required for correctness; if a freshness cadence is wanted, tie `lastReviewed` bumps to a real spec/regulatory event rather than a cosmetic date. Hardening only. |
| H4 | Hardening | Pass 2 — Logic/coverage gap | §"Raw material / source by grade" (`grades.rawMaterial.body`) and the grade table "Raw material / source" row. | The page leads the grade comparison on "two things a buyer can measure: ash content **and the raw-material selection behind it**", but the raw-material row renders **"Per-grade source profile pending QC sign-off"** for all three grades (correctly gated on `hasFact(grade.rawMaterialSource?.display)` — honesty-gated, NOT a defect). The *coverage* gap: one of the two stated differentiators is currently empty, so the "two measurable things" framing over-promises relative to what renders. | Honesty-gating is correct — do **not** fabricate the source profile. Soften the "two things a buyer can measure" lead so it does not promise a differentiator that currently shows "pending", OR publish the `rawMaterialSource.display` facts in `grades.ts` (owner TODO). Describe only. |
| H5 | Hardening | Pass 2 — Section coherence (minor) | §"Which charcoal to choose" → "By destination market" list (`choose.market.items`). | The market list links to `/markets/*` (USA/UK/Saudi/Germany/Russia), which are **not in LIVE_ROUTES** and therefore render as muted plain text (deliberate `MaybeLink` degradation — NOT a broken link, NOT flagged). Coherence note only: the same buyer-by-market intent is also served by the live market-category pages `/products/shisha-cafee` and `/products/shisha-shop`; the destination-market block currently points only at the muted `/markets/*` cocoon. | When the `/markets/*` pillar ships it self-lights via `LIVE_ROUTES`. No action now. Optional: until then, ensure the destination-market guidance also routes to a live page so the intent isn't dead-ended at plain text. Hardening only. |

---

## 3. Claims register (Pass 3)

Verification order: `company.ts`/`grades.ts`/`products.ts` > verified-facts docs > model knowledge.

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| Ash by grade: Premium 2.5-2.8%, Super Premium 2.0-2.5%, Platinum 1.6-2.0%; At-a-glance "1.6–2.8%" | Correct | — | Matches `grades.ts` ash + derived `ashRange` (min 1.6, max 2.8) | grades.ts |
| Fixed carbon ≥75 / ≥80 / ≥82% | Correct | — | Matches `grades.ts` fixedCarbon | grades.ts |
| Burn time 2+ / 2+ / 2.5+ hours | Correct | — | Matches `grades.ts` burnTime | grades.ts |
| Burn temperature 600 / 650 / 680 °C | Correct | — | Matches `grades.ts` burnTemp | grades.ts |
| Calorific value ≥7000 / ≥7300 / ≥7500 kcal/kg | Correct | — | Matches `grades.ts` calorieValue | grades.ts |
| Moisture held at ≤6%; drop test 3+; sealed shelf life 24 months | Correct | — | moisture/dropTest from `grades.ts`; `shelfLifeMonths`=24 from company.json | grades.ts / company.ts |
| 6 shapes / 3 grades; size range 18–50 mm; pcs-per-kg per size | Correct | — | `shapeCount`/`gradeCount` derived; `sizeRange` derived from productShapes dims; pcsPerKg literal in products.ts | products.ts / grades.ts |
| MOQ 18 tons (one 20ft container); FOB Semarang, Indonesia; lead time 14–21 days | Correct | — | `moqLabel`, `portLabel`, `leadTimeLabel` from company.ts helpers | company.ts |
| IMDG UN 1361 Class 4.2 (spontaneous combustion); "we file the declaration and the Self-Heating Test report with every booking" | Correct (facts) | Low | UN/class from `certifications.imdg`; detail correctly routed to `/logistics/un-1361`. SHT-with-every-booking is a per-order-report claim — keep distinct from held certs (it is). | company.ts |
| Produced under ISO 9001:2015 | Correct | — | `certifications.iso9001.standard` | company.ts |
| "per-batch COA issued by Carsurin & Beckjorindo ships with every order" / "every batch ships with a Carsurin & Beckjorindo COA" | **Error (mis-sourced)** | High | See **B1**. Token `{{auditors}}` = ISO-certifier field, reused to name a per-shipment COA issuer; per-shipment lab fact is `quality.testing.thirdPartyLabs` (Carsurin, Beckjorindo, **SGS**). Conflates held-cert with per-order report. | company.ts (auditors vs thirdPartyLabs) |
| "default fuel for hookah lounges and shisha retail worldwide" | Unverified | Low | Industry-consensus assertion; plausible but no on-site source. Low SEO/reputation risk. | model |
| "burns hotter and longer than wood charcoal, leaves less ash" | Unverified | Medium | Comparative vs wood charcoal — no wood-charcoal baseline number on-site (see H2). Route to deep research for a citable baseline, or qualify. | model |
| "the most common shisha format worldwide" (Cube description) | Unverified | Low | Category claim in `products.ts` shape description; plausible, uncited. | products.ts (prose) / model |
| Germany & EU note: "REACH-compliant and full export documentation" | Unverified | Medium | REACH applicability/registration status for coconut-shell charcoal is a regulatory claim presented on the hub without a visible source or review date; detail belongs to `/logistics/import-to-germany` + `/markets/germany`. Verify substance. | verified-facts: `docs/build-prompts/logistics/logistics-import-research-findings.md` (confirm) |
| innerBox retail sizes "250 g / 500 g / 1 kg / 2 kg / 3 kg / 5 kg" | Correct | — | Derived from `packaging.innerBox.weightOptionsKg` | company.ts |
| Per-grade lab report + SDS/MSDS "pending publication" (muted) | Correct (honesty-gated) | — | Rendered as dashed/muted "pending" tiles; COA + ISO render as real downloads because `legalDocuments` carries them. Omission of pending docs is intended — NOT a defect. | company.ts legalDocuments |

---

## 4. Requires deep research (route to companion prompt)

| Claim | Why | Markets |
|---|---|---|
| "Germany & EU … REACH-compliant" | Regulatory claim on the hub with no visible source/date; confirm REACH status/obligation for coconut-shell shisha charcoal and that "REACH-compliant" is the correct framing (vs registration-exempt / article status). Cross-check `docs/build-prompts/logistics/logistics-import-research-findings.md` and the live `/logistics/import-to-germany` page. | Germany, EU |
| "burns hotter and longer than wood charcoal, leaves less ash" | Needs a citable wood-charcoal baseline (temp, burn duration, ash %) to quantify the superiority claim (H2); currently un-baselined model assertion. | All (esp. USA, UK, Germany) |
| "default fuel … worldwide" / Cube "the most common shisha format worldwide" | Category-share superlatives; nice-to-have external citation if retained as a hard claim. Low priority. | All |

---

## 5. E-E-A-T / HCU assessment (Pass 5)

Per-criterion (1–10):

| # | Criterion | Score | One-line justification |
|---|---|---|---|
| 1 | Authorship & expertise | 9 | Full author/reviewer/fact-checker triple with roles, all from `governance.*`; named owner + charcoal consultant + QC manager. |
| 2 | Topical authority | 8 | Complete taxonomy (6 shapes × sizes × 3 grades), specs, use-case routing, ordering terms; deep down-links to live category pages. |
| 3 | Technical health & freshness | 7 | Clean static build, valid schema *types*; freshness date is governance-review, event-less (H3). (CWV/Lighthouse per CLAUDE.md budgets + DrMax — not re-measured here.) |
| 4 | Effort | 8 | High — token-bound facts, gated docs, full ItemList, real COA/ISO downloads, inline inquiry form. |
| 5 | Originality | 7 | Specs and framing are genuinely the factory's; some prose restated across sections (H1) and one differentiator ("raw-material source") renders as "pending" (H4). |
| 6 | Citation quality | 5 | Internal facts well-sourced to config, but external comparative/regulatory claims (wood-charcoal superiority, REACH) carry no citation on-page. |
| 7 | Freshness / timeliness | 6 | Single "Last updated 2026-04-25"; not tied to a spec/regulatory event; regulatory claims carry no per-claim date on the hub. |
| 8 | Page intent | 9 | Squarely serves B2B wholesale-buyer intent (compare specs → choose → order); inquiry form + WhatsApp inline. |
| 9 | Structure & readability | 8 | Strong: At-a-glance definition box, TOC, spec table with card fallback, definition-form lead sentences; headings are labels not questions (D3). |
| 10 | Mobile | 8 | Responsive grids, 44px touch targets, no JS-gated primary content (per built HTML + CLAUDE.md budget; not re-measured). |
| 11 | Format-standard adherence (cornerstone) | 5 | GEO meta table PRESENT (good), but **no Devil's-Advocate (D1)** and **no PAR mini-case (D2)** — two of the four cornerstone format requirements missing. FAQ-style Q&A is partial (definition leads exist; no question-form headings). |
| 12 | Trust & spam signals | 6 | Mostly strong (honesty-gated docs, no fabrication, distinct held-cert vs per-order); **but B1 mis-sources the recurring COA to the ISO-auditor field**, a real trust dent. |

**PQ = mean(9,8,7,8,7,5,6,9,8,8,5,6) = 86/12 = 7.17 / 10.**

**Verdict:** **Helpful-first.** The page is built for the buyer (extractable specs, clear routing, in-place inquiry, gated honest docs), not for search engines. Good-clicks prognosis is strong: a buyer landing here can compare grades and inquire without bouncing. Bad-clicks risk is low but real around the mis-sourced COA attribution (B1), which could surface as a credibility gap if a buyer cross-checks the named bodies, and around the un-baselined wood-charcoal superiority claim.

**Lowest-3 action steps:**
1. **Citation quality (5) / B1:** Fix the COA-issuer attribution so the per-shipment COA is sourced from `quality.testing.thirdPartyLabs` (or un-named), not the ISO-auditor field — restores the held-cert ↔ per-order distinction and removes the over-stated "every batch by these two bodies" guarantee. (Owner decides the wording; do not write a value into the repo.)
2. **Format-standard adherence (5):** Add the two missing cornerstone formats — a Devil's-Advocate steelman section (D1) and ≥1 Problem→Action→Result mini-case with a measurable result (D2).
3. **Freshness/timeliness (6):** Tie the "Last updated" signal (and any future bump) to a real spec or regulatory event rather than a cosmetic date; consider a per-claim review date for the REACH / UN-1361 references that live inline on the hub.

---

*End of report. Diagnose-only — no site files modified. Awaiting approval before any fix.*
