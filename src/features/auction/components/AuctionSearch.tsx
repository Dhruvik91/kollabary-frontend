'use client';

import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AuctionSearchProps {
    search: string;
    onSearchChange: (value: string) => void;
    onFilterClick?: () => void;
}

export const AuctionSearch = ({ search, onSearchChange, onFilterClick }: AuctionSearchProps) => {
    return (
        <div className="flex items-center gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                    placeholder="Search auctions by title or description..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:ring-primary/50"
                />
            </div>
            <Button 
                variant="outline" 
                className="border-white/10 text-white hover:bg-white/5"
                onClick={onFilterClick}
            >
                <Filter className="mr-2 h-4 w-4" />
                Filters
            </Button>
        </div>
    );
};
