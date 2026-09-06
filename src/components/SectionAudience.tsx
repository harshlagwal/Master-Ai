import React, { useState, useRef } from 'react';
import { AUDIENCE_PROFILES } from '../data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const SectionAudience: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filterOptions = [
    { id: 'all', label: 'All Streams' },
    { id: 'non-tech', label: 'Non-Tech' },
    { id: 'creative', label: 'Design & Creators' },
    { id: 'tech', label: 'Tech & Coders' },
    { id: 'career', label: 'Job Seekers' },
  ];

  const filteredProfiles =
    selectedFilter === 'all'
      ? AUDIENCE_PROFILES
      : AUDIENCE_PROFILES.filter((p) => p.category === selectedFilter || selectedFilter === 'all');

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = scrollRef.current.offsetWidth * 0.85;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveSlide(Math.min(Math.max(index, 0), filteredProfiles.length - 1));
  };

  const scrollToSlide = (index: number) => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.querySelectorAll('.audience-card-item');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveSlide(index);
    }
  };

  return (
    <section
      id="audience"
      className="relative z-10 w-full py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#F7F7F6] text-[#0A0A0A] border-t border-black/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="text-[12px] font-mono tracking-widest text-black/40 uppercase mb-3">
            05 // WHO IS THIS FOR
          </div>
          <h2
            className="text-[32px] sm:text-[46px] md:text-[56px] lg:text-[64px] font-medium tracking-tight leading-[1.05] text-black mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Any Field. Any Background.
            <br />
            Built For People Getting Started.
          </h2>

          {/* Supporting Copy */}
          <div className="space-y-1 text-[15px] sm:text-[17px] text-black/75 font-normal leading-relaxed">
            <p>You don't need to be an engineer or computer science student.</p>
            <p>You don't need advanced coding skills.</p>
            <p className="font-medium text-black pt-1">
              AI is a universal multiplier. Your background doesn't matter — only your curiosity.
            </p>
          </div>
        </div>

        {/* Stream Filter Pills & Mobile Swipe Nav */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase text-black/40 mr-1 select-none hidden sm:inline">
              Filter:
            </span>
            {filterOptions.map((opt) => {
              const isActive = selectedFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSelectedFilter(opt.id);
                    setActiveSlide(0);
                    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-white border border-black/10 text-black/70 hover:bg-black/5 hover:text-black'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Swipe counter */}
          <div className="flex md:hidden items-center justify-between">
            <span className="text-xs font-mono text-black/50">
              {activeSlide + 1}/{filteredProfiles.length} Profiles
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
                aria-label="Previous profile"
                className="p-1 rounded-full border border-black/10 bg-white shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-black/70" />
              </button>
              <button
                onClick={() => scrollToSlide(Math.min(filteredProfiles.length - 1, activeSlide + 1))}
                aria-label="Next profile"
                className="p-1 rounded-full border border-black/10 bg-white shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 text-black/70" />
              </button>
            </div>
          </div>
        </div>

        {/* Profiles: Mobile Touch-Snap Carousel | Desktop 3-Column Grid */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 scrollbar-none"
        >
          {filteredProfiles.map((profile, idx) => (
            <div
              key={profile.id}
              id={`profile-${profile.id}`}
              className="audience-card-item shrink-0 w-[84vw] max-w-[340px] md:w-auto md:max-w-none snap-center p-6 sm:p-8 rounded-2xl bg-white border border-black/8 hover:border-black/25 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono tracking-widest text-black/40 uppercase">
                    DOMAIN TRACK // 0{idx + 1}
                  </span>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    PASS: ₹89
                  </span>
                </div>

                <h3
                  className="text-[20px] sm:text-[24px] font-medium tracking-tight text-black mb-1.5"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {profile.title}
                </h3>

                {profile.benefit && (
                  <div className="text-xs font-mono text-emerald-700 font-medium mb-2.5">
                    &bull; {profile.benefit}
                  </div>
                )}

                <p className="text-[13px] sm:text-[14px] text-black/70 leading-relaxed font-normal">
                  {profile.description}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-black/5 flex items-center justify-between text-[11px] font-mono text-black/50">
                <span>{profile.relevantDays || 'Core Focus Sessions'}</span>
                <span className="text-black font-semibold">Choose Track: ₹89 &rarr;</span>
              </div>
            </div>
          ))}
        </div>

        {/* Honest Equalizer Banner */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-black text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/10">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-white/50 mb-1">
              PAY ONLY FOR YOUR DOMAIN
            </div>
            <h4
              className="text-lg sm:text-xl font-medium tracking-tight text-white mb-1"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Choose Any 1 Domain Track For Just ₹89.
            </h4>
            <p className="text-xs sm:text-[13px] text-white/70 max-w-2xl font-normal leading-relaxed">
              Don't pay ₹3,000 for courses loaded with filler. Select your specific domain (Non-Tech, Creative, Tech, or Career) and pay only ₹89 for high-impact live training.
            </p>
          </div>

          <a
            href="#pricing"
            className="shrink-0 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
          >
            Choose Your Track (₹89)
          </a>
        </div>
      </div>
    </section>
  );
};
