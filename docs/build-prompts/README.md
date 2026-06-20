# Build Prompts — Manifest & Run Order

**What this folder is.** The authoritative page-build specifications for muliacharcoal.com, written for Claude Code. Treat this folder like `CLAUDE.md`: before building any page, read this README, then the prompt for that page **and every parent file it requires** (see the manifest). These files live in the repo only — `/docs/` is not part of the Astro build output and is never served or crawlable.

**The delta rule (non-negotiable).** Prompts are written as deltas to stay lean. **A delta is not executable alone.** Every packaging cluster delta requires `packaging/packaging-hub-build-prompt-v6.md` **and** `packaging/packaging-cluster-consolidated-revisions.md` in context. Logistics prompts additionally chain to the packaging hub (it defines the shared components and conventions). If a required parent isn't in context, STOP and load it — never improvise the missing conventions.

---

## Folder layout

```
docs/build-prompts/
├── README.md                                        ← this manifest
├── packaging/
│   ├── packaging-hub-build-prompt-v6.md
│   ├── packaging-master-box-build-prompt-v2.md
│   ├── packaging-inner-box-build-prompt-v2.md
│   ├── packaging-plastic-build-prompt-v2.md
│   ├── packaging-white-label-build-prompt-v2.md
│   ├── packaging-additional-packaging-build-prompt-v2.md
│   ├── packaging-cluster-consolidated-revisions.md
│   └── packaging-cluster-golive-checklist-v2.md
├── logistics/
│   ├── logistics-hub-build-prompt-v1.md
│   └── logistics-research-prompt-v1.md
├── factory/
│   ├── factory-hub-build-prompt-v1.md
│   └── factory-research-prompt-v1.md
└── guide/
    ├── guide-hub-build-prompt-v1.md
    └── guide-research-prompt-v1.md
```

---

## Manifest

| File | Version | Type | Scope | Requires in context |
|---|---|---|---|---|
| `packaging/packaging-hub-build-prompt-v6.md` | v6 (supersedes v1–v5) | build | `/packaging` hub; creates `KeyFactsBox`, `Figure`, `PhotoGrid`, `VideoFacade` + the `company.ts` `packaging` contract | consolidated-revisions (overlay) |
| `packaging/packaging-cluster-consolidated-revisions.md` | final | overlay | Hub schema overrides (NO `Service`, NO `VideoObject`), master-box addendum, glossary extension (7 anchors), cross-site tasks, consistency checkpoints | — |
| `packaging/packaging-master-box-build-prompt-v2.md` | v2 | build (delta) | `/packaging/master-box` | hub v6 + revisions (§2 addendum) |
| `packaging/packaging-inner-box-build-prompt-v2.md` | v2 | build (delta) | `/packaging/inner-box` | hub v6 + revisions |
| `packaging/packaging-plastic-build-prompt-v2.md` | v2 | build (delta) | `/packaging/plastic` | hub v6 + revisions |
| `packaging/packaging-white-label-build-prompt-v2.md` | v2 | build (delta) | `/packaging/white-label`; `Service` schema canonical HERE | hub v6 + revisions |
| `packaging/packaging-additional-packaging-build-prompt-v2.md` | v2 | build (delta) | `/packaging/additional-packaging` | hub v6 + revisions |
| `packaging/packaging-cluster-golive-checklist-v2.md` | v2 | checklist (owner-facing) | Data/asset gathering for the whole cluster; paste into a session only when populating `company.ts` | — |
| `logistics/logistics-hub-build-prompt-v1.md` | v1 | build | `/logistics` hub; creates the `company.ts` `logistics` contract incl. `transitTimes[]` | packaging hub v6 (conventions + components) |
| `logistics/logistics-research-prompt-v1.md` | v1 | research (chat, NOT Claude Code) | Gathers verified UN-1361/DG + USA-import facts; output feeds the two pending child prompts | — |
| `factory/factory-hub-build-prompt-v1.md` | v1 | build | `/factory` hub **+ all 4 children** (production-process, capacity, virtual-tour, raw-materials); reuses `company.ts` `production`/`factoryTourVideo`, adds a small `factory` object; adding its routes to `LIVE_ROUTES` self-heals the gated/muted `/factory*` links sitewide | packaging hub v6 + logistics hub v1 (pillar-hub pattern) |
| `factory/factory-research-prompt-v1.md` | v1 | research (chat, NOT Claude Code) | Verifies coconut-charcoal manufacturing-process science + sourcing context + competitor teardown; routes owner-only facts to a checklist; feeds the factory build prompt | — |
| `guide/guide-hub-build-prompt-v1.md` | v1 | build | `/guide` Buyer's Guide hub **+ 4 guides** (how-to-choose-shisha-charcoal-factory, coconut-vs-bamboo-vs-wood-charcoal, how-to-start-your-own-brand, private-label-options); reconciles the GradePage guide slug; reuses `grades`/`editorial` facts; self-heals the muted `/guide*` links sitewide | packaging hub v6 + logistics hub v1 + factory hub v1 (pillar-hub pattern) |
| `guide/guide-research-prompt-v1.md` | v1 | research (chat, NOT Claude Code) | Verifies coconut-vs-bamboo-vs-wood comparison data + supplier-vetting/private-label norms + SERP teardown; routes owner/site facts to a checklist; feeds the guide build prompt | — |

**Pending (will be added here):** `/logistics/UN-1361` and `/logistics/import-to-usa` (await `logistics-research-findings.md`), `/logistics/rules`, `/logistics/documents`. Each will declare its required parents in its own header using repo paths.

---

## Run order

1. **`/packaging` hub** — hub v6 with the revisions overlay applied (no `Service`, no `VideoObject` ×5, short child sections, pricing-flag resolution).
2. **Glossary extension** — revisions §3a (7 packaging anchors) so cluster `DefinedTerm` `@id`s resolve.
3–7. **Packaging cluster pages** — any order (forward-references are tracked per prompt).
8. **Consistency pass** — revisions §5 checkpoints across all built pages.
9. **`/logistics` hub.**
10+. **Logistics children** as their prompts land.
11. **`/factory` pillar** — hub + 4 children (single prompt); add the 5 routes to `LIVE_ROUTES` to self-heal the gated/muted `/factory*` links across home, glossary, products, and grade pages.
12. **`/guide` pillar** — hub + 4 guides (single prompt); fully unblocked (cross-links existing pillars); add the 5 routes to `LIVE_ROUTES` and reconcile the GradePage guide slug.
Cross-site touches (`/samples` packaging accommodation, homepage OEM → white-label link) whenever those pages are next edited; guide-pillar redirects when that pillar is built.

---

## Versioning rules

- Only **current** versions live in this folder. Superseded versions are never committed.
- A revision replaces the file, bumps the version in the **filename**, and updates this README's manifest in the same commit (`docs:` per Conventional Commits).
- Never mix versions in one session; if a parent is revised (e.g., hub v6 → v7), the manifest row and every dependent recipe update with it.

---

## One-time repo edit when committing this folder

Add one line to `CLAUDE.md` (Working Style section), so discovery is automatic:

> Page build prompts live in `/docs/build-prompts/` — before building any page, read that folder's `README.md`, then the prompt for the page and ALL parent files its manifest row requires.

No other config changes: `/docs/` is repo-only and never enters the build output.

---

## Session kickoff template

```
Build [PAGE] for muliacharcoal.com.

Read /docs/build-prompts/README.md, then the prompt file for this page and
ALL required parent files per its manifest row. Everything in the parents
applies unless the delta overrides it; the consolidated revision sheet
overlays where stated.

Also read CLAUDE.md, DESIGN.md, and /src/config/company.ts.

Start with the prompt's Step 0 / preflight and present your build plan.
WAIT for my approval before writing any code.
```

*(This README supersedes the earlier `claude-code-session-paste-guide.md`, which was written for a paste-per-session workflow and should not be committed.)*
