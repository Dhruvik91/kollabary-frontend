'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema, ChangePasswordFormData } from '@/lib/validations/auth.validation';
import { useChangePasswordMutation } from '@/hooks/queries/useProfileQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Lock, ShieldCheck } from 'lucide-react';

interface PasswordUpdateFormProps {
    onSuccess?: () => void;
}

export const PasswordUpdateForm = ({ onSuccess }: PasswordUpdateFormProps) => {
    const { mutate: changePassword, isPending } = useChangePasswordMutation();

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

    const onSubmit = (data: ChangePasswordFormData) => {
        changePassword(
            {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            },
            {
                onSuccess: () => {
                    reset();
                    if (onSuccess) onSuccess();
                },
            }
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
                        <Input
                            id="currentPassword"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 h-12 rounded-xl"
                            {...register('currentPassword')}
                        />
                    </div>
                    {errors.currentPassword && (
                        <p className="text-sm text-destructive font-medium">{errors.currentPassword.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
                        <Input
                            id="newPassword"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 h-12 rounded-xl"
                            {...register('newPassword')}
                        />
                    </div>
                    {errors.newPassword && (
                        <p className="text-sm text-destructive font-medium">{errors.newPassword.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative">
                        <ShieldCheck className="absolute left-3 top-3 text-muted-foreground" size={18} />
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 h-12 rounded-xl"
                            {...register('confirmPassword')}
                        />
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-sm text-destructive font-medium">{errors.confirmPassword.message}</p>
                    )}
                </div>
            </div>

            <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 rounded-2xl font-bold bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
                {isPending ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={18} />
                        Updating Password...
                    </div>
                ) : (
                    'Update Password'
                )}
            </Button>
        </form>
    );
};
