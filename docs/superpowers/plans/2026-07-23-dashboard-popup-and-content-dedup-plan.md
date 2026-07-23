# Dashboard Popup + Content Dedup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove duplicated bio/image content, add `Vibe Coding` to skills, rename the dashboard project, and add a premium dashboard demo popup for featured case #2 only.

**Architecture:** Keep the current Next.js App Router structure and data-driven content. Update `projects-data.js` and `skills.js` as the source of truth, simplify Hero/About so the long bio appears only once, and add a local popup state inside the featured-case-studies component for the dashboard demo instead of creating a fake external URL. The popup must clearly label all numbers as demo data and must not affect the lower Projects section behavior.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS, SCSS, react-icons, existing data files under `utils/data/`.

---

## Current code context to preserve

Before implementing, keep these facts in mind:

- `app/components/homepage/hero-section/index.jsx` currently renders:
  - `personalData.name`
  - `personalData.description`
  - focus tags from description
  - portrait image
  - a right-side info card that currently repeats `personalData.description`
- `app/components/homepage/about/index.jsx` currently renders:
  - `personalData.description`
  - a second portrait image
- `app/components/homepage/featured-case-studies/index.jsx` currently:
  - reads `projectsData`
  - shows projects `id 1` and `id 2`
  - shows `Xem demo` only when `project.demo` exists
- `utils/data/projects-data.js` currently has:
  - project `id: 2` name = `Dashboard báo cáo hiệu quả quảng cáo`
  - project `id: 2` demo = `''`
- `utils/data/skills.js` currently does not contain `Vibe Coding`
- `app/components/homepage/projects/index.jsx` currently shows full project list and only renders `Xem demo` when `project.demo` exists
- Existing successful checks from this repo:
  - `npm run lint`
  - `npm run build`
- Existing deployed branch is `main`
- GitHub + Vercel CLI are now installed and authenticated in this environment

---

## File structure and responsibility map

### Files to modify

- `utils/data/skills.js`
  - Add `Vibe Coding` to source-truth skills list.

- `utils/data/projects-data.js`
  - Rename project #2 only.
  - Keep `demo: ''` for project #2 so lower Projects section does not create a fake external link.

- `app/components/homepage/hero-section/index.jsx`
  - Keep the long bio only once.
  - Keep the only portrait image on the page.
  - Remove duplicated long bio from the right-side portrait card.

- `app/components/homepage/about/index.jsx`
  - Remove portrait image.
  - Replace repeated long bio with shorter bullet-like strengths sourced from existing description text.

- `app/components/homepage/featured-case-studies/index.jsx`
  - Keep project #1 external demo behavior.
  - Add popup open/close state for project #2 only.
  - Add premium dashboard modal content with demo KPI cards, channel cards, and insight section.
  - Add close button, overlay click close, and Escape-key close.

### Files to verify but not necessarily modify

- `app/components/homepage/projects/index.jsx`
  - Verify project #2 still has no `Xem demo` in lower Projects section.

- `app/components/homepage/skills/index.jsx`
  - Verify `Vibe Coding` renders through existing fallback safely.

- `docs/superpowers/specs/2026-07-23-dashboard-popup-and-content-dedup-design.md`
  - Re-read during self-check.

---

### Task 1: Update source-truth data only where the spec explicitly requires it

**Files:**
- Modify: `utils/data/skills.js`
- Modify: `utils/data/projects-data.js`

- [ ] **Step 1: Add `Vibe Coding` to skills data**

Update the skills array to include `Vibe Coding`.

```js
export const skillsData = [
  'HTML',
  'CSS',
  'Javascript',
  'Python',
  'Git',
  'Canva',
  'Figma',
  'Microsoft Office',
  'Markdown',
  'Vibe Coding'
]
```

- [ ] **Step 2: Rename only project #2**

Update `utils/data/projects-data.js`:

```js
{
  id: 2,
  name: 'Dashboard phân tích hiệu quả quảng cáo',
  description: 'Tổng hợp dữ liệu, theo dõi chỉ số và hỗ trợ ra quyết định tối ưu quảng cáo dựa trên CPC, CTR, CPM, chi phí, lead và tỷ lệ chuyển đổi.',
  tools: ['Microsoft Office', 'Google Analytics', 'Ads Data', 'Dashboard'],
  role: 'Performance Marketing Specialist',
  code: '',
  demo: '',
}
```

Do **not** add a fake URL to `demo`.

- [ ] **Step 3: Verify lower Projects behavior still depends on `project.demo`**

Read `app/components/homepage/projects/index.jsx` and verify project #2 will still render without a lower-section demo button when `demo` remains empty.

- [ ] **Step 4: Run lint after data changes**

Run:
```bash
npm run lint
```
Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add utils/data/skills.js utils/data/projects-data.js
git commit -m "feat: update skills and dashboard project data"
```

---

### Task 2: Remove duplicated long bio and keep portrait image only once

**Files:**
- Modify: `app/components/homepage/hero-section/index.jsx`
- Modify: `app/components/homepage/about/index.jsx`

- [ ] **Step 1: Keep `personalData.description` only in Hero main text**

In `hero-section/index.jsx`:
- Keep the main paragraph:
```jsx
<p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
  {personalData.description}
</p>
```
- Remove the repeated long description from the right-side portrait card.

The right-side card should keep only short content such as:
```jsx
<div className="mt-5 rounded-[1.25rem] border border-white/10 bg-[#070913]/80 p-5">
  <h2 className="text-2xl font-bold text-white">{personalData.name}</h2>
  <p className="mt-2 text-sm font-medium text-violet-200">{personalData.designation}</p>
  <div className="mt-4 flex flex-wrap gap-2">
    {focusTags.map((tag) => (
      <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-200">
        {tag}
      </span>
    ))}
  </div>
</div>
```

- [ ] **Step 2: Keep the portrait image in Hero only**

In `about/index.jsx`, remove the `Image` block entirely.

Replace the 2-column image/text layout with a single wider text card or a 2-column text-only layout.

- [ ] **Step 3: Replace repeated About paragraph with shorter source-backed strengths**

Do not reuse `personalData.description` verbatim.

Instead, create a short bullet list using only themes already present in the existing description:

```jsx
const aboutHighlights = [
  'Nghiên cứu chân dung khách hàng và hành vi người dùng.',
  'Xây dựng thông điệp nội dung quảng cáo theo mục tiêu chiến dịch.',
  'Tối ưu chi phí quảng cáo và theo dõi chỉ số hiệu quả.',
  'Phối hợp linh hoạt cùng team creative để cải thiện tỷ lệ chuyển đổi.',
  'Kết hợp landing page, dữ liệu marketing và AI để hỗ trợ tăng trưởng.'
];
```

Render them as concise list items.

- [ ] **Step 4: Verify only one portrait remains in the page source**

Search for `personalData.profile` usage in homepage sections and confirm About no longer uses it.

Run:
```bash
rg "personalData\.profile|/profile-nam\.png" app/components/homepage
```
Expected: Hero only (or any intentional non-duplicate usage outside About if present).

- [ ] **Step 5: Run lint**

Run:
```bash
npm run lint
```
Expected: pass.

- [ ] **Step 6: Commit**

```bash
git add app/components/homepage/hero-section/index.jsx app/components/homepage/about/index.jsx
git commit -m "refactor: remove duplicated bio and portrait"
```

---

### Task 3: Add dashboard popup state and trigger for featured case #2 only

**Files:**
- Modify: `app/components/homepage/featured-case-studies/index.jsx`

- [ ] **Step 1: Add local popup state**

Add React client state to the component. If the file is currently a server component, convert it to a client component:

```jsx
"use client";

import { useEffect, useState } from "react";
```

Add state:

```jsx
const [isDashboardOpen, setIsDashboardOpen] = useState(false);
```

- [ ] **Step 2: Keep project #1 behavior unchanged**

For project `id === 1`, keep the external `Link` using `project.demo`.

- [ ] **Step 3: Add a local button only for project #2**

For project `id === 2`, render a `button` instead of `Link`:

```jsx
<button
  type="button"
  onClick={() => setIsDashboardOpen(true)}
  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#070913] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-400/50"
>
  <span>Xem demo</span>
  <FaExternalLinkAlt size={12} aria-hidden="true" />
</button>
```

Do not render this button for project #2 in the lower Projects section.

- [ ] **Step 4: Add Escape-key close logic**

```jsx
useEffect(() => {
  if (!isDashboardOpen) return;

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsDashboardOpen(false);
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [isDashboardOpen]);
```

- [ ] **Step 5: Add overlay click close logic**

The modal overlay background should close the popup when clicked. The dialog panel itself must stop propagation.

- [ ] **Step 6: Run lint**

Run:
```bash
npm run lint
```
Expected: pass.

- [ ] **Step 7: Commit**

```bash
git add app/components/homepage/featured-case-studies/index.jsx
git commit -m "feat: add dashboard popup trigger"
```

---

### Task 4: Build the premium dashboard demo popup UI

**Files:**
- Modify: `app/components/homepage/featured-case-studies/index.jsx`

- [ ] **Step 1: Define popup demo data inside the component**

Add explicit demo data constants so the next session understands all numbers are local UI demo data, not fetched data.

```jsx
const dashboardSummary = [
  { label: "CPM", value: "52.000đ" },
  { label: "CPC", value: "4.800đ" },
  { label: "CTR", value: "1,86%" },
  { label: "Lead", value: "128" },
  { label: "Conversion Rate", value: "7,4%" },
  { label: "Cost/Lead", value: "96.000đ" },
];

const dashboardChannels = [
  { name: "Meta Ads", spend: "7.800.000đ", leads: "82", ctr: "2,1%", cpl: "95.000đ" },
  { name: "Google Ads", spend: "3.600.000đ", leads: "31", ctr: "4,8%", cpl: "116.000đ" },
  { name: "TikTok Ads", spend: "900.000đ", leads: "15", ctr: "1,4%", cpl: "60.000đ" },
];

const dashboardInsights = [
  "Meta Ads tạo nhiều lead nhất trong dữ liệu demo.",
  "Google Ads có CTR cao, phù hợp nhóm có nhu cầu chủ động.",
  "TikTok Ads có chi phí/lead thấp trong dữ liệu demo nhưng cần kiểm tra chất lượng lead.",
];

const dashboardActions = [
  "Giữ ngân sách cho Meta Ads nếu chất lượng lead ổn.",
  "Tối ưu từ khóa và landing page cho Google Ads.",
  "Test thêm creative ngắn cho TikTok Ads trước khi tăng ngân sách.",
];
```

- [ ] **Step 2: Add the modal markup**

Render modal only when `isDashboardOpen` is true.

```jsx
{isDashboardOpen ? (
  <div
    className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm"
    onClick={() => setIsDashboardOpen(false)}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dashboard-demo-title"
      className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,36,0.98)_0%,rgba(8,10,24,1)_100%)] p-6 shadow-[0_0_60px_rgba(0,0,0,0.35)] lg:p-8"
      onClick={(event) => event.stopPropagation()}
    >
      {/* header + content */}
    </div>
  </div>
) : null}
```

- [ ] **Step 3: Build header + disclosure**

Header must include:

```jsx
<div className="flex items-start justify-between gap-4">
  <div>
    <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">
      Số liệu demo
    </span>
    <h3 id="dashboard-demo-title" className="mt-4 text-2xl font-bold text-white md:text-3xl">
      Dashboard phân tích hiệu quả quảng cáo
    </h3>
    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
      Minh họa cách theo dõi CPC, CTR, CPM, Lead và tỷ lệ chuyển đổi.
    </p>
    <p className="mt-2 text-sm text-sky-200">
      Số liệu demo dùng để minh họa cách phân tích hiệu quả quảng cáo.
    </p>
  </div>
  <button
    type="button"
    onClick={() => setIsDashboardOpen(false)}
    aria-label="Đóng dashboard demo"
    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white outline-none transition focus-visible:ring-2 focus-visible:ring-blue-400/50"
  >
    Đóng
  </button>
</div>
```

- [ ] **Step 4: Build KPI cards**

Render `dashboardSummary` in a responsive grid.

```jsx
<div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
  {dashboardSummary.map((item) => (
    <article key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
      <p className="mt-3 text-2xl font-bold text-white">{item.value}</p>
    </article>
  ))}
</div>
```

- [ ] **Step 5: Build a simple visual chart block without adding chart libraries**

Use CSS bar cards instead of adding Recharts/Chart.js.

Example approach:

```jsx
const channelBars = [
  { label: "Meta Ads", value: 82, widthClass: "w-[82%]" },
  { label: "Google Ads", value: 31, widthClass: "w-[31%]" },
  { label: "TikTok Ads", value: 15, widthClass: "w-[15%]" },
];
```

Render bars using nested divs. This keeps the popup visually strong without adding dependencies.

- [ ] **Step 6: Build channel cards**

Render `dashboardChannels` in cards showing Spend, Leads, CTR, Cost/Lead.

- [ ] **Step 7: Build case-study mini section**

Add two sections:

```jsx
<section>
  <h4>Nhận xét</h4>
  <ul>{dashboardInsights.map(...)}</ul>
</section>

<section>
  <h4>Đề xuất tối ưu</h4>
  <ul>{dashboardActions.map(...)}</ul>
</section>
```

Also add a short `Mục tiêu` block above them:

```jsx
Mục tiêu demo: theo dõi hiệu quả theo kênh, so sánh chi phí tạo lead và xác định hướng tối ưu ngân sách.
```

- [ ] **Step 8: Confirm project #2 lower section still has no demo button**

Read `app/components/homepage/projects/index.jsx` after implementing popup and verify it still depends on `project.demo` only.

- [ ] **Step 9: Run lint and build**

Run:
```bash
npm run lint
npm run build
```
Expected: both pass.

- [ ] **Step 10: Commit**

```bash
git add app/components/homepage/featured-case-studies/index.jsx
git commit -m "feat: add dashboard demo popup"
```

---

### Task 5: Final verification against the approved spec

**Files:**
- Read: `docs/superpowers/specs/2026-07-23-dashboard-popup-and-content-dedup-design.md`
- Read: modified files from Tasks 1–4

- [ ] **Step 1: Verify dedup requirements**

Check all of these are true:
- long bio appears only once,
- portrait image appears only once,
- About no longer repeats the full long bio.

Run:
```bash
rg "personalData\.description|personalData\.profile" app/components/homepage
```

Read the matches and confirm they align with the spec.

- [ ] **Step 2: Verify skill and data requirements**

Check all of these are true:
- `Vibe Coding` exists in `utils/data/skills.js`,
- project #2 name is `Dashboard phân tích hiệu quả quảng cáo`,
- project #2 `demo` is still empty in `utils/data/projects-data.js`.

- [ ] **Step 3: Verify popup scope requirements**

Confirm all of these are true:
- only featured case #2 has a local popup `Xem demo` button,
- lower Projects section still has no dashboard demo button,
- popup text explicitly says the numbers are demo data.

- [ ] **Step 4: Verify accessibility and close behavior**

Confirm all of these are true:
- Escape closes the popup,
- overlay click closes the popup,
- close button exists with proper aria-label,
- dialog has `role="dialog"` and `aria-modal="true"`.

- [ ] **Step 5: Run final lint/build before push**

Run:
```bash
npm run lint
npm run build
```
Expected: both pass.

- [ ] **Step 6: Inspect git state**

Run:
```bash
git status
git diff --stat
git log --oneline -5
```
Expected: only intended changes.

- [ ] **Step 7: Commit final verification-ready changes**

If Tasks 1–4 produced separate commits already, do not squash unless explicitly asked.
If there are remaining unstaged verification fixes, commit them with a focused message.

---

## Spec coverage self-check

This plan covers each approved requirement:

- Remove duplicated long bio → Task 2
- Keep portrait once → Task 2
- Add `Vibe Coding` → Task 1
- Rename project #2 → Task 1
- Add `Xem demo` only on featured case #2 → Task 3 + Task 4
- Popup with premium dashboard + KPI + explanations + mini case study → Task 4
- Clearly disclose demo data → Task 4
- Keep lower Projects section free of fake dashboard demo → Task 1 + Task 4 + Task 5
- Final lint/build verification → Task 4 + Task 5

## Session handoff notes for the next coding session

These points must be preserved in the next session so implementation stays factual:

1. The user explicitly approved demo numbers for the popup, but only inside the popup.
2. The popup is not allowed to create or imply a real external dashboard URL.
3. The button for the dashboard popup must exist only in `featured-case-studies`, not in `projects`.
4. The long hero bio must stay in Hero only.
5. About must become shorter and source-backed, not a second copy of the long bio.
6. The portrait image must remain in Hero and be removed from About.
7. `Vibe Coding` is allowed in skills because it already exists in `projects-data.js` tools.
8. The current repo already has GitHub CLI and Vercel CLI installed and authenticated in this environment.
9. Previous successful commands in this repo include `npm run lint` and `npm run build`.
10. Do not assume any extra data source, API, or charting library.
