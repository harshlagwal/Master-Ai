import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { BRAND } from '../data';

interface SectionFinalBannerProps {
  isDark?: boolean;
  onEnrollClick: (trackId?: string) => void;
  onWhatsAppClick: () => void;
}

export const SectionFinalBanner: React.FC<SectionFinalBannerProps> = ({
  isDark = true,
  onEnrollClick,
  onWhatsAppClick,
}) => {
  return (
    <section className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-14 py-16">
      <div
        className={`max-w-7xl mx-auto rounded-3xl p-6 sm:p-12 md:p-16 border text-center relative overflow-hidden transition-all duration-300 ${
          isDark
            ? 'bg-gradient-to-b from-white/[0.08] to-white/[0.02] border-white/15 text-white shadow-2xl'
            : 'bg-gradient-to-b from-slate-900 to-slate-950 text-white border-slate-800 shadow-2xl'
        }`}
      >
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Strictly Limited to 20 Students / Batch</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Stop Watching AI Tutorials.
            <br />
            Start Building Real Systems.
          </h2>

          <p className="text-xs sm:text-base text-neutral-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Join Harsh Lagwal for 7 evenings of hands-on artificial intelligence, agentic automation, and real build proof. All for just ₹89.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => onEnrollClick('master-pass')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-black font-extrabold text-xs sm:text-sm hover:bg-neutral-200 transition-all shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Enroll for Full 7 Days • ₹89</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => onEnrollClick('week-pass-299')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-black font-extrabold text-xs sm:text-sm hover:opacity-90 transition-all shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 shrink-0" />
              <span>Claim 1-Week VIP Pass • ₹299</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Direct Zero-Commission UPI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Instant Confirmation on WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
