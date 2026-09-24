import React, { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { HERO_DATA } from '../data';
import { Zap, ArrowRight, ShieldCheck, Users } from 'lucide-react';
import { AIChatHero } from '@/components/ui/AIChatHero';



interface HeroSectionProps {
  onJoinClick: (trackId?: string) => void;
  onWhatsAppClick: () => void;
  isDark?: boolean;
  onRobotLoaded?: () => void;
}

const HeroTypewriterSubtitle: React.FC<{
  text: string;
  enabled: boolean;
  isDark: boolean;
}> = React.memo(({ text, enabled, isDark }) => {
  const { displayed, done } = useTypewriter(text, 28, 200, enabled);
  return (
    <div
      className={`mb-6 text-sm sm:text-base lg:text-[17px] font-normal leading-relaxed max-w-xl transition-colors min-h-[48px] sm:min-h-[44px] ${
        isDark ? 'text-neutral-300' : 'text-slate-700'
      }`}
    >
      <span>{displayed}</span>
      {!done && (
        <span
          className={`inline-block w-[2px] h-[0.95em] align-middle ml-1.5 animate-blink ${
            isDark ? 'bg-neutral-300' : 'bg-slate-900'
          }`}
          aria-hidden="true"
        />
      )}
    </div>
  );
});

export const HeroSection: React.FC<HeroSectionProps> = ({
  onJoinClick,
  isDark = true,
  onRobotLoaded,
}) => {
  const [showHeadline, setShowHeadline] = useState(false);
  const [showPills, setShowPills] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const heroRef = React.useRef<HTMLElement | null>(null);

  const typewriterText =
    "Build real AI apps, automate workflows & launch verifiable proof with mentor Harsh Lagwal (IIT Patna).";

  // Entrance animations sequence when website opens
  useEffect(() => {
    const hTimer = setTimeout(() => setShowHeadline(true), 50);
    const pTimer = setTimeout(() => setShowPills(true), 140);
    const dTimer = setTimeout(() => {
      setDashboardVisible(true);
      onRobotLoaded?.(); // Signal loader immediately — no WebGL wait
    }, 300);

    return () => {
      clearTimeout(hTimer);
      clearTimeout(pTimer);
      clearTimeout(dTimer);
    };
  }, [onRobotLoaded]);

  const scrollToCurriculum = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('curriculum');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative z-10 w-full min-h-[calc(100vh-60px)] flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 md:px-10 lg:px-14 overflow-hidden"
    >
      {/* Ambient background glow - smooth zero-lag radial lighting (0 GPU blur cost) */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[380px] sm:h-[550px] rounded-full pointer-events-none -z-10 transition-opacity duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, rgba(251,191,36,0.12) 0%, rgba(59,130,246,0.08) 40%, rgba(168,85,247,0.04) 60%, transparent 75%)'
            : 'radial-gradient(ellipse at center, rgba(251,191,36,0.18) 0%, rgba(59,130,246,0.12) 40%, rgba(168,85,247,0.06) 60%, transparent 75%)',
        }}
      />

      {/* Open, unboxed Hero Content */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 min-h-[520px]">
        {/* Left Column: Typography, Value Proposition & CTAs (Appears 3rd, after tools) */}
        <div
          className="lg:col-span-7 flex flex-col justify-center transition-all duration-700 ease-out"
          style={{
            opacity: showHeadline ? 1 : 0,
            transform: showHeadline ? 'translateY(0)' : 'translateY(18px)',
          }}
        >
          {/* Universal domain pill matching image 2 reference */}
          <div
            className={`mb-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-tight w-fit transition-all duration-300 ${
              isDark
                ? 'bg-amber-500/[0.06] border-amber-400/40 text-amber-300'
                : 'bg-amber-500/[0.08] border-amber-500/40 text-amber-700'
            }`}
          >
            <span>🎓</span>
            <span className="font-semibold">IIT PATNA SCHOLAR</span>
            <span className="opacity-40">•</span>
            <span>MBA IN GEN AI & DATA SCIENCE</span>
          </div>

          {/* Animated Headline: Master 9 In-Demand AI Skills matching Antigravity 2.0 */}
          <h1
            id="hero-headline"
            className={`mb-4 font-normal sm:font-medium tracking-tight leading-[1.2] text-3xl sm:text-4xl lg:text-[3rem] transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span>Master </span>
            <span className={`${isDark ? 'text-white' : 'text-slate-950'} font-normal sm:font-medium underline decoration-white/20 underline-offset-8`}>
              9 In-Demand AI Skills
            </span>
            <span> in 7 Live Days.</span>
          </h1>

          {/* Typewriter Dynamic Subtitle - Isolated to prevent HeroSection re-renders */}
          <HeroTypewriterSubtitle
            text={typewriterText}
            enabled={showHeadline}
            isDark={isDark}
          />

          {/* Action pill buttons - Clean Google Antigravity style */}
          <div
            id="action-pills-container"
            className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-2"
            style={{
              opacity: showPills ? 1 : 0,
              transform: showPills ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Primary Action: Enroll Full Pass ₹89 */}
            <button
              type="button"
              onClick={() => onJoinClick('master-pass')}
              title="Reserve complete 7-day seat for ₹89"
              className={`inline-flex items-center justify-center font-medium rounded-full text-xs sm:text-sm px-5 py-2.5 whitespace-nowrap gap-1.5 transition-all duration-200 cursor-pointer shadow-sm active:scale-95 ${
                isDark
                  ? 'text-black bg-white hover:bg-neutral-200'
                  : 'text-white bg-slate-950 hover:bg-slate-800'
              }`}
            >
              <span>Enroll Pass (₹89)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* 1-Week Pass (₹299) Pill */}
            <button
              type="button"
              onClick={() => onJoinClick('week-pass-299')}
              title="Claim 1-Week Live Masterclass Pass — ₹299"
              className={`inline-flex items-center justify-center font-medium rounded-full text-xs sm:text-sm px-4 sm:px-5 py-2.5 whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 gap-1.5 border ${
                isDark
                  ? 'border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white'
                  : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-800'
              }`}
            >
              <span>1-Week Pass (₹299)</span>
            </button>

            {/* 30-Min Demo (Free) Pill */}
            <button
              type="button"
              onClick={() => onJoinClick('demo-free')}
              title="Join 30-Minute Free Live Demo"
              className={`inline-flex items-center justify-center font-medium rounded-full text-xs sm:text-sm px-4 py-2.5 whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 gap-1.5 border ${
                isDark
                  ? 'border-white/15 bg-white/[0.04] text-neutral-200 hover:bg-white/[0.08]'
                  : 'border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>30-Min Demo (Free)</span>
            </button>

            {/* 9 Core Skills Anchor */}
            <a
              href="#curriculum"
              onClick={scrollToCurriculum}
              className={`google-link inline-flex items-center justify-center font-medium text-xs sm:text-sm px-3.5 py-2 whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isDark
                  ? 'text-neutral-400 hover:text-white'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              <span>9 Core Skills</span>
            </a>
          </div>

          {/* Trust Badges & Metrics Row with Antigravity Monospace Precision */}
          <div
            className={`mt-8 pt-4 border-t flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs transition-colors ${
              isDark ? 'border-white/[0.08] text-neutral-400' : 'border-slate-200 text-slate-600'
            }`}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.02]">
              <Users className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="font-mono text-[11px] font-medium">Strictly 20 Seats Daily</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.02]">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="font-mono text-[11px] font-medium">Zero-Commission Direct UPI</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.02]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
              <span className="font-mono text-[11px] font-medium">Live 8:00 PM IST • Meet</span>
            </div>
          </div>

          {/* AI Proving Ground hint */}
          <div
            className={`mt-3.5 text-[11px] font-mono flex items-center gap-2 select-none transition-colors ${
              isDark ? 'text-neutral-500' : 'text-slate-500'
            }`}
          >
            <div className="w-5 h-5 rounded border border-white/10 bg-white/[0.02] flex items-center justify-center shrink-0">
              <Zap className="w-3 h-3 text-neutral-400" />
            </div>
            <span>Live AI Assistant · Watch it answer real questions</span>
          </div>
        </div>

        {/* Right Column: AI Proving Ground — Zero-lag interactive dashboard */}
        <div
          className="lg:col-span-5 relative w-full h-[480px] sm:h-[520px] md:h-[540px] lg:h-[600px] flex items-center justify-center"
        >
          {/* Ambient glow behind dashboard */}
          <div
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              background: isDark
                ? 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.12) 0%, rgba(6,182,212,0.07) 50%, transparent 80%)'
                : 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.10) 0%, rgba(6,182,212,0.06) 50%, transparent 80%)',
            }}
          />

          {/* Dashboard with entrance animation */}
          <div
            className="w-full h-full relative flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: dashboardVisible ? 1 : 0,
              transform: dashboardVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
            }}
          >
            <AIChatHero
              isDark={isDark}
              onLoad={() => onRobotLoaded?.()}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
