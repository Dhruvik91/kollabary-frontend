"use client";

import { useState } from "react";
import { useInfluencerSearch } from "@/hooks/useInfluencers";
import { useDebounce } from "@/hooks/useDebounce";
import { InfluencerFilters } from "../components/InfluencerFilters";
import { InfluencerList } from "../components/InfluencerList";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";

export function InfluencerContainer() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    const debouncedSearch = useDebounce(searchQuery, 500);

    const activeNiche = selectedNiches.length > 0 ? selectedNiches[0] : undefined;
    const activePlatform = selectedPlatforms.length > 0 ? selectedPlatforms[0] : undefined;

    const { data, isLoading } = useInfluencerSearch({
        search: debouncedSearch,
        niche: activeNiche,
        platform: activePlatform,
        page: 1,
        limit: 12
    });

    const influencers = data?.items || [];
    const totalInfluencers = data?.meta?.total || 0;

    const togglePlatform = (platform: string) => {
        setSelectedPlatforms((prev) =>
            prev.includes(platform) ? [] : [platform]
        );
    };

    const toggleNiche = (niche: string) => {
        setSelectedNiches((prev) =>
            prev.includes(niche) ? [] : [niche]
        );
    };

    const clearFilters = () => {
        setSelectedPlatforms([]);
        setSelectedNiches([]);
        setSearchQuery("");
    };

    const hasActiveFilters = selectedPlatforms.length > 0 || selectedNiches.length > 0 || searchQuery !== "";

    return (
        <PageContainer className="max-w-7xl">
            <PageHeader
                title="Discover Creators"
                description="Find the perfect influencers for your brand from our curated marketplace."
            />

            <InfluencerFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                selectedPlatforms={selectedPlatforms}
                togglePlatform={togglePlatform}
                selectedNiches={selectedNiches}
                toggleNiche={toggleNiche}
                clearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
            />

            <InfluencerList
                influencers={influencers as any[]}
                isLoading={isLoading}
                totalInfluencers={totalInfluencers}
                clearFilters={clearFilters}
            />
        </PageContainer>
    );
}
