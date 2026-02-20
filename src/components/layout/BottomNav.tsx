'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Rocket,
    Handshake,
    User,
    Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { FRONTEND_ROUTES } from '@/constants';

interface BottomNavItem {
    href: string;
    icon: React.ElementType;
    label: string;
}

/**
 * Fixed bottom navigation bar for mobile viewports.
 * Role-aware: USER sees Overview, Discover, Collaborations, Profile.
 *             INFLUENCER sees Overview, Collaborations, Profile.
 * Hidden on lg+ where the desktop Sidebar is visible.
 */
export const BottomNav = () => {
    const pathname = usePathname();
    const { user } = useAuth();

    const getNavItems = (): BottomNavItem[] => {
        const profileHref =
            user?.role === UserRole.INFLUENCER
                ? FRONTEND_ROUTES.DASHBOARD.INFLUENCER_PROFILE
                : FRONTEND_ROUTES.DASHBOARD.PROFILE;

        if (user?.role === UserRole.USER) {
            return [
                { href: FRONTEND_ROUTES.DASHBOARD.OVERVIEW, icon: LayoutDashboard, label: 'Overview' },
                { href: FRONTEND_ROUTES.DASHBOARD.DISCOVER, icon: Rocket, label: 'Discover' },
                { href: FRONTEND_ROUTES.DASHBOARD.COLLABORATIONS, icon: Handshake, label: 'Collaborations' },
                { href: profileHref, icon: User, label: 'Profile' },
            ];
        }

        if (user?.role === UserRole.INFLUENCER) {
            return [
                { href: FRONTEND_ROUTES.DASHBOARD.OVERVIEW, icon: LayoutDashboard, label: 'Overview' },
                { href: FRONTEND_ROUTES.DASHBOARD.COLLABORATIONS, icon: Handshake, label: 'Collabs' },
                { href: FRONTEND_ROUTES.DASHBOARD.SETTINGS, icon: Settings, label: 'Settings' },
                { href: profileHref, icon: User, label: 'Profile' },
            ];
        }

        // Fallback (ADMIN or unknown) – only overview
        return [
            { href: FRONTEND_ROUTES.DASHBOARD.OVERVIEW, icon: LayoutDashboard, label: 'Overview' },
        ];
    };

    const navItems = getNavItems();

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(href + '/');

    return (
        <nav
            className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-background/80 backdrop-blur-md border-t border-border"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
            aria-label="Bottom navigation"
        >
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors duration-200',
                                active
                                    ? 'text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                            )}
                            aria-current={active ? 'page' : undefined}
                        >
                            {active && (
                                <motion.div
                                    layoutId="bottom-nav-pill"
                                    className="absolute bottom-0 inset-x-3 h-0.5 bg-primary rounded-t-full"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                            <Icon
                                size={22}
                                className={cn(
                                    'transition-transform duration-200',
                                    active && 'scale-110'
                                )}
                            />
                            <span className="text-[10px] font-semibold leading-none mt-0.5">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};
