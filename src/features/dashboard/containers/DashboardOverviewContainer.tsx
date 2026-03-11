'use client';

import { useAuth } from '@/contexts/auth-context';
import {
    Loader2,
    Shield,
    CheckCircle2,
    TrendingUp,
    Star,
    Trophy,
    ArrowUpRight,
    Briefcase,
    Clock,
    Handshake,
    Search,
    MessageSquare,
    FolderOpen,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MetricCard } from '../components/MetricCard';
import { AccountDetailCard } from '../components/AccountDetailCard';
import { UserRole } from '@/types/auth.types';
import { CollaborationStatus } from '@/types/collaboration.types';
import { useMyInfluencerProfile } from '@/hooks/queries/useInfluencerQueries';
import { useRankingBreakdown } from '@/hooks/queries/useRanking';
import { useCollaborations } from '@/hooks/use-collaboration.hooks';
import { RankingScoreCard } from '@/features/influencer/components/RankingScoreCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FRONTEND_ROUTES } from '@/constants';
import Link from 'next/link';

export const DashboardOverviewContainer = () => {
    const { user, isLoading: isAuthLoading } = useAuth();

    const isInfluencer = user?.role === UserRole.INFLUENCER;
    const isUser = user?.role === UserRole.USER;

    const { data: profile, isLoading: isProfileLoading } = useMyInfluencerProfile(isInfluencer);
    const { data: ranking, isLoading: isRankingLoading } = useRankingBreakdown(user?.id || '', isInfluencer);

    // Collaboration data for USER role
    const { data: allCollabs, isLoading: isAllCollabsLoading } = useCollaborations(isUser ? {} : undefined, isUser);
    const { data: activeCollabs, isLoading: isActiveCollabsLoading } = useCollaborations(
        isUser ? { status: CollaborationStatus.IN_PROGRESS } : undefined, isUser
    );
    const { data: completedCollabs, isLoading: isCompletedCollabsLoading } = useCollaborations(
        isUser ? { status: CollaborationStatus.COMPLETED } : undefined, isUser
    );
    const { data: pendingCollabs, isLoading: isPendingCollabsLoading } = useCollaborations(
        isUser ? { status: CollaborationStatus.REQUESTED } : undefined, isUser
    );

    const totalCollabs = allCollabs?.pages?.[0]?.meta?.total ?? 0;
    const activeCount = activeCollabs?.pages?.[0]?.meta?.total ?? 0;
    const completedCount = completedCollabs?.pages?.[0]?.meta?.total ?? 0;
    const pendingCount = pendingCollabs?.pages?.[0]?.meta?.total ?? 0;

    const isUserCollabsLoading = isUser && (isAllCollabsLoading || isActiveCollabsLoading || isCompletedCollabsLoading || isPendingCollabsLoading);
    const isLoading = isAuthLoading || (isInfluencer && (isProfileLoading || isRankingLoading)) || isUserCollabsLoading;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground font-bold uppercase tracking-widest animate-pulse">Loading your dashboard...</p>
            </div>
        );
    }

    const quickActions = [
        {
            label: 'Explore Creators',
            description: 'Discover talented influencers to collaborate with',
            href: FRONTEND_ROUTES.DASHBOARD.INFLUENCERS,
            icon: Search,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
        },
        {
            label: 'My Collaborations',
            description: 'Manage and track all your collaboration projects',
            href: FRONTEND_ROUTES.DASHBOARD.COLLABORATIONS,
            icon: FolderOpen,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
        },
        {
            label: 'Messages',
            description: 'Chat with creators and manage conversations',
            href: FRONTEND_ROUTES.DASHBOARD.MESSAGES,
            icon: MessageSquare,
            color: 'text-emerald-500',
            bgColor: 'bg-emerald-500/10',
        },
    ];

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
                            : "Discover creators, manage collaborations, and grow your brand."}
                    </p>
                </div>

                {!isInfluencer && (
                    <Link href={FRONTEND_ROUTES.DASHBOARD.INFLUENCERS}>
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
                                label="Completed Collaborations"
                                value={ranking?.completedCollaborations?.count || 0}
                                icon={CheckCircle2}
                                color="text-blue-500"
                                subtitle={`${ranking?.completedCollaborations?.score || 0} ranking points`}
                            />
                            <MetricCard
                                label="Verification Status"
                                value={profile?.verified ? "Verified" : "Not Verified"}
                                icon={Shield}
                                color={profile?.verified ? "text-emerald-500" : "text-amber-500"}
                                subtitle={profile?.verified ? "+50 bonus points" : "Verify to unlock higher tiers"}
                            />
                            <MetricCard
                                label="Average Rating"
                                value={profile?.avgRating || "0.0"}
                                icon={Star}
                                color="text-yellow-500"
                                subtitle={`Based on ${profile?.totalReviews || 0} reviews`}
                            />
                            <MetricCard
                                label="Total Reach"
                                value={Intl.NumberFormat('en', { notation: 'compact' }).format(
                                    profile?.platforms
                                        ? Object.values(profile.platforms).reduce((sum, platform) => sum + (platform.followers || 0), 0)
                                        : 0
                                )}
                                icon={TrendingUp}
                                color="text-purple-500"
                                subtitle="Combined platform followers"
                            />
                        </div>

                        {/* Recent Activity Placeholder or Quick Stats */}
                        <Card className="rounded-[2.5rem] border-border/50 backdrop-blur-md overflow-hidden">
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
                <div className="space-y-8">
                    {/* USER Metrics Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <MetricCard
                            label="Total Collaborations"
                            value={totalCollabs}
                            icon={Briefcase}
                            color="text-blue-500"
                            subtitle="All-time collaboration requests"
                        />
                        <MetricCard
                            label="Active Projects"
                            value={activeCount}
                            icon={Handshake}
                            color="text-emerald-500"
                            subtitle="Currently in progress"
                        />
                        <MetricCard
                            label="Completed"
                            value={completedCount}
                            icon={CheckCircle2}
                            color="text-purple-500"
                            subtitle="Successfully finished"
                        />
                        <MetricCard
                            label="Pending Requests"
                            value={pendingCount}
                            icon={Clock}
                            color="text-amber-500"
                            subtitle="Awaiting creator response"
                        />
                    </div>

                    {/* Quick Actions Card */}
                    <Card className="rounded-[2.5rem] border-border/50 backdrop-blur-md overflow-hidden">
                        <div className="p-6 border-b border-border/50 bg-muted/30">
                            <h3 className="font-bold tracking-tight">Quick Actions</h3>
                            <p className="text-sm text-muted-foreground mt-1">Jump right into what matters most</p>
                        </div>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {quickActions.map((action) => (
                                    <Link key={action.href} href={action.href}>
                                        <motion.div
                                            whileHover={{ y: -4, scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="group p-5 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
                                        >
                                            <div className={`w-11 h-11 rounded-xl ${action.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                                <action.icon size={20} className={action.color} />
                                            </div>
                                            <h4 className="font-bold text-sm tracking-tight mb-1">{action.label}</h4>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{action.description}</p>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* <div className="pt-8 border-t border-border/50">
                <AccountDetailCard email={user?.email} id={user?.id} />
            </div> */}
        </div>
    );
};
