"use client";

import { motion } from "framer-motion";

interface InfluencerHeaderProps {
    title?: string;
    highlightedTitle?: string;
    description?: string;
}

export function InfluencerHeader({
    title = "Discover",
    highlightedTitle = "Creators",
    description = "Find the perfect influencers for your brand from our curated marketplace."
}: InfluencerHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
        >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {title} <span className="gradient-text">{highlightedTitle}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                {description}
            </p>
        </motion.div>
    );
}
