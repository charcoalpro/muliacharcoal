# Content Audit & Targeted Rewrite — Import to Saudi Arabia
**Route:** /logistics/import-to-saudi-arabia · **Source:** src/i18n/en/logisticsImportSaudiArabia.json, src/i18n/en/logisticsImportCommon.json (en.logisticsImportSaudiArabia)

This is a procedural / regulatory-reference page rendered by the shared `import-to-[country].astro` template. Per the template's top comment, the page deliberately: labels FOB illustrative and never publishes a per-ton price; reads every regulatory cell from sourced config; renders the VAT and origin-preference layers from data; and carries a standalone "regulatory information, not legal advice" disclaimer. Those are intentional and are not scored as gaps.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | Section H2s are topic labels ("HS classification", "Duties & fees", "The entry process", "Saudi ports & routing"), not buyer questions. The 4 FAQ entries are well-formed questions. For a reference page, label-style H2s are defensible, but each maps cleanly to a buyer question and could be phrased as one. |
| 2. Featured-snippet lead | PASS | Each H2 opens with a self-contained 1–2 sentence answer before elaborating (HTS: "classifies under heading 4402, subheading 4402.20…"; Duty: "the 5% GCC Common External Tariff on CIF…plus 15% VAT"; Entry: "runs through the FASAH single window and the SABER conformity platform"). KeyFacts box also front-loads extractable answers. |
| 3. Paragraph intent | PASS | Every paragraph serves one clear import-mechanics intent (classify / cost / clear / route / handle DG). No stray narrative. See Intent map. |
| 4. No fluff + anti-bloat | PASS | Dense and specification-led throughout. One mild redundancy: the 25% DG surcharge is stated in three places (dgHandling.body, landed.dutyValue, landed.note) — defensible as cross-section reinforcement of a cost the buyer must budget, but flagged. |
| 5. Section purity | PASS | Clusters are clean: classification / duty+VAT / landed cost / entry / DG handling / agency-conformity / ports / FAQ. SABER appears in both the entry and agency sections, but that is process (how to obtain) vs. regulatory status (what it is) — distinct intents, not bleed. |
| 6. Structure | PASS | Full coverage: classification → duty/VAT → landed cost → entry → DG → conformity → ports → FAQ → related. No logic gaps; the duty stack, landed example, and FAQ reinforce rather than duplicate (FAQ adds the SAR 500 cap and recoverability mechanics not in the table). |
| 7. Devil's Advocate | N/A | Procedural/reference page with no arguable thesis to oppose. See §4. |
| 8. Quantified evidence | PASS | Heavily quantified, all sourced: 5% GCC CET, 0.15% ZATCA fee (cap SAR 500), 15% VAT, 25% DG surcharge, 12-digit tariff (eff. 1 Jan 2025), transit 25–35 d Jeddah / 28–40 d Dammam, Class 4.2. No unsupported numbers; unverified 12-digit suffix is explicitly flagged as such. |
| 9. Mini-cases | N/A | No customer case asserted; correct — none is fabricated. A real anonymized Red-Lane/SCoC case would strengthen the page if owner has one (see §6). |
| 10. Ontological completeness | PASS | Dense entity graph: HS 4402.20, GCC CET, ZATCA, VAT, SABER/SCoC, SASO, FASAH/Bayan, SFDA, excise, UN 1361 Class 4.2, Jeddah/Dammam, KADIN COO. Genesis (factory + {{port}} Tanjung Emas), Taxonomy (4402.20 "of shells or nuts" under WCO GRI 3(a)), and Pragmatics (who clears, what it costs) all explicit. |

**Per-locale / hreflang / RTL:** N/A — production is English-only (ACTIVE_LOCALES=['en']).

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "Importing coconut charcoal to Saudi Arabia" (H1) | Primary entity + task framing | keep |
| "The Saudi import mechanics for…" (heroSubtitle) | Scope-setting; what the page answers | keep |
| "This page sits under the…" (intro.p1) | Pillar orientation + market-page handoff | keep |
| "Saudi import at a glance" (KeyFacts) | Snippet/AI extraction: HS, duty, VAT, broker, SABER | keep |
| "Who handles what" (responsibility) | "do I clear it or does the factory" | keep |
| "HS classification" (hts.h2) | "what HS code is shisha charcoal in Saudi Arabia" | rewrite (heading→question) |
| "Coconut-shell charcoal classifies under heading 4402…" | Correct code + Red-Lane mismatch warning | keep |
| "Duties & fees" (duty.h2) | "import duty on charcoal Saudi Arabia" | rewrite (heading→question) |
| "Saudi duty on heading 4402 is…" | Duty stack lead | keep |
| "Import VAT" (vat.h3) + 15% recoverable | "is Saudi VAT recoverable" | keep |
| "Indonesia-origin duty preference" (preference.h3) | "is there a duty break for Indonesia origin" (answer: no) | keep |
| "Landed-cost worked example" (landed.h2) | "total cost to land charcoal in Saudi" | keep |
| "The entry process" (entry.h2) | "how to clear customs Saudi Arabia / SABER + FASAH steps" | rewrite (heading→question) |
| "Dangerous-goods handling at Saudi ports" | "DG surcharge / Class 4.2 at Jeddah/Dammam" | keep |
| "SASO / SABER: conformity certification…" (agency.h2) | "do I need SABER / SASO / SFDA for shisha charcoal" | keep |
| "Production and transit lead time" (common) | "how long from order to arrival" | keep |
| "Saudi ports & routing" (ports.h2) | "transit time Indonesia to Jeddah/Dammam" | rewrite (heading→question) |
| FAQ ×4 | Direct buyer questions (duty/VAT, VAT recovery, SABER+SFDA, transit) | keep |
| "Import guides for other markets" / "Related topics" | Cocoon internal linking | keep |

## 3. Targeted rewrites

Only real gaps below. The single recurring gap is Rule 1 (label H2s that should be questions). The featured-snippet leads already sitting under each heading satisfy Rule 2, so only the heading strings change — the body leads are kept verbatim. All rewrites are pure prose; no facts altered.

### Rule 1 — HS classification heading → question
**Current** (`hts.h2`): `"HS classification"`
**Corrected:**
```
"What is the HS code for coconut charcoal in Saudi Arabia?"
```

### Rule 1 — Duties heading → question
**Current** (`duty.h2`): `"Duties & fees"`
**Corrected:**
```
"What import duty and fees apply to charcoal in Saudi Arabia?"
```
(If the editorial preference is to keep the KeyFacts/FAQ as the question-bearing layer and H2s short, this is optional. The duty FAQ already asks "What duty and VAT apply…", so leaving `duty.h2` as a label avoids near-duplicate question phrasing — acceptable either way.)

### Rule 1 — Entry-process heading → question
**Current** (`entry.h2`): `"The entry process"`
**Corrected:**
```
"How is a coconut-charcoal container cleared into Saudi Arabia?"
```

### Rule 1 — Ports heading → question
**Current** (`ports.h2`): `"Saudi ports & routing"`
**Corrected:**
```
"Which Saudi ports, and how long is the transit?"
```

### Rule 4 (minor) — de-duplicate the 25% DG surcharge mentions
The 25% dangerous-cargo surcharge is stated three times (dgHandling.body, landed.dutyValue, landed.note). Keep the authoritative statement in `dgHandling.body` and the cost line in `landed.dutyValue`; the trailing sentence in `landed.note` restates it a third time. Optional tightening:

**Current** (`landed.note`, 2nd sentence): `"Port terminal handling and its mandatory 25% dangerous-cargo surcharge are billed by the Saudi terminal, not by us."`
**Corrected:**
```
"Port terminal handling and the DG surcharge are billed by the Saudi terminal, not by us."
```
(Drops the repeated "mandatory 25%"; the figure remains in `landed.dutyValue` and `dgHandling.body`.) Low priority — the repetition is defensible reinforcement of a budget item.

No other rewrites: leads, facts, sourcing, disclaimer, and FAQ are all sound and honesty-compliant (unverified 12-digit suffix and unverified SABER regulated/non-regulated status are both explicitly flagged in-text, not asserted).

## 4. Devil's Advocate section
N/A — this is a procedural import-mechanics reference page (classification, duty/VAT, SABER/FASAH entry, DG handling, ports). It advances no arguable thesis for an opposing industry view to rebut; the nearest "claim" — that no Indonesia-origin duty preference exists — is already stated against interest and correctly resolved in the text and FAQ.

## 5. Ontological completeness & triangulation
- **Genesis — explicit.** Factory-as-source is anchored via `{{brand}}` and `{{port}}` (Tanjung Emas, Semarang) in the intro, responsibility split, and lead-time block; the SCoC/SDS/SP 978 documents trace to the factory's export role. Strong.
- **Taxonomy — explicit.** Charcoal's position is precisely located: HS 4402.20 "of shells or nuts" as the GRI 3(a) most-specific heading, explicitly distinguished from the wrong 4402.90 "Other", and cross-referenced to UN 1361 Class 4.2 PG III. Best-in-class for a country guide.
- **Pragmatics — explicit.** Buyer value is unambiguous: who clears (buyer's broker), what it costs (5% + 0.15% + 15% + 25% DG surcharge), what conformity is mandatory (SABER SCoC), and what is NOT in scope (SFDA, excise, origin preference). Negative-space facts (no excise, no preference, SFDA out of scope) are a citation strength.
- **Weak connectivity — SABER ↔ market-readiness.** The Arabic-labelling agency item and the "regulated vs non-regulated" uncertainty sit slightly isolated from the rest of the conformity flow; a one-clause bridge tying the per-shipment SCoC to the buyer's one-time product registration would tighten the SABER sub-graph. Minor.
- **Weak connectivity — KADIN COO ↔ duty.** The certificate of origin appears in both the preference note ("required to prove origin, not to claim lower duty") and the responsibility list; the relationship is correct but the COO entity is never surfaced in the KeyFacts at-a-glance box. Acceptable, but adding it there would close the loop for snippet extraction.
- **Triangulation verdict:** all three vertices (Genesis / Taxonomy / Pragmatics) are independently and explicitly satisfied — the page is ontologically dense and well-triangulated.

## 6. Gaps needing owner data
- None required for compliance. Every figure on the page is sourced or explicitly flagged unverified.
- Optional upside (not a gap): a real, anonymized Saudi clearance case (e.g., an SCoC-secured-before-departure shipment that avoided Red-Lane delay) would satisfy Rule 9 and add citable proof — `<NEEDS-OWNER-DATA: verifiable Saudi import case study (problem → action → result), only if real>`. Do not fabricate; skip if none exists.
