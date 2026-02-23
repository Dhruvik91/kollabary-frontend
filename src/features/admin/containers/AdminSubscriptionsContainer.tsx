'use client';

import React, { useState } from 'react';
import {
    Zap,
    ShieldCheck,
    Settings2,
    Plus,
    CreditCard,
    AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { SubscriptionPlanList } from '../components/SubscriptionPlanList';
import {
    useAdminSubscriptionPlans,
    useCreateSubscriptionPlan,
    useDeleteSubscriptionPlan
} from '@/hooks/use-admin.hooks';

const getIconForPlan = (name: string, index: number) => {
    const icons = [Zap, ShieldCheck, Settings2];
    return icons[index % icons.length];
};

const getColorForPlan = (index: number, popular?: boolean) => {
    if (popular) return 'bg-blue-600 text-white';
    const colors = ['bg-zinc-100 text-zinc-600', 'bg-indigo-900 text-white', 'bg-emerald-600 text-white'];
    return colors[index % colors.length];
};

export function AdminSubscriptionsContainer() {
    const { data: plans = [], isLoading, isError } = useAdminSubscriptionPlans();
    const createPlan = useCreateSubscriptionPlan();
    const deletePlan = useDeleteSubscriptionPlan();

    const [isAdding, setIsAdding] = useState(false);
    const [newPlan, setNewPlan] = useState({ name: '', price: '' });

    const handleAddPlan = () => {
        if (!newPlan.name || !newPlan.price) {
            return;
        }

        createPlan.mutate(
            {
                name: newPlan.name,
                price: parseInt(newPlan.price),
                features: [],
            },
            {
                onSuccess: () => {
                    setIsAdding(false);
                    setNewPlan({ name: '', price: '' });
                },
            }
        );
    };

    const handleDelete = (id: string) => {
        deletePlan.mutate(id);
    };

    const transformedPlans = plans.map((plan, index) => ({
        ...plan,
        icon: getIconForPlan(plan.name, index),
        color: getColorForPlan(index, plan.popular),
    }));

    if (isLoading) {
        return (
            <div className="space-y-8 pb-10">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Skeleton className="h-9 w-64 mb-2" />
                        <Skeleton className="h-5 w-96" />
                    </div>
                    <Skeleton className="h-10 w-32" />
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-80 rounded-3xl" />
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle size={48} className="text-destructive mb-4" />
                <h2 className="text-xl font-bold mb-2">Failed to load subscription plans</h2>
                <p className="text-muted-foreground">Please try again later or contact support.</p>
            </div>
        );
    }

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
                    disabled={createPlan.isPending}
                >
                    <Plus size={18} />
                    New Plan
                </Button>
            </div>

            {/* Plans List */}
            <SubscriptionPlanList
                plans={transformedPlans}
                isAdding={isAdding}
                newPlan={newPlan}
                onNameChange={(val) => setNewPlan({ ...newPlan, name: val })}
                onPriceChange={(val) => setNewPlan({ ...newPlan, price: val })}
                onCancelAdd={() => setIsAdding(false)}
                onSubmitAdd={handleAddPlan}
                onDeletePlan={handleDelete}
            />

            {/* Empty State */}
            {transformedPlans.length === 0 && !isAdding && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-dashed border-border/50 bg-muted/20 p-12 text-center"
                >
                    <CreditCard size={48} className="mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-bold mb-2">No subscription plans yet</h3>
                    <p className="text-muted-foreground mb-6">Create your first subscription plan to get started.</p>
                    <Button onClick={() => setIsAdding(true)} className="rounded-xl gap-2">
                        <Plus size={18} />
                        Create First Plan
                    </Button>
                </motion.div>
            )}

            {/* Quick Stats section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8"
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
                    <div className="h-10 w-px bg-border shrink-0 self-center" />
                    <div className="text-center">
                        <p className="text-xs font-semibold text-muted-foreground uppercase">Avg. Revenue/User</p>
                        <p className="text-2xl font-bold mt-1 text-blue-600">$42.10</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
