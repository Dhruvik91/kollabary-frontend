'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Handshake,
    ShieldCheck,
    Star,
    UserCheck,
    UserPlus,
    Activity,
    CheckCircle2,
    XCircle,
    Clock,
    PieChart
} from 'lucide-react';
import { AdminStats } from '@/types/admin.types';
import { cn } from '@/lib/utils';

interface SectionItem {
    label: string;
    value: string | number;
    icon: React.ElementType;
    highlight?: boolean;
    isRating?: boolean;
}

interface AdminDetailGridProps {
    stats: AdminStats | undefined;
}

export function AdminDetailGrid({ stats }: AdminDetailGridProps) {
    if (!stats) return null;

    const sections: {
        title: string;
        icon: React.ElementType;
        color: string;
        bg: string;
        items: SectionItem[];
    }[] = [
            {
                title: 'User Distribution',
                icon: Users,
                color: 'text-blue-500',
                bg: 'bg-blue-500/10',
                items: [
                    { label: 'Regular Users', value: stats.users.regularUsers, icon: UserPlus },
                    { label: 'Influencers', value: stats.users.influencers, icon: UserCheck },
                    { label: 'Admins', value: stats.users.admins, icon: ShieldCheck },
                    { label: 'New (This Week)', value: stats.users.newUsersThisWeek, icon: Activity, highlight: true }
                ]
            },
            {
                title: 'Collaboration Health',
                icon: Handshake,
                color: 'text-indigo-500',
                bg: 'bg-indigo-500/10',
                items: [
                    { label: 'Completed', value: stats.collaborations.completedCollaborations, icon: CheckCircle2 },
                    { label: 'Active', value: stats.collaborations.activeCollaborations, icon: Activity },
                    { label: 'Pending', value: stats.collaborations.pendingRequests, icon: Clock },
                    { label: 'Comp. Rate', value: `${stats.collaborations.completionRate}%`, icon: PieChart, highlight: true }
                ]
            },
            {
                title: 'Verification Engine',
                icon: ShieldCheck,
                color: 'text-emerald-500',
                bg: 'bg-emerald-500/10',
                items: [
                    { label: 'Approved', value: stats.verifications.approvedRequests, icon: CheckCircle2 },
                    { label: 'Rejected', value: stats.verifications.rejectedRequests, icon: XCircle },
                    { label: 'Pending', value: stats.verifications.pendingRequests, icon: Clock },
                    { label: 'Appr. Rate', value: `${stats.verifications.approvalRate}%`, icon: PieChart, highlight: true }
                ]
            },
            {
                title: 'Review Analytics',
                icon: Star,
                color: 'text-amber-500',
                bg: 'bg-amber-500/10',
                items: [
                    { label: 'Average Rating', value: stats.reviews.averageRating, icon: Star, isRating: true },
                    { label: 'Total Reviews', value: stats.reviews.totalReviews, icon: Activity },
                    { label: 'This Week', value: stats.reviews.reviewsThisWeek, icon: Clock },
                    { label: 'This Month', value: stats.reviews.reviewsThisMonth, icon: Clock, highlight: true }
                ]
            }
        ];

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {sections.map((section, idx) => (
                <motion.div
                    key={section.title}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.04 * idx }}
                    className="rounded-2xl border border-border/50 bg-card/50 glass-card p-6 shadow-sm hover:shadow-md transition-all"
                >
                    <div className="mb-6 flex items-center gap-3">
                        <div className={cn("rounded-xl p-2", section.bg, section.color)}>
                            <section.icon size={20} />
                        </div>
                        <h3 className="text-lg font-semibold">{section.title}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {section.items.map((item) => (
                            <div
                                key={item.label}
                                className={cn(
                                    "bg-zinc-100 dark:bg-white/[0.06] p-3 rounded-xl text-center transition-colors"
                                )}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <item.icon size={14} className="text-muted-foreground" />
                                    <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className={cn(
                                        "text-xl font-bold tracking-tight",
                                        item.highlight && "text-primary"
                                    )}>
                                        {item.value}
                                    </span>
                                    {item.isRating && <Star size={12} className="fill-amber-400 text-amber-400" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
