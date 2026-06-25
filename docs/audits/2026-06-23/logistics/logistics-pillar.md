# Content Audit — /logistics (Logistics pillar hub, cornerstone)

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report; no fixes). Passes 0,1,2,3,5. Pass 6 OFF.
**Auditor scope:** content layer only. Technical mechanics (canonical/hreflang syntax, JSON-LD validity, robots/sitemap, security headers, CWV/Lighthouse numbers) are OUT OF SCOPE and not reported here. Schema TYPE & PLACEMENT is in scope.

---

## 1. Manifest

| Item | Value |
|---|---|
| Route | `/logistics` |
| Pillar | logistics (this page IS the pillar hub) |
| Cornerstone | YES |
| Source file | `src/pages/logistics/index.astro` |
| Layout | `src/layouts/BaseLayout.astro` (`includeOrgSchema={false}`, `schema={logisticsHubSchema(...)}`, `prefetch={['/contact']}`) |
| Components rendered | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `KeyFactsBox`, `PhotoGrid`, `MaybeLink`, `ExternalLink`, `FAQSection`, `CTABanner` |
| i18n namespaces | `en.logistics` (logistics.json), `en.logisticsCommon` (logisticsCommon.json) |
| Schema builder | `src/lib/schema/logisticsHub.ts` |
| Token sources | `companyTokens()` + `logisticsTokens()` in `src/lib/interpolate.ts`; values from `src/data/company.json` |
| company.ts fields consumed | `commercial.portOfLoading` (+alternates), `commercial.transitTimes`, `commercial.containerCapacity`, `commercial.leadTime`, `commercial.hsCode`, `commercial.moq`, `certifications.imdg` (UN no./class/desc), `logistics.incoterms`, `logistics.dg.*` (packingGroup, properShippingName, mandatoryFrom, carriersAudited/NotAccepting, sp978.packingTempMaxC, sp978.headspaceCm, sp925/223Withdrawn), `logistics.documentsStandard`/`documentsAdditional` (counts), `logistics.transitTimesLastUpdated`, `logistics.editorial`, `governance.author/reviewer/factChecker`, `whatsapp.presetMessages.salesGeneral`, `waLinkFor('quoteSpecs')` |
| **Schema types emitted (built HTML)** | `CollectionPage`, `FAQPage` (from logisticsHubSchema `@graph`); `BreadcrumbList` (from visual `<Breadcrumbs>`) |
| Build status | dist HTML present and current (`dist/logistics/index.html`, 90 KB). No build run by auditor. No unresolved `{{tokens}}` in output. |
| Pillar uplink | N/A — this page is the pillar itself. Down-links: 7 child-entity sections + DG cross-links + 18-item Related block, all resolving to LIVE_ROUTES. |
| Incoming internal link (orphan check) | Not an orphan — `footerOperationsNav` in `src/config/nav.ts` links `/logistics` site-wide. |

**Resolution:** TARGET resolves to exactly one page. No stop condition.

---

## 2. Severity-tiered TODO list

### Blockers
*(honesty-gating violation, hardcoded company fact, fabricated/uncited claim, real orphan/broken pillar link, misplaced FAQPage, build failure, regulatory claim now factually wrong)*

**None.**

Notes on items explicitly checked and cleared (NOT blockers — recorded so they are not re-raised):
- **No hardcoded company facts.** Every fact value (port `Semarang`/`IDSRG`, `Tanjung Emas`, MOQ `18 tons`, payloads `18`/`26 tons`, lead time `14–21 days`, incoterms, UN 1361 / Class 4.2 / PG III, SP 978 `40 °C`/`30 cm`, doc counts `8`/`4`, carrier names, transit day-ranges, governance names/roles) renders from `company.json` via `fill()`/tokens. The only literals in the `.astro` are two outbound authority URLs (`IMO_IMDG_URL`, `EXPORT_AUTHORITY_URL`) — external references, not company facts. PASS.
- **FAQPage placement is correct for this site.** The prompt's literal "FAQPage emits only at /faq" does not match the shipped architecture: FAQPage is the site's hub-canonical pattern (also emitted on `/packaging`, `/quality`, `/guide`, `/logistics/un-1361`, `/quality/certifications`, `/logistics/documents`). The methodology's operative rule is *canonical FAQ home per Q/A* (SHT→un-1361, COA→certifications, MSDS→documents). The 7 hub FAQ Q/As here (port, transit, order-to-port, FCL/LCL, incoterms, customs, 40ft) do **not** duplicate any SHT/COA/MSDS canonical-home Q/A. No collision → not a misplaced FAQPage. PASS.
- **Honesty-gating intact.** `carriersAudited` renders only because the array is populated; SHT/COA shown as "On request (paid add-on)" (per-order report), kept distinct from held certifications; self-heating fire consistently stated as *excluded / inherent vice / not insurable* — never smoothed into "covered." PASS.

### Defects
*(factual Error from Pass 3, missing required schema type, snippet/heading/structure failures, missing Devil's Advocate on cornerstone, missing GEO meta table on cornerstone)*

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 2 — Devil's Advocate (cornerstone) | Entire page; no such section exists between the DG overview (`#dangerous-goods`) and the FAQ (`#logistics-faq`). Built HTML has zero counterargument/steelman/objection markers. | Cornerstone rule requires a steelman of the strongest industry counterargument with a data-grounded rebuttal. The page never states the obvious buyer objection (e.g. "a supplier offered me cheaper non-DG / LCL freight" or "DG shipping is slower and dearer, why accept it") and rebuts it. | Add an i18n-driven "The honest counterargument" section after `#dangerous-goods`: steelman the cheaper non-DG/LCL offer and the DG cost/time premium, then rebut with the SP 978 misdeclaration-liability point already present in the dgRegulation facts. Source all facts from `logistics.dg.*`; do not introduce new literals. (Describe-only — not executed.) |
| D2 | Defect | Pass 2 — Mini-cases (cornerstone) | Entire page; no Problem→Action→Result structure present. Built HTML has zero problem/action/result/case markers. | Prompt's CORNERSTONE rule requires 1–2 Problem→Action→Result mini-cases with a measurable result. Absent. (On a non-cornerstone page this would be Hardening; the cornerstone mandate elevates it to Defect for this route.) | Add one anonymized P→A→R mini-case (e.g. "Buyer booked LCL with another supplier → sailing refused at origin as undeclared Class 4.2 → re-booked FCL DG, cleared in N days"). Keep all numbers token-sourced or clearly illustrative; do not fabricate a named customer. |

### Hardening
*(anti-bloat, missing mini-cases on minor pages, freshness cadence, connectivity gaps, minor-page omissions, snippet polish)*

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — headings as questions | H2s: "Shipping rules & incoterms", "Export documents", "Carriers that ship charcoal", "Cargo protection & insurance", "Importing charcoal to the USA", "Importing charcoal by country", "Transit times from Semarang", "From order to your port", "Dangerous goods, in one paragraph" | 6+ of the 12 H2s are noun-phrase labels, not the question a buyer types. Only `un1361` and `cargoProtection` use question form. Reduces featured-snippet/PAA capture. | Where the section answers a discrete buyer question, offer a question-form H2 variant in i18n (e.g. "Which incoterms do you offer?", "What documents ship with my container?", "Which carriers accept charcoal?", "How long is transit from Semarang?"). Hub-label form is acceptable for navigational sections; prioritize the answer-bearing ones. |
| H2 | Hardening | Pass 1 — regulatory currency | `#dangerous-goods` body2 and `un1361`/`dgRegulation` facts: "incidents are rare"; SP 978 specifics "≤ 40 °C packing temperature", "30 cm container headspace", "Withdrew Special Provisions 925 and 223". `logistics.dg.lastVerified = 2026-06-15`. | The SP 978 numeric specifics and the 925/223 withdrawal are config-sourced with provenance (`dg.sourceUrls`, `lastVerified`), but the repo research file (`logistics-import-research-findings.md`) corroborates only the *regime* (UN 1361 / Class 4.2 / SP 978 mandatory 2026-01-01), not the exact 40 °C / 30 cm values or the 925/223 numbers. "incidents are rare" is an unquantified editorial assertion with no backing datapoint. | Route the SP 978 numerics + 925/223 withdrawal to deep research against primary IMDG Amendment 42-24 / Res. MSC.556(108) text (see §4). For "incidents are rare," either attach a citable safety statistic or soften to a non-quantitative phrasing; it carries no measurable backing today. No repo edit proposed here. |
| H3 | Hardening | Pass 2 — anti-bloat / featured-snippet lead | `atAGlance.definition` (KeyFactsBox lead) and `intro.p1` | Mild overlap: both restate "every stage between a confirmed order and a container on your dock / what loads, how classified, what docs, how long." The at-a-glance definition and intro.p1 cover near-identical ground in different words. | Tighten `intro.p1` to add net-new framing (e.g. lead with the single-sentence definition of the pillar) rather than re-listing the at-a-glance scope. ~20% compressible without fact loss. |
| H4 | Hardening | Pass 5 — freshness cadence | Meta block + schema `dateModified` use `transitTimesLastUpdated = 2026-06-22`; `editorial.datePublished = editorial.dateModified = 2026-06-16`. | The visible "Last updated" and schema `dateModified` (2026-06-22) diverge from `editorial.dateModified` (2026-06-16). Intentional (transit refresh is the hub freshness signal) but the two date sources can drift apart over time and confuse a future editor. | Document/confirm the intent that `transitTimesLastUpdated` is the canonical hub freshness date and `editorial.dateModified` is a floor; consider bumping `editorial.dateModified` in lockstep on substantive content edits so the two never contradict. Config-level note, no page change. |

---

## 3. Claims register

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| Port of loading Semarang (IDSRG) / Tanjung Emas; alternates Surabaya (IDSUB), Tanjung Priok / Jakarta (IDJKT) | Correct | Low | Matches `commercial.portOfLoading`. | company.ts (company.json) |
| MOQ 18 tons = one 20ft container | Correct | Low | Matches `commercial.moq`. | company.ts |
| 20ft 18 tons net; 40HQ 26 tons net | Correct | Low | Matches `commercial.containerCapacity` (ft20.fullKg 18000, ft40.fullKg 26000). | company.ts |
| Incoterms EXW / FOB / CFR / CIF, default FOB; "CIF available on request" | Correct | Low | Matches `logistics.incoterms` + `portOfLoading.incoterm`. CIF present in array; FAQ frames it as on-request. Consistent with config. | company.ts |
| UN 1361, Class 4.2, Packing Group III, "spontaneous combustion" | Correct | Low | Matches `certifications.imdg` + `logistics.dg.packingGroup`. | company.ts + verified-facts (findings confirm UN 1361 / Class 4.2) |
| IMDG Amendment 42-24 mandatory 1 January 2026; declared DG is the only lawful route; no compliant non-DG route | Correct | Medium | `dg.mandatoryFrom = 2026-01-01`; research findings confirm "Same IMDG/SP 978 regime … mandatory 1 Jan 2026" (lines 114, 171, 227). Today 2026-06-23 → claim is currently in force. | company.ts + verified-facts (logistics-import-research-findings.md) |
| SP 978 sets weathering, ≤ 40 °C packing temperature, 30 cm container headspace | Unverified | Medium | Config-sourced (`sp978.packingTempMaxC=40`, `headspaceCm=30`) with provenance + `lastVerified 2026-06-15`, but the repo findings file does not independently corroborate the exact numerics. Route to external check vs primary 42-24 text. | company.ts (provenance present); NOT in findings doc |
| Withdrew Special Provisions 925 and 223; self-heating test no longer exempts | Unverified | Medium | Config-sourced (`sp925Withdrawn=true`, `sp223Withdrawn=true`); not corroborated in repo findings. Route to external check. | company.ts; NOT in findings doc |
| Carriers booked directly: MSC, Maersk, CMA CGM, Emirates, Asyad; several major lines have declined | Unverified | Medium | Renders from `dg.carriersAudited`/`carriersNotAccepting` (honesty-gated; populated). Named carriers' current DG-charcoal acceptance policy is volatile and not in repo verified-facts. | company.ts |
| 8 standard export documents + 4 on request; standard pack lists CI, packing list, B/L, COO, MSDS, DGD, vanning cert | Correct | Low | Counts derive from `documentsStandard.length` (8) / `documentsAdditional.length` (4). Named docs match the documents contract. | company.ts |
| Production lead time 14–21 days | Correct | Low | Matches `commercial.leadTime` (min 14 / max 21). | company.ts |
| Ocean transit 18–60 days span; per-port ranges (Jeddah 25–35 … Vladivostok 18–30 … St Petersburg 40–60) | Correct (internally) | Low | Span min 18 / max 60 correctly derived from `commercial.transitTimes`; each row matches config. Ranges themselves are "indicative" and caveated; not independently re-verified (acceptable — labeled indicative). | company.ts |
| HS 4402.20 for coconut charcoal | Correct | Low | Matches `commercial.hsCode`; findings treat 4402 as the heading. | company.ts + verified-facts |
| Self-heating fire is inherent vice and is not insurable; excluded from marine cover | Correct | Low | Consistent with `insurance.exclusions`; held-cert vs report and covered-vs-excluded distinctions preserved. | company.ts |
| Hookah charcoal is FDA-regulated as a tobacco-product component (USA section) | Unverified | Low | Summary claim; depth lives on `/logistics/import-to-usa`. FDA deeming applies to components; confirm current scope on the child page audit. | model / child page |
| "incidents are rare" (self-heating) | Unverified | Low | Editorial assertion, no quantified backing. See H2. | none (model) |
| Governance: Authored by Mohamad Sinno (Owner & Director); Reviewed by Ahmet Bassam; Fact-checked by Teguh Pranomo | Correct | Low | Renders from `governance.*`; fact-checker cell shows because name is not a TODO placeholder. | company.ts |

---

## 4. Requires deep research

Route these to the deep-research companion (verify against primary regulatory/authority sources; the repo has provenance URLs but no independent corroboration in `logistics-import-research-findings.md`):

1. **SP 978 numeric controls** — "≤ 40 °C packing temperature" and "30 cm container headspace." Verify against IMDG Amendment 42-24 / Special Provision 978 primary text. Markets: all (global IMDG). Why: rendered as fact on a cornerstone; findings file confirms the regime but not these exact numerics.
2. **Withdrawal of Special Provisions 925 and 223** — confirm both were withdrawn by Amendment 42-24 and that the self-heating test no longer grants exemption. Markets: all. Why: load-bearing to the "no compliant non-DG route" thesis; not in repo findings.
3. **Carrier DG-charcoal acceptance** — current policy of MSC, Maersk, CMA CGM, Emirates, Asyad (accepting) and Hapag-Lloyd, ONE, Cosco, ZIM (declining). Markets: all. Why: carrier policies change; named in prose; not in verified-facts.
4. **"incidents are rare"** — find a citable Class 4.2 / charcoal self-heating incident statistic, or recommend softening. Markets: all. Why: unquantified safety claim.
5. **FDA position on hookah charcoal as tobacco-product component (USA)** — confirm current deeming scope. Markets: USA. Why: summary claim; resolve on `/logistics/import-to-usa` audit.

---

## 5. E-E-A-T / HCU assessment

| Criterion | Score /10 | One-line justification |
|---|---|---|
| Authorship & expertise | 8 | Full ArticleMeta triple (author/reviewer/fact-checker) renders from `governance.*`; named owner-director + charcoal consultant + QC manager. |
| Topical authority | 9 | Comprehensive hub: 7 cluster entities, DG regime, transit, timeline, insurance, import — strong coverage of the logistics domain. |
| Technical health & freshness | 8 | Out-of-scope mechanics not re-measured; content-level freshness good (Last updated 2026-06-22). Minor date-source divergence (H4). |
| Effort | 9 | High; dense, structured, fully fact-bound, 12-row transit table with per-row extractable sentences. |
| Originality | 7 | Distinctive honesty framing (DG-as-default, inherent-vice exclusion). Loses points: no mini-case, no steelman = no original lived-experience layer (D1/D2). |
| Citation quality | 7 | Two authoritative outbound refs (IMO, Bea Cukai); internal cross-links strong. Several regulatory numerics not yet citation-backed in-repo (§4). |
| Freshness / timeliness | 8 | 2026 regime correctly reflected; transit refresh dated 2026-06-22; "incidents are rare" undated/unquantified. |
| Page intent | 9 | Clearly a B2B logistics hub; matches buyer planning intent; trust signals above the fold. |
| Structure & readability | 8 | Clean heading hierarchy, definition-form sentences, no JS-hidden content; H2 question-form inconsistency (H1) costs points. |
| Mobile | 8 | Logical Tailwind classes, responsive grids, sticky CTA via layout; no content gated behind JS. (Mechanics out of scope.) |
| Format-standard adherence | 8 | GEO meta table present, KeyFactsBox, FAQ Q&A form, numeric-dense. Missing cornerstone steelman + mini-case lowers it (D1/D2). |
| Trust & spam signals | 9 | No fabricated facts; honesty-gating intact; held-cert vs per-order-report distinction preserved; no keyword stuffing. |

**PQ (mean of 12):** (8+9+8+9+7+7+8+9+8+8+8+9)/12 = **98/12 = 8.17 → 8.2/10**

**Verdict:** **Helpful-first.** The page is built to answer real buyer planning questions with extractable, fact-bound content and honest framing of a regulated-cargo reality competitors hide. Good-clicks prognosis is strong; bad-clicks risk is low. The two cornerstone gaps (no Devil's-Advocate steelman, no Problem→Action→Result mini-case) are what hold it back from a top-decile cornerstone score — they are the difference between "comprehensive reference" and "demonstrated experience."

**Lowest-3 action steps:**
1. **Originality / Format-standard (7–8):** Add the Devil's-Advocate steelman section (D1) — steelman the cheaper non-DG/LCL offer, rebut with the SP 978 misdeclaration-liability fact already on the page.
2. **Citation quality (7):** Resolve §4 items 1–3 — back the SP 978 numerics, the 925/223 withdrawal, and the carrier list with primary-source citations (or soften where unverifiable).
3. **Originality (7):** Add 1–2 Problem→Action→Result mini-cases (D2) with a measurable result, keeping numbers token-sourced or clearly illustrative.

---

*End of report. No site source modified. Awaiting human approval before any fix.*
