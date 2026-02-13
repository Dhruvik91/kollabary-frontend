'use client';

import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { Permission, hasRole, hasPermission } from '@/lib/permissions';
import { useMemo } from 'react';

/**
 * Hook to check if current user has a specific role
 */
export function useHasRole(role: UserRole) {
    const { user } = useAuth();

    return useMemo(() => hasRole(user, role), [user, role]);
}

/**
 * Hook to check if current user has a specific permission
 */
export function useHasPermission(permission: Permission) {
    const { user } = useAuth();

    return useMemo(() => hasPermission(user, permission), [user, permission]);
}

/**
 * Hook to check multiple permissions or roles
 */
export function useRBAC() {
    const { user, isAuthenticated, isLoading } = useAuth();

    return {
        user,
        isAuthenticated,
        isLoading,
        isAdmin: hasRole(user, UserRole.ADMIN),
        isInfluencer: hasRole(user, UserRole.INFLUENCER),
        checkPermission: (permission: Permission) => hasPermission(user, permission),
        checkRole: (role: UserRole) => hasRole(user, role),
    };
}
