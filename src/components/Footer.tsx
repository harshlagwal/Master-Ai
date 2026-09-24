import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BRAND } from '../data';
import { MessageCircle, ShieldCheck, ArrowRight, Terminal, Activity } from 'lucide-react';

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
  const giantTextRef = useRef<HTMLDivElement | null>(null);

  // Dynamic Scroll Zoom: Links scroll progress directly to scale and typography
  // When scrolling down from header to footer: zooms smoothly in from 0.72x to 1.15x
  // When scrolling up from footer to header: zooms smoothly back out from 1.15x to 0.72x
  const { scrollYProgress } = useScroll({
    target: giantTextRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.72, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.4, 0.8, 1]);
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["0.06em", "-0.035em"]);
  const yOffset = useTransform(scrollYProgress, [0, 1], [25, 0]);
  return (
    <footer
      id="footer"
      className={`relative z-10 w-full pt-16 sm:pt-24 pb-8 px-4 sm:px-6 md:px-10 lg:px-14 border-t transition-colors duration-300 ${
        isDark
          ? 'bg-[#050506] text-neutral-400 border-white/[0.08]'
          : 'bg-[#FFFFFF] text-slate-600 border-slate-200'
      }`}
      style={{ fontFamily: 'var(--font-heading)' }}
    >
      {/* Background Architectural Grid Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] luxury-grid-dark"
        aria-hidden="true" 
      />

      <div className="relative max-w-7xl mx-auto flex flex-col gap-14 sm:gap-20">
        {/* SECTION 1: Current Active Data Section & Antigravity Manifesto */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/[0.08] dark:border-white/[0.08]">
          <div className="max-w-2xl">
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-mono tracking-tight mb-5 border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational • Batch 2026 Active</span>
            </div>

            {/* Antigravity Philosophical Poetic Quote */}
            <h3
              className={`text-xl sm:text-2xl md:text-3xl font-medium tracking-tight leading-snug mb-4 ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}
            >
              "We don't build software to replace human curiosity — we build to remove the gravity pulling it down."
            </h3>

            <p className={`text-xs sm:text-sm leading-relaxed max-w-xl font-normal ${isDark ? 'text-neutral-300' : 'text-slate-800'}`}>
              Master AI is an intensive proving ground engineered for developers, builders, and tinkerers. 
              Learn to command autonomous agents, deploy real full-stack systems, and turn ideas into verifiable code alongside {BRAND.mentor} ({BRAND.role}).
            </p>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onEnrollClick('master-pass')}
              className={`px-5 py-3 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
                isDark
                  ? 'bg-white text-black hover:bg-neutral-200'
                  : 'bg-slate-950 text-white hover:bg-slate-800'
              }`}
            >
              <span>Enroll Full Pass (₹89)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onWhatsAppClick}
              className={`px-4 py-3 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                isDark
                  ? 'border-white/15 bg-white/[0.03] text-neutral-300 hover:text-white hover:border-white/30'
                  : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Join Community</span>
            </button>
          </div>
        </div>

        {/* SECTION 2: Structured Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          {/* Column 1: Brand & Identity */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`text-base font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}
              >
                {BRAND.name}
              </span>
              <span className="text-amber-500 text-xs">✦</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                isDark ? 'border-white/10 bg-white/[0.04] text-neutral-300' : 'border-slate-300 bg-slate-100 text-slate-800'
              }`}>
                7-Day Live Masterclass
              </span>
            </div>
            <p className={`text-xs leading-relaxed mb-4 font-normal ${isDark ? 'text-neutral-300' : 'text-slate-800'}`}>
              9 High-Income AI skills taught live with hands-on projects, zero-friction UPI, and direct mentor access.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Strictly 20 Seats Daily</span>
            </div>
          </div>

          {/* Column 2: Program Navigation */}
          <div>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-4 ${isDark ? 'text-neutral-200' : 'text-slate-950'}`}>
              Program
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="#curriculum" className="google-link font-medium">
                  9 Core Skills
                </a>
              </li>
              <li>
                <a href="#journey" className="google-link font-medium">
                  7-Day Roadmap
                </a>
              </li>
              <li>
                <a href="#projects" className="google-link font-medium">
                  Portfolio Proof
                </a>
              </li>
              <li>
                <a href="#pricing" className="google-link font-medium">
                  Passes & Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="google-link font-medium">
                  Curriculum FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Verification & Mentor */}
          <div>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-4 ${isDark ? 'text-neutral-200' : 'text-slate-950'}`}>
              Leadership
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="#mentor" className="google-link font-medium">
                  {BRAND.mentor} ({BRAND.role})
                </a>
              </li>
              <li className={`font-normal ${isDark ? 'text-neutral-400' : 'text-slate-800'}`}>
                IIT Patna Alumni Network
              </li>
              <li className={`font-normal ${isDark ? 'text-neutral-400' : 'text-slate-800'}`}>
                AI Systems & Agentic Engineering
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onEnrollClick('demo-free')}
                  className="text-left google-link font-semibold cursor-pointer"
                >
                  30-Min Free Demo (₹0)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Protocols */}
          <div>
            <h4 className={`text-xs font-mono uppercase tracking-wider font-bold mb-4 ${isDark ? 'text-neutral-200' : 'text-slate-950'}`}>
              Protocols
            </h4>
            <ul className={`flex flex-col gap-2.5 font-normal ${isDark ? 'text-neutral-300' : 'text-slate-800'}`}>
              <li className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>Hands-on Code First</span>
              </li>
              <li className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Live Google Meet (8 PM IST)</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>100% Zero-Commission UPI</span>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onWhatsAppClick}
                  className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer mt-1 font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Developer Community</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 3: EXACT GOOGLE ANTIGRAVITY GIANT STATEMENT SECTION (CENTERED & DYNAMIC SCROLL ZOOM) */}
        <div ref={giantTextRef} className="pt-10 sm:pt-16 pb-2 select-none overflow-hidden text-center">
          <div className="w-full flex items-center justify-center text-center">
            <motion.h1
              style={{
                scale,
                opacity,
                letterSpacing,
                y: yOffset,
                transformOrigin: 'center center',
                fontFamily: 'var(--font-heading)',
                fontOpticalSizing: 'auto',
              }}
              className={`text-[12.5vw] sm:text-[14vw] font-normal sm:font-medium leading-[0.88] text-center will-change-transform select-none ${
                isDark ? 'text-white' : 'text-neutral-950'
              }`}
            >
              Master AI
            </motion.h1>
          </div>

          {/* Divider Matching Google Antigravity Screenshot */}
          <div className="w-full border-t border-black/10 dark:border-white/10 mt-8 sm:mt-12 mb-6" />

          {/* Bottom Bar: Left "Master AI" / Right Nav Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-normal">
            <div className={`font-semibold tracking-tight text-sm ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Master AI
            </div>

            <div className="flex flex-wrap items-center gap-5 sm:gap-8 text-xs font-medium">
              <a href="#mentor" className="google-link">
                About Mentor
              </a>
              <a href="#curriculum" className="google-link">
                Curriculum
              </a>
              <a href="#projects" className="google-link">
                Projects
              </a>
              <a href="#pricing" className="google-link">
                Pricing
              </a>
              <span className="google-link cursor-pointer" onClick={onWhatsAppClick}>
                Community
              </span>
              <span className={`cursor-default font-normal ${isDark ? 'text-neutral-500' : 'text-slate-600'}`}>
                Strictly 20 Seats Daily
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
