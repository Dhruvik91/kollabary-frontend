'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AddPlanFormProps {
    name: string;
    price: string;
    onNameChange: (val: string) => void;
    onPriceChange: (val: string) => void;
    onCancel: () => void;
    onSubmit: () => void;
}

export function AddPlanForm({
    name,
    price,
    onNameChange,
    onPriceChange,
    onCancel,
    onSubmit
}: AddPlanFormProps) {
    return (
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
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">Monthly Price ($)</label>
                    <Input
                        type="number"
                        placeholder="99"
                        className="rounded-xl h-12 bg-background border-border/50"
                        value={price}
                        onChange={(e) => onPriceChange(e.target.value)}
                    />
                </div>
            </div>
            <div className="mt-auto flex gap-2 pt-6">
                <Button variant="ghost" className="flex-1 rounded-xl" onClick={onCancel}>Cancel</Button>
                <Button className="flex-1 rounded-xl shadow-lg" onClick={onSubmit}>Create</Button>
            </div>
        </motion.div>
    );
}
