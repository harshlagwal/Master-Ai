'use client'

import React, { Suspense, lazy, useRef, useState, useEffect } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: () => void
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInViewport, setIsInViewport] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile device or coarse pointer to save GPU battery & frame rate
  useEffect(() => {
    const checkMobile = () => {
      const isSmall = window.innerWidth < 768
      const isCoarse = window.matchMedia?.('(pointer: coarse)').matches ?? false
      setIsMobile(isSmall || isCoarse)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-trigger onLoad callback on mobile so UI entrance animations run instantly
  useEffect(() => {
    if (isMobile && onLoad) {
      onLoad()
    }
  }, [isMobile, onLoad])

  // Unmount WebGL context when scrolled out of view to stop GPU render loops
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: '100px', // Pre-mount slightly before entering viewport
        threshold: 0.05,
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative ${className || ''}`}
      style={{
        contentVisibility: 'auto',
      }}
    >
      {isMobile ? (
        /* Lightweight CSS-only animated Antigravity Orb for mobile (0% WebGL overhead) */
        <div className="w-full h-full flex items-center justify-center relative pointer-events-none select-none">
          {/* Outer glowing atmospheric pulse */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-cyan-500/25 via-indigo-500/20 to-purple-500/10 blur-xl animate-pulse" />
          
          {/* Core holographic orb with Antigravity float animation */}
          <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-cyan-400/30 bg-gradient-to-br from-cyan-400/20 via-blue-600/30 to-purple-600/30 backdrop-blur-md shadow-[0_0_40px_rgba(34,211,238,0.25)] flex items-center justify-center animate-antigravity-float">
            <div className="w-20 h-20 rounded-full border border-white/20 bg-white/10 flex items-center justify-center shadow-inner">
              <div className="w-7 h-7 rounded-full bg-cyan-400/80 shadow-[0_0_16px_rgba(34,211,238,0.9)] animate-pulse" />
            </div>
          </div>
        </div>
      ) : isInViewport ? (
        /* Full interactive 3D WebGL Spline Robot for desktop */
        <Suspense 
          fallback={
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
              <span className="text-xs font-mono text-neutral-400 animate-pulse">Initializing 3D Robot...</span>
            </div>
          }
        >
          <Spline
            scene={scene}
            className="w-full h-full"
            onLoad={onLoad}
          />
        </Suspense>
      ) : null}
    </div>
  )
}
