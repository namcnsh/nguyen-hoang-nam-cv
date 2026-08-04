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
  const metricLabels = seoGrowth.metricLabels;

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
                  <p className="text-slate-500">{seoGrowth.beforeLabel}</p>
                  <p className="mt-1 text-xl font-semibold text-slate-200">{item.before}</p>
                </div>
                <div>
                  <p className="text-slate-500">{seoGrowth.afterLabel}</p>
                  <p className="mt-1 text-xl font-semibold text-white">{item.after}</p>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold text-emerald-200">{item.change}</p>
            </article>
          ))}
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
          <section className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,32,42,0.96)_0%,rgba(8,14,26,0.98)_100%)] p-5 shadow-[0_0_40px_rgba(0,0,0,0.20)] sm:rounded-[2rem] lg:p-7" aria-labelledby="seo-trend-title">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 id="seo-trend-title" className="text-xs uppercase tracking-[0.28em] text-emerald-200">{seoGrowth.sections.trend}</h2>
                <p className="mt-3 text-2xl font-semibold text-white">{metricLabels[activeMetric]}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.keys(metricLabels).map((metricKey) => (
                  <button
                    key={metricKey}
                    type="button"
                    aria-pressed={activeMetric === metricKey}
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

          <section className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,32,42,0.96)_0%,rgba(8,14,26,0.98)_100%)] p-5 shadow-[0_0_40px_rgba(0,0,0,0.20)] sm:rounded-[2rem] lg:p-7" aria-labelledby="seo-strategy-title">
            <h2 id="seo-strategy-title" className="text-xs uppercase tracking-[0.28em] text-emerald-200">{seoGrowth.sections.strategy}</h2>
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

        <div className="grid gap-6 xl:grid-cols-3">
          <section className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,32,42,0.96)_0%,rgba(8,14,26,0.98)_100%)] p-5 shadow-[0_0_40px_rgba(0,0,0,0.20)] sm:rounded-[2rem] lg:p-7" aria-labelledby="seo-health-title">
            <h2 id="seo-health-title" className="text-xs uppercase tracking-[0.28em] text-emerald-200">{seoGrowth.sections.health}</h2>
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

          <section className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,32,42,0.96)_0%,rgba(8,14,26,0.98)_100%)] p-5 shadow-[0_0_40px_rgba(0,0,0,0.20)] sm:rounded-[2rem] lg:p-7" aria-labelledby="seo-keywords-title">
            <h2 id="seo-keywords-title" className="text-xs uppercase tracking-[0.28em] text-emerald-200">{seoGrowth.sections.keywords}</h2>
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

          <section className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,32,42,0.96)_0%,rgba(8,14,26,0.98)_100%)] p-5 shadow-[0_0_40px_rgba(0,0,0,0.20)] sm:rounded-[2rem] lg:p-7" aria-labelledby="seo-content-title">
            <h2 id="seo-content-title" className="text-xs uppercase tracking-[0.28em] text-emerald-200">{seoGrowth.sections.content}</h2>
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
