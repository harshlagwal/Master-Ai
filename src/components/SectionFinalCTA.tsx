import React from 'react';
import { PAYMENT_URL } from '../data';

interface SectionFinalCTAProps {
  onJoinClick: () => void;
}

export const SectionFinalCTA: React.FC<SectionFinalCTAProps> = ({ onJoinClick }) => {
  const handleCTA = () => {
    if (PAYMENT_URL && PAYMENT_URL.trim() !== '' && PAYMENT_URL !== '#') {
      window.open(PAYMENT_URL, '_blank', 'noopener,noreferrer');
    } else {
      onJoinClick();
    }
  };

  return (
    <section
      id="final-cta"
      className="relative z-10 w-full py-18 sm:py-24 md:py-28 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#0A0A0A] text-white border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Identifier */}
        <div className="text-[12px] font-mono tracking-widest text-white/40 uppercase mb-8">
          12 // TAKE ACTION
        </div>

        {/* Big Dual-Line Headline */}
        <h2
          className="text-[38px] sm:text-[56px] md:text-[76px] lg:text-[88px] font-medium tracking-tight leading-[1.03] text-white mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          DON&apos;T JUST LEARN AI.
          <br />
          <span className="text-white/70">
            LEARN WHAT YOU CAN BUILD WITH IT.
          </span>
        </h2>

        {/* Supporting text */}
        <p className="text-[18px] sm:text-[22px] text-white/80 font-normal max-w-xl mx-auto mb-12">
          Your first step doesn&apos;t need to be perfect. It just needs to happen.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={handleCTA}
            id="final-join-btn"
            className="px-8 sm:px-12 py-5 rounded-full bg-white text-black font-semibold text-[16px] sm:text-[18px] uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer shadow-2xl active:scale-95"
          >
            CHOOSE YOUR DOMAIN TRACK — ₹89
          </button>

          {/* Small line */}
          <p className="text-xs sm:text-[13px] font-mono tracking-wider text-white/50 uppercase mt-2">
            Choose Any 1 Domain Track for ₹89 • Or All 4 Tracks for ₹199 • 9:00 PM IST
          </p>
        </div>
      </div>
    </section>
  );
};
