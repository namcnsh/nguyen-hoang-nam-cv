# English/Vietnamese Portfolio Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add cookie-based EN/VI language toggle for all visible portfolio text, dashboard text, form messages, aria labels, and metadata without changing URLs.

**Architecture:** Build a small local i18n layer. Server reads `portfolio-locale` cookie for `<html lang>` and metadata; client provider exposes locale/dictionary and navbar toggle writes cookie then refreshes.

**Tech Stack:** Next.js 16 App Router, React 19, JS modules, cookies from `next/headers`, `next/navigation`, existing Tailwind classes.

---

## File structure

- Create `utils/i18n/config.js`: locale constants, cookie name, normalizer.
- Create `utils/i18n/dictionaries.js`: translated data/messages copied from existing repo text plus direct English translations.
- Create `app/components/i18n-provider.jsx`: client context/provider + `useI18n` hook.
- Modify `app/layout.js`: dynamic metadata, cookie locale, provider wrapping, dynamic `<html lang>`.
- Modify `app/components/navbar.jsx`: consume labels, add VI/EN toggle.
- Modify `app/components/footer.jsx`: consume footer copy.
- Modify homepage components under `app/components/homepage/*`: replace hardcoded/imported Vietnamese text with dictionary data.
- Modify `app/dashboard-demo/page.js`: dynamic metadata by cookie.
- Modify `app/components/dashboard-demo-page/index.jsx`: replace all dashboard strings with localized dictionary data.

---

### Task 1: Add i18n config and dictionary

**Files:**
- Create: `utils/i18n/config.js`
- Create: `utils/i18n/dictionaries.js`

- [ ] **Step 1: Create config module**

Create `utils/i18n/config.js`:

```js
export const LOCALE_COOKIE_NAME = "portfolio-locale";
export const DEFAULT_LOCALE = "vi";
export const SUPPORTED_LOCALES = ["vi", "en"];

export function normalizeLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
}
```

- [ ] **Step 2: Create dictionary module shell**

Create `utils/i18n/dictionaries.js`:

```js
export const dictionaries = {
  vi: {
    metadata: {
      home: {
        title: "Portfolio of Nguyễn Hoàng Nam - Performance Marketing Specialist",
        description: "CV Landing Page của Nguyễn Hoàng Nam - Performance Marketing Specialist. Chuyên gia tối ưu quảng cáo, phân tích dữ liệu, thiết kế landing page và ứng dụng AI Marketing.",
      },
      dashboard: {
        title: "Dashboard phân tích quảng cáo - Nguyễn Hoàng Nam",
        description: "Dashboard minh họa cách phân tích hiệu quả quảng cáo theo kênh, lead, CPL và CTR.",
      },
    },
  },
  en: {
    metadata: {
      home: {
        title: "Nguyễn Hoàng Nam Portfolio - Performance Marketing Specialist",
        description: "CV landing page of Nguyễn Hoàng Nam, Performance Marketing Specialist. Specialist in ad optimization, data analysis, landing page design, and AI Marketing applications.",
      },
      dashboard: {
        title: "Advertising Analytics Dashboard - Nguyễn Hoàng Nam",
        description: "A dashboard demonstrating how advertising performance is analyzed by channel, lead, CPL, and CTR.",
      },
    },
  },
};

export function getDictionary(locale) {
  return dictionaries[locale] ?? dictionaries.vi;
}
```

- [ ] **Step 3: Expand dictionary with current repo content**

Add keys for `nav`, `personal`, `aboutHighlights`, `experiences`, `educations`, `projects`, `contact`, `footer`, and `dashboard`. Copy Vietnamese strings exactly from current files, then add direct English translations. Keep names, URLs, numeric values, and tool names unchanged.

- [ ] **Step 4: Validate module imports**

Run:

```bash
npm run lint
```

Expected: lint may still show existing usage gaps later; config/dictionary syntax must not throw parser errors.

---

### Task 2: Add client i18n provider

**Files:**
- Create: `app/components/i18n-provider.jsx`

- [ ] **Step 1: Create provider**

Create `app/components/i18n-provider.jsx`:

```jsx
"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, normalizeLocale } from "@/utils/i18n/config";
import { getDictionary } from "@/utils/i18n/dictionaries";

const I18nContext = createContext(null);

export function I18nProvider({ initialLocale = DEFAULT_LOCALE, children }) {
  const router = useRouter();
  const [locale, setLocaleState] = useState(normalizeLocale(initialLocale));

  const value = useMemo(() => {
    const dictionary = getDictionary(locale);

    function setLocale(nextLocale) {
      const normalizedLocale = normalizeLocale(nextLocale);
      document.cookie = `${LOCALE_COOKIE_NAME}=${normalizedLocale}; path=/; max-age=31536000; samesite=lax`;
      setLocaleState(normalizedLocale);
      router.refresh();
    }

    return { locale, dictionary, setLocale };
  }, [locale, router]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}
```

- [ ] **Step 2: Run lint**

Run:

```bash
npm run lint
```

Expected: provider has no lint/parser errors.

---

### Task 3: Wire server layout and metadata

**Files:**
- Modify: `app/layout.js`

- [ ] **Step 1: Replace static metadata export**

In `app/layout.js`, import cookies/config/dictionary/provider. Replace `export const metadata` with `export async function generateMetadata()` reading cookie and returning `dictionary.metadata.home`.

- [ ] **Step 2: Wrap app in provider**

In `RootLayout`, read cookie, normalize locale, set `<html lang={locale}>`, and wrap `ToastContainer`, `main`, and `Footer` with `I18nProvider initialLocale={locale}`.

Target shape:

```jsx
import { cookies } from "next/headers";
import { I18nProvider } from "./components/i18n-provider";
import { LOCALE_COOKIE_NAME, normalizeLocale } from "@/utils/i18n/config";
import { getDictionary } from "@/utils/i18n/dictionaries";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);
  return getDictionary(locale).metadata.home;
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <I18nProvider initialLocale={locale}>
          <ToastContainer />
          <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
            <Navbar />
            {children}
            <ScrollToTop />
          </main>
          <Footer />
        </I18nProvider>
        {process.env.NEXT_PUBLIC_GTM && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Run build check**

Run:

```bash
npm run build
```

Expected: build reaches Next.js compilation; fix import/server-client boundary errors before continuing.

---

### Task 4: Localize navbar and footer

**Files:**
- Modify: `app/components/navbar.jsx`
- Modify: `app/components/footer.jsx`
- Modify: `utils/i18n/dictionaries.js`

- [ ] **Step 1: Add nav/footer dictionary keys**

Add `nav.items`, `nav.homeAriaLabel`, `nav.openMenuAriaLabel`, `nav.closeMenuAriaLabel`, `nav.languageLabel`, and `footer.copyrightPrefix` for both locales.

- [ ] **Step 2: Update Navbar**

Use `useI18n()`. Build hrefs from dictionary labels. Add two buttons `VI` and `EN`, `aria-label={dictionary.nav.languageLabel}`, `aria-pressed={locale === "vi"}` or `en`, calling `setLocale("vi")` / `setLocale("en")`.

- [ ] **Step 3: Update Footer**

Use `useI18n()` and render `dictionary.footer.copyrightPrefix` before the LinkedIn link.

- [ ] **Step 4: Run lint**

Run:

```bash
npm run lint
```

Expected: no new lint errors in navbar/footer/provider.

---

### Task 5: Localize homepage sections

**Files:**
- Modify: `app/components/homepage/hero-section/index.jsx`
- Modify: `app/components/homepage/about/index.jsx`
- Modify: `app/components/homepage/featured-case-studies/index.jsx`
- Modify: `app/components/homepage/experience/index.jsx`
- Modify: `app/components/homepage/skills/index.jsx`
- Modify: `app/components/homepage/education/index.jsx`
- Modify: `app/components/homepage/projects/index.jsx`
- Modify: `app/components/homepage/contact/index.jsx`
- Modify: `app/components/homepage/contact/contact-form.jsx`
- Modify: `utils/i18n/dictionaries.js`

- [ ] **Step 1: Add homepage dictionary keys**

Add translated structures:

```js
home: {
  hero: { contactCta: "Liên hệ ngay", caseStudyCta: "Xem case study", focusTags: [...] },
  sections: { about: "Giới thiệu", featuredCaseStudies: "Case study nổi bật", experience: "Kinh nghiệm", skills: "Kỹ năng", education: "Học vấn", projects: "Dự án", contact: "Liên hệ" },
  aboutEyebrow: "Tôi là ai?",
  aboutHighlights: [...],
}
personal: { name, profile, designation, description, email, phone, address, github, facebook, linkedIn, twitter, stackOverflow, leetcode, devUsername, resume }
experiences: [...]
educations: [...]
projects: [...]
contact: { phoneLabel, addressLabel, socialLabel, formTitle, formDescription, nameLabel, emailLabel, messageLabel, invalidEmail, requiredFields, sending, sendMessage, success }
common: { roleLabel: "Role", viewDemo: "Xem demo" }
```

Use English equivalents under `en`.

- [ ] **Step 2: Replace data imports**

In each component, import `useI18n` and read `const { dictionary } = useI18n();`. Replace imports from `utils/data/*` with `dictionary.personal`, `dictionary.experiences`, `dictionary.educations`, `dictionary.projects`, and `dictionary.home` as needed. Keep `skillsImage` import in skills.

- [ ] **Step 3: Update contact form messages**

In `contact-form.jsx`, use dictionary contact strings for labels, description, validation errors, loading state, submit button, and success toast. Keep axios payload unchanged.

- [ ] **Step 4: Run lint**

Run:

```bash
npm run lint
```

Expected: no undefined dictionary properties or hook misuse errors.

---

### Task 6: Localize dashboard page and metadata

**Files:**
- Modify: `app/dashboard-demo/page.js`
- Modify: `app/components/dashboard-demo-page/index.jsx`
- Modify: `utils/i18n/dictionaries.js`

- [ ] **Step 1: Update dashboard metadata**

Replace static metadata in `app/dashboard-demo/page.js` with cookie-based `generateMetadata()` using `getDictionary(locale).metadata.dashboard`.

- [ ] **Step 2: Move dashboard strings into dictionary**

Add `dashboard.metricOptions`, `comparisonOptions`, `summary`, `budgetMix`, `channelCards`, `insights`, `nextActions`, `labels`, and `aria` for Vietnamese and English. Keep metric keys, channel keys, numeric values, colors, and raw chart rows unchanged.

- [ ] **Step 3: Update dashboard component**

Import `useI18n`. Replace local arrays containing user-facing strings with `dictionary.dashboard.*`. Keep `performanceSeries`, `channelConfig` keys, `formatMetricValue`, chart calculations, and state keys unchanged.

- [ ] **Step 4: Run build**

Run:

```bash
npm run build
```

Expected: dashboard compiles and route metadata compiles.

---

### Task 7: Final verification

**Files:**
- Review all modified files above.

- [ ] **Step 1: Run lint**

Run:

```bash
npm run lint
```

Expected: exit code 0.

- [ ] **Step 2: Run production build**

Run:

```bash
npm run build
```

Expected: exit code 0.

- [ ] **Step 3: Manual browser check**

Run:

```bash
npm run dev
```

Expected: Next dev server starts. Check homepage and `/dashboard-demo`: VI default, EN toggle changes visible text, reload persists, URL unchanged.

---

## Self-review

- Spec coverage: Tasks cover cookie locale, provider, metadata, homepage, dashboard, form/toast/aria, verification.
- Placeholder scan: No TBD/TODO/fill-later markers. Dictionary expansion is explicit about required keys and source constraints.
- Type consistency: Locale keys are `vi`/`en`; cookie name is `portfolio-locale`; provider API is `{ locale, dictionary, setLocale }` throughout.
