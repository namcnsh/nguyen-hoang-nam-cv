// @flow strict

import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";

function Skills() {
  return (
    <section id="skills" className="relative z-50 my-12 border-t border-white/10 pt-10 lg:my-24 lg:pt-14">
      <div className="mb-8 flex items-center gap-4">
        <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-violet-100">
          Kỹ năng
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/40 to-transparent" />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {skillsData.map((skill) => {
          const skillImage = skillsImage(skill);
          const skillImageSrc = skillImage && typeof skillImage === 'object' && 'src' in skillImage ? skillImage.src : null;

          return (
            <article
              key={skill}
              className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,36,0.92)_0%,rgba(8,10,24,0.98)_100%)] p-5 shadow-[0_0_30px_rgba(0,0,0,0.18)]"
            >
              <div className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  {skillImageSrc ? (
                    <Image
                      src={skillImageSrc}
                      alt={skill}
                      width={40}
                      height={40}
                      className="!h-full !w-auto rounded-lg"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  ) : (
                    <span className="text-sm font-semibold text-blue-100">
                      {skill.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-slate-100 sm:text-base">
                  {skill}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
