'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useMyProfile } from '@/hooks/queries/useProfileQueries';
import { UserRole } from '@/types/auth.types';
import { Loader2 } from 'lucide-react';

interface ProfileSetupGuardProps {
    children: ReactNode;
}

/**
 * Profile Setup Guard
 * Redirects USERS and INFLUENCERS to setup page if they don't have a profile
 */
export function ProfileSetupGuard({ children }: ProfileSetupGuardProps) {
    const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    // Fetch profile for both influencers and regular users
    const isInfluencer = user?.role === UserRole.INFLUENCER;
    const isRegularUser = user?.role === UserRole.USER;
    const needsProfile = isInfluencer || isRegularUser;

    const { data: profile, isLoading: isProfileLoading, isError, error } = useMyProfile(
        isAuthenticated && needsProfile
    );

    useEffect(() => {
        if (isAuthLoading || isProfileLoading) return;

        // If user needs profile but it's missing (404)
        const isProfileNotFound = isError && (error as any)?.response?.status === 404;

        const influencerSetupPath = '/influencer/setup';
        const userSetupPath = '/profile/setup';

        const correctSetupPath = isInfluencer ? influencerSetupPath : userSetupPath;

        if (needsProfile && isProfileNotFound && pathname !== correctSetupPath) {
            router.replace(correctSetupPath);
        }
    }, [isInfluencer, isRegularUser, needsProfile, isError, error, pathname, router, isAuthLoading, isProfileLoading]);

    // Only show loading state on INITIAL check
    const isProfileNotFound = isError && (error as any)?.response?.status === 404;
    const isInitialLoading = isProfileLoading && !profile && !isError;

    // VERY IMPORTANT: If profile is required but not found, we MUST NOT render children
    if (isAuthLoading || (needsProfile && (isInitialLoading || isProfileNotFound))) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return <>{children}</>;
}
