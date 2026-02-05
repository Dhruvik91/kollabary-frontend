'use client';

import { useState, useEffect } from 'react';
import { useCreateReview, useUpdateReview } from '@/hooks/useReviews';
import { Star, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface ReviewFormProps {
    influencerId: string;
    onSuccess?: () => void;
    initialData?: {
        id: string;
        rating: number;
        comment: string;
    };
}

export function ReviewForm({ influencerId, onSuccess, initialData }: ReviewFormProps) {
    const [rating, setRating] = useState(initialData?.rating || 0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState(initialData?.comment || '');

    const createReview = useCreateReview();
    const updateReview = useUpdateReview();

    const isEditing = !!initialData;

    useEffect(() => {
        if (initialData) {
            setRating(initialData.rating);
            setComment(initialData.comment);
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }

        if (comment.length < 10) {
            toast.error('Comment must be at least 10 characters');
            return;
        }

        try {
            if (isEditing) {
                await updateReview.mutateAsync({
                    id: initialData.id,
                    influencerId,
                    data: { rating, comment },
                });
                toast.success('Review updated successfully!');
            } else {
                await createReview.mutateAsync({
                    influencerId,
                    rating,
                    comment,
                });
                toast.success('Review submitted successfully!');
            }

            if (!isEditing) {
                setRating(0);
                setComment('');
            }
            if (onSuccess) onSuccess();
        } catch (error) {
            toast.error(isEditing ? 'Failed to update review' : 'Failed to submit review');
            console.error(error);
        }
    };

    const isPending = createReview.isPending || updateReview.isPending;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground block text-center sm:text-left">
                    Rate your experience
                </label>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            className="focus:outline-none transition-transform active:scale-90"
                        >
                            <Star
                                className={`w-8 h-8 transition-all ${star <= (hover || rating)
                                    ? "text-yellow-500 fill-yellow-500 scale-110 drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]"
                                    : "text-muted-foreground/30"
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground block">
                    Share your thoughts
                </label>
                <Textarea
                    placeholder="Tell others about your collaboration... What went well? How was the communication?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[120px] bg-secondary/10 border-glass-border focus:border-primary/50 transition-all rounded-2xl p-4"
                />
            </div>

            <Button
                type="submit"
                disabled={isPending}
                className="w-full gradient-bg border-0 h-12 text-lg font-semibold glow-primary rounded-2xl"
            >
                {isPending ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                    <Send className="w-5 h-5 mr-2" />
                )}
                {isEditing ? 'Update Review' : 'Submit Review'}
            </Button>
        </form>
    );
}
