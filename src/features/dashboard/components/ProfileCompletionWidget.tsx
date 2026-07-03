'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
    Sparkles, 
    User, 
    Image, 
    FileText, 
    MapPin, 
    Tag, 
    Globe, 
    Share2, 
    Layers, 
    ArrowRight, 
    CheckCircle2, 
    Circle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useProfileCompletion } from '@/contexts/profile-completion-context';

interface ProfileCompletionWidgetProps {
    user: any;
    influencerProfile?: any;
}

export const ProfileCompletionWidget = ({ user, influencerProfile }: ProfileCompletionWidgetProps) => {
    // We optionally keep user and influencerProfile props for backward compatibility,
    // but the context provides the reactive state.
    const { percentage, tasks, isInfluencer } = useProfileCompletion();

    // Don't show if profile is 100% complete
    if (percentage >= 100) return null;

    const editUrl = isInfluencer ? '/influencer/profile/edit' : '/profile/edit';

    return (
        <Card className="relative overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 shadow-xl shadow-zinc-100/50 dark:shadow-none rounded-[2rem]">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            
            <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
                    {/* Left: Progress Summary */}
                    <div className="space-y-4 max-w-lg w-full">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-xs font-black uppercase tracking-widest border border-primary/20">
                            <Sparkles size={12} className="animate-pulse" />
                            Level Up Your Profile
                        </div>
                        
                        <div>
                            <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                                Your Profile is <span className="text-primary">{percentage}%</span> Complete
                            </h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                                Completing your profile increases your visibility to partners and unlocks premium collaborations.
                            </p>
                        </div>

                        {/* Custom Animated Progress Bar */}
                        <div className="space-y-2">
                            <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden relative">
                                <motion.div 
                                    className="h-full bg-gradient-to-r from-primary via-violet-500 to-indigo-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            </div>
                        </div>

                        <Link href={editUrl} prefetch={false}>
                            <Button className="h-12 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2 group mt-2">
                                Resume Profile Setup
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    {/* Right: Step Status Check list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:max-w-xl">
                        {tasks.map((task, idx) => {
                            const Icon = task.icon;
                            return (
                                <div 
                                    key={idx}
                                    className="flex items-center gap-3 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                                >
                                    <div className={`p-2 rounded-xl ${task.completed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-200/50 dark:bg-zinc-800 text-zinc-400'}`}>
                                        <Icon size={16} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-bold truncate ${task.completed ? 'text-zinc-400 dark:text-zinc-600 line-through' : 'text-zinc-700 dark:text-zinc-300'}`}>
                                            {task.label}
                                        </p>
                                        <p className="text-[10px] text-zinc-400 font-medium">
                                            {task.completed ? 'Completed' : `+${task.weight}% boost`}
                                        </p>
                                    </div>
                                    <div>
                                        {task.completed ? (
                                            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                                        ) : (
                                            <Circle size={16} className="text-zinc-300 dark:text-zinc-700 shrink-0" />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
