'use client';

import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BrandCardProps {
    brandName: string;
    avatarLetter: string;
    avatarUrl?: string;
    onContactClick?: () => void;
}

export const BrandCard = ({ brandName, avatarLetter, avatarUrl, onContactClick }: BrandCardProps) => {
    return (
        <div className="bg-card border border-border rounded-2xl p-6 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-foreground mb-4">Brand Information</h3>
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl border border-primary/30 overflow-hidden">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt={brandName} className="w-full h-full object-cover" />
                        ) : (
                            avatarLetter
                        )}
                    </div>
                    <div>
                        <p className="font-semibold text-foreground">{brandName}</p>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-tight">Verified Brand</p>
                    </div>
                </div>
                <Button 
                    variant="outline" 
                    className="w-full border-border text-foreground hover:bg-zinc-100 dark:hover:bg-white/5 flex items-center gap-2 rounded-xl h-11"
                    onClick={onContactClick}
                >
                    <MessageSquare className="h-4 w-4" />
                    Contact Brand
                </Button>
            </div>
        </div>
    );
};
