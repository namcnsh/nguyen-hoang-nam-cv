"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

import { projectsData } from "@/utils/data/projects-data";

const selectedProjectIds = [1, 2];
const dashboardSummary = [
  { label: "CPM", value: "52.000đ" },
  { label: "CPC", value: "4.800đ" },
  { label: "CTR", value: "1,86%" },
  { label: "Lead", value: "128" },
  { label: "Conversion Rate", value: "7,4%" },
  { label: "Cost/Lead", value: "96.000đ" }
];
const dashboardChannels = [
  { name: "Meta Ads", spend: "7.800.000đ", leads: "82", ctr: "2,1%", cpl: "95.000đ", widthClass: "w-[82%]" },
  { name: "Google Ads", spend: "3.600.000đ", leads: "31", ctr: "4,8%", cpl: "116.000đ", widthClass: "w-[31%]" },
  { name: "TikTok Ads", spend: "900.000đ", leads: "15", ctr: "1,4%", cpl: "60.000đ", widthClass: "w-[15%]" }
];
const dashboardInsights = [
  "Meta Ads tạo nhiều lead nhất trong dữ liệu demo.",
  "Google Ads có CTR cao, phù hợp nhóm có nhu cầu chủ động.",
  "TikTok Ads có chi phí/lead thấp trong dữ liệu demo nhưng cần kiểm tra chất lượng lead."
];
const dashboardActions = [
  "Giữ ngân sách cho Meta Ads nếu chất lượng lead ổn.",
  "Tối ưu từ khóa và landing page cho Google Ads.",
  "Test thêm creative ngắn cho TikTok Ads trước khi tăng ngân sách."
];

function FeaturedCaseStudies() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const projects = selectedProjectIds
    .map((id) => projectsData.find((project) => project.id === id))
    .filter(Boolean);

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

  return (
    <>
      <section id="featured-case-studies" className="relative my-12 lg:my-24">
        <div className="mb-8 flex items-center gap-4">
          <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-violet-100">
            Case study nổi bật
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-violet-500/40 to-transparent" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,36,0.92)_0%,rgba(8,10,24,0.98)_100%)] p-6 shadow-[0_0_40px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex h-full flex-col">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
                    #{project.id}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold leading-tight text-white md:text-3xl">{project.name}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">{project.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Role</p>
                    <p className="mt-1 text-sm font-medium text-violet-100">{project.role}</p>
                  </div>

                  {project.id === 1 && project.demo ? (
                    <Link href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#070913] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-400/50">
                      <span>Xem demo</span>
                      <FaExternalLinkAlt size={12} aria-hidden="true" />
                    </Link>
                  ) : project.id === 2 ? (
                    <button type="button" onClick={() => setIsDashboardOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#070913] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-400/50">
                      <span>Xem demo</span>
                      <FaExternalLinkAlt size={12} aria-hidden="true" />
                    </button>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {isDashboardOpen ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm" onClick={() => setIsDashboardOpen(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="dashboard-demo-title" className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,36,0.98)_0%,rgba(8,10,24,1)_100%)] p-6 shadow-[0_0_60px_rgba(0,0,0,0.35)] lg:p-8" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">Số liệu demo</span>
                <h3 id="dashboard-demo-title" className="mt-4 text-2xl font-bold text-white md:text-3xl">Dashboard phân tích hiệu quả quảng cáo</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">Minh họa cách theo dõi CPC, CTR, CPM, Lead và tỷ lệ chuyển đổi.</p>
                <p className="mt-2 text-sm text-sky-200">Số liệu demo dùng để minh họa cách phân tích hiệu quả quảng cáo.</p>
              </div>
              <button type="button" onClick={() => setIsDashboardOpen(false)} aria-label="Đóng dashboard demo" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white outline-none transition focus-visible:ring-2 focus-visible:ring-blue-400/50">
                Đóng
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {dashboardSummary.map((item) => (
                <article key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                  <p className="mt-3 text-2xl font-bold text-white">{item.value}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {dashboardChannels.map((channel) => (
                <article key={channel.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-lg font-semibold text-white">{channel.name}</h4>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{channel.ctr}</span>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-white/5">
                    <div className={`h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300 ${channel.widthClass}`} />
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-slate-400">Spend</dt>
                      <dd className="mt-1 text-white">{channel.spend}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Leads</dt>
                      <dd className="mt-1 text-white">{channel.leads}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">CTR</dt>
                      <dd className="mt-1 text-white">{channel.ctr}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-400">Cost/Lead</dt>
                      <dd className="mt-1 text-white">{channel.cpl}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <h4 className="text-lg font-semibold text-white">Mục tiêu demo</h4>
                <p className="mt-3 text-sm leading-7 text-slate-300">Mục tiêu demo: theo dõi hiệu quả theo kênh, so sánh chi phí tạo lead và xác định hướng tối ưu ngân sách.</p>
              </section>
              <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <h4 className="text-lg font-semibold text-white">Số liệu demo</h4>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                  {dashboardSummary.map((item) => (
                    <li key={item.label}>• {item.label}: {item.value}</li>
                  ))}
                </ul>
              </section>
              <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <h4 className="text-lg font-semibold text-white">Nhận xét</h4>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                  {dashboardInsights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </section>
              <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <h4 className="text-lg font-semibold text-white">Đề xuất tối ưu</h4>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                  {dashboardActions.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default FeaturedCaseStudies;
