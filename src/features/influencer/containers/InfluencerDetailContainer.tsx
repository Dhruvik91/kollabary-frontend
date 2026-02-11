'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useInfluencerDetail } from '@/hooks/queries/useInfluencerQueries';
import { InfluencerProfileDetail } from '../components/InfluencerProfileDetail';
import { Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const InfluencerDetailContainer = () => {
    const { id } = useParams<{ id: string }>();
    const { data: influencer, isLoading, isError, error } = useInfluencerDetail(id);

    if (isLoading) {
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
                    Fetching creator profile...
                </p>
            </div>
        );
    }

    if (isError || !influencer) {
        return (
            <div className="max-w-2xl mx-auto py-20 text-center space-y-6">
                <div className="w-20 h-20 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
                    <AlertCircle size={40} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-black">Creator Not Found</h2>
                    <p className="text-muted-foreground text-lg">
                        The influencer profile you're looking for might have been moved or doesn't exist in our network anymore.
                    </p>
                </div>
                <button
                    onClick={() => window.history.back()}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <InfluencerProfileDetail influencer={influencer} />
        </motion.div>
    );
};
