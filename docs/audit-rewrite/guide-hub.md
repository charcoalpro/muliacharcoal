# Content Audit & Targeted Rewrite — Buyer’s Guide hub
**Route:** /guide · **Source:** src/i18n/en/guide.json (en.guide.hub)

The page is a top-of-funnel pillar hub: text-led hero with a definition lead, full E-E-A-T meta block, a "how to use this guide" intro carrying the thesis, one card per child guide (3 live, 2 muted forward-refs), a B3 buyer on-ramp (sample → trial container → repeat terms), a "Coconut at a glance" KeyFactsBox sourced from grades.ts, a hub-canonical routing FAQ, and a related-topics block. Schema: CollectionPage + FAQPage. Main thesis (confirmed from `intro.lead`): **"Sourcing shisha charcoal well comes down to two decisions: the right material and the right factory."**

This is a strong, honesty-audited page. The single material gap is the absence of a Devil's-Advocate section (rule 7); the rest is heading-form polish and one snippet-lead addition.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | Live child-card H2s and the FAQ are already in (or map to) buyer-question form ("How to choose a shisha charcoal factory", "How to order coconut charcoal wholesale", FAQ items). But three section H2s are statements/labels: `intro.heading` "How to use this guide", `children.heading` "The guides", and `atGlance.heading` "Coconut shell charcoal at a glance". `b3.heading` "How buyers start with us" reads as a question with no mark; acceptable. The hub format tolerates label headings, but two map cleanly to questions (see §3). |
| 2. Featured-snippet lead | PASS | `heroSubtitle` is a self-contained definition lead ("A shisha charcoal buyer's guide is a sourcing reference for wholesale importers…"). `intro.lead`, `b3.intro`, `atGlance.definition`, every child-card `definition`, and every FAQ answer open with a direct 1–2 sentence answer. Only `children.heading` "The guides" has no lead sentence beneath it before the card grid — minor (see §3). |
| 3. Paragraph intent | PASS | Every block serves one named intent (see §2). No paragraph is intent-orphaned; `intro.body1`/`body2` each carry exactly one of the two thesis halves. |
| 4. No fluff + anti-bloat | PASS | Prose is dense and specification-led. The closest to soft phrasing is `intro.lead`'s "every downstream variable… falls into place", which earns its place by naming the four variables. No restatement-in-other-words, no padded triples. Nothing to cut. |
| 5. Section purity | PASS | Clean intent clusters: intro = orientation; children = the three sub-guides; b3 = on-ramp/process; atGlance = spec snapshot; faq = routing. No cluster bleed. The atGlance box correctly defers per-grade detail to product/quality pages rather than duplicating it. |
| 6. Structure | PASS | Logical order (orient → which material/factory → how to start → spec snapshot → FAQ → related). Full hub coverage of the cocoon's children. No duplicated meaning — the FAQ answers are routing pointers, not restatements of the intro. The two muted children (`startBrand`, `privateLabel`) are deliberate forward-refs, not gaps. |
| 7. Devil's Advocate | FAIL | The page states a clear thesis ("two decisions: material + factory") and proves it across the intro + child cards, but there is no dedicated section presenting the strongest opposing view (e.g. "material barely matters — price and reliability decide"). This is the one genuine structural gap. Draft supplied in §4. |
| 8. Quantified evidence | PASS | Hub-appropriate: the `atGlance` KeyFactsBox renders real numeric ranges computed from grades.ts (ash, fixed carbon, calorific value, burn time), and the compare-card takeaway cites the peer-reviewed CO finding ("roughly twice the carbon monoxide of natural charcoal"). The hub defers per-grade figures to the leaf pages by design — correct for a pillar. No unbacked benefit claim found. |
| 9. Mini-cases | N/A | No customer case, testimonial, or named-buyer result is present, and none should be invented (honesty gate). The B3 on-ramp is the legitimate substitute — a generic process path, not a fabricated case. Correctly omitted. |
| 10. Ontological completeness | PASS | Genesis (factory-as-source: city/country, MOQ, port, ISO/Halal in `heroTrust`; export desk in related), Taxonomy (coconut positioned vs bamboo/wood in the compare card + atGlance), and Pragmatics (buyer value: low ash, COA, DG compliance, samples) are all explicit and densely cross-linked. Minor: the entity "carbon monoxide / quick-light coals" appears in a takeaway but isn't tied to the on-page safety frame (it lives on the child page) — acceptable for a hub. |

**Original-page score: 90 / 100.** Strong pillar; the only material miss is the missing Devil's-Advocate section, plus light heading-question polish.

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "A shisha charcoal buyer's guide is…" (`heroSubtitle`) | Definitional: what this resource is + scope | keep |
| "Sourcing shisha charcoal well comes down…" (`intro.lead`) | Thesis / mental model: the two decisions | keep |
| "Coconut shell charcoal is the dominant…" (`intro.body1`) | Material-decision pointer → compare guide | keep |
| "Choosing a supplier is the second…" (`intro.body2`) | Supplier-decision pointer → factory checklist | keep |
| "Wholesale here means container loads…" (`intro.moqNotePre`+link) | Commercial qualification: MOQ + FAQ routing | keep |
| "Coconut shell charcoal is the benchmark…" (`children.compare`) | "which material is best" → compare guide | keep |
| "Choosing a shisha charcoal factory means…" (`children.chooseFactory`) | "how to vet a supplier" → checklist | keep |
| "The end-to-end ordering process…" (`children.howToOrder`) | "how to order/import wholesale" → ordering guide | keep |
| "Building a private-label… brand" (`children.startBrand`, muted) | Forward-ref: own-brand intent | keep (muted by design) |
| "Private-label options span neutral cartons…" (`children.privateLabel`, muted) | Forward-ref: OEM/packaging intent | keep (muted by design) |
| "Most first orders follow the same…" (`b3.intro` + 3 steps) | "how do I start / de-risk first order" | keep |
| "Indicative ranges across our three grades" (`atGlance.definition` + 4 facts) | "what are the specs" snapshot | keep |
| "What charcoal is best for shisha?" (FAQ #1) | Top informational query → compare guide | keep |
| "How do I choose a shisha charcoal supplier?" (FAQ #2) | Supplier due-diligence query → checklist | keep |
| "Can I sell coconut charcoal under my own brand?" (FAQ #3) | Private-label query → white-label page | keep |
| Related-topics list (15 links) | Cocoon distribution / crawl depth | keep |
| **(absent)** Devil's-Advocate on the two-decisions thesis | "does material actually matter, or just price?" | **add (rewrite §4)** |

No row is marked compress or delete-as-fluff — the prose is already tight.

## 3. Targeted rewrites

Only real gaps are listed. Everything not below already passes and should be left as-is.

### 3.1 — Rule 1 (heading as question): `intro.heading`
**Current:**
> "heading": "How to use this guide"

This is a label, not the question the buyer is asking. The buyer's question here is "where do I even start?" — which the lead already answers.

**Corrected (paste into `en.guide.hub.intro.heading`):**
> "Where do you start when sourcing shisha charcoal?"

(If the editorial preference is to keep the imperative "how to use" framing for the hub, this is optional — the lead beneath it already carries a snippet answer. Flagged as PARTIAL, not FAIL.)

### 3.2 — Rule 1 (heading as question): `atGlance.heading`
**Current:**
> "heading": "Coconut shell charcoal at a glance"

A label. Maps cleanly to a buyer spec question.

**Corrected (paste into `en.guide.hub.atGlance.heading`):**
> "What are the key specs of coconut shisha charcoal?"

Note: the `.astro` passes this same string to `KeyFactsBox` as both the heading and the `id="at-a-glance-heading"` anchor label — the question form renders fine in both. The TOC entry (`tocItems` → `t.atGlance.heading`) would also pick up the question, which is desirable.

### 3.3 — Rule 1 + 2 (heading + missing snippet lead): `children.heading`
**Current:**
> "heading": "The guides"

No lead sentence sits between this heading and the card grid, so the H2 has no self-contained answer beneath it (the one rule-2 miss). Reframing to a question and adding a one-line orienting lead fixes both. This needs a new key, so the rewrite includes both the heading and a `lead` value; the `.astro` would render `t.children.lead` as a `<p class={proseP}>` directly under the H2 (one-line template change, flagged for the owner — not edited here).

**Corrected (paste into `en.guide.hub.children`):**
> "heading": "Which guide do you need first?",
> "lead": "Work through them in order — first which raw material burns best, then how to vet the factory, then how an order actually runs from sample to delivered container.",

If a template change is not desired, the minimal fix is the heading alone:
> "heading": "Which guide do you need first?"

### 3.4 — Rule 7 (Devil's Advocate): missing section
This is the substantive gap. The full drafted section is in §4. It requires a new `en.guide.hub` subtree (e.g. `objection`) and a corresponding `<section>` in the `.astro` (one new block, mirroring the existing intro section). Both are owner actions — no source files are edited by this audit.

## 4. Devil's Advocate section

The page's thesis is explicit and defensible: **the two decisions that govern sourcing are the right material and the right factory.** The strongest real industry counterargument is that this overstates *material*: at the wholesale-import tier, experienced buyers often argue the material question is effectively settled (everyone serious already sells coconut), so the only decision that actually moves money is supplier reliability and landed price — making "material" a distraction the buyer can skip.

Drafted section, ready to add as a new `en.guide.hub.objection` subtree (paste-ready prose; rebuts using only on-site facts — grades.ts ranges, the cited CO study on the compare child, UN 1361 / COA framing already on the page):

> ## A View from the Other Side: "Material Is Already Settled — Only the Factory Matters"
>
> **The strongest counterargument.** A seasoned importer will tell you the material decision is a non-decision: every credible shisha supplier already sells coconut shell charcoal, so comparing coconut against bamboo or wood is academic. By that logic the only variable worth your time is the factory — price, capacity, documentation and consistency — and a buyer's guide that spends a whole sub-guide on raw materials is solving a problem the market already solved.
>
> **Where it genuinely holds.** For a buyer who has already committed to coconut and is re-sourcing, this is largely correct: the material is fixed, and the entire decision collapses onto the supplier checklist — third-party COA per batch, UN 1361 dangerous-goods compliance, capacity and a tested sample. For that buyer, the factory section *is* the guide.
>
> **Where it breaks down.** The claim assumes "coconut" is one thing. It is not. The same material spans real ranges — across our three grades alone, ash runs the published band and fixed carbon and calorific value shift grade to grade — and an under-carbonized coconut briquette loses most of its advantage. "Material" is not just coconut-vs-bamboo; it is *which coconut spec*, proven to a named method (ASTM D1762-84(2021)). And the costliest material mistake is not bamboo — it is accepting quick-light or chemically treated coals, which a peer-reviewed study found produce roughly twice the carbon monoxide of natural charcoal. That is a material decision with a safety consequence, and no amount of supplier diligence substitutes for getting it right. So the thesis stands, with a sharpened edge: the material decision is real, but for most buyers it is decided *inside* the factory question — by reading the COA, not by choosing a feedstock.

This rebuttal invents nothing: grade ranges come from grades.ts (rendered in the page's own atGlance box), the CO figure is the same peer-reviewed finding already cited in the compare child card, and ASTM D1762 / UN 1361 / per-batch COA are all already on-page. If the owner prefers not to restate the CO figure on the hub, replace that sentence with a link to the compare guide where it is fully sourced.

## 5. Ontological completeness & triangulation

- **Genesis (factory-as-source): explicit.** `heroTrust` surfaces city/country, MOQ, port of loading, and ISO 9001 + Halal directly from company.ts; the related block routes to /about and /contact (export desk). Well-anchored.
- **Taxonomy (where coconut sits): explicit but thin on-hub.** Coconut is positioned against bamboo and wood in the compare card and the atGlance snapshot, but the hub never states the parent class ("charcoal → shisha coals → coconut shell briquette"). One clause in `heroSubtitle` or `intro.body1` naming the classification would tighten the entity graph; currently the full taxonomy lives only on the compare child.
- **Pragmatics (buyer value): explicit and strong.** Low ash, per-batch COA, DG compliance, samples-before-commitment, and MOQ-in-prose all tie features to buyer payoff. No isolated feature claims.
- **Weak-connectivity entity: "carbon monoxide / quick-light coals."** It appears as a compare-card takeaway but is not connected to any on-hub safety or combustion frame — it dangles. Either link it explicitly to the compare guide's combustion section (the takeaway already does via the card CTA) or fold it into the Devil's-Advocate rebuttal (§4) where it now earns a connected home.
- **Weak-connectivity entity: the muted children (`startBrand`, `privateLabel`).** Deliberately under-linked (self-light when built) — correct, not a gap. The FAQ #3 + related-topics white-label link already give the private-label intent a live destination, so the cluster is not orphaned.

## 6. Gaps needing owner data

- None. Every rewrite above (including the Devil's-Advocate section) is built entirely from facts already on the page or in grades.ts / company.ts. No `<NEEDS-OWNER-DATA>` placeholder was required. The only owner *actions* are editorial/template, not new facts: (a) adding the `objection` subtree + one `<section>` for the Devil's-Advocate block, and (b) optionally adding `children.lead` with a one-line `.astro` render.
