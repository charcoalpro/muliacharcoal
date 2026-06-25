# Content Audit — `/factory` (Factory pillar hub)

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report). No files changed except this report.
**Passes run:** 0, 1, 2, 3, 5. Pass 6 OFF.
**Cornerstone:** YES — cornerstone rules enforced.

---

## 1. Manifest (Pass 0)

| Item | Value |
|---|---|
| Target route | `/factory` |
| Source page | `src/pages/factory/index.astro` |
| Built HTML | `dist/factory/index.html` (226 lines, body minified onto line 110) |
| Layout | `BaseLayout.astro` (`includeOrgSchema={true}`, `prefetch=['/contact']`) |
| Components rendered | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `MaybeLink`, `FAQSection`, `CTABanner`, `KeyFactsBox`, `PhotoGrid`, `Figure`, `ImagePlaceholder` |
| i18n sources | `src/i18n/en/factory.json` (`t`), `src/i18n/en/factoryCommon.json` (`tc`) |
| Schema builder | `src/lib/schema/factoryHub.ts` → `factoryHubSchema()` |
| Pillar | factory (this page IS the pillar hub) |
| Declared children | `/factory/production-process`, `/factory/capacity`, `/factory/raw-materials`, `/factory/virtual-tour` (all in `LIVE_ROUTES`) |
| `company.ts` fields consumed | `company.factory.editorial.{datePublished,dateModified}`, `factory.ownerNote`, `factory.developToSpec`, `factory.ndaAvailable`, `production.*` (capacity, lines, ovens, headcount, weatheringDays, factoryAreaSqm, sourcingRegion/Villages, carbonizationPlant), `commercial.exportMarkets`, `commercial.moq`, `commercial.portOfLoading`, `commercial.leadTime`, `certifications.iso9001.shortName`, `governance.{author,reviewer,factChecker}`, `people` (owner / QC Manager / Head of Crusher Operations), `whatsapp.presetMessages`, derived `factoryTokens()` (containersPerMonth, oneContainerPctOfMonthly, countriesServedCount, facilityAreaGrouped) |
| **Schema types emitted (built HTML)** | `Organization`, `ImageObject`, `PostalAddress`, `WebSite` (from `includeOrgSchema`); `CollectionPage` + 4× `WebPage` (hasPart child refs) + 3× `Person` (factoryHub); `BreadcrumbList` + 2× `ListItem` (Breadcrumbs). **No FAQPage** — correct. |
| FAQ canonical home | This hub renders a VISIBLE FAQ with NO FAQPage JSON-LD; `/faq` remains the sole FAQPage home. **Compliant.** |
| Build | Already built (not re-run, per instructions). HTML present and well-formed. |

**Honesty-gating observed and CORRECT (not flagged):** owner pull-quote gated on `hasFact(f.ownerNote) && owner`; team subset filters nulls; `developToSpec`/`ndaAvailable` bullets gated on the boolean facts; KeyFactsBox rows auto-drop on empty value; ArticleMeta fact-checker cell renders only because `governance.factChecker.name` ("Teguh Pranomo") is a real fact. ISO 9001 hero chip is backed by `certifications.iso9001` + a real certificate PDF.

---

## 2. Severity-tiered TODO list

### Blockers

| ID | tier | pass+rule | exact location | what's wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| B1 | Blocker | Pass 1 — hardcoded company fact (address/city) | `src/i18n/en/factory.json` line 8, `"h1": "Our Coconut Shisha Charcoal Factory in Semarang"` (renders via `fill(t.h1, tokens)` at `index.astro:157`) | The city **value** "Semarang" is a company fact (`company.location.city` = "Semarang") hardcoded as a literal in i18n. The `{{city}}` token already exists and is used elsewhere in the SAME file (`heroSubtitle`, `atAGlance.locationValueTemplate`). A literal fact value in i18n violates the "facts live in company.ts and only there" rule. | Replace the literal `Semarang` in the `h1` string with the `{{city}}` token so the H1 reads from `company.location.city`. (Human edit to i18n — do NOT write the fact anywhere new.) |
| B2 | Blocker | Pass 1 — hardcoded company fact (address/country) | `src/i18n/en/factory.json` line 3, `"titleTemplate": "Coconut Charcoal Factory in Indonesia \| {{brand}}"` (renders in `<title>` of `dist/factory/index.html`) | The country **value** "Indonesia" is a company fact (`company.location.country` = "Indonesia") hardcoded as a literal in i18n. A `{{country}}` token exists (used in `atAGlance.locationValueTemplate`). Same class of violation as B1. | Replace the literal `Indonesia` in `titleTemplate` with `{{country}}`. Note: title length stays ~54 chars, within the <60 budget. (Human edit to i18n.) |

> Nuance noted for the human: B1/B2 are geographic terms in heading/title prose, the mildest form of fact-duplication. They are still genuine violations because (a) the exact value matches `company.ts`, and (b) the token mechanism is already wired and used elsewhere in the same file. No fabricated/uncited claim, no honesty-gating break, no orphan, no misplaced FAQPage was found.

### Defects

| ID | tier | pass+rule | exact location | what's wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 2 — Devil's Advocate (cornerstone) | Whole page; expected after the trust/specialization thesis (after the `#countries-served` or `team` section). Confirmed absent (`grep` of `factory.json` for counterargument/steelman/objection → no matches). | Cornerstone page lacks a steelman section stating the strongest buyer counterargument (e.g. "a single-product factory is riskier / less flexible than a diversified trader", or "in-house ≠ better QC than an audited trading house"), when it holds, and a data-grounded rebuttal. | Add one short H2 (question form, e.g. "Isn't a one-product factory a risk?") with a 2–4 sentence steelman + data-grounded response (lean on the 350 t/mo headroom, 14-day weathering DG step, batch retention, in-house QC). Requires new i18n keys in `factory.json` + a render block in `index.astro`. |
| D2 | Defect | Pass 2 — Mini-cases (cornerstone) | Whole page; no Problem→Action→Result structure present (grep for Problem/Result/case study → no matches). | Cornerstone page carries zero Problem→Action→Result mini-cases with a measurable result. The page asserts capability (capacity, consistency, anti-fraud) but never demonstrates it through a concrete situation→action→quantified-outcome example. | Add 1–2 short PAR mini-cases (e.g. "Buyer needed a monthly container through Ramadan surge → we scheduled a first-confirmed slot 6–8 weeks out → delivered on the committed window"; or a spec-development case ending in a measured ash/burn result). New i18n keys + render block. Keep each ≤3 sentences. |
| D3 | Defect | Pass 2 — Headings-as-questions + featured-snippet lead (cornerstone) | Child-entity H2s in `dist/factory/index.html`: "How our coconut charcoal is made", "Production capacity & lead times", "Raw materials & sourcing", "Virtual tour & factory visits"; plus "Customization & OEM", "Countries we export to", "Inside the factory" | On a cornerstone page the section H2s are statements, not buyer questions. (Definition-form lead sentences ARE present under each — good — but the heading itself is not snippet-optimized.) Only the FAQ block uses question form. | Reframe the four child H2s + customization/countries H2s as the buyer's question (e.g. "How is your coconut charcoal made?", "What is your production capacity?", "Where do you source the raw material?", "Can I visit or verify the factory?", "Which countries do you export to?"). i18n-only change; the definition-lead sentence already directly answers each. |

### Hardening

| ID | tier | pass+rule | exact location | what's wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | GEO extractability — accordion FAQ | `FAQSection.astro` (rendered at `index.astro:348`); only item `i===0` is `open`, items 2–7 are collapsed `<details>` | The 6 non-first FAQ answers sit inside collapsed native `<details>`. Content IS in the raw DOM (no JS required, so AI source-readers see it), but CLAUDE.md notes "AI crawlers do not expand these." On a cornerstone hub the FAQ is a primary GEO surface. Borderline — native `<details>` is honesty-compliant, but visibility is suboptimal. | Consider rendering all FAQ answers open by default on the hub (drop the collapse, or `open` on all), OR mirror the Q&A as a flat extractable list. Low priority — content is already crawlable. |
| H2 | Hardening | Pass 2 — anti-bloat / coherence | `intro.p2` and `intro.p3` (`factory.json` lines 50–51) vs the "Do you only make shisha charcoal?" FAQ (lines 167–168) and the specialization wedge repeated in `heroSubtitle` | The single-product specialization thesis ("we make one product and nothing else / that focus keeps the spec consistent") is restated in heroSubtitle, intro.p2, and the FAQ. Mild thesis-repetition across sections. | Tighten intro.p2 or let the FAQ own the specialization-rebuttal so the wedge is stated once strongly rather than three times. i18n-only. |
| H3 | Hardening | Pass 1 — regulatory currency / freshness cadence | `factory.editorial.dateModified = "2026-06-19"` (drives ArticleMeta "Last updated") | Fresh today (4 days old), so no currency problem. Flag is forward-looking only: the hub carries no hard regulatory claim of its own (UN 1361 / SP 978 live on `/logistics/un-1361`), so the freshness date should track real factory-content edits, not a cosmetic annual bump. No action now. | No change. Note for the freshness cadence: bump `dateModified` only on a real content edit. |
| H4 | Hardening | Pass 2 — quantified evidence | "consistent, low-ash spec batch after batch" (`intro.p2`); "burn and ash spec consistent from batch to batch" (FAQ) | The consistency/low-ash benefit is asserted without a number on this page. (Exact ash/burn figures intentionally live on `/quality` and are per-order-confirmed — so this is honesty-gated, not a fabrication.) | Optional: add a typical-range qualifier with the standard caveat, OR an explicit "typical figures on our specifications page" inline link, to give the claim an extractable number without over-promising. Keep the held-cert vs per-order-report distinction intact. |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "350 tons a month" / "350 tons/month" (hero, meta, capacity section, FAQ) | Correct | — | `production.capacityTonsPerMonth = 350` | company.ts |
| "14 tons per day" / "14 t/day" | Correct | — | `production.capacityTonsPerDay = 14` | company.ts |
| "4 lines", "8 ovens", "86 staff/employees" | Correct | — | `lines=4`, `ovens.count=8`, `headcount=86` | company.ts |
| "8 × 1.5 t/batch, 24 h cycle" ovens (KeyFactsBox) vs 14 t/day output | Unverified | Low | 8 ovens × 1.5 t = 12 t carbonized char per 24 h cycle, but daily finished output = 14 t. Plausible (binder + water add mass to finished briquettes, and char-to-briquette is not 1:1), but the two figures invite a "how do 12 t of char become 14 t/day?" question. Not an error; worth a one-line reconciliation if a reader notices. | company.ts (derived tension) |
| "MOQ 18 tons" / "one 20ft container ≈ 18 tons" | Correct | — | `commercial.moq.tons = 18` | company.ts |
| "≈19 twenty-foot containers / month" (derived) | Correct | — | round(350/18)=19; derived in `factoryTokens` | company.ts |
| "≈5% of monthly output" (one container) | Correct | — | round(18/350×100)=5; derived | company.ts |
| "ships to 35 countries" / `countriesServedCount` | Correct | — | `exportMarkets.length = 35`; matches `countriesExportedCount = 35` | company.ts |
| "4,200 m² facility" (`facilityAreaGrouped`) | Correct | — | `production.factoryAreaSqm = 4200` | company.ts |
| "14-day weathering window" / "≥14 days" | Correct | — | `production.weatheringDays = 14` | company.ts |
| Carbonization plant "in Bitung" (`carbonizationCity`) | Correct | — | `production.carbonizationPlant.city = "Bitung"` | company.ts |
| Sourcing "11 villages across North Sulawesi, Maluku, NTT" | Correct | — | `sourcingVillages=11`, `sourcingRegion` string | company.ts |
| "ISO 9001 certified" (hero chip) | Correct | — | `certifications.iso9001` + real cert PDF dated 2025-12-05 | company.ts |
| "NIB {{nib}}, NPWP {{taxId}}" anti-fraud note | Correct | — | tokenized, not literal; values from company.ts | company.ts |
| "no chemical accelerants … food-grade tapioca starch" | Correct | — | matches `factory.processSteps[mixing].note` | company.ts |
| "no tree is felled … renewable byproduct" (raw-materials facts) | Unverified | Low | Defensible: coconut shell is a food-industry byproduct; the coconut palm is harvested for fruit, not felled for shell. Generally true as framed. No external regulatory weight. | model |
| "Appoint SGS, Intertek, or BV … pre-shipment inspection" (virtual-tour facts) | Correct | — | Generic third-party inspectors; no proprietary claim. Honest ("at your cost"). | model |
| "priority markets are USA, UK, Saudi Arabia, Germany, Russia/CIS" (FAQ) | Correct | — | Matches CLAUDE.md priority-markets list | CLAUDE.md / company.ts |

No claim contradicts a source. No fabricated or uncited claim found.

---

## 4. Requires deep research

| Claim | Why | Markets |
|---|---|---|
| (none required) | All hard claims resolve to `company.ts`. The only two low-severity items (oven-throughput vs daily-output reconciliation; "no tree felled" framing) are internal-consistency / common-knowledge, not external-regulatory, and do not warrant the deep-research companion. | — |

No regulatory claims (UN 1361 / SP 978 / EUDR / VAT / HS duty) are made on this hub — those live on `/logistics` cluster pages, so nothing routes to deep research from `/factory`.

---

## 5. E-E-A-T / HCU assessment (Pass 5)

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 9 | ArticleMeta renders real author (Mohamad Sinno, Owner), reviewer (Ahmet Bassam, Consultant), fact-checker (Teguh Pranomo, QC Manager); signed owner pull-quote; named production team with on-floor bios. |
| Topical authority | 8 | Hub covers process, capacity, raw materials, verification, OEM, export footprint; links down to 4 live cluster pages. Statement-form H2s (not questions) cap the score. |
| Technical health & freshness | 8 | `dateModified` 4 days old; clean static HTML, zero-JS content. (CWV/Lighthouse mechanics are DrMax's domain — not measured here.) |
| Effort | 8 | Distinct definition leads, derived numeric tokens, anti-fraud NIB/NPWP note, 35-country list. Loses points: no mini-case, no steelman. |
| Originality | 7 | Strong "we are the factory not a trader" wedge, vertical-integration detail (own carbonization plant in Bitung). Some thesis repetition (H2). |
| Citation quality | 7 | Internally consistent and fact-backed; no external citations, but B2B-manufacturer context makes that acceptable. |
| Freshness / timeliness | 8 | Editorial dates present and current; cadence guidance noted (H3). |
| Page intent | 9 | Clearly serves "is this a real, capable, trustworthy factory?" buyer intent; trust signals above the fold. |
| Structure & readability | 8 | Logical H1→H2→H3 outline, no skipped levels, max-prose width, definition leads. FAQ accordion (H1) and missing question-form headings (D3) hold it back. |
| Mobile | 9 | Responsive grids (`grid-cols-2 sm:grid-cols-4`, `max-w-5xl`, `min-h-11` touch targets in FAQ). Per CLAUDE.md mobile-first budgets. |
| Format-standard adherence | 8 | Cornerstone meta table ✓, FAQ ✓, KeyFactsBox ✓. Missing: Devil's-Advocate (D1) and PAR mini-cases (D2). |
| Trust & spam signals | 9 | Honesty-gated blocks, anti-fraud payment note, "typical not guaranteed" posture, no inflated superlatives. |

**PQ (mean of 12) = 8.0 / 10.**

**Verdict:** Helpful-first. The page is built to satisfy a real buyer's verification questions (factory vs trader, capacity headroom, sourcing, how-to-verify) rather than to rank-bait; trust signals are concrete and honestly gated. Prognosis: goodClicks — a buyer landing here gets enough to qualify the factory and is routed cleanly to clusters + WhatsApp. The two cornerstone gaps (steelman, mini-cases) are the main thing separating it from a top-decile manufacturer hub.

**Lowest-3 action steps:**
1. **Citation quality (7) / Originality (7):** Add the 1–2 Problem→Action→Result mini-cases (D2) with a measurable result — this simultaneously raises originality and gives the page extractable, citable proof.
2. **Topical authority (8) / Structure (8):** Reframe the section H2s as buyer questions (D3); the definition-lead sentences already answer them, so this is a cheap snippet + authority win.
3. **Format-standard adherence (8):** Add the Devil's-Advocate steelman section (D1) — the single missing cornerstone format element; positions the page against the "single-product factory is risky" objection with the existing capacity/QC data.

---

*End of report. No site source modified. B1/B2 (hardcoded city/country in i18n), D1–D3 (cornerstone steelman, mini-cases, question-headings) and H1–H4 are TODOs for a human — no fact or claim was written into the repo by this audit.*
