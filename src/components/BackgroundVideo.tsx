import React, { useEffect, useRef } from 'react';

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef<number>(0);
  const currentDisplayTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const seekTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Continuous 60FPS physics LERP loop for buttery-smooth video scrubbing
    const loop = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        // Only run seek calculations if in or near hero viewport
        if (window.scrollY <= window.innerHeight * 1.15) {
          const diff = targetTimeRef.current - currentDisplayTimeRef.current;

          // Silky smooth dampening factor
          if (Math.abs(diff) > 0.002) {
            currentDisplayTimeRef.current += diff * 0.09;

            // Only seek if decoder isn't locked and delta is visually perceivable (> 20ms)
            if (!isSeekingRef.current && Math.abs(video.currentTime - currentDisplayTimeRef.current) > 0.02) {
              isSeekingRef.current = true;

              if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
                try {
                  (video as any).fastSeek(currentDisplayTimeRef.current);
                } catch {
                  video.currentTime = currentDisplayTimeRef.current;
                }
              } else {
                video.currentTime = currentDisplayTimeRef.current;
              }

              // Safety unlock timeout to ensure video never locks if a frame seeked event is dropped
              if (seekTimeoutRef.current) clearTimeout(seekTimeoutRef.current);
              seekTimeoutRef.current = window.setTimeout(() => {
                isSeekingRef.current = false;
              }, 45);
            }
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    // Direct, drift-free coordinate mapping: left screen = neck left, right screen = neck right
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 1.15) return;
      if (!video || !video.duration || isNaN(video.duration)) return;

      const normalizedX = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      targetTimeRef.current = normalizedX * video.duration;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY > window.innerHeight * 1.15) return;
      if (!video || !video.duration || isNaN(video.duration) || e.touches.length === 0) return;

      const normalizedX = Math.max(0, Math.min(1, e.touches[0].clientX / window.innerWidth));
      targetTimeRef.current = normalizedX * video.duration;
    };

    // Smooth scroll handler: Dissolves video opacity and adds gentle parallax to prevent sudden vanishing on fast scroll
    const handleScroll = () => {
      if (!video) return;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      if (scrollY <= vh * 1.2) {
        const progress = Math.min(1, Math.max(0, scrollY / (vh * 0.85)));
        video.style.opacity = `${1 - progress}`;
        video.style.transform = `translate3d(0, ${scrollY * 0.18}px, 0)`;
      } else {
        video.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check for scroll
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (seekTimeoutRef.current !== null) {
        clearTimeout(seekTimeoutRef.current);
      }
    };
  }, []);

  const handleSeeked = () => {
    isSeekingRef.current = false;
    if (seekTimeoutRef.current) {
      clearTimeout(seekTimeoutRef.current);
      seekTimeoutRef.current = null;
    }

    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration)) return;

    // Follow through with any target updates that accumulated while seeking
    if (Math.abs(video.currentTime - currentDisplayTimeRef.current) > 0.025) {
      isSeekingRef.current = true;
      if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
        try {
          (video as any).fastSeek(currentDisplayTimeRef.current);
        } catch {
          video.currentTime = currentDisplayTimeRef.current;
        }
      } else {
        video.currentTime = currentDisplayTimeRef.current;
      }
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    targetTimeRef.current = 0;
    currentDisplayTimeRef.current = 0;
    video.currentTime = 0;
  };

  return (
    <video
      ref={videoRef}
      id="bg-video"
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
      muted
      playsInline
      preload="auto"
      onSeeked={handleSeeked}
      onLoadedMetadata={handleLoadedMetadata}
      className="fixed inset-0 z-0 w-full h-full object-cover pointer-events-none select-none transition-opacity duration-150"
      style={{
        objectPosition: '70% center',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
      }}
    />
  );
};
