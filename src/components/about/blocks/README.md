# /about/blocks/

Page-section blocks for `/about`. One file per section, in display order.

## Convention

Each block component:

1. **Owns one named section of the page** (Hero, CompanyOverview, MissionVision,
   Team, Banking, Reviews, …). The block is the entry point for that section
   — `about.astro` does nothing but `<Hero />`, `<CompanyOverview />`, etc.

2. **Pulls its own data.** A block imports `getLocale()` and reads its slice
   of the translation tree (`en.about.block2`), imports `company` and the
   relevant accessors (`getOwner`, `getOperations`), and runs `fill()` for
   token interpolation. The parent page does not pre-build data and pass it
   in as props.

3. **Composes leaf components only.** A block renders `ColorBlock`,
   `StatItem`, `TeamCard`, `ImagePlaceholder`, `TextLink`, etc. — never
   another block.

4. **Conditionally renders TODO_PLACEHOLDER rows.** Use `hasFact(value)` to
   skip rows whose underlying fact is still a placeholder.

## Where to put a new file

- **A new page section?** → new file here.
- **A primitive used by 2+ blocks on /about only?** → `src/components/about/`
  (parent level, e.g. `ColorBlock.astro`, `StatItem.astro`).
- **A primitive used by /about and another pillar?** →
  `src/components/content/` (TeamCard, BankDetailsTable live here).
- **A page-section that re-uses the same shape across multiple pillar pages?**
  → consider extracting to `src/components/content/` and keeping a thin
  wrapper here.
