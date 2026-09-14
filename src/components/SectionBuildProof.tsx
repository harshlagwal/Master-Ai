import React, { useState, useEffect } from 'react';
import { BUILD_PROOF_ITEMS } from '../data';
import { Code2, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Github } from 'lucide-react';

interface SectionBuildProofProps {
  isDark?: boolean;
  onEnrollClick: (trackId?: string) => void;
}

export const SectionBuildProof: React.FC<SectionBuildProofProps> = ({
  isDark = true,
  onEnrollClick,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const duration = 5000; // 5 seconds per project
  const intervalStep = 50;

  // Auto-advance interval
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((current) => (current + 1) % BUILD_PROOF_ITEMS.length);
          return 0;
        }
        return prev + (intervalStep / duration) * 100;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, activeIndex]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? BUILD_PROOF_ITEMS.length - 1 : prev - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % BUILD_PROOF_ITEMS.length);
    setProgress(0);
  };

  const currentItem = BUILD_PROOF_ITEMS[activeIndex] || BUILD_PROOF_ITEMS[0];

  return (
    <section id="projects" className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-14 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
              <Code2 className="w-3.5 h-3.5" />
              <span>Concrete Portfolio Proof</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Don't Just Collect Tools. Build Proof.
            </h2>
            <p className={`mt-2 text-xs sm:text-sm max-w-xl ${isDark ? 'text-neutral-400' : 'text-slate-600 font-medium'}`}>
              Tangible deliverables you can showcase on LinkedIn, submit to hackathons, and present to clients & hiring managers.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onEnrollClick('master-pass')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer w-fit border ${
              isDark
                ? 'bg-white text-black hover:bg-neutral-200 border-white shadow-md'
                : 'bg-slate-950 text-white hover:bg-slate-800 border-slate-950 shadow-md'
            }`}
          >
            <span>Start Building • ₹89</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Big Featured Build Proof Card */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`rounded-3xl p-5 sm:p-10 md:p-12 border transition-all duration-300 relative overflow-hidden shadow-2xl ${
            isDark
              ? 'bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-white/15 text-white'
              : 'bg-white border-slate-200/90 text-slate-950 shadow-xl'
          }`}
        >
          {/* Top Progress Bar for auto-transition */}
          <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden mb-6 sm:mb-8">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-75 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Card Controls & Counter Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400">
                Project 0{activeIndex + 1} of 0{BUILD_PROOF_ITEMS.length}
              </span>
              <span className={`text-xs font-mono uppercase tracking-wider px-2.5 py-0.5 rounded border ${
                isDark ? 'bg-white/5 border-white/10 text-neutral-300' : 'bg-slate-100 border-slate-200 text-slate-700 font-semibold'
              }`}>
                {currentItem.category}
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${
                isDark ? 'bg-emerald-400/10 border-emerald-400/20 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium'
              }`}>
                {currentItem.tag}
              </span>
            </div>

            {/* Slider Next / Prev Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                title="Previous project"
                aria-label="Previous project"
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                  isDark ? 'border-white/15 text-white hover:bg-white/10 active:scale-95' : 'border-slate-300 text-slate-800 hover:bg-slate-100 active:scale-95 shadow-sm'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                title="Next project"
                aria-label="Next project"
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                  isDark ? 'border-white/15 text-white hover:bg-white/10 active:scale-95' : 'border-slate-300 text-slate-800 hover:bg-slate-100 active:scale-95 shadow-sm'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Project Content (Animated keyframe) */}
          <div key={currentItem.id || activeIndex} className="animate-fade-in-up">
            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              {currentItem.title}
            </h3>

            <p className={`text-sm sm:text-base leading-relaxed max-w-3xl mb-8 ${
              isDark ? 'text-neutral-300' : 'text-slate-700'
            }`}>
              {currentItem.description}
            </p>

            {/* Feature Highlight Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-black/5 dark:border-white/10 mb-8">
              <div className={`p-4 sm:p-5 rounded-2xl border ${
                isDark ? 'bg-black/30 border-white/10' : 'bg-emerald-50/60 border-emerald-200'
              }`}>
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Outcome Proof</span>
                </div>
                <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                  isDark ? 'text-neutral-100' : 'text-slate-900'
                }`}>
                  Ready to host, deploy, and showcase directly on your LinkedIn & GitHub profile.
                </p>
              </div>

              <div className={`p-4 sm:p-5 rounded-2xl border ${
                isDark ? 'bg-black/30 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
                  <Github className="w-4 h-4" />
                  <span>Production Ready</span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-neutral-300' : 'text-slate-700 font-medium'
                }`}>
                  Includes code templates, configuration scripts, and live step-by-step mentor guidance.
                </p>
              </div>
            </div>

            {/* Card Action Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500">
                <CheckCircle2 className="w-4 h-4" />
                <span>Included in Full 7-Day Course • Direct 1-on-1 Guidance</span>
              </div>

              <button
                type="button"
                onClick={() => onEnrollClick('master-pass')}
                className={`px-5 py-2.5 rounded-full font-bold text-xs shadow-md transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5 ${
                  isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-slate-950 text-white hover:bg-slate-800'
                }`}
              >
                <span>Reserve Seat to Build This • ₹89</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Clean Numeric Stepper (1, 2, 3... 6) */}
        <div className="mt-8 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {BUILD_PROOF_ITEMS.map((_, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full text-xs sm:text-sm font-mono font-bold transition-all duration-200 cursor-pointer flex items-center justify-center border ${
                  isSelected
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg scale-110 ring-2 ring-emerald-500/40'
                    : isDark
                      ? 'bg-white/5 hover:bg-white/15 text-neutral-300 border-white/10'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-sm'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

