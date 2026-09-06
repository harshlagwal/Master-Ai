import React, { useRef } from 'react';
import { motion } from 'motion/react';
import {
  Zap,
  Code2,
  Palette,
  BookOpen,
  Trophy,
  Briefcase,
  CircleDollarSign,
  Cpu,
  Globe,
  ArrowRight,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { WORKSHOP_TOPICS } from '../data';
import { WorkshopTopic } from '../types';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Code2,
  Palette,
  BookOpen,
  Trophy,
  Briefcase,
  CircleDollarSign,
  Cpu,
  Globe,
};

interface SectionCoreModulesProps {
  onJoinClick: () => void;
}

interface SpotlightCardProps {
  module: WorkshopTopic;
  index: number;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ module, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const IconComponent = iconMap[module.icon] || Zap;
  const numberFormatted = String(index + 1).padStart(2, '0');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !spotlightRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(81, 75, 130, 0.08), transparent 70%)`;
      }
    });
  };

  const handleMouseEnter = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative p-6 sm:p-7 rounded-2xl bg-white border border-black/8 hover:border-black/30 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl overflow-hidden will-change-transform"
    >
      {/* Interactive Spotlight Glow Effect (Smooth follow on mouse cursor, zero React re-renders) */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(400px circle at -200px -200px, rgba(81, 75, 130, 0.08), transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Top Bar: Number & Category */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-[11px] font-mono font-bold text-black/35 group-hover:text-black transition-colors">
            MODULE {numberFormatted}
          </span>
          <span className="text-[10px] font-mono text-black/65 px-2.5 py-0.5 rounded-full bg-neutral-100 group-hover:bg-black group-hover:text-white transition-colors border border-neutral-200 group-hover:border-black">
            {module.category}
          </span>
        </div>

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:bg-[#514b82] transition-all duration-300">
            <IconComponent className="w-5 h-5" />
          </div>
          <h3
            className="text-[18px] sm:text-[19px] font-semibold text-black leading-snug tracking-tight group-hover:translate-x-0.5 transition-transform duration-200"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {module.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[13.5px] sm:text-[14px] text-black/70 leading-relaxed mb-5">
          {module.description}
        </p>

        {/* Key Deliverable */}
        <div className="mb-5 p-3 rounded-xl bg-neutral-50 group-hover:bg-neutral-100/70 border border-black/5 transition-colors">
          <div className="text-[10px] font-mono uppercase tracking-wider text-black/50 mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Fresher Takeaway</span>
          </div>
          <div className="text-[12px] font-medium text-black/85 leading-snug">
            {module.deliverable}
          </div>
        </div>
      </div>

      {/* Bottom Tools Badges */}
      <div className="relative z-10 pt-3 border-t border-black/5 flex flex-wrap items-center gap-1.5">
        {module.tools.map((tool, tIdx) => (
          <span
            key={tIdx}
            className="text-[10.5px] font-mono px-2 py-0.5 rounded bg-black/5 text-black/65 border border-black/5 group-hover:border-black/15 transition-colors"
          >
            {tool}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export const SectionCoreModules: React.FC<SectionCoreModulesProps> = ({ onJoinClick }) => {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = scrollRef.current.offsetWidth * 0.85;
    const index = Math.round(scrollLeft / itemWidth);
    setActiveSlide(Math.min(Math.max(index, 0), WORKSHOP_TOPICS.length - 1));
  };

  const scrollToSlide = (index: number) => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.querySelectorAll('.core-module-card');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveSlide(index);
    }
  };

  return (
    <section
      id="modules"
      className="relative z-10 w-full py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#F7F7F6] text-[#0A0A0A] border-t border-black/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Identifier */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="text-[12px] font-mono tracking-widest text-black/40 uppercase mb-3">
              02 // CURRICULUM ARCHITECTURE
            </div>
            <h2
              className="text-[32px] sm:text-[44px] md:text-[54px] font-medium tracking-tight leading-[1.08] text-black"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              The 9 Core Skills You Will Master
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs font-mono text-black/75 self-start sm:self-auto">
              <Users className="w-3.5 h-3.5 text-black/60" />
              <span>Capped at 20 Students / Day</span>
            </div>
            {/* Mobile swipe counter */}
            <span className="text-xs font-mono text-black/50 md:hidden">
              {activeSlide + 1}/{WORKSHOP_TOPICS.length}
            </span>
          </div>
        </div>

        {/* Sub-headline */}
        <p className="text-[16px] sm:text-[18px] text-black/70 font-normal leading-relaxed max-w-3xl mb-10 sm:mb-12">
          Every skill is taught through real-time building on Zoom. No passive video lectures,
          no fake promises. You walk away with tangible projects, working automations, and
          practical systems you can showcase to recruiters and clients.
        </p>

        {/* 9 Modules: Mobile Touch-Snap Swiper | Desktop 3-Column Grid */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 scrollbar-none"
        >
          {WORKSHOP_TOPICS.map((module, index) => (
            <div
              key={module.id}
              className="core-module-card shrink-0 w-[84vw] max-w-[340px] md:w-auto md:max-w-none snap-center flex flex-col"
            >
              <SpotlightCard module={module} index={index} />
            </div>
          ))}
        </div>

        {/* Mobile Indicator Dots */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-4">
          {WORKSHOP_TOPICS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              aria-label={`Go to module ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === i ? 'w-5 bg-black' : 'w-1.5 bg-black/20'
              }`}
            />
          ))}
        </div>

        {/* Section Bottom Banner - Value Clarification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-black text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl relative overflow-hidden"
        >
          {/* Subtle Corner Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-widest text-emerald-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All 9 Modules Included in 1 Single Ticket</span>
            </div>
            <h4
              className="text-[20px] sm:text-[24px] font-medium text-white mb-2 leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              No Separate Passes. No Forced Upsells. Just ₹89.
            </h4>
            <p className="text-[13px] sm:text-[14px] text-white/70 leading-relaxed">
              Every participant gets complete 7-day live access to every module listed above.
              Batch is strictly capped at 20 students per day to maintain live interaction and direct doubt clearing.
            </p>
          </div>

          <button
            type="button"
            onClick={onJoinClick}
            className="px-6 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black text-[13px] font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shrink-0 transition-all cursor-pointer shadow-md active:scale-95 relative z-10"
          >
            <span>Enroll in Today's Batch — ₹89</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
