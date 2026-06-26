# Content Audit & Targeted Rewrite — Charcoal Shipping Lines
**Route:** /logistics/charcoal-shipping-lines · **Source:** src/i18n/en/logisticsShippingLines.json, src/i18n/en/logisticsCommon.json (en.logisticsShippingLines)

This is primarily a procedural/reference page (a carrier-acceptance reference for declared UN 1361 charcoal). It carries one soft, defensible thesis: *carrier choice for charcoal is a compliance decision, and we book DG-capable lines directly while holding any carrier-required factory audit.* Data state verified against `src/data/company.json`:
- `dg.carriersAudited = ['MSC','Maersk','CMA CGM']` → accept-list renders three names; `{{carriersAudited}}` = "MSC, Maersk, CMA CGM".
- `dg.carriersNotAccepting = []` → the decline column and `declineIntro` do **not** render (correct — no invented names). Only the unconditional `declineNote` shows.
- `{{incotermDefault}}` resolves from `commercial.portOfLoading.incoterm = "FOB"` (NOT the null `logistics.incotermDefault`), so "EXW / FOB" and "Under EXW or FOB" render correctly.
- `{{unClass}}` = "4.2".

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as buyer questions | PARTIAL | `audit.h2` ("Do you need a factory audit to book?") and `forwarder.h2` ("Can I use my own forwarder?") are already direct buyer questions. `whyDg.h2` ("Why charcoal needs a DG-capable carrier") and `carriers.h2` ("Carriers that accept charcoal") are statements that map cleanly to questions. See §3. |
| 2. Featured-snippet lead | PASS | Each section opens with a self-contained answer: forwarder leads "Yes."; carriers leads with the direct booking statement; whyDg leads with the rule. Minor tightening possible on `audit.body` (lead with the yes/no). See §3. |
| 3. Paragraph intent | PASS | Every block serves one explicit carrier/DG intent (see §2 intent map). No stray paragraphs. |
| 4. No fluff / anti-bloat | PASS | Copy is dense and specification-led; no restatement, no filler. `intro.p1` is two purposeful sentences (pillar uplink + framing). Nothing to cut. |
| 5. Section purity | PASS | Four clean clusters: why-DG, accept/decline carriers, factory audit, own-forwarder. No bleed; FAQ restates the same three intents in Q&A form (by design for FAQPage). |
| 6. Structure / coverage | PASS | Logical flow: compliance premise → carrier list → audit gate → forwarder option. No gaps for the page's scope. One latent risk only when `carriersNotAccepting` is later populated (see §3 / §5). |
| 7. Devil's Advocate | PARTIAL | No on-page counter-view section. Thesis is soft and the page is mostly procedural, so this is optional, but a short rebuttal of the "just nominate any forwarder / any carrier" view would strengthen it. Drafted in §4. |
| 8. Quantified evidence | PASS | Claims are anchored to verifiable specifics already on-site/in-config: UN 1361, Class 4.2, SP 978, named carriers (MSC, Maersk, CMA CGM), Incoterms (EXW/FOB). No vague benefit claims left unquantified. |
| 9. Mini-cases | N/A | No real, verifiable problem→action→result customer case exists in source or config. Correctly absent; do not invent one. |
| 10. Ontological completeness | PASS | Genesis (factory-as-shipper booking directly), Taxonomy (UN 1361 / Class 4.2 / SP 978 placement), Pragmatics (buyer can plan routing, skip arranging audits, or bring own forwarder) all explicit. One semantic gap noted in §5. |

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "This page sits under the…" (`intro.p1`) | Orient + reframe carrier choice as compliance | keep |
| "Carriers at a glance" (`keyFacts`) | Scannable answer box: who/how booked | keep |
| "Why charcoal needs a DG-capable carrier" (`whyDg`) | Why won't every line take charcoal? | keep (rewrite heading → question) |
| "Carriers that accept charcoal" (`carriers.acceptIntro`) | Which lines actually carry it? | keep (rewrite heading → question) |
| "Several major lines have declined…" (`carriers.declineIntro`) | Which lines refuse it? (routing risk) | keep — currently dormant (`carriersNotAccepting=[]`); see §3 |
| "Carrier acceptance changes; we confirm…" (`declineNote`) | Currency / "is this list reliable?" | keep |
| "Do you need a factory audit to book?" (`audit`) | Will the audit fall on me, the buyer? | keep (tighten lead) |
| "Can I use my own forwarder?" (`forwarder`) | Can I keep my own ocean contract? | keep |
| FAQ (3 items) | Re-expose the three core intents for FAQPage/AI extraction | keep |
| "Related topics" (`related`) | Onward navigation within Logistics pillar | keep |

## 3. Targeted rewrites

Only genuine gaps below; everything not listed already passes.

### Rule 1 — `whyDg.h2` (statement → buyer question)
CURRENT:
> "Why charcoal needs a DG-capable carrier"

CORRECTED:
> "Why does charcoal need a DG-capable carrier?"

### Rule 1 — `carriers.h2` (statement → buyer question)
CURRENT:
> "Carriers that accept charcoal"

CORRECTED:
> "Which shipping lines accept charcoal?"

*(Note: this matches the first FAQ question verbatim, which is acceptable — the section gives the named list and the FAQ restates it for schema. If you prefer differentiation, use "Which carriers will load UN 1361 charcoal?")*

### Rule 2 — `audit.body` (lead does not answer the heading's yes/no first)
The heading asks "Do you need a factory audit to book?" The buyer's literal question is "will I have to arrange one?" Lead with the answer, then elaborate.
CURRENT:
> "Some carriers require a dangerous-goods or fire-safety audit of the producing factory before they will load its UN 1361 cargo. Where a carrier requires it, we hold that audit — the buyer does not have to arrange anything. It is part of why we can book the lines we do."

CORRECTED:
> "No — you do not arrange it. Some carriers require a dangerous-goods or fire-safety audit of the producing factory before they will load its UN 1361 cargo; where a carrier requires it, we hold that audit ourselves. It is part of why we can book the lines we do."

### Rule 6 / future-state — `carriers.declineIntro` (over-promises while the list is empty)
The intro says "We name them so you can plan your routing," but `carriersNotAccepting` is currently `[]`, so the block — and this promise — never renders. The copy is fine *as written for the populated state*; no change needed today. Flagging only so the promise stays honest: do not surface `declineIntro` text anywhere outside the `decline.length > 0` guard (the .astro already gates it correctly at lines 120–129). No rewrite required.

## 4. Devil's Advocate section

The page's soft thesis is: *book DG-capable lines through the factory, which also holds any carrier-required audit.* The strongest real industry counter-view is that an experienced importer may prefer to control the ocean leg entirely. Draft (uses only on-site/config facts — named carriers, EXW/FOB, the audit hold, UN 1361/Class 4.2):

> ## A View from the Other Side: Why Some Buyers Route Their Own Charcoal
>
> The strongest argument against letting the factory book the carrier is control. A large importer with its own freight contracts, NVOCC relationships, and a DG-experienced forwarder can often secure better ocean rates and a fixed sailing schedule than a single shipper can, and may not want its routing tied to whichever line the factory has booked.
>
> That argument holds — and this page does not dispute it. Under EXW or FOB you are free to nominate your own forwarder, and we hand over a fully declared, document-complete UN 1361 container ready to load. What does not change is the compliance floor underneath the freight: the cargo is still declared Class 4.2 self-heating dangerous goods, still needs a line set up to accept it under SP 978, and — for the carriers that require it — still needs a factory that has passed the dangerous-goods or fire-safety audit. Whether your forwarder books MSC, Maersk, or CMA CGM, or we do, that audit and that declaration are what get the box loaded. So the choice is genuinely yours on the freight; it is not a choice on the compliance.

*(Optional. If added, it would slot after the `forwarder` section and before the FAQ, and should be keyed e.g. `otherSide.{h2,body}` in the JSON.)*

## 5. Ontological completeness & triangulation

- **Genesis — explicit.** Factory-as-shipper is clear throughout ("we book… directly," "we hold that audit"); the page correctly frames the producer, not a freight desk, as the booking party.
- **Taxonomy — explicit.** UN 1361 / Class 4.2 / SP 978 placement is stated in `whyDg.body` and reinforced in keyFacts and FAQ. Charcoal's class position is unambiguous.
- **Pragmatics — explicit.** Three distinct buyer payoffs are named: routing visibility (named accept-list), zero audit burden, and freedom to nominate own forwarder.
- **Weak connectivity — SP 978 is named but not linked.** `whyDg.body` cites "SP 978 handling" as a bare term; it connects to UN 1361 and the DG regulation but the reader cannot resolve what SP 978 *requires* from this page. The two inline links (`/logistics/charcoal-dg-regulation`, `/logistics/un-1361`) partly cover this — confirm one of those targets defines SP 978 so the entity is not isolated.
- **Latent gap — the decline-list relationship is dormant.** With `carriersNotAccepting=[]`, the "lines that decline" entity exists in copy but has no instances, so the accept/decline contrast (a real buyer-routing relationship) is one-sided on the live page. Not a defect — populate the config when names are confirmed; never invent them.

## 6. Gaps needing owner data

- None. No rewrite above requires a number, spec, or name absent from the page or `src/config/company.ts`. (Populating `dg.carriersNotAccepting` is an optional data update, not a fabricated figure.)
