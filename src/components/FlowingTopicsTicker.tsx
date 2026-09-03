import React from 'react';
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
  Terminal,
  Layers,
  Wand2,
  Workflow,
  Sparkles,
} from 'lucide-react';
import { WORKSHOP_TOPICS } from '../data';

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

const secondaryToolHighlights = [
  { name: "Cursor IDE & AI Coding", tag: "Full IDE Mastery" },
  { name: "100+ Prompt Swipe File", tag: "Immediate Download" },
  { name: "ATS-Proof Resume AI", tag: "Hiring Ready" },
  { name: "24-Hour Hackathon MVP", tag: "Live Deployment" },
  { name: "Make.com Business Automations", tag: "No-Code Workflows" },
  { name: "Deep Research with Perplexity", tag: "Academic Synthesis" },
  { name: "Canva & Gamma Pitch Decks", tag: "Executive Polish" },
  { name: "Freelance Proposal Funnel", tag: "Client Outreach" },
  { name: "GitHub Portfolio Repository", tag: "Verifiable Proof" },
];

interface FlowingTopicsTickerProps {
  onExploreClick?: () => void;
}

export const FlowingTopicsTicker: React.FC<FlowingTopicsTickerProps> = ({ onExploreClick }) => {
  // Duplicate arrays for seamless infinite marquee loop with zero stutter
  const primaryTickerItems = [...WORKSHOP_TOPICS, ...WORKSHOP_TOPICS];
  const secondaryTickerItems = [...secondaryToolHighlights, ...secondaryToolHighlights];

  return (
    <div className="relative z-20 w-full overflow-hidden bg-[#0A0A0A] text-white border-y border-white/10 py-5 sm:py-6 select-none shadow-2xl">
      {/* Top Header Bar / Live Status Indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-3 sm:mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-white/75">
            9 High-Income Skills • Daily Batch Capped at 20 Seats • 7-Day Live Masterclass
          </span>
        </div>
        <a
          href="#modules"
          className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono uppercase text-white/50 hover:text-white transition-colors"
        >
          <span>Curriculum Breakdown</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* Row 1: 9 Core Skills Flow (Left-to-Right Marquee) */}
      <div className="relative w-full overflow-hidden flex mb-2.5">
        {/* Soft Edge Fade Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

        <div className="animate-marquee-flow flex items-center gap-3 sm:gap-4 py-1">
          {primaryTickerItems.map((topic, index) => {
            const IconComponent = iconMap[topic.icon] || Zap;
            const itemNumber = String((index % WORKSHOP_TOPICS.length) + 1).padStart(2, '0');

            return (
              <div
                key={`primary-${topic.id}-${index}`}
                className="group inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.12] border border-white/10 hover:border-white/30 transition-all duration-300 shrink-0 cursor-default"
              >
                <span className="text-[9px] font-mono font-bold text-white/40 group-hover:text-emerald-400 transition-colors">
                  {itemNumber}
                </span>

                <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-white/90 group-hover:text-white shrink-0 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-3.5 h-3.5" />
                </div>

                <span className="text-[12.5px] sm:text-[13.5px] font-medium tracking-tight text-white/90 group-hover:text-white whitespace-nowrap">
                  {topic.title}
                </span>

                <span className="hidden md:inline-block text-[9.5px] font-mono text-white/50 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                  {topic.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Practical Deliverables Counter-Flow (Reverse Marquee) */}
      <div className="relative w-full overflow-hidden flex">
        {/* Soft Edge Fade Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

        <div className="animate-marquee-flow-reverse flex items-center gap-3 sm:gap-4 py-1">
          {secondaryTickerItems.map((item, index) => (
            <div
              key={`sec-${item.name}-${index}`}
              className="group inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 transition-all duration-300 shrink-0 cursor-default text-xs"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 group-hover:bg-emerald-300 transition-colors shrink-0" />
              <span className="text-white/70 group-hover:text-white transition-colors font-medium whitespace-nowrap">
                {item.name}
              </span>
              <span className="text-[9px] font-mono text-white/40 px-1.5 py-0.5 rounded bg-white/5 whitespace-nowrap">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
