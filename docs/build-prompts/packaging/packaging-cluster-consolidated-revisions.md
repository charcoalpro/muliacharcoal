# Packaging Cluster — Consolidated Revision Sheet (Overlay on Hub v6 + Cluster Prompts)

**What this is:** the single collected list of every cross-prompt dependency that accumulated in the §10 sections of the six packaging prompts. Nothing is built yet, so these are **not retro-edits** — this sheet travels WITH the prompts and is applied during the build. Give it to Claude Code alongside `packaging-hub-build-prompt-v6` and the five cluster prompts (master-box v2, inner-box v2, plastic v2, white-label v2, additional-packaging v2).

---

## 1. Hub overlay — apply these when building `/packaging` from v6

**Schema (two changes):**
- **Do NOT emit the `Service` node on the hub.** The white-label `Service` is canonical on `/packaging/white-label` (per white-label v2 §4). The hub's branding overview links there instead. Everything else in the hub's schema stack stands (CollectionPage, BreadcrumbList, FAQPage, DefinedTerm set).
- **Do NOT emit `VideoObject` for ANY of the five videos embedded on the hub.** Each cluster page is the canonical home for its video's `VideoObject` (with full key-points + transcript). The hub still embeds all five via the `VideoFacade` with adjacent key-points — it just carries no video schema.

**Content rules:**
- Keep each of the five child-entity sections **short** — definition + 2–4 facts + curated media + "Full details →" link. The cluster pages are the ranking targets for their queries; the hub must not compete with its own children.
- *(Optional, one phrase)* the additional-packaging section line may name the **anti-counterfeit set** (QR / hologram / 3D domed).

**Pricing-flag resolution (decide at fill-time, apply consistently):**
- `pricing.strappingPerTonUsd` and `pricing.labelPrintingPerTonUsd` render in the hub's published table, but both items now live on `/packaging/additional-packaging`, which publishes **no prices**.
- **Option A (consistent, recommended):** leave both fields **empty** → graceful degradation renders "Available on request" on the hub and master-box automatically. Zero rebuild.
- **Option B:** populate them → strapping/labels show a price on hub + master-box while additional-packaging routes to inquiry. Livable, slightly split.

---

## 2. Prompt addendum — master-box v2

In §3.8 (Printing & branding on the master box), add one line:
> "Or apply **printed box labels** as a lower-cost, fast-turnaround branding alternative to direct carton printing → `/packaging/additional-packaging#branded-consumables`."

(No other change to master-box v2.)

---

## 3. Cross-site tasks (outside the packaging cluster)

**3a. Glossary extension — REQUIRED before/with the cluster build.** The glossary prompt predates the cluster, so the `DefinedTerm` `@id` anchors the cluster points at do not exist yet. Add definition-form entries (with kebab-case anchor IDs) for:

| Anchor | Term | alternateName(s) |
|---|---|---|
| `#master-box` | master box | master carton |
| `#inner-box` | inner box | retail box, consumer box |
| `#inner-plastic` | primary packaging | inner plastic, poly bag |
| `#white-label` | white label | private label, OEM |
| `#neutral-packaging` | neutral packaging | unbranded, plain, generic |
| `#un-1361` | UN 1361 marking | *(if not already present)* |
| `#branded-consumables` | branded consumables | packaging add-ons |

Each entry: one definition-form sentence (consistent with the cluster pages' definitions), stable anchor ID, no JS reveal.

**3b. `/samples` page** must accommodate **packaging proof/sample requests** (digital proof + physical sample box), since the hub and white-label route requests there as well as to the inquiry form. If the samples flow is charcoal-only, either extend it or ensure the inquiry path captures packaging samples.

**3c. Homepage** — the OEM/branding section links to `/packaging/white-label` as the deep page.

**3d. Guide pillar (future, when built)** — `/guide/private-label-options` and `/guide/how-to-start-your-own-brand` must **301-redirect or thin-link** to `/packaging/white-label#why-private-label` and `/packaging/white-label#how-to-start` respectively. Never duplicate that content — white-label owns it.

**3e. Already inside hub v6 Step 0 (listed for completeness, no extra action):** `CLAUDE.md` path corrections (`/mpackaging/...` → `/packaging/...` + typo fixes), nav + sitemap referencing `/packaging`, CSP `frame-src` gains `https://www.youtube-nocookie.com`, YouTube channel added to `Organization.sameAs`.

---

## 4. Recommended build order

1. **Hub** (v6 + §1 overlay) — creates the four shared components (`KeyFactsBox`, `Figure`, `PhotoGrid`, `VideoFacade`), the full `company.ts` `packaging` contract, the CSP/path/nav corrections.
2. **Glossary extension** (3a) — so cluster `DefinedTerm` anchors resolve.
3. **Cluster pages in any order** (forward-references are tracked per prompt). Natural sequence: master-box → inner-box → plastic → white-label → additional-packaging.
4. **Cross-site touches** (3b–3c) whenever those pages are next edited.

---

## 5. Final consistency checkpoints (verify once, across all six pages)

- [ ] **One `Service`** sitewide for white-label — on `/packaging/white-label` only.
- [ ] **One `VideoObject` per video** — on its cluster page only; hub emits none.
- [ ] **FAQPage one-home audit** — no Q/A schema'd on two URLs (container-count + general-cost Qs are hub-canonical; each cluster page's Qs are page-specific; general MOQ/payment live on `/faq`).
- [ ] **Shared reference SKU** — `masterBox.holdsExample`, `innerBox.holdsExample`, `primaryPlastic.holdsExample` all cite the **same** SKU and the numbers chain consistently (pack → inner box → master box).
- [ ] **Pricing flag** resolved the same way everywhere (Option A or B above).
- [ ] **Charcoal per-ton price** appears on NO packaging page; **no banking details** anywhere.
- [ ] All seven glossary anchors resolve; every cluster `DefinedTerm` `@id` targets an existing anchor.
