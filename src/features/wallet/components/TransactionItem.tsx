import React from 'react';
import { KCTransaction, TransactionType, TransactionPurpose } from '@/types/wallet.types';
import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight, ShoppingBag, Target, Settings } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import { COIN_URL } from '@/constants';

interface TransactionItemProps {
    transaction: KCTransaction;
}

const getPurposeIcon = (purpose: TransactionPurpose) => {
    const coinImg = (
        <Image
            src={COIN_URL}
            alt="KC"
            width={14}
            height={14}
            loading="lazy"
            className="w-3.5 h-3.5 object-contain"
        />
    );

    switch (purpose) {
        case TransactionPurpose.AUCTION_CREATION: return <ShoppingBag size={14} />;
        case TransactionPurpose.COLLABORATION_CREATION: return <Target size={14} />;
        case TransactionPurpose.BID_PLACEMENT: return coinImg;
        case TransactionPurpose.WEEKLY_REWARD: return coinImg;
        case TransactionPurpose.NEW_ARRIVAL_BONUS: return coinImg;
        case TransactionPurpose.REFERRAL_REWARD: return coinImg;
        case TransactionPurpose.SIGNUP_BONUS: return coinImg;
        case TransactionPurpose.SYSTEM_ADJUSTMENT: return <Settings size={14} />;
        default: return coinImg;
    }
};

const getPurposeLabel = (purpose: TransactionPurpose) => {
    return purpose.replace(/_/g, ' ');
};

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
    const isCredit = transaction.type === TransactionType.CREDIT;

    return (
        <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl border border-border/40 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300 group">
            <div className="flex items-center gap-3">
                <div className={cn(
                    "w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-105",
                    isCredit ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                )}>
                    {isCredit ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                </div>

                <div className="space-y-0.5">
                    <h5 className="text-[13px] sm:text-sm font-bold capitalize tracking-tight leading-none">
                        {getPurposeLabel(transaction.purpose)}
                    </h5>
                    <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                        {format(new Date(transaction.createdAt), 'MMM dd, yyyy • hh:mm a')}
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-end gap-1">
                <div className={cn(
                    "flex items-center gap-1 text-sm sm:text-base font-black tracking-tight",
                    isCredit ? "text-emerald-500" : "text-foreground"
                )}>
                    <span>{isCredit ? "+" : "-"}{transaction.amount}</span>
                    <Image
                        src={COIN_URL}
                        alt="K"
                        width={16}
                        height={16}
                        loading="lazy"
                        className="w-4 h-4 object-contain"
                    />
                </div>
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-muted border border-border/50 text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                    {getPurposeIcon(transaction.purpose)}
                    <span>{transaction.type}</span>
                </div>
            </div>
        </div>
    );
};
