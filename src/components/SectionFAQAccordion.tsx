import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '../data';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

interface SectionFAQAccordionProps {
  isDark?: boolean;
  onWhatsAppClick: () => void;
}

export const SectionFAQAccordion: React.FC<SectionFAQAccordionProps> = ({
  isDark = true,
  onWhatsAppClick,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-14 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header with Google Antigravity scroll entrance */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-normal sm:font-medium tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
            Frequently Asked Questions
          </h2>
          <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
            Everything you need to know about timings, access, recordings, and certificates.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isDark
                    ? isOpen
                      ? 'bg-white/[0.06] border-white/20'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/15'
                    : isOpen
                      ? 'bg-white border-slate-300 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className={`text-sm sm:text-base font-semibold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-500 dark:text-amber-400' : isDark ? 'text-neutral-400' : 'text-slate-500'
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className={`px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm leading-relaxed border-t pt-3 ${
                        isDark ? 'text-neutral-300 border-white/5' : 'text-slate-700 border-slate-100 font-medium'
                      }`}>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Doubts */}
        <div className={`mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-3 text-xs ${
          isDark ? 'text-neutral-400' : 'text-slate-600 font-medium'
        }`}>
          <span>Still have questions or need UPI assistance?</span>
          <button
            type="button"
            onClick={onWhatsAppClick}
            className="text-emerald-500 dark:text-emerald-400 hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat directly on WhatsApp &rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
};
