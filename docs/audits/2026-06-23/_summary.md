# Content Audit — Roll-up (2026-06-23)

✅ **COMPLETE.** 50/50 units audited (report-only); all 26 flagged blockers adversarially re-verified.

**Totals:** 26 blockers flagged → **19 verified real**, 7 refuted as false-flags · **105 defects** · **254 hardening** · **125 unique research claims**.

**How to read the blocker column:** `raw → real`. "raw" = what the page audit flagged; "real" = survived an independent skeptic that tried to refute it against the do-not-false-flag rules. Trust the **real** number. Details of every verdict are in `_verification.md`; per-page findings are in `<pillar>/<slug>.md`.

**Meta-finding (important):** 5 of the 7 false-flags came from the rule *"FAQPage emits ONLY at /faq globally"* baked into `content-audit-page.md`. The codebase **deliberately** emits a page-specific FAQPage on ~27 cluster/cornerstone pages under a documented *"one Q/A = one FAQPage home"* design, and CLAUDE.md's GEO section *requires* it. **That audit rule is wrong for this site and should be corrected** to "one canonical FAQ content-home per distinct Q&A set." Do not act on the FAQPage "blockers/defects."

**Cross-cutting finding (known before sweep):** CLAUDE.md pillar-cluster map has drifted from `src/config/nav.ts` LIVE_ROUTES. Logistics ships four pages not documented in CLAUDE.md (charcoal-dg-regulation, charcoal-shipping-lines, cargo-protection-and-insurance, import-guides), and the `/markets/*` pillar described in CLAUDE.md was never shipped — market intent is served by `/products/shisha-cafee`, `/products/shisha-shop` and `/logistics/import-to-*`. Treat LIVE_ROUTES as truth and reconcile CLAUDE.md.

| Page | Pillar | Blockers (raw → real) | Defects | Hardening | PQ | Claims→research |
|---|---|---|---|---|---|---|
| / | supporting | 3 → 3 | 6 | 4 | 6.83 | 2 |
| /404 | supporting | 0 → 0 | 0 | 5 | 7.33 | 0 |
| /about | supporting | 1 → 1 | 1 | 9 | 7.17 | 0 |
| /careers | supporting | 0 → 0 | 1 | 5 | 6.75 | 0 |
| /contact | supporting | 0 → 0 | 3 | 4 | 7.58 | 4 |
| /faq | supporting | 2 → 2 | 3 | 4 | 7.5 | 3 |
| /glossary | supporting | 2 → 1 | 2 | 5 | 7.6 | 7 |
| /samples | supporting | 0 → 0 | 2 | 7 | 7.83 | 3 |
| /products | products | 1 → 1 | 3 | 5 | 7.17 | 3 |
| /products/{shape}-{size}-{grade} | products | 2 → 2 | 2 | 5 | 7.5 | 3 |
| /products/cloud | products | 0 → 0 | 2 | 5 | 7.6 | 0 |
| /products/cubes | products | 0 → 0 | 2 | 5 | 6.92 | 3 |
| /products/domes | products | 0 → 0 | 2 | 5 | 6.9 | 3 |
| /products/fingers | products | 0 → 0 | 2 | 5 | 7 | 2 |
| /products/flats | products | 0 → 0 | 1 | 4 | 7.4 | 2 |
| /products/hexagonals | products | 0 → 0 | 2 | 5 | 7.33 | 4 |
| /products/shisha-cafee | products | 0 → 0 | 0 | 7 | 7.2 | 0 |
| /products/shisha-shop | products | 0 → 0 | 2 | 5 | 7.1 | 0 |
| /logistics | logistics | 0 → 0 | 2 | 4 | 8.2 | 5 |
| /logistics/cargo-protection-and-insurance | logistics | 2 → 2 | 2 | 4 | 6.25 | 3 |
| /logistics/charcoal-dg-regulation | logistics | 0 → 0 | 2 | 6 | 8 | 4 |
| /logistics/charcoal-shipping-lines | logistics | 0 → 0 | 2 | 5 | 7.08 | 3 |
| /logistics/documents | logistics | 0 → 0 | 2 | 5 | 7.92 | 3 |
| /logistics/import-guides | logistics | 0 → 0 | 1 | 5 | 7.17 | 0 |
| /logistics/import-to-germany | logistics | 0 → 0 | 4 | 4 | 8.4 | 3 |
| /logistics/import-to-russia | logistics | 0 → 0 | 3 | 5 | 8.33 | 4 |
| /logistics/import-to-saudi-arabia | logistics | 0 → 0 | 5 | 4 | 7.42 | 6 |
| /logistics/import-to-uk | logistics | 0 → 0 | 2 | 4 | 8 | 3 |
| /logistics/import-to-usa | logistics | 1 → 0 | 3 | 4 | 8.08 | 6 |
| /logistics/rules | logistics | 0 → 0 | 1 | 7 | 7.83 | 0 |
| /logistics/un-1361 | logistics | 0 → 0 | 3 | 5 | 7.17 | 3 |
| /factory | factory | 2 → 1 | 3 | 4 | 8 | 0 |
| /factory/capacity | factory | 1 → 1 | 0 | 6 | 7.25 | 3 |
| /factory/production-process | factory | 0 → 0 | 0 | 8 | 7.67 | 0 |
| /factory/raw-materials | factory | 0 → 0 | 2 | 4 | 7.33 | 5 |
| /factory/virtual-tour | factory | 0 → 0 | 0 | 7 | 7.5 | 2 |
| /quality | quality | 0 → 0 | 3 | 6 | 7.4 | 3 |
| /quality/certifications | quality | 1 → 0 | 3 | 4 | 7.75 | 3 |
| /quality/specifications-explained | quality | 1 → 1 | 4 | 4 | 7.58 | 0 |
| /quality/testing-methods | quality | 2 → 2 | 2 | 4 | 7.42 | 4 |
| /packaging | packaging | 2 → 1 | 3 | 4 | 8.17 | 2 |
| /packaging/additional-packaging | packaging | 0 → 0 | 0 | 6 | 8.33 | 1 |
| /packaging/inner-box | packaging | 2 → 1 | 2 | 4 | 7 | 5 |
| /packaging/master-box | packaging | 0 → 0 | 1 | 6 | 8 | 1 |
| /packaging/plastic | packaging | 0 → 0 | 0 | 8 | 7.33 | 1 |
| /packaging/white-label | packaging | 0 → 0 | 3 | 5 | 7.42 | 3 |
| /guide | guide | 0 → 0 | 2 | 5 | 7.83 | 2 |
| /guide/coconut-vs-bamboo-vs-wood-charcoal | guide | 0 → 0 | 2 | 4 | 8.5 | 2 |
| /guide/how-to-choose-shisha-charcoal-factory | guide | 1 → 0 | 2 | 4 | 8.33 | 2 |
| /legal/{privacy-policy,terms,cookies} | legal | 0 → 0 | 5 | 5 | 6.4 | 4 |
| **TOTAL** | — | **26 → 19** | **105** | **254** | — | **125** |

## The 19 verified-real blockers, grouped

**A. Fabricated / wrong owner-director name (4)** — highest reputational risk.
- `/about` B1, `/faq` B1, `/faq` B2: the literal **"Wilson Gosalim"** is typed into `about.json` and `faq.json` as the owner/director reachable on WhatsApp for KYC. No such person exists in `people.json` (canonical owner = Mohamad Sinno; directors = Henry Gosalim / Gatot Wibowo). The live pages show two contradictory owner names, on the very answer meant to prove legitimacy.

**B. Honesty-gating — claims rendered with no backing fact (7).**
- `/` B1: "REACH compliant" trust badge renders unconditionally; no REACH fact in `company.json`.
- `/products/{sku}` B1 & B2: burn-test "we recorded performance as data" and "the two clips below show the test" assert measurements/videos that don't exist (all cells pending, placeholders only).
- `/logistics/cargo-protection-and-insurance` B1: thermal blanket + container desiccant asserted as fact while both are `null` (and gated OUT of the page's own KeyFacts box).
- `/logistics/cargo-protection-and-insurance` B2: page states absolutely "the factory never insures the cargo," contradicting `insurance.basis` (CIF marine cover on request) and the 2026-06-22 locked CIF+CFR decision.
- `/packaging/inner-box` B1: tuck-end / tray-and-lid / sleeve box styles asserted in prose while `boxStyles = []`.
- `/products` B1: per-batch COA "issued by Carsurin & Beckjorindo on every order" is bound to the **ISO-certifier** field, collapsing the held-cert vs per-order-report distinction (correct field is `quality.testing.thirdPartyLabs`, which also includes SGS).

**C. Hardcoded company facts in i18n (6).**
- `/` B2: literal "30% T/T deposit" in `home.json` — contradicts `paymentTerms` (50%) shown elsewhere on the same page.
- `/` B3: shipping lines "Maersk, MSC and CMA CGM" typed literally instead of `{{shippingLines}}`.
- `/factory` B1: "Semarang" hardcoded instead of `{{city}}`.
- `/factory/capacity` B1: "Four production lines" hardcoded instead of `{{productionLines}}`.
- `/quality/specifications-explained` B1: ash-band values hardcoded instead of from `ashGradingFramework.tiers`.
- `/packaging` B2: "Made in Indonesia" literal instead of `{{country}}`.

**D. Wrong regulatory/standard facts (2).** *(also routed to deep research)*
- `/glossary` B2: HS code "4402.90" hardcoded — canonical is **4402.20** ("of shells or nuts").
- `/quality/testing-methods` B1 & B2: **ISO 1171** (ash) and **ISO 1928** (calorific) are coal/coke standards — wrong material class; the project's own research says use ISO 18122 / ASTM D1762 (ash) and ISO 18125 (calorific). *(counts as 1 page, 2 blockers)*

## The 7 refuted false-flags (do NOT act on these)
`/glossary` B1, `/logistics/import-to-usa` B1, `/quality/certifications` B1, `/packaging` B1, `/guide/how-to-choose…` B-01 — all the bogus "FAQPage only at /faq" rule. Plus `/factory` B2 ("Indonesia" in a title is accepted editorial convention, not the governed fact) and `/packaging/inner-box` B2 ("priced separately" is a mandated billing-structure line, not a fabricated fact).

## PQ extremes
- **Strongest:** import-to-germany (8.4), coconut-vs-bamboo guide (8.5), import-to-russia (8.33), how-to-choose guide (8.33), additional-packaging (8.33), logistics pillar (8.2), packaging pillar (8.17).
- **Weakest (priority for content lift):** legal pages (6.4), cargo-protection-and-insurance (6.25), careers (6.75), home (6.83), domes (6.9), cubes (6.92), inner-box (7.0).
