'use client';

import React from 'react';
import { usePublicInfluencer } from '@/hooks/queries/usePublicQueries';
import { PublicInfluencerProfile } from '../components/PublicInfluencerProfile';
import { Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface PublicInfluencerProfileContainerProps {
    id: string;
    initialData?: any;
}

export const PublicInfluencerProfileContainer = ({ id, initialData }: PublicInfluencerProfileContainerProps) => {
    const { data, isLoading, isError } = usePublicInfluencer(id, initialData);

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="text-primary p-4 bg-primary/10 rounded-3xl"
                >
                    <Loader2 size={48} />
                </motion.div>
                <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-black tracking-tight">Fetching Creator Profile</h2>
                    <p className="text-muted-foreground font-medium animate-pulse">
                        Connecting to the creator network...
                    </p>
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="max-w-2xl mx-auto py-20 text-center space-y-8">
                <div className="w-24 h-24 bg-destructive/10 rounded-[2rem] flex items-center justify-center mx-auto text-destructive">
                    <AlertCircle size={48} />
                </div>
                <div className="space-y-3">
                    <h2 className="text-3xl font-black tracking-tight">Creator Profile Not Found</h2>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                        This creator profile might have been set to private or moved.
                    </p>
                </div>
                <Button
                    onClick={() => window.history.back()}
                    className="px-8 h-12 bg-primary text-primary-foreground rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                >
                    Go Back
                </Button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <PublicInfluencerProfile
                influencer={data}
                ranking={data.ranking}
                reviews={data.reviews}
                reviewsLoading={false}
            />
        </motion.div>
    );
};
