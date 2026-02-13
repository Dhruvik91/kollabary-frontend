'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMyInfluencerProfile } from '@/hooks/queries/useInfluencerQueries';
import { useRankingBreakdown } from '@/hooks/queries/useRanking';
import { InfluencerProfileDetail } from '../components/InfluencerProfileDetail';
import { Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FRONTEND_ROUTES } from '@/constants';

/**
 * InfluencerMyProfileContainer
 * Smart container for the logged-in influencer's own profile view.
 */
export const InfluencerMyProfileContainer = () => {
    const router = useRouter();
    const { data: influencer, isLoading: isInfluencerLoading, isError, error } = useMyInfluencerProfile();
    const { data: ranking, isLoading: isRankingLoading } = useRankingBreakdown(influencer?.user.id || '');

    // Handle redirection to setup if profile doesn't exist (e.g., 404 from myProfile)
    useEffect(() => {
        if (isError && (error as any)?.statusCode === 404) {
            router.push(FRONTEND_ROUTES.DASHBOARD.INFLUENCER_SETUP);
        }
    }, [isError, error, router]);

    if (isInfluencerLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="text-primary"
                >
                    <Loader2 size={48} />
                </motion.div>
                <p className="text-xl font-bold tracking-tight animate-pulse text-muted-foreground">
                    Opening your profile...
                </p>
            </div>
        );
    }

    if (isError || !influencer) {
        // If it's not a 404 (handled by useEffect), show error state
        if ((error as any)?.statusCode !== 404) {
            return (
                <div className="max-w-2xl mx-auto py-20 text-center space-y-6">
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
                        <AlertCircle size={40} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black">Something went wrong</h2>
                        <p className="text-muted-foreground text-lg">
                            We couldn't load your profile. Please try again or contact support.
                        </p>
                    </div>
                    <Button
                        onClick={() => window.location.reload()}
                        className="px-8 h-12 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                    >
                        Try Again
                    </Button>
                </div>
            );
        }
        return null; // Redirecting to setup
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <InfluencerProfileDetail
                influencer={influencer}
                ranking={ranking}
                isRankingLoading={isRankingLoading}
                isOwner={true}
            />
        </motion.div>
    );
};
