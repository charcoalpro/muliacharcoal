# Build Prompt — `/packaging/white-label` Cluster Page (v2)

> **Delta on `packaging-hub-build-prompt-v6`.** Everything in v6 applies unchanged; carries the settled cluster template (full E-E-A-T, `WebPage` primary, representative examples, `VideoObject` canonical on the cluster page, interleaved photos). The comprehensive branding page — absorbs deferred depth (artwork specs, full proof/sample flow, retail-print) and the folded guide content (business case + how-to-start).
> **Changelog from v1 (gap-pass fixes):**
> - **[A1]** Exclusivity scoped: **artwork/design is always exclusive (+ NDA); product/territorial exclusivity is available but negotiable** — not automatic.
> - **[A2]** Printing prices framed as **add-ons on top of the charcoal FOB price** (charcoal price is SKU/inquiry) — the print table is not the total.
> - **[A3]** **The buyer owns their market's labeling/regulatory compliance**; the factory prints supplied artwork.
> - **[A4]** **No real third-party brand names/logos without written permission** (social proof).
> - **[B1]** Timeline distinguishes **first order (with proof/sample) vs faster reorders** (artwork on file).
> - **[B2]** Surface **sample cost + whether it's credited** to the order.
> - **[B3]** **Mid-page CTA** at the decision point (after trust/terms).
> - **[B4]** **Anchor IDs + headings** on the business-case and how-to-start blocks (promotable to standalone pages later).
> - **[C1]** Guide-pillar **redirect/canonical** note (no future duplication).
> - **[C2]** **Homepage OEM section → white-label** link (dependency).
> - **[C3]** **A single branded container is fine** — no recurring commitment.
> - **[C4]** **Plates/files kept for reorder consistency.**
>
> **Decisions baked in:** all four optional blocks (business case, how-to-start, print-tech credibility, brand examples); **artwork exclusive + NDA, territory negotiable**; **per-design custom-print MOQ**; **single container fine**. **Cautions:** business case qualitative (no invented margins); brand examples real/permitted or anonymized.
>
> **Scope:** Build only `/packaging/white-label`. Links **up** to `/packaging` and **across** to all siblings (final URLs, track forward-refs).

---

## 0. Inherited from v6 (apply as-is)

Components (`KeyFactsBox`, `Figure`, `PhotoGrid`, `VideoFacade` — reuse; STOP+flag if missing); Step-0 preflight; CSP includes `youtube-nocookie.com` (verify); facts only from `company.ts`; graceful degradation (no raw `[[token]]`; missing price → "Available on request"; missing spec → omit/"—"; missing photo → placeholder; missing video → omit slot); **publish white-label/custom-print prices only**, never the charcoal per-ton price; **no banking**; **no `Product`/`Offer`**; synonyms; zero client JS except the deferred YouTube facade; AVIF + responsive + lazy-except-hero + explicit dims (CLS); RTL-safe; metric units; English-only + full hreflang; **full E-E-A-T block**; sitewide CTA/WhatsApp with packaging pre-fill + standard analytics; three-part verification (JS-off extractability, Rich Results, build + LCP/CLS + Lighthouse floor).

---

## 1. Competitive grounding (white-label / OEM)

charcoal.pro is strongest: NDA on artwork, factory provides the die-line/layout, FSC paper, 6-color offset, "we print your design, we don't design it." glowingcharcoal: buyer designs, factory prints, "80+ brands" social proof. djavacoal: OEM stated only. **No competitor has a structured, comprehensive white-label page**, and none states artwork-exclusivity, per-design MOQ, or single-container welcome clearly. Match their depth, beat them on structure, own that clarity.

---

## 2. Page identity & SEO head

- **URL:** `/packaging/white-label`
- **H1** (< 60 char): e.g. *"White-Label & Private-Label Coconut Shisha Charcoal"*.
- `<title>` < 60, `<meta description>` < 160 (own-brand / OEM / per-design MOQ framing).
- Canonical (absolute, no trailing slash); OG + Twitter; hreflang + `x-default`.
- **Breadcrumbs:** Home › Packaging › White label (current item not linked).
- One H1; clean outline; real `dateModified`.

---

## 3. Page structure (top → bottom) — interleave photos within their sections

**A. Intro & identity**
1. **Header** + **Breadcrumbs**.
2. **Hero** — H1 + **definition-form lead** ("White-label production — also called private-label or OEM — lets you sell our coconut shisha charcoal under your own brand…") + primary CTA. **Up-link to `/packaging` in the first paragraph.** Synonyms stated **once**.
3. **Full E-E-A-T block** — Last updated · Reviewed by [reviewer, role] · [N] min read.
4. **`KeyFactsBox` — "White-label at a glance"** (extractable): what you can brand (inner box / master box / plastic / consumables); print method (offset) + FSC paper; finishes; **per-design custom-print MOQ**; **single container fine**; lead-time added; die-line/template provided; **artwork exclusive + NDA (territory negotiable)**; digital proof + physical sample; retail markings (buyer-supplied EAN); **brands produced (count)**; headline custom-print prices **(add-ons on top of the charcoal price)**. Graceful degradation.
5. **What white-label means** — definition; we manufacture, you brand; **the buyer supplies artwork, we don't design** but **we provide the die-line/template**. Distinguish from neutral/unbranded → link `/packaging`. *(Figure: blank-vs-branded before/after.)*

**B. What you can brand**
6. **Brandable surfaces** — inner box (primary branding), master box, inner plastic, branded consumables (stickers / 3D / QR / tape / silica) → cross-link `/packaging/inner-box`, `/packaging/master-box`, `/packaging/plastic`, `/packaging/additional-packaging` (`whiteLabel.brandableSurfaces`). *(Figure: full branded set together.)*

**C. Production & quality**
7. **Print methods & quality (credibility)** — offset printing (`whiteLabel.printingEquipment`), FSC paper (`ancillary.fscPaper`), color capability (`whiteLabel.colorCapability`). *(Figure: offset press; Figure: FSC/certification detail.)*
8. **Finishes** — base **coating** (matte/gloss) → **lamination** → **emboss / UV spot / foil**. *(Figure: finish macro.)*
9. **Artwork specs & file requirements** *(deferred here)* — formats (`branding.artworkFormats`), CMYK (`branding.colorMode`), Pantone/spot (`branding.pantoneSpot`), bleed/safe-area (`branding.bleedSafeArea`), prepress (`branding.prepressBy`); **die-line/template provided**. *(Figure: die-line render; Figure: Pantone/proof sheet.)*

**D. Trust & terms**
10. **Design ownership, exclusivity & confidentiality** — **your artwork/design is exclusive to you: we never reuse or sell your design, and we sign an NDA** (`whiteLabel.designExclusive`, `whiteLabel.ndaAvailable`); printing files/plates are kept for **reorder consistency** (`whiteLabel.platesKeptForReorder`). **Product/territorial exclusivity** (limiting the same charcoal in your market / to competitors) **can be arranged on negotiation** (`whiteLabel.territoryExclusivityNegotiable`) — **not automatic**. State the distinction plainly: artwork-exclusive by default; territory is a separate negotiated arrangement.
11. **Minimum to start your brand (per-design MOQ)** — framed **per printed design** (`customPrint.moqUnits`, `customPrint.moqBasis = per-design`), distinct from the general 18-ton order MOQ. **A single branded container is fine — no recurring-order commitment required** (`whiteLabel.singleContainerOk`); you can also **run multiple designs/sizes in one container**.
12. **Proof & sample approval** *(full flow)* — artwork → **digital proof** → **physical pre-production sample** → approval → production (`proofing.*`); **sample cost + whether it's credited to the order** (`proofing.sampleCost`, `proofing.sampleCreditedToOrder`, graceful); request via the inquiry form or `/samples`. *(Figure: sample box being reviewed.)*
13. **Custom-order timeline** *(full version)* — **first branded order** (artwork → proof → sample → approval → print → produce → ship) vs **reorders** (faster — artwork on file, skip design/proof) (`proofing.*` + `customPrint.leadTimeAddDays` + production lead time + `branding.artworkOnFileForReorder`).
> **Mid-page CTA [B3]** — place a "Start your brand / Request a quote" CTA (sitewide component, packaging pre-fill) here, at the decision point.

**E. Retail**
14. **Retail-ready & market markings** *(depth deferred here)* — barcode/EAN (**buyer-supplied, factory-printed**), country-of-origin, net weight, batch/lot, shelf-ready boxes (`retail.*`, `compliance.*`). **The buyer is responsible for their market's labeling/regulatory compliance** (e.g. EU CLP, US requirements, health/usage warnings); we print the supplied artwork and advise on the UN 1361 / DG transport markings (on the master box) → link `/packaging/master-box`, `/logistics/UN-1361`.

**F. Business & onboarding**
15. **Why private-label (business case)** — anchor **`#why-private-label`**; **qualitative** benefits (brand equity, loyalty, differentiation, positioning control). **No invented margin/percentage figures.** Build as a self-contained, independently linkable section.
16. **How to start your own brand (onboarding steps)** — anchor **`#how-to-start`**; numbered process: (1) inquiry + samples → (2) choose products & packaging → (3) submit artwork (we provide the die-line) → (4) digital proof → (5) physical sample → (6) approve & produce → (7) ship. Self-contained + independently linkable (so §15/§16 can be **promoted to standalone `/guide` pages later** without rework). *(Optional `HowTo` schema — §4.)*
17. **Brands produced (social proof)** — `whiteLabel.brandsProducedCount`; **anonymized or permission-cleared** examples only — **never fabricate, and no real third-party brand names/logos without written permission**. *(Figure: anonymized branded examples; Figure: branded consumables on packaging.)*

**G. Media, FAQ, links**
18. **Video** — white-label process `VideoFacade` (design → print → pack; same `youtubeId` as the hub) + on-page **title + 3–5 key-points** + **transcript** (canonical home — §4/§10).
19. **FAQ** (`FAQSection`, `FAQPage`) — white-label-specific (§6).
20. **Related topics** — up to `/packaging`; across to all four siblings; plus `/products`, `/logistics/UN-1361` + `/logistics/documents`, `/quality/specifications-explained`, `/glossary`, `/samples`, `/contact`.
21. **CTABanner** + **Footer** + **StickyWhatsApp**.

---

## 4. Schema / JSON-LD (canonical home for the white-label `Service`)

- **`WebPage`** primary (locked cluster type) — `isPartOf` WebSite; `about` → "white label" `DefinedTerm`; `mainEntity` → FAQ; `author` (Person) + `datePublished`/`dateModified` from `editorial.*`.
- **`BreadcrumbList`** — Home › Packaging › White label.
- **`FAQPage`** — white-label-specific Q/A only (§6); **not** the container-count or general cost Qs (hub-canonical).
- **`Service`** — **canonical on this page** (hub drops its Service node — §10): `serviceType` = white-label / private-label coconut shisha charcoal manufacturing; `provider` = `Organization`; `areaServed` = USA/UK/Saudi Arabia/Germany/Russia-CIS. Optional `PriceSpecification` only if warning-free.
- **`DefinedTerm`** — "white label" (alternateName "private label", "OEM"); `@id` → `https://muliacharcoal.com/glossary#white-label`.
- **`VideoObject`** — the white-label video. **Canonical on this page**; the hub embeds it **without** `VideoObject`.
- **`HowTo`** *(optional)* — onboarding steps; emit only if warning-free. *(Google deprecated HowTo rich results in 2023 — value is GEO/AI; the on-page numbered steps carry it either way.)*
- **No `Product`/`Offer`.**

---

## 5. `company.ts` — additions under `whiteLabel` + `customPrint`

Reads the most of the v6 contract (`branding.*` artwork specs, `ancillary.fscPaper`, `retail.*`, `compliance.*`, `proofing.*` incl. `sampleCost`/`sampleCreditedToOrder`, the **full** `pricing.*` table, `editorial`, `media.videos[white-label]`). Additions:

```ts
whiteLabel: {
  designByBuyer: true,                 // existing
  dielineProvided: true,               // existing
  ndaAvailable: true,                  // existing
  designExclusive: true,               // artwork/design exclusive (never reused/sold)
  territoryExclusivityNegotiable: true,// NEW — product/territorial exclusivity by negotiation, not automatic
  platesKeptForReorder: null,          // NEW — files/plates kept for reorder consistency
  singleContainerOk: true,             // NEW — a single branded container is fine; no recurring commitment
  printMethod: '',                     // existing
  printingEquipment: '',               // NEW — credibility (e.g. "6-color Heidelberg")
  colorCapability: '',                 // NEW — e.g. "CMYK + Pantone spot + foil"
  brandableSurfaces: [],               // NEW — ['inner-box','master-box','plastic','consumables']
  brandsProducedCount: '',             // NEW — social proof (e.g. "80+")
},
customPrint: {
  moqUnits: '',                        // existing
  moqBasis: 'per-design',              // per printed design (not per container)
  leadTimeAddDays: '',                 // existing
  finishesAvailable: [],               // existing
}
```

*(Reconcile any `whiteLabel.printMethod` vs `branding.*` overlap: print method/equipment/color under `whiteLabel`; artwork-file specs under `branding`.)* Pricing here = the **full** custom-print table, labeled "white-label / custom-print add-ons" and explicitly **on top of the charcoal FOB price** (charcoal per-ton price is on SKU/inquiry — never shown here); indicative note; graceful "Available on request".

---

## 6. FAQ (white-label-specific; `FAQPage` here)

1. What is white-label / private-label / OEM production?
2. What's the minimum to start my own brand? *(per-design MOQ; a single branded container is fine; multiple designs can share a container)*
3. Do I keep my design exclusive, and do you sign an NDA? *(yes — your artwork/design is exclusive and never reused or sold, plus an NDA; product/territorial exclusivity can be arranged on negotiation)*
4. What can I brand (inner box, master box, plastic, consumables)?
5. What print methods and finishes do you offer? *(offset / FSC; coating → lamination → emboss/UV/foil)*
6. What artwork files do you need (formats, CMYK, Pantone, die-line)?
7. Do you send a digital proof and physical sample before production, and is the sample credited? *(full flow)*
8. How long does the first branded order take, and are reorders faster? *(first-order vs reorder timeline)*
9. Who is responsible for my market's labeling and regulatory compliance? *(buyer supplies/owns market labeling; we advise on DG markings)*
10. How do I get started? *(onboarding steps)*

**Dedup:** "how many master boxes per 20ʹ container" and "how much does custom-printed packaging cost" → **hub-canonical** (link, no schema here; full price content still appears here). General order MOQ (18 t) / payment → `/faq` (link only).

---

## 7. Media manifest (exhaustive — interleaved, not one grid)

4:3 photos (16:9 video poster); query-aligned filenames + i18n caption/alt; **go-live minimum = ★**; rest P1; curated subset also on the hub (different crops/captions). Sources under `/src/assets/packaging/white-label/`.

- ☐ ★ Full branded packaging set (plastic + inner + master together)
- ☐ Blank-vs-branded before/after
- ☐ Offset printing press / printing facility
- ☐ FSC paper / certification detail
- ☐ Die-line / artwork template render
- ☐ Finish macro (lamination / emboss / UV / foil)
- ☐ Pantone / proof sheet (color matching)
- ☐ Physical pre-production sample being reviewed
- ☐ Anonymized branded examples (several brands) — social proof
- ☐ Branded consumables set (stickers / 3D / QR / tape) on packaging

**Video:** white-label process — design → print → pack (`youtube-nocookie` facade, custom 16:9 poster, on-page title + 3–5 key-points, **transcript here**). Reuse the hub's `white-label` `media.videos` entry; `VideoObject` lives on this page.

---

## 8. Content coverage gate (not done until all satisfied)

- [ ] Definition-form first sentence + synonyms once; up-link to `/packaging` in the first paragraph; full E-E-A-T block.
- [ ] `KeyFactsBox` covers brandable surfaces, print method + FSC, finishes, per-design MOQ, **single-container-OK**, lead-time, die-line, **artwork exclusive + NDA (territory negotiable)**, proof + sample, retail markings, brands-produced count, headline prices **(noted as add-ons)**.
- [ ] All four blocks present: **business case (qualitative)**, **how-to-start steps**, **print-tech credibility**, **brand examples (real/anonymized, never fabricated, no unlicensed logos)**.
- [ ] **Exclusivity correctly scoped**: artwork/design exclusive + NDA by default; territory/product exclusivity negotiable, not automatic; plates kept for reorder consistency.
- [ ] **Single branded container is fine** (no recurring commitment) stated; per-design MOQ; multiple designs per container.
- [ ] **Prices framed as add-ons on top of the charcoal FOB price**; charcoal per-ton price NOT shown; no banking; full custom-print table, graceful.
- [ ] Proof/sample with **cost + credited** surfaced; **timeline distinguishes first order vs reorder**.
- [ ] Retail markings (buyer-supplied EAN; DG → master box) + **buyer owns market labeling/regulatory compliance**.
- [ ] Business-case (`#why-private-label`) and how-to-start (`#how-to-start`) built as self-contained, independently linkable sections; **mid-page CTA** present.
- [ ] Photos interleaved (captions + query-aligned alt + explicit dims + AVIF + lazy, hero exempt); video facade (no-CLS swap + no-JS fallback + on-page key-points); **`VideoObject` here, hub omits it**.
- [ ] FAQ white-label-specific with valid `FAQPage`; container-count + cost Qs linked to hub; general Qs link `/faq`.
- [ ] Links: up to `/packaging`; across to all four siblings; products, logistics (UN-1361 + documents), quality, glossary, samples, contact.
- [ ] Schema validates: **`WebPage`** + BreadcrumbList + FAQPage + **`Service` (canonical here)** + DefinedTerm + VideoObject (+ optional HowTo if warning-free); NO Product/Offer.
- [ ] No raw `[[token]]`; strings/captions/key-points in i18n; no hardcoded facts/prices; `dateModified` set.

---

## 9. Data Gaps report (white-label subset)

List unpopulated keys: `whiteLabel.*` **including the new `designExclusive`, `territoryExclusivityNegotiable`, `platesKeptForReorder`, `singleContainerOk`, `printingEquipment`, `colorCapability`, `brandableSurfaces`, `brandsProducedCount`**; `customPrint.{moqUnits, moqBasis, leadTimeAddDays, finishesAvailable}`; `branding.{artworkFormats, colorMode, pantoneSpot, bleedSafeArea, prepressBy, customSizesAvailable, foodSafeInks, foodSafeInksCert, artworkOnFileForReorder}`; `ancillary.fscPaper`; `proofing.*` (incl. `sampleCost`, `sampleCreditedToOrder`); `retail.*`; `compliance.*`; the **full** `pricing.*` table (+ priceBasis, pricesLastUpdated); `editorial.*`; the `white-label` video (YouTube ID, poster, key-points, uploadDate, duration, **transcript**); the 10 photos (§7), incl. which **brand examples** are real/permitted vs anonymized.

---

## 10. Hub & downstream dependencies

**Batch into one consolidated hub revision:**
- **Move the `Service` schema to this page** (white-label is canonical) — the hub drops its `Service` node and links here.
- For every cluster video, **remove `VideoObject` from the hub's embed** so each cluster page is the single canonical home.
- Keep each hub child *section* short so the cluster pages are the ranking targets.

**Downstream (note, don't solve now):**
- **[C1]** When the guide pillar is built, `/guide/private-label-options` and `/guide/how-to-start-your-own-brand` must **301-redirect or thin-link to this page** (which now owns that content) — never duplicate it. The `#why-private-label` and `#how-to-start` anchors are the link targets; these sections can be **promoted to standalone pages later** if the informational long-tail warrants it.
- **[C2]** The **homepage OEM section should link to `/packaging/white-label`** as the deep page.

---

## Working style

Inherit v6's working style. Before code: restate understanding + white-label assumptions; confirm inherited components exist; flag conflicts (incl. the `whiteLabel`/`branding` field reconciliation in §5); give a short plan (the ~20 sections grouped A–G, photo/video interleave, the `whiteLabel` + `customPrint` `company.ts` additions, the canonical `Service`, the mid-page CTA, and the batched hub edits); **wait for approval**. Surgical changes only. Keep each block tight — breadth is the risk on this page.
