# Content Audit & Targeted Rewrite — How to Choose a Shisha Charcoal Factory
**Route:** /guide/how-to-choose-shisha-charcoal-factory · **Source:** src/i18n/en/guide.json (en.guide.chooseFactory)

Confirmed thesis (from `intro.p1` + `heroSubtitle`): **a quote tells you a price, not whether a factory can prove its specs, ship legally, and reproduce the result — so verify each criterion against a document, never accept a quote at face value.** The page is a verification checklist that fully practices what it preaches: every "how we meet" line is gated on a real `company.ts` fact and degrades to omission rather than prose-filling. It is already a strong, honesty-clean page; the gaps are surface-form (heading question-mapping, two missing snippet leads) plus one genuine structural hole (no Devil's-Advocate section).

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|------|--------|-----------------|
| 1. Headings as questions | PARTIAL | The 7 checklist H3s are noun labels ("Specifications & test methods") and 5 of 6 H2s are statements ("Commercial terms at a glance", "How we meet each criterion", "Red flags & due diligence"). Each maps to a clear buyer question but is not phrased as one. The FAQ block is correctly interrogative. Snippet leads largely compensate; question-form headings would lift snippet/PAA capture. See §3. |
| 2. Featured-snippet lead | PASS | Every section opens with a self-contained answer: `b2.definition`, `criteria.intro`, `b1.intro`, `eu.body1`, `redFlags.intro`. The two list-only sections (`questionsToAsk`, the criteria H3s) are the exceptions — minor, addressed in §3. |
| 3. Paragraph intent | PASS | No stray paragraphs. Each maps cleanly to one intent (see §2 intent map); the `eu` two-paragraph split correctly separates "who registers" from "how it's classified". |
| 4. No fluff + anti-bloat | PASS | Dense and specification-led throughout. `criteria.intro` is one sentence; b1 lines are single facts. No restatement, no padding. One micro-note in §3 on `b1.intro` ("not a claim") which is rhetorical but earns its place as the section's honesty frame. |
| 5. Section purity | PASS | Clean clusters: commercial terms / checklist / our-proof / EU regulatory / questions / red-flags / FAQ. No bleed; the EU REACH section is correctly fenced as buyer-guidance, not a product claim. |
| 6. Structure / coverage | PASS | Logical funnel: terms → what to verify → our proof → regional regulatory → ask-list → red-flags → FAQ → sources. No duplicated meaning. The questions-to-ask and red-flags lists deliberately mirror the checklist as recall aids, not redundancy. |
| 7. Devil's Advocate | FAIL | No dedicated counterargument section after the thesis-proving "How we meet each criterion" block. The strongest real industry objection ("full third-party due diligence is overkill / too slow / too costly for a first trial order") is never surfaced or rebutted. Drafted in §4. |
| 8. Quantified evidence | PASS | Benefit claims are backed by on-site config facts: 350 t/month across 4 lines on a 14–21 day lead, third-party labs (Carsurin / Beckjorindo / SGS), ISO 9001:2015, halal (MUI), audited carriers (MSC / Maersk / CMA CGM), DG adopted voluntarily 2025 vs mandatory 2026. The cross-linked CO study and IMDG/SP 978 facts are cited. Nothing fabricated. |
| 9. Mini-cases | N/A | No real, verifiable problem→action→result case data exists on-site, and none may be invented (honesty gate). A criteria checklist legitimately carries none. Correctly absent; do not add. |
| 10. Ontological completeness | PASS | Dense entity coverage: UN 1361 / Class 4.2 / SP 978 / IMDG 42-24 / UN N.4 / P002 / PG III; ASTM D1762 + ISO 18122/18123/18134-1/18125; REACH (EC 240-383-3 / CAS 16291-96-6) / CLP (H251 / H228) / OR; SGS/Intertek; BPJPH/LPPOM MUI. Genesis, Taxonomy and Pragmatics all explicit (see §5). |

**Per-guardrail N/A checks:** hreflang / per-locale / RTL = **N/A** (production is English-only, ACTIVE_LOCALES=['en']). One-Q&A-block FAQPage schema = **by design**, not flagged. HowTo schema omission = **correct** (a checklist is not an ordered procedure). Charcoal standards (ASTM D1762-84(2021), ISO 18125) are correct-class and explicitly reject coal/coke standards in the `specs` criterion — no action.

## 2. Intent map

| Section / para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| `intro.p1` "Choosing a shisha charcoal supplier is…" | Frame: due diligence > quote (thesis) | keep |
| `b2` "Commercial terms at a glance" | "what terms should a factory state up front" | keep (retitle → question, §3) |
| `criteria.intro` "Seven criteria — each with…" | "what to check when choosing a charcoal factory" | keep |
| `criteria.items[specs]` | "what test methods prove charcoal specs" | keep |
| `criteria.items[coa]` | "do I need a third-party COA / is ISO 9001 enough" | keep |
| `criteria.items[dg]` | "is charcoal a dangerous good / UN 1361 shipping" | keep |
| `criteria.items[capacity]` | "how to confirm factory capacity & lead time" | keep |
| `criteria.items[samples]` | "should I test a sample before ordering" | keep |
| `criteria.items[terms]` | "what MOQ / Incoterms are normal for a container" | keep |
| `criteria.items[branding]` | "can the factory do my own label / OEM" | keep |
| `b1.heading` + items "How we meet each criterion" | Trust / proof: "can THIS factory prove it" | keep (retitle → question, §3) |
| `eu.body1/body2` "This is buyer guidance…" | "REACH / CLP obligations for importing charcoal into EU" | keep |
| `questionsToAsk` "Questions to ask a supplier" | "what questions to ask a charcoal supplier" (copy-paste recall) | keep (add lead, §3) |
| `redFlags` "Red flags & due diligence" | "charcoal supplier scam / warning signs" | keep (retitle → question, §3) |
| `faq` 3 items | PAA / snippet capture | keep |
| `outbound` + `related` | Authority / internal-link equity | keep |

No row is fluff; nothing to delete or compress for length.

## 3. Targeted rewrites

Only real gaps below. Sections not listed already pass — leave them untouched.

### Rule 7 — Devil's Advocate (FAIL): the one structural gap
The complete drafted section is in §4. It is new JSON (a `counterview` namespace) plus a TOC row and an `<h2>`/two-`<p>` block in the `.astro`. Content is in §4; treated as the priority fix.

### Rule 1 — Heading question-mapping (PARTIAL)
Heading question-form lifts snippet/PAA eligibility. These are value-only changes (no fact touched). The checklist H3 noun labels can stay as scannable labels (they are an ItemList by design), but the four section H2s below should become questions.

**`b2.heading`**
- CURRENT: `"Commercial terms at a glance"`
- CORRECTED: `"What commercial terms should a factory state up front?"`

**`b1.heading`**
- CURRENT: `"How we meet each criterion"`
- CORRECTED: `"How does this factory meet each criterion?"`
- Note: also update the matching `tocItems` label and the `eu`-adjacent flow; the anchor `how-we-meet` is unchanged.

**`redFlags.heading`**
- CURRENT: `"Red flags & due diligence"`
- CORRECTED: `"What are the red flags when choosing a charcoal factory?"`

**`questionsToAsk.heading`** — already effectively a question-prompt label; acceptable as-is, but for parallelism:
- CURRENT: `"Questions to ask a supplier"`
- CORRECTED: `"What questions should I ask a charcoal supplier?"`

(`eu.heading` "EU buyers: REACH & CLP in brief" reads as an audience label and is fine; optional question form: `"What REACH & CLP rules apply when I import charcoal into the EU?"`.)

### Rule 2 — Missing snippet lead on two list-only sections (minor)
Two sections jump straight into a list with no self-contained answer line above it.

**`questionsToAsk`** — add an intro key (mirrors the `redFlags.intro` pattern):
- CURRENT: heading → list (no lead).
- CORRECTED — add `"intro"`:
  `"Ask for the proof a quote omits — the lab data, the dangerous-goods paperwork, the capacity figures and the sample. Copy these into your first message to any supplier:"`

**`criteria` (the seven H3 cards)** — the section lead `criteria.intro` ("Seven criteria — each with how to verify it and where the proof lives.") already serves as the snippet anchor for the block, so each card does **not** need its own lead. No change required; noting it here only to confirm it is not a gap.

### Rule 4 — anti-bloat spot-check (PASS, no edit)
`b1.intro` "Here is how our factory answers the checklist above — each point backed by a document or a page, not a claim." reads slightly rhetorical ("not a claim"), but it is the honesty frame that justifies the whole gated section, so it stays. No cut warranted anywhere on the page.

## 4. Devil's Advocate section

The page has a clear thesis (verify every criterion before committing; never trust a quote at face value). The honest, strongest industry objection is the *cost and speed* of that verification — and it genuinely holds for the smallest first orders. Draft below uses only on-site / `company.ts` facts (sample-first path, 18 t single-container MOQ, 14–21 day lead, per-batch COA, voluntary DG compliance). Ready to paste as a new `chooseFactory.counterview` namespace, rendered as an `<h2>` + two `<p>` immediately after the `how-we-meet` section, with a `tocItems` row (`anchor: 'counterview'`).

```json
"counterview": {
  "heading": "Is full factory due diligence overkill for a first order?",
  "body1": "The strongest argument against this checklist is speed and cost. A buyer placing a single trial container can reasonably say that demanding a third-party COA, a UN N.4 self-heating report, a capacity audit and a signed Incoterms sheet — before a relationship even exists — adds weeks and fees to what is meant to be a low-stakes test. Many small importers do skip most of it, order one container on a photo and a price, and accept the risk. For a one-time buyer who never reorders, that shortcut sometimes works.",
  "body2": "It stops working the moment you intend to reorder or resell under your own name — which is the entire premise of wholesale. The checklist is not a wall in front of the first order; it is sequenced to fit inside it. A sample ships before any container commitment, so you test ash, density and burn for the price of courier — not a container. Dangerous-goods compliance is non-negotiable regardless of order size: since IMDG Amendment 42-24 the self-heating test no longer exempts charcoal, so a supplier who cannot produce a DG declaration cannot legally load your cargo, trial or not. And the proof that costs the buyer the most to gather — DG paperwork, ISO 9001:2015, audited carriers, a per-batch COA — is documentation a serious factory already holds and hands over at no added lead time. Here that compliance was adopted voluntarily a year ahead of the 2026 mandate. The due diligence you skip on order one is the inconsistency you discover on order three, when the brand on the box is yours.",
  "samplesLinkLabel": "Test a sample before you commit",
  "samplesHref": "/samples"
}
```

Every figure above is on-site: sample-before-container (`b1.samples`, `criteria.items[samples]`), single 20ft / 18 t MOQ (`company.commercial.moq`), 14–21 day lead (`leadTimeLabel`), ISO 9001:2015 (`certifications.iso9001`), audited carriers (`dg.carriersAudited`), per-batch COA (`criteria.items[coa]`), IMDG 42-24 / SP 978 / UN N.4 (`criteria.items[dg]`, `faq`), voluntary-ahead-of-mandate (`dg.voluntaryFrom` 2025 vs `dg.mandatoryFrom` 2026). No fabricated number, lead time, or case.

## 5. Ontological completeness & triangulation

- **Genesis (factory-as-source) — explicit.** `b1` ties every criterion to a named, config-backed capability (350 t/month, 4 lines, named labs, ISO 9001:2015, MUI halal, named carriers), and `intro.p1` frames the author as a factory speaking peer-to-peer. Strong.
- **Taxonomy (charcoal-classification position) — explicit.** UN 1361 / Class 4.2 / PG III, ASTM D1762 vs the ISO 18xxx biofuel series, and the explicit rejection of coal/coke standards place coconut shell charcoal correctly in the self-heating-solid-biofuel class. Strong.
- **Pragmatics (buyer value) — explicit.** Each criterion states *how to verify* and *where the proof lives*; `questionsToAsk` and `redFlags` convert the taxonomy into buyer action. Strong.
- **Weak connectivity to close:** the **sample → COA → reorder-consistency** chain is the page's real causal spine (echoed in the Devil's-Advocate rebuttal) but is never stated as one explicit relation — `samples`, `coa` and `capacity` sit as three isolated checklist cards. A single sentence in `criteria.intro` linking "a tested sample sets the baseline your per-batch COA is later measured against" would bind them (the `/guide/how-to-order` page already makes this link — mirror it).
- **Weak connectivity to close:** **REACH/CLP (`eu`)** is well-developed but topologically isolated from the rest of the checklist — it has no inbound relation to the `coa`/`specs` criteria even though the SDS it references is the same documentation pack. One clause ("the same SDS and COA pack that backs the COA criterion above") would connect the EU node to the checklist graph.

## 6. Gaps needing owner data

- None. Every rewrite in §3 and the full Devil's-Advocate draft in §4 are built entirely from text already on the page or facts already in `src/config/company.ts`. No `<NEEDS-OWNER-DATA>` placeholder was required.
