'use client';

import { useAuth } from '@/providers/auth-provider';
import { useMyCollaborations } from '@/hooks/useCollaborations';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, MessageSquare, IndianRupee, TrendingUp, Star, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CollaborationCard } from '../../collaboration/components/CollaborationCard';
import { Badge } from '@/components/ui/badge';

export function InfluencerDashboardContainer() {
    const { user } = useAuth();
    const { data: collaborations } = useMyCollaborations();

    const stats = [
        { title: 'Active Projects', value: '12', icon: LayoutDashboard, color: 'text-blue-500' },
        { title: 'Total Earnings', value: '₹4.5L', icon: IndianRupee, color: 'text-green-500' },
        { title: 'Pending Requests', value: '5', icon: Clock, color: 'text-yellow-500' },
        { title: 'Success Rate', value: '98%', icon: TrendingUp, color: 'text-purple-500' },
    ];

    return (
        <div className="container px-4 py-8 mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
                    <p className="text-muted-foreground">Here's what's happening with your collaborations today.</p>
                </div>
                <Badge variant="outline" className="h-fit py-1.5 px-4 rounded-full border-primary/20 bg-primary/5 text-primary">
                    <Star className="h-3 w-3 mr-2 fill-primary" /> Premium Influencer
                </Badge>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="glass-enhanced border-none overflow-hidden relative group">
                            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform`}>
                                <stat.icon className="h-12 w-12" />
                            </div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                    {stat.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Recent Collaborations */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Recent Requests</h2>
                    <button className="text-sm text-primary hover:underline">View all</button>
                </div>

                {collaborations?.length === 0 ? (
                    <div className="text-center py-12 glass-enhanced rounded-3xl opacity-60">
                        <p>No recent requests found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {collaborations?.slice(0, 4).map((collab) => (
                            <CollaborationCard key={collab.id} collaboration={collab} userRole="INFLUENCER" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
