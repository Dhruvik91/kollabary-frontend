import { useQuery } from '@tanstack/react-query';
import { referralService } from '@/services/referral.service';

export const REFERRAL_QUERY_KEYS = {
    all: ['referrals'] as const,
    stats: () => [...REFERRAL_QUERY_KEYS.all, 'stats'] as const,
};

export const useReferralStats = () => {
    return useQuery({
        queryKey: REFERRAL_QUERY_KEYS.stats(),
        queryFn: () => referralService.getMyStats(),
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};
