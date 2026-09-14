import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUILD_PROOF_ITEMS } from '../data';
import { Code2, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Github } from 'lucide-react';

interface SectionBuildProofProps {
  isDark?: boolean;
  onEnrollClick: (trackId?: string) => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: [0.25, 1, 0.5, 1],
    },
  }),
};

export const SectionBuildProof: React.FC<SectionBuildProofProps> = ({
  isDark = true,
  onEnrollClick,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const duration = 5000; // 5 seconds per project

  // Auto-advance timer: only 1 timeout per slide (zero continuous re-renders!)
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setTimeout(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % BUILD_PROOF_ITEMS.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [isPlaying, isHovered, activeIndex]);

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? BUILD_PROOF_ITEMS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % BUILD_PROOF_ITEMS.length);
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
          {/* Top Progress Bar for auto-transition (Hardware accelerated pure CSS animation) */}
          <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden mb-6 sm:mb-8">
            <div
              key={activeIndex}
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-progress-fill"
              style={{
                animationDuration: `${duration}ms`,
                animationPlayState: isHovered ? 'paused' : 'running',
              }}
            />
          </div>

          {/* Card Controls & Counter Strip: Clean Project 01, Project 02 */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold whitespace-nowrap bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Project {String(activeIndex + 1).padStart(2, '0')}</span>
            </span>

            {/* Slider Next / Prev Controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                title="Previous project"
                aria-label="Previous project"
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer active:scale-90 hover:scale-105 ${
                  isDark ? 'border-white/15 text-white hover:bg-white/10' : 'border-slate-300 text-slate-800 hover:bg-slate-100 shadow-sm'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                title="Next project"
                aria-label="Next project"
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer active:scale-90 hover:scale-105 ${
                  isDark ? 'border-white/15 text-white hover:bg-white/10' : 'border-slate-300 text-slate-800 hover:bg-slate-100 shadow-sm'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Badges Strip */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className={`text-xs font-mono uppercase tracking-wider px-2.5 py-0.5 rounded border whitespace-nowrap ${
              isDark ? 'bg-white/5 border-white/10 text-neutral-300' : 'bg-slate-100 border-slate-200 text-slate-700 font-semibold'
            }`}>
              {currentItem.category}
            </span>
            <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border whitespace-nowrap ${
              isDark ? 'bg-emerald-400/10 border-emerald-400/20 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium'
            }`}>
              {currentItem.tag}
            </span>
          </div>

          {/* Active Project Content with Fluid Framer Motion & Swipe Support */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -40) handleNext();
                else if (info.offset.x > 40) handlePrev();
              }}
              className="touch-pan-y"
            >
              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4 ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}
              >
                {currentItem.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mb-6 sm:mb-8 ${
                  isDark ? 'text-neutral-300' : 'text-slate-700'
                }`}
              >
                {currentItem.description}
              </motion.p>

              {/* Dynamic Feature Highlight Boxes */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 pt-4 border-t border-black/5 dark:border-white/10 mb-6 sm:mb-8"
              >
                {/* Box 1: Deliverable & Outcome */}
                <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between ${
                  isDark ? 'bg-black/30 border-white/10' : 'bg-emerald-50/60 border-emerald-200'
                }`}>
                  <div>
                    <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-wider mb-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Verified Deliverable Proof</span>
                    </div>
                    <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                      isDark ? 'text-neutral-100' : 'text-slate-900'
                    }`}>
                      {currentItem.deliverable || "Ready to host, deploy, and showcase directly on your LinkedIn & GitHub profile."}
                    </p>
                  </div>
                  {currentItem.outcome && (
                    <p className={`text-[11px] sm:text-xs mt-3 pt-2.5 border-t border-dashed ${
                      isDark ? 'border-white/10 text-emerald-400' : 'border-emerald-200 text-emerald-700 font-medium'
                    }`}>
                      <span className="font-bold">Portfolio Impact:</span> {currentItem.outcome}
                    </p>
                  )}
                </div>

                {/* Box 2: Tools Stack */}
                <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between ${
                  isDark ? 'bg-black/30 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
                      <Github className="w-4 h-4 shrink-0" />
                      <span>Tools & Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 my-2">
                      {(currentItem.tools || ["AI Engine", "GitHub", "Prompt System"]).map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-[11px] sm:text-xs font-mono font-medium px-2.5 py-1 rounded-full border whitespace-nowrap transition-transform hover:scale-105 ${
                            isDark ? 'bg-white/10 border-white/15 text-white' : 'bg-white border-slate-300 text-slate-800 shadow-sm'
                          }`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className={`text-[11px] sm:text-xs mt-2 ${
                    isDark ? 'text-neutral-400' : 'text-slate-600 font-medium'
                  }`}>
                    Includes code templates, configuration scripts, and step-by-step mentor guidance.
                  </p>
                </div>
              </motion.div>

              {/* Card Action Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Included in Full 7-Day Course • Direct 1-on-1 Guidance</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => onEnrollClick('master-pass')}
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                    isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-slate-950 text-white hover:bg-slate-800'
                  }`}
                >
                  <span>Build This Project • Enroll for ₹89</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sleek Minimalist Project Indicator (Clean expanding dots, replacing bulky clunky button grid) */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {BUILD_PROOF_ITEMS.map((_, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'w-7 bg-emerald-400 shadow-md shadow-emerald-400/30 scale-105'
                    : isDark
                      ? 'w-2 bg-white/20 hover:bg-white/40'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
