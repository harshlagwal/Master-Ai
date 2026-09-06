import React, { useEffect, useState } from 'react';
import { X, Sparkles, ArrowRight, CheckCircle2, Video, Calendar, Clock, Award, ShieldCheck, Zap } from 'lucide-react';
import { WORKSHOP_POPUP_DATA } from '../data';

interface WorkshopOfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrack: (trackId: string) => void;
}

export const WorkshopOfferPopup: React.FC<WorkshopOfferPopupProps> = ({
  isOpen,
  onClose,
  onSelectTrack,
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
      aria-label="Master AI Live Class Selection"
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 transition-all duration-300 ${
        animateIn ? 'bg-black/85 backdrop-blur-md opacity-100' : 'bg-black/0 opacity-0 pointer-events-none'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Modal Container */}
      <div
        className={`relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0C0D11] border border-white/10 text-white shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-4 sm:p-6 sm:px-7 flex flex-col transition-all duration-300 will-change-transform ${
          animateIn ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'
        }`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {/* Subtle Ambient Glowing Backdrops */}
        <div
          className="absolute -top-20 -left-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Close Button ('X') */}
        <button
          onClick={onClose}
          aria-label="Close popup"
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white/70 hover:text-white flex items-center justify-center transition-all z-20 border border-white/10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badges & Headline */}
        <div className="text-center mb-4 sm:mb-5 pr-6 sm:pr-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10.5px] sm:text-xs font-semibold tracking-wide uppercase mb-2">
            <Video className="w-3.5 h-3.5" />
            <span>{WORKSHOP_POPUP_DATA.badge}</span>
          </div>
          <h2
            className="text-xl sm:text-3xl font-bold tracking-tight text-white leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {WORKSHOP_POPUP_DATA.headline}
          </h2>
          <p className="text-[12px] sm:text-[13px] text-white/70 max-w-xl mx-auto mt-1 sm:mt-1.5 leading-snug">
            {WORKSHOP_POPUP_DATA.subheadline}
          </p>
        </div>

        {/* 2 Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 mb-4 sm:mb-5">
          {/* CARD 1: 30-Min Free Demo Class */}
          <div className="relative rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 p-4 sm:p-5 flex flex-col justify-between transition-all group">
            <div>
              {/* Top Card Badge */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  {WORKSHOP_POPUP_DATA.demoCard.badge}
                </span>
                <span className="text-[10px] text-white/50 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-white/40" />
                  {WORKSHOP_POPUP_DATA.demoCard.timing}
                </span>
              </div>

              {/* Card Title & Platform */}
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1">
                {WORKSHOP_POPUP_DATA.demoCard.title}
              </h3>
              <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-400/90 font-medium mb-3">
                <Video className="w-3.5 h-3.5" />
                <span>{WORKSHOP_POPUP_DATA.demoCard.format}</span>
              </div>

              {/* Feature Points */}
              <ul className="space-y-2 mb-4">
                {WORKSHOP_POPUP_DATA.demoCard.perks.map((perk, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[11.5px] sm:text-xs text-white/80 leading-snug">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price & CTA */}
            <div>
              <div className="flex items-baseline gap-2 mb-3 pt-2 border-t border-white/10">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  {WORKSHOP_POPUP_DATA.demoCard.price}
                </span>
                <span className="text-xs text-emerald-400 font-semibold">
                  {WORKSHOP_POPUP_DATA.demoCard.priceLabel}
                </span>
              </div>

              <button
                onClick={() => {
                  onSelectTrack(WORKSHOP_POPUP_DATA.demoCard.id);
                  onClose();
                }}
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-white/10 hover:bg-emerald-600 hover:text-white text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/15 hover:border-emerald-500 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
              >
                <span>{WORKSHOP_POPUP_DATA.demoCard.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CARD 2: 1-Week Masterclass Pass (₹299) */}
          <div className="relative rounded-2xl bg-gradient-to-b from-amber-500/10 via-amber-500/[0.04] to-transparent border-2 border-amber-400/40 hover:border-amber-400 p-4 sm:p-5 flex flex-col justify-between transition-all shadow-[0_10px_35px_rgba(245,158,11,0.12)]">
            {/* Best Value Highlight Pill */}
            <div className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[10px] font-extrabold uppercase tracking-wider shadow-md">
              {WORKSHOP_POPUP_DATA.weekPassCard.badge}
            </div>

            <div>
              {/* Timing info */}
              <div className="flex items-center justify-between gap-2 mb-2 mt-1">
                <span className="text-[10px] text-amber-300 font-bold tracking-wide uppercase flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  {WORKSHOP_POPUP_DATA.weekPassCard.timing}
                </span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                  Daily 9:00 PM
                </span>
              </div>

              {/* Title & Platform */}
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1">
                {WORKSHOP_POPUP_DATA.weekPassCard.title}
              </h3>
              <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-amber-300 font-semibold mb-3">
                <Video className="w-3.5 h-3.5 text-amber-400" />
                <span>{WORKSHOP_POPUP_DATA.weekPassCard.format}</span>
              </div>

              {/* Perks */}
              <ul className="space-y-2 mb-4">
                {WORKSHOP_POPUP_DATA.weekPassCard.perks.map((perk, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[11.5px] sm:text-xs text-white/90 leading-snug">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price & CTA */}
            <div>
              <div className="flex items-baseline gap-2 mb-3 pt-2 border-t border-white/10">
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  {WORKSHOP_POPUP_DATA.weekPassCard.price}
                </span>
                <span className="text-xs text-white/40 line-through">
                  {WORKSHOP_POPUP_DATA.weekPassCard.originalPrice}
                </span>
                <span className="text-[10px] font-bold bg-amber-400 text-black px-1.5 py-0.5 rounded ml-auto">
                  88% OFF
                </span>
              </div>

              <button
                onClick={() => {
                  onSelectTrack(WORKSHOP_POPUP_DATA.weekPassCard.id);
                  onClose();
                }}
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>{WORKSHOP_POPUP_DATA.weekPassCard.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* 9 Core Skills Banner */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/8 p-3 sm:p-3.5 mb-3">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-white/90 mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>9 High-Income Skills Taught in the 1-Week Workshop:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {WORKSHOP_POPUP_DATA.skills.map((skill, i) => (
              <span
                key={i}
                className="text-[10px] sm:text-[11px] px-2 py-0.5 sm:py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 font-medium"
              >
                {i + 1}. {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Trust Note & Skip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left pt-1">
          <div className="flex items-center gap-1.5 text-[10.5px] sm:text-xs text-white/50">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct Google Meet Invite Link • Zero Hidden Charges</span>
          </div>
          <button
            onClick={onClose}
            className="text-[11px] text-white/50 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
          >
            Continue to website
          </button>
        </div>
      </div>
    </div>
  );
};
