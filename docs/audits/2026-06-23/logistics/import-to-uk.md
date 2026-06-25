# Content Audit — /logistics/import-to-uk

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report, no edits). Passes 0,1,2,3,5. Pass 6 OFF.
**Cornerstone:** YES — cornerstone rules enforced.

---

## 1. Manifest

| Field | Value |
|---|---|
| Target route | `/logistics/import-to-uk` |
| Pillar | logistics |
| Source (template) | `src/pages/logistics/import-to-[country].astro` (dynamic route over `company.logistics.imports`) |
| Data object feeding this route | `src/data/company.json` → `logistics.imports.uk` (lines 701–767); typed by `src/config/company.ts` `ImportCountry` |
| i18n namespace | `src/i18n/en/logisticsImportUk.json` (page-specific) + `src/i18n/en/logisticsImportCommon.json` (shared) + `en.logisticsCommon.metaBlock` |
| Built HTML | `dist/logistics/import-to-uk/index.html` (single rendered route; resolves to exactly one page — no batch/stop condition) |
| Layout | `BaseLayout.astro` (type=`article`, `includeOrgSchema={false}`, `prefetch=['/contact']`) |
| Components | Breadcrumbs, HeroSection, ArticleMeta, MaybeLink, ExternalLink, FAQSection, CTABanner, KeyFactsBox |
| `company.ts` fields consumed | `logistics.imports.uk.*` (htsCandidates, htsNotes, dutyLayers, vat, preference, dutyHistory, adcvd, entryNotes, countryAgency, lastVerified), `commercial.transitTimes` (UK rows), `commercial.leadTime`, `commercial.portOfLoading`, `logistics.incoterms`, `governance.{author,reviewer,factChecker}`, `certifications.imdg.class`, `production.weatheringDays`, `whatsapp.presetMessages.salesGeneral`, `waLinkFor()` |
| Schema types emitted | `WebPage`, `FAQPage`, `TechArticle`, `HowTo`, `BreadcrumbList` (Breadcrumbs emits its own) — confirmed in built HTML `<script type="application/ld+json">` |
| Pillar position | logistics cluster child; sub-hub = `/logistics/import-guides`; siblings = import-to-{usa,germany,saudi-arabia,russia} |

**Stop conditions:** none triggered. Route resolves to exactly one page; build artifact present.

---

## 2. Severity-tiered TODO list

### Blockers

*None.*

Hardcoded-fact gate: PASS. Every company fact on the page resolves through `company.ts` / `company.json` (port `Tanjung Emas (Semarang/IDSRG)`, lead time 14–21 d, weathering 14 d, IMDG class 4.2, author/reviewer/fact-checker names, incoterms FOB+CIF/CFR, MOQ label). No literal company fact found in the `.astro` template, components, or i18n JSON — i18n carries labels/prose only, with fact values injected via `fill()` tokens.

Honesty-gating gate: PASS. Every regulatory cell renders from a backing `imports.uk.*` fact with `hasFact()` guards on optional source links, VAT, preference, dutyHistory, adcvd. The fact-checker cell is honesty-gated (`hasFact(gov.factChecker.name)`). The landed-cost example labels FOB "Illustrative only" and publishes no per-ton price (rule respected). Held-cert vs per-order-report distinction is not blurred (responsibility list cites per-batch COA + SP 978 report distinctly).

### Defects

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 2 — Devil's Advocate (cornerstone) | Whole page; would sit after the `#duty` / `#agency` sections that prove the "UK import is low-friction (0% duty, recoverable VAT, charcoal out of FLEGT scope)" thesis | No steelman / counter-argument section. The page asserts a clean import position but never states the strongest opposing case (e.g. "the FLEGT/UKTR exemption is a *probably-not*, not a ruling; a Border Force reclassification of '4402 as wood product' or an OPSS scope change would impose UKTR diligence and BCP holds") and then rebuts it with data. Required on cornerstone pages. | Add a short "Where this could go wrong / when the easy path doesn't hold" H2 after the agency section: steelman the timber-scope and CDS-risk-engine counterargument, state when it holds (mis-declared 4402.90, missing OPSS confirmation, non-ISPM-15 pallets), and answer with the data already on the page (GRI 3(a), OPSS enforcement-report code list, 901Y exemption). Describe only — do not write prose here. |
| D2 | Defect | Pass 2 — Headings as questions / featured-snippet lead | All body `<h2>`/`<h3>` outside the FAQ: `Who handles what`, `Commodity-code classification`, `Duty & import VAT`, `Landed-cost worked example`, `The entry process`, `Dangerous-goods handling at UK ports`, `UK regulation: REACH, FLEGT timber, and phytosanitary`, `Production and transit lead time`, `UK ports & routing` | Section headings are statement-form, not the question a UK importer types ("How is coconut charcoal classified for UK import?", "What duty and VAT apply?", "How does UK customs entry work?"). Only the FAQ block uses question form, so the body sections forfeit featured-snippet/AI-extraction eligibility that the topic clearly supports. | For each body H2, supply (or add as an `<h3>` lead-in) the question form and ensure the first sentence under it is a self-contained 1–2 sentence direct answer. The `#hts` and `#duty` leads already answer directly; `#entry`, `#landed-cost`, and `#agency` bury the answer one sentence deep — front-load it. Describe the question text; do not rewrite the section. |

### Hardening

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 1 — fact present in `company.ts` not rendered (Do-Not-False-Flag exception b) | `imports.uk.entrySourceUrl` (`company.json:746`, `https://www.gov.uk/government/collections/customs-declaration-service`); typed at `company.ts:339`. Template `#entry` section (`import-to-[country].astro` lines 344–357) | `entrySourceUrl` is populated for every country (UK included) and typed as a required field, but it is consumed nowhere in `src/` (grep confirms only data/type sites). The entry section is the only regulatory section on the page with NO outbound source link, while HTS, duty, VAT, preference, and every agency item carry an `ExternalLink`. A real, backing source fact is not surfaced. | In the `#entry` section, render an `ExternalLink` to `data.entrySourceUrl` (gated with `hasFact`) using the existing `t.duty.sourceLabel` pattern and an `outbound_click` data-event, mirroring the other sections. Template-level change affecting all five countries — note for the human, do not edit. |
| H2 | Hardening | Pass 2 — Mini-cases (cornerstone) | Whole page | No Problem → Action → Result mini-case with a measurable result. Cornerstone pages should carry ≥1–2. The page is reference-grade but has no worked buyer scenario (e.g. "Buyer declared 4402.90 → CDS Route 1 documentary hold → re-declared 4402.20, cleared; demurrage avoided"). | Add 1 short PAR mini-case using facts already on the page (mis-classification → CDS hold → correct 4402.20 declaration). Numeric result should use only already-published figures (transit days, 0% duty, 20% recoverable VAT). Describe only. |
| H3 | Hardening | Pass 2 — anti-bloat / duplication | `#duty` "How the duty position sits" (`dutyHistory`), `#duty` preference note (`preference.note`), and FAQ Q1 | The DCTS-0%-MFN-no-benefit point is stated three times in near-identical wording across `dutyHistory`, `preference.note`, and FAQ Q1 (each restates "MFN already 0% so DCTS adds no benefit; charcoal not in graduated chapters; full graduation 2027 leaves duty unchanged"). Compressible ≥20% without losing facts. | Keep the canonical statement in the `preference` block; reduce `dutyHistory` to the historical delta only; let FAQ Q1 answer the question directly and link rather than re-derive. Content-author change (i18n + `company.json` prose), not a template edit. |
| H4 | Hardening | Pass 1 — regulatory currency / freshness cadence | Duty layer `asOf` `2026-06-21`; VAT `asOf` `2026` (coarse); `lastVerified` `2026-06-21`; meta "Last updated" `2026-06-21` | Dates are event-tied and current (UKGT 2026, DCTS notice) — good. Minor: VAT `asOf` is year-only ("2026") where the duty layer is date-precise; and the lead-time DG note caption "Last updated 2026-06-22" differs from the page `lastVerified` 2026-06-21, a one-day cosmetic mismatch a reader may notice. | Normalize VAT `asOf` to a full date for consistency; reconcile the two "last updated" stamps so a single review event is reflected. Cadence note only — not factually wrong. |

---

## 3. Claims register

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| Coconut-shell charcoal classifies under heading 4402, code **4402 20 00 00** ("of shells or nuts"); 4402.90 is the wrong residual code (GRI 3(a)) | Correct | Low | Matches research UK·C1 and GOV.UK "Classifying wood". | verified-facts (logistics-import-research-findings.md UK·C1) |
| UKGT MFN duty for heading 4402 = **0%** | Correct | Low | Matches UK·C2 and summary table ("UK Customs duty 0%, UKGT 2026, Confirmed"). | verified-facts (UK·C2) |
| Indonesia = DCTS **Standard Preferences** tier; confers no extra benefit because MFN already 0% | Correct | Low | Matches UK·C2 verbatim finding. | verified-facts (UK·C2) |
| DCTS goods graduation notice **1 Jan 2026 – 31 Dec 2028**; Indonesia's graduated chapters = oil-based products, footwear, musical instruments (not charcoal) | Correct | Low | Matches UK·C2. | verified-facts (UK·C2) |
| "Indonesia's **full DCTS graduation from 1 January 2027**" (FAQ Q1, `dutyHistory`, `preference.note`) | **Unverified** | Medium | Research UK·C2 (checked 2026-06-21) documents only the 2026–2028 *goods* graduation and does NOT state a UK DCTS *full graduation* effective 1 Jan 2027. The "loses beneficiary status from 2027" finding in the research is stated for **EU GSP** (lines 84 / 250), not UK DCTS. Possible conflation of the EU-GSP-2027 loss with UK DCTS. Duty conclusion (0%) is unaffected either way, so reputational not commercial risk — but the dated graduation assertion needs an external source before it stands as a UK fact. | model / needs external check (not in verified-facts) |
| Import VAT = **20%**, recoverable; **Postponed VAT Accounting (PVA)** available to VAT-registered importers | Correct | Low | Matches UK·C3. | verified-facts (UK·C3) |
| Reduced **5% fuel-and-power rate** is for sub-1-tonne domestic supply and does not apply to a commercial container | Unverified | Low | Plausible and correctly framed as an exclusion; not explicitly in the research findings. Low risk (it narrows, not expands, a benefit). | model |
| Entry sequence: **ENS/S&S GB → CDS declaration → GVMS/GMR**; carrier responsible for S&S, broker files CDS, GB EORI required | Correct | Low | Matches UK·C5. | verified-facts (UK·C5) |
| **UK REACH** applies via SDS; no charcoal-specific UK REACH restriction | Correct | Low | Matches UK·C6. | verified-facts (UK·C6) |
| OPSS **UKTR enforcement report (2022–2025)** checks 4401/4407/4409/4412, not 4402; coconut charcoal an agricultural byproduct → not clearly in UKTR/FLEGT scope; confirm with OPSS | Correct | Medium | Matches UK·C6; correctly hedged ("Probably not", "confirm with OPSS"). Held as a *probably-not*, not a ruling — consistent with research. | verified-facts (UK·C6) |
| Indonesia is the **only country with a UK FLEGT VPA** | Correct | Low | Matches UK·C6 wording. | verified-facts (UK·C6) |
| Phytosanitary: fully carbonised charcoal generally exempt from APHA certification; CDS exemption code **901Y**; ISPM-15 pallets required | Unverified | Medium | The **901Y** CDS exemption code and the APHA-exemption framing are NOT in the research findings (UK·C6 covers REACH/UKTR; ISPM-15 is in §256). The 901Y code is a specific, checkable assertion that should be sourced. Hedged ("subject to local BCP interpretation"). | model / needs external check |
| Ports: **Felixstowe GBFXT, London Gateway GBLGP, Southampton GBSOU**; transit ~30–42 days ex-Semarang | Correct | Low | LOCODEs match UK·C9; transit rows are config-sourced (`commercial.transitTimes`). | company.ts / verified-facts (UK·C9) |
| Cargo is **UN 1361, Class 4.2** dangerous goods | Correct | Low | `unClass` token = `certifications.imdg.class`; UN 1361 charcoal is IMDG Class 4.2. | company.ts |
| No anti-dumping / countervailing order on Chapter 44 charcoal of Indonesian origin | Correct | Low | Matches UK·C2 ("No anti-dumping found"); page hedges "confirm with your customs broker". | verified-facts (UK·C2) |

---

## 4. Requires deep research

Route these to the deep-research companion prompt before any fix touches the prose:

1. **"Indonesia's full DCTS graduation from 1 January 2027" (UK).** Confirm whether a UK DCTS *full* graduation for Indonesia is actually scheduled for 1 Jan 2027, or whether this is a carry-over of the EU-GSP-2027 loss. Appears in FAQ Q1, `dutyHistory`, and `preference.note`. Markets affected: **UK**. Why: dated regulatory assertion not backed by the UK research findings; duty outcome is unaffected (0%) but the date itself must be sourced or softened.
2. **APHA phytosanitary exemption + CDS code 901Y for fully carbonised charcoal.** Confirm the 901Y exemption-document code and that fully carbonised coconut charcoal is treated as exempt from APHA phytosanitary certification under current BTOM/BCP practice. Markets affected: **UK** (and check the analogous claim is not silently copied to EU/Germany). Why: specific checkable code not in verified-facts.
3. **5% reduced-rate VAT exclusion phrasing.** Low priority — confirm the "sub-1-tonne domestic supply" framing of the reduced fuel-and-power VAT rate so the exclusion is stated precisely. Markets affected: **UK**.

---

## 5. E-E-A-T / HCU assessment

| Criterion | Score /10 | One-line justification |
|---|---|---|
| Authorship & expertise | 8 | ArticleMeta renders real author/reviewer/fact-checker (config-sourced), each with a role; WebPage+TechArticle carry `author` Person. |
| Topical authority | 9 | Deep, UK-specific customs mechanics (CDS, GVMS, PVA, OPSS, DCTS) with primary GOV.UK source links per section. |
| Technical health & freshness | 8 | Event-tied dates (UKGT 2026, DCTS notice, OPSS report); minor one-day "last updated" mismatch (H4). CWV/Lighthouse out of scope (DrMax). |
| Effort | 9 | Layered duty stack with legal-status flags, worked landed-cost example, per-section sources — well beyond a thin import blurb. |
| Originality | 7 | Genuinely synthesized for this product/lane; lowered slightly by the thrice-repeated DCTS paragraph (H3). |
| Citation quality | 8 | Most regulatory cells cite a GOV.UK source; entry section is the gap (H1) and two claims lack a verified-facts source (DCTS-2027, 901Y). |
| Freshness / timeliness | 8 | `lastVerified` 2026-06-21 with dated layers; cadence is real, not cosmetic. |
| Page intent | 9 | Clearly the import-procedure guide; correctly defers the commercial case to the (muted) market page; intent never bleeds. |
| Structure & readability | 7 | Clean semantic sections, tables, `<dl>`/`<ol>`; loses points for statement-form headings and buried direct answers (D2). |
| Mobile | 9 | `max-w-3xl`, responsive grids, `overflow-x-auto` on the duty table, ≥44px touch targets in nav — no obvious 360px break. |
| Format-standard adherence | 7 | Cornerstone GEO meta table present; FAQ present; but Devil's-Advocate (D1) and mini-case (H2) cornerstone formats are absent. |
| Trust & spam signals | 9 | Honesty-gated blocks, explicit "regulatory information, not legal advice" disclaimer, no fabricated price, hedged regulatory claims. |

**PQ (arithmetic mean of 12):** **8.0 / 10**

**Verdict:** **Helpful-first.** The page is built to answer a real UK importer's procedural questions with sourced, extractable facts and conservative hedging — not to rank-bait. goodClicks prognosis strong; the two unsourced dated claims (DCTS-2027, 901Y) are the only reputational drag if a knowledgeable buyer checks them.

**Lowest-3 action steps:**
1. **Originality (7) — H3:** de-duplicate the DCTS-0%-MFN paragraph; keep one canonical statement, trim `dutyHistory` and FAQ Q1 to non-overlapping angles.
2. **Structure & readability (7) — D2:** convert body H2s to the buyer's question form and front-load a one-sentence direct answer under `#entry`, `#landed-cost`, and `#agency`.
3. **Format-standard adherence (7) — D1/H2:** add the Devil's-Advocate steelman section and one Problem→Action→Result mini-case to meet cornerstone format requirements.

---

## Auditor notes (false-flag guards observed — NOT findings)

- **FAQPage on this page is correct, not a misplacement.** The literal "FAQPage emits only at /faq" rule is satisfied in spirit: per the repointed canonical-FAQ-home rule, the constraint is "one Q/A = one FAQPage home." The four UK Q/As (duty, VAT recoverability, FLEGT/timber, shipping time) are page-unique and are NOT the canonical-home topics (SHT→un-1361, COA→certifications, MSDS→documents). The shared `logisticsClusterPageSchema` deliberately emits a page-specific FAQPage on every logistics cocoon child, consistent with CLAUDE.md's cornerstone GEO requirement. No finding raised.
- **`/markets/uk` link is muted plain text (intro + Related), not a broken link or orphan** — `/markets/uk` is absent from `LIVE_ROUTES`; `MaybeLink` degrades it deliberately. Not reported.
- **No certifications/SP 978/capacity trust block appears** beyond the responsibility list — correct honesty-gated omission for this page type; not reported as missing content.
- **Schema mechanics (canonical/hreflang syntax, JSON-LD validity, robots/sitemap/headers, CWV numbers)** are out of scope (DrMax / technical owner) and were not evaluated.
