'use client';

import React from 'react';
import { UserPlus } from 'lucide-react';
import { useKCSettings, useUpdateKCSetting } from '@/hooks/use-kc-settings.hooks';
import { KCSettingsForm } from '../components/KCSettingsForm';
import { KCSettingKey } from '@/services/kc-setting.service';
import { Skeleton } from '@/components/ui/skeleton';

import { PageHeader } from '@/components/shared/PageHeader';
import { Users } from 'lucide-react';

export function ReferralConfigContainer() {
    const { data: settings = [], isLoading, isError } = useKCSettings();
    const updateMutation = useUpdateKCSetting();

    const referralSettings = settings.filter(s => 
        [
            KCSettingKey.REFERRAL_REWARD_REFERRER,
            KCSettingKey.REFERRAL_REWARD_REFERRED
        ].includes(s.key)
    );

    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="space-y-3">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <Skeleton className="h-64 w-full rounded-2xl" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-8 text-center rounded-2xl border border-dashed border-red-500/50 bg-red-500/5 text-red-500">
                <p>Failed to load referral settings. Please try again.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            <PageHeader
                label="Growth Engine"
                title="Referral"
                highlightedTitle="System"
                subtitle="Manage rewards for bringing new users to Kollabary."
                icon={Users}
            />

            <div className="grid gap-8 max-w-4xl">
                <KCSettingsForm
                    title="Referral Rewards"
                    description="Set the amount of tokens awarded to referrers and their invited friends upon successful signup."
                    icon={UserPlus}
                    settings={referralSettings}
                    isPending={updateMutation.isPending}
                    onUpdate={(key, value) => updateMutation.mutate({ key, value })}
                />
            </div>
        </div>
    );
}
