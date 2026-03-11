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

const overlayAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const modalAnimation = {
    hidden: {
        opacity: 0,
        scale: 0.96,
        y: 8,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        scale: 0.96,
        y: 8,
    },
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

    const reducedVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <AnimatePresence>
                {isOpen && (
                    <DialogPortal forceMount>
                        <DialogPrimitive.Overlay asChild>
                            <motion.div
                                variants={shouldReduceMotion ? reducedVariants : overlayAnimation}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                                className="fixed inset-0 z-50 bg-black/40"
                            />
                        </DialogPrimitive.Overlay>
                        <DialogPrimitive.Content
                            asChild
                            onOpenAutoFocus={(e) => e.preventDefault()}
                        >
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                                <motion.div
                                    variants={shouldReduceMotion ? reducedVariants : modalAnimation}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    transition={
                                        shouldReduceMotion
                                            ? { duration: 0.15 }
                                            : {
                                                type: 'spring',
                                                damping: 30,
                                                stiffness: 400,
                                                mass: 0.8,
                                            }
                                    }
                                    className={cn(
                                        "w-full bg-background border border-border/50 rounded-3xl shadow-xl flex flex-col max-h-[90vh] relative pointer-events-auto transform-gpu",
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

