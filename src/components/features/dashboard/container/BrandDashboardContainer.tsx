'use client';

import { useAuth } from '@/providers/auth-provider';
import { useMyCollaborations } from '@/hooks/useCollaborations';
import { motion } from 'framer-motion';
import { Users, Activity, IndianRupee, PieChart, Plus, Target, RefreshCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CollaborationCard } from '../../collaboration/components/CollaborationCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@/constants/constants';
import { LoadingState } from '@/components/ui/states/LoadingState';
import { ErrorState } from '@/components/ui/states/ErrorState';
import { EmptyState } from '@/components/ui/states/EmptyState';

export function BrandDashboardContainer() {
    const { user } = useAuth();
    const { data: collaborations, isLoading, isError, refetch } = useMyCollaborations();

    const platformStats = [
        { title: 'Total Campaigns', value: collaborations?.length?.toString() || '0', icon: Target, color: 'text-blue-500' },
        { title: 'Active Influencers', value: '0', icon: Users, color: 'text-purple-500' }, // Placeholder for now
        { title: 'Campaign Budget', value: '₹0', icon: IndianRupee, color: 'text-green-500' }, // Placeholder
        { title: 'Avg. ROI', value: '--', icon: Activity, color: 'text-rose-500' },
    ];

    if (isLoading) {
        return <LoadingState message="Loading your dashboard..." />;
    }

    if (isError) {
        return <ErrorState onRetry={refetch} />;
    }

    return (
        <div className="container px-4 py-8 mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-bold">Brand Dashboard</h1>
                    <p className="text-muted-foreground">Monitor your campaigns and influencer partnerships.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => refetch()} title="Refresh Data">
                        <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <Link href={FRONTEND_ROUTES.INFLUENCERS.SEARCH}>
                        <Button variant="premium" className="rounded-xl">
                            <Plus className="h-4 w-4 mr-2" /> Find Influencers
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {platformStats.map((stat, idx) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="glass-enhanced border-none relative overflow-hidden group hover:border-primary/20 transition-all">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                                    {stat.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                                <stat.icon className={`h-8 w-8 ${stat.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Feed */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Latest Proposals</h2>
                        <Link href={FRONTEND_ROUTES.COLLABORATIONS.BASE} className="text-sm text-primary hover:underline">
                            View All
                        </Link>
                    </div>

                    {!collaborations || collaborations.length === 0 ? (
                        <div className="glass-enhanced rounded-3xl p-8">
                            <EmptyState
                                title="No proposals yet"
                                description="Start by finding influencers and creating your first campaign."
                                actionLabel="Explore Influencers"
                                onAction={() => window.location.href = FRONTEND_ROUTES.INFLUENCERS.SEARCH}
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {collaborations?.slice(0, 5).map((collab) => (
                                <CollaborationCard key={collab.id} collaboration={collab} userRole="USER" />
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar Insights */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Insights</h2>
                    <Card className="glass-enhanced border-none">
                        <CardHeader>
                            <CardTitle className="text-lg">Budget Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl bg-white/5">
                                <div className="text-center">
                                    <PieChart className="h-10 w-10 text-muted-foreground opacity-20 mx-auto mb-2" />
                                    <span className="text-xs text-muted-foreground">Analytics Visualization Pending</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
