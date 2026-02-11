'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, Users, Globe2, Briefcase, ChevronDown, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SearchInfluencersDto } from '@/types/influencer.types';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SelectOption {
    label: string;
    value: string;
}

interface CustomSelectProps {
    label: string;
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    icon: React.ElementType;
}

const CustomSelect = ({ label, options, value, onChange, placeholder, icon: Icon }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="space-y-2" ref={containerRef}>
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">
                {label}
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "w-full flex items-center gap-3 pl-12 pr-4 h-12 bg-background/50 border rounded-2xl transition-all text-sm text-left relative",
                        isOpen ? "border-primary ring-2 ring-primary/20" : "border-border/50",
                        !value && "text-muted-foreground"
                    )}
                >
                    <Icon className="absolute left-4 text-muted-foreground" size={18} />
                    <span className="flex-1 truncate">
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <ChevronDown
                        size={16}
                        className={cn("text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")}
                    />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute top-full left-0 right-0 mt-2 z-50 bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
                        >
                            <div className="max-h-60 overflow-y-auto p-2 scrollbar-none">
                                {options.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => {
                                            onChange(option.value);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors",
                                            value === option.value
                                                ? "bg-primary text-primary-foreground font-bold"
                                                : "hover:bg-muted text-foreground"
                                        )}
                                    >
                                        {option.label}
                                        {value === option.value && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

interface InfluencerFiltersProps {
    filters: SearchInfluencersDto;
    onFilterChange: (filters: Partial<SearchInfluencersDto>) => void;
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

export const InfluencerFilters = ({ filters, onFilterChange, className }: InfluencerFiltersProps) => {
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
                <CustomSelect
                    label="Content Niche"
                    placeholder="All Categories"
                    options={NICHE_OPTIONS}
                    value={filters.niche || ''}
                    onChange={(val) => onFilterChange({ niche: val })}
                    icon={Briefcase}
                />

                {/* Platform */}
                <CustomSelect
                    label="Primary Platform"
                    placeholder="All Platforms"
                    options={PLATFORM_OPTIONS}
                    value={filters.platform || ''}
                    onChange={(val) => onFilterChange({ platform: val })}
                    icon={Globe2}
                />

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
                            value={filters.minFollowers || ''}
                            onChange={(e) => onFilterChange({ minFollowers: Number(e.target.value) || undefined })}
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={() => onFilterChange({ search: '', niche: '', platform: '', minFollowers: undefined })}
                className="w-full py-3 text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 group"
            >
                <span className="group-hover:translate-x-0 transition-transform">Clear All Filters</span>
            </button>
        </div>
    );
};
