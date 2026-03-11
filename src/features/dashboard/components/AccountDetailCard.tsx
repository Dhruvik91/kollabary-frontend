'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AccountDetailCardProps {
    email?: string;
    id?: string;
}

export const AccountDetailCard = ({ email, id }: AccountDetailCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
        >
            <Card className="border-border glass-card shadow-none rounded-[2rem] overflow-hidden">
                <CardHeader className="glass-section bg-muted/30 pb-6 border-b border-border">
                    <CardTitle>Account Overview</CardTitle>
                    <CardDescription>Detailed information about your Kollabary profile</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Registered Email</p>
                            <p className="text-lg font-semibold">{email}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Internal ID</p>
                            <p className="text-sm font-mono bg-muted px-2 py-0.5 rounded inline-block">{id}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};
