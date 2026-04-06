'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, Users, Globe2, Briefcase, ChevronDown, Check, Award, Star, CheckCircle2, LayoutGrid } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchInfluencersDto } from '@/types/influencer.types';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface InfluencerFiltersProps {
    filters: SearchInfluencersDto;
    onFilterChange: (filters: Partial<SearchInfluencersDto>) => void;
    onReset?: () => void;
    className?: string;
}


const PLATFORM_OPTIONS = [
    { label: 'All Platforms', value: '' },
    { label: 'Instagram', value: 'instagram' },
    { label: 'TikTok', value: 'tiktok' },
    { label: 'YouTube', value: 'youtube' },
    { label: 'X (Twitter)', value: 'twitter' },
];

const RANKING_TIER_OPTIONS = [
    { label: 'All Ranks', value: '' },
    { label: 'Rising Creator', value: 'Rising Creator' },
    { label: 'Emerging Partner', value: 'Emerging Partner' },
    { label: 'Established Influencer', value: 'Established Influencer' },
    { label: 'Premium Collaborator', value: 'Premium Collaborator' },
    { label: 'Elite Ambassador', value: 'Elite Ambassador' },
    { label: 'Legendary Icon', value: 'Legendary Icon' },
];

const RATING_OPTIONS = [
    { label: 'Any Rating', value: '' },
    { label: '4+ Stars', minValue: 4, maxValue: 5 },
    { label: '3+ Stars', minValue: 3, maxValue: 5 },
    { label: '2+ Stars', minValue: 2, maxValue: 5 },
];

export const InfluencerFilters = ({ filters, onFilterChange, onReset, className }: InfluencerFiltersProps) => {
    return (
        <div className={cn("space-y-6 bg-card/30 backdrop-blur-xl border border-border/50 p-6 rounded-[2rem]", className)}>
            {!className && (
                <div className="flex items-center gap-2 text-primary">
                    <SlidersHorizontal size={18} />
                    <h2 className="font-bold tracking-tight">Advanced Filters</h2>
                </div>
            )}

            <div className="space-y-4">
                {/* Search */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
                        Search Creators
                    </label>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                        <Input
                            placeholder="Name, bio, or username..."
                            className="pl-12 h-12 bg-background/50 border-border/50 rounded-2xl focus:ring-primary/20 transition-all font-medium"
                            value={filters.search || ''}
                            onChange={(e) => onFilterChange({ search: e.target.value })}
                        />
                    </div>
                </div>

                {/* Categories (Multi) */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
                        Categories
                    </label>
                    <div className="relative group">
                        <LayoutGrid className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" size={18} />
                        <Input
                            placeholder="Search categories (e.g. Beauty, Tech)"
                            className="pl-12 h-12 bg-background/50 border-border/50 rounded-2xl focus:ring-primary/20 font-medium"
                            value={filters.categories?.join(', ') || ''}
                            onChange={(e) => onFilterChange({ categories: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                        />
                    </div>
                </div>

                {/* Follower Range */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
                            Min Followers
                        </label>
                        <div className="relative group">
                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <Input
                                type="number"
                                placeholder="0"
                                className="pl-10 h-11 bg-background/50 border-border/50 rounded-xl focus:ring-primary/20 font-medium text-sm"
                                value={filters.minFollowers ?? ''}
                                onChange={(e) => onFilterChange({ minFollowers: e.target.value === '' ? undefined : Number(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
                            Max Followers
                        </label>
                        <div className="relative group">
                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <Input
                                type="number"
                                placeholder="Any"
                                className="pl-10 h-11 bg-background/50 border-border/50 rounded-xl focus:ring-primary/20 font-medium text-sm"
                                value={filters.maxFollowers ?? ''}
                                onChange={(e) => onFilterChange({ maxFollowers: e.target.value === '' ? undefined : Number(e.target.value) })}
                            />
                        </div>
                    </div>
                </div>

                {/* Price Range */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
                            Min Price ($)
                        </label>
                        <Input
                            type="number"
                            placeholder="0"
                            className="h-11 bg-background/50 border-border/50 rounded-xl focus:ring-primary/20 font-medium text-sm"
                            value={filters.priceMin ?? ''}
                            onChange={(e) => onFilterChange({ priceMin: e.target.value === '' ? undefined : Number(e.target.value) })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
                            Max Price ($)
                        </label>
                        <Input
                            type="number"
                            placeholder="Any"
                            className="h-11 bg-background/50 border-border/50 rounded-xl focus:ring-primary/20 font-medium text-sm"
                            value={filters.priceMax ?? ''}
                            onChange={(e) => onFilterChange({ priceMax: e.target.value === '' ? undefined : Number(e.target.value) })}
                        />
                    </div>
                </div>

                {/* Engagement & Gender */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
                            Min ER (%)
                        </label>
                        <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            className="h-11 bg-background/50 border-border/50 rounded-xl focus:ring-primary/20 font-medium text-sm"
                            value={filters.minEngagementRate ?? ''}
                            onChange={(e) => onFilterChange({ minEngagementRate: e.target.value === '' ? undefined : Number(e.target.value) })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
                            Gender
                        </label>
                        <Select
                            value={filters.gender || 'all'}
                            onValueChange={(val) => onFilterChange({ gender: val === 'all' ? undefined : val })}
                        >
                            <SelectTrigger className="h-11 bg-background/50 border-border/50 rounded-xl focus:ring-primary/20 font-medium text-sm">
                                <SelectValue placeholder="Any" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="all">Any</SelectItem>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Non-binary">Non-binary</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Country Filter */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
                        Location (Country)
                    </label>
                    <div className="relative group">
                        <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" size={18} />
                        <Input
                            placeholder="e.g. United States"
                            className="pl-12 h-12 bg-background/50 border-border/50 rounded-2xl focus:ring-primary/20 font-medium"
                            value={filters.locationCountry || ''}
                            onChange={(e) => onFilterChange({ locationCountry: e.target.value })}
                        />
                    </div>
                </div>

                {/* Ranking Tier */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
                        Ranking Tier
                    </label>
                    <div className="relative group">
                        <Award className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" size={18} />
                        <Select
                            value={filters.rankingTier || 'all'}
                            onValueChange={(val) => onFilterChange({ rankingTier: val === 'all' ? '' : val })}
                        >
                            <SelectTrigger className="w-full pl-12 h-12 bg-background/50 border-border/50 rounded-2xl focus:ring-primary/20 transition-all font-medium hover:bg-background/80 hover:cursor-pointer">
                                <SelectValue placeholder="All Ranks" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-border/50 backdrop-blur-xl">
                                {RANKING_TIER_OPTIONS.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value || 'all'} className="rounded-xl hover:cursor-pointer px-4">
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Verified Filter */}
                <div className="space-y-2">
                    <button
                        type="button"
                        onClick={() => onFilterChange({ verified: filters.verified ? undefined : true })}
                        className={cn(
                            "w-full h-12 rounded-2xl border-border/50 border bg-background/50 hover:bg-background/80 transition-all font-medium flex items-center gap-3 px-4",
                            filters.verified && "bg-primary/10 border-primary/50 text-primary"
                        )}
                    >
                        <CheckCircle2 size={18} className={filters.verified ? "text-primary" : "text-muted-foreground"} />
                        <span className="flex-1 text-left">
                            {filters.verified ? 'Verified Only' : 'All Creators'}
                        </span>
                        {filters.verified && (
                            <Check size={16} className="text-primary" />
                        )}
                    </button>
                </div>
            </div>

            <Button
                variant="ghost"
                onClick={onReset || (() => onFilterChange({ 
                    search: '', 
                    categories: [],
                    platform: '', 
                    minFollowers: undefined, 
                    rankingTier: '', 
                    minRating: undefined, 
                    maxRating: undefined, 
                    verified: undefined 
                }))}
                className="w-full h-11 text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 group hover:bg-primary/5 rounded-xl border-none"
            >
                <span className="group-hover:translate-x-0 transition-transform">Clear All Filters</span>
            </Button>
        </div>
    );
};
