'use client';

import {
    Users,
    Handshake,
    ShieldAlert,
    CheckCircle,
    ArrowUpRight,
    ArrowDownRight,
    TrendingUp,
    Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdminStats } from '@/hooks/use-admin.hooks';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * StatCard component with glassmorphism and animations
 */
function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    colorClass
}: {
    title: string,
    value: string | number,
    icon: any,
    trend?: 'up' | 'down',
    trendValue?: string,
    colorClass: string
}) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-md"
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <h3 className="mt-2 text-3xl font-bold tracking-tight">{value}</h3>

                    {trend && (
                        <div className="mt-2 flex items-center gap-1">
                            <span className={cn(
                                "flex items-center text-xs font-semibold",
                                trend === 'up' ? "text-emerald-500" : "text-rose-500"
                            )}>
                                {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {trendValue}
                            </span>
                            <span className="text-[10px] text-muted-foreground">vs average</span>
                        </div>
                    )}
                </div>

                <div className={cn("rounded-xl p-3 text-white shadow-lg", colorClass)}>
                    <Icon size={24} />
                </div>
            </div>

            {/* Background Accent */}
            <div className={cn(
                "absolute -right-6 -bottom-6 h-24 w-24 rounded-full opacity-5 blur-3xl",
                colorClass
            )} />
        </motion.div>
    );
}

export default function AdminOverviewPage() {
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

    const statCards = [
        {
            title: 'Total Users',
            value: stats?.totalUsers || 0,
            icon: Users,
            trend: 'up' as const,
            trendValue: '+12%',
            colorClass: 'bg-blue-600'
        },
        {
            title: 'Active Collaborations',
            value: stats?.activeCollaborations || 0,
            icon: Handshake,
            trend: 'up' as const,
            trendValue: '+8%',
            colorClass: 'bg-indigo-600'
        },
        {
            title: 'Influencers',
            value: stats?.totalInfluencers || 0,
            icon: Briefcase,
            trend: 'up' as const,
            trendValue: '+5%',
            colorClass: 'bg-amber-600'
        },
        {
            title: 'Pending Verifications',
            value: stats?.pendingVerifications || 0,
            icon: CheckCircle,
            trend: 'down' as const,
            trendValue: '-2%',
            colorClass: 'bg-emerald-600'
        }
    ];

    return (
        <div className="space-y-8 pb-10">
            {/* Header section */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Platform Overview</h1>
                <p className="text-muted-foreground">Monitor platform health, growth, and pending administrative tasks.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((card, idx) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <StatCard {...card} />
                    </motion.div>
                ))}
            </div>

            {/* Activity and Health section */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Custom Visualization Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm"
                >
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <TrendingUp size={20} className="text-primary" />
                            Platform Growth
                        </h3>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <div className="h-2 w-2 rounded-full bg-blue-500" /> Users
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <div className="h-2 w-2 rounded-full bg-indigo-500" /> Influencers
                            </div>
                        </div>
                    </div>

                    {/* Placeholder for Trend Visualization - Custom CSS Bars */}
                    <div className="flex h-52 items-end justify-between gap-2 px-2">
                        {[40, 60, 45, 80, 55, 90, 70, 85, 60, 75, 95, 100].map((height, i) => (
                            <div key={i} className="group relative flex-1 flex flex-col justify-end gap-1">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ duration: 1, delay: 0.5 + (i * 0.05) }}
                                    className="w-full rounded-t-sm bg-blue-500/80 transition-all hover:bg-blue-600"
                                />
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height * 0.6}%` }}
                                    transition={{ duration: 1, delay: 0.7 + (i * 0.05) }}
                                    className="w-full rounded-t-sm bg-indigo-500/60 transition-all hover:bg-indigo-600"
                                />
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                    M{i + 1}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 border-t border-border/50 pt-4">
                        <p className="text-xs text-muted-foreground text-center">Monthly projection based on current growth rates.</p>
                    </div>
                </motion.div>

                {/* Important Tasks Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm"
                >
                    <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
                        <ShieldAlert size={20} className="text-rose-500" />
                        Management Required
                    </h3>
                    <div className="space-y-4">
                        <div className="group flex items-center justify-between rounded-xl border border-border/50 bg-muted/30 p-4 transition-colors hover:bg-muted/50">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Verification Requests</p>
                                    <p className="text-xs text-muted-foreground">{stats?.pendingVerifications || 0} influencers waiting</p>
                                </div>
                            </div>
                            <button className="text-xs font-semibold text-primary hover:underline">Review All</button>
                        </div>

                        <div className="group flex items-center justify-between rounded-xl border border-border/50 bg-muted/30 p-4 transition-colors hover:bg-muted/50">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-rose-500/10 p-2 text-rose-600">
                                    <ShieldAlert size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">User Reports</p>
                                    <p className="text-xs text-muted-foreground">{stats?.totalReports || 0} items to resolve</p>
                                </div>
                            </div>
                            <button className="text-xs font-semibold text-primary hover:underline">Resolve</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
