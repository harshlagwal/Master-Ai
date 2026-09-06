import React from 'react';
import { MENTOR_DATA, SOCIAL_LINKS } from '../data';
import { ArrowUpRight } from 'lucide-react';

export const SectionMentor: React.FC = () => {
  return (
    <section
      id="mentor"
      className="relative z-10 w-full py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#0A0A0A] text-white border-t border-white/10"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Identifier */}
        <div className="text-[12px] font-mono tracking-widest text-white/40 uppercase mb-6 sm:mb-8">
          06 // INSTRUCTOR
        </div>

        {/* Section Headline */}
        <h2
          className="text-[32px] sm:text-[46px] md:text-[56px] lg:text-[64px] font-medium tracking-tight leading-[1.05] text-white mb-8 sm:mb-12"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Meet Your Mentor.
        </h2>

        {/* Mentor Bio Block */}
        <div className="p-6 sm:p-10 md:p-12 rounded-3xl border border-white/12 bg-white/[0.03]">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-8 pb-8 border-b border-white/10">
            <div>
              <h3
                className="text-[32px] sm:text-[44px] font-medium tracking-tight text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {MENTOR_DATA.name}
              </h3>
              <p className="text-[15px] sm:text-[17px] text-white/60 font-mono tracking-wide mt-1">
                {MENTOR_DATA.role}
              </p>
            </div>
            <div className="flex items-center gap-2.5 flex-wrap self-start md:self-auto">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/20 text-white/80 hover:bg-white hover:text-black hover:border-white transition-all flex items-center gap-1.5 cursor-pointer no-underline"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href={SOCIAL_LINKS.contactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/20 text-white/80 hover:bg-white hover:text-black hover:border-white transition-all flex items-center gap-1.5 cursor-pointer no-underline"
              >
                <span>Portfolio / Contact</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <span className="text-xs font-mono uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/10 text-white/80">
                Live Instruction
              </span>
            </div>
          </div>

          {/* Authentic Grounded Copy */}
          <div className="space-y-6 text-[17px] sm:text-[20px] text-white/80 leading-relaxed font-normal max-w-3xl">
            {MENTOR_DATA.mainCopy.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Statement */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div
              className="text-[24px] sm:text-[34px] md:text-[42px] font-medium tracking-wider text-white select-none"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {MENTOR_DATA.statement}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
