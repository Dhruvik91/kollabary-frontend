'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    MessageSquare,
    Trophy,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { RankingGuideCard } from '@/features/influencer/components/RankingGuideCard';
import { useTierGuide } from '@/hooks/queries/useRanking';
import { UserRole } from '@/types/auth.types';
import { FRONTEND_ROUTES } from '@/constants';
import { ThemeToggle } from '@/components/ui/theme-toggle';

/**
 * Header component for the authenticated dashboard.
 * Hamburger button removed — mobile navigation is handled by BottomNav.
 * Notification bell replaced with a Messages link.
 */
export const DashboardHeader = () => {
    const { user } = useAuth();
    const [isRankingModalOpen, setIsRankingModalOpen] = useState(false);
    const { data: tierGuide } = useTierGuide();

    const isInfluencer = user?.role === UserRole.INFLUENCER;

    return (
        <header className="sticky top-0 right-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="flex items-center gap-4 flex-grow max-w-xl">
                <div className="relative group flex-grow hidden sm:flex items-center">
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

                <ThemeToggle />

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

                <Link
                    href={FRONTEND_ROUTES.DASHBOARD.MESSAGES}
                    className="relative inline-flex items-center justify-center h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors group"
                    aria-label="Messages"
                >
                    <MessageSquare size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background group-hover:scale-110 transition-transform" />
                </Link>
            </div>
        </header>
    );
};
