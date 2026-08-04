# SEO Growth Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a separated SEO growth case study and `/seo-growth` recruiter dashboard, while keeping `/dashboard-demo` as advertising/data analytics only.

**Architecture:** Keep all portfolio copy/data in `utils/i18n/dictionaries.js` because the current site already uses dictionary-driven VI/EN content. Add a new SEO page route and focused page component; wire project #3 CTA to `/seo-growth` without changing the existing ads dashboard behavior.

**Tech Stack:** Next.js 16 App Router, React 19 client components, local i18n provider, Tailwind utility classes, inline SVG charts matching the existing dashboard style.

---

## File structure

- Modify `utils/i18n/dictionaries.js`: add SEO metadata, SEO dashboard data, SEO skills, Evergreen SEO bullet, project #3 SEO case study in VI/EN.
- Modify `app/components/homepage/featured-case-studies/index.jsx`: show case studies #1, #2, #3 and route project #3 CTA to `/seo-growth`.
- Modify `app/components/homepage/projects/index.jsx`: allow internal project links without opening a new tab when `project.demo` starts with `/`.
- Create `app/seo-growth/page.js`: server route with locale-aware metadata.
- Create `app/components/seo-growth-page/index.jsx`: visual dashboard/case study page for SEO growth.
- Do not modify `app/dashboard-demo/page.js` or `app/components/dashboard-demo-page/index.jsx` except if lint forces import/style cleanup.

---

### Task 1: Extend dictionary data for SEO growth

**Files:**
- Modify: `utils/i18n/dictionaries.js`

- [ ] **Step 1: Add SEO metadata keys**

Add `metadata.seoGrowth` to both `vi` and `en`:

```js
seoGrowth: {
  title: "SEO Growth Dashboard - Nguyễn Hoàng Nam",
  description: "Case study SEO ngành giáo dục: technical SEO, GA4/GSC analysis, keyword strategy, content gap và AI literacy.",
},
```

```js
seoGrowth: {
  title: "SEO Growth Dashboard - Nguyễn Hoàng Nam",
  description: "Education SEO case study covering technical SEO, GA4/GSC analysis, keyword strategy, content gaps, and AI literacy.",
},
```

- [ ] **Step 2: Update Evergreen Invest experience**

In the VI Evergreen item (`company: "Công ty Cổ phần Đầu tư Evergreen Invest"`), append this detail:

```js
"SEO: Rà soát cấu trúc website, phối hợp tối ưu onpage, nghiên cứu từ khóa, phân tích dữ liệu GA4/GSC và đề xuất hướng nội dung dựa trên search intent, content gap và hiệu quả chuyển đổi.",
```

In the EN Evergreen item, append this detail:

```js
"SEO: Reviewed website structure, supported on-page optimization, researched keywords, analyzed GA4/GSC data, and proposed content directions based on search intent, content gaps, and conversion performance.",
```

- [ ] **Step 3: Add SEO skills to skill arrays**

Append these VI/EN-safe skill names to both `skills` arrays:

```js
"Technical SEO",
"GA4",
"Google Search Console",
"Keyword Research",
"Content Strategy",
"Schema.org",
"Core Web Vitals",
"AI SEO Literacy",
```

- [ ] **Step 4: Replace current project #3 with SEO case study**

Use project id `3` for SEO, keep AI/TikTok project only if there is room later. VI project object:

```js
{
  id: 3,
  name: "Case study SEO tăng trưởng organic ngành giáo dục",
  description:
    "Phân tích và tối ưu SEO cho website ngành giáo dục theo hướng ẩn danh: rà soát technical SEO, nghiên cứu từ khóa theo search intent, phát hiện content gap, theo dõi dữ liệu GA4/GSC và đề xuất hành động giúp tăng trưởng organic traffic, keyword visibility và lead chất lượng.",
  tools: ["Technical SEO", "GA4", "Google Search Console", "Keyword Research", "Content Gap", "Schema.org", "Core Web Vitals", "AI SEO"],
  role: "SEO / Digital Marketing Specialist",
  code: "",
  demo: "/seo-growth",
},
```

EN project object:

```js
{
  id: 3,
  name: "SEO Growth Case Study for an Education Website",
  description:
    "An anonymized education SEO case study covering technical SEO review, search-intent keyword research, content gap analysis, GA4/GSC tracking, and action planning to improve organic traffic, keyword visibility, and qualified leads.",
  tools: ["Technical SEO", "GA4", "Google Search Console", "Keyword Research", "Content Gap", "Schema.org", "Core Web Vitals", "AI SEO"],
  role: "SEO / Digital Marketing Specialist",
  code: "",
  demo: "/seo-growth",
},
```

- [ ] **Step 5: Add `seoGrowth` dashboard content to both dictionaries**

Add VI object:

```js
seoGrowth: {
  back: "Về portfolio",
  headerBadges: ["SEO Case Study", "Education Website"],
  title: "Dashboard tăng trưởng SEO ngành giáo dục",
  description: "Trang này trình bày cách tôi phân tích, tối ưu và báo cáo tăng trưởng SEO cho một website ngành giáo dục theo hướng ẩn danh để bảo mật thông tin công ty cũ.",
  snapshot: "Dữ liệu đã được ẩn danh",
  kpis: [
    { label: "Organic clicks", before: "4.200", after: "7.850", change: "+87%" },
    { label: "Impressions", before: "118.000", after: "226.000", change: "+92%" },
    { label: "CTR", before: "3,6%", after: "4,2%", change: "+0,6 điểm %" },
    { label: "Indexed pages", before: "86", after: "132", change: "+53%" },
    { label: "Qualified leads", before: "64", after: "109", change: "+70%" },
  ],
  sections: {
    kpi: "KPI trước/sau",
    trend: "Xu hướng organic",
    strategy: "Chiến lược SEO",
    health: "Technical health",
    keywords: "Keyword movement",
    content: "Content gap wins",
    takeaway: "Điểm nhà tuyển dụng nên chú ý",
  },
  trendRows: [
    { label: "Giai đoạn 1", clicks: 4200, impressions: 118000, leads: 64 },
    { label: "Giai đoạn 2", clicks: 5100, impressions: 146000, leads: 73 },
    { label: "Giai đoạn 3", clicks: 6400, impressions: 188000, leads: 91 },
    { label: "Giai đoạn 4", clicks: 7850, impressions: 226000, leads: 109 },
  ],
  strategies: [
    { title: "Technical SEO", description: "Kiểm tra crawl/indexing, canonical, sitemap, broken links, Core Web Vitals và schema để giảm rào cản thu thập dữ liệu." },
    { title: "GA4/GSC analysis", description: "Theo dõi query, landing page, CTR, conversion path và phân biệt tương quan với nguyên nhân trước khi đề xuất hành động." },
    { title: "Keyword & content strategy", description: "Phân nhóm keyword theo search intent, chọn định dạng nội dung phù hợp và ưu tiên chủ đề có khả năng tạo lead." },
    { title: "AI literacy", description: "Dùng AI để hỗ trợ nghiên cứu, gom nhóm insight và tối ưu nội dung để tăng khả năng được trích dẫn trong các hệ thống trả lời AI." },
  ],
  technicalHealth: [
    { label: "Broken links", value: "Giảm 41%", note: "Ưu tiên URL ảnh hưởng crawling và trải nghiệm người dùng." },
    { label: "Core Web Vitals", value: "Cải thiện", note: "Tập trung LCP, CLS và tốc độ tải trang chính." },
    { label: "Schema coverage", value: "Mở rộng", note: "Bổ sung cấu trúc dữ liệu phù hợp nội dung giáo dục." },
  ],
  keywordMovement: [
    { group: "Informational", before: 18, after: 34 },
    { group: "Commercial", before: 9, after: 17 },
    { group: "Brand", before: 12, after: 21 },
  ],
  contentWins: [
    "Xác định nhóm chủ đề đối thủ chưa khai thác sâu.",
    "Ưu tiên bài viết theo intent tư vấn/chọn khóa học.",
    "Cập nhật internal link để đẩy sức mạnh về landing page có khả năng chuyển đổi.",
  ],
  takeaways: [
    "Tôi không chỉ nhìn số liệu tăng/giảm, mà tìm nguyên nhân có thể hành động.",
    "Tôi biết kết nối technical SEO, content và dữ liệu GA4/GSC với mục tiêu lead.",
    "Tôi có thể trình bày kết quả SEO bằng dashboard rõ ràng cho người không chuyên kỹ thuật.",
  ],
}
```

Add EN object with equivalent text:

```js
seoGrowth: {
  back: "Back to portfolio",
  headerBadges: ["SEO Case Study", "Education Website"],
  title: "SEO growth dashboard for an education website",
  description: "This page shows how I analyze, optimize, and report SEO growth for an anonymized education website while protecting previous company information.",
  snapshot: "Anonymized performance data",
  kpis: [
    { label: "Organic clicks", before: "4,200", after: "7,850", change: "+87%" },
    { label: "Impressions", before: "118,000", after: "226,000", change: "+92%" },
    { label: "CTR", before: "3.6%", after: "4.2%", change: "+0.6 pts" },
    { label: "Indexed pages", before: "86", after: "132", change: "+53%" },
    { label: "Qualified leads", before: "64", after: "109", change: "+70%" },
  ],
  sections: {
    kpi: "Before/after KPIs",
    trend: "Organic trend",
    strategy: "SEO strategy",
    health: "Technical health",
    keywords: "Keyword movement",
    content: "Content gap wins",
    takeaway: "Recruiter takeaways",
  },
  trendRows: [
    { label: "Phase 1", clicks: 4200, impressions: 118000, leads: 64 },
    { label: "Phase 2", clicks: 5100, impressions: 146000, leads: 73 },
    { label: "Phase 3", clicks: 6400, impressions: 188000, leads: 91 },
    { label: "Phase 4", clicks: 7850, impressions: 226000, leads: 109 },
  ],
  strategies: [
    { title: "Technical SEO", description: "Audited crawling/indexing, canonical tags, sitemap, broken links, Core Web Vitals, and schema to reduce discovery barriers." },
    { title: "GA4/GSC analysis", description: "Tracked queries, landing pages, CTR, conversion paths, and separated correlation from causation before recommending actions." },
    { title: "Keyword & content strategy", description: "Grouped keywords by search intent, selected suitable content formats, and prioritized topics with lead potential." },
    { title: "AI literacy", description: "Used AI to support research, cluster insights, and optimize content for better citation potential in AI answer systems." },
  ],
  technicalHealth: [
    { label: "Broken links", value: "Down 41%", note: "Prioritized URLs affecting crawling and user experience." },
    { label: "Core Web Vitals", value: "Improved", note: "Focused on LCP, CLS, and key page load speed." },
    { label: "Schema coverage", value: "Expanded", note: "Added structured data aligned with education content." },
  ],
  keywordMovement: [
    { group: "Informational", before: 18, after: 34 },
    { group: "Commercial", before: 9, after: 17 },
    { group: "Brand", before: 12, after: 21 },
  ],
  contentWins: [
    "Identified topic groups competitors had not covered deeply.",
    "Prioritized articles around consultation and course-selection intent.",
    "Updated internal links to strengthen conversion-focused landing pages.",
  ],
  takeaways: [
    "I do not only report increases or drops; I look for actionable causes.",
    "I connect technical SEO, content, and GA4/GSC data to lead goals.",
    "I can present SEO results clearly through dashboards for non-technical reviewers.",
  ],
}
```

- [ ] **Step 6: Run lint parser check**

Run:

```bash
npm run lint
```

Expected: no syntax/parser error from dictionary changes.

---

### Task 2: Add `/seo-growth` route

**Files:**
- Create: `app/seo-growth/page.js`

- [ ] **Step 1: Create route file**

Create `app/seo-growth/page.js`:

```js
import { cookies } from "next/headers";
import SeoGrowthPageContent from "../components/seo-growth-page";
import { LOCALE_COOKIE_NAME, normalizeLocale } from "../../utils/i18n/config";
import { getDictionary } from "../../utils/i18n/dictionaries";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);

  return getDictionary(locale).metadata.seoGrowth;
}

export default function SeoGrowthPage() {
  return <SeoGrowthPageContent />;
}
```

- [ ] **Step 2: Run route build check**

Run:

```bash
npm run lint
```

Expected: route imports resolve after Task 3 creates component; until then the missing component error is expected.

---

### Task 3: Create SEO growth page component

**Files:**
- Create: `app/components/seo-growth-page/index.jsx`

- [ ] **Step 1: Create component shell and helpers**

Create `app/components/seo-growth-page/index.jsx`:

```jsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FaArrowLeft, FaChartLine, FaCheckCircle, FaSearch } from "react-icons/fa";
import { useI18n } from "../i18n-provider";

function buildPath(values, maxValue) {
  return values
    .map((value, index) => {
      const x = 42 + index * 132;
      const y = 208 - (value / maxValue) * 150;
      return `${index === 0 ? "M" : "L"}${x} ${y}`;
    })
    .join(" ");
}

function formatNumber(value, locale) {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "vi-VN").format(value);
}

function SeoGrowthPageContent() {
  const { dictionary, locale } = useI18n();
  const seoGrowth = dictionary.seoGrowth;
  const [activeMetric, setActiveMetric] = useState("clicks");

  const metricLabels = {
    clicks: "Organic clicks",
    impressions: "Impressions",
    leads: "Qualified leads",
  };

  const chartData = useMemo(() => {
    const values = seoGrowth.trendRows.map((row) => row[activeMetric]);
    const maxValue = Math.max(...values);

    return {
      values,
      maxValue,
      path: buildPath(values, maxValue),
    };
  }, [activeMetric, seoGrowth.trendRows]);

  return (
    <section className="relative -mx-6 overflow-hidden py-6 sm:-mx-12 lg:mx-0 lg:py-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.18),transparent_32%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_30%),linear-gradient(180deg,#050816_0%,#07111f_52%,#060914_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_60px_rgba(0,0,0,0.24)] backdrop-blur sm:rounded-[2rem] lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-3">
                {seoGrowth.headerBadges.map((badge) => (
                  <span key={badge} className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-100">
                    {badge}
                  </span>
                ))}
              </div>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">{seoGrowth.title}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">{seoGrowth.description}</p>
              <p className="mt-3 text-sm font-medium text-emerald-200">{seoGrowth.snapshot}</p>
            </div>
            <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition hover:border-emerald-300/40 hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50">
              <FaArrowLeft size={12} aria-hidden="true" />
              <span>{seoGrowth.back}</span>
            </Link>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5" aria-labelledby="seo-kpi-title">
          <h2 id="seo-kpi-title" className="sr-only">{seoGrowth.sections.kpi}</h2>
          {seoGrowth.kpis.map((item) => (
            <article key={item.label} className="rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,32,42,0.95)_0%,rgba(8,14,26,0.98)_100%)] p-4 shadow-[0_0_30px_rgba(0,0,0,0.18)] sm:rounded-[1.75rem] sm:p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-slate-500">Before</p>
                  <p className="mt-1 text-xl font-semibold text-slate-200">{item.before}</p>
                </div>
                <div>
                  <p className="text-slate-500">After</p>
                  <p className="mt-1 text-xl font-semibold text-white">{item.after}</p>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold text-emerald-200">{item.change}</p>
            </article>
          ))}
        </section>
```

- [ ] **Step 2: Add trend chart and strategy sections**

Continue the same file inside the return after KPI section:

```jsx
        <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
          <section className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,32,42,0.96)_0%,rgba(8,14,26,0.98)_100%)] p-5 shadow-[0_0_40px_rgba(0,0,0,0.20)] sm:rounded-[2rem] lg:p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-emerald-200">{seoGrowth.sections.trend}</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{metricLabels[activeMetric]}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.keys(metricLabels).map((metricKey) => (
                  <button
                    key={metricKey}
                    type="button"
                    onClick={() => setActiveMetric(metricKey)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 ${activeMetric === metricKey ? "border border-emerald-300/30 bg-emerald-300/15 text-emerald-100" : "border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white"}`}
                  >
                    {metricLabels[metricKey]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-[#061015]/80 p-4 sm:rounded-[1.75rem]">
              <svg viewBox="0 0 480 260" className="h-[230px] w-full sm:h-[260px]" role="img" aria-label={seoGrowth.sections.trend}>
                {[0, 1, 2, 3].map((line) => (
                  <line key={line} x1="42" y1={58 + line * 50} x2="438" y2={58 + line * 50} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                ))}
                {seoGrowth.trendRows.map((row, index) => (
                  <g key={row.label}>
                    <line x1={42 + index * 132} y1="40" x2={42 + index * 132} y2="210" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <text x={42 + index * 132} y="238" textAnchor="middle" fill="#94a3b8" fontSize="12">{row.label}</text>
                  </g>
                ))}
                <path d={chartData.path} fill="none" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
                {chartData.values.map((value, index) => {
                  const x = 42 + index * 132;
                  const y = 208 - (value / chartData.maxValue) * 150;

                  return <circle key={`${activeMetric}-${index}`} cx={x} cy={y} r="6" fill="#34d399" stroke="#020617" strokeWidth="3" />;
                })}
              </svg>
              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                {seoGrowth.trendRows.map((row) => (
                  <div key={row.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="text-xs text-slate-400">{row.label}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{formatNumber(row[activeMetric], locale)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,32,42,0.96)_0%,rgba(8,14,26,0.98)_100%)] p-5 shadow-[0_0_40px_rgba(0,0,0,0.20)] sm:rounded-[2rem] lg:p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-200">{seoGrowth.sections.strategy}</p>
            <div className="mt-5 grid gap-4">
              {seoGrowth.strategies.map((item) => (
                <article key={item.title} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-start gap-3">
                    <FaSearch className="mt-1 shrink-0 text-emerald-300" aria-hidden="true" />
                    <div>
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
```

- [ ] **Step 3: Add technical health, keywords, content wins, takeaways**

Finish the component:

```jsx
        <div className="grid gap-6 xl:grid-cols-3">
          <section className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,32,42,0.96)_0%,rgba(8,14,26,0.98)_100%)] p-5 shadow-[0_0_40px_rgba(0,0,0,0.20)] sm:rounded-[2rem] lg:p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-200">{seoGrowth.sections.health}</p>
            <div className="mt-5 space-y-4">
              {seoGrowth.technicalHealth.map((item) => (
                <article key={item.label} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,32,42,0.96)_0%,rgba(8,14,26,0.98)_100%)] p-5 shadow-[0_0_40px_rgba(0,0,0,0.20)] sm:rounded-[2rem] lg:p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-200">{seoGrowth.sections.keywords}</p>
            <div className="mt-5 space-y-4">
              {seoGrowth.keywordMovement.map((item) => {
                const width = Math.min(100, Math.round((item.after / 36) * 100));

                return (
                  <article key={item.group}>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium text-white">{item.group}</span>
                      <span className="text-emerald-200">{item.before} → {item.after}</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-300" style={{ width: `${width}%` }} />
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,32,42,0.96)_0%,rgba(8,14,26,0.98)_100%)] p-5 shadow-[0_0_40px_rgba(0,0,0,0.20)] sm:rounded-[2rem] lg:p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-200">{seoGrowth.sections.content}</p>
            <ul className="mt-5 space-y-3">
              {seoGrowth.contentWins.map((item) => (
                <li key={item} className="flex gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-300">
                  <FaCheckCircle className="mt-1 shrink-0 text-emerald-300" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/[0.06] p-5 shadow-[0_0_40px_rgba(0,0,0,0.20)] sm:rounded-[2rem] lg:p-7">
          <div className="flex items-center gap-3">
            <FaChartLine className="text-emerald-200" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-white">{seoGrowth.sections.takeaway}</h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {seoGrowth.takeaways.map((item) => (
              <article key={item} className="rounded-[1.25rem] border border-white/10 bg-[#061015]/70 p-4 text-sm leading-7 text-slate-200">
                {item}
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default SeoGrowthPageContent;
```

- [ ] **Step 4: Run lint**

Run:

```bash
npm run lint
```

Expected: no lint errors from new component.

---

### Task 4: Wire case study #3 CTAs

**Files:**
- Modify: `app/components/homepage/featured-case-studies/index.jsx`
- Modify: `app/components/homepage/projects/index.jsx`

- [ ] **Step 1: Feature project #3**

Change:

```js
const selectedProjectIds = [1, 2];
```

To:

```js
const selectedProjectIds = [1, 2, 3];
```

Change grid class:

```jsx
<div className="grid gap-6 lg:grid-cols-2">
```

To:

```jsx
<div className="grid gap-6 lg:grid-cols-3">
```

- [ ] **Step 2: Route featured case CTAs cleanly**

Replace the CTA conditional in `featured-case-studies/index.jsx` with:

```jsx
{project.demo ? (
  <Link href={project.demo} target={project.demo.startsWith("/") ? undefined : "_blank"} rel={project.demo.startsWith("/") ? undefined : "noopener noreferrer"} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#070913] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-400/50">
    <span>{viewDemo}</span>
    <FaExternalLinkAlt size={12} aria-hidden="true" />
  </Link>
) : null}
```

- [ ] **Step 3: Route project list internal links cleanly**

In `projects/index.jsx`, replace the `Link` props block with:

```jsx
<Link
  href={project.demo}
  target={project.demo.startsWith("/") ? undefined : "_blank"}
  rel={project.demo.startsWith("/") ? undefined : "noopener noreferrer"}
  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#070913] outline-none transition focus-visible:ring-2 focus-visible:ring-blue-400/50"
>
```

- [ ] **Step 4: Run lint**

Run:

```bash
npm run lint
```

Expected: no lint errors.

---

### Task 5: Verify no unwanted copy and no dashboard mixing

**Files:**
- Check: whole repo source files, excluding build output.

- [ ] **Step 1: Search for forbidden visible word**

Run:

```bash
rg -n "demo|Demo" app utils --glob '!app/dashboard-demo/page.js' --glob '!app/components/dashboard-demo-page/index.jsx'
```

Expected: only code identifiers like route folder names or existing common key `viewDemo`; no visible SEO page text contains `demo`/`Demo`.

- [ ] **Step 2: Confirm ads dashboard remains separate**

Run:

```bash
git diff -- app/dashboard-demo/page.js app/components/dashboard-demo-page/index.jsx
```

Expected: no diff.

- [ ] **Step 3: Build the app**

Run:

```bash
npm run build
```

Expected: build succeeds and includes `/seo-growth` route.

- [ ] **Step 4: Run lint**

Run:

```bash
npm run lint
```

Expected: lint succeeds.

---

## Self-review

- Spec coverage: SEO skills, Evergreen SEO experience, case study #3, `/seo-growth`, VI/EN, dashboard separation, anonymized figures, no visible "demo" wording are covered by Tasks 1-5.
- Placeholder scan: no TBD/TODO/fill-later steps.
- Type consistency: route imports `SeoGrowthPageContent`; dictionary key is `seoGrowth`; project CTA uses existing `demo` property for both internal and external URLs.
