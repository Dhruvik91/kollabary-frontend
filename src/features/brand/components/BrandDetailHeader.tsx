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
        <div className="relative">
            {/* Premium Banner */}
            <div className="h-44 sm:h-56 md:h-72 rounded-[2rem] sm:rounded-[3rem] bg-linear-to-r from-primary/15 via-primary/8 to-transparent border border-border/50 overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.25),transparent_60%),radial-gradient(circle_at_80%_10%,hsl(var(--primary)/0.15),transparent_50%)]" />
                <div className="absolute inset-0 opacity-20 mask-[radial-gradient(circle_at_center,black,transparent_75%)] bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-size-[48px_48px]" />
                
                {/* Decorative floating elements */}
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 right-20 w-32 h-32 bg-primary/10 blur-3xl rounded-full" 
                />
            </div>

            {/* Profile Info Overlay */}
            <div className="px-4 sm:px-8 -mt-16 sm:-mt-20 md:-mt-28 relative z-10">
                <div className="rounded-[2.5rem] border border-border/50 bg-card/40 glass-card-elevated shadow-2xl shadow-black/5 p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-10">
                        {/* Avatar */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className="relative shrink-0 w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden ring-8 ring-background shadow-2xl"
                        >
                            {brand.avatarUrl ? (
                                <Image
                                    src={brand.avatarUrl}
                                    alt={brand.fullName}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-linear-to-br from-primary to-primary-foreground flex items-center justify-center text-primary-foreground text-4xl lg:text-5xl font-black">
                                    {brand.fullName.charAt(0)}
                                </div>
                            )}
                        </motion.div>

                        {/* Info Content */}
                        <div className="flex-1 min-w-0 space-y-4 lg:pb-2">
                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight truncate max-w-full">
                                        {brand.fullName}
                                    </h1>
                                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                                        <CheckCircle2 size={14} />
                                        Verified Brand
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-medium">
                                    {brand.location && (
                                        <div className="flex items-center gap-2">
                                            <MapPin size={18} className="text-primary" />
                                            <span className="text-sm lg:text-base">{brand.location}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Globe size={18} className="text-primary" />
                                        <span className="text-sm lg:text-base">Official Partner</span>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Chips */}
                            <div className="flex flex-wrap gap-3 pt-2">
                                <div className="bg-primary/5 glass-chip px-4 py-2 rounded-xl border border-primary/10 flex items-center gap-2">
                                    <TrendingUp size={16} className="text-primary" />
                                    <span className="text-xs font-bold uppercase tracking-wider">
                                        <span className="text-foreground mr-1">{stats.totalAuctions}</span>
                                        Auctions
                                    </span>
                                </div>
                                <div className="bg-primary/5 glass-chip px-4 py-2 rounded-xl border border-primary/10 flex items-center gap-2">
                                    <Award size={16} className="text-primary" />
                                    <span className="text-xs font-bold uppercase tracking-wider">
                                        <span className="text-foreground mr-1">{stats.completedCollaborations}</span>
                                        Success
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 sm:gap-4 shrink-0 lg:pb-2">
                            {!isOwner && (
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={onReport}
                                        className="h-14 w-14 lg:h-16 lg:w-16 bg-muted/30 rounded-2xl border-border/50 hover:bg-destructive/10 hover:text-destructive transition-all flex items-center justify-center p-0"
                                        title="Report Brand"
                                    >
                                        <Flag size={20} />
                                    </Button>
                                    <Button
                                        onClick={onContact}
                                        disabled={isStartingChat}
                                        className="flex-1 lg:flex-none px-8 lg:px-10 h-14 lg:h-16 bg-primary text-primary-foreground rounded-2xl font-bold shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3 text-base lg:text-lg"
                                    >
                                        <MessageCircle size={20} />
                                        {isStartingChat ? 'Connecting...' : 'Message'}
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
