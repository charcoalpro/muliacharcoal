# Content Audit — /logistics/rules

**Run date:** 2026-06-23 · **Mode:** Diagnose-only (report, no edits) · **Cornerstone:** no (minor cluster page)
**Methodology:** docs/build-prompts/content-audit-page.md — Passes 0,1,2,3,5 (Pass 6 OFF)

---

## 1. Manifest

| Field | Value |
|---|---|
| Route | `/logistics/rules` |
| Pillar | Logistics |
| Source file | `src/pages/logistics/rules.astro` |
| Layout | `src/layouts/BaseLayout.astro` (`type="article"`, `includeOrgSchema={false}`) |
| i18n namespace | `src/i18n/en/logisticsRules.json` (consumed as `en.logisticsRules`) + `en.logisticsCommon` (meta-block labels) |
| Components | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `MaybeLink`, `FAQSection`, `CTABanner`, `KeyFactsBox` |
| Schema builder | `src/lib/schema/logisticsClusterPage.ts` → `logisticsClusterPageSchema(...)` |
| Schema types emitted | `WebPage`, `FAQPage`, `HowTo` (+ `BreadcrumbList` emitted separately by `<Breadcrumbs>`) |
| `company.ts` / company.json fields consumed | `commercial.portOfLoading.incoterm` (FOB), `commercial.portOfLoading.name`/`.unLocode` (Semarang / IDSRG), `commercial.paymentTerms`, `commercial.leadTime.{minDays,maxDays}` (14–21), `commercial.moq` (18t / 20ft), `commercial.containerCapacity.ft20.fullKg` (18000 → "18 tons"), `logistics.incoterms` (`["EXW","FOB","CFR","CIF"]`), `logistics.loading.mixedSizesPolicy` (`""` → graceful fallback), `logistics.editorial.dateModified` (2026-06-16), `certifications.imdg.{unNumber,class,classDescription}` (UN 1361 / 4.2 / spontaneous combustion), `governance.{author,reviewer,factChecker}` (ArticleMeta), `whatsapp.presetMessages`, `waLinkFor('quoteSpecs')` |
| Pillar uplink | Present in first paragraph (`/logistics`, "Logistics overview") AND in Related section |
| Pillar down-link | `/logistics` hub links to `/logistics/rules` (confirmed in dist) |
| Incoming internal links | 17 dist pages link to `/logistics/rules` — not an orphan |
| Muted MaybeLinks | None — every cross/down link target on this page is in `LIVE_ROUTES` |

**Build:** read existing `dist/logistics/rules/index.html` (build already done; not re-run). Page resolves to exactly one route. No stop condition triggered.

---

## 2. Severity-tiered TODO list

### Blockers
*None.*

(Hardcoded-fact gate, honesty-gating gate, orphan/pillar-link gate, and regulatory-accuracy gate all PASS. Every company fact renders via a `company.ts` token or config import; the i18n JSON contains only labels/prose with `{{token}}` placeholders, never fact values. Payment section renders `commercial.paymentTerms` prose and explicitly states "never bank details on the website" — no banking detail leak. CIF is backed by a real value: `logistics.incoterms` includes `"CIF"` and `insurance.basis` describes seller-arranged CIF cover, so the CIF copy is a gated claim, not a fabrication.)

### Defects

| ID | Tier | Pass + rule | Exact location | What's wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 — Schema architecture (FAQPage emits ONLY at `/faq` globally) | JSON-LD `@graph` node `{"@type":"FAQPage","@id":".../logistics/rules#faq"}` (built HTML head); source: `logisticsClusterPageSchema()` in `src/lib/schema/logisticsClusterPage.ts` lines 87–90, invoked at `rules.astro` line 44 | A second `FAQPage` entity is emitted on a non-`/faq` page (the page also carries a visible FAQ block with 2 Q/As). Per the audit's hard rule, `FAQPage` schema must emit only at `/faq`. NOTE: this is a **cluster-wide architecture decision**, not a one-off on this page — all 12 logistics cluster pages + `/faq` emit `FAQPage` via the same shared builder, and the methodology's own "canonical FAQ home" rule (SHT→un-1361, COA→certifications, MSDS→documents) implies cluster pages were intended to host FAQ Q/As. Resolve as a deliberate architecture decision at the builder level, not by patching this page alone. | Decide the policy once: either (a) stop emitting `FAQPage` from `logisticsClusterPageSchema` and keep only the `WebPage`/`HowTo` nodes (FAQ stays as plain HTML for GEO, `FAQPage` lives only at `/faq`), or (b) formally exempt the logistics-cluster per-page FAQPage pattern from the "only at /faq" rule and update the audit spec. Do NOT change just this page — the fix is in the shared builder. The two Q/As here (palletizing, DG booking) do not collide with the canonical SHT/COA/MSDS homes, so no duplicate-home issue exists. |

### Hardening

| ID | Tier | Pass + rule | Exact location | What's wrong | Recommended fix (described, not executed) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — Headings as questions | H2s: "How containers are loaded", "Incoterms we offer", "Payment terms & process", "Booking & vessel schedule" (`logisticsRules.json` `loading.h2`, `incoterms.h2`, `payment.h2`, `booking.h2`) | Section headings are statements, not the buyer's question form, reducing question-match snippet/AI-citation surface. (Minor page → Hardening, not Defect.) | Offer optional question-form variants in i18n, e.g. "How is a container loaded?", "Which incoterms do you offer?", "What are your payment terms?", "How is a dangerous-goods sailing booked?" — keep the FAQ-style direct-answer lead already present under each. |
| H2 | Hardening | Pass 2 — Devil's Advocate / steelman | Whole article (after the Incoterms/Payment thesis) | No steelman section addressing the strongest buyer counter-argument (e.g. "FOB pushes DG-booking risk and insurance onto me — why not DDP?"). Missing on a minor page = Hardening. | Add a short "Why FOB and not DDP/door delivery?" note with a data-grounded answer (DG carriage limits, who controls the DG booking, why staged T/T protects both sides). Optional for a minor page. |
| H3 | Hardening | Pass 1 — GEO definition-form sentences | `KeyFactsBox` definition (`keyFacts.definition`: "The commercial parameters of a container order.") and intro `p1` | No dictionary-form definition of the page's key term ("FOB Semarang", "incoterm", or "FCL"). AI engines preferentially cite "X is …" sentences. | Add one definition-form sentence near the top, e.g. "FOB Semarang means …" or "An incoterm is …", sourcing the port/incoterm values from tokens (no new facts). |
| H4 | Hardening | Pass 2 — Quantified evidence | Booking section body (`booking.body`): "adds lead time over a non-DG booking and limits sailings" | "adds lead time" / "limits sailings" are unquantified. | Either add an approximate figure (e.g. typical extra booking lead-time days, or "only N of the audited carriers accept DG charcoal") sourced from `logistics.dg.carriersAudited`/`carriersNotAccepting`, or explicitly route the buyer to `/logistics/charcoal-shipping-lines` for the count (already linked). |
| H5 | Hardening | Pass 3 — Incoterms terminology currency | Incoterms section body (`incoterms.body`): "risk transfers when the cargo crosses the ship's rail" | "ship's rail" is pre-Incoterms-2010 language; FOB risk transfer has been "when the goods are placed on board the vessel" since Incoterms 2010/2020. Not factually wrong about WHEN risk passes, but uses a retired phrase that a sophisticated buyer/broker will notice. | Replace "crosses the ship's rail" with "is placed on board the vessel" (Incoterms 2020 wording). Copy-only change in i18n; no fact value involved. |
| H6 | Hardening | Pass 2 — Anti-bloat / duplication | Incoterms section: `incoterms.body` last sentence + `incoterms.cifNote` first sentence | The buyer-arranged-insurance / CIF-on-request point is stated twice in adjacent paragraphs (body: "Under EXW, FOB and CFR the buyer arranges marine insurance; CIF … available on request"; cifNote: "Under EXW, FOB and CFR insurance is buyer-arranged … under CIF the factory arranges marine cover on request"). | Compress to one statement; keep the inherent-vice exclusion sentence (unique) and the `/logistics/cargo-protection-and-insurance` link. |
| H7 | Hardening | Pass 1 — code comment vs data drift (advisory; out of strict content scope) | `src/config/company.ts` line 354 ("No CIF (v3.3)") and line 421 ("'buyer' — EXW/FOB/CFR include no seller cover; no CIF") | Stale code comments assert "no CIF", but the live data (`company.json` `logistics.incoterms` includes CIF; `insurance.basis` documents CIF) and the page both offer CIF. Not user-visible and not a fact-in-wrong-place, so not a Blocker/Defect — but the comments will mislead the next editor. | Update the two `.ts` comments to reflect the locked CIF+CFR decision. (Flagged for a human; not editable in this report-only run.) |

---

## 3. Claims register

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "for UN 1361 coconut charcoal shipped FOB Semarang" | Correct | Low | UN 1361 + FOB Semarang both single-sourced. | company.json `certifications.imdg.unNumber`, `commercial.portOfLoading` |
| Default incoterm = "FOB Semarang"; offered = "EXW / FOB / CFR / CIF" | Correct | Low | Matches data exactly. | company.json `commercial.portOfLoading.incoterm`, `logistics.incoterms` |
| "Class 4.2 dangerous goods cannot be co-loaded … in a shared LCL groupage box, which is why the minimum order is 18 tons (one 20ft container)" | Correct | Low | DG-FCL rationale consistent with IMDG carriage; MOQ 18t/20ft sourced. | research findings UK·C7 (DG carriage); company.json `commercial.moq` |
| "Master boxes are floor-stuffed for maximum payload, or palletized on ISPM-15 wood" | Correct | Low | ISPM-15 standard for wood packaging; consistent with `containerCapacity.ft20.palletizedKg` 16000 < fullKg 18000. | research findings UK·C8 (ISPM-15 pallets); company.json |
| "risk transfers when the cargo crosses the ship's rail" | Unverified / dated wording | Low | WHEN risk passes (on board, at POL) is correct for FOB; "ship's rail" is retired Incoterms language (changed in Incoterms 2010). See H5. | model knowledge (Incoterms 2020) |
| "Payment terms: 50% T/T advance, 50% T/T 3 days before loading" | Correct | Low | Verbatim from config; prose only, no bank details. | company.json `commercial.paymentTerms` |
| "Production runs 14–21 days for a 20ft container" | Correct | Low | Matches lead-time range. | company.json `commercial.leadTime.minDays/maxDays` |
| "about 18 tons net in a 20ft" (FAQ) | Correct | Low | `ft20.fullKg` 18000 → "18 tons". | company.json `commercial.containerCapacity.ft20.fullKg` |
| "booked as declared UN 1361, Class 4.2 dangerous goods on a DG-capable carrier … adds booking lead time" | Correct | Low | Matches IMDG Amendment 42-24 / SP 978 mandatory-DG carriage (1 Jan 2026). Detail page carries the dated provenance. | research findings UK·C7; company.json `logistics.dg` (`lastVerified` 2026-06-15) |
| "Bank details are shared after KYC on a proforma invoice" (no bank details published) | Correct | Low | Honesty-gating preserved; no banking fact leaked. | company.json `commercial.paymentTerms` + i18n prose |
| ArticleMeta authors: Mohamad Sinno (Owner & Director) / Ahmet Bassam (reviewer) / Teguh Pranomo (fact-checker); Last updated 2026-06-16 | Correct | Low | All sourced from `governance.*` + `logistics.editorial.dateModified`. | company.json `governance`, `logistics.editorial` |

No claim is an **Error** (contradicts a source). All hard claims trace to company.json or the logistics research findings.

---

## 4. Requires deep research

*No page-level claim requires external verification.* Every regulatory and commercial claim rendered on `/logistics/rules` is already covered by `docs/build-prompts/logistics/logistics-import-research-findings.md` (UK·C7 for the UN 1361 / Class 4.2 / SP 978 / mandatory-2026 chain) or by source-linked fields in `src/data/company.json` (`logistics.dg`, with `lastVerified` 2026-06-15 and `sourceUrls`).

One copy item (H5, "ship's rail") is a terminology-currency fix, not a research item — it is settled by published Incoterms 2020 text, no external lookup needed.

---

## 5. E-E-A-T / HCU assessment

| # | Criterion | Score /10 | One-line justification |
|---|---|---|---|
| 1 | Authorship & expertise | 8 | Named author + reviewer + fact-checker with roles, sourced from `governance`; `WebPage.author` Person emitted. |
| 2 | Topical authority | 8 | Tight, accurate coverage of the four order-mechanics (loading, incoterms, payment, booking) with correct DG framing. |
| 3 | Technical health & freshness | 8 | Clean static HTML, no JS-gated content; dates event-anchored (2026-06-16, near `dg.lastVerified` 2026-06-15). CWV/Lighthouse owned by the technical series — not re-measured. |
| 4 | Effort | 7 | Real specifics throughout, but thin on quantified booking/lead-time deltas (H4) and no mini-case. |
| 5 | Originality | 7 | Genuinely useful incoterm/DG synthesis; the CIF/insurance point is restated (H6) rather than developed. |
| 6 | Citation quality | 7 | Strong internal sourcing; no outward authority citation for the DG/SP-978 framing (it is delegated to the linked detail page — acceptable for a minor hub-adjacent page). |
| 7 | Freshness / timeliness | 8 | Reflects the 2026 mandatory-DG reality; meta table shows Last updated. |
| 8 | Page intent | 9 | Matches "how an order ships" buyer intent precisely; direct CTAs to quote/contact. |
| 9 | Structure & readability | 8 | Logical H2 outline, KeyFactsBox at-a-glance, numbered order process, FAQ. Headings as statements not questions (H1) cap the score. |
| 10 | Mobile | 8 | `max-w-3xl`, 44px touch targets, sticky WhatsApp FAB, logical-property classes — conforms to the CLAUDE.md mobile budget (not re-measured). |
| 11 | Format-standard adherence | 7 | Meta table + FAQ + HowTo present; missing definition-form sentence (H3) and Devil's Advocate (H2). |
| 12 | Trust & spam signals | 9 | No bank details, no fabricated specifics, honesty-gated mixed-sizes fallback, no over-claiming. |

**PQ (arithmetic mean of 12):** (8+8+8+7+7+7+8+9+8+8+7+9)/12 = **7.83 / 10**

**Verdict:** **Helpful-first.** The page answers a real buyer question (the commercial rules of placing and shipping a container order) with sourced, extractable facts and clear next-step CTAs. goodClicks prognosis: positive — a buyer lands, gets the incoterm/payment/MOQ/DG answer, and routes to quote or to the deeper logistics children. No search-first/SEO-bait patterns.

**Lowest-3 action steps:**
1. **Citation quality / quantified evidence (crit 6 & 4 → H4):** add at least one quantified booking figure (extra DG lead-time days, or "N of 5 audited carriers accept DG charcoal" from `logistics.dg.carriersAudited` / `carriersNotAccepting`) instead of "adds lead time / limits sailings".
2. **Originality / anti-bloat (crit 5 → H6):** collapse the duplicated buyer-arranged-insurance/CIF statement into one paragraph and use the reclaimed space for the steelman (H2).
3. **Format-standard adherence (crit 11 → H3 & H1):** add one definition-form sentence ("FOB Semarang means …") and offer question-form heading variants to lift snippet/AI-citation surface.
