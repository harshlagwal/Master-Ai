import React from 'react';
import { motion } from 'framer-motion';
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
        'Personalized AI Project & Hackathon Blueprint',
        'Direct Priority WhatsApp Support with Harsh',
        'Freelancing Pitch Decks & Client Contracts',
        'Exclusive Agentic Automation Templates',
      ],
      ctaText: 'Claim VIP Mentorship • ₹299',
      popular: false,
      buttonStyle: isDark ? 'border border-white/20 bg-white/10 hover:bg-white/15 text-white' : 'border border-slate-300 bg-white hover:bg-slate-100 text-slate-800',
    },
  ];

  return (
    <section id="pricing" className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-14 py-20 sm:py-24">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-black/5 dark:bg-white/[0.02] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header with Google Antigravity scroll entrance */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
        >
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider mb-4 border ${
            isDark ? 'bg-white/[0.03] border-white/10 text-neutral-300' : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5 opacity-70" />
            <span>Honest Transparent Value</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-normal sm:font-medium tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
            Why Only <span className="underline decoration-1 underline-offset-8">₹89</span>? Honest Pricing
          </h2>
          <p className={`mt-3.5 text-sm sm:text-base leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
            Quality AI education shouldn't cost thousands of rupees. We keep our live masterclass highly accessible so every ambitious student & engineer can gain high-income career leverage.
          </p>
        </motion.div>

        {/* Pricing Cards Grid with Staggered Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {tiers.map((tier, tIdx) => {
            const isMaster = tier.id === 'master-pass';
            const isVip = tier.id === 'week-pass-299';

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: tIdx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`rounded-3xl p-6 sm:p-8 transition-colors duration-300 flex flex-col justify-between relative group will-change-transform ${
                  isMaster
                    ? isDark
                      ? 'bg-[#0E0E12] border-2 border-white/20 shadow-2xl lg:scale-105 z-20 backdrop-blur-xl'
                      : 'bg-white border-2 border-slate-900 shadow-2xl lg:scale-105 z-20'
                    : isDark
                      ? 'bg-[#0A0A0C]/80 border border-white/[0.08] hover:border-white/20 shadow-xl backdrop-blur-md text-white'
                      : 'bg-white border border-slate-200/90 hover:border-slate-300 shadow-lg text-slate-950'
                }`}
              >
                {/* Popular Tag */}
                {isMaster && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap border ${
                    isDark ? 'bg-white text-black border-white' : 'bg-slate-950 text-white border-slate-950'
                  }`}>
                    <span>Most Popular Choice</span>
                  </div>
                )}

                {isVip && (
                  <div className={`absolute -top-3.5 right-6 px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${
                    isDark ? 'bg-white/10 text-neutral-300 border-white/15' : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    1-on-1 Mentorship
                  </div>
                )}

                <div>
                  {/* Tier Meta */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className={`text-xl font-normal sm:font-medium tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                        {tier.name}
                      </h3>
                      <span className={`inline-block text-[11px] font-mono mt-1 ${
                        isDark ? 'text-neutral-400' : 'text-slate-500'
                      }`}>
                        {tier.badge}
                      </span>
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed font-normal mt-2 mb-6 min-h-[44px] ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                    {tier.description}
                  </p>

                  {/* Price Display */}
                  <div className={`flex flex-wrap items-baseline gap-2 mb-6 pb-6 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <span className={`text-4xl sm:text-5xl font-medium tracking-tight ${
                      isDark ? 'text-white' : 'text-slate-950'
                    }`}>
                      {tier.price}
                    </span>
                    <span className={`text-xs font-mono ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                      / {tier.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8 list-none pl-0">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isDark ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-800'
                        }`}>
                          <Check className="w-2.5 h-2.5 stroke-[2]" />
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
                  className={`w-full py-3.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shadow-sm active:scale-95 flex items-center justify-center gap-2 ${
                    isMaster
                      ? isDark
                        ? 'bg-white text-black hover:bg-neutral-200'
                        : 'bg-slate-950 text-white hover:bg-slate-800'
                      : tier.buttonStyle
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
