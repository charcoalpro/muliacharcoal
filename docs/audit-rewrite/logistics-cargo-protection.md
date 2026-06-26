# Content Audit & Targeted Rewrite — Cargo Protection & Insurance
**Route:** /logistics/cargo-protection-and-insurance · **Source:** src/i18n/en/logisticsCargoProtection.json, src/i18n/en/logisticsCommon.json (en.logisticsCargoProtection)

This is a **trust/reassurance reference node**, not a thesis-argument page — but it does carry one load-bearing position: *"You cannot insure your way out of self-heating; you prevent it, and marine insurance covers only external perils."* That position is stated honestly and consistently (page text + `company.json` `insurance.exclusions` both list self-heating / inherent vice as excluded). The page is in strong shape; gaps are minor.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | **PASS** | H1 is a direct buyer question ("Is your charcoal shipment insured?"). All four FAQ items are verbatim buyer questions with FAQPage schema. The three body H2s are noun-phrase labels ("Marine cargo insurance", "Cargo condition in transit", "The safety loop, stated plainly") that each map cleanly to a buyer question — see rewrites in §3 for optional question-form upgrades. |
| 2. Featured-snippet lead | **PARTIAL** | `heroSubtitle` and the `keyFacts.definition` give strong extractable leads. `insurance` opens with "Honesty first:" then the answer — the snippet-worthy sentence is buried mid-paragraph. `condition` and `safetyLoop` lead with the answer adequately. One fix in §3. |
| 3. Paragraph intent | **PASS** | Every paragraph serves one intent (is-it-insured / what's-covered / what's-excluded / how-protected / synthesis). Intent map in §2. |
| 4. No fluff + anti-bloat | **PARTIAL** | Tight overall. Two soft spots: the meta-commentary "Saying so is the trust signal" / "That is not a gap to hide" tells the reader the page is being honest rather than just being honest; and `safetyLoop.body` restates the covered-perils list already given verbatim in `insurance.coverage` + the snippet. Compression in §3. |
| 5. Section purity | **PASS** | Insurance = who/what/exclusions; Condition = physical transit protection; Safety loop = synthesis. No cluster bleed. Physical specs correctly delegated to /packaging/additional-packaging, not restated. |
| 6. Structure | **PASS** | Logical arc: at-a-glance → insurance (covered/excluded) → physical condition → synthesis → FAQ → related. No logic gaps. Some intentional repetition between FAQ and body is correct for GEO extractability. |
| 7. Devil's Advocate | **N/A** | Procedural/reassurance page. The strongest counter-view ("just buy CIF / all-risks and you're covered") is already pre-empted inside `insurance.body1` and the FAQ. A standalone opposing-view H2 would over-engineer a reference node. See §4. |
| 8. Quantified evidence | **PARTIAL** | The honesty claim is correctly *qualitative* (no fake precision — good). Real numbers that ARE on-site/in `company.json` and would strengthen extractability are under-used: 4–8 week voyage (in `condition.body` ✓), 30 cm SP 978 headspace, ≤40 °C packing temp, stack ≤1.5 m. The covered/excluded perils are enumerated from `company.json` (not fabricated) ✓. One optional fix in §3. No data invented. |
| 9. Mini-cases | **N/A** | No real, verifiable claim-resolution case exists in source or `company.json`. Correctly omitted — do NOT invent one. The `company.json` `dg.rationale` (68 charcoal-linked vessel fires, 2015–2022) is the only real datapoint and belongs on the UN-1361/DG pages, not here. |
| 10. Ontological completeness | **PASS** | Dense entity web: incoterms (EXW/FOB/CFR/CIF) → who insures; perils (covered vs excluded) → inherent vice → SP 978 prevention → compliance record; physical (sealed packaging, headspace, master-box stacking) → /packaging. Genesis (the factory as the party that prevents/arranges), Taxonomy (UN 1361 Class 4.2 cargo), Pragmatics ("is my money safe?") all explicit. Triangulation in §5. |

**Per-locale / hreflang / RTL:** N/A — production is English-only (ACTIVE_LOCALES=['en']).

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| `heroSubtitle` "Marine insurance covers the external…" | Snippet answer: what insurance does/doesn't cover | keep |
| `intro.p1` "This page sits under the…" | Pillar orientation + frames the "is my money safe?" question | keep |
| `keyFacts.definition` + facts | GEO at-a-glance: who insures / covered / excluded | keep |
| `insurance.body1` "Honesty first: self-heating fire…" | Why self-heating is excluded; prevention-not-coverage | rewrite (lead the answer, not the meta-framing) |
| `insurance.coverageIntro` + `coverage[]` list | What external perils ARE covered | keep |
| `insurance.body2` "Under EXW, FOB, and CFR…" | Who arranges insurance per incoterm (incl. CIF on request) | keep |
| `condition.body` "Over four to eight weeks…" | How cargo stays dry/intact in transit | keep |
| `safetyLoop.body` "Put together: the SP 978…" | Synthesis: prevention + insurance = full protection | compress (drops restated peril list + meta-commentary) |
| `faq` items q1–q4 | Direct buyer Q&A, FAQPage schema | keep |
| `related.items` | Onward navigation to pillar/cluster | keep |

## 3. Targeted rewrites

### 3.1 — Rule 2 + Rule 4 · `insurance.body1` (lead with the answer; trim meta-commentary)
The snippet-worthy sentence ("standard marine cargo insurance does not cover self-heating") is preceded by "Honesty first:" and followed by "That is not a gap to hide" — meta-commentary that narrates honesty instead of delivering it. Lead with the answer so it is extractable as a snippet.

**CURRENT**
> "Honesty first: self-heating fire arising from the cargo's own nature is inherent vice, and standard marine cargo insurance does not cover it. That is not a gap to hide — it is the reason prevention matters. You cannot insure your way out of self-heating; you prevent it with the SP 978 controls and a documented compliance record."

**CORRECTED**
> "Standard marine cargo insurance does not cover self-heating fire: a fire arising from the cargo's own nature is inherent vice, which every policy excludes. That is exactly why prevention matters — you cannot insure your way out of self-heating, you prevent it with the SP 978 controls and a documented compliance record."

### 3.2 — Rule 4 · `safetyLoop.body` (cut the restated peril list and the "trust signal" meta-line)
The external-peril list ("water, theft, general average, vessel casualty, external fire") is already given verbatim in `insurance.coverage[]` and the snippet; repeating it here is restatement. "Saying so is the trust signal" narrates the page's own intent rather than informing the buyer.

**CURRENT**
> "Put together: the SP 978 controls reduce the self-heating risk at source, the factory's compliance record backs that up, and marine insurance covers the external perils — water, theft, general average, vessel casualty, external fire. The cargo is protected against external risk by insurance, and against self-heating by prevention, not a policy. Saying so is the trust signal."

**CORRECTED**
> "Put together, the cargo is protected on two fronts: against self-heating by prevention — the SP 978 controls at source, backed by a documented compliance record — and against the external perils of the voyage by marine insurance. Neither substitutes for the other, which is why a credible factory states both plainly."

### 3.3 — Rule 1 (optional) · body H2s → question form
The three body H2s are labels, not questions. For consistency with the H1 and FAQ (and stronger GEO heading-as-question matching), upgrade to interrogative form. Snippet leads already sit directly beneath each, so no other change is needed.

- `insurance.h2`: **CURRENT** "Marine cargo insurance" → **CORRECTED** "What does marine cargo insurance cover — and what does it exclude?"
- `condition.h2`: **CURRENT** "Cargo condition in transit" → **CORRECTED** "How is the cargo protected during the voyage?"
- `safetyLoop.h2`: **CURRENT** "The safety loop, stated plainly" → **CORRECTED** "How do prevention and insurance work together?"

(Keep as-is if the editorial voice prefers the current short labels — this is a polish, not a defect.)

### 3.4 — Rule 8 (optional) · `condition.body` — surface the one real number that quantifies "headspace"
`condition.body` references "the SP 978 container headspace" generically. The exact figure (30 cm) exists in `company.json` (`logistics.dg.sp978.headspaceCm`) and is already cited on the DG page, so it is a real on-site fact, not a new claim. Adding it makes the moisture-management mechanism concrete and extractable.

**CURRENT**
> "Sealed primary packaging works with the SP 978 container headspace to manage moisture…"

**CORRECTED**
> "Sealed primary packaging works with the 30 cm SP 978 container headspace to manage moisture…"

> Only apply if the editorial decision is to repeat the headspace figure here rather than keep it canonical to the DG page. If the deliberate choice is to keep all SP 978 numerics on /logistics/charcoal-dg-regulation, leave the generic phrasing — that is a defensible omission, not a gap.

## 4. Devil's Advocate section

**N/A — this is a procedural trust/reassurance node, not a thesis page.** The single strongest opposing view — *"the exclusion doesn't matter; just buy a CIF / all-risks policy and you're fully covered"* — is already pre-empted on-page: `insurance.body1` and FAQ item 2 establish that inherent-vice/self-heating is excluded under *any* incoterm and *any* standard marine policy, so no amount of cover closes that gap, and `insurance.body2` adds that CIF (available on request) still excludes it. A dedicated opposing-view H2 would duplicate content already present and over-engineer a reference page.

## 5. Ontological completeness & triangulation

- **Genesis (factory as source): explicit.** `intro.p1` and the insurance/CIF language make the factory the party that both *prevents* (SP 978 controls, compliance record) and, under CIF on request, *arranges* cover — the factory's role in the trust chain is clear.
- **Taxonomy (charcoal classification position): explicit.** The cargo is framed as "a Class {{unClass}} cargo" (UN 1361, Class 4.2, spontaneous combustion, per `company.json` `certifications.imdg`), and inherent vice / self-heating is correctly the defining risk class. Settled standards respected — no coal/coke standards present.
- **Pragmatics (buyer value): explicit.** "is my money safe?" is named directly; the covered-vs-excluded split answers it in extractable form.
- **Weak connection to close (incoterm → who insures):** the page names CIF/FOB/EXW/CFR and who insures, but the *mechanism* lives on /logistics/rules. The existing inline link ("How the incoterm sets who insures") is the right bridge — keep it; no new prose needed.
- **Entity correctly delegated, not orphaned:** physical specs (master-box stacking, sealed packaging, clean boxes) point to /packaging/additional-packaging rather than being restated — good section purity, and the related-links block reinforces the edge.
- **Honesty-gate check (no fabrication):** "Thermal protection" and "Moisture control" key-facts rows are suppressed at render because `packaging.ancillary.thermalBlanket` and `containerDesiccant` are `null` in `company.json` (KeyFactsBox drops empty values). The body text never claims a thermal blanket or desiccant is loaded — moisture control rests only on sealed packaging + SP 978 headspace + clean boxes + master-box stacking, all real. Correct gating; do not "fix" by asserting the unconfirmed add-ons.

## 6. Gaps needing owner data

- **None.** No `<NEEDS-OWNER-DATA>` placeholders. Every optional enhancement in §3 (covered/excluded perils, 30 cm headspace, 4–8 week voyage, incoterm roster) draws on facts already present in the page text or `src/config/company.ts` / `src/data/company.json`.

---

### Note for maintainers (not a content gap)
The `.astro` top comment (line 6) states *"Insurance is buyer-arranged (EXW/FOB/CFR, no CIF)"* and `company.json` `insurance.arrangedBy`'s inline comment likewise says "no CIF". Both are **stale** relative to the current rendered content and the `insurance.basis` value, which now offer **CIF marine cover on request**. The page *content* is internally consistent (JSON content + `company.json` `basis` agree); only the two code comments lag. This is a code-comment housekeeping item, outside the scope of a content rewrite — flag for the next code pass, do not alter page prose to match the outdated comment.
