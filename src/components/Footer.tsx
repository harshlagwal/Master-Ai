import React from 'react';
import { BRAND, SOCIAL_LINKS } from '../data';
import { MessageCircle, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  isDark?: boolean;
  onWhatsAppClick: () => void;
  onEnrollClick: (trackId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  isDark = true,
  onWhatsAppClick,
  onEnrollClick,
}) => {
  return (
    <footer
      id="footer"
      className={`relative z-10 w-full py-10 sm:py-12 px-4 sm:px-6 md:px-10 lg:px-14 border-t transition-colors duration-300 ${
        isDark
          ? 'bg-[#070707] text-neutral-400 border-white/10'
          : 'bg-white text-slate-600 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand & Mentor details */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-lg sm:text-xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {BRAND.name}
            </span>
            <span className="text-amber-400 text-xs">✦</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10">
              7-Day Live Intensive
            </span>
          </div>

          <p className={`text-xs max-w-md leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
            {BRAND.coreMessage}. Mentored by {BRAND.mentor} ({BRAND.role}).
          </p>

          <div className={`mt-3 flex items-center gap-2 text-[11px] ${isDark ? 'text-neutral-400' : 'text-slate-600 font-medium'}`}>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>Strictly 20 Students / Batch • 100% Zero-Commission UPI</span>
          </div>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold">
          <a href="#curriculum" className={`transition-colors ${isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'}`}>
            Curriculum
          </a>
          <a href="#journey" className={`transition-colors ${isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'}`}>
            7-Day Journey
          </a>
          <a href="#projects" className={`transition-colors ${isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'}`}>
            Projects
          </a>
          <a href="#mentor" className={`transition-colors ${isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'}`}>
            Mentor
          </a>
          <a href="#pricing" className={`transition-colors ${isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'}`}>
            Pricing
          </a>
          <button
            type="button"
            onClick={onWhatsAppClick}
            className="transition-colors flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400 cursor-pointer hover:underline font-bold"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Community</span>
          </button>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onEnrollClick('master-pass')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm active:scale-95 ${
              isDark
                ? 'bg-white text-black hover:bg-neutral-200'
                : 'bg-slate-950 text-white hover:bg-slate-800'
            }`}
          >
            Enroll Pass (₹89)
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
        <div>
          © {new Date().getFullYear()} MASTER AI. All rights reserved.
        </div>
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          <span>for real AI builders.</span>
        </div>
      </div>
    </footer>
  );
};
