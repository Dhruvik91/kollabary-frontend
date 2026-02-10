"use client";

import { Loader2, Search } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { InfluencerCard } from "@/components/features/influencer/InfluencerCard";
import { InfluencerProfile } from "@/types/influencer";

interface InfluencerListProps {
    influencers: InfluencerProfile[];
    isLoading: boolean;
    totalInfluencers: number;
    clearFilters: () => void;
}

export function InfluencerList({
    influencers,
    isLoading,
    totalInfluencers,
    clearFilters
}: InfluencerListProps) {
    return (
        <>
            {/* Results Count */}
            <div className="mb-6 h-6">
                {!isLoading && (
                    <p className="text-muted-foreground text-sm">
                        Showing <span className="text-foreground font-medium">{totalInfluencers}</span> creators
                    </p>
                )}
            </div>

            {/* Influencer Grid */}
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
            ) : influencers.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {influencers.map((influencer, index) => (
                        <InfluencerCard key={influencer.id} influencer={influencer} index={index} />
                    ))}
                </div>
            ) : (
                <GlassCard className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2">No creators found</h3>
                    <p className="text-muted-foreground mb-4">
                        Try adjusting your search or filters to find more creators.
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                        Clear all filters
                    </Button>
                </GlassCard>
            )}
        </>
    );
}
