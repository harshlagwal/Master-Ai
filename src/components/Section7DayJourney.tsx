import React, { useState } from 'react';
import { JOURNEY_DAYS } from '../data';
import { ChevronLeft, ChevronRight, ListOrdered, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Section7DayJourney: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'interactive' | 'all'>('interactive');
  const [activeHoverDay, setActiveHoverDay] = useState<string | null>(null);

  const currentDay = JOURNEY_DAYS[selectedDayIndex];

  const handlePrev = () => {
    setSelectedDayIndex((prev) => (prev > 0 ? prev - 1 : JOURNEY_DAYS.length - 1));
  };

  const handleNext = () => {
    setSelectedDayIndex((prev) => (prev < JOURNEY_DAYS.length - 1 ? prev + 1 : 0));
  };

  const renderDayContent = (day: typeof JOURNEY_DAYS[0], isHovered = false) => (
    <>
      {/* Chapter Meta */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono tracking-widest text-white/40 uppercase mb-3">
        <span className="text-white/90 font-bold">{day.dayNumber}</span>
        <span>—</span>
        <span>{day.dayName}</span>
        <span>—</span>
        <span className="text-white/70">{day.time}</span>
      </div>

      {/* Domain / Field Target Badge */}
      {day.domainTag && (
        <div className="mb-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-mono text-white/90 tracking-wider uppercase">
            {day.domainTag}
          </span>
        </div>
      )}

      {/* Chapter Title */}
      <h3
        className="text-[24px] sm:text-[32px] md:text-[38px] font-medium tracking-tight text-white mb-6 leading-tight"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {day.title}
      </h3>

      {/* Standard Topics */}
      {day.topics && day.topics.length > 0 && (
        <div className="max-w-3xl mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-3">
            Core Focus & Topics
          </div>
          <ul className="space-y-2.5 text-[15px] sm:text-[16px] text-white/80 leading-relaxed list-none pl-0">
            {day.topics.map((topic, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-white/40 text-xs mt-1 select-none">✦</span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tools Mentioned */}
      {day.tools && day.tools.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-mono text-white/40 uppercase mr-1">
            Tools:
          </span>
          {day.tools.map((tool, idx) => (
            <span
              key={idx}
              className="text-[12px] sm:text-[13px] px-3 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/85"
            >
              {tool}
            </span>
          ))}
        </div>
      )}

      {/* Day 05 Big Statement Callout */}
      {day.callout && (
        <div className="my-6 p-5 sm:p-6 rounded-xl border border-white/20 bg-white/5 max-w-3xl">
          <p
            className="text-[17px] sm:text-[20px] font-medium tracking-tight text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {day.callout}
          </p>
          {day.disclaimer && (
            <p className="mt-2 text-xs sm:text-[13px] text-white/60 leading-relaxed">
              {day.disclaimer}
            </p>
          )}
        </div>
      )}

      {/* Day 06 Multi-Part Layout */}
      {day.parts && (
        <div className="space-y-5 max-w-4xl mb-6">
          {day.parts.map((part, pIdx) => (
            <div
              key={pIdx}
              className="p-5 sm:p-7 rounded-xl border border-white/15 bg-white/[0.03]"
            >
              <h4
                className="text-[18px] sm:text-[21px] font-medium text-white mb-2 tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {part.partTitle}
              </h4>
              {part.description && (
                <p className="text-[13px] sm:text-[14px] text-white/70 mb-3 leading-relaxed">
                  {part.description}
                </p>
              )}
              <ul className="space-y-2 mb-4">
                {part.points.map((pt, ptIdx) => (
                  <li
                    key={ptIdx}
                    className="text-[13px] sm:text-[15px] text-white/85 flex items-start gap-2.5 leading-relaxed"
                  >
                    <span className="text-white/40 text-xs mt-1 select-none">✦</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              {part.importantNote && (
                <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-xs sm:text-[13px] text-amber-200/90 leading-relaxed">
                  {part.importantNote}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Day 07 Career Roadmap Visual Chain */}
      {day.roadmap && (
        <div className="my-6 max-w-4xl p-5 sm:p-7 rounded-xl border border-white/15 bg-white/[0.04]">
          <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-3">
            The 8-Stage Execution Blueprint
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px] font-medium tracking-wide">
            {day.roadmap.map((step, sIdx) => (
              <React.Fragment key={sIdx}>
                <span className="px-2.5 py-1 rounded-md bg-white/10 text-white border border-white/15">
                  {step}
                </span>
                {sIdx < day.roadmap!.length - 1 && (
                  <span className="text-white/30">&rarr;</span>
                )}
              </React.Fragment>
            ))}
          </div>
          {day.finalStatement && (
            <p
              className="mt-5 text-[16px] sm:text-[19px] font-medium text-white/90 italic tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              &ldquo;{day.finalStatement}&rdquo;
            </p>
          )}
        </div>
      )}

      {/* Outcome Pill */}
      <div className="pt-4 border-t border-white/10 max-w-3xl flex items-baseline gap-2">
        <span className="text-xs font-mono uppercase tracking-wider text-white/40 shrink-0">
          Day Outcome:
        </span>
        <span className="text-[14px] sm:text-[15px] text-white/90 leading-relaxed font-normal">
          {day.outcome}
        </span>
      </div>
    </>
  );

  return (
    <section
      id="journey"
      className="relative z-10 w-full py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#0A0A0A] text-white border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="text-[12px] font-mono tracking-widest text-white/40 uppercase mb-4">
              02 // THE ROADMAP
            </div>
            <h2
              className="text-[34px] sm:text-[48px] md:text-[58px] lg:text-[68px] font-medium tracking-tight leading-[1.05] text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              7 Days.
              <br />
              One Complete AI Journey.
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed text-white/70 font-normal">
              Every day focuses on a different skill — from understanding AI to
              building projects and discovering career opportunities.
            </p>
          </div>

          {/* View Mode Toggle Button */}
          <div className="shrink-0 flex items-center gap-1.5 p-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-white/80 self-start md:self-end">
            <button
              onClick={() => setViewMode('interactive')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                viewMode === 'interactive'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Day-by-Day</span>
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                viewMode === 'all'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>All 7 Days</span>
            </button>
          </div>
        </div>

        {viewMode === 'interactive' ? (
          /* ================= INTERACTIVE DAY-BY-DAY VIEW (COMPACT, FAST) ================= */
          <div>
            {/* Horizontal Scrollable Day Selector Pills */}
            <div className="relative mb-8">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
                {JOURNEY_DAYS.map((day, idx) => {
                  const isSelected = selectedDayIndex === idx;
                  return (
                    <button
                      key={day.dayNumber}
                      onClick={() => setSelectedDayIndex(idx)}
                      className={`shrink-0 snap-start px-4 py-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] font-semibold'
                          : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="text-[11px] font-mono uppercase tracking-wider opacity-70">
                        {day.dayNumber}
                      </div>
                      <div className="text-[13px] font-medium whitespace-nowrap">
                        {day.dayName}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Day Detail Card */}
            <div className="relative p-6 sm:p-10 md:p-12 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                  Showing Day {selectedDayIndex + 1} of {JOURNEY_DAYS.length}
                </span>
                {/* Prev / Next controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Day"
                    className="p-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-white/60 px-1">
                    {selectedDayIndex + 1}/{JOURNEY_DAYS.length}
                  </span>
                  <button
                    onClick={handleNext}
                    aria-label="Next Day"
                    className="p-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDay.dayNumber}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  {renderDayContent(currentDay)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* ================= FULL EXPANDED 7-DAY TIMELINE ================= */
          <div className="relative border-l border-white/15 pl-6 sm:pl-10 md:pl-14 space-y-16 sm:space-y-20">
            {JOURNEY_DAYS.map((day) => {
              const isHovered = activeHoverDay === day.dayNumber;

              return (
                <article
                  key={day.dayNumber}
                  id={`chapter-${day.dayNumber.toLowerCase().replace(' ', '-')}`}
                  onMouseEnter={() => setActiveHoverDay(day.dayNumber)}
                  onMouseLeave={() => setActiveHoverDay(null)}
                  className="relative group transition-all duration-300"
                >
                  {/* Timeline node marker */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[47px] md:-left-[63px] top-1.5 w-3 h-3 rounded-full border border-white/60 transition-all duration-300 ${
                      isHovered
                        ? 'bg-white scale-125 border-white shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                        : 'bg-[#0A0A0A]'
                    }`}
                  />
                  {renderDayContent(day, isHovered)}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
