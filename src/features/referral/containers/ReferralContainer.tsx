'use client';

import React from 'react';
import { useReferralStats } from '@/hooks/queries/useReferralQueries';
import { ReferralCard } from '@/components/shared/ReferralCard';
import { PageHeader } from '@/components/shared/PageHeader';
import { Users, Info, Rocket, Gift, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { COIN_URL } from '@/constants';

export const ReferralContainer = () => {
    const { data: stats, isLoading } = useReferralStats();

    const steps = [
        {
            icon: Rocket,
            title: "Share your Link",
            description: "Copy your unique referral link and share it with your friends or community.",
            color: "text-blue-500",
            bgColor: "bg-blue-500/10"
        },
        {
            icon: Users,
            title: "Friends Join",
            description: "Your friends use the link to sign up and verify their accounts on Kollabary.",
            color: "text-purple-500",
            bgColor: "bg-purple-500/10"
        },
        {
            icon: Gift,
            iconUrl: COIN_URL,
            title: "Earn Rewards",
            description: "Both you and your friend receive K Coins as a bonus for joining our ecosystem.",
            color: "text-emerald-500",
            bgColor: "bg-emerald-500/10"
        }
    ];

    return (
        <div className="space-y-8 pb-20">
            <PageHeader
                label="Referral Program"
                title="Invite creators &"
                highlightedTitle="Earn Rewards"
                subtitle="Help grow the Kollabary community and earn K Coins for every successful referral."
                icon={Users}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <ReferralCard
                        referralCode={stats?.referralCode || ''}
                        totalReferrals={stats?.totalReferrals || 0}
                        successfulReferrals={stats?.successfulReferrals || 0}
                        totalEarned={stats?.totalEarned || 0}
                        loading={isLoading}
                    />
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <Card className="rounded-[2.5rem] border-border/50 glass-card overflow-hidden">
                        <div className="p-8 border-b border-border/50 bg-muted/30">
                            <h3 className="font-bold tracking-tight">How it Works</h3>
                            <p className="text-xs text-muted-foreground mt-1">Simple steps to start earning K Coins</p>
                        </div>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {steps.map((step, idx) => (
                                    <div key={idx} className="space-y-4 relative">
                                        <div className={`w-12 h-12 rounded-2xl ${step.bgColor} ${step.color} flex items-center justify-center p-2.5`}>
                                            {step.iconUrl ? (
                                                <img src={step.iconUrl} alt="" className="w-full h-full object-contain" />
                                            ) : (
                                                <step.icon size={24} />
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-bold text-sm">{step.title}</h4>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                        {idx < 2 && (
                                            <div className="hidden md:block absolute top-6 -right-3 text-muted-foreground/20">
                                                <Rocket size={16} className="rotate-90" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2.5rem] border-border/50 border-dashed bg-transparent p-8">
                        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                                <ShieldCheck size={32} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-bold">Anti-Fraud Protection</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Our referral system uses advanced fraud detection. Rewards are only granted once the referred user verifies their email and completes their profile setup.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
