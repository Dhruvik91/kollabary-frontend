'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Star, TrendingUp, MapPin, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { InfluencerProfile } from '@/types/influencer.types';

interface InfluencerCardProps {
    influencer: InfluencerProfile;
}

export const InfluencerCard = ({ influencer }: InfluencerCardProps) => {
    const { user, niche, followersCount, engagementRate, avgRating, totalReviews, verified, id } = influencer;
    const { profile } = user;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Link href={`/influencers/${id}`}>
                <Card className="group overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 rounded-[1.5rem]">
                    <CardContent className="p-0">
                        {/* Avatar & Cover Section */}
                        <div className="relative h-32 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
                            <div className="absolute -bottom-10 left-6">
                                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-background shadow-xl">
                                    {profile?.avatarUrl ? (
                                        <Image
                                            src={profile.avatarUrl}
                                            alt={profile.fullName}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                                            {profile?.fullName.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {verified && (
                                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-border/50">
                                    <CheckCircle2 size={16} className="text-blue-500" />
                                </div>
                            )}
                        </div>

                        {/* Content Section */}
                        <div className="pt-12 pb-6 px-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">
                                    {profile?.fullName}
                                </h3>
                                <p className="text-sm text-muted-foreground">@{profile?.username}</p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg">
                                    {niche}
                                </span>
                                {profile?.location && (
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-lg">
                                        <MapPin size={10} />
                                        {profile.location}
                                    </span>
                                )}
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-muted-foreground">
                                        <Users size={12} />
                                        <span className="text-[10px] font-medium uppercase tracking-tight">Followers</span>
                                    </div>
                                    <p className="text-sm font-bold">
                                        {Intl.NumberFormat('en', { notation: 'compact' }).format(followersCount)}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-muted-foreground">
                                        <TrendingUp size={12} />
                                        <span className="text-[10px] font-medium uppercase tracking-tight">Eng. Rate</span>
                                    </div>
                                    <p className="text-sm font-bold text-green-500">{engagementRate}%</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-muted-foreground">
                                        <Star size={12} />
                                        <span className="text-[10px] font-medium uppercase tracking-tight">Rating</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <p className="text-sm font-bold">{avgRating}</p>
                                        <span className="text-[10px] text-muted-foreground mr-1">({totalReviews})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
};
