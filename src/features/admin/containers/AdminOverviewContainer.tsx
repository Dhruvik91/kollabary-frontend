'use client';

import React from 'react';
import { useAdminStats } from '@/hooks/use-admin.hooks';
import { AdminStatsGrid } from '../components/AdminStatsGrid';
import { AdminDetailGrid } from '../components/AdminDetailGrid';
import { AdminGrowthChart } from '../components/AdminGrowthChart';
import { AdminManagementCard } from '../components/AdminManagementCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldAlert } from 'lucide-react';

export function AdminOverviewContainer() {
    const { data: stats, isLoading, isError } = useAdminStats();

    if (isLoading) {
        return (
            <div className="space-y-8">
                <div>
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="mt-2 h-4 w-64" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-32 w-full rounded-2xl" />
                    ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-48 w-full rounded-2xl" />
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Skeleton className="h-80 w-full rounded-2xl" />
                    <Skeleton className="h-80 w-full rounded-2xl" />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center">
                <ShieldAlert size={48} className="text-rose-500 opacity-50" />
                <h3 className="mt-4 text-xl font-semibold">Failed to load platform stats</h3>
                <p className="mt-2 text-muted-foreground">There was an error fetching the latest data. Please refresh or try again later.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header section */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Platform Overview</h1>
                <p className="text-muted-foreground">Monitor platform health, growth, and pending administrative tasks.</p>
            </div>

            {/* Main Stats Grid */}
            <AdminStatsGrid stats={stats} />

            {/* Detailed Metrics Breakdown */}
            <AdminDetailGrid stats={stats} />

            {/* Activity and Health section */}
            <div className="grid gap-6 lg:grid-cols-2">
                <AdminGrowthChart stats={stats} />
                <AdminManagementCard stats={stats} />
            </div>
        </div>
    );
}
