# Content Audit — /packaging/white-label

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report, no fixes). Passes 0,1,2,3,5. Pass 6 OFF.
**Cornerstone:** No (minor cluster page — meta-table / Devil's-Advocate absence is Hardening, not Defect).

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| Target route | `/packaging/white-label` |
| Source file | `src/pages/packaging/white-label.astro` |
| Built HTML | `dist/packaging/white-label/index.html` (present; renders cleanly, no unresolved `{{token}}`) |
| Layout | `BaseLayout.astro` (`includeOrgSchema={false}`, custom `schema` graph) |
| Components | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `SpecsTable`, `MaybeLink`, `TextLink`, `FAQSection`, `Button`, `CTABanner`, `KeyFactsBox`, `PhotoGrid`, `VideoFacade` |
| i18n source | `src/i18n/en/packagingWhiteLabel.json` (`en.packagingWhiteLabel`) + `en.packaging.shared` + `en.packaging.metaBlock` |
| company.ts fields consumed | `packaging.whiteLabel.*` (printMethod/printingEquipment/colorCapability/brandableSurfaces/brandsProducedCount/singleContainerOk/dielineProvided/designExclusive), `packaging.customPrint.*` (moqUnits/leadTimeAddDays/finishesAvailable), `packaging.pricing.*` (currency + 7 surcharge fields), `packaging.branding.*` (colorMode/bleedSafeArea/prepressBy/artworkFormats), `packaging.proofing.*` (sampleCost/sampleCreditedToOrder/proofLeadTimeDays), `packaging.ancillary.fscPaper`, `packaging.retail.barcodeEanByBuyer`, `packaging.editorial.dateModified`, `packaging.media.videos[id=white-label]`; tokens via `companyTokens` (moqLabel, portLabel, newBrandLeadTime, repeatBrandLeadTime, acceptedArtworkFormats, proofTimeDays) |
| Pillar | packaging |
| Pillar up-link | `/packaging` in hero first-paragraph TextLink (line 196) + Related section (line 231) — PASS |
| Pillar down-link | `/packaging` hub references `/packaging/white-label` 9× — PASS (not an orphan) |
| Schema types emitted (built HTML) | `WebPage`, `FAQPage` (10 Q/A), `DefinedTerm` (@id `/glossary#white-label`), `Service`, `HowTo` (7 `HowToStep`), `BreadcrumbList` (3 `ListItem`), `Person` (author). No `Product`/`Offer` (correct). `VideoObject` correctly OMITTED (white-label video `youtubeId` empty). |

**Honesty-gating snapshot (backing facts in `src/data/company.json` → `packaging`):**
Empty/null (→ block correctly omits): `whiteLabel.printMethod`, `.printingEquipment`, `.colorCapability`, `.brandsProducedCount`; `customPrint.moqUnits`, `.leadTimeAddDays`, `.finishesAvailable[]`; all `pricing.*` surcharges; `branding.bleedSafeArea`, `.prepressBy`; `proofing.sampleCost`, `.sampleCreditedToOrder`(null); `ancillary.fscPaper`(null); `media.videos[white-label].youtubeId`(empty). Present (→ block renders): `whiteLabel.singleContainerOk/dielineProvided/designExclusive/territoryExclusivityNegotiable`=true, `brandableSurfaces`=[inner-box, master-box, plastic], `branding.colorMode`=CMYK, `branding.artworkFormats`=[AI, PDF], `proofing.proofLeadTimeDays`=7, `retail.barcodeEanByBuyer`=true, `editorial.dateModified`=2026-06-11.

Build was not re-run (per run constraints); existing `dist/` HTML inspected read-only.

---

## 2. Severity-tiered TODO list

### Blockers
*(honesty-gating violation, hardcoded company fact, fabricated/uncited claim, real orphan/broken pillar link, misplaced FAQPage of the canonical-FAQ-home kind, build failure, regulatory claim now factually wrong)*

**None.** No hardcoded company-fact literal (all facts arrive via `{{tokens}}`/`company` imports). No real orphan or broken pillar link. No fabricated regulatory claim.

> Note on FAQPage placement: a `FAQPage` node IS emitted on this page (built via `packagingClusterPageSchema`). The single-page audit rule states "FAQPage emits ONLY at /faq globally," which would make this a finding — BUT the conflict here is rule-vs-locked-architecture, not a stray duplicate of a canonical-home Q/A. The Q/As are page-specific white-label questions (none are the SHT→un-1361, COA→certifications, MSDS→documents canonical questions, which are deliberately linked out via `faq.moreLine`, not schema'd here). Recorded as **D1 (Defect)** for human adjudication rather than a Blocker, because (a) it is intentional and identical across all five packaging cluster pages, and (b) it does not duplicate a canonical FAQ home.

### Defects
*(factual Error from Pass 3, missing required schema type, snippet/heading/structure failures, missing Devil's-Advocate on cornerstone, missing GEO meta table on cornerstone, misplaced FAQPage)*

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 — Schema architecture (FAQPage placement) | `schema` graph from `packagingClusterPageSchema()` (white-label.astro L132-140); built HTML `@type":"FAQPage"` with 10 Question/Answer | Page emits a page-specific `FAQPage` node. The audit's stated rule is "FAQPage emits ONLY at `/faq` globally." This collides with the locked packaging-cluster template (`src/lib/schema/packagingClusterPage.ts` L65-68) which schemas page-specific Q/As on every cluster page. | Human decision required: either (a) ratify the cluster-template exception and amend the audit rule to "FAQPage only at `/faq` AND on packaging cluster pages with page-specific, non-canonical Q/As," or (b) strip `FAQPage` from `packagingClusterPageSchema` and keep the visible FAQ as plain HTML. Do NOT silently edit. The Q/As themselves are correctly scoped (no canonical-home Q/A duplicated). |
| D2 | Defect | Pass 1 — Honesty-gating (claim without backing fact) | `surfaces.p1` ("…and branded consumables like stickers, tape, and silica sachets", L55 of JSON) and FAQ item "What can I brand?" ("…branded consumables — stickers, tape, and silica sachets", L197) | A concrete capability is asserted in prose, but the backing `ancillary.stickers / brandedTape / brandedSilicaGel` facts are all `null` (unconfirmed). The fact-gated surface (`whiteLabel.brandableSurfaces` = inner-box/master-box/plastic — only 3) correctly omits consumables, so the structured at-a-glance and the prose now disagree, and the prose claims a 4th surface the fact does not support. | Either (a) confirm the consumable booleans in `company.json` (`ancillary.stickers/brandedTape/brandedSilicaGel = true`) and add `plastic`+consumables consistently, or (b) soften the prose to "branded consumables may be available on request" so it is not stated as an established capability while the fact is null. Human/company input required for option (a). |
| D3 | Defect | Pass 1 — Honesty-gating (claim without backing fact) | `production.p1` ("FSC-certified paper is available on request", JSON L68) and FAQ item "What print methods and finishes do you offer?" ("Commercial printing with FSC paper available", JSON L201) | FSC availability is stated as fact in prose and FAQ, but `ancillary.fscPaper` is `null`. The at-a-glance FSC row is correctly gated (`fscPaper === true`, white-label.astro L77) and therefore omits — so structured data and prose disagree on the same claim. | Either set `ancillary.fscPaper = true` in `company.json` (if true) so the gated row and prose align, or reword prose/FAQ to "ask about FSC-certified paper" until confirmed. Company input required. |

### Hardening
*(anti-bloat, missing mini-cases, freshness cadence, question-form headings, minor-page omissions, Devil's-Advocate on a minor page)*

| ID | tier | pass + rule | exact location | what is wrong | recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — Headings as questions | All section H2s (e.g. "What white-label means", "Print methods & quality", "Finishes", "Custom-order timeline", "Why private-label", "Brands we produce") | Body H2s are noun-phrase, not buyer-question form. GEO/snippet extraction favors question-form headings; only the FAQ block uses them. | Reframe to questions where natural: "What does white-label mean?", "What print methods and quality can you offer?", "How long does a custom order take?", "Why go private-label?". Keep the existing featured-snippet lead sentences. |
| H2 | Hardening | Pass 2 — Devil's Advocate (minor page) | After `why-private-label` section (L404-410) | No steelman of the strongest counter-case (e.g. "neutral/unbranded is cheaper and faster to launch; private-label only pays off above X containers/year"). On a minor page this is Hardening, not a Defect. | Add a short 2-3 sentence "When neutral is the better call" counterpoint with the volume threshold framed qualitatively (no invented margins, consistent with the page's deliberate no-numbers business case). |
| H3 | Hardening | Pass 2 — Mini-cases / Pass 1 GEO numeric data | `why-private-label` + `timeline` sections | Business case is entirely qualitative by design (correct — avoids invented margins), and most numeric capability fields (MOQ, lead-time add-days, finishes, prices, brands count, print method) are empty in `company.json`, so the page currently extracts few hard numbers beyond proof lead time (7 days) and the new/repeat brand lead times. This is honesty-correct but weakens GEO extractability. | When the company confirms the empty `customPrint.*`, `pricing.*`, and `whiteLabel.print*`/`brandsProducedCount` fields, the gated blocks will self-populate numbers — no copy change needed. Track as a content-completeness backlog item, not a rewrite. |
| H4 | Hardening | Pass 2 — Anti-bloat / duplication | FAQ items "What is white-label…", "What can I brand?", "What print methods and finishes…" vs body sections `meaning`, `surfaces`, `production`/`finishes` | The FAQ restates the body sections almost verbatim (meaning, surfaces, print/finishes). Acceptable for FAQ-as-snippet-bait, but the overlap is high. | Optionally trim FAQ answers to the distinct delta (the direct one-line answer) and let the body carry the depth, to reduce near-duplicate meaning across the page. Low priority. |
| H5 | Hardening | Pass 1 — Freshness cadence | `ArticleMeta` `lastUpdated` = `packaging.editorial.dateModified` = 2026-06-11 (datePublished == dateModified) | `dateModified` equals `datePublished`; no review event recorded. Not stale yet (11 days old) but the cadence signal is flat. | On the next substantive edit (e.g. when D2/D3 facts are confirmed), bump `packaging.editorial.dateModified` to reflect a real content event, not a cosmetic bump. |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "White-label … also called private-label or OEM" (synonym equivalence) | Correct | Low | Standard industry usage; DefinedTerm alternateNames = private label, OEM. | model |
| "You supply the artwork; we provide the die-line" / "we print your design, we don't design it" | Correct | Low | Backed by `whiteLabel.designByBuyer`=true, `dielineProvided`=true. | company.ts |
| "we never reuse or sell your design … we sign an NDA on request" | Correct | Low | Backed by `whiteLabel.designExclusive`=true, `ndaAvailable`=true. | company.ts |
| "Product or territorial exclusivity … available by negotiation, not automatic" | Correct | Low | Backed by `whiteLabel.territoryExclusivityNegotiable`=true; held distinct from artwork-exclusive default. Honesty-preserving. | company.ts |
| "A single branded container is fine — no recurring-order commitment" | Correct | Low | Backed by `whiteLabel.singleContainerOk`=true. | company.ts |
| Brandable surfaces = inner box, master box, inner plastic (at-a-glance) | Correct | Low | Backed by `whiteLabel.brandableSurfaces` (3 items). | company.ts |
| "branded consumables like stickers, tape, and silica sachets" (a 4th brandable surface) | **Unverified** | Medium | `ancillary.stickers/brandedTape/brandedSilicaGel` = null. Prose asserts capability the fact does not confirm; contradicts the 3-surface fact-gated row. See D2. | company.ts (null) |
| "FSC-certified paper is available on request" / "FSC paper available" | **Unverified** | Medium | `ancillary.fscPaper` = null; at-a-glance FSC row correctly omits. Prose/FAQ assert it. See D3. | company.ts (null) |
| Supply vector files in AI / PDF, set up in CMYK | Correct | Low | `branding.artworkFormats`=[AI,PDF] → "AI / PDF"; `branding.colorMode`=CMYK. | company.ts |
| "Pantone/spot color matching is available" | Unverified | Low | `branding.pantoneSpot` = null; stated as flat capability in prose. Lower stakes than D2/D3 but same pattern — confirm or soften. | company.ts (null) |
| Digital proof in 7 working days | Correct | Low | `proofing.proofLeadTimeDays`=7 via `{{proofTimeDays}}`. | company.ts |
| Physical pre-production sample approved before run; "Nothing is mass-printed until you sign off" | Correct | Low | `proofing.physicalSample`=true, `digitalProof`=true. | company.ts |
| First branded order ≈ `{{newBrandLeadTime}}` days; reorder ≈ `{{repeatBrandLeadTime}}` days | Unverified-but-sourced | Low | Values from `commercial.leadTime.newBrandDays`/`repeatBrandDays`; numbers not independently checked but internally sourced. | company.ts |
| "Retail packaging carries your barcode/EAN (buyer-supplied, factory-printed)" | Correct | Low | `retail.barcodeEanByBuyer`=true; held-vs-issued distinction preserved (EAN never issued by factory). | company.ts |
| "we … advise on the UN 1361 dangerous-goods transport markings, which go on the master box" | Correct | Low | Consistent with `compliance.un1361Marking`=true and the un-1361 canonical page; links out, does not re-own the regulatory claim. | company.ts / logistics cocoon |
| "Custom-print prices are add-ons on top of the charcoal FOB price … not the total" | Correct | Low | Pricing framed strictly as add-ons; all surcharge values empty → table renders "Available on request". Charcoal price never shown (per guard). | company.ts |
| "We manufacture for established coconut-charcoal brands across our priority markets" + "Brands produced: {{count}}" | Partially gated | Low | Count line gated on `brandsProducedCount` (empty → omits). The "established brands" prose is a soft, anonymized social-proof claim with no number — acceptable, but unverifiable. | company.ts (count empty) |

---

## 4. Requires deep research

The following claims cannot be resolved against `company.ts`, `logistics-import-research-findings.md`, or `guide-research-findings.md` (none of which cover packaging capability facts) and need company/operations confirmation rather than external regulatory research:

1. **Branded consumables (stickers, tape, silica sachets) as a brandable surface** — `ancillary.*` are null. Confirm capability before the prose/FAQ assert it (D2). Markets: all.
2. **FSC-certified paper availability** — `ancillary.fscPaper` null (D3). Confirm; relevant especially for Germany/UK/EU buyers who weight FSC. Markets: Germany, UK.
3. **Pantone/spot color matching** — `branding.pantoneSpot` null; confirm before stating as a flat capability.
4. **Empty quantitative fields** (`customPrint.moqUnits`, `leadTimeAddDays`, `finishesAvailable`, all `pricing.*`, `whiteLabel.printMethod/printingEquipment/colorCapability`, `brandsProducedCount`) — these are operational facts for the company to supply, not external research. Once set, gated blocks self-populate.

No regulatory claim on this page is suspected factually wrong (UN 1361 / EU CLP / origin marking references are correctly delegated to the canonical logistics pages and stated at advisory level).

---

## 5. E-E-A-T / HCU assessment (Pass 5)

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 7 | ArticleMeta renders Written by / Reviewed by / Fact-checked / Last updated + read time; author Person in schema. Roles, not named individuals, on-page (sourced from `governance`). |
| Topical authority | 8 | Deep, well-segmented coverage of the white-label workflow (meaning → surfaces → print → finishes → artwork → exclusivity → MOQ → proof → timeline → retail → why → how → brands → prices → FAQ). |
| Technical health & freshness | 6 | Built HTML clean, zero unresolved tokens, valid heading outline. `dateModified`==`datePublished`; flat freshness cadence (H5). CWV/Lighthouse out of scope here. |
| Effort | 8 | Substantial original structure, photo grid scaffolding, honesty-gated blocks, 10-item FAQ, HowTo. Clearly hand-built, not templated filler. |
| Originality | 7 | Genuinely specific to the factory's process; qualitative business case avoids generic margin claims. Some FAQ/body duplication (H4). |
| Citation quality | 6 | Facts bound to `company.ts`; but two prose capability claims (consumables, FSC) lack a confirmed backing fact (D2/D3). |
| Freshness / timeliness | 6 | Recent (2026-06-11) but no review event; cadence flat. |
| Page intent | 9 | Intent (sell under buyer's brand, drive WhatsApp/inquiry) is crystal clear; CTAs and up/down links all aligned. |
| Structure & readability | 8 | Logical H1→H2→H3, featured-snippet lead sentences, definition-form opener, `max-w-prose` body, at-a-glance extractable `<dl>`. Headings could be question-form (H1). |
| Mobile | 8 | `max-w-5xl`, responsive grids, sticky WhatsApp via layout; meets the 360px/44px UX rules by construction. Not re-measured. |
| Format-standard adherence | 8 | At-a-glance KeyFactsBox, meta table, FAQ, HowTo, Service, DefinedTerm, breadcrumbs — site format standards met. |
| Trust & spam signals | 8 | No invented numbers, no over-claiming on price/margins, anonymized social proof, honesty-gated omissions. Two ungated capability claims (D2/D3) are the only dents. |

**PQ (arithmetic mean of 12):** (7+8+6+8+7+6+6+9+8+8+8+8) / 12 = 89 / 12 = **7.42 / 10**

**Verdict:** **Helpful-first.** The page reads as buyer-serving content (process clarity, honest gating, clear next step), not search-bait. goodClicks prognosis: strong for "white label / private label coconut shisha charcoal" and "OEM hookah charcoal MOQ" intents. The main badClicks risk is a buyer reaching out about FSC paper or branded consumables that turn out unconfirmed (D2/D3) — a trust dent at the inquiry stage.

**Lowest-3 action steps:**
1. **Citation quality (6) / Trust (D2,D3):** Resolve the two ungated capability claims — confirm `ancillary.fscPaper` and the consumable booleans in `company.json`, or soften the prose/FAQ to "on request / ask us" so structured data and prose stop disagreeing.
2. **Technical health & freshness / Freshness (6):** On the next real edit, bump `packaging.editorial.dateModified` to a genuine review event (not cosmetic), and consider a quarterly review cadence for the packaging cluster.
3. **Citation quality / GEO (6):** Populate the empty `customPrint.*`, `pricing.*`, `whiteLabel.print*` and `brandsProducedCount` facts when available — the gated blocks self-populate and the page's numeric extractability (currently thin) jumps without any copy rewrite.
