'use client';

import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BrandCardProps {
    brandName: string;
    avatarLetter: string;
    onContactClick?: () => void;
}

export const BrandCard = ({ brandName, avatarLetter, onContactClick }: BrandCardProps) => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-4">Brand Information</h3>
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl border border-primary/30">
                        {avatarLetter}
                    </div>
                    <div>
                        <p className="font-semibold text-white">{brandName}</p>
                        <p className="text-xs text-gray-400">Verified Brand</p>
                    </div>
                </div>
                <Button 
                    variant="outline" 
                    className="w-full border-white/10 text-white hover:bg-white/5 flex items-center gap-2"
                    onClick={onContactClick}
                >
                    <MessageSquare className="h-4 w-4" />
                    Contact Brand
                </Button>
            </div>
        </div>
    );
};
