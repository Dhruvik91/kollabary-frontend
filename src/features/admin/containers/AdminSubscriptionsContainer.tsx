'use client';

import React, { useState } from 'react';
import {
    Zap,
    ShieldCheck,
    Settings2,
    Plus,
    CreditCard
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { SubscriptionPlanList } from '../components/SubscriptionPlanList';

// Mock plans for initial display if API is empty
const MOCK_PLANS = [
    {
        id: '1',
        name: 'Starter',
        price: 0,
        features: ['3 Collaborations/month', 'Basic Analytics', 'Public Profile'],
        color: 'bg-zinc-100 text-zinc-600',
        icon: Zap
    },
    {
        id: '2',
        name: 'Pro',
        price: 49,
        features: ['Unlimited Collaborations', 'Advanced Analytics', 'Priority Support', 'Verified Badge'],
        color: 'bg-blue-600 text-white',
        icon: ShieldCheck,
        popular: true
    },
    {
        id: '3',
        name: 'Enterprise',
        price: 199,
        features: ['Dedicated Manager', 'API Access', 'Custom Reporting', 'White-labeling'],
        color: 'bg-indigo-900 text-white',
        icon: Settings2
    }
];

export function AdminSubscriptionsContainer() {
    const [plans, setPlans] = useState(MOCK_PLANS);
    const [isAdding, setIsAdding] = useState(false);
    const [newPlan, setNewPlan] = useState({ name: '', price: '' });

    const handleAddPlan = () => {
        if (!newPlan.name || !newPlan.price) {
            toast.error('Please fill in all fields');
            return;
        }

        const plan = {
            id: Math.random().toString(),
            name: newPlan.name,
            price: parseInt(newPlan.price),
            features: ['Newly created plan features'],
            color: 'bg-zinc-100 text-zinc-600',
            icon: Zap
        };

        setPlans([...plans, plan] as any);
        setIsAdding(false);
        setNewPlan({ name: '', price: '' });
        toast.success('Subscription plan created');
    };

    const handleDelete = (id: string) => {
        setPlans(plans.filter(p => p.id !== id));
        toast.success('Plan removed');
    };

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Subscription Management</h1>
                    <p className="text-muted-foreground">Define and manage pricing tiers and feature limits for the platform.</p>
                </div>

                <Button
                    onClick={() => setIsAdding(true)}
                    className="rounded-xl gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                    <Plus size={18} />
                    New Plan
                </Button>
            </div>

            {/* Plans List */}
            <SubscriptionPlanList
                plans={plans}
                isAdding={isAdding}
                newPlan={newPlan}
                onNameChange={(val) => setNewPlan({ ...newPlan, name: val })}
                onPriceChange={(val) => setNewPlan({ ...newPlan, price: val })}
                onCancelAdd={() => setIsAdding(false)}
                onSubmitAdd={handleAddPlan}
                onDeletePlan={handleDelete}
            />

            {/* Quick Stats section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-3xl border border-border/50 bg-card p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8"
            >
                <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <CreditCard size={20} className="text-primary" />
                        Subscription Health
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground max-w-md">
                        Monitoring global revenue and renewal rates across all defined tiers.
                    </p>
                </div>

                <div className="flex gap-8">
                    <div className="text-center">
                        <p className="text-xs font-semibold text-muted-foreground uppercase">Retention Rate</p>
                        <p className="text-2xl font-bold mt-1 text-emerald-600">94.2%</p>
                    </div>
                    <div className="h-10 w-[1px] bg-border shrink-0 self-center" />
                    <div className="text-center">
                        <p className="text-xs font-semibold text-muted-foreground uppercase">Avg. Revenue/User</p>
                        <p className="text-2xl font-bold mt-1 text-blue-600">$42.10</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
