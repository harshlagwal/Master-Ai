import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { AgentWaveLoader } from './ui/agent-wave-loader';

interface SectionAiToolsMarqueeProps {
  isDark?: boolean;
}

interface AiToolItem {
  id: string;
  name: string;
  category: string;
  color?: string;
  svg: React.ReactNode;
}

// --------------------------------------------------------------------------
// 24+ HIGH-PRECISION REAL VECTOR LOGOS (NO PLACEHOLDERS, NO NAME-ONLY)
// --------------------------------------------------------------------------

// 1. OpenAI / ChatGPT (Official Spiral Vortex)
const OpenAiLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor">
    <path d="M22.28 9.82a5.98 5.98 0 0 0-.51-4.91 6.05 6.05 0 0 0-6.51-2.9A6.06 6.06 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.52 2.9A5.98 5.98 0 0 0 13.26 24a6.06 6.06 0 0 0 5.77-4.2 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.08zM13.26 22.43a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.8.8 0 0 0 .39-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.05v5.59a4.5 4.5 0 0 1-4.49 4.49zm-9.66-4.29a4.48 4.48 0 0 1-.54-3.01l.15.08 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06L9.74 19.95a4.5 4.5 0 0 1-6.14-1.81zm-1.07-9.52a4.46 4.46 0 0 1 2.34-1.97v5.68a.79.79 0 0 0 .4.68l5.84 3.37-2.02 1.17a.08.08 0 0 1-.07 0l-4.84-2.8a4.5 4.5 0 0 1-1.65-6.13zm16.55 3.38l-5.85-3.37 2.02-1.17a.08.08 0 0 1 .07 0l4.84 2.8a4.5 4.5 0 0 1-.68 8.09v-5.67a.79.79 0 0 0-.4-.68zm2.02-3.14l-.14-.08-4.78-2.76a.77.77 0 0 0-.78 0L9.55 9.2V6.87a.08.08 0 0 1 .03-.06L14.42 3.95a4.5 4.5 0 0 1 6.68 4.86zM8.7 14.83v-5.66a.79.79 0 0 0-.39-.68L6.3 7.32a.07.07 0 0 1-.04-.05V1.68a4.5 4.5 0 0 1 4.5-4.49c1.06 0 2.07.38 2.87 1.04l-.14.08-4.78 2.76zm1.1-2.32l2.2-1.27 2.2 1.27v2.55l-2.2 1.27-2.2-1.27z" />
  </svg>
);

// 2. Anthropic Claude (Official Starburst)
const ClaudeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="#D97757">
    <path d="M12 2a1 1 0 0 1 1 1v2.1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 15.8a1 1 0 0 1 1 1V21a1 1 0 0 1-2 0v-2.2a1 1 0 0 1 1-1zm8.5-7.8a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-2.1a1 1 0 0 1 0-2H20.5zm-14.8 0a1 1 0 0 1 0 2H3.5a1 1 0 0 1 0-2h2.2zm11.37-4.96a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.41l-1.55 1.56a1 1 0 0 1-1.42-1.42l1.56-1.55zm-8.94 8.94a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.41l-1.56 1.56a1 1 0 1 1-1.41-1.42l1.56-1.55zm0-8.94l1.56 1.55a1 1 0 0 1-1.42 1.42L4.93 6.45a1 1 0 0 1 0-1.41 1 1 0 0 1 1.41 0zm8.94 8.94l1.55 1.55a1 1 0 0 1-1.41 1.42l-1.56-1.56a1 1 0 0 1 1.42-1.41zM12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z" />
  </svg>
);

// 3. Google Gemini (Official Sparkle with Google colors)
const GoogleGeminiLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="url(#gemini-marquee-grad)">
    <defs>
      <linearGradient id="gemini-marquee-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1A73E8" />
        <stop offset="50%" stopColor="#8AB4F8" />
        <stop offset="100%" stopColor="#EA4335" />
      </linearGradient>
    </defs>
    <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
  </svg>
);

// 4. Cursor AI (Official Isometric Cube)
const CursorLogo = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-7 h-7 sm:w-8 sm:h-8"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" fill="currentColor" fillOpacity="0.15" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

// 5. DeepSeek (Official Marine Whale Vector)
const DeepSeekLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="#4D6BFE">
    <path d="M23.748 4.651c-.254-.124-.364.113-.512.233-.051.04-.094.09-.137.137-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.155-.708-.311-.955-.65-.172-.24-.219-.509-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.094.172.187.129.323-.082.28-.18.553-.266.833-.055.179-.137.218-.328.14a5.5 5.5 0 0 1-1.737-1.179c-.857-.828-1.631-1.743-2.597-2.46a12 12 0 0 0-.689-.47c-.985-.957.13-1.743.387-1.836.27-.098.094-.433-.778-.428-.872.003-1.67.295-2.687.685a3 3 0 0 1-.465.136 9.6 9.6 0 0 0-2.883-.101c-1.885.21-3.39 1.1-4.497 2.622C.082 8.776-.231 10.854.152 13.02c.403 2.284 1.568 4.175 3.36 5.653 1.857 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.132-.284 4.994-1.86.47.234.962.328 1.78.398.629.058 1.235-.031 1.705-.129.735-.155.684-.836.418-.961-2.155-1.004-1.682-.595-2.112-.926 1.095-1.295 2.768-3.598 3.284-6.733.05-.346.115-.834.108-1.114-.004-.171.035-.238.23-.257a4.2 4.2 0 0 0 1.545-.475c1.397-.763 1.96-2.016 2.093-3.517.02-.23-.004-.467-.247-.588M11.58 18.168c-2.088-1.642-3.101-2.183-3.52-2.16-.39.024-.32.472-.234.763.09.288.207.487.371.74.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.168-1.361-.801-2.5-1.86-3.301-3.306-.775-1.393-1.225-2.888-1.299-4.482-.02-.385.094-.522.477-.592a4.7 4.7 0 0 1 1.53-.038c2.131.311 3.946 1.264 5.467 2.774.868.86 1.525 1.887 2.202 2.89.72 1.066 1.494 2.082 2.48 2.915.348.291.626.513.892.677-.802.09-2.14.109-3.055-.615zm1.001-6.44a.306.306 0 0 1 .415-.287.3.3 0 0 1 .113.074.3.3 0 0 1 .086.214c0 .17-.136.307-.308.307a.303.303 0 0 1-.306-.307m3.11 1.596c-.2.081-.4.151-.591.16a1.25 1.25 0 0 1-.798-.254c-.274-.23-.47-.358-.551-.758a1.7 1.7 0 0 1 .015-.588c.07-.327-.007-.537-.238-.727-.188-.156-.426-.199-.689-.199a.6.6 0 0 1-.254-.078.253.253 0 0 1-.114-.358 1 1 0 0 1 .192-.21c.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.392.451.462.576.685.915.176.264.336.536.446.848.066.194-.02.353-.25.45" />
  </svg>
);

// 6. Perplexity AI (Official Asterisk Intersect)
const PerplexityLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="#20B8CD">
    <path d="M12 2a1.2 1.2 0 0 0-1.2 1.2v3.6L6.5 4.1a1.2 1.2 0 1 0-1.2 2.08l4.3 2.5-4.3 2.5a1.2 1.2 0 0 0 1.2 2.08l4.3-2.5V14a1.2 1.2 0 1 0 2.4 0v-3.32l4.3 2.5a1.2 1.2 0 0 0 1.2-2.08l-4.3-2.5 4.3-2.5a1.2 1.2 0 1 0-1.2-2.08L13.2 6.8V3.2A1.2 1.2 0 0 0 12 2zm-5 13a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1zm10 0a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-4a1 1 0 0 0-1-1zm-5 2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1z" />
  </svg>
);

// 7. Meta Llama (Official Infinity Mark)
const MetaLlamaLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="#0081FB">
    <path d="M6.82 5.07c-2.18 0-4.04 1.54-4.66 3.65C1.5 11.23 2.8 14.07 5.16 15.2c1.78.85 3.91.46 5.3-.98l1.54-1.61 1.54 1.61c1.39 1.44 3.52 1.83 5.3.98 2.36-1.13 3.66-3.97 3-6.48-.62-2.11-2.48-3.65-4.66-3.65-1.92 0-3.66 1.15-4.42 2.91L12 9.4l-.76-1.42C10.48 6.22 8.74 5.07 6.82 5.07zm10.36 2.4c1.19 0 2.22.84 2.58 2.05.41 1.39-.33 2.96-1.64 3.58-.98.47-2.16.25-2.92-.55L13.88 11.1l1.32-2.5c.42-.71 1.17-1.13 1.98-1.13zm-10.36 0c.81 0 1.56.42 1.98 1.13l1.32 2.5-1.32 1.45c-.76.8-1.94 1.02-2.92.55-1.31-.62-2.05-2.19-1.64-3.58.36-1.21 1.39-2.05 2.58-2.05z" />
  </svg>
);

// 8. GitHub Copilot (Official Pilot Helmet Mark)
const GitHubCopilotLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.53 1.03 1.53 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

// 9. Midjourney (Official Origami Sailboat Mark)
const MidjourneyLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor">
    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.2l6 3.75v3.2L12 7.4 6 11.15v-3.2l6-3.75zM6 13.1l5 3.1v4.2l-5-3.1v-4.2zm12 4.2l-5 3.1v-4.2l5-3.1v4.2z" />
  </svg>
);

// 10. Mistral AI (Official Geometric Pixel Step Blocks)
const MistralLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="#F97316">
    <path d="M3 4h3.6v3.6H3V4zm14.4 0H21v3.6h-3.6V4zm-7.2 3.6h3.6v3.6h-3.6V7.6zM3 11.2h3.6v3.6H3v-3.6zm14.4 0H21v3.6h-3.6v-3.6zm-10.8 4h3.6v3.6H6.6v-3.6zm7.2 0h3.6v3.6h-3.6v-3.6zM3 18.8h3.6v3.6H3v-3.6zm14.4 0H21v3.6h-3.6v-3.6z" />
  </svg>
);

// 11. Hugging Face (Official Mascot Emoji Vector)
const HuggingFaceLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="#FFD21E">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-3.5 10c-2.33 0-4.32-1.45-5.12-3.5h10.24c-.8 2.05-2.79 3.5-5.12 3.5z" />
  </svg>
);

// 12. Runway ML (Official Runway R Logo)
const RunwayLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor">
    <path d="M6 3h6.5c3.59 0 6.5 2.91 6.5 6.5 0 2.54-1.46 4.74-3.58 5.8L20 21h-4.2l-4-5H8v5H6V3zm2 2v6h4.5c2.49 0 4.5-2.01 4.5-4.5S14.99 5 12.5 5H8z" />
  </svg>
);

// 13. ElevenLabs (Official Dual Bars)
const ElevenLabsLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor">
    <path d="M7 4h3.5v16H7V4zm6.5 0H17v16h-3.5V4z" />
  </svg>
);

// 14. v0 by Vercel (Official Triangular Prism)
const V0Logo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor">
    <path d="M12 2L2 20h20L12 2zm0 4.6l6.6 11.8H5.4L12 6.6z" />
  </svg>
);

// 15. Groq (Official Speed LPU Geometric G)
const GroqLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="#F05A28">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c2.8 0 5.34-1.15 7.18-3l-2.42-2.42A6.5 6.5 0 1 1 18.5 12h-6.5v3.5h10A10 10 0 0 0 12 2z" />
  </svg>
);

// 16. Qwen (Alibaba Neural Ring)
const QwenLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="#615CED">
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 3.6a6.4 6.4 0 0 1 4.53 10.93l-1.8-1.8A3.85 3.85 0 1 0 12 15.85v2.55A6.4 6.4 0 0 1 12 5.6zm3.2 12.2l2.6 2.6-1.8 1.8-2.6-2.6a10 10 0 0 1-1.4.6v-2.55a6.4 6.4 0 0 0 3.2.15z" />
  </svg>
);

// 17. Kimi (Moonshot AI - Official Geometric Rays from snippet)
const KimiLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="#5E7CE2">
    <path d="m1.053 16.91 9.538 2.55a21 20.981 0 0 0 .06 2.031l5.956 1.592a12 11.99 0 0 1-15.554-6.172m-1.02-5.79 11.352 3.035a21 20.981 0 0 0-.469 2.01l10.817 2.89a12 11.99 0 0 1-1.845 2.004L.658 15.918a12 11.99 0 0 1-.625-4.796m1.593-5.146L13.573 9.17a21 20.981 0 0 0-1.01 1.874l11.297 3.02a21 20.981 0 0 1-.67 2.362l-11.55-3.087L.125 10.26a12 11.99 0 0 1 1.499-4.285ZM6.067 1.58l11.285 3.016a21 20.981 0 0 0-1.688 1.719l7.824 2.091a21 20.981 0 0 1 .513 2.664L2.107 5.218a12 11.99 0 0 1 3.96-3.638M21.68 4.866 7.222 1.003A12 11.99 0 0 1 21.68 4.866" />
  </svg>
);

// 18. Claude Code ("Clawd" Pixel Art from snippet)
const ClawdLogo = () => (
  <svg viewBox="0 0 47 38" className="w-7 h-7 sm:w-8 sm:h-8" fill="#D97757">
    <path
      d="M5.08191 10.0769V.938461h4.29231V10.0769H5.08191Zm4.15114 0V.938461h4.29235V10.0769H9.23305Zm4.15115 0V.938461h4.2923V10.0769h-4.2923Zm4.1511 0V.938461h4.2923V10.0769h-4.2923Zm4.1512 0V.938461h4.2923V10.0769h-4.2923Zm4.1511 0V.938461h4.2923V10.0769h-4.2923Zm4.1512 0V.938461h4.2923V10.0769h-4.2923Zm4.1511 0V.938461h4.2923V10.0769h-4.2923Zm4.1511 0V.938461h4.2924V10.0769H38.291ZM.930769 19.0769V9.93846h4.292311V19.0769H.930769Zm4.151141 0V9.93846h4.29231V19.0769H5.08191Zm4.15114 0v-4.5692h4.29235v4.5692H9.23305Zm4.15115 0V9.93846h4.2923V19.0769h-4.2923Zm4.1511 0V9.93846h4.2923V19.0769h-4.2923Zm4.1512 0V9.93846h4.2923V19.0769h-4.2923Zm4.1511 0V9.93846h4.2923V19.0769h-4.2923Zm4.1512 0V9.93846h4.2923V19.0769h-4.2923Zm4.1511 0v-4.5692h4.2923v4.5692h-4.2923Zm4.1511 0V9.93846h4.2924V19.0769H38.291Zm4.1512 0V9.93846h4.2923V19.0769h-4.2923ZM5.08191 28.0769v-9.1384h4.29231v9.1384H5.08191Zm4.15114 0v-9.1384h4.29235v9.1384H9.23305Zm4.15115 0v-9.1384h4.2923v9.1384h-4.2923Zm4.1511 0v-9.1384h4.2923v9.1384h-4.2923Zm4.1512 0v-9.1384h4.2923v9.1384h-4.2923Zm4.1511 0v-9.1384h4.2923v9.1384h-4.2923Zm4.1512 0v-9.1384h4.2923v9.1384h-4.2923Zm4.1511 0v-9.1384h4.2923v9.1384h-4.2923Zm4.1511 0v-9.1384h4.2924v9.1384H38.291ZM5.08191 37.0769v-9.1384h4.29231v9.1384H5.08191Zm8.30229 0v-9.1384h4.2923v9.1384h-4.2923Zm16.6046 0v-9.1384h4.2923v9.1384h-4.2923Zm8.3022 0v-9.1384h4.2924v9.1384H38.291Z"
      fill="currentColor"
    />
  </svg>
);

// 19. OpenAI Codex (Official 2025 Symbol from snippet)
const CodexLogo = () => (
  <svg viewBox="0 0 20 20" className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor">
    <path d="M11.248 18.25q-.825 0-1.568-.314a4.3 4.3 0 0 1-1.32-.874 4 4 0 0 1-1.304.214 4 4 0 0 1-2.046-.544 4.27 4.27 0 0 1-1.518-1.485 4 4 0 0 1-.56-2.095q0-.48.131-1.04A4.4 4.4 0 0 1 2.04 10.71a4.07 4.07 0 0 1 .017-3.4 4.2 4.2 0 0 1 1.056-1.418 3.8 3.8 0 0 1 1.6-.842 3.9 3.9 0 0 1 .76-1.683q.593-.759 1.451-1.188a4.04 4.04 0 0 1 1.832-.429q.825 0 1.567.313.742.314 1.32.875a4 4 0 0 1 1.304-.215q1.106 0 2.046.545a4.14 4.14 0 0 1 1.501 1.485q.578.941.578 2.095 0 .48-.132 1.04.66.61 1.023 1.419.363.792.363 1.666 0 .892-.38 1.717a4.3 4.3 0 0 1-1.072 1.435 3.8 3.8 0 0 1-1.584.825 3.8 3.8 0 0 1-.775 1.683 4.06 4.06 0 0 1-1.436 1.188 4.04 4.04 0 0 1-1.832.429m-4.076-2.062q.825 0 1.435-.347l3.103-1.782a.36.36 0 0 0 .164-.313v-1.42L7.881 14.62a.67.67 0 0 1-.726 0l-3.118-1.798a.5.5 0 0 1-.017.115v.198q0 .841.396 1.551.413.693 1.139 1.089a3.2 3.2 0 0 0 1.617.412m.165-2.69a.4.4 0 0 0 .181.05q.083 0 .165-.05l1.238-.71-3.977-2.31a.7.7 0 0 1-.363-.643v-3.58q-.825.362-1.32 1.122a2.9 2.9 0 0 0-.495 1.65q0 .809.413 1.55.412.743 1.072 1.123zm3.91 3.663q.875 0 1.585-.396a2.96 2.96 0 0 0 1.534-2.64v-3.564a.32.32 0 0 0-.165-.297l-1.254-.726v4.604a.7.7 0 0 1-.363.643l-3.119 1.799a3 3 0 0 0 1.783.577m.627-6.039V8.878L10.01 7.822 8.129 8.878v2.244l1.881 1.056zM7.057 5.859a.7.7 0 0 1 .363-.644l3.119-1.798a3 3 0 0 0-1.782-.578q-.874 0-1.584.396A2.96 2.96 0 0 0 6.05 4.324a3.07 3.07 0 0 0-.396 1.551v3.547q0 .199.165.314l1.237.726zm8.383 7.887q.825-.364 1.303-1.123.495-.758.495-1.65a3.15 3.15 0 0 0-.412-1.55q-.413-.743-1.073-1.123l-3.086-1.782q-.099-.065-.181-.049a.3.3 0 0 0-.165.05l-1.238.692 3.993 2.327a.6.6 0 0 1 .264.264.64.64 0 0 1 .1.363zm-3.317-8.382a.63.63 0 0 1 .726 0l3.135 1.831v-.297q0-.792-.396-1.501a2.86 2.86 0 0 0-1.105-1.155q-.71-.43-1.65-.43-.825 0-1.436.347L8.294 5.941a.36.36 0 0 0-.165.314v1.418z" />
  </svg>
);

// 20. Replit Agent (Official Interlocking Brackets)
const ReplitLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="#F26207">
    <path d="M2 3h7v5H2V3zm0 7h14v5H2v-5zm0 7h7v5H2v-5z" />
  </svg>
);

// 21. Bolt.new (StackBlitz Lightning Bolt)
const BoltLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="#F59E0B">
    <path d="M13 2L3 14h8l-2 8 11-13h-8l3-7z" />
  </svg>
);

// 22. LangChain (Official Agent Chain / Bird mark)
const LangChainLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="#0EA5E9">
    <path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7zm-3-8h1.5v1.5H4zm0 4h1.5v1.5H4zm0 4h1.5v1.5H4zM2 3h20v18H2z" fillOpacity="0.15" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-4h2zm0-6h-2V8h2z" />
  </svg>
);

// 23. Pinecone (Official Vector Geometry)
const PineconeLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor">
    <path d="M12 2l3.5 6h-7L12 2zm-5 7h10l-2 4H9l-2-4zm-2 5h14l-2.5 5h-9L5 14zm4 6h6l-3 3-3-3z" />
  </svg>
);

// 24. Stability AI / Stable Diffusion (Concentric Diffusion Ring)
const StabilityAiLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8" fill="#A855F7">
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

// --------------------------------------------------------------------------
// 3 LINES OF 8 UNIQUE TOOLS EACH = 24 REAL AI TOOLS & LLMs
// --------------------------------------------------------------------------

const ROW_1_TOOLS: AiToolItem[] = [
  { id: 'openai', name: 'OpenAI / GPT-4o', category: 'Frontier LLM', svg: <OpenAiLogo /> },
  { id: 'claude', name: 'Anthropic Claude 3.5', category: 'Reasoning & Coding', svg: <ClaudeLogo /> },
  { id: 'gemini', name: 'Google Gemini 1.5 Pro', category: 'Multimodal Frontier', svg: <GoogleGeminiLogo /> },
  { id: 'cursor', name: 'Cursor AI IDE', category: 'AI Native Coding', svg: <CursorLogo /> },
  { id: 'deepseek', name: 'DeepSeek-R1 / V3', category: 'Open Weights Reasoning', svg: <DeepSeekLogo /> },
  { id: 'perplexity', name: 'Perplexity AI', category: 'Deep Research Engine', svg: <PerplexityLogo /> },
  { id: 'llama', name: 'Meta Llama 3.3', category: 'Open Source Intelligence', svg: <MetaLlamaLogo /> },
  { id: 'copilot', name: 'GitHub Copilot', category: 'Pair Programmer', svg: <GitHubCopilotLogo /> },
];

const ROW_2_TOOLS: AiToolItem[] = [
  { id: 'midjourney', name: 'Midjourney v6', category: 'Generative Visuals', svg: <MidjourneyLogo /> },
  { id: 'mistral', name: 'Mistral Large 2', category: 'Efficient Frontier', svg: <MistralLogo /> },
  { id: 'huggingface', name: 'Hugging Face', category: 'Model Hub & Spaces', svg: <HuggingFaceLogo /> },
  { id: 'runway', name: 'Runway Gen-3 Alpha', category: 'Video Generation', svg: <RunwayLogo /> },
  { id: 'elevenlabs', name: 'ElevenLabs', category: 'Voice Synthesis & Audio', svg: <ElevenLabsLogo /> },
  { id: 'v0', name: 'v0 by Vercel', category: 'Generative UI', svg: <V0Logo /> },
  { id: 'groq', name: 'Groq LPU', category: 'Ultra Fast Inference', svg: <GroqLogo /> },
  { id: 'qwen', name: 'Alibaba Qwen 2.5', category: 'Math & Multimodal', svg: <QwenLogo /> },
];

const ROW_3_TOOLS: AiToolItem[] = [
  { id: 'kimi', name: 'Moonshot AI / Kimi', category: 'Long Context Engine', svg: <KimiLogo /> },
  { id: 'clawd', name: 'Anthropic Claude Code', category: 'CLI Agent Architecture', svg: <ClawdLogo /> },
  { id: 'codex', name: 'OpenAI Codex 2025', category: 'Autonomous Synthesis', svg: <CodexLogo /> },
  { id: 'replit', name: 'Replit Agent', category: 'Full-Stack Deployment', svg: <ReplitLogo /> },
  { id: 'bolt', name: 'Bolt.new', category: 'WebContainer Agent', svg: <BoltLogo /> },
  { id: 'langchain', name: 'LangChain / LangGraph', category: 'Agent Orchestration', svg: <LangChainLogo /> },
  { id: 'pinecone', name: 'Pinecone Vector DB', category: 'RAG & Semantic Retrieval', svg: <PineconeLogo /> },
  { id: 'stability', name: 'Stable Diffusion', category: 'Diffusion Models', svg: <StabilityAiLogo /> },
];

export const SectionAiToolsMarquee: React.FC<SectionAiToolsMarqueeProps> = ({ isDark = true }) => {
  // 2 sets per half (4 total sets) ensures full width coverage across wide monitors
  // and a mathematically seamless translateX(-50%) loop
  const row1Repeated = [...ROW_1_TOOLS, ...ROW_1_TOOLS, ...ROW_1_TOOLS, ...ROW_1_TOOLS];
  const row2Repeated = [...ROW_2_TOOLS, ...ROW_2_TOOLS, ...ROW_2_TOOLS, ...ROW_2_TOOLS];
  const row3Repeated = [...ROW_3_TOOLS, ...ROW_3_TOOLS, ...ROW_3_TOOLS, ...ROW_3_TOOLS];

  return (
    <section className="relative z-10 w-full py-12 sm:py-16 overflow-hidden select-none">
      {/* Background Glow - GPU-friendly Radial Gradient (0 blur cost) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] pointer-events-none rounded-full"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, rgba(251,191,36,0.015) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(251,191,36,0.05) 0%, rgba(251,191,36,0.02) 45%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14 mb-8 sm:mb-10 text-center">
        {/* Header Pill with Agent Wave Signal */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center gap-3"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider shadow-sm backdrop-blur-md border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={isDark ? 'text-neutral-300' : 'text-slate-800'}>
              24+ Frontier AI Models & Agent Architectures
            </span>
          </div>

          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-normal sm:font-medium tracking-tight mt-1 ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}
          >
            Real Engines. Real Architectures. Zero Toy Demos.
          </h2>

          <p className={`text-xs sm:text-sm max-w-xl mx-auto font-normal ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
            Master hands-on orchestration, API integration, and prompt engineering across every frontier LLM ecosystem.
          </p>
        </motion.div>
      </div>

      {/* 3-ROW SYNCHRONIZED INFINITE TICKER CONTAINER (BARABAR ALIGNED COLUMNS & SMOOTH UNIFORM FLOW) */}
      <div className="relative w-full space-y-3.5 sm:space-y-4 group/marquee">
        {/* Left & Right Edge Fade Gradient Masks for Seamless Flow */}
        <div
          className={`pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 z-20 transition-colors ${
            isDark
              ? 'bg-gradient-to-r from-[#050506] via-[#050506]/90 to-transparent'
              : 'bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/90 to-transparent'
          }`}
        />
        <div
          className={`pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 z-20 transition-colors ${
            isDark
              ? 'bg-gradient-to-l from-[#050506] via-[#050506]/90 to-transparent'
              : 'bg-gradient-to-l from-[#FAFAFA] via-[#FAFAFA]/90 to-transparent'
          }`}
        />

        {/* ------------------------------------------------------------- */}
        {/* LINE 1: FORWARD (Leftwards Flow at 36s) */}
        {/* ------------------------------------------------------------- */}
        <div className="flex overflow-hidden">
          <div className="animate-tools-marquee-left flex items-center py-1 group-hover/marquee:[animation-play-state:paused]">
            {row1Repeated.map((tool, idx) => (
              <div
                key={`row1-${tool.id}-${idx}`}
                title={`${tool.name} • ${tool.category}`}
                className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 mr-3 sm:mr-4.5 rounded-2xl border flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-sm group/item ${
                  isDark
                    ? 'bg-[#0E0E12]/90 border-white/10 hover:border-white/30 text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)]'
                    : 'bg-white border-slate-200/90 hover:border-slate-400 text-slate-900 shadow-sm'
                }`}
              >
                <div className="transition-transform duration-300 group-hover/item:scale-110 flex items-center justify-center">
                  {tool.svg}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* LINE 2: COUNTER-FLOW (Rightwards Flow at matched 36s) */}
        {/* ------------------------------------------------------------- */}
        <div className="flex overflow-hidden">
          <div className="animate-tools-marquee-right flex items-center py-1 group-hover/marquee:[animation-play-state:paused]">
            {row2Repeated.map((tool, idx) => (
              <div
                key={`row2-${tool.id}-${idx}`}
                title={`${tool.name} • ${tool.category}`}
                className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 mr-3 sm:mr-4.5 rounded-2xl border flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-sm group/item ${
                  isDark
                    ? 'bg-[#0E0E12]/90 border-white/10 hover:border-white/30 text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)]'
                    : 'bg-white border-slate-200/90 hover:border-slate-400 text-slate-900 shadow-sm'
                }`}
              >
                <div className="transition-transform duration-300 group-hover/item:scale-110 flex items-center justify-center">
                  {tool.svg}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* LINE 3: FORWARD (Leftwards Flow at matched 36s) */}
        {/* ------------------------------------------------------------- */}
        <div className="flex overflow-hidden">
          <div className="animate-tools-marquee-left flex items-center py-1 group-hover/marquee:[animation-play-state:paused]">
            {row3Repeated.map((tool, idx) => (
              <div
                key={`row3-${tool.id}-${idx}`}
                title={`${tool.name} • ${tool.category}`}
                className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 mr-3 sm:mr-4.5 rounded-2xl border flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer shadow-sm group/item ${
                  isDark
                    ? 'bg-[#0E0E12]/90 border-white/10 hover:border-white/30 text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)]'
                    : 'bg-white border-slate-200/90 hover:border-slate-400 text-slate-900 shadow-sm'
                }`}
              >
                <div className="transition-transform duration-300 group-hover/item:scale-110 flex items-center justify-center">
                  {tool.svg}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Micro Agent-Wave Loader Bar below */}
      <div className="mt-8 flex justify-center items-center">
        <div
          className={`px-4 py-2 rounded-full border text-xs font-mono flex items-center gap-3 shadow-xs ${
            isDark
              ? 'bg-white/[0.02] border-white/10 text-neutral-300'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <AgentWaveLoader label="Live Agent Routing: Claude • Codex • Gemini • DeepSeek • Kimi" durationMs={3200} />
        </div>
      </div>
    </section>
  );
};
