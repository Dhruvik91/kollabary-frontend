"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Flag, ThumbsUp, MoreVertical, Filter } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ReportDialog } from "@/components/features/report/ReportDialog";

interface Review {
    id: string;
    author: string;
    authorAvatar?: string;
    rating: number;
    text: string;
    date: string;
    helpful: number;
    categories?: {
        communication: number;
        quality: number;
        professionalism: number;
        timeliness: number;
    };
    verified: boolean;
}

interface ReviewsSectionProps {
    reviews: Review[];
    influencerName: string;
    averageRating: number;
    totalReviews: number;
}

function StarDisplay({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
    const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";

    return (
        <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`${sizeClass} ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"
                        }`}
                    aria-hidden="true"
                />
            ))}
        </div>
    );
}

function RatingBar({ label, value, count }: { label: string; value: number; count: number }) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground w-8">{label}</span>
            <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="h-full rounded-full gradient-bg"
                />
            </div>
            <span className="text-sm text-muted-foreground w-8">{count}</span>
        </div>
    );
}

export function ReviewsSection({
    reviews,
    influencerName,
    averageRating,
    totalReviews,
}: ReviewsSectionProps) {
    const [filter, setFilter] = useState<string>("all");
    const [reportDialogOpen, setReportDialogOpen] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState<string>("");
    const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());

    // Calculate rating distribution
    const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
        rating,
        count: reviews.filter((r) => Math.floor(r.rating) === rating).length,
        percentage: (reviews.filter((r) => Math.floor(r.rating) === rating).length / reviews.length) * 100,
    }));

    const filteredReviews = reviews.filter((review) => {
        if (filter === "all") return true;
        if (filter === "verified") return review.verified;
        return Math.floor(review.rating) === parseInt(filter);
    });

    const handleHelpful = (reviewId: string) => {
        setHelpfulReviews((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(reviewId)) {
                newSet.delete(reviewId);
            } else {
                newSet.add(reviewId);
            }
            return newSet;
        });
    };

    const handleReportReview = (reviewId: string) => {
        setSelectedReviewId(reviewId);
        setReportDialogOpen(true);
    };

    return (
        <GlassCard className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="font-display text-xl font-semibold">Reviews & Ratings</h2>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-[140px] bg-secondary/50 border-glass-border">
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Reviews</SelectItem>
                            <SelectItem value="verified">Verified Only</SelectItem>
                            <SelectItem value="5">5 Stars</SelectItem>
                            <SelectItem value="4">4 Stars</SelectItem>
                            <SelectItem value="3">3 Stars</SelectItem>
                            <SelectItem value="2">2 Stars</SelectItem>
                            <SelectItem value="1">1 Star</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Rating Overview */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8 p-4 rounded-xl bg-secondary/20 border border-glass-border">
                {/* Average Rating */}
                <div className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                        <span className="font-display text-4xl font-bold">{averageRating.toFixed(1)}</span>
                        <div>
                            <StarDisplay rating={Math.round(averageRating)} size="md" />
                            <p className="text-sm text-muted-foreground mt-1">
                                {totalReviews} reviews
                            </p>
                        </div>
                    </div>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                    {ratingDistribution.map((dist) => (
                        <RatingBar
                            key={dist.rating}
                            label={`${dist.rating}★`}
                            value={dist.percentage}
                            count={dist.count}
                        />
                    ))}
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {filteredReviews.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        No reviews match your filter criteria.
                    </div>
                ) : (
                    filteredReviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-4 rounded-xl bg-secondary/30 border border-glass-border"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    {/* Author Avatar */}
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium shrink-0">
                                        {review.author.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-medium">{review.author}</span>
                                            {review.verified && (
                                                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                                                    Verified
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <StarDisplay rating={review.rating} />
                                            <span className="text-xs text-muted-foreground">{review.date}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Menu */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 shrink-0"
                                            aria-label="Review options"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() => handleReportReview(review.id)}
                                            className="text-destructive focus:text-destructive"
                                        >
                                            <Flag className="w-4 h-4 mr-2" />
                                            Report Review
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Review Text */}
                            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                                {review.text}
                            </p>

                            {/* Category Ratings */}
                            {review.categories && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {Object.entries(review.categories).map(([key, value]) => (
                                        <div
                                            key={key}
                                            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary/50 text-xs"
                                        >
                                            <span className="capitalize text-muted-foreground">{key}:</span>
                                            <span className="font-medium">{value}/5</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Helpful Button */}
                            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-glass-border/50">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`text-xs ${helpfulReviews.has(review.id)
                                            ? "text-primary"
                                            : "text-muted-foreground"
                                        }`}
                                    onClick={() => handleHelpful(review.id)}
                                >
                                    <ThumbsUp
                                        className={`w-3.5 h-3.5 mr-1.5 ${helpfulReviews.has(review.id) ? "fill-primary" : ""
                                            }`}
                                    />
                                    Helpful ({review.helpful + (helpfulReviews.has(review.id) ? 1 : 0)})
                                </Button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Report Dialog */}
            <ReportDialog
                isOpen={reportDialogOpen}
                onClose={() => setReportDialogOpen(false)}
                type="review"
                targetName={reviews.find((r) => r.id === selectedReviewId)?.author || ""}
                targetId={selectedReviewId}
            />
        </GlassCard>
    );
}
