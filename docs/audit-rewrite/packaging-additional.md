# Content Audit & Targeted Rewrite — Additional Packaging
**Route:** /packaging/additional-packaging · **Source:** src/i18n/en/packagingAdditional.json (en.packagingAdditional)

This is a procedural / reference catalog page: branded consumables, load securing, and transit protection in three functional groups. It has no single arguable thesis, so Devil's Advocate and mini-case rules apply only where a defensible position actually exists. The page already respects every honesty guard in the .astro header (no prices, no consumable spec tables, QR-honesty disclaimer, container counts delegated, single ISPM-15 outbound link). Scoring reflects a strong, deliberately-built page.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | All 9 FAQ items are clean buyer questions. But the section H2s/H3s are noun labels ("The three groups", "Load securing", "Branded stickers & labels", "Strapping", "Edge protectors / corner boards"). For a scannable catalog this is defensible and the FAQ carries the question load — but the three group H2s each map cleanly to a buyer question and would gain snippet/voice reach in question form. See §3. |
| 2. Featured-snippet lead | PASS | Every H2 opens with a self-contained answer: `groups.intro` defines the three jobs in one sentence; `group3.desiccant.body` leads with "Desiccant absorbs residual humidity over sea transit at two levels…"; `ordering.body` leads with "Add-ons are ordered together with your container order, not standalone." H3 bodies are 1-2 sentence definitions. The only weak spot: `group1.h2` ("Branding & anti-counterfeit consumables") is led by a meta `note` about specs/artwork, not by a one-line answer to "what is this group" — minor. |
| 3. Paragraph intent | PASS | Each paragraph serves one identifiable buyer intent (verify capability, understand cost/spec policy, brand protection, moisture protection). No stray paragraphs. See intent map §2. |
| 4. No fluff + anti-bloat | PASS | Prose is dense and spec-forward; defaults stated economically ("plain tape is the default"). One borderline line — `antiCounterfeitNote` ends with "Protecting a brand is part of owning one." — is mild marketing flourish but functions as the white-label cross-sell bridge, so it earns its place. No 20%-cuttable paragraph found. |
| 5. Section purity | PASS | Three groups map to three intent clusters (branding/anti-counterfeit, load securing, transit protection) with no bleed. The one cross-cluster item — branded silica gel under Group 1 — is correctly flagged in-text ("The moisture function is covered under transit protection below"), so the duplication is signposted, not accidental. |
| 6. Structure / coverage | PASS | Logical flow: at-a-glance → three-group orientation → group 1/2/3 → how-to-order → video → FAQ → related. No logic gaps. Desiccant appears in both Group 1 (branded sachet) and Group 3 (moisture function) but is explicitly disambiguated, so no true duplicated meaning. |
| 7. Devil's Advocate | N/A | Procedural catalog with no contested thesis. The nearest defensible position ("buy add-ons here vs. source locally / skip them") is weak and partly addressed by `ordering.body` (add-ons ship with the container). See §4. |
| 8. Quantified evidence | PARTIAL | Honesty-correct: the page deliberately ships zero fabricated numbers (specs are made-to-order, prices on request — both .astro guards). The legitimately citable hard facts that DO exist are present: "ISPM-15 heat-treated and stamped", "two levels" of desiccant, "three groups". Container counts are correctly delegated to the hub/master-box pages rather than duplicated. No fabrication; the gap is structural to the page's no-spec policy, not a defect. |
| 9. Mini-cases | N/A | No real problem→action→result customer data exists on-site; correctly none invented. |
| 10. Ontological completeness | PASS | Strong entity coverage: each add-on is named, defined, and related to a buyer job; DefinedTerm schema anchors "branded consumables" to the glossary; cross-links to white-label, master-box, plastic, logistics/rules, and the IPPC standard knit the entity graph. Genesis (factory-as-printer, "we print, we don't design"), Taxonomy (add-ons as the optional layer "beyond the standard plastic–box–carton stack"), and Pragmatics (brand protection, load stability, moisture defense) are all explicit. |

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "Packaging add-ons are the optional…" (heroSubtitle) | Define "packaging add-ons" + place them in the system | keep |
| "Add-ons fall into three jobs…" (groups.intro) | Orientation: what categories exist | keep |
| "Consumable specs — sticker sizes…" (group1.note) | Set cost/spec expectation + artwork-ownership ("we print, we don't design") | keep |
| "Printed stickers and labels carrying…" (stickers.body) | Capability: branded stickers | keep |
| "Resin-domed stickers give a premium…" (domed.body) | Capability + soft anti-counterfeit cue | keep |
| "QR stickers let your customers verify…" (qr.body) | Capability + QR-honesty boundary (verification is buyer's) | keep |
| "Tamper-evident holographic security…" (hologram.body) | Capability: anti-counterfeit/tamper evidence | keep |
| "QR, hologram, and 3D domed stickers…" (antiCounterfeitNote) | Bundle the set + white-label cross-sell | keep |
| "Full-color labels applied to the master…" (boxLabels.body) | Decision: label vs direct carton print (cost/run-size) | keep |
| "Printed sealing tape carries your brand…" (tape.body) | Capability: branded tape; default stated | keep |
| "Desiccant sachets can carry your brand…" (silica.body) | Capability: branded silica; cross-ref to transit | keep |
| "Printed inserts inside the inner box…" (inserts.body) | Capability: inserts/leaflets/cards | keep |
| "PP strapping holds master cartons…" (strapping.body) | Capability: load securing | keep |
| "Corner boards protect carton edges…" (edgeProtectors.body) | Capability + why (compression spread) | keep |
| "Cartons can ship palletized rather…" (pallets.body) | Decision: palletized vs floor-stuffed + ISPM-15 compliance | keep |
| "Desiccant absorbs residual humidity…" (group3.desiccant.body) | Moisture-defense system (two levels, layered story) | keep |
| "A thermal blanket lines the container…" (group3.thermal.body) | When to use thermal blanket (container rain) | keep |
| "Add-ons are ordered together with your…" (ordering.body) | How/when to order + pricing-on-request | keep |
| FAQ ×9 (q/a) | Direct buyer questions → snippet/voice + FAQPage schema | keep |

No paragraph rated compress/rewrite/delete-as-fluff. The page is already lean.

## 3. Targeted rewrites

The only genuine framework gap is **Rule 1 (headings as questions)** on the three group H2s. Converting these to question form lifts voice-search and snippet eligibility without touching any fact, guard, or the deliberate catalog-label H3s. These are optional polish, not corrections — the page passes as-is. Each rewrite keeps the existing snippet lead intact directly beneath.

**Rule 1 — group H2 → question form**

Current (`group1.h2`):
> "Branding & anti-counterfeit consumables"

Corrected:
> "What branding and anti-counterfeit consumables can you add?"

Current (`group2.h2`):
> "Load securing"

Corrected:
> "How is the load secured for container transit?"

Current (`group3.h2`):
> "Transit protection"

Corrected:
> "How is the cargo protected from moisture in transit?"

Note: if these H2s are changed, update the matching `groups.items[].label` chips ("Branding & anti-counterfeit consumables", "Load securing", "Transit protection") only if you want the jump-link labels to mirror the new headings — but the short noun labels are better as nav chips, so leave the chips as-is. The anchors (`#branded-consumables`, `#load-securing`, `#transit-protection`) are unaffected.

**Rule 2 — minor: give `group1.h2` a one-line answer lead**

Under the current Group 1 heading the first paragraph (`group1.note`) is a meta-note about specs and artwork, not a one-line answer to "what's in this group." A short lead would tighten snippet eligibility. Add a new lead sentence (e.g. as a `group1.lead` value rendered above `note`), or prepend it to `note`:

Suggested lead (facts already on page — the four sticker types + tape/silica/labels/inserts):
> "Branded consumables put your brand on the package: stickers (including 3D domed, QR, and hologram security types), printed box labels, branded tape, branded silica, and inserts — all printed from your supplied artwork."

This duplicates nothing new and stays inside the no-spec guard. (Lower priority than the H2 rewrites; the existing note is not wrong, just not answer-shaped.)

No other rewrites: anti-bloat, intent, purity, snippet leads on Groups 2/3 and ordering, and all FAQ entries already pass.

## 4. Devil's Advocate section

N/A — this is a procedural reference catalog of optional packaging layers with no contested thesis to defend; the nearest opposing buyer view ("skip add-ons or source them locally at destination") is weak and already pre-empted by `ordering.body` ("Add-ons are ordered together with your container order, not standalone") and the ISPM-15 / container-rain rationale in Groups 2-3, so a full opposing-view H2 would be manufactured rather than genuine.

## 5. Ontological completeness & triangulation

- **Genesis — explicit and well-bounded.** Factory-as-source is clear via the artwork-ownership stance ("we print, we don't design") and the QR-honesty boundary ("the verification system is yours; we don't host or manage them"). Strong, and honesty-correct.
- **Taxonomy — explicit.** Add-ons are positioned as "the optional layers beyond the standard plastic–box–carton stack," nesting this page correctly under the packaging system. The only weakly-connected entity is **FSC paper** (present in `company.packaging.ancillary.fscPaper`) which is never surfaced here — if real, an "FSC-certified paper / sustainable materials" line under Group 1 would close a small semantic gap and serve EU buyer intent. Flag, don't fabricate (see §6).
- **Pragmatics — explicit.** Each item ties to a buyer payoff: brand protection (anti-counterfeit set), load stability (strapping/edge/pallets), moisture defense (the layered plastic→desiccant→thermal story). Pragmatic value is the strongest of the three axes here.
- **Cross-entity connectivity is dense:** white-label, master-box (#printing-branding), inner plastic, logistics/rules, glossary#branded-consumables, and the IPPC ISPM-15 standard are all linked, with no isolated concept left dangling. The deliberate omission of /quality from related topics is honored.
- **One disambiguation handled well:** "desiccant/silica gel" legitimately appears in both Group 1 (branded sachet) and Group 3 (moisture function); the in-text pointer ("covered under transit protection below") prevents this from reading as duplicated meaning.

## 6. Gaps needing owner data

- <NEEDS-OWNER-DATA: Is FSC-certified / sustainable packaging paper actually offered (company.packaging.ancillary.fscPaper is null/untoggled)? If yes, add a short "FSC paper / sustainable materials" capability line under Group 1 to serve EU/German buyer intent — do not state it until confirmed.>
- <NEEDS-OWNER-DATA: Are silica desiccant sachets standard in every order, or add-on only? FAQ #5 currently says "Whether sachets are standard in every order is confirmed on inquiry." If a definite policy exists (company.packaging.ancillary.desiccantIncluded), replace the hedge with the firm answer.>
