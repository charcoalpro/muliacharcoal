/**
 * Shared schema identity constants.
 *
 * `siteOrigin`, `ORG_ID`, and `WEBSITE_ID` used to live in `organization.ts`,
 * which forced every schema builder (breadcrumbs, video, glossary terms,
 * how-to, …) to depend on the Organization module just to reach a constant.
 * They live here now so non-Organization builders import a tiny constants
 * module instead. `organization.ts` re-exports them for back-compat.
 */
import { siteOrigin as resolveSiteOrigin } from '~/lib/url';

/** Canonical site origin (scheme + host, no trailing slash). */
export const siteOrigin = resolveSiteOrigin();

/** `@id` of the sitewide Organization node. */
export const ORG_ID = `${siteOrigin}/#organization`;

/** `@id` of the sitewide WebSite node. */
export const WEBSITE_ID = `${siteOrigin}/#website`;
