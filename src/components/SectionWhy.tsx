import React from 'react';
import { WHY_MASTER_AI } from '../data';

export const SectionWhy: React.FC = () => {
  return (
    <section
      id="why"
      className="relative z-10 w-full py-28 sm:py-36 md:py-44 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#F5F5F4] text-[#0A0A0A] border-t border-black/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="text-[12px] font-mono tracking-widest text-black/40 uppercase mb-4">
            07 // THE ADVANTAGE
          </div>
          <h2
            className="text-[38px] sm:text-[54px] md:text-[68px] lg:text-[76px] font-medium tracking-tight leading-[1.05] text-black mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Why MASTER AI?
          </h2>
          <p className="text-[17px] sm:text-[20px] md:text-[22px] leading-relaxed text-black/70 font-normal">
            Eight foundational pillars built specifically to take you from a
            curious beginner to an equipped creator with proof of work.
          </p>
        </div>

        {/* 01 to 08 Numbered Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {WHY_MASTER_AI.map((item) => (
            <div
              key={item.number}
              id={`why-pillar-${item.number}`}
              className="p-8 rounded-2xl bg-white border border-black/8 hover:border-black/20 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div>
                <span className="text-[20px] font-mono font-medium text-black/30 block mb-6">
                  {item.number}
                </span>
                <h3
                  className="text-[20px] sm:text-[22px] font-medium tracking-tight text-black mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-black/70 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between text-xs font-mono text-black/40">
                <span>Core Pillar</span>
                <span>✦</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
