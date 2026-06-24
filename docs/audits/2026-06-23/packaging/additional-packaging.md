# Content Audit — `/packaging/additional-packaging`

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report; no fixes). Cornerstone: **no** (minor cluster page).
**Passes executed:** 0, 1, 2, 3, 5. Pass 6 OFF.

---

## 1. Manifest (Pass 0)

| Field | Value |
|---|---|
| **Route** | `/packaging/additional-packaging` |
| **Source file** | `src/pages/packaging/additional-packaging.astro` |
| **Layout** | `BaseLayout.astro` (`type="website"`, `includeOrgSchema={false}`) |
| **Content source** | `src/i18n/en/packagingAdditional.json` (page strings) + `src/i18n/en/packaging.json` (`metaBlock`, `shared`) |
| **Components** | `Breadcrumbs`, `HeroSection`, `ArticleMeta`, `MaybeLink`, `TextLink`, `ExternalLink`, `FAQSection`, `CTABanner`, `KeyFactsBox`, `Figure`, `VideoFacade` |
| **Schema builders** | `packagingClusterPageSchema` (lib/schema/packagingClusterPage), `videoObjectSchema` |
| **`company.ts` fields consumed** | `packaging.editorial.dateModified`; `packaging.media.videos[id==additional-packaging]` (→ `youtubeId` falsy → omitted); `governance.author.name` (schema author, via builder); `whatsapp.presetMessages.oemLayout` + `waLinkFor('oemLayout')`. **No `ancillary.*` values are read** — the page renders capability prose only (by build-prompt design, §B1 no-spec-table). |
| **Pillar** | packaging (hub `/packaging`) |
| **Schema types emitted (built HTML)** | `WebPage`, `BreadcrumbList`, `FAQPage` (9 Q/A), `DefinedTerm` (`#branded-consumables`), `Person` (author). **No** `VideoObject` (video unpopulated → gracefully omitted), **no** `Product`/`Offer`/`Service` (correct). |
| **Build status** | Built HTML present at `dist/packaging/additional-packaging/index.html` (read-only; build already done, not re-run). |

**Place in cocoon:** packaging cluster sibling of master-box / inner-box / plastic / white-label. Up-link `/packaging` present in first paragraph; hub down-links to it (`src/pages/packaging/index.astro` line 76). All 11 Related targets + 5 inline cross-links are in `LIVE_ROUTES`. Not an orphan.

---

## 2. Severity-tiered TODO list

### Blockers — 0

None. No hardcoded company fact, no uncited/un-backed claim, no honesty-gating violation, no real orphan, no broken pillar link, no build failure, no factually-wrong regulatory claim.

### Defects — 0

None. Required schema types for a packaging cluster page are present and correctly placed; no factual Error surfaced in Pass 3; no missing-schema or broken-structure failure. (Minor page → meta-table and Devil's-Advocate absence are Hardening, not Defect, per scope. Both are in fact satisfied/exempt — see below.)

### Hardening

| ID | tier | pass+rule | exact location | what's wrong | recommended fix (described) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 2 — headings as questions | All section H2/H3 (`groups.h2` "The three groups", `group2.h2` "Load securing", `group3.h2` "Transit protection", `ordering.h2` "How to order add-ons", and the 13 item H3s) | Section/item headings are statement-form, not the question a buyer types. Snippet/voice-search capture for non-FAQ sections is weaker than it could be. | Mirror each section to a question form in the i18n (e.g. "What add-ons can you order?", "How is the load secured in the container?", "How is moisture controlled in transit?"), keeping the first sentence as the self-contained answer. The FAQ block already carries question-form coverage, so this is incremental, not load-bearing. |
| H2 | Hardening | Pass 2 — Devil's Advocate (minor page) | Whole page | No steelman/counter-argument section (e.g. "When are anti-counterfeit stickers overkill / when is palletization not worth the lost container payload?"). Optional on a minor page. | Optionally add one short "When you don't need these add-ons" paragraph after Group 3 — names the payload trade-off of palletizing and the cost of branded consumables on small runs; raises trust and extractability. Not required for a minor page. |
| H3 | Hardening | Pass 1 — honesty-gating (decoupled assertion) | `group2.pallets.body` / `atAGlance.palletValue` ("Wood pallets are ISPM-15 heat-treated and stamped"); `atAGlance` ISPM-15 line | The ISPM-15 / palletization capability is asserted from i18n prose unconditionally; the backing facts `ancillary.ispm15` (`true`) and `ancillary.pallets` (`true`) exist in `company.json` but are **not read** by the page. Today the claim and the fact agree, so this is correct, **but** the assertion is not gated — if `ispm15` were ever flipped to `false`/`null`, the page would still claim it. | Consider gating the ISPM-15 / palletization sentence (or its KeyFactsBox row) on `company.packaging.ancillary.ispm15` / `.pallets`, consistent with the honesty-gating pattern used elsewhere. Low priority because the values are currently `true`; this is a robustness/consistency hardening, not a live error. |
| H4 | Hardening | Pass 1 — regulatory currency | `group2.pallets` ISPM-15 reference; `meta.descriptionTemplate` "ISPM-15" | The ISPM-15 claim is correct but carries no visible review/verification date, and the verified-facts source ([S2]) notes per-country NPPO citations are still pending. | No content change needed for correctness. If a regulatory-currency stamp is added cluster-wide, include ISPM-15 here. The single authoritative outbound (IPPC ISPM-15) already satisfies the citation guard at the level claimed. |
| H5 | Hardening | Pass 1 — schema FAQPage placement (cross-rule tension; FLAG, not fix) | `lib/schema/packagingClusterPage.ts` → page-specific `FAQPage` (9 Q/A) at `…/additional-packaging#faq` | The generic audit rule "FAQPage emits ONLY at `/faq`" conflicts with the **locked packaging-cluster template** (master-box v2 §4 [C1]), which deliberately emits one page-specific FAQPage per cluster page (de-duped: container-count and general-cost Qs are hub-canonical and excluded here — verified, they are link-only). This is an architectural decision spanning all five packaging cluster pages, not a misplacement on this page. | **Do not change on this page in isolation.** Surface to a human as a policy reconciliation: either the audit's FAQPage-only-at-/faq rule needs a documented carve-out for the packaging cluster template, or the cluster template needs revisiting site-wide. Flagging per "no silent decisions." |
| H6 | Hardening | Pass 2 — anti-bloat | `group3.desiccant.body` | The "layered moisture story" sentence (inner plastic → desiccant → thermal blanket) restates the same three-layer framing given in `groups.intro` and again in the desiccant FAQ answer. Mild duplication across three locations. | Keep one authoritative statement (the desiccant section is the natural home) and trim the restatement in `groups.intro` to a pointer, or accept as intentional reinforcement. Compressible ~15–20% without fact loss. |

---

## 3. Claims register (Pass 3)

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "Wood pallets are ISPM-15 heat-treated and stamped, as required for international trade." | Correct | Low | Matches verified-facts [S2]: ISPM-15 (heat-treated or fumigated, stamped) is the standard global phytosanitary requirement for wood packaging. Per-country NPPO citations still pending per the research note, but the generic claim is accurate. | verified-facts → `docs/build-prompts/logistics/logistics-import-research-findings.md` [S2] (lines 255–257) |
| "QR, hologram, and 3D domed stickers together form an anti-counterfeit set." | Correct | Low | Capability/marketing framing, internally consistent; the QR honesty guard ("we print buyer-supplied QR codes; the verification system is yours") is held distinctly throughout (body + FAQ #2). No over-claim of a verification platform. | model knowledge + page self-consistency |
| "We print the QR codes you supply — the landing page and verification system are yours to run; we don't host or manage them." | Correct | Low | Honesty guard preserved (build-prompt requirement). Held-capability vs buyer-owned-system distinction intact — do not smooth over. | build prompt §0/§3; page i18n |
| "Resin-domed stickers … hard to replicate cheaply — a quality cue and a soft anti-counterfeit signal." | Correct | Low | Qualified ("soft signal"), not over-claimed as security-grade. | model knowledge |
| "Tamper-evident holographic security stickers … show if a package has been opened." | Correct | Low | Standard property of tamper-evident holographic seals. | model knowledge |
| "A thermal blanket lines the container against condensation ('container rain') and temperature swings." | Correct | Low | "Container rain"/condensation on long humid sea transits is a real, well-documented phenomenon; thermal/insulation liners are a standard mitigation. Recommendation framing ("for long routes and humid seasons") is appropriately hedged. | model knowledge |
| "All add-on pricing is quoted on request and confirmed on inquiry." / "no prices on this page" | Correct | Low | Matches the build-prompt no-price guard; no price literal anywhere on the page. Consistent with the pricing-consistency flag resolution (fields left empty → on-request sitewide). | build prompt §0, §5; page render |
| Editorial "Last updated 2026-06-11" (via `ArticleMeta`) | Correct | Low | Sourced from `packaging.editorial.dateModified` = `2026-06-11`; not a hardcoded literal in the page. | `company.json` packaging.editorial |
| "Loose-vs-palletized container counts live on the hub and master-box pages." (counts NOT duplicated) | Correct | Low | Build-prompt container-count de-dup guard honored; no container quantity stated on this page. | build prompt §0 |

No claim is **Error**. No claim requires correction.

---

## 4. Requires deep research

**None blocking.** Optional, low-priority external confirmations (not needed for publication at the level the page claims):

- **ISPM-15 per-country NPPO citations** — the research file [S2] itself flags per-country NPPO adoption citations as "still to be attached for publication." This is a logistics-cluster citation task, not specific to this page; the generic "as required for international trade" wording here does not depend on it. Markets: UK, Germany, Saudi Arabia, Russia/EAEU.

---

## 5. E-E-A-T / HCU assessment (Pass 5)

| # | Criterion | Score /10 | Justification |
|---|---|---|---|
| 1 | Authorship & expertise | 8 | `Person` author in schema + full ArticleMeta block (Written by / Reviewed by / Fact-checked by / Last updated / reading time), all from `governance.*`. Roles, not named individuals, shown — adequate for a minor page. |
| 2 | Topical authority | 9 | Owns the branded-consumables / anti-counterfeit entity that no competitor covers; thorough 13-item coverage across three functional groups; correct cross-links to master-box, plastic, white-label, logistics/rules. |
| 3 | Technical health & freshness | 8 | Built HTML clean; zero client JS except the deferred video facade (which is omitted — no video). `dateModified` present and real. (CWV/Lighthouse numbers out of scope — deferred to DrMax/budget owner.) |
| 4 | Effort | 9 | High: three-tier taxonomy, per-item definition + figure scaffolding, de-duplicated FAQ, honest QR guard, container-count de-dup. Not templated filler. |
| 5 | Originality | 9 | Genuinely uncontested ground; the anti-counterfeit-set framing for charcoal brands is novel in this niche. |
| 6 | Citation quality | 7 | One authoritative outbound (IPPC ISPM-15) correctly attributed with `outbound_click`. Sparse but appropriate for a capability page; ISPM-15 lacks a visible review date (H4). |
| 7 | Freshness / timeliness | 8 | `2026-06-11` modified date is current; no stale regulatory dating. |
| 8 | Page intent | 9 | Clear commercial-capability intent; routes every cost to inquiry; single coherent CTA (oemLayout WhatsApp). |
| 9 | Structure & readability | 8 | One H1, logical H2/H3 outline with no skipped levels; KeyFactsBox + jump-anchor orientation; max-prose width respected. Loses a point: non-FAQ headings are statement-form, not question-form (H1). |
| 10 | Mobile | 8 | `max-w-5xl` responsive grids (`md:grid-cols-2`), 44px-class tappable chips/links, no fixed-width tables. (Visual not re-measured; structure is mobile-safe.) |
| 11 | Format-standard adherence | 8 | FAQ uses native `<details>`/`<summary>` — content is in the static DOM and crawler-extractable (verified), not JS-gated; satisfies the GEO no-hidden-content rule. FAQPage placement is a cross-rule tension (H5), not a per-page error. |
| 12 | Trust & spam signals | 9 | No price-baiting, no fabricated specs (no-spec-table guard honored), honest QR/verification disclaimer, graceful omission of the unpopulated video. Strong trust posture. |

**PQ (arithmetic mean of 12)** = (8+9+8+9+9+7+8+9+8+8+8+9) / 12 = **8.33 / 10**.

**Verdict:** **Helpful-first.** The page is built to answer a buyer's add-on questions and route cost to a human, not to capture search and dead-end. goodClicks prognosis: strong — extractable KeyFactsBox + FAQ, honest guards, clear next action. badClicks risk: low.

**Lowest-3 action steps:**
1. **Citation quality (7) — H4:** add a visible ISPM-15 review/verification date (cluster-wide stamp) so the regulatory reference signals currency; attach the per-country NPPO citation when the logistics-cluster research closes.
2. **Authorship & technical-health tie (8) — H3:** gate the ISPM-15 / palletization assertion on `ancillary.ispm15` / `.pallets` so the claim cannot drift from the fact, matching the honesty-gating pattern used elsewhere.
3. **Structure/readability & format (8) — H1/H5:** convert non-FAQ section headings to buyer-question form for snippet capture; separately, escalate the packaging-cluster FAQPage-placement policy (H5) to a human for documented reconciliation rather than changing it on this page.

---

*End of report. No files other than this report were created or modified. No build/git/npm run.*
