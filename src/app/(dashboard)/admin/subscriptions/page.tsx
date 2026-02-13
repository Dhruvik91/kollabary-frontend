'use client';

import React, { useState } from 'react';
import {
    CreditCard,
    Plus,
    Trash2,
    Check,
    Zap,
    ShieldCheck,
    Settings2,
    CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

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

export default function AdminSubscriptionsPage() {
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

            {/* Plans Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={plan.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: idx * 0.1 }}
                            className={cn(
                                "relative flex flex-col rounded-3xl border border-border/50 bg-card p-8 shadow-sm transition-all hover:shadow-xl",
                                plan.popular && "ring-2 ring-blue-500 ring-offset-4 dark:ring-offset-black"
                            )}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-4 py-1 text-xs font-bold text-white shadow-lg">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="mb-6 flex items-center justify-between">
                                <div className={cn("rounded-2xl p-3", plan.color)}>
                                    <plan.icon size={24} />
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-bold">${plan.price}</span>
                                    <span className="text-xs text-muted-foreground block">per month</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-6">{plan.name}</h3>

                            <div className="flex-1 space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                        <div className="mt-1 rounded-full bg-emerald-100 p-0.5 text-emerald-600 dark:bg-emerald-500/10">
                                            <Check size={12} />
                                        </div>
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 pt-6 border-t border-border/50">
                                <Button variant="outline" className="flex-1 rounded-xl h-10">Edit</Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-xl h-10 w-10 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                                    onClick={() => handleDelete(plan.id)}
                                >
                                    <Trash2 size={18} />
                                </Button>
                            </div>
                        </motion.div>
                    ))}

                    {isAdding && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col rounded-3xl border-2 border-dashed border-primary/30 bg-primary/5 p-8"
                        >
                            <h3 className="text-xl font-bold mb-6">Create New Plan</h3>
                            <div className="space-y-4 mb-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase text-muted-foreground">Plan Name</label>
                                    <Input
                                        placeholder="e.g. Platinum"
                                        className="rounded-xl h-12 bg-background border-border/50"
                                        value={newPlan.name}
                                        onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase text-muted-foreground">Monthly Price ($)</label>
                                    <Input
                                        type="number"
                                        placeholder="99"
                                        className="rounded-xl h-12 bg-background border-border/50"
                                        value={newPlan.price}
                                        onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="mt-auto flex gap-2 pt-6">
                                <Button variant="ghost" className="flex-1 rounded-xl" onClick={() => setIsAdding(false)}>Cancel</Button>
                                <Button className="flex-1 rounded-xl shadow-lg" onClick={handleAddPlan}>Create</Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

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
