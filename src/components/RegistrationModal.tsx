import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Copy,
  Check,
  Smartphone,
  Sparkles,
  FileText,
  Calendar,
  Video,
  CreditCard,
  QrCode,
  User,
  Mail,
  Phone,
  ArrowLeft,
} from 'lucide-react';
import { BRAND, UPI_CONFIG, DOMAIN_TRACKS, GOOGLE_FORM_URL, submitLeadToFormspree } from '../data';
import { DomainTrack } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrackId?: string;
  isDark?: boolean;
}

const googleSlideTransition = {
  initial: { opacity: 0, x: 18 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    x: -18,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
};

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

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedTrack: DomainTrack =
    DOMAIN_TRACKS.find((t) => t.id === selectedTrackId) || DOMAIN_TRACKS[0];

  const amountStr = selectedTrack.amountNum.toString();
  const upiUri = UPI_CONFIG.getUpiUri(amountStr, selectedTrack.shortName);
  const qrCodeUrl = UPI_CONFIG.getQrCodeUrl(amountStr, selectedTrack.shortName);
  const isFreeTrack = selectedTrack.amountNum === 0;

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) return;

    setIsProceeding(true);

    const isFree = selectedTrack.amountNum === 0;
    const genId = isFree
      ? `MAI-DEMO-${Math.floor(100000 + Math.random() * 900000)}`
      : `MAI-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(genId);

    // Formspree lead dispatch
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
    }, 450);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_CONFIG.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleMobilePay = () => {
    window.location.href = upiUri;
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Formspree payment confirmation dispatch
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
    }, 700);
  };

  const whatsappConfirmationText = encodeURIComponent(
    `Hi Harsh! 👋\nI have registered for MASTER AI Workshop.\n\n` +
      `👤 Name: ${formData.fullName}\n` +
      `📱 Phone: ${formData.phone}\n` +
      `✉️ Email: ${formData.email}\n` +
      `🎓 Selected Pass: ${selectedTrack.name}\n` +
      `💰 Amount: ${isFreeTrack ? 'FREE (₹0 Entry)' : `₹${amountStr} (UPI)`}\n` +
      `📹 Platform: Google Meet (Live Interactive Session)\n` +
      `🆔 Admission ID: ${ticketId || 'MAI-REGISTERED'}\n` +
      (!isFreeTrack && utrNumber ? `🧾 UTR / Ref No: ${utrNumber}\n` : '') +
      `\nPlease confirm my Google Meet seat!`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xl animate-in fade-in duration-200 overflow-y-auto"
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 14 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-lg rounded-[28px] border shadow-2xl relative my-auto max-h-[92vh] flex flex-col overflow-hidden transition-colors ${
          isDark
            ? 'bg-[#0A0A0D]/95 border-white/15 text-white shadow-[0_30px_90px_rgba(0,0,0,0.9)]'
            : 'bg-white/98 border-slate-200/90 text-slate-900 shadow-[0_30px_90px_rgba(15,23,42,0.18)]'
        }`}
        style={{
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
        }}
      >
        {/* ========================================================================= */}
        {/* GOOGLE PAY / APPLE CHECKOUT HEADER BAR */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between px-5 sm:px-7 pt-5 pb-4 border-b border-black/5 dark:border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            {/* Google Antigravity Brand Multi-Color Chevron */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M12 2.5L3.5 19.5H7.5L12 9.5L16.5 19.5H20.5L12 2.5Z"
                fill="url(#google-pay-modal-grad)"
              />
              <defs>
                <linearGradient
                  id="google-pay-modal-grad"
                  x1="3.5"
                  y1="2.5"
                  x2="20.5"
                  y2="19.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#4285F4" />
                  <stop offset="35%" stopColor="#EA4335" />
                  <stop offset="70%" stopColor="#FBBC05" />
                  <stop offset="100%" stopColor="#34A853" />
                </linearGradient>
              </defs>
            </svg>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-semibold tracking-tight">
                  Master AI Checkout
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
                  Google Meet Live
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isDark
                ? 'bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-black'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* SCROLLABLE MODAL BODY WITH APPLE/GOOGLE MOMENTUM SMOOTHNESS */}
        {/* ========================================================================= */}
        <div
          className="flex-1 overflow-y-auto px-5 sm:px-7 py-5 custom-scrollbar"
          style={{
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <AnimatePresence mode="wait">
            {/* ------------------------------------------------------------- */}
            {/* STEP 1: SELECT PASS & ENTER DETAILS */}
            {/* ------------------------------------------------------------- */}
            {step === 'form' && (
              <motion.div
                key="step-form"
                variants={googleSlideTransition}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Apple-style Fluid Pass Switcher Tabs */}
                <div className="mb-5">
                  <label className={`block text-xs font-mono uppercase tracking-wider mb-2 font-medium ${
                    isDark ? 'text-neutral-400' : 'text-slate-500'
                  }`}>
                    Select Workshop Pass
                  </label>

                  <div className={`p-1 rounded-2xl border grid grid-cols-3 gap-1 relative ${
                    isDark ? 'bg-white/[0.03] border-white/10' : 'bg-slate-100/80 border-slate-200'
                  }`}>
                    {/* 1. Master Pass (₹89) */}
                    <button
                      type="button"
                      onClick={() => setSelectedTrackId('master-pass')}
                      className={`relative py-2 px-2 rounded-xl text-center cursor-pointer transition-colors duration-200 z-10 ${
                        selectedTrackId === 'master-pass'
                          ? isDark ? 'text-black font-semibold' : 'text-white font-semibold'
                          : isDark ? 'text-neutral-300 hover:text-white' : 'text-slate-700 hover:text-black'
                      }`}
                    >
                      {selectedTrackId === 'master-pass' && (
                        <motion.div
                          layoutId="activePassSelector"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                          className={`absolute inset-0 rounded-xl shadow-md -z-10 ${
                            isDark ? 'bg-white' : 'bg-slate-950'
                          }`}
                        />
                      )}
                      <div className="text-[11px] font-mono leading-none">Master Pass</div>
                      <div className="text-xs sm:text-sm font-bold mt-1">₹89</div>
                    </button>

                    {/* 2. VIP Pass (₹299) */}
                    <button
                      type="button"
                      onClick={() => setSelectedTrackId('week-pass-299')}
                      className={`relative py-2 px-2 rounded-xl text-center cursor-pointer transition-colors duration-200 z-10 ${
                        selectedTrackId === 'week-pass-299'
                          ? isDark ? 'text-black font-semibold' : 'text-white font-semibold'
                          : isDark ? 'text-neutral-300 hover:text-white' : 'text-slate-700 hover:text-black'
                      }`}
                    >
                      {selectedTrackId === 'week-pass-299' && (
                        <motion.div
                          layoutId="activePassSelector"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                          className={`absolute inset-0 rounded-xl shadow-md -z-10 ${
                            isDark ? 'bg-white' : 'bg-slate-950'
                          }`}
                        />
                      )}
                      <div className="text-[11px] font-mono leading-none">1-Week VIP</div>
                      <div className="text-xs sm:text-sm font-bold mt-1">₹299</div>
                    </button>

                    {/* 3. Demo (₹0) */}
                    <button
                      type="button"
                      onClick={() => setSelectedTrackId('demo-free')}
                      className={`relative py-2 px-2 rounded-xl text-center cursor-pointer transition-colors duration-200 z-10 ${
                        selectedTrackId === 'demo-free'
                          ? isDark ? 'text-black font-semibold' : 'text-white font-semibold'
                          : isDark ? 'text-neutral-300 hover:text-white' : 'text-slate-700 hover:text-black'
                      }`}
                    >
                      {selectedTrackId === 'demo-free' && (
                        <motion.div
                          layoutId="activePassSelector"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                          className={`absolute inset-0 rounded-xl shadow-md -z-10 ${
                            isDark ? 'bg-white' : 'bg-slate-950'
                          }`}
                        />
                      )}
                      <div className="text-[11px] font-mono leading-none">Live Demo</div>
                      <div className="text-xs sm:text-sm font-bold mt-1">₹0 Free</div>
                    </button>
                  </div>
                </div>

                {/* Google Pay Style Order Summary Strip */}
                <div className={`p-3.5 rounded-2xl border mb-5 flex items-center justify-between gap-3 ${
                  isDark ? 'bg-white/[0.02] border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                      isDark ? 'bg-white/[0.05] border-white/10 text-neutral-200' : 'bg-white border-slate-200 text-slate-800'
                    }`}>
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold tracking-tight line-clamp-1">
                        {selectedTrack.name}
                      </h4>
                      <p className={`text-[11px] line-clamp-1 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                        {selectedTrack.sessions}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-base sm:text-lg font-bold tracking-tight">
                      {isFreeTrack ? '₹0' : `₹${amountStr}`}
                    </div>
                    <span className="text-[10px] font-mono text-emerald-500 font-medium">
                      All-Inclusive
                    </span>
                  </div>
                </div>

                {/* Student Details Form */}
                <form onSubmit={handleSubmitDetails} className="space-y-3.5">
                  {/* Full Name */}
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                      Full Name
                    </label>
                    <div className="relative">
                      <User className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                        isDark ? 'text-neutral-500' : 'text-slate-400'
                      }`} />
                      <input
                        type="text"
                        required
                        placeholder="Aryan Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm outline-hidden transition-all ${
                          isDark
                            ? 'bg-white/[0.03] border-white/10 focus:border-white/30 text-white placeholder:text-neutral-600 focus:bg-white/[0.06]'
                            : 'bg-white border-slate-200 focus:border-slate-400 text-slate-900 placeholder:text-slate-400 focus:bg-slate-50/50'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                      Email Address (For Google Meet Live Access)
                    </label>
                    <div className="relative">
                      <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                        isDark ? 'text-neutral-500' : 'text-slate-400'
                      }`} />
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm outline-hidden transition-all ${
                          isDark
                            ? 'bg-white/[0.03] border-white/10 focus:border-white/30 text-white placeholder:text-neutral-600 focus:bg-white/[0.06]'
                            : 'bg-white border-slate-200 focus:border-slate-400 text-slate-900 placeholder:text-slate-400 focus:bg-slate-50/50'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                      WhatsApp Number (For Session Link & Reminders)
                    </label>
                    <div className="relative">
                      <Phone className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                        isDark ? 'text-neutral-500' : 'text-slate-400'
                      }`} />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm outline-hidden transition-all ${
                          isDark
                            ? 'bg-white/[0.03] border-white/10 focus:border-white/30 text-white placeholder:text-neutral-600 focus:bg-white/[0.06]'
                            : 'bg-white border-slate-200 focus:border-slate-400 text-slate-900 placeholder:text-slate-400 focus:bg-slate-50/50'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isProceeding}
                      className={`w-full py-3.5 rounded-full font-medium text-xs sm:text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-95 disabled:opacity-75 ${
                        isDark
                          ? 'bg-white text-black hover:bg-neutral-200'
                          : 'bg-slate-950 text-white hover:bg-slate-800'
                      }`}
                    >
                      {isProceeding ? (
                        <span>Processing Details...</span>
                      ) : (
                        <>
                          <span>
                            {isFreeTrack
                              ? 'Confirm Free Demo Seat • ₹0'
                              : `Continue to UPI Payment • ₹${amountStr}`}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className={`flex items-center justify-center gap-1.5 text-[11px] pt-1 ${
                    isDark ? 'text-neutral-400' : 'text-slate-500'
                  }`}>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Direct Zero-Commission UPI • Strictly 20 Seats Daily</span>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* STEP 2: GOOGLE PAY STYLE INSTANT UPI PAYMENT SHEET */}
            {/* ------------------------------------------------------------- */}
            {step === 'payment' && (
              <motion.div
                key="step-payment"
                variants={googleSlideTransition}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {/* Back to Step 1 Button */}
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className={`inline-flex items-center gap-1.5 text-xs mb-3 font-medium cursor-pointer transition-colors ${
                    isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-black'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to details</span>
                </button>

                {/* Google Pay Style Order Header */}
                <div className="text-center mb-5">
                  <div className={`text-xs font-mono uppercase tracking-wider mb-1 ${
                    isDark ? 'text-neutral-400' : 'text-slate-500'
                  }`}>
                    Scan & Pay with Any UPI App
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-normal sm:font-medium tracking-tight">
                    ₹{amountStr}
                  </h3>
                  <p className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                    To: <span className="font-semibold text-white dark:text-white">{UPI_CONFIG.payeeName}</span> (IIT Patna)
                  </p>
                </div>

                {/* Google Pay Card: QR Code & UPI Pill */}
                <div className={`p-5 rounded-2xl border mb-5 flex flex-col items-center text-center ${
                  isDark ? 'bg-white/[0.02] border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  {/* Clean Framed QR Code */}
                  <div className="relative p-2.5 bg-white rounded-2xl shadow-md border border-slate-200 mb-3">
                    <img
                      src={qrCodeUrl}
                      alt={`UPI QR Code for ₹${amountStr}`}
                      className="w-40 h-40 sm:w-44 sm:h-44 object-contain rounded-xl"
                    />
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-mono px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                      Amount: ₹{amountStr}
                    </div>
                  </div>

                  <p className={`text-[11px] mb-3 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                    Scan via GPay, PhonePe, Paytm, BHIM or Cred
                  </p>

                  {/* 1-Click Copy UPI ID */}
                  <div className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-mono transition-colors ${
                    isDark ? 'bg-black/40 border-white/10' : 'bg-white border-slate-200'
                  }`}>
                    <span className="truncate select-all">{UPI_CONFIG.upiId}</span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className={`shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-sans font-medium transition-colors cursor-pointer ${
                        isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Mobile Direct UPI Intent Button */}
                  <button
                    type="button"
                    onClick={handleMobilePay}
                    className="w-full mt-2.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all sm:hidden"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Open in PhonePe / GPay / Paytm</span>
                  </button>
                </div>

                {/* UTR Reference Input & Confirmation */}
                <form onSubmit={handleConfirmPayment} className="space-y-3.5">
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                      12-Digit UTR / UPI Transaction ID (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 423589123456"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      className={`w-full px-4 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm font-mono outline-hidden transition-all ${
                        isDark
                          ? 'bg-white/[0.03] border-white/10 focus:border-white/30 text-white placeholder:text-neutral-600 focus:bg-white/[0.06]'
                          : 'bg-white border-slate-200 focus:border-slate-400 text-slate-900 placeholder:text-slate-400 focus:bg-slate-50/50'
                      }`}
                    />
                    <p className={`text-[10px] mt-1 ${isDark ? 'text-neutral-500' : 'text-slate-500'}`}>
                      Found on your UPI app's payment receipt screen.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-3.5 rounded-full font-medium text-xs sm:text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-95 disabled:opacity-75 ${
                      isDark
                        ? 'bg-white text-black hover:bg-neutral-200'
                        : 'bg-slate-950 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isProcessing ? (
                      <span>Verifying Payment...</span>
                    ) : (
                      <>
                        <span>I Have Paid ₹{amountStr} • Confirm Seat</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* STEP 3: APPLE WALLET STYLE DIGITAL ADMISSION PASS */}
            {/* ------------------------------------------------------------- */}
            {step === 'success' && (
              <motion.div
                key="step-success"
                variants={googleSlideTransition}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-center py-2"
              >
                <div className="w-11 h-11 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>

                <h3 className="text-2xl font-normal sm:font-medium tracking-tight mb-1">
                  Seat Confirmed!
                </h3>
                <p className={`text-xs sm:text-sm mb-5 ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                  Welcome aboard, <span className="font-semibold text-white dark:text-white">{formData.fullName}</span>. Your seat for {selectedTrack.shortName} has been booked.
                </p>

                {/* Apple Wallet Style Digital Event Pass */}
                <div className={`p-4 sm:p-5 rounded-2xl text-left font-mono text-xs border mb-5 shadow-lg ${
                  isDark ? 'bg-white/[0.03] border-white/15 text-neutral-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  <div className="flex justify-between items-center border-b border-black/5 dark:border-white/10 pb-3 mb-3">
                    <span className="font-bold tracking-tight text-xs flex items-center gap-1.5 font-sans">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      {BRAND.name} Admission Pass
                    </span>
                    <span className="text-[10px] bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                      VERIFIED
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px] mb-3">
                    <div>
                      <div className="opacity-50 text-[9px] uppercase">ADMISSION ID</div>
                      <div className="font-bold">{ticketId}</div>
                    </div>
                    <div>
                      <div className="opacity-50 text-[9px] uppercase">AMOUNT</div>
                      <div className="font-bold text-emerald-500">
                        {isFreeTrack ? '₹0.00 (Free Demo)' : `₹${amountStr}.00`}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="opacity-50 text-[9px] uppercase">PROGRAM</div>
                      <div className="font-semibold font-sans">{selectedTrack.name}</div>
                    </div>
                    <div>
                      <div className="opacity-50 text-[9px] uppercase">SESSION TIMING</div>
                      <div>Daily 8:00 PM IST</div>
                    </div>
                    <div>
                      <div className="opacity-50 text-[9px] uppercase">PLATFORM</div>
                      <div>Google Meet Live</div>
                    </div>
                    {utrNumber && (
                      <div className="col-span-2">
                        <div className="opacity-50 text-[9px] uppercase">UTR / REF NO</div>
                        <div className="text-amber-500 font-bold">{utrNumber}</div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2.5 border-t border-black/5 dark:border-white/10 text-[10px] opacity-70 leading-relaxed font-sans">
                    Direct Google Meet invitation & reminder will be dispatched to {formData.email} and WhatsApp.
                  </div>
                </div>

                {/* Actions: 1-Tap WhatsApp Confirmation & Google Form */}
                <div className="space-y-2.5">
                  <a
                    href={`https://wa.me/917452835265?text=${whatsappConfirmationText}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send 1-Tap Confirmation on WhatsApp</span>
                  </a>

                  <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-3 rounded-full text-xs font-medium border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isDark
                        ? 'border-white/15 bg-white/[0.04] text-neutral-300 hover:bg-white/10 hover:text-white'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 hover:text-black'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Submit details on Google Form (Optional)</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
