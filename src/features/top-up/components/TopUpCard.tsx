'use client';

import { TopUpPlan } from '@/types/payment.types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { COIN_URL } from '@/constants';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface TopUpCardProps {
    plan: TopUpPlan;
    onBuy: (planId: string) => void;
    isLoading?: boolean;
    isPopular?: boolean;
}

export const TopUpCard = ({ plan, onBuy, isLoading, isPopular }: TopUpCardProps) => {
    const bonusCoins = plan.bonusCoins || 0;
    const totalCoins = (plan.coins || 0) + bonusCoins;

    // Plan specific colors mapping
    const getPlanColor = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('starter')) return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5';
        if (n.includes('basic')) return 'text-blue-500 border-blue-500/20 bg-blue-500/5';
        if (n.includes('growth')) return 'text-amber-500 border-amber-500/20 bg-amber-500/5';
        if (n.includes('pro')) return 'text-orange-500 border-orange-500/20 bg-orange-500/5';
        if (n.includes('enterprise')) return 'text-rose-500 border-rose-500/20 bg-rose-500/5';
        return 'text-primary border-primary/20 bg-primary/5';
    };

    const getPlanBadgeColor = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('starter')) return 'bg-emerald-500';
        if (n.includes('basic')) return 'bg-blue-500';
        if (n.includes('growth')) return 'bg-amber-500';
        if (n.includes('pro')) return 'bg-orange-500';
        if (n.includes('enterprise')) return 'bg-rose-500';
        return 'bg-primary';
    };

    const planColorClasses = getPlanColor(plan.name);
    const badgeColorClass = getPlanBadgeColor(plan.name);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full"
        >
            <Card className={cn(
                "relative h-full overflow-hidden border-2 transition-all duration-500 group flex flex-col",
                isPopular ? "border-amber-500 shadow-2xl shadow-amber-500/20 scale-[1.02] sm:scale-105 z-10" : "border-border hover:border-primary/30"
            )}>
                {/* Background Decoration */}
                <div className={cn(
                    "absolute -right-12 -top-12 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40",
                    badgeColorClass
                )} />

                {isPopular && (
                    <div className="absolute top-0 right-0 z-20">
                        <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                                <div className="bg-amber-500 text-white text-[9px] sm:text-[10px] font-black px-3 sm:px-4 py-1 sm:py-1.5 rounded-bl-xl flex items-center gap-1.5 uppercase tracking-[0.1em] shadow-lg cursor-help">
                                    <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                                    Most Popular
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="font-bold">
                                Chosen by 70% of our creators
                            </TooltipContent>
                        </Tooltip>
                    </div>
                )}

                <CardHeader className="text-center pt-6 sm:pt-8 pb-2 sm:pb-4">
                    <div className={cn(
                        "inline-flex items-center justify-center px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-2 sm:mb-3 border",
                        planColorClasses
                    )}>
                        {plan.name}
                    </div>
                    <CardTitle className="text-3xl sm:text-4xl font-black tracking-tight flex items-center justify-center gap-1">
                        <span className="text-lg sm:text-xl font-bold align-top mt-0.5 sm:mt-1">₹</span>
                        {plan.amount}
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col items-center gap-4 sm:gap-6 pb-6 sm:pb-8 px-4 sm:px-6">
                    <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center">
                        <div className={cn("absolute inset-0 rounded-full blur-2xl sm:blur-3xl opacity-20 animate-pulse", badgeColorClass)} />
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="relative z-10"
                        >
                            <Image
                                src={COIN_URL}
                                alt="KC Coin"
                                width={100}
                                height={100}
                                quality={90}
                                className="w-16 h-16 sm:w-24 sm:h-24 drop-shadow-[0_10px_20px_rgba(255,215,0,0.5)]"
                                priority
                            />
                        </motion.div>
                    </div>

                    <div className="w-full space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-muted/30 rounded-xl border border-border/50">
                            <span className="text-xs sm:text-sm font-medium text-muted-foreground">Coins</span>
                            <span className="text-sm sm:text-base font-bold">{(plan.coins || 0).toLocaleString()} KC</span>
                        </div>

                        {bonusCoins > 0 ? (
                            <Tooltip delayDuration={300}>
                                <TooltipTrigger asChild>
                                    <div className={cn(
                                        "flex justify-between items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border transition-colors cursor-help",
                                        "bg-amber-500/10 border-amber-500/20"
                                    )}>
                                        <span className="text-xs sm:text-sm font-medium text-muted-foreground">Bonus</span>
                                        <span className="text-sm sm:text-base font-bold text-amber-600">
                                            +{bonusCoins.toLocaleString()} KC
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="font-bold">
                                    Extra coins included in this plan!
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <div className={cn(
                                "flex justify-between items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border transition-colors border-border/20 opacity-50 bg-muted/10"
                            )}>
                                <span className="text-xs sm:text-sm font-medium text-muted-foreground">Bonus</span>
                                <span className="text-sm sm:text-base font-bold text-muted-foreground">
                                    +0 KC
                                </span>
                            </div>
                        )}

                        <div className="pt-1 sm:pt-2">
                            <div className={cn(
                                "flex justify-between items-center px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 shadow-sm",
                                isPopular ? "bg-amber-500/5 border-amber-500/30" : "bg-primary/5 border-primary/20"
                            )}>
                                <span className="text-xs sm:text-sm font-bold uppercase tracking-tight">Total</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-lg sm:text-xl font-black text-primary">{totalCoins.toLocaleString()}</span>
                                    <span className="text-[10px] sm:text-xs font-bold text-muted-foreground">KC</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="pt-0 pb-6 sm:pb-8 px-4 sm:px-8 mt-auto">
                    <Button
                        className={cn(
                            "w-full h-12 sm:h-14 text-sm sm:text-md font-black transition-all duration-300 group rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl",
                            "bg-amber-500 hover:bg-amber-600 text-white border-none"
                        )}
                        onClick={() => onBuy(plan.id)}
                        disabled={isLoading}
                        variant={"default"}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 sm:border-3 border-current border-t-transparent rounded-full animate-spin" />
                                <span className="text-xs sm:text-base">Processing...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Zap className={cn("w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-125 group-hover:rotate-12", isPopular ? "fill-current" : "")} />
                                <span className="uppercase">Get Rewards</span>
                            </div>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};
