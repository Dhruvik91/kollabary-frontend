'use client';

import { AdminRouteGuard } from '@/components/guards/AdminRouteGuard';
import { motion } from 'framer-motion';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminRouteGuard>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-8"
            >
                {children}
            </motion.div>
        </AdminRouteGuard>
    );
}
