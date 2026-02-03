"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X, Instagram, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { InfluencerCard } from "@/components/features/influencer/InfluencerCard";
import { mockInfluencers } from "@/data/mockInfluencers";

const platforms = ["Instagram", "TikTok", "YouTube", "Twitter"];
const niches = ["Fashion", "Technology", "Fitness", "Food", "Travel", "Beauty", "Gaming", "Lifestyle"];

export default function InfluencersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    const togglePlatform = (platform: string) => {
        setSelectedPlatforms((prev) =>
            prev.includes(platform)
                ? prev.filter((p) => p !== platform)
                : [...prev, platform]
        );
    };

    const toggleNiche = (niche: string) => {
        setSelectedNiches((prev) =>
            prev.includes(niche)
                ? prev.filter((n) => n !== niche)
                : [...prev, niche]
        );
    };

    const clearFilters = () => {
        setSelectedPlatforms([]);
        setSelectedNiches([]);
        setSearchQuery("");
    };

    const filteredInfluencers = mockInfluencers.filter((influencer) => {
        const matchesSearch =
            searchQuery === "" ||
            influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            influencer.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
            influencer.username.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesPlatform =
            selectedPlatforms.length === 0 ||
            influencer.platforms.some((p) =>
                selectedPlatforms.map((sp) => sp.toLowerCase()).includes(p.toLowerCase())
            );

        const matchesNiche =
            selectedNiches.length === 0 ||
            influencer.niches.some((n) => selectedNiches.includes(n));

        return matchesSearch && matchesPlatform && matchesNiche;
    });

    const hasActiveFilters = selectedPlatforms.length > 0 || selectedNiches.length > 0 || searchQuery !== "";

    return (
        <div className="min-h-screen">
            <BackgroundEffects />

            <main className="pt-32 pb-20 px-4">
                <div className="container max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                            Discover <span className="gradient-text">Creators</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                            Find the perfect influencers for your brand from our curated marketplace.
                        </p>
                    </motion.div>

                    {/* Search & Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8"
                    >
                        <GlassCard variant="subtle" className="p-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        placeholder="Search creators by name, bio, or username..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 bg-secondary/50 border-glass-border h-12"
                                    />
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="border-glass-border hover:bg-glass h-12"
                                >
                                    <Filter className="w-4 h-4 mr-2" />
                                    Filters
                                    {hasActiveFilters && (
                                        <Badge className="ml-2 gradient-bg border-0">
                                            {selectedPlatforms.length + selectedNiches.length}
                                        </Badge>
                                    )}
                                </Button>
                                {hasActiveFilters && (
                                    <Button
                                        variant="ghost"
                                        onClick={clearFilters}
                                        className="h-12"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Clear
                                    </Button>
                                )}
                            </div>

                            {/* Filter Panel */}
                            {showFilters && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="mt-6 pt-6 border-t border-glass-border"
                                >
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Platforms */}
                                        <div>
                                            <h3 className="font-medium mb-3 flex items-center gap-2">
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
                                            <h3 className="font-medium mb-3 flex items-center gap-2">
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
                                </motion.div>
                            )}
                        </GlassCard>
                    </motion.div>

                    {/* Results Count */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6"
                    >
                        <p className="text-muted-foreground">
                            Showing <span className="text-foreground font-medium">{filteredInfluencers.length}</span> creators
                        </p>
                    </motion.div>

                    {/* Influencer Grid */}
                    {filteredInfluencers.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredInfluencers.map((influencer, index) => (
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
                </div>
            </main>
        </div>
    );
}
