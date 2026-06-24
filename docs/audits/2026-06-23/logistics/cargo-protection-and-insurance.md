# Content Audit — /logistics/cargo-protection-and-insurance

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report, no fixes). Passes 0,1,2,3,5. Pass 6 OFF.
**Cornerstone:** No (minor trust/reassurance node). Meta-table present; Devil's-Advocate absence = Hardening, not Defect.

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| Route | `/logistics/cargo-protection-and-insurance` |
| Pillar | Logistics (links up in first paragraph + Related; pillar links down — see below) |
| Source file | `src/pages/logistics/cargo-protection-and-insurance.astro` |
| Layout | `BaseLayout.astro` (`type="article"`, `includeOrgSchema={false}`) |
| i18n | `src/i18n/en/logisticsCargoProtection.json` (page strings) + `src/i18n/en/logisticsCommon.json` (`tc` meta-block, `caveats.insurance`) |
| Components | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `KeyFactsBox`, `Figure`, `FAQSection`, `CTABanner`, `MaybeLink` |
| Schema builder | `src/lib/schema/logisticsClusterPage.ts` |
| Schema types emitted | `WebPage`, `FAQPage`, `TechArticle` (page graph) + `BreadcrumbList` (emitted separately by `Breadcrumbs`) |
| `company.ts` fields consumed | `company.logistics.insurance.coverage[]`, `company.logistics.insurance.exclusions[]`, `company.logistics.editorial.dateModified`, `company.packaging.ancillary.thermalBlanket`, `company.packaging.ancillary.containerDesiccant`, `company.governance.author.name` (via schema builder), `company.whatsapp.presetMessages.salesGeneral`, `waLinkFor('salesGeneral')` |
| `company.ts` fields imported but NOT rendered | `company.logistics.insurance.basis` (decisive — see B2), `coverageNote`, `sumInsuredBasis`, `claimsNote` (all empty strings — correctly omitted) |
| Pillar down-link | `src/pages/logistics/index.astro:365` + `src/i18n/en/logistics.json:223` → not an orphan |
| Incoming permanent links | Logistics pillar (above), plus `charcoal-dg-regulation.astro`, `un-1361.astro`, `documents.astro`, `rules.astro`, `import-to-[country].astro` reference it (grep-confirmed). No orphan. |
| Build | Not run (read-only mode; dist already built). Built HTML inspected at `dist/logistics/cargo-protection-and-insurance/index.html`. |

**Source-of-truth note:** the `insurance` and `cargoProtection`/`ancillary` *values* live in `src/data/company.json` (typed through `src/config/company.ts`). Both checked.

---

## 2. Severity-tiered TODO list

### BLOCKERS

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, NOT executed) |
|---|---|---|---|---|---|
| **B1** | Blocker | Pass 1 — Honesty-gating (claim rendered WITHOUT a backing fact; banking-severity) | `condition` section body (`t.condition.body`, source line 118 / HTML `#condition`), FAQ item 3 (`t.faq.items[2].a`), figure `alt` + `caption` (`t.media.alt` / `t.media.caption`, source line 119) | The page asserts **"a thermal blanket buffers temperature swings"** and **"container desiccant manage moisture"** (and the figure alt "Container desiccant and a thermal liner inside a loaded coconut charcoal container") as established facts. But `company.json` has `packaging.ancillary.thermalBlanket = null` and `packaging.ancillary.containerDesiccant = null` (both unconfirmed). The author **knew** this: the KeyFacts rows are gated `anc.thermalBlanket === true ? … : ''` and `anc.containerDesiccant === true ? … : ''` (source lines 39–40), so both rows are correctly dropped from the "at a glance" box. The same two unconfirmed facts are then stated unconditionally in prose, FAQ, and the image alt/caption. This is exactly the "claim rendered without a backing fact" case the honesty-gating rule forbids — and it is internally inconsistent (gated in one block, asserted in another). | Do not write the facts into the repo. Either (a) set `ancillary.thermalBlanket` / `containerDesiccant` to `true` in `company.json` only if a human confirms they are standard, then the prose is backed; or (b) re-gate the `condition` body, FAQ #3, and the figure alt/caption so the thermal-blanket and desiccant statements are conditional on the same `=== true` facts (parallel to the KeyFacts gating), degrading to a moisture/temperature statement that does not name unconfirmed measures. Human decision required — flag to owner. |
| **B2** | Blocker | Pass 1 — Honesty-gating / Pass 3 — claim contradicts source-of-truth | KeyFacts `arrangedValue` ("The buyer (EXW / FOB / CFR — no seller cover)", source line 24 / HTML at-a-glance); `insurance` body2 ("the factory never insures the cargo", line 36); FAQ #1 ("no seller-arranged cover"); hero subtitle framing | The page states, as absolute fact, that **no seller-arranged cover exists and "the factory never insures the cargo."** This contradicts the backing fact `company.logistics.insurance.basis`, which the page imports (`const L = company.logistics`) but never renders. That field reads: *"Marine insurance can be arranged by the factory on request under CIF (seller-arranged cover to the destination port); inherent-vice perils stay excluded under any term."* The locked product decision (memory `logistics-import-cocoon-build`, 2026-06-22) is **"CIF + CFR on request, FOB standard"** — CIF *is* offered. The page predates that decision (`dateModified 2026-06-16`, source header comment "no CIF") and now asserts a position the company has reversed. A buyer reading this page is told seller-arranged insurance is impossible, which is no longer true. | Do not silently rewrite the regulatory/commercial claim. Route to owner: reconcile the page with `insurance.basis` — the page should state that cover is buyer-arranged **by default** under EXW/FOB/CFR, and that CIF (seller-arranged cover to destination) is **available on request**, with inherent-vice still excluded under any term. Render from `L.insurance.basis` rather than the hardcoded i18n "no seller cover" string so the page can never drift from the fact again. |

### DEFECTS

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, NOT executed) |
|---|---|---|---|---|---|
| **D1** | Defect | Pass 1 — Schema architecture (FAQPage placement) | JSON-LD `@graph` in built HTML (`@type":"FAQPage"`, `#faq`); emitted by `logisticsClusterPageSchema` (`src/lib/schema/logisticsClusterPage.ts:87–90`) | The audit rule is "**FAQPage emits ONLY at `/faq` globally.**" This page emits a `FAQPage` node outside `/faq`. NOTE — this is **not** a per-page slip: `logisticsClusterPageSchema` emits a FAQPage on every one of the 7 logistics cluster pages by design ("one Q/A = one FAQPage home"), and this page's Q/As are insurance-specific (they do not poach the SHT→un-1361, COA→certifications, or MSDS→documents canonical homes). Flagged per the methodology ("misplaced FAQPage = Defect"), but the fix is a **cluster-wide schema-architecture decision**, not a single-page edit — and it touches every logistics child. Validity of the JSON-LD is out of scope (DrMax owns it). | Escalate as an architecture decision, not a page fix: confirm with the owner whether the site intends FAQPage on cluster pages (current built behavior) or wants FAQPage centralized at `/faq` only (audit rule). If the rule stands, remove the `faqPage` push from `logisticsClusterPageSchema` and let `/faq` be the sole FAQPage home; the on-page `<details>` FAQ HTML stays (GEO value is in the HTML, not the schema). Do not change this page in isolation. |
| **D2** | Defect | Pass 2 — Headings as questions / featured-snippet | H2s: "Marine cargo insurance" (`#insurance-h`), "Cargo condition in transit" (`#condition-h`), "The safety loop, stated plainly" (`#loop-h`) | None of the three body H2s is phrased as a buyer question, so they do not match query intent for snippet capture. The page's strongest extractable answers (who insures, what's covered, what's excluded) sit under statement headings. The H1 and the FAQ are correctly question-form, which softens this — hence Defect, not Blocker. | Reframe the three H2s as the questions a buyer types, e.g. "Who arranges marine cargo insurance — and what does it cover?", "How is the charcoal kept dry and intact in transit?", "How is the cargo protected end to end?" Keep the first sentence under each as the self-contained answer (it already is for `#insurance` and `#safety-loop`). |

### HARDENING

| ID | Tier | Pass + rule | Exact location | What is wrong | Recommended fix (described, NOT executed) |
|---|---|---|---|---|---|
| **H1** | Hardening | Pass 2 — Devil's Advocate (minor page) | After `#safety-loop` (thesis-proving section) | No steelman of the strongest buyer counterargument ("buyer-arranged insurance + an excluded self-heating peril means I carry the risk"). On a minor page this is Hardening, not Defect. | Add a short "But isn't the buyer left exposed?" beat answering it with the prevention-not-policy logic already on the page, ideally with a number (SP 978 control set, weathering period). |
| **H2** | Hardening | Pass 2 — Quantified evidence / mini-case | `#condition` body ("four to eight weeks at sea") and `#safety-loop` | Reassurance is qualitative ("buffers temperature swings", "limits breakage", "reduce the self-heating risk at source") with no measured figure — no desiccant grams/container, no temperature delta, no documented zero-incident record. (The desiccant/thermal numbers are gated null in `cargoProtection` — see B1; do not invent them.) | Where a confirmed number exists in `company.json` (`cargoProtection.desiccantsPerContainer`, weathering days), surface it. Add one Problem→Action→Result mini-case (a real claim-handled or zero-incident shipment) if a verifiable instance exists; otherwise leave qualitative rather than fabricate. |
| **H3** | Hardening | Pass 1 — Regulatory currency (freshness cadence) | `ArticleMeta` Last updated `2026-06-16` (= `logistics.editorial.dateModified`); `caveats.insurance` carries no date | `dateModified` equals `datePublished` (both 2026-06-16) and is a single shared `logistics.editorial` date, not tied to a regulatory event. Insurance posture is not regulation, so this is cadence Hardening — **except** the page is now factually stale on the CIF point (that is escalated as B2, not here). | When B2 is reconciled, bump `dateModified` with the substantive CIF change as the reason (an event, not a cosmetic bump). Consider a dedicated date for this node rather than the shared `logistics.editorial` date. |
| **H4** | Hardening | Pass 2 — Anti-bloat | `#safety-loop` body restates the covered-perils list ("water, theft, general average, vessel casualty, external fire") already given verbatim in `#insurance` and the KeyFacts box | The five perils now appear three times (KeyFacts, `#insurance` list, `#safety-loop` prose). The third instance is restatement, not new information — compressible ~20% without fact loss. | In `#safety-loop`, reference "the external perils above" instead of re-listing them; keep the prevention-vs-policy contrast, which is the section's unique contribution. |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "self-heating fire … is inherent vice, and standard marine cargo insurance does not cover it" | Correct | — | Matches `insurance.exclusions` and standard ICC marine-cargo treatment of inherent vice. | company.json `logistics.insurance.exclusions` + model |
| Covered perils: wetting/water ingress, theft & pilferage, general average, vessel casualty, external fire | Correct | — | Rendered from `insurance.coverage[]`; not hardcoded. | company.json `logistics.insurance.coverage` |
| "The incoterms we offer — EXW, FOB, and CFR — include no seller-arranged cover, so the factory never insures the cargo." | **Error** | **High** | Contradicts `insurance.basis`: CIF (seller-arranged cover) **is available on request** per the 2026-06-22 locked decision. See B2. | company.json `logistics.insurance.basis`; memory `logistics-import-cocoon-build` decision 1 |
| "Insurance arranged by: The buyer (EXW / FOB / CFR — no seller cover)" (KeyFacts) | **Error** | **High** | Same as above — absolute "no seller cover" is now false; CIF is offered on request. | company.json `logistics.insurance.basis` |
| "a thermal blanket buffers temperature swings" / "Container desiccant … inside a loaded container" (prose, FAQ #3, figure alt) | **Unverified / Error vs gating** | **High** | `ancillary.thermalBlanket = null`, `ancillary.containerDesiccant = null`, `cargoProtection.thermalLiner = null`, `desiccantsPerContainer = ""` — all unconfirmed. Same facts are gated-out of KeyFacts. See B1. | company.json `packaging.ancillary`, `logistics.cargoProtection` |
| "Class 4.2 cargo" / SP 978 controls prevent self-heating | Correct | Low | `UN 1361 / class 4.2 / spontaneous combustion` per `certifications.imdg`; SP 978 is the IMDG special provision for charcoal. | company.json `certifications.imdg`; model |
| "Over four to eight weeks at sea" | Unverified | Low | Plausible Indonesia→US/EU/Gulf transit envelope; not a hard company fact. Consistent with the import-page transit ranges. No correction needed; could cite the relevant lane range. | model / `logistics.freight.lanes` (indicative) |
| "We quote the same day in most time zones" (CTA banner) | Unverified | Low | Marketing claim in shared `CTABanner`; not specific to this page. Out of this page's scope to fix. | model |

---

## 4. Requires deep research

| Claim | Why | Markets |
|---|---|---|
| Whether CIF (seller-arranged marine cover to destination) is actually offered, and the precise exclusion wording under each incoterm | The page and the backing fact `insurance.basis` directly contradict each other (B2). Needs the owner to confirm the current commercial offer before the page is corrected — not a web-research item but a **human/company-fact confirmation**. | All (esp. USA, UK, Germany, Saudi Arabia, Russia) |
| Whether a thermal blanket and container desiccant are in fact standard loading practice (and at what spec) | The prose asserts them while `ancillary.thermalBlanket`/`containerDesiccant`/`cargoProtection.*` are null (B1). Needs factory/operations confirmation before any value is written to `company.json`. | All |
| "Four to eight weeks at sea" precision per priority lane | Optional sharpening (H2); could be tied to `logistics.freight.lanes` indicative ranges rather than a loose 4–8 week band. | USA, UK, Germany, Saudi Arabia, Russia |

---

## 5. E-E-A-T / HCU assessment (Pass 5)

| Criterion | Score /10 | One-line justification |
|---|---|---|
| Authorship & expertise | 7 | Named author/reviewer/fact-checker from `governance.*` in the meta block; honest "prevention not policy" framing reads as practitioner-level. |
| Topical authority | 7 | Tight insurance-for-a-Class-4.2-cargo node, well cross-linked to SP 978, UN 1361, rules, documents, packaging. |
| Technical health & freshness | 5 | Built HTML clean, zero-JS content, within budgets (defer CWV to DrMax); but `dateModified == datePublished` and the CIF content is stale (B2). |
| Effort | 6 | Purpose-built copy, at-a-glance box, four FAQs — but thin on quantified evidence and no mini-case. |
| Originality | 7 | The "you prevent self-heating, you don't insure it" thesis is genuinely differentiated and honest. |
| Citation quality | 5 | Caveat line present ("confirm scope … in the policy or certificate"); no external authority cited for the inherent-vice exclusion. |
| Freshness / timeliness | 4 | Stale on the central commercial fact (CIF now offered); date not event-tied. |
| Page intent | 8 | Clearly serves "is my money / cargo safe?" buyer intent; helpful-first. |
| Structure & readability | 7 | Clean H1→H2 outline, lists, KeyFacts, FAQ; H2s are statements not questions (D2). |
| Mobile | 8 | max-w-3xl, 44px targets, sticky WhatsApp FAB, logical properties — reads fine at 360px (per built HTML; CWV deferred to DrMax). |
| Format-standard adherence | 6 | Meta table, KeyFacts, FAQ present; FAQPage schema placement contested (D1); no Devil's-Advocate (H1, acceptable on a minor page). |
| Trust & spam signals | 5 | High on honesty framing, but two trust-eroding accuracy faults (B1 ungated equipment claims, B2 contradicted incoterm claim) pull this down. |

**PQ = arithmetic mean = (7+7+5+6+7+5+4+8+7+8+6+5)/12 = 75/12 = 6.25 /10**

**Verdict:** **Helpful-first** in intent and tone — the page exists to answer a real buyer fear honestly, and the prevention-vs-policy thesis is a goodClicks signal. But it currently carries two factual integrity faults (a claim that contradicts its own source-of-truth fact, and equipment claims the author themselves gated out of the summary box) that turn good intent into a badClicks risk: a buyer who acts on "the factory never insures the cargo" or expects a confirmed thermal blanket/desiccant could be misinformed. Fix B1 and B2 and this is a strong helpful-first node.

**Lowest-3 action steps:**
1. **Freshness/timeliness (4):** Reconcile the page with `insurance.basis` (B2) — render the CIF-on-request reality from the fact, then bump `dateModified` with that change as the stated reason.
2. **Trust & spam (5) / Citation quality (5):** Resolve B1 — gate or back the thermal-blanket and container-desiccant claims to a real `=== true` fact, matching the KeyFacts gating; add an authority reference for the inherent-vice exclusion (ICC clauses) in the caveat.
3. **Technical health & freshness (5):** Decouple this node's `dateModified` from the shared `logistics.editorial` date so substantive edits here can be dated independently, and resolve the FAQPage-placement architecture question (D1) sitewide.
