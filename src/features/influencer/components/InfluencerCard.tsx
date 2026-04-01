'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, MapPin, CheckCircle2, MessageSquare, Eye, Award, ShieldCheck, Crown } from 'lucide-react';
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
    const { user: influencerUser, fullName, niche, platforms, avatarUrl, avgRating, totalReviews, verified, id, completedCollaborations } = influencer;
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
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-linear-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                                            {(fullName || profile?.fullName)?.charAt(0) || '?'}
                                        </div>
                                    )}
                                </div>
                                
                                {/* Verified Stamp on Avatar */}
                                {verified && (
                                    <div className="absolute -top-3 -right-3 z-20 pointer-events-none animate-in fade-in zoom-in duration-500">
                                        <div className="relative rotate-12 group-hover:rotate-[5deg] group-hover:scale-110 transition-all duration-700">
                                            {/* Prismatic Outer Glow */}
                                            <div className="absolute inset-[-4px] bg-linear-to-tr from-cyan-500/40 via-blue-500/40 to-purple-500/40 rounded-full blur-lg opacity-60 animate-pulse" />
                                            
                                            {/* Minimalist Glass Seed */}
                                            <div className="relative w-10 h-10 bg-slate-950/60 backdrop-blur-xl border border-white/30 rounded-xl flex items-center justify-center shadow-xl">
                                                <ShieldCheck size={14} className="text-white fill-blue-400/20" />
                                                {/* Corner Accent */}
                                                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-blue-400 rounded-tr-sm opacity-60" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* Status Indicator */}
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full border-2 border-background flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                                </div>
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
                            <h3 className="text-xl font-black tracking-tight line-clamp-1 group-hover:text-primary transition-colors duration-300">
                                {fullName || profile?.fullName || 'Unknown Creator'}
                            </h3>

                            {/* Tags / Badges */}
                            <div className="flex flex-wrap gap-1.5">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/10">
                                    {niche}
                                </span>
                                {(influencer.address || profile?.location) && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 border border-transparent">
                                        <MapPin size={10} className="text-primary/60" />
                                        {influencer.address || profile?.location}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Stats Grid - Modern Layout */}
                        <div className="grid grid-cols-3 gap-3 p-3 bg-zinc-50/50 dark:bg-white/[0.02] rounded-2xl border border-border/40 mt-auto group-hover:border-primary/20 transition-colors duration-300">
                            <div className="flex flex-col items-center justify-center gap-1 border-r border-border/50">
                                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter">Collabs</span>
                                <div className="flex items-center gap-1">
                                    <Award size={12} className="text-primary/70" />
                                    <p className="text-sm font-black italic">{completedCollaborations ?? 0}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1 border-r border-border/50">
                                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter">Rating</span>
                                <div className="flex items-center gap-0.5">
                                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                    <p className="text-sm font-black italic">{avgRating}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1">
                                <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter">Reviews</span>
                                <div className="flex items-center gap-1">
                                    <MessageSquare size={12} className="text-primary/70" />
                                    <p className="text-sm font-black italic">{totalReviews}</p>
                                </div>
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
