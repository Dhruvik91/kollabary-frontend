import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
    variant?: "default" | "elevated" | "subtle";
    glow?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, variant = "default", glow = false, children, ...props }, ref) => {
        const variants = {
            default: "bg-glass/60 backdrop-blur-2xl border border-glass-border",
            elevated: "bg-glass/80 backdrop-blur-3xl border border-glass-border shadow-2xl",
            subtle: "bg-glass/40 backdrop-blur-xl border border-glass-border/50",
        };

        return (
            <motion.div
                ref={ref}
                className={cn(
                    "rounded-2xl p-6",
                    variants[variant],
                    glow && "glow-primary",
                    className
                )}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
