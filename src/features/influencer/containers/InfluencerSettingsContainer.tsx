'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMyInfluencerProfile } from '@/hooks/queries/useInfluencerQueries';
import { useMyVerificationStatus } from '@/hooks/queries/useVerificationQueries';
import { InfluencerSettingsView } from '../components/InfluencerSettingsView';
import { Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FRONTEND_ROUTES } from '@/constants';

/**
 * InfluencerSettingsContainer
 * Smart container that fetches all data required for the settings page.
 */
export const InfluencerSettingsContainer = () => {
    const router = useRouter();
    const { data: influencer, isLoading: isInfluencerLoading, isError, error } = useMyInfluencerProfile();
    const { data: verificationRequests } = useMyVerificationStatus();

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
                    Loading settings...
                </p>
            </div>
        );
    }

    if (isError || !influencer) {
        if ((error as any)?.statusCode !== 404) {
            return (
                <div className="max-w-2xl mx-auto py-20 text-center space-y-6">
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
                        <AlertCircle size={40} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black">Something went wrong</h2>
                        <p className="text-muted-foreground text-lg">
                            We couldn&apos;t load your settings. Please try again or contact support.
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
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <InfluencerSettingsView
                influencer={influencer}
                verificationRequests={verificationRequests}
            />
        </motion.div>
    );
};

