'use client';

import posthog from 'posthog-js';
import { SignupForm } from '@/components/auth/SignupForm';
import { useSignup, useGoogleAuth } from '@/hooks/use-auth.hooks';
import { SignupFormData } from '@/lib/validations/auth.validation';

/**
 * Signup Container (Smart Component)
 * Handles signup business logic and state management
 */
import { useSearchParams } from 'next/navigation';

/**
 * Signup Container (Smart Component)
 * Handles signup business logic and state management
 */
import { UserRole } from '@/types/auth.types';

export function SignupContainer() {
    const signupMutation = useSignup();
    const { initiateGoogleAuth } = useGoogleAuth();
    const searchParams = useSearchParams();
    const referralCode = searchParams.get('ref') || undefined;
    
    // Parse role search query parameter (e.g. ?role=brand or ?role=creator or ?role=influencer)
    const roleParam = searchParams.get('role')?.toLowerCase();
    const role = roleParam === 'creator' || roleParam === 'influencer'
        ? UserRole.INFLUENCER
        : roleParam === 'brand'
            ? UserRole.USER
            : undefined;

    const handleSubmit = (data: SignupFormData) => {
        signupMutation.mutate(data, {
            onSuccess: () => {
                posthog.capture('user_signed_up', {
                    email: data.email,
                    has_referral: !!data.referralCode,
                });
            },
        });
    };

    const handleGoogleAuth = () => {
        initiateGoogleAuth();
    };

    return (
        <SignupForm
            onSubmit={handleSubmit}
            isLoading={signupMutation.isPending}
            error={signupMutation.error?.message}
            onGoogleAuth={handleGoogleAuth}
            referralCode={referralCode}
            role={role}
        />
    );
}
