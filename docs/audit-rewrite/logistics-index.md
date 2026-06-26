# Content Audit & Targeted Rewrite — Logistics pillar
**Route:** /logistics · **Source:** src/i18n/en/logistics.json, src/i18n/en/logisticsCommon.json (en.logistics)

This is a pillar **hub**: a parent-entity intro, a "Shipping at a glance" facts box, seven short child-entity sections that each link down to a cluster page, a transit table, an order→port timeline, a one-paragraph DG overview, and a hub-canonical FAQ. It is deliberately shallow by design — the cluster pages carry depth and rank. All facts resolve from `company.json` via `logisticsTokens()`; none are hardcoded in prose. The page is procedural/reference, not thesis-driven, but it does carry one implicit argument worth a Devil's Advocate pass (see §4).

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | Most H2s are noun-phrase labels ("Shipping rules & incoterms", "Export documents", "Carriers that ship charcoal", "Cargo protection & insurance", "Importing charcoal to the USA"). Two already map to buyer questions ("UN 1361: is charcoal dangerous goods?", "From order to your port" → "how long?"). The FAQ is fully question-form. Child H2s are intentionally entity labels for the cluster anchors, which is defensible for a hub, but several could be question-mapped without losing the anchor. |
| 2. Featured-snippet lead | PASS | Every section opens with a self-contained definition/answer before elaboration: `atAGlance.definition`, each `children.*.definition`, `transit.intro`, `timeline.body`, `dgOverview.body1`. Clean snippet bait throughout. |
| 3. Paragraph intent | PASS | No stray paragraphs. intro p1 = scope, p2 = DG-is-mandatory framing, p3 = customs-is-buyer's. Each child block = one cluster's purpose. Intents are explicit (see §2). |
| 4. No fluff + anti-bloat | PASS | Tight, specification-dense, no restatement. One borderline opener — heroSubtitle's "Logistics is the discipline of moving your container…" — is a definition-style sentence (GEO-useful), not filler, so it stays. |
| 5. Section purity | PASS | Each H2 holds one intent cluster. DG appears in three places (un1361, dgRegulation, dgOverview) but each has a distinct facet (classification / 2026 rule change / one-paragraph close), not bleed. Insurance's "self-heating is inherent vice" recurs across un1361 + cargoProtection + dgOverview — this is reinforcement of the single most consequential buyer fact, acceptable on a hub. |
| 6. Structure | PASS | No logic gaps; covers order→production→trucking→DG booking→transit→clearance→docs→insurance→country import. The order→port timeline closes the loop the intro opens. No duplicated meaning beyond the deliberate DG reinforcement noted above. |
| 7. Devil's Advocate | N/A→PARTIAL | A pure hub need not host a counter-thesis (the cluster pages argue). But the page does carry one implicit, contestable claim ("there is no compliant non-DG route; any non-DG quote is misdeclaration"). A buyer hears the opposite pitch from cheaper suppliers daily. An optional short rebuttal block would strengthen it — drafted in §4. Not a failure; scored as an opportunity. |
| 8. Quantified evidence | PASS | Dense with extractable numbers, all config-sourced: MOQ, 20ft/40HQ net tons, transit day-ranges per port (table + per-market sentences), lead time, PG III, Class self-heat, SP 978 ≤40 °C / 30 cm headspace, 8 standard + 4 additional docs, HS 4402.20. Strong AI-citation surface. |
| 9. Mini-cases | N/A | No customer cases claimed or implied. Correct for a hub; fabricating one would breach the honesty guardrail. Not a gap. |
| 10. Ontological completeness | PASS | Genesis (factory at Tanjung Emas / IDSRG), Taxonomy (UN 1361 "Carbon… vegetable origin", Class 4.2, PG III), and Pragmatics (buyer planning value: dates, day-ranges, who-owns-customs) are all explicit and densely cross-linked to the seven children + packaging + quality. See §5 for the two weak edges. |

**Net:** a strong, honest, well-structured hub. The only substantive issues are (a) two child facts whose underlying config data does not currently back the prose (see §3), and (b) heading-question mapping and an optional Devil's-Advocate block as upside. Original-page compliance is high.

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| heroSubtitle "Logistics is the discipline of…" | Definitional anchor + scope ("what does shipping from this factory involve") | keep |
| atAGlance.definition "These are the load-bearing facts…" | Scannable planning summary ("key shipping facts at a glance") | keep |
| intro.p1 "This is the Logistics pillar…" | Orientation / scope of the pillar | keep |
| intro.p2 "Coconut shell charcoal is regulated cargo…" | "Is coconut charcoal dangerous goods / is there a non-DG route?" | keep |
| intro.p3 "Customs clearance at destination…" | "Who handles customs — me or the supplier?" | keep |
| children.rules "The commercial rules of a charcoal order…" | "How are orders loaded / what incoterms / payment / booking?" | keep |
| children.documents "The paper that travels…" | "What export documents do I get?" | keep (fix doc list, §3) |
| children.un1361 "UN 1361 'Carbon, animal or vegetable…'" | "What is UN 1361 / is charcoal hazmat?" | keep |
| children.dgRegulation "What changed on 1 January…" | "What are the 2026 charcoal shipping rules?" | keep |
| children.shippingLines "Not every line carries…" | "Which carriers accept charcoal?" | keep (fix "we name them" claim, §3) |
| children.cargoProtection "How the cargo is protected…" | "Is my shipment insured / what's covered?" | keep |
| children.importUsa "US import mechanics for HS…" | "How do I import charcoal to the USA?" | keep |
| children.importGuides "Country-by-country import mechanics…" | "How do I import to my country?" | keep |
| transit.intro + per-market sentences + table | "How long is shipping to [my port]?" | keep (highest snippet value) |
| timeline.body + 3-step list | "How long from order to delivery?" | keep |
| dgOverview.body1/body2 "Coconut charcoal is [imdg]…" | "Summarize the DG situation in one place" | keep |
| outbound.intro + IMO/Bea Cukai links | Authority / E-E-A-T external citation | keep |
| media.* (4 photo slots) | Visual proof of process | keep (placeholders until shoot) |
| faq.items (7) | Direct buyer Q&A + FAQPage schema | keep |
| related.items (18 links) | Internal linking / navigation | keep |

No rows marked compress or delete-as-fluff — the hub is already lean.

## 3. Targeted rewrites

Only two items are real correctness gaps; the rest of the page passes. Two further items are optional question-mapping upgrades.

### 3a. (Rule 8, correctness) "Carriers" child promises a list the data may not deliver

**Current** (`children.shippingLines.facts[1]`):
> "Several major lines have declined charcoal bookings — we name them so you can plan."

The hub promises the cluster page *names* declining lines, but `logistics.dg.carriersNotAccepting` is currently an empty array `[]`. As written, the hub makes a promise the cluster page cannot keep, and the claim "several major lines have declined" is itself an unverified assertion with no on-site evidence behind it. This is exactly the kind of soft over-claim the recent honesty audit targeted.

**Corrected text** (drop the unverifiable "several declined / we name them" promise; keep only what the data supports — that we book the audited carriers and that the buyer can self-forward):
> "We book directly only with carriers that accept and are audited for declared UN 1361 dangerous goods; carrier acceptance changes, so we confirm the line at booking."

If the owner does maintain a real list of declining carriers, populate `carriersNotAccepting` first, then this fact may instead read:
> "Some lines decline Class {{unClass}} charcoal entirely — {{carriersNotAccepting}}; we plan around their absence." `<NEEDS-OWNER-DATA: carriersNotAccepting is currently []; do not name lines until the array is populated with verifiable names>`

### 3b. (Rule 6/8, accuracy) Standard-document prose lists 7 of 8

**Current** (`children.documents.facts[0]`):
> "Standard pack includes the commercial invoice, packing list, bill of lading, COO, MSDS, DGD and vanning certificate."

`documentsStandardCount` resolves to **8**, but the inline list names only **7** — the **Export Declaration (PEB)** is omitted. The definition line one row above says "{{documentsStandardCount}} standard documents," so a reader who counts sees 8 claimed, 7 shown. "Includes" makes it defensible, but on a facts hub the mismatch reads as an error and slightly undersells the pack.

**Corrected text** (name all eight so prose and count agree):
> "Standard pack: commercial invoice, packing list, bill of lading, COO, MSDS, DGD, container vanning certificate, and the export declaration (PEB)."

### 3c. (Rule 1, optional upgrade) Map two child H2s to buyer questions

The hub's child labels double as cluster anchors, so wholesale relabeling is not advised. But two convert to question form with no anchor cost and pick up question-intent SEO/GEO:

**Current** `children.documents.h2`: "Export documents"
**Optional:** "What export documents come with the container?"

**Current** `children.shippingLines.h2`: "Carriers that ship charcoal"
**Optional:** "Which carriers ship charcoal?"

(Leave `children.cargoProtection.h2` "Cargo protection & insurance" as-is — its definition already opens with the implied question, and its cluster `linkLabel` "Is your shipment insured?" carries the interrogative.)

### 3d. (Rule 7, optional) Add a one-line counter-acknowledgment to the DG framing

The intro and DG overview state flatly that "there is no compliant non-DG route" and that non-DG quotes are misdeclaration. This is correct and defensible, but baldly stated it can read as self-serving to a buyer being quoted cheaper non-DG freight elsewhere. A single rebuttal sentence (see §4 for the full block) inside `dgOverview.body2` would pre-empt the objection. Optional, not required.

## 4. Devil's Advocate section

The hub is mostly procedural, but it advances one implicit thesis: **"UN 1361 coconut charcoal must move as declared dangerous goods — there is no compliant non-DG route, and any supplier quoting non-DG freight is offering a misdeclaration."** That is a contestable claim a buyer hears argued the other way every week, so a short counter-block is warranted.

> ## A View from the Other Side: The Strongest Argument Against "There Is No Compliant Non-DG Route"
>
> The strongest opposing view comes from the buyer's own inbox: rival suppliers routinely quote coconut charcoal as ordinary, non-dangerous cargo and ship it that way, often at materially lower freight. Their pitch is simple — "we've moved it as general cargo for years and never had a problem, so the DG paperwork is just cost you don't need." For a buyer comparing two quotes side by side, the cheaper non-DG line looks like the rational choice, and the claim that DG is *mandatory* can sound like a vendor talking up its own surcharges.
>
> Where the objection genuinely holds: before IMDG Amendment 42-24, parts of this trade did move under the old self-heating-test exemptions (Special Provisions 925 and 223), so "we've always shipped it as general cargo" was, historically, sometimes true. And incidents are rare, so a non-DG container often does arrive without event — which is exactly why the shortcut persists.
>
> Where it fails, on this site's own facts: those exemptions were **withdrawn** when Amendment 42-24 became mandatory on {{dgMandatoryDate}}, and Special Provision 978 replaced them. The classification did not change — coconut charcoal is {{imdgLabel}}, Packing Group {{packingGroup}}, and Class {{unClass}} cargo can self-heat. A non-DG quote today is not a cheaper version of the same shipment; it is an **undeclared** one. The cost it removes is the carrier's liability cover and the buyer's legal protection: self-heating fire is inherent vice and is not insurable, so on a misdeclared container the buyer carries that loss alone — the saved freight is the price of the exposure. The audited DG route exists precisely so the rare event is *prevented* (weathering, ≤ {{sp978PackTemp}} °C packing, {{sp978Headspace}} cm headspace) rather than argued over after a claim is denied.

Every figure and rule above is already on the page or in `company.json` (dgMandatoryDate, imdgLabel, packingGroup, unClass, sp978PackTemp, sp978Headspace, SP 925/223 withdrawal, inherent-vice exclusion). No new facts introduced.

## 5. Ontological completeness & triangulation

- **Genesis — explicit.** Factory-as-source is clear: load point Tanjung Emas / IDSRG, trucking from the factory, brand attribution via `{{brand}}`. Strong.
- **Taxonomy — explicit and dense.** UN 1361 "Carbon, animal or vegetable origin," Class 4.2, PG III, HS 4402.20, IMDG/SP 978 placement. This is the page's best-connected entity cluster.
- **Pragmatics — explicit.** Buyer value is concrete throughout: who owns customs, transit day-ranges per port, order→port total, MOQ rationale tied to FCL/DG. Strong.
- **Weak edge 1 — "vanning/floor-stuffing" entity is isolated.** "Floor-stuffing" and "vanning certificate" appear in the media captions and document list but are never connected in prose to *why* it matters (no palletization, manual stuffing → the per-shape yield note that lives in config but not here). One clause linking loading method to container payload would close the gap; currently the loading entity floats.
- **Weak edge 2 — "carriersNotAccepting" promise has no referent.** §3a: the hub asserts declining carriers exist and will be named, but the entity set is empty in config — a dangling relation pointing at nothing. Either populate or drop.
- **Triangulation verdict: passes.** All three of Genesis, Taxonomy, and Pragmatics are made explicit and mutually linked; the only loose threads are the two edges above, both addressable in prose without new facts (edge 2 needs a data decision, §6).

## 6. Gaps needing owner data

- **`carriersNotAccepting` is empty (`[]`).** The hub claims "several major lines have declined… we name them," but no names exist in config. Decision needed: either supply a verifiable list of declining carriers, or adopt the de-claimed rewrite in §3a. `<NEEDS-OWNER-DATA: confirmed list of carriers that decline UN 1361 charcoal, or confirmation that none should be named>`
