# English/Vietnamese Portfolio Toggle Design

Date: 2026-08-03

## Goal

Add English language support to the existing portfolio without changing URLs. Users can switch between Vietnamese and English from the UI. The selected language persists across homepage and subpages, including `/dashboard-demo`.

## Constraints

- Work only from text already present in the repository.
- English content is a direct translation of existing Vietnamese-visible text, metadata, aria labels, toast messages, validation messages, and dashboard copy.
- No new i18n library unless required. The repo currently uses Next.js App Router, React, and local JS data files.
- URLs remain unchanged.
- Metadata should follow the selected language on a best-effort basis using a cookie.

## Recommended approach

Use cookie-based i18n shared by server and client.

- Cookie name: `portfolio-locale`.
- Supported locales: `vi`, `en`.
- Default locale: `vi`.
- Server components read the cookie and pass the active locale into client components/providers.
- Client toggle updates the cookie, updates UI state, and refreshes the current route so server-rendered metadata can re-read the cookie.

## Architecture

Create a small local i18n module instead of introducing a third-party package.

Expected units:

- `utils/i18n/config.js`: supported locales, default locale, cookie name, normalization helper.
- `utils/i18n/dictionaries.js`: UI strings, metadata strings, and translated portfolio data.
- `app/components/i18n-provider.jsx`: client provider exposing active locale, setter, and dictionary.
- Existing page/component files consume dictionary/data instead of importing Vietnamese-only constants directly.

## Data flow

1. `app/layout.js` reads `portfolio-locale` from cookies.
2. `RootLayout` sets `<html lang>` to the active locale.
3. `RootLayout` wraps children, navbar, footer, and toast container in an i18n provider.
4. Navbar renders a VI/EN toggle.
5. Toggle writes `portfolio-locale`, updates provider state, and refreshes route.
6. Components read translated labels/data from the provider.
7. `generateMetadata` reads the cookie and returns Vietnamese or English metadata.

## Pages and content scope

Translate all visible user-facing strings in:

- Homepage sections: hero, featured case studies, about, experience, skills, education, projects, contact.
- Navigation and footer.
- Contact form labels, helper copy, validation errors, loading text, success/error handling where applicable.
- `/dashboard-demo` metadata and all dashboard UI strings, including controls, headings, notes, chart descriptions, aria labels, and back link.

Keep non-language data unchanged unless translation is directly required:

- Name, email, phone, social URLs, demo URLs.
- Numeric dashboard values and raw metrics.
- Technology/tool names such as Meta Ads, Google Ads, TikTok Ads, HTML, CSS, Git, Canva, Figma.

## Metadata behavior

Because URLs remain unchanged, metadata cannot be statically separated per route/language. Use best-effort dynamic metadata:

- `app/layout.js` exposes `generateMetadata` using the active locale cookie for homepage/default metadata.
- `app/dashboard-demo/page.js` exposes `generateMetadata` using the same cookie.
- When users toggle language, the client refreshes the route so metadata can update for subsequent server rendering.

## Error handling

- Invalid or missing cookie values fall back to `vi`.
- If dictionary lookup is missing, implementation should prefer explicit dictionary usage rather than guessing fallback text during render.
- Contact API payload remains unchanged.
- Toast error from server can remain server-provided when present; fixed UI toast copy should be localized.

## Testing and verification

Manual checks:

- Homepage loads in Vietnamese by default.
- Toggle switches all homepage text to English without URL change.
- Reload keeps selected language.
- `/dashboard-demo` uses the selected language.
- Metadata for homepage and dashboard reflects the selected cookie language after refresh.
- Contact form validation, loading text, success toast, and aria labels localize.

Commands to run after implementation:

- `npm run lint`
- `npm run build`

## Out of scope

- New `/en` route or subdomain.
- Machine translation from external sources.
- Adding a full i18n framework.
- Changing design, layout, colors, or portfolio facts beyond language translation.
