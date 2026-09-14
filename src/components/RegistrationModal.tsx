import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  MessageSquare,
  Copy,
  Check,
  Smartphone,
  Sparkles,
  FileText,
  ExternalLink,
  Calendar,
  Video,
} from 'lucide-react';
import { BRAND, SOCIAL_LINKS, UPI_CONFIG, DOMAIN_TRACKS, GOOGLE_FORM_URL, submitLeadToFormspree } from '../data';
import { DomainTrack } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrackId?: string;
  isDark?: boolean;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  initialTrackId = 'master-pass',
  isDark = true,
}) => {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [selectedTrackId, setSelectedTrackId] = useState<string>(initialTrackId);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [utrNumber, setUtrNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const [isProceeding, setIsProceeding] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Sync initialTrackId when modal opens
  useEffect(() => {
    if (initialTrackId) {
      setSelectedTrackId(initialTrackId);
    }
    if (isOpen) {
      setStep('form');
      setIsProceeding(false);
      setIsProcessing(false);
    }
  }, [initialTrackId, isOpen]);

  if (!isOpen) return null;

  const selectedTrack: DomainTrack =
    DOMAIN_TRACKS.find((t) => t.id === selectedTrackId) || DOMAIN_TRACKS[0];

  const amountStr = selectedTrack.amountNum.toString();
  const upiUri = UPI_CONFIG.getUpiUri(amountStr, selectedTrack.shortName);
  const qrCodeUrl = UPI_CONFIG.getQrCodeUrl(amountStr, selectedTrack.shortName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) return;
    setIsProceeding(true);

    const isFree = selectedTrack.amountNum === 0;
    const genId = isFree
      ? `MAI-DEMO-${Math.floor(100000 + Math.random() * 900000)}`
      : `MAI-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(genId);

    // Instant Formspree dispatch for lead capture (Demo or Paid)
    submitLeadToFormspree({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      trackName: selectedTrack.name,
      category: isFree ? 'FREE DEMO CLASS (30-MIN)' : `PAID WORKSHOP INTENT (₹${amountStr})`,
      ticketId: genId,
    });

    setTimeout(() => {
      setIsProceeding(false);
      if (isFree) {
        setStep('success');
        if (GOOGLE_FORM_URL) {
          window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
        }
      } else {
        setStep('payment');
      }
    }, 600);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_CONFIG.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMobilePay = () => {
    window.location.href = upiUri;
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Instant Formspree dispatch for payment confirmation
    submitLeadToFormspree({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      trackName: selectedTrack.name,
      category: `PAID WORKSHOP CONFIRMED (₹${amountStr})`,
      ticketId: ticketId || `MAI-${Math.floor(100000 + Math.random() * 900000)}`,
      utrNumber: utrNumber || 'Completed via UPI',
      additionalNote: 'User submitted payment confirmation & UTR',
    });

    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      if (GOOGLE_FORM_URL) {
        window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
      }
    }, 900);
  };

  const isFreeTrack = selectedTrack.amountNum === 0;

  const whatsappConfirmationText = encodeURIComponent(
    `Hi Harsh! 👋\nI have registered for the MASTER AI Workshop.\n\n` +
      `👤 Name: ${formData.fullName}\n` +
      `📱 Phone: ${formData.phone}\n` +
      `✉️ Email: ${formData.email}\n` +
      `🎓 Selected Program: ${selectedTrack.name}\n` +
      `💰 Amount: ${isFreeTrack ? 'FREE (₹0 Entry)' : `₹${amountStr} (UPI)`}\n` +
      `📹 Platform: Google Meet (Live Session)\n` +
      `🆔 Ticket ID: ${ticketId || 'MAI-REGISTERED'}\n` +
      (!isFreeTrack && utrNumber ? `🧾 UTR / Ref: ${utrNumber}\n` : '') +
      `📝 Google Form: ${GOOGLE_FORM_URL}\n\n` +
      `Please confirm my Google Meet seat!`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-xl rounded-3xl p-6 sm:p-7 shadow-2xl border relative animate-in zoom-in-95 duration-200 my-auto max-h-[90vh] overflow-y-auto custom-scrollbar transition-colors ${
          isDark
            ? 'bg-[#0B0C10] border-white/15 text-white shadow-[0_25px_80px_rgba(0,0,0,0.9)]'
            : 'bg-white border-slate-200 text-slate-900 shadow-[0_25px_80px_rgba(15,23,42,0.18)]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="modal-close-btn"
          aria-label="Close modal"
          className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer z-10 ${
            isDark
              ? 'bg-white/10 hover:bg-white/20 text-white'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <X className="w-4 h-4" />
        </button>

        {/* STEP 1: Details Form */}
        {step === 'form' && (
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-500 dark:text-amber-400 uppercase bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                MASTER AI // STEP 01 OF 02
              </span>
            </div>

            <h3
              className={`text-2xl sm:text-3xl font-black tracking-tight mb-1.5 ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Reserve Your Masterclass Seat
            </h3>

            <p
              className={`text-xs sm:text-sm font-medium mb-5 leading-relaxed ${
                isDark ? 'text-neutral-400' : 'text-slate-600'
              }`}
            >
              Select your workshop pass below and provide your details to receive the Google Meet link.
            </p>

            {/* Select Workshop Track - Ultra-Premium 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {/* 1. 7-Day Master Pass (₹89) */}
              <button
                type="button"
                onClick={() => setSelectedTrackId('master-pass')}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative flex flex-col justify-between group ${
                  selectedTrackId === 'master-pass'
                    ? isDark
                      ? 'border-amber-400/90 bg-amber-400/[0.08] shadow-[0_0_20px_rgba(251,191,36,0.15)] ring-1 ring-amber-400/40 text-white'
                      : 'border-amber-500 bg-amber-50/70 shadow-sm ring-1 ring-amber-500/30 text-slate-900'
                    : isDark
                      ? 'border-white/10 bg-white/[0.02] text-neutral-300 hover:border-white/20 hover:bg-white/[0.05]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      selectedTrackId === 'master-pass'
                        ? isDark ? 'border-amber-400 bg-amber-400' : 'border-amber-500 bg-amber-500'
                        : isDark ? 'border-white/30' : 'border-slate-300'
                    }`}>
                      {selectedTrackId === 'master-pass' && (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                      )}
                    </div>
                    <span className="text-sm font-bold tracking-tight">7-Day Master Pass</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase shrink-0">
                    Popular
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-1 pt-2 border-t border-black/5 dark:border-white/5">
                  <span className={`text-xl font-black tracking-tight ${selectedTrackId === 'master-pass' ? 'text-amber-500 dark:text-amber-400' : ''}`}>₹89</span>
                  <span className="text-xs font-medium opacity-75">All 9 Skills • 7 Days</span>
                </div>
              </button>

              {/* 2. 1-Week VIP Pass (₹299) */}
              <button
                type="button"
                onClick={() => setSelectedTrackId('week-pass-299')}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative flex flex-col justify-between group ${
                  selectedTrackId === 'week-pass-299'
                    ? isDark
                      ? 'border-indigo-400/90 bg-indigo-500/[0.08] shadow-[0_0_20px_rgba(99,102,241,0.15)] ring-1 ring-indigo-400/40 text-white'
                      : 'border-indigo-500 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-500/30 text-slate-900'
                    : isDark
                      ? 'border-white/10 bg-white/[0.02] text-neutral-300 hover:border-white/20 hover:bg-white/[0.05]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      selectedTrackId === 'week-pass-299'
                        ? isDark ? 'border-indigo-400 bg-indigo-400' : 'border-indigo-500 bg-indigo-500'
                        : isDark ? 'border-white/30' : 'border-slate-300'
                    }`}>
                      {selectedTrackId === 'week-pass-299' && (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                      )}
                    </div>
                    <span className="text-sm font-bold tracking-tight">1-Week VIP Pass</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30 uppercase shrink-0">
                    1-on-1 Mentorship
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-1 pt-2 border-t border-black/5 dark:border-white/5">
                  <span className={`text-xl font-black tracking-tight ${selectedTrackId === 'week-pass-299' ? 'text-indigo-500 dark:text-indigo-400' : ''}`}>₹299</span>
                  <span className="text-xs font-medium opacity-75">1-on-1 Review & Hackathon</span>
                </div>
              </button>

              {/* 3. 30-Min Free Demo (₹0) */}
              <button
                type="button"
                onClick={() => setSelectedTrackId('demo-free')}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative flex flex-col justify-between group ${
                  selectedTrackId === 'demo-free'
                    ? isDark
                      ? 'border-emerald-400/90 bg-emerald-500/[0.08] shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-400/40 text-white'
                      : 'border-emerald-500 bg-emerald-50/70 shadow-sm ring-1 ring-emerald-500/30 text-slate-900'
                    : isDark
                      ? 'border-white/10 bg-white/[0.02] text-neutral-300 hover:border-white/20 hover:bg-white/[0.05]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      selectedTrackId === 'demo-free'
                        ? isDark ? 'border-emerald-400 bg-emerald-400' : 'border-emerald-500 bg-emerald-500'
                        : isDark ? 'border-white/30' : 'border-slate-300'
                    }`}>
                      {selectedTrackId === 'demo-free' && (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                      )}
                    </div>
                    <span className="text-sm font-bold tracking-tight">Live Demo Class</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 uppercase shrink-0">
                    Free Entry
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-1 pt-2 border-t border-black/5 dark:border-white/5">
                  <span className={`text-xl font-black tracking-tight ${selectedTrackId === 'demo-free' ? 'text-emerald-500 dark:text-emerald-400' : ''}`}>₹0</span>
                  <span className="text-xs font-medium opacity-75">30-Min Live Demo</span>
                </div>
              </button>

              {/* 4. SIH 2-Hr Sprint (₹199) */}
              <button
                type="button"
                onClick={() => setSelectedTrackId('sih-masterclass')}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative flex flex-col justify-between group ${
                  selectedTrackId === 'sih-masterclass'
                    ? isDark
                      ? 'border-orange-400/90 bg-orange-500/[0.08] shadow-[0_0_20px_rgba(249,115,22,0.15)] ring-1 ring-orange-400/40 text-white'
                      : 'border-orange-500 bg-orange-50/70 shadow-sm ring-1 ring-orange-500/30 text-slate-900'
                    : isDark
                      ? 'border-white/10 bg-white/[0.02] text-neutral-300 hover:border-white/20 hover:bg-white/[0.05]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      selectedTrackId === 'sih-masterclass'
                        ? isDark ? 'border-orange-400 bg-orange-400' : 'border-orange-500 bg-orange-500'
                        : isDark ? 'border-white/30' : 'border-slate-300'
                    }`}>
                      {selectedTrackId === 'sih-masterclass' && (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                      )}
                    </div>
                    <span className="text-sm font-bold tracking-tight">SIH Sprint</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-300 border border-orange-500/30 uppercase shrink-0">
                    Hackathon
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-1 pt-2 border-t border-black/5 dark:border-white/5">
                  <span className={`text-xl font-black tracking-tight ${selectedTrackId === 'sih-masterclass' ? 'text-orange-500 dark:text-orange-400' : ''}`}>₹199</span>
                  <span className="text-xs font-medium opacity-75">2-Hr Winning Sprint</span>
                </div>
              </button>
            </div>

            {/* Selected Track Summary Card */}
            <div
              className={`mb-5 p-4 rounded-2xl border transition-all ${
                isDark
                  ? 'bg-neutral-900/60 border-white/10'
                  : 'bg-slate-50/80 border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {selectedTrack.name}
                  </span>
                </div>
                <span className="self-start sm:self-auto text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-400 text-slate-950 whitespace-nowrap shrink-0 shadow-xs">
                  {selectedTrack.amountNum === 0 ? 'FREE ENTRY' : `₹${amountStr} All-Inclusive`}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${
                  isDark
                    ? 'bg-amber-400/10 text-amber-300 border border-amber-400/20'
                    : 'bg-amber-100/70 text-amber-900 border border-amber-200/80 font-semibold'
                }`}>
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>{selectedTrack.sessions}</span>
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${
                  isDark
                    ? 'bg-white/5 text-neutral-300 border border-white/10'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}>
                  <Video className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                  <span>Google Meet Live</span>
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className={`block text-xs font-semibold mb-1.5 ${
                    isDark ? 'text-neutral-300' : 'text-slate-700'
                  }`}
                >
                  Full Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-hidden transition-all ${
                    isDark
                      ? 'bg-white/[0.05] border-white/15 focus:border-amber-400 focus:bg-white/10 text-white placeholder:text-neutral-500 focus:ring-4 focus:ring-amber-400/15'
                      : 'bg-white border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 placeholder:text-slate-400 shadow-2xs focus:ring-4 focus:ring-amber-500/15'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-xs font-semibold mb-1.5 ${
                    isDark ? 'text-neutral-300' : 'text-slate-700'
                  }`}
                >
                  Email Address (For Google Meet Link & Access) <span className="text-amber-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-hidden transition-all ${
                    isDark
                      ? 'bg-white/[0.05] border-white/15 focus:border-amber-400 focus:bg-white/10 text-white placeholder:text-neutral-500 focus:ring-4 focus:ring-amber-400/15'
                      : 'bg-white border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 placeholder:text-slate-400 shadow-2xs focus:ring-4 focus:ring-amber-500/15'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-xs font-semibold mb-1.5 ${
                    isDark ? 'text-neutral-300' : 'text-slate-700'
                  }`}
                >
                  WhatsApp Number (For Session Link & Reminders) <span className="text-amber-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-hidden transition-all ${
                    isDark
                      ? 'bg-white/[0.05] border-white/15 focus:border-amber-400 focus:bg-white/10 text-white placeholder:text-neutral-500 focus:ring-4 focus:ring-amber-400/15'
                      : 'bg-white border-slate-300 focus:border-amber-500 focus:bg-white text-slate-900 placeholder:text-slate-400 shadow-2xs focus:ring-4 focus:ring-amber-500/15'
                  }`}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProceeding}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-105 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-98 transition-all cursor-pointer disabled:opacity-80"
                >
                  {isProceeding ? (
                    <div className="flex items-center gap-2.5">
                      <div className="loader-sm text-black" />
                      <span>Saving your details...</span>
                    </div>
                  ) : (
                    <>
                      <span>
                        {selectedTrack.amountNum === 0
                          ? 'Confirm Free Demo Seat (₹0) →'
                          : `Proceed to Secure UPI Payment — ₹${amountStr}`}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div
                className={`flex items-center justify-center gap-1.5 text-xs font-semibold pt-1 ${
                  isDark ? 'text-neutral-400' : 'text-slate-600'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Zero-Commission Direct UPI • Instant Confirmation</span>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: Zero-Commission UPI Payment Step */}
        {step === 'payment' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-amber-500 dark:text-amber-400">
                DIRECT UPI // STEP 02
              </span>
              <span className="text-xs font-mono font-bold text-slate-950 bg-amber-400 px-3 py-1 rounded-full shadow-sm">
                {selectedTrack.shortName}: ₹{amountStr}
              </span>
            </div>

            <h3
              className={`text-2xl sm:text-3xl font-black mb-1 ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Scan & Pay ₹{amountStr}
            </h3>
            <p
              className={`text-xs sm:text-sm font-medium mb-4 ${
                isDark ? 'text-neutral-400' : 'text-slate-600'
              }`}
            >
              Pay via any UPI App (GPay, PhonePe, Paytm, BHIM, Cred)
            </p>

            {/* UPI QR Display Card */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border mb-4 flex flex-col items-center text-center ${
                isDark ? 'bg-white/[0.03] border-white/15' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="relative p-3 bg-white rounded-2xl shadow-lg border border-slate-200 mb-3">
                <img
                  src={qrCodeUrl}
                  alt={`UPI QR Code for ₹${amountStr}`}
                  className="w-44 h-44 sm:w-48 sm:h-48 object-contain rounded-xl"
                />
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[11px] font-mono font-bold px-3 py-0.5 rounded-full whitespace-nowrap shadow-md">
                  Amount: ₹{amountStr}
                </div>
              </div>

              {/* Payee Info */}
              <div
                className={`text-xs font-semibold mt-1 mb-0.5 ${
                  isDark ? 'text-neutral-300' : 'text-slate-700'
                }`}
              >
                Payee:{' '}
                <strong className={isDark ? 'text-white' : 'text-slate-950'}>
                  {UPI_CONFIG.payeeName} (IIT Patna)
                </strong>
              </div>
              <div className="text-xs font-bold text-amber-500 dark:text-amber-400 mb-3">
                Program: {selectedTrack.name}
              </div>

              {/* Copyable UPI ID Pill */}
              <div
                className={`w-full flex items-center justify-between gap-2 px-3.5 py-3 rounded-xl border text-xs font-bold transition-all ${
                  isDark
                    ? 'bg-black/50 border-white/20 hover:border-amber-400'
                    : 'bg-white border-slate-300 hover:border-slate-400'
                }`}
              >
                <span
                  className={`font-mono select-all truncate ${
                    isDark ? 'text-neutral-100' : 'text-slate-900'
                  }`}
                >
                  {UPI_CONFIG.upiId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className={`shrink-0 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy UPI ID</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mobile Direct Pay Button */}
              <button
                type="button"
                onClick={handleMobilePay}
                className="w-full mt-2.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all sm:hidden"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Tap to Pay on Mobile UPI App</span>
              </button>
            </div>

            {/* Step 2 Form: Enter UTR / Confirm Payment */}
            <form onSubmit={handleConfirmPayment} className="space-y-3.5">
              <div>
                <label
                  className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                    isDark ? 'text-neutral-300' : 'text-slate-700'
                  }`}
                >
                  Enter 12-Digit UTR / UPI Ref No. (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 423589123456 or Transaction ID"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold outline-hidden transition-all ${
                    isDark
                      ? 'bg-white/[0.05] border-white/15 focus:border-amber-400 focus:bg-white/10 text-white placeholder:text-neutral-500'
                      : 'bg-slate-50 border-slate-300 focus:border-slate-950 focus:bg-white text-slate-900 placeholder:text-slate-400'
                  }`}
                />
                <span
                  className={`block text-xs font-medium mt-1 ${
                    isDark ? 'text-neutral-400' : 'text-slate-500'
                  }`}
                >
                  You can find this on your UPI app's payment receipt screen.
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 hover:brightness-105 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-80 active:scale-95"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2.5">
                    <div className="loader-sm text-black" />
                    <span>Verifying & Confirming Seat...</span>
                  </div>
                ) : (
                  <>
                    <span>I Have Paid ₹{amountStr} — Confirm Seat</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('form')}
                className={`w-full text-center text-xs mt-1 hover:underline cursor-pointer ${
                  isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                &larr; Change track or edit details
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: Instant Success & WhatsApp Connection */}
        {step === 'success' && (
          <div className="text-center py-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3
              className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-950'}`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Seat Reserved!
            </h3>

            <p
              className={`text-xs sm:text-sm mb-4 leading-relaxed ${
                isDark ? 'text-neutral-300' : 'text-slate-600'
              }`}
            >
              Welcome to {BRAND.name},{' '}
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {formData.fullName}
              </span>
              . Your seat for{' '}
              <span className="font-semibold text-emerald-500 dark:text-emerald-400">
                {selectedTrack.shortName}
              </span>{' '}
              has been recorded.
            </p>

            {/* Official Digital Ticket Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#12131A] to-[#0A0A0E] text-white text-left mb-4 font-mono text-xs shadow-xl border border-white/15">
              <div className="flex justify-between items-center border-b border-white/15 pb-2.5 mb-3">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {BRAND.name} PASS
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                  CONFIRMED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-white/80 text-[11px] mb-3">
                <div>
                  <div className="text-white/40 uppercase text-[9px]">TICKET ID</div>
                  <div className="text-white font-bold">{ticketId}</div>
                </div>
                <div>
                  <div className="text-white/40 uppercase text-[9px]">AMOUNT PAID</div>
                  <div className="text-emerald-400 font-bold">
                    {isFreeTrack ? '₹0.00 (FREE ENTRY)' : `₹${amountStr}.00 (UPI)`}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-white/40 uppercase text-[9px]">DOMAIN TRACK</div>
                  <div className="text-white font-semibold">{selectedTrack.name}</div>
                </div>
                <div>
                  <div className="text-white/40 uppercase text-[9px]">STUDENT</div>
                  <div className="text-white truncate font-medium">{formData.fullName}</div>
                </div>
                <div>
                  <div className="text-white/40 uppercase text-[9px]">PLATFORM</div>
                  <div className="text-white truncate font-medium">Google Meet (Live)</div>
                </div>
                {utrNumber && !isFreeTrack && (
                  <div className="col-span-2">
                    <div className="text-white/40 uppercase text-[9px]">UTR / REF NO</div>
                    <div className="text-amber-400 font-mono">{utrNumber}</div>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-white/10 text-[10px] text-white/50 leading-relaxed">
                {isFreeTrack
                  ? `Free demo session link will be sent to ${formData.email} & WhatsApp.`
                  : `Live sessions start at 8:00 PM IST on Google Meet. Join link sent to ${formData.email}.`}
              </div>
            </div>

            {/* Google Form Submission Callout */}
            <div
              className={`mb-3.5 p-3.5 rounded-2xl border text-left transition-all ${
                isDark
                  ? 'bg-blue-500/10 border-blue-400/30'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>
                    Step 1: Fill Google Form
                  </span>
                </div>
                <span className="text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-500/15 text-red-500 border border-red-500/30 animate-pulse">
                  Required
                </span>
              </div>

              <p
                className={`text-xs mb-3 leading-relaxed ${
                  isDark ? 'text-neutral-300' : 'text-slate-700'
                }`}
              >
                {isFreeTrack
                  ? 'Fill this quick Google Form to select your demo class timing and receive the direct Google Meet link.'
                  : 'Upload your payment screenshot or UTR in the official form so our team can verify your seat instantly.'}
              </p>

              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3.5 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] cursor-pointer bg-blue-600 hover:bg-blue-500"
              >
                <span>{isFreeTrack ? 'Fill Demo Registration Form' : 'Submit Details on Google Form'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Step 2: WhatsApp Confirmation */}
            <div
              className={`mb-3.5 p-3 rounded-2xl border text-left ${
                isDark ? 'bg-white/[0.03] border-white/10' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Step 2: Get Confirmation on WhatsApp
                </span>
              </div>
              <p className={`text-xs mb-2 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                {isFreeTrack
                  ? 'Send your confirmation on WhatsApp to receive the direct Google Meet room link and calendar invite.'
                  : 'Send confirmation message to Harsh with your Ticket ID.'}
              </p>
              <a
                href={`https://api.whatsapp.com/send?text=${whatsappConfirmationText}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isFreeTrack ? 'Get Google Meet Link on WhatsApp' : 'Send Confirmation to Harsh'}</span>
              </a>
            </div>

            {/* Community & Done Actions */}
            <div className="flex flex-col gap-2 mt-2">
              <a
                href={SOCIAL_LINKS.whatsappCommunity}
                target="_blank"
                rel="noreferrer"
                className={`w-full py-2.5 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-colors border ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/15 text-white border-white/15'
                    : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900'
                }`}
              >
                <span>Join Official WhatsApp Community Group</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                className={`w-full py-2 px-4 rounded-full text-xs font-semibold transition-colors cursor-pointer mt-1 ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-neutral-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

