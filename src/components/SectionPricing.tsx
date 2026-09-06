import React, { useState, useRef } from 'react';
import { PRICING_SECTION_DATA, PAYMENT_URL, WORKSHOP_TOPICS, BRAND, SIH_WORKSHOP_DATA } from '../data';
import { Check, ArrowRight, ShieldCheck, Users, Clock, Trophy, Sparkles } from 'lucide-react';

interface SectionPricingProps {
  onJoinClick: (trackId?: string) => void;
}

export const SectionPricing: React.FC<SectionPricingProps> = ({ onJoinClick }) => {
  const [activeTab, setActiveTab] = useState<'week299' | 'demo' | 'master' | 'sih'>('week299');
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !spotlightRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (spotlightRef.current) {
        const glowColor =
          activeTab === 'sih'
            ? 'rgba(245, 158, 11, 0.15)'
            : activeTab === 'week299'
            ? 'rgba(251, 191, 36, 0.18)'
            : activeTab === 'demo'
            ? 'rgba(16, 185, 129, 0.18)'
            : 'rgba(147, 51, 234, 0.15)';
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${glowColor}, transparent 75%)`;
      }
    });
  };

  const handleMouseEnter = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  };

  const handleCTA = () => {
    if (PAYMENT_URL && PAYMENT_URL.trim() !== '' && PAYMENT_URL !== '#') {
      window.open(PAYMENT_URL, '_blank', 'noopener,noreferrer');
    } else {
      if (activeTab === 'demo') {
        onJoinClick('demo-free');
      } else if (activeTab === 'week299') {
        onJoinClick('week-pass-299');
      } else if (activeTab === 'sih') {
        onJoinClick('sih-masterclass');
      } else {
        onJoinClick('master-pass');
      }
    }
  };

  return (
    <section
      id="pricing"
      className="relative z-10 w-full py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#0A0A0A] text-white border-t border-white/10"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Identifier */}
        <div className="text-[12px] font-mono tracking-widest text-white/40 uppercase mb-6 sm:mb-8">
          08 // HONEST PRICING ARCHITECTURE
        </div>

        {/* Section Headline */}
        <h2
          className="text-[36px] sm:text-[50px] md:text-[64px] lg:text-[72px] font-medium tracking-tight leading-[1.05] text-white mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {PRICING_SECTION_DATA.headline}
        </h2>

        {/* Large Typography Statement */}
        <div
          className="text-[22px] sm:text-[34px] md:text-[42px] font-medium tracking-tight text-white/90 mb-8 select-none"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {PRICING_SECTION_DATA.statement}
        </div>

        {/* Interactive Workshop Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 p-1.5 rounded-2xl bg-white/[0.05] border border-white/10 max-w-3xl mb-10">
          <button
            type="button"
            onClick={() => setActiveTab('week299')}
            className={`flex-1 min-w-[155px] py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'week299'
                ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-black shadow-lg font-bold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>1-Week Pass</span>
            <span className="text-[11px] font-mono opacity-80">(₹299)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('demo')}
            className={`flex-1 min-w-[155px] py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'demo'
                ? 'bg-emerald-500 text-white shadow-lg font-bold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse shrink-0" />
            <span>30-Min Demo</span>
            <span className="text-[11px] font-mono opacity-90">(Free • 2 Days)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('master')}
            className={`flex-1 min-w-[150px] py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'master'
                ? 'bg-white text-black shadow-lg font-semibold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>7-Day Masterclass</span>
            <span className="text-[11px] font-mono opacity-80">(₹89)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sih')}
            className={`flex-1 min-w-[150px] py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'sih'
                ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-black shadow-lg font-bold'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-black shrink-0" />
            <span>SIH 2-Hr Sprint</span>
            <span className="text-[11px] font-mono opacity-80">(₹199)</span>
          </button>
        </div>

        {/* Single Dynamic Ticket Card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`p-6 sm:p-10 md:p-12 rounded-3xl border shadow-2xl relative overflow-hidden transition-all duration-300 ${
            activeTab === 'sih'
              ? 'border-amber-500/40 bg-amber-950/[0.08]'
              : activeTab === 'week299'
              ? 'border-amber-400/40 bg-amber-950/[0.06]'
              : activeTab === 'demo'
              ? 'border-emerald-500/40 bg-emerald-950/[0.06]'
              : 'border-white/20 bg-white/[0.04]'
          }`}
        >
          {/* Interactive Mouse Spotlight Glow */}
          <div
            ref={spotlightRef}
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(600px circle at -300px -300px, rgba(147, 51, 234, 0.15), transparent 75%)`,
            }}
          />

          {/* Subtle Ambient Glow Background Accent */}
          <div
            className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
              activeTab === 'sih' ? 'bg-amber-500/10' : 'bg-purple-500/10'
            }`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Workshop Scope & Details */}
            <div className="lg:col-span-7 space-y-6">
              {activeTab === 'demo' ? (
                <>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Special Invitation • Available for Next 2 Days Only</span>
                    </div>
                    <h3
                      className="text-2xl sm:text-3xl font-medium text-white tracking-tight"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      30-Minute Free Live Demo Class
                    </h3>
                    <p className="text-sm text-white/70 mt-1">
                      Join a free interactive live demonstration on Google Meet. Learn practical workflows with modern AI tools before enrolling in the full pass.
                    </p>
                  </div>

                  {/* Demo Features Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>100% Free Entry • No Card Needed</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Live on Google Meet (Next 2 Days Only)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Real-Time ChatGPT, Claude & Cursor Build</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Live Doubt Resolution with Harsh Lagwal</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Instant Google Meet Link via WhatsApp & Email</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Early-Bird ₹299 Pass Upgrade Option</span>
                    </div>
                  </div>

                  {/* Session Details Pills */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 text-xs font-mono text-white/60">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>30 Minutes Live Session</span>
                    </div>
                    <span>•</span>
                    <span>Google Meet</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">Valid for Next 2 Days Only</span>
                  </div>
                </>
              ) : activeTab === 'week299' ? (
                <>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Most Popular • Daily 9:00 PM on Google Meet</span>
                    </div>
                    <h3
                      className="text-2xl sm:text-3xl font-medium text-white tracking-tight"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      1-Week Live Masterclass Pass (All 9 Skills)
                    </h3>
                    <p className="text-sm text-white/70 mt-1">
                      Complete 7-day live interactive training on Google Meet covering prompt engineering, AI coding, visual creation, automations, and freelancing.
                    </p>
                  </div>

                  {/* 1-Week Pass Features Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Daily 9:00 PM Live on Google Meet</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>All 9 High-Income AI Skills Covered</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Skill India & upGrad Free Certificate Roadmap</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>IIT Kanpur Ambassador & Internship Guidance</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>100+ Production Prompts & ATS Resume Kit</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/90">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Direct WhatsApp Support & Code Reviews</span>
                    </div>
                  </div>

                  {/* Session Details Pills */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 text-xs font-mono text-white/60">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>9:00 PM – 10:30 PM IST Daily</span>
                    </div>
                    <span>•</span>
                    <span>Live on Google Meet</span>
                    <span>•</span>
                    <span>Hindi + English</span>
                  </div>
                </>
              ) : activeTab === 'master' ? (
                <>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
                      <Users className="w-3.5 h-3.5" />
                      <span>Strictly Capped at 20 Students / Daily Batch</span>
                    </div>
                    <h3
                      className="text-2xl sm:text-3xl font-medium text-white tracking-tight"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Complete 7-Day Live Masterclass
                    </h3>
                    <p className="text-sm text-white/70 mt-1">
                      All 9 high-income skills included in one single registration.
                    </p>
                  </div>

                  {/* 9 Skills Quick Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {WORKSHOP_TOPICS.map((topic) => (
                      <div key={topic.id} className="flex items-center gap-2 text-xs text-white/80">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{topic.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* Session Details Pills */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 text-xs font-mono text-white/60">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-white/50" />
                      <span>9:00 PM – 10:30 PM IST Daily</span>
                    </div>
                    <span>•</span>
                    <span>Live Interactive Zoom</span>
                    <span>•</span>
                    <span>Hindi + English</span>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-3">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Smart India Hackathon Special Sprint</span>
                    </div>
                    <h3
                      className="text-2xl sm:text-3xl font-medium text-white tracking-tight"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      SIH 2-Hour Intensive Masterclass
                    </h3>
                    <p className="text-sm text-white/70 mt-1">
                      Problem statement detailing, live AI MVP building, winning PPT deck & jury presentation.
                    </p>
                  </div>

                  {/* SIH Checklist */}
                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-start gap-2.5 text-xs text-white/85">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Comprehensive Detailing & PS Selection:</strong> Theme breakdown & college screening round clearing formula.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-white/85">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>AI-Powered Project Build:</strong> Live working prototype development with Cursor, Bolt.new, v0 & Supabase.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-white/85">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>SIH-Approved Winning Presentation:</strong> Architecture diagrams, novelty differentiation & social impact slides.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-white/85">
                      <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Jury Pitching & Viva Defense:</strong> 3-minute pitch script, presentation confidence & Q&A defense.</span>
                    </div>
                  </div>

                  {/* SIH Details Pills */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 text-xs font-mono text-white/60">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>2 Hours Live on Zoom</span>
                    </div>
                    <span>•</span>
                    <span>Includes SIH PPT Template & Recording</span>
                    <span>•</span>
                    <a href="#sih" className="text-amber-400 hover:underline">
                      View Full Details →
                    </a>
                  </div>
                </>
              )}
            </div>

            {/* Right Column: Price & Instant Action Box */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-black/75 border border-white/15 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/50 mb-1">
                  {activeTab === 'demo'
                    ? 'Free Demo Session Fee'
                    : activeTab === 'sih'
                    ? 'SIH Masterclass Fee'
                    : activeTab === 'week299'
                    ? '1-Week Pass Special Fee'
                    : 'Total One-Time Fee'}
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl sm:text-6xl font-bold tracking-tight text-white">
                    {activeTab === 'demo'
                      ? '₹0 Free'
                      : activeTab === 'sih'
                      ? SIH_WORKSHOP_DATA.price
                      : activeTab === 'week299'
                      ? '₹299'
                      : BRAND.price}
                  </span>
                  <span className="text-sm text-white/50 line-through">
                    {activeTab === 'demo'
                      ? '₹499'
                      : activeTab === 'sih'
                      ? SIH_WORKSHOP_DATA.originalPrice
                      : activeTab === 'week299'
                      ? '₹4,999'
                      : '₹2,499'}
                  </span>
                </div>
                <p
                  className={`text-xs font-mono mb-6 ${
                    activeTab === 'demo' || activeTab === 'master' ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {activeTab === 'demo'
                    ? '100% Free • No Payment Required • Instant Google Meet Link'
                    : `Zero commission • Direct UPI • Instant ${activeTab === 'week299' ? 'Google Meet' : 'Zoom'} Link`}
                </p>

                {/* Batch Urgency Box */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-6 text-xs text-white/80 space-y-1">
                  <div className="font-semibold text-white flex items-center justify-between">
                    <span>
                      {activeTab === 'demo'
                        ? 'Limited Validity:'
                        : activeTab === 'sih'
                        ? 'Batch Limit:'
                        : "Today's Batch Capacity:"}
                    </span>
                    <span
                      className={`font-mono ${
                        activeTab === 'demo'
                          ? 'text-emerald-400'
                          : activeTab === 'sih'
                          ? 'text-amber-400'
                          : activeTab === 'week299'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {activeTab === 'demo'
                        ? 'Next 2 Days Only'
                        : activeTab === 'sih'
                        ? '30 Teams Max'
                        : '20 Seats Only'}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    {activeTab === 'demo'
                      ? 'Free entry pass available strictly for the next 2 days. Experience live tool workflows and mentor interaction on Google Meet.'
                      : activeTab === 'sih'
                      ? '1 Ticket covers your entire team. Get direct access to PPT templates, AI prompts & live doubt clearing.'
                      : activeTab === 'week299'
                      ? 'Daily 9:00 PM live cohort capped to 20 students for interactive screen-share guidance and doubt solving.'
                      : 'We cap each batch to 20 students to guarantee individual attention and live screen-share reviews.'}
                  </p>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={handleCTA}
                className={`w-full py-4 rounded-full text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer active:scale-95 ${
                  activeTab === 'demo'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-white font-bold shadow-lg shadow-emerald-500/25'
                    : activeTab === 'week299'
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-black hover:opacity-95 font-bold shadow-amber-500/20'
                    : activeTab === 'sih'
                    ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 text-black hover:opacity-95 font-bold'
                    : 'bg-white hover:bg-neutral-200 text-black font-semibold'
                }`}
              >
                <span>
                  {activeTab === 'demo'
                    ? 'Join Free Demo Class (Only 2 Days) →'
                    : activeTab === 'week299'
                    ? 'Claim 1-Week Pass — ₹299'
                    : activeTab === 'sih'
                    ? 'Enroll in SIH Session — ₹199'
                    : "Enroll in Today's Batch — ₹89"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-white/50">
                <ShieldCheck
                  className={`w-3.5 h-3.5 ${
                    activeTab === 'sih' ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                />
                <span>Zero Risk • Instant Google Form Confirmation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Value Comparison */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <div className="text-xs font-mono uppercase text-red-400/80 mb-2">
              Traditional Online Bootcamps
            </div>
            <p className="text-white/60 leading-relaxed">
              {PRICING_SECTION_DATA.comparison.traditional}
            </p>
          </div>
          <div>
            <div className="text-xs font-mono uppercase text-emerald-400 mb-2">
              MASTER AI Live Masterclasses
            </div>
            <p className="text-white/90 leading-relaxed font-medium">
              Live hands-on building with direct mentor feedback, starting at just ₹89.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
