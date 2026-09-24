import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Download,
  ArrowRight,
  Sparkles,
  Bot,
  Terminal,
  Code2,
  Cpu,
  Layers,
  Award,
  Briefcase,
  HelpCircle,
  Calendar,
  Users,
} from 'lucide-react';

interface NavbarProps {
  onJoinClick: (trackId?: string) => void;
  onWhatsAppClick: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

interface DropdownItem {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  targetId?: string;
  action?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onJoinClick,
  onWhatsAppClick,
  theme,
  toggleTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<'products' | 'usecases' | 'resources' | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      // Close dropdown on scroll
      setActiveDropdown(null);
    };
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseEnter = (menuKey: 'products' | 'usecases' | 'resources') => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleDropdownPanelEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const toggleDropdown = (menuKey: 'products' | 'usecases' | 'resources') => {
    setActiveDropdown((prev) => (prev === menuKey ? null : menuKey));
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const scrollToSection = (e?: React.MouseEvent, id?: string) => {
    if (e) e.preventDefault();
    closeMenu();
    setActiveDropdown(null);
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isDark = theme === 'dark';

  // Mega-menu datasets matching Google Antigravity aesthetic
  const productsItems: DropdownItem[] = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <path d="M12 3L5 20h3.5l1.8-5h3.4l1.8 5H19L12 3z" />
          <path d="M10.8 13h2.4" />
        </svg>
      ),
      title: 'Master AI 2.0 & Next-Gen LLMs',
      subtitle: 'Claude 3.5, ChatGPT-4o & prompt architecture',
      targetId: 'curriculum',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <rect width="18" height="14" x="3" y="5" rx="2" />
          <path d="m7 9 2 2-2 2" />
          <path d="M12 13h4" />
        </svg>
      ),
      title: 'AI Agentic Workflows & CLI',
      subtitle: 'Autonomous agents, n8n & automated pipelines',
      targetId: 'curriculum',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <path d="M19.439 7.85c-.049-.322.059-.648.289-.878l1.568-1.568a1.5 1.5 0 0 0-2.121-2.121l-1.568 1.568c-.23.23-.556.338-.878.289A4.004 4.004 0 0 0 12.5 7H11a1 1 0 0 1-1-1V4.5a2.5 2.5 0 0 0-5 0V6a1 1 0 0 1-1 1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1.5a2.5 2.5 0 0 0 0-5H16a1 1 0 0 1-1-1v-1.5a4.004 4.004 0 0 0 4.439-1.65z" />
        </svg>
      ),
      title: 'Full-Stack Prototypes & Extensions',
      subtitle: 'Zero to live production apps with Bolt & Lovable',
      targetId: 'projects',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <path d="m16 18 6-6-6-6" />
          <path d="m8 6-6 6 6 6" />
        </svg>
      ),
      title: 'Cursor IDE & AI Coding Suite',
      subtitle: 'Build production software without syntax barriers',
      targetId: 'curriculum',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="m10 10-2 2 2 2" />
          <path d="m14 10 2 2-2 2" />
        </svg>
      ),
      title: 'Open-Source SDK & Local RAG',
      subtitle: 'Ollama, Hugging Face & custom vector knowledge',
      targetId: 'curriculum',
    },
  ];

  const usecasesItems: DropdownItem[] = [
    {
      icon: <Terminal className="w-4 h-4" />,
      title: 'College Freshers & Tech Builders',
      subtitle: 'Build real portfolio MVPs and skip theory tutorial hell',
      targetId: 'journey',
    },
    {
      icon: <Award className="w-4 h-4" />,
      title: 'Hackathon Competitors & Teams',
      subtitle: 'Winning slide architecture, live working demos & pitch defense',
      targetId: 'journey',
    },
    {
      icon: <Briefcase className="w-4 h-4" />,
      title: 'Freelancers & Agency Owners',
      subtitle: 'High-ticket client acquisition, ATS resumes & proposals',
      targetId: 'journey',
    },
    {
      icon: <Cpu className="w-4 h-4" />,
      title: 'Non-Tech & Commerce Researchers',
      subtitle: 'Zero-coding research pipelines, NotebookLM & notes',
      targetId: 'journey',
    },
  ];

  const resourcesItems: DropdownItem[] = [
    {
      icon: <HelpCircle className="w-4 h-4" />,
      title: 'Frequently Asked Questions',
      subtitle: 'Clear answers on timings, recordings, certificates & fees',
      targetId: 'faq',
    },
    {
      icon: <Award className="w-4 h-4" />,
      title: 'Skill India & Verified Certifications',
      subtitle: 'How to claim legitimate government & upGrad credentials',
      targetId: 'journey',
    },
    {
      icon: <Users className="w-4 h-4" />,
      title: 'VIP WhatsApp Mentorship Community',
      subtitle: 'Direct network of ambitious student builders and Harsh',
      action: onWhatsAppClick,
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      title: '30-Minute Free Live Demo Class',
      subtitle: 'Experience practical AI engineering live on Google Meet',
      action: () => onJoinClick('demo-free'),
    },
  ];

  return (
    <>
      {/* Floating Google Antigravity Header Bar */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? 'top-2.5 sm:top-3.5 w-[92%] sm:w-[90%] max-w-5xl'
            : 'top-3.5 sm:top-5 w-[95%] max-w-6xl'
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`flex items-center justify-between px-3.5 sm:px-6 h-12 sm:h-14 rounded-full border transition-all duration-500 relative ${
            isDark
              ? scrolled
                ? 'bg-[#050506]/95 md:bg-[#09090C]/92 shadow-[0_20px_45px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(255,255,255,0.18)] border-white/20 text-white'
                : 'bg-[#050506]/95 md:bg-[#09090C]/80 shadow-[0_8px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] border-white/12 text-white'
              : scrolled
                ? 'bg-white/98 md:bg-white/95 shadow-[0_16px_40px_-6px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)] border-slate-300 text-slate-900'
                : 'bg-white/98 md:bg-white/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.8)] border-slate-200/80 text-slate-900'
          }`}
          style={{
            backdropFilter: isDesktop ? 'blur(16px)' : undefined,
            WebkitBackdropFilter: isDesktop ? 'blur(16px)' : undefined,
          }}
        >
          {/* Left: Google Antigravity Brand Logo with Spring Hover */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            className="flex items-center gap-2 no-underline group shrink-0 select-none mr-1 sm:mr-3"
          >
            {/* Google Antigravity Multi-Color Chevron / 'A' Icon */}
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 transition-transform duration-300 group-hover:scale-110"
            >
              <path
                d="M12 2.5L3.5 19.5H7.5L12 9.5L16.5 19.5H20.5L12 2.5Z"
                fill="url(#google-antigravity-grad)"
              />
              <defs>
                <linearGradient
                  id="google-antigravity-grad"
                  x1="3.5"
                  y1="2.5"
                  x2="20.5"
                  y2="19.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#4285F4" />
                  <stop offset="35%" stopColor="#EA4335" />
                  <stop offset="70%" stopColor="#FBBC05" />
                  <stop offset="100%" stopColor="#34A853" />
                </linearGradient>
              </defs>
            </svg>

            <span
              className={`text-sm sm:text-[15px] font-normal sm:font-medium tracking-tight whitespace-nowrap transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Master AI
            </span>
          </motion.a>

          {/* Center: Google Antigravity Navigation Links with Magnetic Sliding Indicator */}
          <nav
            onMouseLeave={() => setHoveredNav(null)}
            className="hidden md:flex items-center gap-0.5 text-xs font-normal sm:font-medium relative"
          >
            {/* 1. Products / Curriculum Dropdown Trigger */}
            <button
              type="button"
              onMouseEnter={() => {
                handleMouseEnter('products');
                setHoveredNav('products');
              }}
              onClick={() => toggleDropdown('products')}
              className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer flex items-center gap-1 select-none z-10 ${
                activeDropdown === 'products'
                  ? isDark
                    ? 'text-white font-medium'
                    : 'text-black font-medium'
                  : isDark
                    ? 'text-neutral-300 hover:text-white'
                    : 'text-slate-600 hover:text-black'
              }`}
            >
              {hoveredNav === 'products' && (
                <motion.div
                  layoutId="navbarHoverPill"
                  transition={{ type: "spring", stiffness: 480, damping: 34 }}
                  className={`absolute inset-0 rounded-full -z-10 ${
                    isDark ? 'bg-white/10' : 'bg-slate-200/80'
                  }`}
                />
              )}
              <span>Products</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-250 ${
                  activeDropdown === 'products' ? 'rotate-180 text-amber-500 dark:text-amber-400' : 'opacity-70'
                }`}
              />
            </button>

            {/* 2. Use Cases Dropdown Trigger */}
            <button
              type="button"
              onMouseEnter={() => {
                handleMouseEnter('usecases');
                setHoveredNav('usecases');
              }}
              onClick={() => toggleDropdown('usecases')}
              className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer flex items-center gap-1 select-none z-10 ${
                activeDropdown === 'usecases'
                  ? isDark
                    ? 'text-white font-medium'
                    : 'text-black font-medium'
                  : isDark
                    ? 'text-neutral-300 hover:text-white'
                    : 'text-slate-600 hover:text-black'
              }`}
            >
              {hoveredNav === 'usecases' && (
                <motion.div
                  layoutId="navbarHoverPill"
                  transition={{ type: "spring", stiffness: 480, damping: 34 }}
                  className={`absolute inset-0 rounded-full -z-10 ${
                    isDark ? 'bg-white/10' : 'bg-slate-200/80'
                  }`}
                />
              )}
              <span>Use Cases</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-250 ${
                  activeDropdown === 'usecases' ? 'rotate-180 text-amber-500 dark:text-amber-400' : 'opacity-70'
                }`}
              />
            </button>

            {/* 3. Pricing (Direct Link) */}
            <a
              href="#pricing"
              onMouseEnter={() => setHoveredNav('pricing')}
              onClick={(e) => scrollToSection(e, 'pricing')}
              className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer select-none z-10 ${
                isDark
                  ? 'text-neutral-300 hover:text-white'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              {hoveredNav === 'pricing' && (
                <motion.div
                  layoutId="navbarHoverPill"
                  transition={{ type: "spring", stiffness: 480, damping: 34 }}
                  className={`absolute inset-0 rounded-full -z-10 ${
                    isDark ? 'bg-white/10' : 'bg-slate-200/80'
                  }`}
                />
              )}
              <span>Pricing</span>
            </a>

            {/* 4. Projects (Direct Link) */}
            <a
              href="#projects"
              onMouseEnter={() => setHoveredNav('projects')}
              onClick={(e) => scrollToSection(e, 'projects')}
              className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer select-none z-10 ${
                isDark
                  ? 'text-neutral-300 hover:text-white'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              {hoveredNav === 'projects' && (
                <motion.div
                  layoutId="navbarHoverPill"
                  transition={{ type: "spring", stiffness: 480, damping: 34 }}
                  className={`absolute inset-0 rounded-full -z-10 ${
                    isDark ? 'bg-white/10' : 'bg-slate-200/80'
                  }`}
                />
              )}
              <span>Projects</span>
            </a>

            {/* 5. Resources Dropdown Trigger */}
            <button
              type="button"
              onMouseEnter={() => {
                handleMouseEnter('resources');
                setHoveredNav('resources');
              }}
              onClick={() => toggleDropdown('resources')}
              className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer flex items-center gap-1 select-none z-10 ${
                activeDropdown === 'resources'
                  ? isDark
                    ? 'text-white font-medium'
                    : 'text-black font-medium'
                  : isDark
                    ? 'text-neutral-300 hover:text-white'
                    : 'text-slate-600 hover:text-black'
              }`}
            >
              {hoveredNav === 'resources' && (
                <motion.div
                  layoutId="navbarHoverPill"
                  transition={{ type: "spring", stiffness: 480, damping: 34 }}
                  className={`absolute inset-0 rounded-full -z-10 ${
                    isDark ? 'bg-white/10' : 'bg-slate-200/80'
                  }`}
                />
              )}
              <span>Resources</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-250 ${
                  activeDropdown === 'resources' ? 'rotate-180 text-amber-500 dark:text-amber-400' : 'opacity-70'
                }`}
              />
            </button>
          </nav>

          {/* Right: Rocket, Black Pill CTA & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Rocket Action Button (Google Antigravity Quick Launch with Spring Tilt) */}
            <motion.button
              whileHover={{ scale: 1.25, rotate: -15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 450, damping: 18 }}
              type="button"
              onClick={() => onJoinClick('demo-free')}
              title="Launch Free Live Demo (Only 2 Days)"
              className="hidden sm:inline-flex text-base cursor-pointer select-none px-1"
            >
              🚀
            </motion.button>

            {/* Google Antigravity Style Black Pill Action Button - Hidden on mobile for sleek clean view */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              type="button"
              onClick={() => onJoinClick('master-pass')}
              className={`hidden sm:flex group h-8 sm:h-9 px-3.5 sm:px-4 rounded-full font-medium text-xs transition-colors duration-200 cursor-pointer shadow-sm whitespace-nowrap items-center gap-1.5 ${
                isDark
                  ? 'bg-white text-black hover:bg-neutral-100'
                  : 'bg-slate-950 text-white hover:bg-slate-800'
              }`}
            >
              <span>Enroll</span>
              <span className="opacity-40">•</span>
              <span className="font-semibold">₹89</span>
              <Download className="w-3.5 h-3.5 stroke-[2] ml-0.5 transition-transform duration-200 group-hover:translate-y-0.5" />
            </motion.button>

            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ rotate: 18, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme mode"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer shrink-0 ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-black'
              }`}
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5" />
              ) : (
                <Moon className="w-3.5 h-3.5" />
              )}
            </motion.button>

            {/* Mobile Drawer Menu Toggle */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              className={`md:hidden w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                isDark
                  ? 'bg-white/10 text-white/80 hover:text-white'
                  : 'bg-slate-100 text-slate-800 hover:text-black border border-slate-200'
              }`}
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* GOOGLE ANTIGRAVITY MEGA-DROPDOWN PANEL (BUTTERY SMOOTH MOTION ANIMATION) */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              key={activeDropdown}
              initial={{ opacity: 0, y: -10, scale: 0.98, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, scale: 0.98, filter: "blur(6px)" }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={handleDropdownPanelEnter}
              className={`hidden md:block absolute top-[calc(100%+8px)] left-0 right-0 rounded-3xl border overflow-hidden shadow-2xl p-7 transition-colors ${
                isDark
                  ? 'bg-[#0A0A0D]/95 border-white/15 text-white shadow-[0_25px_60px_rgba(0,0,0,0.85)]'
                  : 'bg-white/98 border-slate-200/90 text-slate-900 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)]'
              }`}
              style={{
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
              }}
            >
              {/* Dropdown Content Grid */}
              <div className="grid grid-cols-12 gap-8 items-start">
                {/* Left Column (38% Width): Bold Google Antigravity Title & Action Pill */}
                <div className="col-span-5 pr-6 border-r border-slate-200/60 dark:border-white/10 flex flex-col justify-between min-h-[220px]">
                  <div>
                    <h3
                      className={`text-2xl sm:text-[26px] font-semibold tracking-tight leading-snug mb-3 ${
                        isDark ? 'text-white' : 'text-slate-950'
                      }`}
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {activeDropdown === 'products' && (
                        <>
                          Explore our <br />
                          next generation <br />
                          curriculum
                        </>
                      )}
                      {activeDropdown === 'usecases' && (
                        <>
                          Built for ambitious <br />
                          builders & students <br />
                          across all branches
                        </>
                      )}
                      {activeDropdown === 'resources' && (
                        <>
                          Production kits, <br />
                          free credentials & <br />
                          live guidance
                        </>
                      )}
                    </h3>

                    <p className={`text-xs leading-relaxed font-normal ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                      {activeDropdown === 'products' &&
                        'Hands-on engineering across all 9 high-income skills with 100% practical MVP proof.'}
                      {activeDropdown === 'usecases' &&
                        'From college internal hackathons to high-ticket freelancing and ATS resume leverage.'}
                      {activeDropdown === 'resources' &&
                        'Direct WhatsApp doubt clearing, tested prompt swipe files and official certification roadmaps.'}
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        if (activeDropdown === 'products') scrollToSection(undefined, 'curriculum');
                        else if (activeDropdown === 'usecases') scrollToSection(undefined, 'journey');
                        else scrollToSection(undefined, 'faq');
                      }}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                        isDark
                          ? 'bg-white/10 hover:bg-white/18 text-neutral-200'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      <span>
                        {activeDropdown === 'products' && 'See overview'}
                        {activeDropdown === 'usecases' && 'Explore 7-day roadmap'}
                        {activeDropdown === 'resources' && 'View FAQs & Proof'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-70" />
                    </button>
                  </div>
                </div>

                {/* Right Column (62% Width): Categorized Item List with Antigravity Wireframe Icons */}
                <div className="col-span-7">
                  <div className="mb-3">
                    <span
                      className={`text-[11px] font-mono uppercase tracking-wider ${
                        isDark ? 'text-neutral-500' : 'text-slate-400'
                      }`}
                    >
                      {activeDropdown === 'products' && 'Products & AI Modules'}
                      {activeDropdown === 'usecases' && 'Target Audiences & Leverage'}
                      {activeDropdown === 'resources' && 'Resources & Support'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {(activeDropdown === 'products'
                      ? productsItems
                      : activeDropdown === 'usecases'
                        ? usecasesItems
                        : resourcesItems
                    ).map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          if (item.action) {
                            item.action();
                            setActiveDropdown(null);
                          } else if (item.targetId) {
                            scrollToSection(undefined, item.targetId);
                          }
                        }}
                        className={`group flex items-start gap-3 p-2.5 rounded-2xl transition-all duration-200 cursor-pointer ${
                          isDark
                            ? 'hover:bg-white/[0.06] text-neutral-200 hover:text-white'
                            : 'hover:bg-slate-100/80 text-slate-800 hover:text-black'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 group-hover:scale-110 group-hover:translate-x-0.5 ${
                            isDark
                              ? 'bg-white/[0.08] text-neutral-300 group-hover:text-white group-hover:bg-white/[0.12]'
                              : 'bg-slate-100 text-slate-700 group-hover:text-black group-hover:bg-slate-200/80'
                          }`}
                        >
                          {item.icon}
                        </div>

                        <div className="flex-1 min-w-0 transition-transform duration-200 group-hover:translate-x-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-[13px] font-medium tracking-tight">
                              {item.title}
                            </span>
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-amber-500 dark:text-amber-400" />
                          </div>
                          {item.subtitle && (
                            <p
                              className={`text-[11px] truncate mt-0.5 ${
                                isDark ? 'text-neutral-500 group-hover:text-neutral-400' : 'text-slate-500 group-hover:text-slate-600'
                              }`}
                            >
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
            <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
              <div className="flex items-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2.5L3.5 19.5H7.5L12 9.5L16.5 19.5H20.5L12 2.5Z"
                    fill="url(#mobile-google-grad)"
                  />
                  <defs>
                    <linearGradient
                      id="mobile-google-grad"
                      x1="3.5"
                      y1="2.5"
                      x2="20.5"
                      y2="19.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0%" stopColor="#4285F4" />
                      <stop offset="35%" stopColor="#EA4335" />
                      <stop offset="70%" stopColor="#FBBC05" />
                      <stop offset="100%" stopColor="#34A853" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-sm font-bold">Master AI</span>
              </div>
              <button
                type="button"
                onClick={closeMenu}
                className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center cursor-pointer"
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
                <span>Products & Skills (9 Skills)</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </a>

              <a
                href="#journey"
                onClick={(e) => scrollToSection(e, 'journey')}
                className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-xs font-medium flex items-center justify-between"
              >
                <span>Use Cases & 7-Day Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </a>

              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, 'projects')}
                className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-xs font-medium flex items-center justify-between"
              >
                <span>Projects & MVPs</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </a>

              <a
                href="#mentor"
                onClick={(e) => scrollToSection(e, 'mentor')}
                className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-xs font-medium flex items-center justify-between"
              >
                <span>Meet Mentor (Harsh Lagwal)</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </a>

              <a
                href="#pricing"
                onClick={(e) => scrollToSection(e, 'pricing')}
                className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-xs font-medium flex items-center justify-between"
              >
                <span>Pricing Plans (₹89 / ₹299 / ₹0)</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </a>

              <a
                href="#faq"
                onClick={(e) => scrollToSection(e, 'faq')}
                className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-xs font-medium flex items-center justify-between"
              >
                <span>Resources & FAQ</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </a>
            </div>

            <div className="pt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-black/10 dark:border-white/15 cursor-pointer"
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 cursor-pointer"
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
              className={`w-full py-2.5 rounded-full font-medium text-xs shadow-lg text-center cursor-pointer flex items-center justify-center gap-2 ${
                isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-slate-950 text-white hover:bg-slate-800'
              }`}
            >
              <span>Enroll Full Pass • ₹89</span>
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
