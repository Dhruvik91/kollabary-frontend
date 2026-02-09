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
import { cn } from '@/lib/utils';


import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';

export function BrandDashboardContainer() {
    const { user } = useAuth();
    const { data: collaborations, isLoading, isError, refetch } = useMyCollaborations();

    const platformStats = [
        { title: 'Total Campaigns', value: collaborations?.length?.toString() || '0', icon: Target, color: 'text-primary' },
        { title: 'Active Influencers', value: '0', icon: Users, color: 'text-accent' },
        { title: 'Campaign Budget', value: '₹0', icon: IndianRupee, color: 'text-primary' },
        { title: 'Avg. ROI', value: '--', icon: Activity, color: 'text-accent' },
    ];

    if (isLoading) {
        return <LoadingState message="Loading your dashboard..." />;
    }

    if (isError) {
        return <ErrorState onRetry={refetch} />;
    }

    return (
        <PageContainer>
            <PageHeader
                title="Brand Dashboard"
                description="Monitor your campaigns and influencer partnerships."
                actions={
                    <>
                        <Button variant="outline" onClick={() => refetch()} title="Refresh Data" className="glass border-glass-border">
                            <RefreshCcw className="h-4 w-4" />
                        </Button>
                        <Link href={FRONTEND_ROUTES.INFLUENCERS.SEARCH}>
                            <Button variant="premium" className="rounded-xl shadow-sm border-0">
                                <Plus className="h-4 w-4 mr-2" /> Find Influencers
                            </Button>
                        </Link>
                    </>
                }
            />

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {platformStats.map((stat, idx) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -5 }}
                    >
                        <Card className="glass shadow-sm border-glass-border relative overflow-hidden group transition-all duration-300">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-widest opacity-70">
                                    {stat.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <div className={`text-3xl font-bold font-display ${stat.color}`}>{stat.value}</div>
                                <div className={cn(
                                    "p-3 rounded-2xl bg-secondary/50 transition-all duration-300 group-hover:scale-110",
                                    stat.color.replace('text-', 'text-opacity-20 ')
                                )}>
                                    <stat.icon className={cn("h-6 w-6", stat.color)} />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Feed */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold font-display">Latest Proposals</h2>
                        <Link href={FRONTEND_ROUTES.COLLABORATIONS.BASE} className="text-sm font-medium text-primary hover:text-accent transition-colors flex items-center gap-1 group">
                            View All
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>

                    {!collaborations || collaborations.length === 0 ? (
                        <div className="glass rounded-3xl p-8 border-glass-border">
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
                    <h2 className="text-2xl font-bold font-display">Insights</h2>
                    <Card className="glass border-glass-border shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-display">Budget Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 flex items-center justify-center border border-dashed border-glass-border rounded-2xl bg-secondary/20">
                                <div className="text-center">
                                    <PieChart className="h-10 w-10 text-muted-foreground opacity-30 mx-auto mb-2" />
                                    <span className="text-xs text-muted-foreground font-medium">Analytics Visualization Pending</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageContainer>
    );
}
