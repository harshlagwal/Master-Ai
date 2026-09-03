import React, { useState } from 'react';
import { BUILD_PROOF_ITEMS } from '../data';

export const SectionWhatYouWillBuild: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(BUILD_PROOF_ITEMS[0].id);

  return (
    <section
      id="curriculum"
      className="relative z-10 w-full py-28 sm:py-36 md:py-44 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#F5F5F4] text-[#0A0A0A] border-t border-black/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="text-[12px] font-mono tracking-widest text-black/40 uppercase mb-4">
            03 // PROOF OVER THEORY
          </div>
          <h2
            className="text-[38px] sm:text-[54px] md:text-[68px] lg:text-[76px] font-medium tracking-tight leading-[1.05] text-black mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Don't Collect Tools.
            <br />
            Build Proof.
          </h2>
          <p className="text-[17px] sm:text-[20px] md:text-[22px] leading-relaxed text-black/70 font-normal">
            Anyone can bookmark fifty AI links. The real value is having
            tangible deliverables you can show professors, clients, and hiring managers.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BUILD_PROOF_ITEMS.map((item, index) => {
            const isFeatured = index === 0 || index === 5;
            const isSelected = selectedId === item.id;

            return (
              <div
                key={item.id}
                id={`proof-item-${item.id}`}
                onClick={() => setSelectedId(item.id)}
                className={`group relative p-7 sm:p-9 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isFeatured
                    ? 'md:col-span-2 lg:col-span-2 bg-white border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]'
                    : 'bg-white/80 border-black/8 hover:bg-white hover:border-black/15 shadow-[0_2px_12px_rgba(0,0,0,0.02)]'
                } ${isSelected ? 'ring-1 ring-black/30' : ''}`}
              >
                {/* Header meta */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="text-[11px] font-mono tracking-wider text-black/40 uppercase">
                    {String(index + 1).padStart(2, '0')} // {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-black/60 px-2.5 py-0.5 rounded-full bg-black/5">
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-[22px] sm:text-[28px] font-medium tracking-tight text-black mb-3 group-hover:translate-x-1 transition-transform duration-200"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[14px] sm:text-[16px] text-black/70 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Subtle bottom indicator */}
                <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-[12px] font-mono text-black/40 group-hover:text-black/80 transition-colors">
                  <span>Interactive Deliverable</span>
                  <span>&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
