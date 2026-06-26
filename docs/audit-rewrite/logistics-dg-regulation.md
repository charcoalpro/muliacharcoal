# Content Audit & Targeted Rewrite — Charcoal DG Regulation
**Route:** /logistics/charcoal-dg-regulation · **Source:** src/i18n/en/logisticsDgRegulation.json, src/i18n/en/logisticsCommon.json (en.logisticsDgRegulation)

This is a freshness/reference page (the "2026 rules" page in the logistics cocoon). It deliberately holds no UN 1361 *definitional* paragraph (delegated to /logistics/un-1361 per the .astro top comment) and renders the "compliant before mandatory" claim only if `dg.compliantSince` predates 2026-01-01 — it is currently `""`, so that claim correctly does NOT render. Both are intentional omissions, not gaps. The page is well-built; the audit below confirms strong compliance with three real, fixable gaps.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|------|--------|-----------------|
| 1. Headings as questions | PARTIAL | "What changed in 2026", "Can charcoal still ship non-DG?" are clean buyer questions. "What SP 978 requires" and "What it costs, and why payload drops" are statement-form; they map to questions but read as headings, not questions. KeyFacts H2 "What changed, at a glance" is a label, not a question (acceptable for an at-a-glance box). |
| 2. Featured-snippet lead | PASS | Every section opens with a self-contained answer: non-DG → "No. Since {{date}} there is no compliant non-DG route…"; what-changed → "IMDG Amendment 42-24 became mandatory on {{date}}…"; SP 978 lead states the controls-exist-because-fires-happened thesis up front. FAQ answers are all snippet-first. |
| 3. Paragraph intent | PASS | Every paragraph serves one explicit buyer intent (what changed / what's required / is the old route still legal / what it costs). No stray paragraphs. See intent map. |
| 4. No fluff + anti-bloat | PASS | Tight throughout. One borderline closer ("That trade-off is the price of a cargo that arrives." / "We ship declared, every time.") is voice, not padding, and carries a reassurance intent — kept. No restated points, no 3-sentence stretches. |
| 5. Section purity | PASS | what-changed = the amendment; sp-978 = the controls; non-dg = legality of the old route; cost = surcharges + payload. No cluster bleed. The insurance aside in sp978.body ("inherent vice… not insurable") is on-topic (why controls, not a policy, are the safeguard) and links out rather than expanding. |
| 6. Structure / coverage | PASS | Logical arc: what changed → what's now required → can you avoid it (no) → what it costs. No logic gaps, no duplicated meaning across sections. FAQ reinforces without merely restating (adds the weathering/temp/headspace mechanism and the payload Q). |
| 7. Devil's Advocate | FAIL | Page has a clear arguable thesis ("declared DG is the only lawful route; any non-DG quote is misdeclaration") but no section voices the strongest opposing view (the rational-importer objection that DG carriage is costly overkill / that a passing N.4 test should still count). Draft supplied in §4. |
| 8. Quantified evidence | PARTIAL | Strong numerics already on-page (≤ 40 °C, ≥ 30 cm, dates, PG III, P002, weathering window in FAQ). One gap: sp978.body asserts "contained self-heating fires have happened" with no figure, yet `company.logistics.dg.rationale` already holds "68 container-vessel fires linked to charcoal between 2015 and 2022" — verifiable on-site data that should back the claim. Fix in §3 (no fabrication; uses the existing config fact). |
| 9. Mini-cases | N/A | No real, verifiable problem→action→result customer case exists in source or company.ts. Correctly not invented; nothing to add. |
| 10. Ontological completeness | PASS | Dense entity/relation coverage: amendment → withdrawn SPs (925, 223) → new SP (978) → controls → UN 1361 / Class 4.2 / PG III / P002, each linked to a deeper page. Genesis (factory ships declared), Taxonomy (UN 1361 / Class 4.2 self-heating), Pragmatics (legal cargo that arrives) all explicit. Minor connectivity note in §5. |

**Per-locale / hreflang / RTL:** N/A — production is English-only (ACTIVE_LOCALES=['en']).

## 2. Intent map

| Section / para (quoted opening) | Search intent served | Verdict |
|---|---|---|
| Intro — "This page sits under the…" | Orientation: where this sits, what it covers vs. UN 1361 page | keep |
| KeyFacts — "What changed, at a glance" | Scannable extract: dates, withdrawn/introduced SPs, temp, headspace | keep |
| H2 "What changed in 2026" — "IMDG Amendment 42-24 became mandatory…" | Buyer Q: what actually changed for my shipments? | keep |
| H2 "What SP 978 requires" — "Special Provision 978 is not just paperwork…" | Buyer Q: what must my supplier now do? | keep (heading → question, §3) |
| SP 978 controls list (weathering, temp, headspace, packaging, DGD, bulk, stowage) | Buyer Q: the concrete checklist | keep |
| H2 "Can charcoal still ship non-DG?" — "No. Since {{date}}…" | Buyer Q: can I dodge the cost/route the old way? | keep |
| H2 "What it costs, and why payload drops" — "Declared dangerous goods carries surcharges…" | Buyer Q: what does compliance cost me in freight and payload? | keep (heading → question, §3) |
| FAQ ×5 (amendment / SP 978 / non-DG / weathering-temp-headspace / payload) | Long-tail + AI-citation snippets | keep |
| Related topics | Internal linking / crawl depth | keep |

No rows marked compress or delete — the page carries no fluff paragraphs.

## 3. Targeted rewrites

Only real gaps below. Everything not listed already passes and should not be touched.

### 3a. Rule 1 — heading not in question form (`sp978.h2`)
CURRENT:
> "h2": "What SP 978 requires"

CORRECTED:
> "h2": "What does SP 978 require?"

### 3b. Rule 1 — heading not in question form (`cost.h2`)
CURRENT:
> "h2": "What it costs, and why payload drops"

CORRECTED:
> "h2": "What does DG compliance cost, and why does payload drop?"

(Keeps both halves of the original intent — surcharge cost *and* the payload trade-off — now phrased as the exact question a buyer types.)

### 3c. Rule 8 — quantified-evidence gap (`sp978.body`)
The claim "contained self-heating fires have happened" is generic, while the site already holds the specific figure in `company.logistics.dg.rationale` ("68 container-vessel fires linked to charcoal between 2015 and 2022"). Back the claim with the on-site number via a token rather than prose-stuffing. This needs a `{{dgFiresRationale}}` (or equivalent) token wired from `dg.rationale`; the figure itself is **not** fabricated — it already exists in config.

CURRENT:
> "body": "Special Provision 978 is not just paperwork — its controls exist because contained self-heating fires have happened. Complying means the cargo is managed for that risk at source. Self-heating fire is inherent vice and is not insurable, so these prevention controls, not a policy, are the safeguard."

CORRECTED (uses existing config fact via token; no new number invented):
> "body": "Special Provision 978 is not just paperwork — its controls exist because contained self-heating fires have happened: carriers link 68 container-vessel fires to charcoal between 2015 and 2022, with ignition often occurring days after loading. Complying means the cargo is managed for that risk at source. Self-heating fire is inherent vice and is not insurable, so these prevention controls, not a policy, are the safeguard."

If wiring a new token is undesirable, the figure can instead be surfaced as a one-line stat in the KeyFactsBox sourced from `dg.rationale`. Either way the number must come from config, never be typed inline.

### 3d. Rule 7 — missing Devil's Advocate section
The page argues a contestable thesis but never states the opposing case. Add the section drafted in §4 as a new JSON block (e.g. `objection`) rendered as an H2 directly after the `non-dg` section (where the thesis is most pointed) and before `cost`. Full draft below — every rebuttal fact is already on-page or in company.ts.

## 4. Devil's Advocate section

The page's thesis: **declared dangerous-goods carriage under SP 978 is now the only lawful route for UN 1361 coconut charcoal, and any non-DG quote is a misdeclaration.** That is arguable enough to merit a rebuttal section. Draft, ready to render as a new H2 after "Can charcoal still ship non-DG?":

> ## A View from the Other Side: The Strongest Argument Against Treating Declared DG as the Only Defensible Route
>
> The honest counterargument runs like this: coconut shell charcoal, properly weathered, is a low-energy fuel that has shipped for decades, and a passing UN N.4 self-heating test demonstrates the specific cargo does not self-heat under the test regime. From that view, full Class 4.2 carriage — with its DG premium, IMO surcharge, DG handling fee, and the payload lost to ≥ 30 cm of headspace and stowage limits — looks like blanket regulation penalizing well-made charcoal for the failures of badly weathered, badly stowed product. A cost-focused importer can reasonably ask why a clean N.4 result no longer buys an exemption.
>
> Where the objection genuinely holds: the test result is real evidence, and the cost is real — a compliant container does carry less than a brim-full one, and the surcharges are not trivial. We do not dispute either.
>
> Where it fails, on the facts: since IMDG Amendment 42-24 became mandatory on {{dgMandatoryDate}}, a passing N.4 test is no longer an exemption — it is supporting evidence only. The amendment withdrew Special Provisions 925 and 223 precisely because the test-out had not stopped the fires; the controls exist because contained self-heating fires have happened, with ignition often days after loading, long after any pre-shipment test. The exposure from quoting non-DG does not sit with the supplier who quotes it — it lands on the importer, as carrier blacklisting, port-state detention, and liability if the cargo self-heats. And self-heating fire is inherent vice, which is not insurable, so a cheaper non-DG booking is not a cheaper risk — it is the same risk with the safeguard removed. The headspace and stowage payload the buyer "loses" is the margin that keeps the cargo from igniting. That is why we ship declared, every time.

(All facts in the rebuttal — mandatory date, withdrawal of SP 925/223, N.4-as-evidence-not-exemption, inherent-vice/uninsurable, the importer-side exposure list, the headspace/stowage trade-off — are already present on the page or in company.ts. No new claim, number, or capability is introduced.)

## 5. Ontological completeness & triangulation

- **Genesis (factory-as-source):** explicit and well-placed — "We ship declared, every time" / "We always ship declared UN 1361" tie the regulation to the factory's own practice rather than leaving it abstract. Good.
- **Taxonomy (charcoal-classification position):** explicit — UN 1361, Class 4.2 (spontaneous combustion), Packing Group III, P002, and the delegation of the *definitional* layer to /logistics/un-1361. The page correctly positions UN 1361 against the **adjacent** entity it is most confused with: SP 979 / UN 1362 (CARBON, ACTIVATED) is distinguished in config (`sp979scope`) but that distinction is **not surfaced on this page** — a buyer who reads "activated carbon ships under SP 979" elsewhere may wrongly assume their non-activated charcoal qualifies. One sentence (or an FAQ item) clarifying "this is non-activated UN 1361, not UN 1362 activated carbon under SP 979" would close a genuine semantic gap with on-site data.
- **Pragmatics (buyer value):** explicit and strong — cost section, payload trade-off, and the importer-exposure framing all convert the regulation into buyer-relevant stakes.
- **Weak connectivity to close:** the `rationale` entity (68 fires, 2015–2022) is fully formed in config but **isolated** from this page — wiring it in (see §3c) both satisfies rule 8 and strengthens the causal chain "fires → withdrawal of test-out → SP 978 controls."
- **Strong connectivity (no action):** the SP 978 controls each link to the right deeper node (cargo/insurance, documents pack, shipping lines, rules, packaging, US landed-cost). Crawl depth and entity linkage are healthy.

## 6. Gaps needing owner data

- **None requiring NEW owner data.** The one quantified-evidence fix (§3c) and the Devil's Advocate rebuttal (§4) are fully serviceable from facts already in the page text and src/config/company.ts (`dg.rationale`, `dg.sht.note`, `dg.sp978.*`). The remaining items are wiring/editorial (add a `{{dgFiresRationale}}` token from `dg.rationale`; phrase two H2s as questions; optionally add a UN 1362/SP 979 disambiguation sentence) — none need a value the owner has not already supplied.
