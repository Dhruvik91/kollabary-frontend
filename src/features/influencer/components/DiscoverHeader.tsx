'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface DiscoverHeaderProps {
    totalInfluencers?: number;
}

export const DiscoverHeader = ({ totalInfluencers = 0 }: DiscoverHeaderProps) => {
    return (
        <div className="space-y-2">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-xs"
            >
                <Sparkles size={14} />
                <span>Discover Network</span>
            </motion.div>
            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-black tracking-tight leading-tight"
            >
                Find Your Perfect <br />
                <span className="text-primary italic">Match.</span>
            </motion.h1>
        </div>
    );
};
