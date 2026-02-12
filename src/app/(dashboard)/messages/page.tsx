'use client';

import { MessagingCenter } from '@/features/messaging/containers/MessagingCenter';
import { motion } from 'framer-motion';

export default function MessagesPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
        >
            <MessagingCenter />
        </motion.div>
    );
}
