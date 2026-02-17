'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { AuthGuard } from '@/components/guards/AuthGuard';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { FRONTEND_ROUTES } from '@/constants';
import { ProfileSetupGuard } from '@/components/guards/ProfileSetupGuard';

export default function DashboardClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathName = usePathname();

    const isSetupPage = pathName === FRONTEND_ROUTES.DASHBOARD.INFLUENCER_SETUP ||
        pathName === FRONTEND_ROUTES.DASHBOARD.PROFILE_SETUP;

    return (
        <AuthGuard>
            {isSetupPage ? (
                <div className="flex h-screen bg-zinc-50/50 dark:bg-black overflow-hidden text-foreground">
                    <Sidebar
                        isCollapsed={isCollapsed}
                        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                        isMobileOpen={isMobileSidebarOpen}
                        onMobileClose={() => setIsMobileSidebarOpen(false)}
                    />
                    <div
                        className={cn(
                            "flex flex-col flex-1 transition-all duration-300 ease-in-out min-w-0 relative h-full",
                            isCollapsed ? "lg:pl-20" : "lg:pl-64"
                        )}
                    >
                        <DashboardHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />
                        <main className={cn(
                            "flex-1 min-h-0",
                            pathName !== FRONTEND_ROUTES.DASHBOARD.MESSAGES ? 'p-4 md:p-8 lg:p-10 overflow-y-auto' : 'overflow-hidden h-full'
                        )}>
                            {children}
                        </main>
                    </div>
                </div>
            ) : (
                <ProfileSetupGuard>
                    <div className="flex h-screen bg-zinc-50/50 dark:bg-black overflow-hidden text-foreground">
                        <Sidebar
                            isCollapsed={isCollapsed}
                            onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                            isMobileOpen={isMobileSidebarOpen}
                            onMobileClose={() => setIsMobileSidebarOpen(false)}
                        />
                        <div
                            className={cn(
                                "flex flex-col flex-1 transition-all duration-300 ease-in-out min-w-0 relative h-full",
                                isCollapsed ? "lg:pl-20" : "lg:pl-64"
                            )}
                        >
                            <DashboardHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />
                            <main className={cn(
                                "flex-1 min-h-0",
                                pathName !== FRONTEND_ROUTES.DASHBOARD.MESSAGES ? 'p-4 md:p-8 lg:p-10 overflow-y-auto' : 'overflow-hidden h-full'
                            )}>
                                {children}
                            </main>
                        </div>
                    </div>
                </ProfileSetupGuard>
            )}
        </AuthGuard>
    );
}
