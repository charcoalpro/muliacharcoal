# Packaging Cluster — Data Gaps Report

**Generated with the `/packaging` build (hub + 5 cluster pages).** Every field below is **unpopulated in `src/data/company.json` → `packaging.*`** and renders via graceful degradation today (the row omits, the section omits, or it shows "Available on request"). Nothing here blocks the pages from being live and credible — fill values into `company.json` (directly or via Sveltia at `/admin/`) and the pages update with **zero code changes**.

Priorities follow the go-live checklist: **P0** = needed for a fully credible live page · **P1** = strongly recommended · **P2** = optional polish.

Editorial author/reviewer/fact-checker come from `governance.*` (already populated). Dates are in `packaging.editorial` (set to the build date — refresh `dateModified` on any price/spec change).

---

## 1. `company.json` fields to fill

### `packaging.masterBox` — the carton-strength spec is the page's differentiation lane (no competitor publishes it)
| Field | Priority | Notes |
|---|---|---|
| `outerDimsMm` | P0 | e.g. `600 × 400 × 400` |
| `grossWeightKg` | P0 | gross per box (net + packaging); per option if it varies |
| `printOptions` | P0 | e.g. `["b/w","3-color","full-color"]` |
| `cartonStrength.ect` / `.burstKpa` / `.fluteType` / `.corrugateGsm` | P1 | e.g. `32 ECT` / kPa / `BC` / gsm |
| `printableFaces` | P1 | e.g. "all faces" / "top + 2 long sides" |
| `whiteTopLinerAvailable` | P1 | boolean |
| `maxStackHeight` | P1 | e.g. "8 boxes" |
| `holdsExample` | P1 | currently derived by net weight (20 kg → 20×1 kg); set to override |

### `packaging.innerBox`
| Field | Priority | Notes |
|---|---|---|
| `paperType` | P0 | e.g. "duplex" |
| `boxStyles` | P0 | `["tuck-end","tray+lid","sleeve"]` |
| `dimensionsMm` | P0 | per size option |
| `finishes` | P0 | `["lamination","emboss","uv-spot","foil"]` |
| `grossWeightKg` | P1 | per option if it varies |
| `holdsExample` | P1 | currently derived as "1 kg inner box of 25 mm cubes ≈ 96 cubes" (cube-25mm reference SKU) |

### `packaging.primaryPlastic`
| Field | Priority | Notes |
|---|---|---|
| `type` | P0 | e.g. "heat-sealed poly bag" |
| `material` | P0 | PE / PP / laminated |
| `thicknessMicrons` | P0 | e.g. 80 |
| `sealType` | P0 | e.g. "heat-sealed" |
| `holdsExample` | P1 | currently derived (cube-25mm, 96 cubes) |
| `foilBarrier` | P1 | **decision**: set `true` only if the metallized-barrier upgrade is offered (the section is omitted while null) |

### `packaging.containerLoad`
| Field | Priority | Notes |
|---|---|---|
| `masterBoxesPer20ft` | P0 | loose count — the hub/master-box currently derive box counts from net kg ÷ box weight; set to publish exact figures |
| `masterBoxesPer20ftPalletized` | P1 | palletized count |

### `packaging.customPrint`
| Field | Priority | Notes |
|---|---|---|
| `moqUnits` | P0 | per-design minimum (`moqBasis` already = per-design) |
| `leadTimeAddDays` | P0 | days printing adds |
| `finishesAvailable` | P1 | |

### `packaging.compliance`
| Field | Priority | Notes |
|---|---|---|
| `netWeightMark` | P0 | boolean (others — un1361Marking, dgLabels, countryOfOrigin, batchLot — already true) |

### `packaging.branding`
| Field | Priority | Notes |
|---|---|---|
| `neutralScope` | P0 | what "plain" looks like per layer |
| `pantoneSpot` | P1 | boolean |
| `bleedSafeArea` | P1 | |
| `prepressBy` | P1 | |
| `customSizesAvailable` | P1 | boolean |
| `artworkOnFileForReorder` | P1 | boolean |
| `foodSafeInks` + `foodSafeInksCert` | P2 | **only claim with a certificate** — leave off otherwise |

### `packaging.proofing`
| Field | Priority | Notes |
|---|---|---|
| `sampleLeadTimeDays` | P0 | (proofLeadTimeDays already = 7) |
| `sampleCost` | P1 | USD or note |
| `sampleCreditedToOrder` | P1 | boolean — the "credited" line renders only when true |

### `packaging.whiteLabel`
| Field | Priority | Notes |
|---|---|---|
| `printMethod` | P0 | e.g. "offset" |
| `printingEquipment` | P1 | credibility, e.g. "6-color Heidelberg" |
| `colorCapability` | P1 | e.g. "CMYK + Pantone spot + foil" |
| `brandsProducedCount` | P1 | social proof, e.g. "80+" |
| `platesKeptForReorder` | P1 | boolean |

### `packaging.ancillary` (all `null` → each add-on confirmed on inquiry; set booleans true to assert availability)
P1: `stickers`, `stickers3d`, `qrStickers`, `hologramStickers`, `inserts`, `boxLabels`, `brandedTape`, `brandedSilicaGel`, `desiccantIncluded`, `strapping`, `edgeProtectors`, `palletType` (wood/plastic/both), `thermalBlanket` · P2: `containerDesiccant`, `fscPaper`. (`pallets` and `ispm15` already true.)

### `packaging.pricing` — **decision #2 resolved as Option A**
`pricesLastUpdated` (P0) is empty. All add-on prices are empty → "Available on request" sitewide. `strappingPerTonUsd` + `labelPrintingPerTonUsd` are intentionally left empty (Option A) so they read "Available on request" everywhere, consistent with `/packaging/additional-packaging` publishing no prices. To publish any add-on price, set the field + `pricesLastUpdated` and bump `editorial.dateModified`. **Never** add the charcoal per-ton price here.

---

## 2. Photo shoot (49 shots) — all slots render local placeholders at the correct 4:3 ratio until filled

Source files go under `src/assets/packaging/<area>/`; wire them into each page's `photos` arrays (i18n alt + caption already written for every slot). ★ = go-live minimum (1 per page).

- **master-box** (10): ★ closed branded carton 3/4 · neutral carton · open w/ inner boxes · single-vs-double-wall cross-section · print detail · UN-1361/origin/net-weight markings · strapped carton · shrink-wrapped pallet · loose-loaded 20ft container · scale ref
- **inner-box** (10): ★ branded front 3/4 · neutral box · open w/ plastic-wrapped charcoal · size range · box-style comparison · finish macro · print detail · retail markings · packed inside master box · scale ref
- **plastic** (7): ★ sealed pack · clear pack showing cubes · printed-logo pack · seal detail · nesting into inner box · foil pack *(if offered)* · scale ref
- **white-label** (10): ★ full branded set · blank-vs-branded · offset press · FSC/cert detail · die-line render · finish macro · Pantone/proof sheet · physical sample review · anonymized brand examples ⚠ · branded consumables on packaging
- **additional** (12): ★ branded sticker sheet · 3D domed macro · QR on box · hologram detail · box label on carton · branded tape · branded silica · insert in box · strapped carton · edge protectors · shrink-wrapped pallet · thermal-lined container

The hub reuses a curated subset (different crops/captions) — no separate hub shoot.

---

## 3. Videos (5 — all P1; each slot omits cleanly until filled, never faked)

Fill `packaging.media.videos[<id>]` with `youtubeId`, `posterAsset` (local 16:9), `uploadDate`, `durationISO`. The `VideoObject` is valid-or-omit and lives on the **cluster page** (the hub embeds via `VideoFacade` without schema). On-page title + 3–5 key-points are the GEO surface — add per-video key-point copy to the cluster i18n when the video lands. Upload captions/transcript to YouTube.

| id | subject |
|---|---|
| `master-box` | assembly & sealing on the line |
| `inner-box` | forming/printing or hand-pack |
| `plastic` | wrap / shrink / seal step |
| `additional-packaging` | container loading w/ thermal blanket + strapping/palletizing |
| `white-label` | OEM process: design → print → pack |

---

## 4. External / verify

- ☐ **UN Transport of Dangerous Goods URL** — currently `https://unece.org/transport/dangerous-goods` (hub + master-box compliance sections). Verify it's the intended authoritative target.
- ☐ **IPPC ISPM-15 URL** — currently `https://www.ippc.int/en/publications/640/` (hub + additional-packaging). Verify.
- ☐ **YouTube channel in `Organization.sameAs`** — already present via `social.youtube` (`https://www.youtube.com/@muliacharcoal`); emitted by the organization schema. No action unless the handle changes.
- ☐ **Brand-example permissions (white-label social proof)** — the "anonymized brand examples" photo slot ⚠ requires written permission or true anonymization before any real brand is shown. `brandsProducedCount` is text-only until set.
- ☐ **Food-safe ink certificate** — only claim `branding.foodSafeInks` with `foodSafeInksCert` backing.

---

## 5. Cross-site / downstream (noted, not blocking)

- **`/samples`** is not built yet. All proof/sample CTAs route to the live inquiry form (`/contact`, which supports file attachment) and WhatsApp; `/samples` links degrade via `MaybeLink` and will self-light when the page ships. When `/samples` is built, ensure it accommodates **packaging proof/sample requests** (digital proof + physical sample box), not just charcoal samples.
- **Guide pillar (future)** — when built, `/guide/private-label-options` and `/guide/how-to-start-your-own-brand` must 301-redirect or thin-link to `/packaging/white-label#why-private-label` and `#how-to-start` (those anchors exist now). Never duplicate that content.
- **Logistics cluster** — `/logistics/UN-1361`, `/logistics/documents`, `/logistics/rules` are cross-linked throughout (degrading via `MaybeLink`) and will self-light when the logistics hub + children ship (run-order step 9).
