import React, { useState, useRef } from 'react';
import { TOOLKIT_CATEGORIES } from '../data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const SectionToolkit: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = scrollRef.current.offsetWidth * 0.85;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveSlide(Math.min(Math.max(index, 0), TOOLKIT_CATEGORIES.length - 1));
  };

  const scrollToSlide = (index: number) => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.querySelectorAll('.toolkit-card-item');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveSlide(index);
    }
  };

  return (
    <section
      id="tools"
      className="relative z-10 w-full py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#0A0A0A] text-white border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-3xl">
            <div className="text-[12px] font-mono tracking-widest text-white/40 uppercase mb-3">
              04 // THE ECOSYSTEM
            </div>
            <h2
              className="text-[34px] sm:text-[48px] md:text-[58px] lg:text-[68px] font-medium tracking-tight leading-[1.05] text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              The AI Toolkit
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed text-white/70 font-normal">
              You don't need 100 tools. You need to know which tool to use, when to
              use it, and how to combine them into reliable workflows.
            </p>
          </div>

          {/* Mobile Swipe Navigator */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <span className="text-xs font-mono uppercase tracking-wider text-white/50">
              {activeSlide + 1} / {TOOLKIT_CATEGORIES.length} Categories
            </span>
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
                aria-label="Previous Category"
                className="p-1.5 rounded-full border border-white/15 bg-white/5 text-white cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollToSlide(Math.min(TOOLKIT_CATEGORIES.length - 1, activeSlide + 1))}
                aria-label="Next Category"
                className="p-1.5 rounded-full border border-white/15 bg-white/5 text-white cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Categorized Refined Layout: Mobile Horizontal Touch Swiper | Desktop Grid */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 scrollbar-none"
        >
          {TOOLKIT_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.category}
              id={`tool-cat-${cat.category.toLowerCase()}`}
              className="toolkit-card-item shrink-0 w-[84vw] max-w-[340px] md:w-auto md:max-w-none snap-center p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
                    0{idx + 1} //
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/60">
                    Category
                  </span>
                </div>

                <h3
                  className="text-[22px] sm:text-[26px] font-medium tracking-tight text-white mb-2.5"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {cat.category}
                </h3>

                {cat.description && (
                  <p className="text-[13px] sm:text-[14px] text-white/60 mb-5 leading-relaxed">
                    {cat.description}
                  </p>
                )}
              </div>

              {/* Tool Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-5 border-t border-white/10">
                {cat.tools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[12px] sm:text-[13px] px-2.5 py-0.5 rounded-full border border-white/15 bg-white/5 text-white/90 tracking-tight"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Indicator Dots */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-4">
          {TOOLKIT_CATEGORIES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              aria-label={`Go to category ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === i ? 'w-6 bg-white' : 'w-1.5 bg-white/25'
              }`}
            />
          ))}
        </div>

        {/* Note on evolving landscape */}
        <div className="mt-8 sm:mt-10 text-xs font-mono text-white/40 max-w-2xl leading-relaxed">
          ✦ Note: The AI landscape evolves rapidly. We continuously refine the workshop toolkit to focus on the highest-utility platforms rather than temporary fads.
        </div>
      </div>
    </section>
  );
};
