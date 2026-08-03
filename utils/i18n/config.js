export const LOCALE_COOKIE_NAME = "portfolio-locale";
export const DEFAULT_LOCALE = "vi";
export const SUPPORTED_LOCALES = ["vi", "en"];

export function normalizeLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
}
