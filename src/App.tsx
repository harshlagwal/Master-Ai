import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SectionStatsBar } from './components/SectionStatsBar';
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
import { MultilingualWelcome } from './components/MultilingualWelcome';

export default function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState<string>('master-pass');
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Apple/Google-grade buttery smooth momentum scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like exponential decay curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
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

  // Lock background momentum scroll when registration or whatsapp modal opens
  useEffect(() => {
    if (lenisRef.current) {
      if (isRegistrationOpen || isWhatsAppOpen) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isRegistrationOpen, isWhatsAppOpen]);

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
        isDark ? 'bg-[#070707] text-[#F3F4F6]' : 'bg-[#F8F9FA] text-[#0F172A]'
      }`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Luxury Multilingual Indian Welcome Overlay (Finishing on Hindi Namaste) */}
      <MultilingualWelcome />

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
        />

        {/* 2. Key Metrics Bar (9 Skills, 7 Days, Live on Meet, 20 Seats) */}
        <SectionStatsBar isDark={isDark} />

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

        {/* 7. Transparent Pricing & Passes (₹89 Full Pass, ₹299 VIP, Free Demo, SIH) */}
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
