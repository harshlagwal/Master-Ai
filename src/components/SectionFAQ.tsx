import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data';

export const SectionFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative z-10 w-full py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#F5F5F4] text-[#0A0A0A] border-t border-black/5"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="text-[12px] font-mono tracking-widest text-black/40 uppercase mb-4">
            11 // CLARIFICATIONS
          </div>
          <h2
            className="text-[38px] sm:text-[54px] md:text-[68px] font-medium tracking-tight leading-[1.05] text-black mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-[17px] sm:text-[19px] text-black/70 font-normal">
            Clear, honest answers to help you decide if this workshop fits your goals.
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-black/10 border-y border-black/10">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="py-6 sm:py-7">
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-[19px] sm:text-[23px] font-medium text-black tracking-tight group-hover:opacity-75 transition-opacity"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.question}
                  </span>
                  <span className="text-[22px] font-light text-black/40 group-hover:text-black transition-colors shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-4 pb-2 text-[15px] sm:text-[17px] text-black/75 leading-relaxed font-normal">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
