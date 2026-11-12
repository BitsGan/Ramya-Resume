import React from 'react';
import { SKILL_GROUPS } from '../data/portfolioData';
import { Code2, Layers, Wrench, Database, Sparkles } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming Languages':
        return <Code2 className="w-4 h-4 text-blue-600" />;
      case 'Frameworks and Libraries':
        return <Layers className="w-4 h-4 text-blue-600" />;
      case 'Tools and Platforms':
        return <Wrench className="w-4 h-4 text-blue-600" />;
      case 'Database':
        return <Database className="w-4 h-4 text-blue-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            Technical Competencies
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
            Technical Skills
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Languages, libraries, database engines, and software tooling utilized across projects and coursework.
          </p>
        </div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="p-1.5 rounded-md bg-white border border-slate-200 shadow-2xs">
                  {getCategoryIcon(group.category)}
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  {group.category}
                </h3>
              </div>

              {/* Simple professional technology labels (NO percentage bars) */}
              <div className="flex flex-wrap gap-2 pt-1">
                {group.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
