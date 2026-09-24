import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WORKSHOP_TOPICS } from '../data';
import { Sparkles, CheckCircle2, ArrowRight, ChevronLeft, ChevronRight, Cpu } from 'lucide-react';

interface SectionCurriculumGridProps {
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

export const SectionCurriculumGrid: React.FC<SectionCurriculumGridProps> = ({
  isDark = true,
  onEnrollClick,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const duration = 5000; // 5 seconds per skill

  // Auto-advance timer: only 1 timeout per slide (zero continuous re-renders!)
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setTimeout(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % WORKSHOP_TOPICS.length);
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
    setActiveIndex((prev) => (prev === 0 ? WORKSHOP_TOPICS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % WORKSHOP_TOPICS.length);
  };

  const currentTopic = WORKSHOP_TOPICS[activeIndex] || WORKSHOP_TOPICS[0];

  return (
    <section id="curriculum" className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-14 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Google Antigravity scroll entrance */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
        >
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-3 border ${
              isDark ? 'bg-white/[0.03] border-white/10 text-neutral-300' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
              <Sparkles className="w-3.5 h-3.5 opacity-70" />
              <span>Structured 7-Day Curriculum</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-normal sm:font-medium tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              The 9 High-Income AI Skills
            </h2>
            <p className={`mt-2.5 text-sm sm:text-base leading-relaxed max-w-xl ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
              Hands-on implementation, tool workflows, and a concrete verifiable build proof for every single skill.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onEnrollClick('week-pass-299')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer w-fit border ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                  : 'bg-white hover:bg-slate-100 text-slate-900 border-slate-300 shadow-sm'
              }`}
            >
              <span>Claim 1-Week Pass • ₹299</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Big Featured Skill Showcase Card */}
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
              Skill {String(activeIndex + 1).padStart(2, '0')} / {String(WORKSHOP_TOPICS.length).padStart(2, '0')} • {currentTopic.category}
            </span>

            {/* Slider Next / Prev Controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                title="Previous skill"
                aria-label="Previous skill"
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer active:scale-95 ${
                  isDark ? 'border-white/15 text-neutral-300 hover:text-white hover:bg-white/10' : 'border-slate-200 text-slate-700 hover:text-black hover:bg-slate-100'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                title="Next skill"
                aria-label="Next skill"
                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer active:scale-95 ${
                  isDark ? 'border-white/15 text-neutral-300 hover:text-white hover:bg-white/10' : 'border-slate-200 text-slate-700 hover:text-black hover:bg-slate-100'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Skill Content with Invisible Smooth Google Dissolve */}
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
                {currentTopic.title}
              </h3>

              <p
                className={`text-sm sm:text-base lg:text-[17px] leading-relaxed max-w-3xl mb-6 sm:mb-8 font-normal ${
                  isDark ? 'text-neutral-300' : 'text-slate-700'
                }`}
              >
                {currentTopic.description}
              </p>

              {/* Two Column Deliverable & Tools Box */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 pt-4 border-t border-black/5 dark:border-white/10 mb-6 sm:mb-8"
              >
                {/* Deliverable Proof */}
                <div className={`p-4 sm:p-5 rounded-2xl border ${
                  isDark ? 'bg-white/[0.02] border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={`flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-2 font-medium ${
                    isDark ? 'text-neutral-300' : 'text-slate-700'
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5 opacity-80 shrink-0" />
                    <span>Tangible Deliverable Proof</span>
                  </div>
                  <p className={`text-xs sm:text-sm font-normal leading-relaxed ${
                    isDark ? 'text-neutral-200' : 'text-slate-800'
                  }`}>
                    {currentTopic.deliverable}
                  </p>
                </div>

                {/* Tools Stack */}
                <div className={`p-4 sm:p-5 rounded-2xl border ${
                  isDark ? 'bg-white/[0.02] border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className={`flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-2 font-medium ${
                    isDark ? 'text-neutral-300' : 'text-slate-700'
                  }`}>
                    <Cpu className="w-3.5 h-3.5 opacity-80 shrink-0" />
                    <span>Tools & Frameworks Taught</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentTopic.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-xs font-mono font-medium px-2.5 sm:px-3 py-1 rounded-full border whitespace-nowrap transition-transform hover:scale-105 ${
                          isDark ? 'bg-white/[0.05] border-white/10 text-neutral-200' : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                        }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Action in Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  <span>Included in all passes • Live interactive build demo</span>
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
                  <span>Master All 9 Skills • Enroll for ₹89</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Sleek Minimalist Skill Indicator with Google Antigravity Spring Morph */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {WORKSHOP_TOPICS.map((_, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                aria-label={`Go to skill ${idx + 1}`}
                className="relative p-1 cursor-pointer flex items-center justify-center"
              >
                {isSelected ? (
                  <motion.div
                    layoutId="activeCurriculumDot"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    className={`h-1.5 w-6 rounded-full ${
                      isDark ? 'bg-white' : 'bg-slate-900'
                    }`}
                  />
                ) : (
                  <div
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      isDark
                        ? 'bg-white/20 hover:bg-white/40'
                        : 'bg-slate-300 hover:bg-slate-400'
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
