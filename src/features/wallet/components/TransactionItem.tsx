import { KCTransaction, TransactionType, TransactionPurpose } from '@/types/wallet.types';
import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface TransactionItemProps {
    transaction: KCTransaction;
}


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
                </div>
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-muted border border-border/50 text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                    <span>{transaction.type}</span>
                </div>
            </div>
        </div>
    );
};
