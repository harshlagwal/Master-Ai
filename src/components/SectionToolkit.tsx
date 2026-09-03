import React from 'react';
import { TOOLKIT_CATEGORIES } from '../data';

export const SectionToolkit: React.FC = () => {
  return (
    <section
      id="tools"
      className="relative z-10 w-full py-28 sm:py-36 md:py-44 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#0A0A0A] text-white border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="text-[12px] font-mono tracking-widest text-white/40 uppercase mb-4">
            04 // THE ECOSYSTEM
          </div>
          <h2
            className="text-[38px] sm:text-[54px] md:text-[68px] lg:text-[76px] font-medium tracking-tight leading-[1.05] text-white mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The AI Toolkit
          </h2>
          <p className="text-[17px] sm:text-[20px] md:text-[22px] leading-relaxed text-white/70 font-normal">
            You don't need 100 tools. You need to know which tool to use, when to
            use it, and how to combine them into reliable workflows.
          </p>
        </div>

        {/* Categorized Refined Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TOOLKIT_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.category}
              id={`tool-cat-${cat.category.toLowerCase()}`}
              className="p-8 sm:p-9 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
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
                  className="text-[26px] sm:text-[30px] font-medium tracking-tight text-white mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {cat.category}
                </h3>

                {cat.description && (
                  <p className="text-[14px] text-white/60 mb-6 leading-relaxed">
                    {cat.description}
                  </p>
                )}
              </div>

              {/* Tool Tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                {cat.tools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[13px] sm:text-[14px] px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/90 tracking-tight"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note on evolving landscape */}
        <div className="mt-12 text-xs font-mono text-white/40 max-w-2xl leading-relaxed">
          ✦ Note: The AI landscape evolves rapidly. We continuously refine the workshop toolkit to focus on the highest-utility platforms rather than temporary fads.
        </div>
      </div>
    </section>
  );
};
