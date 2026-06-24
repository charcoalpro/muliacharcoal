# Content Audit — `/quality` (Quality pillar hub)

**Run date:** 2026-06-23
**Mode:** Diagnose-only. Report-only. No files changed except this report.
**Methodology:** `docs/build-prompts/content-audit-page.md` — Passes 0,1,2,3,5. Pass 6 OFF.
**Cornerstone:** YES (cornerstone rules enforced).

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| Target route | `/quality` |
| Source file | `src/pages/quality/index.astro` |
| Built HTML | `dist/quality/index.html` (resolved, read-only) |
| Layout | `src/layouts/BaseLayout.astro` (`includeOrgSchema={false}`, custom `schema`) |
| Components | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `MaybeLink`, `FAQSection`, `CTABanner`, `KeyFactsBox`, `PhotoGrid` |
| i18n consumed | `en.quality` (`src/i18n/en/quality.json`), `en.qualityCommon` (`src/i18n/en/qualityCommon.json`) |
| Token sources | `companyTokens()` + `qualityTokens()` (`src/lib/interpolate.ts`) |
| `company.*` fields used | `company.quality.specs.*` (ash/fixedCarbon/moisture/volatileMatter/calorific/burnTime/ashColor/density/binder), `quality.ashGradingFramework.{tiers,factoryBand}`, `quality.testing.{ashMethod,proximateMethod,thirdPartyLabs,thirdPartyScope,thirdPartyFrequency}`, `quality.specsLastUpdated`, `quality.sampleToVerify`, `quality.editorial`, `certifications.iso9001.{standard,shortName,auditors}`, `certifications.halal`, `governance.{author,reviewer,factChecker}` (via `ArticleMeta`), `whatsapp.presetMessages.salesGeneral`, `waLinkFor('quoteSpecs')` |
| Pillar | quality (this page IS the hub) |
| Children (down-links) | `/quality/specifications-explained`, `/quality/testing-methods`, `/quality/certifications` (all in LIVE_ROUTES) |
| Schema types emitted | `CollectionPage`, `FAQPage` (+ `Question`/`Answer`), `WebPage` ×3 (`hasPart` child refs), `BreadcrumbList` (from visual `<Breadcrumbs>`, not the hub `@graph`) |
| Incoming permanent link | YES — Footer "Products & operations" column links `/quality` and `/quality/certifications` (`src/config/nav.ts` `footerOperationsNav`). Not an orphan. |

**Build:** Build was already produced; not re-run (per run constraints). Built HTML present and complete. No build-failure blocker.

---

## 2. Severity-tiered TODO list

### Tier 1 — BLOCKERS

**None.**

Checks performed and cleared:
- **Hardcoded company facts:** none. Every fact value (specs, ash framework, methods, labs, certifications, governance names, MOQ, port) is token-driven via `companyTokens()`/`qualityTokens()` or read from `company.*`. The i18n JSON carries only labels/prose and `{{token}}` placeholders — no literal fact values. Verified `quality.json`, `qualityCommon.json`, and the `.astro` source.
- **Honesty-gating:** every trust/claim block is gated on a real `company.json` fact. `density` is empty in config → its spec row and at-a-glance row drop cleanly (verified: `Density` absent from `dist`). `hasFact()` guards each spec row; `KeyFactsBox` drops empty-value rows; Halal renders only because `certifications.halal.certified === true` (renders "MUI"). No claim renders without a backing fact.
- **Held-cert vs per-order-report distinction:** preserved and explicit. Held = ISO 9001:2015 + Halal; per-order = COA + third-party lab report. The `children.certifications` and `prove.*` copy keep them distinct ("Held:" vs "Provided per order:").
- **FAQPage placement:** see DEF/HARD discussion below — reviewed and NOT a blocker (intentional sitewide hub-canonical pattern).
- **Pillar links / orphan:** satisfied (footer incoming link; hub links down to all three children).

### Tier 2 — DEFECTS

| ID | Pass+Rule | Exact location | What is wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|
| D1 | Pass 1 — Regulatory/standard currency → factual Error (and Pass 3 claim CL-1) | "How it is measured" child section (`children.testing.facts[0]`), rendered text: "Laboratory parameters use defined methods: **ash by ISO 1171:2024**, proximate analysis by ASTM D1762-84(2021)." Driven by `company.quality.testing.ashMethod = "ISO 1171:2024"` in `src/data/company.json` line 1051. | **ISO 1171 is a coal/coke ash standard, not a charcoal/biofuel method.** The verified-facts source `docs/build-prompts/guide/guide-research-findings.md` (line 77) explicitly states: "Coal/coke standards (**ISO 1171**, ISO 562, ASTM D3172/D3175) are a DIFFERENT material class — do not substitute." The charcoal-appropriate ash methods are **ASTM D1762-84(2021)** (charcoal-specific) or **ISO 18122:2022** (solid biofuels). Rendering ISO 1171 as the ash method for coconut-shell charcoal is a factual misattribution that an expert customs broker or lab QC reader would catch. | This is a company-fact value, so the fix is NOT to hardcode anything in the page. Route to a human: correct `company.quality.testing.ashMethod` in `src/data/company.json` to the charcoal-correct standard (ASTM D1762-84(2021) for proximate-including-ash, or ISO 18122:2022 for the dedicated biofuel ash method) per the research-findings source, then the page self-corrects via `{{ashMethod}}`. Do NOT write the corrected value from this audit — it requires owner/lab confirmation of which method the lab actually runs. |
| D2 | Pass 2 — Devil's-Advocate (cornerstone) | After the thesis-proving sections (`framework`, `specs`, `prove`); searched `dist` for "Devil/steelman/counterargument" — none present. | Cornerstone page has **no steelman / Devil's-Advocate section**. The page's thesis is "there is no single standard, so judge on composition + observed performance + verification." The strongest buyer counterargument (e.g., "self-attributed ash grades and 'typical' values are marketing, not a guarantee — how is this different from any supplier claiming low ash?") is never stated and answered with data. The `framework.selfAttribution` sentence concedes the rubric is non-standard but does not constitute a steelman+rebuttal. | Add a short steelman section after "How we prove it": state the strongest industry counterargument (self-attributed grades / typical-not-guaranteed values are unverifiable claims), then rebut with the data-grounded answer already available on-site — per-container third-party lab report + COA + sample-to-verify, which convert "typical" into batch-specific measured values. Describe only; do not write prose here. |
| D3 | Pass 2 — Mini-cases (cornerstone) | Whole page; no Problem→Action→Result structure with a measurable result anywhere. | Cornerstone page carries **zero Problem→Action→Result mini-cases.** Methodology requires ≥1–2 on cornerstone pages. The page is all framework/spec narrative with no concrete buyer scenario tied to a measured outcome. | Add 1–2 compact Problem→Action→Result mini-cases (e.g., buyer received high-ash residue complaints → switched to the Platinum ash band + per-container COA verification → ash measured at the 1.6–1.9% typical band, residue complaints resolved). Source every number from `company.quality.specs.*`; describe only. |

### Tier 3 — HARDENING

| ID | Pass+Rule | Exact location | What is wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|
| H1 | Pass 2 — Headings as questions | H2s: "How shisha charcoal quality is evaluated", "The three-tier ash grading framework", "Typical specifications", "What the numbers mean", "How it is measured", "How it is proven", "How we prove it". | Most body H2s are statements/labels, not the question a buyer types. "What the numbers mean" / "How it is measured" / "How it is proven" are close to question-form but not phrased as questions; "Typical specifications" and "The three-tier ash grading framework" are noun phrases. Question-form headings improve featured-snippet and AI-citation capture. The FAQ block already uses good question form. | Where it does not break the cluster's heading contract, recast the spec/framework H2s toward the buyer question ("What is a good ash content for shisha charcoal?" over the framework; "What are the typical specifications?" over the spec table). Describe only. |
| H2 | Pass 2 — Featured-snippet lead | "Typical specifications" section: H2 → `t.specs.intro` ("The factory-wide ranges below describe …") then definition sentences, then table. | The first sentence under the spec H2 is a framing/caveat sentence, not a direct extractable answer to "what are the typical specs?" The extractable numbers sit in the def-sentence list and table below. A crawler reading the lead paragraph gets process framing, not the headline figures. | Lead the section with a 1–2 sentence self-contained answer carrying the 2–3 headline numbers (typical ash 1.6–1.9%, fixed carbon ~75%, burn ~120 min), then keep the caveat. Numbers already exist as tokens; describe only. |
| H3 | Pass 1/2 — Canonical FAQ-home overlap (COA) | Hub FAQ item "Do you provide a Certificate of Analysis (COA)?" vs. `/quality/certifications` FAQ "What is a Certificate of Analysis (COA)?" Both pages emit a FAQPage `@graph` node touching COA. | Per the run's canonical-FAQ-home map, **COA's canonical FAQ home is `/quality/certifications`.** The two questions differ in intent (provisioning vs. definition), so this is not a strict duplicate Q/A — but the hub's COA Q/A creates topical FAQ overlap with the canonical home, and both are inside their own FAQPage nodes. Borderline only. | Optional: keep the hub COA Q/A (it correctly defers — "The certifications page explains what a COA contains"), or narrow the hub question to provisioning only and let the definitional COA Q/A remain solely on `/quality/certifications`. Confirm no two FAQPage nodes carry an identical Q/A string. Describe only. |
| H4 | Pass 1 — FAQPage placement rule reconciliation (documentation) | `src/lib/schema/qualityHub.ts` emits `FAQPage` in the `/quality` `@graph`; same pattern confirmed on `/logistics`, `/packaging`, `/guide` hubs (`dist` check: FAQPage present on all four; `/factory` = 0). | The audit-prompt literal rule says "FAQPage emits ONLY at `/faq` globally," but the implemented architecture is a deliberate, consistent **hub-canonical FAQPage** on every pillar hub (documented intent in `qualityHub.ts`: "one Q/A = one FAQPage home"), reinforced by the run's own canonical-FAQ-home map distributing homes to `logistics/un-1361`, `quality/certifications`, `logistics/documents`. Flagging this page in isolation would be a false-flag of an intentional sitewide pattern (NOT done here). The literal rule and the design conflict. | No page change. Reconcile the rule text with the implemented design in the audit methodology / a sitewide schema decision doc so future audits don't re-flag it. Human decision, documentation only. |
| H5 | Pass 1 — Regulatory/standard freshness cadence | `quality.specsLastUpdated = "2026-06-16"`; ISO 1171:2024 / ASTM D1762-84(2021) carry no on-page "method last reviewed against a regulatory event" marker. | Spec freshness date is present and visible (ArticleMeta "Last updated" + the typical-spec caveat). The test-method standards have no independent review-date tied to a real standards event; if D1 is fixed, re-verify the replacement method's edition year at that time. | When D1 is resolved, capture the method-edition verification date alongside `testing.*`. Low priority; describe only. |
| H6 | Pass 2 — Anti-bloat | `intro.p2` and `framework.intro` both restate "lower ash = cleaner burn / the three-lens model"; `prove.body1`+`children.certifications.definition` both restate the held-vs-provided distinction. | Mild thesis restatement across `intro`, `framework`, and `prove`/`children.certifications`. The held-vs-provided distinction is stated 3× (at-a-glance reports row, certifications child, prove section). Some reinforcement is intentional for GEO, but `prove.body1` largely re-says `children.certifications.definition`. | Compress one of the two held-vs-provided restatements (keep the `prove` section as canonical, trim the child definition or vice-versa) without losing the distinction. Describe only. |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| Ash test method "ash by **ISO 1171:2024**" | **Error** | **High** | ISO 1171 is a coal/coke ash standard, "do not substitute" for charcoal. Use ASTM D1762-84(2021) or ISO 18122:2022. (Defect D1.) | guide-research-findings.md (line 77) contradicts; value from company.json |
| Proximate analysis by **ASTM D1762-84(2021)** | Correct | — | Charcoal-specific ("Chemical Analysis of Wood Charcoal"), active 2021 reapproval. | guide-research-findings.md (lines 69, 117) |
| Typical ash content **1.6–1.9%**, target ≤ 2.0% | Unverified (internal) | Low | Owner-supplied factory spec; not externally checkable. Rendered as "typical/target", never "guaranteed" — compliant. | company.json `quality.specs.ashContentPct` |
| Fixed carbon typ. **75%** (min 72%) | Unverified (internal) | Low | Owner spec; plausible for coconut-shell briquette; cite-or-confirm. | company.json |
| Moisture typ. **6%** (≤8%); volatile typ. **12%** (≤14%); calorific typ. **7,500 kcal/kg** (≥7,200) | Unverified (internal) | Low | Owner spec; calorific is in the coconut/biofuel plausible range. | company.json |
| Burn time typ. **120 min** (≥90), labelled observed/Tier B not a lab standard | Unverified (internal) | Low | Correctly framed as observed performance, not a standardized lab measure — honest. | company.json + i18n framing |
| "100% coconut shell charcoal … with a **natural tapioca starch** binder" | Correct (internal fact) | Low | Backed by `quality.specs.binder = "natural tapioca starch"`. Consistent with composition statement. | company.json |
| Ash color **silver-white** | Unverified (internal) | Low | Observed; owner-supplied. | company.json |
| Three-tier ash framework (Platinum 1.6–1.9 / Super Premium 1.9–2.3 / Premium 2.3–2.5+); flagship in **Platinum** band | Correct (internal, self-attributed) | Low | Page explicitly states it is the factory's own rubric, "not an industry or ISO standard." Honest self-attribution — compliant. `factoryBand` agrees with `ashContentPct.typical`. | company.json `ashGradingFramework` + `selfAttribution` copy |
| Independent third-party lab tests **every container** (Carsurin / Beckjorindo / SGS), scope ash/moisture/fixed carbon/volatile matter | Unverified (external relationship) | Medium | Lab names are real test houses; the "every container" frequency and the specific lab relationship are owner claims not independently verifiable from sources in scope. | company.json `quality.testing` |
| Holds **ISO 9001:2015** (audited by Carsurin & Beckjorindo) and **Halal (MUI)** | Unverified (external cert) | Medium | Held-cert claim; backed by `certifications.iso9001` + `certifications.halal`. Certificate authenticity is a deep-research item if challenged. | company.json `certifications` |
| "There is **no single formal standard** that governs shisha charcoal quality" | Correct | Low | Accurate — no codified shisha-charcoal standard exists; consistent with research-findings framing (charcoal uses biofuel/wood-charcoal methods, no shisha-specific standard). | guide-research-findings.md (lines 70–77) + model knowledge |
| "A Certificate of Analysis accompanies **every container**" | Unverified (internal) | Low | Owner process claim; consistent with per-order-report model. | company.json `testReportsProvided` |

---

## 4. Requires deep research

| Claim | Why | Markets |
|---|---|---|
| Correct ash & calorific **test-method standard for coconut-shell charcoal** (ISO 1171:2024 currently rendered for ash; ISO 1928 configured for calorific) | The configured methods are coal/coke standards; research-findings flags them as wrong material class. Confirm the lab-appropriate, currently-active editions (ASTM D1762-84(2021) / ISO 18122:2022 / ISO 18125:2017) and which the lab actually runs before any config correction. | All (USA, UK, Germany, Saudi Arabia, Russia) — technical buyers and EU/DE labs scrutinize method citations |
| "Independent third-party laboratory tests **every container**" + named lab relationships (Carsurin / Beckjorindo / SGS) | Frequency and the per-container scope are strong verifiable-sounding claims with no source in scope; if challenged by a buyer they need documentary backing. | Germany, UK (documentation-heavy import regimes) |
| ISO 9001:2015 and Halal (MUI) **certificate authenticity / current validity** | Held-cert claims that drive trust; certificate numbers/validity are not in the in-scope sources. | Saudi Arabia (Halal-sensitive), all |

---

## 5. E-E-A-T / HCU assessment (Pass 5)

| Criterion | Score (1–10) | Justification |
|---|---|---|
| Authorship & expertise | 8 | Full author/reviewer/fact-checker triple renders with named roles (Owner & Director / Charcoal Expert / QC Manager) from `governance.*`. QC reviewer prioritized for the trust query. |
| Topical authority | 8 | Strong: three-lens model, self-attributed ash rubric, two-tier spec table, three child entities. Owns the "no single standard" head query well. |
| Technical health & freshness | 6 | Visible "Last updated 2026-06-16" + spec caveat date. (CWV/Lighthouse out of scope — not measured.) Docked for the ISO 1171 method error (D1) undermining technical credibility. |
| Effort | 8 | High: generated definition sentences, tier-grouped table, gated rows, composition composed statement. Clearly more than a template fill. |
| Originality | 8 | The self-attributed three-tier ash framework and the held-vs-provided ledger framing are genuinely differentiated, not boilerplate. |
| Citation quality | 5 | Test-method citations are present but one is wrong material class (D1); no inline source for the standards on-page (expected for this site model, but the wrong citation hurts). |
| Freshness / timeliness | 7 | Dates present and recent; cadence tied to `specsLastUpdated`. No event-less cosmetic bump detected. |
| Page intent (helpful-first) | 8 | Answers the buyer's real question ("what is good, how is it measured, how do I check it") directly; defers detail to child pages appropriately. |
| Structure & readability | 8 | Clean single-H1 outline, no level skips, `max-w-prose`, def-sentence list, extractable KeyFactsBox, native `<details>` FAQ (DOM-visible, not JS-gated). |
| Mobile | 8 | Responsive grids (`grid-cols-2 sm:grid-cols-4`, table `overflow-x-auto`), 44px touch targets on FAQ summaries. (Not re-measured; structural read only.) |
| Format-standard adherence | 6 | Cornerstone meta table present; but **Devil's-Advocate (D2) and Problem→Action→Result mini-cases (D3) are missing** — two required cornerstone formats absent. |
| Trust & spam signals | 9 | Honesty-gating intact, "guaranteed" never used, held-vs-provided distinction clean, self-attribution disclosed, no fabricated blocks. Exemplary. |

**PQ (arithmetic mean of 12):** (8+8+6+8+8+5+7+8+8+8+6+9) / 12 = **7.4 / 10**

**Verdict:** **Helpful-first.** The page is built to answer the buyer's question and verify-it-yourself, not to rank-bait. goodClicks prognosis is positive: a wholesale buyer lands, gets the headline numbers + the honesty framing + clear next steps (sample, certifications, testing). The single material risk to "helpful-first" credibility is the ISO 1171 method error — a technical reader spotting a coal standard cited for charcoal could read the whole spec set as unreliable, converting a goodClick into a badClick.

**Lowest-3 action steps:**
1. **Citation quality (5) / Technical health (6) — D1:** Route the ISO 1171:2024 ash-method value to a human to correct in `src/data/company.json` to the charcoal-appropriate, currently-active standard (ASTM D1762-84(2021) or ISO 18122:2022) per `guide-research-findings.md`; also re-check the configured ISO 1928 calorific method (renders on `/quality/testing-methods`). Do not auto-edit — needs lab confirmation.
2. **Format-standard adherence (6) — D2 + D3:** Add the missing cornerstone formats — a Devil's-Advocate steelman+rebuttal after "How we prove it", and 1–2 Problem→Action→Result mini-cases sourced from existing spec tokens.
3. **Featured-snippet capture (H1/H2):** Recast spec/framework H2s toward buyer question-form and lead the spec section with a self-contained numeric answer, lifting the headline figures into the first sentence under each heading.

---

*End of report. Diagnose-only — no site source modified.*
