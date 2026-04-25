'use client';

import * as React from 'react';
import { X, Check, ChevronsUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface MultiSelectProps {
    options: string[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    className?: string;
}

export function MultiSelect({
    options,
    value = [],
    onChange,
    placeholder = 'Select options...',
    className,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);

    const handleUnselect = (item: string) => {
        onChange(value.filter((i) => i !== item));
    };

    const handleSelect = (item: string) => {
        if (value.includes(item)) {
            handleUnselect(item);
        } else {
            onChange([...value, item]);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        'w-full justify-between h-auto min-h-12 py-2 px-3 rounded-xl bg-background/50 border-input hover:bg-background/80 transition-all',
                        className
                    )}
                >
                    <div className="flex flex-wrap gap-1.5 items-center">
                        {value.length > 0 ? (
                            value.map((item) => (
                                <Badge
                                    variant="secondary"
                                    key={item}
                                    className="rounded-lg px-2 py-0.5 text-xs font-bold bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUnselect(item);
                                    }}
                                >
                                    {item}
                                    <X className="ml-1 h-3 w-3 cursor-pointer" />
                                </Badge>
                            ))
                        ) : (
                            <span className="text-muted-foreground">{placeholder}</span>
                        )}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0 rounded-2xl border-border/50 shadow-2xl" align="start">
                <div className="max-h-64 overflow-y-auto p-1.5 space-y-0.5">
                    {options.map((option) => (
                        <div
                            key={option}
                            className={cn(
                                'flex items-center justify-between px-3 py-2 rounded-xl text-sm cursor-pointer transition-colors',
                                value.includes(option)
                                    ? 'bg-primary/10 text-primary font-bold'
                                    : 'hover:bg-muted/50'
                            )}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                            {value.includes(option) && <Check className="h-4 w-4" />}
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
