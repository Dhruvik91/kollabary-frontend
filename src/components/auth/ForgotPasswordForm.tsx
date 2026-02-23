'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/lib/validations/auth.validation';
import { FRONTEND_ROUTES } from '@/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';

interface ForgotPasswordFormProps {
    onSubmit: (data: ForgotPasswordFormData) => void;
    isLoading: boolean;
    success?: boolean;
}

/**
 * Forgot Password Form Component (Dumb Component)
 * Pure presentational component for password reset request
 */
export function ForgotPasswordForm({ onSubmit, isLoading, success }: ForgotPasswordFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    if (success) {
        return (
            <div className="space-y-6">
                <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertDescription className="text-green-800 dark:text-green-200">
                        If an account with that email exists, we&apos;ve sent you a password reset link. Please check your inbox.
                    </AlertDescription>
                </Alert>

                <Link href={FRONTEND_ROUTES.AUTH.LOGIN}>
                    <Button variant="outline" className="w-full">
                        <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                        Back to login
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
            </div>

            <div className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        autoFocus
                        disabled={isLoading}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        {...register('email')}
                    />
                    {errors.email && (
                        <p id="email-error" className="text-sm text-destructive" role="alert">
                            {errors.email.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                            Sending...
                        </>
                    ) : (
                        'Send reset link'
                    )}
                </Button>

                {/* Back to Login Link */}
                <Link href={FRONTEND_ROUTES.AUTH.LOGIN}>
                    <Button variant="ghost" className="w-full" type="button" disabled={isLoading}>
                        <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                        Back to login
                    </Button>
                </Link>
            </div>
        </form>
    );
}
