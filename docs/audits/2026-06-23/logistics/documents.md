# Content Audit — /logistics/documents

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report, no edits). Passes 0,1,2,3,5. Pass 6 OFF.
**Cornerstone:** No (minor cluster page — meta-table/Devil's-Advocate gaps are Hardening, not Defect).

---

## 1. Manifest (Pass 0)

| Item | Value |
|---|---|
| Route | `/logistics/documents` |
| Pillar | Logistics |
| Source page | `src/pages/logistics/documents.astro` |
| Layout | `src/layouts/BaseLayout.astro` (type=`article`, `includeOrgSchema={false}`) |
| Components | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `MaybeLink`, `FAQSection`, `CTABanner`, `KeyFactsBox` |
| i18n | `src/i18n/en/logisticsDocuments.json`, `src/i18n/en/logisticsCommon.json` (metaBlock labels) |
| Data object feeding this route | `company.logistics.documentsStandard[]` (8 items), `company.logistics.documentsAdditional[]` (4 items), `company.logistics.docsDelivery`, `company.logistics.editorial`, `company.governance` — all read from `src/data/company.json` via `src/config/company.ts` |
| Helpers | `importCountryLinks()` (`src/lib/importCountries.ts`), `companyTokens`/`logisticsTokens` (`src/lib/interpolate.ts`), `readingTime`, `logisticsClusterPageSchema` |
| `company.ts` fields consumed | `logistics.documentsStandard`, `logistics.documentsAdditional` (incl. `.cost`/`.processingTime`, honesty-gated via `hasFact`), `logistics.editorial.dateModified` (`2026-06-16`), `governance.author/reviewer/factChecker`, `commercial.portOfLoading.name` (`port` token), `brand`, `whatsapp.presetMessages.salesGeneral`, `logistics.imports.*` (country links) |
| Schema types emitted (built HTML) | `WebPage` + `FAQPage` (one `@graph`, via `logisticsClusterPageSchema`) and a separate `BreadcrumbList` (emitted by `Breadcrumbs`). No Product/Service/Article. |
| Built HTML | `dist/logistics/documents/index.html` (present; read) |

**Build status:** Build artifact already present and read; no build run per run constraints. No stop condition triggered (page resolves to exactly one route; documents list is populated — 8 standard + 4 additional).

**Pillar-cluster placement:** Cluster child of Logistics. Canonical FAQ home for the **MSDS** Q/A is this page (per run brief). SHT Q/A canonical home is `/logistics/un-1361`; COA Q/A canonical home is `/quality/certifications`. See D1 below re: the SHT/COA Q/As carried here.

---

## 2. Severity-tiered TODO list

### Blockers
*(honesty-gating violation, hardcoded company fact, fabricated/uncited claim, real orphan/broken pillar link, misplaced FAQPage, build failure, regulatory claim now factually wrong)*

**None.**

Verification notes for the cleared gates:
- **No hardcoded company facts.** Port ("Semarang"), brand, legal name (issuer values), and document counts all flow from `company.json` via tokens / config arrays. The legal name `PT Coco Reina Global Charcoal Indonesia` appears only as `doc.issuer` values inside `company.json` (the sanctioned home), not as a literal in the page or i18n. `documentsStandardCount`/`documentsAdditionalCount` are derived from array `.length` in `interpolate.ts`, so the "8 / 4" figures cannot drift from the data.
- **Honesty-gating intact.** SHT and COA `cost`/`processingTime` are empty strings in `company.json`; `hasFact()` correctly suppresses the "Lab cost / Processing time" line — built HTML contains no such label for either doc (verified). Absent cost block for absent fact = correct, not a defect. Fact-checker name is honesty-gated in `ArticleMeta` and renders only because `governance.factChecker.name` is populated.
- **No orphan / pillar links both directions.** Page links UP to `/logistics` in the first paragraph (`documents-up-hub`) and again in Related. Pillar `/logistics` links DOWN to `/logistics/documents` (`src/pages/logistics/index.astro:110`). All on-page link targets are in `LIVE_ROUTES` (`/logistics`, `/logistics/un-1361`, `/logistics/charcoal-dg-regulation`, `/logistics/rules`, `/logistics/cargo-protection-and-insurance`, the five `import-to-*`, `/glossary`, `/contact`) — no muted MaybeLinks, no broken links.
- **FAQPage placement.** `FAQPage` here is **by design** for this cluster (`logisticsClusterPage` builder emits page-specific Q/As; MSDS is the canonical FAQ home for `/logistics/documents`). Not flagged. (Tension with the generic "FAQPage only at /faq" line is noted under Hardening H4, not as a violation, because the run brief names this page as the MSDS canonical home.)

### Defects
*(factual Error from Pass 3, missing required schema type, snippet/heading/structure failures, misplaced FAQPage)*

| ID | tier | pass+rule | exact location | what's wrong | recommended fix (described) |
|---|---|---|---|---|---|
| D1 | Defect | P2 snippet / section coherence; P1 canonical-FAQ-home | FAQ item 2 "Do you provide a Self-Heating Test report and a COA?" (`logisticsDocuments.json` faq.items[1]); rendered in `#documents-faq` and in `FAQPage` `@graph` | This Q/A bundles **SHT** (canonical FAQ home `/logistics/un-1361`) and **COA** (canonical FAQ home `/quality/certifications`) into a FAQPage Q/A emitted on `/logistics/documents`. The brief assigns only the **MSDS** Q/A to this page. Carrying SHT+COA as schema-bearing FAQ here duplicates FAQ ownership across cluster pages (the same Q/A class can compete for the snippet from the wrong canonical home). | Keep the on-page prose answer (buyers need it here), but stop emitting this specific Q/A into the page's `FAQPage` `mainEntity`. Move the schema-bearing SHT Q/A to `/logistics/un-1361` and the COA Q/A to `/quality/certifications`, leaving only the MSDS-class Q/A (item 1, item 3) in this page's FAQPage. Decision/human action — do not edit. |
| D2 | Defect | P3 factual accuracy (Medium) | Section "Documents your destination requires" body (`countryReq.body`): "the EU and Australia require a phytosanitary certificate" | Verified findings (`logistics-import-research-findings.md` §S2, lines 255-257) support only **ISPM-15 wood-packaging** treatment for pallets/dunnage across the four researched markets — not a goods-level **phytosanitary certificate** for the (carbonized, non-plant-state) charcoal itself. **Australia is not in the research set at all.** The sentence risks conflating ISPM-15 (wood packaging) with a product phytosanitary certificate and asserts an unverified Australia requirement. (The additional-doc entry `fumigation-phytosanitary` is correctly hedged — "for wood packaging or plant-origin goods"; the body sentence is the looser claim.) | Reword to distinguish ISPM-15 treated wood packaging (verified) from any product phytosanitary certificate (unverified for charcoal); drop or source the Australia-specific claim. Route to deep research (R1) before rewrite. Human action. |

### Hardening
*(anti-bloat, missing mini-cases, freshness cadence, connectivity gaps, minor-page omissions, headings-as-questions)*

| ID | tier | pass+rule | exact location | what's wrong | recommended fix (described) |
|---|---|---|---|---|---|
| H1 | Hardening | P2 headings-as-questions | H2s "Standard documents (every shipment)" (`standardHeading`), "On request (paid add-ons)" (`additionalHeading`), "Documents your destination requires" (`countryReq.h2`) | Statement-form H2s. On a documents reference page this is acceptable, but question-form headings improve AI/snippet extraction. | Offer optional question variants (e.g. "Which documents ship with every container?", "Which documents are paid add-ons?", "Which documents does my destination country require?"). Minor page → optional. |
| H2 | Hardening | P2 Devil's Advocate | Whole page | No steelman/counter-argument section. Expected absent on a minor reference page; noted only for completeness. | None required (minor page). Do not add bloat. |
| H3 | Hardening | P2 featured-snippet lead / GEO definition-form | Top of `<article>` (`intro.p1`) | The page has no single definition-form sentence for its head term ("An export document pack is…"). The KeyFactsBox definition ("What ships with your container…") and hero ("We issue 8 standard documents…") partly cover it, but a crisp dictionary-form lead would lift AI citation. | Optionally add one definition-form sentence under the H1 / in the intro. Optional, minor page. |
| H4 | Hardening | P1 schema architecture note (informational) | `logisticsClusterPageSchema` → `FAQPage` node on every logistics child | Architectural tension worth a human decision: the cluster builder emits `FAQPage` on each child, which conflicts with the generic "FAQPage only at /faq" guidance. The brief resolves it (MSDS canonical home = this page), so it is **not** a violation here — but D1 shows the per-page model invites Q/A-ownership overlap. | No action on this page beyond D1. Flagged so the cluster-wide FAQ-ownership map is reviewed once, not page-by-page. |
| H5 | Hardening | P1 regulatory currency (cadence) | `ArticleMeta` Last updated = `logistics.editorial.dateModified` `2026-06-16`; SP 978 (`dgdNote`), Class 4.2 / PG III (DGD `buyerUse`), SHT-after-2026 (`shtNote`) | Dating is fresh (7 days old) and the SP 978 mandatory-from-1-Jan-2026 event is real, so currency is fine today. Watch: these regulatory claims share one editorial `dateModified` not tied per-claim to its own regulatory event — a future cosmetic bump would not signal which claim was re-verified. | Keep `dateModified` tied to a real content/regulatory change, not an annual cosmetic bump. No change needed now. |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "We issue 8 standard documents with each container and 4 more on request" / counts in KeyFacts & FAQ | Correct | Low | `documentsStandard.length`=8, `documentsAdditional.length`=4; counts derived, cannot drift | company.ts / company.json |
| Standard pack = commercial invoice, packing list, B/L, COO, MSDS, DGD, vanning certificate, PEB | Correct | Low | Matches `documentsStandard[]` exactly; aligns with research doc lists (§UK/EU/SA) | company.json; verified-facts (research-findings L60,119,176) |
| DGD "Declares UN 1361, Class 4.2, Packing Group III and the SP 978 data fields" | Correct | Medium | UN 1361 / IMDG Class 4.2 / PG III / SP 978 confirmed; SP 978 mandatory from 1 Jan 2026 | verified-facts (research-findings L3,22,114) |
| "SP 978 data fields — production date, packing date, and the temperature on the day of packing" (dgdNote) | Unverified | Medium | SP 978 existence/mandate verified; the exact three enumerated data fields not line-item confirmed in the cited findings | model / route to research |
| SHT report "is supporting hazard evidence, not a route to non-DG status" / "no longer exempts the cargo from DG rules" | Correct | Medium | Consistent with the post-2026 SHT reframe in the cluster; held–per-order distinction preserved (SHT is a per-order lab add-on, not a held cert) | verified-facts (cluster reframe) |
| COO issuer "Ministry of Trade via an appointed IPSKA agency (e-SKA)" | Correct | Low | Matches `coo.issuer` (e-SKA / IPSKA) | company.json (coo) |
| "US entries need ISF data from us up front" / "before the cargo loads" | Correct | Low | ISF ("10+2") ≥24h before lading; importer files, factory supplies underlying data | company.json (imports.usa.entryNotes.isf) |
| "GCC and African markets often add chamber-of-commerce and consular legalization" | Partly verified | Medium | Chamber-attested COO confirmed for Saudi Arabia; **consular legalization** and the "African markets" generalization are not in the verified set | company.json (SA chamber) / consular = model → research |
| "the EU and Australia require a phytosanitary certificate" | Error/Unverified | Medium | See D2 — findings support ISPM-15 wood packaging only; Australia unresearched; goods-level phytosanitary cert for carbonized charcoal not established | verified-facts contradicts scope (research-findings §S2) → research |
| "Scans first; originals by courier" (KeyFacts delivery) | Correct | Low | `docsDelivery.scansFirst=true`, `originalsByCourier=true` | company.json (docsDelivery) |
| Vanning certificate issuer "Marine surveyor (Carsurin / Beckjorindo)" | Unverified | Low | Surveyor names are operational facts in config; not independently cross-checked here | company.json (documentsStandard) |
| Author "Mohamad Sinno" / Reviewer / Fact-checker in ArticleMeta + WebPage schema | Correct | Low | All from `company.governance`; honesty-gated | company.json (governance) |
| Last updated `2026-06-16` | Correct | Low | = `logistics.editorial.dateModified`; fresh | company.json (logistics.editorial) |

---

## 4. Requires deep research

| ID | Claim | Why | Markets |
|---|---|---|---|
| R1 | "the EU and Australia require a phytosanitary certificate" | Findings cover ISPM-15 wood packaging only; no goods-level phytosanitary cert established for carbonized coconut-shell charcoal, and Australia is outside the researched set. Could overstate a buyer obligation. | Germany/EU, Australia |
| R2 | "GCC and several African markets require chamber-of-commerce and consular **legalization**" | Chamber-attested COO is verified for Saudi Arabia; **consular legalization** as a current GCC requirement and the broad "African markets" claim are unverified. | Saudi Arabia / GCC, Africa |
| R3 | SP 978 data fields = "production date, packing date, and the temperature on the day of packing" | SP 978 mandate verified; the exact enumerated data fields need a primary IMDG/SP 978 citation before they are stated as definitive. | All DG destinations |

---

## 5. E-E-A-T / HCU summary

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 8 | Named author/reviewer/fact-checker (Owner/Director, Charcoal Expert, QC Manager) from config; roles fit a factory documents page. |
| Topical authority | 8 | Issuer + buyer-use + provided-when per document; correct Indonesian export chain (PEB, e-SKA/IPSKA, surveyor vanning cert). |
| Technical health & freshness | 8 | `dateModified` 2026-06-16 (7 days old); valid WebPage+FAQPage+Breadcrumb. CWV/Lighthouse not re-measured (DrMax scope). |
| Effort | 8 | 12 documents individually detailed, glossary cross-links, destination-requirements section, country guide grid. |
| Originality | 8 | Indonesia-specific document chain and DG framing — not boilerplate. |
| Citation quality | 6 | On-page prose carries no inline source attributions; the two looser country claims (D2/R1, R2) are unsourced. |
| Freshness / timeliness | 8 | Recent; SP 978 1-Jan-2026 event reflected. |
| Page intent | 9 | Clean match to "what export documents do I get for coconut charcoal" — informational + lead-gen. |
| Structure & readability | 8 | Logical H2/H3 outline, KeyFacts box, per-doc sections, FAQ. H2s are statement-form (H1). |
| Mobile | 8 | Responsive grids (`sm:grid-cols-2`), max-w-prose; no JS-gated content. |
| Format-standard adherence | 8 | GEO meta table present, numeric data present, definition in KeyFacts; nothing hidden behind tabs/accordions. |
| Trust & spam signals | 8 | Honesty-gated cost/fact-checker, no fabricated specifics, held-cert vs per-order distinction preserved. |

**PQ (mean of 12) = 7.92 / 10.**

**Verdict:** **Helpful-first.** The page answers the buyer's documents question directly, leads with numeric facts, and degrades honestly (no invented lab costs). Good-clicks prognosis. The two soft factual overreaches (D2/R1 phytosanitary, R2 consular legalization) are the only reputation risk.

**Lowest-3 action steps:**
1. **Citation quality (6):** attach primary-source references (or hedge) to the country-requirements claims, especially the phytosanitary and consular-legalization sentences; resolve R1–R3 before re-publishing those lines.
2. **Topical authority / D1 FAQ ownership (8 but with a structural defect):** move the schema-bearing SHT and COA Q/As to their canonical homes (`/logistics/un-1361`, `/quality/certifications`); keep MSDS-class Q/A here. Keep the prose answers on-page.
3. **Structure & headings (8):** optionally convert the three statement H2s to question form for snippet extraction; add one definition-form lead sentence for "export document pack."
