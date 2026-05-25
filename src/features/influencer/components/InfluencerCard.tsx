'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, MapPin, MessageSquare, Eye, Award, BadgeCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { InfluencerProfile } from '@/types/influencer.types';
import { RankTierBadge } from '@/components/shared/RankTierBadge';
import { Button } from '@/components/ui/button';
import { useStartConversation } from '@/hooks/use-messaging.hooks';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { FRONTEND_ROUTES } from '@/constants';
import { ShareButton } from '@/components/shared/ShareButton';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface InfluencerCardProps {
    influencer: InfluencerProfile;
}

export const InfluencerCard = ({ influencer }: InfluencerCardProps) => {
    const { user: influencerUser, fullName, avatarUrl, avgRating, totalReviews, verified, id, completedCollaborations, categories = [] } = influencer;
    const profile = influencerUser?.profile;

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
            className="h-full"
        >
            <Card className="border-border/40 bg-card/40 glass-card hover:border-primary/20 transition-all duration-500 ease-out rounded-[2rem] h-full flex flex-col border p-0">
                <CardContent className="p-0 flex flex-col flex-1 relative">
                    {/* Header/Cover Image Section */}
                    <div className="relative h-28 w-full overflow-hidden">
                        {/* Modern Gradient Background */}
                        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/5 to-transparent dark:from-primary/10 dark:via-transparent dark:to-transparent rounded-t-[2rem]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb),0.1),transparent_50%)] " />

                        {/* Subtle Pattern */}
                        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />


                    </div>


                    {/* Profile Section with Overlapping Avatar */}
                    <div className="relative px-6 -mt-22 mb-2">
                        <div className="flex justify-between items-end">
                            <div className="relative">
                                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-background/80 backdrop-blur-sm shadow-2xl group-hover:scale-105 transition-transform duration-500 group-hover:border-primary/30">
                                    {displayAvatar ? (
                                        <Image
                                            src={displayAvatar}
                                            alt={fullName || profile?.fullName || 'Influencer'}
                                            fill
                                            sizes="80px"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-linear-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                                            {(fullName || profile?.fullName)?.charAt(0) || '?'}
                                        </div>
                                    )}
                                </div>

                                {/* Status Indicator */}
                                <Tooltip delayDuration={500}>
                                    <TooltipTrigger asChild>
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full border-2 border-background flex items-center justify-center cursor-help">
                                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="text-[10px] font-bold uppercase tracking-wider">
                                        Online
                                    </TooltipContent>
                                </Tooltip>
                            </div>

                            {/* Tier Badge Floating Right */}
                            <div className="pb-1 transition-all duration-500 group-hover:translate-x-1">
                                {influencer.rankingTier && (
                                    <RankTierBadge tier={influencer.rankingTier} size="md" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="pb-6 px-6 space-y-5 flex flex-col flex-1">
                        <div className="space-y-1.5">
                            <h3 className="text-xl font-black tracking-tight line-clamp-1 group-hover:text-primary transition-colors duration-300 flex items-center gap-1.5">
                                {fullName || profile?.fullName || 'Unknown Creator'}
                                {verified && (
                                    <Tooltip delayDuration={300}>
                                        <TooltipTrigger asChild>
                                            <BadgeCheck
                                                size={18}
                                                className="shrink-0 text-primary fill-primary/15 dark:fill-primary/25 cursor-help"
                                                aria-label="Verified Creator"
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="font-bold text-xs">
                                            Verified Creator
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                            </h3>

                            {/* Categories row — up to 3 pills + overflow count */}
                            {categories && categories.length > 0 && (
                                <div className="flex items-center flex-wrap gap-1.5">
                                    {categories.slice(0, 3).map((cat, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/10 dark:bg-primary/15 dark:border-primary/20"
                                        >
                                            {cat}
                                        </span>
                                    ))}
                                    {categories.length > 3 && (
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-muted text-muted-foreground border border-border/50">
                                            +{categories.length - 3}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Address row */}
                            {(influencer.address || profile?.location) && (
                                <div className="flex items-center gap-1 mt-1">
                                    <MapPin size={11} className="text-primary/60 shrink-0" />
                                    <span className="text-[11px] font-medium text-muted-foreground truncate">
                                        {influencer.address || profile?.location}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Stats Grid - Modern Layout */}
                        <div className="grid grid-cols-3 gap-3 p-3 bg-zinc-50/50 dark:bg-white/2 rounded-2xl border border-border/40 mt-auto group-hover:border-primary/20 transition-colors duration-300">
                            <div className="flex flex-col items-center justify-center gap-1 border-r border-border/50">
                                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter">Collabs</span>
                                <Tooltip delayDuration={300}>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center gap-1 cursor-help">
                                            <Award size={12} className="text-primary/70" />
                                            <p className="text-sm font-black italic">{completedCollaborations ?? 0}</p>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">Successfully finished collaborations</TooltipContent>
                                </Tooltip>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1 border-r border-border/50">
                                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter">Rating</span>
                                <Tooltip delayDuration={300}>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center gap-0.5 cursor-help">
                                            <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                            <p className="text-sm font-black italic">{avgRating}</p>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">Average rating from past partners</TooltipContent>
                                </Tooltip>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1">
                                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter">Reviews</span>
                                <Tooltip delayDuration={300}>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center gap-1 cursor-help">
                                            <MessageSquare size={12} className="text-primary/70" />
                                            <p className="text-sm font-black italic">{totalReviews}</p>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">Total partnership reviews received</TooltipContent>
                                </Tooltip>
                            </div>
                        </div>

                        {isBrand && (
                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <Button
                                    onClick={() => router.push(FRONTEND_ROUTES.DASHBOARD.INFLUENCER_DETAIL(id))}
                                    className='h-11 rounded-xl font-black text-xs uppercase tracking-widest gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 active:scale-95 transition-all'
                                >
                                    <Eye size={16} strokeWidth={3} />
                                    Details
                                </Button>
                                <Button
                                    onClick={handleMessage}
                                    disabled={isStartingChat}
                                    variant="outline"
                                    className="h-11 rounded-xl font-black text-xs uppercase tracking-widest gap-2 border-2 hover:bg-zinc-50 dark:hover:bg-white/5 active:scale-95 transition-all shadow-sm"
                                >
                                    <MessageSquare size={16} strokeWidth={3} />
                                    Message
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};
