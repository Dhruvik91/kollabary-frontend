'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { AuthGuard } from '@/components/guards/AuthGuard';
import { cn } from '@/lib/utils';

export default function DashboardClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <AuthGuard>
            <div className="flex min-h-screen bg-zinc-50/50 dark:bg-black">
                {/* Sidebar - fixed width handled inside component */}
                <Sidebar
                    isCollapsed={isCollapsed}
                    onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                    isMobileOpen={isMobileSidebarOpen}
                    onMobileClose={() => setIsMobileSidebarOpen(false)}
                />

                {/* Main Content Area */}
                <div
                    className={cn(
                        "flex flex-col flex-1 transition-all duration-300 ease-in-out min-w-0",
                        isCollapsed ? "lg:pl-20" : "lg:pl-64"
                    )}
                >
                    <DashboardHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />
                    <main className="flex-1 p-4 md:p-8 lg:p-10">
                        {children}
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}
