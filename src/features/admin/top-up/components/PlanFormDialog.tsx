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
import { TopUpPlan, CreateTopUpPlanDto } from '@/types/payment.types';
import { useCreateTopUpPlan, useUpdateTopUpPlan } from '@/hooks/queries/useAdminQueries';

const planSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    amount: z.coerce.number().min(1, 'Amount must be greater than 0'),
    coins: z.coerce.number().min(1, 'Coins must be greater than 0'),
    isActive: z.boolean().default(true),
});

type PlanFormValues = {
    name: string;
    amount: number;
    coins: number;
    isActive: boolean;
};

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
            isActive: true,
        },
    });

    useEffect(() => {
        if (plan) {
            form.reset({
                name: plan.name,
                amount: Number(plan.amount),
                coins: plan.coins,
                isActive: plan.isActive,
            });
        } else {
            form.reset({
                name: '',
                amount: 0,
                coins: 0,
                isActive: true,
            });
        }
    }, [plan, form]);

    const onSubmit = (values: PlanFormValues) => {
        if (plan) {
            updatePlan.mutate(
                { id: plan.id, dto: values },
                {
                    onSuccess: () => onOpenChange(false),
                }
            );
        } else {
            createPlan.mutate(values as CreateTopUpPlanDto, {
                onSuccess: () => onOpenChange(false),
            });
        }
    };

    const isPending = createPlan.isPending || updatePlan.isPending;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] rounded-2xl">
                <DialogHeader>
                    <DialogTitle>{plan ? 'Edit Top-up Plan' : 'Create Top-up Plan'}</DialogTitle>
                    <DialogDescription>
                        {plan 
                            ? 'Update the details of the existing top-up package.' 
                            : 'Add a new KC coin package for users and influencers.'}
                    </DialogDescription>
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
