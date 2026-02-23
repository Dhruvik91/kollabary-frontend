'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SubscriptionPlanCardProps {
    plan: {
        id: string;
        name: string;
        price: number;
        features: string[];
        color: string;
        icon: React.ElementType;
        popular?: boolean;
    };
    index: number;
    onDelete: (id: string) => void;
}

export function SubscriptionPlanCard({ plan, index, onDelete }: SubscriptionPlanCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
                "relative flex flex-col rounded-3xl border border-border/40 bg-card/40 backdrop-blur-xl backdrop-saturate-150 p-8 shadow-sm transition-all duration-300 ease-out hover:shadow-xl hover:border-primary/20 h-full will-change-transform",
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
                    onClick={() => onDelete(plan.id)}
                >
                    <Trash2 size={18} />
                </Button>
            </div>
        </motion.div>
    );
}
