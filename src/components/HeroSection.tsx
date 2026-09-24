import React, { useState, useEffect, useCallback } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { HERO_DATA } from '../data';
import { Sparkles, Bot, Zap, ArrowRight, ShieldCheck, Users } from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';

const AI_ORBIT_TOOLS = [
  {
    name: 'ChatGPT',
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 opacity-80" fill="currentColor">
        <path d="M22.28 9.82a5.98 5.98 0 0 0-.51-4.91 6.05 6.05 0 0 0-6.51-2.9A6.06 6.06 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.52 2.9A5.98 5.98 0 0 0 13.26 24a6.06 6.06 0 0 0 5.77-4.2 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.08zM13.26 22.43a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.8.8 0 0 0 .39-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.05v5.59a4.5 4.5 0 0 1-4.49 4.49zm-9.66-4.29a4.48 4.48 0 0 1-.54-3.01l.15.08 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06L9.74 19.95a4.5 4.5 0 0 1-6.14-1.81zm-1.07-9.52a4.46 4.46 0 0 1 2.34-1.97v5.68a.79.79 0 0 0 .4.68l5.84 3.37-2.02 1.17a.08.08 0 0 1-.07 0l-4.84-2.8a4.5 4.5 0 0 1-1.65-6.13zm16.55 3.38l-5.85-3.37 2.02-1.17a.08.08 0 0 1 .07 0l4.84 2.8a4.5 4.5 0 0 1-.68 8.09v-5.67a.79.79 0 0 0-.4-.68zm2.02-3.14l-.14-.08-4.78-2.76a.77.77 0 0 0-.78 0L9.55 9.2V6.87a.08.08 0 0 1 .03-.06L14.42 3.95a4.5 4.5 0 0 1 6.68 4.86zM8.7 14.83v-5.66a.79.79 0 0 0-.39-.68L6.3 7.32a.07.07 0 0 1-.04-.05V1.68a4.5 4.5 0 0 1 4.5-4.49c1.06 0 2.07.38 2.87 1.04l-.14.08-4.78 2.76zm1.1-2.32l2.2-1.27 2.2 1.27v2.55l-2.2 1.27-2.2-1.27z" />
      </svg>
    ),
  },
  {
    name: 'Claude',
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 opacity-80" fill="currentColor">
        <path d="M12 2a1 1 0 0 1 1 1v2.1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 15.8a1 1 0 0 1 1 1V21a1 1 0 0 1-2 0v-2.2a1 1 0 0 1 1-1zm8.5-7.8a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2.1a1 1 0 0 1 0-2H20.5zm-14.8 0a1 1 0 0 1 0 2H3.5a1 1 0 0 1 0-2h2.2zm11.37-4.96a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.41l-1.55 1.56a1 1 0 0 1-1.42-1.42l1.56-1.55zm-8.94 8.94a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.41l-1.56 1.56a1 1 0 1 1-1.41-1.42l1.56-1.55zm0-8.94l1.56 1.55a1 1 0 0 1-1.42 1.42L4.93 6.45a1 1 0 0 1 0-1.41 1 1 0 0 1 1.41 0zm8.94 8.94l1.55 1.55a1 1 0 0 1-1.41 1.42l-1.56-1.56a1 1 0 0 1 1.42-1.41zM12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z" />
      </svg>
    ),
  },
  {
    name: 'Cursor',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-3.5 h-3.5 shrink-0 opacity-80"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    name: 'Midjourney',
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 opacity-80" fill="currentColor">
        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.2l6 3.75v3.2L12 7.4 6 11.15v-3.2l6-3.75zM6 13.1l5 3.1v4.2l-5-3.1v-4.2zm12 4.2l-5 3.1v-4.2l5-3.1v4.2z" />
      </svg>
    ),
  },
  {
    name: 'Gemini',
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 opacity-80" fill="currentColor">
        <path d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z" />
      </svg>
    ),
  },
];

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
  const [isRobotLoaded, setIsRobotLoaded] = useState(false);
  const [robotEntered, setRobotEntered] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showHeadline, setShowHeadline] = useState(false);
  const [showPills, setShowPills] = useState(false);
  const heroRef = React.useRef<HTMLElement | null>(null);

  const typewriterText =
    "Build real AI apps, automate workflows & launch verifiable proof with mentor Harsh Lagwal (IIT Patna).";

  // Called strictly when Spline 3D canvas finishes downloading & compiling WebGL
  const handleRobotLoaded = useCallback(() => {
    setIsRobotLoaded(true);
    setRobotEntered(true);
    onRobotLoaded?.();
  }, [onRobotLoaded]);

  // Entrance animations sequence when website opens
  useEffect(() => {
    const hTimer = setTimeout(() => setShowHeadline(true), 50);
    const pTimer = setTimeout(() => setShowPills(true), 140);
    const tTimer = setTimeout(() => setShowTools(true), 350);
    // Smooth cinematic entrance animation for 3D robot on both mobile & desktop
    const rTimer = setTimeout(() => setRobotEntered(true), 500);

    return () => {
      clearTimeout(hTimer);
      clearTimeout(pTimer);
      clearTimeout(tTimer);
      clearTimeout(rTimer);
    };
  }, []);

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

          {/* Interactive 3D Model / Tools Hint */}
          <div
            className={`mt-3.5 text-[11px] font-mono flex items-center gap-2 select-none transition-colors ${
              isDark ? 'text-neutral-500' : 'text-slate-500'
            }`}
          >
            <div className="w-5 h-5 rounded border border-white/10 bg-white/[0.02] flex items-center justify-center shrink-0">
              <Bot className="w-3 h-3 text-neutral-400" />
            </div>
            <span>Interactive 3D Surface: 360° drag & zoom enabled</span>
          </div>
        </div>

        {/* Right Column: 3D Spline Scene with Entrance Animation for Both Mobile & Desktop UI */}
        <div className="lg:col-span-5 relative w-full h-[360px] sm:h-[440px] md:h-[500px] lg:h-[580px] flex items-center justify-center">
          {/* Futuristic entrance glow behind robot on arrival - zero blur cost */}
          <div
            className={`absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full pointer-events-none transition-all duration-1000 ${
              robotEntered ? 'scale-100 opacity-60' : 'scale-50 opacity-0'
            }`}
            style={{
              background: 'radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(34,211,238,0.08) 45%, transparent 70%)',
            }}
          />

          {/* 3D Robot Container with Entrance Animation and Antigravity Smooth Floating */}
          <div
            className={`w-full h-full relative rounded-3xl overflow-hidden flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              robotEntered
                ? 'opacity-100 scale-100 translate-y-0 filter-none animate-antigravity-float'
                : 'opacity-0 scale-90 translate-y-8'
            }`}
            style={{
              touchAction: 'pan-y', // allows smooth vertical scrolling on mobile while enabling 3D drag
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
              contain: 'paint layout',
            }}
          >
            {/* Live Interactive Spline 3D Robot on both Mobile and Desktop */}
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
              onLoad={handleRobotLoaded}
            />

            {/* 3D Holographic Orbit Ring centered snugly around Robot's Chest and Hands */}
            <div
              className="absolute inset-0 pointer-events-none overflow-visible select-none flex items-center justify-center transition-all duration-700 ease-out"
              style={{
                opacity: showTools && robotEntered ? 1 : 0,
                transform: showTools && robotEntered ? 'scale(1)' : 'scale(0.82)',
              }}
            >
              {/* Positioned right at chest/hands level (top: 57%, left: 50%) */}
              <div
                className="absolute"
                style={{
                  top: '57%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Energetic chest aura */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-cyan-500/15 blur-2xl animate-holo-glow" />

                {/* Compact Orbit Ring: Flows right through hands & chest */}
                <div 
                  className="relative w-[210px] h-[210px] sm:w-[240px] sm:h-[240px] md:w-[260px] md:h-[260px] rounded-full border border-dashed border-cyan-400/25 dark:border-cyan-300/25 animate-orbit-ring"
                  style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
                >
                  {AI_ORBIT_TOOLS.map((tool, idx) => {
                    const angle = (idx * 60 * Math.PI) / 180;
                    const xPercent = 50 + 50 * Math.cos(angle);
                    const yPercent = 50 + 50 * Math.sin(angle);

                    return (
                      <div
                        key={tool.name}
                        className="absolute"
                        style={{
                          top: `${yPercent}%`,
                          left: `${xPercent}%`,
                          transform: 'translate(-50%, -50%)',
                          willChange: 'transform',
                        }}
                      >
                        {/* Counter-rotating badge: Stays upright, compact single-line */}
                        <div 
                          className="animate-counter-orbit pointer-events-auto group cursor-pointer"
                          style={{ willChange: 'transform' }}
                        >
                          <div
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-200 group-hover:scale-105 ${
                              isDark
                                ? 'bg-[#0A0A0C]/90 border-white/10 text-neutral-300 group-hover:border-white/30 group-hover:text-white'
                                : 'bg-white/95 border-slate-200 text-slate-800 shadow-sm group-hover:border-slate-400 group-hover:text-black'
                            }`}
                            style={{
                              transform: 'translateZ(0)',
                            }}
                          >
                            <span className="w-3.5 h-3.5 flex items-center justify-center opacity-85 group-hover:opacity-100">
                              {tool.icon}
                            </span>
                            <span className="text-[10.5px] sm:text-[11px] font-normal sm:font-medium tracking-tight whitespace-nowrap leading-none">
                              {tool.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3D control overlay pill */}
            <div
              className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-full border text-[11px] font-medium pointer-events-none flex items-center gap-2 shadow-lg transition-colors duration-300 ${
                isDark
                  ? 'bg-black/75 border-white/15 text-white/90'
                  : 'bg-white/90 border-slate-300 text-slate-800'
              }`}
              style={{ transform: 'translateZ(0)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>3D Robot • Drag to Rotate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
