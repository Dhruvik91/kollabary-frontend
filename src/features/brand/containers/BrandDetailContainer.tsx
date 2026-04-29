'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useBrandProfile } from '@/hooks/queries/useProfileQueries';
import { useStartConversation } from '@/hooks/use-messaging.hooks';
import { FRONTEND_ROUTES } from '@/constants';
import { BackButton } from '@/components/shared/BackButton';
import { BrandDetailHeader } from '../components/BrandDetailHeader';
import { BrandAbout } from '../components/BrandAbout';
import { BrandAuctionList } from '../components/BrandAuctionList';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReportModal } from '@/features/report/components/ReportModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BrandDetailContainerProps {
    brandId: string;
}

export const BrandDetailContainer = ({ brandId }: BrandDetailContainerProps) => {
    const [activeTab, setActiveTab] = useState('about');
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const router = useRouter();
    const { data: brand, isLoading, error } = useBrandProfile(brandId);
    const { mutate: startConversation, isPending: isStartingChat } = useStartConversation();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
                <div className="relative">
                    <Loader2 className="w-16 h-16 text-primary animate-spin" />
                    <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full" />
                </div>
                <div className="space-y-1 text-center">
                    <h3 className="text-xl font-bold">Uncovering Brand Profile</h3>
                    <p className="text-muted-foreground animate-pulse">Connecting to the business ecosystem...</p>
                </div>
            </div>
        );
    }

    if (error || !brand) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 px-4">
                <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center text-destructive">
                    <AlertCircle size={32} />
                </div>
                <div className="space-y-1 text-center">
                    <h3 className="text-xl font-bold">Profile Not Found</h3>
                    <p className="text-muted-foreground">We couldn't find the brand profile you're looking for.</p>
                </div>
                <Button onClick={() => router.back()} className="rounded-xl px-8 h-12 font-bold bg-primary shadow-xl shadow-primary/20">
                    Go Back
                </Button>
            </div>
        );
    }

    const handleContact = () => {
        if (brand.user?.id) {
            startConversation(brand.user.id, {
                onSuccess: (conversation) => {
                    router.push(`${FRONTEND_ROUTES.DASHBOARD.MESSAGES}?id=${conversation.id}`);
                },
            });
        }
    };

    return (
        <div className="relative min-h-screen transition-colors duration-500">
            {/* Ambient Background Decorative Elements - Subtle & Theme Aware */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40 dark:opacity-20">
                <div className="absolute top-[10%] left-[-5%] w-[40rem] h-[40rem] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[20%] right-[-10%] w-[35rem] h-[35rem] bg-secondary/5 blur-[100px] rounded-full animate-pulse [animation-delay:3s]" />
                <div className="absolute top-[40%] right-[10%] w-[25rem] h-[25rem] bg-primary/5 blur-[80px] rounded-full animate-pulse [animation-delay:5s]" />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative z-10 max-w-[1600px] mx-auto space-y-6 sm:space-y-10 pb-24 md:px-0"
            >
                <div className="flex items-center justify-between">
                    <BackButton
                        label="Back to Discovery"
                        className="p-0"
                    />
                </div>

                <BrandDetailHeader
                    brand={brand}
                    isStartingChat={isStartingChat}
                    onContact={handleContact}
                    onReport={() => setIsReportModalOpen(true)}
                />

                <div className="space-y-8 lg:space-y-12">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8 lg:space-y-12">
                        <div className="flex justify-center sm:justify-start">
                            <TabsList variant="pill">
                                <TabsTrigger value="about">
                                    About
                                </TabsTrigger>
                                <TabsTrigger value="auctions">
                                    Auctions
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === 'about' ? (
                                <TabsContent value="about" key="about" className="m-0 focus-visible:outline-none ring-offset-background">
                                    <motion.div
                                        key="about-tab"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <BrandAbout brand={brand} />
                                    </motion.div>
                                </TabsContent>
                            ) : (
                                <TabsContent value="auctions" key="auctions" className="m-0 focus-visible:outline-none ring-offset-background">
                                    <motion.div
                                        key="auctions-tab"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <BrandAuctionList auctions={brand.activeAuctions || []} />
                                    </motion.div>
                                </TabsContent>
                            )}
                        </AnimatePresence>
                    </Tabs>
                </div>
            </motion.div>

            <ReportModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                targetId={brand.user?.id || brand.id}
                targetType="user"
                targetName={brand.fullName}
            />
        </div>
    );
};
