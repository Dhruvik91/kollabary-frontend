'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { UserRole } from '@/types/auth.types';
import { Skeleton } from '@/components/ui/skeleton';
import { FRONTEND_ROUTES } from '@/constants';

interface AdminRouteGuardProps {
    children: ReactNode;
}

/**
 * Guard component for routes that require ADMIN role
 */
export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
    const { user, isLoading, isAuthenticated } = useAuth();
    const router = useRouter();

    // Redirection removed as it is now handled by middleware
    useEffect(() => {
        // We can still log or perform side effects here if needed
    }, [user, isLoading, isAuthenticated]);

    if (isLoading) {
        return (
            <div className="flex flex-col space-y-4 p-8">
                <Skeleton className="h-12 w-[250px]" />
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-[200px] w-full" />
            </div>
        );
    }

    if (!isAuthenticated || user?.role !== UserRole.ADMIN) {
        return null;
    }

    return <>{children}</>;
}
