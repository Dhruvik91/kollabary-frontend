'use client';

import React, { useState } from 'react';
import {
    Zap,
    ShieldCheck,
    Settings2,
    Plus,
    CreditCard,
    AlertCircle,
    Check,
    Trash2,
    Edit2,
    CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/shared/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import {
    useAdminSubscriptionPlans,
    useCreateSubscriptionPlan,
    useDeleteSubscriptionPlan
} from '@/hooks/use-admin.hooks';
import { PageHeader } from '@/components/shared/PageHeader';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

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
    const [newPlan, setNewPlan] = useState({
        name: '',
        price: '',
        description: '',
        isPopular: false,
        isActive: true
    });

    const handleAddPlan = () => {
        if (!newPlan.name || !newPlan.price) return;

        createPlan.mutate(
            {
                name: newPlan.name,
                price: parseInt(newPlan.price),
                description: newPlan.description,
                isPopular: newPlan.isPopular,
                isActive: newPlan.isActive,
                features: [],
            },
            {
                onSuccess: () => {
                    setIsAdding(false);
                    setNewPlan({
                        name: '',
                        price: '',
                        description: '',
                        isPopular: false,
                        isActive: true
                    });
                },
            }
        );
    };

    const handleDelete = (id: string) => {
        deletePlan.mutate(id);
    };

    const columns: ColumnDef<any>[] = [
        {
            id: 'plan',
            header: 'Plan Name',
            accessorKey: 'name',
            cell: ({ row }) => {
                const plan = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "h-9 w-9 rounded-xl flex items-center justify-center ring-1 ring-border/50",
                            plan.popular ? "bg-blue-500/10 text-blue-600" : "bg-primary/10 text-primary"
                        )}>
                            <Zap size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm text-foreground">{plan.name}</span>
                            {(plan.isPopular || plan.popular) && (
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">Popular</span>
                            )}
                        </div>
                    </div>
                );
            },
        },
        {
            id: 'status',
            header: 'Status',
            accessorKey: 'isActive',
            cell: ({ row }) => (
                <Badge
                    variant={row.original.isActive ? "default" : "secondary"}
                    className={cn(
                        "rounded-lg text-[10px] uppercase font-bold",
                        row.original.isActive ? "bg-emerald-500/10 text-emerald-600" : ""
                    )}
                >
                    {row.original.isActive ? 'Active' : 'Inactive'}
                </Badge>
            ),
        },
        {
            id: 'price',
            header: 'Price',
            accessorKey: 'price',
            cell: ({ row }) => (
                <div className="flex items-baseline gap-1">
                    <span className="text-lg font-black text-foreground tabular-nums">${row.original.price}</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">/mo</span>
                </div>
            ),
        },
        {
            id: 'features',
            header: 'Features',
            cell: ({ row }) => {
                const features = row.original.features || [];
                return (
                    <div className="flex items-center gap-1.5">
                        <Badge variant="outline" className="h-6 rounded-lg text-[10px] font-black uppercase tracking-wider bg-muted/30 border-border/30">
                            {features.length} Features
                        </Badge>
                    </div>
                );
            },
        },
        {
            id: 'actions',
            header: 'Actions',
            meta: { headerAlign: 'right' },
            cell: ({ row }) => (
                <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary">
                        <Edit2 size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl text-rose-500 hover:bg-rose-500/10 hover:text-rose-600"
                        onClick={() => handleDelete(row.original.id)}
                    >
                        <Trash2 size={16} />
                    </Button>
                </div>
            ),
        },
    ];

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
            <PageHeader
                label="Monetization Strategy"
                title="Subscription"
                highlightedTitle="Tiers"
                subtitle="Define pricing and feature limits for the platform."
                icon={CreditCard}
                action={
                    <Dialog open={isAdding} onOpenChange={setIsAdding}>
                        <DialogTrigger asChild>
                            <Button className="rounded-xl gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all">
                                <Plus size={18} />
                                New Plan
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-2xl sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create New Plan</DialogTitle>
                                <DialogDescription>
                                    Add a new subscription tier to the platform.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-4 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Plan Name</label>
                                    <Input
                                        placeholder="e.g. Pro, Professional, Enterprise"
                                        value={newPlan.name}
                                        onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Monthly Price ($)</label>
                                    <Input
                                        type="number"
                                        placeholder="29"
                                        value={newPlan.price}
                                        onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Description</label>
                                    <Textarea
                                        placeholder="Describe the plan value..."
                                        value={newPlan.description}
                                        onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                                        className="rounded-xl resize-none"
                                    />
                                </div>
                                <div className="flex items-center justify-between p-3 border border-border/50 rounded-xl">
                                    <label className="text-sm font-medium">Popular Plan</label>
                                    <Switch
                                        checked={newPlan.isPopular}
                                        onCheckedChange={(checked) => setNewPlan({ ...newPlan, isPopular: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between p-3 border border-border/50 rounded-xl">
                                    <label className="text-sm font-medium">Active</label>
                                    <Switch
                                        checked={newPlan.isActive}
                                        onCheckedChange={(checked) => setNewPlan({ ...newPlan, isActive: checked })}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsAdding(false)}
                                    className="rounded-xl"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleAddPlan}
                                    className="rounded-xl"
                                    disabled={createPlan.isPending}
                                >
                                    Create Plan
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                }
            />

            {/* Plans DataTable */}
            <DataTable
                data={plans}
                columns={columns}
                isLoading={isLoading}
                showSearch={true}
                searchPosition="end"
                className="w-full"
                emptyState={
                    <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border/50">
                        <CreditCard size={48} className="text-muted-foreground/30" />
                        <p className="mt-4 text-lg font-medium text-muted-foreground">No subscription plans found.</p>
                    </div>
                }
            />

            {/* Quick Stats section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-3xl border border-border/50 bg-card/40 glass-card backdrop-blur-xl p-8 shadow-2xl shadow-black/5 flex flex-col md:flex-row items-center justify-between gap-8 mt-12"
            >
                <div>
                    <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                        <CreditCard size={20} className="text-primary" />
                        Subscription Health
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground font-medium max-w-md">
                        Monitoring global revenue and renewal rates across all defined tiers.
                    </p>
                </div>

                <div className="flex gap-8">
                    <div className="text-center">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Retention Rate</p>
                        <p className="text-2xl font-black mt-1 text-emerald-600 tabular-nums italic">94.2%</p>
                    </div>
                    <div className="h-10 w-px bg-border shrink-0 self-center" />
                    <div className="text-center">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Avg. Revenue/User</p>
                        <p className="text-2xl font-black mt-1 text-blue-600 tabular-nums italic">$42.10</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
