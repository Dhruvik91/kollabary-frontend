import posthog from 'posthog-js';
import { Users, Copy, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';
import { COIN_URL } from '@/constants';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useKCSettings } from '@/hooks/use-kc-settings.hooks';
import { KCSettingKey } from '@/services/kc-setting.service';

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
    const { data: settings } = useKCSettings();

    // Get dynamic reward values from settings, fallback to hardcoded if not loaded
    const referrerReward = settings?.find(s => s.key === KCSettingKey.REFERRAL_REWARD_REFERRER)?.value || 1000;
    const referredReward = settings?.find(s => s.key === KCSettingKey.REFERRAL_REWARD_REFERRED)?.value || 500;

    const handleCopy = () => {
        if (!referralCode) return;
        const url = `${window.location.origin}/auth/signup?ref=${referralCode}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        posthog.capture('referral_link_copied', {
            referral_code: referralCode,
        });
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
                        <div className="flex items-center gap-1.5">
                            <p className="text-xl font-black text-primary">{loading ? "-" : totalEarned}</p>
                            <Image
                                src={COIN_URL}
                                alt="KC"
                                width={16}
                                height={16}
                                quality={90}
                                className="w-4 h-4 object-contain"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Invite your friends to join <span className="text-foreground font-bold">Kollabary</span> and earn <span className="text-primary font-bold">{referrerReward} K Coins</span> for every successful referral! And your friends will get <span className="text-primary font-bold">{referredReward} K Coins</span> for joining with your referral code.
                    </p>

                    <div className="flex items-center gap-3 p-2 pl-4 rounded-[1.25rem] bg-muted/30 border border-border/50 group-hover:border-primary/20 transition-colors duration-300">
                        <span className="text-xs font-mono font-bold tracking-widest text-primary truncate flex-1">
                            {loading ? "LOADING..." : referralCode}
                        </span>
                        <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
                                    onClick={handleCopy}
                                    disabled={loading || !referralCode}
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                {copied ? 'Copied!' : 'Copy Referral Link'}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
