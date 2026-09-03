import React from 'react';
import { WORKSHOP_DETAILS } from '../data';

export const SectionDetails: React.FC = () => {
  return (
    <section
      id="details"
      className="relative z-10 w-full py-24 sm:py-32 md:py-36 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#F5F5F4] text-[#0A0A0A] border-t border-black/5"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-20">
          <div className="text-[12px] font-mono tracking-widest text-black/40 uppercase mb-4">
            09 // LOGISTICS
          </div>
          <h2
            className="text-[38px] sm:text-[54px] md:text-[64px] font-medium tracking-tight leading-[1.05] text-black mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The Details
          </h2>
          <p className="text-[17px] sm:text-[19px] text-black/70 font-normal">
            Everything you need to know about the upcoming workshop session dates,
            timing, and delivery.
          </p>
        </div>

        {/* Clean Editorial Table / Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {WORKSHOP_DETAILS.map((detail, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-black/8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div className="text-[12px] font-mono uppercase tracking-widest text-black/40 mb-3">
                {detail.label}
              </div>
              <div
                className="text-[18px] sm:text-[20px] font-medium text-black tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {detail.value}
              </div>
            </div>
          ))}
        </div>

        {/* Explicit Certification Clarification Note */}
        <div className="mt-10 p-5 rounded-2xl border border-black/10 bg-white/70 text-xs sm:text-[13px] text-black/70 leading-relaxed max-w-3xl">
          <span className="font-semibold text-black uppercase font-mono tracking-wider mr-2">
            Important Clarity:
          </span>
          MASTER AI does not issue workshop attendance certificates. During Day 06, you will receive step-by-step guidance on how to independently find, qualify for, and earn recognized free industry certifications issued directly by global organizations like Google, Microsoft, IBM, and Cisco.
        </div>
      </div>
    </section>
  );
};
