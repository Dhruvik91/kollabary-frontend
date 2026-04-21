import { useQuery } from '@tanstack/react-query';
import { referralService } from '@/services/referral.service';

export const REFERRAL_QUERY_KEYS = {
    all: ['referrals'] as const,
    stats: () => [...REFERRAL_QUERY_KEYS.all, 'stats'] as const,
    config: () => [...REFERRAL_QUERY_KEYS.all, 'config'] as const,
};

export const useReferralStats = () => {
    return useQuery({
        queryKey: REFERRAL_QUERY_KEYS.stats(),
        queryFn: () => referralService.getMyStats(),
        staleTime: 1000 * 60 * 10, // 10 minutes
    });
};

export const useReferralConfig = () => {
    return useQuery({
        queryKey: REFERRAL_QUERY_KEYS.config(),
        queryFn: () => referralService.getReferralConfig(),
        staleTime: 1000 * 60 * 60, // 1 hour
    });
};
