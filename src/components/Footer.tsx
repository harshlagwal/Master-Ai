import React from 'react';
import { BRAND, SOCIAL_LINKS } from '../data';
import { MessageCircle } from 'lucide-react';

interface FooterProps {
  onWhatsAppClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onWhatsAppClick }) => {
  return (
    <footer
      id="footer"
      className="relative z-10 w-full py-8 sm:py-10 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#0A0A0A] text-white border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
        {/* Brand details */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span
              className="text-[20px] sm:text-[22px] font-semibold tracking-tight text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {BRAND.name}
            </span>
          </div>
          <div className="text-[14px] text-white/90 font-medium tracking-tight">
            {BRAND.mentor}{' '}
            <span className="text-white/30 font-normal mx-1">·</span>{' '}
            <span className="text-[12px] text-white/50 font-mono tracking-wide">
              {BRAND.role}
            </span>
          </div>
          <p className="text-[12px] text-white/40 mt-1.5 max-w-md">
            {BRAND.coreMessage}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-[13px] font-medium text-white/70">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={SOCIAL_LINKS.whatsappCommunity}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Community</span>
          </a>
          <a
            href={SOCIAL_LINKS.contactEmail}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Bottom Copyright & Disclaimer */}
      <div className="max-w-6xl mx-auto mt-6 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-white/40">
        <div>
          &copy; {new Date().getFullYear()} MASTER AI by Harsh Lagwal. All rights reserved.
        </div>
        <div>
          Live Online Learning • Not affiliated with third-party tool providers.
        </div>
      </div>
    </footer>
  );
};

