'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

import { DarkModeIcon, DarkModeLogo, LightModeIcon, LightModeLogo } from '@/assets/logo';

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

    return (
        <div className={cn("flex items-center justify-center", className)} aria-label="Kollabary Logo">
            {isCollapsed ? (
                resolvedTheme === 'dark' ? (
                    <DarkModeIcon width={48} height={48} className="w-12 h-12" />
                ) : (
                    <LightModeIcon width={48} height={48} className="w-12 h-12" />
                )
            ) : resolvedTheme === 'dark' ? (
                <DarkModeLogo width={160} height={48} className="w-40 h-12" />
            ) : (
                <LightModeLogo width={160} height={48} className="w-40 h-12" />
            )}
        </div>
    );
}
