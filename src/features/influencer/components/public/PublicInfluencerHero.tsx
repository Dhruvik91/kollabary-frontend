'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2, Languages, Calendar, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShareButton } from '@/components/shared/ShareButton';
import { RankTierBadge } from '@/components/shared/RankTierBadge';
import { FRONTEND_ROUTES } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import { UserRole } from '@/types/auth.types';

interface PublicInfluencerHeroProps {
    influencerId: string;
    fullName: string;
    username: string;
    avatarUrl?: string;
    verified?: boolean;
    rankingTier?: string;
    location?: string;
    categories?: string[];
    languages?: string[];
    slug?: string;
}

export const PublicInfluencerHero = ({
    influencerId,
    fullName,
    username,
    avatarUrl,
    verified,
    rankingTier,
    location,
    categories,
    languages,
    slug,
}: PublicInfluencerHeroProps) => {
    const joinedLanguages = languages?.length ? languages.join(', ') : 'English';

    return (
        <div className="relative">
            {/* Banner Gradient */}
            <div className="h-48 md:h-72 rounded-[3rem] bg-linear-to-br from-primary/20 via-primary/5 to-background border border-border/50 overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />

                {/* Animated Particles/Blobs for background flair */}
                <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[120px]" />
            </div>

            {/* Profile Header Wrapper */}
            <div className="px-6 md:px-12 -mt-16 md:-mt-24 relative z-10 flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
                {/* Avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-32 h-32 md:w-52 md:h-52 rounded-[2.5rem] bg-zinc-100 glass-chip border-4 md:border-[10px] border-background shadow-2xl overflow-hidden flex items-center justify-center relative group shrink-0"
                >
                    {avatarUrl ? (
                        <Image
                            src={avatarUrl}
                            alt={fullName}
                            fill
                            priority
                            sizes="(max-width: 768px) 128px, 208px"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="text-5xl md:text-7xl font-black text-primary/30">{fullName?.charAt(0)}</div>
                    )}
                    {verified && (
                        <div className="absolute bottom-4 right-4 bg-primary text-white p-1.5 rounded-full shadow-lg border-4 border-background">
                            <CheckCircle2 size={16} fill="currentColor" className="text-white" />
                        </div>
                    )}
                </motion.div>

                <div className="flex-1 space-y-4 md:pb-6">
                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground drop-shadow-sm">
                                {fullName}
                            </h1>
                            <Badge variant="secondary" className="h-7 px-3 rounded-full bg-primary/10 text-primary border-primary/20 font-bold uppercase tracking-wider text-[10px]">
                                @{username}
                            </Badge>
                            {rankingTier && (
                                <RankTierBadge tier={rankingTier} size="md" />
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-muted-foreground/80 font-bold text-sm tracking-tight">
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-primary" />
                                <span>{location || 'Global'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Languages size={16} className="text-primary" />
                                <span>{joinedLanguages}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-primary" />
                                <span>Active Creator</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories?.map((cat) => (
                            <Badge key={cat} variant="outline" className="rounded-xl px-4 py-1.5 bg-background/50 border-border/50 text-xs font-bold hover:border-primary/50 transition-colors uppercase tracking-widest">
                                {cat}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="md:pb-6 flex flex-col gap-3">
                    <div className="flex gap-3">
                        <Link href={FRONTEND_ROUTES.AUTH.LOGIN} className="flex-1">
                            <Button size="lg" className="w-full rounded-2xl h-14 bg-primary text-primary-foreground font-black shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all text-base gap-3 border-none group">
                                <Zap size={20} className="group-hover:bounce" />
                                Start Collaboration
                            </Button>
                        </Link>
                        <ShareButton
                            type={UserRole.INFLUENCER}
                            id={influencerId}
                            slug={slug}
                            variant="outline"
                            size="lg"
                            className="h-14 w-14 rounded-2xl border-2 hover:bg-primary/5 hover:text-primary transition-all shadow-xl"
                        />
                    </div>
                    <p className="text-[10px] text-center font-black text-muted-foreground/60 uppercase tracking-[0.2em]">
                        Join Kollabary to connect
                    </p>
                </div>
            </div>
        </div>
    );
};
