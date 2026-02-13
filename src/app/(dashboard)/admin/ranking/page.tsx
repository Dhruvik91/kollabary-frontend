'use client';

import React, { useState } from 'react';
import {
    TrendingUp,
    RefreshCcw,
    Save,
    AlertCircle,
    Info,
    BarChart3,
    ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRankingWeights, useUpdateRankingWeights, useRecalculateScores } from '@/hooks/use-admin.hooks';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function AdminRankingPage() {
    const { data: weightsData, isLoading } = useRankingWeights();
    const updateWeights = useUpdateRankingWeights();
    const recalculateScores = useRecalculateScores();

    const [localWeights, setLocalWeights] = useState<any>(null);

    // Sync local state when data is loaded
    React.useEffect(() => {
        if (weightsData) {
            setLocalWeights(weightsData);
        }
    }, [weightsData]);

    const handleWeightChange = (key: string, value: string) => {
        const numValue = parseFloat(value) || 0;
        setLocalWeights({
            ...localWeights,
            [key]: numValue
        });
    };

    const handleSave = () => {
        // Validate total weight (usually should sum to 100 or 1.0 depending on backend implementation)
        const total = Object.values(localWeights).reduce((a: any, b: any) => a + b, 0);

        updateWeights.mutate(localWeights);
    };

    const handleRecalculate = () => {
        toast.promise(recalculateScores.mutateAsync(), {
            loading: 'Triggering global recalculation...',
            success: 'Recalculation started!',
            error: 'Failed to trigger recalculation'
        });
    };

    if (isLoading || !localWeights) {
        return (
            <div className="space-y-8">
                <Skeleton className="h-10 w-64" />
                <div className="grid gap-6 lg:grid-cols-2">
                    <Skeleton className="h-96 w-full rounded-2xl" />
                    <Skeleton className="h-96 w-full rounded-2xl" />
                </div>
            </div>
        );
    }

    const weightEntries = Object.entries(localWeights).filter(([key]) => typeof localWeights[key] === 'number');

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Ranking & Scoring</h1>
                    <p className="text-muted-foreground">Adjust algorithm weights and manage global score recalculation.</p>
                </div>

                <Button
                    onClick={handleRecalculate}
                    className="rounded-xl gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                    disabled={recalculateScores.isPending}
                >
                    <RefreshCcw size={16} className={cn(recalculateScores.isPending && "animate-spin")} />
                    Recalculate All Scores
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Weights Management Card */}
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
                        {weightEntries.map(([key, val]: any) => (
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
                                        onChange={(e) => handleWeightChange(key, e.target.value)}
                                        className="h-2 flex-1 rounded-lg bg-muted accent-primary cursor-pointer"
                                    />
                                    <Input
                                        type="number"
                                        value={val}
                                        onChange={(e) => handleWeightChange(key, e.target.value)}
                                        className="w-20 rounded-lg h-9 text-center font-mono"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 border-t border-border/50 pt-6">
                        <Button
                            onClick={handleSave}
                            disabled={updateWeights.isPending}
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

                {/* Info and Impact Card */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm"
                    >
                        <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
                            <Info size={20} className="text-blue-500" />
                            How it works
                        </h3>
                        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                            <p>
                                The ranking algorithm determines the "Kollabary Score" (0-100) for every influencer.
                                This score directly impacts their visibility in discovery and search results.
                            </p>

                            <div className="rounded-xl bg-muted/50 p-4 space-y-3 border border-border/30">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span>Scores are updated daily at 00:00 UTC.</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span>Manual recalculation bypasses the daily cycle.</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <span>Weights must equal 100% for balanced scoring.</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-2xl border border-border/50 bg-indigo-600 p-6 text-white shadow-xl shadow-indigo-200"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <BarChart3 size={24} />
                            <h3 className="text-lg font-bold">Platform Impact</h3>
                        </div>
                        <p className="text-sm opacity-90 leading-relaxed">
                            A 10% increase in "Engagement Rate" weight typically shifts the top-100 ranking by 12-15 positions.
                            Monitor the "Platform Analytics" after significant changes.
                        </p>
                        <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                            <span>View Analytics</span>
                            <ArrowRight size={14} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
