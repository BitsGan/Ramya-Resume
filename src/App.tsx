import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EducationTimeline } from './components/EducationTimeline';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { HonorsSection } from './components/HonorsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600/10 selection:text-blue-900">
      {/* Modern Navigation Bar */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section with Profile Image */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* 3. Education Timeline */}
        <EducationTimeline />

        {/* 4. Technical Skills (No percentage bars) */}
        <SkillsSection />

        {/* 5. Projects / Open Source (3 projects from resume) */}
        <ProjectsSection />

        {/* 6. Certifications */}
        <CertificationsSection />

        {/* 7. Honors & Awards */}
        <HonorsSection />

        {/* 8. Contact Section ("Let's Connect") */}
        <ContactSection />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* Resume PDF Viewer & Downloader Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
