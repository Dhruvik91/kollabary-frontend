'use client';

import { useState } from 'react';
import { useInfluencerSearch } from '@/hooks/useInfluencers';
import { InfluencerCard } from '../InfluencerCard';
import { InfluencerFilters } from '../components/InfluencerFilters';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Users } from 'lucide-react';

const CATEGORIES = ['Lifestyle', 'Fashion', 'Tech', 'Fitness', 'Travel', 'Food', 'Gaming'];

export function InfluencerSearchContainer() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = useInfluencerSearch({
        search: searchQuery,
        niche: selectedNiches[0], // DTO expects single string
        platform: selectedPlatforms[0], // DTO expects single string
        page,
        limit: 12
    });

    const togglePlatform = (platform: string) => {
        setSelectedPlatforms(prev =>
            prev.includes(platform) ? [] : [platform]
        );
        setPage(1);
    };

    const toggleNiche = (niche: string) => {
        setSelectedNiches(prev =>
            prev.includes(niche) ? [] : [niche]
        );
        setPage(1);
    };

    const handleReset = () => {
        setSearchQuery('');
        setSelectedPlatforms([]);
        setSelectedNiches([]);
        setPage(1);
    };

    const hasActiveFilters = selectedPlatforms.length > 0 || selectedNiches.length > 0;

    return (
        <div className="container px-4 py-12 mx-auto">
            <div className="flex flex-col mb-12">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Find Your Perfect Match</h1>
                <p className="text-muted-foreground">Discover and connect with top-tier influencers for your next big campaign.</p>
            </div>

            <InfluencerFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                selectedPlatforms={selectedPlatforms}
                togglePlatform={togglePlatform}
                selectedNiches={selectedNiches}
                toggleNiche={toggleNiche}
                clearFilters={handleReset}
                hasActiveFilters={hasActiveFilters}
            />

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                    <p className="text-muted-foreground animate-pulse">Scanning the social sphere...</p>
                </div>
            ) : isError ? (
                <div className="text-center py-20 text-destructive bg-destructive/5 rounded-2xl border border-destructive/10">
                    <p>Something went wrong. Please try again later.</p>
                </div>
            ) : !data?.items || data.items.length === 0 ? (
                <div className="text-center py-20 glass-enhanced rounded-3xl">
                    <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                    <p className="text-xl font-medium mb-2">No influencers found</p>
                    <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {data.items.map((influencer) => (
                            <InfluencerCard key={influencer.id} influencer={influencer} />
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Pagination component can be added here */}
        </div>
    );
}
