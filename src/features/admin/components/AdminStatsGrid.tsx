'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Handshake, Briefcase, CheckCircle, Star } from 'lucide-react';
import { AdminStatCard } from './AdminStatCard';
import { AdminStats } from '@/types/admin.types';

interface AdminStatsGridProps {
    stats: AdminStats | undefined;
}

export function AdminStatsGrid({ stats }: AdminStatsGridProps) {
    const statCards = [
        {
            title: 'Total Platform Users',
            value: stats?.users.regularUsers || 0,
            icon: Users,
            trend: 'up' as const,
            trendValue: `${stats?.users.newUsersThisWeek} new`,
            colorClass: 'bg-blue-600'
        },
        {
            title: 'Active Collaborations',
            value: stats?.collaborations.activeCollaborations || 0,
            icon: Handshake,
            trend: 'up' as const,
            trendValue: `${stats?.collaborations.completionRate}% rate`,
            colorClass: 'bg-indigo-600'
        },
        {
            title: 'Pending Verifications',
            value: stats?.verifications.pendingRequests || 0,
            icon: CheckCircle,
            trend: 'down' as const,
            trendValue: `${stats?.verifications.approvalRate}% appr.`,
            colorClass: 'bg-emerald-600'
        },
        {
            title: 'Average Rating',
            value: stats?.reviews.averageRating || 0,
            icon: Star,
            trend: 'up' as const,
            trendValue: `${stats?.reviews.totalReviews} total`,
            colorClass: 'bg-amber-600'
        }
    ];

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card, idx) => (
                <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                >
                    <AdminStatCard {...card} />
                </motion.div>
            ))}
        </div>
    );
}
