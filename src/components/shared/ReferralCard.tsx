import React from 'react';
import { motion } from 'framer-motion';
import { Users, Copy, Check, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ReferralCardProps {
    referralCode: string;
    totalReferrals: number;
    successfulReferrals: number;
    totalEarned: number;
    loading?: boolean;
    className?: string;
}

export const ReferralCard = ({
    referralCode,
    totalReferrals,
    successfulReferrals,
    totalEarned,
    loading = false,
    className
}: ReferralCardProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!referralCode) return;
        const url = `${window.location.origin}/auth/signup?ref=${referralCode}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        toast.success("Referral link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className={cn(
            "rounded-[2.5rem] border-border/50 glass-card overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group",
            className
        )}>
            <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary group-hover:rotate-12 transition-transform duration-500">
                            <Users size={20} />
                        </div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Referral Program</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Total</p>
                        <p className="text-xl font-black">{loading ? "-" : totalReferrals}</p>
                    </div>
                    <div className="space-y-1 border-x border-border/50 px-4">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Active</p>
                        <p className="text-xl font-black text-emerald-500">{loading ? "-" : successfulReferrals}</p>
                    </div>
                    <div className="space-y-1 pl-4">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Earned</p>
                        <p className="text-xl font-black text-primary">{loading ? "-" : totalEarned} KC</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Invite your friends to join <span className="text-foreground font-bold">Kollabary</span> and earn <span className="text-primary font-bold">50 KC Coins</span> for every successful referral!
                    </p>
                    
                    <div className="flex items-center gap-3 p-2 pl-4 rounded-[1.25rem] bg-muted/30 border border-border/50 group-hover:border-primary/20 transition-colors duration-300">
                        <span className="text-xs font-mono font-bold tracking-widest text-primary truncate flex-1">
                            {loading ? "LOADING..." : referralCode}
                        </span>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-10 w-10 rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
                            onClick={handleCopy}
                            disabled={loading || !referralCode}
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
