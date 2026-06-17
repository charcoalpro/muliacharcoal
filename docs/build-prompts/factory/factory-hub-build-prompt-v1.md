# Build Prompt — `/factory` Pillar (hub + 4 clusters) (v1)

> **For:** Claude Code, senior SEO/GEO engineer on muliacharcoal.com.
> **Inherits the conventions established by `packaging-hub-build-prompt-v6` + `logistics-hub-build-prompt-v1`** — shared components (`KeyFactsBox`, `Figure`, `PhotoGrid`, `VideoFacade`/YouTube facade, `SpecsTable`, `FAQSection`, `Breadcrumbs`, `CTABanner`, `StickyWhatsApp`, `ArticleMeta`/E-E-A-T block), graceful degradation (no raw tokens; missing fact → omit or "—"; never invent), **facts only from `company.ts`**, `<MaybeLink>`/`isLive()` gating, full hreflang + `x-default`, zero client JS (YouTube facade only), AVIF + lazy + explicit dims, RTL-safe logical props, metric units, sitewide CTA components with analytics events, and the three-part verification (JS-off extractability, Rich Results, build + Lighthouse floor). Do not re-derive these; apply them.
> **Why now:** `/factory` is referenced as a live destination across the site but isn't built. Those links are currently **gated/muted** (they don't 404 — `isLive()` hides the CTAs, `<MaybeLink>` mutes the body links). Shipping this pillar + adding its routes to `LIVE_ROUTES` makes **all of them self-heal and light up at once** (see §8). `/factory` is also the core manufacturer **trust/E-E-A-T pillar** for a "we are the factory, not a trader" business.
> **Scope:** Build the **`/factory` hub + all four children** (`production-process`, `capacity`, `virtual-tour`, `raw-materials`). Hub first, then children on the cluster template. One pillar, one branch.

---

## STEP 0 — Preflight (output a plan, WAIT for approval)

- **Components:** confirm the shared components above already exist (from packaging/logistics/quality). If any is missing, STOP and flag.
- **Facts audit:** most factory facts **already exist** in `company.ts` → `production` (`capacityTonsPerDay: 14`, `capacityTonsPerMonth: 350`, `lines: 4`, `headcount: 86`, `ovens: { count: 8, capacityTonsPerBatch: 1.5, cycleHours: 24 }`, `factoryAreaSqm: 4200`, `palmTreesCount: 28000`, `sourcingVillages: 11`, `sourcingRegion`, `rawMaterial`, `carbonizationPlant`), plus `factoryTourVideo`. **Reuse these — do not duplicate.** Add a small `factory` object only for genuinely new fields (§5).
- **Reconcile a data conflict (surface, don't silently fix):** `production.rawMaterial` says *"sourced from Java and Sumatra"* but `production.sourcingRegion` says *"North Sulawesi, Maluku, NTT."* These contradict. Flag for the owner; pick one at fill-time. Don't publish both.
- **Nav + no orphan:** `/factory` is **not** in nav today. Add it to the footer "Products & operations" column (`footerOperationsNav` in `src/config/nav.ts`); recommend also adding to the header primary nav (the pillar deserves it).
- **Routes:** plan the `LIVE_ROUTES` additions (5 paths) — the single switch that lights up every gated link.
- Output: page-by-page section plan, the `company.ts` `factory` diff, the FAQ-canonical split, the schema-builder list, and the link-activation list (§8). **Wait for approval before writing code.**

---

## 1. Search-AI modeling (factory/manufacturer queries)

Answer engines decompose *"coconut shisha charcoal factory / manufacturer Indonesia / how is coconut charcoal made / production capacity / where do they source coconut shell / factory tour"* into: a **parent** (*who manufactures this charcoal and can they supply at scale*) and children resolved separately — **process** (a how-it's-made sequence: shell → carbonization → milling → mixing/binder → pressing → drying → weathering → QC, with durations/temperatures), **capacity** (pure numbers: t/day, t/month, lines, ovens, container throughput — the buyer's "can they fill my 1×20ft/month?" check), **raw material** (coconut-shell sourcing, origin regions, why shell vs wood/bamboo → cross-link the Guide), and **proof** (virtual tour / gallery / audits). Extraction rewards definition-form sentences, a stepped process with numbers, a capacity facts table, and a Q&A surface. The hub is the **overview + "factory at a glance" + countries-served + photo gallery**, with `CollectionPage hasPart` down-links to the four children. **Trust angle:** real numbers (8 ovens, 4 lines, 4,200 m², 350 t/mo), a named owner/team (E-E-A-T), and a verifiable tour beat trader-style "bulk available" vagueness.

---

## 2. Hard constraints

- **Facts only from `company.ts`** (`production.*`, `factoryTourVideo`, plus the new `factory` object). No fact in page/component/i18n/JSON-LD.
- **No fabricated proof.** If the tour video / gallery assets / audit docs aren't present (`hasFact`/asset-exists), render the poster/placeholder pattern — never a fake. (`/documents/factory-audit.pdf` is currently a **placeholder** — link it as "audit summary" only as far as that's honest.)
- **Capacity claims are factory figures, never competitor numbers.** Indicative throughput renders with a "capacity, not a guarantee; confirmed per order" caveat.
- **Required hub anchors:** `#gallery` and `#countries-served` (the homepage links to `/factory#gallery` and `/factory#countries-served` — those sections must exist with those exact ids).
- Everything else per inherited conventions (zero JS, budgets, RTL, metric, all strings i18n, no `Product`/`Offer` on these pages).

---

## 3. Pages & i18n

| Route | File | i18n namespace |
|---|---|---|
| `/factory` (hub) | `src/pages/factory/index.astro` | `factory.*` → `src/i18n/en/factory.json` (+ `factoryCommon.json` for shared) |
| `/factory/production-process` | `src/pages/factory/production-process.astro` | `factoryProductionProcess.json` |
| `/factory/capacity` | `src/pages/factory/capacity.astro` | `factoryCapacity.json` |
| `/factory/virtual-tour` | `src/pages/factory/virtual-tour.astro` | `factoryVirtualTour.json` |
| `/factory/raw-materials` | `src/pages/factory/raw-materials.astro` | `factoryRawMaterials.json` |

Follow the existing per-pillar i18n split (`logistics.json` + `logisticsCommon.json` + per-child) and the page structure of `src/pages/logistics/index.astro` and a logistics child (e.g. `rules.astro`) as the canonical reference implementations.

---

## 4. Hub structure (`/factory`, top → bottom)

1. **Header** + **Breadcrumbs** (Home › Factory).
2. **Hero** — H1 < 60 chars (e.g. *"Our Coconut Shisha Charcoal Factory in Semarang"*) + definition-form lead + primary CTA (text-led).
3. **Full E-E-A-T block** (`editorial.*`/`ArticleMeta` — author/reviewer/fact-checker + last-updated + read time).
4. **`KeyFactsBox` — "Factory at a glance":** location (Semarang, Central Java), facility area (4,200 m²), production lines (4), ovens (8 × 1.5 t/batch, 24 h cycle), capacity (14 t/day · 350 t/mo), workforce (86), founding year, raw material (coconut shell), MOQ/port (reuse existing). Graceful degradation.
5. **Intro / parent-entity** — 2–3 definition-form paragraphs: who manufactures, where, that the company **is the producer** (not a trader), and the end-to-end at a glance.
6. **Child-entity sections (one per child):** anchor + H2 + definition + 2–3 key facts + one `Figure` + "Full details →":
   - **How it's made** → `#production-process` → `/factory/production-process`
   - **Production capacity** → `#capacity` → `/factory/capacity`
   - **Raw materials & sourcing** → `#raw-materials` → `/factory/raw-materials`
   - **Virtual tour** → `#virtual-tour` → `/factory/virtual-tour`
7. **`#countries-served`** — export-markets section (the homepage TrustStrip links here). Render from the existing export-markets/countries fact (reuse if present; else Data Gap). Definition-form + the priority-market framing.
8. **`#gallery`** — factory `PhotoGrid` (the homepage Gallery links here). Reuse `config/gallery.ts` factory shots (`factory-production-line`, `factory-kiln`, `factory-press`, `factory-milling`, `factory-drying`, `factory-qc-bench`); gated on `hasAssets` (placeholders until real photos land).
9. **FAQ** (`FAQSection` + `FAQPage`) — hub-canonical set only (§6).
10. **Related topics** — down to all 4 children; across to `/products` (what we make), `/quality/certifications` (how we prove it), `/logistics` (how we ship it), `/packaging`, `/about` (company/owner), `/faq`, `/contact`, `/glossary`.
11. **CTABanner** + **Footer** + **StickyWhatsApp**.

### Children (build on the cluster template)

- **`production-process`** — stepped how-it's-made with durations/temperatures (carbonization → milling → mixing/binder → pressing → drying → **weathering ≥14 days** → QC). Schema: **`HowTo`** (`howTo.ts`) + `BreadcrumbList` + page-canonical `FAQPage`. This page is the target of **6 glossary "Detail:" see-links** — make the anchored sub-sections match those concepts (carbonization, kiln/oven cycle, pyrolysis, binder/pressing, weathering).
- **`capacity`** — numeric-heavy: `SpecsTable` of t/day, t/month, lines, ovens (count × batch × cycle), container throughput (reconcile with `packaging.containerLoad` / `logistics.containers` — read, don't redefine). Schema: `CollectionPage`/cluster + `BreadcrumbList` + `FAQPage`. Cross-link `/logistics` (container yield) + `/products` (per-shape yield).
- **`raw-materials`** — coconut-shell sourcing (origin regions — see the reconcile note), shell vs wood/bamboo (cross-link `/guide/coconut-vs-bamboo-vs-wood-charcoal` via `MaybeLink`, still muted), purity/ash linkage (cross-link `/quality`). Schema: cluster + `BreadcrumbList` + `FAQPage`.
- **`virtual-tour`** — `VideoObject` (`videoObject.ts`) **gated on `company.factoryTourVideo.youtubeId`**; until present, render the poster/facade placeholder and **emit no `VideoObject`**. + `BreadcrumbList` + `FAQPage`. This is the target of the `/about` virtual-tour CTA.

---

## 5. `company.ts` — reuse + small `factory` object

Reuse `production.*` and `factoryTourVideo` as-is. Add only net-new fields:

```ts
factory: {
  countriesServed: [],          // for /factory#countries-served (reuse existing "export markets" fact if one exists — Data Gap to confirm)
  processSteps: [],             // { key, title, durationOrTemp, note } — drives the HowTo on /production-process
  weatheringDays: '',           // e.g. '14' (ties to the DG self-heating story; keep consistent with logistics/quality)
  tourGalleryNote: '',
  establishedAtSite: '',        // years at this facility, if distinct from foundingYear
}
```

Banking details NEVER appear. Charcoal per-ton price NEVER appears here.

---

## 6. FAQ-canonical split (one Q/A = one home)

- **Hub-canonical:** Are you a factory or a trader? · Where is the factory? · What's your monthly production capacity? · Can you fill a 20ft container per month? · Which countries do you export to?
- **production-process-canonical:** How is coconut shell charcoal made? · What is carbonization / pyrolysis? · Why weather the briquettes (and for how long)? · What binder do you use?
- **capacity-canonical:** How many production lines / ovens? · How much can one oven produce? · Lead time to produce a container?
- **raw-materials-canonical:** Where do you source coconut shell? · Why coconut shell vs wood/bamboo? · Does the raw material affect ash content?
- **virtual-tour-canonical:** Can I visit / see the factory? · Do you offer a video tour / audit?
- General MOQ/company Qs already on `/faq` or `/about` stay there (link only).

---

## 7. Schema

Create `src/lib/schema/factoryHub.ts` + `factoryClusterPage.ts` mirroring `logisticsHub.ts`/`logisticsClusterPage.ts`. Hub: **`CollectionPage`** (`hasPart` → 4 children) + **`BreadcrumbList`** + **`FAQPage`**, referencing the manufacturer **`Organization`** `@id` (from `organization.ts`/`ids.ts`) — the hub is the org's manufacturing context. Children: **`HowTo`** (production-process), **`VideoObject`** (virtual-tour, gated), cluster `CollectionPage` + `BreadcrumbList` + `FAQPage` (capacity, raw-materials). `datePublished`/`dateModified` from `editorial.*`. No `Product`/`Offer`/`Service`.

---

## 8. Links that self-heal (verify each resolves after `LIVE_ROUTES` update)

Add to `LIVE_ROUTES` (`src/config/nav.ts`): `/factory`, `/factory/production-process`, `/factory/capacity`, `/factory/virtual-tour`, `/factory/raw-materials`. Then these **currently gated/muted** links become live (grep to confirm none remain muted/gated unintentionally):

| Source | Link | Mechanism today |
|---|---|---|
| `home/blocks/About.astro:91` | `/factory` | `isLive()` gated (CTA reappears) |
| `home/blocks/Gallery.astro:68` | `/factory#gallery` | `isLive()` gated → **needs `#gallery`** |
| `home/blocks/TrustStrip.astro:134` | `/factory#countries-served` | `isLive()` gated → **needs `#countries-served`** |
| `about/blocks/LegalInformation.astro:195` | `/factory/virtual-tour` | `isLive()` gated |
| `i18n/en/glossary.json` (×6) | `/factory/production-process` (×5), `/factory/raw-materials` (×1) | `MaybeLink` muted |
| `i18n/en/glossary.json` (Related pillars card) | `/factory` | `MaybeLink` muted |
| `pages/products.astro:383,591` | `/factory/raw-materials`, `/factory/capacity` | `MaybeLink` muted |
| `components/product/GradePage.astro:206,344` | `/factory/raw-materials`, `/factory/capacity` | `MaybeLink` muted (×57 grade pages) |
| `i18n/en/productCategory.json:71`, `products.json:176` | `/factory/raw-materials` | `MaybeLink` muted (×6 category + hub) |

---

## 9. Acceptance / content gate

- [ ] Parent entity defined in first 100 words; E-E-A-T block; footer (and ideally header) link added — no orphan.
- [ ] Hub `KeyFactsBox` with location, area, lines, ovens, capacity, workforce, raw material; graceful degradation.
- [ ] `#gallery` and `#countries-served` sections exist with those exact ids; homepage links land on them.
- [ ] All 4 children built: anchor, definition, key facts, Figure, down-link; up-link to `/factory` in first paragraph + Related topics.
- [ ] `production-process` is a real stepped `HowTo` with numbers; the 6 glossary see-links land on relevant sub-sections.
- [ ] `virtual-tour` gated on `factoryTourVideo` (placeholder + no `VideoObject` if absent).
- [ ] Java/Sumatra vs Sulawesi/Maluku/NTT conflict resolved (one source); container-throughput figures read from existing config, not redefined.
- [ ] `LIVE_ROUTES` updated; **every link in §8 resolves**; `npm run build` clean (no warnings); the repo link-checker reports **zero broken internal links**.
- [ ] Schema validates (CollectionPage + BreadcrumbList + FAQPage on hub; HowTo/VideoObject on the right children); no raw tokens; all strings i18n; `dateModified` set.
- [ ] Lighthouse mobile ≥95/95/95, SEO 100; per-page budgets respected.

---

## 10. Data Gaps report

Every unpopulated `factory.*`/`production.*` key by exact name — especially `countriesServed` (and whether to reuse an existing "export markets" fact), `processSteps[]` (durations/temps for the HowTo), `weatheringDays`, `factoryTourVideo.youtubeId` + `uploadDate`, the factory photo assets (`config/gallery.ts` `hasAssets`), the real `/documents/factory-audit.pdf` (currently placeholder), the E-E-A-T reviewer for this pillar, and the raw-material origin reconciliation.

---

## Out of scope / dependencies

- `/guide/coconut-vs-bamboo-vs-wood-charcoal` (Buyer's Guide pillar) is referenced from `raw-materials` via `<MaybeLink>` — leave it muted until that pillar ships.
- Markets cross-links (`/markets/*`) stay muted until the Markets pillar ships.
- Container-throughput figures overlap `packaging.containerLoad` / `logistics.containers` — read both, don't redefine; add a consistency check.

---

## Working style

Restate understanding + assumptions, flag conflicts (esp. the sourcing-region contradiction and the container-data overlap), deliver the Step-0 plan, **wait for approval**, surgical changes only.
