import { Variants } from 'framer-motion';
import { duration, transition, stagger } from '@/styles/animation-tokens';

/**
 * Common Framer Motion variants for consistent animations
 * Following project AI guidelines for duration and easing
 * Target: 60fps smooth animations
 */

export const modalVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: 10,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: transition.spring,
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 10,
        transition: transition.fast,
    },
};

export const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: duration.baseSec }
    },
    exit: {
        opacity: 0,
        transition: { duration: duration.fastSec }
    },
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: duration.baseSec }
    },
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: transition.base,
    },
};

export const slideUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: duration.slowSec, ease: "easeOut" }
    },
};

export const slideInFromLeft: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: transition.base,
    },
};

export const slideInFromRight: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: transition.base,
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: transition.spring,
    },
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: stagger.base,
        },
    },
};

export const staggerContainerFast: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: stagger.fast,
        },
    },
};

export const cardHover = {
    rest: { y: 0, scale: 1 },
    hover: { 
        y: -5, 
        scale: 1.02,
        transition: transition.fast,
    },
};

export const buttonPress = {
    rest: { scale: 1 },
    pressed: { scale: 0.95 },
    hover: { scale: 1.02 },
};

/**
 * Page transition variants for smooth route changes
 */
export const pageTransition: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: duration.baseSec,
            ease: [0.4, 0, 0.2, 1],
        }
    },
    exit: { 
        opacity: 0, 
        y: -10,
        transition: {
            duration: duration.fastSec,
        }
    },
};

/**
 * List item animation for staggered lists
 */
export const listItem: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: transition.base,
    },
};
