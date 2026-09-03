import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import { BRAND } from '../data';

interface StickyQuickEnrollBarProps {
  onJoinClick: () => void;
}

export const StickyQuickEnrollBar: React.FC<StickyQuickEnrollBarProps> = ({ onJoinClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 450;
          setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Quick registration bar"
          className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-40 px-3 sm:px-6 pointer-events-none flex justify-center"
        >
          <div className="pointer-events-auto w-full max-w-2xl rounded-2xl sm:rounded-full bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/20 px-4 sm:px-6 py-3 sm:py-3.5 shadow-2xl flex items-center justify-between gap-3 sm:gap-4 relative overflow-hidden">
            {/* Ambient Shimmer Beam Background */}
            <div className="absolute inset-0 animate-shimmer pointer-events-none" />

            {/* Left Info Column */}
            <div className="flex items-center gap-3 min-w-0 relative z-10">
              <div className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </div>

              <div className="truncate">
                <div className="flex items-center gap-2">
                  <span className="text-white text-[13px] sm:text-[14px] font-medium tracking-tight truncate">
                    MASTER AI 7-Day Live Masterclass
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 whitespace-nowrap">
                    20 Seats/Day
                  </span>
                </div>
                <div className="text-[11px] sm:text-[12px] text-white/60 font-mono flex items-center gap-2">
                  <span className="text-white font-semibold">{BRAND.price}</span>
                  <span>•</span>
                  <span className="truncate">Live Project Building + 100+ AI Prompts & Tools</span>
                </div>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 relative z-10 shrink-0">
              <button
                type="button"
                onClick={onJoinClick}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black text-[12px] sm:text-[13px] font-semibold uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>Enroll — {BRAND.price}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsDismissed(true)}
                title="Dismiss"
                aria-label="Dismiss quick bar"
                className="p-1.5 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
