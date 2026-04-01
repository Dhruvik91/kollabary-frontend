'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { bidSchema, BidFormValues } from '@/lib/validations/auction.validation';
import { CreateBidDto } from '@/types/auction.types';

interface BidFormProps {
    onSubmit: (data: CreateBidDto) => void;
    isLoading?: boolean;
    suggestedMin?: number;
    suggestedMax?: number;
}

export const BidForm = ({ onSubmit, isLoading, suggestedMin, suggestedMax }: BidFormProps) => {
    const form = useForm<BidFormValues>({
        resolver: zodResolver(bidSchema) as any,
        defaultValues: {
            amount: suggestedMin || 0,
            proposal: '',
        },
    });

    const onFormSubmit = (data: BidFormValues) => {
        onSubmit(data as CreateBidDto);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
                <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Budget Hint</p>
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        {suggestedMin && suggestedMax 
                            ? `The brand's budget range is $${suggestedMin} - $${suggestedMax}.`
                            : suggestedMin ? `The brand's starting budget is $${suggestedMin}.`
                            : 'This auction has a competitive budget.'}
                    </p>
                </div>

                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs font-black uppercase tracking-widest text-zinc-500">Your Bid Amount ($)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter your rate" {...field} className="rounded-xl border-2 h-12 focus:border-primary transition-all" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="proposal"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs font-black uppercase tracking-widest text-zinc-500">Your Pitch</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Explain why you are the best fit for this collaboration..." 
                                    className="min-h-32 rounded-xl border-2 focus:border-primary transition-all resize-none" 
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 active:scale-95 transition-all"
                >
                    {isLoading ? 'Placing Bid...' : 'Submit Bid'}
                </Button>
            </form>
        </Form>
    );
};
