# Content Audit & Targeted Rewrite — Factory pillar
**Route:** /factory · **Source:** src/i18n/en/factory.json, src/i18n/en/factoryCommon.json (en.factory)

The page is a manufacturer-trust pillar hub (E-E-A-T). Its single arguable thesis is explicit and repeated: **"We are the factory, not a trading intermediary."** Every section serves that thesis or routes to a child cluster page. All numeric facts on the page (350 t/month, 14 t/day, 4 lines, 8 ovens × 1.5 t/24 h, 14-day weathering, 14–21-day lead, 86 staff, 4,200 m², 11 sourcing villages, Bitung carbonization plant, NIB/NPWP) are present and single-sourced in `src/data/company.json` via `factoryTokens()`/`companyTokens()`. No fabricated figures were found; the page is already honesty-clean.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | FAQ H3s and two child H2s ("How our coconut charcoal is made") map to buyer questions. But "Production capacity & lead times", "Raw materials & sourcing", "Virtual tour & factory visits", "Customization & OEM", "Countries we export to", "Inside the factory", "Factory at a glance" are topic labels, not questions. The child-section leads already answer an implicit question, so the fix is heading-only. |
| 2. Featured-snippet lead | PASS | Every section opens with a self-contained definition sentence (atAGlance.definition, each child `definition`, countriesServed.definition, customization.body). Strong snippet posture — this is the page's best trait. |
| 3. Paragraph intent | PASS | Each paragraph serves one intent (see §2). No stray paragraphs. intro.p1=identity, p2=specialization wedge, p3=process roadmap + section map. |
| 4. No fluff + anti-bloat | PASS | Tight throughout. team.intro "A trader can't show you an org chart" is a thesis-reinforcing hook, not fluff. Only micro-trim noted in §3 (gallery.intro placeholder sentence). |
| 5. Section purity | PASS | Clean clusters: identity → glance → intro → owner → team → 4 children → OEM → exports → gallery → FAQ. No bleed; OEM correctly defers packaging detail to /packaging. |
| 6. Structure (gaps/coverage/dupes) | PASS | Full hub coverage with no logic gaps. Capacity is stated in hero, at-a-glance, child, and FAQ — but each instance is purpose-built (trust signal / scan table / cluster lead / Q&A), so this is intentional reinforcement, not duplicated meaning. |
| 7. Devil's Advocate | FAIL | The thesis "we are the factory, not a trader" is strongly stated and reinforced, but no section voices the buyer's strongest counter-position (the case *for* buying through a trading house) and rebuts it. This is the single highest-value gap. Draft provided in §4. |
| 8. Quantified evidence | PASS | Thesis is backed by specific on-site data: 4,200 m² owned facility, owned Bitung carbonization plant, 350 t/month, 8 ovens, NIB/NPWP registration, "since {{year}}" track record. Vertical-integration claim is evidenced, not asserted. |
| 9. Mini-cases | N/A | No real, verifiable problem→action→result customer case exists in source or company.ts. Correctly omitted — do not invent one. Flagged, not faked. |
| 10. Ontological completeness | PASS | Dense entity graph: parent ORG, owner Person, QC + production leads, 4 child entities, carbonization plant sub-entity, sourcing villages, export markets, NIB/NPWP. Genesis (factory-as-source), Taxonomy (coconut shisha charcoal as the single product class), and Pragmatics (buyer value: verify, no deprioritization, NDA) are all explicit. Minor connectivity note in §5. |
| — Per-locale / hreflang / RTL | N/A | Production is English-only (ACTIVE_LOCALES=['en']). Not assessed. |

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| heroSubtitle "{{legalName}} is the manufacturer of…" | "is this a real factory or a middleman" — thesis + above-fold trust | keep |
| heroTrust grid (Location/Capacity/Workforce/Cert) | scannable trust signals for buyer due-diligence | keep |
| atAGlance.definition "{{brand}} is manufactured in-house…" | "core facts buyers verify first" — quick-verify entity card | keep |
| intro.p1 "{{legalName}}, trading as {{brand}}…" | manufacturer-identity / not-a-relabeler | keep |
| intro.p2 "We make one product…" | specialization wedge → why spec is consistent | keep |
| intro.p3 "From our own carbonization plant…" | end-to-end vertical integration + section roadmap | keep |
| ownerNote blockquote "We built this factory…" | E-E-A-T / founder accountability signal | keep |
| team.intro "A trader can't show you an org chart…" | "who actually makes this" — provenance/authenticity | keep |
| children.productionProcess "Coconut shisha charcoal is made by…" | "how is shisha charcoal made" — process cluster down-link | keep (rewrite H2 to question) |
| children.capacity "The factory runs {{productionLines}} lines…" | "can this factory fill my container reliably" | keep (rewrite H2 to question) |
| children.rawMaterials "Our single raw material is coconut shell…" | "where does the coconut shell come from" | keep (rewrite H2 to question) |
| children.virtualTour "You can verify the factory three ways…" | "how do I verify the factory before paying" | keep (rewrite H2 to question) |
| customization.body "Beyond our standard cube, hexagonal…" | "can they make my custom spec / OEM" | keep (rewrite H2 to question) |
| countriesServed.definition "{{brand}} coconut shisha charcoal ships to…" | "do they already export to my market" | keep (rewrite H2 to question) |
| countriesServed.antiFraudNote "We are a registered Indonesian manufacturer…" | "how do I avoid charcoal-export payment fraud" — high-intent | keep |
| gallery.intro "Photographs from the production floor…" | proof-of-production / visual verification | compress (trim placeholder clause) |
| FAQ items (7) | direct buyer questions — best GEO/snippet block | keep |
| related.items | internal-linking / cluster navigation | keep |

## 3. Targeted rewrites

Only real gaps below. Sections marked PASS in §1 are not restated.

### 3.1 Rule 1 — Headings as questions (child + section H2s)

The child-section leads already answer an implicit question; only the heading needs to become the question the buyer types. Snippet leads stay as-is.

**children.productionProcess.h2** — current: `"How our coconut charcoal is made"` (already question-shaped; minor sharpen optional)
Corrected (optional): `"How is coconut shisha charcoal made?"`

**children.capacity.h2** — current:
`"Production capacity & lead times"`
Corrected:
`"What is the factory's capacity and lead time?"`

**children.rawMaterials.h2** — current:
`"Raw materials & sourcing"`
Corrected:
`"Where does the coconut shell come from?"`

**children.virtualTour.h2** — current:
`"Virtual tour & factory visits"`
Corrected:
`"How can I verify the factory before I pay?"`

**customization.heading** — current:
`"Customization & OEM"`
Corrected:
`"Can you produce to my spec and brand (OEM)?"`

**countriesServed.heading** — current:
`"Countries we export to"`
Corrected:
`"Which countries do you already export to?"`

**atAGlance.heading** — current:
`"Factory at a glance"` — keep as-is (scan-card label; converting to a question hurts the at-a-glance UX). No change.

### 3.2 Rule 7 — Devil's Advocate (missing section)

No JSON key exists for this. Add a new namespace block `factory.objection` and render it after the export/anti-fraud section (which is where the thesis is fully proven). Full copy in §4, ready to paste as JSON.

### 3.3 Rule 4 — Micro-bloat trim (gallery.intro)

Current:
`"Photographs from the production floor — carbonization, milling, pressing, drying, and the QC bench. Professional photography is in progress; placeholders are shown until the shoot lands."`
Corrected (the placeholder disclaimer is operational noise the buyer doesn't need; the alt/caption already label each frame):
`"Photographs from the production floor — carbonization, milling, pressing, drying, and the QC bench."`
(If the team wants to keep the "shoot in progress" honesty signal, retain it — this is a judgment trim, not a correctness fix.)

### 3.4 Rule 1 — FAQ heading (optional polish)

**faq.heading** — current `"Factory FAQ"` is fine. No change needed; the items themselves are already questions.

## 4. Devil's Advocate section

The page's thesis is "buy direct from the factory, not a trading intermediary." The strongest real industry counter-argument is that trading houses de-risk first-time importers. Below is a complete, paste-ready block rebutted with on-site facts only.

**Suggested placement:** new section after `#countries-served`, before `#gallery`.

**JSON (new `factory.objection` namespace):**

```json
"objection": {
  "heading": "Isn't it safer to buy through a trading company?",
  "lead": "It's a fair question. Trading houses exist because they can lower the risk of a first import — and for some buyers, on some deals, that trade-off is real. Here's when it holds, and why buying direct from this factory still removes the risks that matter most.",
  "steelman": "A reputable trading company can consolidate several factories' output, carry inventory closer to your market, extend credit terms, and absorb a bad batch without you ever seeing it. For a buyer placing a first, sub-container trial across multiple product types, that convenience can outweigh the margin a middleman takes.",
  "rebuttal": "But that convenience costs you the two things a wholesale charcoal buyer needs most: price transparency and quality control. A trader sets your price on top of ours and rarely names the real factory, so you can't audit who made your coal or hold anyone accountable for a burn or ash failure. Buying direct from {{legalName}} closes that gap: you deal with the registered manufacturer (NIB {{nib}}, NPWP {{taxId}}), pay only into our corporate account shown on the proforma invoice, and can appoint SGS, Intertek, or BV for pre-shipment inspection at our factory before the container ships. At {{capacityMonth}} tons a month, one 20ft container is roughly {{oneContainerPctOfMonthly}}% of our output — so you get a single factory's consistent spec, batch after batch, instead of a trader's blended supply, and you are never deprioritized behind larger orders.",
  "caveat": "Where a trader still wins is multi-product consolidation or local stock-and-credit — neither of which a single-product factory offers. If your need is consistent, audit-traceable coconut shisha charcoal at container scale, direct is the lower-risk route."
}
```

Every figure cited (NIB, NPWP, {{capacityMonth}}, {{oneContainerPctOfMonthly}}, SGS/Intertek/BV inspection) already appears elsewhere on this page or in company.ts — no new facts introduced. The caveat honestly concedes the trader's genuine edge (multi-product consolidation, local credit), which the page never claims to match.

## 5. Ontological completeness & triangulation

- **Genesis (factory-as-source): explicit and strong.** Parent ORG ({{legalName}}/{{brand}}), owner Person with signed note, owned 4,200 m² facility, and owned Bitung carbonization plant establish the factory as origin. No gap.
- **Taxonomy (charcoal-class position): explicit.** "Coconut shisha charcoal is our only product" + the definition-style child leads place the product in its class. Minor gap: the page never names the *adjacent* classes it is *not* (e.g., coconut vs. bamboo/wood, or BBQ vs. hookah) — that contrast lives only behind the /guide and /products links. A one-clause "coconut shell, not wood or bamboo, made for hookah not BBQ" in intro.p2 would tighten the taxonomic anchor for AI extraction. (Optional; the links already cover it.)
- **Pragmatics (buyer value): explicit.** "Won't be deprioritized," NDA, three verification routes, anti-fraud payment guidance all name concrete buyer payoffs. No gap.
- **Weak connectivity — carbonization plant.** The owned Bitung plant is a strong vertical-integration entity but is mentioned only in intro.p3 and the rawMaterials child; it is absent from the at-a-glance card and the Devil's-Advocate-relevant trust story. Surfacing "owned carbonization plant, Bitung" as an at-a-glance row would link this entity to the trust cluster.
- **Weak connectivity — certifications.** The hero asserts "{{iso9001Short}} certified" but no section on the hub connects that entity to the quality cluster beyond the related-topics link; the FAQ never answers "what certifications do you hold." Acceptable for a hub (it defers to /quality), but a single FAQ item would strengthen the cert→factory edge.

## 6. Gaps needing owner data

- None. Every fact required for the rewrites above (including the Devil's Advocate section) already exists in `src/data/company.json` / `company.ts`. The factory config carries a DRAFT-NOTICE that `ownerNote`, `developToSpec`, `ndaAvailable`, and the narrative strings "MUST be verified by the owner before production" — these are already gated and used as-is on the page, so no *new* owner data is needed for this audit's rewrites. No `<NEEDS-OWNER-DATA>` placeholders were required.
