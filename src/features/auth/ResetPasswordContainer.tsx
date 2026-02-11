'use client';

import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { useResetPassword } from '@/hooks/use-auth.hooks';
import { ResetPasswordFormData } from '@/lib/validations/auth.validation';
import { ApiError } from '@/lib/api-client';

interface ResetPasswordContainerProps {
    token: string;
}

/**
 * Reset Password Container (Smart Component)
 * Handles password reset business logic and state management
 */
export function ResetPasswordContainer({ token }: ResetPasswordContainerProps) {
    const resetPasswordMutation = useResetPassword();

    const handleSubmit = (data: ResetPasswordFormData) => {
        resetPasswordMutation.mutate({
            token,
            newPassword: data.newPassword,
        });
    };

    const errorMessage = resetPasswordMutation.error instanceof ApiError
        ? resetPasswordMutation.error.message
        : undefined;

    return (
        <ResetPasswordForm
            onSubmit={handleSubmit}
            isLoading={resetPasswordMutation.isPending}
            error={errorMessage}
        />
    );
}
