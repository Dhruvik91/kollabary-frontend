'use client';

import { TopUpPlan } from '@/types/payment.types';
import { TopUpCard } from './TopUpCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Coins } from 'lucide-react';

interface TopUpListProps {
    plans: TopUpPlan[];
    onBuy: (planId: string) => void;
    isLoading?: boolean;
}

export const TopUpList = ({ plans, onBuy, isLoading }: TopUpListProps) => {
    if (plans.length === 0) {
        return (
            <EmptyState
                title="No top-up plans available"
                description="We're currently updating our plans. Please check back later."
                icon={Coins}
            />
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 py-4 sm:py-8 px-2 sm:px-4">
            {plans.map((plan) => (
                <TopUpCard
                    key={plan.id}
                    plan={plan}
                    onBuy={onBuy}
                    isLoading={isLoading}
                    isPopular={plan.name.toLowerCase().includes('growth')}
                />
            ))}
        </div>
    );
};
