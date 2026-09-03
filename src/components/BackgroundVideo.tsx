import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 97;

export const BackgroundVideo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const targetFrameRef = useRef<number>(48); // Start facing center/slightly forward
  const currentFrameRef = useRef<number>(48);
  const lastRenderedIndexRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let isDestroyed = false;

    // Handle high-DPI crisp canvas sizing matching the screen
    const updateCanvasSize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      // Force re-render of current frame
      lastRenderedIndexRef.current = -1;
      drawCurrent();
    };

    // Draw frame with object-fit: cover and object-position: 70% center
    const drawFrame = (img: HTMLImageElement) => {
      if (!canvas || !ctx) return;
      const canvasW = canvas.width;
      const canvasH = canvas.height;
      const imgW = img.naturalWidth || 1600;
      const imgH = img.naturalHeight || 904;
      const imgAspect = imgW / imgH;
      const canvasAspect = canvasW / canvasH;

      let drawW: number;
      let drawH: number;
      let drawX: number;
      let drawY: number;

      if (canvasAspect > imgAspect) {
        drawW = canvasW;
        drawH = canvasW / imgAspect;
        drawX = 0;
        drawY = (canvasH - drawH) * 0.5;
      } else {
        drawH = canvasH;
        drawW = canvasH * imgAspect;
        // 70% horizontal bias so the avatar sits nicely to the right of the text
        drawX = (canvasW - drawW) * 0.7;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    };

    const findNearestLoadedImage = (index: number): HTMLImageElement | null => {
      if (isLoadedRef.current[index] && imagesRef.current[index]) {
        return imagesRef.current[index];
      }
      // Look outwards for nearest available frame
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const left = index - offset;
        if (left >= 0 && isLoadedRef.current[left] && imagesRef.current[left]) {
          return imagesRef.current[left];
        }
        const right = index + offset;
        if (right < TOTAL_FRAMES && isLoadedRef.current[right] && imagesRef.current[right]) {
          return imagesRef.current[right];
        }
      }
      return null;
    };

    const drawCurrent = () => {
      const targetIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );
      const img = findNearestLoadedImage(targetIdx);
      if (img) {
        drawFrame(img);
        lastRenderedIndexRef.current = targetIdx;
      }
    };

    updateCanvasSize();

    // 1. Load initial frames immediately (frame 0, 48, 96) for instant render
    const priorityIndices = [0, 48, 96];
    priorityIndices.forEach((idx) => {
      const img = new Image();
      img.src = `/hero-frames/frame_${String(idx).padStart(3, '0')}.webp`;
      img.onload = () => {
        if (isDestroyed) return;
        imagesRef.current[idx] = img;
        isLoadedRef.current[idx] = true;
        if (lastRenderedIndexRef.current === -1) {
          drawCurrent();
        }
      };
    });

    // 2. Preload remaining frames sequentially in background without choking network
    let frameToLoad = 0;
    const preloadNextBatch = () => {
      if (isDestroyed) return;
      const batchSize = 6;
      let scheduled = 0;

      while (frameToLoad < TOTAL_FRAMES && scheduled < batchSize) {
        const idx = frameToLoad++;
        if (!imagesRef.current[idx]) {
          const img = new Image();
          img.src = `/hero-frames/frame_${String(idx).padStart(3, '0')}.webp`;
          img.onload = () => {
            if (isDestroyed) return;
            imagesRef.current[idx] = img;
            isLoadedRef.current[idx] = true;
          };
          scheduled++;
        }
      }

      if (frameToLoad < TOTAL_FRAMES && !isDestroyed) {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(() => preloadNextBatch(), { timeout: 100 });
        } else {
          setTimeout(preloadNextBatch, 16);
        }
      }
    };

    // Start background preload shortly after mount
    const preloadTimer = setTimeout(preloadNextBatch, 50);

    // 3. Buttery-smooth physics LERP loop for 60/120 FPS scrubbing
    const loop = () => {
      if (window.scrollY <= window.innerHeight * 1.15) {
        const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) > 0.005) {
          // Smooth spring damping (0.12 factor gives quick, responsive feel with silky inertia)
          currentFrameRef.current += diff * 0.12;

          const targetIdx = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.round(currentFrameRef.current))
          );

          if (targetIdx !== lastRenderedIndexRef.current) {
            const img = findNearestLoadedImage(targetIdx);
            if (img) {
              drawFrame(img);
              lastRenderedIndexRef.current = targetIdx;
            }
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    // Mouse & Touch coordinate mapping
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 1.15) return;
      const normalizedX = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      targetFrameRef.current = normalizedX * (TOTAL_FRAMES - 1);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY > window.innerHeight * 1.15 || e.touches.length === 0) return;
      const normalizedX = Math.max(0, Math.min(1, e.touches[0].clientX / window.innerWidth));
      targetFrameRef.current = normalizedX * (TOTAL_FRAMES - 1);
    };

    // Parallax & Opacity Dissolve on Scroll
    const handleScroll = () => {
      if (!canvas) return;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      if (scrollY <= vh * 1.2) {
        const progress = Math.min(1, Math.max(0, scrollY / (vh * 0.85)));
        canvas.style.opacity = `${1 - progress}`;
        canvas.style.transform = `translate3d(0, ${scrollY * 0.18}px, 0)`;
      } else {
        canvas.style.opacity = '0';
      }
    };

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Initial scroll sync
    handleScroll();

    return () => {
      isDestroyed = true;
      clearTimeout(preloadTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      className="fixed inset-0 z-0 w-full h-full pointer-events-none select-none"
      style={{
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
      }}
    />
  );
};
