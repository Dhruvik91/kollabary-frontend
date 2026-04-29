'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { TopUpPlan, CreateTopUpPlanDto } from '@/types/payment.types';
import { useCreateTopUpPlan, useUpdateTopUpPlan } from '@/hooks/queries/useAdminQueries';

import { COIN_URL } from '@/constants';

const planSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    amount: z.coerce.number().min(1, 'Amount must be greater than 0'),
    coins: z.coerce.number().min(1, 'Coins must be greater than 0'),
    bonusCoins: z.coerce.number().min(0).default(0),
    description: z.string().optional(),
    isPopular: z.boolean().default(false),
    isActive: z.boolean().default(true),
});

type PlanFormValues = z.infer<typeof planSchema>;

interface PlanFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    plan?: TopUpPlan | null;
}

export const PlanFormDialog = ({ open, onOpenChange, plan }: PlanFormDialogProps) => {
    const createPlan = useCreateTopUpPlan();
    const updatePlan = useUpdateTopUpPlan();

    const form = useForm<PlanFormValues>({
        resolver: zodResolver(planSchema) as any,
        defaultValues: {
            name: '',
            amount: 0,
            coins: 0,
            bonusCoins: 0,
            description: '',
            isPopular: false,
            isActive: true,
        },
    });

    useEffect(() => {
        if (open) {
            if (plan) {
                form.reset({
                    name: plan.name,
                    amount: Number(plan.amount),
                    coins: plan.coins,
                    bonusCoins: plan.bonusCoins || 0,
                    description: plan.description || '',
                    isPopular: plan.isPopular || false,
                    isActive: plan.isActive,
                });
            } else {
                form.reset({
                    name: '',
                    amount: 0,
                    coins: 0,
                    bonusCoins: 0,
                    description: '',
                    isPopular: false,
                    isActive: true,
                });
            }
        }
    }, [plan, form, open]);

    const onSubmit = (values: PlanFormValues) => {
        if (plan) {
            updatePlan.mutate(
                { id: plan.id, dto: values },
                {
                    onSuccess: () => {
                        onOpenChange(false);
                        form.reset();
                    },
                }
            );
        } else {
            createPlan.mutate(values as CreateTopUpPlanDto, {
                onSuccess: () => {
                    onOpenChange(false);
                    form.reset();
                },
            });
        }
    };

    const isPending = createPlan.isPending || updatePlan.isPending;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] rounded-2xl">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center p-2">
                            <img src={COIN_URL} alt="KC" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <DialogTitle>{plan ? 'Edit Top-up Plan' : 'Create Top-up Plan'}</DialogTitle>
                            <DialogDescription>
                                {plan 
                                    ? 'Update the details of the existing top-up package.' 
                                    : 'Add a new KC coin package for users and influencers.'}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Plan Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Starter Pack" {...field} className="rounded-xl" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount (INR)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="100" {...field} className="rounded-xl" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="coins"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>K Coins</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="150" {...field} className="rounded-xl" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="bonusCoins"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bonus Coins (Optional)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="20" {...field} className="rounded-xl" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            placeholder="e.g. Best for beginners, 20% extra coins" 
                                            {...field} 
                                            className="rounded-xl resize-none" 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <FormField
                                control={form.control}
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-xl border border-border/50 p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Active</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isPopular"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-xl border border-border/50 p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Popular</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="rounded-xl"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending} className="rounded-xl">
                                {isPending ? 'Saving...' : plan ? 'Update Plan' : 'Create Plan'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
