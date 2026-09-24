import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Calendar, Award, Users, Video } from 'lucide-react';

interface SectionStatsBarProps {
  isDark?: boolean;
}

export const SectionStatsBar: React.FC<SectionStatsBarProps> = ({ isDark = true }) => {
  const stats = [
    { icon: Zap, label: '9 Core Skills', sub: 'Zero theory, 100% build' },
    { icon: Calendar, label: '7 Live Sessions', sub: 'Daily 8:00 PM IST' },
    { icon: Video, label: 'Google Meet', sub: 'Interactive doubts & recordings' },
    { icon: Users, label: '20 Seats Daily', sub: 'Personalized 1-on-1 attention' },
    { icon: Award, label: 'Verified Proof', sub: 'GitHub repos & credentials' },
  ];

  return (
    <section className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-14 py-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`max-w-7xl mx-auto rounded-2xl border p-4 sm:p-5 transition-all duration-300 ${
          isDark
            ? 'bg-[#0A0A0C]/80 border-white/[0.08] text-white backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
            : 'bg-white border-slate-200/90 shadow-sm text-slate-950'
        }`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 hover:bg-white/[0.04] cursor-default group ${
                  i === 4 ? 'col-span-2 sm:col-span-1 justify-center sm:justify-start' : ''
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-200 ${
                    isDark
                      ? 'border-white/10 bg-white/[0.03] text-neutral-200 group-hover:border-white/25 group-hover:text-white group-hover:scale-105'
                      : 'border-slate-200 bg-slate-50 text-slate-700 group-hover:border-slate-300 group-hover:scale-105'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-semibold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {stat.label}
                  </h4>
                  <p className={`text-[10px] sm:text-xs font-mono line-clamp-1 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                    {stat.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
