'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { InfluencerProfileForm } from '../components/InfluencerProfileForm';
import { useCreateInfluencerProfile } from '@/hooks/queries/useInfluencerQueries';
import { FRONTEND_ROUTES } from '@/constants';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export const InfluencerSetupContainer = () => {
    const router = useRouter();
    const { mutateAsync: createProfile, isPending } = useCreateInfluencerProfile();

    const handleProfileSubmit = useCallback(async (data: any) => {
        // Transform platforms array to record for backend
        const platformsRecord: Record<string, { handle: string; followers: number }> = {};
        data.platforms.forEach((p: any) => {
            platformsRecord[p.name] = {
                handle: p.handle,
                followers: p.followers
            };
        });

        const submissionData = {
            ...data,
            platforms: platformsRecord
        };

        try {
            await createProfile(submissionData);
            // After successful creation and cache invalidation, redirect
            router.replace(FRONTEND_ROUTES.DASHBOARD.OVERVIEW);
        } catch (error: any) {
            // Error toast is handled by the hook's onError or can be added here
            console.error('Profile creation failed:', error);
        }
    }, [createProfile, router]);

    return (
        <div className="min-h-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-zinc-50/50 dark:bg-black/50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12 space-y-4"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20">
                    <Sparkles size={14} className="animate-pulse" />
                    Welcome to the Creator Program
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
                    Let's set up your profile
                </h1>
                <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                    Tell us more about yourself to start collaborating with curated brand partners.
                </p>
            </motion.div>

            <InfluencerProfileForm
                onSubmit={handleProfileSubmit}
                isLoading={isPending}
                mode="setup"
                submitLabel="Complete Profile"
            />

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-sm text-muted-foreground text-center"
            >
                Need help? <a href="mailto:support@kollabary.com" className="text-primary font-bold hover:underline">Contact our creator team</a>
            </motion.p>
        </div>
    );
};
