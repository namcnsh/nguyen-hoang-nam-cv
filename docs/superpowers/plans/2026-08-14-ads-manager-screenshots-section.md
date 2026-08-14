# Ads Manager Screenshots Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a polished homepage section showing real ads manager screenshots from Google Ads, Facebook Ads, and TikTok Ads.

**Architecture:** Create one focused homepage component for the gallery, render it after `Experience`, serve the screenshots from `public/ads-capture/`, and add bilingual labels/copy to the existing dictionary structure. Use measured image dimensions with `next/image` so layout and optimization are based on actual files.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS classes, `next/image`, existing i18n dictionary via `useI18n`.

---

## File Structure

- Create: `app/components/homepage/ads-screenshots/index.jsx`
  - Responsibility: render the section, screenshot data, cards, badges, and images.
- Modify: `app/page.js`
  - Responsibility: import and place the section immediately after `<Experience />`.
- Modify: `utils/i18n/dictionaries.js`
  - Responsibility: add `adsScreenshots` section label and `adsScreenshotsIntro` copy in both `vi.home` and `en.home`.
- Create/copy assets:
  - `public/ads-capture/ads-google-image-1.png`
  - `public/ads-capture/ads-google-image-2.png`
  - `public/ads-capture/ads-google-image-3.png`
  - `public/ads-capture/ads-facebook-image-1.png`
  - `public/ads-capture/ads-tiktok-image-1.png`

## Task 1: Copy Screenshots To Public Assets

**Files:**
- Create: `public/ads-capture/ads-google-image-1.png`
- Create: `public/ads-capture/ads-google-image-2.png`
- Create: `public/ads-capture/ads-google-image-3.png`
- Create: `public/ads-capture/ads-facebook-image-1.png`
- Create: `public/ads-capture/ads-tiktok-image-1.png`

- [ ] **Step 1: Verify source folder and public folder exist**

Run:

```bash
ls -la "Ads Capture" && ls -la public
```

Expected: `Ads Capture` lists the five screenshot files; `public` exists.

- [ ] **Step 2: Create destination folder**

Run:

```bash
mkdir -p public/ads-capture
```

Expected: command exits with code 0.

- [ ] **Step 3: Copy assets with web-safe lowercase names**

Run:

```bash
cp "Ads Capture/Ads Google Image 1.png" public/ads-capture/ads-google-image-1.png && cp "Ads Capture/Ads Google Image 2.png" public/ads-capture/ads-google-image-2.png && cp "Ads Capture/Ads Google Image 3.png" public/ads-capture/ads-google-image-3.png && cp "Ads Capture/Ads Facebook Image 1.PNG" public/ads-capture/ads-facebook-image-1.png && cp "Ads Capture/Ads Tiktok Image 1.PNG" public/ads-capture/ads-tiktok-image-1.png
```

Expected: command exits with code 0.

- [ ] **Step 4: Verify copied dimensions match measured source facts**

Run:

```bash
python3 - <<'PY'
from PIL import Image
from pathlib import Path
expected = {
    'ads-facebook-image-1.png': (1835, 895),
    'ads-google-image-1.png': (1861, 946),
    'ads-google-image-2.png': (1861, 947),
    'ads-google-image-3.png': (1861, 946),
    'ads-tiktok-image-1.png': (1836, 945),
}
for name, dims in expected.items():
    path = Path('public/ads-capture') / name
    with Image.open(path) as image:
        actual = (image.width, image.height)
    print(f'{name}: {actual[0]}x{actual[1]}')
    assert actual == dims, f'{name}: expected {dims}, got {actual}'
PY
```

Expected output includes:

```text
ads-facebook-image-1.png: 1835x895
ads-google-image-1.png: 1861x946
ads-google-image-2.png: 1861x947
ads-google-image-3.png: 1861x946
ads-tiktok-image-1.png: 1836x945
```

## Task 2: Add Dictionary Copy

**Files:**
- Modify: `utils/i18n/dictionaries.js`

- [ ] **Step 1: Add Vietnamese keys inside `vi.home.sections` and `vi.home`**

Change the `vi.home.sections` object to include:

```js
        adsScreenshots: "Ảnh trình quản lý quảng cáo",
```

Place it after `experience` so it matches homepage order:

```js
        experience: "Kinh nghiệm",
        adsScreenshots: "Ảnh trình quản lý quảng cáo",
        skills: "Kỹ năng",
```

Add this after `aboutHighlights` in `vi.home`:

```js
      adsScreenshotsIntro:
        "Một số ảnh chụp màn hình từ các nền tảng Google Ads, Facebook Ads và TikTok Ads, thể hiện kinh nghiệm làm việc trực tiếp với tài khoản quảng cáo và dữ liệu chiến dịch.",
```

- [ ] **Step 2: Add English keys inside `en.home.sections` and `en.home`**

Change the `en.home.sections` object to include:

```js
        adsScreenshots: "Ads manager screenshots",
```

Place it after `experience` so it matches homepage order:

```js
        experience: "Experience",
        adsScreenshots: "Ads manager screenshots",
        skills: "Skills",
```

Add this after `aboutHighlights` in `en.home`:

```js
      adsScreenshotsIntro:
        "Selected screenshots from Google Ads, Facebook Ads, and TikTok Ads interfaces, showing hands-on work with ad accounts and campaign data.",
```

- [ ] **Step 3: Run lint after dictionary edit**

Run:

```bash
npm run lint
```

Expected: no ESLint errors from `utils/i18n/dictionaries.js`.

## Task 3: Create Ads Screenshots Component

**Files:**
- Create: `app/components/homepage/ads-screenshots/index.jsx`

- [ ] **Step 1: Create the component file with complete implementation**

Write exactly this file content:

```jsx
"use client";

import Image from "next/image";

import { useI18n } from "@/app/components/i18n-provider";

const screenshots = [
  {
    platform: "Google Ads",
    title: "Google Ads campaign view 01",
    src: "/ads-capture/ads-google-image-1.png",
    width: 1861,
    height: 946,
    accent: "from-sky-500/30 to-cyan-400/10",
  },
  {
    platform: "Google Ads",
    title: "Google Ads campaign view 02",
    src: "/ads-capture/ads-google-image-2.png",
    width: 1861,
    height: 947,
    accent: "from-blue-500/30 to-sky-400/10",
  },
  {
    platform: "Google Ads",
    title: "Google Ads campaign view 03",
    src: "/ads-capture/ads-google-image-3.png",
    width: 1861,
    height: 946,
    accent: "from-cyan-500/30 to-blue-400/10",
  },
  {
    platform: "Facebook Ads",
    title: "Facebook Ads manager view",
    src: "/ads-capture/ads-facebook-image-1.png",
    width: 1835,
    height: 895,
    accent: "from-violet-500/30 to-fuchsia-400/10",
  },
  {
    platform: "TikTok Ads",
    title: "TikTok Ads manager view",
    src: "/ads-capture/ads-tiktok-image-1.png",
    width: 1836,
    height: 945,
    accent: "from-emerald-500/30 to-lime-400/10",
    featured: true,
  },
];

function AdsScreenshots() {
  const { dictionary } = useI18n();
  const { sections, adsScreenshotsIntro } = dictionary.home;

  return (
    <section id="ads-screenshots" className="relative z-50 my-12 border-t border-white/10 pt-10 lg:my-24 lg:pt-14">
      <div className="mb-8 flex items-center gap-4">
        <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-violet-100">
          {sections.adsScreenshots}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/40 to-transparent" />
      </div>

      <div className="mb-8 max-w-3xl rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_32px_rgba(0,0,0,0.18)]">
        <p className="text-sm leading-7 text-slate-300 md:text-base">{adsScreenshotsIntro}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {screenshots.map((screenshot) => (
          <article
            key={screenshot.src}
            className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,36,0.92)_0%,rgba(8,10,24,0.98)_100%)] p-4 shadow-[0_0_40px_rgba(0,0,0,0.20)] transition-transform duration-300 hover:-translate-y-1 lg:p-5 ${screenshot.featured ? "lg:col-span-2" : ""}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${screenshot.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
            <div className="relative">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
                  {screenshot.platform}
                </span>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{screenshot.title}</p>
              </div>

              <div className="relative aspect-[2/1] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#05070f]/80">
                <Image
                  src={screenshot.src}
                  alt={`${screenshot.platform} ads manager screenshot`}
                  width={screenshot.width}
                  height={screenshot.height}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-contain p-2"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AdsScreenshots;
```

- [ ] **Step 2: Run lint for the new component**

Run:

```bash
npm run lint
```

Expected: no ESLint errors from `app/components/homepage/ads-screenshots/index.jsx`.

## Task 4: Render Section On Homepage

**Files:**
- Modify: `app/page.js`

- [ ] **Step 1: Import the component**

Add this import after the `Experience` import:

```js
import AdsScreenshots from "./components/homepage/ads-screenshots";
```

The import block should include:

```js
import Experience from "./components/homepage/experience";
import AdsScreenshots from "./components/homepage/ads-screenshots";
```

- [ ] **Step 2: Render the component after Experience**

Change the homepage JSX to include:

```jsx
      <Experience />
      <AdsScreenshots />
      <Skills />
```

- [ ] **Step 3: Run lint after homepage edit**

Run:

```bash
npm run lint
```

Expected: no ESLint errors from `app/page.js`.

## Task 5: Final Verification

**Files:**
- Verify: full repo

- [ ] **Step 1: Run lint**

Run:

```bash
npm run lint
```

Expected: command exits with code 0.

- [ ] **Step 2: Run production build**

Run:

```bash
npm run build
```

Expected: command exits with code 0 and Next.js build completes.

- [ ] **Step 3: Inspect git diff**

Run:

```bash
git diff -- app/page.js app/components/homepage/ads-screenshots/index.jsx utils/i18n/dictionaries.js docs/superpowers/specs/2026-08-14-ads-manager-screenshots-section-design.md docs/superpowers/plans/2026-08-14-ads-manager-screenshots-section.md
```

Expected: diff only includes the new section, dictionary copy, spec, and plan.

## Self-Review

- Spec coverage: source facts, placement, grid layout, image handling, i18n, styling, accessibility, and verification are covered by Tasks 1–5.
- Placeholder scan: no placeholder strings are present.
- Type/name consistency: dictionary key `adsScreenshots` and intro key `adsScreenshotsIntro` are used consistently in Tasks 2 and 3.
