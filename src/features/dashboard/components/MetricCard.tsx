'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    subtitle?: string;
    color?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

export const MetricCard = ({
    label,
    value,
    icon: Icon,
    subtitle,
    color = "text-primary",
    trend,
    className
}: MetricCardProps) => {
    return (
        <Card className={cn("rounded-[2rem] border-border/50 backdrop-blur-sm overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group", className)}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", color.replace('text-', 'bg-').concat('/10'))}>
                        <Icon size={24} className={color} />
                    </div>
                    {trend && (
                        <div className={cn("flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold", trend.isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500")}>
                            {trend.isPositive ? "+" : "-"}{trend.value}%
                        </div>
                    )}
                </div>
                <div className="space-y-1">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
                    <motion.h4
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl font-black tracking-tight"
                    >
                        {value}
                    </motion.h4>
                    {subtitle && <p className="text-[10px] text-muted-foreground font-medium">{subtitle}</p>}
                </div>
            </CardContent>
            <div className={cn("h-1 w-full opacity-30", color.replace('text-', 'bg-'))} />
        </Card>
    );
};
