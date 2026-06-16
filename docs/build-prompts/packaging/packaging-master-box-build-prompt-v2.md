# Build Prompt — `/packaging/master-box` Cluster Page (v2)

> **This is a delta on `packaging-hub-build-prompt-v6`.** Everything in v6 applies unchanged. This prompt specifies only what's master-box-specific.
> **Changelog from v1 (gap-pass fixes):**
> - **[A1]** `weightOptionsKg` pinned as **net charcoal per box**; inner-box count shown as a **representative example** (`holdsExample`) — never a fixed invented count.
> - **[A2]** **Gross weight per box** added (`grossWeightKg`) — freight needs it.
> - **[A3]** **`VideoObject` canonical = this page**; the hub embeds the same video **without** `VideoObject` *(small hub edit — see §10)*.
> - **[B1]** **Carton strength** spec added (ECT / burst / flute / corrugate gsm).
> - **[B2]** **Printable faces + white-top liner** nuance added.
> - **[B3]** **Max stack height** added.
> - **[B4]** **FSC / recyclability** one-line mention (reads `ancillary.fscPaper`).
> - **[C1]** Primary schema locked to **`WebPage`** (template for all five cluster pages).
> - **[C2]** Keep the hub's master-box *section* short so this page wins the query *(hub note)*.
> - **[C3]** "Request a sample master box" cross-link into the proof/sample flow.
> - **[C4]** Net-weight tolerance note if exact weights are published.
>
> **Scope:** Build only `/packaging/master-box`. Links **up** to `/packaging` and **across** to siblings (some not built — final URLs, track forward-refs).

---

## 0. Inherited from v6 (apply as-is)

Components (`KeyFactsBox`, `Figure`, `PhotoGrid`, `VideoFacade` — reuse, don't recreate; STOP+flag if missing); Step-0 preflight; CSP already includes `youtube-nocookie.com` (verify); facts only from `company.ts`; graceful degradation (no raw `[[token]]`; missing price → "Available on request"; missing spec → omit/"—"; missing photo → placeholder; missing video → omit slot); **publish white-label/custom-print prices only**, never the charcoal per-ton price; **no banking**; **no `Product`/`Offer`**; synonyms (master box = master carton; white label = OEM/private label; neutral = unbranded/plain/generic); zero client JS except the deferred YouTube facade; AVIF + responsive + lazy-except-hero + explicit dims (CLS); RTL-safe; metric units; English-only + full hreflang; **full E-E-A-T block** (author + reviewer + last-updated + reading time); sitewide CTA/WhatsApp with packaging pre-fill + the standard analytics events; the three-part verification (JS-off extractability, Rich Results, build + LCP/CLS + Lighthouse floor).

---

## 1. Competitive grounding (master box)

glowingcharcoal: 2–3 ply hard carton, single vs double wall, 10/20 kg, strapping, container math (~1,820 loose / 1,650 palletized); charcoal.pro: 10/12/15/20 kg + print options (b/w, 3-color, partial/full-color); djavacoal names options only. **None has a dedicated master-box page, and none publishes carton-strength specs** — so the construction/strength detail below is a clear differentiation lane. Match their depth, beat them on structure.

---

## 2. Page identity & SEO head

- **URL:** `/packaging/master-box`
- **H1** (< 60 char, keyword-front-loaded): e.g. *"Coconut Charcoal Master Box (Master Carton) Packaging"*.
- `<title>` < 60, `<meta description>` < 160 (master carton + export/container framing).
- Canonical (absolute, no trailing slash); OG + Twitter; hreflang + `x-default`.
- **Breadcrumbs:** Home › Packaging › Master box (current item not linked).
- One H1; clean outline; real `dateModified` (bump on price changes).

---

## 3. Page structure (top → bottom) — interleave photos within their sections

1. **Header** + **Breadcrumbs**.
2. **Hero** — H1 + **definition-form lead** ("A master box, also called a master carton, is…") + primary CTA. **Up-link to `/packaging` in the first paragraph.**
3. **Full E-E-A-T block** — Last updated · Reviewed by [reviewer, role] · [N] min read.
4. **`KeyFactsBox` — "Master box at a glance"** (extractable): material; wall types (single/double); **carton strength (ECT / burst / flute / gsm)**; outer dimensions; **net weight options + gross weight per box**; **representative holds example**; **max stack height**; print options + **printable faces**; strapping; palletization; master boxes per 20ʹ (loose vs palletized); DG/UN 1361 + origin/net-weight/batch-lot markings; neutral & branded both; **double-wall surcharge + strapping price** (indicative). Graceful degradation.
5. **Definition & construction** — definition-form; corrugated kraft, ply/layers, and the **carton-strength spec** (ECT, burst/Mullen, flute type B/C/BC, corrugate gsm) — why it matters for sea freight + stacking. *(Figure: open carton showing inners; Figure: ply/edge cross-section.)*
6. **Single vs double wall** — when each is used, protection tradeoff, double-wall surcharge (`pricing.doubleWallMasterBoxSurchargePerTonUsd`, graceful), and **max stack height**. *(Figure: single-vs-double-wall comparison.)*
7. **Dimensions & weights** — `outerDimsMm`; **net weight options** (`weightOptionsKg`, = net charcoal/box) and **gross weight per box** (`grossWeightKg`); a **representative holds example** (`holdsExample`, e.g. "a 10 kg master box holds ten 1 kg inner boxes") — note exact inner-box counts vary by inner-box size and are detailed on the SKU pages; link `/packaging/inner-box` and `/products`. If exact net weights are published, note tolerance (±%). *(Figure: scale/dimension reference.)*
8. **Printing & branding on the master box** — print options (`printOptions`); **printable faces** (`printableFaces`) and that vivid full-color on brown kraft typically needs a **white-top liner** (`whiteTopLinerAvailable`); **one line** on artwork → **"Full white-label & artwork specs →" `/packaging/white-label`**. *(Figure: full-color branded carton; Figure: print/branding detail.)*
9. **Strapping & palletization** — strapping (`ancillary.strapping` + `pricing.strappingPerTonUsd`); palletized vs loose, ISPM-15 → link `/packaging/additional-packaging` + `/logistics/rules`. *(Figure: strapped carton; Figure: shrink-wrapped pallet.)*
10. **Container loading** — loose vs palletized counts (`containerLoad.*`) as content; **the "per 20ʹ container" FAQ is hub-canonical** — link the hub for the Q&A, do not duplicate that FAQ here. *(Figure: loose-loaded 20ft container.)*
11. **Compliance & markings** — UN 1361 / DG (Class 4.2) + country-of-origin + net weight + batch/lot (`compliance.*`), **mandatory on every export (neutral or branded)**; authoritative outbound link (UN/IMDG — verify URL, `rel="noopener"`, `outbound_click`); cross-link `/logistics/UN-1361`, `/logistics/documents`. *(Figure: marking detail.)*
12. **Neutral vs branded master box** — plain carton (no print surcharge, **still carries DG + origin markings**) vs branded; custom sizes (`branding.customSizesAvailable`); **FSC/recyclability note** if `ancillary.fscPaper`; link `/packaging/white-label`. A line: **request a sample master box** via the proof/sample flow (inquiry or `/samples`). *(Figure: neutral/plain carton; Figure: blank-vs-branded.)*
13. **Video** — the master-box `VideoFacade` (assembly & sealing; same `youtubeId` as the hub) + on-page **title + 3–5 key-points** + the page's **transcript** (this page is the video's canonical home — §4/§10).
14. **FAQ** (`FAQSection`, `FAQPage`) — master-box-specific (§6).
15. **Related topics** — up to `/packaging`; across to `/packaging/inner-box`, `/packaging/plastic`, `/packaging/white-label`, `/packaging/additional-packaging`; plus `/products`, `/logistics/UN-1361` + `/logistics/documents` + `/logistics/rules`, `/quality/specifications-explained`, `/glossary` (master-box term), `/samples`, `/contact`.
16. **CTABanner** + **Footer** + **StickyWhatsApp**.

---

## 4. Schema / JSON-LD (lean — no Service, no Product)

- **`WebPage`** primary (**locked** — same type across all cluster pages) — `isPartOf` WebSite; `about` → "master box" `DefinedTerm`; `mainEntity` → FAQ; `author` (Person) + `datePublished`/`dateModified` from `editorial.*`. *(Reviewer in the visible block; schema-optional via `contributor`/`editor`.)*
- **`BreadcrumbList`** — Home › Packaging › Master box.
- **`FAQPage`** — master-box-specific Q/A only (§6); **not** the container-count Q.
- **`DefinedTerm`** — "master box" (alternateName "master carton"); `@id` → `https://muliacharcoal.com/glossary#master-box`.
- **`VideoObject`** — the master-box video (name, description = on-page key-points, thumbnailUrl = local poster, embedUrl = `youtube-nocookie.com`, uploadDate + duration). **This page is the video's canonical home** — emit `VideoObject` here (valid-or-omit); the hub embeds the same video **without** `VideoObject`.
- **No `Product`/`Offer`. No `Service`.**

---

## 5. `company.ts` — small additions to `masterBox` (the only new keys)

Most of this page reuses the existing v6 contract (`containerLoad`, `compliance`, `branding`, `ancillary.{strapping,pallets,thermalBlanket,fscPaper}`, `pricing.{doubleWallMasterBoxSurchargePerTonUsd, strappingPerTonUsd, currency, priceBasis, pricesLastUpdated}`, `editorial`, `media.videos[master-box]`). The gap-pass adds these under `masterBox`:

```ts
masterBox: {
  material: '',
  wallType: '',
  outerDimsMm: '',
  weightOptionsKg: [],        // NET charcoal per box, e.g. [10, 20]
  grossWeightKg: '',          // [A2] gross per box (net + packaging); provide per option if it varies
  holdsExample: '',           // [A1] representative, e.g. "10 kg box = 10 × 1 kg inner boxes"
  printOptions: [],
  printableFaces: '',         // [B2] e.g. "all faces" / "top + 2 long sides"
  whiteTopLinerAvailable: null, // [B2] boolean — vivid full-color on kraft
  cartonStrength: {           // [B1]
    ect: '',                  // e.g. "32 ECT"
    burstKpa: '',             // burst/Mullen, e.g. "X kPa"
    fluteType: '',            // B / C / BC
    corrugateGsm: '',
  },
  maxStackHeight: '',         // [B3] e.g. "8 boxes" or "X m"
}
```

Pricing on this page = master-box-relevant rows only (double-wall + strapping), labeled "white-label / custom-print add-ons", indicative note, graceful "Available on request". No charcoal per-ton price.

---

## 6. FAQ (master-box-specific; `FAQPage` here)

1. What is a master box (master carton)?
2. What's it made of — ply, single vs double wall, **and how strong is the carton (ECT/flute)?**
3. What master-box dimensions, **net and gross weights** do you offer?
4. How many inner boxes does a master box hold? *(representative example; varies by inner-box size)*
5. Can the master box be printed with my brand — **which faces, and do you offer a white-top liner?**
6. Do you offer plain/neutral master boxes? *(still carry UN 1361 + origin markings)*
7. Is the master box strapped, and palletized or loose-loaded?
8. What markings are printed on the master box (UN 1361, origin, net weight, batch/lot)?
9. Can I order a custom master-box size, and request a sample?

**Dedup:** "how many master boxes per 20ʹ container" → **hub-canonical** (link, no schema here). General order MOQ / payment → `/faq` (link only).

---

## 7. Media manifest (exhaustive — interleaved, not one grid)

4:3 photos; query-aligned filenames + i18n caption/alt; **go-live minimum = ★**; rest P1; curated subset also on the hub (different crops/captions). Sources under `/src/assets/packaging/master-box/`.

- ☐ ★ Closed branded carton, 3/4 view
- ☐ Closed neutral/plain carton
- ☐ Open carton showing inner boxes packed inside
- ☐ Single-wall vs double-wall edge/cross-section comparison
- ☐ Full-color print / branding detail
- ☐ UN 1361 / DG / origin / net-weight marking detail
- ☐ Strapped carton (strapping detail)
- ☐ Shrink-wrapped pallet
- ☐ Loose-loaded 20ft container
- ☐ Dimension / scale reference

**Video:** master-box assembly & sealing (`youtube-nocookie` facade, custom 16:9 poster, on-page title + 3–5 key-points, **transcript here**). Reuse the hub's `master-box` `media.videos` entry; `VideoObject` lives on this page.

---

## 8. Content coverage gate (not done until all satisfied)

- [ ] Definition-form first sentence; up-link to `/packaging` in the first paragraph; full E-E-A-T block.
- [ ] `KeyFactsBox` with all master-box facts incl. carton strength, net + gross weight, representative holds, max stack, printable faces, double-wall + strapping prices.
- [ ] Construction covers ply + single/double wall + **carton strength (ECT/burst/flute/gsm)**; dimensions cover **net + gross + representative holds** (count varies by size → SKU pages); printing covers **printable faces + white-top liner** (artwork depth → white-label); strapping + palletization (→ additional-packaging + logistics); container numbers (FAQ on hub); compliance markings (mandatory framing, authoritative link); neutral vs branded (+ FSC note, + sample-carton cross-link); custom sizes.
- [ ] Charcoal per-ton price NOT shown; no banking; pricing limited to master-box rows, graceful.
- [ ] Photos interleaved with captions + query-aligned alt + explicit dims + AVIF + lazy (hero exempt); video facade with no-CLS swap + no-JS fallback + on-page key-points; **`VideoObject` here, hub omits it**.
- [ ] FAQ master-box-specific with valid `FAQPage`; container-count Q linked to hub (not duplicated); general Qs link `/faq`.
- [ ] Links: up to `/packaging`; across to the four siblings; products, logistics (UN-1361 + documents + rules), quality, glossary, samples, contact; ≤1 authoritative outbound.
- [ ] Schema validates: **`WebPage`** + BreadcrumbList + FAQPage + DefinedTerm (+ VideoObject); NO Product/Offer/Service.
- [ ] No raw `[[token]]`; strings/captions/key-points in i18n; no hardcoded facts/prices; `dateModified` set.

---

## 9. Data Gaps report (master-box subset)

List unpopulated keys this page needs: `masterBox.*` **including the new `grossWeightKg`, `holdsExample`, `printableFaces`, `whiteTopLinerAvailable`, `cartonStrength.{ect,burstKpa,fluteType,corrugateGsm}`, `maxStackHeight`**; `pricing.{doubleWallMasterBoxSurchargePerTonUsd, strappingPerTonUsd, priceBasis, pricesLastUpdated}`; `containerLoad.*`; `compliance.*`; `branding.{neutralScope, customSizesAvailable}`; `ancillary.{strapping, pallets, thermalBlanket, fscPaper}`; `editorial.*`; the `master-box` video (YouTube ID, poster, key-points, uploadDate, duration, **transcript**); the 10 master-box photos (§7); the authoritative UN/IMDG URL.

---

## 10. Hub dependency (do alongside, or note for the hub revision)

- The hub embeds the same master-box video; **remove `VideoObject` from the hub's embed** so this page is the single canonical home (A3).
- Keep the hub's master-box *section* short (definition + a few facts + link) so this page is the ranking target for "coconut charcoal master box" (C2).

---

## Working style

Inherit v6's working style. Before code: restate understanding + master-box assumptions; confirm inherited components exist; flag conflicts; give a short plan (sections, photo/video interleave, the `masterBox` `company.ts` additions in §5, and the hub `VideoObject` edit); **wait for approval**. Surgical changes only.
