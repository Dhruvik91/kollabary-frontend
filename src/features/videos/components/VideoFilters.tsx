'use client';

import React from 'react';
import { SearchVideosForSaleDto } from '@/types/video.types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MultiSelect } from '@/components/ui/multi-select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { VIDEOS_CATEGORIES } from '@/constants';

interface VideoFiltersProps {
  filters: SearchVideosForSaleDto;
  onFilterChange: (filters: SearchVideosForSaleDto) => void;
}

export const VideoFilters = ({
  filters,
  onFilterChange,
}: VideoFiltersProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value || undefined });
  };

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
    const numVal = value === '' ? undefined : Number(value);
    onFilterChange({ ...filters, [field]: numVal });
  };

  const clearFilters = () => {
    onFilterChange({
      page: 1,
      limit: filters.limit,
      search: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      categories: undefined,
      influencerId: filters.influencerId,
    });
  };

  const hasActiveFilters =
    !!filters.search ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    (filters.categories && filters.categories.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center w-full">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search
            className="absolute left-4.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <Input
            placeholder="Search videos by title or description..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            className="pl-12 rounded-xl h-11 border-border/50 bg-background/50 focus:bg-background transition-all placeholder:text-[13px] sm:placeholder:text-sm font-sans"
          />
        </div>

        {/* Categories Dropdown */}
        <div className="w-full md:w-64">
          <MultiSelect
            options={VIDEOS_CATEGORIES}
            value={filters.categories || []}
            onChange={(selected) =>
              onFilterChange({
                ...filters,
                categories: selected.length > 0 ? selected : undefined,
              })
            }
            placeholder="Categories"
            className="h-11 rounded-xl border border-border/50 bg-background/50"
          />
        </div>

        {/* Pricing Dropdown */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'h-11 px-4 rounded-xl border border-border/50 font-bold text-xs flex items-center justify-between gap-2 bg-background/50 hover:bg-background/80 w-full md:w-48 transition-all',
                (filters.minPrice !== undefined || filters.maxPrice !== undefined) &&
                'border-primary text-primary'
              )}
            >
              <span className="flex items-center gap-1.5">
                {filters.minPrice !== undefined || filters.maxPrice !== undefined
                  ? `₹${filters.minPrice ?? 0} - ₹${filters.maxPrice ?? '∞'}`
                  : 'Price Range'}
              </span>
              <ChevronsUpDown size={14} className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="p-4 w-72 rounded-2xl border-border/50 shadow-2xl bg-background/95 backdrop-blur-md"
            align="end"
          >
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                Price Range (INR)
              </h4>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 text-xs font-semibold">
                    ₹
                  </span>
                  <Input
                    type="number"
                    placeholder="Min"
                    min="0"
                    value={filters.minPrice !== undefined ? filters.minPrice : ''}
                    onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                    className="pl-8 rounded-xl h-10 border-border/50 bg-background/30 text-xs"
                  />
                </div>
                <span className="text-muted-foreground text-xs font-bold">to</span>
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 text-xs font-semibold">
                    ₹
                  </span>
                  <Input
                    type="number"
                    placeholder="Max"
                    min="0"
                    value={filters.maxPrice !== undefined ? filters.maxPrice : ''}
                    onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                    className="pl-8 rounded-xl h-10 border-border/50 bg-background/30 text-xs"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="h-11 px-4 rounded-xl text-xs font-bold text-red-500 hover:text-red-400 hover:bg-red-500/10 active:scale-95 transition-all flex items-center justify-center gap-1.5 w-full md:w-auto self-stretch"
          >
            <X size={14} />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};
