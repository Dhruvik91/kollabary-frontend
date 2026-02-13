'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface RankingWeightFormProps {
    weights: Record<string, number>;
    pending: boolean;
    onChange: (key: string, value: string) => void;
    onSave: () => void;
}

export function RankingWeightForm({
    weights,
    pending,
    onChange,
    onSave
}: RankingWeightFormProps) {
    const weightEntries = Object.entries(weights).filter(([_, val]) => typeof val === 'number');

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm"
        >
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp size={20} className="text-primary" />
                    Algorithm Weights
                </h3>
                <div className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-600">
                    SYSTEM ACTIVE
                </div>
            </div>

            <div className="space-y-6">
                {weightEntries.map(([key, val]) => (
                    <div key={key} className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <label className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                            <span className="text-muted-foreground font-mono">{val}%</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={val}
                                onChange={(e) => onChange(key, e.target.value)}
                                className="h-2 flex-1 rounded-lg bg-muted accent-primary cursor-pointer"
                            />
                            <Input
                                type="number"
                                value={val}
                                onChange={(e) => onChange(key, e.target.value)}
                                className="w-20 rounded-lg h-9 text-center font-mono"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 border-t border-border/50 pt-6">
                <Button
                    onClick={onSave}
                    disabled={pending}
                    className="w-full rounded-xl gap-2 shadow-lg"
                >
                    <Save size={16} />
                    Save Configuration
                </Button>
                <p className="mt-3 text-center text-[10px] text-muted-foreground">
                    Changes will affect all future score calculations instantly.
                </p>
            </div>
        </motion.div>
    );
}
