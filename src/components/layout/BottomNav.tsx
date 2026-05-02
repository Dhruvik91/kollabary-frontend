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
    TrendingUp,
    ShieldAlert,
    CheckCircle,
    CreditCard,
    UserPlus,
    Bookmark,
    Gavel,
    Award,
    MessageSquare,
    BarChart3,
    Coins,
    Package,
    MoreHorizontal,
    Users,
    Gift,
    Share2,
    Zap,
    Wallet,
    UserCog,
    Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { FRONTEND_ROUTES } from '@/constants';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

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
                { href: FRONTEND_ROUTES.DASHBOARD.OVERVIEW, icon: LayoutDashboard, label: 'Home' },
                { href: FRONTEND_ROUTES.DASHBOARD.INFLUENCERS, icon: Rocket, label: 'Explore' },
                { href: FRONTEND_ROUTES.DASHBOARD.COLLABORATIONS, icon: Handshake, label: 'Collabs' },
                { href: FRONTEND_ROUTES.DASHBOARD.AUCTIONS, icon: Gavel, label: 'Auctions' },
                { href: FRONTEND_ROUTES.DASHBOARD.PITCHES, icon: Sparkles, label: 'Pitches' },
                { href: FRONTEND_ROUTES.DASHBOARD.MY_INFLUENCERS, icon: User, label: 'My Influencers' },
                { href: FRONTEND_ROUTES.DASHBOARD.EARNINGS, icon: CreditCard, label: 'Earnings' },
                { href: FRONTEND_ROUTES.DASHBOARD.REFERRALS, icon: UserPlus, label: 'Referrals' },
                { href: FRONTEND_ROUTES.DASHBOARD.TOP_UP, icon: Coins, label: 'Top Up' },
                { href: FRONTEND_ROUTES.DASHBOARD.ORDERS, icon: Package, label: 'Orders' },
            ];
        }

        if (user?.role === UserRole.INFLUENCER) {
            return [
                { href: FRONTEND_ROUTES.DASHBOARD.OVERVIEW, icon: LayoutDashboard, label: 'Home' },
                { href: FRONTEND_ROUTES.DASHBOARD.BRANDS, icon: Rocket, label: 'Brands' },
                { href: FRONTEND_ROUTES.DASHBOARD.COLLABORATIONS, icon: Handshake, label: 'Collabs' },
                { href: FRONTEND_ROUTES.DASHBOARD.AUCTIONS, icon: Gavel, label: 'Auctions' },
                { href: FRONTEND_ROUTES.DASHBOARD.PITCHES, icon: Sparkles, label: 'Pitches' },
                { href: FRONTEND_ROUTES.DASHBOARD.EARNINGS, icon: CreditCard, label: 'Earnings' },
                { href: FRONTEND_ROUTES.DASHBOARD.REFERRALS, icon: UserPlus, label: 'Referrals' },
                { href: FRONTEND_ROUTES.DASHBOARD.TOP_UP, icon: Coins, label: 'Top Up' },
                { href: FRONTEND_ROUTES.DASHBOARD.ORDERS, icon: Package, label: 'Orders' },
                { href: FRONTEND_ROUTES.DASHBOARD.SETTINGS, icon: Settings, label: 'Settings' },
            ];
        }

        // Fallback (ADMIN or unknown)
        return [
            { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.OVERVIEW, icon: TrendingUp, label: 'Home' },
            { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.AUCTIONS, icon: Gavel, label: 'Auctions' },
            { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.BIDS, icon: BarChart3, label: 'Bids' },
            { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.CONVERSATIONS, icon: MessageSquare, label: 'Messages' },
            { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.REPORTS, icon: ShieldAlert, label: 'Reports' },
            { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.VERIFICATIONS, icon: CheckCircle, label: 'Verify' },
            { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.RANKING, icon: Award, label: 'Ranking' },
            { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.SUBSCRIPTIONS, icon: CreditCard, label: 'Subs' },
            { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.INFLUENCERS, icon: Users, label: 'Explore' },
            { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.REWARDS, icon: Gift, label: 'Rewards' },
            { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.REFERRALS, icon: Share2, label: 'Referrals' },
            { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.TOP_UP, icon: Zap, label: 'Top Ups' },
            { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.FINANCE, icon: Wallet, label: 'Finance' },
            { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.ORDERS, icon: Package, label: 'Orders' },
            { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.USERS, icon: UserCog, label: 'Users' },
        ];
    };

    const navItems = getNavItems();
    const primaryItems = navItems.slice(0, 4);
    const overflowItems = navItems.slice(4);

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(href + '/');

    return (
        <nav
            className={cn(
                "fixed bottom-0 inset-x-0 z-50 lg:hidden bg-background/80 backdrop-blur-md border-t border-border pb-[env(safe-area-inset-bottom)]",
                pathname === FRONTEND_ROUTES.DASHBOARD.MESSAGES ? "hidden" : "block"
            )}
            aria-label="Bottom navigation"
        >
            <div className="flex items-center justify-between h-16 px-2">
                {primaryItems.map((item) => {
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
                                    className="absolute top-0 inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-b-full"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                            <Icon
                                size={18}
                                className={cn(
                                    'transition-all duration-200',
                                    active && 'scale-110'
                                )}
                            />
                            <span className="text-[9px] font-bold leading-none mt-1 truncate max-w-full px-1">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}

                {/* More Menu */}
                {overflowItems.length > 0 && (
                    <Sheet>
                        <SheetTrigger asChild>
                            <button
                                className={cn(
                                    'relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors duration-200 text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <MoreHorizontal size={18} />
                                <span className="text-[9px] font-bold leading-none mt-1">More</span>
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side="bottom"
                            className="rounded-t-[2.5rem] p-0 border-t border-primary/20 bg-background/95 backdrop-blur-xl max-h-[80vh] overflow-y-auto"
                            onOpenAutoFocus={(e) => e.preventDefault()}
                        >
                            <SheetHeader className="pt-6 pb-2">
                                <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-4" />
                                <SheetTitle className="text-center text-lg font-bold">Quick Navigation</SheetTitle>
                            </SheetHeader>
                            <div className="grid grid-cols-3 gap-2 p-6 pb-12">
                                {overflowItems.map((item) => {
                                    const active = isActive(item.href);
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 gap-2",
                                                active
                                                    ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                                                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            <div className={cn(
                                                "p-2.5 rounded-xl transition-all duration-300",
                                                active ? "bg-primary/20 scale-110" : "bg-muted/50"
                                            )}>
                                                <Icon size={24} />
                                            </div>
                                            <span className="text-xs font-semibold text-center">{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </SheetContent>
                    </Sheet>
                )}
            </div>
        </nav>
    );
};
