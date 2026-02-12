'use client';

import React from 'react';
import {
    Dialog,
    DialogPortal,
} from '@/components/ui/dialog';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
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
            <AnimatePresence>
                {isOpen && (
                    <DialogPortal forceMount>
                        <DialogPrimitive.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
                            />
                        </DialogPrimitive.Overlay>
                        <DialogPrimitive.Content
                            asChild
                            onOpenAutoFocus={(e) => e.preventDefault()}
                        >
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                                <motion.div
                                    initial={shouldReduceMotion ? { opacity: 0 } : "hidden"}
                                    animate={shouldReduceMotion ? { opacity: 1 } : "visible"}
                                    exit={shouldReduceMotion ? { opacity: 0 } : "exit"}
                                    variants={modalVariants}
                                    transition={{ duration: 0.15 }}
                                    className={cn(
                                        "w-full bg-background border border-border/50 rounded-3xl shadow-xl flex flex-col max-h-[90vh] relative pointer-events-auto transform-gpu",
                                        "will-change-transform will-change-opacity",
                                        sizeClasses[size],
                                        className,
                                        contentClassName
                                    )}
                                >
                                    {/* Header Section */}
                                    <DialogHeader className="px-8 pt-8 pb-4 shrink-0 border-b border-border/5 text-left">
                                        <DialogTitle className="text-2xl font-black tracking-tight">
                                            {title}
                                        </DialogTitle>
                                        {description && (
                                            <DialogDescription className="text-muted-foreground text-sm mt-1 leading-relaxed">
                                                {description}
                                            </DialogDescription>
                                        )}
                                    </DialogHeader>

                                    {/* Main Content - Scrollable */}
                                    <div className="px-8 py-6 overflow-y-auto scrollbar-none flex-1">
                                        {children}
                                    </div>

                                    {/* Footer Section */}
                                    {footer && (
                                        <div className="px-8 py-4 bg-muted/20 border-t border-border/5 rounded-b-3xl shrink-0">
                                            {footer}
                                        </div>
                                    )}

                                    {/* Close Button */}
                                    {showCloseButton && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={onClose}
                                            className="absolute top-4 right-4 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground transition-all hover:rotate-12 active:scale-95 z-50 h-8 w-8"
                                        >
                                            <X size={16} />
                                            <span className="sr-only">Close</span>
                                        </Button>
                                    )}
                                </motion.div>
                            </div>
                        </DialogPrimitive.Content>
                    </DialogPortal>
                )}
            </AnimatePresence>
        </Dialog>
    );
};
