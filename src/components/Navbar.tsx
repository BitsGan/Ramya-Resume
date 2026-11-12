import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { FileText, Menu, X, ArrowUpRight, Download, Eye } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Brand Wordmark */}
          <a
            href="#"
            className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 font-display flex items-center gap-2 group"
          >
            <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-mono text-sm font-bold shadow-sm group-hover:bg-blue-700 transition-colors">
              AR
            </span>
            <span>{PERSONAL_INFO.name}</span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              About
            </a>
            <a href="#education" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              Education
            </a>
            <a href="#skills" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              Skills
            </a>
            <a href="#projects" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              Projects
            </a>
            <a href="#certifications" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              Certifications
            </a>
            <a href="#honors" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              Honors
            </a>
            <a href="#contact" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              Contact
            </a>
          </nav>

          {/* Primary Action Button */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              download="Anthati_Ramya_Resume.pdf"
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap active:scale-95"
              title="Download Anthati Ramya Resume PDF"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={onOpenResume}
              className="hidden sm:flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
              title="Preview Resume PDF in browser"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>Preview</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 shadow-lg">
          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-700">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 transition-colors py-1.5"
            >
              About
            </a>
            <a
              href="#education"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 transition-colors py-1.5"
            >
              Education
            </a>
            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 transition-colors py-1.5"
            >
              Skills
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 transition-colors py-1.5"
            >
              Projects
            </a>
            <a
              href="#certifications"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 transition-colors py-1.5"
            >
              Certifications
            </a>
            <a
              href="#honors"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 transition-colors py-1.5"
            >
              Honors & Awards
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 transition-colors py-1.5"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
