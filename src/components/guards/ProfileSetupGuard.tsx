'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useMyInfluencerProfile } from '@/hooks/queries/useInfluencerQueries';
import { UserRole } from '@/types/auth.types';
import { Loader2 } from 'lucide-react';

interface ProfileSetupGuardProps {
    children: ReactNode;
}

/**
 * Profile Setup Guard
 * Redirects INFLUENCERS to setup page if they don't have a profile
 */
export function ProfileSetupGuard({ children }: ProfileSetupGuardProps) {
    const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    // Only fetch profile if user is an influencer
    const isInfluencer = user?.role === UserRole.INFLUENCER;
    const { data: profile, isLoading: isProfileLoading, isError, error } = useMyInfluencerProfile(
        isAuthenticated && isInfluencer
    );

    useEffect(() => {
        if (isAuthLoading || isProfileLoading) return;

        // If influencer and profile is missing (404)
        const isProfileNotFound = isError && (error as any)?.response?.status === 404;
        const setupPath = '/influencer/setup';

        if (isInfluencer && isProfileNotFound && pathname !== setupPath) {
            router.replace(setupPath);
        }
    }, [isInfluencer, isError, error, pathname, router, isAuthLoading, isProfileLoading]);

    // Only show loading state on INITIAL check
    const isProfileNotFound = isError && (error as any)?.response?.status === 404;
    const isInitialLoading = isProfileLoading && !profile && !isError;

    // VERY IMPORTANT: If influencer and profile is not found, we MUST NOT render children
    // because children (like Header) might also trigger profile fetches, causing redundant calls/loops.
    if (isAuthLoading || (isInfluencer && (isInitialLoading || isProfileNotFound))) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return <>{children}</>;
}
