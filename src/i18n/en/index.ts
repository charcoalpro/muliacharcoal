/**
 * i18n barrel — reassembles the per-feature JSON files into the merged
 * shape every component consumes (`en.home.*`, `en.contact.*`, `en.nav.*`).
 *
 * Splitting the bag of strings by page area keeps translator diffs small
 * (a buyer-targeted contact-page tweak only touches `contact.json`) and
 * lets reviewers see which area a change belongs to without scrolling
 * past 800 lines. The merged default export preserves the exact import
 * contract every existing call site already uses — see [src/lib/interpolate.ts](src/lib/interpolate.ts).
 *
 * Adding a locale: copy this directory to `src/i18n/<code>/`, translate
 * the JSON values, mirror this barrel. Register the locale in
 * [src/config/i18n.ts](src/config/i18n.ts) ACTIVE_LOCALES.
 */
import common from './common.json';
import footer from './footer.json';
import contact from './contact.json';
import about from './about.json';
import home from './home.json';
import careers from './careers.json';

const en = {
  ...common,
  footer,
  contact,
  about,
  home,
  careers,
};

export default en;
