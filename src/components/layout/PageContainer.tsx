"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BackgroundEffects } from "@/components/BackgroundEffects";

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
    withBackground?: boolean;
    animate?: boolean;
}

export function PageContainer({
    children,
    className,
    withBackground = true,
    animate = true,
}: PageContainerProps) {
    const Content = animate ? (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn("container px-4 py-8 mx-auto relative z-10", className)}
        >
            {children}
        </motion.div>
    ) : (
        <div className={cn("container px-4 py-8 mx-auto relative z-10", className)}>
            {children}
        </div>
    );

    return (
        <div className="min-h-screen relative overflow-hidden bg-background">
            {withBackground && <BackgroundEffects />}
            {Content}
        </div>
    );
}
