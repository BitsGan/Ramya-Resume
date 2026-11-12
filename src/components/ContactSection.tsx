import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Check, Copy } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSent(true);
    const mailto = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.open(mailto, '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            Communication Channels
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
            Let's Connect
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Interested in collaborating, discussing projects, or exploring opportunities? Feel free to connect with me.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info & Verified Social Links */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Channels Card */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Direct Contact
              </h3>

              {/* Email */}
              <div className="flex items-start justify-between gap-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-white border border-slate-200 text-blue-600">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-xs text-slate-500 block">Email Address</span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="font-medium text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200 transition-colors cursor-pointer"
                  title="Copy email"
                >
                  {copiedKey === 'email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-start justify-between gap-3 text-sm pt-2 border-t border-slate-200/80">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-white border border-slate-200 text-blue-600">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-xs text-slate-500 block">Phone Number</span>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="font-medium text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200 transition-colors cursor-pointer"
                  title="Copy phone"
                >
                  {copiedKey === 'phone' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 text-sm pt-2 border-t border-slate-200/80">
                <span className="p-2 rounded-lg bg-white border border-slate-200 text-blue-600">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-xs text-slate-500 block">Location</span>
                  <span className="font-medium text-slate-800">
                    {PERSONAL_INFO.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Profile Links */}
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Social Profiles
              </h3>

              <div className="space-y-2">
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-400 transition-colors text-sm font-medium text-slate-800 hover:text-blue-600 group"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-slate-700 group-hover:text-blue-600" />
                    <span>GitHub Profile</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">github.com/bitsramya</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-400 transition-colors text-sm font-medium text-slate-800 hover:text-blue-600 group"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    <span>LinkedIn Profile</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">in/anthati-ramya</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Send a Message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill out the form below to initiate an email conversation directly.
            </p>

            {isSent ? (
              <div className="p-6 rounded-lg bg-blue-50 border border-blue-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Message Draft Generated</h4>
                <p className="text-xs text-slate-600">
                  Your message has been opened in your default email client addressed to {PERSONAL_INFO.email}.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-3 px-3.5 py-1.5 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Project Inquiry / Job Opportunity"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
