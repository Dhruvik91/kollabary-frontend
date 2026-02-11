'use client';

import { useAuth } from '@/contexts/auth-context';
import { Loader2, User, Shield, CheckCircle2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { DashboardStats } from '../components/DashboardStats';
import { AccountDetailCard } from '../components/AccountDetailCard';

export const DashboardOverviewContainer = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const stats = [
        { label: 'Role', value: user?.role.toLowerCase() || '', icon: Shield, color: 'text-blue-500' },
        { label: 'Status', value: user?.status.toLowerCase() || '', icon: CheckCircle2, color: 'text-emerald-500' },
        { label: 'Verified', value: user?.emailVerified ? 'Yes' : 'No', icon: User, color: 'text-purple-500' },
        { label: 'Joined', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '', icon: Calendar, color: 'text-amber-500' },
    ];

    return (
        <div className="space-y-6 md:space-y-10 max-w-7xl mx-auto">
            <header className="space-y-1">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight"
                >
                    Welcome back, <span className="text-primary italic">{user?.email.split('@')[0]}</span>!
                </motion.h1>
                <p className="text-sm md:text-base text-muted-foreground">Here is what is happening with your account today.</p>
            </header>

            <DashboardStats stats={stats} />

            <AccountDetailCard email={user?.email} id={user?.id} />
        </div>
    );
};
