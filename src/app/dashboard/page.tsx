'use client';

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, User, Shield, CheckCircle2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const stats = [
        { label: 'Role', value: user?.role.toLowerCase(), icon: Shield, color: 'text-blue-500' },
        { label: 'Status', value: user?.status.toLowerCase(), icon: CheckCircle2, color: 'text-emerald-500' },
        { label: 'Verified', value: user?.emailVerified ? 'Yes' : 'No', icon: User, color: 'text-purple-500' },
        { label: 'Joined', value: new Date(user?.createdAt || '').toLocaleDateString(), icon: Calendar, color: 'text-amber-500' },
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

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card border border-border p-6 rounded-3xl group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn("p-3 rounded-2xl bg-muted/50 transition-colors", stat.color)}>
                                <stat.icon size={20} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                                <p className="text-lg font-bold capitalize">{stat.value}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
            >
                <Card className="border-border shadow-none rounded-[2rem] overflow-hidden">
                    <CardHeader className="bg-muted/30 pb-6 border-b border-border">
                        <CardTitle>Account Overview</CardTitle>
                        <CardDescription>Detailed information about your Kollabary profile</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Registered Email</p>
                                <p className="text-lg font-semibold">{user?.email}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Internal ID</p>
                                <p className="text-sm font-mono bg-muted px-2 py-0.5 rounded inline-block">{user?.id}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

// Helper to keep the code clean if cn is not imported, but it is imported in Sidebar so it should be fine.
// Wait, I didn't import cn here.
import { cn } from '@/lib/utils';
