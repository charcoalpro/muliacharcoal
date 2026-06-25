# Content Audit — /contact

**Run date:** 2026-06-23
**Mode:** Diagnose-only (report, no fixes)
**Pillar:** supporting (conversion page; not part of a pillar cluster)
**Cornerstone:** no — meta-table / Devil's-Advocate absence is Hardening, not Defect
**Passes run:** 0, 1, 2, 3, 5 (Pass 6 OFF)

---

## 1. Manifest

| Field | Value |
|---|---|
| Page file | `src/pages/contact.astro` |
| Layout | `src/layouts/BaseLayout.astro` |
| Composition | Pure composition file: SEO meta + LocalBusiness schema + 11 blocks |
| Block components | `HeroSection`, `contact/blocks/TrustStrip`, `contact/blocks/WhatsAppPrimary`, `contact/blocks/SalesTeam`, `contact/blocks/ChannelGrid`, `contact/InquiryForm`, `contact/blocks/FindUs`, `contact/blocks/Hours`, `contact/MapEmbed`, `contact/blocks/Hotels`, `contact/blocks/Payment` |
| Shared components | `Breadcrumbs`, `Section`, `SectionHeading`, `ExternalLink`, plus card/table/people sub-components |
| i18n source | `src/i18n/en/contact.json` (consumed via `~/i18n/en`) |
| `company.ts` fields consumed | `legalName`, `brand`, `foundingYear`, `registration.nib`, `registration.taxId`, `certifications.iso9001.{standard,auditors}`, `certifications.imdg.{unNumber,class,classDescription}`, `address.*` (street/district/city/region/postalCode/country/short/latitude/longitude), `phone.{e164,display}`, `email`, `googleMapsUrl`, `hours.weekdays`, `payment.{mode,terms,currencies,bankCountry}`, `bank.{accountName,bankName,branch,bankAddress,accountNumber,swiftCode,iban,currency,lastVerified}`, `channels.*`, `travelHubs`, `holidays2026`, `lebaranShutdown`, `hotels`, `form.*`, plus helpers `getOwner/getDirector/getSales/getContactTeam/yearsInBusiness/waLinkFor/mailto` |
| Data sources behind config | `src/data/company.json`, `people.json`, `holidays.json`, `hotels.json`, `travel-hubs.json` |
| Schema types emitted (built HTML) | `Organization`, `WebSite` (from BaseLayout `includeOrgSchema`), `LocalBusiness` (`localBusinessSchema`), `BreadcrumbList` (from `Breadcrumbs`) |
| FAQPage present? | No (correct — page has no Q/A block) |
| H1 | Exactly one: "Contact our coconut charcoal factory" |
| Incoming permanent links | `headerNav` (`/contact`), `footerCompanyNav` (`/contact`), and `/contact` is in `LIVE_ROUTES` — not an orphan |

**Honesty-gating verdict (Pass 0/1 spot summary):** Every trust/fact block reads from `company.ts`/data JSON. Channel cards (WeChat, Telegram, Messenger, Botim, Max, Line, Viber, Zoom) are gated behind truthiness guards in `ChannelGrid.astro` and correctly omit when the handle is an empty string. Bank table renders only when `payment.mode === 'public'` (it is). Sales team filters out `TODO_PLACEHOLDER` names. No fabricated trust block found. No build run (already built; HTML inspected read-only).

---

## 2. Severity-tiered TODO list

### Blockers
*(honesty-gating violation, hardcoded company fact, fabricated/uncited claim, real orphan/broken pillar link, misplaced FAQPage, regulatory claim now factually wrong)*

**None.** No hardcoded company facts (every literal value traces to `company.ts`/data JSON). No fabricated trust block. No misplaced FAQPage. No orphan (header + footer + LIVE_ROUTES all link in). No factually-wrong regulatory claim.

### Defects

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| D1 | Defect | Pass 1 honesty-gating (meta-level) / Pass 5 trust | `src/i18n/en/contact.json` → `meta.description`; rendered `<meta name="description">` in `dist/contact/index.html` | Description advertises "WeChat, Telegram, video call" as available channels. In `company.json`, `channels.wechat.id` and `channels.telegram.url` are empty strings, so `ChannelGrid` correctly omits both — the rendered page offers neither WeChat nor Telegram. The meta promise contradicts the page, an over-promise that risks a badClick when a buyer arrives expecting WeChat/Telegram. (Only "video call" is genuinely present, via WhatsApp video.) | Rewrite the description to list only channels the page actually renders today (WhatsApp chat/voice/video, phone, SMS, email, inquiry form). Do NOT name WeChat/Telegram until their handles are populated in `company.ts`. Keep it honesty-gated in spirit even though meta is static. |
| D2 | Defect | Pass 1 SEO content / Pass 2 snippet (CLAUDE.md: title < 60 chars, keyword-front-loaded) | `dist/contact/index.html` `<title>`; source `meta.title` in `contact.json` interpolated with `{{legalName}}` + BaseLayout brand suffix | Rendered title = "Contact PT Coco Reina Global Charcoal Indonesia — Coconut Shisha Charcoal Factory \| Mulia Charcoal" ≈ 96 chars. Far over the 60-char budget; SERP-truncated, primary keyword pushed past the fold. | Shorten the title template so the interpolated legal name + brand suffix stays under ~60 chars (e.g. drop the full legal name from the visible title and lead with the keyword: "Contact — Coconut Shisha Charcoal Factory"). Do not hardcode the legal name; if it must appear, let it live only in the description/schema. (Title-tag *mechanics* are DrMax's; the content/length defect is in scope.) |
| D3 | Defect | Pass 1 SEO content (CLAUDE.md: meta description < 160 chars) | `meta.description` in `contact.json` | Rendered description ≈ 196 chars — over the 160-char budget; tail ("Sales team, factory address, bank details, holidays.") will be truncated. | Compress to ≤ 160 chars; fold D1 into the same rewrite so the trimmed text only names real channels and still earns the click (keep "factory in Semarang, Indonesia" + a conversion hook). |

### Hardening

| ID | tier | pass+rule | exact location | what is wrong | recommended fix (described) |
|---|---|---|---|---|---|
| H1 | Hardening | Pass 1 internal-linking (no contextual links out to pillars) | Body of `contact.astro` (all 11 blocks) | The page body links out only to `/legal/privacy-policy` (form consent), plus external Google Maps and `tel:`/`mailto:`/WhatsApp. No contextual link to any pillar (Products, Logistics, Quality, Factory, Guide). Header/footer carry those links, but the conversion flow has no in-content "next step" to product or logistics info for a buyer who lands here mid-research. Not a Blocker — `/contact` is a supporting page, not a cluster page that owes a first-paragraph up-link. | Add a light "related" or "before you message us" pointer in a low-emphasis spot (e.g. near the inquiry form or hero microcopy) linking to `/products`, `/logistics`, and `/quality` so a buyer can self-serve specs before converting. Use `MaybeLink`/`isLive()`-aware links. |
| H2 | Hardening | Pass 1 honesty / Pass 3 geo consistency | Map caption `map.captionTemplate` ("… exact pin pending GPS confirmation") vs. `localBusinessSchema.geo` + `FindUs` directions link, both built from `address.latitude/longitude` = `-6.9667, 110.4167` | The visible caption honestly hedges that the pin is unconfirmed, but those coordinates are the rounded Semarang city centroid (4-dp, low precision) and are emitted as authoritative `GeoCoordinates` in LocalBusiness schema and as the destination of the "Get directions" deep link. Content-level honesty tension: the page tells humans the pin is provisional while machine-readable data presents a city-center point as the factory location. | Once the real factory pin is confirmed, update `address.latitude/longitude` in `company.ts` and drop the "pending GPS confirmation" hedge from the i18n caption. Until then, consider not emitting precise-looking 4-dp coords as the factory `geo`, or keep the hedge but acknowledge the directions link lands at the district, not the gate. (Schema *validity* is DrMax's; this is the content/honesty layer.) |
| H3 | Hardening | Pass 1 GEO meta table (minor page) | Whole page | No top-of-page meta table (Author / Reviewed by / Fact-checked / Last updated / Read time). Per the run scope this is Hardening on a minor page, not a Defect. A contact page arguably does not need the full article meta table, but a visible "details last verified" date (hours/holidays/bank already carry their own dates) could be surfaced page-level for freshness signalling. | Optional: add a single "Contact details last reviewed: {{date}}" line sourced from a `company.ts` field rather than the full article meta table. Low priority for a conversion page. |
| H4 | Hardening | Pass 2 Devil's Advocate (minor page) | Whole page | No steelman/counterargument section. Per scope this is Hardening on a minor page and is effectively N/A for a transactional contact page — no thesis to steelman. | No action required; recorded for completeness. |

---

## 3. Claims register

| Claim in page | Status | Severity | Correction / comment | Source |
|---|---|---|---|---|
| "Exporting since 2015" / "{{years}} years in operation" (TrustStrip) | Correct | Low | `foundingYear: 2015`; `yearsInBusiness()` computes from it. Self-consistent. | company.ts (`company.json` foundingYear) |
| Legal entity "PT Coco Reina Global Charcoal Indonesia" (TrustStrip, FindUs address, schema legalName, bank beneficiary) | Correct | Low | Single source; consistent everywhere. | company.ts |
| NIB / NPWP values (TrustStrip badges, schema `identifier[]`, `vatID`/`taxID`) | Correct | Low | Both read from `registration.nib` / `registration.taxId`. | company.ts |
| "ISO 9001:2015 — Audited by Carsurin & Beckjorindo" (TrustStrip) | Unverified | Medium | Auditor names are plausible real Indonesian inspection/cert bodies (Carsurin; Beckjorindo Paryaweksana), but that these are *this factory's* ISO 9001 certifying/auditing bodies is asserted from `company.json` and not independently corroborated in this audit. Held-cert claim, correctly distinct from per-order reports. | company.ts (`certifications.iso9001`) — needs external confirmation |
| "IMDG UN 1361 / 4.2 — spontaneous combustion" (TrustStrip) | Correct | Low | UN 1361 (carbon, animal or vegetable origin) Class 4.2 / spontaneously-combustible is correct classification. Held-fact label, not a per-shipment SP-978 claim. | company.ts (`certifications.imdg`); model knowledge |
| "Typical WhatsApp response time: under 2 hours during business days (GMT+7)" / "we respond within 2 hours" (hero, whatsappPrimary) | Unverified | Low | Operational SLA promise; `hours.responseHours: 2` exists in config but is a self-asserted service level, not externally verifiable. Consistent across blocks. | company.ts (`hours.responseHours`) — self-declared |
| Business hours "Monday–Saturday 08:00–16:00 GMT+7", Sun closed | Correct | Low | Matches `hours.weekdays` and `openingHoursSpecification` in schema (Mon–Sat 08:00–16:00). Consistent. | company.ts |
| 2026 public holidays table + Lebaran shutdown 2026-03-21 → 2026-03-27 (order cutoff) | Unverified | Low | Indonesian 2026 public-holiday dates and the Idul Fitri window are date-specific; not cross-checked against the official 2026 SKB holiday decree in this audit. | company.ts (`holidays2026`, `lebaranShutdown`) — needs external confirmation |
| Bank details (BCA, branch Jepara, acct 247 1122 141, SWIFT CENAIDJAXXX), "Last verified by phone with the director on 2026-04-25" | Unverified | Medium | Banking fact; correctly NOT emitted into schema (localBusiness builder explicitly excludes bank data). The phone-verification anti-fraud framing is preserved. Value correctness can only be confirmed by the company. | company.ts (`bank.*`) — owner-confirmed only |
| Map pin / geo `-6.9667, 110.4167` presented as factory location | Unverified | Medium | City-centroid coordinates; caption itself says "exact pin pending GPS confirmation." See H2. | company.ts (`address.lat/long`) — provisional by the page's own admission |
| Meta description lists "WeChat, Telegram" as channels | Error | Medium | Page does not render WeChat or Telegram (handles empty in config). See D1. | Contradicted by company.ts (`channels.wechat.id`/`telegram.url` empty) |
| Travel-hub distances / drive times (FindUs hubs table), hotel distances & drive times (Hotels) | Unverified | Low | Distances/times are specific numeric claims sourced from `travel-hubs.json` / `hotels.json`; not road-checked here. Low reputational risk. | company.ts (data JSON) — needs spot-check |

---

## 4. Requires deep research

Route these to the deep-research companion prompt (none block launch; all are accuracy/reputation hardening):

1. **ISO 9001:2015 certifying/auditing bodies** — confirm that Carsurin and Beckjorindo (Paryaweksana) are the actual bodies behind this factory's ISO 9001:2015 certificate, and that the certificate is current. Markets: USA, UK, Germany (buyers most likely to request the certificate). *Why:* a named-auditor claim that cannot be substantiated is a reputation risk on a trust strip.
2. **Indonesia 2026 public-holiday calendar + Idul Fitri/Lebaran window** — verify the dates in `holidays2026` and the 2026-03-21 → 2026-03-27 shutdown against the official Indonesian joint-decree (SKB) holiday list. Markets: all. *Why:* buyers plan shipment cut-offs against these dates; an error misleads order timing.
3. **Factory GPS pin** — obtain the confirmed gate coordinates to replace the Semarang centroid (resolves H2 and the "pending GPS confirmation" hedge). Markets: all (audit/visit planning). *Why:* directions link and schema geo currently resolve to city center.
4. **Travel-hub and hotel distance/drive-time figures** — spot-verify the FindUs hub table and hotel cards. Markets: all (buyer-visit logistics). *Why:* low risk but cheap to confirm; wrong drive times annoy visiting buyers.

---

## 5. E-E-A-T / HCU assessment

| Criterion | Score /10 | Justification |
|---|---|---|
| Authorship & expertise | 7 | Named owner/director and sales team with roles and direct lines; strong real-person signals. No "reviewed by" on the page itself. |
| Topical authority | 7 | Deep B2B contact surface (11 blocks: channels, hours, holidays, banking, hotels, audits) signals a serious exporter; little topical content though (expected for a contact page). |
| Technical health & freshness | 8 | Clean schema set (Organization/WebSite/LocalBusiness/BreadcrumbList), per-section dates (bank, holidays). CWV/Lighthouse deferred to DrMax/CLAUDE.md budgets, not re-measured. |
| Effort | 9 | Exceptionally thorough for a contact page — anti-fraud banking guidance, airport-pickup note, hotel tiers, holiday cut-offs. Clear human investment. |
| Originality | 8 | Content is specific to this factory (real names, real bank, real holidays) rather than boilerplate. |
| Citation quality | 5 | Trust claims (ISO auditors, holidays) are self-asserted with no link to a certificate or source. No outbound authority links. |
| Freshness / timeliness | 7 | Bank "last verified 2026-04-25", 2026 holiday table, Lebaran 2026 dates — current. No page-level freshness stamp. |
| Page intent | 9 | Intent (convert a wholesale buyer to contact) is unmistakable; WhatsApp-first, multiple fallbacks, inquiry form. Strong match. |
| Structure & readability | 8 | Logical block order, semantic sections, single H1, data tables, definition-free but appropriate. Title/description over budget (D2/D3) is the main structural ding. |
| Mobile | 8 | Snap-scroll trust strip, responsive grids, 44px-class touch targets in CTAs; designed mobile-first per CLAUDE.md. Not re-measured. |
| Format-standard adherence | 7 | Honesty-gating, i18n, and no-hardcoded-fact rules all respected. Meta title/description exceed length standards (D2/D3); meta over-promises channels (D1). |
| Trust & spam signals | 8 | Anti-fraud bank warning, "never send to a personal account", phone-verification framing — strong trust posture; bank kept out of schema. WeChat/Telegram meta over-promise slightly dents it. |

**PQ (arithmetic mean of 12):** (7+7+8+9+8+5+7+9+8+8+7+8) / 12 = **91 / 120 = 7.58 / 10**

**Verdict:** **Helpful-first.** The page exists to help a real buyer reach a real factory through their preferred channel, with unusual operational candor (banking fraud guidance, holiday cut-offs, visit logistics). goodClicks prognosis is strong: a buyer who lands here can convert in one tap. The few search-first dents are at the meta layer (over-long title, channel over-promise) and the provisional map pin — none undermine the page's core helpfulness.

**Lowest-3 action steps:**
1. **Citation quality (5):** Surface a link/reference behind the ISO 9001 and IMDG trust badges (link to `/quality/certifications` and `/logistics/un-1361`) so the held-cert claims are substantiable rather than bare assertions — also resolves part of H1's internal-linking gap.
2. **Format-standard adherence (7) / meta layer:** Fix D1 (drop WeChat/Telegram from the description), D2 (cut title to < 60 chars), D3 (cut description to < 160 chars) in one pass.
3. **Freshness/timeliness (7):** Add a single page-level "contact details last reviewed: {{date}}" sourced from `company.ts` (H3) so the whole page carries a freshness signal, not just the bank/holiday sub-blocks.

---

*End of audit. Diagnose-only — no source files modified.*
