'use client';

import { useAuth } from '@/contexts/auth-context';
import {
    Loader2,
    User,
    Shield,
    CheckCircle2,
    Calendar,
    TrendingUp,
    Zap,
    Star,
    Trophy,
    ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MetricCard } from '../components/MetricCard';
import { AccountDetailCard } from '../components/AccountDetailCard';
import { UserRole } from '@/types/auth.types';
import { useMyInfluencerProfile } from '@/hooks/queries/useInfluencerQueries';
import { useRankingBreakdown } from '@/hooks/queries/useRanking';
import { RankingScoreCard } from '@/features/influencer/components/RankingScoreCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FRONTEND_ROUTES } from '@/constants';
import Link from 'next/link';

export const DashboardOverviewContainer = () => {
    const { user, isLoading: isAuthLoading } = useAuth();

    const isInfluencer = user?.role === UserRole.INFLUENCER;

    const { data: profile, isLoading: isProfileLoading } = useMyInfluencerProfile(isInfluencer);
    const { data: ranking, isLoading: isRankingLoading } = useRankingBreakdown(user?.id || '', isInfluencer);

    const isLoading = isAuthLoading || (isInfluencer && (isProfileLoading || isRankingLoading));

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground font-bold uppercase tracking-widest animate-pulse">Loading your dashboard...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 md:space-y-12 max-w-7xl mx-auto pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 text-primary"
                    >
                        <Trophy size={20} />
                        <span className="text-sm font-black uppercase tracking-[0.2em]">Dashboard Overview</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter"
                    >
                        Welcome, <span className="text-primary italic">{user?.email.split('@')[0]}</span>
                    </motion.h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        {isInfluencer
                            ? "Track your influence, manage collaborations, and grow your creator brand."
                            : "Manage your account settings and explore the Kollabary network."}
                    </p>
                </div>

                {isInfluencer && (
                    <Link href={FRONTEND_ROUTES.DASHBOARD.DISCOVER}>
                        <Button className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all gap-2">
                            Explore Creators
                            <ArrowUpRight size={20} />
                        </Button>
                    </Link>
                )}
            </header>

            {isInfluencer ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Core Metrics Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <MetricCard
                                label="Average Rating"
                                value={profile?.avgRating || "0.0"}
                                icon={Star}
                                color="text-yellow-500"
                                subtitle={`Based on ${profile?.totalReviews || 0} reviews`}
                            />
                            <MetricCard
                                label="Response Speed"
                                value={`${ranking?.responseSpeed?.hours || 24}h`}
                                icon={Zap}
                                color="text-purple-500"
                                subtitle="Avg. time to respond to requests"
                            />
                            <MetricCard
                                label="Completion Rate"
                                value={`${ranking?.completionRate?.percentage || 0}%`}
                                icon={CheckCircle2}
                                color="text-emerald-500"
                                subtitle="Successfully completed projects"
                            />
                            <MetricCard
                                label="Total Reach"
                                value={Intl.NumberFormat('en', { notation: 'compact' }).format(profile?.followersCount || 0)}
                                icon={TrendingUp}
                                color="text-blue-500"
                                subtitle="Combined platform followers"
                            />
                        </div>

                        {/* Recent Activity Placeholder or Quick Stats */}
                        <Card className="rounded-[2.5rem] border-border/50 bg-card/30 backdrop-blur-md overflow-hidden">
                            <div className="p-6 border-b border-border/50 bg-muted/30 flex items-center justify-between">
                                <h3 className="font-bold tracking-tight">Recent Performance</h3>
                                <Link href="#" className="text-xs font-bold text-primary hover:underline">View Analytics</Link>
                            </div>
                            <CardContent className="p-12 flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center text-primary/30">
                                    <TrendingUp size={32} />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-bold">Growth Tracking</p>
                                    <p className="text-sm text-muted-foreground">Your performance data is being aggregated. Check back soon for detailed insights.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        {ranking && <RankingScoreCard breakdown={ranking} />}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricCard label="Role" value={user?.role || ''} icon={Shield} color="text-blue-500" />
                    <MetricCard label="Status" value={user?.status || ''} icon={CheckCircle2} color="text-emerald-500" />
                    <MetricCard label="Verified" value={user?.emailVerified ? 'Yes' : 'No'} icon={User} color="text-purple-500" />
                    <MetricCard label="Joined" value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''} icon={Calendar} color="text-amber-500" />
                </div>
            )}

            <div className="pt-8 border-t border-border/50">
                <AccountDetailCard email={user?.email} id={user?.id} />
            </div>
        </div>
    );
};
