"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, normalizeLocale } from "../../utils/i18n/config";
import { getDictionary } from "../../utils/i18n/dictionaries";

const I18nContext = createContext(null);

export function I18nProvider({ initialLocale = DEFAULT_LOCALE, children }) {
  const router = useRouter();
  const [locale, setLocaleState] = useState(() => normalizeLocale(initialLocale));

  useEffect(() => {
    setLocaleState(normalizeLocale(initialLocale));
  }, [initialLocale]);

  const setLocale = useCallback(
    (nextLocale) => {
      const normalizedLocale = normalizeLocale(nextLocale);

      document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(normalizedLocale)}; path=/; max-age=31536000; samesite=lax`;
      setLocaleState(normalizedLocale);
      router.refresh();
    },
    [router],
  );

  const dictionary = useMemo(() => getDictionary(locale), [locale]);

  const value = useMemo(
    () => ({
      locale,
      dictionary,
      setLocale,
    }),
    [dictionary, locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}
