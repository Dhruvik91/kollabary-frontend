'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema, ChangePasswordFormData } from '@/lib/validations/auth.validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Lock, ShieldCheck } from 'lucide-react';

interface PasswordUpdateFormProps {
    onSubmit: (data: { currentPassword: string; newPassword: string }) => void;
    isLoading: boolean;
}

/**
 * Password Update Form (Dumb Component)
 * Pure presentational form for changing account password
 */
export const PasswordUpdateForm = ({ onSubmit, isLoading }: PasswordUpdateFormProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const handleFormSubmit = (data: ChangePasswordFormData) => {
        onSubmit({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        });
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6" noValidate>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} aria-hidden="true" />
                        <Input
                            id="currentPassword"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 h-12 rounded-xl"
                            disabled={isLoading}
                            aria-invalid={!!errors.currentPassword}
                            aria-describedby={errors.currentPassword ? 'current-password-error' : undefined}
                            {...register('currentPassword')}
                        />
                    </div>
                    {errors.currentPassword && (
                        <p id="current-password-error" className="text-sm text-destructive font-medium" role="alert">
                            {errors.currentPassword.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} aria-hidden="true" />
                        <Input
                            id="newPassword"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 h-12 rounded-xl"
                            disabled={isLoading}
                            aria-invalid={!!errors.newPassword}
                            aria-describedby={errors.newPassword ? 'new-password-error' : undefined}
                            {...register('newPassword')}
                        />
                    </div>
                    {errors.newPassword && (
                        <p id="new-password-error" className="text-sm text-destructive font-medium" role="alert">
                            {errors.newPassword.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                        <ShieldCheck className="absolute left-3 top-3 text-muted-foreground" size={18} aria-hidden="true" />
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 h-12 rounded-xl"
                            disabled={isLoading}
                            aria-invalid={!!errors.confirmPassword}
                            aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                            {...register('confirmPassword')}
                        />
                    </div>
                    {errors.confirmPassword && (
                        <p id="confirm-password-error" className="text-sm text-destructive font-medium" role="alert">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-2xl font-bold bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={18} aria-hidden="true" />
                        Updating Password...
                    </div>
                ) : (
                    'Update Password'
                )}
            </Button>
        </form>
    );
};

