# Content Audit & Targeted Rewrite — Import to Germany
**Route:** /logistics/import-to-germany · **Source:** src/i18n/en/logisticsImportGermany.json, src/i18n/en/logisticsImportCommon.json (en.logisticsImportGermany)

This is a **procedural/reference** page (the EU/German customs mechanics for one declared product). It has no single arguable thesis; its implicit claim is "you can import UN 1361 coconut charcoal into Germany predictably — 4402.20, 0% MFN duty, 19% recoverable import VAT, ICS2/ATLAS entry, with EUDR/REACH the live compliance items." Judged on that basis it is strong: every regulatory cell is dated and source-linked, deliberate omissions (no per-ton price, OR not over-claimed, EUDR framed "working toward") are respected. One real defect: a transit-day figure in the FAQ contradicts the per-port transit list rendered just above it.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | Buyer-question intent is clear, but most H2s are noun labels ("Commodity-code classification", "Duties & import VAT", "The entry process", "Who handles what"). The FAQ block is fully in question form. Reference pages survive on label headings, but converting them to questions lifts snippet/GEO eligibility. |
| 2. Featured-snippet lead | PASS | Every section opens with a self-contained 1–2 sentence answer before elaborating (hts.body, duty.body, landed.body, entry.body, countryAgency intro, responsibility.intro). KeyFacts box also front-loads the extractable answer. |
| 3. Paragraph intent | PASS | Each paragraph maps to a discrete buyer intent (classify / cost / clear / who-does-what / DG / EUDR-REACH / transit). No stray paragraphs. See intent map. |
| 4. No fluff + anti-bloat | PASS | Dense and specification-heavy; almost no filler. Only nitpick: landed.note restates "cash-flow event, not a permanent cost," which also appears in the duty.dutyValue cell and the VAT FAQ — three repetitions of one true point (compress, see §3). |
| 5. Section purity | PASS | Clusters are clean: classification, duty/VAT, landed cost, entry, DG, EUDR/REACH agency, lead time, ports. No cross-bleed; VAT correctly lives inside the duty section as a sibling layer, not a separate intent. |
| 6. Structure / coverage | PARTIAL | Coverage is complete and logically ordered. One internal contradiction: the FAQ "How long does shipping take?" says "roughly 30–38 days of sea transit" while the ports list directly above renders Hamburg and Bremerhaven at 32–45 days (from config `transitTimes`). Self-contradicting numbers on the same page. |
| 7. Devil's Advocate | N/A | Procedural/reference page with no arguable thesis to oppose. The duty/preference section already pre-empts the one live counter-narrative ("Indonesia lost GSP → duty goes up") by showing MFN is 0% regardless. See §4. |
| 8. Quantified evidence | PASS | Claims are quantified and sourced: 0% MFN, 19% EinfuhrUSt (and the 7%-not-available point), EUDR dates (30 Dec 2026 / 30 Jun 2027), deforestation cutoff 31 Dec 2020, REACH >1 t/yr threshold, EC/CAS numbers. No fabricated precision. |
| 9. Mini-cases | N/A | No real, verifiable problem→action→result case exists in source or company.ts. Correctly not invented; none should be added. |
| 10. Ontological completeness | PASS | Strong entity/relation density: 4402.20 vs 4402.90 vs 3802/4401 (taxonomy), ICS2/ATLAS/EORI/TARIC, EUDR/TRACES/DDS, REACH/OR/CLP, Hamburg/Bremerhaven/Tanjung Emas. Genesis (factory-as-source), Taxonomy (heading-4402 position), Pragmatics (recoverable VAT, who-clears) all explicit. See §5. |

**Overall:** strong reference page. Two fixable defects (transit-day contradiction; noun-label headings) and one minor triple-repetition.

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "This page sits under the…" (intro.p1) | Orient: scope = customs mechanics, not commercial pitch; route up to pillar | keep |
| "Germany import at a glance" (keyFacts) | Snippet/zero-click: code, duty, VAT, who-clears, EUDR in one box | keep |
| "The division of labour for…" (responsibility.intro + lists) | "who handles customs / what does the factory do" | keep |
| "Coconut shell charcoal falls under…" (hts.body + candidates) | "what HS / commodity code for coconut charcoal EU/Germany" | keep |
| "EU customs duty on heading 4402…" (duty.body + layer table) | "import duty on charcoal to Germany / EU" | keep |
| "Einfuhrumsatzsteuer 19%…" (vat block) | "German import VAT on charcoal, recoverable?" | keep |
| "No usable duty benefit…" (preference + dutyHistory) | "does Indonesia GSP / Form A still apply" | keep (pre-empts counter-narrative) |
| "Landed cost is the sum of…" (landed.body + dl + note) | "what will it cost me landed in Germany" | keep; compress note (§3) |
| "EU entry for a UN 1361 container…" (entry.body + steps) | "how do I clear customs / ICS2 / ATLAS process" | keep |
| "The cargo arrives as declared UN 1361…" (dgHandling) | "is charcoal dangerous goods at German ports" | keep |
| "Heading 4402 charcoal is listed in Annex I…" (countryAgency / EUDR + REACH) | "does EUDR apply to charcoal, who files, when; REACH/OR" | keep |
| "Production takes about…" (leadTime, common) | "lead time order-to-arrival Indonesia→Germany" | keep |
| "Indicative ocean transit from…" (ports) | "shipping time Semarang to Hamburg/Bremerhaven" | keep |
| "What duty applies… / Is VAT recoverable… / Does EUDR apply… / How long does shipping take" (faq) | Direct buyer questions, FAQPage schema | keep; FIX transit figure in Q4 (§3) |
| Related / other-guides | Internal linking, cocoon | keep |

No delete-as-fluff rows. Every block earns its place.

## 3. Targeted rewrites

### 3.1 — Rule 6 (structure / no contradiction): FAQ transit days contradict the ports list
**The most important fix on the page.** The ports section renders, from config `transitTimes` (Hamburg DEHAM 32–45, Bremerhaven DEBRV 32–45), "about 32–45 days" per port. The FAQ answer hardcodes a different range and then points the reader to that very list — so the page contradicts itself.

CURRENT (`faq.items[3].a`):
> "We model the lane ex-{{portWithCode}} to the main German gateways — Hamburg and Bremerhaven — at roughly 30–38 days of sea transit; see the transit list above for the per-port range. Other German ports are available; confirm routing and the vessel schedule with the carrier at booking."

**Corrected text** (use the same 32–45 range the ports list and config emit; better still, drive it from the `{{transitDays}}` token already computed in `allTokens` so it can never drift):
> "We model the lane ex-{{portWithCode}} to the main German gateways — Hamburg and Bremerhaven — at roughly {{transitDays}} days of sea transit; see the transit list above for the per-port range. Other German ports are available; confirm routing and the vessel schedule with the carrier at booking."

If a literal string is preferred over the token, write "roughly 32–45 days" — matching config — never 30–38. (Note: `{{transitDays}}` is in `allTokens`, which `faqItems` is filled with, so the token will resolve.)

### 3.2 — Rule 1 (headings as questions): convert noun-label H2s to buyer questions
The buyer intent behind each H2 is a question; phrasing it as one improves snippet and GEO pickup. Leads already answer them, so only the heading strings change.

CURRENT → **Corrected**:
- `hts.h2`: "Commodity-code classification" → **"What commodity code is coconut charcoal in Germany?"**
- `duty.h2`: "Duties & import VAT" → **"What duty and import VAT apply in Germany?"**
- `landed.h2`: "Landed-cost worked example" → **"What is the landed cost into Germany?"**
- `entry.h2`: "The entry process" → **"How is a charcoal container cleared into Germany?"** (also used as the HowTo `name` — improves the HowTo headline)
- `dgHandling.h2`: "Dangerous-goods handling at German ports" → **"How is UN 1361 charcoal handled at German ports?"**
- `ports.h2`: "German ports & routing" → **"Which German ports do you ship to, and how long does it take?"**
- `responsibility.h2` (common): "Who handles what" → **"Who handles customs — the factory or the buyer?"** (NOTE: shared across all import-country pages; changing it changes every guide. Acceptable since the question form fits all five, but flag as a shared-component edit.)

`countryAgency.h2` ("EUDR: charcoal is in scope of the EU Deforestation Regulation") already reads as a strong statement-answer; leave it or optionally → "Does EUDR apply to coconut charcoal imported to Germany?".

### 3.3 — Rule 4 (anti-bloat): "cash-flow event, not a permanent cost" stated three times
The recoverability point is correct and load-bearing, but it appears in (a) the duty-table `dutyValue` cell, (b) `landed.note`, and (c) the VAT FAQ answer. Keep it in the FAQ (where the question is asked) and the table cell (where the number lives); compress it out of `landed.note`.

CURRENT (`landed.note`):
> "No charcoal per-ton price is published. The formula is shown so you can plug in your own figures; we quote the live numbers at booking. Import VAT is a cash-flow event, not a permanent cost, for a VAT-registered importer."

**Corrected text** (drop the third restatement; the recoverability detail is fully covered in the VAT block and FAQ directly below):
> "No charcoal per-ton price is published. The formula is shown so you can plug in your own figures; we quote the live numbers at booking — import VAT is recoverable for a VAT-registered importer (see below)."

(Preserves the "never publishes a per-ton price" deliberate omission; only removes the duplicate sentence.)

### 3.4 — Minor: intro/related link to an unbuilt page (`/markets/germany`)
Not a content-text defect — `/markets/germany` is absent from `LIVE_ROUTES`, so `MaybeLink` renders both references as muted non-links by design (graceful degradation), matching the Markets-pillar "not yet shipped" status in CLAUDE.md. No rewrite required; flag only so it is consciously left until the Germany market page ships. The intro sentence "The commercial case for the German market lives on the market page" reads slightly forward-looking until then — acceptable, but consider softening to "…will live on the market page" if the unbuilt state persists.

## 4. Devil's Advocate section
N/A — this is a procedural customs-reference page with no arguable thesis, so a formal opposing-view H2 would be artificial. The one live counter-narrative a German buyer carries — *"Indonesia lost its GSP preference, so my charcoal duty must be going up"* — is already directly pre-empted on-page by the preference note, dutyHistory, and FAQ Q1: EU MFN for heading 4402 is **0% (Free) for all origins**, so the loss of GSP changes the declaration regime (preferential → standard MFN) but **not** the duty amount. That is the correct, fact-based rebuttal and it is already present; no new section is warranted.

## 5. Ontological completeness & triangulation
- **Genesis (factory-as-source): explicit.** The factory's role is named throughout — supplies export data for ICS2/ENS, files nothing itself in ATLAS, is "working toward" the EUDR geolocation/legality evidence, and is the non-EU manufacturer behind the REACH OR / Letter-of-Access. Buyer always knows what originates at the factory vs. what the EU importer owns.
- **Taxonomy (charcoal-classification position): explicit and unusually dense.** 4402.20 ("of shells or nuts") is positioned against the residual 4402.90, with explicit exclusion of 3802 (activated carbon) and 4401 (fuel wood), and GRI 3(a) precedence reasoning. This is the strongest taxonomic node on the page.
- **Pragmatics (buyer value): explicit.** Recoverable VAT framed as cash-flow not cost; "no MRN, no load"; short Class 4.2 free-time → demurrage risk; who-clears split. Each regulatory fact is tied to a buyer consequence.
- **Weak connectivity to close — EUDR↔factory bridge.** EUDR "plot geolocation / deforestation-free / legality" is described as the EU importer's DDS burden, with the factory "working toward" the evidence; the *relationship* between coconut shell being an **agricultural byproduct** (stated only in the buried EUTR item) and why deforestation diligence is still required is left implicit. Surfacing one sentence linking "coconut shell = agricultural byproduct, yet 4402 has no carve-out" into the main EUDR intro would tighten the strongest semantic gap.
- **Weak connectivity — REACH substance identity.** Two substance identities (generic Charcoal EC 240-383-3 vs. coconut-shell Charcoal EC 271-974-4) and the lead registrant are named, but the entity "which identity *your* composition registers under" is left as a TODO for the buyer; this is correct (factory must not over-claim OR coverage) and respects the deliberate no-over-claim omission — keep as is.
- **No isolated concepts.** ICS2, ATLAS, EORI, TARIC, TRACES, DDS, OR, CLP, Aufschubkonto each connect to at least one neighbor entity and a buyer action; nothing floats.

## 6. Gaps needing owner data
- None. The one substantive fix (§3.1, transit days) uses figures already in `company.json` `transitTimes` (32–45) — no owner input required; it is a correction, not a missing fact.
