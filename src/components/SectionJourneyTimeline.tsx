import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JOURNEY_DAYS } from '../data';
import { Calendar, Clock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface SectionJourneyTimelineProps {
  isDark?: boolean;
  onEnrollClick: (trackId?: string) => void;
}

export const SectionJourneyTimeline: React.FC<SectionJourneyTimelineProps> = ({
  isDark = true,
  onEnrollClick,
}) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const activeDay = JOURNEY_DAYS[activeDayIndex] || JOURNEY_DAYS[0];

  return (
    <section id="journey" className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-14 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header with Google Antigravity scroll entrance */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Day-by-Day Progression</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-normal sm:font-medium tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
              The 7-Day Action Roadmap
            </h2>
            <p className={`mt-2.5 text-sm sm:text-base leading-relaxed max-w-xl ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
              From absolute fundamentals to building autonomous multi-agent systems and real-world deployment.
            </p>
          </div>

          <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-neutral-400' : 'text-slate-600 font-medium'}`}>
            <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span>Daily 8:00 PM IST • Live Interactive Sessions</span>
          </div>
        </motion.div>

        {/* Day Selector Pills (Scrollable horizontally on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 custom-scrollbar">
          {JOURNEY_DAYS.map((day, idx) => {
            const isActive = activeDayIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveDayIndex(idx)}
                className={`relative px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer flex items-center gap-2 shrink-0 border ${
                  isActive
                    ? isDark
                      ? 'text-black border-transparent'
                      : 'text-white border-transparent'
                    : isDark
                      ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTimelineDayPill"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    className={`absolute inset-0 rounded-full shadow-md z-0 ${
                      isDark ? 'bg-white' : 'bg-slate-950'
                    }`}
                  />
                )}
                <span className="relative z-10 font-mono font-bold">{day.dayNumber}</span>
                <span className="relative z-10 opacity-60">•</span>
                <span className="relative z-10">{day.dayName}</span>
              </button>
            );
          })}
        </div>

        {/* Active Day Detail Card with Google Antigravity Crossfade Transition */}
        {activeDay && (
          <motion.div
            key={activeDayIndex}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`rounded-3xl p-5 sm:p-8 md:p-10 border transition-all duration-300 relative overflow-hidden ${
              isDark
                ? 'bg-[#0A0A0C]/80 border-white/[0.08] backdrop-blur-xl text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
                : 'bg-white border-slate-200/90 shadow-xl text-slate-900'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: Details & Deliverables */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-md bg-amber-400/10 text-amber-500 dark:text-amber-400 font-bold border border-amber-400/20 whitespace-nowrap">
                      {activeDay.dayNumber}
                    </span>
                    <span className={`whitespace-nowrap ${isDark ? 'text-neutral-400' : 'text-slate-500 font-medium'}`}>{activeDay.time}</span>
                    {activeDay.domainTag && (
                      <span className={`px-2 py-0.5 rounded border text-[11px] whitespace-nowrap ${isDark ? 'bg-white/5 text-neutral-300 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200 font-medium'}`}>
                        {activeDay.domainTag}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-3 sm:mb-4 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {activeDay.title}
                  </h3>

                  {/* Topics covered */}
                  {activeDay.topics && activeDay.topics.length > 0 && (
                    <div className="mb-6">
                      <h4 className={`text-xs font-mono uppercase tracking-wider mb-3 ${isDark ? 'text-neutral-400' : 'text-slate-600 font-bold'}`}>
                        Key Learnings & Hands-on Work:
                      </h4>
                      <ul className="space-y-2.5 list-none pl-0">
                        {activeDay.topics.map((topic, tIdx) => (
                          <li key={tIdx} className={`flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onEnrollClick('master-pass')}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer active:scale-95 ${
                      isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-slate-950 text-white hover:bg-slate-800'
                    }`}
                  >
                    <span>Reserve 7-Day Live Pass • ₹89</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onEnrollClick('demo-free')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <span>Book Free 30-Min Demo • ₹0</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Build Proof & Milestone Output */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div
                  className={`p-6 rounded-2xl border ${
                    isDark
                      ? 'bg-black/40 border-white/10'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Deliverable Build Proof</span>
                  </div>
                  <p className={`text-sm sm:text-base font-semibold leading-snug ${isDark ? 'text-neutral-100' : 'text-slate-950'}`}>
                    {(activeDay as any).handsOnProof || (activeDay as any).deliverable || "Live implementation project pushed to your verified GitHub portfolio."}
                  </p>
                  <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-600 font-medium'}`}>
                    By the end of this session, you will have completed and verified this exact deliverable with instructor guidance.
                  </p>
                </div>

                <div
                  className={`p-5 rounded-2xl border flex items-center justify-between text-xs ${
                    isDark
                      ? 'bg-white/[0.02] border-white/5 text-neutral-400'
                      : 'bg-white border-slate-200/60 text-slate-600'
                  }`}
                >
                  <span>Format: Google Meet Live</span>
                  <span className="font-mono text-emerald-400">Recordings Included</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
