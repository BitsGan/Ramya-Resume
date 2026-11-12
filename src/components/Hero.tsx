import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Github, Linkedin, Mail, Phone, MapPin, ArrowRight, FileText, Download, Eye } from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  return (
    <section id="about" className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 bg-white border-b border-slate-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bio & Information */}
          <div className="lg:col-span-7 space-y-6">
            {/* Title / Subtitle */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
                <span>{PERSONAL_INFO.title}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 font-display leading-[1.1]">
                {PERSONAL_INFO.name}
              </h1>
            </div>

            {/* Introduction Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {PERSONAL_INFO.intro}
            </p>

            {/* Location & Quick Contact Info */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-slate-400" />
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-blue-600 transition-colors">
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-slate-400" />
                <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:text-blue-600 transition-colors">
                  {PERSONAL_INFO.phone}
                </a>
              </div>
            </div>

            {/* Action Buttons: View Projects, Download Resume, Contact Me */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#projects"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.resumePdfUrl}
                download="Anthati_Ramya_Resume.pdf"
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-all cursor-pointer active:scale-95"
                title="Download PDF directly to your device"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>Download Resume</span>
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Preview PDF"
              >
                <Eye className="w-4 h-4 text-slate-400" />
                <span>Preview</span>
              </button>

              <a
                href="#contact"
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-all cursor-pointer active:scale-95"
              >
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Links (GitHub and LinkedIn) */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs text-slate-400 font-medium">Connect on:</span>
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-300">·</span>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 text-blue-600" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Profile Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
              <img
                src={PERSONAL_INFO.profileImage}
                alt="Anthati Ramya - Full Stack Java Developer"
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => {
                  // Fallback if local image not found
                  const target = e.currentTarget;
                  target.src = '/src/assets/images/profile_1794491284244.jpeg';
                }}
              />
              {/* Clean bottom credit caption */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent p-4 text-white">
                <div className="text-sm font-bold">{PERSONAL_INFO.name}</div>
                <div className="text-xs text-slate-200">{PERSONAL_INFO.title}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
