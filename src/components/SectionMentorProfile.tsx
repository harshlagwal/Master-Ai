import React from 'react';
import { motion } from 'framer-motion';
import { MENTOR_DATA, SOCIAL_LINKS } from '../data';
import { GraduationCap, Award, ShieldCheck, MessageCircle, ExternalLink, Smartphone } from 'lucide-react';

interface SectionMentorProfileProps {
  isDark?: boolean;
  onWhatsAppClick: () => void;
}

export const SectionMentorProfile: React.FC<SectionMentorProfileProps> = ({
  isDark = true,
  onWhatsAppClick,
}) => {
  return (
    <section id="mentor" className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-14 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className={`rounded-3xl p-6 sm:p-10 md:p-12 border transition-all duration-300 relative overflow-hidden ${
            isDark
              ? 'bg-[#0A0A0C]/85 border-white/[0.08] backdrop-blur-xl text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
              : 'bg-white border-slate-200/90 shadow-xl text-slate-900'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Mentor Photo Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                <img
                  src={MENTOR_DATA.image}
                  alt={MENTOR_DATA.name}
                  className="w-full aspect-[4/5] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                      IIT Patna • Gen AI & Data Science
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">{MENTOR_DATA.name}</h3>
                  <p className="text-xs text-neutral-300 font-medium">{MENTOR_DATA.role}</p>
                </div>
              </div>
            </div>

            {/* Right: Bio & Verified Credential Badges */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 dark:text-amber-400 text-xs font-mono uppercase tracking-wider mb-3">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>IIT Patna Scholar • MBA in Gen AI & Data Science</span>
                </div>
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-normal sm:font-medium tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  Meet Harsh Lagwal
                </h2>
                <p className={`mt-2.5 text-sm sm:text-base font-medium ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                  "{MENTOR_DATA.tagline}"
                </p>
                <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                  {MENTOR_DATA.mainCopy[0]}
                </p>
                <p className={`mt-2 text-sm sm:text-base leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                  {MENTOR_DATA.mainCopy[1]}
                </p>
              </div>

              {/* Highlights & Verified Credentials: IIT Patna, IIT Kanpur/upGrad, Skill India */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {/* 1. IIT Patna */}
                <div
                  className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                    isDark ? 'bg-white/[0.03] border-amber-400/20' : 'bg-amber-50/70 border-amber-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <GraduationCap className="w-4 h-4 text-amber-500 shrink-0" />
                    <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>IIT Patna</h4>
                  </div>
                  <p className={`text-[11px] leading-snug ${isDark ? 'text-neutral-300' : 'text-slate-700 font-medium'}`}>
                    MBA in Gen AI & Data Science scholar.
                  </p>
                </div>

                {/* 2. IIT Roorkee */}
                <div
                  className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                    isDark ? 'bg-white/[0.02] border-white/10' : 'bg-slate-50 border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Smartphone className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0" />
                    <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>IIT Roorkee</h4>
                  </div>
                  <p className={`text-[11px] leading-snug ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                    Course certified in Android App Development & Mobile Software.
                  </p>
                </div>

                {/* 3. Skill India & NSDC */}
                <div
                  className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                    isDark ? 'bg-white/[0.02] border-white/10' : 'bg-slate-50 border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>Skill India & NSDC</h4>
                  </div>
                  <p className={`text-[11px] leading-snug ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                    NSDC accredited mentor & national hackathon strategist.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onWhatsAppClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Talk to Harsh on WhatsApp</span>
                </button>

                {SOCIAL_LINKS?.linkedin && (
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-xs sm:text-sm font-medium border transition-colors active:scale-95 ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/10 text-white border-white/15'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    }`}
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
