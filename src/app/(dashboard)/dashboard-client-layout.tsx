'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { BottomNav } from '@/components/layout/BottomNav';
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
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathName = usePathname();

    const isSetupPage = pathName === FRONTEND_ROUTES.DASHBOARD.INFLUENCER_SETUP ||
        pathName === FRONTEND_ROUTES.DASHBOARD.PROFILE_SETUP;

    const isMessagesPage = pathName === FRONTEND_ROUTES.DASHBOARD.MESSAGES;

    return (
        <AuthGuard>
            {isSetupPage ? (
                <div className="flex h-screen bg-zinc-50/50 dark:bg-black overflow-hidden text-foreground">
                    <Sidebar
                        isCollapsed={isCollapsed}
                        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                    />
                    <div
                        className={cn(
                            "flex flex-col flex-1 transition-all duration-300 ease-in-out min-w-0 relative h-full",
                            isCollapsed ? "lg:pl-20" : "lg:pl-64"
                        )}
                    >
                        <DashboardHeader />
                        <main className={cn(
                            "flex-1 min-h-0",
                            !isMessagesPage ? 'px-4 pt-4 pb-20 md:px-8 md:pt-8 lg:px-10 lg:pt-10 lg:pb-0 overflow-y-auto' : 'overflow-hidden h-full'
                        )}>
                            {children}
                        </main>
                        <BottomNav />
                    </div>
                </div>
            ) : (
                <ProfileSetupGuard>
                    <div className="flex h-screen bg-zinc-50/50 dark:bg-black overflow-hidden text-foreground">
                        <Sidebar
                            isCollapsed={isCollapsed}
                            onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                        />
                        <div
                            className={cn(
                                "flex flex-col flex-1 transition-all duration-300 ease-in-out min-w-0 relative h-full",
                                isCollapsed ? "lg:pl-20" : "lg:pl-64"
                            )}
                        >
                            <DashboardHeader />
                            <main className={cn(
                                "flex-1 min-h-0",
                                !isMessagesPage ? 'px-4 pt-4 pb-20 md:px-8 md:pt-8 lg:px-10 lg:pt-10 lg:pb-0 overflow-y-auto' : 'overflow-hidden h-full'
                            )}>
                                {children}
                            </main>
                            <BottomNav />
                        </div>
                    </div>
                </ProfileSetupGuard>
            )}
        </AuthGuard>
    );
}

