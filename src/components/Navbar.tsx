import React, { useState, useEffect } from 'react';
import { Sun, Moon, MessageCircle, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onJoinClick: (trackId?: string) => void;
  onWhatsAppClick: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onJoinClick,
  onWhatsAppClick,
  theme,
  toggleTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    closeMenu();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDark = theme === 'dark';

  return (
    <>
      {/* Floating Modern Header */}
      <header className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-6xl transition-all duration-300">
        <div
          className={`flex items-center justify-between px-3.5 sm:px-6 h-12 sm:h-14 rounded-full border transition-all duration-300 ${
            isDark
              ? scrolled
                ? 'bg-[#09090C]/85 shadow-[0_16px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] border-white/18 text-white'
                : 'bg-[#09090C]/75 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] border-white/12 text-white'
              : scrolled
                ? 'bg-white/90 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] border-slate-200/90 text-slate-900'
                : 'bg-white/80 shadow-[0_6px_20px_-4px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.8)] border-slate-200/80 text-slate-900'
          }`}
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Left: Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-1.5 no-underline group shrink-0 select-none"
          >
            <span
              className={`text-sm sm:text-base font-extrabold tracking-tight transition-colors ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              MASTER AI
            </span>
            <span className="text-amber-400 text-xs drop-shadow-[0_0_8px_rgba(251,191,36,0.65)] group-hover:rotate-45 group-hover:scale-125 transition-all duration-300">
              ✦
            </span>
          </a>

          {/* Center: Clean Professional Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
            <a
              href="#curriculum"
              onClick={(e) => scrollToSection(e, 'curriculum')}
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                isDark
                  ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              Curriculum
            </a>
            <a
              href="#journey"
              onClick={(e) => scrollToSection(e, 'journey')}
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                isDark
                  ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              7-Day Journey
            </a>
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, 'projects')}
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                isDark
                  ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              Projects
            </a>
            <a
              href="#mentor"
              onClick={(e) => scrollToSection(e, 'mentor')}
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                isDark
                  ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              Mentor
            </a>
            <a
              href="#pricing"
              onClick={(e) => scrollToSection(e, 'pricing')}
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                isDark
                  ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={(e) => scrollToSection(e, 'faq')}
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                isDark
                  ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              FAQ
            </a>
          </nav>

          {/* Right: Theme Toggle, WhatsApp & CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme mode"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-amber-300 hover:ring-2 hover:ring-amber-400/30'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:ring-2 hover:ring-slate-300'
              }`}
            >
              {isDark ? (
                <Sun className="w-4 h-4 transition-transform duration-300 hover:rotate-90" />
              ) : (
                <Moon className="w-4 h-4 transition-transform duration-300 hover:-rotate-45" />
              )}
            </button>

            {/* Community WhatsApp Button (Desktop) */}
            <button
              type="button"
              onClick={onWhatsAppClick}
              title="Join WhatsApp Community"
              className={`hidden sm:flex w-8 h-8 rounded-full items-center justify-center transition-all duration-200 cursor-pointer ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-emerald-400 hover:ring-2 hover:ring-emerald-400/30'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* Main CTA: Gold Shimmer Accent Button */}
            <button
              type="button"
              onClick={() => onJoinClick('master-pass')}
              className="h-8 sm:h-9 px-3.5 sm:px-4 rounded-full font-bold text-[11px] sm:text-xs transition-all duration-200 cursor-pointer shadow-md active:scale-95 whitespace-nowrap flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 hover:brightness-105 hover:shadow-[0_4px_18px_rgba(245,158,11,0.45)] border border-amber-500/30"
            >
              <span>Enroll</span>
              <span className="opacity-40">•</span>
              <span className="font-extrabold">₹89</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              className={`md:hidden w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                isDark
                  ? 'bg-white/10 text-white/80 hover:text-white'
                  : 'bg-slate-100 text-slate-800 hover:text-black border border-slate-200'
              }`}
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 flex flex-col p-4"
          onClick={closeMenu}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-sm mx-auto mt-16 border rounded-3xl p-5 shadow-2xl flex flex-col gap-3 transition-colors ${
              isDark
                ? 'bg-[#111111] border-white/15 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-sm font-bold">MASTER AI ✦</span>
              <button
                type="button"
                onClick={closeMenu}
                className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5 py-1">
              <a
                href="#curriculum"
                onClick={(e) => scrollToSection(e, 'curriculum')}
                className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-xs font-medium flex items-center justify-between"
              >
                <span>Curriculum (9 Skills)</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </a>

              <a
                href="#journey"
                onClick={(e) => scrollToSection(e, 'journey')}
                className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-xs font-medium flex items-center justify-between"
              >
                <span>7-Day Journey</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </a>

              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, 'projects')}
                className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-xs font-medium flex items-center justify-between"
              >
                <span>What You Will Build</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </a>

              <a
                href="#mentor"
                onClick={(e) => scrollToSection(e, 'mentor')}
                className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-xs font-medium flex items-center justify-between"
              >
                <span>Meet Mentor (Harsh)</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </a>

              <a
                href="#pricing"
                onClick={(e) => scrollToSection(e, 'pricing')}
                className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-xs font-medium flex items-center justify-between"
              >
                <span>Pricing Plans</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </a>

              <a
                href="#faq"
                onClick={(e) => scrollToSection(e, 'faq')}
                className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-xs font-medium flex items-center justify-between"
              >
                <span>FAQ</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </a>
            </div>

            <div className="pt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-black/10 dark:border-white/15"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
                <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onWhatsAppClick();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Community</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                closeMenu();
                onJoinClick('master-pass');
              }}
              className={`w-full py-2.5 rounded-full font-bold text-xs shadow-lg text-center ${
                isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-slate-950 text-white hover:bg-slate-800'
              }`}
            >
              Enroll Full Pass • ₹89
            </button>
          </div>
        </div>
      )}
    </>
  );
};
