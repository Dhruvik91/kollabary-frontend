'use client';

import  { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import { MapPin, Loader2, Check, Search } from 'lucide-react';
import {
    Popover,
    PopoverContent,
    PopoverAnchor,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface LocationAutocompleteProps {
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

interface NominatimResult {
    place_id: number;
    display_name: string;
    address: {
        city?: string;
        town?: string;
        village?: string;
        state?: string;
        country?: string;
    };
}

export function LocationAutocomplete({
    value,
    onChange,
    placeholder = "Search for a location...",
    className,
    disabled
}: LocationAutocompleteProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(value || '');
    const [debouncedSearch] = useDebounce(search, 800);
    const [results, setResults] = useState<NominatimResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastFetchedQuery, setLastFetchedQuery] = useState('');

    const fetchLocations = useCallback(async (query: string) => {
        if (!query || query.length < 3 || query === lastFetchedQuery) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.get<NominatimResult[]>(
                `https://nominatim.openstreetmap.org/search`,
                {
                    params: {
                        q: query,
                        format: 'json',
                        addressdetails: 1,
                        limit: 5,
                        'accept-language': 'en'
                    },
                    headers: {
                        'User-Agent': 'Kollabary-App/1.0'
                    }
                }
            );
            setResults(response.data);
            setLastFetchedQuery(query);
        } catch (error) {
            console.error('Error fetching locations:', error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, [lastFetchedQuery]);

    useEffect(() => {
        const query = debouncedSearch.trim();
        if (query.length >= 3 && query !== value && query !== lastFetchedQuery) {
            fetchLocations(query);
        } else if (query.length < 3) {
            setResults([]);
            setLastFetchedQuery('');
        }
    }, [debouncedSearch, fetchLocations, value, lastFetchedQuery]);

    useEffect(() => {
        if (value !== undefined && value !== search) {
            setSearch(value);
        }
    }, [value]);

    const handleSelect = (location: NominatimResult) => {
        const formattedLocation = location.display_name;
        onChange(formattedLocation);
        setSearch(formattedLocation);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverAnchor asChild>
                <div className={cn("relative group", className)}>
                    <MapPin 
                        size={16} 
                        className={cn(
                            "absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
                            open ? "text-primary" : "text-muted-foreground"
                        )} 
                    />
                    <Input
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            if (!open && e.target.value.length >= 3) setOpen(true);
                        }}
                        onFocus={() => {
                            if (search.length >= 3) setOpen(true);
                        }}
                        placeholder={placeholder}
                        disabled={disabled}
                        className="pl-11 h-12 rounded-xl bg-background/50 border-border/50 focus:bg-background transition-all"
                    />
                    {isLoading && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <Loader2 size={16} className="animate-spin text-primary" />
                        </div>
                    )}
                </div>
            </PopoverAnchor>
            <PopoverContent 
                className="w-[calc(var(--radix-popover-trigger-width)-2px)] p-2 rounded-2xl border-border/50 bg-background/95 backdrop-blur-md shadow-2xl" 
                align="start"
                sideOffset={8}
                onOpenAutoFocus={(e) => e.preventDefault()}
                onInteractOutside={(e) => {
                    // Prevent closing when clicking back on the input
                    if (e.target instanceof HTMLElement && e.target.closest('.group')) {
                        e.preventDefault();
                    }
                }}
            >
                <div className="space-y-1">
                    {results.length > 0 ? (
                        results.map((result) => (
                            <button
                                key={result.place_id}
                                onClick={() => handleSelect(result)}
                                className="w-full text-left px-3 py-3 rounded-xl hover:bg-primary/5 transition-colors flex items-start gap-3 group"
                            >
                                <div className="mt-0.5 p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <MapPin size={12} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate leading-none mb-1">
                                        {result.display_name.split(',')[0]}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground truncate leading-tight">
                                        {result.display_name.split(',').slice(1).join(',').trim()}
                                    </p>
                                </div>
                                {value === result.display_name && (
                                    <Check size={14} className="text-primary mt-1 shrink-0" />
                                )}
                            </button>
                        ))
                    ) : (
                        <div className="py-8 text-center">
                            {isLoading ? (
                                <div className="flex flex-col items-center gap-2">
                                    <Loader2 size={24} className="animate-spin text-primary/40" />
                                    <p className="text-xs text-muted-foreground font-medium">Searching globally...</p>
                                </div>
                            ) : search.length > 0 ? (
                                <div className="flex flex-col items-center gap-2">
                                    <Search size={24} className="text-muted-foreground/30" />
                                    <p className="text-xs text-muted-foreground font-medium">No locations found</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <MapPin size={24} className="text-muted-foreground/30" />
                                    <p className="text-xs text-muted-foreground font-medium">Type to search countries, cities...</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
