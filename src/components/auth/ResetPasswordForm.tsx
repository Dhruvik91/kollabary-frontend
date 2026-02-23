'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, ResetPasswordFormData } from '@/lib/validations/auth.validation';
import { FRONTEND_ROUTES } from '@/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ResetPasswordFormProps {
    onSubmit: (data: ResetPasswordFormData) => void;
    isLoading: boolean;
    error?: string;
    success?: boolean;
}

/**
 * Reset Password Form Component (Dumb Component)
 * Pure presentational component for resetting password with token
 */
export function ResetPasswordForm({ onSubmit, isLoading, error, success }: ResetPasswordFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const newPassword = watch('newPassword', '');

    // Calculate password strength
    const getPasswordStrength = (pwd: string): { strength: number; label: string; color: string } => {
        if (!pwd) return { strength: 0, label: '', color: '' };

        let strength = 0;
        if (pwd.length >= 6) strength++;
        if (pwd.length >= 10) strength++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
        if (/\d/.test(pwd)) strength++;
        if (/[^a-zA-Z\d]/.test(pwd)) strength++;

        if (strength <= 2) return { strength, label: 'Weak', color: 'bg-destructive' };
        if (strength <= 3) return { strength, label: 'Fair', color: 'bg-yellow-500' };
        if (strength <= 4) return { strength, label: 'Good', color: 'bg-blue-500' };
        return { strength, label: 'Strong', color: 'bg-green-500' };
    };

    const passwordStrength = getPasswordStrength(newPassword);

    if (success) {
        return (
            <div className="space-y-6">
                <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertDescription className="text-green-800 dark:text-green-200">
                        Your password has been reset successfully. You can now sign in with your new password.
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
                    Enter your new password below. Make sure it&apos;s strong and secure.
                </p>
            </div>

            <div className="space-y-4">
                {/* New Password Field */}
                <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                        <Input
                            id="newPassword"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a strong password"
                            autoComplete="new-password"
                            autoFocus
                            className="pr-10"
                            disabled={isLoading}
                            aria-invalid={!!errors.newPassword}
                            aria-describedby={errors.newPassword ? 'new-password-error password-strength' : 'password-strength'}
                            {...register('newPassword')}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                            )}
                        </Button>
                    </div>
                    {errors.newPassword && (
                        <p id="new-password-error" className="text-sm text-destructive" role="alert">
                            {errors.newPassword.message}
                        </p>
                    )}

                    {/* Password Strength Indicator */}
                    {newPassword && !errors.newPassword && (
                        <div id="password-strength" className="space-y-1" aria-live="polite">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1 flex-1 rounded-full transition-colors ${i < passwordStrength.strength ? passwordStrength.color : 'bg-muted'
                                            }`}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Password strength: <span className="font-medium">{passwordStrength.label}</span>
                            </p>
                        </div>
                    )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm your new password"
                            autoComplete="new-password"
                            className="pr-10"
                            disabled={isLoading}
                            aria-invalid={!!errors.confirmPassword}
                            aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                            {...register('confirmPassword')}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={isLoading}
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                            ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                            )}
                        </Button>
                    </div>
                    {errors.confirmPassword && (
                        <p id="confirm-password-error" className="text-sm text-destructive" role="alert">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        Resetting password...
                    </>
                ) : (
                    'Reset password'
                )}
            </Button>
        </form>
    );
}
