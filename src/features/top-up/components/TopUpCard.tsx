'use client';

import { TopUpPlan } from '@/types/payment.types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { COIN_URL } from '@/constants';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
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
    const effectiveIsPopular = isPopular || plan.isPopular;

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
                "relative h-full overflow-hidden border-2 transition-all duration-500 group flex flex-col rounded-3xl",
                effectiveIsPopular ? "border-amber-500 shadow-2xl shadow-amber-500/20 scale-[1.02] sm:scale-105 z-10" : "border-border hover:border-primary/30"
            )}>
                {/* Background Decoration */}
                <div className={cn(
                    "absolute -right-12 -top-12 w-48 h-48 rounded-full blur-[80px] opacity-10 transition-opacity group-hover:opacity-30",
                    badgeColorClass
                )} />

                {effectiveIsPopular && (
                    <div className="absolute top-0 right-0 z-20">
                        <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                                <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-white text-[9px] sm:text-[10px] font-black px-4 sm:px-5 py-1.5 sm:py-2 rounded-bl-2xl flex items-center gap-1.5 uppercase tracking-[0.15em] shadow-lg cursor-help animate-pulse">
                                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                                    Popular
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="font-bold bg-amber-600 text-white border-none">
                                Best value for your money!
                            </TooltipContent>
                        </Tooltip>
                    </div>
                )}

                <CardHeader className="text-center pt-8 sm:pt-10 pb-4 sm:pb-6 relative z-10">
                    <div className={cn(
                        "inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] mb-4 border-2 backdrop-blur-sm",
                        planColorClasses
                    )}>
                        {plan.name}
                    </div>
                    <CardTitle className="text-4xl sm:text-5xl font-black tracking-tighter flex items-center justify-center gap-1.5 text-foreground">
                        <span className="text-xl sm:text-2xl font-bold align-top mt-1 sm:mt-2 text-muted-foreground italic">₹</span>
                        {plan.amount}
                    </CardTitle>
                    {plan.description && (
                        <p className="mt-3 text-sm text-muted-foreground font-medium px-6 line-clamp-2 leading-relaxed italic">
                            "{plan.description}"
                        </p>
                    )}
                </CardHeader>

                <CardContent className="flex-1 flex flex-col items-center gap-6 sm:gap-8 pb-8 sm:pb-10 px-6 sm:px-8 relative z-10">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                        <div className={cn("absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse scale-150", badgeColorClass)} />
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                rotate: [0, 3, -3, 0]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 5,
                                ease: "easeInOut"
                            }}
                            className="relative z-10"
                        >
                            <Image
                                src={COIN_URL}
                                alt="KC Coin"
                                width={128}
                                height={128}
                                quality={100}
                                className="w-20 h-20 sm:w-28 sm:h-28 drop-shadow-[0_15px_30px_rgba(255,215,0,0.4)]"
                                priority
                            />
                        </motion.div>
                    </div>

                    <div className="w-full space-y-3 sm:space-y-4">
                        <div className="flex justify-between items-center px-4 sm:px-5 py-2.5 sm:py-3.5 bg-card/50 backdrop-blur-md rounded-2xl border border-border/50 group-hover:border-primary/20 transition-colors shadow-inner">
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-muted-foreground">Coins</span>
                            <span className="text-base sm:text-lg font-black text-foreground">{(plan.coins || 0).toLocaleString()} <span className="text-xs font-bold text-muted-foreground">KC</span></span>
                        </div>

                        {bonusCoins > 0 && (
                            <Tooltip delayDuration={300}>
                                <TooltipTrigger asChild>
                                    <div className={cn(
                                        "flex justify-between items-center px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-2xl border-2 transition-all cursor-help",
                                        "bg-emerald-500/5 border-emerald-500/20 group-hover:border-emerald-500/40"
                                    )}>
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-emerald-500" />
                                            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-600">Bonus</span>
                                        </div>
                                        <span className="text-base sm:text-lg font-black text-emerald-600">
                                            +{bonusCoins.toLocaleString()} <span className="text-xs font-bold opacity-70">KC</span>
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="font-bold bg-emerald-600 text-white border-none">
                                    Special bonus coins included!
                                </TooltipContent>
                            </Tooltip>
                        )}

                        <div className="pt-2 sm:pt-4">
                            <div className={cn(
                                "flex justify-between items-center px-5 sm:px-6 py-4 sm:py-5 rounded-2xl border-2 shadow-xl transition-all relative overflow-hidden",
                                effectiveIsPopular
                                    ? "bg-amber-500/10 border-amber-500/30 scale-105"
                                    : "bg-primary/5 border-primary/30"
                            )}>
                                <div className="flex flex-col">
                                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-none mb-1">Total Value</span>
                                    <span className="text-xs sm:text-sm font-bold text-foreground">Immediate Credit</span>
                                </div>
                                <div className="flex items-end gap-1">
                                    <span className={cn(
                                        "text-2xl sm:text-3xl font-black italic tracking-tighter leading-none",
                                        effectiveIsPopular ? "text-amber-600" : "text-primary"
                                    )}>
                                        {totalCoins.toLocaleString()}
                                    </span>
                                    <span className="text-xs sm:text-sm font-black text-muted-foreground italic mb-0.5">KC</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="pt-0 pb-8 sm:pb-10 px-6 sm:px-10 mt-auto relative z-10">
                    <Button
                        className={cn(
                            "w-full h-14 sm:h-16 text-base sm:text-lg font-black transition-all duration-500 group rounded-2xl sm:rounded-[2rem] shadow-2xl hover:shadow-primary/20",
                            effectiveIsPopular
                                ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white scale-105"
                                : "bg-foreground hover:bg-foreground/90 text-background"
                        )}
                        onClick={() => onBuy(plan.id)}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 sm:w-6 sm:h-6 border-3 border-current border-t-transparent rounded-full animate-spin" />
                                <span className="uppercase tracking-widest">Processing</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Zap className={cn("w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12", effectiveIsPopular ? "fill-current" : "")} />
                                <span className="uppercase tracking-widest">Buy {plan.name}</span>
                            </div>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};
