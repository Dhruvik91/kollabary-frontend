'use client';

import React from 'react';
import { Coins } from 'lucide-react';
import { useKCSettings, useUpdateKCSetting } from '@/hooks/use-kc-settings.hooks';
import { KCSettingsForm } from '../components/KCSettingsForm';
import { KCSettingKey } from '@/services/kc-setting.service';
import { Skeleton } from '@/components/ui/skeleton';

import { PageHeader } from '@/components/shared/PageHeader';

export function RewardsConfigContainer() {
    const { data: settings = [], isLoading, isError } = useKCSettings();
    const updateMutation = useUpdateKCSetting();

    const rewardSettings = settings.filter(s =>
        [
            KCSettingKey.AUCTION_CREATION_PRICE,
            KCSettingKey.COLLABORATION_CREATION_PRICE,
            KCSettingKey.BID_PLACEMENT_PRICE,
            KCSettingKey.WEEKLY_REWARD_BRAND,
            KCSettingKey.WEEKLY_REWARD_INFLUENCER,
            KCSettingKey.NEW_ARRIVAL_BONUS_AMOUNT,
            KCSettingKey.PITCH_PRICE
        ].includes(s.key)
    );

    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="space-y-3">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-4 w-96" />
                </div>
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
        <div className="space-y-8 pb-10">
            <PageHeader
                label="Tokenomics Engine"
                title="Rewards &"
                highlightedTitle="Costs"
                subtitle="Configure how K Coins are distributed and spent across the platform."
                icon={Coins}
            />

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
