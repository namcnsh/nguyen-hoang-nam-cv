import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { projectsData } from '@/utils/data/projects-data';

const Projects = () => {

  return (
    <section id="projects" className="relative z-50 my-12 lg:my-24">
      <div className="mb-8 flex items-center gap-4">
        <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-violet-100">
          Dự án
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-violet-500/40 to-transparent" />
      </div>

      <div className="grid gap-6">
        {projectsData.slice(0, 4).map((project) => (
          <article
            id={`project-${project.id}`}
            key={project.id}
            className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,36,0.92)_0%,rgba(8,10,24,0.98)_100%)] p-6 shadow-[0_0_40px_rgba(0,0,0,0.20)] lg:p-8"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
            <div className="relative">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
                  #{project.id}
                </span>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                  {project.role}
                </p>
              </div>

              <h3 className="text-2xl font-semibold leading-tight text-white md:text-3xl">
                {project.name}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {project.demo ? (
                <div className="mt-6 border-t border-white/10 pt-5">
                  <Link
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#070913] outline-none transition focus-visible:ring-2 focus-visible:ring-blue-400/50"
                  >
                    <span>Xem demo</span>
                    <FaExternalLinkAlt size={12} aria-hidden="true" />
                  </Link>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
