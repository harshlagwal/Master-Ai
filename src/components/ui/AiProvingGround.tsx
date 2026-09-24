import React, { useEffect, useRef, useState, useCallback } from 'react';

interface AiProvingGroundProps {
  isDark?: boolean;
  onLoad?: () => void;
}

const GRID_COLS = 14;
const TOTAL_CELLS = GRID_COLS * 7;

const TERMINAL_LINES = [
  '> import openai; client = OpenAI()',
  '> response = client.chat.completions.create()',
  '  \u2705 ChatGPT API connected in 0.12s',
  '> cursor.write("Build a SaaS dashboard")',
  '  \u2705 240 lines scaffolded via Cursor AI',
  '> gemini.generate_content("Market analysis")',
  '  \u2705 1400-token report in 1.8s',
  '> midjourney.imagine("AI product mockup")',
  '  \u2705 4K image generated in 3.2s',
  '> vercel.deploy("master-ai-app")',
  '  \u2705 Production URL live in 8s',
];

const ORBIT_TOOLS = [
  { name: 'ChatGPT', color: '#10b981', angle: 0 },
  { name: 'Cursor', color: '#6366f1', angle: 72 },
  { name: 'Gemini', color: '#4285F4', angle: 144 },
  { name: 'Midjourney', color: '#f59e0b', angle: 216 },
  { name: 'Claude', color: '#D97757', angle: 288 },
];

const SKILL_BARS: [string, number, string][] = [
  ['ChatGPT', 98, '#10b981'],
  ['Cursor AI', 94, '#6366f1'],
  ['Gemini Pro', 91, '#4285F4'],
  ['Midjourney', 89, '#f59e0b'],
  ['No-Code AI', 96, '#06b6d4'],
  ['Automation', 87, '#8b5cf6'],
];

export const AiProvingGround: React.FC<AiProvingGroundProps> = ({ isDark = true, onLoad }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const tiltRef = useRef({ x: 0, y: 0 });
  const targetTiltRef = useRef({ x: 0, y: 0 });
  const [cells, setCells] = useState<number[]>(() => Array.from({ length: TOTAL_CELLS }, () => Math.random()));
  const [terminalLine, setTerminalLine] = useState(0);
  const [terminalVisible, setTerminalVisible] = useState(true);
  const [accuracy, setAccuracy] = useState(96.4);
  const [tokens, setTokens] = useState(142);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [orbitAngle, setOrbitAngle] = useState(0);

  useEffect(() => { onLoad?.(); }, [onLoad]);

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      setCells(prev => prev.map((_v, i) => {
        const col = i % GRID_COLS;
        const row = Math.floor(i / GRID_COLS);
        const wave = Math.sin(frame * 0.04 + col * 0.6 + row * 0.9) * 0.5 + 0.5;
        return Math.min(1, Math.max(0.05, wave * 0.7 + Math.random() * 0.12 + 0.15));
      }));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalVisible(false);
      setTimeout(() => {
        setTerminalLine(prev => (prev + 1) % TERMINAL_LINES.length);
        setTerminalVisible(true);
      }, 180);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAccuracy(prev => parseFloat((Math.min(99.9, Math.max(90, prev + (Math.random() - 0.48) * 0.3))).toFixed(1)));
      setTokens(prev => Math.max(110, Math.min(180, prev + Math.round((Math.random() - 0.4) * 6))));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setOrbitAngle(prev => (prev + 0.4) % 360), 30);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    targetTiltRef.current = {
      x: ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -8,
      y: ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8,
    };
  }, []);

  const handleMouseLeave = useCallback(() => { targetTiltRef.current = { x: 0, y: 0 }; }, []);

  useEffect(() => {
    const animate = () => {
      tiltRef.current.x += (targetTiltRef.current.x - tiltRef.current.x) * 0.08;
      tiltRef.current.y += (targetTiltRef.current.y - tiltRef.current.y) * 0.08;
      setTilt({ x: tiltRef.current.x, y: tiltRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const bc = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(100,116,139,0.18)';
  const mc = isDark ? '#9ca3af' : '#64748b';
  const pb = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.80)';
  const bg = isDark ? '#0A0A0F' : '#F0F4FF';

  const statPanels = [
    { label: 'Model', display: 'GPT-4o', accent: '#10b981' },
    { label: 'Accuracy', display: accuracy.toFixed(1) + '%', accent: '#6366f1' },
    { label: 'Tokens/s', display: String(tokens), accent: '#f59e0b' },
    { label: 'Latency', display: '118ms', accent: '#06b6d4' },
  ];

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none', perspective: '900px', position: 'relative' }}>
      <div style={{
        position: 'relative', width: '100%', maxWidth: '460px', borderRadius: '18px',
        border: '1px solid ' + bc, background: bg, overflow: 'hidden',
        transform: 'rotateX(' + tilt.x + 'deg) rotateY(' + tilt.y + 'deg) translateZ(0)',
        transformStyle: 'preserve-3d' as const, willChange: 'transform', zIndex: 2,
        boxShadow: isDark ? '0 30px 80px -15px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.07)' : '0 30px 80px -15px rgba(0,0,60,0.14)',
      }}>
        <div style={{ position: 'absolute', top: 0, left: '12.5%', right: '12.5%', height: '1px', background: 'linear-gradient(90deg, transparent, #6366f1 40%, #06b6d4 60%, transparent)', pointerEvents: 'none' as const }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid ' + bc }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              {['#ef4444', '#eab308', '#22c55e'].map((c, i) => <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.85 }} />)}
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: mc }}>master-ai-studio.py</span>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />Live
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {statPanels.map((s, i) => (
            <div key={s.label} style={{ background: pb, padding: '10px 12px', borderBottom: '1px solid ' + bc, borderRight: i < 3 ? '1px solid ' + bc : 'none' }}>
              <div style={{ fontFamily: 'monospace', fontSize: '9px', color: mc, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '3px' }}>{s.label}</div>
              <div style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, color: s.accent }}>{s.display}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid ' + bc }}>
          <div style={{ fontFamily: 'monospace', fontSize: '10px', color: mc, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '8px' }}>Neural Activation Map</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + GRID_COLS + ', 1fr)', gap: '2px' }}>
            {cells.map((v, i) => {
              const r = Math.round(v < 0.5 ? 99 + v * 2 * (34 - 99) : 34 + (v - 0.5) * 2 * (16 - 34));
              const g = Math.round(v < 0.5 ? 102 + v * 2 * (211 - 102) : 211 + (v - 0.5) * 2 * (185 - 211));
              const b2 = Math.round(v < 0.5 ? 241 + v * 2 * (238 - 241) : 238 + (v - 0.5) * 2 * (129 - 238));
              return <div key={i} style={{ height: '9px', borderRadius: '2px', background: 'rgba(' + r + ',' + g + ',' + b2 + ',' + (0.2 + v * 0.8) + ')', transform: 'translateZ(0)' }} />;
            })}
          </div>
        </div>

        <div style={{ padding: '10px 16px 12px', borderBottom: '1px solid ' + bc, minHeight: '50px' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '12px', lineHeight: 1.6, opacity: terminalVisible ? 1 : 0, transition: 'opacity 0.15s ease' }}>
            {TERMINAL_LINES[terminalLine].startsWith('>') ? (
              <span style={{ color: '#22d3ee' }}>{TERMINAL_LINES[terminalLine]}</span>
            ) : (
              <span style={{ color: '#34d399' }}>{TERMINAL_LINES[terminalLine]}</span>
            )}
            {terminalVisible && <span style={{ display: 'inline-block', width: '6px', height: '13px', background: '#22d3ee', marginLeft: '3px', verticalAlign: 'text-bottom', animation: 'blink 1s step-end infinite' }} />}
          </div>
        </div>

        <div style={{ padding: '12px 16px 14px' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '10px', color: mc, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '10px' }}>Skills Unlocked</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px' }}>
            {SKILL_BARS.map(([label, pct, color]) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', color: mc }}>{label}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '10px', fontWeight: 600, color }}>{pct}%</span>
                </div>
                <div style={{ height: '4px', borderRadius: '9999px', background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)' }}>
                  <div style={{ height: '100%', width: pct + '%', borderRadius: '9999px', background: color, opacity: 0.88, transform: 'translateZ(0)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', borderTop: '1px solid ' + bc, background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(248,250,252,0.8)' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: mc }}>MASTER AI Studio v2.7</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'monospace', fontSize: '10px', color: '#34d399' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />8:00 PM IST
          </span>
        </div>
      </div>

      {ORBIT_TOOLS.map((tool) => {
        const a = ((tool.angle + orbitAngle) * Math.PI) / 180;
        const x = 50 + 53 * Math.cos(a);
        const y = 50 + 44 * Math.sin(a);
        const behind = Math.sin(a) > 0.05;
        return (
          <div key={tool.name} style={{
            position: 'absolute', left: x + '%', top: y + '%',
            transform: 'translate(-50%, -50%) translateZ(0)',
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '4px 9px', borderRadius: '9999px',
            border: '1px solid ' + tool.color + '50',
            background: isDark ? 'rgba(8,8,16,0.92)' : 'rgba(255,255,255,0.93)',
            color: tool.color, fontFamily: 'monospace', fontSize: '10px', fontWeight: 600,
            whiteSpace: 'nowrap' as const, boxShadow: '0 0 12px ' + tool.color + '22',
            opacity: behind ? 0.45 : 1, zIndex: behind ? 0 : 5, pointerEvents: 'none' as const,
            transition: 'opacity 0.3s ease',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: tool.color, flexShrink: 0 }} />
            {tool.name}
          </div>
        );
      })}
    </div>
  );
};
