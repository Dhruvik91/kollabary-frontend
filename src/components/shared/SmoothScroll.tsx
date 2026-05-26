'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * High-performance smooth scrolling wrapper using Lenis.
 * Provides inertial scrolling and better control over parallax effects.
 */
export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only initialize Lenis on the main public landing page (root route)
    // This prevents Lenis from hijacking scroll on dashboard scrollable containers, setup flow wizard modals, and dialogs
    if (pathname !== '/') {
      lenisRef.current = null;
      // Clean fallback: use native window scroll-to-top on other paths
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    lenis.scrollTo(0, { immediate: true });

    // Animation loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Update Lenis on window resize
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      lenisRef.current = null;
    };
  }, [pathname]);

  return <>{children}</>;
};
