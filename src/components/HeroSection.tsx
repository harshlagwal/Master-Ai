import React, { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { HERO_DATA } from '../data';

interface HeroSectionProps {
  onJoinClick: () => void;
  onWhatsAppClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onJoinClick,
  onWhatsAppClick,
}) => {
  const typewriterText = HERO_DATA.typewriterText;
  const { displayed, done } = useTypewriter(typewriterText, 30, 450);

  const [showPills, setShowPills] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPills(true);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const handleOutlinePillClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onJoinClick();
  };

  return (
    <section
      id="hero"
      className="relative z-10 w-full min-h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-6 sm:px-10 md:px-14 lg:px-20 overflow-hidden"
    >
      {/* Constrained left column so text stays completely clear of the right avatar */}
      <div className="w-full max-w-[390px] sm:max-w-[430px] md:max-w-[460px] relative z-10">
        {/* Universal domain pill */}
        <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/5 border border-black/10 text-[8.5px] sm:text-[10px] font-mono text-black/75 uppercase whitespace-nowrap tracking-tight">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
          <span>{HERO_DATA.universalBadge}</span>
        </div>

        {/* 1. Blurred intro label */}
        <div
          className="pointer-events-none select-none mb-3 sm:mb-4 max-w-[380px]"
          style={{
            fontSize: 'clamp(15px, 2.4vw, 19px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#000000',
            filter: 'blur(3.5px)',
          }}
        >
          {HERO_DATA.blurLabelTitle}
          <br />
          {HERO_DATA.blurLabelSubtitle}
        </div>

        {/* 2. Typewriter text */}
        <p
          id="typewriter-message"
          className="text-black mb-5 sm:mb-6 font-normal tracking-tight leading-[1.38]"
          style={{
            fontSize: 'clamp(17px, 2.3vw, 22px)',
            minHeight: '62px',
          }}
        >
          {displayed}
          {!done && (
            <span
              className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink"
              aria-hidden="true"
            />
          )}
        </p>

        {/* 3. Action pill buttons */}
        <div
          id="action-pills-container"
          className="flex flex-wrap items-center gap-x-2 gap-y-2"
          style={{
            opacity: showPills ? 1 : 0,
            transform: showPills ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {/* 1. 9 Core Skills */}
          <a
            href="#modules"
            className="inline-flex items-center justify-center bg-white text-black border border-black/15 font-medium rounded-full text-[12px] sm:text-[13px] md:text-[14px] px-3.5 sm:px-4 py-1.5 whitespace-nowrap hover:bg-black hover:text-white transition-all duration-200 cursor-pointer shadow-xs active:scale-95 no-underline"
          >
            9 Core Skills
          </a>

          {/* 2. Explore 7-Day Journey */}
          <a
            href="#journey"
            className="inline-flex items-center justify-center bg-white text-black border border-black/15 font-medium rounded-full text-[12px] sm:text-[13px] md:text-[14px] px-3.5 sm:px-4 py-1.5 whitespace-nowrap hover:bg-black hover:text-white transition-all duration-200 cursor-pointer shadow-xs active:scale-95 no-underline"
          >
            7-Day Journey
          </a>

          {/* 3. Meet Harsh */}
          <a
            href="#mentor"
            className="inline-flex items-center justify-center bg-white text-black border border-black/15 font-medium rounded-full text-[12px] sm:text-[13px] md:text-[14px] px-3.5 sm:px-4 py-1.5 whitespace-nowrap hover:bg-black hover:text-white transition-all duration-200 cursor-pointer shadow-xs active:scale-95 no-underline"
          >
            Meet Harsh
          </a>

          {/* 4. Join Community */}
          <button
            type="button"
            onClick={onWhatsAppClick}
            className="inline-flex items-center justify-center bg-white text-black border border-black/15 font-medium rounded-full text-[12px] sm:text-[13px] md:text-[14px] px-3.5 sm:px-4 py-1.5 whitespace-nowrap hover:bg-black hover:text-white transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
          >
            Join Community
          </button>

          {/* Outline Pill: Join for ₹89 → */}
          <button
            type="button"
            onClick={handleOutlinePillClick}
            title="Reserve seat for ₹89"
            className="inline-flex items-center justify-center text-white bg-[#0A0A0A] hover:bg-white hover:text-black border border-black/30 font-medium rounded-full text-[12px] sm:text-[13px] md:text-[14px] px-4 py-1.5 whitespace-nowrap gap-1.5 transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
          >
            <span>{HERO_DATA.outlinePill}</span>
          </button>
        </div>

        {/* 4. Hero Micro Copy */}
        <p className="mt-4 sm:mt-5 text-black/60 text-[11px] sm:text-[12px] tracking-wide font-normal select-none">
          {HERO_DATA.microCopy}
        </p>

        {/* Subtle scrubber indicator */}
        <div className="mt-6 text-black/35 text-[10px] sm:text-[11px] flex items-center gap-2 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
          <span>Move cursor horizontally to scrub interactive canvas</span>
        </div>
      </div>
    </section>
  );
};
