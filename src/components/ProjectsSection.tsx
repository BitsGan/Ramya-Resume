import React from 'react';
import { PROJECTS_LIST } from '../data/portfolioData';
import { Github, ExternalLink, Code2 } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            Portfolio Works
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
            Projects & Open Source
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Practical software projects developed across mobile, web, and emerging technology domains.
          </p>
        </div>

        {/* 3 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_LIST.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Project Screenshot Placeholder */}
                <div className="relative aspect-[16/10] bg-slate-100 border-b border-slate-150 overflow-hidden group">
                  <img
                    src={project.screenshot}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-900/5 pointer-events-none" />
                </div>

                {/* Project Card Content */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                    {project.title}
                  </h3>

                  {/* Bulleted Short Description (where supported) */}
                  {project.description && project.description.length > 0 ? (
                    <ul className="space-y-1.5 text-xs text-slate-600 leading-relaxed list-disc list-inside">
                      {project.description.map((item, idx) => (
                        <li key={idx} className="marker:text-blue-500">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500 italic">
                      Project title and technical architecture as verified in official resume.
                    </p>
                  )}

                  {/* Technology Stack Badges */}
                  <div className="pt-2">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                      Technologies
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-slate-100 rounded border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* GitHub Link Footer */}
              <div className="p-5 sm:p-6 pt-0">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
