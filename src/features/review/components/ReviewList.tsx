'use client';

import React from 'react';
import { Review } from '@/types/review.types';
import { ReviewCard } from './ReviewCard';
import { Loader2, MessageSquareOff, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReviewListProps {
    reviews: Review[];
    isLoading: boolean;
    onEdit?: (review: Review) => void;
    onDelete?: (id: string) => void;
}

export const ReviewList = ({ reviews, isLoading, onEdit, onDelete }: ReviewListProps) => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary/40" />
                <p className="text-muted-foreground text-xs font-black uppercase tracking-widest animate-pulse">
                    Fetching reviews...
                </p>
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 bg-muted/5 rounded-[3rem] border-2 border-dashed border-border/50">
                <div className="relative">
                    <div className="absolute -inset-4 bg-primary/5 rounded-full blur-xl animate-pulse" />
                    <div className="relative w-20 h-20 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary/40 rotate-6 border border-primary/10">
                        <MessageSquareOff size={40} />
                    </div>
                </div>
                <div className="space-y-2 max-w-xs">
                    <h3 className="font-bold text-xl tracking-tight">No reviews yet</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        This influencer hasn't received any feedback from brand partners yet. Be the first to collaborate!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-1 bg-primary rounded-full" />
                    <h3 className="text-lg font-black tracking-tighter uppercase">Recent Feedback</h3>
                </div>
                <div className="flex items-center gap-2 bg-muted/30 px-3 py-1.5 rounded-2xl border border-border/50">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-black italic">
                        {reviews.length} total reviews
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                        >
                            <ReviewCard
                                review={review}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
