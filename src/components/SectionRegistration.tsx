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
import { BRAND, SOCIAL_LINKS, UPI_CONFIG, DOMAIN_TRACKS, GOOGLE_FORM_URL, submitLeadToFormspree } from '../data';
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
  const [selectedTrackId, setSelectedTrackId] = useState('master-pass');
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

  const isFreeTrack = selectedTrack.amountNum === 0;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setIsProceeding(true);

    const isFree = selectedTrack.amountNum === 0;
    const genId = isFree
      ? `MAI-DEMO-${Math.floor(100000 + Math.random() * 900000)}`
      : `MAI-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(genId);

    // Instant Formspree dispatch for lead capture (Demo or Paid)
    submitLeadToFormspree({
      fullName: name,
      email: email,
      phone: phone,
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
        if (onDirectRegisterSuccess) {
          onDirectRegisterSuccess({ name, email, phone });
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
    setLoading(true);

    // Instant Formspree dispatch for payment confirmation
    submitLeadToFormspree({
      fullName: name,
      email: email,
      phone: phone,
      trackName: selectedTrack.name,
      category: `PAID WORKSHOP CONFIRMED (₹${amountStr})`,
      ticketId: ticketId || `MAI-${Math.floor(100000 + Math.random() * 900000)}`,
      utrNumber: utrNumber || 'Completed via UPI',
      additionalNote: 'User confirmed direct payment receipt',
    });

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
      `Program: ${selectedTrack.name}\n` +
      `Amount: ${isFreeTrack ? 'FREE (₹0 Demo Entry)' : `₹${amountStr} (UPI)`}\n` +
      `Ticket ID: ${ticketId || 'MAI-REGISTERED'}\n` +
      (!isFreeTrack && utrNumber ? `UTR / Ref: ${utrNumber}\n` : '') +
      `📝 Google Form: ${GOOGLE_FORM_URL}\n\n` +
      `Please confirm my registration!`
  );

  return (
    <section
      id="register"
      className="relative z-10 w-full py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#0A0A0A] text-white border-t border-white/10"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Identifier */}
        <div className="text-[12px] font-mono tracking-widest text-white/40 uppercase mb-4 sm:mb-6">
          10 // WORKSHOP ENROLLMENT
        </div>

        {/* Headline */}
        <h2
          className="text-[32px] sm:text-[46px] md:text-[58px] lg:text-[66px] font-medium tracking-tight leading-[1.05] text-white mb-4 sm:mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Secure Your Seat Today
        </h2>

        {/* Subheading */}
        <p className="text-[16px] sm:text-[19px] text-white/80 font-normal max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          Choose your live workshop program and reserve your seat via direct UPI with zero transaction fees.
        </p>

        {/* Registration Box */}
        <div className="max-w-xl mx-auto p-6 sm:p-10 md:p-12 rounded-3xl border border-white/15 bg-white/[0.04] text-left shadow-2xl">
          {/* STEP 1: FORM */}
          {step === 'form' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              {/* Select Program Tabs */}
              {/* Select Program Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
                <button
                  type="button"
                  onClick={() => setSelectedTrackId('flash-pass-60')}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    selectedTrackId === 'flash-pass-60'
                      ? 'border-amber-400 bg-amber-400 text-black shadow-md font-semibold'
                      : 'border-white/20 bg-white/5 text-white/80 hover:border-amber-400'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold leading-snug flex items-center justify-between">
                    <span>Student Pass</span>
                    <span className="text-[10px] bg-black/15 px-1.5 py-0.5 rounded font-bold uppercase">
                      Grant
                    </span>
                  </div>
                  <div
                    className={`text-xs font-bold mt-0.5 ${
                      selectedTrackId === 'flash-pass-60' ? 'text-black' : 'text-emerald-400'
                    }`}
                  >
                    ₹60 Total
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTrackId('master-pass')}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    selectedTrackId === 'master-pass'
                      ? 'border-white bg-white text-black shadow-md font-semibold'
                      : 'border-white/20 bg-white/5 text-white/80 hover:border-white/40'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold leading-snug">7-Day Master</div>
                  <div
                    className={`text-xs font-bold mt-0.5 ${
                      selectedTrackId === 'master-pass' ? 'text-emerald-700' : 'text-emerald-400'
                    }`}
                  >
                    ₹89 Total
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTrackId('sih-masterclass')}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    selectedTrackId === 'sih-masterclass'
                      ? 'border-amber-400 bg-gradient-to-r from-amber-400 to-orange-400 text-black shadow-md font-semibold'
                      : 'border-white/20 bg-white/5 text-white/80 hover:border-amber-400'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold leading-snug flex items-center justify-between">
                    <span>SIH 2-Hr</span>
                    <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded font-bold uppercase">
                      Sprint
                    </span>
                  </div>
                  <div
                    className={`text-xs font-bold mt-0.5 ${
                      selectedTrackId === 'sih-masterclass' ? 'text-black' : 'text-amber-400'
                    }`}
                  >
                    ₹199 Team
                  </div>
                </button>
              </div>

              {/* Program & Batch Info Card */}
              <div
                className={`p-4 rounded-2xl border-2 flex items-center justify-between mb-3 ${
                  selectedTrackId === 'sih-masterclass'
                    ? 'bg-amber-500/15 border-amber-400/40'
                    : selectedTrackId === 'flash-pass-60'
                    ? 'bg-amber-500/15 border-amber-400/40'
                    : 'bg-white/5 border-white/20'
                }`}
              >
                <div>
                  <span className="block text-sm font-bold text-white mb-0.5">
                    {selectedTrackId === 'sih-masterclass'
                      ? 'Smart India Hackathon (SIH) 2-Hr Masterclass'
                      : selectedTrackId === 'flash-pass-60'
                      ? 'Student Flash Pass (₹60 Launch Grant)'
                      : '7-Day Masterclass (All 9 Skills)'}
                  </span>
                  <span className="text-xs text-white/80 font-medium">
                    {selectedTrackId === 'sih-masterclass'
                      ? 'AI Prototyping + SIH PPT + Jury Pitch Defense'
                      : 'Batch Cap: 20 Students / Day • 9 PM IST'}
                  </span>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    selectedTrackId === 'sih-masterclass'
                      ? 'text-amber-200 bg-amber-400/20 border-amber-400/50'
                      : 'text-emerald-300 bg-emerald-500/20 border-emerald-500/30'
                  }`}
                >
                  ₹{amountStr} Total
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/90 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aryan Sharma"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-[15px] font-medium focus:outline-hidden focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/90 mb-2">
                  Email Address (For Zoom Session Links)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. aryan@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-[15px] font-medium focus:outline-hidden focus:border-white transition-colors"
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
                <div className="w-full flex items-center justify-between gap-2 px-3.5 py-3 rounded-xl bg-white/10 border border-white/20 hover:border-white/40 text-xs font-mono transition-colors">
                  <span className="text-white/90 select-all truncate">{UPI_CONFIG.upiId}</span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="shrink-0 flex items-center gap-1.5 text-xs text-white bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy UPI ID</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-white/50 mt-2 text-center">
                  Scan QR with any UPI app or copy UPI ID to pay ₹{amountStr}.
                </p>
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

              {/* Step 1: Google Form Submission Callout (Mandatory for both Free Demo & Paid Tracks) */}
              <div
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isFreeTrack
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-blue-500/10 border-blue-400/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <FileText
                      className={`w-4 h-4 shrink-0 ${
                        isFreeTrack ? 'text-emerald-400' : 'text-blue-400'
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        isFreeTrack ? 'text-emerald-300' : 'text-blue-300'
                      }`}
                    >
                      Step 1: Fill Google Form
                    </span>
                  </div>
                  <span className="text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
                    Required
                  </span>
                </div>
                <p className="text-[11.5px] text-white/80 mb-3 leading-relaxed">
                  {isFreeTrack
                    ? 'Please fill the quick registration form so we can allocate your demo batch and send the Google Meet link.'
                    : 'Please upload your payment screenshot or UTR in the official form so our team can immediately verify your registration.'}
                </p>
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-2.5 px-4 rounded-xl text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-md ${
                    isFreeTrack
                      ? 'bg-emerald-600 hover:bg-emerald-500'
                      : 'bg-blue-600 hover:bg-blue-500'
                  }`}
                >
                  <span>{isFreeTrack ? 'Fill Demo Registration Form' : 'Submit Details on Google Form'}</span>
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
                  <span>{isFreeTrack ? 'Send Demo Confirmation on WhatsApp' : 'Send Confirmation to Harsh on WhatsApp'}</span>
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

