'use client';

import { LoginForm } from '@/components/auth/LoginForm';
import { useLogin, useGoogleAuth } from '@/hooks/use-auth.hooks';
import { LoginFormData } from '@/lib/validations/auth.validation';
import { ApiError } from '@/lib/api-client';

/**
 * Login Container (Smart Component)
 * Handles login business logic and state management
 */
export function LoginContainer() {
    const loginMutation = useLogin();
    const { initiateGoogleAuth } = useGoogleAuth();

    const handleSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data);
    };

    const handleGoogleAuth = () => {
        initiateGoogleAuth();
    };

    const errorMessage = loginMutation.error instanceof ApiError
        ? loginMutation.error.message
        : undefined;

    return (
        <LoginForm
            onSubmit={handleSubmit}
            isLoading={loginMutation.isPending}
            error={errorMessage}
            onGoogleAuth={handleGoogleAuth}
        />
    );
}
