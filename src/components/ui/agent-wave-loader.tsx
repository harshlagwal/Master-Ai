"use client";

import type { CSSProperties } from "react";

interface MarkProps {
  className?: string;
}

// Claude Code's pixel-art bot mark ("Clawd"). Source: the official Anthropic
// Claude Code VS Code extension, resources/clawd.svg.
export function ClaudeCodeBotLogo({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 47 38" fill="none" aria-hidden>
      <path
        d="M5.08191 10.0769V.938461h4.29231V10.0769H5.08191Zm4.15114 0V.938461h4.29235V10.0769H9.23305Zm4.15115 0V.938461h4.2923V10.0769h-4.2923Zm4.1511 0V.938461h4.2923V10.0769h-4.2923Zm4.1512 0V.938461h4.2923V10.0769h-4.2923Zm4.1511 0V.938461h4.2923V10.0769h-4.2923Zm4.1512 0V.938461h4.2923V10.0769h-4.2923Zm4.1511 0V.938461h4.2923V10.0769h-4.2923Zm4.1511 0V.938461h4.2924V10.0769H38.291ZM.930769 19.0769V9.93846h4.292311V19.0769H.930769Zm4.151141 0V9.93846h4.29231V19.0769H5.08191Zm4.15114 0v-4.5692h4.29235v4.5692H9.23305Zm4.15115 0V9.93846h4.2923V19.0769h-4.2923Zm4.1511 0V9.93846h4.2923V19.0769h-4.2923Zm4.1512 0V9.93846h4.2923V19.0769h-4.2923Zm4.1511 0V9.93846h4.2923V19.0769h-4.2923Zm4.1512 0V9.93846h4.2923V19.0769h-4.2923Zm4.1511 0v-4.5692h4.2923v4.5692h-4.2923Zm4.1511 0V9.93846h4.2924V19.0769H38.291Zm4.1512 0V9.93846h4.2923V19.0769h-4.2923ZM5.08191 28.0769v-9.1384h4.29231v9.1384H5.08191Zm4.15114 0v-9.1384h4.29235v9.1384H9.23305Zm4.15115 0v-9.1384h4.2923v9.1384h-4.2923Zm4.1511 0v-9.1384h4.2923v9.1384h-4.2923Zm4.1512 0v-9.1384h4.2923v9.1384h-4.2923Zm4.1511 0v-9.1384h4.2923v9.1384h-4.2923Zm4.1512 0v-9.1384h4.2923v9.1384h-4.2923Zm4.1511 0v-9.1384h4.2923v9.1384h-4.2923Zm4.1511 0v-9.1384h4.2924v9.1384H38.291ZM5.08191 37.0769v-9.1384h4.29231v9.1384H5.08191Zm8.30229 0v-9.1384h4.2923v9.1384h-4.2923Zm16.6046 0v-9.1384h4.2923v9.1384h-4.2923Zm8.3022 0v-9.1384h4.2924v9.1384H38.291Z"
        fill="currentColor"
      />
    </svg>
  );
}

// OpenAI / Codex symbol. Source: Wikimedia Commons "OpenAI logo 2025 (symbol).svg".
export function CodexLogo({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M11.248 18.25q-.825 0-1.568-.314a4.3 4.3 0 0 1-1.32-.874 4 4 0 0 1-1.304.214 4 4 0 0 1-2.046-.544 4.27 4.27 0 0 1-1.518-1.485 4 4 0 0 1-.56-2.095q0-.48.131-1.04A4.4 4.4 0 0 1 2.04 10.71a4.07 4.07 0 0 1 .017-3.4 4.2 4.2 0 0 1 1.056-1.418 3.8 3.8 0 0 1 1.6-.842 3.9 3.9 0 0 1 .76-1.683q.593-.759 1.451-1.188a4.04 4.04 0 0 1 1.832-.429q.825 0 1.567.313.742.314 1.32.875a4 4 0 0 1 1.304-.215q1.106 0 2.046.545a4.14 4.14 0 0 1 1.501 1.485q.578.941.578 2.095 0 .48-.132 1.04.66.61 1.023 1.419.363.792.363 1.666 0 .892-.38 1.717a4.3 4.3 0 0 1-1.072 1.435 3.8 3.8 0 0 1-1.584.825 3.8 3.8 0 0 1-.775 1.683 4.06 4.06 0 0 1-1.436 1.188 4.04 4.04 0 0 1-1.832.429m-4.076-2.062q.825 0 1.435-.347l3.103-1.782a.36.36 0 0 0 .164-.313v-1.42L7.881 14.62a.67.67 0 0 1-.726 0l-3.118-1.798a.5.5 0 0 1-.017.115v.198q0 .841.396 1.551.413.693 1.139 1.089a3.2 3.2 0 0 0 1.617.412m.165-2.69a.4.4 0 0 0 .181.05q.083 0 .165-.05l1.238-.71-3.977-2.31a.7.7 0 0 1-.363-.643v-3.58q-.825.362-1.32 1.122a2.9 2.9 0 0 0-.495 1.65q0 .809.413 1.55.412.743 1.072 1.123zm3.91 3.663q.875 0 1.585-.396a2.96 2.96 0 0 0 1.534-2.64v-3.564a.32.32 0 0 0-.165-.297l-1.254-.726v4.604a.7.7 0 0 1-.363.643l-3.119 1.799a3 3 0 0 0 1.783.577m.627-6.039V8.878L10.01 7.822 8.129 8.878v2.244l1.881 1.056zM7.057 5.859a.7.7 0 0 1 .363-.644l3.119-1.798a3 3 0 0 0-1.782-.578q-.874 0-1.584.396A2.96 2.96 0 0 0 6.05 4.324a3.07 3.07 0 0 0-.396 1.551v3.547q0 .199.165.314l1.237.726zm8.383 7.887q.825-.364 1.303-1.123.495-.758.495-1.65a3.15 3.15 0 0 0-.412-1.55q-.413-.743-1.073-1.123l-3.086-1.782q-.099-.065-.181-.049a.3.3 0 0 0-.165.05l-1.238.692 3.993 2.327a.6.6 0 0 1 .264.264.64.64 0 0 1 .1.363zm-3.317-8.382a.63.63 0 0 1 .726 0l3.135 1.831v-.297q0-.792-.396-1.501a2.86 2.86 0 0 0-1.105-1.155q-.71-.43-1.65-.43-.825 0-1.436.347L8.294 5.941a.36.36 0 0 0-.165.314v1.418z" />
    </svg>
  );
}

// Google Gemini sparkle. Source: simpleicons.org/icons/googlegemini.svg
export function GeminiLogo({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
    </svg>
  );
}

// DeepSeek mark. Source: simple-icons/icons/deepseek.svg
export function DeepSeekLogo({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.748 4.651c-.254-.124-.364.113-.512.233-.051.04-.094.09-.137.137-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.155-.708-.311-.955-.65-.172-.24-.219-.509-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.094.172.187.129.323-.082.28-.18.553-.266.833-.055.179-.137.218-.328.14a5.5 5.5 0 0 1-1.737-1.179c-.857-.828-1.631-1.743-2.597-2.46a12 12 0 0 0-.689-.47c-.985-.957.13-1.743.387-1.836.27-.098.094-.433-.778-.428-.872.003-1.67.295-2.687.685a3 3 0 0 1-.465.136 9.6 9.6 0 0 0-2.883-.101c-1.885.21-3.39 1.1-4.497 2.622C.082 8.776-.231 10.854.152 13.02c.403 2.284 1.568 4.175 3.36 5.653 1.857 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.132-.284 4.994-1.86.47.234.962.328 1.78.398.629.058 1.235-.031 1.705-.129.735-.155.684-.836.418-.961-2.155-1.004-1.682-.595-2.112-.926 1.095-1.295 2.768-3.598 3.284-6.733.05-.346.115-.834.108-1.114-.004-.171.035-.238.23-.257a4.2 4.2 0 0 0 1.545-.475c1.397-.763 1.96-2.016 2.093-3.517.02-.23-.004-.467-.247-.588M11.58 18.168c-2.088-1.642-3.101-2.183-3.52-2.16-.39.024-.32.472-.234.763.09.288.207.487.371.74.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.168-1.361-.801-2.5-1.86-3.301-3.306-.775-1.393-1.225-2.888-1.299-4.482-.02-.385.094-.522.477-.592a4.7 4.7 0 0 1 1.53-.038c2.131.311 3.946 1.264 5.467 2.774.868.86 1.525 1.887 2.202 2.89.72 1.066 1.494 2.082 2.48 2.915.348.291.626.513.892.677-.802.09-2.14.109-3.055-.615zm1.001-6.44a.306.306 0 0 1 .415-.287.3.3 0 0 1 .113.074.3.3 0 0 1 .086.214c0 .17-.136.307-.308.307a.303.303 0 0 1-.306-.307m3.11 1.596c-.2.081-.4.151-.591.16a1.25 1.25 0 0 1-.798-.254c-.274-.23-.47-.358-.551-.758a1.7 1.7 0 0 1 .015-.588c.07-.327-.007-.537-.238-.727-.188-.156-.426-.199-.689-.199a.6.6 0 0 1-.254-.078.253.253 0 0 1-.114-.358 1 1 0 0 1 .192-.21c.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.392.451.462.576.685.915.176.264.336.536.446.848.066.194-.02.353-.25.45" />
    </svg>
  );
}

// Kimi uses Moonshot AI's mark. Source: simple-icons/icons/moonshotai.svg
export function KimiLogo({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="m1.053 16.91 9.538 2.55a21 20.981 0 0 0 .06 2.031l5.956 1.592a12 11.99 0 0 1-15.554-6.172m-1.02-5.79 11.352 3.035a21 20.981 0 0 0-.469 2.01l10.817 2.89a12 11.99 0 0 1-1.845 2.004L.658 15.918a12 11.99 0 0 1-.625-4.796m1.593-5.146L13.573 9.17a21 20.981 0 0 0-1.01 1.874l11.297 3.02a21 20.981 0 0 1-.67 2.362l-11.55-3.087L.125 10.26a12 11.99 0 0 1 1.499-4.285ZM6.067 1.58l11.285 3.016a21 20.981 0 0 0-1.688 1.719l7.824 2.091a21 20.981 0 0 1 .513 2.664L2.107 5.218a12 11.99 0 0 1 3.96-3.638M21.68 4.866 7.222 1.003A12 11.99 0 0 1 21.68 4.866" />
    </svg>
  );
}

const MARKS = [
  { id: "claude-code", Mark: ClaudeCodeBotLogo },
  { id: "codex", Mark: CodexLogo },
  { id: "gemini", Mark: GeminiLogo },
  { id: "deepseek", Mark: DeepSeekLogo },
  { id: "kimi", Mark: KimiLogo },
] as const;

// Shipped inline so the component works on its own — the motion relies on
// `offset-path` and multi-stop keyframes, which arbitrary utility classes
// cannot express.
const STYLES = `
.agent-wave-loader {
  --agent-wave-duration: 2.6s;
  --agent-wave-muted: #737373;
  --agent-wave-shadow: rgb(0 0 0 / 0.18);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  color: var(--agent-wave-muted);
  font: 400 11px/1.25 system-ui, sans-serif;
}

.agent-wave-track {
  position: relative;
  display: flex;
  height: 28px;
  align-items: flex-end;
  gap: 8px;
}

.agent-wave-mark {
  display: grid;
  width: 20px;
  height: 20px;
  place-items: center;
  animation: agent-wave-mark var(--agent-wave-duration) ease-in-out infinite;
  will-change: transform, opacity, filter;
}

.agent-wave-logo {
  width: 16px;
  height: 16px;
  overflow: visible;
}

.agent-wave-mark:nth-of-type(2) { color: #d97757; }
.agent-wave-mark:nth-of-type(4) { color: #1a73e8; }
.agent-wave-mark:nth-of-type(5) { color: #5786fe; }

@keyframes agent-wave-mark {
  0%, 5%, 16%, 100% {
    filter: drop-shadow(0 1px 1px var(--agent-wave-shadow));
    opacity: 0.45;
    transform: translateY(0) scale(0.92);
  }
  9% {
    filter: drop-shadow(0 5px 3px var(--agent-wave-shadow));
    opacity: 1;
    transform: translateY(-5px) scale(1);
  }
}

@keyframes agent-wave-signal {
  0%, 4% { opacity: 0; offset-distance: 0%; }
  9%, 11% { opacity: 1; offset-distance: 0%; }
  20%, 23% { opacity: 1; offset-distance: 18.754%; }
  31%, 34% { opacity: 1; offset-distance: 37.512%; }
  42%, 45% { opacity: 1; offset-distance: 56.266%; }
  53%, 56% { opacity: 1; offset-distance: 75.02%; }
  65% { opacity: 0.15; offset-distance: 100%; }
  69%, 100% { opacity: 0; offset-distance: 100%; }
}

@keyframes agent-wave-tail {
  0%, 11%, 20%, 23%, 31%, 34%, 42%, 45%, 53%, 56%, 65%, 100% {
    opacity: 0;
    transform: translateY(-50%) scaleX(0.15);
  }
  13%, 18%, 25%, 29%, 36%, 40%, 47%, 51%, 58%, 63% {
    opacity: 0.8;
    transform: translateY(-50%) scaleX(1);
  }
}

.agent-wave-signal {
  position: absolute;
  z-index: 1;
  top: -0.5px;
  left: 10px;
  width: 3px;
  height: 3px;
  border-radius: 999px;
  background: currentColor;
  filter: drop-shadow(0 0 1px currentColor);
  animation: agent-wave-signal var(--agent-wave-duration) cubic-bezier(0.22, 0.8, 0.36, 1) infinite;
  offset-anchor: 50% 50%;
  offset-path: path("M 0 0 Q 14 -30 28 0 Q 42 -30 56 0 Q 70 -30 84 0 Q 98 -30 112 0 Q 133 -40 154 -12");
  offset-rotate: auto;
  will-change: offset-distance, opacity;
}

.agent-wave-signal::before {
  position: absolute;
  top: 50%;
  right: 2px;
  width: 8px;
  height: 1.5px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, currentColor);
  content: "";
  transform-origin: right center;
  animation: agent-wave-tail var(--agent-wave-duration) ease-in-out infinite;
}

@media (prefers-color-scheme: dark) {
  .agent-wave-loader {
    --agent-wave-muted: #a3a3a3;
    --agent-wave-shadow: rgb(0 0 0 / 0.55);
  }
}

/* Class-based dark mode wins over the media query above, so a toggled theme
   and a system theme both land on the same palette. */
:where(.dark) .agent-wave-loader {
  --agent-wave-muted: #a3a3a3;
  --agent-wave-shadow: rgb(0 0 0 / 0.55);
}

:where(html:not(.dark)) .agent-wave-loader {
  --agent-wave-muted: #737373;
  --agent-wave-shadow: rgb(0 0 0 / 0.18);
}

@media (prefers-reduced-motion: reduce) {
  .agent-wave-signal { display: none; }
  .agent-wave-mark { animation: none; opacity: 0.7; }
}
`;

// Each mark lifts as the signal reaches it, so the stagger is a fraction of the
// cycle rather than a fixed delay — changing `durationMs` keeps them in step.
const STAGGER_RATIO = 0.11;

export interface AgentWaveLoaderProps {
  /** Visible text under the marks, also the accessible name. */
  label?: string;
  /** Length of one full pass in milliseconds. Higher is slower. */
  durationMs?: number;
  className?: string;
}

export function AgentWaveLoader({
  label = "AI is working…",
  durationMs = 2600,
  className,
}: AgentWaveLoaderProps) {
  return (
    <div
      aria-label={label}
      className={["agent-wave-loader", className].filter(Boolean).join(" ")}
      role="status"
      style={{ "--agent-wave-duration": `${durationMs}ms` } as CSSProperties}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <span aria-hidden className="agent-wave-track">
        <span className="agent-wave-signal" />
        {MARKS.map(({ id, Mark }, index) => (
          <span
            className="agent-wave-mark"
            key={id}
            style={{
              animationDelay: `${Math.round(index * durationMs * STAGGER_RATIO)}ms`,
            }}
          >
            <Mark className="agent-wave-logo" />
          </span>
        ))}
      </span>
      <span className="agent-wave-label">{label}</span>
    </div>
  );
}

export default AgentWaveLoader;
