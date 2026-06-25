# Content Audit — /quality/specifications-explained

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report-only). No files changed except this report.
**Passes run:** 0, 1, 2, 3, 5 (Pass 6 OFF).
**Cornerstone:** YES — cornerstone rules enforced.

---

## 1. Manifest

| Field | Value |
|---|---|
| **Target route** | `/quality/specifications-explained` |
| **Pillar** | Quality |
| **Source file** | `src/pages/quality/specifications-explained.astro` |
| **Layout** | `BaseLayout.astro` (`type="article"`, `includeOrgSchema={false}`) |
| **Components rendered** | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `KeyFactsBox`, `MaybeLink`, `FAQSection`, `CTABanner` |
| **i18n namespaces** | `en.qualitySpecs` (`src/i18n/en/qualitySpecs.json`), `en.qualityCommon` (`src/i18n/en/qualityCommon.json`) |
| **Schema builder** | `src/lib/schema/qualityClusterPage.ts` |
| **company.ts fields consumed** | `quality.specs.*` (ashContentPct, fixedCarbonPct, moistureContentPct, volatileMatterPct, calorificValueKcalKg, burnTimeMinutes, ashColor), `quality.specsLastUpdated`, `quality.ashGradingFramework.{tiers,factoryBand}` (via tokens), `quality.editorial`, `governance.author/reviewer/factChecker`, `whatsapp.presetMessages.salesGeneral`, `waLinkFor('quoteSpecs')`. Token layer: `qualityTokens()` + `companyTokens()` in `src/lib/interpolate.ts`. Canonical data values live in `src/data/company.json` (`quality` block, lines 1028–1074; `governance` lines 1094–1110). |
| **Schema types emitted** (built HTML, line 110) | `WebPage` (primary, mainEntity → FAQPage), `FAQPage` (5 Q/A), `Person` (author), `BreadcrumbList` (3 ListItem, from `<Breadcrumbs>`) |
| **Pillar up-link** | First paragraph → `/quality` ("shisha charcoal quality standards"), live. Present in built HTML. |
| **Pillar down-link** | `/quality` hub (`src/pages/quality/index.astro`) links down via the child-entity section (`childHref.specifications`) and every spec-table parameter row anchors to `/quality/specifications-explained#…`. Not an orphan. |
| **Build** | Pre-built `dist/` read as-is (build not run, per run constraints). HTML present and well-formed. |

**Pillar-cluster placement:** Quality pillar child. Siblings: `/quality/testing-methods`, `/quality/certifications`. Canonical FAQ homes per methodology: COA → `/quality/certifications`, SHT → `/logistics/un-1361`, MSDS → `/logistics/documents`.

---

## 2. Severity-tiered TODO list

### BLOCKERS

| ID | Tier | Pass + Rule | Exact location | What is wrong | Recommended fix (described, NOT executed) |
|---|---|---|---|---|---|
| **B1** | Blocker | Pass 1 — no hardcoded company fact outside `company.ts` (cert/spec fact values) | `src/i18n/en/qualitySpecs.json` → `faq.items[0].a` (line 88). Renders in built HTML line 110/111: "three ash tiers: Platinum (1.6–1.9%), Super Premium (1.9–2.3%), and Premium (2.3–2.5+%)" | The three ash-band **fact values** (1.6–1.9 / 1.9–2.3 / 2.3–2.5+) are written as literals in the i18n JSON. These exact figures are the canonical `quality.ashGradingFramework.tiers[].rangePct` in `src/data/company.json` (lines 1044–1046). Ash-content band figures are company facts under CLAUDE.md ("certifications, cert IDs … production capacity" class of facts; spec figures live only in `company.ts`/`company.json`). A token already exists for the factory band (`factoryBandRange` → "1.6–1.9", `src/lib/interpolate.ts:302`); the other two bands have no token, so they were hardcoded. The values currently agree with config, but the rule forbids the literal regardless of agreement — and any future edit to the rubric in config would silently desync this string. | Replace the literal band ranges in `faq.items[0].a` with interpolation tokens. Use `{{factoryBandRange}}` for the Platinum band; add two new tokens (e.g. `ashTier2Range`, `ashTier3Range`, or a single `ashTiersInline` string) to `qualityTokens()` in `src/lib/interpolate.ts`, sourced from `quality.ashGradingFramework.tiers`, and reference them in the i18n string. Human task — do not write the values into the repo as part of audit. |

### DEFECTS

| ID | Tier | Pass + Rule | Exact location | What is wrong | Recommended fix (described, NOT executed) |
|---|---|---|---|---|---|
| **D1** | Defect | Pass 0/2 — cornerstone: Devil's-Advocate / steelman section required | Whole article body (`src/pages/quality/specifications-explained.astro` lines 119–197); confirmed absent in built HTML (no "however / counterargument / critics / industry argues" content) | This is a cornerstone page but has **no Devil's-Advocate / steelman section** after the thesis ("which direction is better / what good looks like"). The methodology requires the strongest industry counterargument + when it holds + a data-grounded response. | Add an H2 (question-form) steelman, e.g. addressing the strongest counter: that single-number specs (low ash, high fixed carbon) are easy to game on a spec sheet and that COA figures vary batch-to-batch, so a number alone does not prove session quality. Respond with the page's own defenses already present in config (per-container third-party testing `quality.testing.thirdPartyFrequency`, the target-vs-typical "not a warranty" framing, sample-to-verify). Describe-only; route any new claim through config. |
| **D2** | Defect | Pass 2 — cornerstone: ≥1–2 Problem→Action→Result mini-cases required | Whole article body; confirmed absent in built HTML | No **Problem → Action → Result** mini-case with a measurable result anywhere on the page. Cornerstone pages must carry 1–2. | Add 1–2 short mini-cases framed around a buyer outcome tied to a spec, each ending in a measurable result (e.g. a buyer who switched on the basis of ash content / moisture and the measurable change in tray residue or rejected-container rate). Must be built on real, attributable facts — flag for human authoring; do not fabricate numbers. |
| **D3** | Defect | Pass 1 — Schema architecture: "FAQPage emits ONLY at `/faq` globally"; canonical COA FAQ home is `/quality/certifications` | Built HTML line 110 (`@graph` → `FAQPage` node); emitted by `src/lib/schema/qualityClusterPage.ts:77–80` (`mainEntity` → page FAQPage) | Per the audit methodology a **FAQPage JSON-LD node should emit only at `/faq`**, with COA-type Q/A homed at `/quality/certifications`. This page emits its own `FAQPage` node, and item[4] ("What do the numbers on a COA mean?") is COA-class content whose canonical FAQ home is `/quality/certifications`. **Architectural note:** this is a deliberate, cluster-wide pattern — every `/quality` child (and the hub, see `src/pages/quality/index.astro:380` "no second FAQPage" comment) composes its own FAQPage into its `@graph`. So this is a *design-level* decision spanning the whole quality cocoon, not a one-off page slip. Flagged per the methodology rule; the fix is a cluster-level decision, not a unilateral page edit. JSON-LD *validity* is out of scope (DrMax) — only type/placement is flagged. | Escalate to a cocoon-architecture decision: either (a) confirm the site intentionally overrides the "/faq-only" rule for the quality cluster and amend the audit rule, or (b) collapse FAQPage emission to `/faq` + the designated canonical homes and have the COA Q/A live only at `/quality/certifications`. Do not silently strip the node here without resolving the cluster-wide pattern. Decision for a human. |
| **D4** | Defect | Pass 2 — headings as questions / featured-snippet targeting (cornerstone) | Parameter `<h3>`s in built HTML: "Ash content", "Fixed carbon", "Moisture content", "Volatile matter", "Calorific value", "Burn time", "Ash color"; `<h2>`s "Laboratory-measured parameters (Tier A)", "Observed performance indicators (Tier B)", "Reading a Certificate of Analysis" | The parameter and section headings are **noun phrases, not buyer questions**, so they don't target the "what is a good ash content?" / "what is fixed carbon?" question queries the FAQ already answers. The body under each does open with a strong definition-form sentence (good), but the heading itself forfeits the snippet. | Recast each parameter H3 into the buyer's question form while keeping the anchor id stable (e.g. "What is a good ash content?", "What is fixed carbon and why does it matter?"). The definition-style lead already underneath each is the snippet answer. Describe-only; copy via i18n. |

### HARDENING

| ID | Tier | Pass + Rule | Exact location | What is wrong | Recommended fix (described, NOT executed) |
|---|---|---|---|---|---|
| **H1** | Hardening | Pass 2 — quantified evidence / coverage gap | Tier B "Burn time" section (`params.burnTime`, i18n lines 64–67) and FAQ item[3] | Burn time is given as "around 120 minutes" typical / ≥90 target, but cross-cocoon the Platinum grade in `src/config/grades.ts:187` states "2.5+ hours" (≥150 min). A buyer reading both pages sees an apparent mismatch (per-session minutes vs per-coal hours). `grades.ts` is out of scope to edit here, but the divergence is worth a one-line reconciliation. | Add a clarifying clause distinguishing "minutes of usable heat per session in a bowl" (this page) from the per-coal burn duration quoted on product/grade pages, or align the framing. Human reconciliation across cocoons — flag only. |
| **H2** | Hardening | Pass 1 — regulatory/spec currency cadence | `ArticleMeta` "Last updated" = `quality.specsLastUpdated` = `2026-06-16` (`src/data/company.json:1041`); `quality.editorial.dateModified` also `2026-06-16` | Freshness dates are coherent and event-tied to the spec set (not a cosmetic bump), so no defect. Hardening only: the page carries no `datePublished` surfaced to the reader (only "Last updated"), which is acceptable but slightly weakens the GEO freshness signal vs. showing both. | Optionally surface `datePublished` alongside "Last updated" in the meta table. Low priority. |
| **H3** | Hardening | Pass 2 — anti-bloat | `params.ash.body` + `params.ash.goodValue` + `params.ash.frameworkRef*` + FAQ item[0] + FAQ item[1] | Ash content is explained four times: Tier-A body, good-value sentence, framework-ref paragraph, and two FAQ items ("good ash content" + "what does low ash mean"). Some restatement is intentional for GEO extractability, but FAQ item[1] ("what does low ash mean") largely repeats the Tier-A body. | Trim FAQ item[1] to the part that adds new extractable value (the low-ash → cleaner-burn/airflow consequence) and avoid re-defining ash from scratch. Describe-only. |
| **H4** | Hardening | Pass 2 — featured-snippet lead under section headings | Tier A intro ("These five are determined in a laboratory…") and Tier B intro | The two tier-section H2s open with a method statement rather than a self-contained definition of what the tier *is* for a buyer skimming. Minor. | Lead each tier H2 with a one-sentence buyer-facing definition of the tier distinction (lab-measured vs observed) before the method note. |

---

## 3. Claims register

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| Ash content typical **1.6–1.9%**, target ≤ **2.0%** | Correct | Low | Matches `quality.specs.ashContentPct` (company.json:1030) | company.json |
| Fixed carbon typical **75%**, target ≥ **72%** | Correct | Low | Matches `quality.specs.fixedCarbonPct` (company.json:1031) | company.json |
| Moisture typical **6%**, target ≤ **8%** | Correct | Low | Matches `quality.specs.moistureContentPct` (company.json:1032) | company.json |
| Volatile matter typical **12%**, target ≤ **14%** | Correct | Low | Matches `quality.specs.volatileMatterPct` (company.json:1033) | company.json |
| Calorific value typical **7,500 kcal/kg**, target ≥ **7,200** | Correct | Low | Matches `quality.specs.calorificValueKcalKg` (company.json:1034) | company.json |
| Burn time typical **120 min**, target ≥ **90 min** | Correct (page-internal) | Low | Matches `quality.specs.burnTimeMinutes` (company.json:1035). See H1: differs from grades.ts "2.5+ hours" framing | company.json |
| Ash color **silver-white** | Correct | Low | Matches `quality.specs.ashColor` (company.json:1037) | company.json |
| Three-tier ash bands: Platinum **1.6–1.9%**, Super Premium **1.9–2.3%**, Premium **2.3–2.5+%** | Correct **but hardcoded** | High (governance) | Values match `quality.ashGradingFramework.tiers` (company.json:1044–1046). Severity is High because the values are literals in i18n, not tokens (see B1) — factually right today, governance-wrong | company.json (value) / hardcoded in i18n (location) |
| Flagship grade sits in the **Platinum** band | Correct | Low | `quality.ashGradingFramework.factoryBand` = "Platinum" (company.json:1048); agrees with ashContentPct.typical | company.json |
| "the factory's own rubric, not an industry standard" (ash framework self-attribution) | Correct | Low | Honest framing; matches config intent (`ashGradingFramework` documented as self-attributed, company.ts:484–486). Held-cert vs self-rubric distinction preserved | company.ts comment |
| Definition: "Ash content is the percentage of non-combustible mineral residue left after charcoal fully burns" (and the parallel definitions for fixed carbon, moisture, volatile matter, calorific value, ash color) | Correct | Low | Generic, accurate proximate-analysis definitions; no external standard cited (method deferred to testing-methods) | model knowledge |
| "ash, moisture, and volatile matter should sit at or below their target bounds; fixed carbon and calorific value at or above" (how to read a COA) | Correct | Low | Internally consistent with the direction-of-good stated per parameter | page-internal / model |
| Author **Mohamad Sinno**, Reviewer **Ahmet Bassam**, Fact-checker **Teguh Pranomo** (ArticleMeta) | Correct | Low | From `governance.*` (company.json:1094–1110); not hardcoded — sourced via `tc.metaBlock` labels + config names | company.json |

No claim on the page **contradicts** a source. No fabricated/uncited statistic detected. No superlative ("first/only/largest") present.

---

## 4. Requires deep research

None of the page's claims require external (web) verification — every numeric and named claim resolves against `company.json` (`quality.*`, `governance.*`), which the run brief designates as a verified-facts source. The proximate-analysis definitions are textbook-stable.

| Claim | Why | Markets |
|---|---|---|
| *(none)* | All hard claims verified against `company.json`; no regulatory/external assertions on this page | — |

> Note (not a research item): if D1's steelman or D2's mini-cases are authored later and introduce any *new* numeric/outcome claim (e.g. rejected-container rates, competitor ash levels), those new claims must be routed to deep research before they ship.

---

## 5. E-E-A-T / HCU assessment

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 8 | Full ArticleMeta with named author/reviewer/fact-checker (owner, charcoal consultant, QC manager) sourced from `governance.*`; renders in built HTML. |
| Topical authority | 8 | Tight parameter-by-parameter coverage with direction-of-good and benchmark; clean down-links to testing-methods and certifications. |
| Technical health & freshness | 8 | Dates coherent and event-tied (`specsLastUpdated` 2026-06-16). CWV/Lighthouse not re-measured (DrMax/CLAUDE.md budgets own this). |
| Effort | 8 | Substantive original explainer; per-parameter definition + good-value + test link is genuine work, not thin. |
| Originality | 7 | Self-attributed three-tier ash rubric is a differentiator; lowered slightly by repeated ash explanations (H3) and absence of mini-cases (D2). |
| Citation quality | 7 | Defers method/COA to canonical sibling pages (correct internal sourcing); no external citations needed for this topic. |
| Freshness / timeliness | 8 | Last-updated surfaced; spec-set-tied dating. |
| Page intent | 9 | Nails the "is this good?" buyer intent; FAQ matches question queries. |
| Structure & readability | 7 | Logical heading hierarchy (no skips), definition-form leads, native `<details>` FAQ (crawlable). Lowered by noun-phrase headings instead of question headings (D4). |
| Mobile | 8 | `max-w-3xl`/`max-w-prose`, ≥44px touch targets in FAQ summary (`min-h-11`), responsive grid; no mobile-specific defect found in markup. |
| Format-standard adherence | 6 | GEO meta table present (cornerstone ✓), but **missing Devil's-Advocate (D1) and mini-cases (D2)** required of a cornerstone; FAQPage placement flagged (D3). |
| Trust & spam signals | 7 | Honest "self-attributed, not an industry standard" framing; target-vs-typical "not a warranty" stance. Lowered by the hardcoded fact values (B1) — a governance/maintainability risk, not a reader-trust one. |

**PQ (arithmetic mean of 12 scores):** (8+8+8+8+7+7+8+9+7+8+6+7) / 12 = **91 / 120 = 7.58 / 10**.

**Verdict:** **Helpful-first.** The page is built to answer a real buyer question ("is this spec good?") with extractable definitions and numbers, not to chase a keyword. goodClicks prognosis is favorable; badClicks risk is low. The cornerstone-format gaps (no steelman, no mini-cases) and the one hardcoded-fact governance issue keep it from top-decile, but intent and structure are strong.

**Lowest-3 action steps:**
1. **Format-standard adherence (6):** Add the cornerstone Devil's-Advocate steelman (D1) and 1–2 Problem→Action→Result mini-cases (D2); resolve the cluster-wide FAQPage-placement decision (D3).
2. **Trust & spam signals (7) / governance:** Fix B1 — tokenize the three ash-band values out of `qualitySpecs.json` into `qualityTokens()`/`company.json` so the rubric has a single source of truth and can't desync.
3. **Structure & readability (7) / Citation quality (7):** Recast parameter headings into buyer-question form (D4) to win the question-query snippets the body already answers; trim the duplicated ash explanation (H3).

---

*End of report. Diagnose-only — no source files modified. Awaiting human action on the items above.*
