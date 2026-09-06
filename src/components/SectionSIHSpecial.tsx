import React, { useRef } from 'react';
import { SIH_WORKSHOP_DATA, PAYMENT_URL } from '../data';
import {
  Trophy,
  Target,
  Code2,
  Presentation,
  Mic,
  FileCheck,
  Sparkles,
  MessageSquare,
  Video,
  ArrowRight,
  Clock,
  Users,
  Check,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface SectionSIHSpecialProps {
  onJoinClick: (trackId?: string) => void;
}

export const SectionSIHSpecial: React.FC<SectionSIHSpecialProps> = ({ onJoinClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target':
        return <Target className="w-5 h-5 text-amber-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'Presentation':
        return <Presentation className="w-5 h-5 text-purple-400" />;
      case 'Mic':
        return <Mic className="w-5 h-5 text-emerald-400" />;
      default:
        return <Zap className="w-5 h-5 text-amber-400" />;
    }
  };

  const getDeliverableIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCheck':
        return <FileCheck className="w-4 h-4 text-amber-400" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'MessageSquare':
        return <MessageSquare className="w-4 h-4 text-cyan-400" />;
      case 'Video':
        return <Video className="w-4 h-4 text-emerald-400" />;
      default:
        return <Check className="w-4 h-4 text-amber-400" />;
    }
  };

  const handleEnroll = () => {
    if (PAYMENT_URL && PAYMENT_URL.trim() !== '' && PAYMENT_URL !== '#') {
      window.open(PAYMENT_URL, '_blank', 'noopener,noreferrer');
    } else {
      onJoinClick('sih-masterclass');
    }
  };

  return (
    <section
      id="sih"
      ref={containerRef}
      className="relative z-10 w-full py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-14 lg:px-20 bg-[#070709] text-white border-t border-white/10 overflow-hidden"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Eyebrow Badge */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 text-[11px] sm:text-xs font-mono uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>{SIH_WORKSHOP_DATA.badge}</span>
          </div>
          <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest hidden sm:inline-block">
            // SPECIAL SPRINT
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-4xl">
          <h2
            className="text-[30px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-semibold tracking-tight leading-[1.08] text-white mb-4 sm:mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {SIH_WORKSHOP_DATA.headline}
          </h2>
          <p className="text-[15px] sm:text-[18px] md:text-[20px] text-white/90 font-medium leading-relaxed mb-10 sm:mb-12">
            {SIH_WORKSHOP_DATA.subheadline}
          </p>
        </div>

        {/* High-Impact 4 Pillars Grid (Mobile 1 col, Tablet/Desktop 2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {SIH_WORKSHOP_DATA.pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="group p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/15 hover:border-amber-400/50 transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getPillarIcon(pillar.icon)}
                    </div>
                    <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                      PILLAR {pillar.number}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/15">
                    {pillar.tagline}
                  </span>
                </div>

                <h3
                  className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 sm:mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {pillar.title}
                </h3>

                <p className="text-sm text-white/85 font-normal leading-relaxed mb-5">
                  {pillar.description}
                </p>
              </div>

              {/* Key takeaways bullet list */}
              <div className="space-y-2 pt-4 border-t border-white/15">
                {pillar.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-white/90 font-medium">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Deliverables & Fast Enrollment Box (Responsive 12-col) */}
        <div className="p-6 sm:p-10 md:p-12 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Col: Included Deliverables & Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Everything You Need to Compete & Win</span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  What You Get in this 2-Hour Intensive
                </h3>
                <p className="text-sm sm:text-base text-white/85 font-medium mt-1">
                  Complete blueprint designed so any college team can build and pitch with zero confusion.
                </p>
              </div>

              {/* 4 Deliverables Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {SIH_WORKSHOP_DATA.deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-black/60 border border-white/15 flex items-start gap-3"
                  >
                    <div className="p-2 rounded-lg bg-white/10 border border-white/15 shrink-0">
                      {getDeliverableIcon(item.icon)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-tight mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11.5px] text-white/75 font-medium leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timing & Format Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 text-xs font-mono text-white/70">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{SIH_WORKSHOP_DATA.timingInfo.durationText}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>{SIH_WORKSHOP_DATA.timingInfo.seatsText}</span>
                </div>
                <span>•</span>
                <span>Live Zoom + Instant Q&A</span>
              </div>
            </div>

            {/* Right Col: Price Card & Immediate Action */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-black/80 border border-amber-500/40 flex flex-col justify-between relative shadow-xl">
              <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl rounded-tr-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[10px] font-bold font-mono tracking-wider uppercase">
                Direct Pass
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/50 mb-1">
                  Special Live Session Fee
                </div>
                <div className="flex items-baseline gap-2.5 mb-2">
                  <span className="text-5xl sm:text-6xl font-bold tracking-tight text-white">
                    {SIH_WORKSHOP_DATA.price}
                  </span>
                  <span className="text-sm sm:text-base text-white/40 line-through">
                    {SIH_WORKSHOP_DATA.originalPrice}
                  </span>
                  <span className="text-xs font-mono font-semibold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                    90% OFF
                  </span>
                </div>
                <p className="text-xs text-amber-400 font-mono mb-5">
                  Zero commission • Direct UPI • Instant Zoom Link Confirmation
                </p>

                {/* Team Value Highlight */}
                <div className="p-3.5 rounded-xl bg-amber-500/[0.07] border border-amber-500/20 mb-6 text-xs text-white/80 space-y-1.5">
                  <div className="font-semibold text-amber-300 flex items-center justify-between">
                    <span>1 Ticket Covers Your Whole Team</span>
                    <span className="text-white/60 font-mono">Team Pass</span>
                  </div>
                  <p className="text-[11px] text-white/65 leading-relaxed">
                    You can join the live session and share the included PPT templates, prompt files & recording with all 6 of your SIH teammates!
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  type="button"
                  onClick={handleEnroll}
                  id="enroll-sih-btn"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 hover:from-amber-300 hover:to-orange-300 text-black text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer active:scale-95"
                >
                  <span>Enroll in SIH Session — ₹199</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-white/50">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Instant Access & Confirmation via WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
