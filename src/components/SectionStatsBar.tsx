import React from 'react';
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
      <div
        className={`max-w-7xl mx-auto rounded-2xl border p-4 sm:p-6 transition-all duration-300 shadow-md ${
          isDark
            ? 'bg-neutral-900/60 border-white/10 text-white backdrop-blur-md'
            : 'bg-white border-slate-200/90 shadow-sm text-slate-950'
        }`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-2 rounded-xl transition-all duration-200 hover:-translate-y-1 hover:bg-black/5 dark:hover:bg-white/5 cursor-default group"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                    isDark
                      ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20 group-hover:border-amber-400/40'
                      : 'bg-amber-50 text-amber-600 border border-amber-200 group-hover:border-amber-300'
                  }`}
                >
                  <Icon className="w-5 h-5 transition-transform duration-200 group-hover:rotate-6" />
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {stat.label}
                  </h4>
                  <p className={`text-[10px] sm:text-xs line-clamp-1 ${isDark ? 'text-neutral-400' : 'text-slate-600 font-medium'}`}>
                    {stat.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
