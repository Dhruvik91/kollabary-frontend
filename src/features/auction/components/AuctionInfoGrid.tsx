'use client';

import { DollarSign, Calendar, Tag, Gavel } from 'lucide-react';
import { format } from 'date-fns';
import { formatCollaborationType } from '@/lib/format-collaboration-type';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface AuctionInfoGridProps {
    minBudget: number;
    maxBudget: number | string;
    deadline: string;
    category: string;
    bidsCount: number;
}

export const AuctionInfoGrid = ({ 
    minBudget, 
    maxBudget, 
    deadline, 
    category, 
    bidsCount 
}: AuctionInfoGridProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-8 pb-6 border-b border-border">
            <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                    <div className="space-y-1 cursor-help">
                        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-bold">Budget Range</p>
                        <p className="text-base sm:text-lg font-black text-foreground flex items-center">
                            <DollarSign className="h-4 w-4 text-primary mr-1 flex-shrink-0" />
                            <span className="truncate">{minBudget || 0} - ${maxBudget || 'Open'}</span>
                        </p>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                    The estimated budget range for this collaboration.
                </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                    <div className="space-y-1 cursor-help">
                        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-bold">Deadline</p>
                        <p className="text-base sm:text-lg font-black text-foreground flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="truncate">{format(new Date(deadline), 'MMM dd, yyyy')}</span>
                        </p>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                    The final date for submissions or collaboration completion.
                </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                    <div className="space-y-1 cursor-help">
                        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-bold">Category</p>
                        <p className="text-base sm:text-lg font-black text-foreground flex items-center gap-1.5">
                            <Tag className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="truncate">{category ? formatCollaborationType(category) : 'General'}</span>
                        </p>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                    The content niche or collaboration category.
                </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                    <div className="space-y-1 cursor-help">
                        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-bold">Bids Count</p>
                        <p className="text-base sm:text-lg font-black text-foreground flex items-center gap-1.5">
                            <Gavel className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="truncate">{bidsCount || 0} Bids</span>
                        </p>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                    Number of active bids submitted by creators.
                </TooltipContent>
            </Tooltip>
        </div>
    );
};
