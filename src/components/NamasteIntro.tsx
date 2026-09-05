import React, { useState, useEffect, useCallback } from 'react';

/**
 * =======================================================================
 * CONFIGURATION
 * =======================================================================
 * Set SHOW_INTRO_ON_EVERY_VISIT to:
 * - true  : Intro plays every time the page is loaded/refreshed (Default).
 * - false : Intro plays only once per session/visit (persisted in sessionStorage).
 */
export const SHOW_INTRO_ON_EVERY_VISIT = true;
const STORAGE_KEY = 'master_ai_intro_seen';

/**
 * Multilingual Greeting Sequence:
 * Exact order requested:
 * 1. English: "Hello"
 * 2. Kannada: "ನಮಸ್ಕಾರ"
 * 3. Telugu: "నమస్తే"
 * 4. Tamil: "வணக்கம்"
 * 5. Bengali: "নমস্কার"
 * 6. Punjabi: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ"
 * 7. Marathi: "नमस्कार"
 * 8. Gujarati: "નમસ્તે"
 * 9. Malayalam: "നമസ്കാരം"
 * 10. Hindi: "नमस्ते" (FINAL LANGUAGE — holds longer, subtle extra prominence)
 */
interface GreetingItem {
  id: string;
  language: string;
  text: string;
  durationMs: number;
  isIndic?: boolean;
  isFinalHindi?: boolean;
}

const GREETINGS: GreetingItem[] = [
  { id: 'en', language: 'English', text: 'Hello', durationMs: 440, isIndic: false },
  { id: 'kn', language: 'Kannada', text: 'ನಮಸ್ಕಾರ', durationMs: 440, isIndic: true },
  { id: 'te', language: 'Telugu', text: 'నమస్తే', durationMs: 440, isIndic: true },
  { id: 'ta', language: 'Tamil', text: 'வணக்கம்', durationMs: 440, isIndic: true },
  { id: 'bn', language: 'Bengali', text: 'নমস্কার', durationMs: 440, isIndic: true },
  { id: 'pa', language: 'Punjabi', text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', durationMs: 440, isIndic: true },
  { id: 'mr', language: 'Marathi', text: 'नमस्कार', durationMs: 440, isIndic: true },
  { id: 'gu', language: 'Gujarati', text: 'નમસ્તે', durationMs: 440, isIndic: true },
  { id: 'ml', language: 'Malayalam', text: 'നമസ്കാരം', durationMs: 440, isIndic: true },
  // 10. Hindi — Mandatory Final Language with extended hold and emphasis
  { id: 'hi', language: 'Hindi', text: 'नमस्ते', durationMs: 920, isIndic: true, isFinalHindi: true },
];

// Welcome message display duration
const WELCOME_HOLD_MS = 680;
// Website reveal overlay fade duration
const OVERLAY_FADE_DURATION_MS = 650;

/**
 * Universal Indic-safe font family fallback stack ensuring clean rendering
 * across Android, iOS Safari, macOS, Windows, and Linux without font loading latency.
 */
const INDIC_FONT_STACK = [
  'var(--font-heading)',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  '"Noto Sans"',
  '"Noto Sans Devanagari"',
  '"Noto Sans Kannada"',
  '"Noto Sans Telugu"',
  '"Noto Sans Tamil"',
  '"Noto Sans Bengali"',
  '"Noto Sans Gurmukhi"',
  '"Noto Sans Gujarati"',
  '"Noto Sans Malayalam"',
  'sans-serif',
].join(', ');

export const NamasteIntro: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  // Check if intro should be shown according to configuration
  const [shouldRender, setShouldRender] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    if (SHOW_INTRO_ON_EVERY_VISIT) return true;
    try {
      const seen = sessionStorage.getItem(STORAGE_KEY);
      return !seen;
    } catch {
      return true;
    }
  });

  // Current stage: 'greetings' | 'welcome' | 'revealing' | 'done'
  const [stage, setStage] = useState<'greetings' | 'welcome' | 'revealing' | 'done'>('greetings');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // Word animation state: 'in' (visible & sharp) | 'out' (fade & blur out)
  const [wordState, setWordState] = useState<'in' | 'out'>('in');
  // Welcome animation state
  const [welcomeState, setWelcomeState] = useState<'in' | 'out'>('in');

  // Finish intro and smoothly reveal the website
  const finishIntro = useCallback((immediate = false) => {
    // Store in sessionStorage if configured for first visit only
    if (!SHOW_INTRO_ON_EVERY_VISIT) {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      } catch {
        // Ignore storage errors
      }
    }

    if (immediate) {
      setStage('done');
      setShouldRender(false);
      document.body.style.overflow = '';
      onComplete?.();
      return;
    }

    setStage('revealing');
    window.setTimeout(() => {
      setStage('done');
      setShouldRender(false);
      document.body.style.overflow = '';
      onComplete?.();
    }, OVERLAY_FADE_DURATION_MS);
  }, [onComplete]);

  // If already not rendered, trigger onComplete once
  useEffect(() => {
    if (!shouldRender) {
      onComplete?.();
    }
  }, [shouldRender, onComplete]);

  // Lock scroll during intro playback and attach Escape key listener
  useEffect(() => {
    if (!shouldRender) return;

    // Prevent body scrolling during the intro
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle Escape key to skip intro cleanly
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishIntro(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [shouldRender, finishIntro]);

  // Stage 1: Greetings Orchestrator
  useEffect(() => {
    if (!shouldRender || stage !== 'greetings') return;

    const currentGreeting = GREETINGS[currentIndex];
    if (!currentGreeting) return;

    // Reset word state to visible & sharp
    setWordState('in');

    const totalDuration = currentGreeting.durationMs;
    const fadeOutDelay = Math.max(totalDuration - 130, 150);

    // Fade/blur out shortly before next greeting
    const fadeTimer = window.setTimeout(() => {
      setWordState('out');
    }, fadeOutDelay);

    // Advance to next greeting or final welcome
    const nextTimer = window.setTimeout(() => {
      if (currentIndex < GREETINGS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Completed final Hindi "नमस्ते" -> move to Welcome stage
        setStage('welcome');
      }
    }, totalDuration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(nextTimer);
    };
  }, [currentIndex, stage, shouldRender]);

  // Stage 2: Welcome to MASTER AI Orchestrator
  useEffect(() => {
    if (!shouldRender || stage !== 'welcome') return;

    setWelcomeState('in');

    const fadeTimer = window.setTimeout(() => {
      setWelcomeState('out');
    }, Math.max(WELCOME_HOLD_MS - 200, 200));

    const finishTimer = window.setTimeout(() => {
      finishIntro(false);
    }, WELCOME_HOLD_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [stage, shouldRender, finishIntro]);

  if (!shouldRender || stage === 'done') {
    return null;
  }

  const currentGreeting = GREETINGS[currentIndex];
  const isFinalHindi = currentGreeting?.isFinalHindi;

  return (
    <div
      id="namaste-intro-overlay"
      aria-label="Namaste Intro"
      role="region"
      className="fixed inset-0 z-[99999] flex items-center justify-center select-none pointer-events-auto bg-[#F9F9F8] text-[#0A0A0A]"
      style={{
        height: '100dvh',
        minHeight: '100vh',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
        opacity: stage === 'revealing' ? 0 : 1,
        transform: stage === 'revealing' ? 'scale(1.015)' : 'scale(1)',
        transition: `opacity ${OVERLAY_FADE_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${OVERLAY_FADE_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: 'opacity, transform',
      }}
    >
      {/* Centered Editorial Greeting Container */}
      <div className="relative w-full max-w-4xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        {stage === 'greetings' && currentGreeting && (
          <div
            key={currentGreeting.id}
            className="tracking-tight text-center transition-all duration-[180ms] ease-out will-change-[transform,opacity,filter]"
            style={{
              fontFamily: INDIC_FONT_STACK,
              fontSize: 'clamp(42px, 8.5vw, 110px)',
              fontWeight: isFinalHindi ? 500 : 450,
              lineHeight: 1.15,
              // Keep natural letter spacing for Indic scripts to maintain proper ligature rendering
              letterSpacing: currentGreeting.isIndic ? 'normal' : '-0.02em',
              color: '#0A0A0A',
              opacity: wordState === 'in' ? 1 : 0,
              transform:
                wordState === 'in'
                  ? isFinalHindi
                    ? 'scale(1.02)'
                    : 'scale(1)'
                  : 'scale(0.975)',
              filter: wordState === 'in' ? 'blur(0px)' : 'blur(4px)',
            }}
          >
            {currentGreeting.text}
          </div>
        )}

        {/* Final Transition: "Welcome to MASTER AI" */}
        {stage === 'welcome' && (
          <div
            className="tracking-tight text-center transition-all duration-[260ms] ease-out will-change-[transform,opacity,filter]"
            style={{
              fontFamily: 'var(--font-heading), -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: 'clamp(22px, 3.8vw, 38px)',
              fontWeight: 450,
              letterSpacing: '-0.025em',
              color: '#0A0A0A',
              opacity: welcomeState === 'in' ? 1 : 0,
              transform:
                welcomeState === 'in'
                  ? 'translate3d(0, 0px, 0)'
                  : 'translate3d(0, -6px, 0)',
              filter: welcomeState === 'in' ? 'blur(0px)' : 'blur(3px)',
            }}
          >
            Welcome to MASTER AI
          </div>
        )}
      </div>
    </div>
  );
};
