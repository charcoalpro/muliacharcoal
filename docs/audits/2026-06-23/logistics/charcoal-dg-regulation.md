# Content Audit — /logistics/charcoal-dg-regulation

**Run date:** 2026-06-23 · **Mode:** diagnose-only (report, no edits) · **Passes:** 0,1,2,3,5 (Pass 6 OFF) · **Cornerstone:** YES

---

## 1. Manifest

| Field | Value |
|---|---|
| Target route | `/logistics/charcoal-dg-regulation` |
| Pillar | logistics |
| Source file | `src/pages/logistics/charcoal-dg-regulation.astro` |
| Layout | `src/layouts/BaseLayout.astro` (`type="article"`, `includeOrgSchema={false}`, `prefetch=['/contact']`) |
| Components | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `MaybeLink`, `FAQSection`, `CTABanner`, `KeyFactsBox`, `Figure` |
| i18n sources | `src/i18n/en/logisticsDgRegulation.json` (`en.logisticsDgRegulation`), `src/i18n/en/logisticsCommon.json` (`en.logisticsCommon` meta-block labels) |
| Schema builder | `src/lib/schema/logisticsClusterPage.ts` |
| company.ts fields consumed | `logistics.dg.packingGroup`, `.properShippingName`, `.amendment`, `.voluntaryFrom`, `.mandatoryFrom`, `.labellingGrace`, `.sp925Withdrawn`, `.sp223Withdrawn`, `.lastVerified`, `.sp978.{weatheringMethod, packingTempMaxC, headspaceCm, packingInstruction, dgdFields, bulkProhibited, stowageNote}`, `certifications.imdg.{unNumber, class, classDescription}` (via `imdgLabel()` + `unClass` token), `production.weatheringDays`, `logistics.editorial.{datePublished, dateModified}`, `governance.{author, reviewer, factChecker}` (via `ArticleMeta`), `whatsapp.presetMessages.salesGeneral`, `waLinkFor('salesGeneral')`. All flow through `companyTokens()` / `logisticsTokens()` / `hasFact()` — no direct literals. |
| Data source of record | `src/data/company.json` (consumed via `src/config/company.ts`) |
| Schema types emitted (built HTML) | `WebPage`, `FAQPage` (5 Q/As, `@id …#faq`), `TechArticle` (`@id …#techarticle`), `BreadcrumbList` (second `<script>` block, from `<Breadcrumbs>`) |
| Place in cocoon | Logistics pillar child; siblings: `un-1361` (UN 1361 definitional home), `charcoal-shipping-lines`, `cargo-protection-and-insurance`, `documents`, `rules`, `import-to-*`. This page is the "2026 freshness" page (year + amendment in title/H1, evergreen slug). |

**Pass 0 stop-conditions:** none. Page resolves to exactly one route; built HTML present at `dist/logistics/charcoal-dg-regulation/index.html`. (Build was already done; not re-run, per run constraints.)

**Pass 1 gate results (summary):** Hardcoded facts — PASS. Honesty-gating — PASS. Pillar linking / orphan — PASS (up-link in first paragraph to `/logistics`; Related section present; `/logistics` pillar links down; 14 incoming links from permanent structure). Schema type & placement — PASS (see verified-non-issue note below). GEO extractability — PASS (meta table present, definition-form sentences, dense numerics). i18n — PASS. Regulatory currency — PASS with minor date-divergence note (H-04).

**Verified non-issues (do NOT re-flag):**
- **FAQPage on a non-/faq page is correct here.** The generic "FAQPage only at /faq" line is contradicted by the actual site architecture: `logisticsClusterPageSchema()` deliberately emits one page-specific FAQPage per cocoon child, and FAQPage appears site-wide (guide, logistics, packaging, quality, glossary) in `dist/`. The governing rule is the canonical-FAQ-home rule (SHT → `un-1361`, COA → `quality/certifications`, MSDS → `documents`): this page's 5 Q/As are all its own topic (IMDG 42-24 / SP 978 / non-DG / payload), none are SHT/COA/MSDS topics. No duplication of another home's Q/A. Placement correct.
- **"Compliant before mandatory" claim correctly omitted.** `dg.compliantSince` is `""`; the gated claim does not render (verified absent in built HTML). Honesty-gating working as designed — not missing content.
- **`packingInstruction` "P002" renders** because the fact is present (`hasFact` true); the `controls.filter(hasFact)` chain drops any empty control. Correct.
- **Fact-checker row renders** (Teguh Pranomo) because `governance.factChecker.name` is set; `ArticleMeta` would silently drop it otherwise.
- **All `MaybeLink` targets are live** (`/logistics`, `/logistics/un-1361`, `/logistics/charcoal-shipping-lines`, `/logistics/cargo-protection-and-insurance`, `/logistics/documents`, `/logistics/rules`, `/logistics/import-to-usa`, `/packaging`, `/glossary`, `/contact` — all in `LIVE_ROUTES`). No muted links, no broken links, no orphan.

---

## 2. Severity-tiered TODO list

### Blockers
*(honesty-gating violation, hardcoded company fact, fabricated/uncited claim, real orphan/broken pillar link, misplaced FAQPage, build failure, regulatory claim now factually wrong)*

**None.** No hardcoded company facts; no ungated claim; no orphan; no broken pillar link; schema placement correct; no regulatory claim found factually wrong against the verified-facts sources (see Claims register). Build artifact present and parses.

### Defects
*(Pass-3 factual Error, missing required schema type, snippet/heading/structure failures, missing Devil's-Advocate on cornerstone, missing GEO meta table on cornerstone)*

| ID | tier | pass + rule | exact location | what's wrong | recommended fix (described, NOT executed) |
|---|---|---|---|---|---|
| D-01 | Defect | Pass 2 — Devil's-Advocate (cornerstone) | Whole page; the natural slot is immediately after the `#non-dg` section ("Can charcoal still ship non-DG?", source lines 140–144) and before `#cost` | Cornerstone requires a steelman section: state the strongest *industry counterargument*, when it holds, and a data-grounded rebuttal. The page asserts its thesis ("we ship declared, every time") but never steelmans the opposing view. The strongest counterargument exists and is concrete — e.g. "a passing UN N.4 self-heating test should still exempt the cargo" (this is exactly what `dg.sp978.n4Note` in company.ts addresses but the page never surfaces), or "DG declaration is just the supplier off-loading cost / over-compliance." | Add a short steelman H2 (question form, e.g. "Doesn't a passing self-heating test still exempt the cargo?"). Use the existing config fact `logistics.dg.sp978.n4Note` ("a passing UN N.4 self-heating test no longer exempts UN 1361 charcoal … it is supporting evidence only") as the data-grounded response. Surface `dg.voluntaryFrom` (2025) to show the rule was telegraphed, and acknowledge the legitimate sliver where the counterargument *used* to hold (pre-2026, under SP 925/223). Source the rebuttal from `logistics-import-research-findings.md` line 54 and the IMDG amendment. Add the i18n keys to `logisticsDgRegulation.json`; do not hardcode. |
| D-02 | Defect | Pass 2 — Mini-cases (cornerstone) | Whole page; no Problem→Action→Result structure anywhere | Cornerstone requires ≥1–2 Problem → Action → Result mini-cases with a measurable result. The `#cost` and `#non-dg` sections describe risk and cost abstractly ("carrier blacklisting, port-state detention") but give no worked case with a number. | Add one Problem→Action→Result mini-case (e.g. a shipment booked non-DG that was detained / re-stuffed, and the measurable consequence — days lost, re-stuffing cost, or the payload delta a compliant load carries). Quantify with figures already in config where possible (the `sp978Headspace` 30 cm payload trade-off; DG surcharge structure → link to `/logistics/rules`). If a real measurable result cannot be sourced, keep it as a hypothetical "worked example" clearly labelled, and lean on the existing `/logistics/import-to-usa` "worked landed-cost example" link. Route any new numeric claim through config/i18n, never a literal. |

### Hardening
*(anti-bloat, missing mini-cases nuance, freshness cadence, connectivity gaps, minor omissions, snippet polish)*

| ID | tier | pass + rule | exact location | what's wrong | recommended fix (described, NOT executed) |
|---|---|---|---|---|---|
| H-01 | Hardening | Pass 2 — Headings as questions | H2s "What changed, at a glance" (`#dgreg-at-a-glance` / KeyFactsBox heading), "What changed in 2026" (`#what-changed`, line 113), "What SP 978 requires" (`#sp-978`, line 119), "What it costs, and why payload drops" (`#cost`, line 147) | These four headings are statement/partial form, not full buyer-question form. ("Can charcoal still ship non-DG?" is already a good question; FAQ is fine.) | Reword to the question the buyer types: e.g. "What changed for charcoal shipping in 2026?", "What does SP 978 require?", "How much does DG shipping cost, and why does payload drop?". i18n only (`whatChanged.h2`, `sp978.h2`, `cost.h2`, `keyFacts.heading`). |
| H-02 | Hardening | Pass 1 — Regulatory currency / Pass 3 stowage geometry | `#sp-978` controls `<dl>`, "Stowage" cell — renders `dg.sp978.stowageNote` = "Stack height no more than 1.5 m, or a maximum block of 16 m³ with at least 15 cm between blocks." | The specific stowage geometry (1.5 m stack / 16 m³ block / 15 cm between blocks) is **not corroborated** in `logistics-import-research-findings.md`, which gives stowage as codes **SW1/SW27, EmS F-A/S-J** (line 54), not block dimensions. Likewise the **≥30 cm container-headspace** SP 978 control (rendered prominently in KeyFactsBox, controls, cost section, and 3 FAQ answers) is not present in the research file. Not demonstrably wrong, but unverified against the cited sources. | Route both claims to deep research (see §4). If verification confirms, add the source URL to `dg.sourceUrls` and bump `dg.lastVerified` to the verification date. Consider also surfacing the SW1/SW27 / EmS codes the research file *does* carry, since AI engines extract IMDG stowage codes. No page edit until verified. |
| H-03 | Hardening | Pass 3 — weathering wording | `#sp-978` "Weathering" control + FAQ "weathering, packing-temperature, and headspace rules" — renders `dg.sp978.weatheringMethod` = "14 days under cover in open air, or inert gas after pyrolysis plus 24 hours of storage" | Minor wording divergence from the verified source: `logistics-import-research-findings.md` line 54 says "weathered ≥14 days in open air (or steam/inert-gas treated then ≥24h under cover)". Config attaches "under cover" to the open-air branch and uses "inert gas after pyrolysis" rather than "steam/inert-gas treated"; "under cover" attaches to the wrong branch vs the source. | Reconcile `weatheringMethod` wording with the research finding (open-air branch is "in open air"; the "under cover" qualifier belongs to the inert-gas branch's 24 h storage). This is a `company.json` data edit (human), not a page edit. Low risk but worth tightening for fact-checker integrity. |
| H-04 | Hardening | Pass 1 — Regulatory currency (date provenance) | `ArticleMeta` "Last updated" renders `L.editorial.dateModified` = 2026-06-16 (source line 98); but the regulatory `dg.lastVerified` = 2026-06-15 | The visible "Last updated" (06-16) and the regulatory `lastVerified` (06-15) diverge by a day and are decoupled. For a "freshness page" whose whole purpose is currency, the regulatory verification date is the more meaningful signal but is not surfaced to the reader or to schema `dateModified`. Not wrong, but the freshness signal the page is built to carry is the one not shown. | Consider passing `dg.lastVerified` (or a derived max) as the page `dateModified` / "Last updated", or add a visible "regulation verified as of {{dgLastVerified}}" line near the SP 978 controls (a `logisticsCommon` caveat pattern already exists, e.g. `caveats.duty`). i18n + config wiring; no new literal. |
| H-05 | Hardening | Pass 2 — anti-bloat / coverage | `#sp-978` body (line 120) and `#non-dg` body (line 142) | Mild thesis repetition: "self-heating fire is inherent vice and is not insurable" (sp978 body) and the insurance framing recur; the inherent-vice/insurance point is the canonical topic of the sibling `cargo-protection-and-insurance` page (already linked). Slight cross-cluster bleed into insurance. | Tighten the sp978 body to the prevention-control intent and defer the insurance argument to the existing cargo-protection link; saves ~15–20% without losing facts. Optional polish. |
| H-06 | Hardening | Pass 2 — featured-snippet lead / extractable definition | `#sp-978` heading "What SP 978 requires" → first sentence (line 120) | The lead sentence under SP 978 opens rhetorically ("Special Provision 978 is not just paperwork…") rather than with a self-contained definition. GEO prefers a definition-form opener: "Special Provision 978 is …". The KeyFactsBox `definition` and the FAQ "What is SP 978?" do carry definition form, so this is polish, not a gap. | Lead the `#sp-978` paragraph (or add a one-line definition sentence under the H2) with "Special Provision 978 is the IMDG provision that …" before the rhetorical framing. i18n only. |

---

## 3. Claims register

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "IMDG Amendment 42-24 became mandatory on 1 January 2026" | Correct | High | Matches `dg.mandatoryFrom` 2026-01-01 and research line 54 ("mandatory from 1 Jan 2026"). | company.ts (`dg.mandatoryFrom`) + logistics-import-research-findings.md L54 |
| "withdrew Special Provisions 925 and 223 and introduced Special Provision 978" | Correct | High | `dg.sp925Withdrawn=true`, `dg.sp223Withdrawn=true`; research L54 "removes the former SP 925/SP 223 exemptions". | company.ts + research L54 |
| "carried as IMDG Code UN 1361 Class 4.2 (spontaneous combustion), Packing Group III" | Correct | High | `imdgLabel()` from `certifications.imdg` (UN 1361 / 4.2 / spontaneous combustion); `dg.packingGroup` = III; research L54 "PG III minimum". | company.ts (`certifications.imdg`, `dg.packingGroup`) + research L54 |
| "the self-heating test no longer exempts charcoal from dangerous-goods rules" | Correct | High | Research L54 SP 978 "declaration as DG with no exemption"; config `dg.sp978.n4Note` confirms N.4 test is supporting evidence only since 42-24. | research L54 + company.ts (`dg.sp978.n4Note`) |
| Packing temperature "≤ 40 °C on the day of packing, recorded and declared" | Correct | Medium | `dg.sp978.packingTempMaxC` = 40, `packingTempLogged` = true; research L54 "packed only when material ≤40°C". | company.ts + research L54 |
| Packaging "P002 — UN-approved, sift-proof" | Correct | Medium | `dg.sp978.packingInstruction` = "P002" (verified flag; renders via `hasFact`). | company.ts (`dg.sp978.packingInstruction`) |
| "Containerized bulk without packaging is not allowed" | Correct | Medium | `dg.sp978.bulkProhibited` = true. Not separately in research file but consistent with declared-DG/packaged regime. | company.ts (`dg.sp978.bulkProhibited`) |
| Weathering "14 days under cover in open air, or inert gas after pyrolysis plus 24 hours of storage" | Unverified (wording) | Low | 14-day figure correct (`production.weatheringDays`=14; research L54 "≥14 days"). "Under cover in open air" phrasing diverges from research "in open air (or … then ≥24h under cover)" — see H-03. | company.ts (`dg.sp978.weatheringMethod`) vs research L54 |
| Container headspace "≥ 30 cm in the container (CTU)" (also in KeyFacts, cost, 3 FAQ answers) | Unverified | Medium | `dg.sp978.headspaceCm` = "30". The 30 cm headspace SP 978 requirement is NOT in `logistics-import-research-findings.md`. Needs external confirmation against IMDG 42-24 / SP 978 text. | company.ts (`dg.sp978.headspaceCm`); NOT in research file |
| Stowage "Stack height no more than 1.5 m, or a maximum block of 16 m³ with at least 15 cm between blocks" | Unverified | Medium | `dg.sp978.stowageNote`. Research file gives stowage as codes SW1/SW27 + EmS F-A/S-J (L54), not these block dimensions. Needs external confirmation. | company.ts (`dg.sp978.stowageNote`); research L54 gives different (code-based) stowage |
| Declaration data: "date of production, date of packing, temperature on the day of packing" | Unverified | Low | `dg.sp978.dgdFields`. Plausible/consistent with the packing-temperature control but not itemized in the research file. | company.ts (`dg.sp978.dgdFields`) |
| "DG premium, IMO surcharge, and DG container handling — quoted by the carrier at booking" | Unverified | Low | Cost-structure claim; no figures (correctly deferred to carrier-at-booking, matching `caveats.freight` policy). No fabricated numbers. Low SEO/reputation risk. | model knowledge; consistent with company.ts caveat posture |
| Non-DG misdeclaration → "carrier blacklisting, port-state detention, and liability" | Unverified | Medium | Consequence claim. Directionally well-supported by research L57 ("carriers increasingly book … as DG regardless of test result"); specific enforcement outcomes not itemized in sources. | research L57 (supportive) + model knowledge |
| "compliant before mandatory" (the gated claim) | N/A — correctly NOT rendered | — | `dg.compliantSince` empty → omitted. Honesty-gating verified in built HTML. | company.ts (`dg.compliantSince`) |

---

## 4. Requires deep research

Route these to the deep-research companion prompt (claims not corroborated by `company.ts` source-links or the two research-findings files):

1. **SP 978 ≥ 30 cm container headspace requirement.** Confirm against IMDG Amendment 42-24 / SP 978 primary text that a ≥30 cm container (CTU) headspace is a mandated SP 978 control. Markets: all (global IMDG); load-bearing because it appears in KeyFacts, controls, the cost section, and 3 FAQ answers, and underpins the payload-reduction argument.
2. **SP 978 stowage geometry (1.5 m stack height / 16 m³ max block / 15 cm between blocks).** Reconcile with the SW1/SW27 + EmS F-A/S-J codes the research file carries; confirm the block-dimension specification is real SP 978 / IMDG stowage text and not a conflation. Markets: all.
3. **Weathering wording ("under cover in open air" vs "in open air; inert-gas then 24 h under cover").** Confirm the precise SP 978 weathering condition and which branch the "under cover" qualifier attaches to (drives H-03 data fix). Markets: all.
4. **DGD declaration data fields** (date of production / date of packing / packing-day temperature) — confirm these are the SP 978-specified DG declaration fields. Markets: all.

(Items 1–4 above also gate H-02/H-03; none are currently demonstrably wrong, so they are Unverified, not Errors — hence Hardening + research, not Defect/Blocker.)

---

## 5. E-E-A-T / HCU assessment

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 9 | Full ArticleMeta triple (author Mohamad Sinno, reviewer Ahmet Bassam, fact-checker Teguh Pranomo) from `governance`; roles shown; first-person operator voice ("we ship declared, every time"). |
| Topical authority | 8 | Tight, correct cocoon: cites UN 1361 (definitional home), shipping-lines, documents, cargo-protection, rules, import-to-usa, packaging — the page stays in its "what changed in 2026" lane and defers classification to `un-1361`. |
| Technical health & freshness | 8 | Freshness page with current dates; `lastVerified` tied to a real event (42-24 mandatory 2026-01-01). Deducted for the regulatory `lastVerified` (06-15) being decoupled from the displayed "Last updated" (06-16) — H-04. (CWV/Lighthouse out of scope — DrMax owns.) |
| Effort | 7 | Solid structured content, KeyFactsBox + controls `<dl>` + FAQ. Held back by missing mini-case (D-02) and missing steelman (D-01) that a cornerstone warrants. |
| Originality | 8 | Operator-specific framing (inherent-vice/insurance link, "non-DG = misdeclaration, exposure lands on importer") is genuinely differentiated, not boilerplate regurgitation. |
| Citation quality | 6 | Facts are config-sourced and mostly corroborated, but the load-bearing headspace + stowage geometry are not traceable to the cited research file, and no visible external citation/source line on-page for the regulation (only `dg.sourceUrls` in config, not surfaced). |
| Freshness / timeliness | 9 | Year-in-title freshness page; dates current to 2026-06; review cadence visible via meta table. |
| Page intent | 9 | Clear single intent ("what changed for charcoal sea freight in 2026") matched by H1, meta, and section structure; strong searcher-task fit. |
| Structure & readability | 8 | One H1, clean H2 outline, no skipped levels, definition-form KeyFacts + FAQ, dense extractable numerics. Deduct for non-question H2s (H-01) and the SP 978 lead not being definition-first (H-06). |
| Mobile | 8 | `max-w-3xl`, responsive `sm:grid-cols-2` controls, prose width capped; no JS-hidden primary content (FAQ rendered open in HTML). (No re-measure — per scope.) |
| Format-standard adherence | 7 | GEO meta table ✓, FAQ Q&A ✓, FAQPage+TechArticle schema ✓. Missing the cornerstone Devil's-Advocate (D-01) and mini-case (D-02) standards. |
| Trust & spam signals | 9 | No hardcoded facts, honesty-gating intact, no fabricated numbers, costs correctly deferred to "quoted at booking," gated claims correctly omitted. |

**PQ (mean of 12):** (9+8+8+7+8+6+9+9+8+8+7+9)/12 = **96/120 = 8.0/10**

**Verdict:** **Helpful-first.** The page serves a real buyer task with operator-grade specificity and clean honesty-gating; goodClicks prognosis is favorable. It is one cornerstone tier short of excellent — adding the steelman and a measurable mini-case, plus surfacing the regulation's source/verification date, would move it from "good explainer" to "citable authority."

**Lowest-3 action steps:**
1. **Citation quality (6) → add traceability.** Surface a visible "regulation verified as of {{dgLastVerified}}" line near the SP 978 controls and/or expose `dg.sourceUrls` as a sources note; resolve the headspace + stowage-geometry verification (§4 items 1–2) and attach source URLs in config. (Addresses H-02, H-04.)
2. **Effort / Format adherence (7) → meet cornerstone standards.** Add the Devil's-Advocate steelman using `dg.sp978.n4Note` (D-01) and one Problem→Action→Result mini-case with a measurable result (D-02).
3. **Structure (tie, 7–8) → snippet polish.** Reword the four statement H2s into buyer questions (H-01) and lead the SP 978 section with a definition-form sentence (H-06).

---

*End of report. Diagnose-only — no source files modified. All recommended fixes are described, not executed; any company-fact or regulatory-claim change is a TODO for a human editor (config/i18n), never to be written by this audit.*
