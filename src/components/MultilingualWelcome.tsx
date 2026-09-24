import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

// Authentic greetings across Indian languages, finishing strictly on Hindi "नमस्ते"
const GREETINGS = [
  'வணக்கம்',        // Tamil
  'నమస్కారం',       // Telugu
  'ನಮಸ್ಕಾರ',        // Kannada
  'നമസ്കാരം',       // Malayalam
  'নমস্কার',        // Bengali
  'नमस्कार',        // Marathi
  'નમસ્તે',         // Gujarati
  'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ',    // Punjabi
  'নমস্কাৰ',        // Assamese
  'ନମସ୍କାର',        // Odia
  'آداب',           // Urdu
  'खम्मा घणी',      // Rajasthani
  'नमस्ते',         // Hindi (Strictly Last)
];

export const MultilingualWelcome: React.FC = () => {
  const [isAlreadySeen] = useState(() => {
    try {
      return typeof window !== 'undefined' && sessionStorage.getItem('welcome_seen') === 'true';
    } catch {
      return false;
    }
  });

  const [index, setIndex] = useState(0);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [isFinished, setIsFinished] = useState(isAlreadySeen);

  useEffect(() => {
    if (isAlreadySeen) return;

    try {
      sessionStorage.setItem('welcome_seen', 'true');
    } catch {
      // Storage unavailable or disabled
    }

    const isLast = index === GREETINGS.length - 1;
    // Rhythmic progression through languages, holding on Hindi "नमस्ते" with lightning effect
    const displayDuration = isLast ? 800 : 130;

    const timer = setTimeout(() => {
      if (!isLast) {
        setIndex((prev) => prev + 1);
      } else {
        // Trigger smooth curtain slide-up
        setIsSlidingOut(true);

        const unmountTimer = setTimeout(() => {
          setIsFinished(true);
        }, 850);

        return () => clearTimeout(unmountTimer);
      }
    }, displayDuration);

    return () => clearTimeout(timer);
  }, [index, isAlreadySeen]);

  if (isFinished) return null;

  const currentWord = GREETINGS[index];
  const isHindiFinal = index === GREETINGS.length - 1;

  return (
    <div
      id="multilingual-welcome-overlay"
      aria-label="Welcome animation"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#070709] text-white transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] select-none pointer-events-auto ${
        isSlidingOut ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{
        willChange: 'transform',
      }}
    >
      {/* Center Subtle Ambient Glow - zero blur cost */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 rounded-full pointer-events-none transition-all duration-300 ${
          isHindiFinal ? 'scale-125 opacity-100' : 'scale-100 opacity-60'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, rgba(251,191,36,0.06) 45%, transparent 70%)',
        }}
      />

      {/* Center Multilingual Word Showcase (Sleek, Compact Size) */}
      <div className="relative z-10 flex items-center justify-center gap-2.5 sm:gap-3 px-6">
        {/* Electric Lightning Aura for Final Hindi greeting */}
        {isHindiFinal && (
          <div className="absolute -inset-x-6 -inset-y-3 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent blur-md pointer-events-none animate-pulse" />
        )}

        {/* Pulsing indicator dot (turns into electric spark on finale) */}
        {!isHindiFinal ? (
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-400 shrink-0 shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-pulse" />
        ) : (
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 fill-amber-300 shrink-0 drop-shadow-[0_0_14px_rgba(251,191,36,1)] animate-bounce" />
        )}

        {/* Pure Animated Greeting Text (Compact, Sleek, Professional) */}
        <h1
          key={currentWord}
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold tracking-tight transition-all duration-150 animate-in fade-in zoom-in-95 ${
            isHindiFinal
              ? 'bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(251,191,36,0.85)] scale-105 font-black'
              : 'text-white/90'
          }`}
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {currentWord}
        </h1>

        {/* Electric Lightning Spark on the Right for Final Greeting */}
        {isHindiFinal && (
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 fill-amber-400 shrink-0 drop-shadow-[0_0_14px_rgba(251,191,36,1)] animate-pulse" />
        )}
      </div>
    </div>
  );
};
