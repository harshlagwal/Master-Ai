import React, { useState, useRef } from 'react';
import { BUILD_PROOF_ITEMS } from '../data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const SectionWhatYouWillBuild: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(BUILD_PROOF_ITEMS[0].id);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = scrollRef.current.offsetWidth * 0.85;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveSlide(Math.min(Math.max(index, 0), BUILD_PROOF_ITEMS.length - 1));
  };

  const scrollToSlide = (index: number) => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.querySelectorAll('.proof-card-item');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveSlide(index);
    }
  };

  return (
    <section
      id="curriculum"
      className="relative z-10 w-full py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#F5F5F4] text-[#0A0A0A] border-t border-black/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-3xl">
            <div className="text-[12px] font-mono tracking-widest text-black/40 uppercase mb-3">
              03 // PROOF OVER THEORY
            </div>
            <h2
              className="text-[34px] sm:text-[48px] md:text-[58px] lg:text-[68px] font-medium tracking-tight leading-[1.05] text-black mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Don't Collect Tools.
              <br />
              Build Proof.
            </h2>
            <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed text-black/70 font-normal">
              Anyone can bookmark fifty AI links. The real value is having
              tangible deliverables you can show professors, clients, and hiring managers.
            </p>
          </div>

          {/* Mobile Swipe Navigator / Desktop Counter */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <span className="text-xs font-mono uppercase tracking-wider text-black/50">
              {activeSlide + 1} / {BUILD_PROOF_ITEMS.length} Projects
            </span>
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
                aria-label="Previous Project"
                className="p-1.5 rounded-full border border-black/10 bg-white shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-black/70" />
              </button>
              <button
                onClick={() => scrollToSlide(Math.min(BUILD_PROOF_ITEMS.length - 1, activeSlide + 1))}
                aria-label="Next Project"
                className="p-1.5 rounded-full border border-black/10 bg-white shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 text-black/70" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile: Horizontal Swipe Carousel | Desktop: Asymmetric Editorial Grid */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 scrollbar-none"
        >
          {BUILD_PROOF_ITEMS.map((item, index) => {
            const isFeatured = index === 0 || index === 5;
            const isSelected = selectedId === item.id;

            return (
              <div
                key={item.id}
                id={`proof-item-${item.id}`}
                onClick={() => setSelectedId(item.id)}
                className={`proof-card-item shrink-0 w-[84vw] max-w-[340px] md:w-auto md:max-w-none snap-center group relative p-6 sm:p-8 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isFeatured
                    ? 'md:col-span-2 lg:col-span-2 bg-white border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]'
                    : 'bg-white/80 border-black/8 hover:bg-white hover:border-black/15 shadow-[0_2px_12px_rgba(0,0,0,0.02)]'
                } ${isSelected ? 'ring-1 ring-black/30' : ''}`}
              >
                {/* Header meta */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono tracking-wider text-black/40 uppercase">
                    {String(index + 1).padStart(2, '0')} // {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-black/60 px-2.5 py-0.5 rounded-full bg-black/5">
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-[20px] sm:text-[24px] md:text-[26px] font-medium tracking-tight text-black mb-2.5 group-hover:translate-x-1 transition-transform duration-200"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] sm:text-[15px] text-black/70 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Subtle bottom indicator */}
                <div className="mt-5 pt-3.5 border-t border-black/5 flex items-center justify-between text-[11px] sm:text-[12px] font-mono text-black/40 group-hover:text-black/80 transition-colors">
                  <span>Interactive Deliverable</span>
                  <span>&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Indicator Dots */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-4">
          {BUILD_PROOF_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === i ? 'w-6 bg-black' : 'w-1.5 bg-black/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
