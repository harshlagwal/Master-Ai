import React from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { WORKSHOP_TOPICS, BRAND } from '../data';

interface CurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnrollClick: (trackId?: string) => void;
}

export const CurriculumModal: React.FC<CurriculumModalProps> = ({
  isOpen,
  onClose,
  onEnrollClick,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] bg-[#0E0E0E] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/15 relative overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-white/10 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] sm:text-xs font-mono uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Full 7-Day Curriculum Breakdown</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
              The 9 High-Income AI Skills
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1">
              Zero theory fluff. Hands-on autonomous workflows, agentic architecture & live real-world build proof.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable list of 9 topics */}
        <div className="overflow-y-auto py-5 space-y-3.5 pr-1 sm:pr-2 custom-scrollbar">
          {WORKSHOP_TOPICS.map((topic, idx) => (
            <div
              key={topic.id || idx}
              className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-white/80 text-xs font-mono flex items-center justify-center font-bold">
                    0{idx + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {topic.title}
                  </h3>
                </div>
                <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5">
                  {topic.category}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 ml-8 sm:ml-9 leading-relaxed">
                {topic.description}
              </p>

              <div className="mt-3 ml-8 sm:ml-9 pt-2.5 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-medium">
                    Build Proof: {topic.deliverable}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {topic.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-white/5"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer with action */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-neutral-400 text-center sm:text-left">
            <span className="text-white font-medium">{BRAND.batchSize}</span> • Daily 8:00 PM IST on Google Meet
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onClose();
                onEnrollClick('week-pass-299');
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-black font-bold text-xs hover:opacity-90 transition-all cursor-pointer"
            >
              <span>Get 1-Week Pass (₹299)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEnrollClick('master-pass');
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white/15 hover:bg-white text-white hover:text-black border border-white/25 font-semibold text-xs transition-all cursor-pointer"
            >
              <span>Full Pass ₹89</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
