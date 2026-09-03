import React, { useState } from 'react';
import { AUDIENCE_PROFILES } from '../data';

export const SectionAudience: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: 'All Streams & Fields' },
    { id: 'non-tech', label: 'Non-Tech & Students' },
    { id: 'creative', label: 'Design & Creators' },
    { id: 'tech', label: 'Tech & Coders' },
    { id: 'career', label: 'Career & Job Seekers' },
  ];

  const filteredProfiles =
    selectedFilter === 'all'
      ? AUDIENCE_PROFILES
      : AUDIENCE_PROFILES.filter((p) => p.category === selectedFilter || selectedFilter === 'all');

  return (
    <section
      id="audience"
      className="relative z-10 w-full py-28 sm:py-36 md:py-44 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#F7F7F6] text-[#0A0A0A] border-t border-black/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[12px] font-mono tracking-widest text-black/40 uppercase mb-4">
            05 // WHO IS THIS FOR
          </div>
          <h2
            className="text-[38px] sm:text-[54px] md:text-[68px] lg:text-[76px] font-medium tracking-tight leading-[1.05] text-black mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Any Field. Any Background.
            <br />
            Built For People Getting Started.
          </h2>

          {/* Supporting Copy */}
          <div className="space-y-1 text-[17px] sm:text-[20px] text-black/75 font-normal leading-relaxed">
            <p>You don't need to be an engineer or computer science student.</p>
            <p>You don't need advanced coding skills.</p>
            <p>You don't need expensive software subscriptions.</p>
            <p className="font-medium text-black pt-1">
              AI is a universal multiplier. Your background doesn't matter — only your curiosity.
            </p>
          </div>
        </div>

        {/* Stream Filter Pills */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase text-black/40 mr-2 select-none">
            Filter by Stream:
          </span>
          {filterOptions.map((opt) => {
            const isActive = selectedFilter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedFilter(opt.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider transition-all duration-200 cursor-pointer ${
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

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProfiles.map((profile, idx) => (
            <div
              key={profile.id}
              id={`profile-${profile.id}`}
              className="p-8 sm:p-9 rounded-2xl bg-white border border-black/8 hover:border-black/25 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono tracking-widest text-black/40 uppercase">
                    DOMAIN TRACK // 0{idx + 1}
                  </span>
                  <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    TRACK PASS: ₹89
                  </span>
                </div>

                <h3
                  className="text-[24px] sm:text-[28px] font-medium tracking-tight text-black mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {profile.title}
                </h3>

                {profile.benefit && (
                  <div className="text-xs font-mono text-emerald-700 font-medium mb-3">
                    &bull; {profile.benefit}
                  </div>
                )}

                <p className="text-[15px] sm:text-[16px] text-black/70 leading-relaxed font-normal">
                  {profile.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between text-[11px] font-mono text-black/50">
                <span>{profile.relevantDays || 'Core Focus Sessions'}</span>
                <span className="text-black font-semibold">Choose Track: ₹89 &rarr;</span>
              </div>
            </div>
          ))}
        </div>

        {/* Honest Equalizer Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-black text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/10">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-white/50 mb-1">
              PAY ONLY FOR YOUR DOMAIN
            </div>
            <h4
              className="text-xl sm:text-2xl font-medium tracking-tight text-white mb-1"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Choose Any 1 Domain Track For Just ₹89.
            </h4>
            <p className="text-xs sm:text-sm text-white/70 max-w-2xl font-normal">
              Don't pay ₹3,000 for courses loaded with filler from other branches. Select your specific domain (Non-Tech, Creative, Tech, or Career) and pay only ₹89 for high-impact live training.
            </p>
          </div>

          <a
            href="#pricing"
            className="shrink-0 px-6 py-3 rounded-full bg-white text-black font-medium text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
          >
            Choose Your Track (₹89)
          </a>
        </div>
      </div>
    </section>
  );
};
