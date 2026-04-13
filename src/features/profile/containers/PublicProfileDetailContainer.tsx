'use client';

import React from 'react';
import { usePublicBrand } from '@/hooks/queries/usePublicQueries';
import { PublicProfileDetail } from '../components/PublicProfileDetail';
import { Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface PublicProfileDetailContainerProps {
    id: string;
}

export const PublicProfileDetailContainer = ({ id }: PublicProfileDetailContainerProps) => {
    const { data, isLoading, isError } = usePublicBrand(id);

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
                    <h2 className="text-2xl font-black tracking-tight">Loading Brand Profile</h2>
                    <p className="text-muted-foreground font-medium animate-pulse">
                        Fetching the latest campaign data...
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
                    <h2 className="text-3xl font-black tracking-tight">Brand Not Found</h2>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                        We couldn't find the brand profile you're looking for.
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
            <PublicProfileDetail profile={data} />
        </motion.div>
    );
};
