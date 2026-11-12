import React, { useState } from 'react';
import { Project } from '../types/portfolio';
import { X, Play, RefreshCw, Trophy, Zap, Smartphone, Globe, Github, CheckCircle2, Laptop, Tablet } from 'lucide-react';

interface ProjectSimulatorModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectSimulatorModal: React.FC<ProjectSimulatorModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // Math Matrix state
  const [mathScore, setMathScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentProblem, setCurrentProblem] = useState({ q: '14 × 6 - 18 = ?', answer: 66, options: [66, 72, 64, 86] });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [leaderboard] = useState([
    { rank: 1, name: 'Ramya (Dev)', score: 1420 },
    { rank: 2, name: 'Ananya S.', score: 1150 },
    { rank: 3, name: 'Rahul K.', score: 980 },
  ]);

  // BITS Website state
  const [bitsView, setBitsView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [bitsTab, setBitsTab] = useState<'home' | 'cse' | 'notices'>('home');

  // Gesture AI state
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'technology' | 'sports' | 'tollywood' | 'business'>('all');
  const [activeGesture, setActiveGesture] = useState<string>('Index Pointing');
  const [virtualCursorPos, setVirtualCursorPos] = useState({ x: 50, y: 50 });

  // Math Matrix generation
  const generateNewProblem = () => {
    const operations = ['+', '-', '×'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    let a = Math.floor(Math.random() * 20) + 5;
    let b = Math.floor(Math.random() * 12) + 2;
    let ans = 0;

    if (op === '+') ans = a + b;
    else if (op === '-') {
      if (a < b) [a, b] = [b, a];
      ans = a - b;
    } else {
      a = Math.floor(Math.random() * 12) + 2;
      b = Math.floor(Math.random() * 9) + 2;
      ans = a * b;
    }

    const wrong1 = ans + (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
    const wrong2 = ans + (Math.floor(Math.random() * 8) + 6) * (Math.random() > 0.5 ? 1 : -1);
    const wrong3 = ans + 10;
    const opts = Array.from(new Set([ans, wrong1, wrong2, wrong3])).slice(0, 4);
    while (opts.length < 4) opts.push(ans + opts.length * 3);
    opts.sort(() => Math.random() - 0.5);

    setCurrentProblem({
      q: `${a} ${op} ${b} = ?`,
      answer: ans,
      options: opts
    });
    setFeedback(null);
  };

  const handleMathAnswer = (choice: number) => {
    if (choice === currentProblem.answer) {
      setFeedback('Correct! +100 PTS');
      setMathScore((prev) => prev + 100);
      setStreak((prev) => prev + 1);
      setTimeout(() => {
        generateNewProblem();
      }, 500);
    } else {
      setFeedback('Incorrect! Streak Reset');
      setStreak(0);
      setTimeout(() => {
        generateNewProblem();
      }, 600);
    }
  };

  const handleSimulateGesture = (gestureName: string) => {
    setActiveGesture(gestureName);
    if (gestureName === 'Pinch Click') {
      setVirtualCursorPos({ x: 45, y: 35 });
    } else if (gestureName === 'Palm Scroll') {
      setVirtualCursorPos({ x: 60, y: 70 });
    } else {
      setVirtualCursorPos({ x: 50, y: 50 });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-850 bg-zinc-950/95 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Play className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight font-display">{project.title}</h3>
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                <span className="text-emerald-400 font-semibold">Live Interactive Simulator</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>{project.period}</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>{project.technologies.join(', ')}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
            title="Close Simulator (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* SIMULATOR 1: MATH MATRIX (FLUTTER APP) */}
          {project.demoType === 'math-matrix' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Flutter App Phone Frame */}
              <div className="lg:col-span-7 flex justify-center">
                <div className="w-[320px] sm:w-[340px] bg-black border-4 border-zinc-800 rounded-[36px] p-3 shadow-2xl relative">
                  {/* Phone Speaker Notch */}
                  <div className="w-24 h-4 bg-zinc-850 rounded-full mx-auto mb-2" />

                  {/* Flutter App Screen */}
                  <div className="bg-gradient-to-b from-zinc-950 to-black rounded-[24px] p-4 border border-zinc-800 text-zinc-100 min-h-[460px] flex flex-col justify-between">
                    {/* Top App Bar */}
                    <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-400 font-mono tracking-wider">MATH MATRIX</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-amber-400 flex items-center gap-1 font-semibold">
                          <Trophy className="w-3.5 h-3.5" />
                          {mathScore}
                        </span>
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5" />
                          {streak}x
                        </span>
                      </div>
                    </div>

                    {/* Question Card */}
                    <div className="my-auto py-6 text-center">
                      <div className="text-xs text-zinc-400 uppercase tracking-widest font-mono mb-2">Solve Matrix Problem</div>
                      <div className="text-3xl font-extrabold text-white tracking-wider font-mono bg-zinc-900/90 py-4 px-6 rounded-xl border border-emerald-500/30 shadow-inner">
                        {currentProblem.q}
                      </div>

                      {feedback && (
                        <div className={`mt-3 text-xs font-semibold ${feedback.includes('Correct') ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {feedback}
                        </div>
                      )}

                      {/* Options Grid */}
                      <div className="grid grid-cols-2 gap-3 mt-6">
                        {currentProblem.options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleMathAnswer(option)}
                            className="py-3 px-4 bg-zinc-900 hover:bg-emerald-500 hover:text-black text-white font-mono font-bold text-base rounded-xl border border-zinc-800 hover:border-emerald-400 transition-all cursor-pointer shadow-md active:scale-95"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Status & Firebase Sync indicator */}
                    <div className="pt-3 border-t border-zinc-850 text-[11px] text-zinc-400 flex items-center justify-between font-mono">
                      <span>Firebase Realtime: Synced</span>
                      <button
                        onClick={generateNewProblem}
                        className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" /> Skip
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Architecture & Engineering Insights */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 bg-black rounded-xl border border-zinc-850">
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2 font-display">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Flutter & Firebase Architecture
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    Designed with Flutter & Dart for cross-platform performance. Features stateful reactive widgets, smooth custom animation controllers, and a Firebase Realtime Database backend for live score persistence.
                  </p>
                </div>

                <div className="p-4 bg-black rounded-xl border border-zinc-850">
                  <div className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 font-mono">
                    Simulated Firebase Leaderboard
                  </div>
                  <div className="space-y-2">
                    {leaderboard.map((item) => (
                      <div key={item.rank} className="flex items-center justify-between text-xs p-2 rounded bg-zinc-900/80 border border-zinc-800">
                        <span className="text-zinc-300 font-medium">#{item.rank} {item.name}</span>
                        <span className="font-mono text-amber-400 font-semibold">{item.score} pts</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between text-xs p-2 rounded bg-emerald-950/30 border border-emerald-800/80 text-emerald-200">
                      <span>Your Live Score</span>
                      <span className="font-mono font-bold text-emerald-400">{mathScore} pts</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-black rounded-xl border border-zinc-850 text-xs text-zinc-300 space-y-1.5 font-mono">
                  <div className="font-semibold text-white">Engineering Highlights:</div>
                  <div className="flex items-center gap-2"><span>·</span> Timed cognitive arithmetic matrix</div>
                  <div className="flex items-center gap-2"><span>·</span> Memory retention pattern recognition</div>
                  <div className="flex items-center gap-2"><span>·</span> Gradle compilation for Android Studio</div>
                </div>
              </div>
            </div>
          )}

          {/* SIMULATOR 2: BITS COLLEGE WEBSITE */}
          {project.demoType === 'bits-website' && (
            <div className="space-y-4">
              {/* Responsive Device Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-black rounded-xl border border-zinc-850">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span>Viewport Simulator:</span>
                  <div className="flex items-center gap-1 p-0.5 bg-zinc-950 rounded-lg border border-zinc-800">
                    <button
                      onClick={() => setBitsView('desktop')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-colors cursor-pointer font-bold ${
                        bitsView === 'desktop' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Laptop className="w-3.5 h-3.5" /> Desktop
                    </button>
                    <button
                      onClick={() => setBitsView('tablet')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-colors cursor-pointer font-bold ${
                        bitsView === 'tablet' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Tablet className="w-3.5 h-3.5" /> Tablet
                    </button>
                    <button
                      onClick={() => setBitsView('mobile')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-colors cursor-pointer font-bold ${
                        bitsView === 'mobile' ? 'bg-emerald-500 text-black' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" /> Mobile
                    </button>
                  </div>
                </div>

                <div className="text-xs text-zinc-400 font-mono">
                  Framework: HTML5 · CSS3 · Responsive Media Queries
                </div>
              </div>

              {/* Simulated Browser Viewport */}
              <div className="flex justify-center bg-black p-4 rounded-2xl border border-zinc-850">
                <div
                  className={`bg-white text-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-zinc-300 transition-all duration-300 ${
                    bitsView === 'desktop'
                      ? 'w-full'
                      : bitsView === 'tablet'
                      ? 'w-[680px]'
                      : 'w-[360px]'
                  }`}
                >
                  {/* Browser Address Bar */}
                  <div className="bg-zinc-100 px-4 py-2 border-b border-zinc-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="px-3 py-0.5 bg-white rounded border border-zinc-200 text-zinc-600 font-mono text-[11px] truncate max-w-[280px]">
                      https://bits-narsampet.ac.in/portal
                    </div>
                    <Globe className="w-3.5 h-3.5 text-zinc-400" />
                  </div>

                  {/* College Header */}
                  <div className="bg-zinc-950 text-white p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h2 className="text-base font-bold tracking-tight font-display">Balaji Institute of Technology and Science</h2>
                        <div className="text-xs text-zinc-400">Narsampet, Warangal · Accredited Engineering Institution</div>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <button
                          onClick={() => setBitsTab('home')}
                          className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${bitsTab === 'home' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-300 hover:text-white'}`}
                        >
                          Home
                        </button>
                        <button
                          onClick={() => setBitsTab('cse')}
                          className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${bitsTab === 'cse' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-300 hover:text-white'}`}
                        >
                          CSE Dept
                        </button>
                        <button
                          onClick={() => setBitsTab('notices')}
                          className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${bitsTab === 'notices' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-300 hover:text-white'}`}
                        >
                          Notices
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* College Website Body */}
                  <div className="p-5 space-y-4 min-h-[300px]">
                    {bitsTab === 'home' && (
                      <div className="space-y-4">
                        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
                          <h3 className="text-sm font-bold text-emerald-950">Empowering Technical Innovation in Warangal</h3>
                          <p className="text-xs text-emerald-900/80 mt-1">
                            Welcome to the student-engineered official portal for Balaji Institute of Technology and Science. Built with modern HTML5 semantics, multi-level CSS stylesheet cascades, and validated responsiveness.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded">
                            <span className="font-semibold text-zinc-900 block">Academics</span>
                            <span className="text-zinc-600 text-[11px]">Undergraduate B.Tech & Diploma programs</span>
                          </div>
                          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded">
                            <span className="font-semibold text-zinc-900 block">Placements</span>
                            <span className="text-zinc-600 text-[11px]">Top MNC recruiters & virtual internships</span>
                          </div>
                          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded">
                            <span className="font-semibold text-zinc-900 block">Research & Labs</span>
                            <span className="text-zinc-600 text-[11px]">Cisco networking & software labs</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {bitsTab === 'cse' && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-bold text-zinc-900 font-display">Department of Computer Science and Engineering</h3>
                        <p className="text-xs text-zinc-600">
                          Focusing on Java enterprise programming, Flutter mobile engineering, algorithm design, and cloud architecture.
                        </p>
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900">
                          <strong>Current Student Spotlight:</strong> Anthati Ramya (B.Tech CSE, CGPA 8.79) - Full Stack Java Developer.
                        </div>
                      </div>
                    )}

                    {bitsTab === 'notices' && (
                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded flex justify-between items-center">
                          <span className="text-zinc-800 font-medium">B.Tech Semester Examinations Schedule</span>
                          <span className="text-zinc-500 font-mono text-[11px]">Updated</span>
                        </div>
                        <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded flex justify-between items-center">
                          <span className="text-zinc-800 font-medium">Hackathon Febgenesis Round 2 Qualifiers</span>
                          <span className="text-zinc-500 font-mono text-[11px]">Honors</span>
                        </div>
                        <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded flex justify-between items-center">
                          <span className="text-zinc-800 font-medium">Cisco NetAcad Networking & Scripting Workshop</span>
                          <span className="text-zinc-500 font-mono text-[11px]">Event</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SIMULATOR 3: GESTURE AI & DYNAMIC NEWS PORTAL */}
          {project.demoType === 'gesture-ai' && (
            <div className="space-y-6">
              {/* Virtual Gesture Recognition HUD */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6 p-4 bg-black rounded-xl border border-zinc-850 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white flex items-center gap-1.5 font-display">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Computer Vision Tracking Feed
                    </span>
                    <span className="font-mono text-emerald-400 text-[11px]">Python & OpenCV</span>
                  </div>

                  {/* Interactive Virtual Gesture Pad */}
                  <div className="relative w-full h-44 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-center overflow-hidden">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 mx-auto rounded-full border-2 border-dashed border-emerald-400 flex items-center justify-center">
                        <span className="text-xs font-mono text-emerald-300">✋</span>
                      </div>
                      <div className="text-xs font-mono text-zinc-300">
                        Active Gesture: <span className="text-emerald-400 font-bold">{activeGesture}</span>
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500">
                        Landmarks: 21 points tracked (x: {virtualCursorPos.x}, y: {virtualCursorPos.y})
                      </div>
                    </div>

                    {/* Simulated Tracking Cursor */}
                    <div
                      className="absolute w-4 h-4 rounded-full bg-emerald-400 border border-white shadow-lg shadow-emerald-400/50 pointer-events-none transition-all duration-300"
                      style={{ left: `${virtualCursorPos.x}%`, top: `${virtualCursorPos.y}%` }}
                    />
                  </div>

                  {/* Simulate Gestures buttons */}
                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                    <button
                      onClick={() => handleSimulateGesture('Index Pointing')}
                      className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer font-bold ${activeGesture === 'Index Pointing' ? 'bg-emerald-500 text-black' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'}`}
                    >
                      Point & Move
                    </button>
                    <button
                      onClick={() => handleSimulateGesture('Pinch Click')}
                      className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer font-bold ${activeGesture === 'Pinch Click' ? 'bg-emerald-500 text-black' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'}`}
                    >
                      Pinch (Click)
                    </button>
                    <button
                      onClick={() => handleSimulateGesture('Palm Scroll')}
                      className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer font-bold ${activeGesture === 'Palm Scroll' ? 'bg-emerald-500 text-black' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'}`}
                    >
                      Open Palm (Scroll)
                    </button>
                  </div>
                </div>

                {/* News Channel Category Navigator */}
                <div className="md:col-span-6 p-4 bg-black rounded-xl border border-zinc-850 space-y-3">
                  <div className="text-xs font-semibold text-white font-display">Dynamic News Categories (From Resume):</div>
                  <div className="flex flex-wrap gap-1.5 font-mono">
                    {['all', 'technology', 'sports', 'tollywood', 'business'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat as any)}
                        className={`px-3 py-1 rounded text-xs capitalize transition-colors cursor-pointer font-bold ${
                          selectedCategory === cat ? 'bg-emerald-500 text-black shadow-sm' : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Filtered News Cards */}
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {[
                      { cat: 'technology', title: 'Generative AI & Computer Vision Transforms Gesture Interfaces', time: '2h ago' },
                      { cat: 'tollywood', title: 'Indian Cinema Box Office: Telugu Blockbusters Set Global Records', time: '4h ago' },
                      { cat: 'sports', title: 'National Cricket & Badminton Tournaments: Semifinal Updates', time: '5h ago' },
                      { cat: 'business', title: 'Tech Startups in Hyderabad & Bengaluru Expand Cloud Infrastructure', time: '7h ago' },
                    ]
                      .filter((n) => selectedCategory === 'all' || n.cat === selectedCategory)
                      .map((news, idx) => (
                        <div key={idx} className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-xs">
                          <div className="text-zinc-200 font-medium">{news.title}</div>
                          <div className="text-[11px] text-zinc-500 mt-1 flex items-center gap-2 font-mono">
                            <span className="capitalize text-emerald-400">{news.cat}</span>
                            <span>·</span>
                            <span>{news.time}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Project Details Footer */}
          <div className="pt-4 border-t border-zinc-850 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4" />
                View Source on GitHub
              </a>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-black border border-zinc-800 rounded-lg transition-colors cursor-pointer"
            >
              Done Testing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
