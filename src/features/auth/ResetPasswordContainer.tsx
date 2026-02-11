'use client';

import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { useResetPassword } from '@/hooks/use-auth.hooks';
import { ResetPasswordFormData } from '@/lib/validations/auth.validation';

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

    return (
        <ResetPasswordForm
            onSubmit={handleSubmit}
            isLoading={resetPasswordMutation.isPending}
            error={resetPasswordMutation.error?.message}
        />
    );
}
