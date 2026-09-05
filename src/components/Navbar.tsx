import React, { useState, useEffect } from 'react';
import { BRAND } from '../data';

interface NavbarProps {
  onJoinClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onJoinClick }) => {
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

  const handleJoinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    if (onJoinClick) {
      onJoinClick();
    } else {
      const el = document.getElementById('register') || document.getElementById('pricing');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Glassmorphism Navbar (Centered horizontally, top: 12px) */}
      <header
        className="fixed top-[10px] sm:top-[12px] left-1/2 -translate-x-1/2 z-40 w-auto max-w-[95%] sm:max-w-max transition-all duration-300"
      >
        <div
          className={`flex items-center justify-between gap-3 sm:gap-4 md:gap-5 px-3 sm:px-3.5 h-[38px] sm:h-[42px] rounded-full border transition-all duration-300 ${
            scrolled
              ? 'bg-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.08)] border-black/12'
              : 'bg-white/55 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border-black/8'
          }`}
          style={{
            backdropFilter: scrolled ? 'blur(24px)' : 'blur(16px)',
            WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'blur(16px)',
          }}
        >
          {/* Left: Brand Logo */}
          <a
            href="#"
            id="logo-link"
            className="flex items-center gap-1.5 no-underline text-black group shrink-0 pl-1"
          >
            <span
              className="text-[13px] sm:text-[14px] font-medium tracking-tight whitespace-nowrap"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              MASTER AI
            </span>
            <span className="text-[11px] sm:text-[12px] text-black/60 leading-none group-hover:rotate-45 transition-transform duration-300">
              ✦
            </span>
          </a>

          <div className="hidden md:block h-3 w-px bg-black/10" />

          {/* Center: Desktop Navigation Links */}
          <nav
            id="desktop-nav"
            className="hidden md:flex items-center gap-1 text-[12px] font-medium text-black/70 tracking-tight"
          >
            <a
              href="#modules"
              className="px-2.5 py-1 rounded-full hover:text-black hover:bg-black/5 transition-all whitespace-nowrap"
            >
              9 Skills
            </a>
            <a
              href="#journey"
              className="px-2.5 py-1 rounded-full hover:text-black hover:bg-black/5 transition-all whitespace-nowrap"
            >
              7 Days
            </a>
            <a
              href="#sih"
              className="px-2.5 py-1 rounded-full text-amber-800 bg-amber-400/20 border border-amber-400/40 hover:bg-amber-400/30 transition-all whitespace-nowrap font-semibold flex items-center gap-1"
            >
              <span>SIH Special</span>
              <span className="text-[10px] font-mono font-bold">₹199</span>
            </a>
            <a
              href="#opportunities"
              className="px-2.5 py-1 rounded-full hover:text-black hover:bg-black/5 transition-all whitespace-nowrap"
            >
              Certificates & IIT
            </a>
            <a
              href="#pricing"
              className="px-2.5 py-1 rounded-full hover:text-black hover:bg-black/5 transition-all whitespace-nowrap"
            >
              Pricing
            </a>
            <a
              href="#mentor"
              className="px-2.5 py-1 rounded-full hover:text-black hover:bg-black/5 transition-all whitespace-nowrap"
            >
              About
            </a>
            <a
              href="#faq"
              className="px-2.5 py-1 rounded-full hover:text-black hover:bg-black/5 transition-all whitespace-nowrap"
            >
              FAQ
            </a>
          </nav>

          {/* Right: Compact JOIN NOW CTA Button (Desktop) */}
          <div className="hidden md:flex items-center shrink-0">
            <button
              type="button"
              onClick={handleJoinClick}
              id="desktop-cta"
              className="h-[28px] px-3.5 rounded-full bg-[#0A0A0A] text-white text-[11px] font-medium tracking-wider uppercase hover:bg-neutral-800 transition-all cursor-pointer shadow-xs active:scale-95 whitespace-nowrap flex items-center justify-center gap-1"
            >
              <span>Join</span>
              <span className="opacity-60 text-[10px]">&bull;</span>
              <span>₹89</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            id="mobile-hamburger-btn"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            className="md:hidden flex flex-col justify-center items-center gap-[3.5px] w-7 h-7 p-1 z-50 cursor-pointer rounded-full bg-black/5 hover:bg-black/10 transition-colors focus:outline-hidden"
          >
            <span
              className={`w-3.5 h-[1.25px] bg-black transform transition-all duration-300 origin-center ${
                isOpen ? 'rotate-45 translate-y-[4.75px]' : ''
              }`}
            />
            <span
              className={`w-3.5 h-[1.25px] bg-black transition-all duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-3.5 h-[1.25px] bg-black transform transition-all duration-300 origin-center ${
                isOpen ? '-rotate-45 -translate-y-[4.75px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Overlay Menu */}
      <div
        id="mobile-nav-overlay"
        className={`fixed inset-0 z-35 bg-white/95 backdrop-blur-xl flex flex-col justify-center px-8 sm:px-12 gap-7 md:hidden transition-all duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-[20px] font-medium tracking-tight text-black"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {BRAND.name}
          </span>
        </div>

        <a
          href="#journey"
          onClick={closeMenu}
          className="text-[32px] sm:text-[36px] font-medium text-black hover:opacity-60 transition-opacity tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          7 Days
        </a>
        <a
          href="#sih"
          onClick={closeMenu}
          className="text-[30px] sm:text-[34px] font-bold text-amber-600 hover:opacity-80 transition-opacity tracking-tight flex items-center justify-between"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <span>🏆 SIH 2-Hr Sprint</span>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
            ₹199
          </span>
        </a>
        <a
          href="#audience"
          onClick={closeMenu}
          className="text-[32px] sm:text-[36px] font-medium text-black hover:opacity-60 transition-opacity tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          All Fields
        </a>
        <a
          href="#curriculum"
          onClick={closeMenu}
          className="text-[32px] sm:text-[36px] font-medium text-black hover:opacity-60 transition-opacity tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Curriculum
        </a>
        <a
          href="#opportunities"
          onClick={closeMenu}
          className="text-[32px] sm:text-[36px] font-medium text-emerald-600 hover:opacity-80 transition-opacity tracking-tight flex items-center justify-between"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <span>Free Certs & IIT</span>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
            ₹0
          </span>
        </a>
        <a
          href="#pricing"
          onClick={closeMenu}
          className="text-[32px] sm:text-[36px] font-medium text-black hover:opacity-60 transition-opacity tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Pricing (₹89)
        </a>
        <a
          href="#mentor"
          onClick={closeMenu}
          className="text-[32px] sm:text-[36px] font-medium text-black hover:opacity-60 transition-opacity tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          About
        </a>
        <a
          href="#faq"
          onClick={closeMenu}
          className="text-[32px] sm:text-[36px] font-medium text-black hover:opacity-60 transition-opacity tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          FAQ
        </a>

        <div className="pt-6 border-t border-black/10">
          <button
            type="button"
            onClick={handleJoinClick}
            className="w-full py-4 rounded-full bg-[#0A0A0A] text-white text-[15px] font-bold uppercase tracking-wider text-center cursor-pointer shadow-lg active:scale-98 transition-all"
          >
            JOIN NOW — ₹89
          </button>
        </div>
      </div>
    </>
  );
};
