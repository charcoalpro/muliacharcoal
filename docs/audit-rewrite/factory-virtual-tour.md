# Content Audit & Targeted Rewrite — Virtual Factory Tour
**Route:** /factory/virtual-tour · **Source:** src/i18n/en/factoryVirtualTour.json, src/i18n/en/factoryCommon.json (en.factoryVirtualTour)

This is a verification/procedural page. Its implicit thesis is narrow and defensible: *a buyer can independently verify this factory three ways — video, in-person/live visit, and buyer-appointed surveyor.* Every claim on the page maps to a real fact in `company.json` (real `factoryTourVideo.youtubeId`, real `factory-audit` doc = Beckjorindo dated 2026-01-12, real `videoCallRequest` WhatsApp preset, real `facilityAreaGrouped` token, generically-named surveyors SGS/Intertek/Bureau Veritas not claimed as partners). No honesty-gate violations found. The page is strong; gaps are snippet-lead form, two headings that aren't yet questions, and one bloat trim.

## 1. Compliance scorecard

| Rule | Status | Evidence & note |
|---|---|---|
| 1. Headings as questions | PARTIAL | TL;DR FAQ + most H2s map cleanly to buyer questions ("Visit the factory in person" → *Can I visit?*, "Send your own inspector" → *Can I send my own inspector?*). But "Video walkthrough", "What the tour covers", and "From first contact to shipment" are label-style, not question-form. They map to real questions and could be rephrased. |
| 2. Featured-snippet lead | PARTIAL | TL;DR is an excellent extractable answer. Section bodies mostly lead well (visit/inspection/audit open with a direct "We welcome…/You may appoint…/Our factory has been audited…"). The **video** H2 body is a fragment (a sentence-less list of areas) with no self-contained answer; **walkthrough** body is a colon-led setup, not a standalone answer. |
| 3. Paragraph intent | PASS | Every block serves one named intent (see §2). No stray paragraphs. |
| 4. No fluff + anti-bloat | PARTIAL | Tight overall. One soft spot: `heroSubtitle` + `tldr.body` + `intro.p1` all restate "verification is the point" three times in the first screen. The hero/TL;DR pairing is acceptable (different surfaces), but `intro.p1` ("Verification is the whole point of this page") re-states it a third time and is pure throat-clearing — compress. |
| 5. Section purity | PASS | Each H2 owns one intent cluster (video / scope / visit / inspector / audit / order-path / guarantee). No bleed. The orientation steps stay in their lane. |
| 6. Structure | PASS | Logical arc: see it (video) → what you'd see (scope) → see it live (visit) → independent check (inspector) → documented check (audit) → full order path → remedy. No duplicated meaning except the intro restatement above. |
| 7. Devil's Advocate | N/A | Procedural verification page, not an argumentative one (see §4). A counter-view block would be manufactured filler here. |
| 8. Quantified evidence | PASS | Claims are appropriately quantified from on-site facts: `{{facilityAreaGrouped}} m²`, "3 minutes" video, the seven concrete production stages, the named surveyor bodies, the eight-step order path. No benefit claim is left vague, and none is fabricated. |
| 9. Mini-cases | N/A | No real, verifiable problem→action→result customer case exists in source. Correctly omitted — do not invent one. |
| 10. Ontological completeness | PASS | Genesis (factory-as-source, named `{{brand}}`/`{{city}}`), Taxonomy (coconut-charcoal production chain: carbonization→milling→pressing→drying→weathering→QC→packing), Pragmatics (buyer can verify before committing) are all explicit and densely linked to /factory, /quality, /samples, /contact. |

**Original page score: 88/100** — content is honest, well-structured, and link-rich; the only real deductions are non-question headings (rule 1), two missing snippet leads (rule 2), and one redundant intro line (rule 4).

## 2. Intent map

| Section/para (first ~5 words) | Search intent served | Verdict |
|---|---|---|
| "Factory Virtual Tour & Visits" (h1) | Navigational — can I tour/visit this factory | keep |
| "Don't take our word for it…" (heroSubtitle) | Reassurance — is this factory real/verifiable | keep |
| "You can verify the {{brand}} factory…" (tldr.body) | Snippet/answer — how do I verify the factory (3 ways) | keep (model snippet) |
| "Verification is the whole point…" (intro.p1) | Orientation + up-link to hub | compress (drops the throat-clearing clause) |
| "A short walkthrough of the production floor…" (video.body) | Informational — what's in the video | rewrite (add snippet lead) |
| "Whether you watch the video…" (walkthrough.body + stages) | Informational — what will I see on the tour | rewrite (lead) / keep stages |
| "We welcome serious buyers to visit…" (visit.body) | Transactional — can I visit / book a live call | keep |
| "You don't have to rely on our word…" (inspection.body) | Risk-reduction — can I send my own surveyor | keep |
| "Our factory has been independently audited…" (audit.body) | Due-diligence — is there a third-party audit | keep |
| "Here is the path a typical order follows…" (orientation.body + steps) | Process — what are the steps to order | rewrite heading→question / keep body+steps |
| "Our specification guarantee and exchange/refund…" (guarantee.body) | Risk — what if the spec is wrong (link to /quality) | keep |
| FAQ ×3 (visit / inspector / video+audit) | GEO snippet capture | keep |
| Related topics ×7 | Internal linking / navigation | keep |

## 3. Targeted rewrites

Only real gaps below; everything else passes as-is.

### A. Rule 1 + 2 — "Video walkthrough" heading + missing snippet lead
The H2 is a label, and the body is a sentence-fragment list of areas with no self-contained answer. Rephrase to the buyer's question and add a one-line answer that the fragment can then elaborate.

CURRENT
```
"h2": "Video walkthrough",
"body": "A short walkthrough of the production floor — carbonization ovens, the briquetting lines, the drying tunnel, the QC station, and packing.",
```
CORRECTED
```
"h2": "Is there a video tour of the factory?",
"body": "Yes — a short video walkthrough of the production floor, covering the carbonization ovens, the briquetting lines, the drying tunnel, the QC station, and packing.",
```

### B. Rule 1 + 2 — "What the tour covers" heading + snippet lead
The body opens with a colon ("…here is what you'll see:") which reads as a caption, not a standalone answer. Make the H2 a question and let the first clause stand as the answer before the list.

CURRENT
```
"h2": "What the tour covers",
"body": "Whether you watch the video, visit in person, or join a live WhatsApp video call, here is what you'll see across the {{facilityAreaGrouped}} m² factory:",
```
CORRECTED
```
"h2": "What will I see on the factory tour?",
"body": "The tour walks the full production chain across the {{facilityAreaGrouped}} m² factory — from raw coconut shell to a sealed export container. Whether you watch the video, visit in person, or join a live WhatsApp video call, you'll see each stage below:",
```

### C. Rule 1 — "From first contact to shipment" heading
Body and steps are good; only the heading needs question form to match the buyer's actual query.

CURRENT
```
"h2": "From first contact to shipment",
```
CORRECTED
```
"h2": "What are the steps from first contact to shipment?",
```

### D. Rule 4 — `intro.p1` redundancy / throat-clearing
"Verification is the whole point of this page" restates the hero and TL;DR a third time and carries no new information; the only load-bearing part is the up-link to the hub. Compress to keep the link and drop the filler. (Note: the `.astro` appends the hub link inline after `p1`, so the value must still end mid-sentence leading into the link.)

CURRENT
```
"p1": "Verification is the whole point of this page. It is part of our",
```
CORRECTED
```
"p1": "This page is part of our",
```

### E. (Optional polish, Rule 2) — `audit.h2` to question form
Minor; "Third-party factory audit" already leads with a strong answer sentence, so this is lower priority than A–C, but for consistency with the FAQ voice:

CURRENT
```
"h2": "Third-party factory audit",
```
CORRECTED
```
"h2": "Has the factory been independently audited?",
```

No other rewrites. The visit, inspection, audit, and guarantee bodies already open with self-contained answers, the FAQ is clean, the surveyor naming and audit claim are factually backed, and no number anywhere needs sourcing.

## 4. Devil's Advocate section
N/A — this is a procedural verification/reference page (how to see and independently check the factory), not a thesis-driven argument. Its only claim is "you can verify us three ways," which is self-evidently true and already evidenced; a manufactured "strongest argument against verification" would be filler, and inventing a counterparty objection would violate the strict-facts guardrail.

## 5. Ontological completeness & triangulation
- **Genesis — explicit.** Factory-as-source is named throughout (`{{brand}}`, `{{city}}`, `{{facilityAreaGrouped}} m²`) and reinforced by the third-party audit (Beckjorindo) and the up-link to the /factory hub. Strong.
- **Taxonomy — explicit.** The walkthrough stages place the page correctly inside the coconut-charcoal production taxonomy (carbonization → milling/sieving → binder + pressing → drying → weathering → QC → packing/stuffing), with links to /factory/production-process and /factory/raw-materials. No isolated concepts.
- **Pragmatics — explicit.** Buyer value (de-risk a container-scale first order before paying) is carried by the three verification paths plus the order-path steps and the /quality guarantee link. Strong.
- **Weak connectivity to close:** the **QC bench** entity ("moisture and burn/ash tests") appears in the walkthrough but isn't linked to /quality/testing-methods, where that entity is canonical — adding that cross-link would tighten the QC→testing relation for both readers and crawlers (note: ash = ASTM D1762-84(2021), calorific = ISO 18125 are settled on that page; nothing to change here).
- **Minor:** the **live WhatsApp video call** entity is mentioned three times (hero CTA, visit, walkthrough) but never defined as its own affordance — fine as-is, but a one-line "how the live call works" could consolidate it if the section is ever expanded. Not a gap, just the lowest-density relation on the page.

## 6. Gaps needing owner data
None. Every claim on the page is backed by an existing fact in `src/config/company.ts` / `company.json`, and none of the suggested rewrites introduces a new number, spec, certification, or case.
