'use client';

import React, { useState, useEffect } from 'react';
import { useRankingWeights, useUpdateRankingWeights, useRecalculateScores } from '@/hooks/use-admin.hooks';
import { RankingWeightForm } from '../components/RankingWeightForm';
import { RankingImpactCard } from '../components/RankingImpactCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function AdminRankingContainer() {
    const { data: weightsData, isLoading } = useRankingWeights();
    const updateWeights = useUpdateRankingWeights();
    const recalculateScores = useRecalculateScores();

    const [localWeights, setLocalWeights] = useState<any>(null);

    // Sync local state when data is loaded
    useEffect(() => {
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
                <RankingWeightForm
                    weights={localWeights}
                    pending={updateWeights.isPending}
                    onChange={handleWeightChange}
                    onSave={handleSave}
                />
                <RankingImpactCard />
            </div>
        </div>
    );
}
