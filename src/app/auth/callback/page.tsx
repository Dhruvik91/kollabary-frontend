'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { authKeys } from '@/hooks/use-auth.hooks';
import { Loader2 } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';

/**
 * Google OAuth Callback Page
 * Handles the redirect from Google OAuth and fetches user data
 */
export default function CallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            // No token provided, redirect to login
            router.push('/auth/login');
            return;
        }

        // Token is set in cookie by backend
        // Invalidate the 'me' query to trigger a refetch
        queryClient.invalidateQueries({ queryKey: authKeys.me() });

        // Redirect to dashboard
        router.push('/dashboard');
    }, [searchParams, router, queryClient]);

    return (
        <AuthLayout title="Signing you in..." description="Please wait while we complete the authentication">
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">Completing authentication...</p>
            </div>
        </AuthLayout>
    );
}
