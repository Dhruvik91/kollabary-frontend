'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, ResetPasswordFormData } from '@/lib/validations/auth.validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface ResetPasswordFormProps {
    onSubmit: (data: ResetPasswordFormData) => void;
    isLoading: boolean;
    error?: string;
}

/**
 * Reset Password Form Component (Dumb Component)
 * Pure presentational component for resetting password with token
 */
export function ResetPasswordForm({ onSubmit, isLoading, error }: ResetPasswordFormProps) {
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
                    <Input
                        id="newPassword"
                        type="password"
                        placeholder="Create a strong password"
                        autoComplete="new-password"
                        autoFocus
                        disabled={isLoading}
                        aria-invalid={!!errors.newPassword}
                        aria-describedby={errors.newPassword ? 'new-password-error password-strength' : 'password-strength'}
                        {...register('newPassword')}
                    />
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
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your new password"
                        autoComplete="new-password"
                        disabled={isLoading}
                        aria-invalid={!!errors.confirmPassword}
                        aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                        {...register('confirmPassword')}
                    />
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
