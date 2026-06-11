# Build Prompt — `/packaging/plastic` Cluster Page (v2)

> **Delta on `packaging-hub-build-prompt-v6`.** Everything in v6 applies unchanged; carries the settled cluster template (full E-E-A-T, `WebPage` primary, representative-holds, `VideoObject` canonical on the cluster page, interleaved photos) and the box-page lessons (representative-holds tied to a shared reference SKU; don't over-spec fields that don't apply).
> **Changelog from v1:** removed **vacuum / nitrogen-flush** ("gas") everywhere — not offered.
> **Remaining scope assumptions to confirm/trim in the gap-pass** (optional fields that degrade out if not offered): **foil / metallized barrier** film, and **printed (vs clear) plastic**. **No gross-weight field** — film weight is negligible against the charcoal, so net (pack size) is the only weight.
>
> **Scope:** Build only `/packaging/plastic`. Links **up** to `/packaging` and **across** to siblings (final URLs, track forward-refs).

---

## 0. Inherited from v6 (apply as-is)

Components (`KeyFactsBox`, `Figure`, `PhotoGrid`, `VideoFacade` — reuse; STOP+flag if missing); Step-0 preflight; CSP includes `youtube-nocookie.com` (verify); facts only from `company.ts`; graceful degradation (no raw `[[token]]`; missing price → "Available on request"; missing spec → omit/"—"; missing photo → placeholder; missing video → omit slot); **publish white-label/custom-print prices only**, never the charcoal per-ton price; **no banking**; **no `Product`/`Offer`**; synonyms; zero client JS except the deferred YouTube facade; AVIF + responsive + lazy-except-hero + explicit dims (CLS); RTL-safe; metric units; English-only + full hreflang; **full E-E-A-T block**; sitewide CTA/WhatsApp with packaging pre-fill + standard analytics; three-part verification (JS-off extractability, Rich Results, build + LCP/CLS + Lighthouse floor).

---

## 1. Competitive grounding (inner plastic)

glowingcharcoal: inner plastic 500 g / 1 kg, protects from humidity/dust, can print a logo; charcoal.pro: inner plastic bags; djavacoal doesn't break it out. **No dedicated primary-packaging page anywhere, and none details material, microns, seal, or barrier performance** — open ground. This page also anchors the moisture-protection story the inner-box page defers to it. Match their depth, beat them on structure.

---

## 2. Page identity & SEO head

- **URL:** `/packaging/plastic`
- **H1** (< 60 char): e.g. *"Coconut Charcoal Inner Plastic (Primary Packaging)"*.
- `<title>` < 60, `<meta description>` < 160 (primary packaging / moisture barrier framing).
- Canonical (absolute, no trailing slash); OG + Twitter; hreflang + `x-default`.
- **Breadcrumbs:** Home › Packaging › Inner plastic (current item not linked).
- One H1; clean outline; real `dateModified`.

---

## 3. Page structure (top → bottom) — interleave photos within their sections

1. **Header** + **Breadcrumbs**.
2. **Hero** — H1 + **definition-form lead** ("The inner plastic is the primary packaging — the first sealed layer that holds and protects the coconut shisha charcoal from moisture and dust…") + primary CTA. **Up-link to `/packaging` in the first paragraph.**
3. **Full E-E-A-T block** — Last updated · Reviewed by [reviewer, role] · [N] min read.
4. **`KeyFactsBox` — "Inner plastic at a glance"** (extractable): material; thickness (microns); seal type; clear vs printed; weight/size options (net charcoal per pack); **representative holds example**; barrier function (moisture + dust); **foil/metallized barrier** (if offered); neutral & branded both. Graceful degradation.
5. **Definition & role in the packaging hierarchy** — primary packaging = the first layer touching the charcoal and the **moisture/dust barrier**; it's what the inner box holds (the box is presentation, the plastic is protection) → link `/packaging/inner-box` and `/packaging/master-box`. *(Optional: reuse the packaging-hierarchy diagram — master box ▸ inner box ▸ inner plastic ▸ charcoal.)* *(Figure: sealed pack; Figure: plastic-wrapped charcoal going into an inner box.)*
6. **Material, thickness & seal** — material (`primaryPlastic.material`: PE / PP / laminated / metallized foil); thickness (`thicknessMicrons`); seal type (`sealType`, e.g. heat-sealed); clear vs printed (`clearOrPrinted`). *(Figure: seal detail; Figure: clear pack showing cubes inside.)*
7. **Sizes & what it holds** — weight/size options (`weightOptionsG`, = net charcoal per pack) and a **representative holds example** (`holdsExample`) tied to the **same reference SKU used on the box pages** (e.g. "a 1 kg pack of 25 mm cubes holds ~N pieces"); exact counts vary by cube size/shape → SKU pages; link `/products`. *(Figure: size range / scale reference.)*
8. **Barrier performance & protection** — how the plastic protects against humidity and dust over 4–8 weeks of sea transit; the master box is structural, the **plastic is the moisture barrier**, and desiccant / thermal-blanket add a further layer → cross-link `/packaging/additional-packaging` (silica gel / thermal blanket) and `/logistics/documents` (transit). *(Figure: sealed pack emphasising the barrier.)*
9. **Upgrade — foil / metallized barrier** *(optional; render only if offered)* — foil/metallized barrier film for premium moisture/light protection (`foilBarrier`). *(Figure: foil/metallized pack.)*
10. **Branding on the plastic** — clear film shows the product (retail appeal) vs printed-logo film (`printable` / `clearOrPrinted`); printed plastic → **"Full white-label & artwork specs →" `/packaging/white-label`**. Plastic printing cost (if any) is a white-label/custom-print add-on (`pricing.plasticPrintingPerKgUsd`, graceful "Available on request"). *(Figure: printed-logo pack.)*
11. **Neutral vs branded** — plain/clear plastic vs printed-logo plastic; link `/packaging/white-label`. A line: **request a sample** via the proof/sample flow (inquiry or `/samples`).
12. **Video** — the plastic `VideoFacade` (wrap / shrink / seal step; same `youtubeId` as the hub) + on-page **title + 3–5 key-points** + the page's **transcript** (canonical home — §4/§10).
13. **FAQ** (`FAQSection`, `FAQPage`) — plastic-specific (§6).
14. **Related topics** — up to `/packaging`; across to `/packaging/inner-box`, `/packaging/master-box`, `/packaging/white-label`, `/packaging/additional-packaging`; plus `/products`, `/logistics/documents`, `/quality/specifications-explained`, `/glossary` (primary-packaging term), `/samples`, `/contact`.
15. **CTABanner** + **Footer** + **StickyWhatsApp**.

---

## 4. Schema / JSON-LD (lean — no Service, no Product)

- **`WebPage`** primary (locked cluster type) — `isPartOf` WebSite; `about` → "primary packaging" `DefinedTerm`; `mainEntity` → FAQ; `author` (Person) + `datePublished`/`dateModified` from `editorial.*`.
- **`BreadcrumbList`** — Home › Packaging › Inner plastic.
- **`FAQPage`** — plastic-specific Q/A only (§6); **not** the container-count or general cost Qs (hub-canonical).
- **`DefinedTerm`** — "primary packaging" (alternateName "inner plastic", "poly bag"); `@id` → `https://muliacharcoal.com/glossary#inner-plastic`.
- **`VideoObject`** — the plastic video (name, description = on-page key-points, thumbnailUrl = local poster, embedUrl = `youtube-nocookie.com`, uploadDate + duration). **Canonical on this page**; the hub embeds it **without** `VideoObject`.
- **No `Product`/`Offer`. No `Service`.**

---

## 5. `company.ts` — additions to `primaryPlastic` (the only new keys)

Reuses the existing v6 contract (`branding.{neutralScope, customSizesAvailable}`, `ancillary.{thermalBlanket, brandedSilicaGel}` for cross-reference, `editorial`, `media.videos[plastic]`, and `pricing.plasticPrintingPerKgUsd` if printed plastic is priced). Additions under `primaryPlastic`:

```ts
primaryPlastic: {
  type: '',                  // existing — e.g. "heat-sealed poly bag"
  material: '',              // NEW — PE / PP / laminated / metallized foil
  thicknessMicrons: '',      // NEW
  sealType: '',              // NEW — e.g. heat-sealed
  printable: null,           // existing boolean
  clearOrPrinted: '',        // NEW — clear / printed / both
  weightOptionsG: [],        // existing — NET charcoal per pack, e.g. [500, 1000]
  holdsExample: '',          // NEW — representative, SAME reference SKU as the box pages
  function: '',              // existing — "moisture + dust barrier"
  foilBarrier: null,         // NEW (optional) boolean — metallized/foil barrier film
}
```

Add `pricing.plasticPrintingPerKgUsd` (optional) if printed plastic is a priced add-on; else route to inquiry. No charcoal per-ton price; no gross-weight field for plastic.

---

## 6. FAQ (plastic-specific; `FAQPage` here)

1. What is the inner plastic / primary packaging?
2. What material and thickness (microns) do you use?
3. Is the plastic clear, or can it be printed with my logo?
4. How much charcoal does each plastic pack hold? *(representative, shared reference SKU; varies by cube size)*
5. How does the inner plastic protect against moisture during shipping?
6. Do you offer plain/clear or printed plastic (neutral vs branded)?

**Dedup:** "how many master boxes per 20ʹ container" and "how much does custom-printed packaging cost" → **hub-canonical** (link, no schema here). General order MOQ / payment → `/faq` (link only).

---

## 7. Media manifest (exhaustive — interleaved, not one grid)

4:3 photos; query-aligned filenames + i18n caption/alt; **go-live minimum = ★**; rest P1; curated subset also on the hub (different crops/captions). Sources under `/src/assets/packaging/plastic/`.

- ☐ ★ Sealed inner plastic pack (500 g / 1 kg)
- ☐ Clear pack showing cubes inside
- ☐ Printed-logo pack
- ☐ Seal detail (heat seal)
- ☐ Plastic-wrapped charcoal going into an inner box (nesting)
- ☐ Foil / metallized barrier pack *(if offered)*
- ☐ Dimension / scale reference

**Video:** plastic wrap / shrink / seal step (`youtube-nocookie` facade, custom 16:9 poster, on-page title + 3–5 key-points, **transcript here**). Reuse the hub's `plastic` `media.videos` entry; `VideoObject` lives on this page.

---

## 8. Content coverage gate (not done until all satisfied)

- [ ] Definition-form first sentence; up-link to `/packaging` in the first paragraph; full E-E-A-T block.
- [ ] `KeyFactsBox` with material, thickness, seal, clear/printed, sizes, representative holds, barrier function, foil (if offered), neutral & branded.
- [ ] Covers: role as primary packaging + moisture/dust barrier (the box is presentation, plastic is protection → link inner-box/master-box); material + thickness + seal + clear/printed; sizes + **representative holds tied to the shared reference SKU**; barrier performance over sea transit (+ desiccant/thermal → additional-packaging); foil-barrier upgrade if offered; branding on the plastic (clear vs printed; artwork depth → white-label); neutral vs branded (+ sample cross-link).
- [ ] Charcoal per-ton price NOT shown; no banking; pricing limited to plastic-printing add-on, graceful.
- [ ] Photos interleaved with captions + query-aligned alt + explicit dims + AVIF + lazy (hero exempt); video facade with no-CLS swap + no-JS fallback + on-page key-points; **`VideoObject` here, hub omits it**.
- [ ] FAQ plastic-specific with valid `FAQPage`; container-count + cost Qs linked to hub (not duplicated); general Qs link `/faq`.
- [ ] Links: up to `/packaging`; across to the four siblings; products, logistics (documents), quality, glossary, samples, contact.
- [ ] Schema validates: **`WebPage`** + BreadcrumbList + FAQPage + DefinedTerm (+ VideoObject); NO Product/Offer/Service.
- [ ] No raw `[[token]]`; strings/captions/key-points in i18n; no hardcoded facts/prices; `dateModified` set.

---

## 9. Data Gaps report (plastic subset)

List unpopulated keys this page needs: `primaryPlastic.*` **including the new `material`, `thicknessMicrons`, `sealType`, `clearOrPrinted`, `holdsExample`, `foilBarrier`**; `pricing.plasticPrintingPerKgUsd` (if used) + `priceBasis`/`pricesLastUpdated`; `branding.{neutralScope, customSizesAvailable}`; `ancillary.{thermalBlanket, brandedSilicaGel}` (cross-reference); `editorial.*`; the `plastic` video (YouTube ID, poster, key-points, uploadDate, duration, **transcript**); the plastic photos (§7). **Confirm the two optional scope items** (foil barrier, printed plastic) and the **shared reference SKU** for `holdsExample`.

---

## 10. Hub dependency (batch into one consolidated hub revision)

Across cluster pages the hub edits accumulate — do them **once**:
- For every cluster video, **remove `VideoObject` from the hub's embed** so each cluster page is the single canonical home.
- Keep each hub child *section* short so the cluster pages are the ranking targets.

---

## Working style

Inherit v6's working style. Before code: restate understanding + plastic assumptions (incl. the two optional scope items); confirm inherited components exist; flag conflicts; give a short plan (sections, photo/video interleave, the `primaryPlastic` `company.ts` additions in §5, the shared `holdsExample` reference SKU, and the batched hub edit); **wait for approval**. Surgical changes only.
