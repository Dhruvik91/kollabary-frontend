'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { SubscriptionPlanCard } from './SubscriptionPlanCard';
import { AddPlanForm } from './AddPlanForm';

interface SubscriptionPlanListProps {
    plans: any[];
    isAdding: boolean;
    newPlan: { name: string; price: string };
    onNameChange: (val: string) => void;
    onPriceChange: (val: string) => void;
    onCancelAdd: () => void;
    onSubmitAdd: () => void;
    onDeletePlan: (id: string) => void;
}

export function SubscriptionPlanList({
    plans,
    isAdding,
    newPlan,
    onNameChange,
    onPriceChange,
    onCancelAdd,
    onSubmitAdd,
    onDeletePlan
}: SubscriptionPlanListProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
                {plans.map((plan, idx) => (
                    <SubscriptionPlanCard
                        key={plan.id}
                        plan={plan}
                        index={idx}
                        onDelete={onDeletePlan}
                    />
                ))}

                {isAdding && (
                    <AddPlanForm
                        name={newPlan.name}
                        price={newPlan.price}
                        onNameChange={onNameChange}
                        onPriceChange={onPriceChange}
                        onCancel={onCancelAdd}
                        onSubmit={onSubmitAdd}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
