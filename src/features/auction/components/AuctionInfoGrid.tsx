'use client';

import { DollarSign, Calendar, Tag, Gavel } from 'lucide-react';
import { format } from 'date-fns';

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-white/10">
            <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Budget Range</p>
                <p className="text-lg font-medium text-white flex items-center">
                    <DollarSign className="h-4 w-4 text-primary" />
                    {minBudget || 0} - ${maxBudget || 'Open'}
                </p>
            </div>
            <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Deadline</p>
                <p className="text-lg font-medium text-white flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-primary" />
                    {format(new Date(deadline), 'MMM dd, yyyy')}
                </p>
            </div>
            <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Category</p>
                <p className="text-lg font-medium text-white flex items-center gap-1.5">
                    <Tag className="h-4 w-4 text-primary" />
                    {category || 'General'}
                </p>
            </div>
            <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Bids Count</p>
                <p className="text-lg font-medium text-white flex items-center gap-1.5">
                    <Gavel className="h-4 w-4 text-primary" />
                    {bidsCount || 0} Bids
                </p>
            </div>
        </div>
    );
};
