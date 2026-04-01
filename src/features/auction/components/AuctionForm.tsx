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
import { auctionSchema, AuctionFormValues } from '@/lib/validations/auction.validation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { CollaborationType } from '@/types/influencer.types';
import { CreateAuctionDto } from '@/types/auction.types';
import { formatCollaborationType } from '@/lib/format-collaboration-type';

interface AuctionFormProps {
    initialData?: Partial<CreateAuctionDto>;
    onSubmit: (data: CreateAuctionDto) => void;
    isLoading?: boolean;
}

export const AuctionForm = ({ initialData, onSubmit, isLoading }: AuctionFormProps) => {
    const form = useForm<AuctionFormValues>({
        resolver: zodResolver(auctionSchema) as any,
        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            minBudget: initialData?.minBudget,
            maxBudget: initialData?.maxBudget,
            deadline: initialData?.deadline || '',
            category: initialData?.category,
        },
    });

    const onFormSubmit = (data: AuctionFormValues) => {
        onSubmit(data as CreateAuctionDto);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xs font-black uppercase tracking-widest text-zinc-500">Auction Title</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Summer Brand Ambassador Program" {...field} className="rounded-xl border-2 h-12 focus:border-primary transition-all" />
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
                            <FormLabel className="text-xs font-black uppercase tracking-widest text-zinc-500">Detailed Description</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Explain your requirements, deliverables, and specific goals..." 
                                    className="min-h-32 rounded-xl border-2 focus:border-primary transition-all resize-none" 
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="minBudget"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-black uppercase tracking-widest text-zinc-500">Min Budget ($)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} className="rounded-xl border-2 h-12 focus:border-primary transition-all" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="maxBudget"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-black uppercase tracking-widest text-zinc-500">Max Budget ($)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} className="rounded-xl border-2 h-12 focus:border-primary transition-all" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="deadline"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-black uppercase tracking-widest text-zinc-500">Deadline</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} className="rounded-xl border-2 h-12 focus:border-primary transition-all" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-black uppercase tracking-widest text-zinc-500">Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="rounded-xl border-2 h-12">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.values(CollaborationType).map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {formatCollaborationType(type)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 active:scale-95 transition-all"
                >
                    {initialData ? 'Update Auction' : 'Post Auction'}
                </Button>
            </form>
        </Form>
    );
};
