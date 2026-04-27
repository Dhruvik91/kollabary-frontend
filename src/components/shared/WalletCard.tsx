import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { COIN_URL } from '@/constants';
import Image from 'next/image';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

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
            <div className="absolute -top-10 -right-10 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 pointer-events-none">
                <Image
                    src={COIN_URL}
                    alt="K Coins"
                    className="w-64 h-64 object-contain"
                    width={256}
                    height={256}
                />
            </div>

            <CardContent className="p-8 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center p-2 group-hover:rotate-12 transition-transform duration-500">
                        <Image
                            src={COIN_URL}
                            alt="K Coins"
                            className="w-full h-full object-contain"
                            width={40}
                            height={40}
                        />
                    </div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">K Balance</p>
                </div>

                <div className="space-y-4">
                    <Tooltip delayDuration={300}>
                        <TooltipTrigger asChild>
                            <div className="flex items-baseline gap-2 cursor-help">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-5xl font-black tracking-tighter"
                                >
                                    {loading ? "---" : formattedBalance}
                                </motion.h2>
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold text-primary/60 leading-none">K</span>
                                    <span className="text-[10px] font-black text-primary/40 uppercase tracking-tighter">Coins</span>
                                </div>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-[240px] p-4 bg-background/95 backdrop-blur-md border-primary/20">
                            <div className="space-y-2">
                                <p className="font-bold text-primary flex items-center gap-2">
                                    <Image src={COIN_URL} alt="K" width={16} height={16} />
                                    K Coins
                                </p>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    The official platform currency. Use K Coins to bid in auctions, pay for collaborations, and unlock premium features.
                                </p>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </CardContent>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient" />
        </Card>
    );
};
