'use client';

import React, { useState } from 'react';
import {
    Zap,
    Plus,
    CreditCard,
    AlertCircle,
    Trash2,
    Edit2,
    X
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
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUpload } from '@/components/shared/ImageUpload';


export function AdminSubscriptionsContainer() {
    const { data: plans = [], isLoading, isError } = useAdminSubscriptionPlans();
    const createPlan = useCreateSubscriptionPlan();
    const deletePlan = useDeleteSubscriptionPlan();

    const [isAdding, setIsAdding] = useState(false);
    const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
    const [currentFeature, setCurrentFeature] = useState('');
    const [deletingPlan, setDeletingPlan] = useState<any | null>(null);
    const [newPlan, setNewPlan] = useState<{
        name: string;
        price: string;
        description: string;
        isPopular: boolean;
        isActive: boolean;
        features: string[];
        imageUrl: string;
    }>({
        name: '',
        price: '',
        description: '',
        isPopular: false,
        isActive: true,
        features: [],
        imageUrl: ''
    });

    const resetForm = () => {
        setNewPlan({
            name: '',
            price: '',
            description: '',
            isPopular: false,
            isActive: true,
            features: [],
            imageUrl: ''
        });
        setEditingPlanId(null);
        setCurrentFeature('');
    };

    const handleEditClick = (plan: any) => {
        setNewPlan({
            name: plan.name,
            price: plan.price.toString(),
            description: plan.description || '',
            isPopular: plan.isPopular || false,
            isActive: plan.isActive ?? true,
            features: Array.isArray(plan.features) ? plan.features : [],
            imageUrl: plan.imageUrl || ''
        });
        setEditingPlanId(plan.id);
        setIsAdding(true);
    };

    const handleAddFeature = () => {
        if (!currentFeature.trim()) return;
        setNewPlan(prev => ({
            ...prev,
            features: [...prev.features, currentFeature.trim()]
        }));
        setCurrentFeature('');
    };

    const handleRemoveFeature = (indexToRemove: number) => {
        setNewPlan(prev => ({
            ...prev,
            features: prev.features.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleAddPlan = () => {
        if (!newPlan.name || !newPlan.price) return;

        createPlan.mutate(
            {
                name: newPlan.name,
                price: parseInt(newPlan.price),
                description: newPlan.description,
                isPopular: newPlan.isPopular,
                isActive: newPlan.isActive,
                features: newPlan.features,
                imageUrl: newPlan.imageUrl || undefined,
            },
            {
                onSuccess: () => {
                    setIsAdding(false);
                    resetForm();
                },
            }
        );
    };

    const handleDelete = (plan: any) => {
        deletePlan.mutate(plan.id, {
            onSuccess: () => {
                setDeletingPlan(null);
            }
        });
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
                    <span className="text-lg font-black text-foreground tabular-nums">₹{row.original.price}</span>
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
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary"
                        onClick={() => handleEditClick(row.original)}
                    >
                        <Edit2 size={16} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-xl text-rose-500 hover:bg-rose-500/10 hover:text-rose-600"
                        onClick={() => setDeletingPlan(row.original)}
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
                    <>
                        <Button
                            className="rounded-xl gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
                            onClick={() => {
                                resetForm();
                                setIsAdding(true);
                            }}
                        >
                            <Plus size={18} />
                            New Plan
                        </Button>
                        <AnimatedModal
                            isOpen={isAdding}
                            onClose={() => {
                                setIsAdding(false);
                                resetForm();
                            }}
                            title={editingPlanId ? 'Edit Plan' : 'Create New Plan'}
                            description={editingPlanId ? 'Update this subscription tier details.' : 'Add a new subscription tier to the platform.'}
                            size="md"
                            footer={
                                <div className="flex justify-end gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setIsAdding(false);
                                            resetForm();
                                        }}
                                        className="rounded-xl"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleAddPlan}
                                        className="rounded-xl"
                                        disabled={createPlan.isPending}
                                    >
                                        {editingPlanId ? 'Save Changes' : 'Create Plan'}
                                    </Button>
                                </div>
                            }
                        >
                            <div className="py-2 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Plan Name</label>
                                    <Select
                                        value={newPlan.name}
                                        onValueChange={(val) => setNewPlan({ ...newPlan, name: val })}
                                        disabled={!!editingPlanId}
                                    >
                                        <SelectTrigger className="rounded-xl">
                                            <SelectValue placeholder="Select Plan Name" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            <SelectItem value="FREE">FREE</SelectItem>
                                            <SelectItem value="PRO">PRO</SelectItem>
                                            <SelectItem value="ELITE">ELITE</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Monthly Price (₹)</label>
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
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Plan Image</label>
                                    <ImageUpload
                                        value={newPlan.imageUrl}
                                        onChange={(url) => setNewPlan({ ...newPlan, imageUrl: url })}
                                        onRemove={() => setNewPlan({ ...newPlan, imageUrl: '' })}
                                        crop={true}
                                        maxSize={5}
                                        message="Upload and crop image (Max 5MB)"
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Plan Features</label>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="e.g. 0% platform service fees"
                                            value={currentFeature}
                                            onChange={(e) => setCurrentFeature(e.target.value)}
                                            className="rounded-xl"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleAddFeature();
                                                }
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            onClick={handleAddFeature}
                                            variant="secondary"
                                            className="rounded-xl shrink-0"
                                        >
                                            Add
                                        </Button>
                                    </div>
                                    {newPlan.features.length > 0 && (
                                        <div className="mt-2 space-y-1.5 max-h-36 overflow-y-auto p-1 border border-border/50 rounded-xl">
                                            {newPlan.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center justify-between bg-muted/30 px-3 py-1.5 rounded-lg border border-border/20">
                                                    <span className="text-xs font-medium text-foreground truncate max-w-[320px]">{feature}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveFeature(idx)}
                                                        className="text-muted-foreground hover:text-rose-500 transition-colors p-1"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
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
                        </AnimatedModal>
                    </>
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

            {/* Delete Confirmation Modal */}
            <AnimatedModal
                isOpen={!!deletingPlan}
                onClose={() => setDeletingPlan(null)}
                title="Delete Subscription Plan"
                description={
                    deletingPlan ? (
                        <span>
                            Are you sure you want to delete the <span className="font-bold text-foreground">{deletingPlan.name}</span> plan? This action cannot be undone.
                        </span>
                    ) : ''
                }
                size="sm"
                footer={
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setDeletingPlan(null)}
                            className="rounded-xl"
                            disabled={deletePlan.isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => deletingPlan && handleDelete(deletingPlan)}
                            className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white"
                            disabled={deletePlan.isPending}
                        >
                            {deletePlan.isPending ? 'Deleting...' : 'Delete Plan'}
                        </Button>
                    </div>
                }
            >
                <div className="py-2 flex items-center gap-3 text-sm text-muted-foreground bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl">
                    <AlertCircle className="text-amber-500 shrink-0" size={20} />
                    <p>
                        Deleting this plan will prevent any new users from signing up for it. Active subscribers on this tier will still maintain access until they cancel.
                    </p>
                </div>
            </AnimatedModal>
        </div>
    );
}
