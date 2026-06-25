# Content Audit & Targeted Rewrite — UN 1361 Classification
**Route:** /logistics/un-1361 · **Source:** src/i18n/en/logisticsUn1361.json, src/i18n/en/logisticsCommon.json (en.logisticsUn1361)

Main thesis (confirmed from text): *Coconut shell charcoal must ship by sea as UN 1361 — IMDG Class 4.2, Packing Group III dangerous goods — and the self-heating fire risk is managed by prevention (SP 978 controls), not by insurance.* The page is the **timeless classification entity**; the 2026 rule-change narrative is deliberately delegated to `/logistics/charcoal-dg-regulation` (per the .astro top comment: "Holds NO SP 978 *requirements* — those live on the regulation page").

---

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | **PARTIAL** | H1 is a perfect buyer question ("is coconut charcoal dangerous goods?"). H2s are statement-style labels: "What UN 1361 is", "Cargo details", "Self-heating, fire risk — and how it is managed", "The Self-Heating Test, after 2026", "Why some lines refuse charcoal", "Entry formalities by destination". Each *maps* to a real buyer question but only one H2 ("Why some lines refuse charcoal") and the H1 are phrased as questions. The FAQ block carries the explicit-question load. |
| 2. Featured-snippet lead | **PASS** | Every section opens with a self-contained answer. `whatIs.body` defines the term in dictionary form; `selfHeating.body1` answers "what does Class 4.2 mean" in sentence 1; `sht.body` opens with the one-line definition of the test; `whyRefuse.body` and `countryEntry.body` both lead with the answer. Hero subtitle leads with "Yes." — ideal snippet seed. |
| 3. Paragraph intent | **PASS** | Each paragraph serves one identifiable intent (see §2). No stray/decorative paragraphs. |
| 4. No fluff + anti-bloat | **PASS** (minor) | Prose is dense and specification-led. Only two micro-redundancies: hero subtitle renders "UN 1361 — IMDG Code UN 1361 Class 4.2 …" (the `imdgLabel` token repeats "UN 1361"); and `cargoTable.intro` ("…in one place") is a light filler tail. Both are 1-clause, not paragraph-level bloat. |
| 5. Section purity | **PASS** | Clean intent separation. Classification identity (whatIs + cargo table), risk/management (selfHeating), test status (sht), carrier acceptance (whyRefuse), destination handoff (countryEntry). The page correctly does NOT bleed the SP 978 *requirements* in — those are linked out, matching the cocoon design. |
| 6. Structure (coverage, no dupes) | **PASS** | Logical arc: define → tabulate → risk+management → test status → carrier reality → destination handoff → FAQ. No duplicated meaning across sections; FAQ restates body answers in Q form by design (acceptable, schema-bearing). |
| 7. Devil's Advocate | **PARTIAL** | The page already embeds the strongest counter-argument inline ("you can't insure your way out of it" + "some suppliers quote non-DG freight" handled on the regulation page) but has **no dedicated H2** giving the buyer-side "do I really have to declare / pay DG surcharges?" objection a balanced rebuttal in one place. A short dedicated section would strengthen GEO extraction. Draft in §4. |
| 8. Quantified evidence | **PASS** | Key claims are backed by on-site/config facts: UN 1361, Class 4.2, PG III, PSN, HS 4402.20, UN Test N.4, IMDG Amendment 42-24, mandatory date (from `dgMandatoryDate` token). EMS row self-suppresses because `dg.ems` is empty (`hasFact` filter) — correct, not a gap. No fabricated numbers anywhere. |
| 9. Mini-cases | **N/A** | No real, verifiable problem→action→result case exists in source or company.ts. Page correctly makes none. The generic "contained-cargo self-heating fires have occurred days after loading" is an industry fact stated without a fake specific case — appropriate. |
| 10. Ontological completeness | **PASS** | Dense entity web: UN 1361 ↔ "Carbon, animal or vegetable origin" ↔ Class 4.2 ↔ self-heating ↔ SP 978 ↔ UN Test N.4 ↔ IMDG Code ↔ carriers ↔ destination entry. Genesis (factory-as-shipper "we book with carriers that do"), Taxonomy (where charcoal sits in DG classification), Pragmatics (buyer's broker/carrier needs) all explicit. Glossary + regulation + documents + certifications cross-links close the graph. |

**Per-locale / hreflang / RTL items:** N/A (production is English-only, ACTIVE_LOCALES=['en']).

---

## 2. Intent map

| Section / para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "Yes. Coconut shell charcoal ships…" (heroSubtitle) | "is charcoal dangerous goods?" — instant yes/no | keep (trim token redundancy) |
| "This page sits under the {{brand}}…" (intro.p1) | orient + delineate from regulation page; pillar uplink | keep |
| "Classification at a glance" (keyFacts) | scannable spec lookup (UN/class/PSN/PG) | keep |
| "UN 1361 is the United Nations…" (whatIs.body) | "what is UN 1361 / what does it cover" — definition | keep |
| "The dangerous-goods data your carrier…" (cargoTable.intro) | "what do I tell my broker/carrier" | keep (compress tail) |
| cargo table rows | broker/carrier data handoff | keep |
| "Class {{unClass}} means the material…" (selfHeating.body1) | "why is charcoal a hazard / will it catch fire" | keep |
| "The answer is prevention…" (selfHeating.body2) | "is the fire risk insurable / how is it managed" — honesty reframe | keep |
| "The Self-Heating Test (UN Test N.4)…" (sht.body) | "does the SHT exempt me post-2026" | keep |
| "Because it is Class {{unClass}}…" (whyRefuse.body) | "why do lines refuse charcoal / can you even ship it" | keep |
| "Every export carton and container…" (markings.body) | "what markings appear on my cargo" | keep |
| "UN 1361 sets how the cargo…" (countryEntry.body) | "what about duty/entry at destination" — handoff | keep |
| FAQ ×5 | direct buyer questions, FAQPage schema | keep |
| Related topics | internal-link mesh | keep |

No paragraph rated delete-as-fluff.

---

## 3. Targeted rewrites

Only real gaps below; everything not listed already passes.

### 3.1 — Rule 1 (Headings as questions): convert statement H2s to buyer questions

The H1 and FAQ already carry questions, but H2s phrased as questions lift both featured-snippet eligibility and GEO extractability without touching meaning. Recommended (optional but high-ROI) heading rewrites:

**`whatIs.h2`** — CURRENT: `"What UN 1361 is"`
→ corrected:
```
"What is UN 1361?"
```

**`cargoTable.h2`** — CURRENT: `"Cargo details"`
→ corrected:
```
"What cargo data do my carrier and broker need?"
```

**`selfHeating.h2`** — CURRENT: `"Self-heating, fire risk — and how it is managed"`
→ corrected:
```
"Will coconut charcoal catch fire in the container?"
```

**`sht.h2`** — CURRENT: `"The Self-Heating Test, after 2026"`
→ corrected:
```
"Does the Self-Heating Test exempt charcoal after 2026?"
```

**`countryEntry.h2`** — CURRENT: `"Entry formalities by destination"`
→ corrected:
```
"How does UN 1361 affect customs at the destination?"
```

(`whyRefuse.h2` "Why some lines refuse charcoal" is already a question and needs no change.)

### 3.2 — Rule 4 (anti-bloat): remove the double "UN 1361" in the hero subtitle

**Rule:** No fluff / no restating. With `imdgLabel` = "IMDG Code UN 1361 Class 4.2 (spontaneous combustion)", the current template renders "ships as UN 1361 — IMDG Code UN 1361 Class 4.2…" — "UN 1361" twice in one breath.

CURRENT (`heroSubtitle`):
```
"Yes. Coconut shell charcoal ships as UN 1361 — {{imdgLabel}}, Packing Group {{packingGroup}}. This page explains what that classification is and what it means for your shipment."
```
→ corrected (drop the redundant lead token; let `imdgLabel` carry the UN number once):
```
"Yes. Coconut shell charcoal ships by sea as {{imdgLabel}}, Packing Group {{packingGroup}}. This page explains what that classification means for your shipment."
```

### 3.3 — Rule 4 (anti-bloat): tighten the cargo-table intro tail

CURRENT (`cargoTable.intro`):
```
"The dangerous-goods data your carrier and broker need, in one place."
```
→ corrected (the "in one place" adds no information; replace with the use-case):
```
"The dangerous-goods data your carrier and broker need to book and declare the shipment."
```

### 3.4 — Rule 7 (Devil's Advocate): add a dedicated objection-and-rebuttal H2

The page proves its thesis but never gives the buyer's strongest *commercial* objection ("declaring DG costs me money and limits carriers — can I avoid it?") a single labelled home with a rebuttal. Add the section in §4 as a new namespace block (e.g. `t.otherSide`), rendered after `whyRefuse` and before `countryEntry`. All facts used are already on-site.

> Note — no number, certification, or carrier name in the draft is invented; every figure traces to `company.json` (`dg.mandatoryFrom`, `dg.amendment`, `dg.packingGroup`, `certifications.imdg`) or to claims already present on this page / the linked regulation page.

---

## 4. Devil's Advocate section

Drop-in block (proposed `en.logisticsUn1361.otherSide`), rendered as its own H2 after "Why some lines refuse charcoal":

```json
"otherSide": {
  "h2": "Can I just ship charcoal as non-dangerous goods and save the surcharge?",
  "body1": "The honest counter-argument is commercial: declaring UN 1361 adds dangerous-goods surcharges and narrows the carrier list, so a buyer naturally asks whether a non-DG booking is possible. It is a fair question — before 2026, a passing Self-Heating Test could test the cargo out of dangerous-goods carriage, and some suppliers still quote freight on that basis.",
  "body2": "That route no longer exists. Since {{dgMandatoryDate}}, {{dgAmendment}} removed the test-out for UN 1361: a passing SHT is now supporting evidence, not an exemption. A non-DG quote today is a misdeclaration, and the exposure lands on the importer — carrier blacklisting, port-state detention, and, because self-heating fire is inherent vice, no marine-cargo cover if the container ignites. Packing Group {{packingGroup}} is the lowest severity in Class {{unClass}}, and the SP 978 controls keep incidents rare, so the compliant path costs a surcharge, not your cargo. We ship declared, every time.",
  "regulationLinkLabel": "Why there is no compliant non-DG route"
}
```

Rebuttal rests only on on-site/config facts: `dgMandatoryDate` and `dgAmendment` tokens (company.json `dg.mandatoryFrom` = 2026-01-01, `dg.amendment`), `packingGroup` = III, `unClass` = 4.2, the "inherent vice / not insurable" point already in `selfHeating.body2`, and the "misdeclaration → importer exposure" framing already proven on `/logistics/charcoal-dg-regulation`. No new claim is introduced.

---

## 5. Ontological completeness & triangulation

- **Strong graph, one weak edge — carrier claim.** `whyRefuse.body` asserts "Several major lines have stopped carrying it altogether," but `company.json dg.carriersNotAccepting` is an empty array, so no named refusing line backs it. The statement is a defensible *industry* fact, not a company claim, so it's acceptable — but it is the page's only assertion without a config anchor. If the owner can name even one withdrawn line, it would convert a soft claim into a verifiable one (see §6).
- **Genesis (factory-as-source): explicit.** "we book with carriers that do" / "Every export carton and container carries the … markings" / SHT "on request" position the factory as the shipper-of-record, not a passive definition page. Good.
- **Taxonomy (charcoal's place in DG classification): explicit and well-connected.** UN 1361 → parent entry "Carbon, animal or vegetable origin" → Class 4.2 (spontaneous combustion) → PG III (lowest severity) is fully laid out, with the glossary and regulation pages closing the hierarchy. This is the page's strongest dimension.
- **Pragmatics (buyer value): explicit.** Cargo table = "data your carrier and broker need"; countryEntry hands off to per-market duty guides; FAQ answers the buyer's literal questions. The "prevention not insurance" reframe is high-value pragmatic honesty.
- **Self-Heating Test entity slightly duplicated.** It appears as a key fact, a dedicated H2 (`sht`), and an FAQ item — three touchpoints. Connectivity is fine, but the H2 and the FAQ answer say nearly the same thing; consider letting the H2 own the "after-2026 status" angle and the FAQ own the "what does it physically test" angle (the FAQ already does the latter — the bodies are well-differentiated, so this is a watch-item, not a defect).

---

## 6. Gaps needing owner data

- `whyRefuse.body` / FAQ "Why do some lines refuse" — "Several major lines have stopped carrying it" is currently unbacked (`dg.carriersNotAccepting` is `[]`). <NEEDS-OWNER-DATA: name(s) of any major shipping line(s) that have withdrawn from charcoal carriage, to populate `dg.carriersNotAccepting` and convert the industry-general claim into a verifiable one. If none can be confirmed, leave the claim phrased generally as-is.>

No other placeholders — every other figure on the page resolves from `company.json` or existing on-page text.
