# Content Audit — /logistics/import-to-saudi-arabia

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report-only). No files other than this report were created or modified.
**Methodology:** `docs/build-prompts/content-audit-page.md` v1.0, Passes 0,1,2,3,5 (Pass 6 OFF, Pass 4 N/A).
**Cornerstone:** YES — cornerstone rules enforced.

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| Target route | `/logistics/import-to-saudi-arabia` |
| Source file | `src/pages/logistics/import-to-[country].astro` (dynamic route; built for `country=saudi-arabia` via `getStaticPaths`) |
| Built HTML | `dist/logistics/import-to-saudi-arabia/index.html` |
| Layout | `src/layouts/BaseLayout.astro` (`type="article"`, `includeOrgSchema={false}`) |
| Key components | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `MaybeLink`, `ExternalLink`, `FAQSection`, `CTABanner`, `KeyFactsBox` |
| Country data object | `company.logistics.imports.saudiArabia` (sourced from `src/data/company.json` lines 844–933) |
| i18n namespaces | `en.logisticsImportSaudiArabia`, `en.logisticsImportCommon`, `en.logisticsCommon`, `en.logisticsImportGuides` |
| `company.ts` facts consumed | `commercial.portOfLoading` (Semarang/IDSRG), `commercial.transitTimes` (SAJED 25–35, SADMM 28–40), `commercial.leadTime` (14–21 days), `logistics.incoterms` (CIF offered), `governance.author/reviewer/factChecker`, `logistics.editorial.datePublished`, `imports.saudiArabia.*`, SP 978 weathering (14 days), `certifications.imdg` (Class 4.2) |
| Pillar | Logistics |
| Schema types emitted | `WebPage`, `FAQPage`, `TechArticle`, `HowTo`, `BreadcrumbList` (Breadcrumbs emits its own), plus `Person` author nodes |
| Build | Pre-built `dist/` read as-is (no build run, per run constraints). HTML present and well-formed. |

**Place in pillar-cluster map:** Logistics pillar → cluster child (one of 5 `import-to-{country}` guides + the `/logistics/import-guides` hub). Incoming permanent links: `/logistics/import-guides` hub (down-link via `importCountryLinks()`), sibling country guides (`importCountryLinks(key)`), `/logistics/un-1361` and `/logistics/documents` (both render the same sibling set). **Not an orphan.** Pillar up-link present in first paragraph (`/logistics`, real anchor) and in Related section.

---

## 2. Severity-tiered TODO list

### Blockers

_None._ No hardcoded company fact (port of loading is tokenized as `{{port}}`/`{{portWithCode}}`; legal name/MOQ/cert IDs absent from the Saudi i18n). No fabricated company trust claim (landed-cost block correctly publishes no per-ton price and labels FOB illustrative; honesty-gating intact). No real orphan or broken pillar link. No build failure.

> Note on the unverified 25% surcharge (D1 below): it is a **third-party port-charge** figure, not a protected company trust claim (certifications / capacity / per-order report), so it does not meet the "banking-details-severity" bar for a Blocker. It is filed as a Defect + deep-research item. If a reviewer treats any uncited hard numeric stated as "mandatory" as Blocker-grade, escalate D1 accordingly.

### Defects

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 honesty / Pass 3 fact-check | i18n `logisticsImportSaudiArabia.json` → `dgHandling.body`, `landed.note`, `landed.dutyValue`; renders in HTML "Dangerous-goods handling at Saudi ports" and "Landed-cost worked example" sections | The "**mandatory 25% dangerous-cargo surcharge** … billed by the Saudi terminal" is stated three times as a hard fact with a specific percentage, but has **no backing in `company.json` and no source link**, while every other regulatory cell on the page (duty layers, VAT, agency items, HTS) carries `sourceUrl` + `asOf`. The research file (`logistics-import-research-findings.md`) only references generic "carrier DG surcharges" with no Saudi-terminal 25% figure. | Either (a) add a sourced `asOf` + `sourceUrl` to a config field backing the 25% Saudi-terminal DG surcharge and render it source-linked like the duty cells, or (b) soften to a non-numeric, hedged statement ("terminals apply a dangerous-cargo surcharge; confirm the rate with your forwarder") until verified. Route the 25% figure to deep research (see §4). Do NOT write the number into the repo as fact without a source. |
| D2 | Defect | Pass 3 factual Error (Medium-High) | FAQ item 4 (`faq.items[3].a`) vs. Ports section vs. Lead-time sentence — all three render on the page | **Self-contradictory transit times on the same page.** FAQ answer (hardcoded i18n) says "about **18–25 days** to Jeddah (SAJED) and about **22–30 days** to Dammam (SADMM)" and points to "see the transit list above". The config-driven **Ports** list immediately above says Jeddah **25–35** / Dammam **28–40**, and the config-driven **Lead-time** sentence says transit "**25–40 days**". The FAQ numbers (18–25 / 22–30) contradict the authoritative `commercial.transitTimes` config and the rest of the page. | Delete the hardcoded day ranges from the FAQ answer and have it reference the config-driven Ports figures (or template the FAQ off the same `transitTimes` tokens), so a single source of truth drives all three. The config (`company.json` SAJED 25–35 / SADMM 28–40) is authoritative; the i18n literals are the error. |
| D3 | Defect | Pass 1 schema placement / Pass 2 | JSON-LD `@graph` in `dist/.../index.html` (built by `src/lib/schema/logisticsClusterPage.ts`) | A **`FAQPage`** node is emitted on this page. Methodology Pass 1 states "**FAQPage emits ONLY at `/faq` globally**; … misplaced FAQPage = Defect." This is **systemic**: the shared `logisticsClusterPageSchema` emits FAQPage on all logistics cluster children (confirmed: un-1361, documents, import-to-usa, quality/certifications each emit 1 FAQPage node), so it is a deliberate architecture in conflict with the audit rule, not a Saudi-page-only slip. The four Saudi FAQ questions are Saudi-import-specific (none are SHT/COA/MSDS), so no canonical-FAQ-home is violated — only the global "/faq only" rule. | Decide at the **builder level** (not on this page): either (a) stop emitting `FAQPage` from `logisticsClusterPageSchema` and rely on `/faq` as the single FAQPage home, keeping the on-page Q&A as plain HTML for GEO; or (b) formally amend the audit rule if per-page FAQPage is the intended site policy. Flagged here per methodology; fix is a one-place change affecting all 7 cluster pages. |
| D4 | Defect | Pass 2 Devil's Advocate (cornerstone) | Whole page — no such section exists | Cornerstone rule: after the section proving the page thesis, a **steelman / Devil's Advocate** section is required (strongest industry counterargument + when it holds + data-grounded response). Absent. No counterargument language anywhere in the rendered HTML. | Add a short steelman section, e.g. addressing the strongest buyer objection to importing via Saudi Arabia (SABER/SCoC friction and Red-Lane risk making Saudi entry "too hard" vs. re-export hubs), then answer it with the page's own data (non-regulated SABER status, 5% flat duty, recoverable VAT). Described only — do not draft prose here. |
| D5 | Defect | Pass 2 Mini-cases (cornerstone) | Whole page — none present | Cornerstone rule: ≥1–2 **Problem → Action → Result** mini-cases with a measurable result. None present. | Add 1–2 compact P-A-R cases, e.g. Problem: code mismatch (4402.90 vs 4402.20) routed a dossier to Red Lane; Action: declared 4402.20 uniformly across all docs + secured SCoC pre-departure; Result: green-lane clearance / N days saved. Keep numbers honest and sourced. Described only. |

### Hardening

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 Headings-as-questions | All section H2s (`HS classification`, `Duties & fees`, `The entry process`, `Saudi ports & routing`, etc.) | Section headings are noun phrases, not buyer questions. Only the FAQ block uses question form. Reduces featured-snippet and AEO capture. | Reframe key H2s as the question the buyer asks (e.g. "What HS code is coconut charcoal in Saudi Arabia?", "What duty and VAT apply?", "How does Saudi customs clearance work?"), keeping a 1–2 sentence direct answer immediately under each. |
| H2 | Hardening | Pass 2 anti-bloat / duplication | FAQ item 4 vs. Ports section + Lead-time section | Even after D2's numbers are reconciled, the FAQ transit answer **restates** the Ports list and the Lead-time sentence (three near-duplicate passages of the same transit content). | Compress the FAQ answer to a one-line pointer to the Ports section rather than repeating the full lane-by-lane breakdown. |
| H3 | Hardening | Pass 2 featured-snippet lead | `duty.body`, `hts.body` | These open with framing ("Read it as a dated stack…") before the extractable answer in some cases; the direct numeric answer (5% GCC CET + 0.15% ZATCA fee + 15% VAT) is strong but buried mid-paragraph in `duty.body`. | Lead each section's first sentence with the self-contained numeric answer, then add context. |
| H4 | Hardening | Pass 1 regulatory currency / Pass 3 | `dutyLayers[0]` (GCC CET) `asOf` 2026-06-21; ZATCA service fee `asOf` 2024-10-01; `vat.asOf` 2026-06-21; `lastVerified` 2026-06-21 | The 12-digit HTS extension (4402.20.00.00.00) and the SABER regulated-vs-non-regulated status are openly marked UNVERIFIED in config/i18n — good honesty — but they remain open items that should carry a dated review cadence tied to a real ZATCA/SABER check, not a cosmetic bump. | Keep the UNVERIFIED flags; add a scheduled re-verification against the live ZATCA Integrated Customs Tariff tool and SABER, and record the event date when confirmed. Route both to deep research (§4). |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| HS 4402.20 ("of shells or nuts") is the correct heading; 4402.90 is wrong (GRI 3(a)) | Correct | — | Matches research finding SA·C1 and the cross-market classification decision. | verified-facts (`logistics-import-research-findings.md` L133–139) |
| 12-digit extension 4402.20.00.00.00 (effective 1 Jan 2025) | Unverified (page says so) | Low | Page explicitly flags it UNVERIFIED and tells buyer to confirm with broker — honest. | research findings L136–139 (UNVERIFIED) |
| GCC Common External Tariff = 5% ad valorem on CIF for 4402 | Correct | — | Confirmed baseline GCC CET 2025. | research findings L142, L284; trade.gov |
| ZATCA import service fee 0.15% (min SAR 15, max SAR 500), introduced Oct 2024 | Unverified | Medium | Not present in the research-findings file; sourced in config to a PwC alert (`asOf` 2024-10-01). Plausible but route to external check. | company.json (PwC source); NOT in research findings |
| Import VAT 15%, on fully landed value, recoverable by registered importer | Correct | — | Matches research finding SA·C4. | research findings L148; trade.gov |
| No GCC/Saudi tariff preference for Indonesia origin; full 5% applies | Correct | — | Matches research finding (no GSP; preferences intra-GCC/FTA only). | research findings L142, L251 |
| Tariff moved 8-digit → 12-digit on 1 Jan 2025; ~7,800 → 13,400+ lines; ZATCA amended select lines to 10–20% late 2025/early 2026, charcoal not among them | Partly unverified | Medium | Direction (12-digit migration) corroborated; the specific line-count figures and the "10–20% amendment, charcoal excluded" detail are not in the research file. Plausible; verify. | company.json; research findings L136–139 (partial) |
| No AD/CVD order on Indonesian charcoal under 4402 into Saudi/GCC | Correct (hedged) | Low | Matches research finding "No anti-dumping found"; config says "confirm with broker." | research findings L142 |
| SABER Shipment CoC (SCoC) mandatory per shipment; missing → refused/re-exported; auto-linked to FASAH | Correct | — | Matches research finding SA·C5/C6. | research findings L158, L163, L291 |
| Coconut-shell charcoal treated as **non-regulated** in SABER (Self-Declaration + per-shipment SCoC) | Unverified (page says so) | Medium | Page explicitly flags HS 4402.20 SABER status UNVERIFIED — honest. DECISION ITEM in research. | research findings L163, L168 (DECISION ITEM) |
| SFDA does not regulate shisha charcoal (heat source, not tobacco); no Saudi excise on charcoal | Correct | — | Matches research finding (high confidence). | research findings L165–167 |
| FASAH single window; broker files Bayan; duties/VAT/fee paid pre-clearance; importer needs CR + VAT cert | Correct | — | Matches research finding SA·C5. | research findings L158 |
| Arrives as UN 1361, Class 4.2 DG; handled at Jeddah Islamic Port / King Abdulaziz Port (Dammam) | Correct | — | Class 4.2 from `certifications.imdg`; ports match `commercial.transitTimes`. | company.json; research findings L171 |
| **"Mandatory 25% dangerous-cargo surcharge billed by the Saudi terminal"** | **Unverified / uncited** | **Medium-High** | **No config field, no source link, not in research findings.** Stated as hard fact 3×. See D1. | NONE — not backed |
| Transit "18–25 days Jeddah / 22–30 days Dammam" (FAQ) | **Error** | Medium-High | Contradicts config `transitTimes` (SAJED 25–35, SADMM 28–40) and the page's own Ports/Lead-time sections. See D2. | company.json (config = authoritative) |
| Production lead time ~14–21 days; total order-to-arrival ~39–61 days | Correct | — | Derived from `commercial.leadTime` (14–21) + transit min/max (25–40) via tokens. Internally consistent with config. | company.json |
| SP 978 weathering window "at least 14 days" within production schedule | Correct | — | Token `{{sp978Weathering}}` resolves to 14 days from config DG node. | company.json |
| Brand "Mulia Charcoal"; author Mohamad Sinno / reviewer Ahmet Bassam / fact-checker Teguh Pranomo | Correct | — | All from `governance.*` / company config; rendered in meta table. | company.json |

---

## 4. Requires deep research

Route these to the deep-research companion prompt (external verification needed):

1. **Saudi-terminal "mandatory 25% dangerous-cargo (Class 4.2) surcharge"** — confirm whether Jeddah Islamic Port and King Abdulaziz Port (Dammam) apply a fixed 25% DG surcharge on terminal handling, the exact basis, and a citable source. (Markets: Saudi Arabia.) *Blocks D1 resolution.*
2. **12-digit GCC Integrated Customs Tariff line for coconut-shell charcoal** (4402.20.00.00.00) on the live ZATCA Integrated Customs Tariff tool. (Markets: Saudi Arabia.)
3. **SABER regulated-vs-non-regulated status of HS 4402.20** (Self-Declaration + SCoC vs. Product CoC under a named SASO Technical Regulation). (Markets: Saudi Arabia.) *Open DECISION ITEM.*
4. **ZATCA import service fee 0.15% (min SAR 15 / max SAR 500, Oct 2024)** — independent confirmation beyond the single PwC alert. (Markets: Saudi Arabia.)
5. **"ZATCA amended select tariff lines to 10–20% in late 2025/early 2026, charcoal excluded"** and the ~7,800→13,400 line-count figures — corroborate. (Markets: Saudi Arabia.)
6. **Saudi transit times** — confirm realistic Semarang→Jeddah / →Dammam DG sailing ranges to settle which figure set (config 25–40 vs FAQ 18–30) is correct, then reconcile per D2. (Markets: Saudi Arabia.)

---

## 5. E-E-A-T / HCU assessment (Pass 5)

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 8 | Named author (Owner/Director), reviewer (Charcoal Expert), fact-checker (QC Manager) in a visible top-of-page meta table; all from config. |
| Topical authority | 8 | Deep, Saudi-specific customs mechanics (FASAH/Bayan, SABER/SCoC, GCC CET, ZATCA, SFDA exclusion) — well beyond generic import copy. |
| Technical health & freshness | 7 | `lastVerified`/`dateModified` 2026-06-21; meta table dated. (CWV/Lighthouse are DrMax's domain, not re-measured.) |
| Effort | 8 | Substantial original synthesis: duty layer-stack table, landed-cost worked example, entry HowTo, agency matrix. |
| Originality | 8 | Not boilerplate; honest UNVERIFIED flags and Red-Lane warnings are distinctive and useful. |
| Citation quality | 6 | Most regulatory cells carry source links — but the **25% DG surcharge is uncited** (D1) and one FAQ figure contradicts the cited config (D2), dragging this down. |
| Freshness / timeliness | 7 | Dated 2026; open items flagged. Re-verification cadence for UNVERIFIED items not yet evidenced (H4). |
| Page intent | 9 | Cleanly serves "how do I import coconut charcoal to Saudi Arabia" — classification, cost, clearance, DG. Strong match. |
| Structure & readability | 7 | Clean H1/H2/H3 outline, tables, definition-form KeyFacts box; but headings are not question-form (H1-Hardening) and FAQ duplicates transit content (H2-Hardening). |
| Mobile | 8 | Responsive grid, `overflow-x-auto` table, ≥44px touch targets in nav — consistent with site budget (not re-measured). |
| Format-standard adherence | 6 | Meta table present (good) but **missing the cornerstone Devil's Advocate section (D4) and Problem→Action→Result mini-cases (D5)**, and FAQPage schema placement conflicts with the global rule (D3). |
| Trust & spam signals | 7 | Honesty-gating intact, no per-ton price published, explicit "not legal advice" disclaimer; weakened by the uncited 25% claim and the self-contradicting transit numbers. |

**PQ (arithmetic mean of 12):** (8+8+7+8+8+6+7+9+7+8+6+7)/12 = **7.42 / 10**

**Verdict:** **Helpful-first.** The page is built to satisfy a real buyer task (Saudi import mechanics) with extractable, mostly-sourced facts and honest hedging, not to farm search traffic — good-clicks prognosis is positive. The two content integrity issues (uncited 25% surcharge, contradictory transit numbers) and the missing cornerstone formats are what hold it back from top-quartile; none are search-first/spam signals.

**Lowest-3 criteria → action steps:**
1. **Citation quality (6)** — Resolve D1: source-link or hedge the 25% Saudi-terminal DG surcharge; resolve D2 so the FAQ stops contradicting the cited config.
2. **Format-standard adherence (6)** — Add the cornerstone Devil's Advocate steelman (D4) and 1–2 Problem→Action→Result mini-cases (D5); resolve the FAQPage-placement architecture decision (D3).
3. **Freshness/timeliness (7)** — Attach a real re-verification cadence to the UNVERIFIED items (12-digit HTS, SABER status, ZATCA fee) tied to an actual ZATCA/SABER check date (H4).

---

_End of report. Diagnose-only — no site source modified._
