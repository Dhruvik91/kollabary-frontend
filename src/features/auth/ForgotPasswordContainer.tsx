'use client';

import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { useForgotPassword } from '@/hooks/use-auth.hooks';
import { ForgotPasswordFormData } from '@/lib/validations/auth.validation';

/**
 * Forgot Password Container (Smart Component)
 * Handles forgot password business logic and state management
 */
export function ForgotPasswordContainer() {
    const forgotPasswordMutation = useForgotPassword();

    const handleSubmit = (data: ForgotPasswordFormData) => {
        forgotPasswordMutation.mutate(data);
    };

    return (
        <ForgotPasswordForm
            onSubmit={handleSubmit}
            isLoading={forgotPasswordMutation.isPending}
            success={forgotPasswordMutation.isSuccess}
        />
    );
}
