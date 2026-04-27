'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    subtitle?: string;
    color?: string;
    bgColor?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
    isLoading?: boolean;
}

export const MetricCard = ({
    label,
    value,
    icon: Icon,
    subtitle,
    color = "text-primary",
    bgColor = "bg-primary/10",
    trend,
    className,
    isLoading
}: MetricCardProps) => {
    return (
        <Card className={cn("rounded-[2rem] border-border/50 glass-card overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-shadow duration-500 group", className)}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", bgColor)}>
                        <Icon size={24} className={color} />
                    </div>
                    {trend && (
                        <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                                <div className={cn("flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold cursor-help", trend.isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500")}>
                                    {trend.isPositive ? "+" : "-"}{trend.value}%
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                {trend.isPositive ? "Up" : "Down"} {trend.value}% compared to last month
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>
                <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
                    {isLoading ? (
                        <Skeleton className="h-9 w-24 my-1" />
                    ) : (
                        <motion.h4
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-3xl font-black tracking-tight"
                        >
                            {value}
                        </motion.h4>
                    )}
                    {subtitle && <p className="text-[10px] text-muted-foreground font-medium">{subtitle}</p>}
                </div>
            </CardContent>
            <div className={cn("h-1 w-full opacity-30", color)} />
        </Card>
    );
};
