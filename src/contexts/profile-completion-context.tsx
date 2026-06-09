'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useMyInfluencerProfile } from '@/hooks/queries/useInfluencerQueries';
import { UserRole } from '@/types/auth.types';
import { 
    User, 
    Image, 
    FileText, 
    MapPin, 
    Tag, 
    Globe, 
    Share2, 
    Layers,
    Lock,
    ArrowRight,
    AlertCircle,
    CheckCircle2,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AnimatedModal } from '@/components/modal/AnimatedModal';
import Link from 'next/link';

export type ActionType = 'pitch' | 'bid' | 'collab' | 'createAuction';

interface ProfileCompletionContextType {
    percentage: number;
    checkActionAllowed: (action: ActionType) => boolean;
    showGatingModal: (action: ActionType) => void;
}

const ProfileCompletionContext = createContext<ProfileCompletionContextType | undefined>(undefined);

const ACTION_RULES: Record<ActionType, {
    threshold: number;
    requiredKeys: string[];
    name: string;
}> = {
    pitch: {
        threshold: 70,
        requiredKeys: ['bio', 'location', 'categories', 'platforms', 'collabTypes'],
        name: 'Pitch to Campaigns',
    },
    bid: {
        threshold: 70,
        requiredKeys: ['bio', 'location', 'categories', 'platforms', 'collabTypes'],
        name: 'Bid on Campaigns',
    },
    collab: {
        threshold: 60,
        requiredKeys: ['bio', 'location', 'website', 'platforms'], // website for brand, platforms for influencer
        name: 'Start Collaborations',
    },
    createAuction: {
        threshold: 70,
        requiredKeys: ['bio', 'location', 'categories', 'website'],
        name: 'Create Campaigns',
    }
};

export const ProfileCompletionProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const isInfluencer = user?.role === UserRole.INFLUENCER;
    
    // Fetch detailed profile for influencers
    const { data: influencerProfile } = useMyInfluencerProfile(isInfluencer && !!user);
    const profile = (isInfluencer ? influencerProfile : user?.profile) as any;

    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        action: ActionType | null;
    }>({
        isOpen: false,
        action: null,
    });

    const tasks = useMemo(() => {
        if (!user) return [];

        if (isInfluencer) {
            const hasPlatforms = profile?.platforms && Object.values(profile.platforms).some(
                (p: any) => p && p.handle && p.handle.trim() !== ''
            );

            return [
                {
                    key: 'basic',
                    label: 'Basic Info (Name & Username)',
                    completed: !!profile?.fullName && !!(profile?.user?.username || user?.username || profile?.username),
                    weight: 30,
                    icon: User,
                },
                {
                    key: 'photo',
                    label: 'Profile Photo',
                    completed: !!profile?.avatarUrl,
                    weight: 15,
                    icon: Image,
                },
                {
                    key: 'bio',
                    label: 'Bio',
                    completed: !!profile?.bio,
                    weight: 15,
                    icon: FileText,
                },
                {
                    key: 'location',
                    label: 'Location',
                    completed: !!profile?.locationCity || !!profile?.locationCountry,
                    weight: 10,
                    icon: MapPin,
                },
                {
                    key: 'categories',
                    label: 'Creator Categories',
                    completed: Array.isArray(profile?.categories) && profile.categories.length > 0,
                    weight: 10,
                    icon: Tag,
                },
                {
                    key: 'platforms',
                    label: 'Social Platforms',
                    completed: !!hasPlatforms,
                    weight: 10,
                    icon: Share2,
                },
                {
                    key: 'collabTypes',
                    label: 'Collaboration Types',
                    completed: Array.isArray(profile?.collaborationTypes) && profile.collaborationTypes.length > 0,
                    weight: 10,
                    icon: Layers,
                },
            ];
        } else {
            return [
                {
                    key: 'basic',
                    label: 'Basic Info (Name & Username)',
                    completed: !!profile?.fullName && !!profile?.username,
                    weight: 40,
                    icon: User,
                },
                {
                    key: 'photo',
                    label: 'Profile Photo',
                    completed: !!profile?.avatarUrl || !!profile?.profileImage,
                    weight: 15,
                    icon: Image,
                },
                {
                    key: 'bio',
                    label: 'Bio',
                    completed: !!profile?.bio,
                    weight: 15,
                    icon: FileText,
                },
                {
                    key: 'location',
                    label: 'Location',
                    completed: !!profile?.location,
                    weight: 10,
                    icon: MapPin,
                },
                {
                    key: 'categories',
                    label: 'Brand Categories',
                    completed: Array.isArray(profile?.categories) && profile.categories.length > 0,
                    weight: 10,
                    icon: Tag,
                },
                {
                    key: 'website',
                    label: 'Website',
                    completed: !!profile?.website,
                    weight: 10,
                    icon: Globe,
                },
            ];
        }
    }, [user, profile, isInfluencer]);

    const percentage = useMemo(() => {
        if (!user) return 0;
        return Math.round(
            tasks.reduce((sum, task) => sum + (task.completed ? task.weight : 0), 0)
        );
    }, [tasks, user]);

    const getGatingStatus = (action: ActionType) => {
        const rule = ACTION_RULES[action];
        if (!rule || !user) {
            return { allowed: true, missingFields: [], threshold: 0, name: action };
        }

        if (user.role === UserRole.ADMIN) {
            return { allowed: true, missingFields: [], threshold: rule.threshold, name: rule.name };
        }

        const missingFields: { label: string; icon: any }[] = [];
        
        const hasMetThreshold = percentage >= rule.threshold;
        
        rule.requiredKeys.forEach(key => {
            const task = tasks.find(t => t.key === key);
            if (task && !task.completed) {
                missingFields.push({ label: task.label, icon: task.icon });
            }
        });

        return {
            allowed: hasMetThreshold && missingFields.length === 0,
            missingFields,
            threshold: rule.threshold,
            name: rule.name
        };
    };

    const checkActionAllowed = (action: ActionType): boolean => {
        const status = getGatingStatus(action);
        if (!status.allowed) {
            setModalState({
                isOpen: true,
                action,
            });
            return false;
        }
        return true;
    };

    const showGatingModal = (action: ActionType) => {
        setModalState({
            isOpen: true,
            action,
        });
    };

    const currentRule = modalState.action ? ACTION_RULES[modalState.action] : null;
    const currentStatus = modalState.action ? getGatingStatus(modalState.action) : null;
    const editUrl = isInfluencer ? '/influencer/profile/edit' : '/profile/edit';

    return (
        <ProfileCompletionContext.Provider value={{ percentage, checkActionAllowed, showGatingModal }}>
            {children}

            <AnimatedModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, action: null })}
                title={
                    <div className="flex items-center gap-2 text-rose-500">
                        <Lock size={22} className="stroke-[3]" />
                        <span>Action Restricted</span>
                    </div>
                }
                size="md"
            >
                {currentStatus && currentRule && (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                                To protect our community and ensure premium partnerships, you must complete your profile to at least <strong className="text-zinc-950 dark:text-white font-black">{currentStatus.threshold}%</strong> and fill out all required details to <strong className="text-zinc-950 dark:text-white font-medium">{currentStatus.name.toLowerCase()}</strong>.
                            </p>
                        </div>

                        {/* Progress Bar Gating */}
                        <div className="space-y-2 bg-zinc-50 dark:bg-zinc-900/40 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                            <div className="flex justify-between items-center text-xs font-bold">
                                <span className="text-zinc-500">Current Progress</span>
                                <span className="text-primary">{percentage}% / {currentStatus.threshold}%</span>
                            </div>
                            <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden relative">
                                <motion.div 
                                    className="h-full bg-gradient-to-r from-rose-500 via-primary to-violet-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                />
                            </div>
                        </div>

                        {/* Missing Requirements List */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                                <AlertCircle size={14} />
                                Required Profile Fields Missing:
                            </h4>
                            <div className="grid grid-cols-1 gap-2.5">
                                {currentStatus.missingFields.length > 0 ? (
                                    currentStatus.missingFields.map((field, index) => {
                                        const Icon = field.icon;
                                        return (
                                            <div 
                                                key={index}
                                                className="flex items-center gap-3 p-3 rounded-xl border border-rose-100 dark:border-rose-950/30 bg-rose-50/20 dark:bg-rose-950/10 text-rose-600 dark:text-rose-400"
                                            >
                                                <div className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/50 text-rose-500 dark:text-rose-400 shrink-0">
                                                    <Icon size={14} />
                                                </div>
                                                <span className="text-xs font-bold">{field.label}</span>
                                            </div>
                                        );
                                    })
                                ) : (
                                    percentage < currentStatus.threshold && (
                                        <div className="text-xs text-zinc-500 italic p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                                            All specifically required fields are completed, but you need to increase your overall profile completion percentage to {currentStatus.threshold}% by completing other optional tasks (e.g. Profile Photo).
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Modal Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <Button 
                                variant="outline" 
                                onClick={() => setModalState({ isOpen: false, action: null })}
                                className="h-12 rounded-xl flex-1 font-bold border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                            >
                                Cancel
                            </Button>
                            <Link href={editUrl} className="flex-1">
                                <Button 
                                    onClick={() => setModalState({ isOpen: false, action: null })}
                                    className="h-12 w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all gap-2"
                                >
                                    Complete Profile
                                    <ArrowRight size={16} />
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </AnimatedModal>
        </ProfileCompletionContext.Provider>
    );
};

export const useProfileCompletion = () => {
    const context = useContext(ProfileCompletionContext);
    if (!context) {
        throw new Error('useProfileCompletion must be used within a ProfileCompletionProvider');
    }
    return context;
};
