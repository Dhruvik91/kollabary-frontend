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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10 py-12 px-4 max-w-7xl mx-auto items-center justify-items-center">
            {plans.map((plan) => (
                <TopUpCard
                    key={plan.id}
                    plan={plan}
                    onBuy={onBuy}
                    isLoading={isLoading}
                    isPopular={plan.isPopular}
                />
            ))}
        </div>
    );
};
