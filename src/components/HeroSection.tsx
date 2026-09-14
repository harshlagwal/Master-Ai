import React, { useState, useEffect, useCallback } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { HERO_DATA } from '../data';
import { Sparkles, Bot, Zap, ArrowRight, ShieldCheck, Users } from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';

const AI_ORBIT_TOOLS = [
  {
    name: 'ChatGPT',
    accent: '#10A37F',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <path
          d="M22.28 9.82a5.98 5.98 0 0 0-.51-4.91 6.05 6.05 0 0 0-6.51-2.9A6.06 6.06 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.52 2.9A5.98 5.98 0 0 0 13.26 24a6.06 6.06 0 0 0 5.77-4.2 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.08zM13.26 22.43a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.8.8 0 0 0 .39-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.05v5.59a4.5 4.5 0 0 1-4.49 4.49zm-9.66-4.29a4.48 4.48 0 0 1-.54-3.01l.15.08 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06L9.74 19.95a4.5 4.5 0 0 1-6.14-1.81zm-1.07-9.52a4.46 4.46 0 0 1 2.34-1.97v5.68a.79.79 0 0 0 .4.68l5.84 3.37-2.02 1.17a.08.08 0 0 1-.07 0l-4.84-2.8a4.5 4.5 0 0 1-1.65-6.13zm16.55 3.38l-5.85-3.37 2.02-1.17a.08.08 0 0 1 .07 0l4.84 2.8a4.5 4.5 0 0 1-.68 8.09v-5.67a.79.79 0 0 0-.4-.68zm2.02-3.14l-.14-.08-4.78-2.76a.77.77 0 0 0-.78 0L9.55 9.2V6.87a.08.08 0 0 1 .03-.06L14.42 3.95a4.5 4.5 0 0 1 6.68 4.86zM8.7 14.83v-5.66a.79.79 0 0 0-.39-.68L6.3 7.32a.07.07 0 0 1-.04-.05V1.68a4.5 4.5 0 0 1 4.5-4.49c1.06 0 2.07.38 2.87 1.04l-.14.08-4.78 2.76zm1.1-2.32l2.2-1.27 2.2 1.27v2.55l-2.2 1.27-2.2-1.27z"
          fill="#10A37F"
        />
      </svg>
    ),
  },
  {
    name: 'Claude',
    accent: '#D97757',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="#D97757">
        <path d="M12 2a1 1 0 0 1 1 1v2.1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 15.8a1 1 0 0 1 1 1V21a1 1 0 0 1-2 0v-2.2a1 1 0 0 1 1-1zm8.5-7.8a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2.1a1 1 0 0 1 0-2H20.5zm-14.8 0a1 1 0 0 1 0 2H3.5a1 1 0 0 1 0-2h2.2zm11.37-4.96a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.41l-1.55 1.56a1 1 0 0 1-1.42-1.42l1.56-1.55zm-8.94 8.94a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.41l-1.56 1.56a1 1 0 1 1-1.41-1.42l1.56-1.55zm0-8.94l1.56 1.55a1 1 0 0 1-1.42 1.42L4.93 6.45a1 1 0 0 1 0-1.41 1 1 0 0 1 1.41 0zm8.94 8.94l1.55 1.55a1 1 0 0 1-1.41 1.42l-1.56-1.56a1 1 0 0 1 1.42-1.41zM12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z" />
      </svg>
    ),
  },
  {
    name: 'Cursor',
    accent: '#38BDF8',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 shrink-0"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="2.2"
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
    accent: '#818CF8',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="#818CF8">
        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.2l6 3.75v3.2L12 7.4 6 11.15v-3.2l6-3.75zM6 13.1l5 3.1v4.2l-5-3.1v-4.2zm12 4.2l-5 3.1v-4.2l5-3.1v4.2z" />
      </svg>
    ),
  },
  {
    name: 'Hugging Face',
    accent: '#FFB000',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
        <circle cx="12" cy="12" r="10" fill="#FFD21E" />
        <circle cx="8" cy="10" r="1.5" fill="#202020" />
        <circle cx="16" cy="10" r="1.5" fill="#202020" />
        <path
          d="M8.2 14.3c1.1 1.6 4.5 1.6 5.6 0"
          stroke="#202020"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="6.5" cy="12" r="1.3" fill="#FF708F" opacity="0.8" />
        <circle cx="17.5" cy="12" r="1.3" fill="#FF708F" opacity="0.8" />
      </svg>
    ),
  },
  {
    name: 'Gemini',
    accent: '#4E82EE',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <defs>
          <linearGradient id="heroGeminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4E82EE" />
            <stop offset="50%" stopColor="#9B72CF" />
            <stop offset="100%" stopColor="#D96570" />
          </linearGradient>
        </defs>
        <path
          d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z"
          fill="url(#heroGeminiGrad)"
        />
      </svg>
    ),
  },
];

interface HeroSectionProps {
  onJoinClick: (trackId?: string) => void;
  onWhatsAppClick: () => void;
  isDark?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onJoinClick,
  isDark = true,
}) => {
  const [isRobotLoaded, setIsRobotLoaded] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showHeadline, setShowHeadline] = useState(false);
  const [showPills, setShowPills] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const heroRef = React.useRef<HTMLElement | null>(null);

  const typewriterText =
    "Build real AI apps, automate workflows & launch verifiable proof with mentor Harsh Lagwal (IIT Patna).";
  // Typewriter starts typing strictly after the headline arrives
  const { displayed, done } = useTypewriter(typewriterText, 26, 200, showHeadline);

  // Screen size check for mobile vs desktop
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1024);
    };
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop, { passive: true });
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Intersection observer: only run heavy 3D WebGL when hero is actually visible in viewport
  useEffect(() => {
    if (!heroRef.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Called strictly when Spline 3D canvas finishes downloading & compiling WebGL
  const handleRobotLoaded = useCallback(() => {
    setIsRobotLoaded(true);
  }, []);

  // Immediate smooth entrance so user never waits for heavy 3D assets to see content & data
  useEffect(() => {
    const hTimer = setTimeout(() => setShowHeadline(true), 50);
    const pTimer = setTimeout(() => setShowPills(true), 140);
    const tTimer = setTimeout(() => setShowTools(true), 240);

    return () => {
      clearTimeout(hTimer);
      clearTimeout(pTimer);
      clearTimeout(tTimer);
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
      {/* Ambient background glow - smooth zero-lag radial lighting */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[380px] sm:h-[550px] rounded-full blur-[130px] pointer-events-none -z-10 transition-opacity duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(251,191,36,0.12) 0%, rgba(59,130,246,0.10) 45%, rgba(168,85,247,0.05) 100%)'
            : 'radial-gradient(circle, rgba(251,191,36,0.18) 0%, rgba(59,130,246,0.14) 45%, rgba(168,85,247,0.07) 100%)',
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
          {/* Universal domain pill */}
          <div
            className={`mb-4 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-[11px] font-mono tracking-tight w-fit transition-all duration-300 shadow-sm ${
              isDark
                ? 'bg-amber-400/10 border-amber-400/30 text-amber-400 shadow-[0_2px_12px_rgba(251,191,36,0.08)]'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 animate-pulse" />
            <span className="font-semibold tracking-wide">MASTER AI • 7-Day Live Accelerator</span>
            <span className="opacity-40">•</span>
            <span className="text-emerald-500 font-bold">Strictly 20 Seats Daily</span>
          </div>

          {/* Animated Headline: Master 9 In-Demand AI Skills with generous spacing */}
          <h1
            id="hero-headline"
            className={`mb-4 font-black tracking-normal leading-[1.25] text-2xl sm:text-3xl lg:text-[2.65rem] transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="inline-block mr-3">Master</span>
            <span className="inline-block mr-3 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent font-black animate-glow-shift">
              9 In-Demand AI Skills
            </span>
            <span className="inline-block">in 7 Live Days.</span>
          </h1>

          {/* Typewriter Dynamic Subtitle - Spacious & Crisp */}
          <div
            className={`mb-6 text-sm sm:text-base font-normal leading-relaxed max-w-xl transition-colors min-h-[48px] sm:min-h-[44px] ${
              isDark ? 'text-neutral-300' : 'text-slate-700 font-medium'
            }`}
          >
            <span>{displayed}</span>
            {!done && (
              <span
                className={`inline-block w-[2.5px] h-[0.9em] align-middle ml-1.5 animate-blink ${
                  isDark ? 'bg-amber-400' : 'bg-slate-900'
                }`}
                aria-hidden="true"
              />
            )}
          </div>

          {/* Action pill buttons */}
          <div
            id="action-pills-container"
            className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 mb-2"
            style={{
              opacity: showPills ? 1 : 0,
              transform: showPills ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* 1-Week Pass (₹299) Most Popular Pill */}
            <button
              type="button"
              onClick={() => onJoinClick('week-pass-299')}
              title="Claim 1-Week Live Masterclass Pass — ₹299"
              className="inline-flex items-center justify-center bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-105 text-black font-bold rounded-full text-xs sm:text-sm px-4 sm:px-5 py-2.5 whitespace-nowrap transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-95 gap-1.5 border border-amber-500/40"
            >
              <Sparkles className="w-4 h-4 text-black shrink-0" />
              <span>1-Week Pass (₹299)</span>
            </button>

            {/* 30-Min Demo (Free) Pill */}
            <button
              type="button"
              onClick={() => onJoinClick('demo-free')}
              title="Join 30-Minute Free Live Demo"
              className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full text-xs sm:text-sm px-4 py-2.5 whitespace-nowrap transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-95 gap-1.5 border border-emerald-400/40"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
              <span>30-Min Demo (Free)</span>
            </button>

            {/* 9 Core Skills Anchor */}
            <a
              href="#curriculum"
              onClick={scrollToCurriculum}
              className={`inline-flex items-center justify-center font-semibold rounded-full text-xs sm:text-sm px-4 py-2.5 whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 gap-1.5 border ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                  : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>9 Core Skills</span>
            </a>

            {/* SIH Sprint Special */}
            <button
              type="button"
              onClick={() => onJoinClick('sih-masterclass')}
              className="inline-flex items-center justify-center bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 hover:opacity-95 text-black font-bold rounded-full text-xs sm:text-sm px-4 py-2.5 whitespace-nowrap transition-all duration-200 cursor-pointer shadow-md active:scale-95 gap-1 border border-amber-500/30"
            >
              <span>🏆 SIH Sprint (₹199)</span>
            </button>

            {/* Outline Pill: Enroll Full Pass ₹89 */}
            <button
              type="button"
              onClick={() => onJoinClick('master-pass')}
              title="Reserve complete 7-day seat for ₹89"
              className={`inline-flex items-center justify-center font-bold rounded-full text-xs sm:text-sm px-4 py-2.5 whitespace-nowrap gap-1.5 transition-all duration-200 cursor-pointer shadow-sm active:scale-95 border ${
                isDark
                  ? 'text-white bg-white/15 hover:bg-white hover:text-black border-white/30'
                  : 'text-slate-900 bg-slate-100 hover:bg-slate-950 hover:text-white border-slate-300'
              }`}
            >
              <span>Enroll for ₹89</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Trust Badges & Metrics Row */}
          <div
            className={`mt-8 pt-4 border-t flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-medium transition-colors ${
              isDark ? 'border-white/10 text-neutral-400' : 'border-slate-200 text-slate-600'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
              <span>Strictly 20 Seats Daily</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Zero-Commission Direct UPI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 animate-pulse" />
              <span>Live 8:00 PM IST on Google Meet</span>
            </div>
          </div>

          {/* Interactive 3D Model / Tools Hint */}
          <div
            className={`mt-3 text-[11px] flex items-center gap-2 select-none transition-colors ${
              isDark ? 'text-neutral-500' : 'text-slate-500'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>
              {isDesktop
                ? 'Interactive 3D Robot: Rotate, drag or zoom right side'
                : 'Interactive AI Tools Ecosystem: 9 High-Demand Industry Tools'}
            </span>
          </div>
        </div>

        {/* Right Column: Interactive 3D Scene on Desktop / Ultra-Fast Zero-Lag AI Hub on Mobile */}
        <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[580px] flex items-center justify-center">
          <div className="w-full h-full relative rounded-3xl overflow-hidden flex items-center justify-center">
            {/* Desktop: Render live Spline 3D Scene when hero is in view */}
            {isDesktop ? (
              isInView ? (
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                  onLoad={handleRobotLoaded}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-neutral-500">
                  <Bot className="w-10 h-10 opacity-30" />
                  <span className="text-xs font-mono">3D Robot Idle (Power Saving)</span>
                </div>
              )
            ) : (
              /* Mobile/Tablet: Lightweight, zero-lag holographic AI core (pure CSS, no WebGL/wasm battery drain) */
              <div className="w-full h-full flex items-center justify-center relative select-none">
                {/* Ambient glow */}
                <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-amber-400/20 via-blue-500/15 to-cyan-400/20 blur-3xl pointer-events-none" />

                {/* Central Futuristic Hologram Hub */}
                <div className="relative z-0 flex flex-col items-center justify-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-black/60 border border-cyan-500/30 flex items-center justify-center relative overflow-hidden shadow-[0_0_35px_rgba(6,182,212,0.25)] backdrop-blur-md">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-amber-500/20 animate-pulse" />
                    <Bot className="w-12 h-12 text-cyan-300 drop-shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
                  </div>
                  <div className="mt-2.5 text-[11px] font-mono font-bold tracking-wider text-cyan-300/90 flex items-center gap-1.5 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    Master AI Hub
                  </div>
                </div>
              </div>
            )}

            {/* 3D Holographic Orbit Ring centered snugly around Robot / Central Hub */}
            <div
              className="absolute inset-0 pointer-events-none overflow-visible select-none flex items-center justify-center transition-all duration-700 ease-out"
              style={{
                opacity: showTools ? 1 : 0,
                transform: showTools ? 'scale(1)' : 'scale(0.82)',
              }}
            >
              {/* Positioned right at center (desktop top: 57%, mobile top: 50%) */}
              <div
                className="absolute"
                style={{
                  top: isDesktop ? '57%' : '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Energetic chest aura */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-cyan-500/15 blur-2xl animate-holo-glow" />

                {/* Compact Orbit Ring: Flows right through center */}
                <div className="relative w-[210px] h-[210px] sm:w-[240px] sm:h-[240px] md:w-[260px] md:h-[260px] rounded-full border border-dashed border-cyan-400/25 dark:border-cyan-300/25 animate-orbit-ring">
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
                        }}
                      >
                        {/* Counter-rotating badge: Stays upright, compact single-line */}
                        <div className="animate-counter-orbit pointer-events-auto group cursor-pointer">
                          <div
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border shadow-md transition-all duration-200 group-hover:scale-110 ${
                              isDark
                                ? 'bg-black/85 border-white/20 text-white group-hover:border-white/40'
                                : 'bg-white/95 border-slate-300 text-slate-900 shadow-sm group-hover:border-slate-400'
                            }`}
                            style={{
                              boxShadow: `0 2px 12px -1px ${tool.accent}30`,
                            }}
                          >
                            {tool.icon}
                            <span className="text-[10px] sm:text-[11px] font-bold tracking-tight whitespace-nowrap leading-none">
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

            {/* Status overlay pill */}
            <div
              className={`absolute bottom-3 right-3 backdrop-blur-md px-3 py-1.5 rounded-full border text-[11px] font-medium pointer-events-none flex items-center gap-2 shadow-lg transition-colors duration-300 ${
                isDark
                  ? 'bg-black/60 border-white/15 text-white/90'
                  : 'bg-white/90 border-slate-300 text-slate-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isDesktop ? 'bg-blue-500 animate-ping' : 'bg-cyan-400 animate-pulse'}`} />
              <span>{isDesktop ? '3D Robot • Drag to Rotate' : '9 AI Tools Ecosystem'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
