import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, Bot } from 'lucide-react';
import { BRAND } from '../data';

interface SectionPricingCardsProps {
  isDark?: boolean;
  onEnrollClick: (trackId?: string) => void;
}

export const SectionPricingCards: React.FC<SectionPricingCardsProps> = ({
  isDark = true,
  onEnrollClick,
}) => {
  const tiers = [
    {
      id: 'demo-free',
      name: '30-Min Live Demo',
      badge: 'Free Access',
      price: '₹0',
      period: 'Only 2 Days Live',
      description: 'Experience the teaching style and see how practical AI engineering works before enrolling.',
      features: [
        '30-Minute Live Demo on Google Meet',
        'Foundation of Modern LLMs & Prompting',
        'Live Q&A with Harsh Lagwal',
        'Zero payment required',
      ],
      ctaText: 'Join Free 30-Min Demo • ₹0',
      popular: false,
      buttonStyle: isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800',
    },
    {
      id: 'master-pass',
      name: '7-Day Master Pass',
      badge: 'Most Popular • Complete Access',
      price: '₹89',
      period: 'One-time • 7 Days All-Inclusive',
      description: 'Complete hands-on immersion across all 9 skills with verifiable GitHub build proof.',
      features: [
        'All 7 Live Evening Sessions (8:00 PM IST)',
        'Complete 9 Core Skills Curriculum',
        'Live Code, Prompts & Workflow Templates',
        'Full Session Recordings Access',
        'Verified Skill India / Completion Certificate',
        'Direct Doubt Clearing on Google Meet',
        'Lifetime Community Access',
      ],
      ctaText: 'Get Full 7-Day Access • ₹89',
      popular: true,
      buttonStyle: isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-slate-950 text-white hover:bg-slate-800',
    },
    {
      id: 'week-pass-299',
      name: '1-Week VIP Pass',
      badge: 'Priority 1-on-1 Mentorship',
      price: '₹299',
      period: 'VIP Mentoring Pass',
      description: 'For students who want personalized 1-on-1 guidance, portfolio review, and freelance setups.',
      features: [
        'Everything in the 7-Day Master Pass',
        '1-on-1 Portfolio & GitHub Profile Review',
        'Personalized SIH Hackathon Blueprint',
        'Direct Priority WhatsApp Support with Harsh',
        'Freelancing Pitch Decks & Client Contracts',
        'Exclusive Agentic Automation Templates',
      ],
      ctaText: 'Claim VIP Mentorship • ₹299',
      popular: false,
      buttonStyle: 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-black hover:opacity-90 font-bold',
    },
  ];

  return (
    <section id="pricing" className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-14 py-20 sm:py-24">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-amber-500/5 dark:bg-amber-400/[0.03] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 dark:text-amber-400 text-xs font-mono uppercase tracking-wider mb-4 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Honest Transparent Value</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
            Why Only <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">₹89</span>? Honest Pricing
          </h2>
          <p className={`mt-3.5 text-xs sm:text-sm md:text-base leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
            Quality AI education shouldn't cost thousands of rupees. We keep our live masterclass highly accessible so every ambitious student & engineer can gain high-income career leverage.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {tiers.map((tier) => {
            const isMaster = tier.id === 'master-pass';
            const isVip = tier.id === 'week-pass-299';

            return (
              <div
                key={tier.id}
                className={`rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-2 will-change-transform ${
                  isMaster
                    ? isDark
                      ? 'bg-neutral-900/90 border-2 border-amber-400/50 shadow-2xl shadow-amber-500/15 lg:scale-105 z-20 backdrop-blur-xl'
                      : 'bg-white border-2 border-amber-400 shadow-2xl shadow-amber-500/20 lg:scale-105 z-20 ring-4 ring-amber-400/15'
                    : isDark
                      ? 'bg-neutral-900/60 border border-white/10 hover:border-white/20 shadow-xl backdrop-blur-md text-white'
                      : 'bg-white border border-slate-200/90 hover:border-slate-300 shadow-lg text-slate-950'
                }`}
              >
                {/* Popular Tag */}
                {isMaster && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-black text-[11px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3 h-3 text-black" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                {isVip && (
                  <div className="absolute -top-3.5 right-6 px-3 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                    1-on-1 Mentorship
                  </div>
                )}

                <div>
                  {/* Tier Meta */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                        {tier.name}
                      </h3>
                      <span className={`inline-block text-[11px] font-medium mt-1 ${
                        isMaster
                          ? 'text-amber-400 font-semibold'
                          : isDark ? 'text-neutral-400' : 'text-slate-500'
                      }`}>
                        {tier.badge}
                      </span>
                    </div>
                  </div>

                  <p className={`text-xs sm:text-[13px] mt-2 mb-6 leading-relaxed min-h-[40px] ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                    {tier.description}
                  </p>

                  {/* Price Display */}
                  <div className={`flex flex-wrap items-baseline gap-2 mb-6 pb-6 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <span className={`text-4xl sm:text-5xl font-black tracking-tight ${
                      isMaster 
                        ? 'bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-300 bg-clip-text text-transparent' 
                        : isDark ? 'text-white' : 'text-slate-950'
                    }`}>
                      {tier.price}
                    </span>
                    <span className={`text-xs font-semibold ${isMaster ? 'text-amber-400' : isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                      / {tier.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8 list-none pl-0">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isMaster
                            ? 'bg-amber-400/20 text-amber-400'
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                        </div>
                        <span className={`leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={() => onEnrollClick(tier.id)}
                  className={`w-full py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
                    isMaster
                      ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black shadow-amber-500/25'
                      : tier.buttonStyle
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Special SIH Hackathon Banner */}
        <div
          className={`mt-12 rounded-3xl p-5 sm:p-7 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-all ${
            isDark 
              ? 'bg-gradient-to-r from-amber-500/10 via-neutral-900/80 to-amber-500/5 border-amber-400/30 text-white shadow-xl' 
              : 'bg-gradient-to-r from-amber-50 via-white to-amber-50/50 border-amber-200 text-slate-900 shadow-md'
          }`}
        >
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-400/20 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-inner mt-0.5 sm:mt-0">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base md:text-lg font-bold flex flex-wrap items-center gap-2">
                <span>Smart India Hackathon (SIH) Masterclass</span>
                <span className="text-[11px] sm:text-xs font-mono font-black px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-500 dark:text-amber-400">
                  ₹199
                </span>
              </h4>
              <p className={`text-xs sm:text-sm mt-0.5 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                Special intensive sprint on problem-statement breakdown, architecture diagrams & winning jury pitch decks.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onEnrollClick('sih-masterclass')}
            className="w-full sm:w-auto shrink-0 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-black font-extrabold text-xs sm:text-sm cursor-pointer transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>Claim SIH Sprint (₹199)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
