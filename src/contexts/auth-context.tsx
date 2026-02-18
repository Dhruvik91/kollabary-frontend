'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useMe } from '@/hooks/use-auth.hooks';
import { useMyProfile } from '@/hooks/queries/useProfileQueries';
import { useMyInfluencerProfile } from '@/hooks/queries/useInfluencerQueries';
import { User, UserRole } from '@/types/auth.types';

interface AuthContextValue {
    user: User | null | undefined;
    isLoading: boolean;
    isAuthenticated: boolean;
    isError: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Authentication Provider
 * Manages global authentication state
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const { data: user, isLoading: isAuthLoading, isError: isAuthError } = useMe();

    // Regular users fetch from /profile
    const shouldFetchUserProfile = !!user && user.role === UserRole.USER && !user.profile;
    const {
        data: userProfile,
        isLoading: isUserProfileLoading,
        isError: isUserProfileError
    } = useMyProfile(shouldFetchUserProfile);

    // Influencers fetch from /influencer/profile
    const shouldFetchInfluencerProfile = !!user && user.role === UserRole.INFLUENCER && !user.profile;
    const {
        data: influencerProfile,
        isLoading: isInfluencerProfileLoading,
        isError: isInfluencerProfileError
    } = useMyInfluencerProfile(shouldFetchInfluencerProfile);

    const mergedUser = useMemo(() => {
        if (!user) return null;

        // Merge regular profile
        if (userProfile) {
            return { ...user, profile: userProfile };
        }

        // Merge influencer profile
        if (influencerProfile) {
            // Priority 1: Use the nested profile if it exists
            const nestedProfile = (influencerProfile as any).user?.profile;

            // Priority 2: If nested profile is missing (common backend inconsistency), 
            // synthesize a fallback profile using user info.
            const fallbackProfile = {
                id: influencerProfile.id,
                fullName: user.email.split('@')[0], // Fallback name
                username: user.email.split('@')[0],
                ...nestedProfile
            };

            return {
                ...user,
                profile: fallbackProfile,
                influencerProfile: { id: influencerProfile.id }
            };
        }

        return user;
    }, [user, userProfile, influencerProfile]);

    const value = useMemo(() => {
        const isProfileLoading = (shouldFetchUserProfile && isUserProfileLoading) ||
            (shouldFetchInfluencerProfile && isInfluencerProfileLoading);

        return {
            user: mergedUser,
            isLoading: isAuthLoading || isProfileLoading,
            isAuthenticated: !!user,
            isError: isAuthError || isUserProfileError || isInfluencerProfileError,
        };
    }, [mergedUser, isAuthLoading, isUserProfileLoading, isInfluencerProfileLoading, isAuthError, isUserProfileError, isInfluencerProfileError, user, shouldFetchUserProfile, shouldFetchInfluencerProfile]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access authentication context
 */
export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
