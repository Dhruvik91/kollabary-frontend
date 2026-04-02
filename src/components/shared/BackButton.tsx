'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BackButtonProps {
    label?: string;
    className?: string;
}

/**
 * Reusable BackButton component that uses browser history to go back.
 * Standardizes the "Back to ..." navigation across the application.
 */
export const BackButton = ({ label = 'Back', className }: BackButtonProps) => {
    const router = useRouter();

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className={cn(
                "group rounded-xl h-10 px-4 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all flex items-center gap-2 font-bold",
                className
            )}
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>{label}</span>
        </Button>
    );
};
