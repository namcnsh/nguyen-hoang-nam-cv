// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { RiContactsFill } from "react-icons/ri";

function HeroSection() {
  const focusTags = [
    "Meta Ads",
    "Google Ads",
    "TikTok Ads",
    "SEO",
    "landing page",
    "phân tích dữ liệu marketing"
  ].filter((tag) => personalData.description.toLowerCase().includes(tag.toLowerCase()));

  return (
    <section className="relative flex flex-col items-center justify-between overflow-hidden py-6 lg:py-16">
      <Image
        src="/hero.svg"
        alt=""
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10 opacity-40"
        priority
      />

      <div className="grid grid-cols-1 items-center gap-y-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="order-1 flex flex-col items-start justify-center p-2 pb-8 lg:pt-10">
          <span className="mb-5 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-violet-100">
            {personalData.designation}
          </span>
          <h1 className="text-4xl font-bold leading-tight text-white md:font-extrabold lg:text-[4rem] lg:leading-[4.6rem]">
            {personalData.name}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            {personalData.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {focusTags.map((tag) => (
              <span key={tag} className="rounded-full border border-blue-300/20 bg-white/[0.04] px-4 py-2 text-sm text-blue-100">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="#contact" className="flex items-center gap-2 rounded-full bg-[#070913] px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider text-white no-underline outline-none ring-1 ring-violet-500 transition-all duration-200 ease-out hover:ring-blue-400 focus-visible:ring-2 focus-visible:ring-blue-400/60 md:px-8 md:py-4">
              <span>Liên hệ ngay</span>
              <RiContactsFill size={16} />
            </Link>
            <Link href="#featured-case-studies" className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-100 outline-none transition-all duration-200 hover:border-violet-300/60 hover:text-white focus-visible:border-blue-300 focus-visible:ring-2 focus-visible:ring-blue-400/40 md:px-8 md:py-4">
              Xem case study
            </Link>
          </div>
        </div>

        <div className="order-2 relative mx-auto w-full max-w-[460px]">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-violet-500/25 to-pink-500/10 blur-2xl"></div>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.10] to-white/[0.02] p-4 shadow-2xl shadow-blue-950/40 backdrop-blur">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#0d1224]">
              <Image
                src={personalData.profile}
                alt={personalData.name}
                fill
                sizes="(max-width: 768px) 100vw, 460px"
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-[#070913]/80 p-5">
              <h2 className="text-2xl font-bold text-white">{personalData.name}</h2>
              <p className="mt-2 text-sm font-medium text-violet-200">{personalData.designation}</p>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {personalData.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;