'use client';

import { SignupForm } from '@/components/auth/SignupForm';
import { useSignup, useGoogleAuth } from '@/hooks/use-auth.hooks';
import { SignupFormData } from '@/lib/validations/auth.validation';
import { ApiError } from '@/lib/api-client';

/**
 * Signup Container (Smart Component)
 * Handles signup business logic and state management
 */
export function SignupContainer() {
    const signupMutation = useSignup();
    const { initiateGoogleAuth } = useGoogleAuth();

    const handleSubmit = (data: SignupFormData) => {
        signupMutation.mutate(data);
    };

    const handleGoogleAuth = () => {
        initiateGoogleAuth();
    };

    const errorMessage = signupMutation.error instanceof ApiError
        ? signupMutation.error.message
        : undefined;

    return (
        <SignupForm
            onSubmit={handleSubmit}
            isLoading={signupMutation.isPending}
            error={errorMessage}
            onGoogleAuth={handleGoogleAuth}
        />
    );
}
