# Content Audit — /logistics/import-to-russia

**Date:** 2026-06-23
**Mode:** Diagnose-only (report-only). No source files were modified.
**Passes run:** 0, 1, 2, 3, 5 (Pass 6 OFF).
**Cornerstone:** YES — cornerstone rules enforced.

---

## 1. Manifest

| Item | Value |
|---|---|
| Target route | `/logistics/import-to-russia` |
| Pillar | Logistics |
| Source (page) | `src/pages/logistics/import-to-[country].astro` (dynamic route; Russia = `key: 'russia'`) |
| Data object feeding this route | `company.logistics.imports.russia` (in `src/data/company.json`, consumed via `src/config/company.ts`) |
| i18n namespaces | `en.logisticsImportRussia` (`src/i18n/en/logisticsImportRussia.json`), `en.logisticsImportCommon`, `en.logisticsCommon` |
| Layout | `BaseLayout.astro` (`includeOrgSchema={false}`, `type="article"`, `prefetch={['/contact']}`) |
| Components rendered | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `KeyFactsBox`, `MaybeLink`, `ExternalLink`, `FAQSection`, `CTABanner` |
| `company.ts` fields consumed | `governance.author/reviewer/factChecker`, `logistics.imports.russia.*` (htsCandidates, htsNotes, dutyLayers, vat, preference, dutyHistory, adcvd, entryNotes, countryAgency, lastVerified), `commercial.transitTimes` (Russia rows), `commercial.leadTime`, `commercial.portOfLoading`, `logistics.incoterms`, `logistics.editorial`, `production.weatheringDays`, `logistics.dg.sp978`, `whatsapp.presetMessages.salesGeneral` |
| Built HTML | `dist/logistics/import-to-russia/index.html` (present; read) |
| Schema types emitted (page `@graph`) | `WebPage`, `FAQPage`, `TechArticle`, `HowTo` |
| Schema types emitted (separate block) | `BreadcrumbList` (from `Breadcrumbs.astro`) |
| Author / Reviewer / Fact-checker | Mohamad Sinno (Owner & Director) / Ahmet Bassam (Charcoal Expert) / Teguh Pranomo (QC Manager) — all from `company.governance.*`, not hardcoded |
| `lastVerified` (dateModified) | 2026-06-23 |

**Build note:** Build was NOT run (instructed; build already done). Pre-built HTML inspected read-only.

---

## 2. Severity-tiered TODO list

### Blockers

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|---|
| — | Blocker | — | — | **None found.** No hardcoded company fact in the page source or its i18n (all facts route through `company.ts`/`governance`/`imports.russia`). No claim rendered without a backing fact. No real orphan or broken pillar link. No build failure. No regulatory claim found to be factually wrong against the verified-facts sources. | — |

### Defects

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 — Schema architecture (FAQPage emits ONLY at `/faq` globally) | Page `@graph` in `dist/.../index.html`; emitted by `src/lib/schema/logisticsClusterPage.ts` (`faqPage` node, `@id` `…#faq`) | A `FAQPage` JSON-LD node is emitted on this page. The audit rule states FAQPage may emit only at `/faq` globally. **Caveat for the human reviewer:** this is a deliberate, architecture-wide pattern (the cluster schema builder's own doc-comment declares "one Q/A = one FAQPage home"; every logistics cluster child emits its own FAQPage). The Russia Q/As are duty/VAT/feasibility/transit questions — none are SHT/COA/MSDS, so no *canonical FAQ-home* (SHT→un-1361, COA→quality/certifications, MSDS→logistics/documents) is poached. Flagged because the literal rule is owned by this audit. | Decide at the architecture level, not on this page: either (a) ratify the per-cluster FAQPage pattern and amend the audit rule to permit FAQPage on cornerstone cluster pages whose Q/As are page-specific and non-canonical-home; or (b) strip the `FAQPage` node from `logisticsClusterPageSchema` for all cluster children and keep only the on-page HTML `<dl>` (the visible FAQ stays; only the JSON-LD type changes). Do NOT fix on this single page in isolation — it would desync the cluster. |
| D2 | Defect | Pass 2 — Devil's Advocate (steelman required on cornerstone) | Whole article; no steelman section between the thesis sections and the FAQ | Cornerstone pages require a steelman section stating the strongest industry counterargument, when it holds, and a data-grounded response. This page has a strong *feasibility caveat* (carrier/banking/sanctions) but no explicit "is Russia worth importing to at all / strongest case against this lane" steelman with a reasoned, data-grounded rebuttal. The feasibility aside warns but does not argue both sides. | Add a short steelman H2 (question form, e.g. "Is the Russia lane worth it given the constraints?") after the duty/landed-cost sections: state the strongest counter ("most exporters skip Russia in 2026 because carrier DG acceptance and SWIFT exclusion make it slower and riskier than UK/Germany"), state when that holds, then the data-grounded response (Vladivostok 18–30 day routing, refusal-letter path, RUB/IDR/CNY settlement, FTA upside once ratified). Source each number from `imports.russia` / research-findings. |
| D3 | Defect | Pass 2 — Mini-cases (≥1–2 Problem→Action→Result on cornerstone) | Whole article; no Problem→Action→Result block present | Cornerstone pages must carry 1–2 Problem→Action→Result mini-cases with a measurable result. None is present; the page is reference-structured (tables, lists, FAQ) but has no worked buyer scenario with an outcome. | Add 1–2 compact P→A→R cases, e.g. Problem: container mis-declared under 4402 10 (bamboo) flagged by the FTS risk system → Action: re-declare 4402 20 000 0 with Cocos nucifera botanical origin + tapioca binder on invoice → Result: cleared without misdeclaration penalty. Keep facts sourced from `imports.russia.htsNotes`. Mark illustrative, no per-ton price. |

### Hardening

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — Headings as questions / featured-snippet lead | H2s `TN VED classification`, `Duties & fees`, `The entry process`, `Russian ports & routing`, `Russian conformity: EAC, GOST, and phytosanitary control` | Several H2s are noun-phrase labels, not buyer questions. The FAQ already uses question form well; the body H2s do not. AI engines and snippets favor question-form H2 + a self-contained 1-sentence answer underneath. | Where it does not break the cluster's shared i18n shape, rephrase body H2s as questions ("How is coconut charcoal classified for Russian customs?", "What duty and VAT apply?", "Who clears the cargo and how?", "Which Russian ports and how long is transit?"). Note these are shared per-country i18n strings, so changes propagate; coordinate across the cluster. |
| H2 | Hardening | Pass 1 — Regulatory currency (event-tied dating) | Duty table `asOf` cells and `lastVerified` | Dating is mostly event-tied and good (VAT asOf 2026-01-01 = Law 425-FZ; fee asOf 2026-01-01 = Resolution 1638). The MFN duty row `asOf` is `2026-06-21` (a check date, not a regulatory event) and the page `lastVerified` is `2026-06-23`. This is acceptable but the duty-row date reads as a cosmetic check-stamp rather than tied to a tariff event. | Optional: annotate the MFN duty row's date as "last re-confirmed" vs the VAT/fee rows' true effective dates, so the distinction between a regulatory-event date and a verification date is explicit. Low priority. |
| H3 | Hardening | Pass 2 — Anti-bloat / duplication | Feasibility caveat (aside) vs `countryAgency` Carrier-acceptance + Banking items vs FAQ "Can I import…2026?" | The carrier-suspension / SWIFT / EU-20th-package / Vladivostok-routing facts are stated three times (feasibility aside, agency Carrier+Banking rows, FAQ). Repetition is partly intentional (each serves a different scan path) but the three passages are near-verbatim. | Keep the feasibility aside and the agency rows as the canonical homes; tighten the FAQ answer to summarize and point up to the caveat rather than restating all four facts, trimming ~20% without losing any fact. |
| H4 | Hardening | Pass 2 — Quantified evidence | `countryAgency` items: GOST, TR TS 021/2011, EAC | Several conformity statements are qualitative ("generally NOT subject", "voluntary", "generally not applicable", "UNVERIFIED"). The honest hedging is correct, but where a numeric anchor exists (e.g. GOST 7657-84 number is present; phytosanitary cost falls on importer) it could be made more extractable. | Where a verifiable number or named instrument exists, surface it (regulation number, the 14-day weathering already shown elsewhere). Do not manufacture numbers for genuinely unverified items — keep the UNVERIFIED flags. |
| H5 | Hardening | Pass 2 — Definition-form sentence for key term (GEO) | `hts` section intro; `keyFacts.definition` | "TN VED" / "ТН ВЭД ЕАЭС" is used without a one-line dictionary-form definition ("TN VED is the EAEU's commodity nomenclature, the customs classification system used across the Eurasian Economic Union…"). AI engines cite definition-form sentences for acronyms. | Add a single definition-form sentence introducing TN VED the first time it appears (likely a new shared i18n string or a Russia-specific intro line). |

---

## 3. Claims register

Verification priority: `company.ts` (imports.russia) > verified-facts (`docs/build-prompts/logistics/logistics-import-research-findings.md`) > model knowledge.

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| TN VED 4402 20 000 0 ("of shells or nuts") is the precise subheading; 4402 90 000 0 used in practice | Correct | — | Matches research-findings RU classification line; broker DBs confirm. | research-findings (RU classification); company.ts htsCandidates |
| Both 4402 subheadings carry the same 5% EAEU base duty | Correct | — | Confirmed for 4402 90; 4402 20 line item re-confirmation flagged on-page ("re-confirm each shipment"). | research-findings; company.ts dutyLayers |
| EAEU MFN customs duty = 5% on customs value (CIF to Russian border) | Correct | — | Matches research-findings. | research-findings; company.ts |
| Indonesia removed from EAEU beneficiary list effective 12 October 2021 (EEC Council Decision No. 17 of 5 March 2021); list cut 103→29 | Correct | — | Matches research-findings (date + decision number + 103→29). | research-findings; company.ts dutyHistory |
| Import VAT (НДС) rose to 22% effective 1 Jan 2026 by Federal Law No. 425-FZ of 28 Nov 2025; no 10% reduced rate for charcoal | Correct | — | Matches research-findings (Law 425-FZ, signed 28 Nov 2025, eff. 1 Jan 2026). | research-findings (RU VAT); company.ts vat |
| Import VAT deductible by registered Russian VAT payer within 3 years (Arts. 171–172 Tax Code) | Correct | — | Matches research-findings. | research-findings; company.ts vat |
| Western lines (Maersk, MSC, CMA CGM, Hapag-Lloyd, ONE) suspended new Russia bookings effective 1 March 2022 | Correct | — | Matches research-findings (Maersk update; Hapag-Lloyd 24 Feb 2022). | research-findings; company.ts countryAgency |
| Major Russian banks off SWIFT since March 2022; settlement via non-sanctioned/intermediary banks, RUB/IDR/CNY, SPFS/CIPS | Correct | — | Matches research-findings. | research-findings; company.ts |
| EU 20th sanctions package in force 24 April 2026; added Indonesian port (Karimun Oil Terminal) | Correct | — | Matches research-findings verbatim. | research-findings; company.ts |
| Rosselkhoznadzor phytosanitary certificate required (plant-origin commodity) | Correct | — | Consistent with research-findings (ISPM-15 / phytosanitary; Rosselkhoznadzor named as NPPO to cite). | research-findings; company.ts countryAgency |
| EAC certification generally not mandatory; refusal letter (отказное письмо) expected at customs; GOST 7657-84 voluntary; TR TS 021/2011 flagged UNVERIFIED | Correct (with honest UNVERIFIED flag) | — | Matches research-findings, which itself flags TR TS 021/2011 as conflicting commercial sources. The page preserves the UNVERIFIED flag — correct GEO honesty. | research-findings; company.ts countryAgency |
| Customs clearance fee per Government Resolution No. 1638 of 23 Oct 2025 (effective 1 Jan 2026); brackets ≤200k RUB=1,231 … >10M=73,860; upper threshold raised 7M→10M | **Unverified** | Medium | NOT present in research-findings (which has no clearance-fee bracket table). Specific resolution number, bracket figures, and the 7M→10M threshold change need an external regulatory check. The page already hedges the intermediate brackets ("not itemised … confirm with your broker"), but the cited figures themselves are unverified against the audit's sources. | model/page only — route to deep research |
| Indonesia–EAEU FTA signed December 2025, promises 0% on most lines incl. charcoal, pending parliamentary ratification (rate not yet in force) | **Unverified** | Medium | research-findings names the FTA only as "the next possible change" without the Dec-2025 signing date or the 0%-on-charcoal specificity. The signing date, the 0%-charcoal coverage, and ratification status need external confirmation. Page correctly states it is NOT yet in force, which de-risks it. | model/page only — route to deep research |
| Form A still issued by Indonesia (supports future preference; does not reduce duty today) | **Unverified** | Low | research-findings says "Form A would not help" but does not confirm Indonesia still issues Form A in 2026 (GSP Form A has been widely retired). Low SEO/repute risk because the page says it does not reduce duty today. | model/page only — route to deep research |
| Transit: St Petersburg ~40–60 d, Novorossiysk ~35–55 d, Vladivostok ~18–30 d; total order→arrival 32–81 d | Correct (internally consistent) | — | Matches `commercial.transitTimes` Russia rows and `leadTime` (14–21 d). 14+18=32, 21+60=81 — arithmetic correct. Ranges are operational estimates, labeled indicative. | company.ts transitTimes/leadTime |
| FTS automated risk system can reclassify ambiguous/adulterated charcoal into Chapter 38 or flag as bamboo (4402 10) | Unverified (plausible) | Low | Not in research-findings; plausible mechanism, presented as risk guidance with "confirm with your broker". Low risk. | model/page only — optional deep research |
| MOQ = 18 tons (one 20ft container) | Correct | — | From `company.ts`; rendered via responsibility intro token. | company.ts |
| SP 978 weathering window "at least 14 days" | Correct | — | Backed by `production.weatheringDays`=14 / `logistics.dg.sp978`. Honesty-gated. | company.ts |

---

## 4. Requires deep research

Route these to the deep-research companion (markets: Russia / EAEU):

1. **Customs clearance fee — Government Resolution No. 1638 of 23 Oct 2025.** Confirm the resolution number, effective date (1 Jan 2026), the import-fee bracket table (≤200,000 RUB = 1,231 … top >10,000,000 = 73,860 RUB), and the claim that the upper threshold rose from 7M to 10M RUB. (Why: specific statutory figures not in verified-facts; Medium SEO/repute risk if wrong.)
2. **Indonesia–EAEU Free Trade Agreement.** Confirm the December 2025 signing, that it promises 0% on charcoal lines, and current ratification / entry-into-force status as of mid-2026. (Why: future-duty claim not corroborated in verified-facts; Medium risk if the 0%-charcoal coverage or signing date is wrong.)
3. **Indonesia GSP Form A in 2026.** Confirm whether Indonesia still issues Form A certificates of origin. (Why: GSP Form A has been broadly phased out globally; Low risk because the page states it gives no duty benefit today.)
4. **4402 20 000 0 line-item 5% confirmation (vs the 4402 90 confirmation already held).** The page itself flags this ("re-confirm the 4402 20 line item each shipment"); a one-time authoritative confirmation against the EEC ETT / FCS tariff would let the duty row drop the per-shipment hedge. (Why: completeness; Low risk.)

---

## 5. E-E-A-T / HCU summary

| # | Criterion | Score /10 | Justification (one line) |
|---|---|---|---|
| 1 | Authorship & expertise | 8 | Named author/reviewer/fact-checker triple from `governance.*`, with roles; visible meta table + schema `author`. |
| 2 | Topical authority | 9 | Deep, Russia-specific customs mechanics (TN VED, EAEU CCT, FTS risk system, refusal letter, Rosselkhoznadzor) — clearly specialist. |
| 3 | Technical health & freshness | 9 | `lastVerified` 2026-06-23; event-tied dates (Law 425-FZ, Resolution 1638, EU 20th package). CWV/Lighthouse not re-measured (DrMax scope). |
| 4 | Effort | 9 | Dated duty-layer stack, sourced external links per row, landed-cost worked structure, port-by-port transit, honest UNVERIFIED flags. |
| 5 | Originality | 8 | Country-specific synthesis (sanctions + carrier + banking + classification) not a generic rehash; some cross-page repetition (H3). |
| 6 | Citation quality | 9 | `ExternalLink` source per HTS candidate, duty layer, VAT, preference, and most agency rows; outbound-click tracked. |
| 7 | Freshness / timeliness | 9 | 2026-current (22% VAT, EU 20th package eff. 24 Apr 2026); reflects the latest regulatory state. |
| 8 | Page intent | 9 | Clear informational/commercial-investigation intent; feasibility-gated honesty matches a constrained lane. |
| 9 | Structure & readability | 7 | Strong tables/lists/FAQ, but body H2s are labels not questions (H1) and no steelman/mini-case (D2/D3) for a cornerstone. |
| 10 | Mobile | 8 | `max-w-3xl`, `overflow-x-auto` duty table, logical-property spacing; no JS-hidden content. Built HTML confirms full content server-rendered. |
| 11 | Format-standard adherence | 6 | Cornerstone meta table present (good), but two cornerstone-required formats missing: Devil's Advocate (D2) and Problem→Action→Result mini-cases (D3). |
| 12 | Trust & spam signals | 9 | No fabricated facts, no per-ton price, explicit legal-advice disclaimer, honesty-gated SP 978/CoA, UNVERIFIED flags retained. |

**PQ (mean of 12) = 8.33 / 10.**

**Verdict:** Helpful-first. The page answers a real importer's question set with sourced, current, country-specific data and honestly flags the lane's constraints rather than overselling it. Good-clicks prognosis: strong for buyers researching Russia feasibility; the missing cornerstone formats (steelman, mini-case) cap it just short of best-in-class but do not push it toward search-first/thin.

**Lowest-3 action steps:**
1. **Format-standard adherence (6) → add the two missing cornerstone formats:** a Problem→Action→Result mini-case (D3, e.g. misclassification-avoided) and tighten format consistency. Sourced from `imports.russia.htsNotes`.
2. **Structure & readability (7) → convert body H2s to buyer questions** (H1) and add definition-form sentence for TN VED (H5), each H2 followed by a one-sentence self-contained answer.
3. **Originality (8) → add the Devil's Advocate steelman** (D2): strongest case against the Russia lane + data-grounded rebuttal (Vladivostok routing, refusal-letter path, settlement options, pending FTA upside), which also reduces the triple-repetition (H3).

---

*End of report. Diagnose-only; no source files modified. FAQPage architecture decision (D1), the two missing cornerstone formats (D2/D3), and the four deep-research claims are TODOs for a human — none were written into the repo.*
