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
} from 'lucide-react';
import { BRAND, SOCIAL_LINKS, UPI_CONFIG, DOMAIN_TRACKS, GOOGLE_FORM_URL, submitLeadToFormspree } from '../data';
import { DomainTrack } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrackId?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  initialTrackId = 'master-pass',
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-black/10 relative animate-in zoom-in-95 duration-200 my-auto max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="modal-close-btn"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/60 transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* STEP 1: Details Form */}
        {step === 'form' && (
          <div>
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">
              REGISTRATION // STEP 01
            </div>

            <h3
              className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight mb-1.5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Enroll Now
            </h3>

            <p className="text-[13px] sm:text-sm text-neutral-700 font-medium mb-3.5 leading-snug">
              Select your workshop track and enter details for your Google Meet session link.
            </p>

            {/* Select Workshop Track Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3.5">
              <button
                type="button"
                onClick={() => setSelectedTrackId('master-pass')}
                className={`p-2 sm:p-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  selectedTrackId === 'master-pass'
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm font-semibold'
                    : 'border-neutral-300 bg-neutral-50 text-neutral-800 hover:border-neutral-400'
                }`}
              >
                <div className="text-[11px] font-bold leading-snug flex items-center justify-between">
                  <span>7-Day Master</span>
                  <span className="text-[8px] font-extrabold bg-white/20 px-1 rounded uppercase">
                    Pass
                  </span>
                </div>
                <div
                  className={`text-[11px] font-extrabold mt-0.5 ${
                    selectedTrackId === 'master-pass' ? 'text-emerald-300' : 'text-emerald-700'
                  }`}
                >
                  ₹89 Total
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTrackId('week-pass-299')}
                className={`p-2 sm:p-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  selectedTrackId === 'week-pass-299'
                    ? 'border-amber-500 bg-amber-400 text-black shadow-sm font-semibold'
                    : 'border-neutral-300 bg-neutral-50 text-neutral-800 hover:border-amber-400'
                }`}
              >
                <div className="text-[11px] font-bold leading-snug flex items-center justify-between">
                  <span>1-Week Pass</span>
                  <span className="text-[8px] font-extrabold bg-black/20 px-1 rounded uppercase">
                    9 Skills
                  </span>
                </div>
                <div
                  className={`text-[11px] font-extrabold mt-0.5 ${
                    selectedTrackId === 'week-pass-299' ? 'text-black' : 'text-amber-700'
                  }`}
                >
                  ₹299 Total
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTrackId('sih-masterclass')}
                className={`p-2 sm:p-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  selectedTrackId === 'sih-masterclass'
                    ? 'border-orange-600 bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 shadow-sm'
                    : 'border-neutral-300 bg-neutral-50 text-neutral-800 hover:border-amber-400'
                }`}
              >
                <div className="text-[11px] font-bold leading-snug flex items-center justify-between">
                  <span>SIH 2-Hr</span>
                  <span className="text-[8px] font-extrabold bg-black/20 px-1 rounded uppercase">
                    Sprint
                  </span>
                </div>
                <div
                  className={`text-[11px] font-extrabold mt-0.5 ${
                    selectedTrackId === 'sih-masterclass' ? 'text-neutral-950' : 'text-amber-700'
                  }`}
                >
                  ₹199 Team
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTrackId('demo-free')}
                className={`p-2 sm:p-2.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  selectedTrackId === 'demo-free'
                    ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm font-semibold'
                    : 'border-neutral-300 bg-neutral-50 text-neutral-800 hover:border-emerald-400'
                }`}
              >
                <div className="text-[11px] font-bold leading-snug flex items-center justify-between">
                  <span>Free Demo</span>
                  <span className="text-[8px] font-extrabold bg-white/25 px-1 rounded uppercase">
                    30 Min
                  </span>
                </div>
                <div
                  className={`text-[11px] font-extrabold mt-0.5 ${
                    selectedTrackId === 'demo-free' ? 'text-emerald-100' : 'text-emerald-700'
                  }`}
                >
                  ₹0 Free
                </div>
              </button>
            </div>

            {/* Workshop Overview Card for Selected Track */}
            <div
              className={`mb-4 p-3 sm:p-3.5 rounded-2xl border-2 ${
                selectedTrackId === 'week-pass-299'
                  ? 'bg-amber-50/90 border-amber-400'
                  : selectedTrackId === 'demo-free'
                  ? 'bg-emerald-50/90 border-emerald-300'
                  : selectedTrackId === 'sih-masterclass'
                  ? 'bg-amber-50/90 border-amber-300'
                  : 'bg-neutral-100/90 border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs sm:text-sm font-bold text-neutral-950">
                  {selectedTrack.name}
                </span>
                <span
                  className={`text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    selectedTrackId === 'week-pass-299'
                      ? 'text-amber-950 bg-amber-300 border-amber-500'
                      : selectedTrackId === 'demo-free'
                      ? 'text-emerald-950 bg-emerald-200 border-emerald-400'
                      : 'text-neutral-900 bg-neutral-200 border-neutral-300'
                  }`}
                >
                  {selectedTrack.amountNum === 0 ? 'FREE ENTRY' : `₹${amountStr} Total`}
                </span>
              </div>
              <div className="text-[11px] text-neutral-700 font-semibold mb-1">
                📅 {selectedTrack.sessions}
              </div>
              <p className="text-[11.5px] sm:text-xs text-neutral-800 font-medium leading-relaxed">
                {selectedTrack.idealFor}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 focus:border-neutral-950 focus:bg-white text-neutral-900 placeholder:text-neutral-400 text-sm font-medium outline-hidden transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                  Email Address (For Google Meet Link & Access)
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 focus:border-neutral-950 focus:bg-white text-neutral-900 placeholder:text-neutral-400 text-sm font-medium outline-hidden transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                  WhatsApp Number (For Session Link & Reminders)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 focus:border-neutral-950 focus:bg-white text-neutral-900 placeholder:text-neutral-400 text-sm font-medium outline-hidden transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProceeding}
                  className="w-full py-3.5 sm:py-4 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95 disabled:opacity-80"
                >
                  {isProceeding ? (
                    <div className="flex items-center gap-2.5">
                      <div className="loader-sm text-amber-400" />
                      <span>Saving your details...</span>
                    </div>
                  ) : (
                    <>
                      <span>
                        {selectedTrack.amountNum === 0
                          ? 'Confirm Free Demo Seat (₹0) →'
                          : `Proceed to UPI Payment — ₹${amountStr}`}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-700 font-semibold pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero-Commission Direct UPI • 100% Secure</span>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: Zero-Commission UPI Payment Step */}
        {step === 'payment' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                DIRECT UPI // STEP 02
              </span>
              <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                {selectedTrack.shortName}: ₹{amountStr}
              </span>
            </div>

            <h3
              className="text-2xl sm:text-3xl font-bold text-neutral-950 mb-1"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Scan & Pay ₹{amountStr}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 font-medium mb-3.5">
              Pay via any UPI App (GPay, PhonePe, Paytm, BHIM, Cred)
            </p>

            {/* UPI QR Display Card */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-300 mb-4 flex flex-col items-center text-center">
              <div className="relative p-2.5 bg-white rounded-xl shadow-sm border border-neutral-300 mb-2">
                <img
                  src={qrCodeUrl}
                  alt={`UPI QR Code for ₹${amountStr}`}
                  className="w-44 h-44 object-contain rounded-lg"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-neutral-950 text-white text-[11px] font-bold px-3 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                  Amount: ₹{amountStr}
                </div>
              </div>

              {/* Payee Info */}
              <div className="text-xs text-neutral-800 font-semibold mt-1 mb-0.5">
                Payee: <strong className="text-neutral-950">{UPI_CONFIG.payeeName}</strong>
              </div>
              <div className="text-xs font-bold text-emerald-800 mb-2">
                Program: {selectedTrack.name}
              </div>

              {/* Copyable UPI ID Pill */}
              <div className="w-full flex items-center justify-between gap-2 px-3.5 py-3 rounded-xl bg-white border-2 border-neutral-300 hover:border-black text-xs font-bold transition-colors">
                <span className="text-neutral-900 font-mono select-all truncate">{UPI_CONFIG.upiId}</span>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="shrink-0 flex items-center gap-1.5 text-xs text-neutral-950 font-bold bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy UPI ID</span>
                    </>
                  )}
                </button>
              </div>

              {/* Simple Step Helper */}
              <p className="text-[11px] text-neutral-600 mt-2 text-center">
                Scan QR with GPay/PhonePe/Paytm or copy UPI ID to pay ₹{amountStr}.
              </p>
            </div>

            {/* Step 2 Form: Enter UTR / Confirm Payment */}
            <form onSubmit={handleConfirmPayment} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-1.5">
                  Enter 12-Digit UTR / UPI Ref No. (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 423589123456 or Transaction ID"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-300 focus:border-neutral-950 focus:bg-white text-sm font-semibold outline-hidden transition-colors"
                />
                <span className="block text-xs text-neutral-600 font-medium mt-1">
                  You can find this in your UPI app's payment receipt screen.
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-80"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2.5">
                    <div className="loader-sm text-purple-400" />
                    <span>Verifying & Opening Form...</span>
                  </div>
                ) : (
                  <>
                    <span>I Have Paid ₹{amountStr} — Confirm Seat</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full text-center text-xs text-black/50 mt-1 hover:underline cursor-pointer"
              >
                &larr; Change track or edit details
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: Instant Success & WhatsApp Connection */}
        {step === 'success' && (
          <div className="text-center py-2">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3
              className="text-2xl font-medium text-black mb-1"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Seat Reserved!
            </h3>

            <p className="text-xs sm:text-sm text-black/70 mb-4 leading-relaxed">
              Welcome to {BRAND.name}, <span className="font-semibold text-black">{formData.fullName}</span>.
              Your seat for <span className="font-semibold text-emerald-700">{selectedTrack.shortName}</span> has been recorded.
            </p>

            {/* Official Digital Ticket Card */}
            <div className="p-4 rounded-2xl bg-[#0A0A0A] text-white text-left mb-4 font-mono text-xs shadow-lg">
              <div className="flex justify-between items-center border-b border-white/15 pb-2 mb-3">
                <span className="font-medium text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  {BRAND.name}
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  CONFIRMED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-white/70 text-[11px] mb-3">
                <div>
                  <div className="text-white/40 uppercase text-[9px]">TICKET ID</div>
                  <div className="text-white font-medium">{ticketId}</div>
                </div>
                <div>
                  <div className="text-white/40 uppercase text-[9px]">AMOUNT PAID</div>
                  <div className="text-emerald-400 font-semibold">
                    {isFreeTrack ? '₹0.00 (FREE ENTRY)' : `₹${amountStr}.00 (UPI)`}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-white/40 uppercase text-[9px]">DOMAIN TRACK</div>
                  <div className="text-white font-medium">{selectedTrack.name}</div>
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
                    <div className="text-white font-mono">{utrNumber}</div>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-white/10 text-[10px] text-white/50">
                {isFreeTrack
                  ? `Free demo link will be sent to ${formData.email} & WhatsApp.`
                  : `Live sessions start at 9:00 PM IST on Google Meet. Link sent to ${formData.email}.`}
              </div>
            </div>

            {/* Step 1: Google Form Submission Callout (Mandatory for both Free Demo & Paid Tracks) */}
            <div
              className={`mb-3.5 p-3.5 rounded-2xl border text-left transition-all ${
                isFreeTrack
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-blue-500/10 border-blue-400/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <FileText
                    className={`w-4 h-4 shrink-0 ${
                      isFreeTrack ? 'text-emerald-600' : 'text-blue-600'
                    }`}
                  />
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isFreeTrack ? 'text-emerald-900' : 'text-blue-900'
                    }`}
                  >
                    Step 1: Fill Google Form
                  </span>
                </div>
                <span className="text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 border border-red-300 animate-pulse">
                  Required
                </span>
              </div>

              <p
                className={`text-[11.5px] mb-3 leading-relaxed font-medium ${
                  isFreeTrack ? 'text-emerald-900/90' : 'text-blue-900/90'
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
                className={`w-full py-2.5 px-3.5 rounded-xl text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] cursor-pointer ${
                  isFreeTrack
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <span>{isFreeTrack ? 'Fill Demo Registration Form' : 'Submit Details on Google Form'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Step 2: WhatsApp Confirmation */}
            <div className="mb-3.5 p-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-left">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-neutral-900">
                  Step 2: Get Confirmation on WhatsApp
                </span>
              </div>
              <p className="text-[11px] text-neutral-600 mb-2 leading-relaxed">
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
              {!isFreeTrack && (
                <a
                  href={`https://api.whatsapp.com/send?text=${whatsappConfirmationText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation to Harsh on WhatsApp</span>
                </a>
              )}

              <a
                href={SOCIAL_LINKS.whatsappCommunity}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-black text-white text-xs font-medium flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
              >
                <span>Join Official WhatsApp Community Group</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                className="w-full py-2 px-4 rounded-full bg-black/5 hover:bg-black/10 text-black text-xs font-medium transition-colors cursor-pointer mt-1"
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

