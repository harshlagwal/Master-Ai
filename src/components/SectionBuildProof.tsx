import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUILD_PROOF_ITEMS } from '../data';
import { Code2, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Github } from 'lucide-react';

interface SectionBuildProofProps {
  isDark?: boolean;
  onEnrollClick: (trackId?: string) => void;
}

const googleSmoothCrossfade = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
        >
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-3 border ${
              isDark ? 'bg-white/[0.03] border-white/10 text-neutral-300' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
              <Code2 className="w-3.5 h-3.5 opacity-70" />
              <span>Concrete Portfolio Proof</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-normal sm:font-medium tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Don't Just Collect Tools. Build Proof.
            </h2>
            <p className={`mt-2.5 text-sm sm:text-base leading-relaxed max-w-xl ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
              Tangible deliverables you can showcase on LinkedIn, submit to hackathons, and present to clients & hiring managers.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onEnrollClick('master-pass')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer w-fit border ${
              isDark
                ? 'bg-white text-black hover:bg-neutral-200 border-white shadow-md'
                : 'bg-slate-950 text-white hover:bg-slate-800 border-slate-950 shadow-md'
            }`}
          >
            <span>Start Building • ₹89</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* Big Featured Build Proof Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`rounded-3xl p-5 sm:p-10 md:p-12 border transition-all duration-300 relative overflow-hidden ${
            isDark
              ? 'bg-[#0A0A0C]/85 border-white/[0.08] backdrop-blur-xl text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
              : 'bg-white border-slate-200/90 text-slate-950 shadow-xl'
          }`}
        >
          {/* Card Header Strip: Clean Google-style Counter and Subtle Navigation */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <span className={`px-3.5 py-1 rounded-full text-xs font-mono font-medium border ${
              isDark ? 'bg-white/[0.04] border-white/10 text-neutral-300' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
              Project {String(activeIndex + 1).padStart(2, '0')} / {String(BUILD_PROOF_ITEMS.length).padStart(2, '0')} • {currentItem.category}
            </span>

            {/* Slider Next / Prev Controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                title="Previous project"
                aria-label="Previous project"
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer active:scale-95 ${
                  isDark ? 'border-white/15 text-neutral-300 hover:text-white hover:bg-white/10' : 'border-slate-200 text-slate-700 hover:text-black hover:bg-slate-100'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                title="Next project"
                aria-label="Next project"
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer active:scale-95 ${
                  isDark ? 'border-white/15 text-neutral-300 hover:text-white hover:bg-white/10' : 'border-slate-200 text-slate-700 hover:text-black hover:bg-slate-100'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Project Content with Invisible Smooth Google Dissolve */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={googleSmoothCrossfade}
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
              <h3
                className={`text-2xl sm:text-3xl md:text-4xl font-normal sm:font-medium tracking-tight mb-3 sm:mb-4 ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}
              >
                {currentItem.title}
              </h3>

              <p
                className={`text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-3xl mb-6 sm:mb-8 font-normal ${
                  isDark ? 'text-neutral-300' : 'text-slate-700'
                }`}
              >
                {currentItem.description}
              </p>

              {/* Dynamic Feature Highlight Boxes */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 pt-4 border-t border-black/5 dark:border-white/10 mb-6 sm:mb-8"
              >
                {/* Box 1: Deliverable & Outcome */}
                <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between ${
                  isDark ? 'bg-white/[0.02] border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <div className={`flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-2 font-medium ${
                      isDark ? 'text-neutral-300' : 'text-slate-700'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5 opacity-80 shrink-0" />
                      <span>Verified Deliverable Proof</span>
                    </div>
                    <p className={`text-xs sm:text-sm font-normal leading-relaxed ${
                      isDark ? 'text-neutral-200' : 'text-slate-800'
                    }`}>
                      {currentItem.deliverable || "Ready to host, deploy, and showcase directly on your LinkedIn & GitHub profile."}
                    </p>
                  </div>
                  {currentItem.outcome && (
                    <p className={`text-[11px] sm:text-xs mt-3 pt-2.5 border-t border-dashed ${
                      isDark ? 'border-white/10 text-neutral-400' : 'border-slate-200 text-slate-600 font-normal'
                    }`}>
                      <span className="font-semibold">Portfolio Impact:</span> {currentItem.outcome}
                    </p>
                  )}
                </div>

                {/* Box 2: Tools Stack */}
                <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between ${
                  isDark ? 'bg-white/[0.02] border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <div className={`flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-2 font-medium ${
                      isDark ? 'text-neutral-300' : 'text-slate-700'
                    }`}>
                      <Github className="w-3.5 h-3.5 opacity-80 shrink-0" />
                      <span>Tools & Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 my-2">
                      {(currentItem.tools || ["AI Engine", "GitHub", "Prompt System"]).map((tool, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-[11px] sm:text-xs font-mono font-medium px-2.5 py-1 rounded-full border whitespace-nowrap transition-transform hover:scale-105 ${
                            isDark ? 'bg-white/[0.05] border-white/10 text-neutral-200' : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                          }`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className={`text-[11px] sm:text-xs mt-2 ${
                    isDark ? 'text-neutral-400' : 'text-slate-600 font-normal'
                  }`}>
                    Includes code templates, configuration scripts, and step-by-step mentor guidance.
                  </p>
                </div>
              </div>

              {/* Card Action Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className={`flex items-center gap-2 text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 opacity-80 shrink-0" />
                  <span>Included in Full 7-Day Course • Direct 1-on-1 Guidance</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => onEnrollClick('master-pass')}
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-full font-medium text-xs sm:text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                    isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-slate-950 text-white hover:bg-slate-800'
                  }`}
                >
                  <span>Build This Project • Enroll for ₹89</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Sleek Minimalist Project Indicator (Clean Google dots, no garish green line) */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {BUILD_PROOF_ITEMS.map((_, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className="relative h-2 rounded-full cursor-pointer flex items-center justify-center p-1"
              >
                {isSelected ? (
                  <motion.div
                    layoutId="activeBuildProofDot"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    className={`h-1.5 w-6 rounded-full ${isDark ? 'bg-white' : 'bg-slate-900'}`}
                  />
                ) : (
                  <div
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                      isDark ? 'bg-white/25 hover:bg-white/50' : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
