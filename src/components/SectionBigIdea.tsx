import React from 'react';
import { BIG_IDEA_DATA } from '../data';

export const SectionBigIdea: React.FC = () => {
  return (
    <section
      id="about"
      className="relative z-10 w-full py-28 sm:py-36 md:py-44 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#F7F7F6] text-[#0A0A0A] border-t border-black/5"
    >
      <div className="max-w-5xl mx-auto">
        {/* Subtle section identifier */}
        <div className="text-[12px] font-mono tracking-widest text-black/40 uppercase mb-8 sm:mb-12">
          01 // THE BIG IDEA
        </div>

        {/* Big Headline */}
        <h2
          className="text-[36px] sm:text-[52px] md:text-[68px] lg:text-[76px] font-medium tracking-tight leading-[1.05] text-black mb-10 sm:mb-14"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {BIG_IDEA_DATA.headline}
        </h2>

        {/* Editorial Body */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <p className="text-[18px] sm:text-[22px] md:text-[26px] leading-[1.45] text-black/80 font-normal tracking-tight">
            MASTER AI is not designed to be another list of random AI tools.
          </p>
          <p className="text-[18px] sm:text-[22px] md:text-[26px] leading-[1.45] text-black/80 font-normal tracking-tight mt-6">
            The goal is to help freshers understand how AI can actually be used to
            learn faster, create better work, build projects, participate in
            hackathons, discover free learning opportunities and approach
            internships with a stronger profile.
          </p>
        </div>

        {/* Large Statement */}
        <div className="pt-10 border-t border-black/10">
          <div
            className="text-[26px] sm:text-[40px] md:text-[52px] lg:text-[62px] font-medium tracking-tight text-black flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-2 select-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span>LEARN</span>
            <span className="text-black/30">&rarr;</span>
            <span>BUILD</span>
            <span className="text-black/30">&rarr;</span>
            <span>SHOW</span>
            <span className="text-black/30">&rarr;</span>
            <span className="underline underline-offset-8 decoration-black/30">
              APPLY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
