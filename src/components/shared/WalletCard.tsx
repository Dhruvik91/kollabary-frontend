import React from 'react';
import { motion } from 'framer-motion';
import { Wallet as WalletIcon, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WalletCardProps {
    balance: number | string;
    loading?: boolean;
    className?: string;
}

export const WalletCard = ({
    balance,
    loading = false,
    className
}: WalletCardProps) => {
    const formattedBalance = typeof balance === 'number' 
        ? balance.toLocaleString() 
        : parseFloat(balance || '0').toLocaleString();

    return (
        <Card className={cn(
            "rounded-[2.5rem] border-border/50 bg-gradient-to-br from-primary/10 via-background/5 to-secondary/10 backdrop-blur-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group relative",
            className
        )}>
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700 group-hover:opacity-20">
                <WalletIcon size={120} />
            </div>
            
            <CardContent className="p-8 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:rotate-12 transition-transform duration-500">
                        <WalletIcon size={20} />
                    </div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">KC Balance</p>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-baseline gap-2">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-black tracking-tighter"
                        >
                            {loading ? "---" : formattedBalance}
                        </motion.h2>
                        <span className="text-lg font-bold text-primary/60">KC</span>
                    </div>
                    
                    <div className="flex items-center gap-4 pt-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
                            <TrendingUp size={12} />
                            <span>EARNED TODAY: 50 KC</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient" />
        </Card>
    );
};
