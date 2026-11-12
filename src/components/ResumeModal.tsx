import React from 'react';
import { X, Download, FileText, ExternalLink, CheckCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl h-[90vh] bg-white border border-slate-200 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:px-6 border-b border-slate-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-display">
                {PERSONAL_INFO.name} — Curriculum Vitae
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{PERSONAL_INFO.title}</span>
                <span aria-hidden="true">·</span>
                <span>Balaji Institute of Technology and Science</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              download="Anthati_Ramya_Resume.pdf"
              className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close Resume Viewer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Embedded View */}
        <div className="flex-1 w-full bg-slate-100 relative">
          <object
            data={`${PERSONAL_INFO.resumePdfUrl}#toolbar=1`}
            type="application/pdf"
            className="w-full h-full"
          >
            <iframe
              src={`${PERSONAL_INFO.resumePdfUrl}#toolbar=1`}
              title="Anthati Ramya Official Resume"
              className="w-full h-full border-none"
            >
              <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white">
                <FileText className="w-12 h-12 text-blue-600 mb-3" />
                <h4 className="text-base font-bold text-slate-900 mb-1">
                  Anthati Ramya — Resume PDF
                </h4>
                <p className="text-xs text-slate-500 mb-4 max-w-sm">
                  Click the button below to download the official verified curriculum vitae directly.
                </p>
                <a
                  href={PERSONAL_INFO.resumePdfUrl}
                  download="Anthati_Ramya_Resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Anthati_Ramya_Resume.pdf</span>
                </a>
              </div>
            </iframe>
          </object>
        </div>

        {/* Footer info bar */}
        <div className="p-3 px-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Source of Truth: Accelor-hackerresume_fe5887bd.pdf</span>
          </div>
          <a
            href={PERSONAL_INFO.resumePdfUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
          >
            <span>Open in new window</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
