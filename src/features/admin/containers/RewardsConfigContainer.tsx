'use client';

import React from 'react';
import { Coins } from 'lucide-react';
import { useKCSettings, useUpdateKCSetting } from '@/hooks/use-kc-settings.hooks';
import { KCSettingsForm } from '../components/KCSettingsForm';
import { KCSettingKey } from '@/services/kc-setting.service';
import { Skeleton } from '@/components/ui/skeleton';

export function RewardsConfigContainer() {
    const { data: settings = [], isLoading, isError } = useKCSettings();
    const updateMutation = useUpdateKCSetting();

    const rewardSettings = settings.filter(s =>
        [
            KCSettingKey.AUCTION_CREATION_PRICE,
            KCSettingKey.COLLABORATION_CREATION_PRICE,
            KCSettingKey.BID_PLACEMENT_PRICE,
            KCSettingKey.DAILY_ALLOWANCE_BRAND,
            KCSettingKey.DAILY_ALLOWANCE_INFLUENCER
        ].includes(s.key)
    );

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-96 w-full rounded-2xl" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-8 text-center rounded-2xl border border-dashed border-red-500/50 bg-red-500/5 text-red-500">
                <p>Failed to load reward settings. Please try again.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Rewards & Costs</h1>
                <p className="text-muted-foreground mt-1">Configure how K Coins are distributed and spent across the platform.</p>
            </div>

            <div className="grid gap-8 max-w-4xl">
                <KCSettingsForm
                    title="Platform Tokenomics"
                    description="Adjust the pricing for platform actions and set daily coin allowances for users."
                    icon={Coins}
                    settings={rewardSettings}
                    isPending={updateMutation.isPending}
                    onUpdate={(key, value) => updateMutation.mutate({ key, value })}
                />
            </div>
        </div>
    );
}
