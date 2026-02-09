import { useQuery } from '@tanstack/react-query';
import httpService from '@/lib/http-service';
import { API_CONFIG } from '@/constants/constants';
import { AdminStats } from '@/types/admin';

/**
 * Hook to fetch admin platform statistics
 * Requires admin authentication
 * @returns Query result with platform statistics
 */
export const useAdminStats = () => {
    return useQuery({
        queryKey: ['admin', 'stats'],
        queryFn: async () => {
            const response = await httpService.get<AdminStats>(
                API_CONFIG.path.admin.stats
            );
            return response.data;
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
        refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
        retry: 2,
    });
};
