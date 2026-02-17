'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMyProfile } from '@/hooks/queries/useProfileQueries';
import { ProfileDetail } from '../components/ProfileDetail';
import { Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FRONTEND_ROUTES } from '@/constants';

/**
 * ProfileDetailContainer
 * Smart container for the logged-in user's own profile view.
 */
export const ProfileDetailContainer = () => {
    const router = useRouter();
    const { data: profile, isLoading, isError, error } = useMyProfile();

    // Handle redirection to setup if profile doesn't exist
    useEffect(() => {
        if (isError && (error as any)?.response?.status === 404) {
            router.push(FRONTEND_ROUTES.DASHBOARD.PROFILE_SETUP);
        }
    }, [isError, error, router]);

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
                    <h2 className="text-2xl font-black tracking-tight">Loading Profile</h2>
                    <p className="text-muted-foreground font-medium animate-pulse">
                        Just a moment while we fetch your details...
                    </p>
                </div>
            </div>
        );
    }

    if (isError || !profile) {
        // If it's not a 404 (handled by useEffect), show error state
        if ((error as any)?.response?.status !== 404) {
            return (
                <div className="max-w-2xl mx-auto py-20 text-center space-y-8">
                    <div className="w-24 h-24 bg-destructive/10 rounded-[2rem] flex items-center justify-center mx-auto text-destructive">
                        <AlertCircle size={48} />
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-3xl font-black tracking-tight">Something went wrong</h2>
                        <p className="text-muted-foreground text-lg max-w-md mx-auto">
                            We encountered an error while loading your profile. Please try refreshing or contact our support team.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            onClick={() => window.location.reload()}
                            className="px-8 h-12 bg-primary text-primary-foreground rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                        >
                            Try Again
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push(FRONTEND_ROUTES.DASHBOARD.HOME)}
                            className="px-8 h-12 rounded-2xl font-bold border-border/50 hover:bg-muted/50 transition-all"
                        >
                            Go to Overview
                        </Button>
                    </div>
                </div>
            );
        }
        return null; // Redirecting to setup
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <ProfileDetail
                profile={profile}
                isOwner={true}
            />
        </motion.div>
    );
};
