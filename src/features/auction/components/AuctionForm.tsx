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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Auction Title</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Summer Brand Ambassador Program" {...field} className="rounded-xl border-border/50 h-11 focus:border-primary transition-all placeholder:text-[13px] sm:placeholder:text-sm" />
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
                            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Detailed Description</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Explain your requirements, deliverables, and specific goals..." 
                                    className="min-h-24 rounded-xl border-border/50 focus:border-primary transition-all resize-none placeholder:text-[13px] sm:placeholder:text-sm" 
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
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Min Budget ($)</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="number" 
                                        {...field} 
                                        value={field.value ?? ''}
                                        className="rounded-xl border-border/50 h-11 focus:border-primary transition-all" 
                                    />
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
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Max Budget ($)</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="number" 
                                        {...field} 
                                        value={field.value ?? ''}
                                        className="rounded-xl border-border/50 h-11 focus:border-primary transition-all" 
                                    />
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
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Deadline</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "h-11 rounded-xl border-border/50 text-left font-normal pl-3",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(new Date(field.value), "PPP")
                                                ) : (
                                                    <span className="text-[13px] sm:text-sm">Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value ? new Date(field.value) : undefined}
                                            onSelect={(date) => field.onChange(date?.toISOString())}
                                            disabled={(date) => date < new Date()}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="rounded-xl border-border/50 h-11 text-[13px] sm:text-sm">
                                            <SelectValue placeholder="Select type" className="placeholder:text-[13px] sm:placeholder:text-sm" />
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
                    className="w-full h-12 rounded-xl font-black text-xs uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-lg shadow-primary/10 active:scale-[0.98] transition-all mt-2"
                >
                    {isLoading ? 'Processing...' : (initialData ? 'Update Auction' : 'Post Auction')}
                </Button>
            </form>
        </Form>
    );
};
