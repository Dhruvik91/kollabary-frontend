'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    MessageSquare,
    Trophy,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useWallet } from '@/hooks/queries/useWalletQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { RankingGuideCard } from '@/features/influencer/components/RankingGuideCard';
import { useTierGuide } from '@/hooks/queries/useRanking';
import { UserRole } from '@/types/auth.types';
import { FRONTEND_ROUTES, COIN_URL } from '@/constants';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Header component for the authenticated dashboard.
 * Hamburger button removed — mobile navigation is handled by BottomNav.
 * Notification bell replaced with a Messages link.
 */
export const DashboardHeader = () => {
    const { user } = useAuth();
    const { data: wallet, isLoading: isWalletLoading } = useWallet();
    const [isRankingModalOpen, setIsRankingModalOpen] = useState(false);
    const { data: tierGuide } = useTierGuide();

    const isInfluencer = user?.role === UserRole.INFLUENCER;
    const profileHref = isInfluencer
        ? FRONTEND_ROUTES.DASHBOARD.INFLUENCER_PROFILE
        : FRONTEND_ROUTES.DASHBOARD.PROFILE;

    return (
        <header className="sticky top-0 inset-x-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="flex items-center gap-4">
                <Link 
                    href={profileHref} 
                    className="lg:hidden flex items-center justify-center h-10 w-10 rounded-xl hover:bg-accent/50 transition-all shrink-0"
                >
                    <Avatar className="h-9 w-9 border border-border/50 shrink-0 shadow-sm">
                        <AvatarImage src={user?.profile?.avatarUrl || user?.profile?.profileImage || user?.influencerProfile?.avatarUrl} alt={user?.profile?.fullName || 'User'} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold uppercase">
                            {(user?.profile?.fullName || user?.email || 'U').charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </Link>

                <div className="flex items-center gap-4 max-w-xl invisible hidden sm:flex">
                    <div className="relative group flex-grow items-center">
                        <Search className="absolute left-3 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                        <Input
                            placeholder="Search..."
                            className="pl-10 h-10 bg-muted/50 border-transparent focus-visible:bg-background focus-visible:ring-primary/20 transition-all rounded-xl w-full"
                        />
                    </div>

                    {/* Mobile Search Button icon instead of full bar */}
                    <Button variant="ghost" size="icon" className="sm:hidden text-muted-foreground h-10 w-10">
                        <Search size={20} />
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                {isInfluencer && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="hidden lg:flex gap-2 rounded-xl border-dashed hover:border-primary hover:text-primary transition-all"
                        onClick={() => setIsRankingModalOpen(true)}
                    >
                        <Trophy size={16} />
                        Ranking Guide
                    </Button>
                )}

                <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                        <Link href={FRONTEND_ROUTES.DASHBOARD.EARNINGS} className="flex-shrink-0">
                            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/10 hover:border-primary/20 transition-all cursor-pointer group">
                                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center p-1 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                    <Image
                                        src={COIN_URL}
                                        alt="KC"
                                        width={28}
                                        height={28}
                                        priority={true}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                {isWalletLoading ? (
                                    <Skeleton className="h-5 w-10 rounded-md bg-primary/10" />
                                ) : (
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm font-bold tracking-tight text-foreground/90 tabular-nums">
                                            {(wallet?.balance ?? 0).toLocaleString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs text-xs font-semibold">
                        K Coins: Platform currency used for transactions and rewards.
                    </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                        <div>
                            <ThemeToggle />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs font-semibold">
                        Switch Theme
                    </TooltipContent>
                </Tooltip>

                {/* Ranking Guide Modal */}
                <AnimatedModal
                    isOpen={isRankingModalOpen}
                    onClose={() => setIsRankingModalOpen(false)}
                    title="Ranking System Guide"
                    description="Learn how to climb the ranks and unlock higher tiers"
                    size="xl"
                >
                    {tierGuide ? (
                        <RankingGuideCard guideData={tierGuide} />
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            Loading ranking guide...
                        </div>
                    )}
                </AnimatedModal>

                <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                        <Link
                            href={FRONTEND_ROUTES.DASHBOARD.MESSAGES}
                            className="relative inline-flex items-center justify-center h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors group block lg:hidden"
                            aria-label="Messages"
                        >
                            <MessageSquare size={20} />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background group-hover:scale-110 transition-transform" />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs font-semibold">
                        Messages
                    </TooltipContent>
                </Tooltip>
            </div>
        </header>
    );
};
