'use client';

import { useAuth } from '@/providers/auth-provider';
import { useMyCollaborations } from '@/hooks/useCollaborations';
import { motion } from 'framer-motion';
import { Search, Users, Activity, IndianRupee, PieChart, Plus, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CollaborationCard } from '../../collaboration/components/CollaborationCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@/constants/constants';

export function BrandDashboardContainer() {
    const { user } = useAuth();
    const { data: collaborations } = useMyCollaborations();

    const platformStats = [
        { title: 'Total Campaigns', value: '8', icon: Target, color: 'text-blue-500' },
        { title: 'Active Influencers', value: '24', icon: Users, color: 'text-purple-500' },
        { title: 'Campaign Budget', value: '₹12L', icon: IndianRupee, color: 'text-green-500' },
        { title: 'Avg. ROI', value: '3.4x', icon: Activity, color: 'text-rose-500' },
    ];

    return (
        <div className="container px-4 py-8 mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-bold">Brand Dashboard</h1>
                    <p className="text-muted-foreground">Monitor your campaigns and influencer partnerships.</p>
                </div>
                <div className="flex gap-3">
                    <Link href={FRONTEND_ROUTES.INFLUENCERS.SEARCH}>
                        <Button className="rounded-xl">
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
                        <Card className="glass-enhanced border-none relative overflow-hidden group">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                                    {stat.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                                <stat.icon className={`h-8 w-8 ${stat.color} opacity-20`} />
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

                    {collaborations?.length === 0 ? (
                        <div className="text-center py-16 glass-enhanced rounded-3xl">
                            <p className="text-muted-foreground mb-4">You haven't sent any proposals yet.</p>
                            <Link href={FRONTEND_ROUTES.INFLUENCERS.SEARCH}>
                                <Button variant="secondary" className="rounded-xl">Explore Influencers</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {collaborations?.slice(0, 3).map((collab) => (
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
                            <div className="h-48 flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl">
                                <PieChart className="h-10 w-10 text-muted-foreground opacity-20" />
                                <span className="text-xs text-muted-foreground absolute mt-16">Chart Visualization</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
