'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Settings,
    BarChart3,
    MessageSquare,
    Briefcase,
    ChevronLeft,
    ChevronRight,
    Rocket,
    LogOut,
    X,
    Handshake,
    ShieldAlert,
    CheckCircle,
    CreditCard,
    TrendingUp,
    User
} from 'lucide-react';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { useLogout } from '@/hooks/use-auth.hooks';
import { UserRole } from '@/types/auth.types';
import { FRONTEND_ROUTES } from '@/constants';
import { Button } from '@/components/ui/button';

interface NavItemProps {
    href: string;
    icon: React.ElementType;
    label: string;
    isCollapsed: boolean;
    isActive: boolean;
    badge?: string;
    onClick?: () => void;
}

const NavItem = ({ href, icon: Icon, label, isCollapsed, isActive, badge, onClick }: NavItemProps) => {
    return (
        <Link href={href} className="block group" onClick={onClick}>
            <div className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative",
                isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-foreground"
            )}>
                <Icon size={20} className={cn("flex-shrink-0", isActive ? "" : "group-hover:scale-110 transition-transform")} />

                {!isCollapsed && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm font-medium whitespace-nowrap"
                    >
                        {label}
                        {badge && (
                            <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold bg-primary-foreground text-primary rounded-md">
                                {badge}
                            </span>
                        )}
                    </motion.span>
                )}

                {isActive && (
                    <motion.div
                        layoutId="active-pill"
                        className="absolute -left-1 w-1 h-6 bg-primary-foreground rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}
            </div>
        </Link>
    );
};

interface SidebarProps {
    isCollapsed: boolean;
    onToggleCollapse: () => void;
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
}

/**
 * Enterprise-grade Sidebar component for authenticated users
 * Enhanced with mobile responsiveness and smooth transitions
 */
export const Sidebar = ({
    isCollapsed,
    onToggleCollapse,
    isMobileOpen,
    onMobileClose
}: SidebarProps) => {
    const pathname = usePathname();
    const { user } = useAuth();
    const logoutMutation = useLogout();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);

    // Close mobile sidebar ONLY on navigation
    useEffect(() => {
        if (onMobileClose) onMobileClose();
    }, [pathname]);

    const commonLinks = [
        { href: FRONTEND_ROUTES.DASHBOARD.OVERVIEW, icon: LayoutDashboard, label: 'Overview' },
        { href: FRONTEND_ROUTES.DASHBOARD.COLLABORATIONS, icon: Handshake, label: 'Collaborations' },
        { href: FRONTEND_ROUTES.DASHBOARD.MESSAGES, icon: MessageSquare, label: 'Messages', badge: '3' },
    ];

    const adminLinks = [
        { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.OVERVIEW, icon: TrendingUp, label: 'Admin Overview' },
        { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.REPORTS, icon: ShieldAlert, label: 'Reports' },
        { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.VERIFICATIONS, icon: CheckCircle, label: 'Verifications' },
        { href: FRONTEND_ROUTES.DASHBOARD.ADMIN.SUBSCRIPTIONS, icon: CreditCard, label: 'Subscriptions' },
    ];

    const influencerLinks = [
        { href: FRONTEND_ROUTES.DASHBOARD.INFLUENCER_PROFILE, icon: Users, label: 'My Profile' },
        { href: FRONTEND_ROUTES.DASHBOARD.CAMPAIGNS, icon: Briefcase, label: 'Campaigns' },
        { href: FRONTEND_ROUTES.DASHBOARD.EARNINGS, icon: BarChart3, label: 'Earnings' },
    ];

    const brandLinks = [
        { href: FRONTEND_ROUTES.DASHBOARD.DISCOVER, icon: Rocket, label: 'Discover' },
        { href: FRONTEND_ROUTES.DASHBOARD.PROJECTS, icon: Briefcase, label: 'My Projects' },
    ];

    const getLinksByRole = () => {
        switch (user?.role) {
            case UserRole.ADMIN: return [...commonLinks, ...adminLinks];
            case UserRole.INFLUENCER: return [...commonLinks, ...influencerLinks];
            case UserRole.USER: return [...commonLinks, ...brandLinks];
            default: return commonLinks;
        }
    };

    const navLinks = getLinksByRole();

    const sidebarContent = (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Sidebar Header */}
            <div className="h-16 flex items-center justify-between px-5 border-b border-border/50 mb-6 shrink-0">
                <Link href="/overview" className="flex items-center gap-3 active:scale-95 transition-transform overflow-hidden">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 shrink-0">
                        <Rocket size={20} />
                    </div>
                    {(!isCollapsed || isMobileOpen) && (
                        <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="font-bold text-xl tracking-tight whitespace-nowrap overflow-hidden"
                        >
                            Kollabary
                        </motion.span>
                    )}
                </Link>

                {/* Mobile Close Button */}
                {isMobileOpen && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMobileClose}
                        className="lg:hidden text-muted-foreground hover:text-primary transition-colors shrink-0"
                    >
                        <X size={20} />
                    </Button>
                )}
            </div>

            {/* Navigation */}
            <div className="flex-grow px-3 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-none py-2">
                {navLinks.map((link) => (
                    <NavItem
                        key={link.href}
                        {...link}
                        isCollapsed={isCollapsed && !isMobileOpen}
                        isActive={pathname === link.href || pathname.startsWith(link.href + '/')}
                        onClick={onMobileClose}
                    />
                ))}
            </div>

            {/* Sidebar Footer */}
            <div className="p-3 mt-auto space-y-1 border-t border-border/50 bg-muted/20 shrink-0">
                {/* User Profile Summary */}
                {user && (
                    <div className={cn(
                        "mb-2 p-2 rounded-2xl bg-background/50 border border-border/50 flex items-center gap-3 transition-all",
                        isCollapsed && !isMobileOpen ? "justify-center" : "px-3"
                    )}>
                        <div className="relative shrink-0">
                            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                <User size={18} />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-background rounded-full" />
                        </div>
                        {(!isCollapsed || isMobileOpen) && (
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-bold leading-none truncate group-hover:text-primary transition-colors">
                                    {user.email.split('@')[0]}
                                </span>
                                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mt-1">
                                    {user.role}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                <NavItem
                    href={FRONTEND_ROUTES.DASHBOARD.SETTINGS}
                    icon={Settings}
                    label="Settings"
                    isCollapsed={isCollapsed && !isMobileOpen}
                    isActive={pathname === FRONTEND_ROUTES.DASHBOARD.SETTINGS}
                    onClick={onMobileClose}
                />

                <Button
                    variant="ghost"
                    onClick={() => setIsLogoutModalOpen(true)}
                    className={cn(
                        "w-full flex items-center gap-3 px-3 h-11 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors group overflow-hidden border-none",
                        (isCollapsed && !isMobileOpen) ? "justify-center" : "justify-start"
                    )}
                >
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform shrink-0" />
                    {(!isCollapsed || isMobileOpen) && (
                        <span className="text-sm font-medium whitespace-nowrap overflow-hidden">Log out</span>
                    )}
                </Button>
            </div>

            {/* Logout Confirmation Modal */}
            <AnimatedModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                title="End Session?"
                description="Are you sure you want to log out? You'll need to sign in again to access your dashboard."
                size="sm"
            >
                <div className="flex flex-col gap-3">
                    <Button
                        variant="destructive"
                        size="lg"
                        className="w-full rounded-2xl font-bold h-12 shadow-lg shadow-red-500/20"
                        onClick={() => {
                            logoutMutation.mutate();
                            setIsLogoutModalOpen(false);
                        }}
                        disabled={logoutMutation.isPending}
                    >
                        {logoutMutation.isPending ? "Logging out..." : "Log me out"}
                    </Button>
                    <Button
                        variant="ghost"
                        size="lg"
                        className="w-full rounded-2xl font-bold h-12"
                        onClick={() => setIsLogoutModalOpen(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </AnimatedModal>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 h-screen bg-card border-r border-border z-40 transition-all duration-300 ease-in-out hidden lg:flex flex-col overflow-visible",
                    isCollapsed ? "w-20" : "w-64"
                )}
            >
                {sidebarContent}

                {/* Desktop Toggle Button - Positioned outside but relative to aside */}
                <Button
                    variant="outline"
                    size="icon-xs"
                    onClick={onToggleCollapse}
                    className="absolute -right-3 top-20 w-6 h-6 bg-card border border-border rounded-full hidden lg:flex items-center justify-center shadow-sm text-muted-foreground hover:text-primary transition-colors z-50 hover:scale-110 active:scale-95"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </Button>
            </aside>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onMobileClose}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 h-screen w-[280px] bg-card border-r border-border z-[70] lg:hidden flex flex-col shadow-2xl overflow-hidden"
                        >
                            {sidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
