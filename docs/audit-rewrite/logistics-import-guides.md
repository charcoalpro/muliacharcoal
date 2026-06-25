# Content Audit & Targeted Rewrite — Import Guides hub
**Route:** /logistics/import-guides · **Source:** src/i18n/en/logisticsImportGuides.json, src/i18n/en/logisticsImportCommon.json (en.logisticsImportGuides)

> **Page type:** navigational hub (CollectionPage + ItemList over the five published `import-to-{country}` guides). The `.astro` top comment makes this explicit: "lists every published guide as a card and gives the country set a single parent." It carries no arguable thesis and almost no body prose — the substance lives on the five child pages. The framework is calibrated for argument/long-form pages, so several rules score N/A here **by design**, not as defects. `logisticsImportCommon.json` is consumed only for the ArticleMeta labels on this route; its lead-time/responsibility/VAT blocks render on the child guides, not here, so they are out of scope for this audit.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|------|--------|-----------------|
| 1. Headings as questions | PARTIAL | Two H2s render: `listHeading` "Choose your destination market" (an instruction, maps cleanly to "Which country guide do I need?") and `related.heading` "Related topics". H1 "Coconut charcoal import guides by country" is a correct keyword-front-loaded hub title. On a card-index hub, statement headings are acceptable UI labels; a light rewrite of the list H2 to question form is the only available lift (see §3). Not a FAIL — the heading already maps 1:1 to the buyer's question. |
| 2. Featured-snippet lead | PASS | `intro.p1` is a self-contained 1-sentence answer to "what are these guides?" placed immediately under the H1. `listIntro` opens with a self-contained claim ("We ship UN 1361 coconut charcoal worldwide") directly under the list H2. Both elaborate after the lead. |
| 3. Paragraph intent | PASS | Every prose unit serves one intent: `heroSubtitle` = scope/what-you-get; `intro.p1` = orientation + pillar uplink; `listIntro` = coverage + "ask if not listed" capture; card blurb = per-country promise. No stray paragraphs. |
| 4. No fluff + anti-bloat | PASS | Copy is dense and non-repetitive. The duty/tax/clearance/document triad is stated once in `heroSubtitle`, compressed in `intro.p1`, and templated per card — that is deliberate progressive disclosure across hero→intro→card, not three restatements of the same sentence. Nothing to cut. |
| 5. Section purity | PASS | One intent cluster: "route the buyer to the right country guide." Hero, intro, list, and related-links all serve it. No bleed (no duty tables, no DG lecture — those correctly live on children). |
| 6. Structure | PASS | Logical flow: orient (intro) → choose (card grid) → branch out (related). No logic gaps for a hub; full coverage of the published country set is automatic (cards are generated from `company.logistics.imports`, so the page can never silently omit a live guide). |
| 7. Devil's Advocate | N/A | Hub/index page with no thesis to oppose. A counter-argument section would be filler and would dilute the "pick a country" job. See §4. |
| 8. Quantified evidence | PASS | The only number this page should assert is the MOQ, surfaced via `{{moqLabel}}` token from company.ts (the single source). It correctly does NOT invent duty rates, transit days, or lead times — those are gated, per-country, and live on the child guides with provenance. Restraint here is correct, not a gap. |
| 9. Mini-cases | N/A | A routing hub is the wrong surface for a problem→action→result case. None invented (correct). |
| 10. Ontological completeness | PASS | Genesis (factory-as-source) explicit via `{{brand}}` and "the document pack we supply"; Taxonomy explicit and tight — "UN 1361 coconut charcoal" names the dangerous-goods class and material in every lead; Pragmatics explicit — "what your customs broker needs," "the duty and tax stack." Entities (HS code, duty, VAT, customs clearance, document pack, FOB-implied) are densely linked to the five country children and to the Logistics pillar, documents, rules, and un-1361 cluster pages. No isolated concepts. |
| — hreflang / RTL / per-locale | N/A | Production is English-only (ACTIVE_LOCALES=['en']). Not failed. |

**Net:** 6 PASS, 2 PARTIAL, 3 N/A, 0 FAIL. A correctly-scoped hub. The only real lift is heading-as-question phrasing on the list H2.

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| H1 "Coconut charcoal import guides by…" | Hub identity / "coconut charcoal import by country" | keep |
| heroSubtitle "What it takes to clear a…" | Scope-setting: what each guide answers (HS, duty, process, docs) | keep |
| intro.p1 "These guides sit under the…" | Orientation + Logistics-pillar uplink | keep |
| listHeading "Choose your destination market" | Navigation prompt → which guide do I need | rewrite (to question form) |
| listIntro "We ship UN 1361 coconut…" | Coverage + lead-capture for unlisted destinations | keep |
| cardTitleTemplate "Importing to {{country}}" | Per-country entry point | keep |
| cardBlurbTemplate "HS code, the duty and tax…" | Per-country promise of contents | keep |
| related.heading "Related topics" | Lateral cluster navigation | keep |

No rows marked compress or delete-as-fluff — the page has no bloat.

## 3. Targeted rewrites

Only one genuine gap (Rule 1). Everything else passes as written.

### Rule 1 — list heading to question form

**Current** (`logisticsImportGuides.json` → `listHeading`):
> "Choose your destination market"

**Corrected text** (ready to paste as the `listHeading` value):
> "Which country are you importing into?"

Rationale: maps the card grid directly to the buyer's literal question, improving heading-as-question coverage and AI-extractability without changing the page's job. If the owner prefers to keep the imperative label for UI tone, "Choose your destination market" is an acceptable hold — this is a PARTIAL-to-PASS polish, not a correctness fix.

*(Optional, same rule)* `related.heading` "Related topics" is a conventional cluster-nav label and reads fine; no rewrite proposed — forcing it into a question ("What else should I read?") would read oddly for a link list.

No snippet-lead gaps, no fluff to compress, and no place where a missing number forces a `<NEEDS-OWNER-DATA>` placeholder. The page deliberately defers every duty/tax/transit figure to the per-country children, which is the correct architecture.

## 4. Devil's Advocate section

N/A — this is a navigational hub (CollectionPage + ItemList) whose only job is to route a buyer to the correct per-country guide; it asserts no thesis, so there is no opposing industry view to stage and rebut. The argument-and-rebuttal work belongs on the child `import-to-{country}` pages and on the Logistics pillar, not on the index that points to them.

## 5. Ontological completeness & triangulation

- **Genesis (factory-as-source): explicit.** `{{brand}}`, "the document pack we supply," and "we will confirm the import requirements" tie the hub to PT Coco Reina as exporter-of-record. Strong.
- **Taxonomy (charcoal classification): explicit and consistent.** "UN 1361 coconut charcoal" appears in the meta, hero, and listIntro — pinning both the material (coconut-shell charcoal) and its dangerous-goods identity (UN 1361). No coal/coke standard leakage. Strong.
- **Pragmatics (buyer value): explicit.** "what your customs broker needs," "the duty and tax stack," "clear a {{moqLabel}} container" all frame the page around the importer's clearance problem. Strong.
- **Entity connectivity: dense, no orphans.** HS code, duty, VAT, customs clearance, and document pack each connect outward — five country children (ItemList), the Logistics pillar (intro uplink), and the documents/rules/un-1361 cluster pages (related block). No isolated concept.
- **Minor semantic-gap option (not a defect):** the hub names the document pack but not FOB/Incoterm by name; that classification detail correctly lives on the children and the `/logistics/rules` page already linked here, so surfacing it on the hub would be redundant, not additive. Leave as-is.

## 6. Gaps needing owner data

- None. Every fact the page asserts (MOQ, port, brand, the five-country set) resolves from `src/config/company.ts` / `company.json`, and the page intentionally defers all gated regulatory figures (duty, VAT, transit, lead time) to the per-country guides. No fabricated figure and no placeholder required.
