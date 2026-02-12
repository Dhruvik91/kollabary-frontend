'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Star, Loader2, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

const reviewSchema = z.object({
    rating: z.number().min(1, 'Please select a rating').max(5),
    comment: z.string().min(10, 'Comment must be at least 10 characters').max(500),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
    initialData?: ReviewFormValues;
    onSubmit: (data: ReviewFormValues) => void;
    isLoading?: boolean;
    onCancel?: () => void;
}

export const ReviewForm = ({ initialData, onSubmit, isLoading, onCancel }: ReviewFormProps) => {
    const [hoveredRating, setHoveredRating] = useState(0);

    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewSchema),
        defaultValues: initialData || {
            rating: 0,
            comment: '',
        },
    });

    const currentRating = form.watch('rating');

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem className="space-y-4">
                            <FormLabel className="text-center block text-xs font-black uppercase tracking-widest text-muted-foreground">
                                How was your collaboration?
                            </FormLabel>
                            <FormControl>
                                <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className="group transition-all duration-300 hover:scale-125 focus:outline-none"
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            onClick={() => field.onChange(star)}
                                        >
                                            <Star
                                                size={36}
                                                className={cn(
                                                    "transition-colors duration-300",
                                                    (hoveredRating || currentRating) >= star
                                                        ? "text-yellow-500 fill-yellow-500"
                                                        : "text-muted-foreground/20"
                                                )}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </FormControl>
                            <FormMessage className="text-center font-bold" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem className="space-y-4">
                            <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                                Share your experience
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Tell us about the influencer's professionalism, delivery time, and overall performance..."
                                    className="min-h-[160px] rounded-3xl border-border/50 bg-muted/20 backdrop-blur-sm focus:ring-primary/20 resize-none p-6 text-sm leading-relaxed"
                                />
                            </FormControl>
                            <FormMessage className="font-bold" />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4 pt-2">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            className="flex-1 h-12 rounded-2xl font-bold border-border/50 hover:bg-muted/50"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className="flex-1 h-12 rounded-2xl font-bold gap-3 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <>
                                <Send size={18} />
                                Submit Review
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
