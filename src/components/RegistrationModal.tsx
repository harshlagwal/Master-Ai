import React, { useState, useEffect } from 'react';
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
  ExternalLink,
} from 'lucide-react';
import { BRAND, SOCIAL_LINKS, UPI_CONFIG, DOMAIN_TRACKS, GOOGLE_FORM_URL } from '../data';
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
    setTimeout(() => {
      setIsProceeding(false);
      setTicketId(`MAI-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep('payment');
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
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      if (GOOGLE_FORM_URL) {
        window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
      }
    }, 900);
  };

  const whatsappConfirmationText = encodeURIComponent(
    `Hi Harsh! 👋\nI have registered for the MASTER AI Workshop.\n\n` +
      `👤 Name: ${formData.fullName}\n` +
      `📱 Phone: ${formData.phone}\n` +
      `✉️ Email: ${formData.email}\n` +
      `🎓 Selected Program: ${selectedTrack.name}\n` +
      `💰 Amount: ₹${amountStr} (UPI)\n` +
      `🆔 Ticket ID: ${ticketId || 'MAI-REGISTERED'}\n` +
      `🧾 UTR / Ref: ${utrNumber || 'Completed via UPI to golulagwal890-2@oksbi'}\n\n` +
      `Please confirm my seat!`
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
              Select your workshop track and enter details for instant Zoom credentials.
            </p>

            {/* Select Workshop Track Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3.5">
              <button
                type="button"
                onClick={() => setSelectedTrackId('flash-pass-60')}
                className={`p-2.5 sm:p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  selectedTrackId === 'flash-pass-60'
                    ? 'border-amber-500 bg-amber-400 text-black shadow-sm font-semibold'
                    : 'border-neutral-300 bg-neutral-50 text-neutral-800 hover:border-amber-400'
                }`}
              >
                <div className="text-[12px] font-bold leading-snug flex items-center justify-between">
                  <span>Student Pass</span>
                  <span className="text-[9px] font-extrabold bg-black/15 px-1 rounded uppercase">
                    Grant
                  </span>
                </div>
                <div
                  className={`text-[11px] font-extrabold mt-0.5 ${
                    selectedTrackId === 'flash-pass-60' ? 'text-black' : 'text-emerald-700'
                  }`}
                >
                  ₹60 Total
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTrackId('master-pass')}
                className={`p-2.5 sm:p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  selectedTrackId === 'master-pass'
                    ? 'border-neutral-950 bg-neutral-950 text-white shadow-sm'
                    : 'border-neutral-300 bg-neutral-50 text-neutral-800 hover:border-neutral-400'
                }`}
              >
                <div className="text-[12px] font-bold leading-snug">7-Day Master</div>
                <div
                  className={`text-[11px] font-extrabold mt-0.5 ${
                    selectedTrackId === 'master-pass' ? 'text-emerald-400' : 'text-emerald-700'
                  }`}
                >
                  ₹89 Total
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTrackId('sih-masterclass')}
                className={`p-2.5 sm:p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  selectedTrackId === 'sih-masterclass'
                    ? 'border-amber-600 bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 shadow-sm'
                    : 'border-neutral-300 bg-neutral-50 text-neutral-800 hover:border-amber-400'
                }`}
              >
                <div className="text-[12px] font-bold leading-snug flex items-center justify-between">
                  <span>SIH 2-Hr</span>
                  <span className="text-[9px] font-extrabold bg-black/20 px-1 rounded text-neutral-950 uppercase">
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
            </div>

            {/* Workshop Overview Card for Selected Track */}
            <div
              className={`mb-4 p-3.5 rounded-2xl border-2 ${
                selectedTrackId === 'sih-masterclass'
                  ? 'bg-amber-50/90 border-amber-300'
                  : selectedTrackId === 'flash-pass-60'
                  ? 'bg-amber-50/90 border-amber-400'
                  : 'bg-neutral-100/90 border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-neutral-950">
                  {selectedTrackId === 'sih-masterclass'
                    ? 'SIH 2-Hour Intensive Masterclass'
                    : selectedTrackId === 'flash-pass-60'
                    ? 'Student Flash Pass (₹60 Grant)'
                    : 'Complete 7-Day Access'}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    selectedTrackId === 'sih-masterclass'
                      ? 'text-amber-950 bg-amber-200 border-amber-400'
                      : selectedTrackId === 'flash-pass-60'
                      ? 'text-amber-950 bg-amber-300 border-amber-500'
                      : 'text-emerald-950 bg-emerald-100 border-emerald-300'
                  }`}
                >
                  ₹{amountStr} Total
                </span>
              </div>
              <p className="text-xs sm:text-[12.5px] text-neutral-800 font-medium leading-relaxed">
                {selectedTrackId === 'sih-masterclass'
                  ? 'Covers detailing, AI prototype build, winning PPT deck & jury pitching. 1 ticket covers your whole 6-member team!'
                  : 'Covers all 9 skills (Coding, Productivity, Design, Freelancing, Hackathons & Automations). Batch capped at 20 seats.'}
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
                  Email Address (For Zoom Links & Notes)
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
                  WhatsApp Number (For Evening Updates)
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
                  className="w-full py-4 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95 disabled:opacity-80"
                >
                  {isProceeding ? (
                    <div className="flex items-center gap-2.5">
                      <div className="loader-sm text-amber-400" />
                      <span>Generating UPI Link...</span>
                    </div>
                  ) : (
                    <>
                      <span>Proceed to UPI Payment — ₹{amountStr}</span>
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
              <div className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-xs font-bold">
                <span className="text-neutral-900 truncate">{UPI_CONFIG.upiId}</span>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="shrink-0 flex items-center gap-1 text-xs text-neutral-950 font-bold bg-neutral-100 hover:bg-neutral-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mobile 1-Click UPI App Launch */}
              <button
                type="button"
                onClick={handleMobilePay}
                className="w-full mt-3 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <Smartphone className="w-4 h-4" />
                <span>Open GPay / PhonePe / Paytm (₹{amountStr})</span>
              </button>
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
                  <div className="text-emerald-400 font-semibold">₹{amountStr}.00 (UPI)</div>
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
                  <div className="text-white/40 uppercase text-[9px]">PAID TO UPI</div>
                  <div className="text-white truncate font-medium">{UPI_CONFIG.upiId}</div>
                </div>
                {utrNumber && (
                  <div className="col-span-2">
                    <div className="text-white/40 uppercase text-[9px]">UTR / REF NO</div>
                    <div className="text-white font-mono">{utrNumber}</div>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-white/10 text-[10px] text-white/50">
                Live sessions start at 9:00 PM IST. Joining link sent to {formData.email}.
              </div>
            </div>

            {/* Google Form Submission Callout - Primary Next Step */}
            <div className="mb-3 p-3 rounded-xl bg-blue-50/90 border border-blue-200 text-left">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-blue-700 shrink-0" />
                <span className="text-xs font-semibold text-blue-900">
                  Step 2: Submit Details & Screenshot on Google Form
                </span>
              </div>
              <p className="text-[11px] text-blue-800/80 mb-2 leading-relaxed">
                Please upload your payment screenshot or UTR in the official form so your seat is verified instantly.
              </p>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Submit Details on Google Form</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Next Steps: Connect on WhatsApp */}
            <div className="flex flex-col gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${whatsappConfirmationText}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Confirmation to Harsh on WhatsApp</span>
              </a>

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

