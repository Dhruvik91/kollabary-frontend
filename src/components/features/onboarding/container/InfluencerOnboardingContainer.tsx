"use client";

import { BackgroundEffects } from "@/components/BackgroundEffects";
import { InfluencerOnboardingForm } from "@/components/features/onboarding/components/InfluencerOnboardingForm";
import { InfluencerSchemaType } from "@/constants/validations";
import { CreateInfluencerPayload } from "@/types/influencer";
import { useInfluencerOnboarding } from "@/hooks/useInfluencerOnboarding";

export function InfluencerOnboardingContainer() {
    const mutation = useInfluencerOnboarding();

    const onSubmit = (values: InfluencerSchemaType) => {
        const payload: CreateInfluencerPayload = {
            bio: values.bio,
            location: values.location,
            socialMediaLinks: {
                instagram: values.instagram,
                twitter: values.twitter,
                tiktok: values.tiktok,
                youtube: values.youtube,
            },
            niche: values.categories,
        };

        mutation.mutate(payload);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <BackgroundEffects />
            <InfluencerOnboardingForm
                onSubmit={onSubmit}
                isLoading={mutation.isPending}
            />
        </div>
    );
}
