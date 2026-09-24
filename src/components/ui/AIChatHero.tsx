import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ══════════════════════════════════════════════════════════════════════════════
   MASTER AI LOGO
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
   GEMINI 4-POINT SPARKLE STAR
══════════════════════════════════════════════════════════════════════════════ */
const GeminiSparkle: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z"
      fill="url(#gemini-sparkle-grad)"
    />
    <defs>
      <linearGradient id="gemini-sparkle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="35%" stopColor="#9B72CF" />
        <stop offset="70%" stopColor="#D96570" />
        <stop offset="100%" stopColor="#FBBC05" />
      </linearGradient>
    </defs>
  </svg>
);

/* ══════════════════════════════════════════════════════════════════════════════
   SCRIPTED EXCHANGES: MENTOR, POPULAR TOOLS, PROJECTS, ZERO CODING, FEE
══════════════════════════════════════════════════════════════════════════════ */
interface Exchange {
  id: number;
  topic: string;
  question: string;
  answer: string;
}

const EXCHANGES: Exchange[] = [
  {
    id: 0,
    topic: 'Mentor',
    question: 'Who is the mentor leading Master AI?',
    answer: 'Mentored by Harsh Lagwal (IIT Patna alumni) — an AI product engineer who has trained 5,000+ students. You learn live directly on Google Meet at 8:00 PM IST with real-time screen sharing, interactive doubt solving, and 1-on-1 mentorship.',
  },
  {
    id: 1,
    topic: 'Popular AI Tools',
    question: 'Which popular AI tools will I learn?',
    answer: 'You master top industry AI tools: ChatGPT-4o, Claude 3.5 Sonnet, Cursor AI, Midjourney v6, Perplexity Pro, ElevenLabs, and n8n / Make for automations — building real-world workflows from scratch.',
  },
  {
    id: 2,
    topic: 'Projects',
    question: 'What projects will I actually build?',
    answer: 'You build 4 verifiable portfolio proofs: a custom AI chatbot, end-to-end automation workflows, an ATS-bypassing AI resume engine, and your first monetizable AI agency offering — all tested and verified live.',
  },
  {
    id: 3,
    topic: 'Beginner Friendly',
    question: 'I have zero coding background, can I join?',
    answer: 'Absolutely yes! Day 1 starts from ground zero — no tech experience needed. Every AI tool is taught hands-on with visual step-by-step guidance and mentor support.',
  },
  {
    id: 4,
    topic: 'Pass Fee',
    question: 'What does the full 7-day pass cost?',
    answer: 'Just ₹89 for the complete 7-day live intensive — strictly 20 seats daily with zero-commission direct UPI. Your complete career transformation costs less than a cup of coffee!',
  },
];

const AMBER_PHRASES = [
  'Harsh Lagwal (IIT Patna alumni)',
  '5,000+ students',
  'Google Meet at 8:00 PM IST',
  '1-on-1 mentorship',
  'ChatGPT-4o',
  'Claude 3.5 Sonnet',
  'Cursor AI',
  'Midjourney v6',
  'Perplexity Pro',
  'ElevenLabs',
  'n8n / Make',
  '4 verifiable portfolio proofs',
  'custom AI chatbot',
  'ground zero',
  'no tech experience needed',
  '₹89',
  'strictly 20 seats daily',
  'zero-commission direct UPI',
];

interface WordToken {
  text: string;
  amber: boolean;
}

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
    const s = m.index, e = s + m[0].length;
    tokens.push({ text: m[0], amber: marks.slice(s, e).some(Boolean) });
  }
  return tokens;
}

/* ══════════════════════════════════════════════════════════════════════════════
   FAMOUS GEMINI SHIMMER LOADER
══════════════════════════════════════════════════════════════════════════════ */
const GeminiLoader: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const barBg = isDark
    ? 'linear-gradient(90deg, rgba(255,255,255,0.06) 20%, rgba(66,133,244,0.35) 45%, rgba(155,114,207,0.35) 55%, rgba(255,255,255,0.06) 80%)'
    : 'linear-gradient(90deg, rgba(0,0,0,0.06) 20%, rgba(66,133,244,0.22) 45%, rgba(155,114,207,0.22) 55%, rgba(0,0,0,0.06) 80%)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '4px 2px', minWidth: '220px' }}>
      {/* Sparkle Header with Gemini Gradient Text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ animation: 'geminiPulse 2s ease-in-out infinite', display: 'flex', alignItems: 'center' }}>
          <GeminiSparkle size={18} />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '12px',
            fontWeight: 600,
            background: 'linear-gradient(90deg, #4285F4 0%, #9B72CF 30%, #D96570 60%, #FBBC05 85%, #4285F4 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'geminiShimmer 2.2s linear infinite',
            letterSpacing: '0.02em',
          }}
        >
          Master AI is thinking...
        </span>
      </div>

      {/* Iconic Google Gemini Shimmer Skeleton Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '2px' }}>
        <div
          style={{
            width: '92%',
            height: '11px',
            borderRadius: '6px',
            background: barBg,
            backgroundSize: '200% 100%',
            animation: 'geminiSkeletonSlide 1.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            width: '78%',
            height: '11px',
            borderRadius: '6px',
            background: barBg,
            backgroundSize: '200% 100%',
            animation: 'geminiSkeletonSlide 1.5s ease-in-out 0.2s infinite',
          }}
        />
        <div
          style={{
            width: '54%',
            height: '11px',
            borderRadius: '6px',
            background: barBg,
            backgroundSize: '200% 100%',
            animation: 'geminiSkeletonSlide 1.5s ease-in-out 0.4s infinite',
          }}
        />
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   WORD SPAN (Pop-in animation for streamed words)
══════════════════════════════════════════════════════════════════════════════ */
const WordSpan = React.memo(({ token, isNew, isDark }: { token: WordToken; isNew: boolean; isDark: boolean }) => {
  const base: React.CSSProperties = {
    display: 'inline-block',
    whiteSpace: 'pre-wrap',
    animation: isNew ? 'wordPop 0.18s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none',
  };
  if (token.amber) {
    return <span style={{ ...base, color: isDark ? '#fbbf24' : '#d97706', fontWeight: 600 }}>{token.text}</span>;
  }
  return <span style={base}>{token.text}</span>;
});
WordSpan.displayName = 'WordSpan';

/* ══════════════════════════════════════════════════════════════════════════════
   SEND ICON
══════════════════════════════════════════════════════════════════════════════ */
const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════════════════════
   PHASES
   - zoomTyping: Card zooms in slightly on input bar, query auto-types char by char
   - zoomSend: Zooms back to normal, send button triggers burst, message moves up
   - thinking: Famous Gemini shimmer loader displays
   - streaming: Word-by-word streaming answer
   - hold: Full answer displayed for viewing
   - clearing: Clean reset for next query
══════════════════════════════════════════════════════════════════════════════ */
type Phase = 'zoomTyping' | 'zoomSend' | 'thinking' | 'streaming' | 'hold' | 'clearing';

interface ChatMessage {
  role: 'user' | 'ai';
  text?: string;
  tokens?: WordToken[];
  visibleTokens?: number;
}

export const AIChatHero: React.FC<{ isDark?: boolean; onLoad?: () => void }> = ({ isDark = true, onLoad }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [phase, setPhase] = useState<Phase>('zoomTyping');
  const [currentExchange, setCurrentExchange] = useState(0);
  const [inputText, setInputText] = useState('');
  const [sendBurst, setSendBurst] = useState(false);

  useEffect(() => {
    onLoad?.();
  }, [onLoad]);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  /* ────────────────────────────────────────────────────────────────────────────
     CORE CINEMATIC STATE MACHINE
  ──────────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const ex = EXCHANGES[currentExchange];
    const question = ex.question;
    const tokens = tokenizeAnswer(ex.answer);
    let isCancelled = false;

    // Phase 1: zoomTyping
    if (phase === 'zoomTyping') {
      setInputText('');
      setSendBurst(false);

      let charIdx = 0;
      let curr = '';

      const typeTimer = setInterval(() => {
        if (isCancelled) return;
        if (charIdx < question.length) {
          curr += question[charIdx];
          setInputText(curr);
          charIdx++;
        } else {
          clearInterval(typeTimer);
          // Wait 350ms after typing finishes, then trigger send
          setTimeout(() => {
            if (!isCancelled) setPhase('zoomSend');
          }, 350);
        }
      }, 40);

      return () => {
        isCancelled = true;
        clearInterval(typeTimer);
      };
    }

    // Phase 2: zoomSend
    if (phase === 'zoomSend') {
      setSendBurst(true);

      const t1 = setTimeout(() => {
        if (isCancelled) return;
        setSendBurst(false);
        setMessages([{ role: 'user', text: question }]);
        setInputText('');
        scrollToBottom();

        const t2 = setTimeout(() => {
          if (!isCancelled) setPhase('thinking');
        }, 180);

        return () => clearTimeout(t2);
      }, 260);

      return () => {
        isCancelled = true;
        clearTimeout(t1);
      };
    }

    // Phase 3: thinking (Gemini Loader)
    if (phase === 'thinking') {
      setMessages(prev => [...prev, { role: 'ai', tokens, visibleTokens: 0 }]);
      setTimeout(scrollToBottom, 50);

      const t = setTimeout(() => {
        if (!isCancelled) setPhase('streaming');
      }, 1400);

      return () => {
        isCancelled = true;
        clearTimeout(t);
      };
    }

    // Phase 4: streaming (Word-by-word)
    if (phase === 'streaming') {
      let tokenIdx = 0;

      const streamInterval = setInterval(() => {
        if (isCancelled) return;
        if (tokenIdx < tokens.length) {
          tokenIdx++;
          setMessages(prev => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last && last.role === 'ai') {
              next[next.length - 1] = { ...last, visibleTokens: tokenIdx };
            }
            return next;
          });
          scrollToBottom();
        } else {
          clearInterval(streamInterval);
          setTimeout(() => {
            if (!isCancelled) setPhase('hold');
          }, 400);
        }
      }, 44);

      return () => {
        isCancelled = true;
        clearInterval(streamInterval);
      };
    }

    // Phase 5: hold (Keep answer visible for viewing)
    if (phase === 'hold') {
      const t = setTimeout(() => {
        if (!isCancelled) setPhase('clearing');
      }, 4800);

      return () => {
        isCancelled = true;
        clearTimeout(t);
      };
    }

    // Phase 6: clearing (Graceful reset and next question)
    if (phase === 'clearing') {
      const t = setTimeout(() => {
        if (isCancelled) return;
        setMessages([]);
        setCurrentExchange(prev => (prev + 1) % EXCHANGES.length);
        setPhase('zoomTyping');
      }, 450);

      return () => {
        isCancelled = true;
        clearTimeout(t);
      };
    }
  }, [phase, currentExchange, scrollToBottom]);

  /* ────────────────────────────────────────────────────────────────────────────
     THEME CONFIGURATION
  ──────────────────────────────────────────────────────────────────────────── */
  const D = isDark;
  const T = {
    cardBg: D ? 'rgba(10, 11, 15, 0.94)' : 'rgba(255, 255, 255, 0.96)',
    border: D ? 'rgba(255, 255, 255, 0.10)' : 'rgba(15, 23, 42, 0.12)',
    headerBg: D ? 'rgba(255, 255, 255, 0.02)' : 'rgba(248, 250, 252, 0.95)',
    text: D ? 'rgba(255, 255, 255, 0.90)' : 'rgba(15, 23, 42, 0.90)',
    textMuted: D ? 'rgba(255, 255, 255, 0.40)' : 'rgba(15, 23, 42, 0.45)',
    userBubbleBg: D ? 'rgba(66, 133, 244, 0.15)' : 'rgba(99, 102, 241, 0.09)',
    userBubbleBdr: D ? 'rgba(66, 133, 244, 0.30)' : 'rgba(99, 102, 241, 0.22)',
    aiBubbleBg: D ? 'rgba(255, 255, 255, 0.04)' : 'rgba(248, 250, 252, 0.90)',
    aiBubbleBdr: D ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
    inputBg: D ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 1)',
    inputBdr: D ? 'rgba(255, 255, 255, 0.13)' : 'rgba(15, 23, 42, 0.14)',
    inputActiveBdr: '#4285F4',
    inputText: D ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.92)',
    shadow: D
      ? '0 30px 80px -15px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.06)'
      : '0 25px 65px -12px rgba(15,23,42,0.14), 0 0 0 1px rgba(15,23,42,0.08)',
  };

  const isTyping = phase === 'zoomTyping';

  // Dynamic Video Caption Text
  const captionText =
    phase === 'zoomTyping'
      ? '✍️ Auto-Typing Question...'
      : phase === 'zoomSend'
      ? '⚡ Submitting to Master AI...'
      : phase === 'thinking'
      ? '✨ Gemini Neural Engine Thinking...'
      : phase === 'streaming'
      ? '🟢 Streaming Live Verified Answer...'
      : phase === 'hold'
      ? '✅ Live Verified Proof • Next demo loading...'
      : '🔄 Next Question Loading...';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      {/* Dynamic Background Glow */}
      <div
        style={{
          position: 'absolute',
          inset: '-25px',
          background: D
            ? 'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(66,133,244,0.14) 0%, rgba(155,114,207,0.08) 50%, transparent 75%)'
            : 'radial-gradient(ellipse 75% 65% at 50% 50%, rgba(66,133,244,0.10) 0%, rgba(155,114,207,0.05) 50%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CHAT WINDOW CARD (VIDEO-LIKE FEEL)
          - Zooms in smoothly during typing for that authentic video/camera feel!
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '430px',
          borderRadius: '22px',
          border: `1px solid ${T.border}`,
          background: T.cardBg,
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: T.shadow,
          maxHeight: '560px',
          transform: isTyping ? 'scale(1.03) translateY(-4px)' : 'scale(1) translateY(0)',
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease',
          willChange: 'transform',
        }}
      >
        {/* Top Chromatic Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #4285F4 35%, #9B72CF 65%, transparent)',
            pointerEvents: 'none',
          }}
        />

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px 11px',
            borderBottom: `1px solid ${T.border}`,
            background: T.headerBg,
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              {['#ef4444', '#f59e0b', '#22c55e'].map((c, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.85 }} />
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '2px' }}>
              <MasterAILogo size={17} />
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11px',
                  color: T.textMuted,
                  letterSpacing: '0.04em',
                  fontWeight: 600,
                }}
              >
                MASTER AI · Live Assistant
              </span>
            </div>
          </div>

          {/* Live indicator badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '3px 8px',
              borderRadius: '9999px',
              border: '1px solid rgba(52, 211, 153, 0.35)',
              background: 'rgba(52, 211, 153, 0.08)',
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#34d399',
                display: 'inline-block',
                animation: 'chatPulse 2s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '10px',
                color: '#34d399',
                letterSpacing: '0.08em',
                fontWeight: 600,
              }}
            >
              LIVE
            </span>
          </div>
        </div>

        {/* ── CONVERSATION STREAMING AREA ─────────────────────────────────── */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '14px 14px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            scrollbarWidth: 'none',
            minHeight: '235px',
            maxHeight: '305px',
          }}
        >
          {messages.map((msg, msgIdx) => (
            <div
              key={msgIdx}
              style={{
                display: 'flex',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                gap: '8px',
                animation: 'messageEnter 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              {msg.role === 'ai' && (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    flexShrink: 0,
                    background: D ? 'rgba(255,255,255,0.06)' : 'rgba(66,133,244,0.08)',
                    border: `1px solid ${D ? 'rgba(255,255,255,0.12)' : 'rgba(66,133,244,0.18)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '2px',
                  }}
                >
                  <MasterAILogo size={14} />
                </div>
              )}

              <div
                style={{
                  maxWidth: '84%',
                  padding: msg.role === 'user' ? '9px 13px' : '11px 14px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                  background: msg.role === 'user' ? T.userBubbleBg : T.aiBubbleBg,
                  border: `1px solid ${msg.role === 'user' ? T.userBubbleBdr : T.aiBubbleBdr}`,
                  fontFamily: 'var(--font-body, system-ui, sans-serif)',
                  fontSize: '13px',
                  lineHeight: 1.55,
                  color: T.text,
                  wordBreak: 'break-word',
                  boxShadow: msg.role === 'user' ? '0 4px 12px rgba(66,133,244,0.12)' : 'none',
                }}
              >
                {msg.role === 'user' ? (
                  <span style={{ fontWeight: 500 }}>{msg.text}</span>
                ) : msg.visibleTokens === 0 ? (
                  /* Famous Gemini Loader */
                  <GeminiLoader isDark={isDark} />
                ) : (
                  /* Streamed answer with highlights and blinking cursor */
                  <span>
                    {(msg.tokens || []).slice(0, msg.visibleTokens).map((tok, tIdx) => (
                      <WordSpan key={tIdx} token={tok} isNew={tIdx === (msg.visibleTokens ?? 0) - 1} isDark={isDark} />
                    ))}
                    {phase === 'streaming' && msgIdx === messages.length - 1 && (
                      <span
                        style={{
                          display: 'inline-block',
                          width: '2px',
                          height: '1em',
                          background: '#4285F4',
                          marginLeft: '2px',
                          verticalAlign: 'middle',
                          animation: 'chatBlink 0.7s step-end infinite',
                        }}
                      />
                    )}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Empty placeholder state */}
          {messages.length === 0 && (
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                opacity: 0.35,
                paddingTop: '32px',
              }}
            >
              <MasterAILogo size={32} />
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', color: T.textMuted }}>
                Ask anything about MASTER AI...
              </span>
            </div>
          )}
        </div>

        {/* ── INPUT BAR (AGENT AUTO-TYPES HERE WITH ZOOM IN) ────────────────── */}
        <div style={{ padding: '10px 12px 10px', borderTop: `1px solid ${T.border}`, flexShrink: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px 8px 14px',
              borderRadius: '14px',
              border: `1.5px solid ${isTyping ? T.inputActiveBdr : T.inputBdr}`,
              background: T.inputBg,
              boxShadow: isTyping ? '0 0 16px rgba(66, 133, 244, 0.22)' : 'none',
              transform: isTyping ? 'scale(1.02)' : 'scale(1)',
              transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
            }}
          >
            <div
              style={{
                flex: 1,
                fontFamily: 'var(--font-body, system-ui, sans-serif)',
                fontSize: '13px',
                color: T.inputText,
                minHeight: '22px',
                lineHeight: '22px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {inputText ? (
                <span>
                  {inputText}
                  {isTyping && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: '2px',
                        height: '14px',
                        background: '#4285F4',
                        marginLeft: '2px',
                        verticalAlign: 'middle',
                        animation: 'chatBlink 0.9s step-end infinite',
                      }}
                    />
                  )}
                </span>
              ) : (
                <span style={{ color: T.textMuted }}>Ask about MASTER AI...</span>
              )}
            </div>

            {/* Send button with Squish + Burst Effect on Enter */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '10px',
                flexShrink: 0,
                background: sendBurst || inputText.length > 0 ? 'linear-gradient(135deg, #4285F4, #9B72CF)' : D ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: sendBurst || inputText.length > 0 ? '#fff' : D ? 'rgba(255,255,255,0.30)' : 'rgba(15,23,42,0.30)',
                transform: sendBurst ? 'scale(0.78)' : 'scale(1)',
                boxShadow: sendBurst ? '0 0 0 6px rgba(66, 133, 244, 0.35)' : 'none',
                transition: 'transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, background 0.2s ease',
              }}
            >
              <SendIcon />
            </div>
          </div>
        </div>

        {/* ── CINEMATIC CAPTION / VIDEO STATUS BAR (NO CLICKABLE CHIPS) ──────── */}
        <div
          style={{
            padding: '7px 14px 11px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `1px solid ${T.border}`,
            background: D ? 'rgba(255,255,255,0.02)' : 'rgba(248,250,252,0.85)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#4285F4',
                boxShadow: '0 0 8px #4285F4',
                display: 'inline-block',
                animation: 'chatPulse 1.6s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                color: T.textMuted,
                letterSpacing: '0.02em',
                fontWeight: 500,
              }}
            >
              {captionText}
            </span>
          </div>

          {/* Video Topic Indicator Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {EXCHANGES.map((_, idx) => (
              <div
                key={idx}
                title={EXCHANGES[idx].topic}
                style={{
                  width: currentExchange === idx ? 16 : 5,
                  height: 5,
                  borderRadius: '9999px',
                  background: currentExchange === idx ? '#4285F4' : D ? 'rgba(255,255,255,0.20)' : 'rgba(15,23,42,0.20)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── KEYFRAME ANIMATIONS ──────────────────────────────────────────── */}
      <style>{`
        @keyframes messageEnter {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes wordPop {
          0%   { opacity: 0; transform: scale(1.35) translateY(2px); }
          60%  { opacity: 1; transform: scale(1.04) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes chatBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes chatPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @keyframes geminiPulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
        }
        @keyframes geminiShimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes geminiSkeletonSlide {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};
