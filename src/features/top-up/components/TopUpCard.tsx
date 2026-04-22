'use client';

import { TopUpPlan } from '@/types/payment.types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { COIN_URL } from '@/constants';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Coins, IndianRupee, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopUpCardProps {
    plan: TopUpPlan;
    onBuy: (planId: string) => void;
    isLoading?: boolean;
    isPopular?: boolean;
}

export const TopUpCard = ({ plan, onBuy, isLoading, isPopular }: TopUpCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Card className={cn(
                "relative overflow-hidden border-2 transition-all duration-300",
                isPopular ? "border-primary shadow-lg shadow-primary/20 scale-105" : "border-border hover:border-primary/50"
            )}>
                {isPopular && (
                    <div className="absolute top-0 right-0">
                        <div className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 uppercase tracking-wider">
                            <Zap className="w-3 h-3 fill-current" />
                            Most Popular
                        </div>
                    </div>
                )}

                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl font-bold tracking-tight">{plan.name}</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-4 pb-6">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl animate-pulse" />
                        <Image
                            src={COIN_URL}
                            alt="KC Coin"
                            width={80}
                            height={80}
                            className="relative z-10 drop-shadow-2xl"
                        />
                    </div>

                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1.5 text-3xl font-extrabold text-primary">
                            <span>{plan.coins}</span>
                            <span className="text-lg font-bold">KC</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 font-medium">Digital Currency</p>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                    <div className="flex items-center gap-2 text-2xl font-bold">
                        <IndianRupee className="w-5 h-5 text-muted-foreground" />
                        <span>{plan.amount}</span>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        className="w-full h-12 text-md font-bold transition-all duration-300 group"
                        onClick={() => onBuy(plan.id)}
                        disabled={isLoading}
                        variant={isPopular ? "default" : "outline"}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Processing...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Coins className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Top Up Now
                            </div>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};
