// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";

function AboutSection() {
  return (
    <section id="about" className="relative my-12 lg:my-24">
      <div className="mb-8 flex items-center gap-4">
        <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-violet-100">
          Giới thiệu
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/40 to-transparent" />
      </div>

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="order-2 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,36,0.92)_0%,rgba(8,10,24,0.98)_100%)] p-6 shadow-[0_0_40px_rgba(0,0,0,0.25)] lg:order-1 lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-200">
            Tôi là ai?
          </p>
          <p className="mt-5 text-base leading-8 text-slate-300 lg:text-lg">
            {personalData.description}
          </p>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <div className="relative w-full max-w-[360px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.10] to-white/[0.02] p-3 shadow-2xl shadow-blue-950/30">
            <div className="relative aspect-square overflow-hidden rounded-[1.35rem] bg-[#0d1224]">
              <Image
                src={personalData.profile}
                alt={`Ảnh chân dung của ${personalData.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
