import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WORKSHOP_TOPICS } from '../data';
import { Sparkles, CheckCircle2, ArrowRight, ChevronLeft, ChevronRight, Cpu } from 'lucide-react';

interface SectionCurriculumGridProps {
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
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-500 dark:text-amber-400 text-xs font-mono uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Structured 7-Day Curriculum</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              The 9 High-Income AI Skills
            </h2>
            <p className={`mt-2 text-xs sm:text-sm max-w-xl ${isDark ? 'text-neutral-400' : 'text-slate-600 font-medium'}`}>
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
        </div>

        {/* Big Featured Skill Showcase Card */}
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
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-progress-fill"
              style={{
                animationDuration: `${duration}ms`,
                animationPlayState: isHovered ? 'paused' : 'running',
              }}
            />
          </div>

          {/* Card Controls & Counter Strip: Simple "Skill 01", "Skill 02" without clunky popup text */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold whitespace-nowrap bg-amber-400/15 border border-amber-400/30 text-amber-500 dark:text-amber-400 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span>Skill {String(activeIndex + 1).padStart(2, '0')}</span>
            </span>

            {/* Slider Next / Prev Controls */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                title="Previous skill"
                aria-label="Previous skill"
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer active:scale-90 hover:scale-105 ${
                  isDark ? 'border-white/15 text-white hover:bg-white/10' : 'border-slate-300 text-slate-800 hover:bg-slate-100 shadow-sm'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                title="Next skill"
                aria-label="Next skill"
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
              {currentTopic.category}
            </span>
          </div>

          {/* Active Skill Content with Fluid Framer Motion & Swipe Support */}
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
                {currentTopic.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mb-6 sm:mb-8 ${
                  isDark ? 'text-neutral-300' : 'text-slate-700'
                }`}
              >
                {currentTopic.description}
              </motion.p>

              {/* Two Column Deliverable & Tools Box */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 pt-4 border-t border-black/5 dark:border-white/10 mb-6 sm:mb-8"
              >
                {/* Deliverable Proof */}
                <div className={`p-4 sm:p-5 rounded-2xl border ${
                  isDark ? 'bg-black/30 border-white/10' : 'bg-emerald-50/60 border-emerald-200'
                }`}>
                  <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Tangible Deliverable Proof</span>
                  </div>
                  <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                    isDark ? 'text-neutral-100' : 'text-slate-900'
                  }`}>
                    {currentTopic.deliverable}
                  </p>
                </div>

                {/* Tools Stack */}
                <div className={`p-4 sm:p-5 rounded-2xl border ${
                  isDark ? 'bg-black/30 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                    <Cpu className="w-4 h-4 shrink-0" />
                    <span>Tools & Frameworks Taught</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentTopic.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-xs font-mono font-medium px-2.5 sm:px-3 py-1 rounded-full border whitespace-nowrap transition-transform hover:scale-105 ${
                          isDark ? 'bg-white/10 border-white/15 text-white' : 'bg-white border-slate-300 text-slate-800 shadow-sm'
                        }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

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
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                    isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-slate-950 text-white hover:bg-slate-800'
                  }`}
                >
                  <span>Master All 9 Skills • Enroll for ₹89</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sleek Minimalist Skill Indicator (Clean expanding dots, replacing bulky clunky button grid) */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {WORKSHOP_TOPICS.map((_, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                aria-label={`Go to skill ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'w-7 bg-amber-400 shadow-md shadow-amber-400/30 scale-105'
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
