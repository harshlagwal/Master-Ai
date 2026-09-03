import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Smartphone,
  MessageCircle,
  Sparkles,
  ArrowRight,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { BRAND, SOCIAL_LINKS, UPI_CONFIG, DOMAIN_TRACKS, GOOGLE_FORM_URL } from '../data';
import { DomainTrack } from '../types';

interface SectionRegistrationProps {
  onDirectRegisterSuccess?: (userData: { name: string; email: string; phone: string }) => void;
}

export const SectionRegistration: React.FC<SectionRegistrationProps> = ({
  onDirectRegisterSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTrackId, setSelectedTrackId] = useState('non-tech');
  const [utrNumber, setUtrNumber] = useState('');
  const [copied, setCopied] = useState(false);
  const [isProceeding, setIsProceeding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const selectedTrack: DomainTrack =
    DOMAIN_TRACKS.find((t) => t.id === selectedTrackId) || DOMAIN_TRACKS[0];

  const amountStr = selectedTrack.amountNum.toString();
  const upiUri = UPI_CONFIG.getUpiUri(amountStr, selectedTrack.shortName);
  const qrCodeUrl = UPI_CONFIG.getQrCodeUrl(amountStr, selectedTrack.shortName);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      if (GOOGLE_FORM_URL) {
        window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
      }
      if (onDirectRegisterSuccess) {
        onDirectRegisterSuccess({ name, email, phone });
      }
    }, 800);
  };

  const whatsappConfirmationText = encodeURIComponent(
    `MASTER AI WORKSHOP REGISTRATION CONFIRMATION\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email}\n` +
      `Program: MASTER AI 7-Day Live Masterclass (All 9 Skills)\n` +
      `Amount: ₹${amountStr} (UPI)\n` +
      `Ticket ID: ${ticketId || 'MAI-REGISTERED'}\n` +
      `UTR / Ref: ${utrNumber || 'Completed via UPI to golulagwal890-2@oksbi'}\n\n` +
      `Please confirm my seat in today's 20-seat batch!`
  );

  return (
    <section
      id="register"
      className="relative z-10 w-full py-28 sm:py-36 md:py-44 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#0A0A0A] text-white border-t border-white/10"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Identifier */}
        <div className="text-[12px] font-mono tracking-widest text-white/40 uppercase mb-6">
          10 // WORKSHOP ENROLLMENT
        </div>

        {/* Headline */}
        <h2
          className="text-[38px] sm:text-[56px] md:text-[70px] font-medium tracking-tight leading-[1.05] text-white mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Secure Your Seat Today
        </h2>

        {/* Subheading */}
        <p className="text-[17px] sm:text-[22px] text-white/80 font-normal max-w-2xl mx-auto mb-12 leading-relaxed">
          Full 7-Day Live Masterclass covering all 9 in-demand skills for ₹89.
          Strictly limited to 20 students per daily batch for live mentoring.
        </p>

        {/* Registration Box */}
        <div className="max-w-xl mx-auto p-6 sm:p-10 md:p-12 rounded-3xl border border-white/15 bg-white/[0.04] text-left shadow-2xl">
          {/* STEP 1: FORM */}
          {step === 'form' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              {/* Program & Batch Info Card */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between mb-2">
                <div>
                  <span className="block text-xs font-semibold text-white">
                    7-Day Masterclass (All 9 Skills)
                  </span>
                  <span className="text-[11px] text-white/60 font-mono">
                    Batch Cap: 20 Students / Day • 9 PM IST
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  ₹89 Total
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/60 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aryan Sharma"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-[15px] focus:outline-hidden focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/60 mb-2">
                  Email Address (For Zoom Session Links)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. aryan@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-[15px] focus:outline-hidden focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-white/60 mb-2">
                  WhatsApp Number (For Evening Reminders)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-[15px] focus:outline-hidden focus:border-white transition-colors"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  id="submit-register-btn"
                  disabled={isProceeding}
                  className="w-full py-4 rounded-full bg-white text-black text-[15px] sm:text-[16px] font-semibold tracking-wide uppercase hover:bg-neutral-200 transition-all cursor-pointer shadow-lg active:scale-98 flex items-center justify-center gap-2 disabled:opacity-80"
                >
                  {isProceeding ? (
                    <div className="flex items-center gap-2.5">
                      <div className="loader-sm text-[#514b82]" />
                      <span>Generating UPI QR & Link...</span>
                    </div>
                  ) : (
                    <>
                      <span>Proceed to UPI Payment — ₹{amountStr}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Secondary microcopy */}
              <div className="flex items-center justify-center gap-1.5 text-center text-[12px] font-mono text-white/40 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Direct UPI to Mentor • 0% Middleman Cuts • Instant Confirmation</span>
              </div>
            </form>
          )}

          {/* STEP 2: UPI SCAN & PAY */}
          {step === 'payment' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                    DIRECT UPI // 0% COMMISSION
                  </div>
                  <h3
                    className="text-[22px] sm:text-[26px] font-medium text-white"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Scan & Pay ₹{amountStr}
                  </h3>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {selectedTrack.shortName}: ₹{amountStr}
                </span>
              </div>

              {/* QR Code Container */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                <div className="relative p-2 bg-white rounded-2xl mb-3 shadow-md">
                  <img
                    src={qrCodeUrl}
                    alt={`UPI QR Code for ₹${amountStr}`}
                    className="w-48 h-48 sm:w-52 sm:h-52 object-contain rounded-xl"
                  />
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-black text-white text-[11px] font-mono px-3 py-0.5 rounded-full whitespace-nowrap border border-white/20">
                    Scan with GPay / PhonePe / Paytm
                  </div>
                </div>

                <div className="text-xs font-mono text-white/70 mt-2 mb-1">
                  Payee: <strong className="text-white">{UPI_CONFIG.payeeName}</strong>
                </div>
                <div className="text-[11px] font-mono text-emerald-400 mb-3">
                  Track: {selectedTrack.name}
                </div>

                {/* Copyable UPI ID */}
                <div className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs font-mono">
                  <span className="text-white/90 truncate">{UPI_CONFIG.upiId}</span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="shrink-0 flex items-center gap-1.5 text-xs text-white bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy UPI</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Mobile App Launch Button */}
                <button
                  type="button"
                  onClick={handleMobilePay}
                  className="w-full mt-3 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Tap to Pay ₹{amountStr} on UPI App</span>
                </button>
              </div>

              {/* UTR Reference Input Form */}
              <form onSubmit={handleConfirmPayment} className="space-y-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-white/70 mb-1.5">
                    Enter 12-Digit UTR / UPI Ref No. (Optional)
                  </label>
                  <input
                    type="text"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    placeholder="e.g. 423589123456 or Transaction ID"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-xs font-mono focus:outline-hidden focus:border-white transition-colors"
                  />
                  <span className="block text-[11px] text-white/40 mt-1">
                    Visible on your payment completion receipt screen.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-white text-black text-[15px] font-semibold tracking-wide uppercase hover:bg-neutral-200 transition-all cursor-pointer shadow-lg active:scale-98 flex items-center justify-center gap-2 disabled:opacity-80"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2.5">
                      <div className="loader-sm text-[#514b82]" />
                      <span>Verifying & Opening Form...</span>
                    </div>
                  ) : (
                    <>
                      <span>I Have Paid ₹{amountStr} — Confirm Seat</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="w-full text-center text-xs text-white/40 hover:text-white pt-1 underline cursor-pointer"
                >
                  &larr; Change track or edit details
                </button>
              </form>
            </div>
          )}

          {/* STEP 3: SUCCESS & WHATSAPP CONFIRMATION */}
          {step === 'success' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>

              <h3
                className="text-[26px] sm:text-[30px] font-medium text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Seat Reserved Successfully!
              </h3>

              <p className="text-white/80 text-[15px] max-w-md mx-auto leading-relaxed">
                Welcome to {BRAND.name}, <strong className="text-white">{name}</strong>. Your entry for <strong className="text-emerald-400">{selectedTrack.shortName}</strong> has been recorded.
              </p>

              {/* Digital Pass Receipt */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left font-mono text-xs space-y-2.5">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-white flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    {BRAND.name} PASS
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    CONFIRMED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-white/70 text-[11px]">
                  <div>
                    <div className="text-white/40 uppercase text-[9px]">TICKET ID</div>
                    <div className="text-white font-medium">{ticketId}</div>
                  </div>
                  <div>
                    <div className="text-white/40 uppercase text-[9px]">AMOUNT</div>
                    <div className="text-emerald-400 font-semibold">₹{amountStr}.00</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-white/40 uppercase text-[9px]">DOMAIN TRACK</div>
                    <div className="text-white font-medium">{selectedTrack.name}</div>
                  </div>
                  <div>
                    <div className="text-white/40 uppercase text-[9px]">NAME</div>
                    <div className="text-white truncate">{name}</div>
                  </div>
                  <div>
                    <div className="text-white/40 uppercase text-[9px]">PAID TO UPI</div>
                    <div className="text-white truncate">{UPI_CONFIG.upiId}</div>
                  </div>
                  {utrNumber && (
                    <div className="col-span-2">
                      <div className="text-white/40 uppercase text-[9px]">UTR REF</div>
                      <div className="text-white">{utrNumber}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Google Form Submission Callout - Step 2 */}
              <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-400/30 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-xs font-semibold text-blue-300">
                    Step 2: Submit Details & Screenshot on Google Form
                  </span>
                </div>
                <p className="text-[11px] text-white/70 mb-3 leading-relaxed">
                  Please upload your payment screenshot or UTR in the official form so our team can immediately verify your registration and email your Zoom link.
                </p>
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <span>Submit Details on Google Form</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <a
                  href={`https://api.whatsapp.com/send?text=${whatsappConfirmationText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation to Harsh on WhatsApp</span>
                </a>

                <a
                  href={SOCIAL_LINKS.whatsappCommunity}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Join Official WhatsApp Community</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="text-xs font-mono text-white/40 underline hover:text-white pt-2 cursor-pointer"
                >
                  Register another participant
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

