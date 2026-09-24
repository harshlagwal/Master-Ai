import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   SCRIPTED CONVERSATION DATA
───────────────────────────────────────────────────────────────────────────── */
interface Exchange {
  id: number;
  question: string;
  answer: string;
  chipLabel: string;
}

const EXCHANGES: Exchange[] = [
  {
    id: 0,
    chipLabel: 'Benefits?',
    question: 'Why should I join Master AI?',
    answer:
      'In 7 live days you master the 9 highest-income AI skills — from prompt engineering to AI automation — by building real projects, not watching slides. Live on Google Meet at 8:00\u00a0PM\u00a0IST with Harsh Lagwal (IIT Patna).',
  },
  {
    id: 1,
    chipLabel: 'What will I build?',
    question: 'What will I actually build?',
    answer:
      'Real portfolio proofs: an AI chatbot, an automation workflow, a resume that passes ATS filters, and your first AI side-hustle plan — everything verified live in class.',
  },
  {
    id: 2,
    chipLabel: 'Beginner friendly?',
    question: 'Is it beginner friendly?',
    answer:
      'Yes. Day 1 starts from zero — no coding background needed. Every tool is taught hands-on, step by step, and you leave with working projects you built yourself.',
  },
  {
    id: 3,
    chipLabel: 'Cost?',
    question: 'What does the Master Pass cost?',
    answer:
      'Just \u20b989 for the full 7-day live workshop — strictly 20 seats daily, zero-commission direct UPI. Your career upgrade costs less than a pizza.',
  },
];

/* Amber-highlighted substrings in answers */
const AMBER_PHRASES = [
  '9 highest-income AI skills',
  'Google Meet',
  '8:00\u00a0PM\u00a0IST',
  'IIT Patna',
  'AI chatbot',
  'AI side-hustle plan',
  '\u20b989',
  '20 seats daily',
  'zero-commission direct UPI',
  'Day 1',
];

/* ─────────────────────────────────────────────────────────────────────────────
   TYPO DATA — one typo per question: [wrongChar, insertAfterIndex]
───────────────────────────────────────────────────────────────────────────── */
const TYPOS: Record<number, { afterIdx: number; wrongChar: string }> = {
  0: { afterIdx: 6, wrongChar: 'r' },   // "Why shoulrd…"
  1: { afterIdx: 9, wrongChar: 'y' },   // "What willy…"
  2: { afterIdx: 4, wrongChar: 'n' },   // "Is itn…"
  3: { afterIdx: 8, wrongChar: 's' },   // "What does…" → "What dosses"
};

/* ─────────────────────────────────────────────────────────────────────────────
   HELPER — split answer into annotated word-tokens preserving amber phrases
───────────────────────────────────────────────────────────────────────────── */
interface WordToken {
  text: string;   // word + trailing space (if any)
  amber: boolean;
}

function tokenizeAnswer(answer: string): WordToken[] {
  /* Mark amber ranges */
  const marks = new Array(answer.length).fill(false);
  for (const phrase of AMBER_PHRASES) {
    let idx = answer.indexOf(phrase);
    while (idx !== -1) {
      for (let i = idx; i < idx + phrase.length; i++) marks[i] = true;
      idx = answer.indexOf(phrase, idx + 1);
    }
  }

  const tokens: WordToken[] = [];
  /* Split on word boundaries, keeping trailing space as part of the token */
  const wordRe = /\S+\s*/g;
  let m: RegExpExecArray | null;
  while ((m = wordRe.exec(answer)) !== null) {
    const start = m.index;
    const end = start + m[0].length;
    const amber = marks.slice(start, end).some(Boolean);
    tokens.push({ text: m[0], amber });
  }
  return tokens;
}

/* ─────────────────────────────────────────────────────────────────────────────
   STATE MACHINE PHASES
───────────────────────────────────────────────────────────────────────────── */
type Phase = 'userTyping' | 'thinking' | 'streaming' | 'hold' | 'clearing';

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;            // for user bubbles
  tokens?: WordToken[];    // for ai bubbles
  visibleTokens?: number;  // how many tokens are revealed
  visible: boolean;        // for fade-out
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */
interface AIChatHeroProps {
  isDark?: boolean;
  onLoad?: () => void;
}

export const AIChatHero: React.FC<AIChatHeroProps> = ({ isDark = true, onLoad }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedRef = useRef(false);
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [phase, setPhase] = useState<Phase>('userTyping');
  const [currentExchange, setCurrentExchange] = useState(0);
  const [typedQuestion, setTypedQuestion] = useState('');
  const [activeChip, setActiveChip] = useState<number | null>(null);

  /* Signal parent that we're ready immediately */
  useEffect(() => { onLoad?.(); }, [onLoad]);

  /* ── IntersectionObserver — pause when off-screen ───────────────────────── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(([entry]) => {
      pausedRef.current = !entry.isIntersecting;
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Clear any pending timer ─────────────────────────────────────────────── */
  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /* ── Auto-scroll conversation to bottom ─────────────────────────────────── */
  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  /* ── Schedule with pause awareness ──────────────────────────────────────── */
  const schedule = useCallback((fn: () => void, ms: number) => {
    clearTimer();
    const start = Date.now();
    const tick = () => {
      if (pausedRef.current) {
        timerRef.current = setTimeout(tick, 100);
        return;
      }
      const elapsed = Date.now() - start;
      const remaining = ms - elapsed;
      if (remaining <= 0) { fn(); }
      else { timerRef.current = setTimeout(fn, remaining); }
    };
    timerRef.current = setTimeout(tick, 0);
  }, [clearTimer]);

  /* ══════════════════════════════════════════════════════════════════════════
     REDUCED-MOTION PATH — instant crossfade every 6s
  ══════════════════════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (!reducedMotion) return;
    let idx = 0;
    const show = () => {
      const ex = EXCHANGES[idx % EXCHANGES.length];
      setMessages([
        { role: 'user', text: ex.question, visible: true },
        { role: 'ai', tokens: tokenizeAnswer(ex.answer), visibleTokens: 9999, visible: true },
      ]);
      idx++;
    };
    show();
    const id = setInterval(show, 6000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ══════════════════════════════════════════════════════════════════════════
     FULL ANIMATION STATE MACHINE
  ══════════════════════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (reducedMotion) return;

    const ex = EXCHANGES[currentExchange];
    const question = ex.question;
    const typo = TYPOS[currentExchange];
    const tokens = tokenizeAnswer(ex.answer);

    /* ── PHASE: userTyping ─────────────────────────────────────────────────── */
    if (phase === 'userTyping') {
      /* Add an empty user bubble */
      setMessages(prev => [...prev, { role: 'user', text: '', visible: true }]);
      setTypedQuestion('');

      let charIdx = 0;
      let typoInserted = false;
      let typoDeleting = false;
      let wrongCharAdded = false;

      const typeNextChar = () => {
        if (pausedRef.current) { schedule(typeNextChar, 80); return; }

        /* Typo logic: insert wrong char after typo.afterIdx, then delete */
        if (typo && !typoInserted && charIdx === typo.afterIdx + 1) {
          if (!wrongCharAdded) {
            /* Insert wrong char */
            setMessages(prev => {
              const next = [...prev];
              const last = next[next.length - 1];
              return [...next.slice(0, -1), { ...last, text: last.text + typo.wrongChar }];
            });
            wrongCharAdded = true;
            /* Hesitate 300ms then delete */
            schedule(() => { typoDeleting = true; typeNextChar(); }, 300);
            return;
          }
          if (typoDeleting) {
            setMessages(prev => {
              const next = [...prev];
              const last = next[next.length - 1];
              return [...next.slice(0, -1), { ...last, text: last.text.slice(0, -1) }];
            });
            typoInserted = true;
            typoDeleting = false;
          }
        }

        if (charIdx >= question.length) {
          /* Done typing — move to thinking */
          schedule(() => setPhase('thinking'), 400);
          return;
        }

        const ch = question[charIdx];
        setMessages(prev => {
          const next = [...prev];
          const last = next[next.length - 1];
          return [...next.slice(0, -1), { ...last, text: last.text + ch }];
        });
        setTypedQuestion(prev => prev + ch);
        charIdx++;

        /* Human rhythm: punctuation pause, otherwise 40–70ms */
        const isPunct = '.!?,;:'.includes(ch);
        const delay = isPunct ? 140 : 40 + Math.random() * 30;
        schedule(typeNextChar, delay);
        scrollToBottom();
      };

      schedule(typeNextChar, 350);
    }

    /* ── PHASE: thinking ───────────────────────────────────────────────────── */
    if (phase === 'thinking') {
      /* Append AI skeleton bubble */
      setMessages(prev => [
        ...prev,
        { role: 'ai', tokens, visibleTokens: 0, visible: true },
      ]);
      scrollToBottom();
      const thinkMs = 600 + Math.random() * 300;
      schedule(() => setPhase('streaming'), thinkMs);
    }

    /* ── PHASE: streaming ──────────────────────────────────────────────────── */
    if (phase === 'streaming') {
      let tokenIdx = 0;
      const streamNext = () => {
        if (pausedRef.current) { schedule(streamNext, 80); return; }
        if (tokenIdx >= tokens.length) {
          schedule(() => setPhase('hold'), 600);
          return;
        }
        tokenIdx++;
        setMessages(prev => {
          const next = [...prev];
          const last = next[next.length - 1];
          return [...next.slice(0, -1), { ...last, visibleTokens: tokenIdx }];
        });
        scrollToBottom();
        const delay = 40 + Math.random() * 20;
        schedule(streamNext, delay);
      };
      schedule(streamNext, 0);
    }

    /* ── PHASE: hold ───────────────────────────────────────────────────────── */
    if (phase === 'hold') {
      schedule(() => setPhase('clearing'), 4000);
    }

    /* ── PHASE: clearing ───────────────────────────────────────────────────── */
    if (phase === 'clearing') {
      /* Fade out messages staggered */
      setMessages(prev =>
        prev.map((m, i) => ({ ...m, visible: false, _fadeDelay: i * 40 }))
      );
      /* After fade completes, reset */
      schedule(() => {
        setMessages([]);
        setCurrentExchange(prev => (prev + 1) % EXCHANGES.length);
        setActiveChip(null);
        setPhase('userTyping');
      }, 500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentExchange]);

  /* ── Chip click handler ─────────────────────────────────────────────────── */
  const handleChipClick = (idx: number) => {
    if (phase !== 'hold' && phase !== 'userTyping') return;
    clearTimer();
    setMessages([]);
    setCurrentExchange(idx);
    setActiveChip(idx);
    setPhase('userTyping');
  };

  const isRunning = phase === 'userTyping' || phase === 'thinking' || phase === 'streaming';

  /* ══════════════════════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════════════════════ */
  const cardBg = 'rgba(11,11,14,0.92)';
  const borderCol = 'rgba(255,255,255,0.09)';

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Cyan ambient glow — radial only, no blur on large element */}
      <div
        style={{
          position: 'absolute',
          inset: '-20px',
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(34,211,238,0.10) 0%, rgba(99,102,241,0.06) 45%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Main card ──────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '420px',
          borderRadius: '20px',
          border: '1px solid ' + borderCol,
          background: cardBg,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 32px 80px -16px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06)',
          maxHeight: '540px',
        }}
      >
        {/* Chromatic top line */}
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.8) 40%, rgba(99,102,241,0.6) 60%, transparent)', pointerEvents: 'none' }} />

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 10px', borderBottom: '1px solid ' + borderCol, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              {['#ef4444', '#f59e0b', '#22c55e'].map((c, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.8 }} />
              ))}
            </div>
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}>
              MASTER AI · Live Assistant
            </span>
          </div>
          {/* LIVE pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 8px', borderRadius: '9999px', border: '1px solid rgba(52,211,153,0.3)', background: 'rgba(52,211,153,0.08)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '10px', color: '#34d399', letterSpacing: '0.08em' }}>LIVE</span>
          </div>
        </div>

        {/* ── Conversation area ───────────────────────────────────────────── */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '14px 14px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            scrollbarWidth: 'none',
            minHeight: '280px',
            maxHeight: '340px',
          }}
        >
          {messages.map((msg, msgIdx) => (
            <div
              key={msgIdx}
              style={{
                opacity: msg.visible ? 1 : 0,
                transform: msg.visible ? 'translateY(0)' : 'translateY(4px)',
                transition: `opacity 0.3s ease ${(msgIdx * 40)}ms, transform 0.3s ease ${(msgIdx * 40)}ms`,
                display: 'flex',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
                gap: '7px',
              }}
            >
              {/* AI avatar */}
              {msg.role === 'ai' && (
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #6366f1)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', marginBottom: '2px' }}>
                  ✦
                </div>
              )}

              {/* Bubble */}
              <div
                style={{
                  maxWidth: '82%',
                  padding: msg.role === 'user' ? '9px 13px' : '11px 13px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                  background: msg.role === 'user' ? 'rgba(255,255,255,0.07)' : 'rgba(34,211,238,0.05)',
                  border: '1px solid ' + (msg.role === 'user' ? 'rgba(255,255,255,0.10)' : 'rgba(34,211,238,0.15)'),
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '13px',
                  lineHeight: 1.55,
                  color: msg.role === 'user' ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.90)',
                  wordBreak: 'break-word',
                  position: 'relative',
                }}
              >
                {msg.role === 'user' ? (
                  /* User bubble: typed text + blinking cursor */
                  <span>
                    {msg.text}
                    {phase === 'userTyping' && msgIdx === messages.length - 1 && (
                      <span style={{ display: 'inline-block', width: '2px', height: '1em', background: 'rgba(255,255,255,0.7)', marginLeft: '2px', verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />
                    )}
                  </span>
                ) : (
                  /* AI bubble: thinking dots OR streamed tokens */
                  msg.visibleTokens === 0 ? (
                    /* Thinking skeleton */
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', minHeight: '18px' }}>
                      {[0, 1, 2].map(i => (
                        <span
                          key={i}
                          style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            background: 'rgba(34,211,238,0.6)',
                            display: 'inline-block',
                            animation: `aiThinkBounce 0.9s ease-in-out ${i * 150}ms infinite`,
                          }}
                        />
                      ))}
                    </span>
                  ) : (
                    /* Streamed tokens */
                    <span>
                      {(msg.tokens || []).slice(0, msg.visibleTokens).map((tok, tIdx) => (
                        <WordSpan
                          key={tIdx}
                          token={tok}
                          revealed={tIdx < (msg.visibleTokens ?? 0)}
                          isNew={tIdx === (msg.visibleTokens ?? 0) - 1}
                        />
                      ))}
                      {/* Streaming cursor */}
                      {phase === 'streaming' && msgIdx === messages.length - 1 && (
                        <span style={{ display: 'inline-block', width: '2px', height: '1em', background: 'rgba(34,211,238,0.7)', marginLeft: '2px', verticalAlign: 'middle', animation: 'blink 0.7s step-end infinite' }} />
                      )}
                    </span>
                  )
                )}
              </div>
            </div>
          ))}

          {/* Empty state */}
          {messages.length === 0 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: 0.4, paddingTop: '20px' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>✦</div>
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>Ask anything about MASTER AI…</span>
            </div>
          )}
        </div>

        {/* ── Preset chips ────────────────────────────────────────────────── */}
        <div style={{ padding: '10px 14px 14px', borderTop: '1px solid ' + borderCol, display: 'flex', flexWrap: 'wrap', gap: '6px', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', width: '100%', marginBottom: '2px' }}>Ask a question</span>
          {EXCHANGES.map((ex, idx) => {
            const isActive = activeChip === idx;
            const isDisabled = isRunning && activeChip !== idx;
            return (
              <button
                key={idx}
                onClick={() => handleChipClick(idx)}
                disabled={isDisabled}
                style={{
                  padding: '5px 11px',
                  borderRadius: '9999px',
                  border: '1px solid ' + (isActive ? 'rgba(251,191,36,0.6)' : 'rgba(255,255,255,0.12)'),
                  background: isActive ? 'rgba(251,191,36,0.10)' : 'rgba(255,255,255,0.04)',
                  color: isActive ? '#fbbf24' : 'rgba(255,255,255,0.6)',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11px',
                  cursor: isDisabled ? 'default' : 'pointer',
                  opacity: isDisabled ? 0.4 : 1,
                  transition: 'transform 0.15s ease, opacity 0.15s ease, border-color 0.15s ease',
                  transform: 'translateY(0)',
                  outline: 'none',
                }}
                onMouseEnter={e => { if (!isDisabled) (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
              >
                {ex.chipLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Keyframes injected once ────────────────────────────────────────── */}
      <style>{`
        @keyframes aiThinkBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes wordFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerWord {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   WORD SPAN — individual streamed word with shimmer on entry
───────────────────────────────────────────────────────────────────────────── */
const WordSpan: React.FC<{ token: WordToken; revealed: boolean; isNew: boolean }> = React.memo(
  ({ token, revealed, isNew }) => {
    if (!revealed) return null;

    const amberStyle: React.CSSProperties = token.amber
      ? {
          color: '#fbbf24',
          fontWeight: 600,
        }
      : {};

    const newStyle: React.CSSProperties = isNew
      ? {
          display: 'inline-block',
          animation: 'wordFadeIn 0.12s ease forwards',
        }
      : { display: 'inline' };

    return (
      <span style={{ ...newStyle, ...amberStyle, whiteSpace: 'pre-wrap' }}>
        {token.text}
      </span>
    );
  }
);
WordSpan.displayName = 'WordSpan';
