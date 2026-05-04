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
export function SignupContainer() {
    const signupMutation = useSignup();
    const { initiateGoogleAuth } = useGoogleAuth();
    const searchParams = useSearchParams();
    const referralCode = searchParams.get('ref') || undefined;

    const handleSubmit = (data: SignupFormData) => {
        signupMutation.mutate({
            ...data,
            referralCode
        }, {
            onSuccess: () => {
                posthog.capture('user_signed_up', {
                    email: data.email,
                    has_referral: !!referralCode,
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
        />
    );
}
