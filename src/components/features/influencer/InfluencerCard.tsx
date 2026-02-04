"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Youtube, Twitter, ExternalLink, Users, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InfluencerProfile } from "@/types/influencer";
import Image from "next/image";
import { User, Loader2 } from "lucide-react"; // Fallback icon

interface InfluencerCardProps {
    influencer: InfluencerProfile;
    index?: number;
}

const platformIcons: Record<string, React.ReactNode> = {
    instagram: <Instagram className="w-4 h-4" />,
    youtube: <Youtube className="w-4 h-4" />,
    twitter: <Twitter className="w-4 h-4" />,
    tiktok: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
    ),
};

function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
}

export function InfluencerCard({ influencer, index = 0 }: InfluencerCardProps) {
    // Safely access user profile data
    const userProfile = (influencer.user as any)?.profile;
    const name = userProfile?.fullName || userProfile?.username || 'Influencer';
    const username = userProfile?.username || 'user';
    const avatar = userProfile?.profileImage || userProfile?.avatarUrl || null;
    const niches = influencer.niche ? [influencer.niche] : [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <GlassCard className="group overflow-hidden hover:border-primary/50 transition-all duration-300">
                {/* Header with avatar */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-16 h-16 bg-secondary/50 rounded-xl flex items-center justify-center overflow-hidden">
                        {avatar ? (
                            <Image
                                src={avatar}
                                alt={name}
                                fill
                                className="object-cover ring-2 ring-glass-border group-hover:ring-primary/50 transition-all"
                                sizes="64px"
                            />
                        ) : (
                            <User className="w-8 h-8 text-muted-foreground" />
                        )}
                        {influencer.verified && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full gradient-bg flex items-center justify-center z-10">
                                <svg className="w-3 h-3 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-lg truncate">{name}</h3>
                        <p className="text-muted-foreground text-sm">@{username}</p>
                    </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">
                    {influencer.bio || 'No bio available.'}
                </p>

                {/* Stats */}
                <div className="flex gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{formatNumber(influencer.followersCount || 0)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium">{influencer.engagementRate || 0}%</span>
                    </div>
                </div>

                {/* Platforms */}
                {influencer.platforms && (
                    <div className="flex gap-2 mb-4">
                        {influencer.platforms.map((platform) => (
                            <div
                                key={platform}
                                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                            >
                                {platformIcons[platform.toLowerCase()] || <ExternalLink className="w-4 h-4" />}
                            </div>
                        ))}
                    </div>
                )}

                {/* Niches */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {niches.map((niche) => (
                        <Badge
                            key={niche}
                            variant="secondary"
                            className="bg-secondary/80 text-xs"
                        >
                            {niche}
                        </Badge>
                    ))}
                </div>

                {/* CTA */}
                <Button
                    asChild
                    className="w-full gradient-bg border-0 group-hover:glow-primary transition-all"
                >
                    <Link href={`/influencers/${influencer.id}`}>View Profile</Link>
                </Button>
            </GlassCard>
        </motion.div>
    );
}
