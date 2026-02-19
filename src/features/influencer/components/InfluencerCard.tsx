'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, Star, TrendingUp, MapPin, CheckCircle2, MessageSquare, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { InfluencerProfile } from '@/types/influencer.types';
import { RankTierBadge } from '@/components/shared/RankTierBadge';
import { Button } from '@/components/ui/button';
import { useStartConversation } from '@/hooks/use-messaging.hooks';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { FRONTEND_ROUTES } from '@/constants';

interface InfluencerCardProps {
    influencer: InfluencerProfile;
}

export const InfluencerCard = ({ influencer }: InfluencerCardProps) => {
    const { user: influencerUser, fullName, niche, platforms, avatarUrl, avgRating, totalReviews, verified, id } = influencer;
    const profile = influencerUser?.profile;
    
    // Calculate total followers from all platforms
    const followersCount = Object.values(platforms || {}).reduce((sum: number, platform: any) => sum + (platform.followers || 0), 0);
    
    // Calculate average engagement rate from platforms
    const platformsWithEngagement = Object.values(platforms || {}).filter((p: any) => p.engagementRate);
    const engagementRate = platformsWithEngagement.length > 0
        ? (platformsWithEngagement.reduce((sum: number, p: any) => sum + (p.engagementRate || 0), 0) / platformsWithEngagement.length).toFixed(1)
        : '0.0';
    
    const displayAvatar = avatarUrl || profile?.avatarUrl;
    const { user: currentUser } = useAuth();
    const { mutate: startConversation, isPending: isStartingChat } = useStartConversation();
    const router = useRouter();

    const handleMessage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        startConversation(influencerUser.id, {
            onSuccess: (conversation) => {
                router.push(`${FRONTEND_ROUTES.DASHBOARD.MESSAGES}?id=${conversation.id}`);
            }
        });
    };

    const isBrand = currentUser?.role === UserRole.USER;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="group overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 rounded-[1.5rem]">
                    <CardContent className="p-0">
                        {/* Avatar & Cover Section */}
                        <div className="relative h-32 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
                            <div className="absolute -bottom-10 left-6">
                                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-background shadow-xl">
                                    {displayAvatar ? (
                                        <Image
                                            src={displayAvatar}
                                            alt={fullName || profile?.fullName || 'Influencer'}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                                            {(fullName || profile?.fullName)?.charAt(0) || '?'}
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
                                <h3 className="text-lg font-bold line-clamp-1">
                                    {fullName || profile?.fullName || 'Unknown Creator'}
                                </h3>
                                <div className="flex items-center justify-between mt-1">
                                    {influencer.rankingTier && (
                                        <RankTierBadge tier={influencer.rankingTier} size="sm" />
                                    )}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg">
                                    {niche}
                                </span>
                                {(influencer.address || profile?.location) && (
                                    <span className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-lg">
                                        <MapPin size={10} />
                                        {influencer.address || profile?.location}
                                    </span>
                                )}
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-2 py-4 border-y border-border/50">
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
                                        <Star size={12} className="text-yellow-500 fill-amber-400" />
                                        <span className="text-[10px] font-medium uppercase tracking-tight">Rating</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <p className="text-sm font-bold">{avgRating}</p>
                                        <span className="text-[10px] text-muted-foreground mr-1">({totalReviews})</span>
                                    </div>
                                </div>
                            </div>

                            {isBrand && (
                                <div className="flex gap-2">
                                    <Button
                                        onClick={handleMessage}
                                        disabled={isStartingChat}
                                        className="flex-1 h-11 rounded-xl font-bold gap-2 shadow-lg shadow-primary/10"
                                    >
                                        <MessageSquare size={16} />
                                        Message
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push(`/influencers/${id}`)}
                                        className="h-11 px-4 rounded-xl font-bold gap-2 border-border/50"
                                    >
                                        <Eye size={16} />
                                        Details
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
        </motion.div>
    );
};
