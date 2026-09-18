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

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: '100px', // Pre-load slightly before scrolling into view
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
        // When scrolled completely out of view, hide visibility so GPU stops composite passes
        visibility: isInViewport ? 'visible' : 'hidden',
        contentVisibility: 'auto',
      }}
    >
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
    </div>
  )
}
