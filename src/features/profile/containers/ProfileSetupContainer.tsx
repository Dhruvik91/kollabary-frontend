'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ProfileSetupForm, ProfileFormValues } from '../components/ProfileSetupForm';
import { useSaveProfile, useMyProfile, useUpdateProfile } from '@/hooks/queries/useProfileQueries';
import { FRONTEND_ROUTES } from '@/constants';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ProfileSetupContainerProps {
    mode?: 'setup' | 'edit';
}

export function ProfileSetupContainer({ mode = 'setup' }: ProfileSetupContainerProps) {
    const router = useRouter();
    const { mutate: saveProfile, isPending: isSaving } = useSaveProfile();
    const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
    const { data: initialProfile, isLoading: isProfileLoading } = useMyProfile();

    const isEdit = mode === 'edit';
    const isPending = isSaving || isUpdating;

    const handleSubmit = (data: ProfileFormValues) => {
        const mutateFn = isEdit ? updateProfile : saveProfile;

        mutateFn(data, {
            onSuccess: () => {
                router.push(isEdit ? FRONTEND_ROUTES.DASHBOARD.PROFILE_SETUP.replace('/setup', '') : FRONTEND_ROUTES.DASHBOARD.OVERVIEW);
            }
        });
    };

    if (isProfileLoading && isEdit) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="text-primary"
                >
                    <Loader2 size={32} />
                </motion.div>
                <p className="text-muted-foreground font-medium animate-pulse">Loading your profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 md:py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                        {isEdit ? 'Edit Your ' : 'Welcome to '}<span className="text-primary">{isEdit ? 'Profile' : 'Kollabary'}</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-lg mx-auto font-medium">
                        {isEdit
                            ? 'Update your details and social presence to keep your profile fresh.'
                            : "Final step! Let's set up your profile so you can start collaborating with amazing creators."}
                    </p>
                </motion.div>

                <ProfileSetupForm
                    onSubmit={handleSubmit}
                    isLoading={isPending}
                    initialData={initialProfile || undefined}
                    isEdit={isEdit}
                />
            </div>
        </div>
    );
}
