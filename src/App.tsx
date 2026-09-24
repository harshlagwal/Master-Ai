import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SectionStatsBar } from './components/SectionStatsBar';
import { SectionAiToolsMarquee } from './components/SectionAiToolsMarquee';
import { SectionCurriculumGrid } from './components/SectionCurriculumGrid';
import { SectionJourneyTimeline } from './components/SectionJourneyTimeline';
import { SectionBuildProof } from './components/SectionBuildProof';
import { SectionMentorProfile } from './components/SectionMentorProfile';
import { SectionPricingCards } from './components/SectionPricingCards';
import { SectionFAQAccordion } from './components/SectionFAQAccordion';
import { SectionFinalBanner } from './components/SectionFinalBanner';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { AiLoader } from './components/ui/ai-loader';

export default function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState<string>('master-pass');
  const lenisRef = useRef<Lenis | null>(null);

  const mountTimeRef = useRef(Date.now());
  const MIN_LOADER_DURATION = 3200; // 3.2 seconds minimum so users experience the full glowing portal

  // Smoothly dismiss preloader once 3D robot scene compiles and minimum time has passed
  const handleRobotReady = useCallback(() => {
    const elapsed = Date.now() - mountTimeRef.current;
    const remainingTime = Math.max(0, MIN_LOADER_DURATION - elapsed);

    setTimeout(() => {
      setIsLoading(false);
    }, remainingTime);
  }, []);

  useEffect(() => {
    // Safety fallback: reveal page after 3.8s max even on slow network
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3800);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Initialize Google Antigravity buttery smooth 60-120fps momentum scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 3), // Signature Google Antigravity cubic ease-out curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lock background momentum scroll during initial load or modal overlay
  useEffect(() => {
    if (lenisRef.current) {
      if (isLoading || isRegistrationOpen || isWhatsAppOpen) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isLoading, isRegistrationOpen, isWhatsAppOpen]);

  const openRegistration = (trackId?: string) => {
    if (trackId) {
      setSelectedTrackId(trackId);
    }
    setIsRegistrationOpen(true);
  };

  const openWhatsApp = () => {
    setIsWhatsAppOpen(true);
  };

  return (
    <div
      className={`relative w-full min-h-screen overflow-x-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#050506] text-[#EDEDED]' : 'bg-[#FAFAFA] text-[#0A0A0A]'
      }`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Initial Website Preloader: Glowing Open Master AI portal */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="app-ai-preloader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.04,
              transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
            }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050506] text-white select-none pointer-events-auto"
            style={{ overscrollBehavior: 'contain' }}
          >
            <div className="relative flex flex-col items-center justify-center p-6 text-center">
              {/* Radial ambient glow behind portal */}
              <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-purple-600/25 via-indigo-500/15 to-transparent blur-[80px] pointer-events-none" />

              {/* Glowing Open Master AI circular ring loader */}
              <AiLoader text="Open Master AI" size={195} />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="mt-8 flex flex-col items-center gap-2"
              >
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-mono uppercase tracking-widest text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Loading 3D Proving Ground</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Modern Header with Theme Toggle & Clean Navigation */}
      <Navbar
        onJoinClick={openRegistration}
        onWhatsAppClick={openWhatsApp}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 w-full flex flex-col">
        {/* 1. Hero: 3D Spline Interactive Experience + Typewriter & CTAs */}
        <HeroSection
          onJoinClick={openRegistration}
          onWhatsAppClick={openWhatsApp}
          isDark={isDark}
          onRobotLoaded={handleRobotReady}
        />

        {/* 2. Key Metrics Bar (9 Skills, 7 Days, Live on Meet, 20 Seats) */}
        <SectionStatsBar isDark={isDark} />

        {/* 2.5 3-Row Infinite Real AI Tools & LLM Vector Logos (Apple/Google Physics) */}
        <SectionAiToolsMarquee isDark={isDark} />

        {/* 3. The 9 Core Skills (Clean 3-Col Responsive Card Grid) */}
        <SectionCurriculumGrid
          isDark={isDark}
          onEnrollClick={openRegistration}
        />

        {/* 4. 7-Day Roadmap (Interactive Milestone Stepper) */}
        <SectionJourneyTimeline
          isDark={isDark}
          onEnrollClick={openRegistration}
        />

        {/* 5. What You Will Build (Tangible Portfolio Proofs) */}
        <SectionBuildProof
          isDark={isDark}
          onEnrollClick={openRegistration}
        />

        {/* 6. Meet The Mentor (Harsh Lagwal • Bio & Verified Credentials) */}
        <SectionMentorProfile
          isDark={isDark}
          onWhatsAppClick={openWhatsApp}
        />

        {/* 7. Transparent Pricing & Passes (₹89 Master Pass, ₹299 VIP, Free Demo) */}
        <SectionPricingCards
          isDark={isDark}
          onEnrollClick={openRegistration}
        />

        {/* 8. Frequently Asked Questions Accordion */}
        <SectionFAQAccordion
          isDark={isDark}
          onWhatsAppClick={openWhatsApp}
        />

        {/* 9. Final Magnetic Conversion CTA Banner */}
        <SectionFinalBanner
          isDark={isDark}
          onEnrollClick={openRegistration}
          onWhatsAppClick={openWhatsApp}
        />
      </main>

      {/* 10. Minimalist Footer */}
      <Footer
        isDark={isDark}
        onWhatsAppClick={openWhatsApp}
        onEnrollClick={openRegistration}
      />

      {/* Interactive Modals */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        initialTrackId={selectedTrackId}
        isDark={isDark}
      />

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        onJoinClick={() => {
          setIsWhatsAppOpen(false);
          setIsRegistrationOpen(true);
        }}
      />
    </div>
  );
}
