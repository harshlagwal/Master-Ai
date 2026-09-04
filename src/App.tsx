import React, { useState } from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FlowingTopicsTicker } from './components/FlowingTopicsTicker';
import { SectionCoreModules } from './components/SectionCoreModules';
import { SectionBigIdea } from './components/SectionBigIdea';
import { Section7DayJourney } from './components/Section7DayJourney';
import { SectionWhatYouWillBuild } from './components/SectionWhatYouWillBuild';
import { SectionToolkit } from './components/SectionToolkit';
import { SectionAudience } from './components/SectionAudience';
import { SectionMentor } from './components/SectionMentor';
import { SectionWhy } from './components/SectionWhy';
import { SectionPricing } from './components/SectionPricing';
import { SectionSIHSpecial } from './components/SectionSIHSpecial';
import { SectionDetails } from './components/SectionDetails';
import { SectionRegistration } from './components/SectionRegistration';
import { SectionFAQ } from './components/SectionFAQ';
import { SectionFinalCTA } from './components/SectionFinalCTA';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { StickyQuickEnrollBar } from './components/StickyQuickEnrollBar';
import { NamasteIntro } from './components/NamasteIntro';

export default function App() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState<string>('master-pass');

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
      className="relative w-full min-h-screen overflow-x-hidden text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-white"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Background Video (mouse-scrub controlled, fixed z-0) */}
      <BackgroundVideo />

      {/* Floating Glassmorphism Navbar (Fixed top: 14px, centered, z-40) */}
      <Navbar onJoinClick={openRegistration} />

      {/* Hero Section (z-10, minimal editorial with scrubbed video canvas behind) */}
      <HeroSection
        onJoinClick={openRegistration}
        onWhatsAppClick={openWhatsApp}
      />

      {/* Infinite Continuous Flowing Strip: All 9 Core Skills moving endlessly (No Emojis) */}
      <FlowingTopicsTicker />

      {/* Solid Editorial Content Flow (Sliding naturally over the video canvas) */}
      <main className="relative z-10">
        {/* 01 // The 9 Core Skills Curriculum Breakdown */}
        <SectionCoreModules onJoinClick={() => openRegistration()} />

        {/* 02 // The Big Idea */}
        <SectionBigIdea />

        {/* 03 // 7-Day Journey (Vertical Editorial Timeline) */}
        <Section7DayJourney />

        {/* 04 // What You Will Build (Horizontal / Asymmetric Deliverables Showcase) */}
        <div className="content-auto">
          <SectionWhatYouWillBuild />
        </div>

        {/* SPECIAL // Smart India Hackathon (SIH) 2-Hour Intensive Masterclass */}
        <div className="content-auto">
          <SectionSIHSpecial
            onJoinClick={(trackId) => openRegistration(trackId || 'sih-masterclass')}
          />
        </div>

        {/* 05 // AI Toolkit (THINK, RESEARCH, CREATE, BUILD, AUTOMATE) */}
        <div className="content-auto">
          <SectionToolkit />
        </div>

        {/* 06 // Who Is This For? (6 Minimal Profiles) */}
        <div className="content-auto">
          <SectionAudience />
        </div>

        {/* 07 // Meet Harsh (Grounded Bio & Philosophy) */}
        <div className="content-auto">
          <SectionMentor />
        </div>

        {/* 08 // Why MASTER AI? (01 to 08 Editorial Grid) */}
        <div className="content-auto">
          <SectionWhy />
        </div>

        {/* 09 // Why Only ₹89? (Honest Value Philosophy • 20 Seats Daily) */}
        <SectionPricing onJoinClick={openRegistration} />

        {/* 10 // The Details (Dates, Time, Format & Legitimate Credential Clarity) */}
        <div className="content-auto">
          <SectionDetails />
        </div>

        {/* 11 // Registration & Instant Checkout */}
        <div className="content-auto">
          <SectionRegistration />
        </div>

        {/* 12 // Frequently Asked Questions */}
        <div className="content-auto">
          <SectionFAQ />
        </div>

        {/* 13 // Final Magnetic Call to Action */}
        <div className="content-auto">
          <SectionFinalCTA onJoinClick={openRegistration} />
        </div>

        {/* 14 // Minimal Editorial Footer */}
        <Footer onWhatsAppClick={openWhatsApp} />
      </main>

      {/* Interactive Modals */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        initialTrackId={selectedTrackId}
      />

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        onJoinClick={() => {
          setIsWhatsAppOpen(false);
          setIsRegistrationOpen(true);
        }}
      />

      {/* Floating Sticky Quick-Enroll Capsule Bar on Scroll */}
      <StickyQuickEnrollBar onJoinClick={() => openRegistration()} />

      {/* Cinematic Full-Screen Multilingual Namaste Intro Experience */}
      <NamasteIntro />
    </div>
  );
}
