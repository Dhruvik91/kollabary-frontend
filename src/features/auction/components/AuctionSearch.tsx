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
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search auctions by title or description..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground/60 focus:ring-primary/50 rounded-xl"
                />
            </div>
            <Button 
                variant="outline" 
                className="border-border text-foreground hover:bg-muted/50 rounded-xl"
                onClick={onFilterClick}
            >
                <Filter className="mr-2 h-4 w-4" />
                Filters
            </Button>
        </div>
    );
};
