'use client';

import { TopUpPlan } from '@/types/payment.types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { COIN_URL } from '@/constants';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Info, X, Zap, Coins, Sparkles, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TopUpCardProps {
    plan: TopUpPlan;
    onBuy: (planId: string) => void;
    isLoading?: boolean;
    isPopular?: boolean;
}

export const TopUpCard = ({ plan, onBuy, isLoading, isPopular }: TopUpCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const bonusCoins = Number(plan.bonusCoins) || 0;
    const baseCoins = Number(plan.coins) || 0;
    const totalCoins = baseCoins + bonusCoins;
    const effectiveIsPopular = isPopular || plan.isPopular;

    const handleFlip = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="relative w-full max-w-[320px] h-[500px] perspective-1000 mx-auto">
            {/* Popular Badge */}
            {effectiveIsPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                    <motion.div
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-gradient-to-r from-[#FF4D97] to-[#FF7EB3] text-white text-[10px] font-black px-4 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider shadow-[0_4px_12px_rgba(255,77,151,0.3)] border border-white/20 whitespace-nowrap"
                    >
                        <Zap className="w-3 h-3 fill-current" />
                        Most Popular
                    </motion.div>
                </div>
            )}

            <motion.div
                className="w-full h-full relative preserve-3d cursor-default will-change-[transform]"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* Front Side */}
                <Card className={cn(
                    "absolute inset-0 w-full h-full backface-hidden border-2 rounded-[2.5rem] flex flex-col overflow-hidden transition-all duration-500 subpixel-antialiased gpu-accelerated",
                    effectiveIsPopular
                        ? "bg-white dark:bg-zinc-950 border-[#FF4D97]/30 shadow-[0_20px_50px_rgba(255,77,151,0.1)]"
                        : "bg-white dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
                )} style={{
                    transform: 'perspective(1000px) translate3d(0, 0, 1px)',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                    isolation: 'isolate',
                    willChange: 'transform'
                }}>
                    {/* Header */}
                    <div className="relative pt-6 pb-1 text-center px-6">
                        <h3 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight font-display">
                            {plan.name}
                        </h3>
                        <button
                            onClick={handleFlip}
                            className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-zinc-300 hover:text-zinc-500"
                        >
                            <Info className="w-4 h-4 cursor-pointer" />
                        </button>
                    </div>

                    <CardContent className="flex-1 flex flex-col items-center px-6 pb-6 pt-1">
                        {/* Image Container */}
                        <div className="relative w-36 h-36 mb-4 flex items-center justify-center">
                            {/* Decorative Glow */}
                            <div className={cn(
                                "absolute inset-0 rounded-full blur-[30px] md:blur-[60px] opacity-20 scale-110 md:scale-125 transition-all duration-500",
                                effectiveIsPopular ? "bg-[#FF4D97]" : "bg-purple-500"
                            )} />

                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="relative z-10 w-full h-full flex items-center justify-center"
                            >
                                <Image
                                    src={plan.imageUrl || COIN_URL}
                                    alt={plan.name}
                                    width={144}
                                    height={144}
                                    className="w-full h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.1)]"
                                    priority
                                />
                            </motion.div>
                        </div>

                        {/* Stats Rows */}
                        <div className="w-full space-y-2 mb-4">
                            <div className="flex justify-between items-center py-2 px-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100/50 dark:border-zinc-800/50">
                                <div className="flex items-center gap-2">
                                    <Coins className="w-3.5 h-3.5 text-zinc-400" />
                                    <span className="text-[12px] font-semibold text-zinc-500 dark:text-zinc-400">Base</span>
                                </div>
                                <span className="text-[13px] font-black text-zinc-900 dark:text-white">{baseCoins.toLocaleString()} KC</span>
                            </div>

                            <div className="flex justify-between items-center py-2 px-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100/50 dark:border-zinc-800/50">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                                    <span className="text-[12px] font-semibold text-emerald-600 dark:text-emerald-400">Bonus</span>
                                </div>
                                <span className="text-[13px] font-black text-emerald-600 dark:text-emerald-400">+{bonusCoins.toLocaleString()} KC</span>
                            </div>

                            <div className={cn(
                                "flex justify-between items-center py-3 px-4 rounded-xl border transition-colors",
                                effectiveIsPopular
                                    ? "bg-[#FFF0F6] dark:bg-[#2D1B24] border-[#FF4D97]/20"
                                    : "bg-[#F8F7FF] dark:bg-[#1A1B2E] border-purple-100/50 dark:border-purple-900/30"
                            )}>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className={cn("w-3.5 h-3.5", effectiveIsPopular ? "text-[#FF4D97]" : "text-purple-500")} />
                                    <span className={cn("text-[12px] font-bold", effectiveIsPopular ? "text-[#FF4D97]" : "text-purple-600 dark:text-purple-400")}>Total</span>
                                </div>
                                <span className={cn("text-base font-black", effectiveIsPopular ? "text-[#FF4D97]" : "text-purple-700 dark:text-purple-300")}>
                                    {totalCoins.toLocaleString()} <span className="text-[10px] font-black opacity-60">KC</span>
                                </span>
                            </div>
                        </div>

                        {/* Buy Button */}
                        <div className="mt-auto w-full">
                            <Button
                                onClick={() => onBuy(plan.id)}
                                disabled={isLoading}
                                className={cn(
                                    "w-full h-14 rounded-[1.5rem] text-[15px] font-black transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 uppercase tracking-wider",
                                    effectiveIsPopular
                                        ? "bg-gradient-to-r from-[#FF4D97] to-[#FF7EB3] text-white border-none hover:opacity-90"
                                        : "bg-zinc-900 dark:bg-zinc-100 text-white border-none hover:bg-zinc-800 dark:hover:bg-white"
                                )}
                            >
                                {isLoading ? (
                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                        <Zap className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <div className="flex items-center justify-center gap-3">
                                        <span>Buy Now</span>
                                        <div className={cn("w-px h-4", effectiveIsPopular ? "bg-white/30" : "bg-white/20 dark:bg-zinc-900/20")} />
                                        <span className="text-lg">₹{plan.amount}</span>
                                    </div>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Back Side (Details) */}
                <Card className={cn(
                    "absolute inset-0 w-full h-full backface-hidden rotate-y-180 border-2 rounded-[2.5rem] flex flex-col bg-white dark:bg-zinc-950 transition-all duration-500 subpixel-antialiased gpu-accelerated",
                    effectiveIsPopular ? "border-[#FF4D97]/30 shadow-2xl" : "border-zinc-100 dark:border-zinc-800 shadow-lg"
                )} style={{
                    transform: 'perspective(1000px) rotateY(180deg) translate3d(0, 0, 1px)',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                    isolation: 'isolate',
                    willChange: 'transform'
                }}>
                    <div className="relative pt-10 pb-4 px-10">
                        <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2 font-display">
                            Plan Details
                        </h3>
                        <div className="w-10 h-1 bg-[#FF4D97] rounded-full" />
                        <button
                            onClick={handleFlip}
                            className="absolute top-8 right-8 p-2 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-zinc-400 hover:text-zinc-600"
                        >
                            <X className="w-5 h-5 cursor-pointer" />
                        </button>
                    </div>

                    <CardContent className="flex-1 px-10 pb-10 flex flex-col">
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            <p className="text-[15px] leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                                {plan.description || `Enhance your Kollabary experience with the ${plan.name} top-up. Get ${baseCoins.toLocaleString()} coins plus a special bonus of ${bonusCoins.toLocaleString()} coins to unlock premium features and faster growth.`}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};
