'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    MapPin,
    CheckCircle2,
    MessageCircle,
    Flag,
    Globe,
    Award,
    TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/services/profile.service';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';

interface BrandDetailHeaderProps {
    brand: UserProfile;
    isStartingChat?: boolean;
    onContact?: () => void;
    onReport?: () => void;
}

export const BrandDetailHeader = ({
    brand,
    isStartingChat,
    onContact,
    onReport
}: BrandDetailHeaderProps) => {
    const { user } = useAuth();
    const isOwner = user?.id === brand.user?.id;

    const stats = brand.stats || {
        totalAuctions: 0,
        activeAuctionsCount: 0,
        completedCollaborations: 0
    };

    return (
        <div className="relative group">
            {/* Premium Animated Banner - Theme Aware */}
            <div className="h-44 sm:h-56 md:h-72 rounded-[2rem] sm:rounded-[3rem] bg-card overflow-hidden relative border border-border/50 shadow-sm">
                {/* Dynamic Brand Gradient Background */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-background to-secondary/10 dark:from-[#1a1c2c] dark:via-[#4a192c] dark:to-[#121212]" />
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[100px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[80px] rounded-full animate-pulse [animation-delay:2s]" />
                <div className="absolute inset-0 opacity-10 dark:opacity-30 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                {/* Geometric Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-20">
                    <div className="absolute top-10 left-1/4 w-px h-64 bg-linear-to-b from-transparent via-primary/50 to-transparent rotate-12" />
                    <div className="absolute top-20 right-1/3 w-px h-80 bg-linear-to-b from-transparent via-secondary/40 to-transparent -rotate-12" />
                </div>

                {/* Glassy reflection at top */}
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {/* Profile Info Overlay */}
            <div className="px-4 sm:px-8 md:px-0 -mt-20 sm:-mt-24 md:-mt-32 lg:-mt-36 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="rounded-[2.5rem] border border-border/50 glass-card-elevated shadow-2xl p-6 sm:p-7 md:p-8 lg:p-10 relative overflow-hidden group/card"
                >
                    {/* Inner glow effect */}
                    <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                    <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 relative z-10">
                        {/* Avatar Section */}
                        <div className="relative shrink-0 mx-auto lg:mx-0">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden p-1 bg-linear-to-br from-primary/40 via-border to-secondary/40 shadow-xl relative z-10"
                            >
                                <div className="w-full h-full rounded-[1.8rem] lg:rounded-[2.3rem] overflow-hidden relative bg-card border border-border/50">
                                    {brand.avatarUrl ? (
                                        <Image
                                            src={brand.avatarUrl}
                                            alt={brand.fullName}
                                            fill
                                            sizes="(max-width: 640px) 112px, (max-width: 1024px) 144px, 176px"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-linear-to-br from-muted to-background flex items-center justify-center text-foreground text-4xl lg:text-5xl font-black italic">
                                            {brand.fullName.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Verification Badge */}
                            <div className="absolute bottom-1 -right-1 sm:bottom-2 sm:-right-2 z-20">
                                <div className="bg-primary shadow-lg shadow-primary/25 text-primary-foreground px-3 py-1 rounded-xl flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest border border-white/10">
                                    <CheckCircle2 size={12} fill="currentColor" className="text-primary-foreground" />
                                    <span>Verified</span>
                                </div>
                            </div>
                        </div>

                        {/* Info Content */}
                        <div className="flex-1 min-w-0 space-y-4 text-center lg:text-left">
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                                        {brand.fullName}
                                    </h1>
                                    <p className="text-muted-foreground font-bold tracking-[0.2em] uppercase text-[9px] sm:text-[10px] lg:text-xs flex items-center justify-center lg:justify-start gap-2 opacity-80">
                                        <Globe size={11} className="text-primary" />
                                        Official Partner · {brand.location || 'Global'}
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                                    {brand.location && (
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/40 border border-border/50 text-muted-foreground">
                                            <MapPin size={13} className="text-primary" />
                                            <span className="text-[10px] sm:text-xs font-bold">{brand.location}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/40 border border-border/50 text-muted-foreground">
                                        <TrendingUp size={13} className="text-secondary" />
                                        <span className="text-[10px] sm:text-xs font-bold">{stats.totalAuctions} Auctions</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/40 border border-border/50 text-muted-foreground">
                                        <Award size={13} className="text-primary" />
                                        <span className="text-[10px] sm:text-xs font-bold">{stats.completedCollaborations} Success</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {!isOwner && (
                                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                                    <Button
                                        onClick={onContact}
                                        disabled={isStartingChat}
                                        className="w-full sm:w-auto px-8 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-black shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest relative overflow-hidden group/btn"
                                    >
                                        <MessageCircle size={18} />
                                        {isStartingChat ? 'Connecting...' : 'Collab Now'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={onReport}
                                        className="w-full sm:w-auto h-12 px-5 bg-background/50 rounded-xl border-border text-muted-foreground hover:text-red-500 hover:bg-red-500/5 hover:border-red-500/20 transition-all font-bold text-xs uppercase tracking-widest"
                                    >
                                        <Flag size={14} className="mr-2" />
                                        Report
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
