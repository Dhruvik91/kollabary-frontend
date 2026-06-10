'use client';

import { LoginForm } from '@/components/auth/LoginForm';
import { useLogin, useGoogleAuth } from '@/hooks/use-auth.hooks';
import { LoginFormData } from '@/lib/validations/auth.validation';

import { useSearchParams } from 'next/navigation';

/**
 * Login Container (Smart Component)
 * Handles login business logic and state management
 */
export function LoginContainer() {
    const loginMutation = useLogin();
    const googleAuthMutation = useGoogleAuth();
    const searchParams = useSearchParams();
    const referralCode = searchParams.get('ref') || undefined;

    const handleSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data);
    };

    const handleGoogleAuth = () => {
        googleAuthMutation.mutate({ referralCode });
    };

    return (
        <LoginForm
            onSubmit={handleSubmit}
            isLoading={loginMutation.isPending || googleAuthMutation.isPending}
            error={loginMutation.error?.message}
            onGoogleAuth={handleGoogleAuth}
        />
    );
}
