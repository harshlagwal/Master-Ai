import React from 'react';
import { OPPORTUNITIES_DATA } from '../data';
import { Award, GraduationCap, Globe, CheckCircle2, ArrowRight, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface SectionOpportunitiesProps {
  onJoinClick: (trackId?: string) => void;
}

export const SectionOpportunities: React.FC<SectionOpportunitiesProps> = ({ onJoinClick }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'skill-india-upgrad':
        return <Award className="w-6 h-6 text-emerald-400" />;
      case 'iit-kanpur-ambassador':
        return <GraduationCap className="w-6 h-6 text-amber-400" />;
      default:
        return <Globe className="w-6 h-6 text-cyan-400" />;
    }
  };

  const getBadgeStyle = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300';
      case 'amber':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-300';
      default:
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300';
    }
  };

  return (
    <section
      id="opportunities"
      className="relative z-10 w-full py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-14 lg:px-20 bg-[#0C0C0E] text-white border-t border-white/10 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] sm:text-xs font-mono uppercase tracking-widest text-amber-400/90 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {OPPORTUNITIES_DATA.sectionTag}
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.08] mb-5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {OPPORTUNITIES_DATA.headline}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-white/70 font-normal leading-relaxed">
            {OPPORTUNITIES_DATA.subheadline}
          </p>
        </div>

        {/* 3-Column Responsive Editorial Grid (1 col on mobile, 2 col on tablet, 3 col on laptop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {OPPORTUNITIES_DATA.cards.map((card) => {
            const isSkillIndia = card.id === 'skill-india-upgrad';
            const isIIT = card.id === 'iit-kanpur-ambassador';

            return (
              <div
                key={card.id}
                className={`relative rounded-3xl bg-white/[0.03] border p-6 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:bg-white/[0.05] hover:-translate-y-1 ${
                  isSkillIndia
                    ? 'border-emerald-500/30 hover:border-emerald-500/50 shadow-[0_10px_30px_rgba(16,185,129,0.05)]'
                    : isIIT
                    ? 'border-amber-500/30 hover:border-amber-500/50 shadow-[0_10px_30px_rgba(245,158,11,0.05)]'
                    : 'border-white/10 hover:border-cyan-500/40'
                }`}
              >
                {/* Top Badge & Icon */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider border ${getBadgeStyle(
                        card.badgeColor
                      )}`}
                    >
                      {card.tag}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0">
                      {getIcon(card.id)}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    className="text-xl sm:text-2xl font-medium text-white tracking-tight leading-snug mb-1.5"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {card.title}
                  </h3>
                  <div className="text-xs sm:text-sm font-mono text-white/50 mb-4">
                    {card.subtitle}
                  </div>

                  {/* Overview Text */}
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                    {card.overview}
                  </p>

                  {/* Step-by-Step Roadmap Checklist */}
                  <div className="space-y-3 mb-6">
                    <div className="text-[11px] font-mono tracking-widest text-white/40 uppercase">
                      Claim Roadmap:
                    </div>
                    {card.steps.map((step) => (
                      <div
                        key={step.stepNumber}
                        className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3"
                      >
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-white/10 text-white font-mono text-xs font-bold shrink-0 mt-0.5">
                          {step.stepNumber}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs sm:text-sm font-semibold text-white/90">
                            {step.title}
                          </div>
                          <div className="text-[11px] sm:text-xs text-white/60 leading-normal mt-0.5">
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Key Highlights Checklist */}
                  <div className="space-y-2 mb-8">
                    {card.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-white/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div>
                  <button
                    onClick={() => onJoinClick('master-pass')}
                    className={`w-full py-3 sm:py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSkillIndia
                        ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                        : isIIT
                        ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40'
                        : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
                    }`}
                  >
                    <span>{card.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Verification Guarantee & ₹89 Masterclass Access */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-white/[0.04] to-emerald-500/10 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-semibold text-white tracking-tight">
                Learn AI from Scratch for Just ₹89
              </div>
              <div className="text-xs sm:text-sm text-white/60 mt-0.5">
                Complete 7-Day Live Zoom Masterclass • Free Certificate Claim Blueprints • IIT Kanpur Ambassador Prep
              </div>
            </div>
          </div>

          <button
            onClick={() => onJoinClick('master-pass')}
            className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm flex items-center justify-center gap-2 shrink-0 transition-all shadow-[0_4px_20px_rgba(245,158,11,0.25)] cursor-pointer"
          >
            <span>Claim ₹89 Pass</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
