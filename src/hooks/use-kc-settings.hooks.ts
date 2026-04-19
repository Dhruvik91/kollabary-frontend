import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { kcSettingService, KCSettingKey } from '@/services/kc-setting.service';
import { toast } from 'sonner';

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
            toast.success('Setting updated successfully');
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Failed to update setting';
            toast.error(message);
        },
    });
}
