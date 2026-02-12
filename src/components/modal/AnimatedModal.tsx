'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogPortal,
    DialogOverlay,
} from '@/components/ui/dialog';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { modalVariants } from '@/lib/motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimatedModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string | React.ReactNode;
    description?: string | React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    className?: string;
    contentClassName?: string;
    showCloseButton?: boolean;
}

const sizeClasses = {
    sm: 'sm:max-w-[400px]',
    md: 'sm:max-w-[500px]',
    lg: 'sm:max-w-[600px]',
    xl: 'sm:max-w-[800px]',
    full: 'sm:max-w-[95vw]',
};

/**
 * AnimatedModal - A premium, generic modal component
 * Combines Shadcn UI's accessibility with Framer Motion animations
 * Optimized for forms and complex content
 */
export const AnimatedModal = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    footer,
    size = 'md',
    className,
    contentClassName,
    showCloseButton = true,
}: AnimatedModalProps) => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogPortal>
                <DialogOverlay className="backdrop-blur-sm bg-black/40" />
                <DialogContent
                    className={cn(
                        "p-0 overflow-hidden border-none bg-transparent shadow-none focus-visible:ring-0",
                        sizeClasses[size],
                        className
                    )}
                    showCloseButton={false}
                >
                    <AnimatePresence mode="wait">
                        {isOpen && (
                            <motion.div
                                initial={shouldReduceMotion ? { opacity: 0 } : "hidden"}
                                animate={shouldReduceMotion ? { opacity: 1 } : "visible"}
                                exit={shouldReduceMotion ? { opacity: 0 } : "exit"}
                                variants={modalVariants}
                                className={cn(
                                    "bg-background border border-border/50 rounded-[2.5rem] shadow-2xl flex flex-col w-full max-h-[90vh] relative",
                                    contentClassName
                                )}
                            >
                                {/* Header Section */}
                                <DialogHeader className="px-8 pt-8 pb-4 shrink-0 border-b border-border/5 text-left">
                                    <DialogTitle className="text-2xl font-black tracking-tight">
                                        {title}
                                    </DialogTitle>
                                    {description && (
                                        <DialogDescription className="text-muted-foreground text-base mt-1 leading-relaxed">
                                            {description}
                                        </DialogDescription>
                                    )}
                                </DialogHeader>

                                {/* Main Content - Scrollable */}
                                <div className="p-8 overflow-y-auto scrollbar-none flex-1">
                                    {children}
                                </div>

                                {/* Footer Section */}
                                {footer && (
                                    <div className="px-8 py-6 border-t border-border/5 bg-muted/20 shrink-0">
                                        {footer}
                                    </div>
                                )}

                                {/* Close Button */}
                                {showCloseButton && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={onClose}
                                        className="absolute top-6 right-6 rounded-2xl bg-muted/50 hover:bg-muted text-muted-foreground transition-all hover:rotate-90 active:scale-95 z-50 h-10 w-10"
                                    >
                                        <X size={20} />
                                        <span className="sr-only">Close</span>
                                    </Button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};
