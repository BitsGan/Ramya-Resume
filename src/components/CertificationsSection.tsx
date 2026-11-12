import React from 'react';
import { CERTIFICATIONS_LIST } from '../data/portfolioData';
import { ShieldCheck, Award, CheckCircle } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            Verified Credentials
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
            Certifications
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Professional certifications and virtual internship credentials listed in the official resume.
          </p>
        </div>

        {/* Clean Certification Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS_LIST.map((cert, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                    <Award className="w-4 h-4" />
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug tracking-tight">
                  {cert.title}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/70 text-xs text-slate-500 font-medium">
                {cert.issuer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
