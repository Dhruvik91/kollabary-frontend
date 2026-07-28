'use client';

import React from 'react';
import { SearchVideosForSaleDto } from '@/types/video.types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, CircleDollarSign, SlidersHorizontal, X, User, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/types/auth.types';

interface VideoFiltersProps {
  filters: SearchVideosForSaleDto;
  onFilterChange: (filters: SearchVideosForSaleDto) => void;
  activeTab: 'marketplace' | 'my-videos';
  onTabChange: (tab: 'marketplace' | 'my-videos') => void;
  userRole?: UserRole;
  isInfluencer?: boolean;
}

const CATEGORIES = [
  'UGC Content',
  'Product Review',
  'Unboxing',
  'Tutorial / How-to',
  'Short-form Ads',
  'Vlog',
  'Sponsored Segment',
  'Social Media Reel / TikTok',
];

export const VideoFilters = ({
  filters,
  onFilterChange,
  activeTab,
  onTabChange,
  userRole,
  isInfluencer = false,
}: VideoFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value || undefined });
  };

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
    const numVal = value === '' ? undefined : Number(value);
    onFilterChange({ ...filters, [field]: numVal });
  };

  const handleCategoryToggle = (category: string) => {
    const currentCategories = filters.categories || [];
    let nextCategories: string[];

    if (currentCategories.includes(category)) {
      nextCategories = currentCategories.filter((c) => c !== category);
    } else {
      nextCategories = [...currentCategories, category];
    }

    onFilterChange({
      ...filters,
      categories: nextCategories.length > 0 ? nextCategories : undefined,
    });
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
    <div className="space-y-6 bg-card border border-border p-6 rounded-[2rem] shadow-sm backdrop-blur-xl">
      
      {/* Top Section: Tab Switcher & Action Buttons */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Marketplace vs My Videos Tabs */}
        {isInfluencer ? (
          <div className="flex bg-muted/40 p-1 rounded-2xl border border-border/40 self-start">
            <button
              onClick={() => onTabChange('marketplace')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300',
                activeTab === 'marketplace'
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <ShoppingBag size={14} />
              Marketplace
            </button>
            <button
              onClick={() => onTabChange('my-videos')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300',
                activeTab === 'my-videos'
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <User size={14} />
              My Videos
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-foreground font-black text-lg sm:text-xl">
            <ShoppingBag className="text-primary" size={20} />
            <h2>Marketplace Videos</h2>
          </div>
        )}

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="self-end md:self-auto h-10 px-4 rounded-xl text-xs font-bold text-red-500 hover:text-red-400 hover:bg-red-500/10 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <X size={14} />
            Reset Filters
          </Button>
        )}
      </div>

      {/* Search Input and Advanced Toggle */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-4.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <Input
            placeholder="Search videos by title or description..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            className="pl-12 rounded-xl h-11 border-border/50 bg-background/50 focus:bg-background transition-all placeholder:text-[13px] sm:placeholder:text-sm"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={cn(
            'h-11 px-5 rounded-xl border border-border/50 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95',
            showAdvanced && 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black border-zinc-900 dark:border-zinc-100'
          )}
        >
          <SlidersHorizontal size={14} />
          Filters
        </Button>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvanced && (
        <div className="pt-4 border-t border-border/20 grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-3 duration-300">
          
          {/* Price Range Filters */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Price Range
            </h4>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <CircleDollarSign
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60"
                  size={14}
                />
                <Input
                  type="number"
                  placeholder="Min Price"
                  min="0"
                  value={filters.minPrice !== undefined ? filters.minPrice : ''}
                  onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                  className="pl-9.5 rounded-xl h-10 border-border/50 bg-background/30"
                />
              </div>
              <span className="text-muted-foreground text-xs font-bold">to</span>
              <div className="relative flex-1">
                <CircleDollarSign
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60"
                  size={14}
                />
                <Input
                  type="number"
                  placeholder="Max Price"
                  min="0"
                  value={filters.maxPrice !== undefined ? filters.maxPrice : ''}
                  onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                  className="pl-9.5 rounded-xl h-10 border-border/50 bg-background/30"
                />
              </div>
            </div>
          </div>

          {/* Categories Filter (Pills / Badges) */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Filter by Category
            </h4>
            <div className="flex flex-wrap gap-1.5 justify-start">
              {CATEGORIES.map((category) => {
                const isSelected = (filters.categories || []).includes(category);
                return (
                  <Badge
                    key={category}
                    variant={isSelected ? 'default' : 'outline'}
                    onClick={() => handleCategoryToggle(category)}
                    className={cn(
                      'cursor-pointer rounded-lg px-2.5 py-1 text-[10px] font-bold transition-all active:scale-95 select-none border border-border/40',
                      isSelected
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-muted/10 text-muted-foreground hover:bg-muted/30'
                    )}
                  >
                    {category}
                  </Badge>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
