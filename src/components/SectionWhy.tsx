import React, { useState, useRef } from 'react';
import { WHY_MASTER_AI } from '../data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const SectionWhy: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = scrollRef.current.offsetWidth * 0.82;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveSlide(Math.min(Math.max(index, 0), WHY_MASTER_AI.length - 1));
  };

  const scrollToSlide = (index: number) => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.querySelectorAll('.why-card-item');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveSlide(index);
    }
  };

  return (
    <section
      id="why"
      className="relative z-10 w-full py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#F5F5F4] text-[#0A0A0A] border-t border-black/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-3xl">
            <div className="text-[12px] font-mono tracking-widest text-black/40 uppercase mb-3">
              07 // THE ADVANTAGE
            </div>
            <h2
              className="text-[34px] sm:text-[48px] md:text-[58px] lg:text-[68px] font-medium tracking-tight leading-[1.05] text-black mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Why MASTER AI?
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed text-black/70 font-normal">
              Eight foundational pillars built specifically to take you from a
              curious beginner to an equipped creator with proof of work.
            </p>
          </div>

          {/* Mobile Swipe Navigator */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <span className="text-xs font-mono uppercase tracking-wider text-black/50">
              {activeSlide + 1} / {WHY_MASTER_AI.length} Pillars
            </span>
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
                aria-label="Previous Pillar"
                className="p-1.5 rounded-full border border-black/10 bg-white shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-black/70" />
              </button>
              <button
                onClick={() => scrollToSlide(Math.min(WHY_MASTER_AI.length - 1, activeSlide + 1))}
                aria-label="Next Pillar"
                className="p-1.5 rounded-full border border-black/10 bg-white shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 text-black/70" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Touch-Snap Carousel | Desktop 4-Column Grid */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 scrollbar-none"
        >
          {WHY_MASTER_AI.map((item) => (
            <div
              key={item.number}
              id={`why-pillar-${item.number}`}
              className="why-card-item shrink-0 w-[80vw] max-w-[300px] md:w-auto md:max-w-none snap-center p-6 sm:p-7 rounded-2xl bg-white border border-black/8 hover:border-black/20 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div>
                <span className="text-[18px] font-mono font-medium text-black/30 block mb-4">
                  {item.number}
                </span>
                <h3
                  className="text-[18px] sm:text-[20px] font-medium tracking-tight text-black mb-2.5"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-black/70 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-black/5 flex items-center justify-between text-xs font-mono text-black/40">
                <span>Core Pillar</span>
                <span>✦</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Indicator Dots */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-4">
          {WHY_MASTER_AI.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              aria-label={`Go to pillar ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === i ? 'w-5 bg-black' : 'w-1.5 bg-black/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
