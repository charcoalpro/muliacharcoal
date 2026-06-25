# Content Audit — /glossary

**Run date:** 2026-06-23 · **Pillar:** supporting (semantic hub) · **Cornerstone:** no (minor page)
**Passes run:** 0, 1, 2, 3, 5 (Pass 6 OFF) · **Mode:** diagnose-only, report-only

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| Route | `/glossary` |
| Source page | `src/pages/glossary.astro` |
| Layout | `src/layouts/BaseLayout.astro` (`includeOrgSchema={false}`, `prefetch={['/contact']}`) |
| Content source | `src/i18n/en/glossary.json` (meta, hero, 11 clusters, 89 terms, 6 FAQ items, related-pillars) |
| Components | `glossary/blocks/`: GlossaryHero, ThematicTOC, AlphaJumpBar, Cluster → DefinitionItem, GlossaryFAQ, RelatedPillars; plus Breadcrumbs, CTABanner, MaybeLink |
| Schema builder | `src/lib/schema/glossaryPage.ts` → `glossaryPageSchema()` |
| Token sources | `src/lib/interpolate.ts` `companyTokens(company)` + grade specs from `src/config/grades.ts` (premium / super-premium / platinum ash, FC, burn, calorific) + `company.commercial.paymentTerms`; `t.terms.length` (termCount) |
| company.ts fields consumed | `governance.{author,reviewer,factChecker}.{name,role,lastReviewed}` (via GlossaryHero), `brand`, `commercial.portOfLoading.*`, `commercial.moq`, `commercial.leadTime`, `commercial.paymentTerms`, `commercial.containerCapacity`, `production.{ovens.count,lines,capacityTonsPerDay}`, `registration.{nib,taxId}`, `packaging.*`, `certifications.{imdg.*,iso9001.*,specsLastVerified}` |
| Pillar placement | Supporting page (semantic hub). Not a cluster child. Links DOWN to all 7 pillars via RelatedPillars + inline `see:` links from term entries. Incoming link from permanent structure: footer "Company" column (`footerCompanyNav` → `/glossary`). NOT an orphan. |
| Schema types emitted (built HTML, line 110) | `DefinedTermSet` (1), `DefinedTerm` (89), `FAQPage` (1), `Question` (6), `Answer` (6), `BreadcrumbList` (1, from Breadcrumbs component), `ListItem` (2) |
| Canonical FAQ home note | This page is NOT `/faq`; FAQPage must not emit here. SHT → `/logistics/un-1361`; COA → `/quality/certifications`; MSDS → `/logistics/documents` (the glossary entries for these correctly link down via `see:`, not via local FAQPage). |

Build was already produced; `dist/glossary/index.html` present and inspected. No unresolved `{{token}}` placeholders in the built HTML. 89 visible term `<h3 id>` anchors match 89 `DefinedTerm` nodes. All 6 FAQ Q/As render as plain `<dl>` text (not behind JS).

---

## 2. Severity-tiered TODO list

### Blockers

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| B1 | Blocker | Pass 1 — Schema architecture: "FAQPage emits ONLY at `/faq` globally" | `src/lib/schema/glossaryPage.ts` line 93 (`'@graph': [definedTermSet, faqPageSchema(faq)]`); rendered in `dist/glossary/index.html` line 110 (`"@type":"FAQPage"` ×1, with 6 Question/Answer pairs) | A `FAQPage` JSON-LD node is emitted on `/glossary`. The site rule reserves FAQPage for `/faq` only; comparison Q/As elsewhere must route to their canonical FAQ home, and a second FAQPage competes with `/faq` in Search Console. The visible Q&A block itself is fine for GEO; only the schema node is the violation. | Remove the `faqPageSchema(faq)` node from the glossary `@graph` (keep only `DefinedTermSet`). Keep the visible `GlossaryFAQ` block rendering as plain `<dl>`. If the Q/As deserve schema, relocate them to `/faq` or the canonical home page for each topic. Human decision — do not edit in this run. |
| B2 | Blocker | Pass 1 — Hardcoded company fact / honesty-gating + Pass 3 fabricated-against-source claim | `src/i18n/en/glossary.json` term `hs-code-4402-90` (lines 471–476): `termCode "HS 4402.90"`, body opens `"4402.90 is the World Customs Organization Harmonized System code … the code under which coconut-shell charcoal briquettes are declared on every export invoice and import customs entry."` Rendered verbatim in built HTML. | The HS subheading is a company-consumable fact: `company.commercial.hsCode = "4402.20"` is the canonical value (token `hsCode6` exists). This term hardcodes a **different** literal (`4402.90`) directly in i18n prose, bypassing the single-source fact, AND asserts it as the code on "every export invoice." The verified source contradicts it (see D2). A wrong fact asserted as the company's own invoice code is a trust-grade violation. | Do not write a corrected literal into i18n. Route to a human: (1) the HS value must come from `company.commercial.hsCode` via the `hsCode6` token, never a hardcoded literal; (2) the term slug, `termCode`, heading, and body must be corrected to `4402.20` ("of shells or nuts") per the verified findings. Pair with D2. |

### Defects

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 Regulatory currency / Pass 3 factual Error | `src/i18n/en/glossary.json` term `eudr` (line 542): `"Effective for large operators from 30 December 2025."` | Factually wrong. The verified research findings (`logistics-import-research-findings.md` §TL;DR pt 2 and line 106) state EUDR applies **30 Dec 2026** (large/medium) and **30 Jun 2027** (micro/small) — the one-year delay. The glossary date is a year early and now misstates a hard compliance gate for the EU/Germany market. | Correct the effective date to 30 December 2026 for large/medium operators (optionally add the 30 Jun 2027 micro/small tier). Source: `logistics-import-research-findings.md`. Human edit; verify the live EU text before committing. |
| D2 | Defect | Pass 3 factual Error (verified-facts contradiction) | `src/i18n/en/glossary.json` term `hs-code-4402-90` (lines 471–476), entire entry | The subheading is wrong. `logistics-import-research-findings.md` §TL;DR pt 1 and [UK·C1] line 19 state: classify as **4402.20.00.00 ("of shells or nuts"), never 4402.90** — GRI 3(a) gives the more-specific "of shells or nuts" subheading precedence; 4402.90 ("Other") is explicitly called wrong and seizure/penalty-risky. The term defines and recommends the wrong code, and the sibling `hs-code` term (line 468) points readers to it as the authoritative answer. | Correct the whole term to 4402.20 "of shells or nuts" (slug, termCode, heading, body). Source the value from `company.commercial.hsCode`. This is the content side of B2; treat them together. |

### Hardening

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — Headings as questions / featured-snippet lead | Cluster `<h2>` headings (e.g. "Dangerous Goods Transport & IMDG Compliance", "Technical Quality Specifications", "Incoterms & Payment") in `glossary.json` `clusters[]` | Section H2s are topic labels, not buyer questions. On a glossary this is acceptable (dictionary form is the right primary format), so this is minor-page hardening, not a defect. | Optionally add a one-line question-form intro under each cluster H2 (e.g. "Which dangerous-goods terms appear on a UN 1361 booking?") to win section-level snippets. Low priority. |
| H2 | Hardening | Pass 2 — Devil's Advocate (minor page) | Whole page | No steelman/counterargument section. On a minor reference page this is expected; flagged only per methodology completeness. | No action required for a glossary. Do not add. |
| H3 | Hardening | Pass 2 — Mini-cases (minor page) | Whole page | No Problem→Action→Result mini-cases. Not expected on a glossary. | No action required. |
| H4 | Hardening | Pass 1 Regulatory currency — freshness cadence | GlossaryHero "Last updated" = `governance.author.lastReviewed` = `2026-04-25`; several regulatory terms (`sp-978`, `imdg-amendment-42-24`, `eudr`, `dds-eudr`, `saber-gcc`, `reach-eu`) carry no per-term review date | The page-level "Last updated 2026-04-25" predates the verified-findings check date (2026-06-21) at which the EUDR date and HS subheading were confirmed. After D1/D2 are fixed, the page stamp should advance to reflect the regulatory re-verification, tied to the real event (EUDR delay; HS reclassification), not a cosmetic bump. | When D1/D2 are fixed, advance `governance.author.lastReviewed` and note the EUDR-delay / 4402.20 reclassification as the triggering event. Per-term dates not required on a glossary. |
| H5 | Hardening | Pass 2 — anti-bloat / coverage | term `ddp` (line 402) | The DDP definition restates the DAP contrast and the EXW mirror twice within one paragraph (~110 words); compressible ~20% without losing facts. | Optional tightening: state the EXW-mirror once and the DAP delta once. Low priority; factually correct. |

---

## 3. Claims register (Pass 3)

Verification priority: `company.ts` > verified-facts (`company.ts` source-links + `logistics-import-research-findings.md` + `guide-research-findings.md`) > model knowledge.

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| HS 4402.90 is "the code under which coconut-shell charcoal briquettes are declared on every export invoice" (`hs-code-4402-90`) | **Error** | High | Must be 4402.20 ("of shells or nuts"); 4402.90 explicitly called wrong (GRI 3(a)). See B2/D2. | logistics-import-research-findings.md TL;DR pt1, [UK·C1]; company.ts `commercial.hsCode = 4402.20` |
| EUDR "Effective for large operators from 30 December 2025" (`eudr`) | **Error** | High | Should be 30 Dec 2026 (large/medium), 30 Jun 2027 (micro/small). See D1. | logistics-import-research-findings.md TL;DR pt2, line 106 |
| UN 1361 = "Carbon, animal or vegetable origin", IMDG Class 4.2, PG III; SP 978 via Amendment 42-24 mandatory 1 Jan 2026; self-heating test no longer exempts (`un-1361`, `sp-978`, `imdg-amendment-42-24`, `self-heating-test-n4`) | Correct | — | company.ts `logistics.dg` (amendment 42-24, mandatoryFrom 2026-01-01, properShippingName, packingGroup III, SP 925/223 withdrawn, n4Note) |
| SP 978 replaced Special Provisions 925 and 223 (`sp-978`) | Correct | — | company.ts `logistics.dg.sp925Withdrawn`/`sp223Withdrawn` true |
| Platinum ash to Premium ash range; Platinum FC ≥82% / Premium ≥75%; calorific Platinum ≥7500 / Premium ≥7000; Platinum burn 2.5+ h (`ash-content`, `fixed-carbon`, `calorific-value`, `standby-vs-active-burn-time`) | Correct | — | grades.ts (token-resolved; no hardcoded literals) |
| Moisture capped ≤ 6% all grades; drop test ≥ 3 drops (`moisture`, `drop-test`) | Correct | — | grades.ts (moisture ≤6%, dropTest 3+) |
| FAQ: coconut 75–82% FC / 2+ h; bamboo 70–75% FC / 60–90 min; wood 60–70% FC / 30–60 min | Coconut Correct (grades.ts); bamboo & wood **Unverified** | Low | Coconut matches grades.ts. Bamboo/wood are industry-typical competitor figures, not in company.ts or research findings — illustrative. | grades.ts (coconut only); model (bamboo/wood) |
| ISF 10+2 late/inaccurate filing "USD 5,000 penalty per shipment" (`isf-10-2`) | Unverified | Medium | Plausible CBP figure but not in either verified-facts source; USA market. Route to deep research. | model |
| Lacey Act "16 USC § 3371"; coconut shell exempt from species declaration (`lacey-act`) | Unverified | Low–Medium | Citation and exemption framing plausible; not in verified-facts. USA market. | model |
| FDA Deeming Rule "21 CFR Part 1100, finalized 2016"; charcoal not a tobacco product (`fda-deeming-rule-usa`) | Unverified | Low | Plausible; not in verified-facts. USA market. | model |
| SABER PCoC "validity is one year from product registration" (`saber-gcc`) | Unverified | Medium | Saudi market gate; not stated in research findings (which confirm SABER mandatory but not the 1-yr PCoC validity). Route to deep research. | model (research confirms SABER mandatory) |
| REACH: coconut charcoal exempt as "naturally occurring substance" under Annex V; SDS still applies (`reach-eu`) | Unverified | Low–Medium | Plausible EU framing; not asserted in research findings. EU/Germany market. | model |
| Russia EAC voluntary / GOST R voluntary for charcoal (`eac-eaeu`, `gost-r`) | Unverified | Low | Consistent with research note that charcoal falls outside specific TR CU; the "voluntary" framing is model-sourced. Russia market. | model (research: outside TR CU) |
| Pyrolysis 400–700 °C over several hours (`pyrolysis`) | Unverified | Low | Industry-typical range; not in company.ts. | model |
| Pieces per kg: 25 mm ≈ 64/kg; 22×22×26 mm ≈ 80/kg (`pieces-per-kg`) | Unverified | Low | Derived/illustrative; density-dependent; not a company.ts fact. | model |
| Tempurung kelapa density ~1.4 g/cm³ raw vs ~0.5 g/cm³ wood (`tempurung-kelapa-feedstock`) | Unverified | Low | Industry-typical; not in company.ts. | model |
| NIB / NPWP rendered from tokens `{{nib}}` / `{{taxId}}` (`nib`, `npwp`) | Correct | — | company.ts `registration.nib` / `registration.taxId` (no literal in i18n) |
| Capacity: `{{ovenCount}}` kilns / `{{productionLines}}` lines / `{{capacity}}` tons/day (`carbonization-kiln`) | Correct | — | company.ts `production.*` (token-resolved) |
| Container floor ≈ `{{containerFloorTons}}` / palletized ≈ `{{containerPalletizedTons}}` tons 20ft (`floor-stuffing-vs-palletized`) | Correct | — | company.ts `commercial.containerCapacity.ft20` (derived) |
| FOB Semarang / lead-time / MOQ / payment-terms tokens in FAQ and terms | Correct | — | company.ts `commercial.portOfLoading`, `leadTime`, `moq`, `paymentTerms` (token-resolved) |
| Meta table: Author Mohamad Sinno, Reviewer Ahmet Bassam, Fact-checker Teguh Pranomo, Last updated 2026-04-25, 12 min read | Correct (present) | — | company.ts `governance.*` (fact-checker shown because name is a real fact, not a TODO) |

---

## 4. Requires deep research

Route these to the deep-research companion prompt (claim · why · markets):

1. **EUDR effective date and operator-size tiers** — to confirm the corrected date (30 Dec 2026 large/medium; 30 Jun 2027 micro/small) and whether "charcoal under HS 4402" remains in Annex I scope after the delay. Markets: Germany/EU. (Drives D1.)
2. **HS subheading for carbonized coconut-shell briquettes** — confirm 4402.20.00.00 ("of shells or nuts") is the correct declarable code across UK, EU, Saudi, Russia and that 4402.90 is wrong (GRI 3(a)). Markets: USA, UK, Germany, Saudi Arabia, Russia. (Drives B2/D2.)
3. **ISF 10+2 penalty amount** — verify the "USD 5,000 per shipment" figure for late/inaccurate ISF filings against current CBP rules. Markets: USA.
4. **SABER PCoC validity period** — verify "one year from product registration" and current SABER/SASO flow for charcoal. Markets: Saudi Arabia.
5. **REACH Annex V exemption for coconut-shell charcoal** — verify the "naturally occurring substance" exemption and residual SDS obligation. Markets: Germany/EU.
6. **FDA Deeming Rule citation** — verify "21 CFR Part 1100, finalized 2016" and that charcoal is outside its direct scope. Markets: USA.
7. **Russia EAC/GOST R status for charcoal** — verify the voluntary-declaration framing and any DG Class 4.2 carrier/ booking constraints. Markets: Russia.

---

## 5. E-E-A-T / HCU assessment (Pass 5)

| Criterion | Score | One-line justification |
|---|---|---|
| Authorship & expertise | 8 | Named author/reviewer/fact-checker (Owner, Charcoal Expert, QC Manager) from `governance.*`; real roles, real names. |
| Topical authority | 9 | 89 terms across 11 clusters covering DG, specs, products, production, packaging, Incoterms, freight, docs, Indonesia regime, destination markets, hookah — exceptional breadth for the niche. |
| Technical health & freshness | 6 | Clean static build, no JS-hidden content; but "Last updated 2026-04-25" predates the verified re-check, and B1 FAQPage misplacement is a structured-data fault. (CWV/Lighthouse not re-measured — DrMax owns.) |
| Effort | 9 | High: every definition token-bound to single-source facts; A–Z map, thematic TOC, per-term anchors and `see:` down-links. |
| Originality | 8 | Definitions are domain-specific and operator-grounded (invoice/COA/DGD framing), not generic dictionary copy. |
| Citation quality | 6 | Facts source-link via tokens internally, but two regulatory claims (EUDR date, HS 4402.90) contradict the verified findings and several market claims are model-only and undated. |
| Freshness / timeliness | 6 | Single page-level date; EUDR claim stale-and-wrong drags this down. |
| Page intent | 9 | Clear reference/semantic-hub intent; serves buyers decoding invoices, COAs, DG declarations. |
| Structure & readability | 9 | Definition-form leads, numeric data throughout, dictionary entries, plain `<dl>` FAQ — strong GEO extractability; nothing behind JS tabs/accordions. |
| Mobile | 8 | Responsive max-w containers, `scroll-mt-24` anchors, 44px-friendly nav; per CLAUDE.md budgets (not re-measured). |
| Format-standard adherence | 7 | DefinedTermSet/DefinedTerm correctly modeled and per-term `@id` anchors; **but** FAQPage emitted off `/faq` (B1) is a standard-placement breach. |
| Trust & spam signals | 6 | No spam; honesty-gating respected (meta table shows fact-checker because it's real). Pulled down by the two contradicted regulatory facts presented authoritatively on compliance-critical topics. |

**PQ (arithmetic mean of 12):** (8+9+6+9+8+6+6+9+9+8+7+6) / 12 = **7.6 / 10**

**Verdict:** Helpful-first. The page is built to inform buyers, not to game search — definition-form, numeric, single-sourced, fully crawlable. Good-clicks prognosis is strong **except** that two compliance-critical facts (EUDR date, HS subheading) are wrong and stated authoritatively, which risks bad-clicks/trust erosion from exactly the regulatory-savvy buyers the page targets. Fixing B2/D1/D2 converts this to an unambiguous helpful-first asset.

**Lowest-3 action steps:**
1. **Citation quality / Freshness (6):** Correct the EUDR date (D1) and the HS subheading (B2/D2) against `logistics-import-research-findings.md`, then advance the page "Last updated" stamp tied to that regulatory re-verification (H4). Add per-term review dates to the highest-stakes regulatory entries if cadence is formalized.
2. **Technical health / Format adherence (6–7):** Remove the FAQPage schema node from the glossary `@graph` (B1) so FAQPage emits only at `/faq`; keep the visible Q&A block.
3. **Trust signals (6):** After the two factual corrections land, the authoritative tone is justified; until then the wrong-but-confident regulatory claims are the single biggest trust risk on this otherwise strong page.

---

*End of report. No site source modified. Findings B2/D1/D2 require human edits and (for the HS/EUDR claims) deep-research confirmation before any change.*
