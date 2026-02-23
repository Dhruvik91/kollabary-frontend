'use client';

import React from 'react';
import { Review } from '@/types/review.types';
import { Star, Trash2, Edit2, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';

interface ReviewCardProps {
    review: Review;
    onEdit?: (review: Review) => void;
    onDelete?: (id: string) => void;
    className?: string;
}

export const ReviewCard = ({ review, onEdit, onDelete, className }: ReviewCardProps) => {
    const { user } = useAuth();
    const isOwner = user?.id === review.reviewer.id;

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                size={14}
                className={cn(
                    "transition-all duration-300",
                    i < rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"
                )}
            />
        ));
    };

    return (
        <Card className={cn("group border-border/50 bg-card/30 backdrop-blur-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500", className)}>
            <CardContent className="p-6 relative">
                <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 border-2 border-background shadow-lg">
                        <AvatarImage src={review.reviewer.profile?.avatarUrl} />
                        <AvatarFallback className="bg-primary/5 text-primary font-bold text-xs">
                            {review.reviewer.profile?.fullName?.[0] || review.reviewer.email[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="space-y-0.5">
                                <h4 className="font-bold text-sm tracking-tight">
                                    {review.reviewer.profile?.fullName || review.reviewer.email.split('@')[0]}
                                </h4>
                                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                                    {format(new Date(review.createdAt), 'MMM d, yyyy')}
                                </p>
                            </div>

                            <div className="flex items-center gap-1 bg-yellow-500/5 px-2 py-1 rounded-full border border-yellow-500/10">
                                {renderStars(review.rating)}
                            </div>
                        </div>

                        <p className="text-sm leading-relaxed text-muted-foreground italic line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                            "{review.comment}"
                        </p>

                        {isOwner && (onEdit || onDelete) && (
                            <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {onEdit && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 rounded-xl gap-2 hover:bg-primary/10 hover:text-primary transition-all font-bold text-[11px]"
                                        onClick={() => onEdit(review)}
                                    >
                                        <Edit2 size={12} />
                                        Edit
                                    </Button>
                                )}
                                {onDelete && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 rounded-xl gap-2 hover:bg-destructive/10 hover:text-destructive transition-all font-bold text-[11px]"
                                        onClick={() => onDelete(review.id)}
                                    >
                                        <Trash2 size={12} />
                                        Delete
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
