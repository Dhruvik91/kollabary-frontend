'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from '@/components/ui/input-otp';
import { AuthLayout } from './AuthLayout';
import { AlertCircle, ArrowLeft, Loader2, Mail, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@/constants';

interface VerifyEmailFormProps {
    email: string;
    onVerify: (otp: string) => void;
    onResend: () => void;
    isVerifying: boolean;
    isResending: boolean;
    error?: string;
}

/**
 * Verify Email Form (Dumb Component)
 * UI for OTP input and resend logic
 */
export function VerifyEmailForm({
    email,
    onVerify,
    onResend,
    isVerifying,
    isResending,
    error,
}: VerifyEmailFormProps) {
    const [otp, setOtp] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length === 6) {
            onVerify(otp);
        }
    };

    return (
        <AuthLayout
            title="Verify your email"
            description={`We've sent a 6-digit verification code to ${email || 'your email'}. Enter it below to activate your account.`}
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value) => setOtp(value)}
                        disabled={isVerifying}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>

                    {error && (
                        <div className="flex items-center gap-2 text-sm text-destructive font-medium">
                            <AlertCircle className="h-4 w-4" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold transition-all duration-300"
                    disabled={isVerifying || otp.length !== 6}
                >
                    {isVerifying ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                        </>
                    ) : (
                        'Verify Account'
                    )}
                </Button>

                <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Didn't receive the code?{' '}
                        <button
                            type="button"
                            onClick={onResend}
                            disabled={isResending || isVerifying}
                            className="text-primary font-semibold hover:underline disabled:opacity-50 inline-flex items-center gap-1"
                        >
                            {isResending ? (
                                <RefreshCw className="h-3 w-3 animate-spin" />
                            ) : null}
                            Resend Code
                        </button>
                    </p>

                    <Link
                        href={FRONTEND_ROUTES.AUTH.SIGNUP}
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors gap-1"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Signup
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
