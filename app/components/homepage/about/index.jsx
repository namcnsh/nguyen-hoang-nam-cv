// @flow strict

const aboutHighlights = [
  'Nghiên cứu chân dung khách hàng và hành vi người dùng.',
  'Xây dựng thông điệp nội dung quảng cáo theo mục tiêu chiến dịch.',
  'Tối ưu chi phí quảng cáo và theo dõi chỉ số hiệu quả.',
  'Phối hợp linh hoạt cùng team creative để cải thiện tỷ lệ chuyển đổi.',
  'Kết hợp landing page, dữ liệu marketing và AI để hỗ trợ tăng trưởng.'
];

function AboutSection() {
  return (
    <section id="about" className="relative my-12 lg:my-24">
      <div className="mb-8 flex items-center gap-4">
        <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-violet-100">
          Giới thiệu
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/40 to-transparent" />
      </div>

      <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,36,0.92)_0%,rgba(8,10,24,0.98)_100%)] p-6 shadow-[0_0_40px_rgba(0,0,0,0.25)] lg:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-200">
          Tôi là ai?
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {aboutHighlights.map((highlight) => (
            <div key={highlight} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm leading-7 text-slate-300 md:text-base">
                {highlight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
