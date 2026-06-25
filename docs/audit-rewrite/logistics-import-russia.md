# Content Audit & Targeted Rewrite — Import to Russia
**Route:** /logistics/import-to-russia · **Source:** src/i18n/en/logisticsImportRussia.json, src/i18n/en/logisticsImportCommon.json (en.logisticsImportRussia)

This is a procedural/reference page (an import mechanics guide), not a thesis page. It is judged on extractability, snippet-readiness, completeness, and honesty — not on argument structure. It is already strong: dense, sourced, and honestly hedged on the constrained Russia lane. The dominant systematic gap is heading form (noun phrases, not buyer questions); the FAQ, by contrast, is excellent.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | The FAQ items are perfect direct questions. But the H2/H3 body headings are noun phrases: "TN VED classification", "Duties & fees", "Landed-cost worked example", "The entry process", "Russian conformity: EAC, GOST, and phytosanitary control", "Russian ports & routing". Each maps cleanly to a buyer question but is not phrased as one. Rewrites in §3. |
| 2. Featured-snippet lead | PASS | Each section opens with a self-contained answer before elaboration: HTS ("falls under EAEU heading 4402…"), Duty ("a 5% EAEU customs duty plus the customs clearance fee, then 22% import VAT"), Landed ("Landed cost is the sum of the goods, the freight, and the import charges"), Entry ("handled by the buyer's customs broker, who files the electronic declaration"). Strong. |
| 3. Paragraph intent | PASS | Every paragraph serves a discrete importer intent (classify, cost, clear, ship, certify, feasibility). Mapped in §2; none orphaned. |
| 4. No fluff + anti-bloat | PASS | Spec-dense, almost no filler. One mild redundancy: the feasibility caveat, the "Can I import in 2026?" FAQ, and the carrier-acceptance agency row restate the same carrier/SWIFT/Indonesian-port facts three times. This is partly deliberate (the caveat must stand alone, the FAQ must be self-contained for snippet extraction), so it is acceptable repetition, not bloat to cut. Flagged in §2, not failed. |
| 5. Section purity | PASS | Each H2 holds one intent cluster. Duty section correctly nests VAT (H3), origin preference (H3), duty history (H3), and AD/CVD (H3) as sub-facets of "cost of the duty stack" — no bleed. |
| 6. Structure | PASS | Logical flow: classify → cost → worked example → entry → DG handling → conformity → lead time → ports → FAQ. No gaps for a reference guide; the feasibility gate is correctly surfaced first. |
| 7. Devil's Advocate | N/A | Procedural reference page with no arguable thesis. The closest thing to a thesis — "you can import to Russia, but only on a confirmed lane" — is already self-rebutting via the feasibility caveat and the "Can I import in 2026?" FAQ, which present the strongest counter-position (Western lines suspended, SWIFT cutoff, sanctions reaching an Indonesian port) on the page. See §4. |
| 8. Quantified evidence | PASS | Exceptionally numeric and all sourced: 5% EAEU duty, 22% VAT (Federal Law 425-FZ, eff. 1 Jan 2026), tiered clearance-fee brackets in RUB, transit ranges (Vladivostok 18–30 d, Novorossiysk 35–55 d, St Petersburg 40–60 d), dated regulatory events (12 Oct 2021 preference removal, 1 Mar 2022 carrier suspension, 24 Apr 2026 EU 20th package). No unbacked claims. |
| 9. Mini-cases | N/A | No real buyer case-study data exists in source or company.ts. Correctly not invented. Do not add. |
| 10. Ontological completeness | PASS | Dense entity graph: Genesis (factory exports FOB Semarang, supplies declaration data + SP 978 report), Taxonomy (coconut-shell charcoal → EAEU heading 4402 → subheadings 4402 20 / 4402 90, distinguished from bamboo 4402 10 and Chapter 38 chemical reclassification risk), Pragmatics (5% duty + 22% VAT, who clears, feasibility gate). Entities — TN VED, EAC/refusal letter, Rosselkhoznadzor, Federal Customs Service, SWIFT/SPFS/CIPS — are interlinked, not isolated. Minor gap noted in §5. |

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "This page sits under the…" (intro) | Orient to pillar + route to commercial case; pre-warn feasibility | keep |
| "The Russia lane is constrained…" (feasibilityCaveat) | "Can I even ship to Russia right now?" — gating risk | keep |
| "Russia import at a glance" (keyFacts) | Scannable answer block (code, duty, who clears, feasibility) | keep |
| "Coconut-shell charcoal falls under EAEU heading 4402…" (hts.body) | "What HS/TN VED code for coconut charcoal in Russia?" | keep |
| "Russian duty on heading 4402 is a 5%…" (duty.body) | "What duty + VAT will I pay?" | keep |
| "Raised from 20% to 22%…" (vat, from config) | "Is import VAT recoverable / what rate?" | keep |
| "No usable duty preference…" (preference, from config) | "Does Indonesia origin lower the duty?" | keep |
| "Indonesia previously received the EAEU…" (dutyHistory) | "Did the rate change / will the FTA help?" | keep |
| "Landed cost is the sum of…" (landed.body) | "What does it land at?" — cost-modeling | keep |
| "Russian entry for a UN 1361 container…" (entry.body) | "What's the clearance process / what do I prepare?" | keep |
| "The cargo arrives as declared UN 1361…" (dgHandling.body) | "How is the DG cargo handled at the port?" | keep |
| "Charcoal … is generally NOT subject to mandatory EAC…" (countryAgency) | "Do I need EAC / GOST / phytosanitary cert?" | keep |
| "Major Western container lines…suspended" (carrier row) | "Which carriers will even take it?" | keep (acceptable restatement of caveat — must stand alone in agency list) |
| "Major Russian banks have been cut from SWIFT…" (banking row) | "How do I pay for it?" | keep |
| "Production takes about…transit…" (leadTime, common) | "How long order-to-arrival?" | keep |
| "Indicative ocean transit from…" (ports.body) | "Which port / how many days?" | keep |
| FAQ: "What duty applies…" | Snippet/voice extraction — duty | keep |
| FAQ: "Is Russian import VAT…recoverable?" | Snippet extraction — VAT | keep |
| FAQ: "Can I import…in 2026?" | Snippet extraction — feasibility (restates caveat by design) | keep |
| FAQ: "How long does shipping…take?" | Snippet extraction — transit | keep |

No row earns compress/delete. The only repetition (carrier/SWIFT/Indonesian-port facts appearing in caveat + FAQ + agency rows) is structurally justified: caveat must gate, FAQ must be self-contained for AI extraction, agency row must be findable in the conformity list.

## 3. Targeted rewrites

The page passes on substance. The one real, systematic gap is **Rule 1 (headings as questions)**. Body H2/H3s are noun phrases; converting them to the buyer's literal question improves GEO extraction and snippet eligibility without touching any fact. Each rewrite is a one-key value swap; no number changes.

### Rule 1 — `hts.h2`
CURRENT: `"TN VED classification"`
CORRECTED: `"What TN VED code classifies coconut charcoal in Russia?"`

### Rule 1 — `duty.h2`
CURRENT: `"Duties & fees"`
CORRECTED: `"What duty and VAT apply to coconut charcoal in Russia?"`

### Rule 1 — `landed.h2`
CURRENT: `"Landed-cost worked example"`
CORRECTED: `"What is the landed cost of coconut charcoal in Russia?"`

### Rule 1 — `entry.h2`
CURRENT: `"The entry process"`
CORRECTED: `"How is a charcoal container cleared into Russia?"`
(Note: this value is reused as the HowTo `name` in schema — the question form reads correctly there too.)

### Rule 1 — `dgHandling.h2`
CURRENT: `"Dangerous-goods handling at Russian ports"`
CORRECTED: `"How is the UN 1361 dangerous-goods cargo handled at Russian ports?"`

### Rule 1 — `countryAgency.h2`
CURRENT: `"Russian conformity: EAC, GOST, and phytosanitary control"`
CORRECTED: `"What conformity certificates does Russia require — EAC, GOST, phytosanitary?"`

### Rule 1 — `ports.h2`
CURRENT: `"Russian ports & routing"`
CORRECTED: `"Which Russian ports take Indonesian charcoal, and how long is transit?"`

### Rule 1 (common file, shared) — informational note
`logisticsImportCommon.json` `responsibility.h2` ("Who handles what") and `leadTime.h2` ("Production and transit lead time") are shared across all five country guides. "Who handles what" already reads as an implicit question and is fine. If the owner wants full question-parity, `leadTime.h2` could become `"How long from order to arrival?"` — but because this string is shared by USA/UK/Germany/Saudi Arabia/Russia, change it once with that cross-page impact in mind, not per-country. Flagged, not pushed.

### Rule 4 — no rewrite required
The triple statement of carrier/SWIFT/sanctions facts is intentional and serves three distinct extraction surfaces. No compression recommended.

## 4. Devil's Advocate section
N/A — this is a procedural import-mechanics reference page with no arguable thesis to defend. The nearest implicit claim ("Russia import is possible but only on a confirmed DG carrier + sanctions-clear payment lane") is already presented with its strongest counter-position on the page itself: the feasibility caveat and the "Can I import coconut charcoal to Russia in 2026?" FAQ both lead with the opposing facts (Western lines suspended 1 Mar 2022, major Russian banks off SWIFT, EU 20th sanctions package listing an Indonesian port), then resolve them honestly. Adding a separate "View from the Other Side" H2 would duplicate content already on the page.

## 5. Ontological completeness & triangulation
- **Triangulation: all three legs explicit.** Genesis = factory exports FOB Semarang and supplies declaration data + SP 978 weathering report (responsibility list, entry.body). Taxonomy = coconut-shell charcoal → EAEU heading 4402 → 4402 20 "of shells or nuts" vs residual 4402 90, explicitly distinguished from bamboo 4402 10 and Chapter 38 chemical reclassification (htsNotes). Pragmatics = 5% duty + 22% VAT, who clears, the feasibility gate. No leg missing.
- **Weak link — refusal letter ↔ responsibility split.** The "отказное письмо" (refusal letter) is named in the destLine, the keyFacts, the FAQ, and the agency block, but the *entry steps* list only the electronic declaration (one HowTo step). A buyer scanning "The entry process" doesn't see the refusal-letter / phytosanitary-certificate procurement as numbered steps. Consider surfacing them as additional `entry.steps` items so the entity that recurs everywhere also appears in the step sequence. (Content-shape suggestion; no fact missing.)
- **Weak link — payment channel ↔ landed cost.** Banking constraints (SWIFT cutoff, intermediary-bank settlement) are well covered as a *feasibility* entity but disconnected from the *landed-cost* entity. Intermediary-bank/FX friction is a real cost component for this lane; the landed-cost example is silent on it. A one-line pointer from the landed-cost note to the banking constraint would tie the two clusters together. (No figure exists or should be invented — a qualitative pointer only.)
- **Strong connectivity elsewhere.** TN VED ↔ FCS automated risk system ↔ misdeclaration penalty, and carrier suspension ↔ transshipment routing ↔ Vladivostok-as-practical-gateway, are both densely linked. No isolated concepts.

## 6. Gaps needing owner data
None. Every rewrite above is a heading-form change or a content-shape suggestion using facts already in source or company.json. No `<NEEDS-OWNER-DATA>` placeholders were required; no figure was fabricated.
