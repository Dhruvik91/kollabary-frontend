'use client';

import { useState } from 'react';
import { useSubscriptionPlans } from '@/hooks/useSubscription';
import { useCreateSubscriptionPlan, useDeleteSubscriptionPlan } from '@/hooks/useAdmin';
import { PageContainer } from '@/components/layout/PageContainer';
import { PageHeader } from '@/components/layout/PageHeader';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/ui/states/LoadingState';
import { ErrorState } from '@/components/ui/states/ErrorState';
import { Plus, Trash2, Edit, Check } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function AdminSubscriptionsPage() {
    const { data: plans, isLoading, isError } = useSubscriptionPlans();
    const createPlanMutation = useCreateSubscriptionPlan();
    const deletePlanMutation = useDeleteSubscriptionPlan();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        duration: 30,
        features: [] as string[],
        isActive: true,
    });
    const [featureInput, setFeatureInput] = useState('');

    const handleSubmit = () => {
        createPlanMutation.mutate(formData, {
            onSuccess: () => {
                setDialogOpen(false);
                resetForm();
            },
        });
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: 0,
            duration: 30,
            features: [],
            isActive: true,
        });
        setFeatureInput('');
    };

    const addFeature = () => {
        if (featureInput.trim()) {
            setFormData({
                ...formData,
                features: [...formData.features, featureInput.trim()],
            });
            setFeatureInput('');
        }
    };

    const removeFeature = (index: number) => {
        setFormData({
            ...formData,
            features: formData.features.filter((_, i) => i !== index),
        });
    };

    if (isLoading) return <LoadingState message="Loading subscription plans..." />;
    if (isError) return <ErrorState message="Failed to load subscription plans" />;

    return (
        <PageContainer>
            <PageHeader
                title="Subscription Plans"
                description="Manage pricing plans for brands and influencers."
                actions={
                    <Button onClick={() => setDialogOpen(true)} className="rounded-xl">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Plan
                    </Button>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans?.map((plan) => (
                    <GlassCard key={plan.id} className="p-6 border-glass-border relative">
                        {plan.isActive && (
                            <Badge className="absolute top-4 right-4 bg-green-500/10 text-green-500 border-green-500/20">
                                Active
                            </Badge>
                        )}

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-2xl font-display font-bold">{plan.name}</h3>
                                <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
                            </div>

                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold">₹{plan.price}</span>
                                <span className="text-muted-foreground">/ {plan.duration} days</span>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Features</p>
                                <ul className="space-y-2">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2 text-sm">
                                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-4 border-t border-glass-border flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => {
                                        setFormData(plan);
                                        setDialogOpen(true);
                                    }}
                                >
                                    <Edit className="w-3 h-3 mr-1" />
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-destructive hover:bg-destructive/10"
                                    onClick={() => deletePlanMutation.mutate(plan.id)}
                                    disabled={deletePlanMutation.isPending}
                                >
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="glass border-glass-border max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Create Subscription Plan</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Plan Name</Label>
                                <Input
                                    placeholder="e.g., Premium"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="glass border-glass-border"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Price (₹)</Label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                    className="glass border-glass-border"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                placeholder="Plan description..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="glass border-glass-border"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Duration (days)</Label>
                            <Input
                                type="number"
                                placeholder="30"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                                className="glass border-glass-border"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Features</Label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Add a feature..."
                                    value={featureInput}
                                    onChange={(e) => setFeatureInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                                    className="glass border-glass-border"
                                />
                                <Button type="button" onClick={addFeature} variant="outline">
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="space-y-2 mt-2">
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-secondary/20">
                                        <span className="text-sm">{feature}</span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFeature(index)}
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/20">
                            <Label htmlFor="active">Active Plan</Label>
                            <Switch
                                id="active"
                                checked={formData.isActive}
                                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={!formData.name || !formData.price || createPlanMutation.isPending}
                        >
                            Save Plan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </PageContainer>
    );
}
