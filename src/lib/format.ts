/**
 * Substitute {token} placeholders in a string with values from `vars`.
 *
 * Used to keep translatable prose in i18n while pulling embedded facts
 * (year, NIB, address, …) from src/config/company.ts at render time.
 */
export function format(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const v = vars[key];
    return v == null ? '' : String(v);
  });
}
