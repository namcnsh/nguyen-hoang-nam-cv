import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

import { projectsData } from "@/utils/data/projects-data";

const selectedProjectIds = [1, 2];

function FeaturedCaseStudies() {
  const projects = selectedProjectIds
    .map((id) => projectsData.find((project) => project.id === id))
    .filter(Boolean);

  return (
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
                  <Link href="/dashboard-demo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#070913] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-400/50">
                    <span>Xem demo</span>
                    <FaExternalLinkAlt size={12} aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturedCaseStudies;
