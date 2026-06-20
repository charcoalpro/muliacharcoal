# Architecture Audit — Mulia Charcoal Website

**Date:** 2026-06-18
**Scope:** Authored source (`src/`, `src/config`, `src/lib`, `docs/`, `scripts/`, build config). Generated output (`dist/`, `.astro/`, `node_modules/`) excluded.
**Mode:** Read-only analysis. No code was modified.
**Lens:** Code organization, modularity, separation of concerns, coupling, complexity — **plus** compliance with this project's own hard rules in `CLAUDE.md` (single-source-of-truth for company facts, no hardcoded UI strings, `lib/` purity, pillar/cluster structure, performance budgets).

**Method:** Eight focused auditor agents fanned out across the layers (page shell, components, config, lib/schema, i18n, forms/CTA/analytics, SEO/schema wiring, build/config). Each finding required a file:line citation. A verification pass re-read each finding against the real code; it confirmed the first four findings at high confidence before the run hit a session usage limit. The remaining high-impact findings were verified by hand (direct reads + grep) during synthesis — see "Independently re-verified" tags below.

---

## 1. Overall verdict

**This is a mature, thoughtfully-architected codebase, not a messy one.** The strong patterns are real and pervasive: a clean `BaseLayout` prop interface, centralized `<head>` assembly in one `SEO.astro`, a single `JsonLd` escaping wrapper, a pure and well-typed schema-builder layer with `hasFact()` placeholder-gating, a polymorphic `Button` primitive, a typed i18n token engine, path-alias hygiene (866 `~/` imports, **zero** deep `../../..` relative imports), a complete CSP/security-headers set, and zero stray debug code. The team already knows how to do this well — `about.astro` (68 lines) and `products/[slug].astro` (52 lines) are model "thin composition shells."

The findings below are therefore mostly about **consistency and leverage**, not rot: the good patterns were not applied uniformly. Two themes dominate:

1. **Convention drift on the #1 hard rule** — company fact *values* (port name, MOQ tonnage, brand, legal name, fixed-carbon specs) are hardcoded in i18n JSON in ~20 places, often beside the very token that should have been used. `CLAUDE.md` says such a leak "must be rejected." This is the most important cluster to fix.
2. **Missing the intermediate layout layer** — only `BaseLayout` exists; the intended `ProductLayout`/`ArticleLayout`/`MarketLayout` do not. As a result ~20 pillar/cluster pages (200–510 lines each) re-implement the same page shell inline.

Counts: **~44 findings — 7 high, 21 medium, 16 low** (43 from the main pass + the new 404 gap; `products`-collection reclassified low→medium; 5 severity downgrades from verification). Exact totals are approximate because a few completeness-pass items refine rather than add to existing findings. No critical correctness bugs; no orphan components; no dead/debug code in shipped source.

### Verification outcome (completed 2026-06-18)

The interrupted verification + completeness-critic passes were re-run to completion. **All 28 material (high/medium) findings were independently re-read against the code and confirmed — zero rejections, all high-confidence.** Five were downgraded one notch on closer reading (none up): `related-topics-block-duplicated` H→M, `whatsapp-cta-fragmented` H→M, `webpage-node-assembly-duplicated` H→M, `two-map-embeds` M→L, `ids-decoupling-migration-incomplete` M→L. The high count above reflects these adjustments (the three surviving HIGH themes are A, C, D below).

The completeness-critic then surfaced four blind-spots; investigating them added **three net-new findings** (404 spec gap, content-collection enum drift, prod-gated analytics) and **one correction** — the critic claimed the `FAQSection` JSON-LD finding was a false positive ("it's escaped"), but a direct file comparison shows the original finding was right: `FAQSection.astro:59` uses bare `JSON.stringify` with **no** `</script>` guard, unlike `JsonLd.astro:21` which adds `.replace(/</g,'<')`. The original wording stands; only an extra duplicate-node risk was added. (Lesson: agent self-corrections were themselves verified against source — one was wrong.)

---

## 2. What's working well (keep doing this)

- **Head & schema injection is single-sourced.** `SEO.astro` is the only file emitting canonical/hreflang/OG/Twitter tags; every page feeds `BaseLayout`'s typed `schema` prop, rendered through one `JsonLd.astro` that escapes `<` to neutralize a stray `</script>`. hreflang is driven by `ACTIVE_LOCALES`, so the site never advertises 404 localized URLs.
- **Schema builders are pure and disciplined.** `lib/schema/*` take typed args and return plain objects; `buildOrganization({mode})` is the single Org source for 4 pages; media/offer builders return `null` on placeholder data so crawlers never see a 404 `contentUrl` or an unconfirmed price.
- **SSoT enforcement on infrastructure facts is airtight.** GA4/Pixel IDs, Web3Forms key, bank details, NIB/NPWP, phone, email, domain appear **only** in `src/data/*.json` — grep confirms zero leaks of those values anywhere in `src`.
- **The i18n token engine is type-safe.** `fill()` + `companyTokens()` return an inferred `CompanyTokens` type, so a renamed/removed token is a **compile error**, not a silent `{{token}}` at runtime. `Footer.astro` is a textbook reference implementation.
- **Build/config layer is clean.** `output:'static'`, `trailingSlash:'never'` matched in `wrangler.jsonc`, sitemap filter mirrors the robots disallow set, a `remark-company-tokens` plugin lets Markdown use `{{tokens}}`, tailwind brand colors derive from `company.brandAssets`, and even the standalone `.mjs` script parses `company.ts` as text rather than duplicating values.
- **Good decomposition where it was applied.** `GradePage` (468L) is *not* a God component — it composes `grade/*` sub-blocks. `TeamCard` unifies the sales/about person cards with one variant prop. `Button` is the canonical CTA primitive (~19 reuses).

---

## 3. Findings by theme (consolidated)

Cross-dimension duplicates have been merged. Severity is the auditor's, adjusted where the verification pass or hand-check changed it.

### Theme A — Company facts hardcoded in i18n JSON  ·  **HIGH (hard-rule violation)**  ·  *Independently re-verified*

The single most important cluster. `CLAUDE.md`: every company fact must live only in `company.ts`/`src/data` and never as a literal in i18n. Confirmed leaks (grep, 2026-06-18):

| Fact | Literal locations | Token that exists |
|---|---|---|
| Port name / UN-LOCODE | `faq.json:37,108`, `glossary.json:512,710`, `home.json:168,312` ("Tanjung Emas", "IDSRG") | `{{port}}` used **in the same strings**; `portFullName`/`portUnlocode` exist only in `logisticsTokens()` |
| MOQ tonnage | `home.json:102,250`, `glossary.json:302` ("18-ton", "16 tons") | `{{moqTons}}`, `{{moqLabel}}` (used elsewhere in same file) |
| Fixed-carbon spec | `home.json:133`, `productGrade.json:336,339,348,351,360,363` ("≥ 82% / 80% / 75%") | `glossary.astro` already derives `platinumFC`/`premiumFC` from `grades.ts` |
| Brand | `faq.json:28`, `home.json:23,123,314`, `careers.json:4` ("Mulia Charcoal") | `{{brand}}` |
| Legal name | `contact.json:3,152`, `careers.json:10` ("PT Coco Reina…") | `{{legalName}}` |
| Full address | `careers.json:20` ("Semarang, Central Java, Indonesia") | `{{addressFull}}` / `{{city}}`+`{{region}}` |

**Root cause (structural):** the token dictionary is fragmented into four siloed builders (`companyTokens`/`logisticsTokens`/`qualityTokens`/`samplesTokens`). Cross-cutting pages (`/faq`, `/`, `/glossary`) import only `companyTokens`, so any logistics/quality fact they mention has *no token in scope* and gets hardcoded. `careers.astro:69` additionally renders `t.hero.subtitle` with **no `fill()` call at all**.

**Why it matters:** an owner edit in Sveltia (e.g. MOQ, a rebrand) updates every tokenized page but silently leaves these literals stale — producing a page that contradicts itself and the Organization JSON-LD. It also re-bakes English fact spellings into any future translation.

**Fix direction:** (1) promote genuinely-global facts (`portFullName`, `portUnlocode`, `portWithCode`, MOQ variants, key spec scalars) from the cocoon builders up into `companyTokens()`; add a per-grade `fixedCarbon` token and a config field for the palletized 16-ton figure. (2) Replace the literals with tokens. (3) Run `careers.json` through `fill(companyTokens(company))` like Footer/faq already do. (4) Optionally add an `allTokens(company)` convenience for legitimately cross-cocoon hub pages.
**Effort:** M · **Risk:** low

### Theme B — Hardcoded UI strings in components  ·  **MEDIUM (rule violation)** *(verified)*

`CLAUDE.md`: all user-visible text goes through i18n. Violations: `TeamCard.astro:83,91` render literal `Phone:`/`Email:` in the *sales* variant while the *about* variant of the same file correctly uses `tAbout.*`; `MapsLite.astro:25,62` hardcode "View factory location on the map" / "Open factory location in Google Maps"; `contact/blocks/TrustStrip.astro:26` hardcodes the `Audited by …` prefix. (Note: a markup scan found **zero** hardcoded multi-word sentences elsewhere — this is a small, contained set.)
**Fix:** move these into the existing i18n groups; keep only fact values bound through tokens.
**Effort:** S · **Risk:** low

### Theme C — Missing layout layer → ~20 pages re-implement the page shell  ·  **HIGH**  ·  *Verified (high confidence)*

Only `BaseLayout` exists. Every pillar/cluster page (`packaging/index` 488L, `logistics/index` 405L, `quality/index` 409L, `white-label` 510L, `samples` 476L, …) wires the same shell inline in the same order: breadcrumb wrapper → `HeroSection` → E-E-A-T meta band → key-facts band → body → `FAQSection` → "Related topics" grid → `CTABanner`. The duplication is concrete and measurable:

- **Related-topics block** — the `<h2>` + grid + `MaybeLink` with an identical slug regex `replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'')` appears in **22 files** (23 regex hits). *Verified.*
- **E-E-A-T meta band** — the `proseForReadTime` + `readingTime` boilerplate and the 5-key `ArticleMeta` labels object repeat in **20–21 files**. *Verified.*
- **Hero trust `<dl>`** — the `border-s-2 border-brand-accent ps-3` chip grid is copy-pasted in 7 files. *Verified.*
- **Child-entity section loop** — the alternating-bg "definition + facts + down-link" card is byte-for-byte identical across the three hubs (already drifting: packaging carries media slots the others omit).
- **Breadcrumb wrapper** — hand-written on every page with **five different** max-widths (`max-w-3xl`/`4xl`/`5xl`/`6xl`/`7xl`) plus one fully divergent banded variant on `/contact`.

**Fix direction:** introduce two thin wrapper layouts matching the two real shapes already present — a `HubLayout` (wide, full hero+meta+sections+faq+related+cta) and an `ArticleLayout` (`max-w-3xl <article>`) — passing SEO/schema through to `BaseLayout` and accepting meta fields + related-items as props/slots. Extract `<RelatedTopics>`, `<MetaBand>`/extended `ArticleMeta`, `<HeroTrust>`, and `<ChildEntitySection>` components; move the slug regex into one `lib` helper. Mirror the existing about/glossary block-composition approach.
**Effort:** L · **Risk:** medium (touches many pages; do it incrementally, one cluster at a time)

### Theme D — Two divergent inquiry forms  ·  **HIGH**  ·  *Independently re-verified*

`InquiryForm.astro` (317L; `/contact`, `/products`, grade pages) is a fetch-based form with in-place success, a `FormField` component, product checkboxes, file attachment, the `website_url` honeypot, and fires `inquiry_submit` via `track()`. `ContactForm.astro` (262L; homepage only) is a native-POST form that **redirects** to `/?contact=sent`, hand-rolls every input with repeated Tailwind classes (does *not* use `FormField`), uses a `botcheck` honeypot and radio groups, and fires `contact_form_submit` + a bespoke inline `contact_form_field_focus`. Two implementations of the same business action, with different transport, validation, anti-spam, success UX, and analytics vocabulary. The redirect also contradicts `CLAUDE.md`'s explicit "show success in-place, do not redirect" rule.
**Fix:** make `InquiryForm` canonical and drive submission mode by a prop (`'ajax' | 'native-redirect'`) + field-set config, so the homepage is a *configuration* of one component. At minimum share the hidden-field block, country `<select>`, and submit button; unify the success-UX rule and the event name.
**Effort:** L · **Risk:** medium

### Theme E — WhatsApp CTA fragmented across 5 implementations  ·  **MEDIUM** *(verified down from high)*

`WhatsAppButton.astro:3` calls itself "the single source of truth," yet the WhatsApp SVG path is copy-pasted in ≥4 spots, the green button is hand-rolled outside both CTA components in `TeamCard.astro:136` and `InquiryForm.astro:275` (using `bg-success` instead of the `#075E54` the canonical buttons use), and three other surfaces build their WhatsApp CTA through a *different* "official" path — `Button.astro` with `variant="whatsapp"`. So there are two competing official renderers plus two ad-hoc anchors, emitting different greens and different `source_component` values. Compounded by **duplicate component names**: two `CTABanner.astro` (generic dual-CTA vs homepage single-CTA, both imported as `CTABanner`, firing `whatsapp_click` vs `cta_banner_click` under the same `data-source-component`) and three `Hero.astro`.
**Fix:** pick one WhatsApp renderer; replace the hand-rolled anchors; extract the SVG into one icon snippet; update the now-misleading "source of truth" docstring. Rename `home/blocks/CTABanner → HomeFinalCta` (or fold it into the generic one's single-CTA mode) and the feature heroes → `AboutHero`/`GlossaryHero`/`HomeHero`.
**Effort:** M · **Risk:** medium

### Theme F — Schema-builder duplication  ·  **MEDIUM** *(lead item verified down from high)*

The schema layer is pure and well-designed, but several shared shapes are copy-pasted rather than extracted:

- **WebPage/CollectionPage node** is hand-assembled in **8+ builders** (`logisticsClusterPage`, `qualityClusterPage`, `packagingClusterPage`, the three `*Hub`, `collectionPage`, `samplesPage`, `aboutPage`) — same `#webpage` `@id` convention, `inLanguage`, `isPartOf→WEBSITE_ID`, date-stamping. The three hubs also duplicate the `hasPart` child-ref block verbatim. **(MEDIUM — verifier confirmed the duplication is real but rated it a maintainability cost, not the higher tier; this `@id` contract is what makes cross-page graph refs resolve, so a change must touch 8 files.)**
- **Cluster-page builders** (`logistics`/`quality`/`packaging`) are near-identical WebPage+FAQPage skeletons; the logistics & quality `TechArticle` blocks are verbatim copies. (MEDIUM)
- **PropertyValue-from-SpecValue** projection is duplicated between `grades.ts:49` (`propertyValueFor`) and `productGradePage.ts:47` (`specProperty`) — risks the same product advertising different specs on home vs grade page. (MEDIUM)
- **Absolute-path / logo-fallback** logic is reinvented 5× (`imageObject`, `videoObject` ×2, `productGroup`, `itemList`) instead of using the existing `absoluteUrl()` in `url.ts`; worse, `itemList.ts:104` falls back to a hardcoded `/logo.png` while `productGradePage.ts:108` uses `company.brandAssets.images.logo` — these can point at different files. (MEDIUM)
- **`ids.ts` decoupling is incomplete** *(independently re-verified)*: `ids.ts` was created so non-Organization builders wouldn't depend on `organization.ts` for `siteOrigin`/`ORG_ID`/`WEBSITE_ID`, but **20+ builders still import those constants from `organization.ts`'s back-compat re-export**. The refactor's goal is unmet for most builders. (LOW — verified mechanical/cosmetic; no runtime impact today.)

**Fix:** extract `webPageNode()` + `childWebPageRef()` into a new `lib/schema/webPage.ts` and compose it everywhere; extract a parameterized `clusterPageGraph()`; move `specProperty` into `grades.ts`; route all abs-path through `absoluteUrl()` and fix the `/logo.png` fallback; repoint the 20 imports to `~/lib/schema/ids` and delete the re-export.
**Effort:** M · **Risk:** low–medium

### Theme G — Page identity restated per consumer (breadcrumbs & path)  ·  **MEDIUM**

Breadcrumb trails are hand-built inline on ~25 pages with literal label+path pairs, even though `nav.ts` already holds the canonical pillar href→label map. And each page's canonical path is re-typed up to three times (the `path` prop to `BaseLayout`, the `path` arg to the schema builder, and the parent path in the breadcrumb array) — nothing guarantees canonical URL, WebPage `@id`/`url`, and breadcrumb leaf agree. `GradePage` already derives `path` once (good) but still hardcodes `/products` in its crumbs.
**Fix:** a breadcrumb-trail helper that returns ancestor crumbs from `nav.ts`/`productRoutes`; derive `path` once per page and feed all three consumers. Pairs naturally with the Theme C layout work.
**Effort:** M · **Risk:** low

### Theme H — Analytics dispatch duplicated + spec drift  ·  **MEDIUM**

`lib/analytics.ts` documents `track()` as *the* helper for non-click events, yet the `gtag`+`fbq` dual-dispatch pair is hand-copied into 4 inline scripts (`Analytics.astro` scroll/engaged block, `ContactForm` focus handler, `Specifications` picker) and `Toast.astro:85` even defines a *local* `track()` that shadows the canonical one. Root cause: `is:inline` scripts can't `import`. Separately, the emitted payload keys (`{section, source, url}`) **diverge from the `CLAUDE.md` spec** (`source_page`, `source_component`); a comment at `careers.astro:164` claims it dispatches `source_page` but no code sets it; and `WhatsAppButton` emits ~7 suffixed event names (`whatsapp_click_hero`, …) instead of one `whatsapp_click` + a component param.

Two further points from the completeness pass *(verified)*: (1) the sitewide `[data-event]` delegated dispatcher **is sound** (one listener, dual-dispatch, comma-split, `data-param-*` forwarding) but the *entire block is wrapped in `{isProd && …}`* (`Analytics.astro:56`), so **dev/preview register no listener and fire zero events** — the analytics layer is effectively untestable before a production deploy. (2) The code fires a large vocabulary of event names absent from the `CLAUDE.md` spec (`gallery_video_play`, `video_play`, `toast_close`, `copy_click`, `gallery_image_open`, plus the suffixed `*_click_hero`/`_specs`/`_about` variants), with no single registry mapping on-page `data-event` strings to the documented set.
**Fix:** expose a tiny `window.__track` shim once (or bundle these as real module scripts) so there's one dispatch path; stop gating the *listener* on `isProd` (the `gtag`/`fbq` calls already no-op when the SDKs are absent) or add an off-prod debug log so wiring is testable; reconcile the param names and establish one event-name registry (extend `CLAUDE.md` or a typed map in `lib/analytics.ts`) covering the video/toast/copy/gallery/suffixed events; fix the misleading careers comment.
**Effort:** S–M · **Risk:** low

### Theme I — Two Google-Maps embeds; the slow one is on /contact  ·  **LOW** *(verified down from medium)*

`MapEmbed.astro` (eager iframe) and `MapsLite.astro` (click-to-load facade + noscript fallback) build the identical Maps URL. The privacy/perf-friendly `MapsLite` is used only on the homepage; the dedicated `/contact` page ships the *eager* cross-origin iframe — backwards relative to the zero-third-party-on-paint / CWV goals.
**Fix:** standardize on `MapsLite` everywhere (or fold `MapEmbed` in via an `eager?` prop); put the embed-URL builder in one `lib` helper.
**Effort:** M · **Risk:** low

### Theme J — Inert scaffolding & the missing blog pillar  ·  **MEDIUM / LOW**

- **`articles` collection** is fully schema'd and CMS-wired but has zero entries, zero `getCollection('articles')` consumers, and **there is no `/blog` route at all** — a `CLAUDE.md`-mandated pillar is absent, so the "every article links to 2 pillars" rule is currently unverifiable. (MEDIUM)
- **`products` collection has a real enum-drift trap** *(verified, upgraded from low to MEDIUM)*: it's empty/unused and documented as deliberately retained, but `content/config.ts:42` declares `shape: z.enum(['cube','hexagonal','finger','dome','flat'])` while the live catalogue (`config/products.ts:40`) uses keys `cube|stix|hexagonal|dome|flat|lotus`. The enum uses `'finger'` (not a real key) and **omits `stix` and `lotus` entirely** — so the moment anyone authors a stix or lotus product markdown (the exact future the comment reserves), the Zod build fails with a confusing enum error. A dead schema that silently contradicts the live config is worse than none. **Fix:** delete the collection, or import the shape union from `config/products.ts` instead of re-declaring it. (MEDIUM)
- **`404.astro` does not implement its `CLAUDE.md` spec** *(new, verified, MEDIUM)*: the spec requires "search, popular products, and an inquiry CTA"; the page renders only two static buttons (Home, Products) — no search, no popular-products list, no WhatsApp/inquiry CTA. Part of the spec ("search") is also architecturally impossible as written (zero-backend static site, and no client-side search index exists). **Fix:** reconcile spec vs reality — drop server "search" from `CLAUDE.md` (optionally require a prebuilt-JSON client filter instead) and at minimum add a popular-products list + the standard inquiry CTA to the page. (MEDIUM)
- **`FAQSection.astro:56` `emitSchema` branch** is dead (no caller passes it; both call sites note `emitSchema=false`). Two real concerns, both verified against source: it emits `set:html={JSON.stringify(...)}` **without** the `</script>` guard that `JsonLd.astro:21` applies (`.replace(/</g,'<')`), so if enabled with FAQ text containing `</script>` it could break the page; and if enabled on a page that already builds a `@graph` it would ship a **duplicate `FAQPage` node** (a Google rich-results violation). (A workflow agent claimed this finding was a false positive "because it's escaped" — direct file comparison shows it is not escaped; the finding stands.) **Fix:** delete the prop + branch (schema already lives in the page-graph emitters), or route it through `JsonLd`. (LOW)
- **`governance.*` vs `people.json`** duplicate person names, with a real conflict: `Ahmet Bassam` is "Charcoal Expert / Consultant" in governance but "Sales Manager" in `people.json`. The JSON-LD author/reviewer can disagree with the rendered roster. (MEDIUM — data correctness)
- **`docs/build-prompts`** covers only packaging + logistics though products/quality/samples/about/contact/careers/glossary have all shipped — the "authoritative" manifest is silent on 5 of 7 page families. (LOW)

**Fix:** build a minimal `/blog` hub + `[slug]` consuming the collection, **or** document the collection as intentionally pre-wired; reconcile the `Ahmet Bassam` role and make `governance.*` reference people by id; add a coverage note to the build-prompts README.

### Theme K — `lib/` purity boundary  ·  **LOW**

`CLAUDE.md` reserves `lib/` for pure utilities, but `lib/analytics.ts` (reads `window`) and `lib/forms/inquirySubmit.ts` (full DOM controller: `getElementById`, `addEventListener`, `fetch`, `innerHTML` swaps, `CustomEvent`) are browser runtimes sitting beside the genuinely-pure schema/url/interpolate helpers. `inquirySubmit` also mixes validation + transport + analytics in one function, and builds the success panel via `innerHTML` string concatenation with an interpolated email (low-impact same-origin XSS-shaped pattern). `jobPosting.ts`/`localBusiness.ts` also export module-load-time-evaluated constants (incl. `new Date()`) instead of builder functions like every other schema file.
**Fix:** move browser-runtime modules under `src/runtime/` (or document `lib/forms` + `lib/analytics` as sanctioned exceptions); build the success panel with `createElement`/`textContent`; optionally normalize the two schema constants to builder functions.
**Effort:** M · **Risk:** low

### Theme L — Structural niceties (optional)  ·  **LOW**

- **`company.ts` cohesion (878L):** ~450 lines are three big domain *contracts* (`PackagingConfig`/`LogisticsConfig`/`QualityConfig`) that inflate the identity SSoT. Optionally extract them to `config/contracts/*`. (Not a rule violation — the file is correctly data+thin-helpers.)
- **`gallery.ts` layering:** composes alt-text marketing prose via template literals in a *config* module, bypassing the i18n token layer (facts *are* imported from `company`, so SSoT holds — it's a layering nit). Move prose to i18n with tokens.
- **`/components` folder convention:** some features use `feature/blocks/`, others are flat, `product` uses `grade/`; no predictable rule. Adopt and document one ("page-section blocks in `feature/blocks/`, reusable leaves in `feature/`").
- **OG image completeness:** `SEO.astro` emits `og:image` with no `width`/`height`/`alt` or `twitter:image:alt`; `resolveOgImage` discards the dimensions Astro already has. One-component fix affecting every page.
- **CSP `script-src 'unsafe-inline'`** (`_headers:6`) for the GA4/Meta inline bootstraps weakens the otherwise-strict CSP. Low real risk on a static site; move to hashed/nonce scripts when feasible, or document the deliberate tradeoff.

---

## 4. Ordered action plan (most critical → optional)

Each step is independently shippable. Steps 1–2 are rule-compliance and cheap; 3–6 are the high-leverage structural wins; 7–9 are consistency; 10–12 are cleanup and optional polish.

1. **Purge hardcoded company facts from i18n + fix the token root cause** (Theme A). Promote port/MOQ/spec tokens into `companyTokens()`, add the missing per-grade `fixedCarbon` token + palletized-tonnage field, swap all literals for tokens, and run `careers.json` through `fill()`. — *Critical (hard rule). S–M, low risk.*
2. **Move the remaining hardcoded UI strings into i18n** (Theme B): `TeamCard`, `MapsLite`, `contact/TrustStrip`. — *Medium (rule violation). S, low risk.*
3. **Introduce `HubLayout` + `ArticleLayout` and extract `RelatedTopics` / `MetaBand` / `HeroTrust` / `ChildEntitySection`** (Theme C). Do it one cluster at a time. Biggest maintainability win. — *High. L, medium risk.*
4. **Consolidate the two inquiry forms** into one prop-driven component; unify success-UX and the conversion event name (Theme D). — *High. L, medium risk.*
5. **De-duplicate the schema layer**: extract `webPageNode()`/`childWebPageRef()` + `clusterPageGraph()`, share `specProperty`, route abs-paths through `absoluteUrl()`, fix the `/logo.png` fallback, and finish the `ids.ts` migration (Theme F). — *Medium. M, low–medium risk.*
6. **Unify the WhatsApp CTA** to one renderer + shared SVG, resolve the `Button.whatsapp` vs `WhatsAppButton` split, and rename the duplicate `CTABanner`/`Hero` components (Theme E). — *Medium. M, medium risk.*
7. **Single-source breadcrumbs & page path** via a trail helper off `nav.ts` and a once-derived `path` per page (Theme G). Pairs with step 3. — *Medium. M, low risk.*
8. **Fix the analytics layer** (Theme H): un-gate the `[data-event]` listener from `isProd` so events are testable on preview; centralize the dual-dispatch for inline scripts; reconcile the event-name/param vocabulary against `CLAUDE.md` (or a typed registry). — *Medium. S–M, low risk.*
9. **Fix the content-collection enum drift + the 404 page** (Theme J): realign or delete the `products` collection enum so the Zod build can't fail on a stix/lotus SKU; bring `404.astro` up to its spec (popular products + inquiry CTA; reconcile the impossible "search" requirement). — *Medium. S–M, low risk.*
10. **Resolve the remaining inert scaffolding**: build or document the `/blog` pillar + `articles` collection; reconcile the `Ahmet Bassam` governance/people role conflict; delete the dead `FAQSection` schema branch; standardize the Maps embed on `MapsLite` (incl. `/contact`); note build-prompts coverage (Themes I + J). — *Low/Med. M.*
11. **Tidy the `lib/` purity boundary**: relocate or document the browser-runtime modules; build the success panel with DOM APIs; optionally normalize the two schema constants to builders (Theme K). — *Low. M.*
12. **Optional polish**: split `company.ts` contracts, move `gallery.ts` prose to i18n, adopt one `blocks/` folder rule, add `og:image` dimensions/alt, document the CSP `unsafe-inline` tradeoff (Theme L). — *Low.*

---

## 5. Notes & caveats

- **Verification is complete.** The run was interrupted once by a session usage limit, then resumed from cache. All **28 material (high/medium) findings were independently re-read against the code and confirmed — zero rejections, all high-confidence**; five were downgraded one notch (recorded inline above). Low-severity findings carry the auditor's original confidence; spot-check before acting if they touch shared code.
- **The completeness-critic pass ran** (blind-spot hunt: error/edge pages, content-collection drift, analytics listener coverage, escaping correctness). It produced three net-new findings (404 spec gap, `products` enum drift, prod-gated analytics) and one *attempted* correction that was itself wrong on re-read — see the FAQSection note in Theme J and the §1 verification box. Agent self-corrections were re-verified against source, not taken on faith.
- One limitation: the critic's structured output captured only its final batch of gaps (it referenced earlier ones it did not re-emit). The highest-value blind-spots were investigated and are included; a future RTL-readiness / a11y-structure / dependency-hygiene sweep would still add value and was not exhaustively run.
- No code was changed. All file:line references are as of 2026-06-18 on `main`.
