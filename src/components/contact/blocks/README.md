# /contact/blocks/

Page-section blocks for `/contact`. One file per Block 1–11 (see
`src/pages/contact.astro` for the canonical display order).

## Convention

Each block component:

1. **Owns one numbered section of the page** — TrustStrip, WhatsAppPrimary,
   SalesTeam, ChannelGrid, FindUs, Hours, Hotels, Payment, … The page file
   does nothing but place them in order.

2. **Pulls its own data.** A block imports `getLocale()`, reads its slice
   of i18n (`en.contact.whatsappPrimary`, `en.contact.hours`, …), calls
   accessors from `~/config/company` (`getDirector`, `getSales`,
   `getContactTeam`, `waLinkFor`), and assembles its own props for any
   leaf components it renders.

3. **Composes leaf components only.** Channel cards, hotel cards, trust
   badges live next to the blocks (one level up in `/contact/`) and are
   imported here.

4. **Hides itself when its data is empty.** Hotels, channels, sales-team
   entries with `name.startsWith('TODO_PLACEHOLDER')` must not render —
   filter them out at the top of the frontmatter, not inside the template.

## Where to put a new file

- **A new contact page section?** → new file here.
- **A leaf used by 2+ blocks on /contact only?** → `src/components/contact/`
  (parent level, e.g. `ChannelCard.astro`, `HotelCard.astro`,
  `TrustBadge.astro`, `MapEmbed.astro`).
- **A leaf shared with /about or other pillars?** →
  `src/components/content/`.
