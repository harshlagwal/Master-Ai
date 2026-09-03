import React, { useRef } from 'react';
import { PRICING_SECTION_DATA, PAYMENT_URL, WORKSHOP_TOPICS, BRAND } from '../data';
import { Check, ArrowRight, ShieldCheck, Users, Clock } from 'lucide-react';

interface SectionPricingProps {
  onJoinClick: () => void;
}

export const SectionPricing: React.FC<SectionPricingProps> = ({ onJoinClick }) => {
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
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(147, 51, 234, 0.15), transparent 75%)`;
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
      onJoinClick();
    }
  };

  return (
    <section
      id="pricing"
      className="relative z-10 w-full py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#0A0A0A] text-white border-t border-white/10"
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
          className="text-[22px] sm:text-[34px] md:text-[42px] font-medium tracking-tight text-white/90 mb-10 select-none"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {PRICING_SECTION_DATA.statement}
        </div>

        {/* Philosophy Copy */}
        <div className="space-y-4 text-[16px] sm:text-[18px] text-white/75 leading-relaxed font-normal max-w-3xl mb-12">
          {PRICING_SECTION_DATA.copy.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Single Unified Ticket Card (No Passes, No Confusion) */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="p-6 sm:p-10 md:p-12 rounded-3xl border border-white/20 bg-white/[0.04] shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-white/40"
        >
          {/* Interactive Mouse Spotlight Glow (Direct DOM GPU rendering, 0 React re-renders) */}
          <div
            ref={spotlightRef}
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(600px circle at -300px -300px, rgba(147, 51, 234, 0.15), transparent 75%)`,
            }}
          />

          {/* Subtle Ambient Glow Background Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Workshop Scope & Skills */}
            <div className="lg:col-span-7 space-y-6">
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
                {WORKSHOP_TOPICS.map((topic, i) => (
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
            </div>

            {/* Right Column: Price & Instant Action Box */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-black/60 border border-white/15 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/50 mb-1">
                  Total One-Time Fee
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl sm:text-6xl font-bold tracking-tight text-white">
                    {BRAND.price}
                  </span>
                  <span className="text-sm text-white/50 line-through">₹2,499</span>
                </div>
                <p className="text-xs text-emerald-400 font-mono mb-6">
                  Zero commission • Direct UPI • Instant Zoom Link
                </p>

                {/* Batch Urgency Box */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-6 text-xs text-white/80 space-y-1">
                  <div className="font-semibold text-white flex items-center justify-between">
                    <span>Today's Batch Capacity:</span>
                    <span className="text-emerald-400 font-mono">20 Seats Only</span>
                  </div>
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    We cap each batch to 20 students to guarantee individual attention and live screen-share reviews.
                  </p>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={handleCTA}
                className="w-full py-4 rounded-full bg-white hover:bg-neutral-200 text-black text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer active:scale-95"
              >
                <span>Enroll in Today's Batch — ₹89</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-white/50">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
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
              MASTER AI Live Masterclass
            </div>
            <p className="text-white/90 leading-relaxed font-medium">
              {PRICING_SECTION_DATA.comparison.masterAi}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
