'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function SettingsLoading() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="text-primary/20"
            >
                <Loader2 size={48} />
            </motion.div>
            <div className="space-y-2 text-center">
                <Skeleton className="h-8 w-48 mx-auto" />
                <Skeleton className="h-4 w-64 mx-auto animate-pulse" />
            </div>
            {/* We still use a small spinner here but with matched skeletons for text to feel more integrated than a raw loader */}
        </div>
    );
}
