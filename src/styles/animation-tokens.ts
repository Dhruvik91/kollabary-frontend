/**
 * Animation Token System
 * Centralized animation values following AI Guidelines
 * 
 * Duration Guidelines:
 * - 150-300ms for micro interactions
 * - 250-400ms for page transitions
 * - Never exceed 500ms
 * 
 * Target: 60fps smooth animations
 */

export const duration = {
    fast: 150,
    base: 250,
    slow: 400,
    // In seconds for Framer Motion
    fastSec: 0.15,
    baseSec: 0.25,
    slowSec: 0.4,
} as const;

export const ease = {
    standard: [0.4, 0, 0.2, 1],
    accelerate: [0.4, 0, 1, 1],
    decelerate: [0, 0, 0.2, 1],
    spring: { type: 'spring', damping: 25, stiffness: 300 },
    bounce: { type: 'spring', damping: 10, stiffness: 400 },
} as const;

export const transition = {
    fast: {
        duration: duration.fastSec,
        ease: ease.standard,
    },
    base: {
        duration: duration.baseSec,
        ease: ease.standard,
    },
    slow: {
        duration: duration.slowSec,
        ease: ease.decelerate,
    },
    spring: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
    },
    springBounce: {
        type: 'spring',
        damping: 15,
        stiffness: 400,
    },
} as const;

export const stagger = {
    fast: 0.05,
    base: 0.1,
    slow: 0.15,
} as const;

/**
 * CSS transition classes for Tailwind
 * Use these for consistent transition timing
 */
export const cssTransition = {
    fast: 'transition-all duration-150 ease-out',
    base: 'transition-all duration-250 ease-out',
    slow: 'transition-all duration-400 ease-out',
    transform: 'transition-transform duration-300 ease-out',
    opacity: 'transition-opacity duration-200 ease-out',
    colors: 'transition-colors duration-200 ease-out',
} as const;

/**
 * Reduced motion safe variants
 * Respects prefers-reduced-motion
 */
export const reducedMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: duration.fastSec },
} as const;
