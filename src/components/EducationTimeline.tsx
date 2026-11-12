import React from 'react';
import { EDUCATION_LIST } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

export const EducationTimeline: React.FC = () => {
  return (
    <section id="education" className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            Academic Background
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
            Education
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Academic credentials and institutional milestones from the official resume.
          </p>
        </div>

        {/* Professional Cards Grid / Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION_LIST.map((edu, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Degree & Graduation Icon */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="p-2.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                    <GraduationCap className="w-5 h-5" />
                  </span>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">
                      {edu.gradeLabel}
                    </span>
                    <span className="text-xl font-bold text-slate-900 font-mono">
                      {edu.gradeValue}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                  {edu.degree}
                </h3>

                <div className="text-sm text-blue-600 font-medium mt-1">
                  {edu.institution}
                </div>
              </div>

              {/* Meta: Period & Location */}
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{edu.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{edu.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
