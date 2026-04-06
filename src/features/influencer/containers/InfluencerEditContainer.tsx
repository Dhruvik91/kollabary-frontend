'use client';

import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { InfluencerProfileForm } from '../components/InfluencerProfileForm';
import { useUpdateInfluencerProfile, useMyInfluencerProfile } from '@/hooks/queries/useInfluencerQueries';
import { FRONTEND_ROUTES } from '@/constants';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { BackButton } from '@/components/shared/BackButton';

export const InfluencerEditContainer = () => {
    const router = useRouter();
    const { data: profileData, isLoading: isFetchingProfile } = useMyInfluencerProfile();
    const { mutate: updateProfile, isPending: isUpdating } = useUpdateInfluencerProfile();

    const initialData = useMemo(() => {
        if (!profileData) return undefined;

        // Transform platforms record back to array for form
        const platformsArray = Object.entries(profileData.platforms || {}).map(([name, data]) => ({
            name,
            handle: (data as any).handle,
            followers: Number((data as any).followers) || 0,
            engagementRate: (data as any).engagementRate !== undefined ? Number((data as any).engagementRate) : undefined,
        }));

        const genderRatio = profileData.audienceGenderRatio || { male: 0, female: 0, other: 0 };
        const ageBrackets = profileData.audienceAgeBrackets || { '13-17': 0, '18-24': 0, '25-34': 0, '35-44': 0, '45-54': 0, '55-64': 0, '65+': 0 };

        return {
            fullName: profileData.fullName || '',
            categories: Array.isArray(profileData.categories) ? profileData.categories.join(', ') : '',
            avatarUrl: profileData.avatarUrl || '',
            bio: profileData.bio || '',
            address: profileData.address || '',
            locationCountry: profileData.locationCountry || '',
            locationCity: profileData.locationCity || '',
            gender: profileData.gender || '',
            languages: Array.isArray(profileData.languages) ? profileData.languages.join(', ') : '',
            audienceTopCountries: Array.isArray(profileData.audienceTopCountries) ? profileData.audienceTopCountries.join(', ') : '',
            audienceGenderRatio: {
                male: Number(genderRatio.male) || 0,
                female: Number(genderRatio.female) || 0,
                other: Number(genderRatio.other) || 0,
            },
            audienceAgeBrackets: {
                '13-17': Number(ageBrackets['13-17']) || 0,
                '18-24': Number(ageBrackets['18-24']) || 0,
                '25-34': Number(ageBrackets['25-34']) || 0,
                '35-44': Number(ageBrackets['35-44']) || 0,
                '45-54': Number(ageBrackets['45-54']) || 0,
                '55-64': Number(ageBrackets['55-64']) || 0,
                '65+': Number(ageBrackets['65+']) || 0,
            },
            minPrice: profileData.minPrice ? Number(profileData.minPrice) : 0,
            maxPrice: profileData.maxPrice ? Number(profileData.maxPrice) : 0,
            platforms: platformsArray as any,
            collaborationTypes: profileData.collaborationTypes as any,
            availability: profileData.availability as any,
        };
    }, [profileData]);

    const handleProfileSubmit = useCallback((data: any) => {
        // Transform platforms array to record for backend
        const platformsRecord: Record<string, { handle: string; followers: number; engagementRate?: number }> = {};
        data.platforms.forEach((p: any) => {
            platformsRecord[p.name] = {
                handle: p.handle,
                followers: p.followers,
                ...(p.engagementRate !== undefined && { engagementRate: p.engagementRate })
            };
        });

        const submissionData = {
            ...data,
            platforms: platformsRecord
        };

        updateProfile(submissionData, {
            onSuccess: () => {
                toast.success('Profile updated successfully!');
                router.push(FRONTEND_ROUTES.DASHBOARD.INFLUENCER_PROFILE);
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || 'Failed to update profile');
            }
        });
    }, [updateProfile, router]);

    if (isFetchingProfile) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <p className="text-muted-foreground font-medium animate-pulse">Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8 pb-20 px-4 sm:px-6 md:px-0 bg-zinc-50/50 dark:bg-black/50 pt-8 sm:pt-12">
            <div className="max-w-2xl mx-auto mb-8">
                <BackButton label="Back to Profile" className="mb-8" />

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-left space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20">
                        <Sparkles size={14} className="animate-pulse" />
                        Refine Your Presence
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
                        Edit your profile
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Keep your profile up to date to attract the best brand collaborations.
                    </p>
                </motion.div>
            </div>

            <InfluencerProfileForm
                onSubmit={handleProfileSubmit}
                initialData={initialData}
                isLoading={isUpdating}
                mode="edit"
                submitLabel="Save Changes"
            />
        </div>
    );
};
