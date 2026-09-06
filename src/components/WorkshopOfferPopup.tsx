import React, { useEffect, useState } from 'react';
import { X, Sparkles, ArrowRight, CheckCircle2, Video, Calendar, Clock, ShieldCheck } from 'lucide-react';
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
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 transition-all duration-300 ${
        animateIn ? 'bg-black/85 backdrop-blur-md opacity-100' : 'bg-black/0 opacity-0 pointer-events-none'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Modal Container: Compact, sleek, and strictly non-scrollable */}
      <div
        className={`relative w-full max-w-[680px] rounded-2xl bg-[#0D0E12] border border-white/12 text-white shadow-[0_20px_60px_rgba(0,0,0,0.95)] p-4 sm:p-5 flex flex-col overflow-hidden transition-all duration-300 will-change-transform ${
          animateIn ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-3 opacity-0'
        }`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {/* Subtle Ambient Glowing Backdrops */}
        <div
          className="absolute -top-24 -left-24 w-52 h-52 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -right-24 w-52 h-52 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Close Button ('X') */}
        <button
          onClick={onClose}
          aria-label="Close popup"
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white/70 hover:text-white flex items-center justify-center transition-all z-20 border border-white/10 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Compact Header */}
        <div className="text-center mb-3 sm:mb-3.5 pr-6 sm:pr-0">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold uppercase tracking-wide mb-1">
            <Video className="w-3 h-3" />
            <span>LIVE ON GOOGLE MEET</span>
          </div>
          <h2
            className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-snug"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {WORKSHOP_POPUP_DATA.headline}
          </h2>
          <p className="text-[11px] sm:text-[12px] text-white/65 max-w-md mx-auto leading-normal">
            Attend the free 30-min live demo or get full 1-week masterclass access.
          </p>
        </div>

        {/* 2 Offer Cards Grid (Side-by-side on tablet/desktop, compact) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-3">
          {/* CARD 1: 30-Min Free Demo Class */}
          <div className="relative rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 p-3 sm:p-3.5 flex flex-col justify-between transition-all">
            <div>
              {/* Top Meta */}
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9.5px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>100% FREE</span>
                </span>
                <span className="text-[10px] text-white/50 font-medium flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-white/40" />
                  <span>30-Min Demo</span>
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mb-0.5">
                30-Min Live Demo
              </h3>
              <div className="text-[10.5px] text-emerald-400/90 font-medium mb-2 flex items-center gap-1">
                <Video className="w-3 h-3" />
                <span>Google Meet Interactive</span>
              </div>

              {/* 3 Compact Perks */}
              <ul className="space-y-1.5 mb-2.5">
                <li className="flex items-start gap-1.5 text-[11px] text-white/80 leading-tight">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Free entry for next 2 days</span>
                </li>
                <li className="flex items-start gap-1.5 text-[11px] text-white/80 leading-tight">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                  <span>ChatGPT, Claude 3.5 & Cursor live breakdown</span>
                </li>
                <li className="flex items-start gap-1.5 text-[11px] text-white/80 leading-tight">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Live interactive Q&A with Harsh Lagwal</span>
                </li>
              </ul>
            </div>

            {/* Price & CTA */}
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-xl sm:text-2xl font-extrabold text-white">₹0</span>
                <span className="text-[11px] text-emerald-400 font-semibold">Free Access</span>
              </div>

              <button
                onClick={() => {
                  onSelectTrack(WORKSHOP_POPUP_DATA.demoCard.id);
                  onClose();
                }}
                className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-emerald-600 hover:text-white text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/15 hover:border-emerald-500 transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>Join Free Demo (2 Days)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* CARD 2: 1-Week Masterclass Pass (₹299) */}
          <div className="relative rounded-xl bg-gradient-to-b from-amber-500/10 via-amber-500/[0.04] to-transparent border-2 border-amber-400/50 hover:border-amber-400 p-3 sm:p-3.5 flex flex-col justify-between transition-all shadow-[0_8px_25px_rgba(245,158,11,0.12)]">
            {/* Best Value Highlight Pill */}
            <div className="absolute -top-2.5 left-3 px-2 py-0.2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[9px] font-extrabold uppercase tracking-wider shadow-sm">
              BEST VALUE • 88% OFF
            </div>

            <div>
              {/* Timing info */}
              <div className="flex items-center justify-between gap-1 mb-1.5 mt-0.5">
                <span className="text-[10px] text-amber-300 font-bold tracking-wide uppercase flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5 text-amber-400" />
                  <span>Full 7 Days</span>
                </span>
                <span className="text-[9.5px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-bold">
                  Daily 9:00 PM
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mb-0.5">
                1-Week Workshop Pass
              </h3>
              <div className="text-[10.5px] text-amber-300 font-semibold mb-2 flex items-center gap-1">
                <Video className="w-3 h-3 text-amber-400" />
                <span>Google Meet Live Class</span>
              </div>

              {/* 3 Compact Perks */}
              <ul className="space-y-1.5 mb-2.5">
                <li className="flex items-start gap-1.5 text-[11px] text-white/90 leading-tight">
                  <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                  <span>Complete 7 days hands-on live building</span>
                </li>
                <li className="flex items-start gap-1.5 text-[11px] text-white/90 leading-tight">
                  <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                  <span>Skill India, upGrad certs & IIT internship guide</span>
                </li>
                <li className="flex items-start gap-1.5 text-[11px] text-white/90 leading-tight">
                  <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                  <span>100+ production prompts & ATS resume kits</span>
                </li>
              </ul>
            </div>

            {/* Price & CTA */}
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-xl sm:text-2xl font-extrabold text-white">₹299</span>
                <span className="text-[11px] text-white/40 line-through">₹2,499</span>
                <span className="text-[9.5px] font-bold bg-amber-400 text-black px-1.5 py-0.2 rounded ml-auto">
                  88% OFF
                </span>
              </div>

              <button
                onClick={() => {
                  onSelectTrack(WORKSHOP_POPUP_DATA.weekPassCard.id);
                  onClose();
                }}
                className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>Claim ₹299 Week Pass</span>
                <ArrowRight className="w-3 h-3 text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* Compact Footer Line (Zero extra height, prevents any scrolling) */}
        <div className="flex items-center justify-between gap-2 pt-1 text-[10.5px] text-white/50 border-t border-white/8">
          <div className="flex items-center gap-1 text-white/60 truncate">
            <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">Google Meet Invite sent on WhatsApp & Email</span>
          </div>
          <button
            onClick={onClose}
            className="text-[10.5px] text-white/50 hover:text-white underline underline-offset-2 shrink-0 transition-colors cursor-pointer"
          >
            Skip to website
          </button>
        </div>
      </div>
    </div>
  );
};
