# Nguyen Hoang Nam CV Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the landing page into a premium dark CV + case-study page that helps HR understand Nguyễn Hoàng Nam quickly and see 2 featured case studies in the first screen.

**Architecture:** Keep the existing Next.js/App Router structure and data-driven content files. Replace the current developer-coded hero with a marketing-focused hero, promote 2 featured case studies above the fold, and unify the rest of the page with a black/blue-violet premium visual system. Keep data truthfully sourced from the repo; do not invent metrics, awards, or demo links.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS, SCSS, react-icons, Lottie, react-toastify, GitHub CLI, Vercel CLI.

---

### Task 1: Verify workspace + source files before editing

**Files:**
- Read: `app/page.js`
- Read: `app/layout.js`
- Read: `app/components/homepage/hero-section/index.jsx`
- Read: `app/components/homepage/about/index.jsx`
- Read: `app/components/homepage/experience/index.jsx`
- Read: `app/components/homepage/skills/index.jsx`
- Read: `app/components/homepage/projects/index.jsx`
- Read: `app/components/homepage/education/index.jsx`
- Read: `app/components/homepage/contact/index.jsx`
- Read: `utils/data/personal-data.js`
- Read: `utils/data/experience.js`
- Read: `utils/data/projects-data.js`
- Read: `utils/data/skills.js`
- Read: `utils/data/educations.js`
- Read: `app/css/globals.scss`

- [ ] **Step 1: Confirm current code paths and section ids**

Run:
```bash
npm --version
node --version
```
Expected: version output only.

- [ ] **Step 2: Confirm git and deploy tools are available before any write step**

Run:
```bash
git --version
gh --version
vercel --version
```
Expected: version output for installed tools; if any tool is missing, stop and report it before editing.

- [ ] **Step 3: Inspect current file contents from the repo source of truth**

Read the files listed above and record exact section/component names, existing imports, and any image paths that the redesign must preserve.

---

### Task 2: Rebuild the hero into a marketing-first premium intro

**Files:**
- Modify: `app/components/homepage/hero-section/index.jsx`
- Modify: `app/page.js`
- Modify: `app/css/globals.scss`

- [ ] **Step 1: Replace the developer-style code block with a premium marketing hero**

Replace the current hero content with a 2-column layout that uses only real data from `utils/data/personal-data.js` and `utils/data/projects-data.js`.

```jsx
// app/components/homepage/hero-section/index.jsx
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden py-10 lg:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_right,rgba(139,92,246,0.16),transparent_30%)]" />
      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/90">
            Performance Marketing Specialist
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-7xl">
              Nguyễn Hoàng Nam
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Tối ưu quảng cáo, landing page và dữ liệu marketing cho các chiến dịch đa nền tảng.
            </p>
            <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Digital Marketer có kinh nghiệm từ năm 2019 trong Meta Ads, Google Ads, TikTok Ads, SEO, landing page và phân tích dữ liệu marketing.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">
              Liên hệ ngay <FiArrowRight />
            </Link>
            <Link href="#projects" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-sky-400/50 hover:bg-white/10">
              Xem case study
            </Link>
          </div>

          <div className="flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:flex-wrap">
            <span className="inline-flex items-center gap-2"><FiMail /> {personalData.email}</span>
            <span className="inline-flex items-center gap-2"><FiPhone /> {personalData.phone}</span>
            <span className="inline-flex items-center gap-2"><FiMapPin /> {personalData.address}</span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80">
            <Image
              src={personalData.profile}
              alt={personalData.name}
              width={720}
              height={720}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">Core focus</p>
            <div className="flex flex-wrap gap-2 text-sm text-slate-200">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Meta Ads</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Google Ads</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">TikTok Ads</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Landing Page</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Google Analytics</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">AI Marketing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
```

- [ ] **Step 2: Move featured case studies into the first screen or immediately after hero**

Update `app/page.js` to place a featured case block directly under hero if the existing `Projects` section stays lower on the page.

```jsx
import FeaturedCaseStudies from "./components/homepage/featured-case-studies";

export default function Home() {
  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <FeaturedCaseStudies />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <ContactSection />
    </div>
  );
}
```

- [ ] **Step 3: Upgrade the global page background to match the new premium system**

Edit `app/css/globals.scss` so the background is the new dark blue-black system and body text stays readable.

```scss
@use "tailwindcss";

:root {
  --foreground-rgb: 248, 250, 252;
}

body {
  color: rgb(var(--foreground-rgb));
  background:
    radial-gradient(circle at top, rgba(59, 130, 246, 0.14), transparent 32%),
    radial-gradient(circle at right, rgba(139, 92, 246, 0.12), transparent 28%),
    #070a12;
}
```

- [ ] **Step 4: Run a targeted smoke test in the browser or local dev server**

Run:
```bash
npm run dev
```
Expected: the hero shows real name, title, CTA, and profile image without layout overflow.

---

### Task 3: Add a dedicated featured case studies block

**Files:**
- Create: `app/components/homepage/featured-case-studies/index.jsx`
- Modify: `app/page.js`

- [ ] **Step 1: Create a focused component for the 2 cases the user selected**

Create a component that reads only from `utils/data/projects-data.js` and renders the 2 selected items by id.

```jsx
import { projectsData } from "@/utils/data/projects-data";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

const featuredIds = [1, 2];

function FeaturedCaseStudies() {
  const featured = projectsData.filter((project) => featuredIds.includes(project.id));

  return (
    <section id="case-studies" className="py-10 lg:py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/90">Case study nổi bật</p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Hai dự án thể hiện năng lực quảng cáo, landing page và dữ liệu marketing</h2>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {featured.map((project) => (
          <article key={project.id} className="group rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/[0.07]">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">{project.role}</p>
                <h3 className="text-xl font-bold text-white sm:text-2xl">{project.name}</h3>
              </div>
              {project.demo ? (
                <Link href={project.demo} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-2 text-slate-200 transition group-hover:border-sky-400/50 group-hover:text-white">
                  <FiExternalLink />
                </Link>
              ) : null}
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-300">{project.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs text-slate-200">
                  {tool}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturedCaseStudies;
```

- [ ] **Step 2: Import and render the component in `app/page.js`**

Make sure the new block appears directly after hero.

- [ ] **Step 3: Verify the dashboard card does not show a fake demo link**

The project with `demo: ""` must render without a click target. No placeholder URL.

- [ ] **Step 4: Verify the real demo card opens the actual project URL**

The 360° landing page card must link to `https://360ihh.joyhomes.vn/` only.

---

### Task 4: Restyle About, Experience, Projects, Education, Contact for the same visual language

**Files:**
- Modify: `app/components/homepage/about/index.jsx`
- Modify: `app/components/homepage/experience/index.jsx`
- Modify: `app/components/homepage/projects/index.jsx`
- Modify: `app/components/homepage/education/index.jsx`
- Modify: `app/components/homepage/contact/index.jsx`

- [ ] **Step 1: Replace section labels and boxes with consistent dark premium cards**

Keep the same data fields, but wrap the content in cleaner cards with consistent borders, rounded corners, and spacing.

```jsx
// example style direction to apply in each section
<section className="py-10 lg:py-14">
  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 lg:p-8 backdrop-blur-xl">
    {/* existing content */}
  </div>
</section>
```

- [ ] **Step 2: Keep the text source-truth exact**

Use only the repo data already in:
- `utils/data/personal-data.js`
- `utils/data/experience.js`
- `utils/data/projects-data.js`
- `utils/data/educations.js`
- contact data already wired into the section

No new achievements, no rewritten credentials, no extra claims.

- [ ] **Step 3: Simplify or remove developer-coded ornamentation that fights the new branding**

Remove or tone down decorative elements that keep the page looking like a coding portfolio instead of a marketing CV.

- [ ] **Step 4: Keep all external links truthful**

Only render real URLs from the repo.

---

### Task 5: Rebuild the navigation and section anchors for HR-friendly flow

**Files:**
- Modify: `app/components/navbar/index.jsx`
- Modify: `app/page.js`
- Modify: any section components whose ids do not match the nav

- [ ] **Step 1: Use simple section anchors**

Nav labels should be short and understandable:
- Giới thiệu
- Case study
- Kinh nghiệm
- Kỹ năng
- Học vấn
- Liên hệ

- [ ] **Step 2: Align ids to the new structure**

Use stable ids like `#hero`, `#case-studies`, `#about`, `#experience`, `#skills`, `#projects`, `#education`, `#contact`.

- [ ] **Step 3: Keep navigation minimal on mobile**

On small screens, the nav should stay compact and not push the hero down too much.

---

### Task 6: Validate, fix, and prepare handoff for commit/push/deploy

**Files:**
- Modify: only if lint/build reveal issues

- [ ] **Step 1: Run lint**

Run:
```bash
npm run lint
```
Expected: no ESLint errors.

- [ ] **Step 2: Run production build**

Run:
```bash
npm run build
```
Expected: Next.js build succeeds.

- [ ] **Step 3: Check git state**

Run:
```bash
git status
```
Expected: only intended files changed.

- [ ] **Step 4: Commit with a precise message**

Run:
```bash
git add app docs

git commit -m "feat: redesign cv landing page"
```
Expected: commit created cleanly.

- [ ] **Step 5: Push to GitHub**

Run:
```bash
git push
```
Expected: push succeeds to the tracked remote.

- [ ] **Step 6: Deploy with Vercel CLI or verify auto-deploy**

If the repo is linked and Vercel CLI is authenticated:
```bash
vercel --prod
```
If the repo uses auto-deploy, verify the deployment result instead of forcing a second deploy.

- [ ] **Step 7: Report the exact result back to the user**

Include only factual outputs:
- whether lint/build passed,
- commit hash,
- push result,
- Vercel deployment URL or the exact blocking issue.

---

### Task 7: Final self-check against the spec

**Files:**
- Read: `docs/superpowers/specs/2026-07-23-nguyen-hoang-nam-cv-landing-page-redesign.md`
- Read: modified source files from Tasks 2–5

- [ ] **Step 1: Verify 5-second message**

Confirm the hero shows:
- Nguyễn Hoàng Nam
- Performance Marketing Specialist
- 2 featured case studies

- [ ] **Step 2: Verify truthfulness**

Confirm no metric, claim, or demo link was invented.

- [ ] **Step 3: Verify responsive behavior**

Check mobile widths for overflow, broken spacing, and CTA stacking.

- [ ] **Step 4: Verify the deployment path**

Confirm the post-code path is complete:
- lint
- build
- commit
- push
- Vercel deploy or verified auto-deploy

