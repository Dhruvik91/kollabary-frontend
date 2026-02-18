'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { FRONTEND_ROUTES } from '@/constants';
import { Loader2 } from 'lucide-react';

interface ProfileSetupGuardProps {
    children: ReactNode;
}

/**
 * Profile Setup Guard
 * Redirects USERS and INFLUENCERS to setup page if they don't have a profile
 */
export function ProfileSetupGuard({ children }: ProfileSetupGuardProps) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (isLoading || !isAuthenticated) return;

        // Check if profile is missing based on role
        const isInfluencer = user?.role === UserRole.INFLUENCER;
        const isRegularUser = user?.role === UserRole.USER;

        // Robust check: either profile or influencerProfile record exists
        const hasProfile = !!user?.profile || !!user?.influencerProfile;

        const influencerSetupPath = FRONTEND_ROUTES.DASHBOARD.INFLUENCER_SETUP;
        const userSetupPath = FRONTEND_ROUTES.DASHBOARD.PROFILE_SETUP;
        const dashboardPath = FRONTEND_ROUTES.DASHBOARD.OVERVIEW;

        // CASE 1: Missing profile - Redirect TO setup
        if (isInfluencer && !hasProfile && pathname !== influencerSetupPath) {
            router.replace(influencerSetupPath);
        } else if (isRegularUser && !hasProfile && pathname !== userSetupPath) {
            router.replace(userSetupPath);
        }
        // CASE 2: Has profile - Redirect AWAY from setup
        else if (hasProfile && (pathname === influencerSetupPath || pathname === userSetupPath)) {
            // Influencers go to their profile, others go to dashboard
            const redirectPath = isInfluencer
                ? FRONTEND_ROUTES.DASHBOARD.INFLUENCER_PROFILE
                : dashboardPath;

            router.replace(redirectPath);
        }
    }, [user, isAuthenticated, isLoading, pathname, router]);

    // Show loading while we verify auth/profile status
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground font-medium animate-pulse">Syncing profile...</p>
                </div>
            </div>
        );
    }

    // If we're authenticated but missing a profile, don't render children while redirect is pending
    const needsProfile = user?.role === UserRole.INFLUENCER || user?.role === UserRole.USER;
    const hasProfile = !!user?.profile;
    const isSetupPage = pathname === FRONTEND_ROUTES.DASHBOARD.INFLUENCER_SETUP || pathname === FRONTEND_ROUTES.DASHBOARD.PROFILE_SETUP;

    if (isAuthenticated && needsProfile && !hasProfile && !isSetupPage) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return <>{children}</>;
}
