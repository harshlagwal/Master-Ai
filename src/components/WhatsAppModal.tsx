import React from 'react';
import { X, MessageCircle, ArrowRight } from 'lucide-react';
import { BRAND } from '../data';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinClick: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  onJoinClick,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-3xl p-7 sm:p-8 shadow-2xl border border-black/10 relative animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/60 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-10 h-10 rounded-full bg-black/5 text-black flex items-center justify-center mb-4">
          <MessageCircle className="w-5 h-5" />
        </div>

        <div className="text-[11px] font-mono font-medium text-black/40 uppercase tracking-widest mb-1">
          COMMUNITY // PEER NETWORK
        </div>

        <h3
          className="text-2xl font-medium text-[#0A0A0A] tracking-tight mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {BRAND.name} Community
        </h3>

        <p className="text-xs sm:text-[14px] text-black/70 mb-6 leading-relaxed font-normal">
          Connect directly with Harsh Lagwal and ambitious peers. Receive live session links, practical tool references, workflow PDFs, and hackathon project discussions.
        </p>

        <div className="space-y-2 p-4 rounded-2xl bg-black/[0.02] border border-black/8 mb-6 text-xs sm:text-[13px] text-black/80 font-normal">
          <div className="flex items-center gap-2">
            <span className="text-black/40">&bull;</span>
            <span>Live Zoom links and evening session reminders</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-black/40">&bull;</span>
            <span>Prompt engineering templates and tool workflows</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-black/40">&bull;</span>
            <span>Moderated peer networking & project collaboration</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="https://chat.whatsapp.com/K6Mq4sj1F9RJWe9NLV6WNk"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Join WhatsApp Community Now</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={() => {
              onClose();
              onJoinClick();
            }}
            className="w-full py-3 px-4 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <span>Or Enroll in 7-Day Live Workshop — {BRAND.price}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
