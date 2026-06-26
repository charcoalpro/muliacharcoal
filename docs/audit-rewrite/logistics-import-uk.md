# Content Audit & Targeted Rewrite — Import to the UK
**Route:** /logistics/import-to-uk · **Source:** src/i18n/en/logisticsImportUk.json, src/i18n/en/logisticsImportCommon.json (en.logisticsImportUk)

This is a procedural/reference page (the `import-to-[country]` template). The `.astro` top comment encodes deliberate decisions that the audit honors: per-ton price never published (landed-cost example is FOB-illustrative only), VAT/origin-preference layers render only when present, the FDA→`countryAgency` generalisation with a standalone disclaimer, and the lead-time/trade-term/responsibility blocks rendering on every country. Production is English-only (ACTIVE_LOCALES=['en']), so all per-locale/hreflang/RTL checks are N/A. Every regulatory number, code, and source on the page was cross-checked against `company.json › logistics.imports.uk` and verified present.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | The four-item FAQ is fully in buyer-question form. The body H2s are statement labels ("Commodity-code classification", "Duty & import VAT", "The entry process", "UK ports & routing", "Who handles what"). They map cleanly to buyer questions but are not phrased as them. Low-risk for a reference page, but question-form H2s lift snippet/PAA eligibility. See rewrites §3. |
| 2. Featured-snippet lead | PASS | Every body section opens with a self-contained 1-2 sentence answer before elaborating: HTS ("falls under UK heading 4402. The correct, most specific code is 4402 20 00 00…"), Duty ("a short, stable stack: a 0% customs duty layer plus 20% import VAT"), Landed ("Landed cost is the sum of the goods, the freight, and the import charges"), Entry ("follows the standard HMRC sequence…"), Responsibility ("We export and document; you and your customs broker clear and deliver"). Strong. |
| 3. Paragraph intent | PASS | Every paragraph serves one identifiable importer intent (classify correctly, compute duty/VAT, sequence the CDS entry, split FOB responsibility, confirm FLEGT scope). Intent map in §2. No stray paragraphs. |
| 4. No fluff + anti-bloat | PASS | Spec-dense throughout; almost no filler. One borderline: the VAT FAQ answer restates the "5% fuel rate does not apply" reasoning that also appears verbatim in `company.json` `vat.recoverableNote` — but the FAQ is the only place that reasoning renders to the buyer in the answer flow (the recoverableNote renders in the duty section), so it is reinforcement across two contexts, not in-section duplication. Acceptable. |
| 5. Section purity | PASS | Each H2 holds one intent cluster. FLEGT/REACH/phytosanitary correctly consolidated under the `countryAgency` H2; VAT correctly nested under Duty (it is part of the landed-charge stack). No cluster bleed. |
| 6. Structure | PASS | Logical flow: classify → duty/VAT → landed cost → entry steps → DG handling → regulator → lead time → ports → FAQ → related. No gaps; coverage is complete for a UK import-procedure page. The `keyFacts` "at a glance" box front-loads the extractable answers. |
| 7. Devil's Advocate | N/A | Procedural/reference page with no arguable thesis to oppose. See §4. |
| 8. Quantified evidence | PASS | Claims are backed by on-page/config numbers: 0% duty, 20% VAT, HS 4402 20 00 00, 30–42 day transit (Felixstowe/London Gateway/Southampton), 14–21 day production, DCTS graduation date 1 Jan 2027, UKTR codes checked (4401/4407/4409/4412). No unquantified benefit claims. |
| 9. Mini-cases | N/A | No real customer-case data exists for this page; correctly none invented. Template carries no case slot. |
| 10. Ontological completeness | PASS | Dense entity graph: HS 4402.20 vs 4402.90 (taxonomy), UN 1361 Class 4.2 (DG taxonomy), HMRC/CDS/GVMS/OPSS/APHA/Defra (UK authorities), DCTS/FLEGT-VPA/UKTR (trade-regime entities), PVA (tax mechanic), factory-as-source via FOB Semarang + CoA + SP 978. Genesis/Taxonomy/Pragmatics all explicit — see §5. |

**Net:** a strong, honesty-audited reference page. The only genuine lift is Rule 1 (question-form H2s); everything else passes.

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "This page sits under the…" (intro) | Orientation: is this the procedure guide vs the market/commercial page | keep |
| "UK import at a glance" (keyFacts) | Snippet/extraction: code, duty, VAT, who clears | keep |
| "The division of labour for a…" (responsibility) | "who pays / who clears coconut charcoal UK import" | keep |
| "Coconut-shell charcoal falls under UK heading 4402" (hts) | "HS code coconut charcoal UK / 4402.20 vs 4402.90" | keep |
| "UK duty on heading 4402 is a short, stable stack" (duty) | "import duty coconut charcoal UK / 4402 duty rate" | keep |
| "Indonesia is eligible under the DCTS…" (preference) | "DCTS / GSP preference Indonesia charcoal UK" | keep |
| "The UKGT MFN rate for heading 4402 has been 0%…" (dutyHistory) | "is UK charcoal duty changing / DCTS graduation 2027" | keep |
| "Landed cost is the sum of…" (landed) | "landed cost UK import coconut charcoal" | keep |
| "UK entry for a UN 1361 container…" (entry) | "CDS entry process / how to clear charcoal UK customs" | keep |
| "The cargo arrives as declared UN 1361…" (dgHandling) | "dangerous goods handling UK port Class 4.2 charcoal" | keep |
| "UK REACH applies to substances…" / "UK Timber Regulation (UKTR) / FLEGT" / "Phytosanitary (APHA / BTOM)" (countryAgency) | "does FLEGT / REACH / phytosanitary apply to coconut charcoal UK" | keep |
| "Regulatory information, not legal advice" (disclaimer) | Trust/liability boundary | keep |
| "Production takes about… sea transit from…" (leadTime) | "how long Indonesia to UK shipping coconut charcoal" | keep |
| "Indicative ocean transit from… to the main UK gateways" (ports) | "Indonesia to Felixstowe / Southampton transit time" | keep |
| FAQ ×4 ("What duty applies…", "Is UK import VAT recoverable…", "Do UK timber or FLEGT rules apply…", "How long does shipping… take") | Long-tail buyer questions / PAA / AI citation | keep |
| "Import guides for other markets" + "Related topics" | Internal linking / cocoon | keep |

No section is fluff, compress-worthy, or delete-worthy. The page earns its length.

## 3. Targeted rewrites

Only Rule 1 (headings-as-questions) yields real, paste-ready gaps. Each H2 below is rewritten to the direct question the wholesale buyer asks, while keeping the existing snippet lead intact. These are optional polish on an already-passing page — apply if you want maximum PAA/AI-answer eligibility; the statement forms are not wrong.

**Rule 1 — `hts.h2`**
Current: `"h2": "Commodity-code classification"`
Corrected: `"h2": "What HS commodity code is coconut charcoal under in the UK?"`

**Rule 1 — `duty.h2`**
Current: `"h2": "Duty & import VAT"`
Corrected: `"h2": "What duty and import VAT apply to coconut charcoal in the UK?"`

**Rule 1 — `landed.h2`**
Current: `"h2": "Landed-cost worked example"`
Corrected: `"h2": "How do you calculate the UK landed cost?"`

**Rule 1 — `entry.h2`**
Current: `"h2": "The entry process"`
Corrected: `"h2": "How do you clear coconut charcoal through UK customs?"`

**Rule 1 — `ports.h2`**
Current: `"h2": "UK ports & routing"`
Corrected: `"h2": "Which UK ports take the cargo, and how long is transit?"`

**Rule 1 — `dgHandling.h2`** (template token `{{unClass}}` preserved)
Current: `"h2": "Dangerous-goods handling at UK ports"`
Corrected: `"h2": "How is UN 1361 Class {{unClass}} cargo handled at UK ports?"`

**Rule 1 — shared `responsibility.h2`** (lives in `logisticsImportCommon.json`, shared across all five country pages — change once, verify it reads naturally for USA/Germany/Saudi Arabia/Russia too; it does)
Current: `"h2": "Who handles what"`
Corrected: `"h2": "Who handles what — factory vs. buyer?"`

**Rule 1 — shared `countryAgency.h2`** stays a label by design (`"UK regulation: REACH, FLEGT timber, and phytosanitary"`) because it heads a three-item definition list, each item already framed as a scope question and answered in the matching FAQ ("Do UK timber or FLEGT rules apply…"). No change recommended — converting it to a single question would misrepresent its three sub-topics. Leave as is.

No snippet-lead gaps, no fluff/bloat rewrites, and no `<NEEDS-OWNER-DATA>` placeholders are required: every fact the page asserts is already present and source-linked in `company.json`.

## 4. Devil's Advocate section

N/A — this is a procedural UK import-mechanics reference (classification, duty/VAT, CDS entry, FLEGT scope), not an argued thesis, so there is no opposing industry position to stage and rebut. The closest thing to a contestable claim — "4402 coconut charcoal is probably out of UKTR/FLEGT scope" — is already handled honestly in-page: it is hedged ("Probably not", "not clearly in scope"), grounded in the OPSS enforcement-report code list (4401/4407/4409/4412), and explicitly tells the buyer to "confirm with the OPSS before relying on the exemption." That is the correct treatment of the counter-position for a compliance page; manufacturing a standalone "View from the Other Side" H2 here would add rhetorical bloat without buyer value.

## 5. Ontological completeness & triangulation

- **Genesis (factory-as-source): explicit.** The responsibility split, FOB Semarang delivery, per-batch Certificate of Analysis, SDS, and SP 978 weathering report tie the cargo to the named factory and its outputs — the buyer can see exactly what document set originates the shipment.
- **Taxonomy (charcoal classification): strong and the page's spine.** 4402.20 ("of shells or nuts") is positioned against 4402.90 ("other"/residual) under GRI 3(a) in the HTS notes, cross-checked against the UKTR/FLEGT timber codes (4401/4407/4409/4412), and placed under UN 1361 Class 4.2 for DG. This is the densest, best-connected entity cluster on the page. *(Note: the 3802 activated-carbon "do not declare as" contrast is on the Germany page, not the UK page — the UK htsNotes only contrast 4402.20 vs 4402.90.)*
- **Pragmatics (buyer value): explicit.** 0% duty, 20% recoverable VAT via PVA, no preference document needed, broker-handled clearance, and 30–42 day transit each translate a fact into a buyer consequence (cost, cash-flow, who-does-what, timing).
- **Weakly-connected entity to consider linking:** `GVMS`/`GMR` appears in the entry step and key-facts but is never defined for a first-time UK importer — a one-clause gloss ("the Goods Vehicle Movement Service that links the declaration to the physical port movement") would close the gap. The config `entryNotes.gvms` already contains this; surfacing it in the rendered step text (it does, via `entrySteps`) means the gap is minor.
- **`OPSS` connectivity:** named four times (key-facts, FLEGT item, disclaimer, responsibilityDestLine) but never expanded to "Office for Product Safety and Standards." First-mention expansion would strengthen the entity for AI extraction. Low priority.
- **Triangulation check: PASS.** Factory-as-source, charcoal-taxonomy position, and buyer-pragmatic value are each made explicit and cross-linked; no isolated concepts of consequence.

## 6. Gaps needing owner data

None. Every figure, code, rate, date, and source the page asserts is already present and verified in `src/data/company.json › logistics.imports.uk` (and the shared `commercial`/`logistics` facts). No fabricated or placeholder data was needed.
