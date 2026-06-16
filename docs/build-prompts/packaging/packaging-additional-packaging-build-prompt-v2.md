# Build Prompt — `/packaging/additional-packaging` Cluster Page (v2)

> **Delta on `packaging-hub-build-prompt-v6`.** Everything in v6 applies unchanged; carries the settled cluster template (full E-E-A-T, `WebPage` primary, `VideoObject` canonical on the cluster page, interleaved photos). The uncontested-ground page: no competitor covers branded consumables at all.
> **Changelog from v1 (gap-pass fixes):**
> - **[A1]** **Printed box labels** added as a Group 1 item — the lower-cost branding alternative to printing the master carton directly; master-box prompt gets a one-line cross-link addendum (§10). Labels join strapping in the **pricing-consistency flag**.
> - **[A2]** **Glossary dependency** surfaced: the glossary predates this cluster — the ~7 packaging `DefinedTerm` anchors must be added to `/glossary` (§10).
> - **[B1]** **No-spec-table guard:** consumable specs (sticker sizes, tape widths, label dims) are **made-to-order** — do NOT invent a spec table; route specifics to inquiry.
> - **[B2]** **Inserts follow the we-print-don't-design rule** — buyer supplies artwork.
> - **[B3]** **Container-level desiccant** (poles/blankets hung in the container) added as optional placeholder beside carton sachets.
> - **[B4]** **Plain-vs-branded notes** for tape / silica / strapping (plain defaults exist).
> - **[B5]** The area video covers Groups 2–3 (loading/strapping/blanket); **Group 1 is carried by photos** — an optional second video (sticker application / unboxing macro) is P2, not required.
> - **[C1]** FAQ minimum (≥7) added to the gate. **[C2]** `/quality` link deliberately omitted (not relevant to add-ons).
>
> **Decisions baked in:** scope = stickers, 3D domed, QR (anti-counterfeit framing), hologram/security, branded tape, branded silica, inserts/leaflets/cards, **box labels** + strapping, edge protectors, pallets + desiccant (sachet + container), thermal blanket. **QR honesty guard:** we print buyer-supplied QR codes; the verification system is the buyer's. **All add-on prices on request** — this page publishes no prices.
>
> **⚠ Pricing-consistency flag:** `pricing.strappingPerTonUsd` and `pricing.labelPrintingPerTonUsd` exist in the v6 contract and render in the hub's published table — yet both items now live on this all-on-request page. Resolution at fill-time: **leave the fields empty** → "Available on request" sitewide (consistent), or populate → price shows on hub/master-box while this page routes to inquiry (livable). Note in the build plan and Data Gaps.
>
> **Scope:** Build only `/packaging/additional-packaging`. Links **up** to `/packaging` and **across** to siblings (final URLs, track forward-refs).

---

## 0. Inherited from v6 (apply as-is)

Components (`KeyFactsBox`, `Figure`, `PhotoGrid`, `VideoFacade` — reuse; STOP+flag if missing); Step-0 preflight; CSP includes `youtube-nocookie.com` (verify); facts only from `company.ts`; graceful degradation (no raw `[[token]]`; missing fact → omit/"—"; missing photo → placeholder; missing video → omit slot); **never the charcoal per-ton price**; **no banking**; **no `Product`/`Offer`**; synonyms; zero client JS except the deferred YouTube facade; AVIF + responsive + lazy-except-hero + explicit dims (CLS); RTL-safe; metric units; English-only + full hreflang; **full E-E-A-T block**; sitewide CTA/WhatsApp with packaging pre-fill + standard analytics; three-part verification (JS-off extractability, Rich Results, build + LCP/CLS + Lighthouse floor).

---

## 1. Competitive grounding (add-ons / branded consumables)

glowingcharcoal: strapping + full-color box labels only; charcoal.pro: thermal-blanket/film container wrap; djavacoal: nothing. **Nobody covers branded stickers, 3D domed stickers, QR/authenticity stickers, hologram/security stickers, branded tape, branded silica, or inserts — and nobody frames an anti-counterfeit set for charcoal brands.** This page owns the branded-consumables entity and the brand-protection angle with zero competition; on labels it matches glowingcharcoal and beats it on structure.

---

## 2. Page identity & SEO head

- **URL:** `/packaging/additional-packaging`
- **H1** (< 60 char): e.g. *"Coconut Charcoal Packaging Add-Ons & Branded Stickers"*.
- `<title>` < 60, `<meta description>` < 160 (branded consumables / anti-counterfeit / load-securing framing).
- Canonical (absolute, no trailing slash); OG + Twitter; hreflang + `x-default`.
- **Breadcrumbs:** Home › Packaging › Additional packaging (current item not linked).
- One H1; clean outline; real `dateModified`.

---

## 3. Page structure (top → bottom) — three functional groups; interleave photos within their sections

1. **Header** + **Breadcrumbs**.
2. **Hero** — H1 + **definition-form lead** ("Packaging add-ons are the optional layers beyond the standard plastic–box–carton stack: branded consumables, load securing, and transit protection…") + primary CTA. **Up-link to `/packaging` in the first paragraph.**
3. **Full E-E-A-T block** — Last updated · Reviewed by [reviewer, role] · [N] min read.
4. **`KeyFactsBox` — "Add-ons at a glance"** (extractable): the three groups named; the anti-counterfeit set (QR / hologram / 3D domed); branded consumables list (incl. box labels); strapping + edge protectors; pallet type + ISPM-15; desiccant (sachet + container-level); thermal blanket; **all add-on pricing on request**; **specs made-to-order**. Graceful degradation.
5. **The three groups** — short orientation: **(1) branding & anti-counterfeit consumables**, **(2) load securing**, **(3) transit protection**. One sentence each; anchors to the sections below.

**Group 1 — Branding & anti-counterfeit consumables** (anchor `#branded-consumables`)
> Consumable specs (sticker sizes/shapes, tape widths, label dimensions, insert formats) are **made to the buyer's order** — describe capability, do NOT invent spec tables; specifics route to inquiry. All Group 1 items are printed from **buyer-supplied artwork** (we provide templates where relevant; we print, we don't design).
6. **Branded stickers & labels** — printed stickers with the buyer's brand (`ancillary.stickers`). *(Figure: ★ branded sticker/label sheet.)*
7. **3D domed stickers** — resin/domed stickers for a premium tactile brand mark; hard to replicate cheaply (`ancillary.stickers3d`). *(Figure: 3D domed sticker macro.)*
8. **QR stickers (authenticity)** — QR codes let *your* customers verify authenticity or reach your brand; **we print buyer-supplied QR codes — the landing/verification system is the buyer's** (`ancillary.qrStickers`). *(Figure: QR sticker on an inner box.)*
9. **Hologram / security stickers** — tamper-evident, hard-to-counterfeit security marks (`ancillary.hologramStickers`). *(Figure: hologram sticker detail.)*
   > **The anti-counterfeit set:** present QR + hologram + 3D domed together as a brand-protection toolkit for premium charcoal brands — protecting a white-label brand is part of owning one → one link to `/packaging/white-label`.
10. **Printed box labels [A1]** — full-color labels applied to the master carton: the **lower-cost, fast-turnaround branding alternative to printing the carton directly** (suits smaller runs and mixed containers) (`ancillary.boxLabels`) → cross-link `/packaging/master-box` (direct-print option). *(Figure: branded box label applied to a carton.)*
11. **Branded tape** — printed sealing tape on the master carton; plain tape is the default (`ancillary.brandedTape`). *(Figure: branded sealing tape on carton.)*
12. **Branded silica gel** — desiccant sachets carrying the buyer's brand; plain sachets are the default (`ancillary.brandedSilicaGel`); the *function* is covered in Group 3. *(Figure: branded silica sachet.)*
13. **Inserts, leaflets & cards** — printed inserts inside the inner box (care/usage cards, brand story, warranty/authenticity cards), from buyer-supplied artwork (`ancillary.inserts`). *(Figure: insert/leaflet in an inner box.)*

**Group 2 — Load securing** (anchor `#load-securing`)
14. **Strapping** — PP strapping on master cartons for stack stability; functional (plain) by default (`ancillary.strapping`). *(Figure: strapped carton.)*
15. **Edge protectors / corner boards** — protect carton edges under strapping and pallet loads (`ancillary.edgeProtectors`). *(Figure: edge protectors on a pallet stack.)*
16. **Palletization** — optional palletized loading vs loose; wood vs plastic (`ancillary.palletType`); **wood pallets are ISPM-15 heat-treated/certified** (`ancillary.ispm15`) — authoritative outbound link to IPPC ISPM-15 (`rel="noopener"`, `outbound_click`); loose-vs-palletized container counts live on the hub/master-box → **link, don't duplicate**; cross-link `/logistics/rules`. *(Figure: shrink-wrapped pallet.)*

**Group 3 — Transit protection** (anchor `#transit-protection`)
17. **Desiccant / silica gel (the function)** — absorbs residual humidity over sea transit at two levels: **sachets inside the cartons** (`ancillary.desiccantIncluded` — standard in every order? placeholder) and **container-level desiccant** (poles/blankets hung in the container, `ancillary.containerDesiccant`, optional). Branded sachets = Group 1. The layered moisture story: **inner plastic = primary barrier → desiccant absorbs what's left → thermal blanket handles condensation** → link `/packaging/plastic`.
18. **Thermal blanket / container film wrap** — lines the container against condensation ("container rain") and temperature swings on long transits (`ancillary.thermalBlanket`); when it's recommended (long routes, climate transitions). *(Figure: thermal-blanket/film-lined container.)*

**Close**
19. **How to order add-ons** — all add-ons are ordered **with your container order** (not standalone); **all prices on request** — confirmed on inquiry/WhatsApp (single CTA line; no price table on this page).
20. **Video** — the additional-packaging `VideoFacade` (container loading with thermal blanket + strapping/palletizing; same `youtubeId` as the hub) + on-page **title + 3–5 key-points** + **transcript** (canonical home — §4/§10). *(Note: the video covers Groups 2–3; Group 1 is carried by the photo set. An optional second video — sticker application / unboxing macro — is P2, not required for launch.)*
21. **FAQ** (`FAQSection`, `FAQPage`) — page-specific (§6).
22. **Related topics** — up to `/packaging`; across to `/packaging/master-box`, `/packaging/inner-box`, `/packaging/plastic`, `/packaging/white-label`; plus `/logistics/rules` + `/logistics/documents`, `/products`, `/glossary` (branded-consumables term), `/samples`, `/contact`. *(`/quality` deliberately omitted — not relevant to add-ons.)*
23. **CTABanner** + **Footer** + **StickyWhatsApp**.

---

## 4. Schema / JSON-LD (lean — no Service, no Product)

- **`WebPage`** primary (locked cluster type) — `isPartOf` WebSite; `about` → "branded consumables" `DefinedTerm`; `mainEntity` → FAQ; `author` (Person) + `datePublished`/`dateModified` from `editorial.*`.
- **`BreadcrumbList`** — Home › Packaging › Additional packaging.
- **`FAQPage`** — page-specific Q/A only (§6).
- **`DefinedTerm`** — "branded consumables" (alternateName "packaging add-ons"); `@id` → `https://muliacharcoal.com/glossary#branded-consumables`. **(Glossary must gain this anchor — §10.)**
- **`VideoObject`** — the additional-packaging video. **Canonical on this page**; the hub embeds it **without** `VideoObject`.
- **No `Product`/`Offer`. No `Service`.**

---

## 5. `company.ts` — additions under `ancillary` (the only new keys; NO new pricing keys)

Reuses the existing v6 contract (`editorial`, `media.videos[additional]`, `branding.neutralScope`). Additions under `ancillary`:

```ts
ancillary: {
  stickers: null, stickers3d: null, qrStickers: null,
  hologramStickers: null,   // security/tamper-evident stickers
  inserts: null,            // leaflets / cards / inserts in the inner box
  boxLabels: null,          // NEW [A1] — printed labels applied to the master carton
  brandedTape: null, brandedSilicaGel: null,
  desiccantIncluded: null,  // plain sachets standard in every order?
  containerDesiccant: null, // NEW [B3] — container-level poles/blankets
  strapping: null,
  edgeProtectors: null,     // corner boards / edge protection
  pallets: null,
  palletType: '',           // wood / plastic / both
  ispm15: null,             // wood pallets heat-treated/ISPM-15 certified
  thermalBlanket: null,
  fscPaper: null,
}
```

**No pricing fields added or rendered on this page** — every add-on cost routes to inquiry ("Available on request" + CTA). Note the **strapping + labels consistency flag** from the header in the build plan. **No consumable spec tables** — capability prose only.

---

## 6. FAQ (page-specific; `FAQPage` here; ≥7)

1. What packaging add-ons do you offer?
2. How can I protect my brand from counterfeits? *(QR authenticity + hologram + 3D domed — we print buyer-supplied codes; the verification system is yours)*
3. Can the stickers, tape, and silica gel carry my brand? *(plain defaults exist)*
4. Can you apply printed box labels instead of printing the carton? *(yes — the lower-cost branding route; direct print → master-box page)*
5. Do you include desiccant / silica gel as standard — and do you offer container-level desiccant?
6. Can you add inserts, leaflets, or cards inside the boxes? *(from your artwork)*
7. Do you palletize — wood or plastic, and is it ISPM-15 compliant?
8. What is the thermal blanket / container film wrap, and when do I need it?
9. How much do these add-ons cost? *(available on request — confirmed on inquiry)*

**Dedup:** "how many master boxes per 20ʹ container" and "how much does custom-printed packaging cost" → **hub-canonical** (link, no schema here). General order MOQ / payment → `/faq` (link only).

---

## 7. Media manifest (exhaustive — interleaved, not one grid)

4:3 photos (16:9 video poster); query-aligned filenames + i18n caption/alt; **go-live minimum = ★**; rest P1; curated subset also on the hub (different crops/captions). Sources under `/src/assets/packaging/additional/`.

- ☐ ★ Branded sticker / label sheet
- ☐ 3D domed sticker macro
- ☐ QR authenticity sticker on an inner box
- ☐ Hologram / security sticker detail
- ☐ **Branded box label applied to a master carton** *(new)*
- ☐ Branded sealing tape on a carton
- ☐ Branded silica sachet
- ☐ Insert / leaflet / card in an inner box
- ☐ Strapped carton (strapping detail)
- ☐ Edge protectors / corner boards on a pallet stack
- ☐ Shrink-wrapped pallet
- ☐ Thermal-blanket / film-lined container

**Video:** container loading with thermal blanket + strapping/palletizing (`youtube-nocookie` facade, custom 16:9 poster, on-page title + 3–5 key-points, **transcript here**). Reuse the hub's `additional` `media.videos` entry; `VideoObject` lives on this page. *(Optional P2: a second video — sticker application / unboxing macro.)*

---

## 8. Content coverage gate (not done until all satisfied)

- [ ] Definition-form first sentence; up-link to `/packaging` in the first paragraph; full E-E-A-T block.
- [ ] `KeyFactsBox` with the three groups, anti-counterfeit set, consumables list (incl. box labels), pallets + ISPM-15, desiccant (sachet + container), thermal blanket, **all-prices-on-request**, **specs made-to-order**.
- [ ] All thirteen items covered, each with a definition line + key fact + figure: stickers, 3D domed, QR (**buyer-owns-verification guard**), hologram, **box labels (alternative-to-direct-print framing + master-box cross-link)**, branded tape (plain default), branded silica (plain default), inserts (**buyer-supplied artwork**); strapping, edge protectors, palletization (wood/plastic + ISPM-15 + authoritative link); desiccant (sachet + **container-level**) + thermal blanket (layered moisture story → plastic).
- [ ] Anti-counterfeit set framed as a brand-protection toolkit, one link to white-label.
- [ ] **No consumable spec tables** — capability prose; specifics route to inquiry.
- [ ] Container counts NOT duplicated (link hub/master-box); charcoal per-ton price NOT shown; **no price table — all costs route to inquiry**; no banking.
- [ ] "Ordered with your container order, not standalone" stated.
- [ ] Photos interleaved (captions + query-aligned alt + explicit dims + AVIF + lazy, hero exempt); video facade (no-CLS swap + no-JS fallback + on-page key-points); **`VideoObject` here, hub omits it**.
- [ ] FAQ **≥7** page-specific with valid `FAQPage`; hub-canonical Qs linked, not duplicated; general Qs link `/faq`.
- [ ] Links: up to `/packaging`; across to all four siblings; logistics (rules + documents), products, glossary, samples, contact; ≤1 authoritative outbound (ISPM-15). *(/quality deliberately omitted.)*
- [ ] Schema validates: **`WebPage`** + BreadcrumbList + FAQPage + DefinedTerm (+ VideoObject); NO Product/Offer/Service.
- [ ] No raw `[[token]]`; strings/captions/key-points in i18n; no hardcoded facts; `dateModified` set.

---

## 9. Data Gaps report (additional-packaging subset)

List unpopulated keys this page needs: `ancillary.*` **including `hologramStickers`, `inserts`, `boxLabels`, `desiccantIncluded`, `containerDesiccant`, `edgeProtectors`, `palletType`, `ispm15`**; `editorial.*`; the `additional` video (YouTube ID, poster, key-points, uploadDate, duration, **transcript**); the 12 photos (§7); the IPPC ISPM-15 URL. **Restate the strapping + labels pricing-consistency flag** (populate and accept the split, or leave empty to unpublish sitewide).

---

## 10. Hub & cross-prompt dependencies (batch into one consolidated revision)

- For every cluster video, **remove `VideoObject` from the hub's embed**; keep each hub child *section* short. *(Optional: the hub's additional-packaging line mentions the anti-counterfeit set — one phrase.)*
- **Master-box prompt addendum [A1]:** its printing section gains one line — "or apply **printed box labels** as a lower-cost alternative → `/packaging/additional-packaging#branded-consumables`."
- **Glossary extension [A2]:** add the packaging `DefinedTerm` anchors the cluster points at — `#master-box`, `#inner-box`, `#inner-plastic`, `#white-label`, `#neutral-packaging`, `#un-1361` (if not present), `#branded-consumables` — each with a definition-form entry. Without this, every cluster `DefinedTerm` `@id` targets a non-existent anchor.
- Resolve the **strapping/labels pricing flag** consistently across hub / master-box / this page.

---

## Working style

Inherit v6's working style. Before code: restate understanding + assumptions (incl. the pricing flag, the QR guard, and the no-spec-table rule); confirm inherited components exist; flag conflicts; give a short plan (the three groups, photo/video interleave, the `ancillary` additions, and the batched hub/glossary/master-box edits); **wait for approval**. Surgical changes only.
