# Content Audit & Targeted Rewrite — Plastic Packaging
**Route:** /packaging/plastic · **Source:** src/i18n/en/packagingPlastic.json (en.packagingPlastic)

This is a procedural/reference cluster page describing the inner-plastic (primary packaging) layer. It carries an implicit thesis — *the inner plastic, not the box, is the moisture/dust barrier that protects the charcoal in transit* — which is stated repeatedly and is genuinely arguable, so a Devil's Advocate section is warranted (Section 4). All specs (material, microns, seal, print price, foil) are data-driven via `hasFact()` and render only when present in `company.ts`; the "specified per order" framing is a deliberate omission, not a gap.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | H2s are noun-phrase reference labels ("Material, thickness & seal", "Barrier performance & protection", "Neutral vs branded"). Each maps cleanly to a buyer question, and the FAQ already restates every section as a direct question — but the section headings themselves are not interrogative. Acceptable for a spec/reference page; minor uplift available (Section 3). |
| 2. Featured-snippet lead | PASS | Every section opens with a self-contained answer. "Definition" leads with "Primary packaging is the layer that touches the product…"; "Barrier" leads with the four-to-eight-week humidity answer; "Neutral vs branded" leads with crisp definitions. Strong snippet posture. |
| 3. Paragraph intent | PASS | Each paragraph serves one identifiable intent (definition, material spec, capacity, barrier mechanism, branding, neutral-vs-branded decision). Intent map in Section 2. |
| 4. No fluff + anti-bloat | PASS | Tight throughout. The only soft sentence is definition.p2 ("That is why the inner box defers protection…"), which is borderline restatement of p1 but earns its place by carrying the spend-allocation guidance ("spend on the box for shelf appeal, rely on the plastic for the barrier"). No 20%-cuttable paragraphs found. |
| 5. Section purity | PASS | Clean clusters: definition / material / sizes / barrier / branding / neutral-vs-branded. The three-layer transit system (desiccant + thermal blanket) appears in the Barrier section but is correctly scoped as context and cross-linked out to /packaging/additional-packaging rather than expanded inline. No bleed. |
| 6. Structure | PASS | Logical progression (what it is → what it's made of → what it holds → how it protects → how it's branded → neutral vs branded → FAQ). Full topic coverage for a primary-packaging page. No duplicated meaning across sections; FAQ deliberately mirrors sections in Q-form for GEO, which is the intended pattern here, not duplication. |
| 7. Devil's Advocate | FAIL | The page asserts a clear, contestable thesis ("the plastic is what protects it… the inner box defers protection to this layer") but never states or rebuts the opposing industry view (that a rigid carton + desiccant is the real protection and thin film is incidental). Drafted in Section 4. |
| 8. Quantified evidence | PARTIAL | Good numerics where data exists: pack sizes ({{innerPlasticSizes}}), reference holds ({{holdsRefExample}}), "four to eight weeks" transit, optional µm spec and print price (both conditional on `company.ts`). The central barrier *claim* ("keeps humidity out", "the moisture barrier") is asserted qualitatively — no moisture-ingress / MVTR figure on site. That is an honest gap (see Section 6), correctly NOT fabricated. |
| 9. Mini-cases | N/A | No real, verifiable problem→action→result customer case exists in the source or company.ts. Correctly omitted; do not invent one. |
| 10. Ontological completeness | PASS | Dense entity graph: primary/inner-box/master-box hierarchy with diagram, DefinedTerm + glossary anchor, reference SKU (cube-25mm) tying holds to the product cluster, cross-links to white-label, additional-packaging, documents, products. Genesis/Taxonomy/Pragmatics all present (Section 5). |

**Per-locale / hreflang / RTL:** N/A — production is English-only (ACTIVE_LOCALES=['en']).

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "The inner plastic is the primary…" (heroSubtitle) | What is inner plastic + why it matters (definitional, top-of-funnel) | keep |
| "Primary packaging is the layer that…" (definition.p1) | Definition + where it sits in hierarchy | keep |
| "That is why the inner box defers…" (definition.p2) | Buyer decision: where to spend (box vs film) | keep |
| diagram + caption ("Each layer nests…") | Visual/extractable hierarchy (GEO) | keep |
| "The inner plastic is a heat-sealed…" (material.p1) | Material / thickness / seal spec intent | keep |
| "Net charcoal per pack… Film weight is negligible…" (sizes.p1) | Pack size / weight; pre-empts "what's the gross weight" | keep |
| "As a reference, {{holdsRefExample}}…" (sizes.p2) | How much does a pack hold (capacity) | keep |
| "Over four to eight weeks of ocean transit…" (barrier.p1) | Will it survive shipping (core protection intent) | keep |
| "For long or humid routes the plastic is the first…" (barrier.p2) | Three-layer transit protection system | keep |
| "The film ships clear or printed…" (branding.p1) | Can I brand it / printing options | keep |
| "Neutral is plain or clear film…" (neutralVsBranded.p1) | Neutral vs branded decision + sample CTA | keep |
| FAQ ×6 | Direct-question GEO/snippet capture | keep |
| (absent) Devil's Advocate | "Is film really the protection, or is the carton?" | **add** (Section 4) |

## 3. Targeted rewrites

Only two real gaps. Everything else passes — do not touch.

### 3.1 Rule 7 — Devil's Advocate section missing (primary gap)
The page has no section addressing the strongest opposing view. Add the complete section drafted in Section 4 below. Suggested JSON shape (new `counterview` object in en.packagingPlastic, rendered between `neutralVsBranded` and the FAQ):

```json
"counterview": {
  "h2": "Isn't the carton the real protection, not thin plastic film?",
  "p1": "A fair objection: seasoned importers know a sealed poly bag is not hermetic, and that the master carton plus desiccant is what survives a rough container. That holds when the film is treated as the only safeguard. It is not. On this site the inner plastic is explicitly the first of three layers — it seals the product, desiccant sachets absorb residual humidity inside the cartons, and a thermal blanket handles container condensation on long or humid routes. The film does the job it is scoped for: it is the continuous, heat-sealed, tamper-evident barrier that keeps ambient moisture and dust off the charcoal between the line and the carton. The carton is structural and is deliberately not relied on as a moisture barrier — which is exactly why the protection is layered rather than placed on any single component.",
  "addonsLinkLabel": "See the desiccant & thermal-blanket layers"
}
```

### 3.2 Rule 1 — section headings are reference labels, not questions (minor uplift)
Optional but cheap GEO/snippet win: shift the three most query-shaped H2s to question form. Keep "Definition & role in the packaging hierarchy" and "Sizes & what it holds" as-is (they read well and the FAQ covers them).

CURRENT (material.h2):
```json
"h2": "Material, thickness & seal"
```
CORRECTED:
```json
"h2": "What material, thickness and seal is the inner plastic?"
```

CURRENT (barrier.h2):
```json
"h2": "Barrier performance & protection"
```
CORRECTED:
```json
"h2": "How does the inner plastic protect charcoal in transit?"
```

CURRENT (neutralVsBranded.h2):
```json
"h2": "Neutral vs branded"
```
CORRECTED:
```json
"h2": "Neutral or branded plastic — which should you order?"
```

> Note: these duplicate the FAQ questions almost verbatim. If the team prefers to avoid two near-identical question strings on one page (snippet cannibalization), leave the section H2s as reference labels and rely on the FAQ for the interrogative form — that is a legitimate design choice here. This is a true *minor* item; the page is already snippet-strong via the leads.

## 4. Devil's Advocate section

This is the section to add (prose form; JSON-ready version in 3.1). Thesis being contested: *the inner plastic — not the box — is the moisture/dust barrier that protects the charcoal in transit.*

## A View from the Other Side: The Strongest Argument Against "The Plastic Is What Protects It"

**The counterargument.** Experienced importers will push back hard on the idea that a thin heat-sealed film is "the barrier." A poly bag is not hermetic; it can pinhole, the seal can fail under carton compression, and polyethylene is permeable to water vapor over weeks at sea. By this view, what actually keeps charcoal dry in a 4-to-8-week container is the rigid master carton resisting crush and condensation, plus desiccant managing humidity — and the inner film is little more than a dust wrapper and a retail-presentation surface. Selling the film as "the moisture barrier of the whole system" overstates a commodity layer.

**Where it genuinely holds.** This objection is valid whenever the film is the *only* safeguard. A single sealed bag, alone, is not a guarantee against ingress over a long, humid voyage — and the page's own framing ("the master box is structural, not a moisture barrier") concedes that the carton was never the moisture defense to begin with.

**The rebuttal, using only on-site facts.** The page does not claim the film is hermetic or sufficient on its own. It explicitly scopes the inner plastic as the *first of three layers*: the sealed film seals the product, desiccant sachets absorb residual humidity inside the cartons, and a thermal blanket handles container condensation on long or humid routes (barrier.p2; add-ons cross-linked to /packaging/additional-packaging). The claim is narrower and defensible: the film is the *continuous, heat-sealed, tamper-evident closure that touches the product* and keeps ambient moisture and dust off it — the only layer in the stack that does that. The carton is correctly described as structural, not a moisture barrier, so there is no competing component for that role. The disagreement, properly read, is not "film vs carton" but "single layer vs layered system" — and the page already argues for the layered system. The counterargument therefore strengthens, rather than refutes, the page's spend-allocation guidance: spend on the box for shelf appeal, rely on the sealed film (backed by desiccant and thermal blanket on hard routes) for protection.

## 5. Ontological completeness & triangulation

- **Genesis (factory-as-source):** Implicit and adequate — content is in the factory's voice, the export desk / inquiry / samples CrossLinks anchor it to the supplier, and ArticleMeta carries authored/reviewed/fact-checked roles. The plastic is never tied to a *named production step* (e.g. where in the line bags are filled and heat-sealed); a one-clause provenance hook or a link to /factory/production-process would tighten Genesis. Low priority.
- **Taxonomy (charcoal-packaging classification):** Strong. The page nails the primary/inner-box/master-box hierarchy with a visual diagram, a DefinedTerm (primary packaging / inner plastic / poly bag → /glossary#inner-plastic), and the "primary packaging" definition. Position in the packaging ontology is explicit and machine-readable.
- **Pragmatics (buyer value):** Strong. Spend-allocation guidance (box for appeal, film for barrier), survive-the-voyage framing, capacity reference via the cube-25mm SKU, neutral-vs-branded decision with a sample CTA. Buyer "so what" is explicit in every section.
- **Weakly connected entity — the barrier *claim* itself:** "moisture barrier" / "keeps humidity out" is the page's central concept yet it connects to no quantified property (no µm-conditional MVTR, no moisture-ingress test result). The film entity is asserted but not measured. Closing this with even one real spec figure (Section 6) would convert the strongest qualitative claim into an extractable, citation-worthy fact.
- **Weakly connected entity — foil/metallized barrier:** Exists as a conditional section + at-a-glance row but is currently dormant (renders only if `foilBarrier === true`). When/if enabled, it should connect to the same barrier-claim entity (why foil > plain film, on which routes) so it isn't an isolated upsell node.

## 6. Gaps needing owner data

- **<NEEDS-OWNER-DATA: a verifiable barrier figure for the inner plastic>** — the core "moisture/dust barrier" claim is qualitative only. If the owner can confirm a real, measured spec (e.g. film MVTR/WVTR at the stated micron gauge, or a documented moisture-gain limit of sealed packs over a defined humidity exposure), it would back Rule 8's central claim. Do NOT publish any figure until owner-confirmed; leave as "specified per order" otherwise.
- **<NEEDS-OWNER-DATA: default inner-plastic material / thickness (µm) / seal type>** — these render only when present in `company.ts` (`primaryPlastic.material`, `.thicknessMicrons`, `.sealType`). If a standard default exists and is confirmed, populating it would let the "Current spec" line and the at-a-glance thickness row render with a concrete number instead of "specified per order." Not a content rewrite — a data-confirmation item.
- **<NEEDS-OWNER-DATA: plastic printing price ({{plasticPrintPrice}})>** — `pricing.plasticPrintingPerKgUsd`; currently falls back to "available on request." Optional to publish given the site's deliberate no-public-per-ton-price stance; flagged only because the template supports it.
