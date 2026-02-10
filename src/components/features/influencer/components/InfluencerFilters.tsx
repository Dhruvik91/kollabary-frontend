"use client";

import { motion } from "framer-motion";
import { Search, Filter, X, Instagram, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/GlassCard";

interface InfluencerFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
    selectedPlatforms: string[];
    togglePlatform: (platform: string) => void;
    selectedNiches: string[];
    toggleNiche: (niche: string) => void;
    clearFilters: () => void;
    hasActiveFilters: boolean;
    platforms?: string[];
    niches?: string[];
}

const DEFAULT_PLATFORMS = ["Instagram", "TikTok", "YouTube", "Twitter"];
const DEFAULT_NICHES = ["Fashion", "Technology", "Fitness", "Food", "Travel", "Beauty", "Gaming", "Lifestyle"];

export function InfluencerFilters({
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    selectedPlatforms,
    togglePlatform,
    selectedNiches,
    toggleNiche,
    clearFilters,
    hasActiveFilters,
    platforms = DEFAULT_PLATFORMS,
    niches = DEFAULT_NICHES
}: InfluencerFiltersProps) {
    return (
        <div className="mb-8 overflow-hidden rounded-xl border border-border/40 bg-card shadow-sm">
            <div className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            placeholder="Search creators by name, bio, or username..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-10 bg-background/50"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                            className="h-10 border-border/40"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Filters
                            {hasActiveFilters && (
                                <Badge className="ml-2 gradient-bg border-0 text-[10px] px-1.5 h-4">
                                    {(selectedPlatforms.length > 0 ? 1 : 0) + (selectedNiches.length > 0 ? 1 : 0)}
                                </Badge>
                            )}
                        </Button>
                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                onClick={clearFilters}
                                className="h-10 text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Clear
                            </Button>
                        )}
                    </div>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div className="mt-6 pt-6 border-t border-border/40 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Platforms */}
                            <div>
                                <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-muted-foreground">
                                    <Instagram className="w-4 h-4" />
                                    Platforms
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {platforms.map((platform) => (
                                        <Badge
                                            key={platform}
                                            variant={selectedPlatforms.includes(platform) ? "default" : "secondary"}
                                            className={`cursor-pointer transition-all ${selectedPlatforms.includes(platform)
                                                ? "gradient-bg border-0"
                                                : "bg-secondary/80 hover:bg-secondary"
                                                }`}
                                            onClick={() => togglePlatform(platform)}
                                        >
                                            {platform}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Niches */}
                            <div>
                                <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-muted-foreground">
                                    <Sparkles className="w-4 h-4" />
                                    Categories
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {niches.map((niche) => (
                                        <Badge
                                            key={niche}
                                            variant={selectedNiches.includes(niche) ? "default" : "secondary"}
                                            className={`cursor-pointer transition-all ${selectedNiches.includes(niche)
                                                ? "gradient-bg border-0"
                                                : "bg-secondary/80 hover:bg-secondary"
                                                }`}
                                            onClick={() => toggleNiche(niche)}
                                        >
                                            {niche}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
