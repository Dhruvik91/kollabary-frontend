'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface InfluencerFiltersProps {
    search: string;
    onSearchChange: (val: string) => void;
    categories: string[];
    selectedCategories: string[];
    onCategoryToggle: (cat: string) => void;
    onReset: () => void;
}

export function InfluencerFilters({
    search,
    onSearchChange,
    categories,
    selectedCategories,
    onCategoryToggle,
    onReset
}: InfluencerFiltersProps) {
    return (
        <div className="space-y-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, category or bio..."
                        className="pl-10 h-12 bg-white/5 border-white/10 focus:ring-primary focus:border-primary rounded-xl"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="h-12 px-6 rounded-xl border-white/10 hover:bg-white/5">
                    <SlidersHorizontal className="h-5 w-5 mr-2" />
                    More Filters
                </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground mr-2">Top Categories:</span>
                {categories.map((cat) => (
                    <Badge
                        key={cat}
                        variant={selectedCategories.includes(cat) ? 'default' : 'outline'}
                        className={`cursor-pointer px-4 py-1.5 rounded-full transition-all border-white/10 ${selectedCategories.includes(cat)
                                ? 'bg-primary text-white scale-105'
                                : 'hover:bg-white/5'
                            }`}
                        onClick={() => onCategoryToggle(cat)}
                    >
                        {cat}
                    </Badge>
                ))}
                {selectedCategories.length > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-muted-foreground hover:text-foreground h-8 px-2"
                        onClick={onReset}
                    >
                        <X className="h-3 w-3 mr-1" />
                        Clear All
                    </Button>
                )}
            </div>
        </div>
    );
}
