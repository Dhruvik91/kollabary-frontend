"use client";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    className?: string;
}

export function PageHeader({
    title,
    description,
    actions,
    className,
}: PageHeaderProps) {
    return (
        <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10", className)}>
            <div>
                <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {title}
                </h1>
                {description && (
                    <p className="text-muted-foreground mt-2 text-lg max-w-2xl leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
            {actions && (
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {actions}
                </div>
            )}
        </div>
    );
}
