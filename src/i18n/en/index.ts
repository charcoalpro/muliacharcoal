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
import glossary from './glossary.json';
import faq from './faq.json';
import products from './products.json';
import samples from './samples.json';
import packaging from './packaging.json';
import packagingMasterBox from './packagingMasterBox.json';
import packagingInnerBox from './packagingInnerBox.json';
import packagingPlastic from './packagingPlastic.json';
import packagingWhiteLabel from './packagingWhiteLabel.json';
import packagingAdditional from './packagingAdditional.json';
import logistics from './logistics.json';
import logisticsCommon from './logisticsCommon.json';
import logisticsRules from './logisticsRules.json';
import logisticsDocuments from './logisticsDocuments.json';
import logisticsUn1361 from './logisticsUn1361.json';
import logisticsDgRegulation from './logisticsDgRegulation.json';
import logisticsShippingLines from './logisticsShippingLines.json';
import logisticsCargoProtection from './logisticsCargoProtection.json';
import logisticsImportUsa from './logisticsImportUsa.json';
import quality from './quality.json';
import qualityCommon from './qualityCommon.json';
import qualitySpecs from './qualitySpecs.json';
import qualityTesting from './qualityTesting.json';
import qualityCerts from './qualityCerts.json';
import productGrade from './productGrade.json';
import productCategory from './productCategory.json';
import productMarket from './productMarket.json';

const en = {
  ...common,
  footer,
  contact,
  about,
  home,
  careers,
  glossary,
  faq,
  products,
  samples,
  packaging,
  packagingMasterBox,
  packagingInnerBox,
  packagingPlastic,
  packagingWhiteLabel,
  packagingAdditional,
  logistics,
  logisticsCommon,
  logisticsRules,
  logisticsDocuments,
  logisticsUn1361,
  logisticsDgRegulation,
  logisticsShippingLines,
  logisticsCargoProtection,
  logisticsImportUsa,
  quality,
  qualityCommon,
  qualitySpecs,
  qualityTesting,
  qualityCerts,
  productGrade,
  productCategory,
  productMarket,
};

export default en;
