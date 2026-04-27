import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { kcSettingService, KCSettingKey } from '@/services/kc-setting.service';
import { toast } from 'sonner';
import { auctionKeys } from './use-auction.hooks';
import { influencerKeys } from './queries/useInfluencerQueries';
import { profileKeys } from './queries/useProfileQueries';
import { WALLET_QUERY_KEYS, TRANSACTION_QUERY_KEYS } from './queries/useWalletQueries';
import { REFERRAL_QUERY_KEYS } from './queries/useReferralQueries';

export const kcSettingsKeys = {
    all: ['kc-settings'] as const,
};

export function useKCSettings() {
    return useQuery({
        queryKey: kcSettingsKeys.all,
        queryFn: kcSettingService.getAllSettings,
    });
}

export function useUpdateKCSetting() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ key, value }: { key: string; value: number }) =>
            kcSettingService.updateSetting(key, value),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: kcSettingsKeys.all });
            
            // Invalidate related queries that might be affected by price/reward changes
            queryClient.invalidateQueries({ queryKey: auctionKeys.all });
            queryClient.invalidateQueries({ queryKey: ['collaborations'] });
            queryClient.invalidateQueries({ queryKey: influencerKeys.all });
            queryClient.invalidateQueries({ queryKey: profileKeys.all });
            queryClient.invalidateQueries({ queryKey: WALLET_QUERY_KEYS.all });
            queryClient.invalidateQueries({ queryKey: TRANSACTION_QUERY_KEYS.all });
            queryClient.invalidateQueries({ queryKey: REFERRAL_QUERY_KEYS.all });

            toast.success('Setting updated successfully');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to update setting';
            toast.error(message);
        },
    });
}
