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
        <div className="relative pt-12 md:pt-20">
            {/* Background Flair (Subtle glows, no banner) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-primary/5 rounded-full blur-[120px] -z-10" />
            
            <div className="px-6 md:px-12 relative flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
                {/* Avatar Container with Premium Styling */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative shrink-0"
                >
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-[3rem] p-1.5 bg-linear-to-br from-primary/20 via-border/50 to-secondary/20 shadow-2xl">
                        <div className="w-full h-full rounded-[2.8rem] bg-card overflow-hidden flex items-center justify-center relative group isolate border border-border/50">
                            {avatarUrl ? (
                                <Image
                                    src={avatarUrl}
                                    alt={fullName}
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 128px, 192px"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : (
                                <div className="text-5xl md:text-7xl font-black text-primary/30 uppercase">{fullName?.charAt(0)}</div>
                            )}
                            
                            {/* Verified Badge Overlay */}
                            {verified && (
                                <div className="absolute -bottom-1 -right-1 bg-primary text-white p-2 rounded-2xl shadow-xl border-4 border-background z-20">
                                    <CheckCircle2 size={18} fill="currentColor" />
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                <div className="flex-1 space-y-6">
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3 md:gap-4">
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">
                                {fullName}
                            </h1>
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="px-4 py-1 rounded-xl bg-primary/10 text-primary border-primary/20 font-bold lowercase">
                                    @{username}
                                </Badge>
                                {rankingTier && (
                                    <RankTierBadge tier={rankingTier} size="md" />
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-y-3 gap-x-8 text-muted-foreground/70 font-bold text-sm tracking-tight">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                    <MapPin size={16} className="text-primary" />
                                </div>
                                <span>{location || 'Global'}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                    <Languages size={16} className="text-primary" />
                                </div>
                                <span>{joinedLanguages}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                    <Calendar size={16} className="text-primary" />
                                </div>
                                <span>Active Creator</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                        {categories?.map((cat) => (
                            <Badge key={cat} variant="outline" className="rounded-xl px-5 py-2 bg-card/50 border-border/50 text-xs font-bold hover:border-primary/50 transition-all hover:bg-primary/5 uppercase tracking-widest">
                                {cat}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Actions Section */}
                <div className="md:border-l border-border/50 md:pl-12 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <Link href={FRONTEND_ROUTES.AUTH.LOGIN} className="flex-1">
                            <Button size="lg" className="w-full rounded-2xl h-16 bg-primary text-primary-foreground font-black shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-base gap-3 group relative overflow-hidden px-8">
                                <Zap size={20} className="group-hover:fill-current transition-all" />
                                <span className="relative z-10">Start Collaboration</span>
                            </Button>
                        </Link>
                        <ShareButton
                            type={UserRole.INFLUENCER}
                            id={influencerId}
                            slug={slug}
                            variant="outline"
                            size="lg"
                            className="h-16 w-16 rounded-2xl border-2 border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
