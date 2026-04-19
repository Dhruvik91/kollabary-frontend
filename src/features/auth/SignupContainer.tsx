'use client';

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
