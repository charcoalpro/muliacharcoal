# Content Audit & Targeted Rewrite — Production Process
**Route:** /factory/production-process · **Source:** src/i18n/en/factoryProductionProcess.json, src/i18n/en/factoryCommon.json (en.factoryProductionProcess)

This is a procedural / how-it's-made reference page. It carries no single arguable thesis, but it does advance one implicit claim worth defending: *the full process runs in-house and every batch passes in-process QC before packing.* The audit judges it on extractability, completeness, and snippet quality, and supplies a Devil's Advocate section against that implicit in-house claim.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | Detailed sub-section H2s are process-stage noun labels ("1. Carbonization", "4. Binder & pressing"), not buyer questions. This is defensible — the ids must match glossary `see` fragments verbatim (`#carbonization`, `#pyrolysis`, `#kiln`, `#binder`, `#weathering`), so renaming would break anchors. The FAQ block re-expresses the same intents in question form ("How is coconut shell charcoal made?", "Why are the briquettes weathered…"). Fix is a light eyebrow/intent gloss, not a rename. |
| 2. Featured-snippet lead | PASS | TL;DR is a clean definition-form block. Each sub-section opens with a self-contained answer: "Carbonization heats coconut shells in a low-oxygen kiln to roughly 400–700°C…"; "The reaction inside the kiln is pyrolysis…"; "Before packing, the briquettes are weathered under cover for at least 14 days." Strong extractable leads throughout. |
| 3. Paragraph intent | PASS | Every paragraph maps to a clear intent (see §2). No orphan paragraphs. |
| 4. No fluff + anti-bloat | PARTIAL | Mostly tight. Two soft spots: the QC lead "Quality is built in during production, not just checked at the end" is a slogan that adds no fact, and the intro's "with the temperatures and durations that matter" over-promises (drying's ≈18–24 h and milling have no detailed narration; see Rule 6). |
| 5. Section purity | PASS | Each H2 owns one cluster: carbonization, pyrolysis chemistry, kiln cycle, binder/pressing, weathering, QC, develop-to-spec. No bleed. |
| 6. Structure | PARTIAL | The 7-stage at-a-glance lists **milling** and **drying** (≈18–24 h), but the five detailed sub-sections cover only carbonization / pyrolysis / kiln / binder / weathering — milling and drying get no prose. The intro promises "the temperatures and durations that matter," yet the drying duration is shown only as a list chip, never narrated. Small coverage gap against the page's own promise. |
| 7. Devil's Advocate | N/A → see §4 | Procedural page, but it makes an implicit in-house/every-batch claim; §4 supplies a real counterargument and an on-site rebuttal. Not currently present on the page (acceptable for a reference page; optional add). |
| 8. Quantified evidence | PASS | Dense, all config-sourced: 400–700°C, 7 stages, 8 ovens, ~1.5 t/batch, 24-h cycle, ≈18–24 h drying, ≥14-day weathering, 6-stage QC, reference sample per batch. Numbers are genuine, not embellished. |
| 9. Mini-cases | N/A | No verifiable customer problem→action→result data exists on the page or in company.ts. Correctly omitted; do not invent one. |
| 10. Ontological completeness | PASS | Strong entity web: shell → carbonization → pyrolysis → char → milling → tapioca binder → pressing → drying → weathering → QC → COA. Genesis (in-house Semarang factory, kiln cycle), Taxonomy (coconut-shell charcoal vs the broader category, low-ash positioning), and Pragmatics (consistent burn time / ash, DG safety for sea freight) are all explicit. Glossary cross-links close most isolated terms. |

**Original-page score: 88 / 100** — extractable, numerically dense, honest, well cross-linked; held back only by two stage gaps (milling/drying narration) against its own intro promise and a couple of slogan phrasings.

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "Coconut shell charcoal is made by…" (TL;DR) | Definitional / featured-snippet "how is coconut charcoal made" | keep |
| "Every briquette we ship is made in-house…" (intro) | Trust / vertical-integration intent | keep (trim over-promise — see §3) |
| "Seven stages take coconut shell…" (overview lead) | Process-overview / scannable map | keep |
| "The inputs are simple: coconut shell and…" (supplyNote) | Inputs / "what's in it" + no-additives reassurance | keep |
| "Carbonization heats coconut shells in a low-oxygen kiln…" | "what is carbonization" + heat/burn benefit | keep |
| "The reaction inside the kiln is pyrolysis…" | "what is pyrolysis" definitional | keep |
| "We run 8 carbonization ovens…" (kiln) | Capacity/consistency proof + "how kilns work" | keep |
| "The milled char is mixed with tapioca…" (binder) | "what binder" + clean-burn/no-chemical reassurance | keep |
| "Before packing, the briquettes are weathered…" | "why/how long weathering" + DG-safety intent | keep |
| "Quality is built in during production…" (QC lead) | QC-process intent | rewrite (slogan → fact-led answer) |
| 6 QC step lines | Granular QC proof | keep |
| "We retain a reference sample…" (retention) | Traceability / dispute-resolution intent | keep |
| "Each order also ships with a batch COA…" | Documentation intent → routes to Quality | keep |
| "Have a target ash, density, or burn profile?" (develop-to-spec) | Private-label / custom-spec intent | keep |
| FAQ ×6 | Question-form restatement for GEO/PAA capture | keep |
| Related topics | Internal-link mesh | keep |

## 3. Targeted rewrites

Only genuine gaps below. Sub-section H2 ids are anchor-locked to glossary fragments and must not change; rewrites preserve them.

### Rule 4/6 — intro over-promises "temperatures and durations" the page doesn't fully narrate
The intro promises temperatures *and durations* "that matter," but only carbonization temperature and weathering duration are narrated in prose; milling and drying (≈18–24 h) appear only as list chips. Either soften the promise or add the missing narration. Lowest-risk fix is to soften (no new facts needed).

CURRENT (`intro.p1`):
> "Every briquette we ship is made in-house, start to finish. This page details that process, stage by stage, with the temperatures and durations that matter — part of our"

CORRECTED:
> "Every briquette we ship is made in-house, start to finish. This page walks the process stage by stage — with the carbonization temperature, drying window, and weathering period that decide burn time and ash — part of our"

(Both "drying window" ≈18–24 h and "weathering period" ≥14 days are already config-sourced via the at-a-glance steps, so this names what is already on the page rather than adding a claim.)

### Rule 4 — QC lead is a slogan, not an answer
CURRENT (`qc.body`):
> "Quality is built in during production, not just checked at the end. Every batch moves through our 6-stage in-process control framework:"

CORRECTED (fact-led self-contained answer; keeps the count token):
> "Quality control here is in-process, not just a final inspection: every batch passes a {{qcStepCount}}-stage framework — from raw-shell intake through carbonization, powder, mix, and dimensional checks to a finished-batch burn and ash test — before it is cleared for packing."

### Rule 6 — milling/drying coverage gap (optional content add, NOT an anchor sub-section)
The five detailed sub-sections deliberately map to glossary fragments, so adding a sixth that breaks that pattern is not advised. Instead, give milling and drying one narrated sentence each inside the existing flow. Cleanest home is the overview lead, which currently states the stage count but skips what milling/drying do.

CURRENT (`overview.body`):
> "Seven stages take coconut shell from a raw byproduct to a finished, low-ash briquette:"

CORRECTED:
> "Seven stages take coconut shell from a raw byproduct to a finished, low-ash briquette. Two of them set consistency: milling sieves the char to a uniform particle size, and a temperature-controlled drying tunnel brings every briquette to a low, stable moisture before weathering."

(Particle-size milling and temperature-controlled drying are already stated in `f.processSteps` notes — this surfaces existing config facts into prose; no new figure introduced. If a specific drying temperature is ever wanted in prose, it is <NEEDS-OWNER-DATA>, since only a duration range exists today.)

### Rule 1 — heading intent gloss (light; do not rename anchors)
No rewrite of the H2 text is recommended (anchor + glossary coupling). The intent is already recovered by the FAQ block. No change required; logged here only to record that the PARTIAL is a known, accepted constraint, not an oversight.

## 4. Devil's Advocate section

The page does not currently include one, and for a pure how-it's-made reference page that is acceptable. Its implicit thesis, however, is *"we control every stage in-house and QC every batch,"* and there is a real industry counterargument. A drop-in section follows; it adds no new facts.

> ## "Isn't a Trader With Many Suppliers More Flexible Than One Factory?"
>
> The strongest counterargument is real: a trading house that aggregates output from several workshops can quote almost any shape, grade, or volume on short notice, and can swap suppliers if one stumbles. A single factory's catalog and monthly ceiling are, by definition, finite.
>
> That flexibility has a cost the buyer inherits: with multiple unnamed workshops feeding one shipment, ash, density, and burn time can drift from carton to carton, and there is no single party who can trace a complaint to the run that caused it. Our model trades breadth for traceability. Every briquette is carbonized in our own {{ovenType}} ovens, milled and pressed on our own lines, and cleared through one {{qcStepCount}}-stage in-process framework with a reference sample retained from every batch — so a query months later maps to an exact production run. On volume, one 18-ton container is a small fraction of monthly output, so "one factory" is not the bottleneck the trader model implies. For a buyer building a brand on repeat-order consistency, a documented single chain beats a flexible but unattributable one.

(Tokens `{{ovenType}}`, `{{qcStepCount}}` resolve from config; "18-ton container as a small fraction of monthly output" restates `oneContainerPctOfMonthly` framing already used elsewhere — no new number.)

## 5. Ontological completeness & triangulation

- **Genesis — explicit and strong.** In-house Semarang factory, named kiln cycle (8 ovens, ~1.5 t/batch, 24 h), and the "made in-house, start to finish" frame establish the factory-as-source clearly.
- **Taxonomy — explicit.** Coconut-shell charcoal is positioned within the carbonization → pyrolysis → fixed-carbon lineage and against the low-ash briquette category; glossary cross-links anchor each term. Could be marginally stronger by one phrase contrasting coconut-shell char with wood/bamboo char at the carbonization step (that contrast lives on the guide pages, so a single bridging clause + link would tighten the web — optional, not a gap).
- **Pragmatics — explicit.** Buyer value is stated at each stage: temperature stability → consistent fixed carbon/ash/burn; natural binder → no off-taste; weathering → DG sea-freight safety; QC + retained sample → traceability.
- **Weakly connected entities to close:** *milling* and *drying* are named in the at-a-glance but have no narrated relation to the consistency story (addressed in §3 Rule 6). *Equipment* (crushers, hammer mills, presses, drying tunnels) feeds the HowTo `tool` schema but is invisible in the visible prose — a one-line "on machinery we own" reference would connect the equipment entity to the in-house claim (optional).
- **Triangulation verdict:** all three vertices present and explicit; the only loose threads are the two unnarrated stages and the offstage equipment list.

## 6. Gaps needing owner data

- **Drying temperature for prose** — only a duration range (≈18–24 h) exists in config; if a stated drying temperature is ever wanted in narration it is `<NEEDS-OWNER-DATA: drying-tunnel temperature, °C>`. No figure should be invented; the §3 rewrites use only the existing duration.

All other facts used in the rewrites (carbonization temperature, weathering days, QC stage count, oven type, oven cycle, container-share framing) already exist in src/config/company.ts / src/data/company.json. No fabricated values introduced.
