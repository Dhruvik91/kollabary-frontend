'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useMe } from '@/hooks/use-auth.hooks';
import { User } from '@/types/auth.types';

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
    const { data: user, isLoading, isError } = useMe();

    const value = useMemo(() => ({
        user: user ?? null,
        isLoading,
        isAuthenticated: !!user,
        isError,
    }), [user, isLoading, isError]);

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
