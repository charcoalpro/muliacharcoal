# Build Prompt — `/packaging/inner-box` Cluster Page (v2)

> **Delta on `packaging-hub-build-prompt-v6`.** Everything in v6 applies unchanged; carries the settled cluster template (full E-E-A-T, `WebPage` primary, representative-holds, `VideoObject` canonical on the cluster page, interleaved photos).
> **Decisions baked in (from clarification):** include **box style** (tuck / tray+lid / sleeve), **gross weight per box**, **coating** (matte/gloss); **omit** euro-slot/window/tear-strip. Charcoal is **always in inner plastic first** → the inner box is a presentation/branding unit, the moisture barrier is the plastic, and there's no food-contact/ink concern for the box itself.
> **Changelog from v1 (gap-pass fixes):**
> - **[A1]** Added `innerBox.dimensionsMm` (retail shelf fit + master-box packing math).
> - **[A2]** Distinguish **coating** (matte/gloss aqueous/varnish, base) → **lamination** (matte/gloss film, upgrade) → **emboss/UV/foil** (add-ons) — no double-count.
> - **[A3]** Inner-box and master-box `holdsExample` pinned to **one reference SKU** so the coupled pages can't contradict.
> - **[B1]** Surface custom-print **MOQ + lead-time** on the page; depth → white-label.
> - **[B2]** Wire in `retail.shelfReadyBox`.
> - **[B3]** Pantone / brand-color-accuracy line (→ white-label).
> - **[B4]** Explicit anti-counterfeit / QR-sticker cross-link to `/packaging/additional-packaging`.
> - **[C1]** Hub `VideoObject` edits batched into one consolidated hub revision (§10).
> - **[C2]** Optional packaging-hierarchy diagram (§5).
> - **[C3]** Expanded `DefinedTerm` alternate names.
>
> **Scope:** Build only `/packaging/inner-box`. Links **up** to `/packaging` and **across** to siblings (some not built — final URLs, track forward-refs).

---

## 0. Inherited from v6 (apply as-is)

Components (`KeyFactsBox`, `Figure`, `PhotoGrid`, `VideoFacade` — reuse; STOP+flag if missing); Step-0 preflight; CSP includes `youtube-nocookie.com` (verify); facts only from `company.ts`; graceful degradation (no raw `[[token]]`; missing price → "Available on request"; missing spec → omit/"—"; missing photo → placeholder; missing video → omit slot); **publish white-label/custom-print prices only**, never the charcoal per-ton price; **no banking**; **no `Product`/`Offer`**; synonyms; zero client JS except the deferred YouTube facade; AVIF + responsive + lazy-except-hero + explicit dims (CLS); RTL-safe; metric units; English-only + full hreflang; **full E-E-A-T block**; sitewide CTA/WhatsApp with packaging pre-fill + standard analytics; three-part verification (JS-off extractability, Rich Results, build + LCP/CLS + Lighthouse floor).

---

## 1. Competitive grounding (inner box)

glowingcharcoal: 500 g–5 kg, ~230 gsm carton, full-color + lamination/emboss, inner box ≈ 108×98×150 mm; charcoal.pro: 250 g–2 kg, ~250 gsm duplex e-flute, + lamination/emboss/UV/foil; djavacoal doesn't break it out. **No dedicated inner-box page anywhere, and none details box style, coating, or dimensions** — open ground. Match their depth, beat them on structure.

---

## 2. Page identity & SEO head

- **URL:** `/packaging/inner-box`
- **H1** (< 60 char): e.g. *"Coconut Charcoal Inner Box (Retail Box) Packaging"*.
- `<title>` < 60, `<meta description>` < 160 (retail/branded inner box framing).
- Canonical (absolute, no trailing slash); OG + Twitter; hreflang + `x-default`.
- **Breadcrumbs:** Home › Packaging › Inner box (current item not linked).
- One H1; clean outline; real `dateModified` (bump on price changes).

---

## 3. Page structure (top → bottom) — interleave photos within their sections

1. **Header** + **Breadcrumbs**.
2. **Hero** — H1 + **definition-form lead** ("An inner box is the printed retail box that holds plastic-wrapped coconut shisha charcoal, presented to the end customer…") + primary CTA. **Up-link to `/packaging` in the first paragraph.**
3. **Full E-E-A-T block** — Last updated · Reviewed by [reviewer, role] · [N] min read.
4. **`KeyFactsBox` — "Inner box at a glance"** (extractable): paper type + gsm + **coating (matte/gloss)**; **box styles** (tuck / tray+lid / sleeve); **dimensions**; **net weight options + gross weight per box**; **representative holds example**; finishes (lamination/emboss/UV/foil); printable full-color (white duplex); **shelf-ready** (if offered); **retail markings carried** (barcode/EAN, net weight, origin, batch/lot); **custom-print MOQ + lead-time**; neutral & branded both; **inner-box printing price + finish surcharges** (indicative). Graceful degradation.
5. **Definition & purpose** — the inner box is the **retail/branding unit**: charcoal is **always sealed in inner plastic first**, so the moisture/dust barrier is the plastic, not the box → link `/packaging/plastic`. *(Optional: a small packaging-hierarchy diagram — master box ▸ inner box ▸ inner plastic ▸ charcoal — as plain HTML/SVG, no JS; extractable and buyer-friendly.)* *(Figure: open inner box showing plastic-wrapped charcoal inside.)*
6. **Box styles, construction & finishes** — tuck-end / two-piece tray+lid / sleeve (`innerBox.boxStyles`); paper type + gsm (`paperType`, `paperGsm`); **dimensions** (`dimensionsMm`); and a clear finish ladder: **base coating** (matte or gloss aqueous/varnish, `innerBox.coating`) → **lamination** (matte/gloss film, an upgrade) → **emboss / UV spot / foil** (add-ons, `innerBox.finishes`) — present these as distinct, not interchangeable. White coated duplex prints vivid full-color (no white-top-liner issue, unlike the master box). *(Figure: box-style comparison; Figure: finish macro showing matte vs gloss + lamination/emboss/UV/foil.)*
7. **Sizes & weights** — size/weight options (`weightOptionsKg`, = net charcoal per inner box) + **gross weight per box** (`grossWeightKg`); a **representative holds example** (`holdsExample`) tied to **one named reference SKU** (e.g. "a 1 kg inner box of 25 mm cubes holds ~N pieces") — must match the master-box page's reference; note exact counts vary by cube size/shape → SKU pages; link `/products`. If exact net weights are published, note tolerance (±%). *(Figure: size range side-by-side.)*
8. **Printing & branding** — the inner box is the **primary branding surface**; full-color print + finishes; **custom-print MOQ + lead-time** (`customPrint.moqUnits`, `customPrint.leadTimeAddDays`); **Pantone/spot matching for brand-color accuracy across reorders** (`branding.pantoneSpot`); **one line** on artwork → **"Full white-label & artwork specs →" `/packaging/white-label`**. *(Figure: full-color branded inner box, front 3/4; Figure: print/branding detail.)*
9. **Retail & consumer markings** — what the retail inner box carries: **barcode/EAN (buyer-supplied, factory-printed)**, net weight, country-of-origin, batch/lot (`retail.*`, `compliance.{countryOfOrigin, netWeightMark, batchLot}`); **shelf-ready** boxes if offered (`retail.shelfReadyBox`). Anti-counterfeit options (QR / 3D / holographic stickers) on the retail box → cross-link `/packaging/additional-packaging`. **UN 1361 / dangerous-goods markings live on the master box, not the retail inner box** → cross-link `/packaging/master-box`, `/logistics/UN-1361`. *(Figure: retail-markings detail.)*
10. **Packed into the master box** — inner boxes are packed into the master carton; how many per master box ties to the master-box config (consistent reference) → link `/packaging/master-box`. *(Figure: inner boxes packed inside a master box.)*
11. **Neutral vs branded inner box** — generic/plain vs branded; **custom sizes** for different markets (`branding.customSizesAvailable`); FSC/recyclability note if `ancillary.fscPaper`; link `/packaging/white-label`. A line: **request a sample inner box** via the proof/sample flow (inquiry or `/samples`). *(Figure: neutral/plain inner box; Figure: blank-vs-branded.)*
12. **Video** — the inner-box `VideoFacade` (forming/printing or hand-pack; same `youtubeId` as the hub) + on-page **title + 3–5 key-points** + the page's **transcript** (this page is the video's canonical home — §4/§10).
13. **FAQ** (`FAQSection`, `FAQPage`) — inner-box-specific (§6).
14. **Related topics** — up to `/packaging`; across to `/packaging/master-box`, `/packaging/plastic`, `/packaging/white-label`, `/packaging/additional-packaging`; plus `/products`, `/logistics/UN-1361` + `/logistics/documents`, `/quality/specifications-explained`, `/glossary` (inner-box term), `/samples`, `/contact`.
15. **CTABanner** + **Footer** + **StickyWhatsApp**.

---

## 4. Schema / JSON-LD (lean — no Service, no Product)

- **`WebPage`** primary (locked cluster type) — `isPartOf` WebSite; `about` → "inner box" `DefinedTerm`; `mainEntity` → FAQ; `author` (Person) + `datePublished`/`dateModified` from `editorial.*`. *(Reviewer in the visible block; schema-optional.)*
- **`BreadcrumbList`** — Home › Packaging › Inner box.
- **`FAQPage`** — inner-box-specific Q/A only (§6); **not** the container-count Q or the general cost Q (both hub-canonical).
- **`DefinedTerm`** — "inner box" (alternateName "retail box", "consumer box"); `@id` → `https://muliacharcoal.com/glossary#inner-box`.
- **`VideoObject`** — the inner-box video (name, description = on-page key-points, thumbnailUrl = local poster, embedUrl = `youtube-nocookie.com`, uploadDate + duration). **Canonical on this page**; the hub embeds the same video **without** `VideoObject`.
- **No `Product`/`Offer`. No `Service`.**

---

## 5. `company.ts` — small additions to `innerBox` (the only new keys)

Reuses the existing v6 contract (`retail.*`, `compliance.{countryOfOrigin, netWeightMark, batchLot}`, `branding.{neutralScope, customSizesAvailable, artworkFormats, colorMode, pantoneSpot}`, `customPrint.{moqUnits, leadTimeAddDays}`, `ancillary.fscPaper`, `primaryPlastic.*` for the cross-reference, `pricing.{innerBoxPrintingPerKgUsd, laminationSurchargePerTonUsd, embossSurchargePerTonUsd, uvSpotSurchargePerTonUsd, foilSurchargePerTonUsd, currency, priceBasis, pricesLastUpdated}`, `editorial`, `media.videos[inner-box]`). Additions under `innerBox`:

```ts
innerBox: {
  paperType: '',
  paperGsm: '',
  coating: '',              // matte / gloss (base aqueous/varnish) — distinct from lamination
  boxStyles: [],            // ['tuck-end','tray+lid','sleeve']
  dimensionsMm: '',         // NEW [A1] — outer box dimensions; per size option if it varies
  weightOptionsKg: [],      // NET charcoal per inner box, e.g. [0.25, 0.5, 1, 2]
  grossWeightKg: '',        // gross per inner box (net + box); per option if it varies
  holdsExample: '',         // representative tied to ONE reference SKU; must match master-box page
  finishes: [],             // [lamination, emboss, uv-spot, foil]  (upgrades/add-ons over the base coating)
}
```

Pricing on this page = inner-box-relevant rows only (inner-box printing per kg + finish surcharges), labeled "white-label / custom-print add-ons", indicative note, graceful "Available on request". No charcoal per-ton price.

---

## 6. FAQ (inner-box-specific; `FAQPage` here)

1. What is an inner box (retail box)?
2. What sizes, **dimensions**, and weights (net + gross) do you offer?
3. What's it made of — paper, gsm, and finish (matte/gloss coating vs lamination)?
4. What box styles are available (tuck / tray+lid / sleeve)?
5. How many cubes does an inner box hold? *(representative, named reference SKU; charcoal is plastic-wrapped inside)*
6. Can the inner box be printed with my brand — finishes, Pantone matching, MOQ, lead-time?
7. Do you offer plain/neutral inner boxes?
8. What retail markings go on the inner box (barcode/EAN, net weight, origin, batch/lot)? *(EAN buyer-supplied; DG markings are on the master box)*
9. Can I order a custom inner-box size, and request a sample?

**Dedup:** "how many master boxes per 20ʹ container" and "how much does custom-printed packaging cost" → **hub-canonical** (link, no schema here). General order MOQ / payment → `/faq` (link only).

---

## 7. Media manifest (exhaustive — interleaved, not one grid)

4:3 photos; query-aligned filenames + i18n caption/alt; **go-live minimum = ★**; rest P1; curated subset also on the hub (different crops/captions). Sources under `/src/assets/packaging/inner-box/`.

- ☐ ★ Branded inner box, front 3/4
- ☐ Neutral/plain inner box
- ☐ Open inner box showing plastic-wrapped charcoal inside
- ☐ Size range side-by-side (250 g / 500 g / 1 kg / 2 kg)
- ☐ Box-style comparison (tuck vs tray+lid vs sleeve)
- ☐ Finish macro (matte vs gloss coating; lamination/emboss/UV/foil)
- ☐ Full-color print / branding detail
- ☐ Retail-markings detail (barcode/EAN, net weight, origin)
- ☐ Inner boxes packed inside a master box
- ☐ Dimension / scale reference

**Video:** inner-box forming/printing or hand-pack (`youtube-nocookie` facade, custom 16:9 poster, on-page title + 3–5 key-points, **transcript here**). Reuse the hub's `inner-box` `media.videos` entry; `VideoObject` lives on this page.

---

## 8. Content coverage gate (not done until all satisfied)

- [ ] Definition-form first sentence; up-link to `/packaging` in the first paragraph; full E-E-A-T block.
- [ ] `KeyFactsBox` with all inner-box facts incl. coating, box styles, **dimensions**, net + gross weight, representative holds, finishes, **shelf-ready**, retail markings, **custom-print MOQ + lead-time**, inner-box printing + finish prices.
- [ ] Covers: purpose as retail/branding unit + "always via inner plastic" (barrier = plastic → link plastic); box styles + paper/gsm + **dimensions** + finish ladder (**coating vs lamination vs add-ons, distinct**); sizes + **net + gross + representative holds tied to one reference SKU** (matches master-box); printing/branding (primary surface; finishes; **MOQ + lead-time + Pantone**; artwork depth → white-label); **retail markings** (barcode/EAN buyer-supplied, net weight, origin, batch/lot, **shelf-ready**) with **DG markings noted as master-box's job** + **QR/anti-counterfeit → additional-packaging**; packed-into-master-box (→ master-box, consistent reference); neutral vs branded (+ FSC note, + sample cross-link); custom sizes.
- [ ] Charcoal per-ton price NOT shown; no banking; pricing limited to inner-box rows, graceful.
- [ ] Photos interleaved with captions + query-aligned alt + explicit dims + AVIF + lazy (hero exempt); video facade with no-CLS swap + no-JS fallback + on-page key-points; **`VideoObject` here, hub omits it**.
- [ ] FAQ inner-box-specific with valid `FAQPage`; container-count + cost Qs linked to hub (not duplicated); general Qs link `/faq`.
- [ ] Links: up to `/packaging`; across to the four siblings; products, logistics (UN-1361 + documents), quality, glossary, samples, contact.
- [ ] Schema validates: **`WebPage`** + BreadcrumbList + FAQPage + DefinedTerm (+ VideoObject); NO Product/Offer/Service.
- [ ] No raw `[[token]]`; strings/captions/key-points in i18n; no hardcoded facts/prices; `dateModified` set.

---

## 9. Data Gaps report (inner-box subset)

List unpopulated keys this page needs: `innerBox.*` **including the new `coating`, `boxStyles`, `dimensionsMm`, `grossWeightKg`, `holdsExample`**; `pricing.{innerBoxPrintingPerKgUsd, laminationSurchargePerTonUsd, embossSurchargePerTonUsd, uvSpotSurchargePerTonUsd, foilSurchargePerTonUsd, priceBasis, pricesLastUpdated}`; `customPrint.{moqUnits, leadTimeAddDays}`; `retail.{barcodeEanByBuyer, shelfReadyBox}`; `compliance.{countryOfOrigin, netWeightMark, batchLot}`; `branding.{neutralScope, customSizesAvailable, pantoneSpot}`; `ancillary.fscPaper`; `editorial.*`; the `inner-box` video (YouTube ID, poster, key-points, uploadDate, duration, **transcript**); the 10 inner-box photos (§7). **Flag the shared reference SKU used for `holdsExample` so it matches the master-box page.**

---

## 10. Hub dependency (batch into one consolidated hub revision)

Across cluster pages, the hub edits accumulate — do them **once**, not piecemeal:
- For every cluster video (master-box, inner-box, …), **remove `VideoObject` from the hub's embed** so each cluster page is the single canonical home.
- Keep each hub child *section* short (definition + a few facts + link) so the cluster pages are the ranking targets.

---

## Working style

Inherit v6's working style. Before code: restate understanding + inner-box assumptions; confirm inherited components exist; flag conflicts; give a short plan (sections, photo/video interleave, the `innerBox` `company.ts` additions in §5, the shared `holdsExample` reference SKU, and the batched hub edit); **wait for approval**. Surgical changes only.
