'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { BrandLogo, BrandIcon } from '@/assets/logo';

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
                <BrandIcon width={48} height={48} className="w-12 h-12" theme={resolvedTheme} />
            ) : <BrandLogo width={160} height={48} className="w-40 h-12" theme={resolvedTheme} />}
        </div>
    );
}
