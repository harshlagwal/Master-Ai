'use client';

import React from 'react';
import { SplineScene } from '@/components/ui/splite';
import { Card } from '@/components/ui/card';
import { Spotlight } from '@/components/ui/spotlight';
import { Sparkles, ArrowRight, Bot, Cpu, Zap } from 'lucide-react';
import { HERO_DATA } from '../data';

interface SectionInteractive3DProps {
  onJoinClick: (trackId?: string) => void;
  onWhatsAppClick?: () => void;
}

export function SectionInteractive3D({
  onJoinClick,
  onWhatsAppClick,
}: SectionInteractive3DProps) {
  return (
    <section className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 py-12">
      <Card className="w-full min-h-[560px] md:min-h-[600px] bg-black/[0.94] border-white/10 relative overflow-hidden rounded-3xl shadow-2xl backdrop-blur-xl">
        {/* Dynamic interactive spotlight */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="rgba(255, 255, 255, 0.12)"
          size={350}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px] md:min-h-[600px]">
          {/* Left content: Master AI Data & CTAs */}
          <div className="lg:col-span-6 p-6 sm:p-10 md:p-12 relative z-10 flex flex-col justify-center">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-white/90 w-fit mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{HERO_DATA.universalBadge}</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-400 leading-[1.15]">
              Interactive AI Learning Experience
            </h2>

            {/* Master AI Subtitle / Data */}
            <p className="mt-4 text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
              Immerse yourself into real-world AI engineering. From agentic workflows and LLM fine-tuning to autonomous automation, experience hands-on mastery over 7 days.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-3 my-6 pt-2 border-t border-white/10">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-medium">
                  <Zap className="w-3.5 h-3.5" />
                  <span>9 Core Skills</span>
                </div>
                <span className="text-[11px] text-neutral-400">Zero fluff, 100% build</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                  <Bot className="w-3.5 h-3.5" />
                  <span>Live 3D & AI</span>
                </div>
                <span className="text-[11px] text-neutral-400">Interactive practice</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-sky-400 text-xs font-medium">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>MVP Ready</span>
                </div>
                <span className="text-[11px] text-neutral-400">Production sprints</span>
              </div>
            </div>

            {/* CTAs preserving all Master AI tracks */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onJoinClick('week-pass-299')}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-105 text-black font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-black shrink-0" />
                <span>Claim 1-Week Pass (₹299)</span>
              </button>

              <button
                type="button"
                onClick={() => onJoinClick('demo-free')}
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-full transition-all duration-200 shadow-md active:scale-95 cursor-pointer border border-emerald-400/40"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Free 30-Min Demo</span>
              </button>

              <button
                type="button"
                onClick={() => onJoinClick('master-pass')}
                className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white border border-white/20 hover:border-white/40 text-xs sm:text-sm px-4 py-2.5 rounded-full transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>Full Pass ₹89</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right content: 3D Interactive Spline Scene */}
          <div className="lg:col-span-6 relative w-full h-[360px] sm:h-[420px] lg:h-full min-h-[360px]">
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-white/70 pointer-events-none flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
              <span>Interactive 3D Robot • Rotate & Click</span>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
