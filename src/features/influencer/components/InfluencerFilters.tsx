'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, Users, Globe2, Briefcase, ChevronDown, Check } from 'lucide-react';
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

const NICHE_OPTIONS = [
    { label: 'All Categories', value: '' },
    { label: 'Lifestyle', value: 'Lifestyle' },
    { label: 'Fitness', value: 'Fitness' },
    { label: 'Technology', value: 'Technology' },
    { label: 'Fashion', value: 'Fashion' },
    { label: 'Beauty', value: 'Beauty' },
    { label: 'Travel', value: 'Travel' },
    { label: 'Finance', value: 'Finance' },
];

const PLATFORM_OPTIONS = [
    { label: 'All Platforms', value: '' },
    { label: 'Instagram', value: 'instagram' },
    { label: 'TikTok', value: 'tiktok' },
    { label: 'YouTube', value: 'youtube' },
    { label: 'X (Twitter)', value: 'twitter' },
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

                {/* Niche */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
                        Content Niche
                    </label>
                    <div className="relative group">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" size={18} />
                        <Select
                            value={filters.niche || 'all'}
                            onValueChange={(val) => onFilterChange({ niche: val === 'all' ? '' : val })}
                        >
                            <SelectTrigger className="w-full pl-12 h-12 bg-background/50 border-border/50 rounded-2xl focus:ring-primary/20 transition-all font-medium hover:bg-background/80 hover:cursor-pointer">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-border/50 backdrop-blur-xl">
                                {NICHE_OPTIONS.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value || 'all'} className="rounded-xl hover:cursor-pointer px-4">
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Platform */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
                        Primary Platform
                    </label>
                    <div className="relative group">
                        <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10" size={18} />
                        <Select
                            value={filters.platform || 'all'}
                            onValueChange={(val) => onFilterChange({ platform: val === 'all' ? '' : val })}
                        >
                            <SelectTrigger className="w-full pl-12 h-12 bg-background/50 border-border/50 rounded-2xl focus:ring-primary/20 transition-all font-medium hover:bg-background/80 hover:cursor-pointer">
                                <SelectValue placeholder="All Platforms" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-border/50 backdrop-blur-xl">
                                {PLATFORM_OPTIONS.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value || 'all'} className="rounded-xl hover:cursor-pointer px-4">
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Min Followers */}
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
                        Minimum Followers
                    </label>
                    <div className="relative group">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                            type="number"
                            placeholder="e.g. 10000"
                            className="pl-12 h-12 bg-background/50 border-border/50 rounded-2xl focus:ring-primary/20 font-medium"
                            value={filters.minFollowers !== undefined && filters.minFollowers !== null ? filters.minFollowers : ''}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === '') {
                                    onFilterChange({ minFollowers: undefined });
                                } else {
                                    const num = Number(val);
                                    if (!isNaN(num)) onFilterChange({ minFollowers: num });
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            <Button
                variant="ghost"
                onClick={onReset || (() => onFilterChange({ search: '', niche: '', platform: '', minFollowers: undefined }))}
                className="w-full h-11 text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 group hover:bg-primary/5 rounded-xl border-none"
            >
                <span className="group-hover:translate-x-0 transition-transform">Clear All Filters</span>
            </Button>
        </div>
    );
};
