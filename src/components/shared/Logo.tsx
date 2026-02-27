'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

import logoLight from '../../../public/logo/light_mode_logo.png';
import logoDark from '../../../public/logo/dark_mode_logo.png';
import logoLightCollapsed from '../../../public/logo/light_icon.png';
import logoDarkCollapsed from '../../../public/logo/dark_icon.png';

interface LogoProps {
    className?: string;
    showText?: boolean;
    textSize?: string;
    isCollapsed?: boolean;
}

/**
 * Reusable Logo component that automatically switches between
 * light and dark mode logos based on the current theme.
 */
export function Logo({
    className,
    showText = true,
    textSize = "text-xl",
    isCollapsed = false
}: LogoProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch by waiting until mounted
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className={cn("w-10 h-10 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-xl", className)} />;
    }

    const logoSrc = resolvedTheme === 'dark'
        ? logoDark
        : logoLight;

    const logoCollapsedSrc = resolvedTheme === 'dark'
        ? logoDarkCollapsed
        : logoLightCollapsed;

    return (
        <div className={cn("", className)}>
            <motion.div
                layout
            >
                <Image
                    src={isCollapsed ? logoCollapsedSrc : logoSrc}
                    alt="Kollabary Logo"
                    className={cn(
                        "object-contain transition-all duration-300 w-full h-auto absolute -top-20 right-12"
                    )}
                />
            </motion.div>
        </div>
    );
}
