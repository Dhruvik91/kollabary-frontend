'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { AuthGuard } from '@/components/guards/AuthGuard';
import { cn } from '@/lib/utils';
import { FRONTEND_ROUTES } from '@/constants';
import { ProfileSetupGuard } from '@/components/guards/ProfileSetupGuard';
import { SignupBonusModal } from '@/components/modal/SignupBonusModal';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

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

    const searchParams = useSearchParams();
    const router = useRouter();
    const [isBonusModalOpen, setIsBonusModalOpen] = useState(false);

    React.useEffect(() => {
        if (searchParams.get('showBonus') === 'true') {
            setIsBonusModalOpen(true);
            // Clean up URL
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.delete('showBonus');
            const cleanPath = `${pathName}${newParams.toString() ? `?${newParams.toString()}` : ''}`;
            router.replace(cleanPath, { scroll: false });
        }
    }, [searchParams, pathName, router]);

    return (
        <AuthGuard>
            {isSetupPage ? (
                <div className="flex h-screen bg-zinc-50/50 dark:bg-background overflow-hidden text-foreground relative">
                    {/* Ambient gradient orbs for frosted glass blur */}
                    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden dark:block hidden">
                        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/[0.07] rounded-full blur-[120px]" />
                        <div className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] bg-violet-600/[0.05] rounded-full blur-[100px]" />
                        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-indigo-500/[0.04] rounded-full blur-[80px]" />
                    </div>
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
                            !isMessagesPage ? 'px-4 pt-4 pb-20 md:px-6 md:pt-8 lg:px-10 lg:pt-10 lg:pb-0 overflow-y-auto' : 'overflow-hidden h-full'
                        )}>
                            <div className={cn(
                                "h-full w-full mx-auto",
                                !isMessagesPage && "max-w-[1600px]"
                            )}>
                                {children}
                            </div>
                        </main>
                        <BottomNav />
                    </div>
                </div>
            ) : (
                <ProfileSetupGuard>
                    <div className="flex h-screen bg-zinc-50/50 dark:bg-background overflow-hidden text-foreground relative">
                        {/* Ambient gradient orbs for frosted glass blur */}
                        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden dark:block hidden">
                            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/[0.07] rounded-full blur-[120px]" />
                            <div className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] bg-violet-600/[0.05] rounded-full blur-[100px]" />
                            <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-indigo-500/[0.04] rounded-full blur-[80px]" />
                        </div>
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
                                !isMessagesPage ? 'px-4 pt-4 pb-20 md:px-6 md:pt-8 lg:px-10 lg:pt-10 lg:pb-0 overflow-y-auto' : 'overflow-hidden h-full'
                            )}>
                                <div className={cn(
                                    "h-full w-full mx-auto",
                                    !isMessagesPage && "max-w-[1600px]"
                                )}>
                                    {children}
                                </div>
                            </main>
                            <BottomNav />
                        </div>
                    </div>
                </ProfileSetupGuard>
            )}
            <SignupBonusModal 
                isOpen={isBonusModalOpen} 
                onClose={() => setIsBonusModalOpen(false)} 
            />
        </AuthGuard>
    );
}

