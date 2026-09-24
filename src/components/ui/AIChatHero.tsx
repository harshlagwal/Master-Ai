import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ══════════════════════════════════════════════════════════════════════════════
   MASTER AI LOGO — matches Navbar brand SVG exactly
══════════════════════════════════════════════════════════════════════════════ */
const MasterAILogo: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.5L3.5 19.5H7.5L12 9.5L16.5 19.5H20.5L12 2.5Z" fill="url(#ma-chat-grad)" />
    <defs>
      <linearGradient id="ma-chat-grad" x1="3.5" y1="2.5" x2="20.5" y2="19.5" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="35%" stopColor="#EA4335" />
        <stop offset="70%" stopColor="#FBBC05" />
        <stop offset="100%" stopColor="#34A853" />
      </linearGradient>
    </defs>
  </svg>
);

/* ══════════════════════════════════════════════════════════════════════════════
   SCRIPTED EXCHANGES
══════════════════════════════════════════════════════════════════════════════ */
interface Exchange { id: number; chipLabel: string; question: string; answer: string; }

const EXCHANGES: Exchange[] = [
  {
    id: 0, chipLabel: 'Benefits?',
    question: 'Why should I join Master AI?',
    answer: 'In 7 live days you master the 9 highest-income AI skills — from prompt engineering to AI automation — by building real projects, not watching slides. Live on Google Meet at 8:00\u00a0PM\u00a0IST with Harsh Lagwal (IIT Patna).',
  },
  {
    id: 1, chipLabel: 'What will I build?',
    question: 'What will I actually build?',
    answer: 'Real portfolio proofs: an AI chatbot, an automation workflow, a resume that passes ATS filters, and your first AI side-hustle plan — everything verified live in class.',
  },
  {
    id: 2, chipLabel: 'Beginner friendly?',
    question: 'Is it beginner friendly?',
    answer: 'Yes. Day 1 starts from zero — no coding background needed. Every tool is taught hands-on, step by step, and you leave with working projects you built yourself.',
  },
  {
    id: 3, chipLabel: 'Cost?',
    question: 'What does the Master Pass cost?',
    answer: 'Just \u20b989 for the full 7-day live workshop — strictly 20 seats daily, zero-commission direct UPI. Your career upgrade costs less than a pizza.',
  },
];

const AMBER_PHRASES = [
  '9 highest-income AI skills', 'Google Meet', '8:00\u00a0PM\u00a0IST', 'IIT Patna',
  'AI chatbot', 'AI side-hustle plan', '\u20b989', '20 seats daily',
  'zero-commission direct UPI', 'Day 1',
];

const TYPOS: Record<number, { afterIdx: number; wrongChar: string }> = {
  0: { afterIdx: 6, wrongChar: 'r' },
  1: { afterIdx: 9, wrongChar: 'y' },
  2: { afterIdx: 4, wrongChar: 'n' },
  3: { afterIdx: 8, wrongChar: 's' },
};

/* ══════════════════════════════════════════════════════════════════════════════
   WORD TOKEN — with amber markup
══════════════════════════════════════════════════════════════════════════════ */
interface WordToken { text: string; amber: boolean; }

function tokenizeAnswer(answer: string): WordToken[] {
  const marks = new Array(answer.length).fill(false);
  for (const phrase of AMBER_PHRASES) {
    let idx = answer.indexOf(phrase);
    while (idx !== -1) {
      for (let i = idx; i < idx + phrase.length; i++) marks[i] = true;
      idx = answer.indexOf(phrase, idx + 1);
    }
  }
  const tokens: WordToken[] = [];
  const wordRe = /\S+\s*/g;
  let m: RegExpExecArray | null;
  while ((m = wordRe.exec(answer)) !== null) {
    const start = m.index;
    const end = start + m[0].length;
    tokens.push({ text: m[0], amber: marks.slice(start, end).some(Boolean) });
  }
  return tokens;
}

/* ══════════════════════════════════════════════════════════════════════════════
   STATE MACHINE
══════════════════════════════════════════════════════════════════════════════ */
type Phase = 'userTyping' | 'sending' | 'thinking' | 'streaming' | 'hold' | 'clearing';

interface ChatMessage {
  role: 'user' | 'ai';
  text?: string;
  tokens?: WordToken[];
  visibleTokens?: number;
  visible: boolean;
}

/* ══════════════════════════════════════════════════════════════════════════════
   WORD SPAN — cinematic zoom-pop on entry
══════════════════════════════════════════════════════════════════════════════ */
const WordSpan = React.memo(({ token, isNew, isDark }: {
  token: WordToken; isNew: boolean; isDark: boolean;
}) => {
  const base: React.CSSProperties = {
    display: 'inline-block',
    whiteSpace: 'pre-wrap',
    animation: isNew ? 'wordPop 0.18s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none',
  };
  if (token.amber) {
    return (
      <span style={{ ...base, color: isDark ? '#fbbf24' : '#d97706', fontWeight: 600 }}>
        {token.text}
      </span>
    );
  }
  return <span style={base}>{token.text}</span>;
});
WordSpan.displayName = 'WordSpan';

/* ══════════════════════════════════════════════════════════════════════════════
   SEND BUTTON ICON
══════════════════════════════════════════════════════════════════════════════ */
const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════════════ */
interface AIChatHeroProps { isDark?: boolean; onLoad?: () => void; }

export const AIChatHero: React.FC<AIChatHeroProps> = ({ isDark = true, onLoad }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedRef = useRef<boolean>(false);
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [phase, setPhase] = useState<Phase>('userTyping');
  const [currentExchange, setCurrentExchange] = useState(0);
  const [activeChip, setActiveChip] = useState<number | null>(null);
  /* Input bar state */
  const [inputText, setInputText] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [sendBurst, setSendBurst] = useState(false);

  useEffect(() => { onLoad?.(); }, [onLoad]);

  /* IntersectionObserver — pause off-screen */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      ([entry]) => { pausedRef.current = !entry.isIntersecting; },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) { clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    clearTimer();
    const start = Date.now();
    const tick = () => {
      if (pausedRef.current) { timerRef.current = setTimeout(tick, 100); return; }
      const remaining = ms - (Date.now() - start);
      if (remaining <= 0) fn();
      else timerRef.current = setTimeout(fn, remaining);
    };
    timerRef.current = setTimeout(tick, 0);
  }, [clearTimer]);

  /* Cleanup on unmount */
  useEffect(() => () => clearTimer(), [clearTimer]);

  /* ── reduced-motion path ─────────────────────────────────────────────────── */
  useEffect(() => {
    if (!reducedMotion) return;
    let idx = 0;
    const show = () => {
      const ex = EXCHANGES[idx % EXCHANGES.length];
      setMessages([
        { role: 'user', text: ex.question, visible: true },
        { role: 'ai', tokens: tokenizeAnswer(ex.answer), visibleTokens: 9999, visible: true },
      ]);
      setInputText('');
      idx++;
    };
    show();
    const id = setInterval(show, 6000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── main state machine ──────────────────────────────────────────────────── */
  useEffect(() => {
    if (reducedMotion) return;

    const ex = EXCHANGES[currentExchange];
    const question = ex.question;
    const typo = TYPOS[currentExchange];
    const tokens = tokenizeAnswer(ex.answer);

    /* ── userTyping: type into input bar char by char ─────────────────────── */
    if (phase === 'userTyping') {
      setInputText('');
      setInputFocused(true);
      setSendBurst(false);

      let charIdx = 0;
      let typoInserted = false;
      let typoDeleting = false;
      let wrongCharAdded = false;
      let currentVal = '';

      const typeNextChar = () => {
        if (pausedRef.current) { schedule(typeNextChar, 80); return; }

        /* Typo logic */
        if (typo && !typoInserted && charIdx === typo.afterIdx + 1) {
          if (!wrongCharAdded) {
            currentVal += typo.wrongChar;
            setInputText(currentVal);
            wrongCharAdded = true;
            schedule(() => { typoDeleting = true; typeNextChar(); }, 300);
            return;
          }
          if (typoDeleting) {
            currentVal = currentVal.slice(0, -1);
            setInputText(currentVal);
            typoInserted = true;
            typoDeleting = false;
          }
        }

        if (charIdx >= question.length) {
          /* Done typing — trigger send */
          schedule(() => setPhase('sending'), 350);
          return;
        }

        const ch = question[charIdx];
        currentVal += ch;
        setInputText(currentVal);
        charIdx++;

        const isPunct = '.!?,;:'.includes(ch);
        schedule(typeNextChar, isPunct ? 140 : 38 + Math.random() * 28);
      };

      schedule(typeNextChar, 400);
    }

    /* ── sending: burst animation → message bubble ────────────────────────── */
    if (phase === 'sending') {
      setSendBurst(true);
      schedule(() => {
        /* Move text from input to bubble */
        setMessages(prev => [...prev, { role: 'user', text: question, visible: true }]);
        setInputText('');
        setInputFocused(false);
        setSendBurst(false);
        scrollToBottom();
        schedule(() => setPhase('thinking'), 120);
      }, 220);
    }

    /* ── thinking ──────────────────────────────────────────────────────────── */
    if (phase === 'thinking') {
      setMessages(prev => [...prev, { role: 'ai', tokens, visibleTokens: 0, visible: true }]);
      scrollToBottom();
      schedule(() => setPhase('streaming'), 600 + Math.random() * 300);
    }

    /* ── streaming: word by word ───────────────────────────────────────────── */
    if (phase === 'streaming') {
      let tokenIdx = 0;
      const streamNext = () => {
        if (pausedRef.current) { schedule(streamNext, 80); return; }
        if (tokenIdx >= tokens.length) { schedule(() => setPhase('hold'), 500); return; }
        tokenIdx++;
        setMessages(prev => {
          const next = [...prev];
          const last = next[next.length - 1];
          return [...next.slice(0, -1), { ...last, visibleTokens: tokenIdx }];
        });
        scrollToBottom();
        schedule(streamNext, 38 + Math.random() * 22);
      };
      schedule(streamNext, 0);
    }

    /* ── hold 4s ───────────────────────────────────────────────────────────── */
    if (phase === 'hold') {
      schedule(() => setPhase('clearing'), 4000);
    }

    /* ── clearing: fade out ────────────────────────────────────────────────── */
    if (phase === 'clearing') {
      setMessages(prev => prev.map(m => ({ ...m, visible: false })));
      schedule(() => {
        setMessages([]);
        setCurrentExchange(prev => (prev + 1) % EXCHANGES.length);
        setActiveChip(null);
        setPhase('userTyping');
      }, 480);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentExchange]);

  /* ── Chip handler ─────────────────────────────────────────────────────────── */
  const handleChipClick = (idx: number) => {
    if (phase === 'thinking' || phase === 'streaming' || phase === 'sending') return;
    clearTimer();
    setMessages([]);
    setInputText('');
    setCurrentExchange(idx);
    setActiveChip(idx);
    setPhase('userTyping');
  };

  const isRunning = phase === 'userTyping' || phase === 'thinking' || phase === 'streaming' || phase === 'sending';

  /* ══════════════════════════════════════════════════════════════════════════
     THEME TOKENS
  ══════════════════════════════════════════════════════════════════════════ */
  const T = {
    cardBg:         isDark ? 'rgba(11,11,14,0.93)'         : 'rgba(255,255,255,0.97)',
    border:         isDark ? 'rgba(255,255,255,0.09)'       : 'rgba(15,23,42,0.10)',
    headerBg:       isDark ? 'rgba(255,255,255,0.02)'       : 'rgba(248,250,252,0.95)',
    text:           isDark ? 'rgba(255,255,255,0.88)'       : 'rgba(15,23,42,0.90)',
    textMuted:      isDark ? 'rgba(255,255,255,0.35)'       : 'rgba(15,23,42,0.40)',
    userBubbleBg:   isDark ? 'rgba(255,255,255,0.07)'       : 'rgba(99,102,241,0.08)',
    userBubbleBdr:  isDark ? 'rgba(255,255,255,0.10)'       : 'rgba(99,102,241,0.18)',
    aiBubbleBg:     isDark ? 'rgba(34,211,238,0.05)'        : 'rgba(34,211,238,0.06)',
    aiBubbleBdr:    isDark ? 'rgba(34,211,238,0.18)'        : 'rgba(6,182,212,0.25)',
    inputBg:        isDark ? 'rgba(255,255,255,0.04)'       : 'rgba(248,250,252,1)',
    inputBdr:       isDark ? 'rgba(255,255,255,0.12)'       : 'rgba(15,23,42,0.15)',
    inputFocusBdr:  isDark ? 'rgba(34,211,238,0.5)'         : 'rgba(99,102,241,0.55)',
    inputText:      isDark ? 'rgba(255,255,255,0.82)'       : 'rgba(15,23,42,0.85)',
    chipBg:         isDark ? 'rgba(255,255,255,0.04)'       : 'rgba(248,250,252,0.90)',
    chipBdr:        isDark ? 'rgba(255,255,255,0.11)'       : 'rgba(15,23,42,0.14)',
    chipActiveBg:   isDark ? 'rgba(251,191,36,0.10)'        : 'rgba(251,191,36,0.12)',
    chipActiveBdr:  isDark ? 'rgba(251,191,36,0.55)'        : 'rgba(217,119,6,0.50)',
    chipActiveText: isDark ? '#fbbf24'                      : '#b45309',
    chipText:       isDark ? 'rgba(255,255,255,0.58)'       : 'rgba(15,23,42,0.60)',
    glow:           isDark
      ? 'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(34,211,238,0.12) 0%, rgba(99,102,241,0.07) 45%, transparent 70%)'
      : 'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(99,102,241,0.10) 0%, rgba(59,130,246,0.06) 45%, transparent 70%)',
    shadow: isDark
      ? '0 32px 80px -16px rgba(0,0,0,0.96), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06)'
      : '0 24px 60px -12px rgba(15,23,42,0.18), 0 0 0 1px rgba(15,23,42,0.08)',
    sendBg: sendBurst
      ? 'linear-gradient(135deg, #06b6d4, #6366f1)'
      : (inputText.length > 0
        ? 'linear-gradient(135deg, #06b6d4, #6366f1)'
        : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)')),
    sendColor: inputText.length > 0 ? '#fff' : (isDark ? 'rgba(255,255,255,0.3)' : 'rgba(15,23,42,0.3)'),
    cursorColor: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.7)',
    aiCursorColor: isDark ? 'rgba(34,211,238,0.8)' : 'rgba(6,182,212,0.9)',
    dotColor: isDark ? 'rgba(34,211,238,0.65)' : 'rgba(6,182,212,0.75)',
    liveBdr: isDark ? 'rgba(52,211,153,0.3)' : 'rgba(16,185,129,0.3)',
    liveBg: isDark ? 'rgba(52,211,153,0.08)' : 'rgba(16,185,129,0.08)',
    liveText: isDark ? '#34d399' : '#059669',
    topLine: isDark
      ? 'linear-gradient(90deg, transparent, rgba(34,211,238,0.85) 40%, rgba(99,102,241,0.65) 60%, transparent)'
      : 'linear-gradient(90deg, transparent, rgba(99,102,241,0.70) 40%, rgba(59,130,246,0.50) 60%, transparent)',
  };

  /* ══════════════════════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════════════════════ */
  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', inset: '-20px', background: T.glow, pointerEvents: 'none', zIndex: 0 }} />

      {/* ── Card ──────────────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px',
        borderRadius: '20px', border: '1px solid ' + T.border, background: T.cardBg,
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: T.shadow, maxHeight: '560px',
      }}>
        {/* Chromatic top line */}
        <div style={{ position: 'absolute', top: 0, left: '8%', right: '8%', height: '1px', background: T.topLine, pointerEvents: 'none' }} />

        {/* ── Header with Master AI logo ──────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '11px 15px 10px', borderBottom: '1px solid ' + T.border,
          background: T.headerBg, flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Traffic lights */}
            <div style={{ display: 'flex', gap: '5px' }}>
              {['#ef4444', '#f59e0b', '#22c55e'].map((c, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.8 }} />
              ))}
            </div>
            {/* Master AI Logo + title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MasterAILogo size={17} />
              <span style={{
                fontFamily: 'var(--font-mono, monospace)', fontSize: '11px',
                color: T.textMuted, letterSpacing: '0.04em', fontWeight: 500,
              }}>
                MASTER AI · Live Assistant
              </span>
            </div>
          </div>
          {/* LIVE pill */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '3px 9px', borderRadius: '9999px',
            border: '1px solid ' + T.liveBdr, background: T.liveBg,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: T.liveText, display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '10px', color: T.liveText, letterSpacing: '0.08em' }}>LIVE</span>
          </div>
        </div>

        {/* ── Conversation scroll area ────────────────────────────────────── */}
        <div ref={scrollRef} style={{
          flex: 1, overflowY: 'auto', overflowX: 'hidden',
          padding: '14px 14px 10px', display: 'flex', flexDirection: 'column',
          gap: '10px', scrollbarWidth: 'none', minHeight: '240px', maxHeight: '310px',
        }}>
          {messages.map((msg, msgIdx) => (
            <div key={msgIdx} style={{
              opacity: msg.visible ? 1 : 0,
              transform: msg.visible ? 'translateY(0)' : 'translateY(4px)',
              transition: 'opacity 0.3s ease ' + (msgIdx * 38) + 'ms, transform 0.3s ease ' + (msgIdx * 38) + 'ms',
              display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              alignItems: 'flex-end', gap: '7px',
            }}>
              {/* AI avatar */}
              {msg.role === 'ai' && (
                <div style={{
                  width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(99,102,241,0.08)',
                  border: '1px solid ' + (isDark ? 'rgba(255,255,255,0.10)' : 'rgba(99,102,241,0.15)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2px',
                }}>
                  <MasterAILogo size={13} />
                </div>
              )}

              {/* Bubble */}
              <div style={{
                maxWidth: '82%',
                padding: msg.role === 'user' ? '9px 13px' : '11px 13px',
                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                background: msg.role === 'user' ? T.userBubbleBg : T.aiBubbleBg,
                border: '1px solid ' + (msg.role === 'user' ? T.userBubbleBdr : T.aiBubbleBdr),
                fontFamily: 'var(--font-body, system-ui, sans-serif)',
                fontSize: '13px', lineHeight: 1.55, color: T.text,
                wordBreak: 'break-word', position: 'relative',
              }}>
                {msg.role === 'user' ? (
                  <span>{msg.text}</span>
                ) : msg.visibleTokens === 0 ? (
                  /* Thinking dots */
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', minHeight: '18px' }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: T.dotColor, display: 'inline-block',
                        animation: 'aiThinkBounce 0.9s ease-in-out ' + (i * 150) + 'ms infinite',
                      }} />
                    ))}
                  </span>
                ) : (
                  /* Streamed tokens with zoom-pop */
                  <span>
                    {(msg.tokens || []).slice(0, msg.visibleTokens).map((tok, tIdx) => (
                      <WordSpan key={tIdx} token={tok} isNew={tIdx === (msg.visibleTokens ?? 0) - 1} isDark={isDark} />
                    ))}
                    {phase === 'streaming' && msgIdx === messages.length - 1 && (
                      <span style={{ display: 'inline-block', width: '2px', height: '1em', background: T.aiCursorColor, marginLeft: '2px', verticalAlign: 'middle', animation: 'blink 0.7s step-end infinite' }} />
                    )}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Empty state */}
          {messages.length === 0 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: 0.35, paddingTop: '24px' }}>
              <MasterAILogo size={30} />
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', color: T.textMuted, letterSpacing: '0.06em' }}>Ask anything about MASTER AI…</span>
            </div>
          )}
        </div>

        {/* ── ChatGPT-style input bar ─────────────────────────────────────── */}
        <div style={{ padding: '10px 12px 10px', borderTop: '1px solid ' + T.border, flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 12px 8px 14px',
            borderRadius: '14px',
            border: '1.5px solid ' + (inputFocused ? T.inputFocusBdr : T.inputBdr),
            background: T.inputBg,
            transition: 'border-color 0.2s ease',
          }}>
            {/* Fake input text */}
            <div style={{
              flex: 1, fontFamily: 'var(--font-body, system-ui, sans-serif)',
              fontSize: '13px', color: T.inputText,
              minHeight: '20px', lineHeight: '20px',
              overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
            }}>
              {inputText || (
                <span style={{ color: T.textMuted }}>Ask about MASTER AI…</span>
              )}
              {/* Blinking cursor in input */}
              {(phase === 'userTyping') && (
                <span style={{
                  display: 'inline-block', width: '2px', height: '13px',
                  background: T.cursorColor, marginLeft: '1px',
                  verticalAlign: 'middle', animation: 'blink 1s step-end infinite',
                }} />
              )}
            </div>

            {/* Send button */}
            <button
              style={{
                width: 30, height: 30, borderRadius: '9px',
                background: T.sendBg,
                border: 'none', cursor: 'pointer', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: T.sendColor,
                transform: sendBurst ? 'scale(0.85)' : 'scale(1)',
                transition: 'transform 0.15s ease, background 0.2s ease',
                outline: 'none',
              }}
            >
              <SendIcon />
            </button>
          </div>
        </div>

        {/* ── Preset chips ────────────────────────────────────────────────── */}
        <div style={{ padding: '2px 12px 13px', display: 'flex', flexWrap: 'wrap', gap: '6px', flexShrink: 0 }}>
          {EXCHANGES.map((ex, idx) => {
            const isActive = activeChip === idx;
            const isDisabled = isRunning && activeChip !== idx;
            return (
              <button key={idx} onClick={() => handleChipClick(idx)} disabled={isDisabled}
                onMouseEnter={e => { if (!isDisabled) (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
                style={{
                  padding: '5px 11px', borderRadius: '9999px',
                  border: '1px solid ' + (isActive ? T.chipActiveBdr : T.chipBdr),
                  background: isActive ? T.chipActiveBg : T.chipBg,
                  color: isActive ? T.chipActiveText : T.chipText,
                  fontFamily: 'var(--font-mono, monospace)', fontSize: '11px',
                  cursor: isDisabled ? 'default' : 'pointer',
                  opacity: isDisabled ? 0.4 : 1,
                  transition: 'transform 0.15s ease, opacity 0.15s ease, border-color 0.15s ease',
                  transform: 'translateY(0)', outline: 'none',
                }}
              >
                {ex.chipLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Global keyframes ──────────────────────────────────────────────── */}
      <style>{`
        @keyframes aiThinkBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.45; }
          40%            { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes wordPop {
          0%   { opacity: 0; transform: scale(1.35) translateY(3px); }
          60%  { opacity: 1; transform: scale(1.04) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
