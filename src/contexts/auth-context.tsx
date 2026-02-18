'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useMe } from '@/hooks/use-auth.hooks';
import { useMyProfile } from '@/hooks/queries/useProfileQueries';
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

    // Fetch profile only if user is logged in, has USER role, and doesn't have a profile yet
    // For other roles like INFLUENCER, the profile might already be included or handled differently
    const shouldFetchProfile = !!user && user.role === UserRole.USER && !user.profile;
    const { data: profile, isLoading: isProfileLoading, isError: isProfileError } = useMyProfile(shouldFetchProfile);

    const mergedUser = useMemo(() => {
        if (!user) return null;
        if (shouldFetchProfile && profile) {
            return { ...user, profile };
        }
        return user;
    }, [user, profile, shouldFetchProfile]);

    const value = useMemo(() => ({
        user: mergedUser,
        isLoading: isAuthLoading || (shouldFetchProfile && isProfileLoading),
        isAuthenticated: !!user,
        isError: isAuthError || (shouldFetchProfile && isProfileError),
    }), [mergedUser, isAuthLoading, isProfileLoading, isAuthError, isProfileError, user, shouldFetchProfile]);

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
