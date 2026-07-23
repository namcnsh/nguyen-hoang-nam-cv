// @flow strict

import { experiences } from "@/utils/data/experience";
import { BsPersonWorkspace } from "react-icons/bs";

function Experience() {
  return (
    <section id="experience" className="relative z-50 my-12 border-t border-white/10 pt-10 lg:my-24 lg:pt-14">
      <div className="mb-8 flex items-center gap-4">
        <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-violet-100">
          Kinh nghiệm
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/40 to-transparent" />
      </div>

      <div className="grid gap-5">
        {experiences.map((experience) => (
          <article
            key={experience.id}
            className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,36,0.92)_0%,rgba(8,10,24,0.98)_100%)] p-6 shadow-[0_0_40px_rgba(0,0,0,0.20)] lg:p-8"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:gap-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-blue-200">
                <BsPersonWorkspace size={22} aria-hidden="true" />
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold leading-tight text-white md:text-2xl">
                      {experience.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-violet-100 md:text-base">
                      {experience.company}
                    </p>
                  </div>
                  <p className="shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
                    {experience.duration}
                  </p>
                </div>
                {experience.details && (
                  <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-300">
                    {experience.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
