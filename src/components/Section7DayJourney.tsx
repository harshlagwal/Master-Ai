import React, { useState } from 'react';
import { JOURNEY_DAYS } from '../data';

export const Section7DayJourney: React.FC = () => {
  const [activeDay, setActiveDay] = useState<string | null>(null);

  return (
    <section
      id="journey"
      className="relative z-10 w-full py-28 sm:py-36 md:py-44 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#0A0A0A] text-white border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 sm:mb-28">
          <div className="text-[12px] font-mono tracking-widest text-white/40 uppercase mb-6">
            02 // THE ROADMAP
          </div>
          <h2
            className="text-[38px] sm:text-[54px] md:text-[68px] lg:text-[76px] font-medium tracking-tight leading-[1.05] text-white mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            7 Days.
            <br />
            One Complete AI Journey.
          </h2>
          <p className="text-[17px] sm:text-[20px] md:text-[22px] leading-relaxed text-white/70 font-normal">
            Every day focuses on a different skill — from understanding AI to
            building projects and discovering career opportunities.
          </p>
        </div>

        {/* Vertical Editorial Timeline (Chapter-like Layout) */}
        <div className="relative border-l border-white/15 pl-6 sm:pl-10 md:pl-14 space-y-20 sm:space-y-28">
          {JOURNEY_DAYS.map((day) => {
            const isHovered = activeDay === day.dayNumber;

            return (
              <article
                key={day.dayNumber}
                id={`chapter-${day.dayNumber.toLowerCase().replace(' ', '-')}`}
                onMouseEnter={() => setActiveDay(day.dayNumber)}
                onMouseLeave={() => setActiveDay(null)}
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

                {/* Chapter Meta */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono tracking-widest text-white/40 uppercase mb-3">
                  <span className="text-white/80 font-bold">{day.dayNumber}</span>
                  <span>—</span>
                  <span>{day.dayName}</span>
                  <span>—</span>
                  <span>{day.time}</span>
                </div>

                {/* Domain / Field Target Badge */}
                {day.domainTag && (
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-mono text-white/90 tracking-wider uppercase">
                      {day.domainTag}
                    </span>
                  </div>
                )}

                {/* Chapter Title */}
                <h3
                  className="text-[26px] sm:text-[34px] md:text-[40px] font-medium tracking-tight text-white mb-6 leading-tight group-hover:text-white transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {day.title}
                </h3>

                {/* Standard Topics (Days 1, 2, 3, 4, 5, 7) */}
                {day.topics && day.topics.length > 0 && (
                  <div className="max-w-3xl mb-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-white/50 mb-3">
                      Core Focus & Topics
                    </div>
                    <ul className="space-y-2 text-[15px] sm:text-[17px] text-white/80 leading-relaxed list-none pl-0">
                      {day.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-white/30 text-sm mt-1 select-none">
                            &bull;
                          </span>
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
                        className="text-[12px] sm:text-[13px] px-3 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/80"
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
                      className="text-[18px] sm:text-[22px] font-medium tracking-tight text-white"
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

                {/* Day 06 Multi-Part Layout (Part A: Free Certs & Part B: Internships) */}
                {day.parts && (
                  <div className="space-y-6 max-w-4xl mb-6">
                    {day.parts.map((part, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-6 sm:p-8 rounded-xl border border-white/15 bg-white/[0.03]"
                      >
                        <h4
                          className="text-[19px] sm:text-[22px] font-medium text-white mb-2 tracking-tight"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {part.partTitle}
                        </h4>
                        {part.description && (
                          <p className="text-[14px] sm:text-[15px] text-white/70 mb-4 leading-relaxed">
                            {part.description}
                          </p>
                        )}
                        <ul className="space-y-2 mb-5">
                          {part.points.map((pt, ptIdx) => (
                            <li
                              key={ptIdx}
                              className="text-[14px] sm:text-[16px] text-white/85 flex items-start gap-2.5 leading-relaxed"
                            >
                              <span className="text-white/40 text-xs mt-1.5 select-none">
                                &bull;
                              </span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                        {part.importantNote && (
                          <div className="p-3.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-xs sm:text-[13px] text-amber-200/90 leading-relaxed">
                            {part.importantNote}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Day 07 Career Roadmap Visual Chain */}
                {day.roadmap && (
                  <div className="my-6 max-w-4xl p-6 sm:p-8 rounded-xl border border-white/15 bg-white/[0.04]">
                    <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">
                      The 8-Stage Execution Blueprint
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px] font-medium tracking-wide">
                      {day.roadmap.map((step, sIdx) => (
                        <React.Fragment key={sIdx}>
                          <span className="px-3 py-1.5 rounded-md bg-white/10 text-white border border-white/15">
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
                        className="mt-6 text-[17px] sm:text-[20px] font-medium text-white/90 italic tracking-tight"
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
                  <span className="text-[14px] sm:text-[16px] text-white/90 leading-relaxed font-normal">
                    {day.outcome}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
