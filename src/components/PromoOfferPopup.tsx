import React, { useEffect, useState } from 'react';
import { X, Sparkles, ArrowRight, Zap, Award, GraduationCap } from 'lucide-react';
import { PROMO_OFFER_DATA } from '../data';

interface PromoOfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: (trackId: string) => void;
}

export const PromoOfferPopup: React.FC<PromoOfferPopupProps> = ({
  isOpen,
  onClose,
  onClaim,
}) => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = requestAnimationFrame(() => setAnimateIn(true));
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        cancelAnimationFrame(timer);
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      setAnimateIn(false);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Student Flash Launch Offer"
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 transition-all duration-300 ${
        animateIn ? 'bg-black/85 backdrop-blur-sm opacity-100' : 'bg-black/0 opacity-0 pointer-events-none'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Compact Modal Container (No Scrollbar, clean fit on all screens) */}
      <div
        className={`relative w-full max-w-[460px] rounded-2xl bg-[#0F0F12] border border-amber-400/30 text-white shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-4 sm:p-5 flex flex-col transition-all duration-300 will-change-transform ${
          animateIn ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-3 opacity-0'
        }`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute -top-16 -left-16 w-44 h-44 bg-amber-500/15 rounded-full blur-2xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-16 -right-16 w-44 h-44 bg-purple-500/15 rounded-full blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Close Button ('X') */}
        <button
          onClick={onClose}
          aria-label="Close offer announcement"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white/70 hover:text-white flex items-center justify-center transition-all z-20 border border-white/10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Badges */}
        <div className="flex items-center gap-2 mb-2 pr-8">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10.5px] font-semibold tracking-wide uppercase">
            <Sparkles className="w-3 h-3 text-amber-400" />
            {PROMO_OFFER_DATA.badge}
          </div>
          <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10.5px] font-semibold">
            {PROMO_OFFER_DATA.spotsLeft}
          </div>
        </div>

        {/* Main Headline (Clean English) */}
        <h2
          className="text-xl sm:text-2xl font-semibold tracking-tight text-white leading-tight mb-1"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {PROMO_OFFER_DATA.headline}
        </h2>

        {/* Subtitle */}
        <p className="text-[11.5px] sm:text-xs text-white/70 leading-normal mb-3">
          {PROMO_OFFER_DATA.subheadline}
        </p>

        {/* 3 Compact Value Items */}
        <div className="space-y-2 mb-3">
          {/* Feature 1: Complete Workshop */}
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/8 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-400/15 border border-amber-400/25 flex items-center justify-center shrink-0 text-amber-300">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-semibold text-white tracking-tight">
                7-Day Live Zoom Masterclass (All 9 Skills)
              </div>
              <div className="text-[11px] text-white/55 truncate">
                AI coding, prompt systems, presentations & prototypes
              </div>
            </div>
          </div>

          {/* Feature 2: Skill India & upGrad Certificate Guide */}
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/8 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-400/15 border border-emerald-400/25 flex items-center justify-center shrink-0 text-emerald-300">
              <Award className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-semibold text-white tracking-tight flex items-center gap-1.5">
                <span>Skill India & upGrad Free Certificates</span>
                <span className="text-[9px] px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold leading-none">
                  Verified ₹0
                </span>
              </div>
              <div className="text-[11px] text-white/55 truncate">
                Step-by-step roadmap to claim recognized digital credentials
              </div>
            </div>
          </div>

          {/* Feature 3: IIT Kanpur Internship & Campus Ambassador */}
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/8 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-400/15 border border-cyan-400/25 flex items-center justify-center shrink-0 text-cyan-300">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-semibold text-white tracking-tight flex items-center gap-1.5">
                <span>IIT Kanpur Free Internship & Ambassador</span>
                <span className="text-[9px] px-1 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold leading-none">
                  College
                </span>
              </div>
              <div className="text-[11px] text-white/55 truncate">
                Eligibility roadmap, SOP templates & LOR perks
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Strip */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-amber-500/15 via-white/[0.03] to-emerald-500/10 border border-amber-400/20 mb-2.5 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-300/80">
              Limited Flash Grant
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {PROMO_OFFER_DATA.offerPrice}
              </span>
              <span className="text-xs text-white/40 line-through">
                {PROMO_OFFER_DATA.originalPrice}
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-1.5 py-0.5 rounded">
                88% OFF
              </span>
            </div>
          </div>

          <div className="text-right text-[11px] text-white/60">
            <div className="text-emerald-400 font-semibold">Zero Commission UPI</div>
            <div className="text-[10px] text-white/40">Instant Zoom Credentials</div>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => {
            onClaim(PROMO_OFFER_DATA.trackId);
            onClose();
          }}
          className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-black font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(245,158,11,0.25)] active:scale-[0.98] transition-all cursor-pointer mb-2"
        >
          <span>Claim ₹60 Pass & Unlock Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Secondary Dismiss Button */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="text-[11px] text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            Skip and continue to website
          </button>
        </div>
      </div>
    </div>
  );
};
