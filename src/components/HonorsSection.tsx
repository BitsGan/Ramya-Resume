import React from 'react';
import { HONORS_LIST } from '../data/portfolioData';
import { Trophy, CheckCircle2 } from 'lucide-react';

export const HonorsSection: React.FC = () => {
  return (
    <section id="honors" className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            Recognition & Focus
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
            Honors & Awards
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Competitive programming participation, hackathon rankings, and engineering interests.
          </p>
        </div>

        {/* Minimal Professional Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HONORS_LIST.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-colors flex items-start gap-3.5"
            >
              <span className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 shrink-0 mt-0.5">
                <Trophy className="w-4 h-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-slate-800 leading-relaxed">
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
