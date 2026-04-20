'use client';

import { MessageSquare, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FRONTEND_ROUTES } from '@/constants';

interface BrandCardProps {
    brandId: string;
    brandName: string;
    avatarLetter: string;
    avatarUrl?: string;
    onContactClick?: () => void;
    className?: string;
}

export const BrandCard = ({ brandId, brandName, avatarLetter, avatarUrl, onContactClick, className }: BrandCardProps) => {
    return (
        <div className={cn("bg-card border border-border rounded-[2rem] p-6 backdrop-blur-xl transition-all duration-300", className)}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-2xl border-2 border-primary/20 overflow-hidden shadow-inner">
                        {avatarUrl ? (
                            <Image 
                                src={avatarUrl} 
                                alt={brandName} 
                                width={64}
                                height={64}
                                loading="lazy"
                                className="w-full h-full object-cover" 
                            />
                        ) : (
                            avatarLetter
                        )}
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-black uppercase tracking-tight text-foreground">{brandName}</h3>
                            <ShieldCheck className="h-5 w-5 text-primary" />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5 opacity-60">
                            Verified Brand Partner
                        </p>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <Link href={FRONTEND_ROUTES.DASHBOARD.BRAND_DETAIL(brandId)} className="w-full sm:w-auto">
                        <Button 
                            variant="outline" 
                            className="w-full sm:w-auto border-2 border-border text-foreground hover:bg-muted flex items-center gap-2 rounded-xl h-12 px-6 font-black uppercase text-xs tracking-widest transition-all active:scale-95 group shadow-sm bg-background"
                        >
                            View Profile
                        </Button>
                    </Link>
                    <Button 
                        className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-xl h-12 px-6 font-black uppercase text-xs tracking-widest transition-all active:scale-95 group shadow-xl shadow-primary/10"
                        onClick={onContactClick}
                    >
                        <MessageSquare className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        Contact Brand
                    </Button>
                </div>
            </div>
        </div>
    );
};
