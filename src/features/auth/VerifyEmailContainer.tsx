'use client';

import { useSearchParams } from 'next/navigation';
import { VerifyEmailForm } from '@/components/auth/VerifyEmailForm';
import { useVerifyEmail, useResendOtp } from '@/hooks/use-auth.hooks';

/**
 * Verify Email Container (Smart Component)
 * Handles OTP verification logic and resend functionality
 */
export function VerifyEmailContainer() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    const verifyMutation = useVerifyEmail();
    const resendMutation = useResendOtp();

    const handleVerify = (otp: string) => {
        verifyMutation.mutate({ email, otp });
    };

    const handleResend = () => {
        resendMutation.mutate({ email });
    };

    return (
        <VerifyEmailForm
            email={email}
            onVerify={handleVerify}
            onResend={handleResend}
            isVerifying={verifyMutation.isPending}
            isResending={resendMutation.isPending}
            error={verifyMutation.error?.message}
        />
    );
}
