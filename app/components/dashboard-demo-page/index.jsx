"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FaArrowLeft, FaChartLine, FaExternalLinkAlt } from "react-icons/fa";

const metricOptions = [
  { key: "leads", label: "Lead", suffix: "", description: "Số lượng lead theo ngày" },
  { key: "cpl", label: "Cost/Lead", suffix: "đ", description: "Chi phí tạo lead theo ngày" },
  { key: "ctr", label: "CTR", suffix: "%", description: "Tỷ lệ nhấp theo ngày" }
];

const dashboardSummary = [
  { label: "Tổng ngân sách", value: "12.300.000đ", note: "+8,4% vs demo trước" },
  { label: "Tổng lead", value: "128", note: "+14 lead trong 7 ngày" },
  { label: "Cost/Lead", value: "96.000đ", note: "-7,1% vs tuần trước" },
  { label: "CTR trung bình", value: "1,86%", note: "+0,22 điểm %" },
  { label: "Conversion Rate", value: "7,4%", note: "+0,8 điểm %" }
];

const budgetMix = [
  { name: "Meta Ads", share: 63, amount: "7.800.000đ", color: "#8b5cf6" },
  { name: "Google Ads", share: 29, amount: "3.600.000đ", color: "#38bdf8" },
  { name: "TikTok Ads", share: 8, amount: "900.000đ", color: "#22c55e" }
];

const channelCards = [
  {
    name: "Meta Ads",
    accent: "from-violet-500/30 to-fuchsia-400/10",
    spend: "7.800.000đ",
    leads: "82",
    ctr: "2,1%",
    cpl: "95.000đ",
    quality: "Lead volume mạnh nhất",
    note: "Kênh tạo lead lớn nhất trong dữ liệu demo."
  },
  {
    name: "Google Ads",
    accent: "from-sky-500/30 to-cyan-400/10",
    spend: "3.600.000đ",
    leads: "31",
    ctr: "4,8%",
    cpl: "116.000đ",
    quality: "Nhu cầu chủ động cao",
    note: "CTR cao, phù hợp nhóm khách hàng đã có nhu cầu rõ."
  },
  {
    name: "TikTok Ads",
    accent: "from-emerald-500/30 to-lime-400/10",
    spend: "900.000đ",
    leads: "15",
    ctr: "1,4%",
    cpl: "60.000đ",
    quality: "Chi phí/lead thấp",
    note: "Chi phí/lead thấp trong dữ liệu demo, cần kiểm tra chất lượng lead."
  }
];

const insights = [
  {
    title: "Điểm sáng",
    description: "Meta Ads đang đóng vai trò kênh giữ nhịp volume lead, phù hợp để duy trì độ phủ cho chiến dịch demo."
  },
  {
    title: "Điểm cần lưu ý",
    description: "Google Ads có CTR tốt nhưng CPL cao hơn Meta Ads, cho thấy cần tối ưu thêm landing page và nhóm từ khóa."
  },
  {
    title: "Cơ hội test",
    description: "TikTok Ads có CPL thấp trong dữ liệu demo; có thể test thêm creative ngắn để xem khả năng mở rộng."
  }
];

const nextActions = [
  "Giữ ngân sách nền cho Meta Ads nếu chất lượng lead tiếp tục ổn định.",
  "Rà soát truy vấn tìm kiếm và cải thiện thông điệp landing page cho Google Ads.",
  "Tạo thêm 2-3 biến thể creative ngắn cho TikTok Ads trước khi tăng ngân sách demo."
];

const performanceSeries = {
  leads: {
    unit: "lead",
    rows: [
      { label: "T2", MetaAds: 10, GoogleAds: 4, TikTokAds: 2 },
      { label: "T3", MetaAds: 12, GoogleAds: 5, TikTokAds: 2 },
      { label: "T4", MetaAds: 11, GoogleAds: 4, TikTokAds: 1 },
      { label: "T5", MetaAds: 13, GoogleAds: 5, TikTokAds: 3 },
      { label: "T6", MetaAds: 12, GoogleAds: 4, TikTokAds: 2 },
      { label: "T7", MetaAds: 14, GoogleAds: 5, TikTokAds: 3 },
      { label: "CN", MetaAds: 10, GoogleAds: 4, TikTokAds: 2 }
    ]
  },
  cpl: {
    unit: "đ",
    rows: [
      { label: "T2", MetaAds: 98000, GoogleAds: 122000, TikTokAds: 64000 },
      { label: "T3", MetaAds: 95000, GoogleAds: 118000, TikTokAds: 62000 },
      { label: "T4", MetaAds: 97000, GoogleAds: 120000, TikTokAds: 61000 },
      { label: "T5", MetaAds: 93000, GoogleAds: 117000, TikTokAds: 58000 },
      { label: "T6", MetaAds: 96000, GoogleAds: 115000, TikTokAds: 60000 },
      { label: "T7", MetaAds: 94000, GoogleAds: 114000, TikTokAds: 59000 },
      { label: "CN", MetaAds: 95000, GoogleAds: 116000, TikTokAds: 60000 }
    ]
  },
  ctr: {
    unit: "%",
    rows: [
      { label: "T2", MetaAds: 1.9, GoogleAds: 4.5, TikTokAds: 1.2 },
      { label: "T3", MetaAds: 2.0, GoogleAds: 4.7, TikTokAds: 1.3 },
      { label: "T4", MetaAds: 1.8, GoogleAds: 4.6, TikTokAds: 1.1 },
      { label: "T5", MetaAds: 2.1, GoogleAds: 4.9, TikTokAds: 1.5 },
      { label: "T6", MetaAds: 2.0, GoogleAds: 4.8, TikTokAds: 1.4 },
      { label: "T7", MetaAds: 2.2, GoogleAds: 5.0, TikTokAds: 1.5 },
      { label: "CN", MetaAds: 2.1, GoogleAds: 4.8, TikTokAds: 1.4 }
    ]
  }
};

const channelConfig = {
  MetaAds: { label: "Meta Ads", color: "#8b5cf6" },
  GoogleAds: { label: "Google Ads", color: "#38bdf8" },
  TikTokAds: { label: "TikTok Ads", color: "#22c55e" }
};
const chartChannels = Object.keys(channelConfig);

function formatMetricValue(metricKey, value) {
  if (metricKey === "cpl") {
    return `${new Intl.NumberFormat("vi-VN").format(value)}đ`;
  }

  if (metricKey === "ctr") {
    return `${value.toFixed(1).replace(".", ",")}%`;
  }

  return `${value}`;
}

function buildPath(values, maxValue) {
  return values
    .map((value, index) => {
      const x = 40 + index * 74;
      const y = 208 - (value / maxValue) * 150;
      return `${index === 0 ? "M" : "L"}${x} ${y}`;
    })
    .join(" ");
}

function DashboardDemoPageContent() {
  const [activeMetric, setActiveMetric] = useState("leads");
  const [activeChannel, setActiveChannel] = useState("MetaAds");

  const metricData = performanceSeries[activeMetric];

  const chartData = useMemo(() => {
    const allValues = metricData.rows.flatMap((row) => chartChannels.map((channel) => row[channel]));
    const maxValue = Math.max(...allValues);

    return chartChannels.map((channel) => ({
      key: channel,
      label: channelConfig[channel].label,
      color: channelConfig[channel].color,
      values: metricData.rows.map((row) => row[channel]),
      path: buildPath(metricData.rows.map((row) => row[channel]), maxValue)
    }));
  }, [chartChannels, metricData.rows]);

  const activePoint = metricData.rows[metricData.rows.length - 1];
  const activeChannelLabel = channelConfig[activeChannel].label;
  const activeValue = activePoint[activeChannel];

  const donutSegments = useMemo(() => {
    const radius = 64;
    const circumference = 2 * Math.PI * radius;

    return budgetMix.map((item, index) => {
      const length = circumference * (item.share / 100);
      const dashOffset = budgetMix
        .slice(0, index)
        .reduce((sum, previousItem) => sum + circumference * (previousItem.share / 100), 0);

      return {
        ...item,
        radius,
        circumference,
        dashArray: `${length} ${circumference - length}`,
        dashOffset: -dashOffset
      };
    });
  }, []);

  return (
    <section className="relative overflow-hidden py-10 lg:py-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.20),transparent_32%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.18),transparent_30%),linear-gradient(180deg,#050816_0%,#0b1020_52%,#060914_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-sky-300/30 to-transparent" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_60px_rgba(0,0,0,0.24)] backdrop-blur xl:flex-row xl:items-center xl:justify-between xl:p-7">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">
                Số liệu demo
              </span>
              <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs font-medium text-sky-100">
                Agency Performance Report
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white md:text-5xl">
              Dashboard phân tích hiệu quả quảng cáo
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              Bản demo mô phỏng cách một agency hoặc team performance marketing theo dõi ngân sách, lead, CPL và hiệu quả theo từng kênh quảng cáo.
            </p>
            <p className="mt-3 text-sm font-medium text-sky-200">
              Số liệu demo dùng để minh họa cách phân tích hiệu quả quảng cáo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition hover:border-sky-300/40 hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50">
              <FaArrowLeft size={12} aria-hidden="true" />
              <span>Về landing page</span>
            </Link>
            <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-100">
              Snapshot 7 ngày gần nhất
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {dashboardSummary.map((item) => (
            <article key={item.label} className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,26,48,0.95)_0%,rgba(8,12,26,0.98)_100%)] p-5 shadow-[0_0_30px_rgba(0,0,0,0.18)]">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
              <p className="mt-4 text-3xl font-bold text-white">{item.value}</p>
              <p className="mt-2 text-sm text-emerald-200">{item.note}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
          <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,26,48,0.96)_0%,rgba(8,12,26,0.98)_100%)] p-5 shadow-[0_0_40px_rgba(0,0,0,0.20)] lg:p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-violet-200">Hiệu suất theo thời gian</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Executive trend overview</h2>
                <p className="mt-2 text-sm leading-7 text-slate-300">Chọn chỉ số để xem sự thay đổi hiệu suất theo từng ngày và nhấn vào kênh để làm nổi bật kết quả cuối kỳ.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {metricOptions.map((metric) => {
                  const isActive = metric.key === activeMetric;

                  return (
                    <button
                      key={metric.key}
                      type="button"
                      onClick={() => setActiveMetric(metric.key)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 ${isActive ? "border border-sky-300/30 bg-sky-300/15 text-sky-100" : "border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white"}`}
                    >
                      {metric.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-[#060b17]/80 p-4 lg:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-medium text-white">{metricOptions.find((item) => item.key === activeMetric)?.description}</p>
                  <p className="mt-1 text-xs text-slate-400">Đơn vị hiển thị thay đổi theo chỉ số đang chọn.</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
                  Hover-free mode, tap-friendly trên mobile
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <svg viewBox="0 0 540 260" className="h-[260px] min-w-[540px] w-full" role="img" aria-label="Biểu đồ hiệu suất theo ngày của các kênh quảng cáo trong dữ liệu demo">
                  <defs>
                    <linearGradient id="chart-grid" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                    </linearGradient>
                  </defs>
                  {[0, 1, 2, 3].map((line) => (
                    <line key={line} x1="40" y1={58 + line * 50} x2="484" y2={58 + line * 50} stroke="url(#chart-grid)" strokeWidth="1" />
                  ))}
                  {metricData.rows.map((row, index) => (
                    <g key={row.label}>
                      <line x1={40 + index * 74} y1="40" x2={40 + index * 74} y2="210" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                      <text x={40 + index * 74} y="236" textAnchor="middle" fill="#94a3b8" fontSize="12">
                        {row.label}
                      </text>
                    </g>
                  ))}
                  {chartData.map((series) => {
                    const isActive = series.key === activeChannel;

                    return (
                      <g key={series.key} opacity={isActive ? 1 : 0.38}>
                        <path d={series.path} fill="none" stroke={series.color} strokeWidth={isActive ? 4 : 3} strokeLinecap="round" />
                        {series.values.map((value, index) => {
                          const x = 40 + index * 74;
                          const maxValue = Math.max(...metricData.rows.flatMap((row) => chartChannels.map((channel) => row[channel])));
                          const y = 208 - (value / maxValue) * 150;

                          return (
                            <circle key={`${series.key}-${metricData.rows[index].label}`} cx={x} cy={y} r={index === series.values.length - 1 && isActive ? 7 : 5} fill={series.color} stroke="#020617" strokeWidth="3" />
                          );
                        })}
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {chartData.map((series) => {
                  const isActive = series.key === activeChannel;

                  return (
                    <button
                      key={series.key}
                      type="button"
                      onClick={() => setActiveChannel(series.key)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 ${isActive ? "border-white/20 bg-white/[0.08] text-white" : "border-white/10 bg-white/[0.03] text-slate-300"}`}
                    >
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: series.color }} />
                      <span>{series.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <FaChartLine className="text-sky-300" aria-hidden="true" />
                  <span>Kênh đang xem: <strong className="text-white">{activeChannelLabel}</strong></span>
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Giá trị cuối kỳ: <span className="font-semibold text-white">{formatMetricValue(activeMetric, activeValue)}</span>. Đây là số liệu demo để minh họa cách đọc xu hướng hiệu suất quảng cáo.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,26,48,0.96)_0%,rgba(8,12,26,0.98)_100%)] p-5 shadow-[0_0_40px_rgba(0,0,0,0.20)] lg:p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-violet-200">Phân bổ ngân sách demo</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Budget allocation snapshot</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">Tỷ trọng ngân sách giúp người xem nhanh chóng nhận ra kênh nào đang giữ vai trò chính trong kế hoạch media demo.</p>

            <div className="mt-6 flex flex-col items-center gap-6 rounded-[1.75rem] border border-white/10 bg-[#060b17]/80 p-5">
              <div className="relative flex h-44 w-44 items-center justify-center">
                <svg viewBox="0 0 160 160" className="h-44 w-44 -rotate-90">
                  <circle cx="80" cy="80" r="64" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="18" />
                  {donutSegments.map((segment) => (
                    <circle
                      key={segment.name}
                      cx="80"
                      cy="80"
                      r={segment.radius}
                      fill="none"
                      stroke={segment.color}
                      strokeWidth="18"
                      strokeDasharray={segment.dashArray}
                      strokeDashoffset={segment.dashOffset}
                      strokeLinecap="round"
                    />
                  ))}
                </svg>
                <div className="absolute text-center">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Budget Mix</p>
                  <p className="mt-2 text-3xl font-bold text-white">100%</p>
                  <p className="mt-1 text-xs text-slate-400">dữ liệu demo</p>
                </div>
              </div>

              <div className="w-full space-y-3">
                {budgetMix.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <div>
                        <p className="text-sm font-medium text-white">{item.name}</p>
                        <p className="text-xs text-slate-400">{item.amount}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-sky-100">{item.share}%</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="grid gap-5 lg:grid-cols-3">
          {channelCards.map((channel) => (
            <article key={channel.name} className="relative overflow-hidden rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,26,48,0.96)_0%,rgba(8,12,26,0.98)_100%)] p-5 shadow-[0_0_35px_rgba(0,0,0,0.18)]">
              <div className={`absolute inset-0 bg-gradient-to-br ${channel.accent} opacity-70`} />
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Kênh quảng cáo</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{channel.name}</h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white">
                    {channel.quality}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Spend</p>
                    <p className="mt-2 text-xl font-semibold text-white">{channel.spend}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Lead</p>
                    <p className="mt-2 text-xl font-semibold text-white">{channel.leads}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-300">CTR</p>
                    <p className="mt-2 text-xl font-semibold text-white">{channel.ctr}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Cost/Lead</p>
                    <p className="mt-2 text-xl font-semibold text-white">{channel.cpl}</p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-100/90">{channel.note}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,26,48,0.96)_0%,rgba(8,12,26,0.98)_100%)] p-5 shadow-[0_0_40px_rgba(0,0,0,0.20)] lg:p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-violet-200">Mục tiêu & nhận xét</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Executive commentary</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">Mục tiêu demo: theo dõi hiệu quả theo kênh, so sánh chi phí tạo lead và xác định hướng tối ưu ngân sách.</p>

            <div className="mt-6 space-y-4">
              {insights.map((item) => (
                <article key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,26,48,0.96)_0%,rgba(8,12,26,0.98)_100%)] p-5 shadow-[0_0_40px_rgba(0,0,0,0.20)] lg:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-violet-200">Đề xuất tối ưu</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Recommended next actions</h2>
              </div>
              <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition hover:border-sky-300/40 hover:text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50">
                <span>Xem case gốc</span>
                <FaExternalLinkAlt size={12} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {nextActions.map((item, index) => (
                <div key={item} className="flex gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-300/20 bg-sky-300/10 text-sm font-semibold text-sky-100">
                    0{index + 1}
                  </div>
                  <p className="text-sm leading-7 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default DashboardDemoPageContent;
