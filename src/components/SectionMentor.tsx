import React from 'react';
import { MENTOR_DATA, SOCIAL_LINKS } from '../data';
import {
  ArrowUpRight,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Award,
  Terminal,
  Linkedin,
  Globe,
} from 'lucide-react';

export const SectionMentor: React.FC = () => {
  return (
    <section
      id="mentor"
      className="relative z-10 w-full py-16 sm:py-20 md:py-28 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#0A0A0A] text-white border-t border-white/10 overflow-hidden"
    >
      {/* Ambient background glow accents matching Harsh's photo orange highlights */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Identifier */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="text-[12px] font-mono tracking-widest text-orange-400 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            06 // INSTRUCTOR & FOUNDER
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-orange-500/30 to-transparent" />
        </div>

        {/* Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <h2
              className="text-[36px] sm:text-[48px] md:text-[58px] lg:text-[66px] font-medium tracking-tight leading-[1.05] text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Meet Your Mentor.
            </h2>
            <p className="text-[16px] sm:text-[18px] text-white/60 font-mono tracking-wide mt-2">
              Learn directly from an IITian builder who ships production software.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-xs font-mono uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              IITian Pedigree
            </span>
            <span className="text-xs font-mono uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              Strictly 20 Seats / Batch
            </span>
          </div>
        </div>

        {/* Main 2-Column Executive Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Editorial Photo Card */}
          <div className="lg:col-span-5 flex flex-col gap-4 max-w-[360px] sm:max-w-[420px] mx-auto lg:max-w-none w-full">
            <div className="relative rounded-3xl p-2 sm:p-2.5 bg-gradient-to-b from-white/15 via-white/5 to-white/10 border border-white/15 shadow-2xl shadow-orange-500/10 group">
              {/* Decorative Corner Glow */}
              <div className="absolute -top-3 -right-3 w-24 h-24 bg-orange-500/20 rounded-full blur-xl pointer-events-none" />

              {/* Photo Frame (9:16 ratio perfectly matches Harsh's editorial photo) */}
              <div className="relative overflow-hidden rounded-[22px] bg-[#0E0E0E] aspect-[9/16] w-full flex items-center justify-center">
                <img
                  src={MENTOR_DATA.image}
                  alt={MENTOR_DATA.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />

                {/* Subtle dark gradient overlay only at very top & bottom edge */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                {/* Top-Left Floating Badge: IITian Mindset */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[11px] sm:text-xs font-mono tracking-wider shadow-lg shadow-black/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold text-white">IITian Pedigree</span>
                </div>

                {/* Top-Right Floating Badge: Live Mentor */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 sm:py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white/90 text-[10px] sm:text-[11px] font-mono shadow-md">
                  <Sparkles className="w-3 h-3 text-orange-400" />
                  <span>Live 1-on-1</span>
                </div>
              </div>
            </div>

            {/* Builder Philosophy Motto Pill Under Photo */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-orange-400 fill-orange-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-bold">
                    BUILDER MOTTO
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-white/90">
                    "Discipline Creates Freedom"
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Verified</span>
              </div>
            </div>

            {/* Quick Links & Socials Below Photo */}
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white hover:text-black border border-white/15 text-white/90 text-xs font-mono transition-all flex items-center justify-center gap-1.5 no-underline group"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400 group-hover:text-black transition-colors" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-white/50 group-hover:text-black" />
              </a>
              <a
                href={SOCIAL_LINKS.contactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white hover:text-black border border-white/15 text-white/90 text-xs font-mono transition-all flex items-center justify-center gap-1.5 no-underline group"
              >
                <Globe className="w-3.5 h-3.5 text-orange-400 group-hover:text-black transition-colors" />
                <span>Portfolio</span>
                <ArrowUpRight className="w-3 h-3 text-white/50 group-hover:text-black" />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Authority, IITian Story, Highlights & Stats */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Header Box */}
            <div className="p-6 sm:p-8 rounded-3xl border border-white/12 bg-white/[0.03]">
              <div className="flex flex-col gap-2 mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3
                    className="text-[34px] sm:text-[46px] font-semibold tracking-tight text-white leading-none"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {MENTOR_DATA.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-medium">
                    <GraduationCap className="w-3.5 h-3.5" />
                    IITian
                  </span>
                </div>

                <div className="text-[15px] sm:text-[17px] text-orange-300/90 font-mono tracking-wide flex items-center gap-2 flex-wrap">
                  <span>{MENTOR_DATA.role}</span>
                </div>

                <p className="text-sm text-white/50 font-mono mt-1">
                  {MENTOR_DATA.tagline}
                </p>
              </div>

              {/* 4-Item Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {MENTOR_DATA.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-white/20 transition-all"
                  >
                    <div className="text-xs font-mono uppercase tracking-wider text-orange-400/80 mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-sm font-medium text-white/90">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Authentic Story Paragraphs */}
              <div className="space-y-4 text-[16px] sm:text-[18px] text-white/80 leading-relaxed font-normal">
                {MENTOR_DATA.mainCopy.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Key Credentials Checklist */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-orange-400" />
                  PRACTICAL CREDIBILITY & DOMAINS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {MENTOR_DATA.credentials.map((cred, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-white/70"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{cred}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Impact Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {MENTOR_DATA.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center hover:border-orange-500/30 transition-all"
                >
                  <div
                    className="text-[28px] sm:text-[34px] font-bold text-white tracking-tight leading-none"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono text-white/50 uppercase tracking-wider mt-1.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Statement Banner */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-orange-400 mb-1">
                  THE MASTER AI PROMISE
                </div>
                <div
                  className="text-[18px] sm:text-[22px] font-medium tracking-wide text-white"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {MENTOR_DATA.statement}
                </div>
              </div>

              <a
                href="#pricing"
                className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm font-mono hover:bg-orange-400 hover:text-black transition-all shadow-lg shrink-0 no-underline"
              >
                Join Live Batch →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
