# Build Prompt — `/packaging` Pillar Hub (v6, final)

> **Changelog from v5 (v5 gap-pass fixes):**
> - **[A1]** Printing prices + custom-print MOQ are **white-label only**; neutral = no print surcharge, standard 18-ton order MOQ only. Price table relabeled accordingly.
> - **[A2]** Neutral packaging **still carries mandatory UN 1361/DG + country-of-origin markings** — stated explicitly (neutral ≠ blank).
> - **[A3]** Retail barcode/EAN is **buyer-supplied, factory-printed** (you don't issue it).
> - **[A4]** **Country-of-origin + net weight + batch/lot = compliance** (legally required on every export); barcode/EAN + shelf-ready = retail channel. Regrouped.
> - **[A5]** `Service` schema = **white-label / custom-print capability only**; neutral is content + `DefinedTerm`, not a Service.
> - **[A6]** `VideoObject` is **valid-or-omit** (needs `uploadDate` + `duration` + thumbnail); facade swaps poster→iframe inside the **same fixed aspect-ratio box** (no CLS on click).
> - **[B1]** New text blocks (retail, proof/sample, artwork) = **short overview + link out** to `/packaging/white-label`.
> - **[B2]** Proof/sample requests route via **both** the inquiry form and `/samples`.
> - **[B3]** Compact **custom-order timeline** (proof → sample → print → produce → ship) on the hub.
> - **[B4]** **On-page summary/key-points (3–5 bullets) is the GEO surface** (required); YouTube captions = accessibility/YouTube SEO — not a substitute.
> - **[B5]** Comparison table column "Relative cost" → **"Protection level"**; configurations defined **once** in `company.ts`.
> - **[C1–C4]** Artwork specs = one hub line + link; `foodSafeInks` needs cert backing or routes to inquiry; FAQ value calibrated to GEO/AI + Bing (Google FAQ rich results restricted since 2023 — verify); add YouTube channel to `Organization.sameAs`, optional Wikidata `sameAs` on the coconut-shell-charcoal term, verify the nocookie host in the preview deploy.
>
> *(All prior behavior retained: graceful degradation, path canonicalization, component preflight, CSP update, FAQ dedup, E-E-A-T block, pallets+thermal-blanket placement, broadened forward-links, i18n population, no Product/Offer, published prices, single white-label page, captioned static galleries, per-area media, YouTube nocookie facade.)*

> **For:** Claude Code, senior SEO/GEO engineer on the muliacharcoal.com codebase.
> **Read first:** `CLAUDE.md`, `DESIGN.md`, `/src/config/company.ts`, the i18n layer, schema builders in `/src/lib`. Conform to all; surface conflicts, don't silently resolve.
> **Scope:** Build **only** the `/packaging` hub. The five cluster pages are separate prompts; link to their final URLs now. Keep the hub an **overview that routes down** — push depth to cluster/white-label pages.

---

## STEP 0 — Repo corrections & preflight (do FIRST)

**0a. Path canonicalization.** Canonical: `/packaging`, `/packaging/master-box`, `/packaging/inner-box`, `/packaging/plastic`, `/packaging/additional-packaging`, `/packaging/white-label`. Correct `CLAUDE.md`'s wrong `/mpackaging/...` entries + typos; ensure nav + `@astrojs/sitemap` reference `/packaging`. Surgical; show a diff before applying.

**0b. Component & dependency preflight.** Verify: Header, Breadcrumbs, HeroSection, Button, Link, Card, **SpecsTable**, **FAQSection** (schema), CTABanner, Footer, StickyWhatsApp, Trust strip. If a **shared** one is missing (esp. `FAQSection`/`SpecsTable`), **STOP and flag** — don't improvise. Forward-reference check on `/products`, `/logistics/*`, `/quality/*`, `/glossary`, `/faq`, `/samples`, `/contact`, the 5 cluster pages; **link to final URLs regardless**, list not-yet-built targets in build notes.

**0c. New components to create** (document in DESIGN.md; extend a close match rather than duplicate):
- **`KeyFactsBox`** (zero JS) — extractable "at a glance" summary.
- **`Figure`** — `<figure>` + `<Image />` + `<figcaption>` (alt + caption via i18n keys).
- **`PhotoGrid`** — static responsive grid of `Figure`s (all in DOM, no carousel/lightbox, no JS).
- **`VideoFacade`** — YouTube facade: custom poster `<Image />` + accessible play button; injects the `youtube-nocookie.com` iframe **only on click** via one **deferred, event-delegated** shared script; the injected iframe fills the **same fixed aspect-ratio box** as the poster (no CLS); degrades to poster + `<a href>` with JS off (§9.3).

**0d. CSP update.** In `/public/_headers`, add `https://www.youtube-nocookie.com` to `frame-src` (keep `img-src 'self'` by using a **local** poster). Verify the exact host resolves in the preview deploy. Show the CSP diff.

Output a plan (repo corrections, CSP diff, components found/missing, components to create, `company.ts` diff incl. `pricing`+`editorial`+`media`+`branding`+`proofing`+`retail`) and **wait for approval** before building.

---

## 1. Search-AI modeling (why this structure)

Transformer answer engines represent *"coconut shisha charcoal packaging / OEM white label / neutral boxes / boxes per container / printing cost / retail packaging"* as a **small taxonomy**: parent (*export packaging for coconut shisha charcoal*) + children resolved individually — **master carton, inner box, primary packaging (inner plastic), ancillary/branded consumables, branding (neutral vs white-label) service**. Naming/defining/separating each child maps onto the model's sub-entities; competitors blend them into prose and lose per-sub-topic citation. Children resolve to commerce/logistics ontology nodes; the **custom-print/white-label** capability is a `Service`; `DefinedTerm`s → glossary sharpen disambiguation. Attention rewards **term → definition → number** proximity (mm, g/kg, units/box, boxes/20ʹ, gsm, MOQ, lead-time days, USD prices). **Image alt + captions and text adjacent to video are extracted; video itself is not** — the on-page summary is the citation surface. The `FAQPage` Q&A surface remains the top format for **AI/GEO citation and Bing** (note: Google restricted FAQ *rich results* to authoritative gov/health domains in 2023 — verify current status; build the FAQ for AI/GEO value regardless, not for Google stars). Parent↔child explicit three ways: prose, links, `CollectionPage hasPart`.

**Competitive gap:** competitors flatten packaging, use generic/no schema, ignore branded consumables, offer no neutral-vs-branded framing, no retail/compliance-markings detail, few structured images, no video-with-text. Hub-and-cluster + correct schema + per-entity anchors + published prices + captioned crawlable media + comparison table + neutral/retail coverage is uncontested ground.

---

## 2. Hard constraints (reject output that violates any)

- **Company facts live only in `/src/config/company.ts`** (add `packaging` with `pricing`, `editorial`, `media`, `branding`, `proofing`, `retail` — §5; add the YouTube channel to `Organization.sameAs`). No fact hardcoded in page/component/i18n/JSON-LD. i18n holds labels/prose/captions/video-summaries, never fact values.
- **Graceful degradation — no raw tokens.** Missing price → i18n "Available on request"; missing spec → omit row / muted "—"; missing editorial/branding/proofing/retail field → omit line; missing photo → local placeholder at correct ratio; missing video → omit slot. Data Gaps lists every empty field/asset.
- **PUBLISH white-label / custom-print prices only** (inner-box per kg; lamination/emboss/UV/foil per ton; strapping per ton; label per ton; double-wall master-box per ton) from `pricing.*`, USD on `priceBasis`, labeled *"White-label / custom-print add-ons. Indicative; last updated [pricesLastUpdated]; confirmed on inquiry."* **Neutral packaging carries no print surcharge.** Never publish the charcoal per-ton price. Price change → `dateModified` updates.
- **NEVER publish banking/financial details.**
- **No `Product`/`Offer` schema** on packaging options — content + `Service` (white-label/custom-print only) + `DefinedTerm`.
- **Synonym discipline.** OEM = ODM = private label = white label → canonical **"white label"**; "(also called private label / OEM)" once. **Neutral = unbranded / plain / generic** → canonical **"neutral packaging"**; "(also called unbranded / plain / generic)" once. Both are `DefinedTerm`s; neutral is **not** white-label and **not** a Service.
- **Neutral ≠ blank:** state that neutral packaging still carries mandatory UN 1361/DG + country-of-origin markings.
- **One comprehensive branding page.** `/packaging/white-label` covers branded packaging end-to-end (incl. artwork specs, retail-print detail, full proof/sample flow). The hub gives **short overviews + links**; do not duplicate that depth here; do not depend on the guide pillar for branding.
- **YouTube via `youtube-nocookie.com` only**, behind the facade; custom local poster; CSP updated. The **only** permitted JS is the deferred, event-delegated facade loader (measure LCP before commit; within 20 KB).
- **Every video needs on-page summary/key-points text** (the GEO surface) + YouTube captions for accessibility. No tabs/accordions/modals hiding content. Galleries static.
- **Media-heavy page → obey §9 guardrails** (AVIF + responsive sizes, lazy-except-hero, explicit dims for CLS, <200 KB/file). Budgets per CLAUDE.md hold (LCP < 2.0s, CLS < 0.1, Lighthouse SEO 100, WCAG 2.2 AA).
- **RTL-safe** (logical properties). **Units:** metric only. **English only** at launch, full SEO head + hreflang + `x-default`.

---

## 3. Page location, content source & i18n

- Build at **`/src/pages/packaging/index.astro`** (facts from `company.ts`, strings from i18n).
- **Add all new user-visible strings to `/src/i18n/en.json`** — headings, "Available on request", "Full details →", indicative-price caveat, E-E-A-T labels, FAQ text, **every `alt` + `<figcaption>`**, **every video title + summary/key-points**, and the neutral / proof-sample / timeline / retail / compliance copy — under clear namespaces. `TODO: translate to {lang}` in inactive-language files. No user-visible string hardcoded in `.astro`.

---

## 4. Page structure (top → bottom) — keep blocks tight; route depth outward

1. **Header** + **Breadcrumbs**: Home › Packaging.
2. **Hero** — H1 (< 60 char) + definition-form lead + primary CTA. **Text-led preferred**; an image hero is the only eager/`fetchpriority="high"` asset.
3. **E-E-A-T / freshness block** — *Last updated [dateModified] · Reviewed by [reviewedBy, role] · [N] min read.* From `editorial.*`; omit reviewer gracefully; reading time computed.
4. **`KeyFactsBox` — "Packaging at a glance"** (pure HTML): configurations (names only — defined once in `company.ts`); master-box options; inner-box options; primary-packaging options; finishes; custom-print MOQ; printing lead-time; master boxes per 20ʹ (loose vs palletized); UN 1361 / DG markings; **neutral & white-label both available**; **retail-ready (buyer-supplied EAN)**; **digital proof + physical sample provided**; **white-label printing prices (headline)**; indicative note. Graceful degradation. No image.
5. **Intro / parent-entity section** — 2–3 definition-form paragraphs (configuration + branding choice + compliance + cost). Note **branding is independent of configuration** (choose layers AND neutral/branded).
6. **Child-entity sections — one per cluster page**, each: anchor ID, H2, definition, 2–4 key facts, **`PhotoGrid` (2–3+ captioned photos)**, **one `VideoFacade` + its on-page summary/key-points (3–5 bullets)**, **"Full details →"** link:
   - **Master box** → `#master-box` → `/packaging/master-box`
   - **Inner box** → `#inner-box` → `/packaging/inner-box`
   - **Primary packaging / inner plastic** → `#plastic` → `/packaging/plastic`
   - **Additional & branded packaging** → `#additional-packaging` → `/packaging/additional-packaging` — stickers, 3D stickers, QR stickers, strapping, branded tape, branded silica gel, **+ palletization + thermal-blanket/container-film wrap**; cross-link `/logistics/rules` (ISPM-15/fumigation + loading weight) and `/logistics/documents`.
   - **White-label / OEM packaging** → `#white-label` → `/packaging/white-label`
7. **Packaging configurations + comparison table** — name the standard combinations (Full = inner plastic + inner box + master box; Standard; plastic-only; master-box-only), then a **required comparison `SpecsTable`**: columns **Configuration · Components included · Best for · Protection level (Low/Med/High)**. Configurations + their attributes defined **once** in `company.ts` (KeyFactsBox/§7/table all read from it).
8. **Branding: neutral vs white-label, custom printing & prices** — concise **overview**, depth linked out:
   - **Neutral (unbranded)** — plain master box / generic inner box / plain plastic (per `branding.neutralScope`); **no printing surcharge**; only the standard 18-ton order MOQ; **still carries mandatory UN 1361/DG + country-of-origin markings**. The fastest, lowest-cost path.
   - **White-label (your brand)** — factory prints buyer artwork; die-line/template + NDA; finishes; custom-print MOQ; **one line** on accepted artwork (print-ready vector, CMYK) → **"Full artwork specs & process →" `/packaging/white-label`**. Do not expand artwork detail here.
   - **Custom-order timeline** — a compact sequence: **digital proof → physical sample → approval → print → production → ship** (durations from `proofing.*`/`customPrint.*`, graceful). Shows why neutral is fast and white-label takes longer.
   - **Proof & sample** — digital proof + physical pre-production sample before the run; **request via the inquiry form or `/samples`**. (Lead-time/cost from `proofing.*`, graceful.)
   - **White-label printing prices** in a small `SpecsTable` (relabeled "white-label / custom-print add-ons", numeric right-aligned, indicative note, "Available on request" fallback). Link to `/packaging/white-label` for depth.
9. **Compliance, shipping & retail markings** — concise:
   - **Compliance (mandatory on every export, neutral or branded)** — UN 1361 / dangerous-goods (Class 4.2) markings + why carriers require them (**authoritative outbound link** to the UN Recommendations on the Transport of Dangerous Goods / IMDG Code — verify URL at build, `rel="noopener"`, fire `outbound_click`); **country-of-origin ("Made in Indonesia"), net weight, batch/lot**. Pallet fumigation → ISPM-15 (authoritative link). Cross-link `/logistics/UN-1361`, `/logistics/documents`.
   - **Retail channel markings (short + link out)** — barcode/EAN (**buyer-supplied, factory-printed**), shelf-ready boxes; brief, then **"Retail-print options →" `/packaging/white-label`**.
   (Container-loadability numbers live in KeyFactsBox OR here, not both.)
10. **FAQ section** (`FAQSection`, `FAQPage`) — §10.
11. **Related topics** — down to all five cluster pages; across to related pillars + `/samples` (§7).
12. **CTABanner** + **Footer** + **StickyWhatsApp**.

---

## 5. `company.ts` data contract

Populate what's known; leave the rest unset (graceful degradation); report all. Also add the YouTube channel URL to the existing `Organization.sameAs`.

```ts
packaging: {
  configurations: [ /* { id, label, components: [...], bestFor: '', protectionLevel: '' } */ ],
  masterBox:   { material: '', wallType: '', outerDimsMm: '', weightOptionsKg: [], printOptions: [] },
  innerBox:    { paperType: '', paperGsm: '', weightOptionsKg: [], finishes: [] },
  primaryPlastic: { type: '', weightOptionsG: [], printable: null, function: '' },
  ancillary: { stickers: null, stickers3d: null, qrStickers: null, strapping: null,
               brandedTape: null, brandedSilicaGel: null, pallets: null, thermalBlanket: null, fscPaper: null },
  customPrint: { moqUnits: '', leadTimeAddDays: '', finishesAvailable: [] },
  containerLoad: { masterBoxesPer20ft: '', netKgPer20ft: '', masterBoxesPer20ftPalletized: '', netKgPer20ftPalletized: '' },
  compliance:  { un1361Marking: null, dgLabels: null, countryOfOrigin: null, netWeightMark: null, batchLot: null },
  retail:      { available: true, barcodeEanByBuyer: true, shelfReadyBox: null },   // [A3/A4]
  pricing: { currency: 'USD', priceBasis: '', pricesLastUpdated: '',                // white-label add-ons only
             innerBoxPrintingPerKgUsd: '', laminationSurchargePerTonUsd: '', embossSurchargePerTonUsd: '',
             uvSpotSurchargePerTonUsd: '', foilSurchargePerTonUsd: '', strappingPerTonUsd: '',
             labelPrintingPerTonUsd: '', doubleWallMasterBoxSurchargePerTonUsd: '' },
  editorial: { author: '', authorRole: '', reviewedBy: '', reviewerRole: '', datePublished: '', dateModified: '' },
  branding: { neutralAvailable: true, whiteLabelAvailable: true, neutralScope: '',
              artworkFormats: [], colorMode: '', pantoneSpot: null, bleedSafeArea: '', prepressBy: '',
              customSizesAvailable: null, foodSafeInks: null, foodSafeInksCert: '', artworkOnFileForReorder: null },
  proofing: { digitalProof: true, physicalSample: true, proofLeadTimeDays: '', sampleLeadTimeDays: '',
              sampleCost: '', sampleCreditedToOrder: null },
  media: {  // [Y1/A6] YouTube refs only; one per area. Absent youtubeId -> slot omitted. Photos are asset imports, not config.
    videos: [
      // { id:'masterbox', area:'master-box', youtubeId:'', posterAsset:'', titleKey:'', summaryKey:'', uploadDate:'', durationISO:'' },
      // ...inner-box, plastic, additional-packaging, white-label
    ],
  },
}
```

> SKU-level math and the per-ton charcoal price belong on SKU pages, not here.

---

## 6. Schema / JSON-LD (validate in Rich Results Test)

- **`CollectionPage`** primary — `hasPart` → five cluster `WebPage` refs (final URLs); `isPartOf` WebSite; `about` packaging; `mainEntity` → FAQ. *(`WebPage` fallback acceptable.)*
- **`BreadcrumbList`** — Home › Packaging.
- **`FAQPage`** — hub-canonical Q/A only (§10). (Value = AI/GEO + Bing; Google rich result not expected — see §1.)
- **`Service`** — **white-label / custom-print capability only** (NOT neutral); `provider` = `Organization`; `areaServed` = USA/UK/Saudi Arabia/Germany/Russia-CIS. Optional `PriceSpecification` for printing prices **only if warning-free**.
- **`DefinedTerm` set** — master box, inner box, primary packaging (inner plastic), **neutral packaging** (alt: unbranded/plain/generic), white label (alt: private label, OEM), UN 1361 marking (may carry `sameAs`/`url` to the authoritative DG reference; optional Wikidata `sameAs` on the coconut-shell-charcoal term); `@id` → glossary anchors.
- **`VideoObject`** — per rendered video (name, description = on-page summary, thumbnailUrl = local poster, **embedUrl = `youtube-nocookie.com` URL**, **uploadDate + duration**). **Valid-or-omit:** emit only when complete and warning-free; omit otherwise (same rule as PriceSpecification).
- **No `Product`/`Offer` anywhere.** IDs absolute, https, no trailing slash. `datePublished`/`dateModified` from `editorial.*`. Keep each type justified; validate all.

---

## 7. Internal linking

- **Down:** all five cluster pages, inline + Related topics (final URLs; forward-refs tracked).
- **Across:** `/products` + shape pages; `/logistics/UN-1361`, `/logistics/documents`, `/logistics/rules`; `/quality/specifications-explained`; **`/samples`** (proof/sample requests); `/glossary` (DefinedTerm anchors + one in-prose link); `/faq`, `/contact`.
- **Branding/retail/artwork depth:** route to `/packaging/white-label`.
- **Authoritative outbound (2 max):** UN/IMDG DG reference; IPPC ISPM-15. `rel="noopener"`, fire `outbound_click`. Place in compliance body, away from CTAs.
- **No orphan:** confirm `/packaging` in main nav and/or footer.

---

## 8. SEO head (per CLAUDE.md)

`<title>` < 60 char; `<meta description>` < 160 char (MOQ/branding framing); canonical (absolute, no trailing slash); OG + Twitter; hreflang + `x-default`; one H1, clean outline; real `dateModified` updated on price change.

---

## 9. Images, galleries & video (media spec)

### 9.1 Per-area media
Each child section: **`PhotoGrid` of 2–3+ curated captioned photos** (up to ~6; exhaustive set on the cluster page — 9.5) **and one `VideoFacade` + on-page summary/key-points** (9.3).

### 9.2 Captions, alt & image SEO
`<figure>` + spec-rich `<figcaption>` on every photo. `alt` descriptive, includes entity name, **not** identical to caption. **Filenames + alt target buyer image-search queries** (e.g. `coconut-charcoal-master-box-loaded-container.avif`, alt "Coconut shisha charcoal master boxes loaded in a 20ft container"). Captions/alt are i18n strings.

### 9.3 VideoFacade = YouTube nocookie facade
- Custom local poster `<Image />` (lazy, explicit dims) + accessible play `<button aria-label>`.
- On click, inject **`https://www.youtube-nocookie.com/embed/{youtubeId}`** via one **deferred, event-delegated** script (only JS on page; measure LCP first); the iframe fills the **same fixed aspect-ratio box** as the poster → no CLS on swap.
- **No autoplay; respect `prefers-reduced-motion`;** move focus into the player on activation.
- **Graceful degradation:** JS off → poster `<img>` **+ real `<a href="https://www.youtube.com/watch?v={youtubeId}">`** fallback. No dead elements.
- **On-page text (required, the GEO surface):** title + 3–5 key-points bullets beside each video (i18n `titleKey`/`summaryKey`). YouTube captions/transcript are for accessibility + YouTube SEO and do **not** replace this.
- **Absent `youtubeId` → omit the slot** + log it. Never fake a video.

### 9.4 Performance guardrails (hard)
AVIF + WebP; responsive `srcset`/`sizes`; <200 KB/file; grid sources ≤ 800px; hero ≤ 1920px. Only hero (+ ≤1 above-the-fold image) eager; every gallery photo + every poster `loading="lazy"` + `decoding="async"`. Explicit `width`/`height` (or aspect-ratio box) everywhere → CLS < 0.1. The <500 KB budget = HTML+CSS+JS+above-the-fold images; lazy media is outside it but still optimized. Galleries static; facade script is the only JS.

### 9.5 Hub vs cluster
Hub = **curated** subset (2–6 strongest, varied angles); cluster page = **exhaustive** set. Different photos/crops + different captions/alt between the two URLs.

### 9.6 Aspect ratios
Packaging photos **4:3**; video posters **16:9**; hero per DESIGN.md. Placeholders from `/src/assets/placeholders/` at correct ratios for every photo slot; photo sources under `/src/assets/packaging/…`.

### 9.7 Media manifest (minimum slots — more is better)
- **Master box** — closed branded carton (3/4) · open showing inner boxes · stacked/palletized or in-container · print/DG-marking detail · *video:* assembly & sealing.
- **Inner box** — branded front (3/4) · open showing wrapped charcoal · size range side-by-side · finish macro · *video:* forming/printing or hand-pack.
- **Primary plastic** — sealed pack (500 g/1 kg) · printed-logo pack · cubes visible in pack · *video:* wrap/shrink.
- **Additional & branded** — sticker/label sheet · 3D domed sticker macro · QR sticker on box · branded sealing tape · branded silica sachet · strapping on carton · shrink-wrapped pallet · thermal-blanket/film lining · *video:* container loading with blanket + strapping.
- **White-label / OEM** — blank-vs-branded before/after (also illustrates **neutral**) · full branded set together · die-line/artwork template render · anonymized buyer-brand example · *video:* OEM process (design → print → pack).

Each manifest entry (Data Gaps): area, subject, angle, aspect ratio, alt key, caption key, max source dimension; videos: YouTube ID, poster asset, summary key, uploadDate, duration, caption/transcript status.

---

## 10. FAQ content & dedup (one Q/A = one FAQPage home)

**Hub-canonical (`FAQPage` here):** 1) options offered? 2) own brand (white label / OEM)? 3) **do you offer neutral/unbranded packaging?** (note: still carries DG + origin markings) 4) cost of custom-printed packaging? (white-label add-ons) 5) MOQ for custom-printed packaging? 6) **do you send a digital proof and physical sample before printing?** 7) printing lead-time / full custom-order timeline? 8) master boxes per 20ʹ? 9) die-line/template provided? 10) finishes? 11) **can you print my retail barcode/EAN, country-of-origin, net weight?** (EAN buyer-supplied) 12) UN 1361 / DG markings printed? 13) design confidentiality?
**/faq-canonical (link only, no FAQPage here):** general order MOQ (18 t), payment terms, general "mix sizes/products in a container." Never schema a question in both places.

---

## 11. Content coverage gate (not done until all satisfied)

- [ ] Parent entity defined in first 100 words; E-E-A-T/freshness block present; branding-independent-of-configuration noted.
- [ ] Five child entities: anchor, definition, key facts, **PhotoGrid (2–3+ captioned)**, **VideoFacade + on-page key-points (or omitted+logged)**, down-link.
- [ ] `KeyFactsBox` present — specs + container math + white-label prices + neutral/white-label + retail (buyer EAN) + proof/sample.
- [ ] Configurations comparison table present (Components · Best for · **Protection level**); configs sourced once from `company.ts`.
- [ ] Branding overview tight: neutral (no surcharge, 18 t MOQ, still has DG+origin markings) AND white-label; **custom-order timeline** present; proof+sample with **inquiry + `/samples`** routes; white-label prices labeled "custom-print add-ons" with graceful fallback; artwork = one line + link to white-label.
- [ ] Additional-packaging covers branded consumables + pallets + thermal blanket, cross-linked to logistics.
- [ ] Compliance: UN 1361/DG (+ authoritative link) + country-of-origin + net weight + batch/lot (mandatory framing); retail markings short + link out; charcoal price NOT shown; no banking anywhere.
- [ ] FAQ ≥10 hub-canonical Q/A with valid `FAQPage`; general Qs are links only.
- [ ] Every photo: `<figcaption>` + distinct query-aligned `alt` + descriptive filename + explicit dims + AVIF + lazy (hero exempt).
- [ ] VideoFacade: nocookie embed, no autoplay, no-CLS swap, no-JS fallback (poster + `<a>`), on-page key-points; `VideoObject` valid-or-omit (uploadDate+duration).
- [ ] Cross-links to Products, Logistics (UN-1361 + documents + rules), Quality, Samples, Glossary; branding/retail/artwork depth → white-label; ≤2 authoritative outbound links.
- [ ] Schema validates: CollectionPage + BreadcrumbList + FAQPage + Service (white-label only) + DefinedTerm (incl. neutral) (+ VideoObject where complete, + PriceSpecification if warning-free); NO Product/Offer.
- [ ] No raw `[[token]]`; all strings/captions/summaries in i18n; zero hardcoded facts/prices.
- [ ] `CLAUDE.md` paths corrected; CSP updated for youtube-nocookie; nav + sitemap reference `/packaging`; YouTube channel added to `Organization.sameAs`.

---

## 12. Data Gaps report (mandatory)

List every unpopulated `company.ts` `packaging.*` field by exact key (incl. `pricing.*`, `editorial.*`, `branding.*` [neutralScope, artworkFormats, colorMode, pantoneSpot, bleedSafeArea, prepressBy, customSizesAvailable, foodSafeInks, **foodSafeInksCert**, artworkOnFileForReorder], `proofing.*` [lead-times, sampleCost, sampleCreditedToOrder], `compliance.*`, `retail.*`, `media.videos[*]` [YouTube IDs, posters, summaries, uploadDate, duration, **caption/transcript status**]); the full media manifest (§9.7); any FAQ answer depending on a missing fact/price; the two authoritative outbound URLs to verify; the YouTube channel URL for `Organization.sameAs`; architectural dependencies (§14).

---

## 13. Post-build verification (all three; Lighthouse alone NOT sufficient)

1. **Extractability (JS disabled):** H1, E-E-A-T block, KeyFactsBox (incl. prices), every child-entity definition + numbers, comparison table, branding overview (neutral + white-label + timeline + proof/sample), compliance + retail markings, white-label price table, every gallery image with `<figcaption>`+`alt`, **and each video's on-page key-points** all present in raw HTML. Each VideoFacade shows poster `<img>` + `<a>` fallback. No `[[token]]`.
2. **Rich Results Test:** CollectionPage/WebPage, BreadcrumbList, FAQPage, Service, DefinedTerm, VideoObject (where present), any PriceSpecification — zero errors/warnings; no Product/Offer.
3. **`npm run build`:** clean. Confirm the **YouTube embed renders** in a preview deploy (CSP allows nocookie; no CLS on play); measure LCP after the facade script; confirm CLS < 0.1 with all images loaded; only hero eager. Lighthouse (Perf ≥95 mobile, A11y ≥95, Best Practices ≥95, SEO 100) as a floor.

---

## 14. Out of scope / dependencies (name, don't solve)

- Five cluster pages = separate prompts; hub links to final URLs now.
- `/packaging/white-label` is the single comprehensive branding page (artwork specs, retail-print detail, full proof/sample flow live there); fate of `/guide/private-label-options` + `/guide/how-to-start-your-own-brand` (fold / redirect / keep thin) is a downstream guide-pillar decision.
- **`/samples` must accommodate packaging proof/sample requests** (since requests route there + inquiry) — confirm the samples page/flow covers packaging, or the inquiry path captures it.
- SKU-page packaging math + per-ton charcoal price is a dependent SKU-page decision.
- Price editing is **commit-based** by default; CMS-editable pricing via Sveltia is a separate task.
- Each YouTube video needs **captions/a transcript** produced and uploaded (tracked in Data Gaps).

---

## Conversion & analytics

CTAs reuse the **sitewide** inquiry form + WhatsApp components (no packaging-specific variants); pre-fill packaging context (inquiry category/subject = packaging; WhatsApp prefilled message). Fire CLAUDE.md events on **GA4 + Meta Pixel** via existing components: `whatsapp_click` (`source_page`, `source_component`), `inquiry_submit` (`product_category` = packaging + standard params), `outbound_click` (authoritative links, cert/doc/external), `scroll_75`, `engaged_time`. Do not reimplement tracking. *(Optional `video_play` on facade activation only if it fits the existing event schema.)*

---

## Working style

Before code: restate understanding + assumptions; flag any conflict with `CLAUDE.md`/`DESIGN.md`/existing components; deliver the Step 0 plan (repo corrections, CSP diff, preflight result, components to create, `company.ts` diff incl. `pricing`+`editorial`+`media`+`branding`+`proofing`+`retail`); **wait for approval**. Surgical changes only.
