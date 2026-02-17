'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProfileSetupForm, ProfileFormValues } from '../components/ProfileSetupForm';
import { useSaveProfile } from '@/hooks/queries/useProfileQueries';
import { FRONTEND_ROUTES } from '@/constants';
import { motion } from 'framer-motion';

export function ProfileSetupContainer() {
    const router = useRouter();
    const { mutate: saveProfile, isPending } = useSaveProfile();

    const handleSubmit = (data: ProfileFormValues) => {
        saveProfile(data, {
            onSuccess: () => {
                router.replace(FRONTEND_ROUTES.DASHBOARD.OVERVIEW);
            }
        });
    };

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        Welcome to <span className="text-primary">Kollabary</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                        Final step! Let's set up your profile so you can start collaborating with amazing creators.
                    </p>
                </motion.div>

                <ProfileSetupForm onSubmit={handleSubmit} isLoading={isPending} />
            </div>
        </div>
    );
}
