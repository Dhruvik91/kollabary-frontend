'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Coins, Plus, Trash2, Edit2, IndianRupee, AlertCircle, Zap } from 'lucide-react';
import {
    useAdminTopUpPlans,
    useDeleteTopUpPlan,
    useUpdateTopUpPlan
} from '@/hooks/queries/useAdminQueries';
import { TopUpPlan } from '@/types/payment.types';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DataTable } from '@/components/shared/DataTable';
import { PlanFormDialog } from './components/PlanFormDialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { COIN_URL } from '@/constants';

export function AdminTopUpContainer() {
    const { data: plans = [], isLoading, isError, refetch } = useAdminTopUpPlans();
    const deletePlan = useDeleteTopUpPlan();
    const updatePlan = useUpdateTopUpPlan();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<TopUpPlan | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleCreate = () => {
        setEditingPlan(null);
        setIsFormOpen(true);
    };

    const handleEdit = (plan: TopUpPlan) => {
        setEditingPlan(plan);
        setIsFormOpen(true);
    };

    const handleDelete = async () => {
        if (deletingId) {
            await deletePlan.mutateAsync(deletingId);
            setDeletingId(null);
        }
    };

    const toggleStatus = (plan: TopUpPlan) => {
        updatePlan.mutate({
            id: plan.id,
            dto: { isActive: !plan.isActive }
        });
    };

    const columns: ColumnDef<TopUpPlan>[] = [
        {
            id: 'name',
            header: 'Plan Name',
            accessorKey: 'name',
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Zap size={18} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm">{row.original.name}</span>
                        {row.original.isPopular && (
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">Popular</span>
                        )}
                    </div>
                </div>
            ),
        },
        {
            id: 'coins',
            header: 'KC Coins',
            accessorKey: 'coins',
            cell: ({ row }) => (
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5 font-bold text-primary italic">
                        <img
                            src={COIN_URL}
                            alt="KC"
                            className="w-4 h-4 object-contain animate-pulse-slow"
                        />
                        {row.original.coins} KC
                    </div>
                    {(row.original.bonusCoins ?? 0) > 0 && (
                        <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                            <Plus size={10} />
                            {row.original.bonusCoins} Bonus
                        </div>
                    )}
                </div>
            ),
        },
        {
            id: 'amount',
            header: 'Amount',
            accessorKey: 'amount',
            cell: ({ row }) => (
                <div className="flex items-center gap-0.5 font-bold tabular-nums">
                    <IndianRupee size={16} className="text-muted-foreground" />
                    {row.original.amount}
                </div>
            ),
        },
        {
            id: 'status',
            header: 'Status',
            accessorKey: 'isActive',
            cell: ({ row }) => (
                <Badge
                    variant={row.original.isActive ? "default" : "secondary"}
                    className={cn(
                        "rounded-lg text-[10px] uppercase font-bold cursor-pointer",
                        row.original.isActive ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : ""
                    )}
                    onClick={() => toggleStatus(row.original)}
                >
                    {row.original.isActive ? 'Active' : 'Inactive'}
                </Badge>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            meta: { headerAlign: 'left' },
            cell: ({ row }) => (
                <div className="flex items-center justify-start gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary"
                        onClick={() => handleEdit(row.original)}
                    >
                        <Edit2 size={14} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg text-rose-500 hover:bg-rose-500/10"
                        onClick={() => setDeletingId(row.original.id)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            ),
        },
    ];

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle size={48} className="text-destructive mb-4" />
                <h2 className="text-xl font-bold mb-2">Failed to load plans</h2>
                <Button onClick={() => refetch()} variant="outline">Retry</Button>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            <PageHeader
                label="Economy Control"
                title="Top-up"
                highlightedTitle="Plans"
                subtitle="Manage the KC coin economy and packages."
                icon={Coins}
                action={
                    <Button onClick={handleCreate} className="rounded-xl gap-2 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all font-bold">
                        <Plus size={18} />
                        Create New Plan
                    </Button>
                }
            />

            <DataTable
                data={plans}
                columns={columns}
                isLoading={isLoading}
                showSearch={true}
                className="rounded-3xl border-border/50 overflow-hidden shadow-2xl shadow-black/5 bg-card/40 backdrop-blur-md"
                emptyState={
                    <div className="flex flex-col items-center justify-center py-20">
                        <Coins size={48} className="text-muted-foreground/20 mb-4" />
                        <p className="text-lg font-medium text-muted-foreground italic">No top-up plans defined yet.</p>
                    </div>
                }
            />

            <PlanFormDialog
                open={isFormOpen}
                onOpenChange={setIsFormOpen}
                plan={editingPlan}
            />

            <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
                <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the top-up plan. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-rose-500 hover:bg-rose-600 rounded-xl">
                            Delete Plan
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
